"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface StreamingTextProps {
  content: string;
  isStreaming: boolean;
  className?: string;
}

export function StreamingText({ content, isStreaming, className }: StreamingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStreaming && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [content, isStreaming]);

  return (
    <div
      ref={containerRef}
      className={cn("prose prose-lg dark:prose-invert max-w-none overflow-y-auto", className)}
    >
      <div className="whitespace-pre-wrap leading-relaxed">
        {content}
        {isStreaming && <span className="streaming-cursor" />}
      </div>
    </div>
  );
}
