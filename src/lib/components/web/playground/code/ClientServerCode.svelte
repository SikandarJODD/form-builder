<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { form_generator } from "$lib/form-generator/form-gen.svelte";
  import { watch } from "runed";
  import { codeToHtml } from "shiki";
  import { onMount } from "svelte";

  type CodeType = "client" | "server";
  let codeType: CodeType = $state("client");
  let serverCodeContent = $derived(form_generator.serverCode);
  let clientCodeContent = form_generator.clientCode;

  let htmlServerCode = $state(""); // highlighted html code
  let htmlClientCode = $state(""); // highlighted html code
  let getServerCode = async () => {
    htmlServerCode = await codeToHtml(form_generator.serverCode, {
      lang: "typescript",
      theme: "vesper",
    });
  };
  let getClientCode = async () => {
    htmlClientCode = await codeToHtml(form_generator.clientCode, {
      lang: "svelte",
      theme: "vesper",
    });
  };

  onMount(async () => await getServerCode());
  watch(
    () => form_generator.serverCode,
    () => {
      getServerCode();
    }
  );
  watch(
    () => form_generator.clientCode,
    () => {
      getClientCode();
    }
  );

  let copied = $state(false);

  function handleCopy() {
    copied = true;
    if (codeType === "client") {
      navigator.clipboard.writeText(clientCodeContent);
    } else {
      navigator.clipboard.writeText(serverCodeContent);
    }
    setTimeout(() => (copied = false), 1500);
  }
</script>

<div class="relative border rounded-lg p-4">
  <div class="absolute top-2 right-2">
    <Button size="sm" variant="secondary" onclick={() => (codeType = "client")}
      >Client</Button
    >
    <Button size="sm" variant="secondary" onclick={() => (codeType = "server")}
      >Server</Button
    >
    <Button variant="secondary" size="sm" onclick={handleCopy}>
      {copied ? "Copied" : "Copy"}
    </Button>
  </div>
  <div class="overflow-scroll scrollbar">
    <div>
      {#if codeType === "client"}
        {@html htmlClientCode}
      {:else}
        {@html htmlServerCode}
      {/if}
    </div>
  </div>
</div>

<style>
  :global(pre) {
    background-color: transparent !important;
  }
</style>
