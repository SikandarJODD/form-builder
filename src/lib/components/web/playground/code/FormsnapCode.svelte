<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { form_generator } from "$lib/form-generator/form-gen.svelte";
  import Copy from "lucide-svelte/icons/copy";
  import { watch } from "runed";
  import { codeToHtml } from "shiki";
  import { onMount } from "svelte";

  type CodeType = "client" | "server";
  let codeType: CodeType = $state("client");
  let serverCodeContent = $derived(form_generator.serverCode);
  let clientCodeContent = $derived(form_generator.formsnapCode);

  let htmlServerCode = $state(""); // highlighted html code
  let htmlClientCode = $state(""); // highlighted html code
  let getServerCode = async () => {
    htmlServerCode = await codeToHtml(form_generator.serverCode, {
      lang: "typescript",
      theme: "vesper",
    });
  };
  let getClientCode = async () => {
    htmlClientCode = await codeToHtml(clientCodeContent, {
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
    () => clientCodeContent,
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

<div class="relative border rounded-lg">
  <div class="absolute top-2 right-3 flex space-x-1.5">
    <div class="flex ">
      <Button
        size="sm"
        variant={codeType === "client" ? "default" : "secondary"}
        onclick={() => (codeType = "client")}
        class="rounded-s-lg rounded-r-none">Client</Button
      >
      <Button
        size="sm"
        variant={codeType === "server" ? "default" : "secondary"}
        onclick={() => (codeType = "server")}
        class="rounded-e-lg rounded-l-none">Server</Button
      >
    </div>
    <Button
      class="rounded-lg"
      variant="outline"
      size="icon"
      onclick={handleCopy}
    >
      <div
        class={[
          "transition-all",
          copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
        ]}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          stroke-width={1.2}
          fill="none"
          aria-hidden="true"
        >
          <path
            fill="#10B981"
            d="M14.548 3.488a.75.75 0 0 1-.036 1.06l-8.572 8a.75.75 0 0 1-1.023 0l-3.429-3.2a.75.75 0 0 1 1.024-1.096l2.917 2.722 8.06-7.522a.75.75 0 0 1 1.06.036Z"
          />
        </svg>
      </div>
      <div
        class={[
          "absolute transition-all",
          copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
        ]}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path
            d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
          /></svg
        >
      </div>
    </Button>
  </div>
  <div class="overflow-scroll scrollbar max-h-[420px] p-4">
    {#if codeType === "client"}
      <div>
        {@html htmlClientCode}
      </div>
    {:else}
      <div>
        {@html htmlServerCode}
      </div>
    {/if}
  </div>
</div>

<style>
  :global(pre) {
    background-color: transparent !important;
  }
</style>
