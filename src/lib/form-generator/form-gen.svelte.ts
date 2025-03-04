export type InputType = {
  id?: string;
  name: string;
  named_id?: string;
  type: string;
  min?: number;
  max?: number;
  label?: string;
  category: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  isNew?: boolean;
};
let dummyInput: InputType[] = [
  {
    name: "Input",
    type: "text",
    category: "text",
    label: "Username",
    description: "This is your public display name",
    placeholder: "Enter your username",
    min: 0,
    max: 0,
  },
  {
    name: "Email",
    type: "email",
    category: "email",
    label: "Email",
    description: "Enter your email address",
    placeholder: "Enter your email",
    min: 0,
    max: 0,
  },
  {
    name: "Textarea",
    type: "textarea",
    category: "textarea",
    label: "Bio",
    description: "Tell us about yourself",
    placeholder: "Enter your bio",
    min: 0,
    max: 0,
  },
  {
    name: "Password",
    type: "password",
    category: "password",
    label: "Password",
    placeholder: "password",
    description: "Enter your password",
    min: 0,
    max: 0,
  },
  {
    name: "Number",
    type: "number",
    category: "number",
    label: "Age",
    description: "This is your age",
    placeholder: "Enter your age",
    min: 0,
    max: 0,
  },
  {
    name: "Switch",
    type: "boolean",
    category: "switch",
    label: "Marketing Email",
    description: "Receive emails about new products, features, and more.",
    placeholder: "Placeholder",
    min: 0,
    max: 0,
  },
  {
    name: "Checkbox",
    type: "boolean",
    category: "checkbox",
    label: "Use different settings for my mobile devices",
    description:
      "You can manage your mobile notifications in the mobile settings page.",
    placeholder: "Placeholder",
    min: 0,
    max: 0,
  },
  {
    name: "File Input",
    type: "file",
    category: "file",
    label: "Upload File*",
    description:
      "Select File to upload.",
    placeholder: "Placeholder",
    min: 0,
    max: 0,
    isNew: true,
  },
  {
    name: "Select",
    type: "select",
    category: "select",
    label: "Framework",
    description: "Select your favorite framework",
    placeholder: "Placeholder",
    min: 0,
    max: 0,
  },
  {
    name: "Input OTP",
    type: "input-otp",
    category: "input-otp",
    label: "One-Time Password",
    description: "Please enter the one-time password sent to your phone.",
    placeholder: "Placeholder",
    min: 0,
    max: 0,
  },
  {
    name: "Date Picker",
    type: "date-picker",
    category: "date-picker",
    label: "Date of Birth",
    description: "Your date of birth is used to calculate your age.",
    placeholder: "Placeholder",
    min: 0,
    max: 0,
    isNew: true,
  },
  {
    name: "Tags Input",
    type: "tags-input",
    category: "tags-input",
    label: "Enter your tech stack.",
    description: "Add tags.",
    placeholder: "Enter your tags",
    min: 0,
    max: 0,
  },
  {
    name: "Phone",
    type: "phone",
    category: "phone",
    label: "Phone number",
    placeholder: "Enter your phone number",
    description: "Enter your phone number",
    min: 0,
    max: 0,
  },
  {
    name: "ComboBox",
    type: "combobox",
    category: "combobox",
    label: "Framework",
    description: "Select your favorite framework",
    placeholder: "Select your favorite framework",
    min: 0,
    max: 0,
  },
];

let min_max_types = ["number", "password", "text", "textarea", "tags-input"];
let non_empty_types = ["date-picker", "email"];

class FormGenerator {
  inputs: InputType[] = dummyInput;
  selected_inputs: InputType[] = $state([]);
  adapter: string = $state("zod");

  unique_imports = $derived.by(() => {
    let all_imports = this.selected_inputs.map((input) => input.category);
    let unique_imports = [...new Set(all_imports)];
    return unique_imports;
  });
  date_picker_named_id = $derived.by(() => {
    // did : date named_id (id) of date-picker
    let did = this.selected_inputs.filter(
      (input) => input.type === "date-picker"
    );
    return did;
  });
  combobox_named_id = $derived.by(() => {
    let comboid = this.selected_inputs.filter(
      (input) => input.type === "combobox"
    );
    return comboid;
  });

  tags_input_named_id = $derived.by(() => {
    let tagid = this.selected_inputs.filter(
      (input) => input.type === "tags-input"
    );
    return tagid;
  });

  file_input_named_id = $derived.by(() => {
    let fileid = this.selected_inputs.filter(
      (input) => input.type === "file"
    );
    return fileid;
  });

  add_input = (item: InputType) => {
    let id = crypto.randomUUID().slice(0, 5);
    let random_id = this.unique_imports.includes(item.category)
      ? `${item.category.split("-").join("")}_${crypto.randomUUID().slice(0, 2)}`
      : item.category.split("-").join("");
    let new_input: InputType = {
      id: id,
      named_id: random_id,
      name: item.name,
      type: item.type,
      category: item.category,
      label: item.label,
      description: item.description,
      placeholder: item.placeholder,
      required: item.required || true,
      min: item.min || 0,
      max: item.max || 0,
    };
    this.selected_inputs.push(new_input);
  };

  remove_input = (id: string) => {
    this.selected_inputs = this.selected_inputs.filter(
      (input) => input.id !== id
    );
  };

  handleDndConsider = (e: CustomEvent) => {
    this.selected_inputs = e.detail.items;
  };

  handleDndFinalize = (e: CustomEvent) => {
    this.selected_inputs = e.detail.items;
  };

  generateZodSchemaString(inputs: InputType[]): string {
    let schemaString = `import { z } from 'zod';
${this.file_input_named_id.length > 0 ? `export const KILOBYTE = 1024;
export const MEGABYTE = 1024 * KILOBYTE;\n`: ''}export let schema = z.object({\n`;

    inputs.forEach((input) => {
      let fieldSchema = `z.string()`;

      if (input.type === "number") {
        fieldSchema = `z.number().int()`;
      } else if (input.type === "boolean") {
        fieldSchema = `z.boolean().default(false)`;
      } else if (input.type === "email") {
        fieldSchema = `z.string().email()`;
      } else if (input.type === "input-otp") {
        fieldSchema = `z.string().min(6, {
      message: "Your one-time password must be at least 6 characters."
  })`;
      } else if (input.type === "date-picker") {
        fieldSchema = `z.string().refine((v) => v,\n { message: "A date of birth is required." })`;
      } else if (input.type === "tags-input") {
        fieldSchema = `z.string().array()`;
      }
      else if (input.type === 'file') {
        fieldSchema = `z.array(z.instanceof(File, {
        message: "Please select an image file.",
      }).refine((file) => file.size <= (MEGABYTE*2) , {
        message:"The image is too large.",
      }))`;
      }

      // Add `min` and `max` constraints if available for number, password, and text fields
      if (min_max_types.includes(input.type)) {
        if (input.min !== undefined && input.min > 0) {
          fieldSchema += `.min(${input.min})`;
        }
        if (
          input.max !== undefined &&
          input.min !== undefined &&
          input.max > 0 &&
          input.max > input.min
        ) {
          fieldSchema += `.max(${input.max})`;
        }
      }
      if (
        !input.required &&
        input.type !== "tags-input" &&
        input.type !== "boolean"
      ) {
        fieldSchema += `.optional()`;
      } else if (
        !non_empty_types.includes(input.type) &&
        input.min === 0 &&
        input.type !== "boolean" &&
        input.type !== "input-otp" && input.type !== "file"
      ) {
        if (input.type === "tags-input") {
          fieldSchema += `\n   .min(1, { message: 'Please enter at least one tag' })`;
        } else {
          fieldSchema += `.nonempty()`;
        }
      }

      schemaString += `  ${input.named_id?.toLowerCase() || "name"
        }: ${fieldSchema},\n`;
    });

    schemaString += `})`;

    return schemaString;
  }

