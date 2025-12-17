// V2 Code Generator Utility
// On-demand code generation (not derived) for performance

import type { InputTypeV2, SchemaType, ModeType } from '../state/form-v2.svelte';

export type CodeTab = 'client' | 'server' | 'schema' | 'json' | 'install';
export type ClientServerVariant = 'client' | 'server';

export interface GeneratedCode {
  schema: string;
  client: string;
  server: string;
  json: string;
  install: string;
}

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

// Generate Superforms client code (simplified)
export function generateSuperformsClient(fields: InputTypeV2[], schemaType: SchemaType): string {
  const adapter = getClientAdapter(schemaType);

  let imports = `<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import { ${adapter} } from 'sveltekit-superforms/adapters';
  import type { PageData } from './$types';
  import { schema } from './schema';
  import { untrack } from 'svelte';
  // UI Components
  import Button from '$lib/components/ui/button/button.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  import Input from '$lib/components/ui/input/input.svelte';

  let { data }: { data: PageData } = $props();

  const { form, errors, enhance } = superForm(
    untrack(() => data.form),
    { validators: ${adapter}(schema) }
  );
<\/script>

<form method="POST" use:enhance class="space-y-4">
`;

  fields.forEach(field => {
    if (field.type === 'h1' || field.type === 'h2' || field.type === 'h3' || field.type === 'desc' || field.type === 'separator') {
      return;
    }

    imports += `  <div>
    <Label for="${field.named_id}">${field.label}</Label>
    <Input type="${field.type === 'email' ? 'email' : 'text'}" id="${field.named_id}" name="${field.named_id}" bind:value={$form.${field.named_id}} />
    {#if $errors.${field.named_id}}<p class="text-sm text-destructive">{$errors.${field.named_id}}</p>{/if}
  </div>
`;
  });

  imports += `  <Button type="submit">Submit</Button>
</form>`;

  return imports;
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

// Generate Remote Functions client code
export function generateRemoteClient(fields: InputTypeV2[]): string {
  let code = `<script lang="ts">
  import { submitForm } from './+page.server';
  import Button from '$lib/components/ui/button/button.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
<\/script>

<form action={submitForm} class="space-y-4">
`;

  fields.forEach(field => {
    if (field.type === 'h1' || field.type === 'h2' || field.type === 'h3' || field.type === 'desc' || field.type === 'separator') {
      return;
    }

    code += `  <div>
    <Label for="${field.named_id}">${field.label}</Label>
    <Input type="${field.type === 'email' ? 'email' : 'text'}" id="${field.named_id}" name="${field.named_id}" />
  </div>
`;
  });

  code += `  <Button type="submit">Submit</Button>
</form>`;

  return code;
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

// Generate install command
export function generateInstallCommand(schemaType: SchemaType, mode: ModeType): string {
  const pkg = schemaType === 'arktype' ? 'arktype' : schemaType;

  if (mode === 'superforms') {
    return `npm install sveltekit-superforms ${pkg}
npx shadcn-svelte@next add button label input`;
  }

  // Remote functions don't need superforms
  return `npm install ${pkg}
npx shadcn-svelte@next add button label input

# Note: Remote Functions require SvelteKit 2.27+`;
}

// Generate all code at once
export function generateAllCode(
  fields: InputTypeV2[],
  schemaType: SchemaType,
  mode: ModeType
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
    install: generateInstallCommand(schemaType, mode),
  };
}

