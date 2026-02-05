import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Draft } from "@super-one/cosmix-types";

const MAX_DRAFTS = 10;

interface DraftState {
  drafts: Draft[];
  currentDraftId: string | null;

  saveDraft: (draft: Omit<Draft, "id" | "createdAt" | "updatedAt">) => string;
  updateDraft: (id: string, updates: Partial<Draft>) => void;
  loadDraft: (id: string) => Draft | undefined;
  deleteDraft: (id: string) => void;
  setCurrentDraft: (id: string | null) => void;
  getCurrentDraft: () => Draft | undefined;
}

export const useDraftStore = create<DraftState>()(
  persist(
    (set, get) => ({
      drafts: [],
      currentDraftId: null,

      saveDraft: (draftData) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const newDraft: Draft = {
          ...draftData,
          id,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => {
          let drafts = [newDraft, ...state.drafts];
          if (drafts.length > MAX_DRAFTS) {
            drafts = drafts.slice(0, MAX_DRAFTS);
          }
          return { drafts, currentDraftId: id };
        });

        return id;
      },

      updateDraft: (id, updates) => {
        set((state) => ({
          drafts: state.drafts.map((draft) =>
            draft.id === id ? { ...draft, ...updates, updatedAt: new Date().toISOString() } : draft
          ),
        }));
      },

      loadDraft: (id) => {
        return get().drafts.find((d) => d.id === id);
      },

      deleteDraft: (id) => {
        set((state) => ({
          drafts: state.drafts.filter((d) => d.id !== id),
          currentDraftId: state.currentDraftId === id ? null : state.currentDraftId,
        }));
      },

      setCurrentDraft: (id) => {
        set({ currentDraftId: id });
      },

      getCurrentDraft: () => {
        const state = get();
        if (!state.currentDraftId) return undefined;
        return state.drafts.find((d) => d.id === state.currentDraftId);
      },
    }),
    {
      name: "cosmix-drafts",
    }
  )
);
