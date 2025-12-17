<script lang="ts">
  import { formV2 } from "../state/form-v2.svelte";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Accordion from "$lib/components/ui/accordion";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import Trash2 from "@lucide/svelte/icons/trash-2";
  import Plus from "@lucide/svelte/icons/plus";
  import GripVertical from "@lucide/svelte/icons/grip-vertical";
  // Field Icons
  import TextCursorInput from "@lucide/svelte/icons/text-cursor-input";
  import Mail from "@lucide/svelte/icons/mail";
  import Lock from "@lucide/svelte/icons/lock";
  import Hash from "@lucide/svelte/icons/hash";
  import AlignLeft from "@lucide/svelte/icons/align-left";
  import ToggleLeft from "@lucide/svelte/icons/toggle-left";
  import CheckSquare from "@lucide/svelte/icons/check-square";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import Circle from "@lucide/svelte/icons/circle";
  import Calendar from "@lucide/svelte/icons/calendar";
  import SlidersHorizontal from "@lucide/svelte/icons/sliders-horizontal";
  import Keyboard from "@lucide/svelte/icons/keyboard";
  import Phone from "@lucide/svelte/icons/phone";
  import Search from "@lucide/svelte/icons/search";
  import Tags from "@lucide/svelte/icons/tags";
  import Upload from "@lucide/svelte/icons/upload";
  import MapPin from "@lucide/svelte/icons/map-pin";
  // Display Icons
  import Heading1 from "@lucide/svelte/icons/heading-1";
  import Heading2 from "@lucide/svelte/icons/heading-2";
  import Heading3 from "@lucide/svelte/icons/heading-3";
  import Text from "@lucide/svelte/icons/text";
  import Minus from "@lucide/svelte/icons/minus";

  import type { InputTypeV2 } from "../state/form-v2.svelte";

  // Map field types to icons
  const getFieldIcon = (category: string) => {
    const iconMap: Record<string, typeof TextCursorInput> = {
      text: TextCursorInput,
      email: Mail,
      password: Lock,
      number: Hash,
      textarea: AlignLeft,
      switch: ToggleLeft,
      checkbox: CheckSquare,
      select: ChevronDown,
      radio: Circle,
      "date-picker": Calendar,
      slider: SlidersHorizontal,
      "input-otp": Keyboard,
      phone: Phone,
      combobox: Search,
      "tags-input": Tags,
      file: Upload,
      "location-input": MapPin,
      // Display elements
      h1: Heading1,
      h2: Heading2,
      h3: Heading3,
      desc: Text,
      separator: Minus,
      display: Text,
    };
    return iconMap[category] || TextCursorInput;
  };

  const handleDeleteField = (fieldId: string) => {
    formV2.removeField(fieldId);
  };

  const handleUpdateField = (
    fieldId: string,
    key: keyof InputTypeV2,
    value: unknown
  ) => {
    formV2.updateField(fieldId, { [key]: value });
  };

  const handleAddSideBySide = (rowId: string) => {
    formV2.addFieldToRow(rowId);
  };
</script>

