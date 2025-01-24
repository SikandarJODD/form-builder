
import { z } from "zod";
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
    description: 'This is your password',
    placeholder: 'Enter your password',
    min: 8,
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
]




class FormGenerator {
  inputs: InputType[] = dummyInput;
  selected_inputs: InputType[] = $state([]);
  zod_schema = $derived.by(() => {
    let schema = {};

    let title = `export let schama = ${schema}`;
  })

  add_input = (item: InputType) => {
    let id = crypto.randomUUID().slice(0, 8);
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
  };


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
      if(input.type === 'number') {
        fieldSchema = `z.number().int()`;
      }

      if (input.type === 'email') {
        fieldSchema = `z.string().email()`;
      }
      else {
        // Add `min` and `max` constraints if available
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