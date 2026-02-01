export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  category: "data" | "encode" | "generate" | "convert";
  color: string;
}

export const tools: Tool[] = [
  {
    id: "json",
    name: "JSON",
    description: "Format, validate & beautify",
    icon: "Braces",
    path: "/json",
    category: "data",
    color: "#00ffcc",
  },
  {
    id: "qr-generator",
    name: "QR Gen",
    description: "Create QR codes instantly",
    icon: "QrCode",
    path: "/qr-generator",
    category: "generate",
    color: "#ff6b4a",
  },
  {
    id: "qr-parser",
    name: "QR Scan",
    description: "Decode QR from images",
    icon: "ScanLine",
    path: "/qr-parser",
    category: "encode",
    color: "#a855f7",
  },
  {
    id: "time",
    name: "Time",
    description: "Convert timestamps & formats",
    icon: "Clock",
    path: "/time",
    category: "convert",
    color: "#fbbf24",
  },
  {
    id: "string",
    name: "String",
    description: "Case conversion & formatting",
    icon: "CaseSensitive",
    path: "/string",
    category: "convert",
    color: "#06b6d4",
  },
];

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getToolsByCategory(category: Tool["category"]): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

export function getToolByPath(path: string): Tool | undefined {
  return tools.find((tool) => tool.path === path);
}
