<script lang="ts">
  import { formV2 } from '../state/form-v2.svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area';
  import Button from '$lib/components/ui/button/button.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
  import Switch from '$lib/components/ui/switch/switch.svelte';
  import * as Select from '$lib/components/ui/select';
  import Slider from '$lib/components/ui/slider/slider.svelte';
  import Eye from '@lucide/svelte/icons/eye';
</script>

<div class="flex h-full flex-col">
  <!-- Panel Header -->
  <div class="border-b p-4">
    <h3 class="font-semibold text-sm">Preview</h3>
    <p class="text-xs text-muted-foreground">See how your form looks</p>
  </div>

  <!-- Scrollable Preview Content -->
  <ScrollArea class="flex-1">
    {#if formV2.allFields.length === 0}
      <!-- Empty State -->
      <div class="flex flex-col items-center justify-center h-64 text-center p-4">
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
              <div class={row.fields.length > 1 ? 'flex-1' : 'w-full'}>
                {#if field.type === 'h1'}
                  <h1 class="text-2xl font-bold">{field.label}</h1>
                {:else if field.type === 'h2'}
                  <h2 class="text-xl font-semibold">{field.label}</h2>
                {:else if field.type === 'h3'}
                  <h3 class="text-lg font-medium">{field.label}</h3>
                {:else if field.type === 'desc'}
                  <p class="text-sm text-muted-foreground">{field.label}</p>
                {:else if field.type === 'separator'}
                  <hr class="my-2" />
                {:else if field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'number' || field.type === 'phone'}
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span>{/if}
                    </Label>
                    <Input
                      type={field.type === 'phone' ? 'tel' : field.type}
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                    />
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">{field.description}</p>
                    {/if}
                  </div>
                {:else if field.type === 'textarea'}
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span>{/if}
                    </Label>
                    <Textarea placeholder={field.placeholder} disabled={field.disabled} />
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">{field.description}</p>
                    {/if}
                  </div>
                {:else if field.category === 'checkbox'}
                  <div class="flex items-start gap-2 p-4 border rounded-lg">
                    <Checkbox disabled={field.disabled} />
                    <div>
                      <Label>{field.label}</Label>
                      {#if field.description}
                        <p class="text-xs text-muted-foreground">{field.description}</p>
                      {/if}
                    </div>
                  </div>
                {:else if field.category === 'switch'}
                  <div class="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>{field.label}</Label>
                      {#if field.description}
                        <p class="text-xs text-muted-foreground">{field.description}</p>
                      {/if}
                    </div>
                    <Switch disabled={field.disabled} />
                  </div>
                {:else if field.type === 'select' || field.type === 'combobox'}
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span>{/if}
                    </Label>
                    <Select.Root type="single">
                      <Select.Trigger disabled={field.disabled}>
                        {field.placeholder || 'Select...'}
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value="option1" label="Option 1" />
                        <Select.Item value="option2" label="Option 2" />
                        <Select.Item value="option3" label="Option 3" />
                      </Select.Content>
                    </Select.Root>
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">{field.description}</p>
                    {/if}
                  </div>
                {:else if field.type === 'slider'}
                  <div class="space-y-3">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span>{/if}
                    </Label>
                    <Slider value={[50]} min={field.min || 0} max={field.max || 100} />
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">{field.description}</p>
                    {/if}
                  </div>
                {:else}
                  <!-- Generic fallback for other field types -->
                  <div class="space-y-1.5">
                    <Label>
                      {field.label}
                      {#if field.required}<span class="text-destructive">*</span>{/if}
                    </Label>
                    <Input placeholder={field.placeholder} disabled={field.disabled} />
                    {#if field.description}
                      <p class="text-xs text-muted-foreground">{field.description}</p>
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

