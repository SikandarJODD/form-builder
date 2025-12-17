<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Tabs from "$lib/components/ui/tabs";
  import * as Select from "$lib/components/ui/select";
  import Button from "$lib/components/ui/button/button.svelte";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { Separator } from "$lib/components/ui/separator";
  import {
    formV2,
    type SchemaType,
    type ModeType,
  } from "../state/form-v2.svelte";
  import {
    generateAllCode,
    type CodeTab,
    type GeneratedCode,
  } from "../utils/code-generator";
  import { codeToHtml } from "shiki";
  import { watch } from "runed";
  import { onMount } from "svelte";
  import Copy from "@lucide/svelte/icons/copy";
  import Check from "@lucide/svelte/icons/check";
  import X from "@lucide/svelte/icons/x";
  import FileCode from "@lucide/svelte/icons/file-code";
  import Server from "@lucide/svelte/icons/server";
  import FileJson from "@lucide/svelte/icons/file-json";
  import Terminal from "@lucide/svelte/icons/terminal";
  import Braces from "@lucide/svelte/icons/braces";

  interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }

  let { open = $bindable(), onOpenChange }: Props = $props();

  let activeTab: CodeTab = $state("client");
  let schema: SchemaType = $state(formV2.schema);
  let mode: ModeType = $state(formV2.mode);
  let generatedCode: GeneratedCode | null = $state(null);
  let copiedTab: CodeTab | null = $state(null);
  let isGenerating = $state(false);

  // Highlighted HTML code for each tab
  let highlightedCode: Record<CodeTab, string> = $state({
    client: "",
    server: "",
    schema: "",
    json: "",
    install: "",
  });

  const schemas: { value: SchemaType; label: string }[] = [
    { value: "zod", label: "Zod" },
    { value: "valibot", label: "Valibot" },
    { value: "arktype", label: "ArkType" },
  ];

  const tabs: { id: CodeTab; label: string; icon: typeof FileCode }[] = [
    { id: "client", label: "Client", icon: FileCode },
    { id: "server", label: "Server", icon: Server },
    { id: "schema", label: "Schema", icon: Braces },
    { id: "json", label: "JSON", icon: FileJson },
    { id: "install", label: "Install", icon: Terminal },
  ];

  // Helper to escape HTML for fallback display
  const escapeHtml = (code: string) =>
    `<pre class="shiki"><code>${code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;

  // Generate code on mount when modal opens
  onMount(() => {
    if (open) {
      generateCode();
    }
  });

  // Watch for changes in open state
  watch(
    () => open,
    () => {
      if (open) {
        generateCode();
      }
    }
  );

  // Watch for changes in schema
  watch(
    () => schema,
    () => {
      if (open) {
        generateCode();
      }
    }
  );

  // Watch for changes in mode
  watch(
    () => mode,
    () => {
      if (open) {
        generateCode();
      }
    }
  );

  // Watch for changes in form rows (fields added/removed)
  watch(
    () => formV2.rows.length,
    () => {
      if (open) {
        generateCode();
      }
    }
  );

  const generateCode = () => {
    isGenerating = true;

    // Generate raw code immediately
    const code = generateAllCode(formV2.allFields, schema, mode);
    generatedCode = code;

    // Show escaped code immediately as fallback
    highlightedCode = {
      client: escapeHtml(code.client),
      server: escapeHtml(code.server),
      schema: escapeHtml(code.schema),
      json: escapeHtml(code.json),
      install: escapeHtml(code.install),
    };

    isGenerating = false;

    // Then highlight in background (non-blocking)
    highlightInBackground(code);
  };

  // Highlight code in background without blocking UI
  const highlightInBackground = (code: GeneratedCode) => {
    // Highlight each tab independently so they appear as ready
    codeToHtml(code.client, { lang: "svelte", theme: "vesper" })
      .then((html) => {
        highlightedCode.client = html;
      })
      .catch(() => {});

    codeToHtml(code.server, { lang: "typescript", theme: "vesper" })
      .then((html) => {
        highlightedCode.server = html;
      })
      .catch(() => {});

    codeToHtml(code.schema, { lang: "typescript", theme: "vesper" })
      .then((html) => {
        highlightedCode.schema = html;
      })
      .catch(() => {});

    codeToHtml(code.json, { lang: "json", theme: "vesper" })
      .then((html) => {
        highlightedCode.json = html;
      })
      .catch(() => {});

    codeToHtml(code.install, { lang: "bash", theme: "vesper" })
      .then((html) => {
        highlightedCode.install = html;
      })
      .catch(() => {});
  };

  const handleSchemaChange = (value: string) => {
    schema = value as SchemaType;
    generateCode();
  };

  const handleModeChange = (newMode: ModeType) => {
    mode = newMode;
    generateCode();
  };

  const copyToClipboard = async (tab: CodeTab) => {
    if (!generatedCode) return;

    const codeMap: Record<CodeTab, string> = {
      client: generatedCode.client,
      server: generatedCode.server,
      schema: generatedCode.schema,
      json: generatedCode.json,
      install: generatedCode.install,
    };

    await navigator.clipboard.writeText(codeMap[tab]);
    copiedTab = tab;
    setTimeout(() => {
      copiedTab = null;
    }, 2000);
  };
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="max-w-4xl h-[80vh] flex flex-col">
    <Dialog.Header class="flex-shrink-0">
      <Dialog.Title>Generated Code</Dialog.Title>
      <Dialog.Description>
        Copy the generated code to your project
      </Dialog.Description>
    </Dialog.Header>

    <!-- Controls -->
    <div class="flex items-center gap-4 py-2 flex-shrink-0">
      <!-- Schema Selector -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Schema:</span>
        <Select.Root
          type="single"
          value={schema}
          onValueChange={handleSchemaChange}
        >
          <Select.Trigger class="w-[100px] h-8">
            {schemas.find((s) => s.value === schema)?.label ?? "Schema"}
          </Select.Trigger>
          <Select.Content>
            {#each schemas as s}
              <Select.Item value={s.value} label={s.label} />
            {/each}
          </Select.Content>
        </Select.Root>
      </div>

      <Separator orientation="vertical" class="h-6" />

      <!-- Mode Toggle -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Mode:</span>
        <div class="flex border rounded-md">
          <Button
            variant={mode === "superforms" ? "secondary" : "ghost"}
            size="sm"
            class="h-8 rounded-r-none"
            onclick={() => handleModeChange("superforms")}
          >
            Superforms
          </Button>
          <Button
            variant={mode === "remote" ? "secondary" : "ghost"}
            size="sm"
            class="h-8 rounded-l-none"
            onclick={() => handleModeChange("remote")}
          >
            Remote
          </Button>
        </div>
      </div>
    </div>

    <Separator class="flex-shrink-0" />

    <!-- Tabs Content -->
    <Tabs.Root bind:value={activeTab} class="flex-1 flex flex-col min-h-0">
      <Tabs.List class="flex-shrink-0 w-full justify-start">
        {#each tabs as tab}
          <Tabs.Trigger value={tab.id} class="gap-2">
            <tab.icon class="h-4 w-4" />
            {tab.label}
          </Tabs.Trigger>
        {/each}
      </Tabs.List>

      {#each tabs as tab}
        <Tabs.Content value={tab.id} class="flex-1 min-h-0 mt-2">
          <div class="h-full flex flex-col border rounded-lg">
            <!-- Code Header -->
            <div
              class="flex items-center justify-between px-3 py-2 border-b bg-muted/50"
            >
              <span class="text-sm font-medium">
                {tab.id === "client"
                  ? "+page.svelte"
                  : tab.id === "server"
                    ? "+page.server.ts"
                    : tab.id === "schema"
                      ? "schema.ts"
                      : tab.id === "json"
                        ? "form.json"
                        : "Terminal"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                class="h-7 gap-2"
                onclick={() => copyToClipboard(tab.id)}
              >
                {#if copiedTab === tab.id}
                  <Check class="h-3.5 w-3.5 text-green-500" />
                  <span>Copied!</span>
                {:else}
                  <Copy class="h-3.5 w-3.5" />
                  <span>Copy</span>
                {/if}
              </Button>
            </div>

            <!-- Code Content -->
            <ScrollArea class="flex-1 p-3">
              {#if isGenerating}
                <div class="flex items-center justify-center h-32">
                  <span class="text-muted-foreground">Generating...</span>
                </div>
              {:else}
                <div class="text-sm [&_.shiki]:!bg-transparent">
                  {@html highlightedCode[tab.id]}
                </div>
              {/if}
            </ScrollArea>
          </div>
        </Tabs.Content>
      {/each}
    </Tabs.Root>

    <Dialog.Footer class="shrink-0 pt-4">
      <Button variant="outline" onclick={() => onOpenChange(false)}>
        Close
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
