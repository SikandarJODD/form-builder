<script>
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { form_generator } from "$lib/form-generator/form-gen.svelte";

  import * as Select from "$lib/components/ui/select/index";
  import Label from "$lib/components/ui/label/label.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
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
  // Title and Description
  let headerfeauture = [
    {
      name: "Title",
      type: "title",
      category: "title",
      label: "Create Account",
      description: "",
      placeholder: "",
      min: 0,
      max: 0,
    },
    {
      name: "Desc",
      type: "desc",
      category: "desc",
      label: "Please fill out the form below to create an account.",
      description: "",
      placeholder: "",
      min: 0,
      max: 0,
    },
  ];

  let titlecheck = $state(false);
  let desccheck = $state(false);
  let addTitle = () => {
    if (titlecheck) {
      form_generator.add_input(headerfeauture[1], true);
      form_generator.add_input(headerfeauture[0], true);
    } else {
      let titleid = form_generator.selected_inputs.find(
        (f) => f.category === "title"
      );
      let descid = form_generator.selected_inputs.find(
        (f) => f.category === "desc"
      );
      if (titleid?.id) {
        form_generator.remove_input(titleid.id);
      }
      if (descid?.id) {
        form_generator.remove_input(descid.id);
      }
    }
  };
</script>

<div
  class="border-b border-accent py-2 sm:pb-5 px-4 sm:w-56 xl:shrink-0 sm:border-b-0 sm:border-r sm:min-h-[92vh]"
>
  <div class="space-y-2 flex flex-wrap sm:flex-nowrap sm:flex-col items-start">
    <div class="block w-full">
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
    <div
      class="flex items-center justify-start sm:justify-between space-x-2 border rounded-lg p-2 sm:w-full"
    >
      <div class="flex items-center space-x-2">
        <Checkbox
          bind:checked={titlecheck}
          id="title"
          aria-labelledby="title"
          onCheckedChange={addTitle}
        />
        <Label
          id="title"
          for="title"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Title & Desc
        </Label>
      </div>
      <!-- <div class="flex items-center space-x-2">
        <Checkbox
          bind:checked={desccheck}
          id="desc"
          aria-labelledby="desc"
          onCheckedChange={addDesc}
        />
        <Label
          id="desc"
          for="desc"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Description
        </Label>
      </div> -->
    </div>
    <div
      class="flex flex-wrap w-full flex-row sm:flex-nowrap sm:flex-col gap-2 sm:gap-0 sm:space-y-2 items-center lg:h-[74vh] overflow-scroll scrollbar"
    >
      {#each form_generator.inputs as item, index}
        <div class="flex items-center w-fit sm:w-full space-x-2">
          <Button
            onclick={() => form_generator.add_input(item)}
            class="rounded-full font-normal"
            data-umami-event={item.category}
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
</div>
