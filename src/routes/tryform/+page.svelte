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
  let value = $state<DateValue | undefined>();
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
              <Label>Date of Birth</Label>
              <Popover.Root>
                <Popover.Trigger
                  {...props}
                  class={[
                    buttonVariants({ variant: "outline" }),
                    "w-[250px] justify-start pl-4 text-left font-normal",
                    !value && "text-muted-foreground",
                  ]}
                >
                  {value
                    ? df.format(value.toDate(getLocalTimeZone()))
                    : "Pick a date"}
                  <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
                </Popover.Trigger>
                <Popover.Content class="w-auto p-0" side="bottom">
                  <CalendarPrimitive.Root
                    bind:value
                    bind:placeholder
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
                            value={defaultMonth?.value}
                            onValueChange={(v) => {
                              if (!placeholder) return;
                              if (v === `${placeholder.month} `) return;
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
              <input hidden value={$formData.datepicker} name={props.name} />
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
