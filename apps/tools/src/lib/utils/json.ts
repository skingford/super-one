export interface JsonResult {
  success: boolean;
  data?: unknown;
  formatted?: string;
  error?: string;
  lineNumber?: number;
  repaired?: boolean;
}

/**
 * Attempt to repair malformed JSON
 * Handles: single quotes, unquoted keys, trailing commas, comments, etc.
 */
export function repairJson(input: string): string {
  let result = input.trim();

  // Remove JavaScript-style comments
  result = result.replace(/\/\/.*$/gm, ""); // Single-line comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, ""); // Multi-line comments

  // Handle bare words - wrap with array/object if needed
  if (!/^[[{"]/.test(result) && !/^-?\d/.test(result) && !/^(true|false|null)$/i.test(result)) {
    // Check if it looks like key-value pairs without braces
    if (result.includes(":")) {
      result = `{${result}}`;
    } else {
      // Single bare word, wrap as string
      result = `"${result}"`;
    }
  }

  // Replace single quotes with double quotes (but not inside strings)
  result = replaceSingleQuotes(result);

  // Fix unquoted keys: { key: value } -> { "key": value }
  result = result.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');

  // Fix trailing commas in arrays and objects
  result = result.replace(/,\s*([\]}])/g, "$1");

  // Fix missing commas between values
  result = result.replace(/"\s*\n\s*"/g, '",\n"');
  result = result.replace(/(\d)\s*\n\s*"/g, '$1,\n"');
  result = result.replace(/"\s*\n\s*(\d)/g, '",\n$1');
  result = result.replace(/(true|false|null)\s*\n\s*"/g, '$1,\n"');

  // Fix Python-style None, True, False
  result = result.replace(/:\s*None\b/gi, ": null");
  result = result.replace(/:\s*True\b/g, ": true");
  result = result.replace(/:\s*False\b/g, ": false");

  // Fix undefined
  result = result.replace(/:\s*undefined\b/gi, ": null");

  // Fix NaN and Infinity
  result = result.replace(/:\s*NaN\b/gi, ": null");
  result = result.replace(/:\s*-?Infinity\b/gi, ": null");

  return result;
}

/**
 * Replace single quotes with double quotes, handling escaped quotes
 */
function replaceSingleQuotes(input: string): string {
  let result = "";
  let inDoubleQuote = false;
  let inSingleQuote = false;
  let i = 0;

  while (i < input.length) {
    const char = input[i];
    const prevChar = i > 0 ? input[i - 1] : "";

    if (char === '"' && prevChar !== "\\") {
      if (!inSingleQuote) {
        inDoubleQuote = !inDoubleQuote;
      }
      result += char;
    } else if (char === "'" && prevChar !== "\\") {
      if (!inDoubleQuote) {
        inSingleQuote = !inSingleQuote;
        result += '"'; // Replace single quote with double quote
      } else {
        result += char;
      }
    } else if (char === "\\" && inSingleQuote && input[i + 1] === "'") {
      // Convert escaped single quote to escaped double quote
      result += '\\"';
      i++; // Skip the next character
    } else {
      result += char;
    }
    i++;
  }

  return result;
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

/**
 * Parse JSON with auto-repair fallback
 */
export function parseJsonWithRepair(input: string): JsonResult {
  // First try normal parsing
  const normalResult = parseJson(input);
  if (normalResult.success) {
    return normalResult;
  }

  // Try to repair and parse again
  try {
    const repaired = repairJson(input);
    const data = JSON.parse(repaired);
    return { success: true, data, repaired: true };
  } catch (e) {
    // Return original error if repair also fails
    return normalResult;
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

/**
 * Format JSON with auto-repair
 */
export function formatJsonWithRepair(input: string, indent: number = 2): JsonResult {
  // First try normal parsing
  let parsed = parseJson(input);
  let repaired = false;

  if (!parsed.success) {
    // Try to repair
    try {
      const repairedInput = repairJson(input);
      const data = JSON.parse(repairedInput);
      parsed = { success: true, data };
      repaired = true;
    } catch {
      return parsed; // Return original error
    }
  }

  try {
    const formatted = JSON.stringify(parsed.data, null, indent);
    return { success: true, data: parsed.data, formatted, repaired };
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
