<script lang="ts">
import { Copy, Clock, Trash2, RefreshCw, Globe, Calendar, Timer, Calculator, Plus, Minus } from "lucide-svelte";
import Button from "$components/ui/Button.svelte";
import Toast from "$components/ui/Toast.svelte";
import {
	parseTimeInput,
	getTimeConversions,
	getDateMetadata,
	getLocalizedFormats,
	getTimezoneConversions,
	calculateDuration,
	getCommonTimezones,
	addTime,
	type TimeConversion,
	type DateMetadata,
	type LocalizedFormat,
	type TimezoneInfo,
} from "$utils/time";
import { copyToClipboard } from "$utils/clipboard";

let input = $state("");
let currentDate = $state<Date | null>(null);
let error = $state("");
let showToast = $state(false);
let toastMessage = $state("");
let toastType = $state<"success" | "error">("success");
let activeTab = $state<"formats" | "timezones" | "locales" | "metadata" | "calc">("formats");
let selectedTimezone = $state("UTC");

// Calculator state
let calcAmount = $state(1);
let calcUnit = $state<"years" | "months" | "days" | "hours" | "minutes" | "seconds">("days");
let calculatedDate = $state<Date | null>(null);

function showNotification(message: string, type: "success" | "error" = "success") {
	toastMessage = message;
	toastType = type;
	showToast = true;
}

function handleParse() {
	if (!input.trim()) {
		error = "Please enter a timestamp or date";
		currentDate = null;
		return;
	}

	const result = parseTimeInput(input);
	if (result.success && result.date) {
		currentDate = result.date;
		error = "";
		showNotification(`Parsed as ${result.inputType?.replace("_", " ")}`);
	} else {
		error = result.error || "Unable to parse input";
		currentDate = null;
		showNotification(error, "error");
	}
}

function handleNow() {
	currentDate = new Date();
	input = currentDate.getTime().toString();
	error = "";
	showNotification("Using current time");
}

function handleClear() {
	input = "";
	currentDate = null;
	error = "";
}

async function handleCopy(text: string, label: string) {
	const success = await copyToClipboard(text);
	showNotification(success ? `Copied ${label}` : "Failed to copy", success ? "success" : "error");
}

function handleCalculate() {
	if (!currentDate) {
		showNotification("Please enter a date first", "error");
		return;
	}
	calculatedDate = addTime(currentDate, calcAmount, calcUnit);
	const sign = calcAmount >= 0 ? "+" : "";
	showNotification(`${sign}${calcAmount} ${calcUnit} calculated`);
}

function handleQuickCalc(amount: number, unit: typeof calcUnit) {
	if (!currentDate) {
		showNotification("Please enter a date first", "error");
		return;
	}
	calcAmount = amount;
	calcUnit = unit;
	calculatedDate = addTime(currentDate, amount, unit);
	const sign = amount >= 0 ? "+" : "";
	showNotification(`${sign}${amount} ${unit} applied`);
}

function useCalculatedAsInput() {
	if (calculatedDate) {
		currentDate = calculatedDate;
		input = calculatedDate.getTime().toString();
		calculatedDate = null;
		showNotification("Result set as input");
	}
}

// Auto-parse on input change
$effect(() => {
	if (input.trim()) {
		const result = parseTimeInput(input);
		if (result.success && result.date) {
			currentDate = result.date;
			error = "";
		}
	}
});

let conversions = $derived.by(() => {
	if (!currentDate) return null;
	return getTimeConversions(currentDate);
});

let metadata = $derived.by(() => {
	if (!currentDate) return null;
	return getDateMetadata(currentDate);
});

let localizedFormats = $derived.by(() => {
	if (!currentDate) return [];
	return getLocalizedFormats(currentDate);
});

let timezoneConversions = $derived.by(() => {
	if (!currentDate) return [];
	return getTimezoneConversions(currentDate);
});

let durationFromNow = $derived.by(() => {
	if (!currentDate) return null;
	return calculateDuration(currentDate, new Date());
});

const timezones = getCommonTimezones();

interface ConversionItem {
	label: string;
	value: string;
	key: string;
}

