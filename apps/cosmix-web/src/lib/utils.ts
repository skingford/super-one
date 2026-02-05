import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function countWords(text: string): number {
  const cleanText = text.replace(/<[^>]*>/g, "").trim();
  if (!cleanText) return 0;
  return cleanText.split(/\s+/).filter(Boolean).length;
}

export function countChars(text: string): number {
  return text.replace(/<[^>]*>/g, "").length;
}

export function extractTitle(content: string): string {
  const cleanContent = content.replace(/<[^>]*>/g, "");
  const firstLine = cleanContent.split("\n")[0]?.trim() || "";
  return firstLine.slice(0, 50) || "无标题";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "刚刚";
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;

  return date.toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric",
  });
}

export function playSound(soundName: "complete" | "copy"): void {
  const audio = new Audio(`/sounds/${soundName}.mp3`);
  audio.volume = 0.5;
  audio.play().catch(() => {
    // Ignore autoplay errors
  });
}

const ALLOWED_TAGS = ["p", "br", "strong", "em", "h1", "h2", "h3", "ul", "ol", "li"];

export function sanitizeHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const walk = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const tag = el.tagName.toLowerCase();
      const children = Array.from(el.childNodes).map(walk).join("");

      if (ALLOWED_TAGS.includes(tag)) {
        return `<${tag}>${children}</${tag}>`;
      }
      return children;
    }
    return "";
  };

  return walk(doc.body);
}

export async function copyToClipboard(
  content: string,
  format: "html" | "text" = "text"
): Promise<boolean> {
  try {
    if (format === "html" && navigator.clipboard.write) {
      const sanitized = sanitizeHtml(content);
      const blob = new Blob([sanitized], { type: "text/html" });
      const clipboardItem = new ClipboardItem({ "text/html": blob });
      await navigator.clipboard.write([clipboardItem]);
    } else {
      const plainText = content.replace(/<[^>]*>/g, "");
      await navigator.clipboard.writeText(plainText);
    }
    return true;
  } catch {
    return false;
  }
}
