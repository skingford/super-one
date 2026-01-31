export interface TimeParseResult {
  success: boolean;
  date?: Date;
  inputType?: "unix_seconds" | "unix_millis" | "iso" | "date_string" | "relative";
  error?: string;
}

export interface TimeConversion {
  unixSeconds: number;
  unixMillis: number;
  iso8601: string;
  isoDate: string;
  isoTime: string;
  utc: string;
  local: string;
  relative: string;
  rfc2822: string;
  beijing: string;
}

export interface DateMetadata {
  year: number;
  month: number;
  day: number;
  weekday: string;
  weekdayShort: string;
  weekNumber: number;
  dayOfYear: number;
  quarter: number;
  isLeapYear: boolean;
  daysInMonth: number;
  isWeekend: boolean;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  timezone: string;
  timezoneOffset: number;
}

export interface LocalizedFormat {
  locale: string;
  localeName: string;
  date: string;
  time: string;
  dateTime: string;
}

export interface Duration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  totalMilliseconds: number;
  humanReadable: string;
}

export interface TimezoneInfo {
  id: string;
  name: string;
  offset: string;
}

const COMMON_TIMEZONES: TimezoneInfo[] = [
  { id: "UTC", name: "UTC", offset: "+00:00" },
  { id: "America/New_York", name: "New York (EST/EDT)", offset: "-05:00" },
  { id: "America/Chicago", name: "Chicago (CST/CDT)", offset: "-06:00" },
  { id: "America/Denver", name: "Denver (MST/MDT)", offset: "-07:00" },
  { id: "America/Los_Angeles", name: "Los Angeles (PST/PDT)", offset: "-08:00" },
  { id: "America/Toronto", name: "Toronto (EST/EDT)", offset: "-05:00" },
  { id: "America/Vancouver", name: "Vancouver (PST/PDT)", offset: "-08:00" },
  { id: "America/Sao_Paulo", name: "Sao Paulo (BRT)", offset: "-03:00" },
  { id: "Europe/London", name: "London (GMT/BST)", offset: "+00:00" },
  { id: "Europe/Paris", name: "Paris (CET/CEST)", offset: "+01:00" },
  { id: "Europe/Berlin", name: "Berlin (CET/CEST)", offset: "+01:00" },
  { id: "Europe/Moscow", name: "Moscow (MSK)", offset: "+03:00" },
  { id: "Asia/Dubai", name: "Dubai (GST)", offset: "+04:00" },
  { id: "Asia/Kolkata", name: "Mumbai (IST)", offset: "+05:30" },
  { id: "Asia/Bangkok", name: "Bangkok (ICT)", offset: "+07:00" },
  { id: "Asia/Singapore", name: "Singapore (SGT)", offset: "+08:00" },
  { id: "Asia/Hong_Kong", name: "Hong Kong (HKT)", offset: "+08:00" },
  { id: "Asia/Shanghai", name: "Shanghai (CST)", offset: "+08:00" },
  { id: "Asia/Tokyo", name: "Tokyo (JST)", offset: "+09:00" },
  { id: "Asia/Seoul", name: "Seoul (KST)", offset: "+09:00" },
  { id: "Australia/Sydney", name: "Sydney (AEST/AEDT)", offset: "+10:00" },
  { id: "Pacific/Auckland", name: "Auckland (NZST/NZDT)", offset: "+12:00" },
];

const LOCALES: { code: string; name: string }[] = [
  { code: "en-US", name: "English (US)" },
  { code: "en-GB", name: "English (UK)" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "ja-JP", name: "Japanese" },
  { code: "ko-KR", name: "Korean" },
  { code: "de-DE", name: "German" },
  { code: "fr-FR", name: "French" },
  { code: "es-ES", name: "Spanish" },
  { code: "pt-BR", name: "Portuguese (Brazil)" },
  { code: "ru-RU", name: "Russian" },
  { code: "ar-SA", name: "Arabic" },
];

export function getCommonTimezones(): TimezoneInfo[] {
  return COMMON_TIMEZONES;
}

export function getLocales(): { code: string; name: string }[] {
  return LOCALES;
}

