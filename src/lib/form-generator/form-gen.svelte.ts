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
    category: "text",
    label: "Email",
    description: "Enter your email address",
    placeholder: "Enter your email",
    min: 0,
    max: 0,
    isNew: true,
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
    category: "text",
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
    name: "Select",
    type: "select",
    category: "select",
    label: "Email",
    description: "You can manage email addresses in your email settings.",
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
    isNew: true,
  },
  {
    name: "Phone",
    type: "phone",
    category: "phone",
    label: "Phone number",
    description: "Enter your phone number",
    placeholder: "Placeholder",
    min: 0,
    max: 0,
    isNew: true,
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
    isNew: true,
  },
];

let min_max_types = ["number", "password", "text", "textarea", "tags-input"];
let non_empty_types = ["date-picker", 'email'];

class FormGenerator {
  inputs: InputType[] = dummyInput;
  selected_inputs: InputType[] = $state([]);

  unique_imports = $derived.by(() => {
    let all_imports = this.selected_inputs.map((input) => input.category);
    let unique_imports = [...new Set(all_imports)];
    return unique_imports;
  });
  date_picker_named_id = $derived.by(() => {
    // did : date named_id (id) of date-picker
    let did = this.selected_inputs.filter(
      (input) => input.type === "date-picker"
    )[0];
    return did;
  });

  tags_input_named_id = $derived.by(() => {
    let tagid = this.selected_inputs.filter(
      (input) => input.type === "tags-input"
    )[0];
    return tagid;
  });

