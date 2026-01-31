export interface JsonResult {
  success: boolean;
  data?: unknown;
  formatted?: string;
  error?: string;
  lineNumber?: number;
  repaired?: boolean;
}

/**
 * Token types for JSON-like parsing
 */
type TokenType =
  | "brace_open"
  | "brace_close"
  | "bracket_open"
  | "bracket_close"
  | "colon"
  | "comma"
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "identifier"
  | "whitespace"
  | "unknown";

interface Token {
  type: TokenType;
  value: string;
  start: number;
  end: number;
}

/**
 * Tokenize a JSON-like string (supports malformed JSON)
 */
function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    // Whitespace
    if (/\s/.test(char)) {
      const start = i;
      while (i < input.length && /\s/.test(input[i])) i++;
      tokens.push({ type: "whitespace", value: input.slice(start, i), start, end: i });
      continue;
    }

    // Structural characters
    if (char === "{") {
      tokens.push({ type: "brace_open", value: "{", start: i, end: i + 1 });
      i++;
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "brace_close", value: "}", start: i, end: i + 1 });
      i++;
      continue;
    }
    if (char === "[") {
      tokens.push({ type: "bracket_open", value: "[", start: i, end: i + 1 });
      i++;
      continue;
    }
    if (char === "]") {
      tokens.push({ type: "bracket_close", value: "]", start: i, end: i + 1 });
      i++;
      continue;
    }
    if (char === ":") {
      tokens.push({ type: "colon", value: ":", start: i, end: i + 1 });
      i++;
      continue;
    }
    if (char === ",") {
      tokens.push({ type: "comma", value: ",", start: i, end: i + 1 });
      i++;
      continue;
    }

    // Double-quoted string
    if (char === '"') {
      const start = i;
      i++; // skip opening quote
      while (i < input.length) {
        if (input[i] === "\\") {
          i += 2; // skip escaped char
        } else if (input[i] === '"') {
          i++; // skip closing quote
          break;
        } else {
          i++;
        }
      }
      tokens.push({ type: "string", value: input.slice(start, i), start, end: i });
      continue;
    }

    // Single-quoted string (will be converted)
    if (char === "'") {
      const start = i;
      i++; // skip opening quote
      while (i < input.length) {
        if (input[i] === "\\") {
          i += 2; // skip escaped char
        } else if (input[i] === "'") {
          i++; // skip closing quote
          break;
        } else {
          i++;
        }
      }
      // Store as string but mark for conversion
      const rawValue = input.slice(start, i);
      tokens.push({ type: "string", value: rawValue, start, end: i });
      continue;
    }

    // Number (including negative, decimal, scientific)
    if (char === "-" || /\d/.test(char)) {
      const start = i;
      if (char === "-") i++;
      // Check if it's actually a number or just a minus sign
      if (i < input.length && /\d/.test(input[i])) {
        while (i < input.length && /\d/.test(input[i])) i++;
        if (input[i] === ".") {
          i++;
          while (i < input.length && /\d/.test(input[i])) i++;
        }
        if (input[i] === "e" || input[i] === "E") {
          i++;
          if (input[i] === "+" || input[i] === "-") i++;
          while (i < input.length && /\d/.test(input[i])) i++;
        }
        tokens.push({ type: "number", value: input.slice(start, i), start, end: i });
        continue;
      }
      // Not a valid number, treat as identifier
      i = start;
    }

    // Identifier (unquoted key or value, or keywords)
    if (/[a-zA-Z_$]/.test(char) || char === "-" || char === "/") {
      const start = i;
      // Allow alphanumeric, underscore, dash, dot, slash for paths
      while (i < input.length && /[a-zA-Z0-9_$\-./]/.test(input[i])) i++;
      const value = input.slice(start, i);
      const lowerValue = value.toLowerCase();

      if (lowerValue === "true" || lowerValue === "false") {
        tokens.push({ type: "boolean", value: lowerValue, start, end: i });
      } else if (lowerValue === "null" || lowerValue === "none") {
        tokens.push({ type: "null", value: "null", start, end: i });
      } else if (lowerValue === "undefined" || lowerValue === "nan" || lowerValue === "infinity") {
        tokens.push({ type: "null", value: "null", start, end: i });
      } else {
        tokens.push({ type: "identifier", value, start, end: i });
      }
      continue;
    }

    // Unknown character
    tokens.push({ type: "unknown", value: char, start: i, end: i + 1 });
    i++;
  }

  return tokens;
}

/**
 * Rebuild JSON string from tokens with proper quoting
 */
