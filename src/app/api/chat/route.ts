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

  const coreMessages = convertToCoreMessages(messages);

  const result = await streamText({
    model: openai(process.env.OPENAI_MODEL ?? "gpt-4o-mini"),
    messages: coreMessages,
  });

  return result.toTextStreamResponse();
}

