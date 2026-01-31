import { storage, generateId } from "$lib/utils/storage";
import type { KnowledgeItem, KnowledgeCategory } from "$lib/types";

const STORAGE_KEY = "knowledge_items";
const CATEGORIES_KEY = "knowledge_categories";

// Default categories
const DEFAULT_CATEGORIES: KnowledgeCategory[] = [
  { id: "notes", name: "学习笔记", icon: "FileText", color: "text-blue-500" },
  { id: "code", name: "代码片段", icon: "Code", color: "text-green-500" },
  { id: "resources", name: "学习资源", icon: "Link", color: "text-purple-500" },
  { id: "ideas", name: "灵感想法", icon: "Lightbulb", color: "text-yellow-500" },
];

class KnowledgeStore {
  items = $state<KnowledgeItem[]>([]);
  categories = $state<KnowledgeCategory[]>(DEFAULT_CATEGORIES);
  isLoading = $state(true);
  searchQuery = $state("");
  selectedCategory = $state<string | null>(null);

  // Derived states
  get filteredItems() {
    let result = this.items;

    if (this.selectedCategory) {
      result = result.filter((item) => item.category === this.selectedCategory);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.content.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort: pinned first, then by updatedAt
    return result.sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }

  get totalCount() {
    return this.items.length;
  }

  get categoryStats() {
    const stats: Record<string, number> = {};
    for (const item of this.items) {
      stats[item.category] = (stats[item.category] || 0) + 1;
    }
    return stats;
  }

  async init() {
    this.isLoading = true;
    try {
      const [items, categories] = await Promise.all([
        storage.get<KnowledgeItem[]>(STORAGE_KEY),
        storage.get<KnowledgeCategory[]>(CATEGORIES_KEY),
      ]);
      this.items = items || [];
      this.categories = categories || DEFAULT_CATEGORIES;
    } finally {
      this.isLoading = false;
    }
  }

  async add(data: Omit<KnowledgeItem, "id" | "createdAt" | "updatedAt" | "isPinned">) {
    const newItem: KnowledgeItem = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
    };
    this.items = [newItem, ...this.items];
    await this.persist();
    return newItem;
  }

  async update(id: string, data: Partial<Omit<KnowledgeItem, "id" | "createdAt">>) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return null;

    this.items[index] = {
      ...this.items[index],
      ...data,
      updatedAt: new Date(),
    };
    this.items = [...this.items];
    await this.persist();
    return this.items[index];
  }

  async delete(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
    await this.persist();
  }

  async togglePin(id: string) {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      await this.update(id, { isPinned: !item.isPinned });
    }
  }

  getById(id: string) {
    return this.items.find((item) => item.id === id);
  }

  private async persist() {
    await storage.set(STORAGE_KEY, this.items);
  }

  async addCategory(category: Omit<KnowledgeCategory, "id">) {
    const newCategory: KnowledgeCategory = {
      ...category,
      id: generateId(),
    };
    this.categories = [...this.categories, newCategory];
    await storage.set(CATEGORIES_KEY, this.categories);
    return newCategory;
  }
}

export const knowledgeStore = new KnowledgeStore();
