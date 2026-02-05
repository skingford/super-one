"use client";

import { useState, type KeyboardEvent } from "react";
import { Sparkles, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface IdeaInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

const INSPIRATION_HINTS = [
  "校园霸凌的女生逆袭成学霸",
  "被退婚后发现对方是隐藏富二代",
  "全班倒数第一竟是天才黑客",
  "高冷校花每天给我带早餐",
  "重生回到高考前一天",
];

export function IdeaInput({ value, onChange, onGenerate, isGenerating, disabled }: IdeaInputProps) {
  const [showHints, setShowHints] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (!disabled && !isGenerating && value.trim().length >= 2) {
        onGenerate();
      }
    }
  };

  const selectHint = (hint: string) => {
    onChange(hint);
    setShowHints(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Lightbulb className="w-4 h-4 text-accent-500" />
        <span>你的创作灵感是什么？</span>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowHints(true)}
          onBlur={() => setTimeout(() => setShowHints(false), 200)}
          placeholder="例如：校园霸凌的女生逆袭成学霸..."
          disabled={disabled || isGenerating}
          className={cn(
            "w-full min-h-[100px] p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]",
            "resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "placeholder:text-[var(--muted)] transition-all",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />

        {showHints && !value && (
          <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-lg z-10">
            <div className="text-xs text-[var(--muted)] mb-2 px-2">💡 灵感提示</div>
            {INSPIRATION_HINTS.map((hint, index) => (
              <button
                key={index}
                onClick={() => selectHint(hint)}
                className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                {hint}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--muted)]">{value.length} 字 · 按 ⌘+Enter 快速生成</span>

        <button
          onClick={onGenerate}
          disabled={disabled || isGenerating || value.trim().length < 2}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all",
            "bg-gradient-to-r from-primary-500 to-primary-600 text-white",
            "hover:from-primary-600 hover:to-primary-700",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          )}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              生成中...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              开始创作
            </>
          )}
        </button>
      </div>
    </div>
  );
}
