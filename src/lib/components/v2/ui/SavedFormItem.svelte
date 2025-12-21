<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import * as Dialog from "$lib/components/ui/dialog";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import { formV2, type SavedFormV2 } from "../state/form-v2.svelte";
  import { cn } from "$lib/utils";
  import FileText from "@lucide/svelte/icons/file-text";
  import MoreVertical from "@lucide/svelte/icons/more-vertical";
  import Pencil from "@lucide/svelte/icons/pencil";
  import Copy from "@lucide/svelte/icons/copy";
  import Trash2 from "@lucide/svelte/icons/trash-2";
  import { toast } from "svelte-sonner";

  interface Props {
    form: SavedFormV2;
  }

  let { form }: Props = $props();

  let showDeleteDialog = $state(false);
  let showRenameDialog = $state(false);
  let newName = $state("");
  let isActive = $derived(formV2.currentFormId === form.id);
  let dropdownOpen = $state(false);

  // Format relative time
  function getRelativeTime(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  }

  function handleLoad() {
    if (formV2.hasUnsavedChanges) {
      if (
        !confirm("You have unsaved changes. Do you want to load this form?")
      ) {
        return;
      }
    }
    formV2.loadForm(form.id);
  }

  function handleRename() {
    newName = form.name;
    showRenameDialog = true;
  }

  function confirmRename() {
    if (newName.trim()) {
      formV2.renameForm(form.id, newName.trim());
      toast.success("Form renamed", {
        description: `Form has been renamed to "${newName.trim()}".`,
      });
      showRenameDialog = false;
    }
  }

  function handleDuplicate() {
    formV2.duplicateForm(form.id);
    toast.success("Form duplicated", {
      description: `"${form.name} (Copy)" has been created.`,
    });
  }

  let confirmDelete = () => {
    const formName = form.name;
    formV2.deleteForm(form.id);
    toast.success("Form deleted", {
      description: `"${formName}" has been removed.`,
    });
    showDeleteDialog = false;
  };
</script>

<button
  onclick={handleLoad}
  class={cn(
    "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-accent group relative",
    isActive && "bg-accent"
  )}
>
  <!-- Form Icon -->
  <div class="shrink-0 rounded-md bg-muted p-1.5">
    <FileText class="h-4 w-4 text-muted-foreground" strokeWidth={1.6} />
  </div>

  <!-- Form Info -->
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium truncate">{form.name}</p>
    <div class="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
      <span
        >{form.meta.fieldCount}
        {form.meta.fieldCount === 1 ? "field" : "fields"}</span
      >
      <!-- <span>•</span> -->
      <!-- <span>{getRelativeTime(form.updatedAt)}</span> -->
      {#if form.meta.validationLibrary}
        <span>•</span>
        <span class="capitalize">{form.meta.validationLibrary}</span>
      {/if}
    </div>
  </div>

  <!-- Actions Menu -->
  <DropdownMenu.Root bind:open={dropdownOpen}>
    <DropdownMenu.Trigger>
      <Button
        variant="ghost"
        size="icon-sm"
        class={cn(
          "transition-opacity shrink-0",
          dropdownOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
        onclick={(e) => e.stopPropagation()}
      >
        <MoreVertical class="h-4 w-4" />
        <span class="sr-only">More options</span>
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
      <DropdownMenu.Item onclick={handleRename}>
        <Pencil class="mr-2 h-4 w-4" />
        <span>Rename</span>
      </DropdownMenu.Item>
      <DropdownMenu.Item onclick={handleDuplicate}>
        <Copy class="mr-2 h-4 w-4" />
        <span>Duplicate</span>
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item
        onclick={() => (showDeleteDialog = true)}
        class="text-destructive focus:text-destructive"
      >
        <Trash2 class="mr-2 h-4 w-4" />
        <span>Delete</span>
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</button>

<!-- Rename Dialog -->
<Dialog.Root bind:open={showRenameDialog}>
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
          onkeydown={(e) => e.key === "Enter" && confirmRename()}
        />
      </div>
    </div>
    <Dialog.Footer>
      <Button variant="outline" onclick={() => (showRenameDialog = false)}>
        Cancel
      </Button>
      <Button onclick={confirmRename}>Rename</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!-- Delete Confirmation Dialog -->
<Dialog.Root bind:open={showDeleteDialog}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Delete Form</Dialog.Title>
      <Dialog.Description>
        Are you sure you want to delete the form "{form.name}"? This action
        cannot be undone.
      </Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Button variant="outline" onclick={() => (showDeleteDialog = false)}>
        Cancel
      </Button>
      <Button variant="destructive" onclick={confirmDelete}>Delete</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
