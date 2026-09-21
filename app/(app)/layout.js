import Navbar from "@/components/Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
      <Navbar />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}