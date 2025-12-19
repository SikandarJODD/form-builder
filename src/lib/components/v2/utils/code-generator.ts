// V2 Code Generator Utility
// On-demand code generation (not derived) for performance
// Uses shadcn-svelte Field component pattern

import type { InputTypeV2, SchemaType, ModeType, FieldRow } from '../state/form-v2.svelte';

export type CodeTab = 'client' | 'server' | 'schema' | 'json' | 'install' | 'structure';
export type ClientServerVariant = 'client' | 'server';
export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export interface GeneratedCode {
  schema: string;
  client: string;
  server: string;
  json: string;
  install: string;
  structure: string;
}

// Display elements that don't need Field wrapper
const DISPLAY_TYPES = ['h1', 'h2', 'h3', 'desc', 'separator'];

// Check if field is a display element
const isDisplayElement = (type: string): boolean => DISPLAY_TYPES.includes(type);

// Get adapter names for superforms
const getServerAdapter = (schema: SchemaType): string => {
  if (schema === 'zod') return 'zod4';
  if (schema === 'valibot') return 'valibot';
  if (schema === 'arktype') return 'arktype';
  return 'zod4';
};

const getClientAdapter = (schema: SchemaType): string => {
  if (schema === 'zod') return 'zod4Client';
  if (schema === 'valibot') return 'valibotClient';
  if (schema === 'arktype') return 'arktypeClient';
  return 'zod4Client';
};

// Get unique component imports needed based on field types
function getUniqueImports(fields: InputTypeV2[]): Set<string> {
  const imports = new Set<string>();

  fields.forEach(field => {
    if (isDisplayElement(field.type)) return;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        imports.add('Input');
        break;
      case 'textarea':
        imports.add('Textarea');
        break;
      case 'boolean':
        if (field.category === 'switch') {
          imports.add('Switch');
        } else {
          imports.add('Checkbox');
        }
        break;
      case 'select':
        imports.add('Select');
        break;
      case 'radio':
        imports.add('RadioGroup');
        break;
      case 'date-picker':
        imports.add('DatePicker');
        break;
      case 'slider':
        imports.add('Slider');
        break;
      case 'input-otp':
        imports.add('InputOTP');
        break;
      case 'combobox':
        imports.add('Combobox');
        break;
      case 'file':
        imports.add('FileDropZone');
        break;
      case 'phone':
        imports.add('PhoneInput');
        break;
      case 'location-input':
        imports.add('LocationInput');
        break;
      case 'tags-input':
        imports.add('TagsInput');
        break;
    }
  });

  return imports;
}

// Generate Zod schema
function generateZodSchema(fields: InputTypeV2[]): string {
  let schema = `import { z } from 'zod';\n\nexport const schema = z.object({\n`;

  fields.forEach(field => {
    if (field.type === 'h1' || field.type === 'h2' || field.type === 'h3' || field.type === 'desc' || field.type === 'separator') {
      return; // Skip display elements
    }

    const label = field.label?.toLowerCase() || 'value';
    let fieldSchema = `z.string({ error: "Please enter your ${label}." })`;

    if (field.type === 'number' || field.type === 'slider') {
      fieldSchema = `z.number({ error: "Please enter a valid number." })`;
    } else if (field.type === 'boolean') {
      fieldSchema = `z.boolean().default(false)`;
    } else if (field.type === 'email') {
      fieldSchema = `z.email({ error: "Please enter a valid email." })`;
    } else if (field.type === 'date-picker') {
      fieldSchema = `z.string({ error: "Please select a date." })`;
    } else if (field.type === 'input-otp') {
      fieldSchema = `z.string({ error: "Please enter the OTP." }).length(6, { error: "OTP must be 6 digits." })`;
    } else if (field.type === 'phone') {
      fieldSchema = `z.string({ error: "Please enter a valid phone number." })`;
    } else if (field.type === 'tags-input') {
      fieldSchema = `z.array(z.string()).min(1, { error: "Please add at least one tag." })`;
    } else if (field.type === 'file') {
      fieldSchema = `z.array(z.any()).optional()`;
    } else if (field.type === 'location-input') {
      // Location input generates country and state fields
      schema += `  country: z.string({ error: "Please select a country." }),\n`;
      schema += `  state: z.string().optional(),\n`;
      return; // Skip the normal field addition
    }

    if (field.required && field.type !== 'boolean' && field.type !== 'tags-input' && field.type !== 'file') {
      fieldSchema += `.min(1, { error: "This field is required." })`;
    }

    schema += `  ${field.named_id || 'field'}: ${fieldSchema},\n`;
  });

  schema += `});`;
  return schema;
}

