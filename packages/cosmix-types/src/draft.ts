export interface Draft {
  id: string;
  title: string;
  content: string;
  templateId: string;
  idea: string;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DraftStorage {
  drafts: Draft[];
  lastUpdated: string;
}

export const MAX_DRAFTS = 10;
export const MAX_DRAFT_SIZE_KB = 50;