<div class="flex h-full flex-col">
  <!-- Panel Header -->
  <div class="border-b p-4">
    <h3 class="font-semibold text-sm">Editor</h3>
    <p class="text-xs text-muted-foreground">Design your form elements</p>
  </div>

  <!-- Scrollable Editor Content -->
  <ScrollArea class="flex-1">
    {#if formV2.rows.length === 0}
      <!-- Empty State -->
      <div
        class="flex flex-col items-center justify-center h-64 text-center p-4"
      >
        <div class="rounded-full bg-muted p-4 mb-4">
          <Plus class="h-6 w-6 text-muted-foreground" />
        </div>
        <h4 class="font-medium text-sm mb-1">No fields added</h4>
        <p class="text-xs text-muted-foreground">
          Click on fields from the left panel to add them
        </p>
      </div>
    {:else}
      <!-- Field Rows -->
      <div class="p-3 space-y-2">
        {#each formV2.rows as row (row.id)}
          <!-- Row Container - supports side-by-side fields -->
          <div
            class={[
              "border rounded-lg bg-card",
              row.fields.length > 1 && "p-2",
            ]}
          >
            <div class={["gap-2", row.fields.length > 1 && "grid grid-cols-2"]}>
              {#each row.fields as field, fieldIndex (field.id)}
                {@const FieldIcon = getFieldIcon(field.category)}
                <div
                  class={[
                    "",
                    row.fields.length > 1 && "border rounded-lg bg-background",
                  ]}
                >
                  <!-- Field Header -->
                  <div class="flex items-center gap-2 p-3 border-b">
                    <button
                      class="cursor-grab text-muted-foreground hover:text-foreground"
                    >
                      <GripVertical class="h-4 w-4" />
                    </button>
                    <FieldIcon class="h-4 w-4 text-muted-foreground" />
                    <span class="flex-1 text-sm font-medium truncate">
                      {field.label || field.name}
                    </span>
                    <div class="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onclick={() => handleDeleteField(field.id!)}
                        class="h-7 w-7 text-destructive hover:text-destructive"
                      >
                        <Trash2 class="h-3.5 w-3.5" />
                      </Button>
                      {#if row.fields.length < 2}
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          class="h-7 w-7"
                          title="Add side-by-side field"
                          onclick={() => handleAddSideBySide(row.id)}
                        >
                          <Plus class="h-3.5 w-3.5" />
                        </Button>
                      {/if}
                    </div>
                  </div>

                  <!-- Field Customization (Accordion) -->
                  <Accordion.Root type="single" collapsible class="w-full">
                    <Accordion.Item value="customize">
                      <Accordion.Trigger
                        class="px-3 py-2 text-xs hover:no-underline"
                      >
                        Customize Field
                      </Accordion.Trigger>
                      <Accordion.Content class="px-3 pb-3">
                        <div class="space-y-3">
                          <!-- Label -->
                          <div class="space-y-1.5">
                            <Label class="text-xs">Label</Label>
                            <Input
                              value={field.label}
                              oninput={(e) =>
                                handleUpdateField(
                                  field.id!,
                                  "label",
                                  e.currentTarget.value
                                )}
                              placeholder="Field label"
                              class="h-8 text-sm"
                            />
                          </div>

                          <!-- Name (ID) -->
                          <div class="space-y-1.5">
                            <Label class="text-xs">Name (ID)</Label>
                            <Input
                              value={field.named_id}
                              oninput={(e) =>
                                handleUpdateField(
                                  field.id!,
                                  "named_id",
                                  e.currentTarget.value
                                )}
                              placeholder="field_name"
                              class="h-8 text-sm font-mono"
                            />
                          </div>

                          <!-- Placeholder -->
                          <div class="space-y-1.5">
                            <Label class="text-xs">Placeholder</Label>
                            <Input
                              value={field.placeholder}
                              oninput={(e) =>
                                handleUpdateField(
                                  field.id!,
                                  "placeholder",
                                  e.currentTarget.value
                                )}
                              placeholder="Enter placeholder"
                              class="h-8 text-sm"
                            />
                          </div>

                          <!-- Description -->
                          <div class="space-y-1.5">
                            <Label class="text-xs">Description</Label>
                            <Input
                              value={field.description}
                              oninput={(e) =>
                                handleUpdateField(
                                  field.id!,
                                  "description",
                                  e.currentTarget.value
                                )}
                              placeholder="Field description"
                              class="h-8 text-sm"
                            />
                          </div>

                          <!-- Checkboxes -->
                          <div class="flex gap-4">
                            <div class="flex items-center gap-2">
                              <Checkbox
                                checked={field.required}
                                onCheckedChange={(checked) =>
                                  handleUpdateField(
                                    field.id!,
                                    "required",
                                    checked
                                  )}
                              />
                              <Label class="text-xs">Required</Label>
                            </div>
                            <div class="flex items-center gap-2">
                              <Checkbox
                                checked={field.disabled}
                                onCheckedChange={(checked) =>
                                  handleUpdateField(
                                    field.id!,
                                    "disabled",
                                    checked
                                  )}
                              />
                              <Label class="text-xs">Disabled</Label>
                            </div>
                          </div>
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  </Accordion.Root>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </ScrollArea>
</div>
