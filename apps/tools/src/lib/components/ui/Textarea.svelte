<script lang="ts">
  interface Props {
    value?: string;
    placeholder?: string;
    rows?: number;
    readonly?: boolean;
    monospace?: boolean;
    class?: string;
    oninput?: (e: Event) => void;
  }

  let {
    value = $bindable(''),
    placeholder = '',
    rows = 10,
    readonly = false,
    monospace = true,
    class: className = '',
    oninput
  }: Props = $props();
</script>

<textarea
  bind:value
  {placeholder}
  {rows}
  {readonly}
  {oninput}
  class="
    w-full
    bg-[var(--color-surface-elevated)]
    border border-[var(--color-border)]
    rounded-[var(--radius-md)]
    px-4 py-3
    text-[var(--color-text)]
    placeholder:text-[var(--color-text-subtle)]
    focus:outline-none focus:border-[var(--color-accent)]
    transition-colors duration-200
    resize-none
    {monospace ? 'font-mono text-sm leading-relaxed' : 'font-sans'}
    {className}
  "
></textarea>