  add_input = (item: InputType) => {
    let id = crypto.randomUUID().slice(0, 5);
    let random_id = `name_${crypto.randomUUID().slice(0, 5)}`;
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
    let schemaString = `import { z } from 'zod';\nexport let schema = z.object({\n`;

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
      if (!input.required) {
        fieldSchema += `.optional()`;
      }
      else if (!non_empty_types.includes(input.type) && input.min === 0) {
        fieldSchema += `.nonempty()`;
      }

      schemaString += `  ${input.named_id?.toLowerCase() || "name"
        }: ${fieldSchema},\n`;
    });

    schemaString += `})`;

    return schemaString;
  }

  // Generate schema string
  zodSchema = $derived.by(() => {
    let sh = this.generateZodSchemaString(this.selected_inputs);
    return sh;
  });

  serverCode = `import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

// add your own schema path here
import { schema } from './schema';

export const load: PageServerLoad = async ({ request }) => {
    return { form: await superValidate(zod(schema)) }
};

export const actions: Actions = {
    default: async ({ request }) => {
        let form = await superValidate(request, zod(schema));
        console.log(form,'form');
        if (!form.valid) {
            return fail(400, { form });
        }
        return message(form, 'Form Posted Successfully!');
    }
};`;

  clientCode = $derived.by(() => {
    let clientrawCode = `<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
    // add your own path
	import type { PageData } from './$types';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';`;

    this.unique_imports.map((input) => {
      if (input === "text") {
        clientrawCode += `
    import Input from '$lib/components/ui/input/input.svelte';`;
      }
      else if (input === 'password') {
        clientrawCode += `
    import PasswordInput from "$lib/components/templates/comps/PasswordInput.svelte";`
      }
      else if (input === "switch") {
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
    import * as InputOTP from "$lib/components/ui/input-otp/index";`;
      } else if (input === "date-picker") {
        clientrawCode += `
    import { Calendar } from "$lib/components/ui/calendar/index";
    import * as Popover from "$lib/components/ui/popover/index";
    import CalendarIcon from "lucide-svelte/icons/calendar";
    import {
      CalendarDate,
      DateFormatter,
      type DateValue,
      getLocalTimeZone,
      parseDate,
      today,
    } from "@internationalized/date";

    const df = new DateFormatter("en-US", {
      dateStyle: "long",
    });

    let dvalue = $state<DateValue>();
    let placeholder = $state(today(getLocalTimeZone()));`;
      }
      else if (input === 'tags-input') {
        clientrawCode += `
    import { TagsInput } from "$lib/components/ui/tags-input";`
      }
      else if (input === 'phone') {
        clientrawCode += `
    import PhoneInput from "$lib/components/ui/phone-input/phone-input.svelte";`
      }
      else if (input === 'combobox') {
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
    ];

    let open = $state(false);
    let combovalue = $state("");
    let triggerRef = $state<HTMLButtonElement>(null!);

    const selectedValue = $derived(
      frameworks.find((f) => f.value === combovalue)?.label ??
        "Select a framework..."
    );

    // We want to refocus the trigger button when the user selects
    // an item from the list so users can continue navigating the
    // rest of the form with the keyboard.
    function closeAndFocusTrigger() {
      open = false;
      tick().then(() => {
        triggerRef.focus();
      });
    }
      `
      }
    });
    if (this.date_picker_named_id) {
      clientrawCode += `
    $effect(() => {
      dvalue = $form.${this.date_picker_named_id.named_id} ? parseDate($form.${this.date_picker_named_id.named_id}) : undefined;
    });
      `;
    }
    clientrawCode += `
    import { zod } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';

	let {
		data
	}: {
		data: PageData;
	} = $props();`;

    if (this.unique_imports.includes("tags-input") && this.tags_input_named_id) {
      clientrawCode += `
  let { form, message, errors, enhance } = superForm(data.form, {
    validators: zod(schema),
    onUpdated(event) {
      if (event.form.valid) {
        tagsvalue = [];
      }
    },
  });
  let tagsvalue = $state([]);
  $effect(() => {
    $form.${this.tags_input_named_id.named_id} = tagsvalue;
  });`;
    } else {
      clientrawCode += `
      let { form, message, errors, enhance } = superForm(data.form, {
		    validators: zod(schema)
	    });`;
    }
    clientrawCode += `</script>
<div class="flex min-h-[60vh] flex-col items-center justify-center">
	{#if $message}
		<p class="text-emerald-400">{$message}</p>
	{/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">`;
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
    </div>
    `;

      }
      else if (input.type === 'password') {
        clientrawCode += `
    <div>
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
        `
      }
      else if (input.category === "switch") {
        clientrawCode += `
    <div class="flex flex-row items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
            <Label for="${input.named_id}" class={$errors.${input.named_id} && "text-destructive"}>
              ${input.label}
            </Label>
            <p class="text-sm text-muted-foreground">
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
        <p class="text-sm text-muted-foreground">
          ${input.description}
        </p>
      </div>
            <!-- add input for copy code -->
      <input name="${input.named_id}" id="${input.named_id}" value={$form.${input.named_id}} type="hidden" />
      {#if $errors.${input.named_id}}
        <p class="text-sm text-destructive">{$errors.${input.named_id}}</p>
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
        <p class="text-sm text-destructive">{$errors.${input.named_id}}</p>
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
        clientrawCode += `
    <div>
      <Label for="${input.named_id}" class={$errors.${input.named_id} && "text-destructive"}>${input.label}</Label>
      <div>
        <Popover.Root>
          <Popover.Trigger>
            {#snippet child({ props })}
              <Button
                variant="outline"
                class={[
                  "w-[240px] justify-start text-left font-normal",
                  !dvalue && "text-muted-foreground"
                ]}
                {...props}
              >
                <CalendarIcon />
                {dvalue
                  ? df.format(dvalue.toDate(getLocalTimeZone()))
                  : "Pick a date"}
              </Button>
            {/snippet}
          </Popover.Trigger>
          <Popover.Content class="w-auto p-0" side="top">
            <Calendar
              type="single"
              value={dvalue}
              bind:placeholder
              id="${input.named_id}"
              minValue={new CalendarDate(1900, 1, 1)}
              maxValue={today(getLocalTimeZone())}
              calendarLabel="Date of birth"
              onValueChange={(v) => {
                if (v) {
                  $form.${input.named_id} = v.toString();
                } else {
                  $form.${input.named_id} = "";
                }
              }}
            />
          </Popover.Content>
        </Popover.Root>
      </div>
      <p class="text-xs text-muted-foreground">
          ${input.description}
      </p>
      {#if $errors.${input.named_id}}
          <p class="text-sm text-destructive">{$errors.${input.named_id}}</p>
      {/if}
      <input hidden value={$form.${input.named_id}} name="${input.named_id}" />
    </div>`;
      }
      else if (input.category === 'tags-input') {
        clientrawCode += `
    <div>
      <Label for="${input.named_id}" class={$errors.${input.named_id} && "text-destructive"}>${input.label}</Label>
      <TagsInput bind:value={tagsvalue} placeholder="Add Tech Stack" />
      {#each $form.${input.named_id} as item, i}
        <input type="hidden" bind:value={$form.${input.named_id}[i]} name="${input.named_id}" id="${input.named_id}" />
      {/each}
      <p class="text-xs text-muted-foreground">
        ${input.description}
      </p>
      {#if $errors.${input.named_id}}
        <p class="text-sm text-destructive">{$errors.${input.named_id}?._errors}</p>
      {/if}
    </div>`
      }
      else if (input.category === 'phone') {
        clientrawCode += `
      <div>
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
      </div>`
      }
      else if (input.category === 'combobox') {
        clientrawCode += `
        <div>
          <Label for="${input.named_id}" class={$errors.${input.named_id} && "text-destructive"}>
            ${input.label}
          </Label>
          <div>
            <Popover.Root bind:open>
              <Popover.Trigger bind:ref={triggerRef}>
                {#snippet child({ props })}
                  <Button
                    variant="outline"
                    class="w-full justify-between"
                    {...props}
                    role="combobox"
                    aria-expanded={open}
                  >
                    {selectedValue || "Select a framework..."}
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
                            combovalue = framework.value;
                            $form.${input.named_id} = framework.value;
                            closeAndFocusTrigger();
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
        `
      }
    });
    clientrawCode += `
    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>
    `;
    return clientrawCode;
  });
}

export let form_generator = new FormGenerator();
