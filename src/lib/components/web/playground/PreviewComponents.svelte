<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import { form_generator } from "$lib/form-generator/form-gen.svelte";
  import { flip } from "svelte/animate";
  // select and radio box need options
</script>

{#if form_generator.selected_inputs.length === 0}
  <div class="flex flex-col items-center justify-center size-full">
    <p class="text-muted-foreground">No components selected</p>
  </div>
{:else}
  <div class="flex flex-col space-y-4 p-2">
    <div class="space-y-2">
      {#each form_generator.selected_inputs as comp (comp.id)}
        <div animate:flip={{ duration: 300 }}>
          {#if comp.category === "text"}
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
          {#if comp.category === "switch"}
            <div
              class="flex flex-row items-center justify-between rounded-lg border p-4"
            >
              <div class="space-y-0.5">
                <Label>
                  {comp.label}
                </Label>
                <p class="text-sm text-muted-foreground">
                  {comp.description}
                </p>
              </div>
              <Switch name={comp.named_id} id={comp.named_id} />
            </div>
          {/if}
          {#if comp.type === "textarea"}
            <Label>Bio</Label>
            <Textarea
              placeholder="Tell us a little bit about yourself"
              class="resize-none"
            />
            <p class="text-xs text-muted-foreground">
              You can <span>@mention</span> other users and organizations.
            </p>
          {/if}
          <!-- {#if comp.type === "select"}
      <select>
        {#each comp.options as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    {/if} -->
          {#if comp.category === "checkbox"}
            <div
              class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
            >
              <Checkbox />
              <div class="space-y-1 leading-none">
                <Label>Use different settings for my mobile devices</Label>
                <p class="text-sm text-muted-foreground">
                  You can manage your mobile notifications in the <a
                    href="/examples/forms">mobile settings</a
                  > page.
                </p>
              </div>
              <!-- add input for copy code -->
              <!-- <input name= value={$formData.mobile} type="hidden" /> -->
            </div>
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
    <Button class="w-fit" size="sm">Submit</Button>
  </div>
{/if}
