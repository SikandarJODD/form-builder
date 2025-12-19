<script lang="ts">
  import {
    formV2,
    type SchemaType,
    type ModeType,
    type TabType,
  } from "../state/form-v2.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Select from "$lib/components/ui/select/index";
  import { Separator } from "$lib/components/ui/separator";
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import CodeModal from "../modal/CodeModal.svelte";
  import LayoutGrid from "@lucide/svelte/icons/layout-grid";
  import LayoutTemplate from "@lucide/svelte/icons/layout-template";
  import Settings from "@lucide/svelte/icons/settings";
  import Sparkles from "@lucide/svelte/icons/sparkles";
  import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
  import Code from "@lucide/svelte/icons/code";

  const schemas: { value: SchemaType; label: string }[] = [
    { value: "zod", label: "Zod" },
    { value: "valibot", label: "Valibot" },
    { value: "arktype", label: "ArkType" },
  ];

  // const tabs: { id: TabType; label: string; icon: typeof LayoutGrid }[] = [
  //   { id: "fields", label: "Fields", icon: LayoutGrid },
  //   { id: "template", label: "Template", icon: LayoutTemplate },
  //   { id: "settings", label: "Settings", icon: Settings },
  // ];

  let schemaValue = $state(formV2.schema);
  let codeModalOpen = $state(false);

  const handleSchemaChange = (value: string) => {
    formV2.schema = value as SchemaType;
    schemaValue = value as SchemaType;
  };

  // Switch checked = true means Remote, unchecked = Superforms
  let isRemoteMode = $state(formV2.mode === "remote");

  const handleModeSwitch = (checked: boolean) => {
    const newMode: ModeType = checked ? "remote" : "superforms";
    formV2.mode = newMode;
    isRemoteMode = checked;
  };

  const handleReset = () => {
    formV2.reset();
  };

  const handleCodeClick = () => {
    codeModalOpen = true;
  };

  const handleTabClick = (tab: TabType) => {
    formV2.activeTab = tab;
  };
</script>

<header
  class="flex h-14 items-center justify-between border-b bg-background px-4"
>
  <!-- Left side: Tabs -->
  <div class="flex items-center gap-1">
    <!-- {#each tabs as tab}
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

    <!-- Reset Button -->
    <Button variant="ghost" size="icon-sm" onclick={handleReset} title="Reset">
      <RotateCcw class="h-4 w-4" />
    </Button>

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