function rebuildJson(tokens: Token[]): string {
  let result = "";
  let expectValue = false; // After colon, we expect a value
  let inArray = false;
  let afterArrayOpen = false;
  const arrayStack: boolean[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const prevNonWs = findPrevNonWhitespace(tokens, i);
    const nextNonWs = findNextNonWhitespace(tokens, i);

    switch (token.type) {
      case "whitespace":
        result += token.value;
        break;

      case "brace_open":
        result += "{";
        expectValue = false;
        break;

      case "brace_close":
        result += "}";
        expectValue = false;
        break;

      case "bracket_open":
        result += "[";
        arrayStack.push(true);
        inArray = true;
        afterArrayOpen = true;
        expectValue = false;
        break;

      case "bracket_close":
        result += "]";
        arrayStack.pop();
        inArray = arrayStack.length > 0;
        afterArrayOpen = false;
        expectValue = false;
        break;

      case "colon":
        result += ":";
        expectValue = true;
        break;

      case "comma":
        result += ",";
        if (inArray) {
          afterArrayOpen = false;
        }
        expectValue = false;
        break;

      case "string":
        // Convert single quotes to double quotes
        if (token.value.startsWith("'")) {
          const inner = token.value.slice(1, -1);
          // Escape any unescaped double quotes inside
          const escaped = inner.replace(/(?<!\\)"/g, '\\"').replace(/\\'/g, "'");
          result += `"${escaped}"`;
        } else {
          result += token.value;
        }
        expectValue = false;
        afterArrayOpen = false;
        break;

      case "number":
        result += token.value;
        expectValue = false;
        afterArrayOpen = false;
        break;

      case "boolean":
        result += token.value;
        expectValue = false;
        afterArrayOpen = false;
        break;

      case "null":
        result += "null";
        expectValue = false;
        afterArrayOpen = false;
        break;

      case "identifier":
        // Check if next non-whitespace is colon (key indicator)
        const nextIsColon = nextNonWs?.type === "colon";

        if (nextIsColon && !inArray) {
          // It's a key - quote it
          result += `"${token.value}"`;
        } else if (expectValue || inArray || afterArrayOpen) {
          // It's a value - check if it looks like a number or should be quoted
          const val = token.value;

          // Check if it's a pure number that was tokenized as identifier (like 007)
          if (/^-?\d+\.?\d*$/.test(val) && !val.startsWith("0") && val !== "0") {
            result += val; // Keep as number
          } else if (/^0\d+$/.test(val)) {
            // Leading zeros like 007 - quote as string
            result += `"${val}"`;
          } else {
            // It's a string value - quote it
            result += `"${val}"`;
          }
          afterArrayOpen = false;
        } else {
          // Fallback - quote it as string
          result += `"${token.value}"`;
        }
        expectValue = false;
        break;

      case "unknown":
        result += token.value;
        break;
    }
  }

  return result;
}

function findPrevNonWhitespace(tokens: Token[], index: number): Token | null {
  for (let i = index - 1; i >= 0; i--) {
    if (tokens[i].type !== "whitespace") {
      return tokens[i];
    }
  }
  return null;
}

function findNextNonWhitespace(tokens: Token[], index: number): Token | null {
  for (let i = index + 1; i < tokens.length; i++) {
    if (tokens[i].type !== "whitespace") {
      return tokens[i];
    }
  }
  return null;
}

/**
 * Attempt to repair malformed JSON using token-based parsing
 * Handles: single quotes, unquoted keys AND values, trailing commas, comments, etc.
 */
export function repairJson(input: string): string {
  let result = input.trim();

  // Remove JavaScript-style comments first
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

  // Tokenize and rebuild with proper quoting
  const tokens = tokenize(result);
  result = rebuildJson(tokens);

  // Fix trailing commas in arrays and objects
  result = result.replace(/,(\s*[}\]])/g, "$1");

  return result;
}

/**
 * Replace single quotes with double quotes (legacy - now handled by tokenizer)
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
  } catch {
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

/**
 * Minify JSON with auto-repair
 */
export function minifyJsonWithRepair(input: string): JsonResult {
  let parsed = parseJson(input);
  let repaired = false;

  if (!parsed.success) {
    try {
      const repairedInput = repairJson(input);
      const data = JSON.parse(repairedInput);
      parsed = { success: true, data };
      repaired = true;
    } catch {
      return parsed;
    }
  }

  try {
    const formatted = JSON.stringify(parsed.data);
    return { success: true, data: parsed.data, formatted, repaired };
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

/**
 * Check if input is large enough to warrant async processing
 */
export function isLargeInput(input: string): boolean {
  return input.length > 10 * 1024; // 10KB threshold
}

/**
 * Split formatted JSON into lines for virtualized rendering
 */
export function splitJsonToLines(formatted: string): string[] {
  return formatted.split("\n");
}
