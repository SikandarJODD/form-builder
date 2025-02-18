<script lang="ts">
  import Button, {
    buttonVariants,
  } from "$lib/components/ui/button/button.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import * as Select from "$lib/components/ui/select/index";
  import * as Popover from "$lib/components/ui/popover/index";
  import * as Command from "$lib/components/ui/command/index";
  import * as InputOTP from "$lib/components/ui/input-otp/index";
  import * as Calendar from "$lib/components/ui/calendar/index";

  // Main Form Generator Code
  import { form_generator } from "$lib/form-generator/form-gen.svelte";

  import { flip } from "svelte/animate";
  import { tick } from "svelte";

  // Lucide Icons
  import CalendarIcon from "lucide-svelte/icons/calendar";
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import { cn } from "$lib/utils";
  // Shadcn Extra Components : https://www.shadcn-svelte-extras.com
  import TagsInput from "$lib/components/ui/tags-input/tags-input.svelte";
  import PhoneInput from "$lib/components/ui/phone-input/phone-input.svelte";
  import PasswordInput from "$lib/components/templates/comps/PasswordInput.svelte";

  // DatePicker Utils
  import {
    CalendarDate,
    type DateValue,
    getLocalTimeZone,
    today,
    DateFormatter,
  } from "@internationalized/date";
  import { Calendar as CalendarPrimitive } from "bits-ui";

  // Date Picker

  let dvalue = $state<DateValue | undefined>();
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
  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });
  let placeholder = $state(today(getLocalTimeZone()));

  const defaultYear = $derived(
    placeholder
      ? { value: String(placeholder.year), label: String(placeholder.year) }
      : undefined
  );

  const defaultMonth = $derived(
    placeholder
      ? {
          value: String(placeholder.month),
          label: monthFmt.format(placeholder.toDate(getLocalTimeZone())),
        }
      : undefined
  );

  const monthLabel = $derived(
    monthOptions.find((m) => m.value === defaultMonth?.value)?.label ??
      "Select a month"
  );

  // select and radio box need options
  let select_examples = [
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
    { value: "astro", label: "Astro" },
  ];

  let value = $state("");

  let triggerContent = $derived(
    select_examples.find((f) => f.value === value)?.label ?? "Svelte"
  );

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

  // File Upload

  import { toast } from "svelte-sonner";
  import {
    FileDropZone,
    MEGABYTE,
    type FileDropZoneProps,
  } from "$lib/components/ui/file-drop-zone";

  const onUpload: FileDropZoneProps["onUpload"] = async (uploadedFiles) => {
    // we use set instead of an assignment since it accepts a File[]
    console.log(uploadedFiles);
  };
  const onFileRejected: FileDropZoneProps["onFileRejected"] = async ({
    reason,
    file,
  }) => {
    toast.error(`${file.name} failed to upload!`, { description: reason });
  };
</script>

