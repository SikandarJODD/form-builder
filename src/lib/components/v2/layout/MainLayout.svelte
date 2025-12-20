<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable";
  import { formV2 } from "../state/form-v2.svelte";
  import Header from "./Header.svelte";
  import FieldsPanel from "./FieldsPanel.svelte";
  import TemplatesPanel from "./TemplatesPanel.svelte";
  import EditorPanel from "./EditorPanel.svelte";
  import PreviewPanel from "./PreviewPanel.svelte";
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
