<script>
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { form_generator } from "$lib/form-generator/form-gen.svelte";

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

<div
  class="border-b border-accent px-4 py-4 sm:px-6 lg:pl-8 xl:w-48 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6 min-h-[90vh]"
>
  <div class="space-y-2 flex flex-col items-start">
    <div>
      <Select.Root
        name="schema"
        type="single"
        bind:value
        onValueChange={updateAdapter}
      >
        <Select.Trigger
          class="w-[150px] rounded-full border-primary/35 border-dashed"
        >
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
    {#each form_generator.inputs as item, index}
      <div class="flex items-center w-full space-x-2">
        <Button
          onclick={() => form_generator.add_input(item)}
          class="rounded-full font-normal"
          size="sm"
          variant="outline"
        >
          {item.name}
        </Button>
        {#if item.isNew}
          <span
            class="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-normal text-green-400 ring-1 ring-inset ring-green-500/20"
            >New</span
          >
        {/if}
      </div>
    {/each}
  </div>
</div>
