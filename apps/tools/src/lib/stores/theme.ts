import { writable } from "svelte/store";
import { browser } from "$app/environment";

type Theme = "light" | "dark";

function createThemeStore() {
  const getInitialTheme = (): Theme => {
    if (!browser) return "dark";
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const { subscribe, set, update } = writable<Theme>(getInitialTheme());

  return {
    subscribe,
    toggle: () => {
      update((current) => {
        const next = current === "dark" ? "light" : "dark";
        if (browser) {
          localStorage.setItem("theme", next);
          document.documentElement.classList.remove(current);
          document.documentElement.classList.add(next);
        }
        return next;
      });
    },
    set: (theme: Theme) => {
      if (browser) {
        localStorage.setItem("theme", theme);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
      }
      set(theme);
    },
    init: () => {
      if (browser) {
        const theme = getInitialTheme();
        document.documentElement.classList.add(theme);
        set(theme);
      }
    },
  };
}

export const theme = createThemeStore();