export function parseTimeInput(input: string): TimeParseResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { success: false, error: "Empty input" };
  }

  // Try Unix timestamp (seconds) - 10 digits
  if (/^\d{10}$/.test(trimmed)) {
    const timestamp = Number.parseInt(trimmed, 10);
    const date = new Date(timestamp * 1000);
    if (!Number.isNaN(date.getTime())) {
      return { success: true, date, inputType: "unix_seconds" };
    }
  }

  // Try Unix timestamp (milliseconds) - 13 digits
  if (/^\d{13}$/.test(trimmed)) {
    const timestamp = Number.parseInt(trimmed, 10);
    const date = new Date(timestamp);
    if (!Number.isNaN(date.getTime())) {
      return { success: true, date, inputType: "unix_millis" };
    }
  }

  // Try numeric (could be seconds or millis based on magnitude)
  if (/^\d+$/.test(trimmed)) {
    const num = Number.parseInt(trimmed, 10);
    // If > 1e12, treat as milliseconds; otherwise seconds
    const date = num > 1e12 ? new Date(num) : new Date(num * 1000);
    if (!Number.isNaN(date.getTime())) {
      return {
        success: true,
        date,
        inputType: num > 1e12 ? "unix_millis" : "unix_seconds",
      };
    }
  }

  // Try ISO 8601 format
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    const date = new Date(trimmed);
    if (!Number.isNaN(date.getTime())) {
      return { success: true, date, inputType: "iso" };
    }
  }

  // Try general date parsing
  const date = new Date(trimmed);
  if (!Number.isNaN(date.getTime())) {
    return { success: true, date, inputType: "date_string" };
  }

  return { success: false, error: "Unable to parse input as a valid date/time" };
}