  generateValibotSchemaString(inputs: InputType[]): string {
    let schemaString = `import * as v from 'valibot';
${this.file_input_named_id ? `export const KILOBYTE = 1024;
export const MEGABYTE = 1024 * KILOBYTE; \n`: ''}`;
    schemaString += `export const schema = v.object({\n`;

    inputs.forEach((input) => {
      let fieldSchema = `v.pipe(\n`;

      if (
        input.type === "text" ||
        input.type === "textarea" ||
        input.type === "password" ||
        input.type === "select"
      ) {
        if (!input.required) {
          fieldSchema += `  v.optional(`;
        }
        fieldSchema += `    v.string()`;
        if (!input.required) {
          fieldSchema += `)`;
        }
        if (input.type === "password" && input.required && input.min === 0) {
          fieldSchema += `,\n    v.nonEmpty('Please enter your password.')`;
        } else if (input.required && input.min === 0) {
          fieldSchema += `,\n    v.nonEmpty('Please enter your ${input.label?.toLowerCase() || "name"
            }.')`;
        }
      } else if (input.type === "email") {
        fieldSchema += `    v.string(), v.email('Please enter a valid email address.')`;
      } else if (input.type === "number") {
        fieldSchema += `    v.number()`;
      } else if (input.type === "boolean") {
        fieldSchema += `    v.boolean('false')`;
      } else if (input.type === "input-otp") {
        fieldSchema += `    v.string(),\n    v.minLength(6, 'The string must be 6 or more characters long.')`;
      } else if (input.type === "date-picker") {
        fieldSchema += `    v.date('A date of birth is required.')`;
      } else if (input.type === "tags-input") {
        fieldSchema += `    v.array(v.string(), 'Please enter your tags.')`;
      }
      else if (input.type === 'file') {
        fieldSchema += `v.array(v.pipe(v.file(), v.maxSize(MEGABYTE * 2)))`
      }

      // Add `min` and `max` constraints if available for number, password, and text fields
      if (min_max_types.includes(input.type) && input.required) {
        if (input.min !== undefined && input.min > 0) {
          fieldSchema += `,\n    v.minLength(${input.min}, 'The string must be ${input.min} or more characters long.')`;
        }
        if (
          input.max !== undefined &&
          input.min !== undefined &&
          input.max > 0 &&
          input.max > input.min &&
          input.required
        ) {
          fieldSchema += `,\n    v.maxLength(${input.max}, 'The string must not exceed ${input.max} characters.')`;
        }
      }
      fieldSchema += `\n  )`;

      schemaString += `  ${input.named_id?.toLowerCase() || "name"
        }: ${fieldSchema},\n`;
    });

    schemaString += `})`;

    return schemaString;
  }

  valibotSchema = $derived.by(() => {
    let sh = this.generateValibotSchemaString(this.selected_inputs);
    return sh;
  });
  // Generate schema string
  zodSchema = $derived.by(() => {
    let sh = this.generateZodSchemaString(this.selected_inputs);
    return sh;
  });

  // replace below logic of zod and valibot
  // This is short term logic only for 2 Schema Adapters
  serverCode = $derived.by(() => {
    return `import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { fail, message, superValidate } from 'sveltekit-superforms';
import { ${this.adapter === "zod" ? "zod" : "valibot"
      } } from 'sveltekit-superforms/adapters';

// add your own schema path here
import { schema } from './schema';

export const load: PageServerLoad = async ({ request }) => {
    return { form: await superValidate(${this.adapter === "zod" ? "zod" : "valibot"
      }(schema)) }
};

export const actions: Actions = {
    default: async ({ request }) => {
        let form = await superValidate(request, ${this.adapter === "zod" ? "zod" : "valibot"
      }(schema));
        console.log(form,'form');
        if (!form.valid) {
            return fail(400, { form });
        }
        return message(form, 'Form Posted Successfully!');
    }
};`;
  });