// Generate Valibot schema
function generateValibotSchema(fields: InputTypeV2[]): string {
  let schema = `import * as v from 'valibot';\n\nexport const schema = v.object({\n`;

  fields.forEach(field => {
    if (field.type === 'h1' || field.type === 'h2' || field.type === 'h3' || field.type === 'desc' || field.type === 'separator') {
      return;
    }

    const label = field.label?.toLowerCase() || 'value';
    let fieldSchema = `v.pipe(v.string(), v.nonEmpty('Please enter your ${label}.'))`;

    if (field.type === 'number' || field.type === 'slider') {
      fieldSchema = `v.pipe(v.number(), v.integer())`;
    } else if (field.type === 'boolean') {
      fieldSchema = `v.optional(v.boolean(), false)`;
    } else if (field.type === 'email') {
      fieldSchema = `v.pipe(v.string(), v.email('Please enter a valid email.'))`;
    } else if (field.type === 'date-picker') {
      fieldSchema = `v.pipe(v.string(), v.nonEmpty('Please select a date.'))`;
    } else if (field.type === 'input-otp') {
      fieldSchema = `v.pipe(v.string(), v.length(6, 'OTP must be 6 digits.'))`;
    } else if (field.type === 'phone') {
      fieldSchema = `v.pipe(v.string(), v.nonEmpty('Please enter a valid phone number.'))`;
    } else if (field.type === 'tags-input') {
      fieldSchema = `v.pipe(v.array(v.string()), v.minLength(1, 'Please add at least one tag.'))`;
    } else if (field.type === 'file') {
      fieldSchema = `v.optional(v.array(v.any()))`;
    } else if (field.type === 'location-input') {
      schema += `  country: v.pipe(v.string(), v.nonEmpty('Please select a country.')),\n`;
      schema += `  state: v.optional(v.string()),\n`;
      return;
    }

    schema += `  ${field.named_id || 'field'}: ${fieldSchema},\n`;
  });

  schema += `});`;
  return schema;
}

// Generate ArkType schema
function generateArkTypeSchema(fields: InputTypeV2[]): string {
  let schema = `import { type } from 'arktype';\n\nexport const schema = type({\n`;

  fields.forEach(field => {
    if (field.type === 'h1' || field.type === 'h2' || field.type === 'h3' || field.type === 'desc' || field.type === 'separator') {
      return;
    }

    let fieldSchema = `"string >= 1"`;

    if (field.type === 'number' || field.type === 'slider') {
      fieldSchema = `"number"`;
    } else if (field.type === 'boolean') {
      fieldSchema = `"boolean"`;
    } else if (field.type === 'email') {
      fieldSchema = `"string.email"`;
    } else if (field.type === 'date-picker') {
      fieldSchema = `"string >= 1"`;
    } else if (field.type === 'input-otp') {
      fieldSchema = `"string == 6"`;
    } else if (field.type === 'phone') {
      fieldSchema = `"string >= 1"`;
    } else if (field.type === 'tags-input') {
      fieldSchema = `"string[] >= 1"`;
    } else if (field.type === 'file') {
      fieldSchema = `"unknown[]?"`;
    } else if (field.type === 'location-input') {
      schema += `  country: "string >= 1",\n`;
      schema += `  state: "string?",\n`;
      return;
    }

    if (!field.required && field.type !== 'boolean') {
      fieldSchema = `"string | undefined"`;
    }

    schema += `  ${field.named_id || 'field'}: ${fieldSchema},\n`;
  });

  schema += `});`;
  return schema;
}

// Generate schema based on type
export function generateSchema(fields: InputTypeV2[], schemaType: SchemaType): string {
  switch (schemaType) {
    case 'zod':
      return generateZodSchema(fields);
    case 'valibot':
      return generateValibotSchema(fields);
    case 'arktype':
      return generateArkTypeSchema(fields);
    default:
      return generateZodSchema(fields);
  }
}

// Generate Superforms server code
export function generateSuperformsServer(schemaType: SchemaType): string {
  const adapter = getServerAdapter(schemaType);
  return `import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { ${adapter} } from 'sveltekit-superforms/adapters';
import { schema } from './schema';

export const load: PageServerLoad = async () => {
  return { form: await superValidate(${adapter}(schema)) };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, ${adapter}(schema));
    if (!form.valid) {
      return fail(400, { form });
    }
    return message(form, 'Form submitted successfully!');
  }
};`;
}

