<script lang="ts">
  import { codeToHtml } from "shiki";

  interface Props {
    code: string;
    lang?: string;
    class?: string;
  }
  
  let { code, lang = "typescript", class: className = "" }: Props = $props();

  let htmlCode = $state("");

  // Re-highlight code whenever the code or lang changes
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
</script>

<div class={["text-sm", className]}>
  {#if htmlCode}
    {@html htmlCode}
  {:else}
    <pre class="font-mono whitespace-pre-wrap break-words opacity-50"><code>{code}</code></pre>
  {/if}
</div>

<style>
  :global(.shiki) {
    background-color: transparent !important;
  }
</style>

