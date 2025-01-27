<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import { form_generator } from "$lib/form-generator/form-gen.svelte";
  import { flip } from "svelte/animate";
  import { scale, slide } from "svelte/transition";
  let input_types = ["text", "email", "password", "number", "tel", "url"];
  // select and radio box need options
</script>

<div class="flex flex-col space-y-4 p-2">
  <div>
    {#each form_generator.selected_inputs as comp (comp.id)}
      <div animate:flip={{ duration: 300 }}>
        {#if input_types.includes(comp.type)}
          <div>
            <Label for={comp.named_id && "name"}>{comp.label}</Label>
            <Input
              type={comp.type}
              id={comp.named_id && "name"}
              name={comp.named_id && "name"}
              placeholder={comp.placeholder}
            />
            <p class="text-xs text-muted-foreground">
              {comp.description}
            </p>
          </div>
        {/if}
        {#if comp.type === "textarea"}
          <textarea placeholder={comp.name}></textarea>
        {/if}
        <!-- {#if comp.type === "select"}
      <select>
        {#each comp.options as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    {/if} -->
        {#if comp.type === "checkbox"}
          <input type="checkbox" id={comp.id} />
          <label for={comp.id}>{comp.name}</label>
        {/if}
        <!-- {#if comp.type === "radio"}
      {#each comp.options as option}
        <input
          type="radio"
          id={option.id}
          name={comp.name}
          value={option.value}
        />
        <label for={option.id}>{option.label}</label>
      {/each}
    {/if} -->

        {#if comp.type === "file"}
          <input type="file" id={comp.id} />
          <label for={comp.id}>{comp.name}</label>
        {/if}
        {#if comp.type === "range"}
          <input type="range" id={comp.id} />
        {/if}
        <!-- {#if comp.type === "color"}
      <input type="color" id={comp.id} />
    {/if}
    {#if comp.type === "date"}
      <input type="date" id={comp.id} />
    {/if}
    {#if comp.type === "datetime-local"}
      <input type="datetime-local" id={comp.id} />
    {/if}
    {#if comp.type === "month"}
      <input type="month" id={comp.id} />
    {/if} -->
      </div>
    {/each}
  </div>
  <Button class="w-fit">Submit</Button>
</div>
