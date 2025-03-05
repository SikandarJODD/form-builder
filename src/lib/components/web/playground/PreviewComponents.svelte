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
  import { REGEXP_ONLY_DIGITS } from "bits-ui";
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

  // Tags Input
  let tagsvalue = $state([]);
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
    displaySize,
    FileDropZone,
    MEGABYTE,
    type FileDropZoneProps,
  } from "$lib/components/ui/file-drop-zone";
  import { enhance } from "$app/forms";

  import { Trash2, X } from "lucide-svelte";
  import { onDestroy } from "svelte";
  import { SvelteDate } from "svelte/reactivity";
  import { fade, fly, scale, slide } from "svelte/transition";
  const onUpload: FileDropZoneProps["onUpload"] = async (files) => {
    await Promise.allSettled(files.map((file) => uploadFile(file)));
  };
  const onFileRejected: FileDropZoneProps["onFileRejected"] = async ({
    reason,
    file,
  }) => {
    toast.error(`${file.name} failed to upload!`, { description: reason });
  };
  const uploadFile = async (file: File) => {
    // don't upload duplicate files
    if (files.find((f) => f.name === file.name)) return;
    const urlPromise = new Promise<string>((resolve) => {
      resolve(URL.createObjectURL(file));
    });
    files.push({
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: Date.now(),
      url: urlPromise,
    });
    // we await since we don't want the onUpload to be complete until the files are actually uploaded
    await urlPromise;
  };
  type UploadedFile = {
    name: string;
    type: string;
    size: number;
    uploadedAt: number;
    url: Promise<string>;
  };
  let files = $state<UploadedFile[]>([]);
  let date = new SvelteDate();
  onDestroy(async () => {
    for (const file of files) {
      URL.revokeObjectURL(await file.url);
    }
  });
  $effect(() => {
    const interval = setInterval(() => {
      date.setTime(Date.now());
    }, 10);
    return () => {
      clearInterval(interval);
    };
  });
</script>

