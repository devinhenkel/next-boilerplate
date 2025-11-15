import { ChatDemo } from "@/components/chat-demo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-background via-background to-muted/40">
      <main className="flex flex-1 items-stretch">
        <ChatDemo />
      </main>
    </div>
  );
}
