<script lang="ts">
  import { codeToHtml } from "shiki";
  import { Copy, Check } from "@lucide/svelte/icons";
  import Button from "$lib/components/ui/button/button.svelte";

  interface Props {
    code: string;
    lang?: string;
    title?: string;
    showLineNumbers?: boolean;
    class?: string;
  }

  let {
    code,
    lang = "typescript",
    title,
    showLineNumbers = false,
    class: className = "",
  }: Props = $props();

  let htmlCode = $state("");
  let copied = $state(false);

  // Highlight code whenever the code or lang changes
  $effect(() => {
    const currentCode = code;
    const currentLang = lang;
    codeToHtml(currentCode, {
      lang: currentLang,
      theme: "vesper",
    }).then((html) => {
      htmlCode = html;
    });
  });

  function handleCopy() {
    copied = true;
    navigator.clipboard.writeText(code);
    setTimeout(() => (copied = false), 2000);
  }
</script>

<div class="not-prose relative my-4 {className}">
  {#if title}
    <div
      class="flex items-center justify-between rounded-t-lg border border-b-0 bg-muted px-4 py-2"
    >
      <span class="text-sm font-medium">{title}</span>
      <Button
        variant="ghost"
        size="sm"
        class="h-7 gap-2"
        onclick={handleCopy}
      >
        {#if copied}
          <Check class="h-3.5 w-3.5 text-green-500" />
          <span class="text-xs">Copied!</span>
        {:else}
          <Copy class="h-3.5 w-3.5" />
          <span class="text-xs">Copy</span>
        {/if}
      </Button>
    </div>
  {/if}

  <div
    class="relative overflow-x-auto rounded-lg border {title
      ? 'rounded-t-none'
      : ''}"
  >
    {#if !title}
      <div class="absolute right-2 top-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
          onclick={handleCopy}
        >
          {#if copied}
            <Check class="h-4 w-4 text-green-500" />
          {:else}
            <Copy class="h-4 w-4" />
          {/if}
        </Button>
      </div>
    {/if}

    <div class="overflow-x-auto bg-[#101010] p-4">
      {#if htmlCode}
        <div class="text-sm [&_.shiki]:bg-transparent">
          {@html htmlCode}
        </div>
      {:else}
        <pre
          class="font-mono text-sm text-muted-foreground"><code>{code}</code></pre>
      {/if}
    </div>
  </div>
</div>

<style>
  :global(.shiki) {
    background-color: transparent !important;
  }
</style>

