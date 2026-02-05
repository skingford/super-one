import { create } from "zustand";

export type GenerationStatus = "idle" | "generating" | "completed" | "error";

interface GenerationState {
  status: GenerationStatus;
  content: string;
  progress: number;
  error: string | null;
  idea: string;
  templateId: string | null;
  totalTokens: number;

  setIdea: (idea: string) => void;
  setTemplateId: (templateId: string) => void;
  startGeneration: () => void;
  appendContent: (token: string) => void;
  completeGeneration: (totalTokens: number) => void;
  setError: (error: string) => void;
  reset: () => void;
}

export const useGenerationStore = create<GenerationState>((set) => ({
  status: "idle",
  content: "",
  progress: 0,
  error: null,
  idea: "",
  templateId: null,
  totalTokens: 0,

  setIdea: (idea) => set({ idea }),
  setTemplateId: (templateId) => set({ templateId }),

  startGeneration: () =>
    set({
      status: "generating",
      content: "",
      progress: 0,
      error: null,
      totalTokens: 0,
    }),

  appendContent: (token) =>
    set((state) => ({
      content: state.content + token,
      progress: Math.min(state.progress + 1, 100),
    })),

  completeGeneration: (totalTokens) =>
    set({
      status: "completed",
      progress: 100,
      totalTokens,
    }),

  setError: (error) =>
    set({
      status: "error",
      error,
    }),

  reset: () =>
    set({
      status: "idle",
      content: "",
      progress: 0,
      error: null,
      totalTokens: 0,
    }),
}));
