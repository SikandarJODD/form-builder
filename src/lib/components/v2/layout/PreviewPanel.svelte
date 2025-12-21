<script lang="ts">
  import { formV2 } from "../state/form-v2.svelte";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import * as Select from "$lib/components/ui/select";
  import * as Popover from "$lib/components/ui/popover";
  import * as Command from "$lib/components/ui/command";
  import Slider from "$lib/components/ui/slider/slider.svelte";
  import Eye from "@lucide/svelte/icons/eye";
  import Trash2 from "@lucide/svelte/icons/trash-2";
  import Check from "@lucide/svelte/icons/check";
  import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
  import AlertCircle from "@lucide/svelte/icons/alert-circle";
  import { toast } from "svelte-sonner";
  import { cn } from "$lib/utils";
  // New component imports
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import * as InputOTP from "$lib/components/ui/input-otp";
  import PhoneInput from "$lib/components/ui/phone-input/phone-input.svelte";
  import LocationSelector from "$lib/components/templates/comps/location-input/LocationSelector.svelte";
  import TagsInput from "$lib/components/ui/tags-input/tags-input.svelte";
  import {
    FileDropZone,
    MEGABYTE,
    displaySize,
  } from "$lib/components/ui/file-drop-zone";
  import DatePickerSimple from "$lib/components/templates/comps/date-picker/DatePickerSimple.svelte";

  // State for validation errors
  let validationErrors: Record<string, string> = $state({});
  let fieldValues: Record<string, any> = $state({});
  let showValidation = $state(false);

  // State for file uploads in preview (keyed by field id)
  let uploadedFiles: Record<string, File[]> = $state({});

  // State for combobox (keyed by field id)
  let comboboxOpen: Record<string, boolean> = $state({});
  let comboboxValues: Record<string, string> = $state({});

  // State for location selector (keyed by field id)
  let locationCountry: Record<string, any> = $state({});
  let locationState: Record<string, any> = $state({});

  // Sample options for combobox preview
  const comboboxOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
  ];

  // Validate a field
  function validateField(field: any) {
    const value = fieldValues[field.id];
    
    // Required validation
    if (field.required) {
      if (value === undefined || value === null || value === "" || value === false) {
        validationErrors[field.id] = `${field.label} is required`;
        return false;
      }
    }

    // Email validation
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        validationErrors[field.id] = "Invalid email address";
        return false;
      }
    }

    // Number validation
    if (field.type === "number" && value) {
      if (isNaN(value)) {
        validationErrors[field.id] = "Must be a valid number";
        return false;
      }
      if (field.min !== undefined && value < field.min) {
        validationErrors[field.id] = `Minimum value is ${field.min}`;
        return false;
      }
      if (field.max !== undefined && value > field.max) {
        validationErrors[field.id] = `Maximum value is ${field.max}`;
        return false;
      }
    }

    // Password validation (basic)
    if (field.type === "password" && value && field.required) {
      if (value.length < 8) {
        validationErrors[field.id] = "Password must be at least 8 characters";
        return false;
      }
    }

    // Clear error if valid
    delete validationErrors[field.id];
    return true;
  }

  // Handle field value change
  function handleFieldChange(fieldId: string, value: any, field: any) {
    fieldValues[fieldId] = value;
    if (showValidation) {
      validateField(field);
    }
  }

  // Test validation (for preview purposes)
  function testValidation() {
    showValidation = true;
    validationErrors = {};
    
    formV2.allFields.forEach(field => {
      if (field.category !== "display") {
        validateField(field);
      }
    });

    const errorCount = Object.keys(validationErrors).length;
    if (errorCount > 0) {
      toast.error("Validation errors", {
        description: `Found ${errorCount} error(s). Check the form fields.`,
      });
    } else {
      toast.success("All fields valid!", {
        description: "No validation errors found.",
      });
    }
  }

  function handleFileUpload(fieldId: string) {
    return async (files: File[]) => {
      uploadedFiles[fieldId] = [...(uploadedFiles[fieldId] || []), ...files];
      toast.success(`Uploaded ${files.length} file(s)`);
    };
  }

  function removeFile(fieldId: string, index: number) {
    uploadedFiles[fieldId] = uploadedFiles[fieldId].filter(
      (_, i) => i !== index
    );
  }
