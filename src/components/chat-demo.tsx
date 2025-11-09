"use client";

import type { UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type MessagePart = UIMessage["parts"][number];

function getPartSummary(part: MessagePart): string {
  if ("text" in part && typeof part.text === "string") {
    return part.text;
  }

  if (
    part.type === "tool-call" &&
    "toolName" in part &&
    typeof part.toolName === "string"
  ) {
    return `Tool call: ${part.toolName}`;
  }

  if (part.type === "data" && "data" in part) {
    return `[${part.type} part]`;
  }

  return `[${part.type} part]`;
}

function getMessageSummary(message: UIMessage): string {
  const content = message.parts
    .map((part) => getPartSummary(part))
    .join("\n\n")
    .trim();

  return content.length > 0 ? content : "[No text content]";
}

export function ChatDemo() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/chat",
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI accelerated ideation</CardTitle>
        <CardDescription>
          Ask the boilerplate about setup tips, component ideas, or integration
          steps. Responses stream from the Vercel AI SDK using OpenAI.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex h-60 flex-col gap-3 overflow-y-auto rounded-lg border bg-muted/40 p-4 text-sm">
          {messages.length === 0 ? (
            <p className="text-muted-foreground">
              No conversation yet. Start by asking for deployment guidance or
              styling tweaks.
            </p>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className="rounded-md border border-border/60 bg-background/80 p-3 shadow-xs"
              >
                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Badge variant={message.role === "user" ? "secondary" : "outline"}>
                    {message.role === "user" ? "You" : "AI"}
                  </Badge>
                  <span className="text-[10px] uppercase text-muted-foreground/70">
                    {message.role === "user" ? "Prompt" : "Response"}
                  </span>
                </div>
                <p className="whitespace-pre-wrap leading-relaxed">
                  {getMessageSummary(message)}
                </p>
              </div>
            ))
          )}
        </div>
        {error ? (
          <p className="text-sm text-destructive">
            {error.message || "Something went wrong. Check the API response."}
          </p>
        ) : null}
        <form
          onSubmit={handleSubmit}
          className="grid gap-3"
        >
          <div className="grid gap-2">
            <Label htmlFor="chat-prompt">Ask the boilerplate</Label>
            <Textarea
              id="chat-prompt"
              value={input}
              onChange={handleInputChange}
              placeholder="e.g. Suggest a hero section layout for a SaaS homepage."
              rows={3}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Thinking..." : "Send message"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Tip: set <code>OPENAI_API_KEY</code> and optionally{" "}
        <code>OPENAI_MODEL</code> in your environment to control responses.
      </CardFooter>
    </Card>
  );
}

