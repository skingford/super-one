"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg" disabled>
        <div className="w-5 h-5" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "p-2 rounded-lg transition-colors",
        "hover:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-primary-500"
      )}
      title={isDark ? "切换到亮色模式" : "切换到暗黑模式"}
    >
      {isDark ? <Sun className="w-5 h-5 text-accent-500" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
