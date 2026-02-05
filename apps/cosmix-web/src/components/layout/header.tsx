"use client";

import Link from "next/link";
import { FileText, Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold">Cosmix</span>
          <span className="text-xs text-[var(--muted)]">AI造万象</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/drafts"
            className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <FileText className="w-4 h-4" />
            草稿
          </Link>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
