import type { ContentGenerationRequest, ContentGenerationEvent } from "@super-one/cosmix-types";
import { getApiClient } from "./client";

export class GenerationApi {
  static async generate(
    request: ContentGenerationRequest,
    onToken: (content: string) => void,
    onComplete: (totalTokens: number) => void,
    onError: (error: string) => void
  ): Promise<() => void> {
    const client = getApiClient();
    const controller = new AbortController();

    try {
      const response = await fetch(client.buildUrl("/api/v1/generate"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      if (!response.ok) {
        onError(`HTTP error: ${response.status}`);
        return () => controller.abort();
      }

      const reader = response.body?.getReader();
      if (!reader) {
        onError("No response body");
        return () => controller.abort();
      }

      const decoder = new TextDecoder();
      let buffer = "";

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const event: ContentGenerationEvent = JSON.parse(line.slice(6));

                switch (event.type) {
                  case "token":
                    if (event.content) onToken(event.content);
                    break;
                  case "done":
                    if (event.totalTokens) onComplete(event.totalTokens);
                    break;
                  case "error":
                    if (event.error) onError(event.error);
                    break;
                }
              } catch {
                // Skip malformed JSON
              }
            }
          }
        }
      };

      processStream().catch((err) => {
        if (err.name !== "AbortError") {
          onError(err.message);
        }
      });
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        onError(err.message);
      }
    }

    return () => controller.abort();
  }
}
