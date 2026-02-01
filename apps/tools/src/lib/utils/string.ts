/**
 * String case conversion utilities
 */

/** Split string into words (handles camelCase, PascalCase, snake_case, kebab-case, spaces) */
function splitWords(str: string): string[] {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase -> camel Case
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // XMLParser -> XML Parser
    .replace(/[-_]/g, " ") // snake_case, kebab-case -> spaces
    .split(/\s+/)
    .filter(Boolean);
}

/** Convert to UPPER CASE */
export function toUpperCase(str: string): string {
  return str.toUpperCase();
}

/** Convert to lower case */
export function toLowerCase(str: string): string {
  return str.toLowerCase();
}

/** Convert to Title Case (Each Word Capitalized) */
export function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
}

/** Convert to Sentence case (First letter of first word) */
export function toSentenceCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/** Toggle case (swap upper/lower) */
export function toToggleCase(str: string): string {
  return str
    .split("")
    .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
    .join("");
}

/** Convert to camelCase */
export function toCamelCase(str: string): string {
  const words = splitWords(str);
  return words
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}

/** Convert to PascalCase */
export function toPascalCase(str: string): string {
  const words = splitWords(str);
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
}

/** Convert to snake_case */
export function toSnakeCase(str: string): string {
  const words = splitWords(str);
  return words.map((word) => word.toLowerCase()).join("_");
}

/** Convert to kebab-case */
export function toKebabCase(str: string): string {
  const words = splitWords(str);
  return words.map((word) => word.toLowerCase()).join("-");
}

/** Convert to CONSTANT_CASE */
export function toConstantCase(str: string): string {
  const words = splitWords(str);
  return words.map((word) => word.toUpperCase()).join("_");
}

/** All conversion types */
export type StringCaseType =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "toggle"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant";

/** Conversion function map */
export const stringConverters: Record<StringCaseType, (str: string) => string> = {
  upper: toUpperCase,
  lower: toLowerCase,
  title: toTitleCase,
  sentence: toSentenceCase,
  toggle: toToggleCase,
  camel: toCamelCase,
  pascal: toPascalCase,
  snake: toSnakeCase,
  kebab: toKebabCase,
  constant: toConstantCase,
};

/** Conversion metadata for UI */
export const stringCaseOptions: {
  type: StringCaseType;
  label: string;
  example: string;
  description: string;
}[] = [
  {
    type: "upper",
    label: "UPPER CASE",
    example: "HELLO WORLD",
    description: "All letters uppercase",
  },
  {
    type: "lower",
    label: "lower case",
    example: "hello world",
    description: "All letters lowercase",
  },
  {
    type: "title",
    label: "Title Case",
    example: "Hello World",
    description: "Capitalize each word",
  },
  {
    type: "sentence",
    label: "Sentence case",
    example: "Hello world",
    description: "Capitalize first letter only",
  },
  {
    type: "toggle",
    label: "tOGGLE cASE",
    example: "hELLO wORLD",
    description: "Swap upper and lower",
  },
  {
    type: "camel",
    label: "camelCase",
    example: "helloWorld",
    description: "First word lowercase, rest capitalized",
  },
  {
    type: "pascal",
    label: "PascalCase",
    example: "HelloWorld",
    description: "Each word capitalized, no separator",
  },
  {
    type: "snake",
    label: "snake_case",
    example: "hello_world",
    description: "Words joined with underscores",
  },
  {
    type: "kebab",
    label: "kebab-case",
    example: "hello-world",
    description: "Words joined with hyphens",
  },
  {
    type: "constant",
    label: "CONSTANT_CASE",
    example: "HELLO_WORLD",
    description: "Uppercase with underscores",
  },
];

/** Convert string to specified case */
export function convertCase(str: string, type: StringCaseType): string {
  const converter = stringConverters[type];
  return converter ? converter(str) : str;
}

/** Get all conversions for a string */
export function getAllConversions(str: string): Record<StringCaseType, string> {
  const result = {} as Record<StringCaseType, string>;
  for (const type of Object.keys(stringConverters) as StringCaseType[]) {
    result[type] = stringConverters[type](str);
  }
  return result;
}

/** Get string statistics */
export function getStringStats(str: string): {
  chars: number;
  words: number;
  lines: number;
  bytes: string;
} {
  const bytes = new Blob([str]).size;
  return {
    chars: str.length,
    words: str.trim() ? str.trim().split(/\s+/).length : 0,
    lines: str ? str.split("\n").length : 0,
    bytes: bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`,
  };
}
