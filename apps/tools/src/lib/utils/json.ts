export interface JsonResult {
  success: boolean;
  data?: unknown;
  formatted?: string;
  error?: string;
  lineNumber?: number;
}

export function parseJson(input: string): JsonResult {
  if (!input.trim()) {
    return { success: false, error: "Input is empty" };
  }

  try {
    const data = JSON.parse(input);
    return { success: true, data };
  } catch (e) {
    const error = e as SyntaxError;
    const match = error.message.match(/position (\d+)/);
    let lineNumber: number | undefined;

    if (match) {
      const position = parseInt(match[1], 10);
      lineNumber = input.substring(0, position).split("\n").length;
    }

    return {
      success: false,
      error: error.message,
      lineNumber,
    };
  }
}

export function formatJson(input: string, indent: number = 2): JsonResult {
  const parsed = parseJson(input);
  if (!parsed.success) {
    return parsed;
  }

  try {
    const formatted = JSON.stringify(parsed.data, null, indent);
    return { success: true, data: parsed.data, formatted };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export function minifyJson(input: string): JsonResult {
  const parsed = parseJson(input);
  if (!parsed.success) {
    return parsed;
  }

  try {
    const formatted = JSON.stringify(parsed.data);
    return { success: true, data: parsed.data, formatted };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export function validateJson(input: string): JsonResult {
  return parseJson(input);
}

export function getJsonStats(data: unknown): { keys: number; depth: number; size: string } {
  let keys = 0;
  let maxDepth = 0;

  function traverse(obj: unknown, depth: number): void {
    if (depth > maxDepth) maxDepth = depth;

    if (Array.isArray(obj)) {
      keys += obj.length;
      obj.forEach((item) => traverse(item, depth + 1));
    } else if (obj !== null && typeof obj === "object") {
      const objKeys = Object.keys(obj);
      keys += objKeys.length;
      objKeys.forEach((key) => traverse((obj as Record<string, unknown>)[key], depth + 1));
    }
  }

  traverse(data, 0);

  const size = new Blob([JSON.stringify(data)]).size;
  const sizeStr = size < 1024 ? `${size} B` : `${(size / 1024).toFixed(1)} KB`;

  return { keys, depth: maxDepth, size: sizeStr };
}
