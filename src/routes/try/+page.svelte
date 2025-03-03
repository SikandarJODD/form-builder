<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  // add your own path
  import type { PageData } from "./$types";
  import Label from "$lib/components/ui/label/label.svelte";
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

  const defaultYear_datepicker = $derived(
    placeholder_datepicker
      ? {
          value: String(placeholder_datepicker.year),
          label: String(placeholder_datepicker.year),
        }
      : undefined
  );

  const defaultMonth_datepicker = $derived(
    placeholder_datepicker
      ? {
          value: String(placeholder_datepicker.month),
          label: monthFmt.format(
            placeholder_datepicker.toDate(getLocalTimeZone())
          ),
        }
      : undefined
  );

  const monthLabel_datepicker = $derived(
    monthOptions.find((m) => m.value === defaultMonth_datepicker?.value)
      ?.label ?? "Select a month"
  );
  let value_datepick = $state<DateValue | undefined>();
  let df_datepick = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  let placeholder_datepick = $state(today(getLocalTimeZone()));

  const defaultYear_datepick = $derived(
    placeholder_datepick
      ? {
          value: String(placeholder_datepick.year),
          label: String(placeholder_datepick.year),
        }
      : undefined
  );

  const defaultMonth_datepick = $derived(
    placeholder_datepick
      ? {
          value: String(placeholder_datepick.month),
          label: monthFmt.format(
            placeholder_datepick.toDate(getLocalTimeZone())
          ),
        }
      : undefined
  );

  const monthLabel_datepick = $derived(
    monthOptions.find((m) => m.value === defaultMonth_datepick?.value)?.label ??
      "Select a month"
  );
  // Form Validation & Schema
  import { zod } from "sveltekit-superforms/adapters";
  import { schema } from "./schema";

  let {
    data,
  }: {
    data: PageData;
  } = $props();

  let { form, message, errors, enhance } = superForm(data.form, {
    validators: zod(schema),
  });
</script>

<div class="flex min-h-[60vh] flex-col items-center justify-center">
  {#if $message}
    <p class="text-emerald-400">{$message}</p>
  {/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div class="flex flex-col">
      <div class="grid gap-2">
        <Label>Date of Birth</Label>
        <Popover.Root>
          <Popover.Trigger
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
                  $form.datepicker = v.toString();
                } else {
                  $form.datepicker = "";
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
                        if (v === `${placeholder_datepicker.month}`) return;
                        placeholder_datepicker = placeholder_datepicker.set({
                          month: Number.parseInt(v),
                        });
                      }}
                    >
                      <Select.Trigger aria-label="Select month" class="w-[60%]">
                        {monthLabel_datepicker}
                      </Select.Trigger>
                      <Select.Content class="max-h-[200px] overflow-y-auto">
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
                        if (v === `${placeholder_datepicker?.year}`) return;
                        placeholder_datepicker = placeholder_datepicker.set({
                          year: Number.parseInt(v),
                        });
                      }}
                    >
                      <Select.Trigger aria-label="Select year" class="w-[40%]">
                        {defaultYear_datepicker?.label ?? "Select year"}
                      </Select.Trigger>
                      <Select.Content class="max-h-[200px] overflow-y-auto">
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
        <input hidden value={$form.datepicker} name="datepicker" />
      </div>
      {#if $errors.datepicker}
        <p class="text-sm text-destructive">{$errors.datepicker}</p>
      {/if}
    </div>
    <div class="flex flex-col">
      <div class="grid gap-2">
        <Label>Date of Birth</Label>
        <Popover.Root>
          <Popover.Trigger
            class={[
              buttonVariants({ variant: "outline" }),
              "w-[250px] justify-start pl-4 text-left font-normal",
              !value_datepick && "text-muted-foreground",
            ]}
          >
            {value_datepick
              ? df_datepick.format(value_datepick.toDate(getLocalTimeZone()))
              : "Pick a date"}
            <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
          </Popover.Trigger>
          <Popover.Content class="w-auto p-0" side="bottom">
            <CalendarPrimitive.Root
              bind:value={value_datepick}
              bind:placeholder={placeholder_datepick}
              class="rounded-md border p-3"
              type="single"
              minValue={new CalendarDate(1900, 1, 1)}
              maxValue={today(getLocalTimeZone())}
              calendarLabel="Date of birth"
              initialFocus
              onValueChange={(v) => {
                if (v) {
                  $form.datepick = v.toString();
                } else {
                  $form.datepick = "";
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
                      value={defaultMonth_datepick?.value}
                      onValueChange={(v) => {
                        if (!placeholder_datepick) return;
                        if (v === `${placeholder_datepick.month}`) return;
                        placeholder_datepick = placeholder_datepick.set({
                          month: Number.parseInt(v),
                        });
                      }}
                    >
                      <Select.Trigger aria-label="Select month" class="w-[60%]">
                        {monthLabel_datepick}
                      </Select.Trigger>
                      <Select.Content class="max-h-[200px] overflow-y-auto">
                        {#each monthOptions as { value, label }}
                          <Select.Item {value} {label} />
                        {/each}
                      </Select.Content>
                    </Select.Root>
                    <Select.Root
                      type="single"
                      value={defaultYear_datepick?.value}
                      onValueChange={(v) => {
                        if (!v || !placeholder_datepick) return;
                        if (v === `${placeholder_datepick?.year}`) return;
                        placeholder_datepick = placeholder_datepick.set({
                          year: Number.parseInt(v),
                        });
                      }}
                    >
                      <Select.Trigger aria-label="Select year" class="w-[40%]">
                        {defaultYear_datepick?.label ?? "Select year"}
                      </Select.Trigger>
                      <Select.Content class="max-h-[200px] overflow-y-auto">
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
        <input hidden value={$form.datepick} name="datepick" />
      </div>
      {#if $errors.datepick}
        <p class="text-sm text-destructive">{$errors.datepick}</p>
      {/if}
    </div>
    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>
