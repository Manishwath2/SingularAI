import { Sidebar } from "@/components/layout/Sidebar";
import { ChatInterface } from "@/components/layout/ChatInterface";

export default function Home() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}