</script>

<div class="flex h-full flex-col">
  <!-- Panel Header -->
  <div class="border-b p-4">
    <div class="flex items-center justify-between mb-2">
      <div>
        <h3 class="font-semibold text-sm">Preview</h3>
        <p class="text-xs text-muted-foreground">See how your form looks</p>
      </div>
      {#if formV2.allFields.length > 0}
        <Button
          variant="outline"
          size="sm"
          onclick={testValidation}
          class="gap-2"
        >
          <AlertCircle class="h-3.5 w-3.5" />
          <span>Test Validation</span>
        </Button>
      {/if}
    </div>
  </div>

  <!-- Scrollable Preview Content -->
  <ScrollArea class="flex-1">
    {#if formV2.allFields.length === 0}
      <!-- Empty State -->
      <div
        class="flex flex-col items-center justify-center h-64 text-center p-4"
      >
        <div class="rounded-full bg-muted p-4 mb-4">
          <Eye class="h-6 w-6 text-muted-foreground" />
        </div>
        <h4 class="font-medium text-sm mb-1">No preview available</h4>
        <p class="text-xs text-muted-foreground">
          Add fields to see the preview
        </p>
      </div>
    {:else}
      <!-- Form Preview -->
      <form class="p-4 space-y-4">
        {#each formV2.rows as row (row.id)}
          <div class="flex gap-4">
            {#each row.fields as field (field.id)}
              <div class={row.fields.length > 1 ? "flex-1" : "w-full"}>
                {#if field.type === "h1"}
                  <h1 class="text-2xl font-bold">{field.label}</h1>
                {:else if field.type === "h2"}
                  <h2 class="text-xl font-semibold">{field.label}</h2>
                {:else if field.type === "h3"}
                  <h3 class="text-lg font-medium">{field.label}</h3>
                {:else if field.type === "desc"}
                  <p class="text-sm text-muted-foreground">{field.label}</p>
                {:else if field.type === "separator"}
                  <hr class="my-2" />
                {:else if field.type === "text" || field.type === "email" || field.type === "password" || field.type === "number"}
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span
                        >{/if}
                    </Label>
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                      value={field.id ? (fieldValues[field.id] || "") : ""}
                      oninput={(e) => field.id && handleFieldChange(field.id, e.currentTarget.value, field)}
                      class={field.id && validationErrors[field.id] ? "border-destructive" : ""}
                    />
                    {#if field.id && validationErrors[field.id]}
                      <p class="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle class="h-3 w-3" />
                        {validationErrors[field.id]}
                      </p>
                    {:else if field.description}
                      <p class="text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    {/if}
                  </div>
                {:else if field.type === "textarea"}
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span
                        >{/if}
                    </Label>
                    <Textarea
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                      value={field.id ? (fieldValues[field.id] || "") : ""}
                      oninput={(e) => field.id && handleFieldChange(field.id, e.currentTarget.value, field)}
                      class={field.id && validationErrors[field.id] ? "border-destructive" : ""}
                    />
                    {#if field.id && validationErrors[field.id]}
                      <p class="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle class="h-3 w-3" />
                        {validationErrors[field.id]}
                      </p>
                    {:else if field.description}
                      <p class="text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    {/if}
                  </div>
                {:else if field.category === "checkbox"}
                  <div class="flex items-start gap-2 p-4 border rounded-lg">
                    <Checkbox 
                      disabled={field.disabled}
                      checked={field.id ? (fieldValues[field.id] || false) : false}
                      onCheckedChange={(checked) => field.id && handleFieldChange(field.id, checked, field)}
                    />
                    <div class="flex-1">
                      <Label>{field.label}</Label>
                      {#if field.id && validationErrors[field.id]}
                        <p class="text-xs text-destructive flex items-center gap-1 mt-1">
                          <AlertCircle class="h-3 w-3" />
                          {validationErrors[field.id]}
                        </p>
                      {:else if field.description}
                        <p class="text-xs text-muted-foreground">
                          {field.description}
                        </p>
                      {/if}
                    </div>
                  </div>
                {:else if field.category === "switch"}
                  <div
                    class="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <Label>{field.label}</Label>
                      {#if field.description}
                        <p class="text-xs text-muted-foreground">
                          {field.description}
                        </p>
                      {/if}
                    </div>
                    <Switch disabled={field.disabled} />
                  </div>
                {:else if field.type === "select"}
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span
                        >{/if}
                    </Label>
                    <Select.Root type="single">
                      <Select.Trigger disabled={field.disabled}>
                        {field.placeholder || "Select..."}
                      </Select.Trigger>
                      <Select.Content>
                        {#if field.options && field.options.length > 0}
                          {#each field.options as option}
                            <Select.Item
                              value={option.value}
                              label={option.label}
                            />
                          {/each}
                        {:else}
                          <Select.Item value="option1" label="Option 1" />
                          <Select.Item value="option2" label="Option 2" />
                          <Select.Item value="option3" label="Option 3" />
                        {/if}
                      </Select.Content>
                    </Select.Root>
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    {/if}
                  </div>
                {:else if field.type === "combobox"}
                  {@const fieldId = field.id ?? ""}
                  {@const options =
                    field.options && field.options.length > 0
                      ? field.options
                      : comboboxOptions}
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span
                        >{/if}
                    </Label>
                    <Popover.Root
                      open={comboboxOpen[fieldId] ?? false}
                      onOpenChange={(isOpen) =>
                        (comboboxOpen[fieldId] = isOpen)}
                    >
                      <Popover.Trigger>
                        {#snippet child({ props })}
                          <Button
                            {...props}
                            variant="outline"
                            role="combobox"
                            aria-expanded={comboboxOpen[fieldId] ?? false}
                            disabled={field.disabled}
                            class="w-full justify-between"
                          >
                            {comboboxValues[fieldId]
                              ? options.find(
                                  (opt) => opt.value === comboboxValues[fieldId]
                                )?.label
                              : field.placeholder || "Select..."}
                            <ChevronsUpDown
                              class="ml-2 h-4 w-4 shrink-0 opacity-50"
                            />
                          </Button>
                        {/snippet}
                      </Popover.Trigger>
                      <Popover.Content class="w-50 p-0">
                        <Command.Root>
                          <Command.Input placeholder="Search..." />
                          <Command.List>
                            <Command.Empty>No option found.</Command.Empty>
                            <Command.Group>
                              {#each options as option}
                                <Command.Item
                                  value={option.value}
                                  onSelect={() => {
                                    comboboxValues[fieldId] = option.value;
                                    comboboxOpen[fieldId] = false;
                                  }}
                                >
                                  <Check
                                    class={cn(
                                      "mr-2 h-4 w-4",
                                      comboboxValues[fieldId] === option.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {option.label}
                                </Command.Item>
                              {/each}
                            </Command.Group>
                          </Command.List>
                        </Command.Root>
                      </Popover.Content>
                    </Popover.Root>
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    {/if}
                  </div>
                {:else if field.type === "slider"}
                  <div class="space-y-3">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span
                        >{/if}
                    </Label>
                    <Slider
                      type="single"
                      value={50}
                      min={field.min || 0}
                      max={field.max || 100}
                    />
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    {/if}
                  </div>
                {:else if field.type === "radio"}
                  <div class="space-y-2">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span
                        >{/if}
                    </Label>
                    <RadioGroup.Root
                      value={field.options?.[0]?.value || "option1"}
                    >
                      {#if field.options && field.options.length > 0}
                        {#each field.options as option, index}
                          <div class="flex items-center space-x-2">
                            <RadioGroup.Item
                              value={option.value}
                              id={`${field.id}-${option.id}`}
                            />
                            <Label for={`${field.id}-${option.id}`}
                              >{option.label}</Label
                            >
                          </div>
                        {/each}
                      {:else}
                        <div class="flex items-center space-x-2">
                          <RadioGroup.Item value="option1" id="r1" />
                          <Label for="r1">Option 1</Label>
                        </div>
                        <div class="flex items-center space-x-2">
                          <RadioGroup.Item value="option2" id="r2" />
                          <Label for="r2">Option 2</Label>
                        </div>
                        <div class="flex items-center space-x-2">
                          <RadioGroup.Item value="option3" id="r3" />
                          <Label for="r3">Option 3</Label>
                        </div>
                      {/if}
                    </RadioGroup.Root>
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    {/if}
                  </div>
                {:else if field.type === "date-picker"}
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span
                        >{/if}
                    </Label>
                    <DatePickerSimple />
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    {/if}
                  </div>
                {:else if field.type === "input-otp"}
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span
                        >{/if}
                    </Label>
                    <InputOTP.Root maxlength={6}>
                      {#snippet children({ cells })}
                        <InputOTP.Group>
                          {#each cells.slice(0, 3) as cell}
                            <InputOTP.Slot {cell} />
                          {/each}
                        </InputOTP.Group>
                        <InputOTP.Separator />
                        <InputOTP.Group>
                          {#each cells.slice(3, 6) as cell}
                            <InputOTP.Slot {cell} />
                          {/each}
                        </InputOTP.Group>
                      {/snippet}
                    </InputOTP.Root>
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    {/if}
                  </div>
                {:else if field.type === "phone"}
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span
                        >{/if}
                    </Label>
                    <PhoneInput
                      country="IN"
                      placeholder={field.placeholder || "Enter phone number"}
                    />
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    {/if}
                  </div>
                {:else if field.type === "location-input"}
                  {@const fieldId = field.id ?? ""}
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span
                        >{/if}
                    </Label>
                    <LocationSelector
                      bind:selectedCountry={locationCountry[fieldId]}
                      bind:selectedState={locationState[fieldId]}
                    />
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    {/if}
                  </div>
                {:else if field.type === "tags-input"}
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span
                        >{/if}
                    </Label>
                    <TagsInput
                      placeholder={field.placeholder || "Add tag..."}
                    />
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    {/if}
                  </div>
                {:else if field.type === "file"}
                  {@const fieldId = field.id ?? ""}
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span
                        >{/if}
                    </Label>
                    <FileDropZone
                      onUpload={handleFileUpload(fieldId)}
                      maxFileSize={10 * MEGABYTE}
                      accept="image/*"
                      maxFiles={4}
                      fileCount={uploadedFiles[fieldId]?.length ?? 0}
                      onFileRejected={({ reason }) => toast.error(reason)}
                    />
                    <!-- Display uploaded files -->
                    {#if uploadedFiles[fieldId]?.length}
                      <div class="space-y-2 mt-2">
                        {#each uploadedFiles[fieldId] as file, i}
                          <div
                            class="flex items-center justify-between p-2 bg-muted rounded-md text-sm"
                          >
                            <span class="truncate flex-1">{file.name}</span>
                            <span class="text-muted-foreground mx-2"
                              >{displaySize(file.size)}</span
                            >
                            <button
                              type="button"
                              onclick={() => removeFile(fieldId, i)}
                              class="text-destructive hover:text-destructive/80"
                            >
                              <Trash2 class="h-4 w-4" />
                            </button>
                          </div>
                        {/each}
                      </div>
                    {/if}
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    {/if}
                  </div>
                {:else}
                  <!-- Generic fallback for other field types -->
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span
                        >{/if}
                    </Label>
                    <Input
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                    />
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">
                        {field.description}
                      </p>
                    {/if}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/each}

        <!-- Submit Button -->
        {#if formV2.allFields.length > 0}
          <Button type="submit" class="w-full">Submit</Button>
        {/if}
      </form>
    {/if}
  </ScrollArea>
</div>
