<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import * as Select from "$lib/components/ui/select/index";
  import { type InputType } from "../form-gen.svelte";
  let {
    item,
  }: {
    item: InputType;
  } = $props();
  let isOpen = $state(false);
  let selectTextTypes = ["text", "tel", "url"];
  let selectedMinMaxTypes = [
    "text",
    "password",
    "number",
    "tel",
    "url",
    "tags-input",
    "textarea",
    "slider",
  ];
</script>

<Dialog.Root bind:open={isOpen}>
  <Dialog.Trigger>
    <Button
      data-umami-event="Edit Field Button"
      onclick={() => (isOpen = true)}
      variant="ghost"
      size="icon"
      class="rounded-full"
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
    </Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Edit Field</Dialog.Title>
    </Dialog.Header>
    <div class="space-y-2.5">
      <div>
        <Label for="name">Label</Label>
        <Input type="text" id="name" bind:value={item.label} />
      </div>
      {#if item.type !== "title" && item.type !== "desc"}
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
            bind:value={
              () => item.named_id,
              (v) => {
                return (item.named_id = v
                  ?.toString()
                  .replace(" ", "_")
                  .toLowerCase());
              }
            }
          />
        </div>
      {/if}
      {#if selectTextTypes.includes(item.type)}
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
                <Select.Item value="tel" label="Tel" />
                <Select.Item value="url" label="URL" />
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      {/if}
      {#if selectedMinMaxTypes.includes(item.type)}
        <div class="grid grid-cols-2 gap-2">
          <div>
            <Label for="min">Min</Label>
            <Input type="number" min={0} id="min" bind:value={item.min} />
          </div>
          <div>
            <Label for="max">Max</Label>
            <Input type="number" id="max" min={0} bind:value={item.max} />
          </div>
        </div>
      {/if}
      {#if item.type !== "title" && item.type !== "desc"}
        <div>
          <Label for="required">Required</Label>
          <Checkbox id="required" bind:checked={item.required} />
        </div>
      {/if}
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
