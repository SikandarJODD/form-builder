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
  import { globalFormState } from "../state/global-state.svelte";
  import {
    generateAllCode,
    type CodeTab,
    type GeneratedCode,
    type PackageManager,
  } from "../utils/code-generator";
  import { codeToHtml } from "shiki";
  import { watch } from "runed";
  import { onMount } from "svelte";
  import Copy from "@lucide/svelte/icons/copy";
  import Check from "@lucide/svelte/icons/check";
  import FileCode from "@lucide/svelte/icons/file-code";
  import Server from "@lucide/svelte/icons/server";
  import FileJson from "@lucide/svelte/icons/file-json";
  import Terminal from "@lucide/svelte/icons/terminal";
  import Braces from "@lucide/svelte/icons/braces";
  import FolderTree from "@lucide/svelte/icons/folder-tree";
  import Upload from "@lucide/svelte/icons/upload";
  import FileUp from "@lucide/svelte/icons/file-up";
  import { toast } from "svelte-sonner";

  interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }

  let { open = $bindable(), onOpenChange }: Props = $props();

  let activeTab: CodeTab | "import" = $state("client");
  let importJson: string = $state("");
  let isImporting: boolean = $state(false);
  let packageManager: PackageManager = $state("npm");
  let generatedCode: GeneratedCode | null = $state(null);
  let copiedTab: CodeTab | null = $state(null);
  let isGenerating = $state(false);

  // Use global state for schema and mode
  let schema = $derived(globalFormState.schema);
  let mode = $derived(globalFormState.mode);

  // Highlighted HTML code for each tab
  let highlightedCode: Record<CodeTab, string> = $state({
    client: "",
    server: "",
    schema: "",
    json: "",
    install: "",
    structure: "",
  });

  const schemas: { value: SchemaType; label: string }[] = [
    { value: "valibot", label: "Valibot" },
    { value: "zod", label: "Zod" },
    { value: "arktype", label: "ArkType" },
  ];

  const packageManagers: { value: PackageManager; label: string }[] = [
    { value: "npm", label: "npm" },
    { value: "pnpm", label: "pnpm" },
    { value: "yarn", label: "yarn" },
    { value: "bun", label: "bun" },
  ];

  const tabs: {
    id: CodeTab | "import";
    label: string;
    icon: typeof FileCode;
  }[] = [
    { id: "import", label: "Import", icon: Upload },
    { id: "client", label: "Client", icon: FileCode },
    { id: "server", label: "Server", icon: Server },
    { id: "schema", label: "Schema", icon: Braces },
    { id: "install", label: "Install", icon: Terminal },
    { id: "json", label: "JSON", icon: FileJson },
    { id: "structure", label: "File Structure", icon: FolderTree },
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

  // Watch for changes in package manager
  watch(
    () => packageManager,
    () => {
      if (open) {
        generateCode();
      }
    }
  );

  const generateCode = () => {
    isGenerating = true;

    // Generate raw code immediately (pass rows for layout-aware generation)
    const code = generateAllCode(formV2.rows, schema, mode, packageManager);
    generatedCode = code;

    // Show escaped code immediately as fallback
    highlightedCode = {
      client: escapeHtml(code.client),
      server: escapeHtml(code.server),
      schema: escapeHtml(code.schema),
      json: escapeHtml(code.json),
      install: escapeHtml(code.install),
      structure: escapeHtml(code.structure),
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
    globalFormState.setSchema(value as SchemaType);
    generateCode();
  };

  const handleModeChange = (newMode: ModeType) => {
    globalFormState.setMode(newMode);
    generateCode();
  };

  const handlePackageManagerChange = (value: string) => {
    packageManager = value as PackageManager;
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
      structure: generatedCode.structure,
    };

    await navigator.clipboard.writeText(codeMap[tab]);
    copiedTab = tab;
    setTimeout(() => {
      copiedTab = null;
    }, 2000);
  };

  // Get filename for each tab
  const getTabFilename = (tabId: CodeTab): string => {
    switch (tabId) {
      case "structure":
        return "File Structure";
      case "client":
        return "+page.svelte";
      case "server":
        return mode === "remote" ? "data.remote.ts" : "+page.server.ts";
      case "schema":
        return "schema.ts";
      case "json":
        return "form.json";
      case "install":
        return "Terminal";
      default:
        return "";
    }
  };

  // Template examples for import
  const templateExamples = [
    {
      name: "Basic Contact Form",
      description: "Simple contact form with name, email, and message",
      json: `[
  {
    "id": "row-1",
    "fields": [
      {
        "id": "field-1",
        "name": "Input",
        "type": "text",
        "category": "text",
        "label": "Full Name",
        "description": "Enter your full name",
        "placeholder": "John Doe",
        "required": true,
        "position": "full"
      }
    ]
  },
  {
    "id": "row-2",
    "fields": [
      {
        "id": "field-2",
        "name": "Email",
        "type": "email",
        "category": "email",
        "label": "Email Address",
        "description": "We'll never share your email",
        "placeholder": "john@example.com",
        "required": true,
        "position": "full"
      }
    ]
  },
  {
    "id": "row-3",
    "fields": [
      {
        "id": "field-3",
        "name": "Textarea",
        "type": "textarea",
        "category": "textarea",
        "label": "Message",
        "description": "Enter your message",
        "placeholder": "Your message here...",
        "required": true,
        "position": "full"
      }
    ]
  }
]`,
    },
    {
      name: "User Registration",
      description: "User registration form with validation",
      json: `[
  {
    "id": "row-1",
    "fields": [
      {
        "id": "field-1",
        "name": "Input",
        "type": "text",
        "category": "text",
        "label": "Username",
        "description": "Choose a unique username",
        "placeholder": "username",
        "required": true,
        "position": "full"
      }
    ]
  },
  {
    "id": "row-2",
    "fields": [
      {
        "id": "field-2",
        "name": "Email",
        "type": "email",
        "category": "email",
        "label": "Email",
        "description": "Your email address",
        "placeholder": "you@example.com",
        "required": true,
        "position": "full"
      }
    ]
  },
  {
    "id": "row-3",
    "fields": [
      {
        "id": "field-3",
        "name": "Password",
        "type": "password",
        "category": "password",
        "label": "Password",
        "description": "Minimum 8 characters",
        "placeholder": "Enter password",
        "required": true,
        "position": "left"
      },
      {
        "id": "field-4",
        "name": "Password",
        "type": "password",
        "category": "password",
        "label": "Confirm Password",
        "description": "Re-enter password",
        "placeholder": "Confirm password",
        "required": true,
        "position": "right"
      }
    ]
  },
  {
    "id": "row-4",
    "fields": [
      {
        "id": "field-5",
        "name": "Checkbox",
        "type": "boolean",
        "category": "checkbox",
        "label": "I agree to the terms and conditions",
        "description": "",
        "placeholder": "",
        "required": true,
        "position": "full"
      }
    ]
  }
]`,
    },
    {
      name: "Survey Form",
      description: "Survey with multiple choice and rating",
      json: `[
  {
    "id": "row-1",
    "fields": [
      {
        "id": "field-1",
        "name": "Select",
        "type": "select",
        "category": "select",
        "label": "How did you hear about us?",
        "description": "Select one option",
        "placeholder": "Select an option",
        "required": true,
        "position": "full",
        "options": [
          { "id": "opt-1", "value": "social", "label": "Social Media" },
          { "id": "opt-2", "value": "search", "label": "Search Engine" },
          { "id": "opt-3", "value": "friend", "label": "Friend/Colleague" },
          { "id": "opt-4", "value": "other", "label": "Other" }
        ]
      }
    ]
  },
  {
    "id": "row-2",
    "fields": [
      {
        "id": "field-2",
        "name": "Radio Group",
        "type": "radio",
        "category": "radio",
        "label": "Rate your experience",
        "description": "How satisfied are you?",
        "placeholder": "",
        "required": true,
        "position": "full",
        "options": [
          { "id": "opt-5", "value": "excellent", "label": "Excellent" },
          { "id": "opt-6", "value": "good", "label": "Good" },
          { "id": "opt-7", "value": "average", "label": "Average" },
          { "id": "opt-8", "value": "poor", "label": "Poor" }
        ]
      }
    ]
  },
  {
    "id": "row-3",
    "fields": [
      {
        "id": "field-3",
        "name": "Textarea",
        "type": "textarea",
        "category": "textarea",
        "label": "Additional Comments",
        "description": "Share your thoughts",
        "placeholder": "Optional feedback...",
        "required": false,
        "position": "full"
      }
    ]
  }
]`,
    },
  ];

  // Load template into import textarea
  const loadTemplate = (templateJson: string) => {
    importJson = templateJson;
    toast.success("Template loaded", {
      description: "You can now edit or import this template",
    });
  };

  // Validate and import JSON
  const handleImport = () => {
    if (!importJson.trim()) {
      toast.error("Import failed", {
        description: "Please provide JSON data to import",
      });
      return;
    }

    try {
      isImporting = true;
      const parsed = JSON.parse(importJson);

      // Validate structure
      if (!Array.isArray(parsed)) {
        throw new Error("JSON must be an array of rows");
      }

      // Basic validation of row structure
      for (const row of parsed) {
        if (!row.id || !row.fields || !Array.isArray(row.fields)) {
          throw new Error(
            "Invalid row structure: each row must have 'id' and 'fields' array"
          );
        }
        for (const field of row.fields) {
          if (!field.id || !field.type || !field.category) {
            throw new Error(
              "Invalid field structure: each field must have 'id', 'type', and 'category'"
            );
          }
        }
      }

      // Import the data
      formV2.rows = parsed;
      importJson = "";
      activeTab = "client";

      toast.success("Import successful!", {
        description: `Imported ${parsed.length} rows with ${parsed.reduce((acc: number, row: any) => acc + row.fields.length, 0)} fields`,
      });
    } catch (error) {
      toast.error("Import failed", {
        description:
          error instanceof Error ? error.message : "Invalid JSON format",
      });
    } finally {
      isImporting = false;
    }
  };
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="max-w-4xl h-[80vh] flex flex-col">
    <Dialog.Header class="shrink-0">
      <Dialog.Title>Generated Code</Dialog.Title>
      <Dialog.Description>
        Copy the generated code to your project
      </Dialog.Description>
    </Dialog.Header>

    <!-- Controls -->
    <div class="flex items-center gap-4 py-2 shrink-0">
      <!-- Schema Selector -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Schema:</span>
        <Select.Root
          type="single"
          value={schema}
          onValueChange={handleSchemaChange}
        >
          <Select.Trigger class="w-25 h-8">
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

    <Separator class="shrink-0" />

    <!-- Tabs Content -->
    <Tabs.Root bind:value={activeTab} class="flex-1 flex flex-col min-h-0">
      <Tabs.List class="shrink-0 w-full justify-start">
        {#each tabs as tab}
          <Tabs.Trigger value={tab.id} class="gap-2">
            <tab.icon class="h-4 w-4" />
            {tab.label}
          </Tabs.Trigger>
        {/each}
      </Tabs.List>

      {#each tabs as tab}
        <Tabs.Content value={tab.id} class="flex-1 min-h-0 mt-2">
          {#if tab.id === "import"}
            <!-- Import Tab Content -->
            <div class="h-full flex flex-col border rounded-lg">
              <div class="p-4 space-y-4">
                <!-- Template Examples -->
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-medium">Quick Start Templates</h4>
                    <span class="text-xs text-muted-foreground"
                      >Click to load</span
                    >
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    {#each templateExamples as template}
                      <Button
                        variant="outline"
                        size="sm"
                        class="h-auto flex-col items-start p-3 gap-1"
                        onclick={() => loadTemplate(template.json)}
                      >
                        <FileUp class="h-4 w-4 mb-1" />
                        <span class="font-medium text-xs">{template.name}</span>
                        <span class="text-xs text-muted-foreground text-left">
                          {template.description}
                        </span>
                      </Button>
                    {/each}
                  </div>
                </div>

                <Separator />

                <!-- JSON Input -->
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-medium">Import JSON</h4>
                    {#if importJson}
                      <Button
                        variant="ghost"
                        size="sm"
                        class="h-7"
                        onclick={() => (importJson = "")}
                      >
                        Clear
                      </Button>
                    {/if}
                  </div>
                  <textarea
                    bind:value={importJson}
                    placeholder="Paste your form JSON here..."
                    class="w-full h-64 p-3 text-sm font-mono border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  ></textarea>
                  <p class="text-xs text-muted-foreground">
                    Paste form JSON exported from this builder or use a template
                    above
                  </p>
                </div>

                <!-- Import Button -->
                <div class="flex items-center justify-between">
                  <div class="text-xs text-muted-foreground">
                    {#if importJson}
                      Ready to import
                    {:else}
                      Select a template or paste JSON to begin
                    {/if}
                  </div>
                  <Button
                    onclick={handleImport}
                    disabled={!importJson.trim() || isImporting}
                    class="gap-2"
                  >
                    {#if isImporting}
                      <span class="animate-spin">⏳</span>
                      <span>Importing...</span>
                    {:else}
                      <Upload class="h-4 w-4" />
                      <span>Import Form</span>
                    {/if}
                  </Button>
                </div>
              </div>
            </div>
          {:else}
            <!-- Regular Code Tab Content -->
            <div class="h-full flex flex-col border rounded-lg">
              <!-- Code Header -->
              <div
                class="flex items-center justify-between px-3 py-2 border-b bg-muted/50"
              >
                <div class="flex items-center gap-3">
                  <span class="text-sm font-medium">
                    {getTabFilename(tab.id)}
                  </span>
                  {#if tab.id === "install"}
                    <Select.Root
                      type="single"
                      value={packageManager}
                      onValueChange={handlePackageManagerChange}
                    >
                      <Select.Trigger class="w-20 h-7 text-xs">
                        {packageManagers.find((p) => p.value === packageManager)
                          ?.label ?? "npm"}
                      </Select.Trigger>
                      <Select.Content>
                        {#each packageManagers as pm}
                          <Select.Item value={pm.value} label={pm.label} />
                        {/each}
                      </Select.Content>
                    </Select.Root>
                  {/if}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  class="h-7 gap-2"
                  onclick={() => copyToClipboard(tab.id as CodeTab)}
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
                  <div class="text-sm [&_.shiki]:bg-transparent!">
                    {@html highlightedCode[tab.id]}
                  </div>
                {/if}
              </ScrollArea>
            </div>
          {/if}
        </Tabs.Content>
      {/each}
    </Tabs.Root>

    <!-- <Dialog.Footer class="shrink-0 pt-4">
      <Button variant="outline" onclick={() => onOpenChange(false)}>
        Close
      </Button>
    </Dialog.Footer> -->
  </Dialog.Content>
</Dialog.Root>
