<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { form_generator } from "$lib/form-generator/form-gen.svelte";
  import { codeToHtml } from "shiki";
  import { onMount } from "svelte";
  import { watch } from "runed";

  let codeContent = $derived(form_generator.zodSchema); // input code
  let valibotContent = $derived(form_generator.valibotSchema); // input code
  let htmlCode = $state(""); // highlighted html code

  let value = $derived(form_generator.adapter);
  let getCode = async () => {
    if (value === "zod") {
      htmlCode = await codeToHtml(form_generator.zodSchema, {
        lang: "typescript",
        theme: "vesper",
      });
    } else if (value === "valibot") {
      htmlCode = await codeToHtml(form_generator.valibotSchema, {
        lang: "typescript",
        theme: "vesper",
      });
    }
  };

  onMount(async () => await getCode());
  watch(
    () => form_generator.zodSchema,
    () => {
      getCode();
    }
  );
  watch(
    () => form_generator.adapter,
    () => {
      getCode();
    }
  );

  let copied = $state(false);

  function handleCopy() {
    copied = true;
    if (value === "zod") {
      navigator.clipboard.writeText(codeContent);
    } else {
      navigator.clipboard.writeText(valibotContent);
    }
    setTimeout(() => (copied = false), 1500);
  }
</script>

<div
  class="relative overflow-scroll scrollbar border w-full pl-4 pr-1 rounded-lg bg-zinc-900 dark:bg-transparent"
>
  <div class="sticky top-2 flex justify-end left-0">
    <Button variant="outline" size="icon" onclick={handleCopy}>
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
  <div class="-mt-5 text-sm">
    <span>{@html htmlCode}</span>
  </div>
</div>

<style>
  /* :global(.shiki) {
    background-color: transparent;
  } */
</style>