// Generate Superforms client code with Field component
export function generateSuperformsClient(rows: FieldRow[], schemaType: SchemaType): string {
  const adapter = getClientAdapter(schemaType);
  const fields = rows.flatMap(r => r.fields);
  const uniqueImports = getUniqueImports(fields);

  let code = `<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import { ${adapter} } from 'sveltekit-superforms/adapters';
  import type { PageData } from './$types';
  import { schema } from './schema';
  import { untrack } from 'svelte';
  // Field Components
  import * as Field from '$lib/components/ui/field';
  // UI Components
  import { Button } from '$lib/components/ui/button';`;

  // Add component-specific imports
  if (uniqueImports.has('Input')) {
    code += `\n  import { Input } from '$lib/components/ui/input';`;
  }
  if (uniqueImports.has('Textarea')) {
    code += `\n  import { Textarea } from '$lib/components/ui/textarea';`;
  }
  if (uniqueImports.has('Switch')) {
    code += `\n  import { Switch } from '$lib/components/ui/switch';`;
  }
  if (uniqueImports.has('Checkbox')) {
    code += `\n  import { Checkbox } from '$lib/components/ui/checkbox';`;
  }
  if (uniqueImports.has('Select')) {
    code += `\n  import * as Select from '$lib/components/ui/select';`;
  }
  if (uniqueImports.has('RadioGroup')) {
    code += `\n  import * as RadioGroup from '$lib/components/ui/radio-group';`;
  }
  if (uniqueImports.has('Slider')) {
    code += `\n  import { Slider } from '$lib/components/ui/slider';`;
  }
  if (uniqueImports.has('DatePicker')) {
    code += `\n  import * as Popover from '$lib/components/ui/popover';`;
    code += `\n  import { Calendar as CalendarPrimitive } from 'bits-ui';`;
    code += `\n  import * as Calendar from '$lib/components/ui/calendar';`;
    code += `\n  import * as Select from '$lib/components/ui/select';`;
    code += `\n  import CalendarIcon from '@lucide/svelte/icons/calendar';`;
    code += `\n  import { buttonVariants } from '$lib/components/ui/button';`;
    code += `\n  import { CalendarDate, type DateValue, getLocalTimeZone, today, DateFormatter } from '@internationalized/date';`;
  }
  if (uniqueImports.has('InputOTP')) {
    code += `\n  import * as InputOTP from '$lib/components/ui/input-otp';`;
    code += `\n  import { REGEXP_ONLY_DIGITS } from 'bits-ui';`;
  }
  if (uniqueImports.has('Combobox')) {
    code += `\n  import * as Popover from '$lib/components/ui/popover';`;
    code += `\n  import * as Command from '$lib/components/ui/command';`;
    code += `\n  import Check from '@lucide/svelte/icons/check';`;
    code += `\n  import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';`;
    code += `\n  import { cn } from '$lib/utils';`;
    code += `\n  import { tick } from 'svelte';`;
  }
  if (uniqueImports.has('FileDropZone')) {
    code += `\n  import { toast } from 'svelte-sonner';`;
    code += `\n  import { displaySize, FileDropZone, MEGABYTE, type FileDropZoneProps } from '$lib/components/ui/file-drop-zone';`;
    code += `\n  import { fly, slide } from 'svelte/transition';`;
    code += `\n  import Trash2 from '@lucide/svelte/icons/trash-2';`;
  }
  if (uniqueImports.has('PhoneInput')) {
    code += `\n  import PhoneInput from '$lib/components/ui/phone-input/phone-input.svelte';`;
  }
  if (uniqueImports.has('LocationInput')) {
    code += `\n  import LocationSelector from '$lib/components/templates/comps/location-input/LocationSelector.svelte';`;
  }
  if (uniqueImports.has('TagsInput')) {
    code += `\n  import TagsInput from '$lib/components/ui/tags-input/tags-input.svelte';`;
  }

  code += `

  let { data }: { data: PageData } = $props();

  const { form: formData, errors, enhance, message } = superForm(
    untrack(() => data.form),
    { validators: ${adapter}(schema) }
  );
<\/script>

{#if $message}
  <p class="text-emerald-500 text-sm mb-4">{$message}</p>
{/if}

<form method="POST" use:enhance class="space-y-4">
  <Field.Group>
`;

  // Generate code for each row, handling side-by-side layout
  rows.forEach(row => {
    if (row.fields.length > 1) {
      // Side-by-side layout
      code += `    <div class="grid grid-cols-2 gap-4">\n`;
      row.fields.forEach(field => {
        code += `      <div>\n`;
        // Add extra indentation for side-by-side fields
        const fieldCode = generateFieldCode(field).replace(/^    /gm, '        ');
        code += fieldCode;
        code += `      </div>\n`;
      });
      code += `    </div>\n`;
    } else if (row.fields.length === 1) {
      // Single field - full width
      code += generateFieldCode(row.fields[0]);
    }
  });

  code += `  </Field.Group>

  <Button type="submit">Submit</Button>
</form>`;

  return code;
}

