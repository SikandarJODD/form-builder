
import { codeToHtml } from "shiki";
export type InputType = {
  id?: string;
  name: string;
  named_id?: string;
  type: string;
  min?: number;
  max?: number;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};
let dummyInput: InputType[] = [
  {
    name: "Input",
    type: "text",
    label: "Username",
    description: "This is your public display name",
    placeholder: "Enter your username",
    min: 0,
    max: 0,
  },
  {
    name: 'Password',
    type: 'password',
    label: 'Password',
    placeholder: 'password',
    description: 'Enter your password',
    min: 0,
    max: 0,
  },
  {
    name: 'Number',
    type: 'number',
    label: 'Age',
    description: 'This is your age',
    placeholder: 'Enter your age',
    min: 0,
    max: 0,
  },
  {
    name: 'Switch',
    type: 'boolean',
    label: 'Marketing Email',
    description: 'Receive emails about new products, features, and more.',
    placeholder: 'Placeholder',
    min: 0,
    max: 0,
  },
  {
    name: 'Checkbox',
    type: 'boolean',
    label: 'Use different settings for my mobile devices',
    description: 'You can manage your mobile notifications in the mobile settings page.',
    placeholder: 'Placeholder',
    min: 0,
    max: 0,
  },
]


let min_max_types = ['number', 'password', 'text'];


class FormGenerator {
  inputs: InputType[] = dummyInput;
  selected_inputs: InputType[] = $state([]);

  add_input = (item: InputType) => {
    let id = crypto.randomUUID().slice(0, 5);
    let random_id = `name_${crypto.randomUUID().slice(0, 5)}`;
    let new_input: InputType = {
      id: id,
      named_id: random_id,
      name: item.name,
      type: item.type,
      label: item.label,
      description: item.description,
      placeholder: item.placeholder,
      required: item.required || true,
      min: item.min || 0,
      max: item.max || 0,
    };
    this.selected_inputs.push(new_input);
  }

  remove_input = (id: string) => {
    this.selected_inputs = this.selected_inputs.filter((input) => input.id !== id);
  }

  handleDndConsider = (e: CustomEvent) => {
    this.selected_inputs = e.detail.items;
  }

  handleDndFinalize = (e: CustomEvent) => {
    this.selected_inputs = e.detail.items;
  }

  generateZodSchemaString(inputs: InputType[]): string {
    let schemaString = `z.object({\n`;

    inputs.forEach((input) => {
      let fieldSchema = `z.string()`;

      if (input.type === 'number') {
        fieldSchema = `z.number().int()`;
      }
      else if (input.type === 'boolean') {
        fieldSchema = `z.boolean()`;
      }
      else if (input.type === 'email') {
        fieldSchema = `z.string().email()`;
      }

      // Add `min` and `max` constraints if available for number, password, and text fields
      if (min_max_types.includes(input.type)) {
        if (input.min !== undefined && input.min > 0) {
          fieldSchema += `.min(${input.min})`;
        }
        if (input.max !== undefined && input.min !== undefined && input.max > 0 && input.max > input.min) {
          fieldSchema += `.max(${input.max})`;
        }
      }
      if (!input.required) {
        fieldSchema += `.optional()`;
      }

      schemaString += `  ${input.named_id?.toLowerCase() || 'name'}: ${fieldSchema},\n`;
    });

    schemaString += `})`;

    return schemaString;
  }

  // Generate schema string
  zodSchema = $derived.by(() => {
    let sh = this.generateZodSchemaString(this.selected_inputs);
    return sh;
  });

}

export let form_generator = new FormGenerator();