  clientCode = $derived.by(() => {
    let clientrawCode = `<script lang="ts">
	import { superForm${this.file_input_named_id.length > 0 ? ', filesProxy' : ''} } from 'sveltekit-superforms';
    // add your own path
	import type { PageData } from './$types';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';`;

    this.unique_imports.map((input) => {
      if (input === "text") {
        clientrawCode += `
    import Input from '$lib/components/ui/input/input.svelte';`;
      } else if (input === "password") {
        clientrawCode += `
    import PasswordInput from "$lib/components/templates/comps/PasswordInput.svelte";`;
      } else if (input === "switch") {
        clientrawCode += `
    import Switch from "$lib/components/ui/switch/switch.svelte";`;
      } else if (input === "checkbox") {
        clientrawCode += `
    import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';`;
      } else if (input === "textarea") {
        clientrawCode += `
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";`;
      } else if (input === "select") {
        clientrawCode += `
    import * as Select from "$lib/components/ui/select/index";`;
      } else if (input === "input-otp") {
        clientrawCode += `
    import * as InputOTP from "$lib/components/ui/input-otp/index";
    import { REGEXP_ONLY_DIGITS } from "bits-ui";`;
      } else if (input === "date-picker") {
        clientrawCode += `import { CalendarIcon } from "lucide-svelte";
  import * as Popover from "$lib/components/ui/popover";
  import * as Select from "$lib/components/ui/select";
  import * as Calendar from "$lib/components/ui/calendar/index";
  import { Calendar as CalendarPrimitive } from "bits-ui";
  import {
    CalendarDate,
    type DateValue,
    getLocalTimeZone,
    today,
    DateFormatter,
  } from "@internationalized/date";
  // Components
  import { buttonVariants } from "$lib/components/ui/button/button.svelte";
   // Month formatter
  const monthFmt = new DateFormatter("en-US", {
    month: "long",
  });

  // Generate month options
  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((month, i) => ({ value: String(i + 1), label: month }));

  // Generate year options (from 1900 to current year)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1899 }, (_, i) => ({
    label: String(currentYear - i),
    value: String(currentYear - i),
  }));
`;
      } else if (input === "tags-input") {
        clientrawCode += `
    import { TagsInput } from "$lib/components/ui/tags-input";`;
      } else if (input === "phone") {
        clientrawCode += `
    import PhoneInput from "$lib/components/ui/phone-input/phone-input.svelte";`;
      } else if (input === "combobox") {
        clientrawCode += `
    import Check from "lucide-svelte/icons/check";
    import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
    import * as Popover from "$lib/components/ui/popover/index";
    import * as Command from "$lib/components/ui/command/index";
    import { tick } from "svelte";
    import { cn } from "$lib/utils";
    // Combobox
    let frameworks = [
      {
        value: "sveltekit",
        label: "SvelteKit",
      },
      {
        value: "next.js",
        label: "Next.js",
      },
      {
        value: "nuxt.js",
        label: "Nuxt.js",
      },
      {
        value: "remix",
        label: "Remix",
      },
      {
        value: "astro",
        label: "Astro",
      },
    ];`;
      }
      else if (input === 'file') {
        clientrawCode += `
      // File Upload
  import { toast } from "svelte-sonner";
  import {
    displaySize,
    FileDropZone,
    MEGABYTE,
    type FileDropZoneProps,
  } from "$lib/components/ui/file-drop-zone";
  import { fly, slide } from "svelte/transition";
  import { Trash2 } from "lucide-svelte";
  const onFileRejected: FileDropZoneProps["onFileRejected"] = async ({
    reason,
    file,
  }) => {
    toast.error(\`\${ file.name } failed to upload!\`, { description: reason });
  };
  `
      }
    });

    if (this.combobox_named_id.length > 0) {
      this.combobox_named_id.map((combobox) => {
        clientrawCode += `
  // Popover State for ${combobox.named_id}
  let open_${combobox.named_id} = $state(false);
  // Value
  let combovalue_${combobox.named_id} = $state("");
  let triggerRef_${combobox.named_id} = $state<HTMLButtonElement>(null!);

  // Selected Value
  const selectedValue_${combobox.named_id} = $derived(
    frameworks.find((f) => f.value === combovalue_${combobox.named_id})?.label ??
      "Select a framework..."
  );
  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger_${combobox.named_id}() {
    open_${combobox.named_id} = false;
    tick().then(() => {
      triggerRef_${combobox.named_id}.focus();
    });
  }`;
      })
    }
    if (this.date_picker_named_id.length > 0) {
      this.date_picker_named_id.map((date) => {
        clientrawCode += `
  let value_${date.named_id} = $state<DateValue | undefined>();
  let df_${date.named_id} = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  let placeholder_${date.named_id} = $state(today(getLocalTimeZone()));

  const defaultYear_${date.named_id} = $derived(
    placeholder_${date.named_id}
      ? { value: String(placeholder_${date.named_id}.year), label: String(placeholder_${date.named_id}.year) }
      : undefined
  );

  const defaultMonth_${date.named_id} = $derived(
   placeholder_${date.named_id}
      ? {
          value: String(placeholder_${date.named_id}.month),
          label: monthFmt.format(placeholder_${date.named_id}.toDate(getLocalTimeZone())),
        }
      : undefined
  );

  const monthLabel_${date.named_id} = $derived(
    monthOptions.find((m) => m.value === defaultMonth_${date.named_id}?.value)?.label ??
      "Select a month"
  );`
      })
    }

    clientrawCode += `
  // Form Validation & Schema
  import { ${this.adapter} } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';

	let {
		data
	}: {
		data: PageData;
	} = $props();

  let { form, message, errors, enhance } = superForm(data.form, {
      validators: ${this.adapter}(schema)`
    if (this.tags_input_named_id.length > 0 && this.combobox_named_id.length > 0) {

      clientrawCode += `,
        onUpdated(event) {
          if (event.form.valid) {`
      this.tags_input_named_id.map((tag) => {
        clientrawCode += `
                ${tag.named_id}_value = [];`;
      })
      this.combobox_named_id.map((combobox) => {
        clientrawCode += `
            combovalue_${combobox.named_id} = "";`;
      })
      clientrawCode += `
        }
      }`;
    } else if (this.tags_input_named_id.length > 0) {
      // ${this.tags_input_named_id.map((tag) => tag.named_id + '_value' + '= [];\n')}
      clientrawCode += `,
        onUpdated(event) {
          if (event.form.valid) {`;
      this.tags_input_named_id.map((tag) => {
        clientrawCode += `
            ${tag.named_id}_value = [];`;
      })
      clientrawCode += `
          }
        }`;
    } else if (this.combobox_named_id.length > 0) {
      clientrawCode += `,
        onUpdated(event) {
          if (event.form.valid) {`;
      this.combobox_named_id.map((combobox) => {
        clientrawCode += `
            combovalue_${combobox.named_id} = "";`;
      })
      clientrawCode += `}
        }`;
    }
    clientrawCode += `
    });\n`;


    if (this.tags_input_named_id.length > 0) {
      this.tags_input_named_id.map((tag) => {
        clientrawCode += `
    let ${tag.named_id}_value = $state([]);`;
      })
      clientrawCode += `\n$effect(() => {`;
      this.tags_input_named_id.map((tag) => {
        clientrawCode += `
    $form.${tag.named_id} = ${tag.named_id}_value;`;
      }
      )
      clientrawCode += `\n  });`;
    }
    if (this.file_input_named_id.length > 0) {
      clientrawCode += `
  message.subscribe((message) => {
    if (message) {
      toast.success(message.text, {
        description: "Your attachments were uploaded.",
      });
    }
  });
      `
      this.file_input_named_id.map((file) => {
        clientrawCode += `
  let files_${file.named_id} = filesProxy(form, "${file.named_id}");
  let onUpload_${file.named_id}: FileDropZoneProps["onUpload"] = async (uploadedFiles) => {
    // we use set instead of an assignment since it accepts a File[]
    files_${file.named_id}.set([...Array.from($files_${file.named_id}), ...uploadedFiles]);
  };`
      })
    }

    clientrawCode += `\n</script>
<div class="flex min-h-[80vh] flex-col items-center justify-center">
	{#if $message}
		<p class="text-emerald-400">{$message}</p>
	{/if}
  <form method="post" ${this.file_input_named_id.length > 0  ? 'enctype="multipart/form-data"' : ''} use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">`;
    this.selected_inputs.map((input) => {
      if (
        input.type === "text" ||
        input.type === "number" ||
        input.type === "email" ||
        input.type === "tel" ||
        input.type === "url"
      ) {
        clientrawCode += `
    <div>
      <Label for="${input.named_id}" class={$errors.${input.named_id} && "text-destructive"}>${input.label}</Label>
      <Input type="${input.type}" id="${input.named_id}" name="${input.named_id}" placeholder="${input.placeholder}" bind:value={$form.${input.named_id}} />
      {#if $errors.${input.named_id}}
        <p class="text-sm text-destructive">{$errors.${input.named_id}}</p>
      {/if}
      <p class="text-xs text-muted-foreground">
        ${input.description}
      </p>
    </div>
    `;
      } else if (input.type === "password") {
        clientrawCode += `
    <div>
    <!-- Add Password Input Component from : https://github.com/SikandarJODD/form-builder/blob/master/src/lib/components/templates/comps/PasswordInput.svelte -->
      <PasswordInput
        error={$errors.${input.named_id}}
        id="${input.named_id}"
        bind:value={$form.${input.named_id}}
        name="${input.named_id}"
        placeholder="${input.placeholder}"
        desc="${input.description}"
      />
      {#if $errors.${input.named_id}}
        <p class="text-sm text-destructive">{$errors.${input.named_id}}</p>
      {/if}
    </div>
        `;
      } else if (input.category === "switch") {
        clientrawCode += `
    <div class="flex flex-row items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
            <Label for="${input.named_id}" class={$errors.${input.named_id} && "text-destructive"}>
              ${input.label}
            </Label>
            <p class="text-xs text-muted-foreground">
              ${input.description}
            </p>
        </div>
        <Switch bind:checked={$form.${input.named_id}} id="${input.named_id}" name="${input.named_id}"/>
        {#if $errors.${input.named_id}}
          <p class="text-sm text-destructive">{$errors.${input.named_id}}</p>
        {/if}
    </div>`;
      } else if (input.category === "checkbox") {
        clientrawCode += `
    <div class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
      <Checkbox id="${input.named_id}" name="${input.named_id}" bind:checked={$form.${input.named_id}} />
      <div class="space-y-1 leading-none">
        <Label for="${input.named_id}" class={$errors.${input.named_id} && "text-destructive"}>${input.label}</Label>
        <p class="text-xs text-muted-foreground">
          ${input.description}
        </p>
      </div>
            <!-- add input for copy code -->
      <input name="${input.named_id}" id="${input.named_id}" value={$form.${input.named_id}} type="hidden" />
      {#if $errors.${input.named_id}}
        <p class="text-xs text-destructive">{$errors.${input.named_id}}</p>
      {/if}
    </div>
        `;
      } else if (input.category === "textarea") {
        clientrawCode += `
    <div>
      <Label for="${input.named_id}" class={$errors.${input.named_id} && "text-destructive"}>${input.label}</Label>
      <Textarea
        placeholder="Tell us a little bit about yourself"
        class="resize-none"
        id="${input.named_id}"
        name="${input.named_id}"
        bind:value={$form.${input.named_id}}
      />
      <p class="text-xs text-muted-foreground">
        ${input.description}
      </p>
      {#if $errors.${input.named_id}}
        <p class="text-xs text-destructive">{$errors.${input.named_id}}</p>
      {/if}
    </div>
        `;
      } else if (input.category === "select") {
        clientrawCode += `
    <div>
      <Label for="${input.named_id}" class={$errors.${input.named_id} && "text-destructive"}>${input.label}</Label>
      <Select.Root type="single"  bind:value={$form.${input.named_id}}
          name="${input.named_id}">
          <Select.Trigger id="${input.named_id}">
              {$form.${input.named_id}
              ? $form.${input.named_id}
              : "${input.placeholder}"}
          </Select.Trigger>
         <Select.Content>
           <!-- Add your select items here -->
            <Select.Item value="m@example.com" label="m@example.com" />
            <Select.Item value="m@google.com" label="m@google.com" />
            <Select.Item value="m@support.com" label="m@support.com" />
          </Select.Content>
      </Select.Root>
      <p class="text-xs text-muted-foreground">
        ${input.description}
      </p>
      {#if $errors.${input.named_id}}
          <p class="text-sm text-destructive">{$errors.${input.named_id}}</p>
      {/if}
    </div>
      `;
      } else if (input.category === "input-otp") {
        clientrawCode += `
    <div>
      <Label for="${input.named_id}" class={$errors.${input.named_id} && "text-destructive"}>${input.label}</Label>
      <InputOTP.Root
        maxlength={6}
        name="${input.named_id}"
        id="${input.named_id}"
        bind:value={$form.${input.named_id}}
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
      <p class="text-xs text-muted-foreground">
          ${input.description}
      </p>
      {#if $errors.${input.named_id}}
          <p class="text-sm text-destructive">{$errors.${input.named_id}}</p>
      {/if}
    </div>`;
      } else if (input.category === "date-picker") {
        clientrawCode += ` <div class="flex flex-col">
      <div class="grid gap-2">
        <Label>
          ${input.label}
        </Label>
        <Popover.Root>
          <Popover.Trigger
            class={[
              buttonVariants({ variant: "outline" }),
              "w-[250px] justify-start pl-4 text-left font-normal",
              !value_${input.named_id} && "text-muted-foreground",
            ]}
          >
            {value_${input.named_id}
              ? df_${input.named_id}.format(value_${input.named_id}.toDate(getLocalTimeZone()))
              : "Pick a date"}
            <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
          </Popover.Trigger>
          <Popover.Content class="w-auto p-0" side="bottom">
            <CalendarPrimitive.Root
              bind:value={value_${input.named_id}}
              bind:placeholder={placeholder_${input.named_id}}
              class="rounded-md border p-3"
              type="single"
              minValue={new CalendarDate(1900, 1, 1)}
              maxValue={today(getLocalTimeZone())}
              calendarLabel="Date of birth"
              initialFocus
              onValueChange={(v) => {
                if (v) {
                  $form.${input.named_id} = v.toString();
                } else {
                  $form.${input.named_id} = "";
                }
              }}
            >
              {#snippet children({ months, weekdays })}
                <Calendar.Header>
                  <Calendar.Heading
                    class="flex w-full items-center justify-between gap-2"
                  >
                    <Select.Root
                      type="single"
                      value={defaultMonth_${input.named_id}?.value}
                      onValueChange={(v) => {
                        if (!placeholder_${input.named_id}) return;
                        if (v === \`\${placeholder_${input.named_id}.month}\`) return;
                        placeholder_${input.named_id} = placeholder_${input.named_id}.set({
                          month: Number.parseInt(v),
                        });
                      }}
                    >
                      <Select.Trigger aria-label="Select month" class="w-[60%]">
                        {monthLabel_${input.named_id}}
                      </Select.Trigger>
                      <Select.Content class="max-h-[200px] overflow-y-auto">
                        {#each monthOptions as { value, label }}
                          <Select.Item {value} {label} />
                        {/each}
                      </Select.Content>
                    </Select.Root>
                    <Select.Root
                      type="single"
                      value={defaultYear_${input.named_id}?.value}
                      onValueChange={(v) => {
                        if (!v || !placeholder_${input.named_id}) return;
                        if (v === \`\${placeholder_${input.named_id}?.year}\`) return;
                        placeholder_${input.named_id} = placeholder_${input.named_id}.set({
                          year: Number.parseInt(v),
                        });
                      }}
                    >
                      <Select.Trigger aria-label="Select year" class="w-[40%]">
                        {defaultYear_${input.named_id}?.label ?? "Select year"}
                      </Select.Trigger>
                      <Select.Content class="max-h-[200px] overflow-y-auto">
                        {#each yearOptions as { value, label }}
                          <Select.Item {value} {label} />
                        {/each}
                      </Select.Content>
                    </Select.Root>
                  </Calendar.Heading>
                </Calendar.Header>
                <Calendar.Months>
                  {#each months as month}
                    <Calendar.Grid>
                      <Calendar.GridHead>
                        <Calendar.GridRow class="flex">
                          {#each weekdays as weekday}
                            <Calendar.HeadCell>
                              {weekday.slice(0, 2)}
                            </Calendar.HeadCell>
                          {/each}
                        </Calendar.GridRow>
                      </Calendar.GridHead>
                      <Calendar.GridBody>
                        {#each month.weeks as weekDates}
                          <Calendar.GridRow class="mt-2 w-full">
                            {#each weekDates as date}
                              <Calendar.Cell {date} month={month.value}>
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
        <input hidden value={$form.${input.named_id}} name="${input.named_id}" />
      </div>
      {#if $errors.${input.named_id}}
        <p class="text-sm text-destructive">{$errors.${input.named_id}}</p>
      {/if}
    </div>`;
      } else if (input.category === "tags-input") {
        clientrawCode += `
    <div>
      <Label for="${input.named_id}" class={$errors.${input.named_id} && "text-destructive"}>${input.label}</Label>
       <!-- Add Tags Input Component from : https://www.shadcn-svelte-extras.com/components/tags-input -->
      <TagsInput bind:value={${input.named_id + '_value'}} placeholder="Add Tech Stack" />
      {#each $form.${input.named_id} as item, i}
        <input type="hidden" bind:value={$form.${input.named_id}[i]} name="${input.named_id}" id="${input.named_id}" />
      {/each}
      <p class="text-xs text-muted-foreground">
        ${input.description}
      </p>
      {#if $errors.${input.named_id}}
        <p class="text-sm text-destructive">{$errors.${input.named_id}?._errors}</p>
      {/if}
    </div>`;
      } else if (input.category === "phone") {
        clientrawCode += `
      <div>
      <!-- Add Phone Input Component from Shadcn Extra : https://www.shadcn-svelte-extras.com/components/phone-input -->
        <Label for="${input.named_id}" class={$errors.${input.named_id} && "text-destructive"}>${input.label}</Label>
        <PhoneInput
          country="IN"
          name="phone"
          placeholder="Enter a phone number"
          bind:value={$form.${input.named_id}}
        />
        <p class="text-xs text-muted-foreground">
          ${input.description}
        </p>
        {#if $errors.${input.named_id}}
          <p class="text-sm text-destructive">{$errors.${input.named_id}}</p>
        {/if}
      </div>`;
      } else if (input.category === "combobox") {
        clientrawCode += `
        <div>
          <Label for="${input.named_id}" class={$errors.${input.named_id} && "text-destructive"}>
            ${input.label}
          </Label>
          <div>
            <Popover.Root bind:open={open_${input.named_id}}>
              <Popover.Trigger bind:ref={triggerRef_${input.named_id}}>
                {#snippet child({ props })}
                  <Button
                    variant="outline"
                    class="w-full justify-between"
                    {...props}
                    role="combobox"
                    aria-expanded={open_${input.named_id}}
                  >
                    {selectedValue_${input.named_id} || "Select a framework..."}
                    <ChevronsUpDown class="opacity-50" />
                  </Button>
                   <input hidden value={$form.${input.named_id}} name="${input.named_id}" />
                {/snippet}
              </Popover.Trigger>
              <Popover.Content align='start' class="w-full p-0">
                <Command.Root>
                  <Command.Input
                    placeholder="${input.placeholder}"
                    class="h-9"
                  />
                  <Command.List>
                    <Command.Empty>No framework found.</Command.Empty>
                    <Command.Group>
                      {#each frameworks as framework}
                        <Command.Item
                          value={framework.value}
                          onSelect={() => {
                            combovalue_${input.named_id} = framework.value;
                            $form.${input.named_id} = framework.value;
                            closeAndFocusTrigger_${input.named_id}();
                          }}
                        >
                          <Check
                            class={cn(
                              framework.value !== $form.${input.named_id} &&
                                "text-transparent"
                            )}
                          />
                          {framework.label}
                        </Command.Item>
                      {/each}
                    </Command.Group>
                  </Command.List>
                </Command.Root>
              </Popover.Content>
            </Popover.Root>
          </div>
          <p class="text-xs text-muted-foreground">
           ${input.description}
          </p>
      </div>
        `;
      }
      else if (input.category === 'file') {
        clientrawCode += `
  <div>
    <Label for="${input.named_id}">
        ${input.label}
    </Label>
    <FileDropZone
      onUpload={onUpload_${input.named_id}}
      {onFileRejected}
      maxFileSize={10 * MEGABYTE}
      accept="image/*"
      maxFiles={4}
      fileCount={$files_${input.named_id}.length}
    />
    <p class="text-sm text-muted-foreground">Select file to upload.</p>
    <input name="${input.named_id}" type="file" bind:files={$files_${input.named_id}} class="hidden" />
    <div class="flex flex-col">
      {#each Array.from($files_${input.named_id}) as file, i (file.name)}
        <div
          in:slide
          out:fly={{ x: 20 }}
          class="flex place-items-center justify-between gap-0.5 hover:bg-accent dark:hover:bg-accent/60 p-2 rounded-lg transition-all duration-200"
        >
          <div class="flex gap-2 items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-paperclip"
                ><path d="M13.234 20.252 21 12.3" /><path
                  d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486"
                /></svg
              >
            </div>
            <div class="flex flex-col">
              <span class="text-sm">{file.name}</span>
              <span class="text-xs text-muted-foreground"
                >{displaySize(file.size)}</span
              >
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            class="hover:text-primary text-muted-foreground"
            onclick={() => {
              // we use set instead of an assignment since it accepts a File[]
              files_${input.named_id}.set([
                ...Array.from($files_${input.named_id}).slice(0, i),
                ...Array.from($files_${input.named_id}).slice(i + 1),
              ]);
            }}
          >
            <Trash2 />
          </Button>
        </div>
      {/each}
    </div>
  </div>`
      }
    });
    clientrawCode += `

    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>
    `;
    return clientrawCode;
  });

