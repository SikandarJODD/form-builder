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
  import LayoutGrid from "@lucide/svelte/icons/layout-grid";
  import LayoutTemplate from "@lucide/svelte/icons/layout-template";
  import Settings from "@lucide/svelte/icons/settings";
  import Sparkles from "@lucide/svelte/icons/sparkles";
  import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
  import Code from "@lucide/svelte/icons/code";
  import Save from "@lucide/svelte/icons/save";
  import Share2 from "@lucide/svelte/icons/share-2";
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
        description: "Share link expires in 24 hours. Anyone with this link can view and edit the form.",
      });
    } catch (error) {
      toast.error("Failed to create share link", {
        description: error instanceof Error ? error.message : "Please try again",
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
        <tab.icon class="h-4 w-4" />
        <span class="hidden sm:inline">{tab.label}</span>
      </Button>
    {/each}

    <Separator orientation="vertical" class="mx-2 h-6" />

    <Button variant="ghost" size="sm" class="gap-2">
      <Sparkles class="h-4 w-4" />
      <span class="hidden sm:inline">Generate with AI</span>
    </Button>
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

    <!-- Share Button -->
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={100}>
        <Tooltip.Trigger>
          <Button variant="ghost" size="sm" onclick={handleShare} class="gap-2">
            <Share2 class="h-4 w-4" />
            <span class="hidden sm:inline">Share</span>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>Share form via link (expires in 24h)</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <!-- Save Button -->
    <Button variant="ghost" size="sm" onclick={handleSaveClick} class="gap-2">
      <Save class="h-4 w-4" />
      <span class="hidden sm:inline">Save</span>
    </Button>

    <!-- Reset Button -->
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={100}>
        <Tooltip.Trigger>
          <Button variant="ghost" size="icon-sm" onclick={handleReset}>
            <RotateCcw class="h-4 w-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>Reset Form</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <!-- Code Button -->
    <Button variant="default" size="sm" onclick={handleCodeClick} class="gap-2">
      <Code class="h-4 w-4" />
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
