<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { form_generator } from "$lib/form-generator/form-gen.svelte";
  import { codeToHtml } from "shiki";
  import { onMount } from "svelte";
  import { watch } from "runed";

  let codeContent = $derived(form_generator.zodSchema); // input code
  let valibotContent = $derived(form_generator.valibotSchema); // input code
  let htmlCode = $state(""); // highlighted html code
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
    () => value,
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

  import * as Select from "$lib/components/ui/select/index";
  import Label from "$lib/components/ui/label/label.svelte";

  let all_schema = [
    { value: "zod", label: "ZOD" },
    {
      value: "valibot",
      label: "Valibot",
    },
  ];

  let value = $state("zod");

  let triggerContent = $derived(
    all_schema.find((f) => f.value === value)?.label ?? "Schema"
  );
  let updateAdapter = () => {
    form_generator.adapter = value;
  };
</script>

<div class="relative border w-full p-4 rounded-lg">
  <span>{@html htmlCode}</span>
  <div class="absolute top-2 right-2 flex items-center space-x-2">
    <div class="relative flex items-center space-x-2">
      <Label for="schema">Schema</Label>
      <Select.Root
        name="schema"
        type="single"
        bind:value
        onValueChange={updateAdapter}
      >
        <Select.Trigger class="w-[120px]">
          {triggerContent}
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each all_schema as schema}
              <Select.Item value={schema.value} label={schema.label} />
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
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
          class="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 2.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5ZM10 1H3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm3 5.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5v-1H5v1a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1v1.5Z"
          />
        </svg>
      </div>
    </Button>
  </div>
</div>

<style>
  /* :global(.shiki) {
    background-color: transparent;
  } */
</style>
