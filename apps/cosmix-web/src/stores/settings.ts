import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  targetLength: number;
  soundEnabled: boolean;
  lastTemplateId: string | null;

  setTargetLength: (length: number) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setLastTemplateId: (id: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      targetLength: 2000,
      soundEnabled: true,
      lastTemplateId: null,

      setTargetLength: (length) => set({ targetLength: length }),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setLastTemplateId: (id) => set({ lastTemplateId: id }),
    }),
    {
      name: "cosmix-settings",
    }
  )
);
