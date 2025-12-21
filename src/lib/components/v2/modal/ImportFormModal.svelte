<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import Button from "$lib/components/ui/button/button.svelte";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { Separator } from "$lib/components/ui/separator";
  import * as HoverCard from "$lib/components/ui/hover-card";
  import * as Popover from "$lib/components/ui/popover";
  import { codeToHtml } from "shiki";
  import { formV2 } from "../state/form-v2.svelte";
  import Upload from "@lucide/svelte/icons/upload";
  import FileUp from "@lucide/svelte/icons/file-up";
  import FileJson from "@lucide/svelte/icons/file-json";
  import Copy from "@lucide/svelte/icons/copy";
  import Check from "@lucide/svelte/icons/check";
  import Sparkles from "@lucide/svelte/icons/sparkles";
  import BookOpen from "@lucide/svelte/icons/book-open";
  import { toast } from "svelte-sonner";

  interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }

  let { open = $bindable(), onOpenChange }: Props = $props();

  let importJson: string = $state("");
  let isImporting: boolean = $state(false);
  let promptCopied: boolean = $state(false);
  let schemaPopoverOpen: boolean = $state(false);
  let highlightedSchemas: {
    basicField: string;
    selectField: string;
    sideBySide: string;
    fieldType: string;
    rowType: string;
  } = $state({
    basicField: "",
    selectField: "",
    sideBySide: "",
    fieldType: "",
    rowType: "",
  });
  let copiedSchema: string = $state("");

  // TypeScript type definitions for schemas
  const typeDefinitions = {
    basicField: `// Basic Input Field
type Field = {
  id: string;
  type: "text" | "email" | "tel" | "url" | "password" | "number" | "date" | "time" | "datetime-local";
  category: "input";
  label?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number; // for number type
  max?: number; // for number type
};`,
    selectField: `// Select Field with Options
type SelectField = {
  id: string;
  type: "select";
  category: "select";
  label?: string;
  placeholder?: string;
  required?: boolean;
  options: string[];
};`,
    sideBySide: `// Side-by-Side Fields (Row with multiple fields)
type Row = {
  fields: Field[];
};

// Array of rows for the form
type FormSchema = Row[];`,
    fieldType: `// Complete Field Type Union
type Field =
  | InputField
  | SelectField
  | TextareaField
  | CheckboxField
  | RadioField
  | FileField
  | SwitchField;

type InputField = {
  id: string;
  type: "text" | "email" | "tel" | "url" | "password" | "number" | "date" | "time";
  category: "input";
  label?: string;
  placeholder?: string;
  required?: boolean;
};

type TextareaField = {
  id: string;
  type: "textarea";
  category: "textarea";
  label?: string;
  placeholder?: string;
  rows?: number;
};`,
    rowType: `// Complete Row and Form Structure
type Field = {
  id: string;
  type: string;
  category: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  [key: string]: any;
};

type Row = {
  fields: Field[];
};

type FormSchema = Row[];`,
  };

  // Generate highlighted schemas on mount
  $effect(() => {
    if (schemaPopoverOpen && !highlightedSchemas.basicField) {
      Promise.all([
        codeToHtml(typeDefinitions.basicField, {
          lang: "typescript",
          theme: "vesper",
        }),
        codeToHtml(typeDefinitions.selectField, {
          lang: "typescript",
          theme: "vesper",
        }),
        codeToHtml(typeDefinitions.sideBySide, {
          lang: "typescript",
          theme: "vesper",
        }),
        codeToHtml(typeDefinitions.fieldType, {
          lang: "typescript",
          theme: "vesper",
        }),
        codeToHtml(typeDefinitions.rowType, {
          lang: "typescript",
          theme: "vesper",
        }),
      ]).then(([basicField, selectField, sideBySide, fieldType, rowType]) => {
        highlightedSchemas = {
          basicField,
          selectField,
          sideBySide,
          fieldType,
          rowType,
        };
      });
    }
  });

  // Copy schema to clipboard
  function copySchema(schema: keyof typeof typeDefinitions) {
    navigator.clipboard.writeText(typeDefinitions[schema]);
    copiedSchema = schema;
    toast.success("Schema copied to clipboard!");
    setTimeout(() => {
      copiedSchema = "";
    }, 2000);
  }

  // AI Prompt for generating form JSON
  const aiPrompt = `Generate a form JSON structure for my Svelte form builder. Use this exact schema:

**Schema:**
- Return an array of rows
- Each row has: "id" (string), "fields" (array)
- Each field must have:
  - "id": unique string (e.g., "field-1")
  - "name": display name (e.g., "Input", "Email")
  - "type": field type (text, email, password, number, textarea, boolean, select, radio, date-picker, slider, input-otp, phone, combobox, tags-input, file, location-input)
  - "category": same as type for most fields, or "checkbox"/"switch" for boolean
  - "label": field label shown to user
  - "description": helper text (optional)
  - "placeholder": placeholder text
  - "required": boolean
  - "position": "full" (or "left"/"right" for side-by-side, max 2 per row)
  - "options": array for select/radio/combobox (each with "id", "value", "label")

**Example:**
\`\`\`json
[
  {
    "id": "row-1",
    "fields": [{
      "id": "field-1",
      "name": "Input",
      "type": "text",
      "category": "text",
      "label": "Full Name",
      "description": "Enter your full name",
      "placeholder": "John Doe",
      "required": true,
      "position": "full"
    }]
  }
]
\`\`\`

**My Requirements:**
[Paste your form requirements here - e.g., "Create a contact form with name, email, phone, and message fields"]`;

  // Copy AI prompt to clipboard
  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(aiPrompt);
      promptCopied = true;
      toast.success("Prompt copied!", {
        description:
          "Paste it into ChatGPT, Claude, or any AI to generate your form JSON",
      });
      setTimeout(() => {
        promptCopied = false;
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy prompt");
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
      onOpenChange(false);

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

  // Handle file upload
  const handleFileUpload = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        importJson = content;
        toast.success("File loaded", {
          description: "Review the JSON and click Import",
        });
      };
      reader.onerror = () => {
        toast.error("Failed to read file");
      };
      reader.readAsText(file);
    }
  };
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="max-w-6xl h-[90vh] flex flex-col">
    <Dialog.Header class="shrink-0">
      <div class="flex items-center gap-2">
        <FileJson class="h-5 w-5" />
        <Dialog.Title>Import Form from JSON</Dialog.Title>
      </div>
      <Dialog.Description>
        Paste JSON directly, use AI to generate, load a template, or upload a
        file
      </Dialog.Description>
    </Dialog.Header>

    <div class="flex-1 flex gap-4 min-h-0">
      <!-- Left side - Primary JSON input (larger) -->
      <div class="flex-1 flex flex-col min-h-0">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h4 class="text-sm font-semibold">Paste JSON</h4>
            <p class="text-xs text-muted-foreground">Main import area</p>
          </div>
          {#if importJson}
            <Button variant="ghost" size="sm" onclick={() => (importJson = "")}>
              Clear
            </Button>
          {/if}
        </div>
        <textarea
          bind:value={importJson}
          placeholder="Paste your form JSON here..."
          class="flex-1 w-full p-4 text-sm font-mono border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-muted/30"
        ></textarea>
        <div class="flex items-center justify-between mt-2">
          <p class="text-xs text-muted-foreground">
            The JSON should be an array of rows, each containing fields with id,
            type, and category properties
          </p>
          <HoverCard.Root openDelay={200}>
            <HoverCard.Trigger>
              <Popover.Root bind:open={schemaPopoverOpen}>
                <Popover.Trigger>
                  <Button variant="outline" size="sm" class="gap-2 shrink-0">
                    <BookOpen class="h-4 w-4" />
                    Schema View
                  </Button>
                </Popover.Trigger>
                <Popover.Content
                  class="w-[600px] max-h-[80vh]"
                  side="top"
                  align="end"
                >
                  <ScrollArea class="h-[70vh] pr-4">
                    <div class="space-y-4">
                      <div>
                        <h3 class="font-semibold text-lg mb-2">
                          TypeScript Schema Reference
                        </h3>
                        <p class="text-sm text-muted-foreground mb-4">
                          Copy these type definitions to understand the form
                          structure
                        </p>
                      </div>

                      <!-- Basic Field Schema -->
                      <div class="space-y-2">
                        <div class="flex items-center justify-between">
                          <h4 class="text-sm font-semibold">
                            Basic Input Field
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onclick={() => copySchema("basicField")}
                            class="h-8 gap-2"
                          >
                            {#if copiedSchema === "basicField"}
                              <Check class="h-3 w-3 text-green-500" />
                              <span class="text-xs">Copied!</span>
                            {:else}
                              <Copy class="h-3 w-3" />
                              <span class="text-xs">Copy</span>
                            {/if}
                          </Button>
                        </div>
                        {#if highlightedSchemas.basicField}
                          <div
                            class="text-xs [&_.shiki]:bg-transparent! [&_.shiki]:p-3 [&_.shiki]:rounded [&_.shiki]:border"
                          >
                            {@html highlightedSchemas.basicField}
                          </div>
                        {/if}
                      </div>

                      <Separator />

                      <!-- Select Field Schema -->
                      <div class="space-y-2">
                        <div class="flex items-center justify-between">
                          <h4 class="text-sm font-semibold">Select Field</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onclick={() => copySchema("selectField")}
                            class="h-8 gap-2"
                          >
                            {#if copiedSchema === "selectField"}
                              <Check class="h-3 w-3 text-green-500" />
                              <span class="text-xs">Copied!</span>
                            {:else}
                              <Copy class="h-3 w-3" />
                              <span class="text-xs">Copy</span>
                            {/if}
                          </Button>
                        </div>
                        {#if highlightedSchemas.selectField}
                          <div
                            class="text-xs [&_.shiki]:bg-transparent! [&_.shiki]:p-3 [&_.shiki]:rounded [&_.shiki]:border"
                          >
                            {@html highlightedSchemas.selectField}
                          </div>
                        {/if}
                      </div>

                      <Separator />

                      <!-- Side-by-Side Schema -->
                      <div class="space-y-2">
                        <div class="flex items-center justify-between">
                          <h4 class="text-sm font-semibold">
                            Side-by-Side Fields
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onclick={() => copySchema("sideBySide")}
                            class="h-8 gap-2"
                          >
                            {#if copiedSchema === "sideBySide"}
                              <Check class="h-3 w-3 text-green-500" />
                              <span class="text-xs">Copied!</span>
                            {:else}
                              <Copy class="h-3 w-3" />
                              <span class="text-xs">Copy</span>
                            {/if}
                          </Button>
                        </div>
                        {#if highlightedSchemas.sideBySide}
                          <div
                            class="text-xs [&_.shiki]:bg-transparent! [&_.shiki]:p-3 [&_.shiki]:rounded [&_.shiki]:border"
                          >
                            {@html highlightedSchemas.sideBySide}
                          </div>
                        {/if}
                      </div>

                      <Separator />

                      <!-- Complete Field Type -->
                      <div class="space-y-2">
                        <div class="flex items-center justify-between">
                          <h4 class="text-sm font-semibold">All Field Types</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onclick={() => copySchema("fieldType")}
                            class="h-8 gap-2"
                          >
                            {#if copiedSchema === "fieldType"}
                              <Check class="h-3 w-3 text-green-500" />
                              <span class="text-xs">Copied!</span>
                            {:else}
                              <Copy class="h-3 w-3" />
                              <span class="text-xs">Copy</span>
                            {/if}
                          </Button>
                        </div>
                        {#if highlightedSchemas.fieldType}
                          <div
                            class="text-xs [&_.shiki]:bg-transparent! [&_.shiki]:p-3 [&_.shiki]:rounded [&_.shiki]:border"
                          >
                            {@html highlightedSchemas.fieldType}
                          </div>
                        {/if}
                      </div>

                      <Separator />

                      <!-- Complete Row Type -->
                      <div class="space-y-2">
                        <div class="flex items-center justify-between">
                          <h4 class="text-sm font-semibold">
                            Complete Structure
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onclick={() => copySchema("rowType")}
                            class="h-8 gap-2"
                          >
                            {#if copiedSchema === "rowType"}
                              <Check class="h-3 w-3 text-green-500" />
                              <span class="text-xs">Copied!</span>
                            {:else}
                              <Copy class="h-3 w-3" />
                              <span class="text-xs">Copy</span>
                            {/if}
                          </Button>
                        </div>
                        {#if highlightedSchemas.rowType}
                          <div
                            class="text-xs [&_.shiki]:bg-transparent! [&_.shiki]:p-3 [&_.shiki]:rounded [&_.shiki]:border"
                          >
                            {@html highlightedSchemas.rowType}
                          </div>
                        {/if}
                      </div>
                    </div>
                  </ScrollArea>
                </Popover.Content>
              </Popover.Root>
            </HoverCard.Trigger>
            <HoverCard.Content class="w-80" side="bottom">
              <div class="space-y-2">
                <h4 class="text-sm font-semibold">
                  TypeScript Schema Reference
                </h4>
                <p class="text-xs text-muted-foreground">
                  View TypeScript type definitions and copy schema examples for
                  your form structure. Includes basic fields, select options,
                  side-by-side layouts, and complete form types.
                </p>
              </div>
            </HoverCard.Content>
          </HoverCard.Root>
        </div>
      </div>

      <!-- Right side - Options (compact) -->
      <ScrollArea class="w-80 border-l pl-4">
        <div class="space-y-4 pr-2">
          <!-- AI Prompt Generator -->
          <div class="space-y-2">
            <div class="flex items-center gap-2 mb-1">
              <Sparkles class="h-4 w-4 text-primary" />
              <h4 class="text-sm font-semibold">AI Generator</h4>
            </div>
            <p class="text-xs text-muted-foreground mb-2">
              Copy this prompt for ChatGPT, Claude, or any AI
            </p>
            <HoverCard.Root>
              <HoverCard.Trigger>
                <Button
                  variant="outline"
                  size="sm"
                  onclick={copyPrompt}
                  class="w-full gap-2"
                >
                  {#if promptCopied}
                    <Check class="h-4 w-4 text-green-500" />
                    <span>Copied!</span>
                  {:else}
                    <Copy class="h-4 w-4" />
                    <span>Copy AI Prompt</span>
                  {/if}
                </Button>
              </HoverCard.Trigger>
              <HoverCard.Content class="w-96" side="left">
                <div class="space-y-2">
                  <h4 class="text-sm font-semibold">AI Prompt Preview</h4>
                  <ScrollArea class="h-64">
                    <pre
                      class="text-xs font-mono whitespace-pre-wrap p-2 bg-muted rounded">{aiPrompt}</pre>
                  </ScrollArea>
                  <p class="text-xs text-muted-foreground">
                    This prompt will help AI understand your form structure
                  </p>
                </div>
              </HoverCard.Content>
            </HoverCard.Root>
            <p class="text-xs text-muted-foreground">
              Paste in AI, describe your form, get JSON back
            </p>
          </div>

          <Separator />

          <!-- Quick Start Templates -->
          <div class="space-y-2">
            <h4 class="text-sm font-semibold">Quick Templates</h4>
            <div class="space-y-2">
              {#each templateExamples as template}
                <button
                  type="button"
                  class="w-full flex items-start gap-2 p-2.5 border border-dashed rounded-lg hover:bg-accent/50 hover:border-primary/30 transition-colors text-left"
                  onclick={() => loadTemplate(template.json)}
                >
                  <FileUp class="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-xs">{template.name}</div>
                    <div class="text-xs text-muted-foreground truncate">
                      {template.description}
                    </div>
                  </div>
                </button>
              {/each}
            </div>
          </div>

          <Separator />

          <!-- File Upload -->
          <div class="space-y-2">
            <h4 class="text-sm font-semibold">Upload File</h4>
            <input
              type="file"
              accept=".json,application/json"
              onchange={handleFileUpload}
              class="hidden"
              id="json-file-input"
            />
            <Button
              variant="outline"
              size="sm"
              onclick={() =>
                document.getElementById("json-file-input")?.click()}
              class="w-full gap-2"
            >
              <Upload class="h-4 w-4" />
              Choose JSON File
            </Button>
            <p class="text-xs text-muted-foreground">
              Upload .json file from computer
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>

    <Dialog.Footer
      class="shrink-0 pt-4 flex items-center justify-between border-t"
    >
      <div class="text-xs text-muted-foreground">
        {#if importJson}
          <span class="text-primary font-medium">✓ Ready to import</span>
        {:else}
          Select an option from the right to get started
        {/if}
      </div>
      <div class="flex gap-2">
        <Button variant="outline" onclick={() => onOpenChange(false)}>
          Cancel
        </Button>
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
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
