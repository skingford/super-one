"use client";

import { Copy, RefreshCw, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { copyToClipboard, playSound } from "@/lib/utils";
import { useSettingsStore } from "@/stores/settings";

interface ActionBarProps {
  content: string;
  onRegenerate: () => void;
  onSave: () => void;
  isGenerating: boolean;
  hasContent: boolean;
}

export function ActionBar({
  content,
  onRegenerate,
  onSave,
  isGenerating,
  hasContent,
}: ActionBarProps) {
  const [copied, setCopied] = useState(false);
  const [copyMode, setCopyMode] = useState<"html" | "text">("text");
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);

  const handleCopy = async () => {
    const success = await copyToClipboard(content, copyMode);
    if (success) {
      setCopied(true);
      if (soundEnabled) {
        playSound("copy");
      }
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onRegenerate} disabled={isGenerating}>
          <RefreshCw className={cn("w-4 h-4 mr-1.5", isGenerating && "animate-spin")} />
          重新生成
        </Button>

        <Button variant="outline" size="sm" onClick={onSave} disabled={!hasContent}>
          <Save className="w-4 h-4 mr-1.5" />
          保存草稿
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex rounded-lg border border-[var(--border)] overflow-hidden">
          <button
            onClick={() => setCopyMode("text")}
            className={cn(
              "px-3 py-1.5 text-xs transition-colors",
              copyMode === "text" ? "bg-primary-500 text-white" : "hover:bg-[var(--surface)]"
            )}
          >
            纯文本
          </button>
          <button
            onClick={() => setCopyMode("html")}
            className={cn(
              "px-3 py-1.5 text-xs transition-colors",
              copyMode === "html" ? "bg-primary-500 text-white" : "hover:bg-[var(--surface)]"
            )}
          >
            富文本
          </button>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleCopy}
          disabled={!hasContent}
          className={cn(copied && "animate-[success-flash_0.5s_ease-out]")}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1.5" />
              已复制
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1.5" />
              复制内容
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