let conversionItems = $derived.by((): ConversionItem[] => {
	if (!conversions) return [];
	return [
		{ label: "Unix (seconds)", value: conversions.unixSeconds.toString(), key: "unix_s" },
		{ label: "Unix (milliseconds)", value: conversions.unixMillis.toString(), key: "unix_ms" },
		{ label: "ISO 8601", value: conversions.iso8601, key: "iso" },
		{ label: "ISO Date", value: conversions.isoDate, key: "iso_date" },
		{ label: "ISO Time", value: conversions.isoTime, key: "iso_time" },
		{ label: "Beijing (UTC+8)", value: conversions.beijing, key: "beijing" },
		{ label: "UTC", value: conversions.utc, key: "utc" },
		{ label: "Local", value: conversions.local, key: "local" },
		{ label: "RFC 2822", value: conversions.rfc2822, key: "rfc" },
		{ label: "Relative", value: conversions.relative, key: "relative" },
	];
});

let calculatedConversions = $derived.by(() => {
	if (!calculatedDate) return null;
	return getTimeConversions(calculatedDate);
});

let calcResultItems = $derived.by((): ConversionItem[] => {
	if (!calculatedConversions) return [];
	return [
		{ label: "Unix (seconds)", value: calculatedConversions.unixSeconds.toString(), key: "calc_unix_s" },
		{ label: "Unix (milliseconds)", value: calculatedConversions.unixMillis.toString(), key: "calc_unix_ms" },
		{ label: "ISO 8601", value: calculatedConversions.iso8601, key: "calc_iso" },
		{ label: "Beijing (UTC+8)", value: calculatedConversions.beijing, key: "calc_beijing" },
		{ label: "Local", value: calculatedConversions.local, key: "calc_local" },
		{ label: "Relative", value: calculatedConversions.relative, key: "calc_relative" },
	];
});
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <!-- Input Panel -->
  <div class="space-y-4">
    <div class="flex items-center justify-between gap-4">
      <h3 class="font-mono font-semibold text-sm text-text-muted uppercase tracking-wider">
        Input
      </h3>
    </div>

    <div class="space-y-3">
      <div class="relative">
        <input
          type="text"
          bind:value={input}
          placeholder="Enter timestamp or date (e.g., 1706745600, 2024-02-01T00:00:00Z)"
          class="
            w-full h-12 px-4
            bg-surface-elevated
            border border-border
            rounded-md
            font-mono text-sm
            text-text
            placeholder:text-text-subtle
            focus:outline-none focus:border-accent
            transition-colors duration-200
          "
          onkeydown={(e) => e.key === "Enter" && handleParse()}
        />
      </div>

      <!-- Quick Examples -->
      <div class="flex flex-wrap gap-2">
        <button
          onclick={() => { input = Math.floor(Date.now() / 1000).toString(); handleParse(); }}
          class="
            px-2 py-1
            font-mono text-xs
            bg-surface-elevated
            border border-border-subtle
            rounded-sm
            text-text-muted
            hover:text-text hover:border-border
            transition-colors duration-200
          "
        >
          Unix (s)
        </button>
        <button
          onclick={() => { input = Date.now().toString(); handleParse(); }}
          class="
            px-2 py-1
            font-mono text-xs
            bg-surface-elevated
            border border-border-subtle
            rounded-sm
            text-text-muted
            hover:text-text hover:border-border
            transition-colors duration-200
          "
        >
          Unix (ms)
        </button>
        <button
          onclick={() => { input = new Date().toISOString(); handleParse(); }}
          class="
            px-2 py-1
            font-mono text-xs
            bg-surface-elevated
            border border-border-subtle
            rounded-sm
            text-text-muted
            hover:text-text hover:border-border
            transition-colors duration-200
          "
        >
          ISO 8601
        </button>
        <button
          onclick={() => { input = "2024-01-01"; handleParse(); }}
          class="
            px-2 py-1
            font-mono text-xs
            bg-surface-elevated
            border border-border-subtle
            rounded-sm
            text-text-muted
            hover:text-text hover:border-border
            transition-colors duration-200
          "
        >
          Date only
        </button>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-2">
      <Button onclick={handleParse}>
        <Clock size={16} />
        Parse
      </Button>
      <Button variant="secondary" onclick={handleNow}>
        <RefreshCw size={16} />
        Now
      </Button>
      <Button variant="ghost" onclick={handleClear}>
        <Trash2 size={16} />
        Clear
      </Button>
    </div>

    <!-- Input Help -->
    <div
      class="
        p-3
        bg-surface-elevated
        border border-border-subtle
        rounded-md
      "
    >
      <p class="font-mono text-xs font-medium text-text-muted mb-2">
        Supported formats:
      </p>
      <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-text-subtle">
        <span class="flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-accent"></span>
          Unix timestamp (seconds)
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-accent"></span>
          Unix timestamp (ms)
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-accent"></span>
          ISO 8601 format
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-accent"></span>
          Date strings
        </span>
      </div>
    </div>

    <!-- Duration from Now -->
    {#if durationFromNow && currentDate}
      <div
        class="
          p-4
          bg-surface-elevated
          border border-border
          rounded-md
        "
      >
        <div class="flex items-center gap-2 mb-3">
          <Timer size={16} class="text-accent" />
          <span class="font-mono text-xs font-medium text-text-muted uppercase tracking-wider">
            Duration from now
          </span>
        </div>
        <p class="font-mono text-sm text-text">
          {durationFromNow.humanReadable}
        </p>
        <div class="mt-2 grid grid-cols-2 gap-2 text-xs text-text-subtle">
          <span><span class="text-accent">{durationFromNow.totalDays.toLocaleString()}</span> total days</span>
          <span><span class="text-accent">{durationFromNow.totalHours.toLocaleString()}</span> total hours</span>
        </div>
      </div>
    {/if}
  </div>

  <!-- Output Panel -->
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="font-mono font-semibold text-sm text-text-muted uppercase tracking-wider">
        Output
      </h3>
      {#if currentDate}
        <span class="font-mono text-xs text-text-subtle">
          {currentDate.toLocaleDateString()}
        </span>
      {/if}
    </div>

    {#if error}
      <div
        class="
          min-h-[400px]
          flex items-center justify-center
          bg-surface-elevated
          border border-danger/30
          rounded-md
          p-6
        "
      >
        <div class="text-center max-w-sm">
          <div
            class="
              w-12 h-12 mx-auto mb-4
              flex items-center justify-center
              rounded-full
              bg-danger/10
              text-danger
            "
          >
            <Clock size={24} />
          </div>
          <p class="font-mono text-sm text-danger">{error}</p>
        </div>
      </div>
    {:else if currentDate}
      <!-- Tabs -->
      <div class="flex gap-1 p-1 bg-surface-elevated rounded-md border border-border">
        {#each [
          { id: "formats", label: "Formats", icon: Clock },
          { id: "timezones", label: "Zones", icon: Globe },
          { id: "locales", label: "Locales", icon: Globe },
          { id: "metadata", label: "Meta", icon: Calendar },
          { id: "calc", label: "Calc", icon: Calculator },
        ] as tab}
          <button
            onclick={() => activeTab = tab.id as typeof activeTab}
            class="
              flex-1 px-3 py-2
              font-mono text-xs font-medium
              rounded-sm
              transition-colors duration-200
              {activeTab === tab.id
                ? 'bg-accent text-background'
                : 'text-text-muted hover:text-text hover:bg-surface'}
            "
          >
            {tab.label}
          </button>
        {/each}
      </div>

      <!-- Tab Content -->
      <div
        class="
          min-h-[350px] max-h-[500px]
          bg-surface-elevated
          border border-border
          rounded-md
          overflow-auto
        "
      >
        {#if activeTab === "formats"}
          <div class="divide-y divide-border-subtle">
            {#each conversionItems as item}
              <div class="flex items-center justify-between p-3 hover:bg-surface transition-colors">
                <div class="min-w-0 flex-1">
                  <p class="font-mono text-xs text-text-muted mb-1">{item.label}</p>
                  <p class="font-mono text-sm text-text truncate">{item.value}</p>
                </div>
                <button
                  onclick={() => handleCopy(item.value, item.label)}
                  class="
                    ml-3 p-2
                    rounded-sm
                    text-text-muted
                    hover:text-accent hover:bg-surface
                    transition-colors duration-200
                  "
                >
                  <Copy size={14} />
                </button>
              </div>
            {/each}
          </div>

        {:else if activeTab === "timezones"}
          <div class="divide-y divide-border-subtle">
            {#each timezoneConversions as tz}
              <div class="flex items-center justify-between p-3 hover:bg-surface transition-colors">
                <div class="min-w-0 flex-1">
                  <p class="font-mono text-xs text-text-muted mb-1">{tz.timezone.name}</p>
                  <p class="font-mono text-sm text-text">{tz.time}</p>
                </div>
                <button
                  onclick={() => handleCopy(tz.time, tz.timezone.name)}
                  class="
                    ml-3 p-2
                    rounded-sm
                    text-text-muted
                    hover:text-accent hover:bg-surface
                    transition-colors duration-200
                  "
                >
                  <Copy size={14} />
                </button>
              </div>
            {/each}
          </div>

        {:else if activeTab === "locales"}
          <div class="divide-y divide-border-subtle">
            {#each localizedFormats as locale}
              <div class="flex items-center justify-between p-3 hover:bg-surface transition-colors">
                <div class="min-w-0 flex-1">
                  <p class="font-mono text-xs text-text-muted mb-1">{locale.localeName}</p>
                  <p class="font-mono text-sm text-text">{locale.dateTime}</p>
                </div>
                <button
                  onclick={() => handleCopy(locale.dateTime, locale.localeName)}
                  class="
                    ml-3 p-2
                    rounded-sm
                    text-text-muted
                    hover:text-accent hover:bg-surface
                    transition-colors duration-200
                  "
                >
                  <Copy size={14} />
                </button>
              </div>
            {/each}
          </div>

        {:else if activeTab === "metadata" && metadata}
          <div class="p-4 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-3">
                <div>
                  <p class="font-mono text-xs text-text-muted mb-1">Year</p>
                  <p class="font-mono text-lg text-accent">{metadata.year}</p>
                </div>
                <div>
                  <p class="font-mono text-xs text-text-muted mb-1">Month</p>
                  <p class="font-mono text-lg text-text">{metadata.month}</p>
                </div>
                <div>
                  <p class="font-mono text-xs text-text-muted mb-1">Day</p>
                  <p class="font-mono text-lg text-text">{metadata.day}</p>
                </div>
                <div>
                  <p class="font-mono text-xs text-text-muted mb-1">Weekday</p>
                  <p class="font-mono text-sm text-text">{metadata.weekday}</p>
                </div>
              </div>
              <div class="space-y-3">
                <div>
                  <p class="font-mono text-xs text-text-muted mb-1">Week Number</p>
                  <p class="font-mono text-lg text-text">{metadata.weekNumber}</p>
                </div>
                <div>
                  <p class="font-mono text-xs text-text-muted mb-1">Day of Year</p>
                  <p class="font-mono text-lg text-text">{metadata.dayOfYear}</p>
                </div>
                <div>
                  <p class="font-mono text-xs text-text-muted mb-1">Quarter</p>
                  <p class="font-mono text-lg text-text">Q{metadata.quarter}</p>
                </div>
                <div>
                  <p class="font-mono text-xs text-text-muted mb-1">Timezone</p>
                  <p class="font-mono text-sm text-text">{metadata.timezone}</p>
                </div>
              </div>
            </div>

            <div class="pt-3 border-t border-border-subtle">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="font-mono text-xs text-text-muted mb-1">Time</p>
                  <p class="font-mono text-sm text-text">
                    {String(metadata.hour).padStart(2, "0")}:{String(metadata.minute).padStart(2, "0")}:{String(metadata.second).padStart(2, "0")}.{String(metadata.millisecond).padStart(3, "0")}
                  </p>
                </div>
                <div>
                  <p class="font-mono text-xs text-text-muted mb-1">Days in Month</p>
                  <p class="font-mono text-sm text-text">{metadata.daysInMonth}</p>
                </div>
              </div>
            </div>

            <div class="pt-3 border-t border-border-subtle flex flex-wrap gap-2">
              {#if metadata.isLeapYear}
                <span class="px-2 py-1 font-mono text-xs bg-success/10 text-success border border-success/30 rounded-full">
                  Leap Year
                </span>
              {/if}
              {#if metadata.isWeekend}
                <span class="px-2 py-1 font-mono text-xs bg-warning/10 text-warning border border-warning/30 rounded-full">
                  Weekend
                </span>
              {:else}
                <span class="px-2 py-1 font-mono text-xs bg-accent/10 text-accent border border-accent/30 rounded-full">
                  Weekday
                </span>
              {/if}
            </div>
          </div>

        {:else if activeTab === "calc"}
          <div class="p-4 space-y-4">
            <!-- Calculator Input -->
            <div>
              <p class="font-mono text-xs font-medium text-text-muted mb-3 uppercase tracking-wider">
                Add / Subtract Time
              </p>
              <div class="flex gap-2">
                <input
                  type="number"
                  bind:value={calcAmount}
                  class="
                    w-24 h-10 px-3
                    bg-surface
                    border border-border
                    rounded-sm
                    font-mono text-sm text-text
                    text-center
                    focus:outline-none focus:border-accent
                    transition-colors duration-200
                  "
                />
                <select
                  bind:value={calcUnit}
                  class="
                    flex-1 h-10 px-3
                    bg-surface
                    border border-border
                    rounded-sm
                    font-mono text-sm text-text
                    focus:outline-none focus:border-accent
                    transition-colors duration-200
                  "
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                  <option value="days">Days</option>
                  <option value="hours">Hours</option>
                  <option value="minutes">Minutes</option>
                  <option value="seconds">Seconds</option>
                </select>
                <button
                  onclick={handleCalculate}
                  class="
                    h-10 px-4
                    bg-accent text-background
                    font-mono text-sm font-medium
                    rounded-sm
                    hover:opacity-90
                    transition-opacity duration-200
                  "
                >
                  Calculate
                </button>
              </div>
            </div>

            <!-- Quick Presets -->
            <div>
              <p class="font-mono text-xs text-text-muted mb-2">Quick presets:</p>
              <div class="flex flex-wrap gap-2">
                {#each [
                  { label: "+1 day", amount: 1, unit: "days" },
                  { label: "+1 week", amount: 7, unit: "days" },
                  { label: "+1 month", amount: 1, unit: "months" },
                  { label: "+1 year", amount: 1, unit: "years" },
                  { label: "-1 day", amount: -1, unit: "days" },
                  { label: "-1 week", amount: -7, unit: "days" },
                  { label: "-1 month", amount: -1, unit: "months" },
                  { label: "+1 hour", amount: 1, unit: "hours" },
                  { label: "+30 min", amount: 30, unit: "minutes" },
                ] as preset}
                  <button
                    onclick={() => handleQuickCalc(preset.amount, preset.unit as typeof calcUnit)}
                    class="
                      px-2 py-1
                      font-mono text-xs
                      border rounded-sm
                      transition-colors duration-200
                      {preset.amount >= 0
                        ? 'bg-success/10 text-success border-success/30 hover:bg-success/20'
                        : 'bg-danger/10 text-danger border-danger/30 hover:bg-danger/20'}
                    "
                  >
                    {preset.label}
                  </button>
                {/each}
              </div>
            </div>

            <!-- Result -->
            {#if calculatedDate}
              <div class="pt-4 border-t border-border-subtle">
                <div class="flex items-center justify-between mb-3">
                  <p class="font-mono text-xs font-medium text-text-muted uppercase tracking-wider">
                    Result
                  </p>
                  <button
                    onclick={useCalculatedAsInput}
                    class="
                      px-3 py-1.5
                      font-mono text-xs
                      bg-accent/10 text-accent
                      border border-accent/30
                      rounded-sm
                      hover:bg-accent/20
                      transition-colors duration-200
                    "
                  >
                    Use as Input
                  </button>
                </div>
                <div class="space-y-2">
                  {#each calcResultItems as item}
                    <div class="flex items-center justify-between p-2 bg-surface rounded-sm">
                      <div class="min-w-0 flex-1">
                        <p class="font-mono text-xs text-text-muted">{item.label}</p>
                        <p class="font-mono text-sm text-text truncate">{item.value}</p>
                      </div>
                      <button
                        onclick={() => handleCopy(item.value, item.label)}
                        class="
                          ml-2 p-1.5
                          rounded-sm
                          text-text-muted
                          hover:text-accent
                          transition-colors duration-200
                        "
                      >
                        <Copy size={12} />
                      </button>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    {:else}
      <div
        class="
          min-h-[400px]
          flex items-center justify-center
          bg-surface-elevated
          border border-border
          rounded-md
        "
      >
        <div class="text-center">
          <Clock size={32} class="mx-auto mb-3 text-text-subtle" />
          <p class="font-mono text-sm text-text-subtle">
            Enter a timestamp or click "Now"
          </p>
        </div>
      </div>
    {/if}
  </div>
</div>

<Toast message={toastMessage} type={toastType} visible={showToast} ondismiss={() => (showToast = false)} />
