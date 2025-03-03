<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  // add your own path
  import type { PageData } from "./$types";
  import Label from "$lib/components/ui/label/label.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
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
  // Popover State for combobox
  let open_combobox = $state(false);
  // Value
  let combovalue_combobox = $state("");
  let triggerRef_combobox = $state<HTMLButtonElement>(null!);

  // Selected Value
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
  // Popover State for frame
  let open_frame = $state(false);
  // Value
  let combovalue_frame = $state("");
  let triggerRef_frame = $state<HTMLButtonElement>(null!);

  // Selected Value
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
  import { zod } from "sveltekit-superforms/adapters";
  import { schema } from "./schema";

  let {
    data,
  }: {
    data: PageData;
  } = $props();

  let { form, message, errors, enhance } = superForm(data.form, {
    validators: zod(schema),
    onUpdated(event) {
      if (event.form.valid) {
        combovalue_combobox = "";
        combovalue_frame = "";
      }
    },
  });
</script>

<div class="flex min-h-[60vh] flex-col items-center justify-center">
  {#if $message}
    <p class="text-emerald-400">{$message}</p>
  {/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div>
      <Label for="combobox" class={$errors.combobox && "text-destructive"}>
        Framework
      </Label>
      <div>
        <Popover.Root bind:open={open_combobox}>
          <Popover.Trigger bind:ref={triggerRef_combobox}>
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
              <input hidden value={$form.combobox} name="combobox" />
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
                        $form.combobox = framework.value;
                        closeAndFocusTrigger_combobox();
                      }}
                    >
                      <Check
                        class={cn(
                          framework.value !== $form.combobox &&
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

    <div>
      <Label for="frame" class={$errors.frame && "text-destructive"}>
        Framework
      </Label>
      <div>
        <Popover.Root bind:open={open_frame}>
          <Popover.Trigger bind:ref={triggerRef_frame}>
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
              <input hidden value={$form.frame} name="frame" />
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
                        $form.frame = framework.value;
                        closeAndFocusTrigger_frame();
                      }}
                    >
                      <Check
                        class={cn(
                          framework.value !== $form.frame && "text-transparent"
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
