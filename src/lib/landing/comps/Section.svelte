<script lang="ts">
  import type { Snippet } from "svelte";

  interface SectionProps {
    id?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    children?: Snippet;
    class?: string;
  }
  let {
    id,
    title,
    subtitle,
    description,
    children,
    class: _class,
  }: SectionProps = $props();
</script>

<section>
  <div class={_class}>
    <div class="relative container mx-auto px-4 md:pb-16 pt-16 max-w-7xl">
      <div class="text-center space-y-4 pb-6 mx-auto">
        <h2
          class="text-sm text-primary font-mono font-medium tracking-wider uppercase"
        >
          {title}
        </h2>
        <h3
          class="mx-auto mt-4 max-w-xs text-2xl font-semibold sm:max-w-none sm:text-4xl md:text-5xl"
        >
          {subtitle}
        </h3>
        <p class="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
      {@render children?.()}
    </div>
  </div>
</section>
