import { Braces, QrCode, ScanLine, Box, Clock } from "lucide-svelte";
import type { ComponentType } from "svelte";

export const iconMap = {
  Braces,
  QrCode,
  ScanLine,
  Box,
  Clock,
} as const;

export type IconName = keyof typeof iconMap;

export function getIcon(iconName: string): ComponentType {
  return iconMap[iconName as IconName] ?? Box;
}
