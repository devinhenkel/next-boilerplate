"use client";

import { useEffect, useState } from "react";

import type { UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import { Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type MessagePart = UIMessage["parts"][number];

function getPartSummary(part: MessagePart): string {
  switch (part.type) {
    case "text":
      return part.text;
    case "tool-call":
      return `Tool call: ${part.toolName}`;
    case "data":
      return `[${part.type} part]`;
    case "file":
      return `[file: ${part.name ?? part.type}]`;
    default:
      return `[${part.type} part]`;
  }
}

function getMessageSummary(message: UIMessage): string {
  const content = message.parts
    .map((part) => getPartSummary(part))
    .join("\n\n")
    .trim();

  return content.length > 0 ? content : "[No text content]";
}

function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  if (!isUser && !isAssistant) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className="flex max-w-[75%] flex-col gap-2">
        <Badge
          variant={isUser ? "secondary" : "outline"}
          className={cn("self-start", isUser && "self-end")}
        >
          {isUser ? "You" : "AI"}
        </Badge>
        <div
          className={cn(
            "whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm transition-colors",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-background border border-border/60"
          )}
        >
          {getMessageSummary(message)}
        </div>
      </div>
    </div>
  );
}

export function ChatDemo() {
  const { messages, sendMessage, status, error } = useChat({
    api: "/api/chat",
  });
  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    console.log("[chat-demo] status", status);
  }, [status]);

  useEffect(() => {
    if (messages.length === 0) return;
    console.log("[chat-demo] messages", messages.map((message) => ({
      id: message.id,
      role: message.role,
      parts: message.parts.length,
    })));
  }, [messages]);

  useEffect(() => {
    if (!error) return;
    console.error("[chat-demo] error", error);
  }, [error]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("[chat-demo] form submitted");
    const trimmed = input.trim();
    if (!trimmed) {
      console.log("[chat-demo] empty input, skipping");
      return;
    }
    console.log("[chat-demo] sending message", { text: trimmed });
    void sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-2 text-center sm:text-left">
        <Badge variant="outline" className="mx-auto w-fit sm:mx-0">
          Next.js AI Chatbot
        </Badge>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Chat with your boilerplate
        </h1>
        <p className="text-muted-foreground">
          Ask anything about setup, patterns, or component usage. Responses are
          powered by the Vercel AI SDK and OpenAI.
        </p>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border bg-muted/20 p-6 shadow-sm">
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="flex flex-col gap-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-muted-foreground/40 bg-background/40 p-8 text-center text-sm text-muted-foreground">
                <p>
                  No messages yet. Say hello to get the conversation started.
                </p>
                <p className="max-w-sm text-xs">
                  Tip: ask for example Tailwind layouts, best practices for
                  TypeScript, or ideas for expanding this starter.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))
            )}
          </div>
        </div>

        {error ? (
          <p className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error.message || "Something went wrong. Check the API response."}
          </p>
        ) : null}

        <form
          onSubmit={onSubmit}
          className="mt-6 grid gap-3"
        >
          <div className="grid gap-2">
            <Label htmlFor="chat-prompt">Ask something</Label>
            <Textarea
              id="chat-prompt"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="e.g. Give me a Tailwind snippet for a pricing section."
              rows={3}
              required
            />
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                "Send message"
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              {status === "streaming"
                ? "Streaming response..."
                : "Responses use your OPENAI_API_KEY."}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