{#if form_generator.selected_inputs.length === 0}
  <div class="flex flex-col items-center justify-center size-full mt-4">
    <p class="text-muted-foreground">No components selected</p>
  </div>
{:else}
  <form
    method="POST"
    use:enhance={() => {
      return async ({ result, update }) => {
        if (result.status === 200) {
          toast.success(`${JSON.stringify(result.data.form, null, 2)}`);
        }
      };
    }}
  >
    <div class="flex flex-col space-y-4 p-2 max-w-md mx-auto mt-4">
      <div class="space-y-2">
        {#each form_generator.selected_inputs as comp (comp.id)}
          <div animate:flip={{ duration: 300 }}>
            <div class="space-y-1">
              {#if comp.type === "title"}
                <h2 class="text-2xl font-semibold leading-none tracking-tight">
                  {comp.label}
                </h2>
              {/if}
              {#if comp.type === "desc"}
                <p class="text-sm text-muted-foreground">
                  {comp.label}
                </p>
              {/if}
            </div>
            {#if comp.category === "text" || comp.category === "number"}
              <div>
                <Label for={comp.named_id}>{comp.label}</Label>
                <Input
                  required
                  type={comp.type}
                  id={comp.named_id}
                  name={comp.named_id}
                  placeholder={comp.placeholder}
                />
                <p class="text-xs text-muted-foreground">
                  {comp.description}
                </p>
              </div>
            {/if}
            {#if comp.category === "email"}
              <div>
                <Label for={comp.named_id}>{comp.label}</Label>
                <Input
                  required
                  type={comp.type}
                  id={comp.named_id}
                  name={comp.named_id}
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
                  id={comp.named_id}
                />
              </div>
            {/if}
            {#if comp.category === "switch" && comp.type === "boolean"}
              <div
                class="flex flex-row items-center justify-between rounded-lg border p-4"
              >
                <div class="space-y-0.5">
                  <Label for={comp.named_id}>
                    {comp.label}
                  </Label>
                  <p class="text-xs text-muted-foreground">
                    {comp.description}
                  </p>
                </div>
                <Switch name={comp.named_id} id={comp.named_id} />
              </div>
            {/if}
            {#if comp.type === "textarea"}
              <Label for={comp.named_id}>
                {comp.label}
              </Label>
              <Textarea
                required
                name={comp.named_id}
                id={comp.named_id}
                placeholder={comp.placeholder}
                class="resize-none"
              />
              <p class="text-xs text-muted-foreground">
                {comp.description}
              </p>
            {/if}
            {#if comp.type === "select"}
              <div>
                <Label for={comp.named_id}>
                  {comp.label}
                </Label>
                <Select.Root type="single" bind:value>
                  <Select.Trigger id={comp.named_id} name={comp.named_id}>
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
            {#if comp.category === "checkbox" && comp.type === "boolean"}
              <div
                class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
              >
                <Checkbox name={comp.named_id} id={comp.named_id} />
                <div class="space-y-1 leading-none">
                  <Label for={comp.named_id}>
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
                  id={comp.named_id}
                  name={comp.named_id}
                  pattern={REGEXP_ONLY_DIGITS}
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
                  <Label for={comp.named_id}>Date of birth</Label>
                  <Popover.Root>
                    <Popover.Trigger
                      id={comp.named_id}
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
                                        <Calendar.Cell
                                          {date}
                                          month={month.value}
                                        >
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
                  <input type="hidden" name={comp.named_id} value={dvalue} />
                </div>
              </div>
            {/if}
            {#if comp.category === "phone"}
              <div>
                <Label for={comp.named_id}>
                  {comp.label}
                </Label>
                <PhoneInput
                  country="IN"
                  name={comp.named_id}
                  placeholder={comp.placeholder}
                  id={comp.named_id}
                />
                <p class="text-xs text-muted-foreground">
                  {comp.description}
                </p>
              </div>
            {/if}
            {#if comp.type === "file"}
              <div>
                <Label for="attachments">Upload File*</Label>
                <FileDropZone
                  {onUpload}
                  {onFileRejected}
                  maxFileSize={10 * MEGABYTE}
                  accept="image/*"
                  maxFiles={4}
                  class="mt-1"
                />
                <p class="text-sm text-muted-foreground">
                  Select file to upload.
                </p>
                <div class="flex flex-col">
                  {#each Array.from(files) as file, i (file.name)}
                    <div
                      in:slide
                      out:fly={{ x: 20 }}
                      class="flex place-items-center justify-between gap-0.5 hover:bg-accent dark:hover:bg-accent/60 p-2 rounded-lg transition-all duration-200"
                    >
                      <div class="flex gap-2 items-center">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-paperclip"
                            ><path d="M13.234 20.252 21 12.3" /><path
                              d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486"
                            /></svg
                          >
                        </div>
                        <div class="flex flex-col">
                          <span class="text-sm">{file.name}</span>
                          <span class="text-xs text-muted-foreground"
                            >{displaySize(file.size)}</span
                          >
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        class="hover:text-primary text-muted-foreground"
                        onclick={() => {
                          // we use set instead of an assignment since it accepts a File[]
                          files = [
                            ...Array.from(files).slice(0, i),
                            ...Array.from(files).slice(i + 1),
                          ];
                        }}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
            {#if comp.type === "range"}
              <input type="range" id={comp.id} />
            {/if}
            {#if comp.type === "tags-input"}
              <div>
                <Label for={comp.named_id}>{comp.label}</Label>
                <TagsInput
                  placeholder={comp.placeholder}
                  bind:value={tagsvalue}
                  id={comp.named_id}
                />
                <input
                  type="hidden"
                  name={comp.named_id}
                  bind:value={tagsvalue}
                />
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
                          name={comp.named_id}
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
                  <input
                    type="hidden"
                    name={comp.named_id}
                    value={combovalue}
                  />
                </div>
                <p class="text-xs text-muted-foreground">
                  {comp.description}
                </p>
              </div>
            {/if}
          </div>
        {/each}
      </div>
      <Button type="submit" class="w-fit" size="sm">Submit</Button>
    </div>
  </form>
{/if}
