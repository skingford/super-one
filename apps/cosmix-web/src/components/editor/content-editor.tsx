"use client";

import { useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { cn } from "@/lib/utils";

interface ContentEditorProps {
  content: string;
  onChange: (content: string) => void;
  editable?: boolean;
  className?: string;
  placeholder?: string;
}

export function ContentEditor({
  content,
  onChange,
  editable = true,
  className,
  placeholder = "AI 生成的内容会在这里显示...",
}: ContentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
      CharacterCount,
    ],
    content,
    editable,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);

  const getWordCount = useCallback(() => {
    if (!editor) return 0;
    const text = editor.getText();
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [editor]);

  const getCharCount = useCallback(() => {
    if (!editor) return 0;
    return editor.storage.characterCount.characters();
  }, [editor]);

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "min-h-[300px] p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]",
          "focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent",
          "transition-all"
        )}
      >
        <EditorContent editor={editor} />
      </div>

      <div className="flex items-center justify-between mt-3 text-sm text-[var(--muted)]">
        <span>
          {getCharCount()} 字 · {getWordCount()} 词
        </span>
        <span>目标: 2000 字</span>
      </div>
    </div>
  );
}
