import { browser } from "$app/environment";

export type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (!browser) return "dark";
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

class ThemeStore {
  current = $state<Theme>(getInitialTheme());

  toggle() {
    const next = this.current === "dark" ? "light" : "dark";
    this.set(next);
  }

  set(theme: Theme) {
    if (browser) {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }
    this.current = theme;
  }

  init() {
    if (browser) {
      const theme = getInitialTheme();
      document.documentElement.classList.add(theme);
      this.current = theme;
    }
  }
}

export const theme = new ThemeStore();