// Generate code for a single field with Field component wrapper
function generateFieldCode(field: InputTypeV2): string {
  const { type, category, named_id, label, description, placeholder } = field;

  // Handle display elements
  if (type === 'h1') {
    return `    <h1 class="text-2xl font-bold">${label}</h1>\n`;
  }
  if (type === 'h2') {
    return `    <h2 class="text-xl font-semibold">${label}</h2>\n`;
  }
  if (type === 'h3') {
    return `    <h3 class="text-lg font-medium">${label}</h3>\n`;
  }
  if (type === 'desc') {
    return `    <p class="text-muted-foreground text-sm">${label}</p>\n`;
  }
  if (type === 'separator') {
    return `    <Field.Separator />\n`;
  }

  // Text-based inputs (text, email, password, number)
  if (type === 'text' || type === 'email' || type === 'password' || type === 'number') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <Input
        type="${type}"
        id="${named_id}"
        name="${named_id}"
        placeholder="${placeholder}"
        bind:value={$formData.${named_id}}
      />
      {#if $errors.${named_id}}
        <Field.Error>{$errors.${named_id}}</Field.Error>
      {/if}
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Textarea
  if (type === 'textarea') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <Textarea
        id="${named_id}"
        name="${named_id}"
        placeholder="${placeholder}"
        bind:value={$formData.${named_id}}
      />
      {#if $errors.${named_id}}
        <Field.Error>{$errors.${named_id}}</Field.Error>
      {/if}
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Switch
  if (type === 'boolean' && category === 'switch') {
    return `    <Field.Field orientation="horizontal">
      <Field.Content>
        <Field.Label>${label}</Field.Label>
        <Field.Description>${description}</Field.Description>
      </Field.Content>
      <Switch
        id="${named_id}"
        name="${named_id}"
        bind:checked={$formData.${named_id}}
      />
    </Field.Field>
`;
  }

  // Checkbox
  if (type === 'boolean' && category === 'checkbox') {
    return `    <Field.Field orientation="horizontal">
      <Checkbox
        id="${named_id}"
        name="${named_id}"
        bind:checked={$formData.${named_id}}
      />
      <Field.Content>
        <Field.Label>${label}</Field.Label>
        <Field.Description>${description}</Field.Description>
      </Field.Content>
    </Field.Field>
`;
  }

  // Select
  if (type === 'select') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <Select.Root type="single" name="${named_id}" bind:value={$formData.${named_id}}>
        <Select.Trigger>
          <Select.Value placeholder="${placeholder}" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="option1">Option 1</Select.Item>
          <Select.Item value="option2">Option 2</Select.Item>
          <Select.Item value="option3">Option 3</Select.Item>
        </Select.Content>
      </Select.Root>
      {#if $errors.${named_id}}
        <Field.Error>{$errors.${named_id}}</Field.Error>
      {/if}
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Radio Group
  if (type === 'radio') {
    return `    <Field.Set>
      <Field.Legend>${label}</Field.Legend>
      <Field.Description>${description}</Field.Description>
      <RadioGroup.Root name="${named_id}" bind:value={$formData.${named_id}}>
        <Field.Field orientation="horizontal">
          <RadioGroup.Item value="option1" />
          <Field.Label>Option 1</Field.Label>
        </Field.Field>
        <Field.Field orientation="horizontal">
          <RadioGroup.Item value="option2" />
          <Field.Label>Option 2</Field.Label>
        </Field.Field>
        <Field.Field orientation="horizontal">
          <RadioGroup.Item value="option3" />
          <Field.Label>Option 3</Field.Label>
        </Field.Field>
      </RadioGroup.Root>
      {#if $errors.${named_id}}
        <Field.Error>{$errors.${named_id}}</Field.Error>
      {/if}
    </Field.Set>
`;
  }

  // Slider
  if (type === 'slider') {
    return `    <Field.Field>
      <Field.Label>${label}: {$formData.${named_id}}</Field.Label>
      <Slider
        name="${named_id}"
        min={${field.min || 0}}
        max={${field.max || 100}}
        bind:value={$formData.${named_id}}
      />
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Date Picker
  if (type === 'date-picker') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <Popover.Root>
        <Popover.Trigger
          class={[buttonVariants({ variant: 'outline' }), 'w-full justify-start pl-4 text-left font-normal', !$formData.${named_id} && 'text-muted-foreground']}
        >
          {$formData.${named_id} || '${placeholder || 'Pick a date'}'}
          <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
        </Popover.Trigger>
        <Popover.Content class="w-auto p-0" side="bottom">
          <CalendarPrimitive.Root
            type="single"
            bind:value={dateValue}
            onValueChange={(v) => { $formData.${named_id} = v?.toString() || ''; }}
            class="rounded-md border p-3"
          >
            {#snippet children({ months, weekdays })}
              <Calendar.Header>
                <Calendar.Heading />
                <Calendar.PrevButton />
                <Calendar.NextButton />
              </Calendar.Header>
              <Calendar.Months>
                {#each months as month}
                  <Calendar.Grid>
                    <Calendar.GridHead>
                      <Calendar.GridRow>
                        {#each weekdays as day}
                          <Calendar.HeadCell>{day}</Calendar.HeadCell>
                        {/each}
                      </Calendar.GridRow>
                    </Calendar.GridHead>
                    <Calendar.GridBody>
                      {#each month.weeks as week}
                        <Calendar.GridRow>
                          {#each week as day}
                            <Calendar.Cell {day} month={month.value}>
                              <Calendar.Day />
                            </Calendar.Cell>
                          {/each}
                        </Calendar.GridRow>
                      {/each}
                    </Calendar.GridBody>
                  </Calendar.Grid>
                {/each}
              </Calendar.Months>
            {/snippet}
          </CalendarPrimitive.Root>
        </Popover.Content>
      </Popover.Root>
      <input type="hidden" name="${named_id}" bind:value={$formData.${named_id}} />
      {#if $errors.${named_id}}
        <Field.Error>{$errors.${named_id}}</Field.Error>
      {/if}
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Input OTP
  if (type === 'input-otp') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <InputOTP.Root
        maxlength={6}
        name="${named_id}"
        bind:value={$formData.${named_id}}
        pattern={REGEXP_ONLY_DIGITS}
      >
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
      {#if $errors.${named_id}}
        <Field.Error>{$errors.${named_id}}</Field.Error>
      {/if}
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Combobox
  if (type === 'combobox') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <Popover.Root bind:open={comboOpen}>
        <Popover.Trigger bind:ref={triggerRef}>
          {#snippet child({ props })}
            <Button variant="outline" class="w-full justify-between" {...props} role="combobox">
              {$formData.${named_id} || '${placeholder || 'Select...'}'}
              <ChevronsUpDown class="opacity-50" />
            </Button>
          {/snippet}
        </Popover.Trigger>
        <Popover.Content align="start" class="w-full p-0">
          <Command.Root>
            <Command.Input placeholder="${placeholder || 'Search...'}" class="h-9" />
            <Command.List class="w-full">
              <Command.Empty>No results found.</Command.Empty>
              <Command.Group>
                {#each options as option}
                  <Command.Item
                    value={option.value}
                    onSelect={() => { $formData.${named_id} = option.value; comboOpen = false; }}
                  >
                    <Check class={cn($formData.${named_id} !== option.value && 'text-transparent')} />
                    {option.label}
                  </Command.Item>
                {/each}
              </Command.Group>
            </Command.List>
          </Command.Root>
        </Popover.Content>
      </Popover.Root>
      <input type="hidden" name="${named_id}" bind:value={$formData.${named_id}} />
      {#if $errors.${named_id}}
        <Field.Error>{$errors.${named_id}}</Field.Error>
      {/if}
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // File Input
  if (type === 'file') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <FileDropZone
        onUpload={handleFileUpload}
        onFileRejected={handleFileRejected}
        maxFileSize={10 * MEGABYTE}
        accept="image/*"
        maxFiles={4}
        class="mt-1"
      />
      {#if uploadedFiles.length > 0}
        <div class="mt-2 space-y-2">
          {#each uploadedFiles as file, i}
            <div class="flex items-center justify-between p-2 border rounded" transition:slide>
              <span class="text-sm truncate">{file.name} ({displaySize(file.size)})</span>
              <Button variant="ghost" size="sm" onclick={() => removeFile(i)}>
                <Trash2 class="h-4 w-4" />
              </Button>
            </div>
          {/each}
        </div>
      {/if}
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Phone Input
  if (type === 'phone') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <PhoneInput
        country="IN"
        name="${named_id}"
        placeholder="${placeholder || 'Enter phone number'}"
        bind:value={$formData.${named_id}}
      />
      {#if $errors.${named_id}}
        <Field.Error>{$errors.${named_id}}</Field.Error>
      {/if}
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Location Input
  if (type === 'location-input') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <LocationSelector bind:selectedCountry bind:selectedState />
      <input type="hidden" name="country" value={selectedCountry?.name || ''} />
      <input type="hidden" name="state" value={selectedState?.name || ''} />
      {#if $errors.country}
        <Field.Error>{$errors.country}</Field.Error>
      {/if}
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Tags Input
  if (type === 'tags-input') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <TagsInput
        placeholder="${placeholder || 'Add tag...'}"
        bind:value={$formData.${named_id}}
      />
      <input type="hidden" name="${named_id}" value={JSON.stringify($formData.${named_id})} />
      {#if $errors.${named_id}}
        <Field.Error>{$errors.${named_id}}</Field.Error>
      {/if}
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Default fallback for unsupported types
  return `    <!-- ${type} field: ${label} - Add custom implementation -->
    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <Input
        id="${named_id}"
        name="${named_id}"
        placeholder="${placeholder}"
        bind:value={$formData.${named_id}}
      />
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
}

// Generate Remote Functions server code
export function generateRemoteServer(schemaType: SchemaType): string {
  return `import { form } from '$app/server';
import { schema } from './schema';

export const submitForm = form(schema, async (data) => {
  // Handle form submission
  console.log('Form data:', data);

  // Return success or error
  return { success: true, message: 'Form submitted successfully!' };
});`;
}

// Generate Remote Functions client code with Field component
export function generateRemoteClient(rows: FieldRow[]): string {
  const fields = rows.flatMap(r => r.fields);
  const uniqueImports = getUniqueImports(fields);

  let code = `<script lang="ts">
  import { submitForm } from './data.remote';
  // Field Components
  import * as Field from '$lib/components/ui/field';
  // UI Components
  import { Button } from '$lib/components/ui/button';`;

  // Add component-specific imports
  if (uniqueImports.has('Input')) {
    code += `\n  import { Input } from '$lib/components/ui/input';`;
  }
  if (uniqueImports.has('Textarea')) {
    code += `\n  import { Textarea } from '$lib/components/ui/textarea';`;
  }
  if (uniqueImports.has('Switch')) {
    code += `\n  import { Switch } from '$lib/components/ui/switch';`;
  }
  if (uniqueImports.has('Checkbox')) {
    code += `\n  import { Checkbox } from '$lib/components/ui/checkbox';`;
  }
  if (uniqueImports.has('Select')) {
    code += `\n  import * as Select from '$lib/components/ui/select';`;
  }
  if (uniqueImports.has('RadioGroup')) {
    code += `\n  import * as RadioGroup from '$lib/components/ui/radio-group';`;
  }
  if (uniqueImports.has('Slider')) {
    code += `\n  import { Slider } from '$lib/components/ui/slider';`;
  }
  if (uniqueImports.has('DatePicker')) {
    code += `\n  import * as Popover from '$lib/components/ui/popover';`;
    code += `\n  import { Calendar as CalendarPrimitive } from 'bits-ui';`;
    code += `\n  import * as Calendar from '$lib/components/ui/calendar';`;
    code += `\n  import CalendarIcon from '@lucide/svelte/icons/calendar';`;
    code += `\n  import { buttonVariants } from '$lib/components/ui/button';`;
    code += `\n  import { CalendarDate, type DateValue, getLocalTimeZone, today, DateFormatter } from '@internationalized/date';`;
  }
  if (uniqueImports.has('InputOTP')) {
    code += `\n  import * as InputOTP from '$lib/components/ui/input-otp';`;
    code += `\n  import { REGEXP_ONLY_DIGITS } from 'bits-ui';`;
  }
  if (uniqueImports.has('Combobox')) {
    code += `\n  import * as Popover from '$lib/components/ui/popover';`;
    code += `\n  import * as Command from '$lib/components/ui/command';`;
    code += `\n  import Check from '@lucide/svelte/icons/check';`;
    code += `\n  import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';`;
    code += `\n  import { cn } from '$lib/utils';`;
    code += `\n  import { tick } from 'svelte';`;
  }
  if (uniqueImports.has('FileDropZone')) {
    code += `\n  import { toast } from 'svelte-sonner';`;
    code += `\n  import { displaySize, FileDropZone, MEGABYTE, type FileDropZoneProps } from '$lib/components/ui/file-drop-zone';`;
    code += `\n  import { fly, slide } from 'svelte/transition';`;
    code += `\n  import Trash2 from '@lucide/svelte/icons/trash-2';`;
  }
  if (uniqueImports.has('PhoneInput')) {
    code += `\n  import PhoneInput from '$lib/components/ui/phone-input/phone-input.svelte';`;
  }
  if (uniqueImports.has('LocationInput')) {
    code += `\n  import LocationSelector from '$lib/components/templates/comps/location-input/LocationSelector.svelte';`;
  }
  if (uniqueImports.has('TagsInput')) {
    code += `\n  import TagsInput from '$lib/components/ui/tags-input/tags-input.svelte';`;
  }

  code += `
<\/script>

<form {...submitForm} class="space-y-4">
  <Field.Group>
`;

  // Generate code for each row, handling side-by-side layout
  rows.forEach(row => {
    if (row.fields.length > 1) {
      // Side-by-side layout
      code += `    <div class="grid grid-cols-2 gap-4">\n`;
      row.fields.forEach(field => {
        code += `      <div>\n`;
        // Add extra indentation for side-by-side fields
        const fieldCode = generateRemoteFieldCode(field).replace(/^    /gm, '        ');
        code += fieldCode;
        code += `      </div>\n`;
      });
      code += `    </div>\n`;
    } else if (row.fields.length === 1) {
      // Single field - full width
      code += generateRemoteFieldCode(row.fields[0]);
    }
  });

  code += `  </Field.Group>

  <Button type="submit">Submit</Button>
</form>`;

  return code;
}

// Generate code for a single field in Remote mode (no binding, uses native form)
function generateRemoteFieldCode(field: InputTypeV2): string {
  const { type, category, named_id, label, description, placeholder } = field;

  // Handle display elements
  if (type === 'h1') {
    return `    <h1 class="text-2xl font-bold">${label}</h1>\n`;
  }
  if (type === 'h2') {
    return `    <h2 class="text-xl font-semibold">${label}</h2>\n`;
  }
  if (type === 'h3') {
    return `    <h3 class="text-lg font-medium">${label}</h3>\n`;
  }
  if (type === 'desc') {
    return `    <p class="text-muted-foreground text-sm">${label}</p>\n`;
  }
  if (type === 'separator') {
    return `    <Field.Separator />\n`;
  }

  // Text-based inputs (text, email, password, number)
  if (type === 'text' || type === 'email' || type === 'password' || type === 'number') {
    return `    <Field.Field>
      <Field.Label for="${named_id}">${label}</Field.Label>
      <Input
        type="${type}"
        id="${named_id}"
        name="${named_id}"
        placeholder="${placeholder}"
      />
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Textarea
  if (type === 'textarea') {
    return `    <Field.Field>
      <Field.Label for="${named_id}">${label}</Field.Label>
      <Textarea
        id="${named_id}"
        name="${named_id}"
        placeholder="${placeholder}"
      />
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Switch
  if (type === 'boolean' && category === 'switch') {
    return `    <Field.Field orientation="horizontal">
      <Field.Content>
        <Field.Label for="${named_id}">${label}</Field.Label>
        <Field.Description>${description}</Field.Description>
      </Field.Content>
      <Switch id="${named_id}" name="${named_id}" />
    </Field.Field>
`;
  }

  // Checkbox
  if (type === 'boolean' && category === 'checkbox') {
    return `    <Field.Field orientation="horizontal">
      <Checkbox id="${named_id}" name="${named_id}" />
      <Field.Content>
        <Field.Label for="${named_id}">${label}</Field.Label>
        <Field.Description>${description}</Field.Description>
      </Field.Content>
    </Field.Field>
`;
  }

  // Select
  if (type === 'select') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <Select.Root type="single" name="${named_id}">
        <Select.Trigger>
          <Select.Value placeholder="${placeholder}" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="option1">Option 1</Select.Item>
          <Select.Item value="option2">Option 2</Select.Item>
          <Select.Item value="option3">Option 3</Select.Item>
        </Select.Content>
      </Select.Root>
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Radio Group
  if (type === 'radio') {
    return `    <Field.Set>
      <Field.Legend>${label}</Field.Legend>
      <Field.Description>${description}</Field.Description>
      <RadioGroup.Root name="${named_id}">
        <Field.Field orientation="horizontal">
          <RadioGroup.Item value="option1" />
          <Field.Label>Option 1</Field.Label>
        </Field.Field>
        <Field.Field orientation="horizontal">
          <RadioGroup.Item value="option2" />
          <Field.Label>Option 2</Field.Label>
        </Field.Field>
        <Field.Field orientation="horizontal">
          <RadioGroup.Item value="option3" />
          <Field.Label>Option 3</Field.Label>
        </Field.Field>
      </RadioGroup.Root>
    </Field.Set>
`;
  }

  // Slider
  if (type === 'slider') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <Slider
        name="${named_id}"
        min={${field.min || 0}}
        max={${field.max || 100}}
      />
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Date Picker
  if (type === 'date-picker') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <Popover.Root>
        <Popover.Trigger
          class={[buttonVariants({ variant: 'outline' }), 'w-full justify-start pl-4 text-left font-normal', !dateValue && 'text-muted-foreground']}
        >
          {dateValue || '${placeholder || 'Pick a date'}'}
          <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
        </Popover.Trigger>
        <Popover.Content class="w-auto p-0" side="bottom">
          <CalendarPrimitive.Root
            type="single"
            bind:value={dateValue}
            class="rounded-md border p-3"
          >
            {#snippet children({ months, weekdays })}
              <Calendar.Header>
                <Calendar.Heading />
                <Calendar.PrevButton />
                <Calendar.NextButton />
              </Calendar.Header>
              <Calendar.Months>
                {#each months as month}
                  <Calendar.Grid>
                    <Calendar.GridHead>
                      <Calendar.GridRow>
                        {#each weekdays as day}
                          <Calendar.HeadCell>{day}</Calendar.HeadCell>
                        {/each}
                      </Calendar.GridRow>
                    </Calendar.GridHead>
                    <Calendar.GridBody>
                      {#each month.weeks as week}
                        <Calendar.GridRow>
                          {#each week as day}
                            <Calendar.Cell {day} month={month.value}>
                              <Calendar.Day />
                            </Calendar.Cell>
                          {/each}
                        </Calendar.GridRow>
                      {/each}
                    </Calendar.GridBody>
                  </Calendar.Grid>
                {/each}
              </Calendar.Months>
            {/snippet}
          </CalendarPrimitive.Root>
        </Popover.Content>
      </Popover.Root>
      <input type="hidden" name="${named_id}" value={dateValue?.toString() || ''} />
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Input OTP
  if (type === 'input-otp') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <InputOTP.Root
        maxlength={6}
        name="${named_id}"
        bind:value={otpValue}
        pattern={REGEXP_ONLY_DIGITS}
      >
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
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Combobox
  if (type === 'combobox') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <Popover.Root bind:open={comboOpen}>
        <Popover.Trigger bind:ref={triggerRef}>
          {#snippet child({ props })}
            <Button variant="outline" class="w-full justify-between" {...props} role="combobox">
              {selectedValue || '${placeholder || 'Select...'}'}
              <ChevronsUpDown class="opacity-50" />
            </Button>
          {/snippet}
        </Popover.Trigger>
        <Popover.Content align="start" class="w-full p-0">
          <Command.Root>
            <Command.Input placeholder="${placeholder || 'Search...'}" class="h-9" />
            <Command.List class="w-full">
              <Command.Empty>No results found.</Command.Empty>
              <Command.Group>
                {#each options as option}
                  <Command.Item
                    value={option.value}
                    onSelect={() => { selectedValue = option.value; comboOpen = false; }}
                  >
                    <Check class={cn(selectedValue !== option.value && 'text-transparent')} />
                    {option.label}
                  </Command.Item>
                {/each}
              </Command.Group>
            </Command.List>
          </Command.Root>
        </Popover.Content>
      </Popover.Root>
      <input type="hidden" name="${named_id}" value={selectedValue} />
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // File Input
  if (type === 'file') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <FileDropZone
        onUpload={handleFileUpload}
        onFileRejected={handleFileRejected}
        maxFileSize={10 * MEGABYTE}
        accept="image/*"
        maxFiles={4}
        class="mt-1"
      />
      {#if uploadedFiles.length > 0}
        <div class="mt-2 space-y-2">
          {#each uploadedFiles as file, i}
            <div class="flex items-center justify-between p-2 border rounded" transition:slide>
              <span class="text-sm truncate">{file.name} ({displaySize(file.size)})</span>
              <Button variant="ghost" size="sm" onclick={() => removeFile(i)}>
                <Trash2 class="h-4 w-4" />
              </Button>
            </div>
          {/each}
        </div>
      {/if}
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Phone Input
  if (type === 'phone') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <PhoneInput
        country="IN"
        name="${named_id}"
        placeholder="${placeholder || 'Enter phone number'}"
        bind:value={phoneValue}
      />
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Location Input
  if (type === 'location-input') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <LocationSelector bind:selectedCountry bind:selectedState />
      <input type="hidden" name="country" value={selectedCountry?.name || ''} />
      <input type="hidden" name="state" value={selectedState?.name || ''} />
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Tags Input
  if (type === 'tags-input') {
    return `    <Field.Field>
      <Field.Label>${label}</Field.Label>
      <TagsInput
        placeholder="${placeholder || 'Add tag...'}"
        bind:value={tags}
      />
      <input type="hidden" name="${named_id}" value={JSON.stringify(tags)} />
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
  }

  // Default fallback
  return `    <!-- ${type} field: ${label} - Add custom implementation -->
    <Field.Field>
      <Field.Label for="${named_id}">${label}</Field.Label>
      <Input id="${named_id}" name="${named_id}" placeholder="${placeholder}" />
      <Field.Description>${description}</Field.Description>
    </Field.Field>
`;
}

// Generate JSON export
export function generateJSON(fields: InputTypeV2[]): string {
  const exportData = {
    version: '2.0',
    fields: fields.map(f => ({
      id: f.id,
      name: f.name,
      type: f.type,
      category: f.category,
      label: f.label,
      placeholder: f.placeholder,
      description: f.description,
      required: f.required,
      disabled: f.disabled,
      position: f.position,
    }))
  };
  return JSON.stringify(exportData, null, 2);
}

// Get install command based on package manager
function getInstallCmd(pm: PackageManager): string {
  switch (pm) {
    case 'npm': return 'npm install';
    case 'pnpm': return 'pnpm add';
    case 'yarn': return 'yarn add';
    case 'bun': return 'bun add';
  }
}

// Get npx equivalent based on package manager
function getRunnerCmd(pm: PackageManager): string {
  switch (pm) {
    case 'npm': return 'npx';
    case 'pnpm': return 'pnpm dlx';
    case 'yarn': return 'yarn dlx';
    case 'bun': return 'bunx';
  }
}

// Map component imports to shadcn-svelte component names
function getShadcnComponents(imports: Set<string>): string[] {
  const components: string[] = ['button', 'field']; // button and field are mandatory

  imports.forEach(imp => {
    switch (imp) {
      case 'Input':
        components.push('input');
        break;
      case 'Textarea':
        components.push('textarea');
        break;
      case 'Switch':
        components.push('switch');
        break;
      case 'Checkbox':
        components.push('checkbox');
        break;
      case 'Select':
        components.push('select');
        break;
      case 'RadioGroup':
        components.push('radio-group');
        break;
      case 'Slider':
        components.push('slider');
        break;
      case 'InputOTP':
        components.push('input-otp');
        break;
      case 'Combobox':
        components.push('popover', 'command');
        break;
      case 'DatePicker':
        components.push('popover', 'calendar');
        break;
    }
  });

  // Remove duplicates and return
  return [...new Set(components)];
}

// Get jsrepo commands for extra components
function getJsrepoCommands(imports: Set<string>): string[] {
  const commands: string[] = [];

  imports.forEach(imp => {
    switch (imp) {
      case 'FileDropZone':
        commands.push('jsrepo add github/ieedan/shadcn-svelte-extras/ui/file-drop-zone');
        break;
      case 'PhoneInput':
        commands.push('jsrepo add github/ieedan/shadcn-svelte-extras/ui/phone-input');
        break;
      case 'LocationInput':
        commands.push('jsrepo add github/sikandarjodd/form-builder/comps/location-input');
        break;
      case 'TagsInput':
        commands.push('jsrepo add github/ieedan/shadcn-svelte-extras/ui/tags-input');
        break;
    }
  });

  return commands;
}

// Check if extra dependencies are needed
function needsExtraDeps(imports: Set<string>): boolean {
  return imports.has('DatePicker') || imports.has('InputOTP') || imports.has('FileDropZone');
}

// Generate install command with field component
export function generateInstallCommand(fields: InputTypeV2[], schemaType: SchemaType, mode: ModeType, packageManager: PackageManager = 'npm'): string {
  const pkg = schemaType === 'arktype' ? 'arktype' : schemaType;
  const installCmd = getInstallCmd(packageManager);
  const runnerCmd = getRunnerCmd(packageManager);

  // Get unique imports needed
  const imports = getUniqueImports(fields);
  const shadcnComponents = getShadcnComponents(imports);
  const jsrepoCommands = getJsrepoCommands(imports);
  const needsExtras = needsExtraDeps(imports);

  let command = '';

  if (mode === 'superforms') {
    command += `${installCmd} sveltekit-superforms ${pkg}\n\n`;
  } else {
    command += `${installCmd} ${pkg}\n\n`;
  }

  command += `# Add UI components (field component includes label, description, error)\n`;
  command += `${runnerCmd} shadcn-svelte@next add ${shadcnComponents.join(' ')}\n`;

  if (needsExtras) {
    command += `\n# Additional dependencies for advanced components\n`;
    command += `${installCmd} @internationalized/date bits-ui svelte-sonner\n`;
  }

  if (jsrepoCommands.length > 0) {
    command += `\n# Extra components from jsrepo\n`;
    command += jsrepoCommands.join('\n') + '\n';
  }

  if (mode === 'remote') {
    command += `\n# Note: Remote Functions require SvelteKit 2.27+`;
  }

  return command.trim();
}

// Generate file structure ASCII diagram
export function generateFileStructure(mode: ModeType): string {
  if (mode === 'superforms') {
    return `📁 your-route/
├── +page.svelte
├── +page.server.ts
└── schema.ts`;
  }

  // Remote Functions mode
  return `📁 your-route/
├── +page.svelte
├── data.remote.ts
└── schema.ts`;
}

// Generate all code at once
export function generateAllCode(
  rows: FieldRow[],
  schemaType: SchemaType,
  mode: ModeType,
  packageManager: PackageManager = 'npm'
): GeneratedCode {
  // Flatten fields for schema and JSON generation
  const fields = rows.flatMap(r => r.fields);

  return {
    schema: generateSchema(fields, schemaType),
    client: mode === 'superforms'
      ? generateSuperformsClient(rows, schemaType)
      : generateRemoteClient(rows),
    server: mode === 'superforms'
      ? generateSuperformsServer(schemaType)
      : generateRemoteServer(schemaType),
    json: generateJSON(fields),
    install: generateInstallCommand(fields, schemaType, mode, packageManager),
    structure: generateFileStructure(mode),
  };
}

