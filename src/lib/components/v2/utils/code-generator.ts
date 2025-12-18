// V2 Code Generator Utility
// On-demand code generation (not derived) for performance
// Uses shadcn-svelte Field component pattern

import type { InputTypeV2, SchemaType, ModeType } from '../state/form-v2.svelte';

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

    if (field.type === 'number') {
      fieldSchema = `z.number({ error: "Please enter a valid number." })`;
    } else if (field.type === 'boolean') {
      fieldSchema = `z.boolean().default(false)`;
    } else if (field.type === 'email') {
      fieldSchema = `z.email({ error: "Please enter a valid email." })`;
    }

    if (field.required && field.type !== 'boolean') {
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

    if (field.type === 'number') {
      fieldSchema = `v.pipe(v.number(), v.integer())`;
    } else if (field.type === 'boolean') {
      fieldSchema = `v.optional(v.boolean(), false)`;
    } else if (field.type === 'email') {
      fieldSchema = `v.pipe(v.string(), v.email('Please enter a valid email.'))`;
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

    if (field.type === 'number') {
      fieldSchema = `"number"`;
    } else if (field.type === 'boolean') {
      fieldSchema = `"boolean"`;
    } else if (field.type === 'email') {
      fieldSchema = `"string.email"`;
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
export function generateSuperformsClient(fields: InputTypeV2[], schemaType: SchemaType): string {
  const adapter = getClientAdapter(schemaType);
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

  fields.forEach(field => {
    code += generateFieldCode(field);
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

export const submitForm = form(schema, async (data, { cookies }) => {
  // Handle form submission
  console.log('Form data:', data);

  // Return success or error
  return { success: true, message: 'Form submitted successfully!' };
});`;
}

// Generate Remote Functions client code with Field component
export function generateRemoteClient(fields: InputTypeV2[]): string {
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

  code += `
<\/script>

<form action={submitForm} class="space-y-4">
  <Field.Group>
`;

  fields.forEach(field => {
    code += generateRemoteFieldCode(field);
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

// Generate install command with field component
export function generateInstallCommand(schemaType: SchemaType, mode: ModeType, packageManager: PackageManager = 'npm'): string {
  const pkg = schemaType === 'arktype' ? 'arktype' : schemaType;
  const installCmd = getInstallCmd(packageManager);
  const runnerCmd = getRunnerCmd(packageManager);

  if (mode === 'superforms') {
    return `${installCmd} sveltekit-superforms ${pkg}

# Add UI components (field component includes label, description, error)
${runnerCmd} shadcn-svelte@next add button field input textarea switch checkbox select radio-group slider`;
  }

  // Remote functions don't need superforms
  return `${installCmd} ${pkg}

# Add UI components (field component includes label, description, error)
${runnerCmd} shadcn-svelte@next add button field input textarea switch checkbox select radio-group slider

# Note: Remote Functions require SvelteKit 2.27+`;
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
  fields: InputTypeV2[],
  schemaType: SchemaType,
  mode: ModeType,
  packageManager: PackageManager = 'npm'
): GeneratedCode {
  return {
    schema: generateSchema(fields, schemaType),
    client: mode === 'superforms'
      ? generateSuperformsClient(fields, schemaType)
      : generateRemoteClient(fields),
    server: mode === 'superforms'
      ? generateSuperformsServer(schemaType)
      : generateRemoteServer(schemaType),
    json: generateJSON(fields),
    install: generateInstallCommand(schemaType, mode, packageManager),
    structure: generateFileStructure(mode),
  };
}

