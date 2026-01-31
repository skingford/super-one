<script lang="ts">
  import { cn } from "$lib/utils/cn";

  interface Props {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    rows?: number;
    class?: string;
    id?: string;
    name?: string;
    oninput?: (e: Event) => void;
    onfocus?: (e: FocusEvent) => void;
    onblur?: (e: FocusEvent) => void;
  }

  let {
    value = $bindable(""),
    placeholder = "",
    disabled = false,
    readonly = false,
    required = false,
    rows = 4,
    class: className = "",
    id,
    name,
    oninput,
    onfocus,
    onblur,
  }: Props = $props();

  const classes = $derived(
    cn(
      "flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm",
      "placeholder:text-muted-foreground",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "transition-all duration-200 resize-none",
      className
    )
  );
</script>

<textarea
  bind:value
  {placeholder}
  {disabled}
  {readonly}
  {required}
  {rows}
  {id}
  {name}
  class={classes}
  {oninput}
  {onfocus}
  {onblur}
></textarea>
