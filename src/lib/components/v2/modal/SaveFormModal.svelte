<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import { formV2, savedFormsV2 } from "../state/form-v2.svelte";
  import Save from "@lucide/svelte/icons/save";
  import FilePlus from "@lucide/svelte/icons/file-plus";

  interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }

  let { open = $bindable(), onOpenChange }: Props = $props();

  let formName = $state("");
  let showDuplicateDialog = $state(false);
  let duplicateAction: "replace" | "saveAsNew" | null = $state(null);
  let errorMessage = $state("");

  // Load current form name if editing an existing form
  $effect(() => {
    if (open && formV2.currentFormId) {
      const currentForm = savedFormsV2.current.find(
        (f) => f.id === formV2.currentFormId
      );
      if (currentForm) {
        formName = currentForm.name;
      }
    } else if (open) {
      formName = "";
    }
  });

  function checkDuplicateName(name: string): boolean {
    return savedFormsV2.current.some(
      (f) =>
        f.name.toLowerCase() === name.toLowerCase() &&
        f.id !== formV2.currentFormId
    );
  }

  function generateUniqueName(baseName: string): string {
    let counter = 1;
    let newName = `${baseName} (${counter})`;
    while (savedFormsV2.current.some((f) => f.name === newName)) {
      counter++;
      newName = `${baseName} (${counter})`;
    }
    return newName;
  }

  function handleSave() {
    const trimmedName = formName.trim();

    if (!trimmedName) {
      errorMessage = "Form name cannot be empty";
      return;
    }

    if (checkDuplicateName(trimmedName)) {
      showDuplicateDialog = true;
      return;
    }

    // Save the form
    formV2.saveForm(trimmedName, false);
    closeModal();
  }

  function handleSaveAs() {
    const trimmedName = formName.trim();

    if (!trimmedName) {
      errorMessage = "Form name cannot be empty";
      return;
    }

    if (checkDuplicateName(trimmedName)) {
      showDuplicateDialog = true;
      return;
    }

    // Save as new form
    formV2.saveForm(trimmedName, true);
    closeModal();
  }

  function handleDuplicateConfirm() {
    const trimmedName = formName.trim();

    if (duplicateAction === "replace") {
      // Find and replace the existing form
      const existingForm = savedFormsV2.current.find(
        (f) => f.name.toLowerCase() === trimmedName.toLowerCase()
      );
      if (existingForm) {
        formV2.deleteForm(existingForm.id);
      }
      formV2.saveForm(trimmedName, true);
    } else if (duplicateAction === "saveAsNew") {
      // Generate unique name and save
      const uniqueName = generateUniqueName(trimmedName);
      formName = uniqueName;
      formV2.saveForm(uniqueName, true);
    }

    showDuplicateDialog = false;
    duplicateAction = null;
    closeModal();
  }

  function closeModal() {
    formName = "";
    errorMessage = "";
    open = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  }
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Save Form</Dialog.Title>
      <Dialog.Description>
        Enter a name to save your form configuration for later use.
      </Dialog.Description>
    </Dialog.Header>

    <div class="grid gap-4 py-4">
      <div class="grid gap-2">
        <Label for="form-name">Form Name</Label>
        <Input
          id="form-name"
          bind:value={formName}
          placeholder="Enter form name..."
          onkeydown={handleKeydown}
          class={errorMessage ? "border-destructive" : ""}
        />
        {#if errorMessage}
          <p class="text-sm text-destructive">{errorMessage}</p>
        {/if}
      </div>

      <div class="text-xs text-muted-foreground">
        {#if formV2.currentFormId}
          <p>
            Currently editing: <span class="font-medium"
              >{savedFormsV2.current.find((f) => f.id === formV2.currentFormId)
                ?.name}</span
            >
          </p>
        {:else}
          <p>This will create a new saved form.</p>
        {/if}
      </div>
    </div>

    <Dialog.Footer class="flex gap-2">
      <Button variant="outline" onclick={closeModal}>Cancel</Button>
      {#if formV2.currentFormId}
        <Button onclick={handleSave}>
          <Save class="w-4 h-4 mr-2" />
          Save
        </Button>
      {/if}
      <Button
        onclick={handleSaveAs}
        variant={formV2.currentFormId ? "secondary" : "default"}
      >
        <FilePlus class="w-4 h-4 mr-2" />
        Save As
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!-- Duplicate Name Confirmation Dialog -->
<AlertDialog.Root bind:open={showDuplicateDialog}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Form Name Already Exists</AlertDialog.Title>
      <AlertDialog.Description>
        A form with the name "{formName}" already exists. What would you like to
        do?
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <Button
        variant="destructive"
        onclick={() => {
          duplicateAction = "replace";
          handleDuplicateConfirm();
        }}
      >
        Replace Existing
      </Button>
      <Button
        onclick={() => {
          duplicateAction = "saveAsNew";
          handleDuplicateConfirm();
        }}
      >
        Save as New
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
