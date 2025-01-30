<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
    // add your own path
	import type { PageData } from './$types';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
   import Input from '$lib/components/ui/input/input.svelte';
    import { Calendar } from "$lib/components/ui/calendar/index";
    import * as Popover from "$lib/components/ui/popover/index";
    import CalendarIcon from "lucide-svelte/icons/calendar";
    import {
      CalendarDate,
      DateFormatter,
      type DateValue,
      getLocalTimeZone,
      parseDate,
      today,
    } from "@internationalized/date";

    const df = new DateFormatter("en-US", {
      dateStyle: "long",
    });

    let dvalue = $state<DateValue>();
    let placeholder = $state(today(getLocalTimeZone()));
    $effect(() => {
      dvalue = $form.name_a8e75 ? parseDate($form.name_a8e75) : undefined;
    });

    import { zod } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';

	let {
		data
	}: {
		data: PageData;
	} = $props();
	let { form, message, errors, enhance } = superForm(data.form, {
		validators: zod(schema)
	});
</script>
<div class="flex min-h-[60vh] flex-col items-center justify-center">
	{#if $message}
		<p class="text-emerald-400">{$message}</p>
	{/if}
  <form method="post" use:enhance class="w-full md:w-96 space-y-2 p-4 lg:p-0">
    <div>
      <Label for="name_809aa">Username</Label>
      <Input type="text" id="name_809aa" name="name_809aa" placeholder="Enter your username" bind:value={$form.name_809aa} />
      {#if $errors.name_809aa}
        <p class="text-sm text-red-500">{$errors.name_809aa}</p>
      {/if}
    </div>

    <div>
      <Label for="name_a8e75">Date of Birth</Label>
      <div>
        <Popover.Root>
          <Popover.Trigger>
            {#snippet child({ props })}
              <Button
                variant="outline"
                class={[
                  "w-[240px] justify-start text-left font-normal",
                  !dvalue && "text-muted-foreground"
                ]}
                {...props}
              >
                <CalendarIcon />
                {dvalue
                  ? df.format(dvalue.toDate(getLocalTimeZone()))
                  : "Pick a date"}
              </Button>
            {/snippet}
          </Popover.Trigger>
          <Popover.Content class="w-auto p-0" side="top">
            <Calendar
              type="single"
              value={dvalue}
              bind:placeholder
              id="name_a8e75"
              minValue={new CalendarDate(1900, 1, 1)}
              maxValue={today(getLocalTimeZone())}
              calendarLabel="Date of birth"
              onValueChange={(v) => {
                if (v) {
                  $form.name_a8e75 = v.toString();
                } else {
                  $form.name_a8e75 = "";
                }
              }}
            />
          </Popover.Content>
        </Popover.Root>
      </div>
      <p class="text-xs text-muted-foreground">
          Your date of birth is used to calculate your age.
      </p>
      {#if $errors.name_a8e75}
          <p class="text-sm text-red-500">{$errors.name_a8e75}</p>
      {/if}
      <input hidden value={$form.name_a8e75} name="name_a8e75" />
    </div>
    <Button type="submit" size="sm">Submit</Button>
  </form>
</div>
