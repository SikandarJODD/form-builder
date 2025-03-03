<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import type { PageData } from "./$types";
  import { schema } from "./schema";
  // FormSnap
  import { Field, Control, Label, Description, FieldErrors } from "formsnap";
  // Components
  import Button from "$lib/components/ui/button/button.svelte";
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
  ];
  // Popover State
  let open_combobox = $state(false);
  // Combobox Value
  let combovalue_combobox = $state("");
  let triggerRef_combobox = $state<HTMLButtonElement>(null!);

  const selectedValue_combobox = $derived(
    frameworks.find((f) => f.value === combovalue_combobox)?.label ??
      "Select a framework..."
  );

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger_combobox() {
    open_combobox = false;
    tick().then(() => {
      triggerRef_combobox.focus();
    });
  }
  // Popover State
  let open_frame = $state(false);
  // Combobox Value
  let combovalue_frame = $state("");
  let triggerRef_frame = $state<HTMLButtonElement>(null!);

  const selectedValue_frame = $derived(
    frameworks.find((f) => f.value === combovalue_frame)?.label ??
      "Select a framework..."
  );

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger_frame() {
    open_frame = false;
    tick().then(() => {
      triggerRef_frame.focus();
    });
  }
  let {
    data,
  }: {
    data: PageData;
  } = $props();

  let form = superForm(data.form, {
    validators: zod(schema),
    onUpdated(event) {
      if (event.form.valid) {
        combovalue_combobox = "";
        combovalue_frame = "";
      }
    },
  });

  let { form: formData, enhance, message } = form;
</script>

<div class="flex min-h-[60vh] flex-col items-center justify-center">
  {#if $message}
    <span class="text-emerald-400">
      {$message}
    </span>
  {/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div>
      <Field {form} name="combobox">
        <Control>
          {#snippet children({ props })}
            <Label for="combobox">Work</Label>
            <div>
              <Popover.Root bind:open={open_combobox}>
                <Popover.Trigger bind:ref={triggerRef_combobox} {...props}>
                  {#snippet child({ props })}
                    <Button
                      variant="outline"
                      class="w-full justify-between"
                      {...props}
                      role="combobox"
                      aria-expanded={open_combobox}
                    >
                      {selectedValue_combobox || "Select a framework..."}
                      <ChevronsUpDown class="opacity-50" />
                    </Button>
                    <input hidden value={$formData.combobox} name="combobox" />
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
                              combovalue_combobox = framework.value;
                              $formData.combobox = framework.value;
                              closeAndFocusTrigger_combobox();
                            }}
                          >
                            <Check
                              class={cn(
                                framework.value !== $formData.combobox &&
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
          Select your favorite framework
        </Description>
        <FieldErrors class="text-sm text-destructive" />
      </Field>
    </div>
    <div>
      <Field {form} name="frame">
        <Control>
          {#snippet children({ props })}
            <Label for="frame">Framework</Label>
            <div>
              <Popover.Root bind:open={open_frame}>
                <Popover.Trigger bind:ref={triggerRef_frame} {...props}>
                  {#snippet child({ props })}
                    <Button
                      variant="outline"
                      class="w-full justify-between"
                      {...props}
                      role="combobox"
                      aria-expanded={open_frame}
                    >
                      {selectedValue_frame || "Select a framework..."}
                      <ChevronsUpDown class="opacity-50" />
                    </Button>
                    <input hidden value={$formData.frame} name="frame" />
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
                              combovalue_frame = framework.value;
                              $formData.frame = framework.value;
                              closeAndFocusTrigger_frame();
                            }}
                          >
                            <Check
                              class={cn(
                                framework.value !== $formData.frame &&
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
          Select your favorite framework
        </Description>
        <FieldErrors class="text-sm text-destructive" />
      </Field>
    </div>
    <div>
      <Button size="sm" type="submit">Submit</Button>
    </div>
  </form>
</div>
