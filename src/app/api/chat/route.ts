import { createOpenAI } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText, type UIMessage } from "ai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "OPENAI_API_KEY is not set. Add it to your environment to enable AI responses.",
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  const { messages }: { messages?: UIMessage[] } = await req.json();

  if (!messages || messages.length === 0) {
    return new Response(
      JSON.stringify({
        error: "Messages array is required in the request body.",
      }),
      {
        status: 400,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  console.log("[chat] received request", {
    count: messages.length,
    lastRole: messages.at(-1)?.role,
  });

  try {
    const coreMessages = convertToCoreMessages(messages);

    console.log("[chat] sending to provider", {
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      userPromptPreview: coreMessages.at(-1)?.role === "user"
        ? coreMessages.at(-1)?.content?.slice?.(0, 100)
        : undefined,
    });

    const result = await streamText({
      model: openai(process.env.OPENAI_MODEL ?? "gpt-4o-mini"),
      messages: coreMessages,
    });

    console.log("[chat] streaming response ready");

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
    });
  } catch (error) {
    console.error("[chat] failed to stream response", error);

    return new Response(
      JSON.stringify({
        error:
          "Failed to generate a response. Check server logs for more information.",
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}

