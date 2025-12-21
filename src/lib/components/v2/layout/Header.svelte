<script lang="ts">
  import {
    formV2,
    type SchemaType,
    type ModeType,
    type TabType,
  } from "../state/form-v2.svelte";
  import { globalFormState } from "../state/global-state.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Select from "$lib/components/ui/select/index";
  import { Separator } from "$lib/components/ui/separator";
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import * as Tooltip from "$lib/components/ui/tooltip/index";
  import CodeModal from "../modal/CodeModal.svelte";
  import SaveFormModal from "../modal/SaveFormModal.svelte";
  import ImportFormModal from "../modal/ImportFormModal.svelte";
  import LayoutGrid from "@lucide/svelte/icons/layout-grid";
  import LayoutTemplate from "@lucide/svelte/icons/layout-template";
  import Settings from "@lucide/svelte/icons/settings";
  import Sparkles from "@lucide/svelte/icons/sparkles";
  import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
  import Code from "@lucide/svelte/icons/code";
  import Save from "@lucide/svelte/icons/save";
  import Share2 from "@lucide/svelte/icons/share-2";
  import FileDown from "@lucide/svelte/icons/file-down";
  import { toast } from "svelte-sonner";

  const schemas: { value: SchemaType; label: string }[] = [
    { value: "valibot", label: "Valibot" },
    { value: "zod", label: "Zod" },
    { value: "arktype", label: "ArkType" },
  ];

  const tabs: { id: TabType; label: string; icon: typeof LayoutGrid }[] = [
    { id: "fields", label: "Fields", icon: LayoutGrid },
    { id: "template", label: "Templates", icon: LayoutTemplate },
    // { id: "settings", label: "Settings", icon: Settings },
  ];

  let codeModalOpen = $state(false);
  let saveModalOpen = $state(false);
  let importModalOpen = $state(false);

  // Use global state
  let schemaValue = $derived(globalFormState.schema);
  let isRemoteMode = $derived(globalFormState.mode === "remote");

  const handleSchemaChange = (value: string) => {
    globalFormState.setSchema(value as SchemaType);
  };

  const handleModeSwitch = (checked: boolean) => {
    const newMode: ModeType = checked ? "remote" : "superforms";
    globalFormState.setMode(newMode);
  };

  const handleReset = () => {
    formV2.reset();
  };

  const handleCodeClick = () => {
    codeModalOpen = true;
  };

  const handleSaveClick = () => {
    saveModalOpen = true;
  };

  const handleImportClick = () => {
    importModalOpen = true;
  };

  const handleTabClick = (tab: TabType) => {
    formV2.activeTab = tab;
  };

  // Share form via link
  const handleShare = async () => {
    try {
      const formData = {
        rows: formV2.rows,
        schema: globalFormState.schema,
        mode: globalFormState.mode,
        timestamp: Date.now(),
      };

      // Encode to base64
      const jsonString = JSON.stringify(formData);
      const encoded = btoa(unescape(encodeURIComponent(jsonString)));

      // Create shareable URL
      const shareUrl = `${window.location.origin}/v2?share=${encoded}`;

      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);

      toast.success("Link copied!", {
        description:
          "Share link expires in 24 hours. Anyone with this link can view and edit the form.",
      });
    } catch (error) {
      toast.error("Failed to create share link", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    }
  };
</script>

<header
  class="flex h-14 items-center justify-between border-b bg-background px-4"
