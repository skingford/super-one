export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  promptTemplate: string;
  exampleOutput?: string;
  tags: string[];
  isActive: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export type TemplateCategory = "campus" | "sweet" | "suspense" | "fantasy" | "custom";

export const TEMPLATE_CATEGORY_LABELS: Record<TemplateCategory, string> = {
  campus: "校园爽文",
  sweet: "甜宠文",
  suspense: "悬疑文",
  fantasy: "玄幻文",
  custom: "自定义",
};
