"use client";

import Link from "next/link";
import { useDraftStore } from "@/stores/draft";
import { formatDate } from "@/lib/utils";
import { getTemplateById } from "@/lib/templates";
import { FileText, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToastContainer } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export default function DraftsPage() {
  const { drafts, deleteDraft } = useDraftStore();
  const { toasts, success, removeToast } = useToast();

  const handleDelete = (id: string, title: string) => {
    deleteDraft(id);
    success(`已删除"${title}"`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg hover:bg-[var(--surface)] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">我的草稿</h1>
            <p className="text-sm text-[var(--muted)]">{drafts.length} 篇草稿 · 最多保存 10 篇</p>
          </div>
        </div>
      </div>

      {drafts.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 mx-auto text-[var(--muted)] mb-4" />
          <h2 className="text-xl font-medium mb-2">暂无草稿</h2>
          <p className="text-[var(--muted)] mb-6">创作的内容会自动保存到这里</p>
          <Link href="/">
            <Button variant="primary">开始创作</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {drafts.map((draft) => {
            const template = getTemplateById(draft.templateId);

            return (
              <div
                key={draft.id}
                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{draft.title}</h3>
                    <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">
                      {draft.content.replace(/<[^>]*>/g, "").slice(0, 100)}...
                    </p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-[var(--muted)]">
                      {template && (
                        <span className="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                          {template.name}
                        </span>
                      )}
                      <span>{draft.wordCount} 字</span>
                      <span>{formatDate(draft.updatedAt)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(draft.id, draft.title)}
                    className="p-2 rounded-lg text-[var(--muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="删除草稿"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
