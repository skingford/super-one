import { get, set, del, keys, clear } from "idb-keyval";

const STORAGE_PREFIX = "learn_";

export const storage = {
  async get<T>(key: string): Promise<T | undefined> {
    try {
      return await get<T>(`${STORAGE_PREFIX}${key}`);
    } catch {
      // Fallback to localStorage for SSR
      if (typeof localStorage !== "undefined") {
        const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        return item ? JSON.parse(item) : undefined;
      }
      return undefined;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await set(`${STORAGE_PREFIX}${key}`, value);
    } catch {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
      }
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await del(`${STORAGE_PREFIX}${key}`);
    } catch {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
      }
    }
  },

  async getAllKeys(): Promise<string[]> {
    try {
      const allKeys = await keys();
      return allKeys
        .filter((k) => typeof k === "string" && k.startsWith(STORAGE_PREFIX))
        .map((k) => (k as string).replace(STORAGE_PREFIX, ""));
    } catch {
      return [];
    }
  },

  async clearAll(): Promise<void> {
    try {
      await clear();
    } catch {
      if (typeof localStorage !== "undefined") {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith(STORAGE_PREFIX)) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key));
      }
    }
  },
};

// Generate unique ID
export function generateId(): string {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

// Format date for display
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "刚刚";
  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;
  return formatDate(d);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}分钟`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`;
}
