<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import type { PageData } from "./$types";
  import { schema } from "./schema";
  // FormSnap
  import { Field, Control, Label, Description, FieldErrors } from "formsnap";
  // Components
  import Button from "$lib/components/ui/button/button.svelte";
  import { CalendarIcon } from "lucide-svelte";
  import * as Popover from "$lib/components/ui/popover";
  import * as Select from "$lib/components/ui/select";
  import * as Calendar from "$lib/components/ui/calendar/index";
  import { Calendar as CalendarPrimitive } from "bits-ui";
  import {
    CalendarDate,
    type DateValue,
    getLocalTimeZone,
    today,
    DateFormatter,
  } from "@internationalized/date";
  // Components
  import { buttonVariants } from "$lib/components/ui/button/button.svelte";
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

  let value_datepicker = $state<DateValue | undefined>();
  let df_datepicker = new DateFormatter("en-US", {
    dateStyle: "long",
  });
  let placeholder_datepicker = $state(today(getLocalTimeZone()));

  let defaultYear_datepicker = $derived(
    placeholder_datepicker
      ? {
          value: String(placeholder_datepicker.year),
          label: String(placeholder_datepicker.year),
        }
      : undefined
  );

  let defaultMonth_datepicker = $derived(
    placeholder_datepicker
      ? {
          value: String(placeholder_datepicker.month),
          label: monthFmt.format(
            placeholder_datepicker.toDate(getLocalTimeZone())
          ),
        }
      : undefined
  );

  let monthLabel_datepicker = $derived(
    monthOptions.find((m) => m.value === defaultMonth_datepicker?.value)
      ?.label ?? "Select a month"
  );
  let value_datepicker_72 = $state<DateValue | undefined>();
  let df_datepicker_72 = new DateFormatter("en-US", {
    dateStyle: "long",
  });
  let placeholder_datepicker_72 = $state(today(getLocalTimeZone()));

  let defaultYear_datepicker_72 = $derived(
    placeholder_datepicker_72
      ? {
          value: String(placeholder_datepicker_72.year),
          label: String(placeholder_datepicker_72.year),
        }
      : undefined
  );

  let defaultMonth_datepicker_72 = $derived(
    placeholder_datepicker_72
      ? {
          value: String(placeholder_datepicker_72.month),
          label: monthFmt.format(
            placeholder_datepicker_72.toDate(getLocalTimeZone())
          ),
        }
      : undefined
  );

  let monthLabel_datepicker_72 = $derived(
    monthOptions.find((m) => m.value === defaultMonth_datepicker_72?.value)
      ?.label ?? "Select a month"
  );
  let {
    data,
  }: {
    data: PageData;
  } = $props();

  let form = superForm(data.form, {
    validators: zod(schema),
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
    <div class="flex flex-col">
      <div class="grid gap-2">
        <Field {form} name="datepicker">
          <Control>
            {#snippet children({ props })}
              <Label for="datepicker">Date of Birth</Label>
              <Popover.Root>
                <Popover.Trigger
                  {...props}
                  class={[
                    buttonVariants({ variant: "outline" }),
                    "w-[250px] justify-start pl-4 text-left font-normal",
                    !value_datepicker && "text-muted-foreground",
                  ]}
                >
                  {value_datepicker
                    ? df_datepicker.format(
                        value_datepicker.toDate(getLocalTimeZone())
                      )
                    : "Pick a date"}
                  <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
                </Popover.Trigger>
                <Popover.Content class="w-auto p-0" side="bottom">
                  <CalendarPrimitive.Root
                    bind:value={value_datepicker}
                    bind:placeholder={placeholder_datepicker}
                    class="rounded-md border p-3"
                    type="single"
                    minValue={new CalendarDate(1900, 1, 1)}
                    maxValue={today(getLocalTimeZone())}
                    calendarLabel="Date of birth"
                    initialFocus
                    onValueChange={(v) => {
                      if (v) {
                        $formData.datepicker = v.toString();
                      } else {
                        $formData.datepicker = "";
                      }
                    }}
                  >
                    {#snippet children({ months, weekdays })}
                      <Calendar.Header>
                        <Calendar.Heading
                          class="flex w-full items-center justify-between gap-2"
                        >
                          <Select.Root
                            type="single"
                            value={defaultMonth_datepicker?.value}
                            onValueChange={(v) => {
                              if (!placeholder_datepicker) return;
                              if (v === `${placeholder_datepicker.month} `)
                                return;
                              placeholder_datepicker =
                                placeholder_datepicker.set({
                                  month: Number.parseInt(v),
                                });
                            }}
                          >
                            <Select.Trigger
                              aria-label="Select month"
                              class="w-[60%]"
                            >
                              {monthLabel_datepicker}
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
                            value={defaultYear_datepicker?.value}
                            onValueChange={(v) => {
                              if (!v || !placeholder_datepicker) return;
                              if (v === `${placeholder_datepicker?.year}`)
                                return;
                              placeholder_datepicker =
                                placeholder_datepicker.set({
                                  year: Number.parseInt(v),
                                });
                            }}
                          >
                            <Select.Trigger
                              aria-label="Select year"
                              class="w-[40%]"
                            >
                              {defaultYear_datepicker?.label ?? "Select year"}
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
              <input hidden value={$formData.datepicker} name={props.name} />
            {/snippet}
          </Control>
          <FieldErrors class="text-sm text-destructive" />
        </Field>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="grid gap-2">
        <Field {form} name="datepicker_72">
          <Control>
            {#snippet children({ props })}
              <Label for="datepicker_72">Date of Birth</Label>
              <Popover.Root>
                <Popover.Trigger
                  {...props}
                  class={[
                    buttonVariants({ variant: "outline" }),
                    "w-[250px] justify-start pl-4 text-left font-normal",
                    !value_datepicker_72 && "text-muted-foreground",
                  ]}
                >
                  {value_datepicker_72
                    ? df_datepicker_72.format(
                        value_datepicker_72.toDate(getLocalTimeZone())
                      )
                    : "Pick a date"}
                  <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
                </Popover.Trigger>
                <Popover.Content class="w-auto p-0" side="bottom">
                  <CalendarPrimitive.Root
                    bind:value={value_datepicker_72}
                    bind:placeholder={placeholder_datepicker_72}
                    class="rounded-md border p-3"
                    type="single"
                    minValue={new CalendarDate(1900, 1, 1)}
                    maxValue={today(getLocalTimeZone())}
                    calendarLabel="Date of birth"
                    initialFocus
                    onValueChange={(v) => {
                      if (v) {
                        $formData.datepicker_72 = v.toString();
                      } else {
                        $formData.datepicker_72 = "";
                      }
                    }}
                  >
                    {#snippet children({ months, weekdays })}
                      <Calendar.Header>
                        <Calendar.Heading
                          class="flex w-full items-center justify-between gap-2"
                        >
                          <Select.Root
                            type="single"
                            value={defaultMonth_datepicker_72?.value}
                            onValueChange={(v) => {
                              if (!placeholder_datepicker_72) return;
                              if (v === `${placeholder_datepicker_72.month} `)
                                return;
                              placeholder_datepicker_72 =
                                placeholder_datepicker_72.set({
                                  month: Number.parseInt(v),
                                });
                            }}
                          >
                            <Select.Trigger
                              aria-label="Select month"
                              class="w-[60%]"
                            >
                              {monthLabel_datepicker_72}
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
                            value={defaultYear_datepicker_72?.value}
                            onValueChange={(v) => {
                              if (!v || !placeholder_datepicker_72) return;
                              if (v === `${placeholder_datepicker_72?.year}`)
                                return;
                              placeholder_datepicker_72 =
                                placeholder_datepicker_72.set({
                                  year: Number.parseInt(v),
                                });
                            }}
                          >
                            <Select.Trigger
                              aria-label="Select year"
                              class="w-[40%]"
                            >
                              {defaultYear_datepicker_72?.label ??
                                "Select year"}
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
              <input hidden value={$formData.datepicker_72} name={props.name} />
            {/snippet}
          </Control>
          <FieldErrors class="text-sm text-destructive" />
        </Field>
      </div>
    </div>

    <div>
      <Button size="sm" type="submit">Submit</Button>
    </div>
  </form>
</div>
