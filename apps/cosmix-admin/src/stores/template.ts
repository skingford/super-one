import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Template, TemplateCategory } from "@super-one/cosmix-types";

// Mock 数据
const mockTemplates: Template[] = [
  {
    id: "1",
    name: "逆袭打脸",
    category: "campus",
    description: "校园欺凌后的华丽逆袭，打脸所有看不起主角的人",
    promptTemplate: "以{主角}为主角，描写一段校园逆袭打脸的故事...",
    tags: ["逆袭", "打脸", "爽文"],
    isActive: true,
    usageCount: 128,
    createdAt: "2026-01-15T08:00:00Z",
    updatedAt: "2026-02-01T10:30:00Z",
  },
  {
    id: "2",
    name: "校花倒追",
    category: "sweet",
    description: "高冷校花主动倒追平凡男主的甜蜜故事",
    promptTemplate: "校花{女主}对{男主}一见钟情，展开倒追...",
    tags: ["甜宠", "校花", "倒追"],
    isActive: true,
    usageCount: 96,
    createdAt: "2026-01-20T09:00:00Z",
    updatedAt: "2026-02-03T14:20:00Z",
  },
  {
    id: "3",
    name: "青梅竹马",
    category: "sweet",
    description: "两小无猜的青梅竹马，长大后的甜蜜恋爱",
    promptTemplate: "从小一起长大的{男主}和{女主}...",
    tags: ["青梅竹马", "甜宠", "日常"],
    isActive: false,
    usageCount: 45,
    createdAt: "2026-01-25T11:00:00Z",
    updatedAt: "2026-01-30T16:00:00Z",
  },
];

export const useTemplateStore = defineStore("template", () => {
  const templates = ref<Template[]>(mockTemplates);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const activeTemplates = computed(() => templates.value.filter((t) => t.isActive));

  const templatesByCategory = computed(() => {
    const grouped: Record<TemplateCategory, Template[]> = {
      campus: [],
      sweet: [],
      suspense: [],
      fantasy: [],
      custom: [],
    };
    for (const t of templates.value) {
      grouped[t.category].push(t);
    }
    return grouped;
  });

  const totalUsage = computed(() => templates.value.reduce((sum, t) => sum + t.usageCount, 0));

  async function fetchTemplates() {
    loading.value = true;
    error.value = null;
    try {
      // TODO: 替换为真实 API 调用
      await new Promise((resolve) => setTimeout(resolve, 500));
      // templates.value = await TemplateApi.list();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "加载失败";
    } finally {
      loading.value = false;
    }
  }

  async function createTemplate(
    data: Omit<Template, "id" | "createdAt" | "updatedAt" | "usageCount">
  ) {
    loading.value = true;
    try {
      const newTemplate: Template = {
        ...data,
        id: crypto.randomUUID(),
        usageCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      templates.value.unshift(newTemplate);
      return newTemplate;
    } finally {
      loading.value = false;
    }
  }

  async function updateTemplate(id: string, data: Partial<Template>) {
    loading.value = true;
    try {
      const index = templates.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        templates.value[index] = {
          ...templates.value[index],
          ...data,
          updatedAt: new Date().toISOString(),
        };
      }
    } finally {
      loading.value = false;
    }
  }

  async function deleteTemplate(id: string) {
    loading.value = true;
    try {
      templates.value = templates.value.filter((t) => t.id !== id);
    } finally {
      loading.value = false;
    }
  }

  async function toggleActive(id: string) {
    const template = templates.value.find((t) => t.id === id);
    if (template) {
      await updateTemplate(id, { isActive: !template.isActive });
    }
  }

  return {
    templates,
    loading,
    error,
    activeTemplates,
    templatesByCategory,
    totalUsage,
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    toggleActive,
  };
});
