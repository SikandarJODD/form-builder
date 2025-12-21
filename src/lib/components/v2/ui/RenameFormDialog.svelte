<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import { formV2 } from "../state/form-v2.svelte";
  import { toast } from "svelte-sonner";
  import { watch } from "runed";

  interface Props {
    open: boolean;
    formId: string;
    formName: string;
    onOpenChange?: (open: boolean) => void;
  }

  let { open = $bindable(), formId, formName, onOpenChange }: Props = $props();

  let newName = $state("");

  // Update newName when dialog opens
  watch(
    () => open,
    () => {
      if (open) {
        newName = formName;
      }
    }
  );

  function handleRename() {
    const trimmedName = newName.trim();

    if (!trimmedName) {
      toast.error("Invalid name", {
        description: "Form name cannot be empty.",
      });
      return;
    }

    if (trimmedName === formName) {
      open = false;
      return;
    }

    // Rename the form (returns false if form doesn't exist)
    const success = formV2.renameForm(formId, trimmedName);

    if (!success) {
      toast.error("Form not found", {
        description: "This form no longer exists.",
      });
      open = false;
      return;
    }

    toast.success("Form renamed", {
      description: `Form has been renamed to "${trimmedName}".`,
    });

    open = false;
  }

  function handleCancel() {
    newName = formName; // Reset name
    open = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      handleRename();
    }
  }
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Rename Form</Dialog.Title>
      <Dialog.Description>Enter a new name for your form.</Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid gap-2">
        <Label for="rename-input">Form Name</Label>
        <Input
          id="rename-input"
          bind:value={newName}
          placeholder="Enter new name..."
          onkeydown={handleKeydown}
        />
      </div>
    </div>
    <Dialog.Footer class="flex gap-2">
      <Button variant="outline" onclick={handleCancel}>Cancel</Button>
      <Button onclick={handleRename}>Rename</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
