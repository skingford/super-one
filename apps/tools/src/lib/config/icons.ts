import { Braces, QrCode, ScanLine, Box, Clock, CaseSensitive } from "lucide-svelte";
import type { ComponentType } from "svelte";

export const iconMap = {
  Braces,
  QrCode,
  ScanLine,
  Box,
  Clock,
  CaseSensitive,
} as const;

export type IconName = keyof typeof iconMap;

export function getIcon(iconName: string): ComponentType {
  return iconMap[iconName as IconName] ?? Box;
}