{#if form_generator.selected_inputs.length === 0}
  <div class="flex flex-col items-center justify-center size-full mt-4">
    <p class="text-muted-foreground">No components selected</p>
  </div>
{:else}
  <div class="flex flex-col space-y-4 p-2 max-w-md mx-auto mt-4">
    <div class="space-y-2">
      {#each form_generator.selected_inputs as comp (comp.id)}
        <div animate:flip={{ duration: 300 }}>
          {#if comp.category === "text" || comp.category === "number"}
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
          {#if comp.category === "email"}
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
          {#if comp.category === "password"}
            <div>
              <PasswordInput
                label={comp.label}
                name={comp.named_id}
                desc={comp.description}
              />
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
            <Label>
              {comp.label}
            </Label>
            <Textarea placeholder={comp.placeholder} class="resize-none" />
            <p class="text-xs text-muted-foreground">
              {comp.description}
            </p>
          {/if}
          {#if comp.type === "select"}
            <div>
              <Label>
                {comp.label}
              </Label>
              <Select.Root type="single" bind:value>
                <Select.Trigger>
                  {triggerContent}
                </Select.Trigger>
                <Select.Content>
                  {#each select_examples as item}
                    <Select.Item value={item.value} label={item.label} />
                  {/each}
                </Select.Content>
              </Select.Root>
              <p class="text-xs text-muted-foreground">
                {comp.description}
              </p>
            </div>
          {/if}
          {#if comp.category === "checkbox"}
            <div
              class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
            >
              <Checkbox />
              <div class="space-y-1 leading-none">
                <Label>
                  {comp.label}
                </Label>
                <p class="text-sm text-muted-foreground">
                  {comp.description}
                </p>
              </div>
              <!-- add input for copy code -->
              <!-- <input name= value={$formData.mobile} type="hidden" /> -->
            </div>
          {/if}
          {#if comp.category === "input-otp"}
            <div>
              <Label for={comp.named_id}>{comp.label}</Label>
              <InputOTP.Root
                maxlength={6}
                name={comp.named_id}
                id={comp.named_id}
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
                {comp.description}
              </p>
            </div>
          {/if}
          {#if comp.category === "date-picker"}
            <div class="flex flex-col">
              <div class="grid gap-2">
                <Label>Date of birth</Label>
                <Popover.Root>
                  <Popover.Trigger
                    class={[
                      buttonVariants({ variant: "outline" }),
                      "w-[250px] justify-start pl-4 text-left font-normal",
                      !dvalue && "text-muted-foreground",
                    ]}
                  >
                    {dvalue
                      ? df.format(dvalue.toDate(getLocalTimeZone()))
                      : "Pick a date"}
                    <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
                  </Popover.Trigger>
                  <Popover.Content class="w-auto p-0" side="bottom">
                    <CalendarPrimitive.Root
                      bind:value={dvalue}
                      bind:placeholder
                      class="rounded-md border p-3"
                      type="single"
                      minValue={new CalendarDate(1900, 1, 1)}
                      maxValue={today(getLocalTimeZone())}
                      calendarLabel="Date of birth"
                      initialFocus
                    >
                      {#snippet children({ months, weekdays })}
                        <Calendar.Header>
                          <Calendar.Heading
                            class="flex w-full items-center justify-between gap-2"
                          >
                            <Select.Root
                              type="single"
                              value={defaultMonth?.value}
                              onValueChange={(v) => {
                                if (!placeholder) return;
                                if (v === `${placeholder.month}`) return;
                                placeholder = placeholder.set({
                                  month: Number.parseInt(v),
                                });
                              }}
                            >
                              <Select.Trigger
                                aria-label="Select month"
                                class="w-[60%]"
                              >
                                {monthLabel}
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
                              value={defaultYear?.value}
                              onValueChange={(v) => {
                                if (!v || !placeholder) return;
                                if (v === `${placeholder?.year}`) return;
                                placeholder = placeholder.set({
                                  year: Number.parseInt(v),
                                });
                              }}
                            >
                              <Select.Trigger
                                aria-label="Select year"
                                class="w-[40%]"
                              >
                                {defaultYear?.label ?? "Select year"}
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
              </div>
            </div>
          {/if}
          {#if comp.category === "phone"}
            <div>
              <Label>
                {comp.label}
              </Label>
              <PhoneInput
                country="IN"
                name="phone"
                placeholder={comp.placeholder}
              />
              <p class="text-xs text-muted-foreground">
                {comp.description}
              </p>
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
            <div>
              <Label for="attachments">Upload File*</Label>
              <FileDropZone
                {onUpload}
                {onFileRejected}
                maxFileSize={10 * MEGABYTE}
                accept="image/*"
                maxFiles={4}
                class='mt-1'
              />
              <p class="text-sm text-muted-foreground">
                Select file to upload.
              </p>
            </div>
          {/if}
          {#if comp.type === "range"}
            <input type="range" id={comp.id} />
          {/if}
          {#if comp.type === "tags-input"}
            <div>
              <Label for={comp.named_id}>{comp.label}</Label>
              <TagsInput placeholder={comp.placeholder} />
              <p class="text-xs text-muted-foreground">
                {comp.description}
              </p>
            </div>
          {/if}
          {#if comp.type === "combobox"}
            <div>
              <Label for={comp.named_id}>{comp.label}</Label>
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
                    {/snippet}
                  </Popover.Trigger>
                  <Popover.Content align="start" class="w-full p-0">
                    <Command.Root>
                      <Command.Input
                        placeholder="Search framework..."
                        class="h-9"
                      />
                      <Command.List class="w-full">
                        <Command.Empty>No framework found.</Command.Empty>
                        <Command.Group>
                          {#each frameworks as framework}
                            <Command.Item
                              value={framework.value}
                              onSelect={() => {
                                combovalue = framework.value;
                                closeAndFocusTrigger();
                              }}
                            >
                              <Check
                                class={cn(
                                  combovalue !== framework.value &&
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
                {comp.description}
              </p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
    <Button class="w-fit" size="sm">Submit</Button>
  </div>
{/if}
