export interface Content {
  id: string;
  title: string;
  body: string;
  templateId: string;
  wordCount: number;
  status: ContentStatus;
  isFavorite: boolean;
  isHit: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ContentStatus = "draft" | "published" | "archived";

export interface ContentGenerationRequest {
  idea: string;
  templateId: string;
  targetLength?: number;
}

export interface ContentGenerationEvent {
  type: "token" | "done" | "error";
  content?: string;
  totalTokens?: number;
  error?: string;
}