>
  <!-- Left side: Tabs -->
  <div class="flex items-center gap-1">
    {#each tabs as tab}
      <Button
        variant={formV2.activeTab === tab.id ? "secondary" : "ghost"}
        size="sm"
        onclick={() => handleTabClick(tab.id)}
        class="gap-2"
      >
        <tab.icon class="h-4 w-4" strokeWidth={1.6} />
        <span class="hidden sm:inline">{tab.label}</span>
      </Button>
    {/each}

    <!-- <Separator orientation="vertical" class="mx-2 h-6" /> -->

    <!-- <Button variant="ghost" size="sm" class="gap-2">
      <Sparkles class="h-4 w-4" />
      <span class="hidden sm:inline">Generate with AI</span>
    </Button> -->
  </div>

  <!-- Right side: Controls -->
  <div class="flex items-center gap-2">
    <!-- Schema Selector -->
    <Select.Root
      type="single"
      value={schemaValue}
      onValueChange={handleSchemaChange}
    >
      <Select.Trigger class="w-25 h-8">
        {schemas.find((s) => s.value === schemaValue)?.label ?? "Schema"}
      </Select.Trigger>
      <Select.Content>
        {#each schemas as schema}
          <Select.Item value={schema.value} label={schema.label} />
        {/each}
      </Select.Content>
    </Select.Root>

    <!-- Mode Toggle: Superforms <-> Remote -->
    <div class="flex items-center gap-2">
      <span
        class="text-xs text-muted-foreground {!isRemoteMode
          ? 'text-foreground font-medium'
          : ''}"
      >
        Superforms
      </span>
      <Switch checked={isRemoteMode} onCheckedChange={handleModeSwitch} />
      <span
        class="text-xs text-muted-foreground {isRemoteMode
          ? 'text-foreground font-medium'
          : ''}"
      >
        Remote
      </span>
    </div>

    <Separator orientation="vertical" class="h-6" />

    <!-- Import Button -->
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={100}>
        <Tooltip.Trigger>
          <Button
            variant="ghost"
            size="sm"
            onclick={handleImportClick}
            class="gap-2"
          >
            <FileDown class="h-4 w-4" strokeWidth={1.6} />
            <span class="hidden sm:inline">Import</span>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>Import form from JSON</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <!-- Share Button -->
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={100}>
        <Tooltip.Trigger>
          <Button variant="ghost" size="sm" onclick={handleShare} class="gap-2">
            <Share2 class="h-4 w-4" strokeWidth={1.6} />
            <span class="hidden sm:inline">Share</span>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>Share form via link (expires in 24h)</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <!-- Save Button -->
    <Button
      variant="secondary"
      size="sm"
      onclick={handleSaveClick}
      class="gap-2"
    >
      <!-- <Save class="h-4 w-4" /> -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="128"
        height="128"
        viewBox="0 0 24 24"
        fill="none"
        role="img"
        color="currentColor"
      >
        <path
          opacity="0.1"
          d="M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z"
          fill="currentColor"
        ></path>
        <path
          d="M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      <span class="hidden sm:inline">Save</span>
    </Button>

    <!-- Reset Button -->
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={100}>
        <Tooltip.Trigger>
          <Button variant="secondary" size="icon-sm" onclick={handleReset}>
            <!-- <RotateCcw class="h-4 w-4" /> -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 24 24"
              fill="none"
              role="img"
              color="currentColor"
            >
              <path
                opacity="0.4"
                d="M20.4879 15C19.2524 18.4956 15.9187 21 12 21C7.02943 21 3 16.9706 3 12C3 7.02943 7.02943 3 12 3C15.7292 3 18.9286 5.26806 20.2941 8.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M15 9H18C19.4142 9 20.1213 9 20.5607 8.56066C21 8.12132 21 7.41421 21 6V3"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>Reset Form</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <!-- Code Button -->
    <Button variant="default" size="sm" onclick={handleCodeClick} class="gap-2">
      <!-- <Code class="h-4 w-4" /> -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="128"
        height="128"
        viewBox="0 0 24 24"
        fill="none"
        role="img"
        color="currentColor"
      >
        <path
          opacity="0.4"
          d="M18 16L19.8398 17.5858C20.6133 18.2525 21 18.5858 21 19C21 19.4142 20.6133 19.7475 19.8398 20.4142L18 22"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          opacity="0.4"
          d="M14 16L12.1602 17.5858C11.3867 18.2525 11 18.5858 11 19C11 19.4142 11.3867 19.7475 12.1602 20.4142L14 22"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M20 13.0032L20 7.8199C20 6.12616 20 5.27929 19.732 4.60291C19.3013 3.51555 18.3902 2.65784 17.2352 2.25228C16.5168 2 15.6173 2 13.8182 2C10.6698 2 9.09563 2 7.83836 2.44148C5.81714 3.15122 4.22281 4.6522 3.46894 6.55509C3 7.73875 3 9.22077 3 12.1848L3 14.731C3 17.8013 3 19.3364 3.8477 20.4025C4.09058 20.708 4.37862 20.9792 4.70307 21.2078C5.61506 21.8506 6.85019 21.9757 9 22"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M3 12C3 10.159 4.49238 8.66667 6.33333 8.66667C6.99912 8.66667 7.78404 8.78333 8.43137 8.60988C9.00652 8.45576 9.45576 8.00652 9.60988 7.43136C9.78333 6.78404 9.66667 5.99912 9.66667 5.33333C9.66667 3.49238 11.1591 2 13 2"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      <span class="hidden sm:inline">Code</span>
    </Button>
  </div>
</header>

<!-- Code Modal -->
<CodeModal
  bind:open={codeModalOpen}
  onOpenChange={(v) => (codeModalOpen = v)}
/>

<!-- Save Form Modal -->
<SaveFormModal
  bind:open={saveModalOpen}
  onOpenChange={(v) => (saveModalOpen = v)}
/>

<!-- Import Form Modal -->
<ImportFormModal
  bind:open={importModalOpen}
  onOpenChange={(v) => (importModalOpen = v)}
/>
