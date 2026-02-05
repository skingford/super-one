"use client";

import { useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

interface ShortcutHandlers {
  onGenerate?: () => void;
  onCopy?: () => void;
  onSave?: () => void;
  onUndo?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  const { setTheme, theme } = useTheme();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isMeta = event.metaKey || event.ctrlKey;

      if (!isMeta) return;

      switch (event.key.toLowerCase()) {
        case "g":
          event.preventDefault();
          handlers.onGenerate?.();
          break;
        case "c":
          if (!window.getSelection()?.toString()) {
            event.preventDefault();
            handlers.onCopy?.();
          }
          break;
        case "s":
          event.preventDefault();
          handlers.onSave?.();
          break;
        case "z":
          if (!event.shiftKey) {
            handlers.onUndo?.();
          }
          break;
        case "d":
          event.preventDefault();
          setTheme(theme === "dark" ? "light" : "dark");
          break;
      }
    },
    [handlers, setTheme, theme]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
