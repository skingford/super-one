<script lang="ts">
  import { cn } from "$lib/utils/cn";

  interface Props {
    type?: "text" | "email" | "password" | "number" | "search" | "url" | "tel";
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    class?: string;
    id?: string;
    name?: string;
    oninput?: (e: Event) => void;
    onkeydown?: (e: KeyboardEvent) => void;
    onfocus?: (e: FocusEvent) => void;
    onblur?: (e: FocusEvent) => void;
  }

  let {
    type = "text",
    value = $bindable(""),
    placeholder = "",
    disabled = false,
    readonly = false,
    required = false,
    class: className = "",
    id,
    name,
    oninput,
    onkeydown,
    onfocus,
    onblur,
  }: Props = $props();

  const classes = $derived(
    cn(
      "flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm",
      "placeholder:text-muted-foreground",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "transition-all duration-200",
      className
    )
  );
</script>

<input
  {type}
  bind:value
  {placeholder}
  {disabled}
  {readonly}
  {required}
  {id}
  {name}
  class={classes}
  {oninput}
  {onkeydown}
  {onfocus}
  {onblur}
/>