export function toUnixSeconds(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

export function toUnixMillis(date: Date): number {
  return date.getTime();
}

export function formatISO(date: Date): string {
  return date.toISOString();
}

export function formatISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function formatISOTime(date: Date): string {
  return date.toISOString().split("T")[1].replace("Z", "");
}

export function formatUTC(date: Date): string {
  return date.toUTCString();
}

export function formatLocal(date: Date): string {
  return date.toString();
}

export function formatBeijingTime(date: Date): string {
  const beijingTime = new Date(date.getTime() + 8 * 60 * 60 * 1000);
  const year = beijingTime.getUTCFullYear();
  const month = String(beijingTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(beijingTime.getUTCDate()).padStart(2, "0");
  const hours = String(beijingTime.getUTCHours()).padStart(2, "0");
  const minutes = String(beijingTime.getUTCMinutes()).padStart(2, "0");
  const seconds = String(beijingTime.getUTCSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatRFC2822(date: Date): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = days[date.getDay()];
  const dateNum = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const offset = -date.getTimezoneOffset();
  const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
  const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, "0");
  const offsetSign = offset >= 0 ? "+" : "-";

  return `${day}, ${dateNum} ${month} ${year} ${hours}:${minutes}:${seconds} ${offsetSign}${offsetHours}${offsetMinutes}`;
}

export function formatRelative(date: Date, baseDate: Date = new Date()): string {
  const diffMs = date.getTime() - baseDate.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  const isFuture = diffMs > 0;
  const abs = Math.abs;

  if (abs(diffSeconds) < 60) {
    if (abs(diffSeconds) < 5) return "just now";
    return isFuture ? `in ${abs(diffSeconds)} seconds` : `${abs(diffSeconds)} seconds ago`;
  }

  if (abs(diffMinutes) < 60) {
    const unit = abs(diffMinutes) === 1 ? "minute" : "minutes";
    return isFuture ? `in ${abs(diffMinutes)} ${unit}` : `${abs(diffMinutes)} ${unit} ago`;
  }

  if (abs(diffHours) < 24) {
    const unit = abs(diffHours) === 1 ? "hour" : "hours";
    return isFuture ? `in ${abs(diffHours)} ${unit}` : `${abs(diffHours)} ${unit} ago`;
  }

  if (abs(diffDays) < 7) {
    const unit = abs(diffDays) === 1 ? "day" : "days";
    return isFuture ? `in ${abs(diffDays)} ${unit}` : `${abs(diffDays)} ${unit} ago`;
  }

  if (abs(diffWeeks) < 4) {
    const unit = abs(diffWeeks) === 1 ? "week" : "weeks";
    return isFuture ? `in ${abs(diffWeeks)} ${unit}` : `${abs(diffWeeks)} ${unit} ago`;
  }

  if (abs(diffMonths) < 12) {
    const unit = abs(diffMonths) === 1 ? "month" : "months";
    return isFuture ? `in ${abs(diffMonths)} ${unit}` : `${abs(diffMonths)} ${unit} ago`;
  }

  const unit = abs(diffYears) === 1 ? "year" : "years";
  return isFuture ? `in ${abs(diffYears)} ${unit}` : `${abs(diffYears)} ${unit} ago`;
}

export function getTimeConversions(date: Date): TimeConversion {
  return {
    unixSeconds: toUnixSeconds(date),
    unixMillis: toUnixMillis(date),
    iso8601: formatISO(date),
    isoDate: formatISODate(date),
    isoTime: formatISOTime(date),
    utc: formatUTC(date),
    local: formatLocal(date),
    relative: formatRelative(date),
    rfc2822: formatRFC2822(date),
    beijing: formatBeijingTime(date),
  };
}

export function getDateMetadata(date: Date): DateMetadata {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate week number (ISO 8601)
  const startOfYear = new Date(year, 0, 1);
  const daysSinceStart = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  const weekNumber = Math.ceil((daysSinceStart + startOfYear.getDay() + 1) / 7);

  // Day of year
  const dayOfYear = daysSinceStart + 1;

  // Quarter
  const quarter = Math.ceil(month / 3);

  // Leap year check
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  // Days in month
  const daysInMonth = new Date(year, month, 0).getDate();

  // Weekend check
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Timezone info
  const timezoneOffset = date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const offsetMinutes = Math.abs(timezoneOffset) % 60;
  const offsetSign = timezoneOffset <= 0 ? "+" : "-";
  const timezone = `UTC${offsetSign}${String(offsetHours).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;

  return {
    year,
    month,
    day,
    weekday: weekdays[dayOfWeek],
    weekdayShort: weekdaysShort[dayOfWeek],
    weekNumber,
    dayOfYear,
    quarter,
    isLeapYear,
    daysInMonth,
    isWeekend,
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds(),
    timezone,
    timezoneOffset,
  };
}

export function getLocalizedFormats(date: Date): LocalizedFormat[] {
  return LOCALES.map((locale) => {
    try {
      return {
        locale: locale.code,
        localeName: locale.name,
        date: date.toLocaleDateString(locale.code, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: date.toLocaleTimeString(locale.code, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        dateTime: date.toLocaleString(locale.code, {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };
    } catch {
      return {
        locale: locale.code,
        localeName: locale.name,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        dateTime: date.toLocaleString(),
      };
    }
  });
}

export function convertToTimezone(date: Date, timezone: string): string {
  try {
    return date.toLocaleString("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  } catch {
    return date.toLocaleString();
  }
}

export function getTimezoneConversions(date: Date): { timezone: TimezoneInfo; time: string }[] {
  return COMMON_TIMEZONES.map((tz) => ({
    timezone: tz,
    time: convertToTimezone(date, tz.id),
  }));
}

export function calculateDuration(date1: Date, date2: Date): Duration {
  const diffMs = Math.abs(date2.getTime() - date1.getTime());

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const years = Math.floor(totalDays / 365);
  const remainingDaysAfterYears = totalDays % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const days = remainingDaysAfterYears % 30;
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  // Build human readable string
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years !== 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} month${months !== 1 ? "s" : ""}`);
  if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    totalMilliseconds: diffMs,
    humanReadable: parts.join(", "),
  };
}

export function addTime(
  date: Date,
  amount: number,
  unit: "years" | "months" | "days" | "hours" | "minutes" | "seconds"
): Date {
  const result = new Date(date);

  switch (unit) {
    case "years":
      result.setFullYear(result.getFullYear() + amount);
      break;
    case "months":
      result.setMonth(result.getMonth() + amount);
      break;
    case "days":
      result.setDate(result.getDate() + amount);
      break;
    case "hours":
      result.setHours(result.getHours() + amount);
      break;
    case "minutes":
      result.setMinutes(result.getMinutes() + amount);
      break;
    case "seconds":
      result.setSeconds(result.getSeconds() + amount);
      break;
  }

  return result;
}

export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

export function startOfWeek(date: Date, weekStartsOn: 0 | 1 = 0): Date {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  result.setDate(result.getDate() - diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function startOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function startOfYear(date: Date): Date {
  const result = new Date(date);
  result.setMonth(0, 1);
  result.setHours(0, 0, 0, 0);
  return result;
}
