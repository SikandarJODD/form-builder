<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
    // add your own path
	import type { PageData } from './$types';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
    import { TagsInput } from "$lib/components/ui/tags-input";
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

    import { zod } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';

	let {
		data
	}: {
		data: PageData;
	} = $props();

    let { form, message, errors, enhance } = superForm(data.form, {
		validators: zod(schema),
        onUpdated(event) {
          if (event.form.valid) {
            tagsvalue = [];
            combovalue = "";
          }
        }
    });

      let tagsvalue = $state([]);
  $effect(() => {
    $form.tagsinput_c9 = tagsvalue;
  });</script>
<div class="flex min-h-[60vh] flex-col items-center justify-center">
	{#if $message}
		<p class="text-emerald-400">{$message}</p>
	{/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div>
      <Label for="tagsinput_c9" class={$errors.tagsinput_c9 && "text-destructive"}>Enter your tech stack.</Label>
       <!-- Add Tags Input Component from : https://www.shadcn-svelte-extras.com/components/tags-input -->
      <TagsInput bind:value={tagsvalue} placeholder="Add Tech Stack" />
      {#each $form.tagsinput_c9 as item, i}
        <input type="hidden" bind:value={$form.tagsinput_c9[i]} name="tagsinput_c9" id="tagsinput_c9" />
      {/each}
      <p class="text-xs text-muted-foreground">
        Add tags.
      </p>
      {#if $errors.tagsinput_c9}
        <p class="text-sm text-destructive">{$errors.tagsinput_c9?._errors}</p>
      {/if}
    </div>
        <div>
          <Label for="combobox_e7" class={$errors.combobox_e7 && "text-destructive"}>
            Framework
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
                   <input hidden value={$form.combobox_e7} name="combobox_e7" />
                {/snippet}
              </Popover.Trigger>
              <Popover.Content align='start' class="w-full p-0">
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
                            combovalue = framework.value;
                            $form.combobox_e7 = framework.value;
                            closeAndFocusTrigger();
                          }}
                        >
                          <Check
                            class={cn(
                              framework.value !== $form.combobox_e7 &&
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
           Select your favorite framework
          </p>
      </div>

    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>
