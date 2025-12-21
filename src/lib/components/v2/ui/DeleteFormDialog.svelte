<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import Button from "$lib/components/ui/button/button.svelte";
  import { formV2 } from "../state/form-v2.svelte";
  import { toast } from "svelte-sonner";
  import { tick } from "svelte";

  interface Props {
    open: boolean;
    formId: string;
    formName: string;
    onOpenChange?: (open: boolean) => void;
  }

  let {
    open = $bindable(false),
    formId,
    formName,
    onOpenChange,
  }: Props = $props();

  let handleDelete = () => {
    // Delete the form (returns false if form doesn't exist)
    const success = formV2.deleteForm(formId);

    if (!success) {
      toast.error("Form not found", {
        description: "This form has already been deleted.",
      });
      return;
    }

    // Wait for dialog to close
    open = false;

    // Show success message after deletion
    toast.success("Form deleted", {
      description: `"${formName}" has been removed.`,
      duration: 2500,
    });
  };

  function handleCancel() {
    open = false;
  }
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Delete Form</Dialog.Title>
      <Dialog.Description>
        Are you sure you want to delete the form "{formName}"? This action
        cannot be undone.
      </Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer class="flex gap-2">
      <Button variant="outline" onclick={handleCancel}>Cancel</Button>
      <Button variant="destructive" onclick={handleDelete}>Delete</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
