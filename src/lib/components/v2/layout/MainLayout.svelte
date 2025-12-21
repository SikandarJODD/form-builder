<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable";
  import { formV2 } from "../state/form-v2.svelte";
  import { globalFormState } from "../state/global-state.svelte";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import Header from "./Header.svelte";
  import FieldsPanel from "./FieldsPanel.svelte";
  import TemplatesPanel from "./TemplatesPanel.svelte";
  import EditorPanel from "./EditorPanel.svelte";
  import PreviewPanel from "./PreviewPanel.svelte";
  import CodeModal from "../modal/CodeModal.svelte";
  import SaveFormModal from "../modal/SaveFormModal.svelte";

  // Handle shared forms from URL
  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shareData = urlParams.get("share");

    if (shareData) {
      try {
        // Decode base64
        const decoded = decodeURIComponent(escape(atob(shareData)));
        const formData = JSON.parse(decoded);

        // Check expiration (24 hours)
        const timestamp = formData.timestamp || 0;
        const hoursSinceCreation = (Date.now() - timestamp) / (1000 * 60 * 60);

        if (hoursSinceCreation > 24) {
          toast.error("Share link expired", {
            description: "This link is older than 24 hours and is no longer valid.",
          });
          // Clean URL
          window.history.replaceState({}, "", "/v2");
          return;
        }

        // Load the shared form
        if (formData.rows && Array.isArray(formData.rows)) {
          formV2.rows = formData.rows;
          if (formData.schema) {
            globalFormState.setSchema(formData.schema);
          }
          if (formData.mode) {
            globalFormState.setMode(formData.mode);
          }

          toast.success("Form loaded from shared link", {
            description: "You can now edit and save this form.",
          });

          // Clean URL
          window.history.replaceState({}, "", "/v2");
        }
      } catch (error) {
        toast.error("Invalid share link", {
          description: "The link appears to be corrupted or invalid.",
        });
        // Clean URL
        window.history.replaceState({}, "", "/v2");
      }
    }
  });

  // Watch for unsaved changes and warn before unload
  onMount(() => {
    // Keyboard shortcuts
    const handleKeyboardShortcuts = (e: KeyboardEvent) => {
      // Ctrl+S or Cmd+S: Save form
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        triggerSave();
        return;
      }

      // Ctrl+M or Cmd+M: Open code modal
      if ((e.ctrlKey || e.metaKey) && e.key === "m") {
        e.preventDefault();
        triggerCodeModal();
        return;
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (formV2.hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcuts);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcuts);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });

  // State for modals (to be controlled by shortcuts)
  let saveModalOpen = $state(false);
  let codeModalOpen = $state(false);

  // Trigger functions for keyboard shortcuts
  function triggerSave() {
    saveModalOpen = true;
  }

  function triggerCodeModal() {
    codeModalOpen = true;
  }
</script>

<div class="flex h-screen flex-col bg-background">
  <!-- Header -->
  <Header />

  <!-- Main Content: 3-Panel Resizable Layout -->
  <Resizable.PaneGroup direction="horizontal" class="flex-1">
    <!-- Left Panel - Conditionally render FieldsPanel or TemplatesPanel -->
    <Resizable.Pane defaultSize={20} minSize={15} maxSize={25}>
      {#if formV2.activeTab === "template"}
        <TemplatesPanel />
      {:else if formV2.activeTab === "settings"}
        <div class="flex h-full items-center justify-center p-4">
          <p class="text-sm text-muted-foreground">
            Settings Panel (Coming Soon)
          </p>
        </div>
      {:else}
        <FieldsPanel />
      {/if}
    </Resizable.Pane>

    <Resizable.Handle withHandle />

    <!-- Editor Panel (Middle) - Always shows current form state -->
    <Resizable.Pane defaultSize={40} minSize={30} maxSize={50}>
      <EditorPanel />
    </Resizable.Pane>

    <Resizable.Handle withHandle />

    <!-- Preview Panel (Right) - Always shows live preview -->
    <Resizable.Pane defaultSize={40} minSize={25} maxSize={55}>
      <PreviewPanel />
    </Resizable.Pane>
  </Resizable.PaneGroup>
</div>

<!-- Code Modal (triggered by keyboard shortcut) -->
<CodeModal
  bind:open={codeModalOpen}
  onOpenChange={(v) => (codeModalOpen = v)}
/>

<!-- Save Form Modal (triggered by keyboard shortcut) -->
<SaveFormModal
  bind:open={saveModalOpen}
  onOpenChange={(v) => (saveModalOpen = v)}
/>
