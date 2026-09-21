import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';

const hexToRgb = (hex) => {
  const value = hex.trim().replace(/^#/, '');
  const normalized = value.length === 3 ? value.replace(/./g, (c) => c + c) : value;
  const match = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
  if (!match) return [1, 1, 1];
  return [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255];
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragment = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uScale;
uniform float uRotation;
uniform float uLayers;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uTwist;
uniform float uTwistFrequency;
uniform float uLineFrequency;
uniform float uLineSpacing;
uniform float uLineSharpness;
uniform float uGlowFalloff;
uniform float uGlowIntensity;
uniform float uBrightness;
uniform float uBlueBoost;
uniform float uVignette;
uniform float uGrain;
uniform float uLightMode;
uniform vec3 uLineColor;
uniform vec3 uGlowColor;

out vec4 fragColor;

#define MAX_LAYERS 10

mat2 rotate2d(float angle) {
  float s = sin(angle), c = cos(angle);
  return mat2(c, -s, s, c);
}

float grainHash(vec2 p) {
  return fract(52.9829189 * fract(dot(floor(p), vec2(0.065, 0.005))));
}

float layeredGrain(vec2 pixel) {
  vec2 point = mod(pixel + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
  vec2 rotated = mat2(0.8, -0.5, 0.5, 0.8) * point;
  return 0.40 * grainHash(rotated) +
         0.25 * grainHash(rotated * 2.0 + 17.0) +
         0.20 * grainHash(rotated * 4.0 + 47.0) +
         0.10 * grainHash(rotated * 8.0 + 113.0) +
         0.05 * grainHash(rotated * 16.0 + 191.0);
}

void main() {
  vec2 resolution = max(uResolution, vec2(1.0));
  vec2 uv = (2.0 * gl_FragCoord.xy - resolution) / resolution.y;
  vec3 backdrop = mix(vec3(0.070588, 0.058824, 0.090196), vec3(1.0), step(0.5, uLightMode));
  vec3 centerTone = max(uLineColor * 0.85567 - uGlowColor * 0.06186, vec3(0.0));
  vec3 cloudTone = uLineColor * 0.19588 + uGlowColor * 0.2268;
  
  vec2 p = uv / max(uScale, 0.05);
  p = rotate2d(radians(uRotation)) * p;
  
  vec3 color = vec3(0.0);
  float fiberField = 0.0;

  for (int i = 0; i < MAX_LAYERS; i++) {
    float fi = float(i) + 1.0;
    if (fi > uLayers) break;

    p += uWaveAmplitude * sin(p.yx * fi * uWaveFrequency + uTime);

    float radius = length(p);
    float polarAngle = atan(p.y, p.x) + sin(radius * uTwistFrequency - uTime + fi) * uTwist;
    p = vec2(cos(polarAngle), sin(polarAngle)) * radius;

    float lines = pow(max(0.0, 1.0 - abs(sin(p.x * (uLineFrequency + fi * uLineSpacing) + sin(p.y * 3.0 + uTime)))), uLineSharpness);
    fiberField += lines / fi;
    color += uLineColor * lines / fi;

    float glow = exp(-uGlowFalloff * abs(sin(p.x * 3.0 + uTime + fi)));
    color += uGlowColor * glow * uGlowIntensity / (fi * 2.0);
  }

  float center = exp(-2.2 * dot(uv, uv));
  color += centerTone * center;

  float cloud = exp(-1.5 * length(uv + vec2(sin(uTime * 0.3) * 0.25, cos(uTime * 0.25) * 0.18)));
  color += cloudTone * cloud;

  float vignette = 1.0 - smoothstep(0.35, 1.45, length(uv));
  color *= mix(1.0 - uVignette, 1.0, vignette);
  color = 1.0 - exp(-color * uBrightness);
  color.b *= uBlueBoost;

  vec3 outputColor;
  if (uLightMode > 0.5) {
    float edgeFade = mix(1.0 - uVignette, 1.0, vignette);
    float fibers = pow(smoothstep(0.12, 1.05, fiberField) * edgeFade, 1.5);
    float atmosphere = (center * 0.025 + cloud * 0.015) * edgeFade;
    outputColor = mix(mix(backdrop, uGlowColor, 0.16), mix(backdrop, uLineColor, 0.52), fibers * 0.3) + atmosphere;
  } else {
    outputColor = backdrop + color;
  }

  float noise = (layeredGrain(gl_FragCoord.xy) - 0.5) * uGrain;
  fragColor = vec4(clamp(outputColor + noise, 0.0, 1.0), 1.0);
}`;

const GhostFibers = ({
  lineColor = '#140E35',
  glowColor = '#3437A0',
  speed = 0.2,
  scale = 2,
  rotation = 0,
  layers = 4,
  waveAmplitude = 0.015,
  waveFrequency = 3,
  twist = 0.1,
  twistFrequency = 5,
  lineFrequency = 5,
  lineSpacing = 2,
  lineSharpness = 16,
  glowFalloff = 10,
  glowIntensity = 1.6,
  brightness = 2,
  blueBoost = 1.25,
  vignette = 0.8,
  grain = 0.05,
  lightMode = false,
  dpr = 1,
  fps = 60,
  paused = false,
  className = ''
}) => {
  const containerRef = useRef(null);
  const webglRef = useRef({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: false,
      antialias: false,
      dpr: Math.min(Math.max(dpr, 0.5), 2)
    });

    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.cssText = 'width: 100%; height: 100%; display: block;';
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uResolution: { value: new Float32Array([1, 1]) },
        uTime: { value: 0 },
        uScale: { value: scale },
        uRotation: { value: rotation },
        uLayers: { value: layers },
        uWaveAmplitude: { value: waveAmplitude },
        uWaveFrequency: { value: waveFrequency },
        uTwist: { value: twist },
        uTwistFrequency: { value: twistFrequency },
        uLineFrequency: { value: lineFrequency },
        uLineSpacing: { value: lineSpacing },
        uLineSharpness: { value: lineSharpness },
        uGlowFalloff: { value: glowFalloff },
        uGlowIntensity: { value: glowIntensity },
        uBrightness: { value: brightness },
        uBlueBoost: { value: blueBoost },
        uVignette: { value: vignette },
        uGrain: { value: grain },
        uLightMode: { value: lightMode ? 1 : 0 },
        uLineColor: { value: new Float32Array(hexToRgb(lineColor)) },
        uGlowColor: { value: new Float32Array(hexToRgb(glowColor)) }
      }
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    webglRef.current = { renderer, program, mesh };

    let frameId = 0;
    let elapsed = 0;
    let previousTime = performance.now();
    let lastRenderTime = 0;
    let isVisible = true;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const canAnimate = () => isVisible && !document.hidden && !paused && !reducedMotion.matches;
    const render = () => renderer.render({ scene: mesh });

    const loop = (now) => {
      frameId = 0;
      if (!canAnimate()) return;

      const delta = Math.min((now - previousTime) / 1000, 0.1);
      previousTime = now;
      elapsed += delta * speed;

      if (now - lastRenderTime >= 1000 / Math.min(Math.max(fps, 1), 120) - 0.5) {
        program.uniforms.uTime.value = elapsed;
        render();
        lastRenderTime = now;
      }

      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!canAnimate() || frameId !== 0) return;
      previousTime = performance.now();
      frameId = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (frameId !== 0) cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
      program.uniforms.uResolution.value.set([gl.drawingBufferWidth, gl.drawingBufferHeight]);
      render();
    };

    const handleVisibility = () => (canAnimate() ? start() : stop());

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      handleVisibility();
    });
    intersectionObserver.observe(container);

    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotion.addEventListener('change', handleVisibility);

    setSize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotion.removeEventListener('change', handleVisibility);
      if (canvas.parentNode === container) container.removeChild(canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [dpr]);

  // Update uniforms when props change
  useEffect(() => {
    const { program } = webglRef.current;
    if (!program) return;

    const u = program.uniforms;
    u.uLineColor.value.set(hexToRgb(lineColor));
    u.uGlowColor.value.set(hexToRgb(glowColor));
    u.uScale.value = scale;
    u.uRotation.value = rotation;
    u.uLayers.value = Math.min(Math.max(Math.round(layers), 1), 10);
    u.uWaveAmplitude.value = waveAmplitude;
    u.uWaveFrequency.value = waveFrequency;
    u.uTwist.value = twist;
    u.uTwistFrequency.value = twistFrequency;
    u.uLineFrequency.value = lineFrequency;
    u.uLineSpacing.value = lineSpacing;
    u.uLineSharpness.value = lineSharpness;
    u.uGlowFalloff.value = glowFalloff;
    u.uGlowIntensity.value = glowIntensity;
    u.uBrightness.value = brightness;
    u.uBlueBoost.value = blueBoost;
    u.uVignette.value = vignette;
    u.uGrain.value = grain;
    u.uLightMode.value = lightMode ? 1 : 0;
  }, [
    lineColor, glowColor, scale, rotation, layers, waveAmplitude,
    waveFrequency, twist, twistFrequency, lineFrequency, lineSpacing,
    lineSharpness, glowFalloff, glowIntensity, brightness, blueBoost,
    vignette, grain, lightMode
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 h-full w-full overflow-hidden ${className}`.trim()}
    />
  );
};

export default GhostFibers;