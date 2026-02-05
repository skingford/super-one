"use client";

import { cn } from "@/lib/utils";
import { TEMPLATE_CATEGORY_LABELS, type Template } from "@super-one/cosmix-types";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
  templates: Template[];
  selectedId: string | null;
  onSelect: (template: Template) => void;
  disabled?: boolean;
}

export function TemplateSelector({
  templates,
  selectedId,
  onSelect,
  disabled,
}: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="text-sm text-[var(--muted)]">选择故事类型</div>

      <div className="flex flex-wrap gap-3">
        {templates.map((template) => {
          const isSelected = selectedId === template.id;

          return (
            <button
              key={template.id}
              onClick={() => onSelect(template)}
              disabled={disabled}
              className={cn(
                "relative px-4 py-3 rounded-xl border-2 transition-all",
                "hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                isSelected
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30"
                  : "border-[var(--border)] bg-[var(--surface)]"
              )}
            >
              {isSelected && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}

              <div className="text-left">
                <div className="font-medium">{template.name}</div>
                <div className="text-xs text-[var(--muted)] mt-0.5">
                  {TEMPLATE_CATEGORY_LABELS[template.category]}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedId && (
        <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
          <div className="text-sm text-[var(--muted)]">
            {templates.find((t) => t.id === selectedId)?.description}
          </div>
        </div>
      )}
    </div>
  );
}
