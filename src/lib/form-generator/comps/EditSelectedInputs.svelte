<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import Button from "$lib/components/ui/button/button.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import * as Select from "$lib/components/ui/select/index";
  import { form_generator, type InputType } from "../form-gen.svelte";
  let {
    item,
  }: {
    item: InputType;
  } = $props();
  // $effect(() => {
  //   if (
  //     item.max !== undefined &&
  //     item.min !== undefined &&
  //     item.max < item.min
  //   ) {
  //     item.max = item.min;
  //   }
  // });
  let isOpen = $state(false);
</script>

<Dialog.Root bind:open={isOpen}>
  <Dialog.Trigger
    onclick={() => (isOpen = true)}
    class={buttonVariants({ variant: "secondary", size: "icon" })}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-pencil"
      ><path
        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
      /><path d="m15 5 4 4" /></svg
    >
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Edit Password Field</Dialog.Title>
    </Dialog.Header>
    <div class="space-y-2.5">
      <div>
        <Label for="name">Label</Label>
        <Input type="text" id="name" bind:value={item.label} />
      </div>
      <div>
        <Label for="desc">Description</Label>
        <Input type="text" id="desc" bind:value={item.description} />
      </div>
      <div>
        <Label for="placeholder">Placeholder</Label>
        <Input type="text" id="placeholder" bind:value={item.placeholder} />
      </div>
      <div>
        <Label for="name">Zod Schema Name</Label>
        <Input
          type="text"
          id="name"
          bind:value={() => item.named_id,
          (v) => {
            return (item.named_id = v
              ?.toString()
              .replace(" ", "_")
              .toLowerCase());
          }}
        />
      </div>
      {#if item.type !== "number" && item.type !== "password" && item.type !== "boolean"}
        <div>
          <Label for="type">Type</Label>
          <Select.Root
            type="single"
            onValueChange={(value) => {
              item.type = value.toString();
            }}
          >
            <Select.Trigger class="w-[180px]">
              {item.type}
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.GroupHeading>Input Type</Select.GroupHeading>
                <Select.Item value="text" label="Text" />
                <Select.Item value="email" label="Email" />
                <Select.Item value="tel" label="Tel" />
                <Select.Item value="url" label="URL" />
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      {/if}
      {#if item.type !== "email" && item.type !== "url" && item.type !== "tel" && item.type !== "boolean"}
        <div class="grid grid-cols-2 gap-2">
          <div>
            <Label for="min">Min</Label>
            <Input type="number" id="min" bind:value={item.min} />
          </div>
          <div>
            <Label for="max">Max</Label>
            <Input
              type="number"
              id="max"
              bind:value={item.max}
            />
          </div>
        </div>
      {/if}

      <div>
        <Label for="required">Required</Label>
        <Checkbox id="required" bind:checked={item.required} />
      </div>
    </div>
    <div>
      <Button
        onclick={() => {
          isOpen = false;
        }}
      >
        Save
      </Button>
    </div>
  </Dialog.Content>
</Dialog.Root>
