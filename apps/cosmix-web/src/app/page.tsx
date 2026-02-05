"use client";

import { useState, useCallback, useEffect } from "react";
import { TemplateSelector } from "@/components/templates/template-selector";
import { IdeaInput } from "@/components/generation/idea-input";
import { StreamingText } from "@/components/generation/streaming-text";
import { ContentEditor } from "@/components/editor/content-editor";
import { ActionBar } from "@/components/editor/action-bar";
import { ToastContainer } from "@/components/ui/toast";
import { useGeneration } from "@/hooks/use-generation";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useToast } from "@/hooks/use-toast";
import { useDraftStore } from "@/stores/draft";
import { useSettingsStore } from "@/stores/settings";
import { getActiveTemplates } from "@/lib/templates";
import { extractTitle, copyToClipboard, playSound, countChars } from "@/lib/utils";

export default function Home() {
  const [editorContent, setEditorContent] = useState("");
  const { toasts, success, error, removeToast } = useToast();
  const saveDraft = useDraftStore((s) => s.saveDraft);
  const setLastTemplateId = useSettingsStore((s) => s.setLastTemplateId);
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);

  const { status, content, idea, templateId, setIdea, setTemplateId, generate, reset } =
    useGeneration();

  const isGenerating = status === "generating";
  const isCompleted = status === "completed";
  const displayContent = isCompleted ? editorContent : content;
  const hasContent = displayContent.length > 0;

  const handleTemplateSelect = useCallback(
    (template: { id: string }) => {
      setTemplateId(template.id);
      setLastTemplateId(template.id);
    },
    [setTemplateId, setLastTemplateId]
  );

  const handleGenerate = useCallback(() => {
    if (idea.trim().length >= 2 && templateId) {
      reset();
      setEditorContent("");
      generate();
    }
  }, [idea, templateId, reset, generate]);

  const handleRegenerate = useCallback(() => {
    reset();
    setEditorContent("");
    generate();
  }, [reset, generate]);

  const handleSave = useCallback(() => {
    if (!hasContent) return;

    const title = extractTitle(displayContent);
    saveDraft({
      title,
      content: displayContent,
      templateId: templateId || "",
      idea,
      wordCount: countChars(displayContent),
    });
    success("草稿已保存");
  }, [hasContent, displayContent, templateId, idea, saveDraft, success]);

  const handleCopy = useCallback(async () => {
    if (!hasContent) return;

    const copied = await copyToClipboard(displayContent);
    if (copied) {
      if (soundEnabled) {
        playSound("copy");
      }
      success("已复制到剪贴板");
    } else {
      error("复制失败，请重试");
    }
  }, [hasContent, displayContent, soundEnabled, success, error]);

  const handleContentChange = useCallback((newContent: string) => {
    setEditorContent(newContent);
  }, []);

  useKeyboardShortcuts({
    onGenerate: handleGenerate,
    onCopy: handleCopy,
    onSave: handleSave,
  });

  // Sync streaming content to editor when completed
  useEffect(() => {
    if (status === "completed" && content && !editorContent) {
      setEditorContent(content);
    }
  }, [status, content, editorContent]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
          创作工作台
        </h1>
        <p className="text-[var(--muted)]">5 分钟内，从模糊想法到可发布的校园爽剧内容</p>
      </section>

      <section className="space-y-6">
        <TemplateSelector
          templates={getActiveTemplates()}
          selectedId={templateId}
          onSelect={handleTemplateSelect}
          disabled={isGenerating}
        />

        <IdeaInput
          value={idea}
          onChange={setIdea}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          disabled={!templateId}
        />
      </section>

      {(isGenerating || hasContent) && (
        <section className="space-y-4">
          {isGenerating ? (
            <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <StreamingText content={content} isStreaming={true} className="min-h-[300px]" />
            </div>
          ) : (
            <ContentEditor
              content={editorContent}
              onChange={handleContentChange}
              editable={isCompleted}
              placeholder="AI 生成的内容会在这里显示..."
            />
          )}

          <ActionBar
            content={displayContent}
            onRegenerate={handleRegenerate}
            onSave={handleSave}
            isGenerating={isGenerating}
            hasContent={hasContent}
          />
        </section>
      )}

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