  formsnapCode = $derived.by(() => {
    let formsnapCode = `<script lang="ts">
  import { superForm${this.file_input_named_id.length > 0 ? ', filesProxy' : ''} } from "sveltekit-superforms";
  import {  ${this.adapter} } from "sveltekit-superforms/adapters";
  import type { PageData } from "./$types";
  import { schema } from "./schema";
  // FormSnap
  import { Field, Control, Label, Description, FieldErrors } from "formsnap";
  // Components
  import Button from "$lib/components/ui/button/button.svelte";`;
    this.unique_imports.map((input) => {
      if (input === "text" || input === "number" || input === "email") {
        formsnapCode += `
  import { Input } from "$lib/components/ui/input";`;
      } else if (input === "textarea") {
        formsnapCode += `
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";`;
      } else if (input === "switch") {
        formsnapCode += `
  import Switch from "$lib/components/ui/switch/switch.svelte";`;
      } else if (input === "checkbox") {
        formsnapCode += `
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";`;
      } else if (input === "select") {
        formsnapCode += `
  import * as Select from "$lib/components/ui/select/index";`;
      } else if (input === "input-otp") {
        formsnapCode += `
  import * as InputOTP from "$lib/components/ui/input-otp/index";
  import { REGEXP_ONLY_DIGITS } from "bits-ui";`;
      } else if (input === "date-picker") {
        formsnapCode += `
  import { CalendarIcon } from "lucide-svelte";
  import * as Popover from "$lib/components/ui/popover";
  import * as Select from "$lib/components/ui/select";
  import * as Calendar from "$lib/components/ui/calendar/index";
  import { Calendar as CalendarPrimitive } from "bits-ui";
  import {
    CalendarDate,
    type DateValue,
    getLocalTimeZone,
    today,
    DateFormatter,
  } from "@internationalized/date";
  // Components
  import { buttonVariants } from "$lib/components/ui/button/button.svelte";
 // Month formatter
  const monthFmt = new DateFormatter("en-US", {
    month: "long",
  });

  // Generate month options
  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((month, i) => ({ value: String(i + 1), label: month }));

  // Generate year options (from 1900 to current year)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1899 }, (_, i) => ({
    label: String(currentYear - i),
    value: String(currentYear - i),
  }));
  `;
      } else if (input === "tags-input") {
        formsnapCode += `
  import TagsInput from "$lib/components/ui/tags-input/tags-input.svelte";`;
      } else if (input === "phone") {
        formsnapCode += `
  import PhoneInput from "$lib/components/ui/phone-input/phone-input.svelte";`;
      } else if (input === "combobox") {
        formsnapCode += `
  // Combobox
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import Check from "lucide-svelte/icons/check";
  import * as Popover from "$lib/components/ui/popover/index";
  import * as Command from "$lib/components/ui/command/index";
  import { tick } from "svelte";
  import { cn } from "$lib/utils";
  let frameworks = [
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];`;
      }
      else if (input === 'file') {
        formsnapCode += `// File Upload
  import { toast } from "svelte-sonner";
  import {
    displaySize,
    FileDropZone,
    MEGABYTE,
    type FileDropZoneProps,
  } from "$lib/components/ui/file-drop-zone";
  import { fly, slide } from "svelte/transition";
  import { Trash2 } from "lucide-svelte";

  const onFileRejected: FileDropZoneProps["onFileRejected"] = async ({
    reason,
    file,
  }) => {
    toast.error(\`\${file.name} failed to upload!\`, { description: reason });
  };`
      }
    });

    if (this.date_picker_named_id.length > 0) {
      this.date_picker_named_id.map((date) => {
        formsnapCode += `
  let value_${date.named_id} = $state<DateValue | undefined>();
  let df_${date.named_id} = new DateFormatter("en-US", {
    dateStyle: "long",
  });
  let placeholder_${date.named_id} = $state(today(getLocalTimeZone()));

  let defaultYear_${date.named_id} = $derived(
    placeholder_${date.named_id}
      ? { value: String(placeholder_${date.named_id}.year), label: String(placeholder_${date.named_id}.year) }
      : undefined
  );

  let defaultMonth_${date.named_id} = $derived(
    placeholder_${date.named_id}
      ? {
          value: String(placeholder_${date.named_id}.month),
          label: monthFmt.format(placeholder_${date.named_id}.toDate(getLocalTimeZone())),
        }
      : undefined
  );

  let monthLabel_${date.named_id} = $derived(
    monthOptions.find((m) => m.value === defaultMonth_${date.named_id}?.value)?.label ??
      "Select a month"
  );`
      })
    }

    if (this.combobox_named_id.length > 0) {
      this.combobox_named_id.map((combobox) => {
        formsnapCode += `
  // Popover State
  let open_${combobox.named_id} = $state(false);
  // Combobox Value
  let combovalue_${combobox.named_id} = $state("");
  let triggerRef_${combobox.named_id} = $state<HTMLButtonElement>(null!);

  const selectedValue_${combobox.named_id} = $derived(
    frameworks.find((f) => f.value === combovalue_${combobox.named_id})?.label ??
      "Select a framework..."
  );

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger_${combobox.named_id}() {
    open_${combobox.named_id} = false;
    tick().then(() => {
      triggerRef_${combobox.named_id}.focus();
    });
  }`;
      });
    }



    formsnapCode += `
	let {
		data
	}: {
		data: PageData;
	} = $props();

  let form = superForm(data.form, {
      validators: ${this.adapter}(schema)`
    if (this.tags_input_named_id.length > 0 || this.combobox_named_id.length > 0) {
      formsnapCode += `,
        onUpdated(event) {
          if (event.form.valid) {`;
      if (this.tags_input_named_id.length > 0) {
        this.tags_input_named_id.map((tag) => {
          formsnapCode += `
              ${tag.named_id}_value = [];`;
        })
      }
      if (this.combobox_named_id.length > 0) {
        this.combobox_named_id.map((combobox) => {
          formsnapCode += `
              combovalue_${combobox.named_id} = "";`;
        })
      }
      formsnapCode += `
        }
      }`;
    }
    formsnapCode += `
    });\n`;
    formsnapCode += `
let { form: formData, enhance, message } = form;`;
    if (this.tags_input_named_id.length > 0) {
      this.tags_input_named_id.map((tag) => {
        formsnapCode += `
    let ${tag.named_id + '_value'} = $state([]);`;
      })
      this.tags_input_named_id.map((tag) => {
        formsnapCode += `
    $effect(() => {
      $formData.${tag.named_id} = ${tag.named_id + '_value'};
    });`
      })
    }
    if (this.file_input_named_id.length > 0) {
      formsnapCode += `
  message.subscribe((message) => {
      if (message) {
        toast.success(message.text, {
          description: "Your attachments were uploaded.",
        });
      }
  });`
      this.file_input_named_id.map((file) => {
        formsnapCode += `
  let files_${file.named_id} = filesProxy(form, "${file.named_id}");
  let onUpload_${file.named_id}: FileDropZoneProps["onUpload"] = async (uploadedFiles) => {
    // we use set instead of an assignment since it accepts a File[]
    files_${file.named_id}.set([...Array.from($files_${file.named_id}), ...uploadedFiles]);
  };`
      })
    }

    formsnapCode += `
  </script> \n\n`; // close script tag
    formsnapCode += `<div class="flex min-h-[80vh] flex-col items-center justify-center">
  {#if $message}
    <span class="text-emerald-400">
      {$message}
    </span>
  {/if}
  <form method="post" ${this.file_input_named_id.length > 0 ? 'enctype="multipart/form-data"' : ''} use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">`;
    this.selected_inputs.map((input) => {
      if (
        input.type === "text" ||
        input.type === "number" ||
        input.type === "email" ||
        input.type === "tel" ||
        input.type === "url" ||
        input.type === "password"
      ) {
        formsnapCode += `
    <div>
      <Field {form} name="${input.named_id}">
        <Control>
          {#snippet children({ props })}
            <Label class='font-medium'>${input.label}</Label>
            <Input
              {...props}
              type="${input.type}"
              placeholder="${input.placeholder}"
              bind:value={$formData.${input.named_id}}
            />
            <Description class="text-muted-foreground text-xs">
              ${input.description}
            </Description>
          {/snippet}
        </Control>
        <FieldErrors class='text-sm text-destructive' />
      </Field>
    </div>`;
      } else if (input.type === "textarea") {
        formsnapCode += `
    <div>
      <Field {form} name="${input.named_id}">
        <Control>
          {#snippet children({ props })}
            <Label class='font-medium'>${input.label}</Label>
            <Textarea
              {...props}
              name="${input.named_id}"
              id="${input.named_id}"
              placeholder="${input.placeholder}"
              bind:value={$formData.${input.named_id}}
            />
            <Description class="text-muted-foreground text-xs">
              ${input.description}
            </Description>
          {/snippet}
        </Control>
        <FieldErrors class="text-sm text-destructive" />
      </Field>
    </div>`;
      } else if (input.type === "boolean" && input.category === "switch") {
        formsnapCode += `
      <fieldset>
        <!-- <legend class="mb-4 text-lg font-medium"> Email Notifications </legend> -->
      <div class="space-y-4 flex flex-row items-center justify-between rounded-lg border p-4">
        <Field
          {form}
          name="${input.named_id}"
          >
          <Control>
            {#snippet children({ props })}
              <div class="space-y-0.5">
                <Label class='font-medium'> ${input.label} </Label>
                <Description class='text-muted-foreground text-xs'>
                  ${input.description}
                </Description>
              </div>
              <Switch {...props} bind:checked={$formData.${input.named_id}} />
            {/snippet}
          </Control>
        </Field>
      </div>
    </fieldset>`;
      } else if (input.type === "boolean" && input.category === "checkbox") {
        formsnapCode += `
      <div
        class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
      >
      <Field {form} name="${input.named_id}">
        <Control>
          {#snippet children({ props })}
            <Checkbox {...props} bind:checked={$formData.${input.named_id}} />
            <div class="space-y-1 leading-none">
              <Label class="font-medium">
                ${input.label}
              </Label>
              <Description class="text-muted-foreground text-sm">
                ${input.description}
              </Description>
            </div>
            <input name={props.name} value={$formData.${input.named_id}} hidden />
          {/snippet}
        </Control>
      </Field>
    </div>`;
      } else if (input.type === "select") {
        formsnapCode += `
      <div>
        <Field {form} name="${input.named_id}">
          <Control>
            {#snippet children({ props })}
              <Label class='font-medium'>
                ${input.label}
              </Label>
              <Select.Root
                type="single"
                bind:value={$formData.${input.named_id}}
                name={props.name}
              >
                <Select.Trigger {...props}>
                  {$formData.${input.named_id}
                    ? $formData.${input.named_id}
                    : "Select a framework"}
                </Select.Trigger>
                <Select.Content>
                  <!-- Change Items based on your need -->
                  <Select.Item value="svelte" label="Svelte" />
                  <Select.Item value="vue" label="Vue" />
                  <Select.Item value="react" label="React" />
                  <Select.Item value="angular" disabled label="Angular" />
                </Select.Content>
              </Select.Root>
            {/snippet}
          </Control>
          <Description class="text-muted-foreground text-sm">
            ${input.description}
          </Description>
          <FieldErrors class='text-sm text-destructive' />
        </Field>
      </div>`;
      } else if (input.type === "input-otp") {
        formsnapCode += `
      <div>
        <Field {form} name="${input.named_id}">
          <Control>
            {#snippet children({ props })}
              <Label class="font-medium text-sm">${input.label}</Label>
              <InputOTP.Root maxlength={6} {...props} bind:value={$formData.${input.named_id}} pattern={REGEXP_ONLY_DIGITS}>
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
            {/snippet}
          </Control>
          <Description class="text-muted-foreground text-xs">
            ${input.description}
          </Description>
          <FieldErrors class="text-xs text-destructive" />
        </Field>
      </div>`;
      } else if (input.type === "date-picker") {
        formsnapCode += `
        <div class="flex flex-col">
      <div class="grid gap-2">
        <Field {form} name="${input.named_id}">
          <Control>
            {#snippet children({ props })}
              <Label for="${input.named_id}" >${input.label}</Label>
              <Popover.Root>
                <Popover.Trigger
                  {...props}
                  class={[
                    buttonVariants({ variant: "outline" }),
                    "w-[250px] justify-start pl-4 text-left font-normal",
                    !value_${input.named_id} && "text-muted-foreground",
                  ]}
                >
                  {value_${input.named_id}
                    ? df_${input.named_id}.format(value_${input.named_id}.toDate(getLocalTimeZone()))
                    : "Pick a date"}
                  <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
                </Popover.Trigger>
                <Popover.Content class="w-auto p-0" side="bottom">
                  <CalendarPrimitive.Root
                    bind:value={value_${input.named_id}}
                    bind:placeholder={placeholder_${input.named_id}}
                    class="rounded-md border p-3"
                    type="single"
                    minValue={new CalendarDate(1900, 1, 1)}
                    maxValue={today(getLocalTimeZone())}
                    calendarLabel="Date of birth"
                    initialFocus
                    onValueChange={(v) => {
                      if (v) {
                        $formData.${input.named_id} = v.toString();
                      } else {
                        $formData.${input.named_id} = "";
                      }
                    }}
                  >
                    {#snippet children({ months, weekdays })}
                      <Calendar.Header>
                        <Calendar.Heading
                          class="flex w-full items-center justify-between gap-2"
                        >
                          <Select.Root
                            type="single"
                            value={defaultMonth_${input.named_id}?.value}
                            onValueChange={(v) => {
                              if (!placeholder_${input.named_id}) return;
                              if (v === \`\${ placeholder_${input.named_id}.month } \`) return;
                              placeholder_${input.named_id} = placeholder_${input.named_id}.set({
                                month: Number.parseInt(v),
                              });
                            }}
                          >
                            <Select.Trigger
                              aria-label="Select month"
                              class="w-[60%]"
                            >
                              {monthLabel_${input.named_id}}
                            </Select.Trigger>
                            <Select.Content
                              class="max-h-[200px] overflow-y-auto"
                            >
                              {#each monthOptions as { value, label }}
                                <Select.Item {value} {label} />
                              {/each}
                            </Select.Content>
                          </Select.Root>
                          <Select.Root
                            type="single"
                            value={defaultYear_${input.named_id}?.value}
                            onValueChange={(v) => {
                              if (!v || !placeholder_${input.named_id}) return;
                              if (v === \`\${placeholder_${input.named_id}?.year}\`) return;
                              placeholder_${input.named_id} = placeholder_${input.named_id}.set({
                                year: Number.parseInt(v),
                              });
                            }}
                          >
                            <Select.Trigger
                              aria-label="Select year"
                              class="w-[40%]"
                            >
                              {defaultYear_${input.named_id}?.label ?? "Select year"}
                            </Select.Trigger>
                            <Select.Content
                              class="max-h-[200px] overflow-y-auto"
                            >
                              {#each yearOptions as { value, label }}
                                <Select.Item {value} {label} />
                              {/each}
                            </Select.Content>
                          </Select.Root>
                        </Calendar.Heading>
                      </Calendar.Header>
                      <Calendar.Months>
                        {#each months as month}
                          <Calendar.Grid>
                            <Calendar.GridHead>
                              <Calendar.GridRow class="flex">
                                {#each weekdays as weekday}
                                  <Calendar.HeadCell>
                                    {weekday.slice(0, 2)}
                                  </Calendar.HeadCell>
                                {/each}
                              </Calendar.GridRow>
                            </Calendar.GridHead>
                            <Calendar.GridBody>
                              {#each month.weeks as weekDates}
                                <Calendar.GridRow class="mt-2 w-full">
                                  {#each weekDates as date}
                                    <Calendar.Cell {date} month={month.value}>
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
              <input hidden value={$formData.${input.named_id}} name={props.name} />
            {/snippet}
          </Control>
          <FieldErrors class='text-sm text-destructive' />
        </Field>
      </div>
    </div>
        `;
      } else if (input.type === "tags-input") {
        formsnapCode += `
       <!-- Add Tags Input Component from : https://www.shadcn-svelte-extras.com/components/tags-input -->
    <div>
      <Field {form} name="${input.named_id}">
        <Control>
          {#snippet children({ props })}
            <Label>${input.label}</Label>
            <TagsInput bind:value={${input.named_id + '_value'}} placeholder="${input.placeholder}" />
            {#each $formData.${input.named_id} as item, i}
              <input
                {...props}
                type="hidden"
                bind:value={$formData.${input.named_id}[i]}
                name="${input.named_id}"
              />
            {/each}
          {/snippet}
        </Control>
        <Description class="text-sm text-muted-foreground">${input.description}</Description
        >
        <FieldErrors class="text-sm text-destructive" />
      </Field>
    </div>`;
      } else if (input.type === "phone") {
        formsnapCode += `<div>
      <Field {form} name="${input.named_id}">
        <Control>
          {#snippet children({ props })}
            <!-- Add Phone Input Component from Shadcn Extra : https://www.shadcn-svelte-extras.com/components/phone-input -->
            <Label>${input.label}</Label>
            <PhoneInput
              {...props}
              country="IN"
              name="${input.named_id}"
              placeholder="${input.placeholder}"
              bind:value={$formData.${input.named_id}}
            />
          {/snippet}
        </Control>
        <Description class="text-xs text-muted-foreground">
          ${input.description}
        </Description>
        <FieldErrors class="text-sm text-destructive" />
      </Field>
    </div>`;
      } else if (input.type === "combobox") {
        formsnapCode += `
      <div>
      <Field {form} name="${input.named_id}">
        <Control>
          {#snippet children({ props })}
            <Label for="${input.named_id}">${input.label}</Label>
            <div>
              <Popover.Root bind:open={open_${input.named_id}}>
                <Popover.Trigger bind:ref={triggerRef_${input.named_id}} {...props}>
                  {#snippet child({ props })}
                    <Button
                      variant="outline"
                      class="w-full justify-between"
                      {...props}
                      role="combobox"
                      aria-expanded={open_${input.named_id}}
                    >
                      {selectedValue_${input.named_id} || "Select a framework..."}
                      <ChevronsUpDown class="opacity-50" />
                    </Button>
                    <input
                      hidden
                      value={$formData.${input.named_id}}
                      name="${input.named_id}"
                    />
                  {/snippet}
                </Popover.Trigger>
                <Popover.Content align="start" class="w-full p-0">
                  <Command.Root>
                    <Command.Input
                      placeholder="Select your favorite framework"
                      class="h-9"
                    />
                    <Command.List>
                      <Command.Empty>No framework found.</Command.Empty>
                      <Command.Group>
                        {#each frameworks as framework}
                          <Command.Item
                            value={framework.value}
                            onSelect={() => {
                              combovalue_${input.named_id} = framework.value;
                              $formData.${input.named_id} = framework.value;
                              closeAndFocusTrigger_${input.named_id}();
                            }}
                          >
                            <Check
                              class={cn(
                                framework.value !== $formData.${input.named_id} &&
                                  "text-transparent"
                              )}
                            />
                            {framework.label}
                          </Command.Item>
                        {/each}
                      </Command.Group>
                    </Command.List>
                  </Command.Root>
                </Popover.Content>
              </Popover.Root>
            </div>
          {/snippet}
        </Control>
        <Description class="text-sm text-muted-foreground">
          ${input.description}
        </Description>
        <FieldErrors class="text-sm text-destructive" />
      </Field>
    </div>`;
      }
      else if (input.type === 'file') {
        formsnapCode += `
  <div>
    <Field {form} name="${input.named_id}">
      <Control>
        {#snippet children({ props })}
          <Label>${input.label}</Label>
          <FileDropZone
            onUpload={onUpload_${input.named_id}}
            {onFileRejected}
            maxFileSize={1 * MEGABYTE}
            accept="image/*"
            maxFiles={4}
            fileCount={$files_${input.named_id}.length}
            class="my-1"
          />
          <input name="${input.named_id}" type="file" bind:files={$files_${input.named_id}} class="hidden" />
        {/snippet}
      </Control>
      <Description class="text-sm text-muted-foreground">
        ${input.description}
      </Description>
      <FieldErrors />
      <div class="flex flex-col">
        {#each Array.from($files_${input.named_id}) as file, i (file.name)}
          <div
            in:slide
            out:fly={{ x: 20 }}
            class="flex place-items-center justify-between gap-0.5 hover:bg-accent dark:hover:bg-accent/60 p-2 rounded-lg transition-all duration-200"
          >
            <div class="flex gap-2 items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-paperclip"
                  ><path d="M13.234 20.252 21 12.3" /><path
                    d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486"
                  /></svg
                >
              </div>
              <div class="flex flex-col">
                <span class="text-sm">{file.name}</span>
                <span class="text-xs text-muted-foreground"
                  >{displaySize(file.size)}</span
                >
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              class="hover:text-primary text-muted-foreground"
              onclick={() => {
                // we use set instead of an assignment since it accepts a File[]
                files_${input.named_id}.set([
                  ...Array.from($files_${input.named_id}).slice(0, i),
                  ...Array.from($files_${input.named_id}).slice(i + 1),
                ]);
              }}
            >
              <Trash2 />
            </Button>
          </div>
        {/each}
      </div>
    </Field>
  </div>`;
      }
    });
    formsnapCode += `

    <div>
      <Button size="sm" type="submit">Submit</Button>
    </div>
  </form>
</div>`;
    return formsnapCode;
  });
}

export let form_generator = new FormGenerator();
