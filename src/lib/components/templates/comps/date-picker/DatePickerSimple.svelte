<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import * as Calendar from '$lib/components/ui/calendar';
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { buttonVariants } from '$lib/components/ui/button';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import {
		CalendarDate,
		type DateValue,
		getLocalTimeZone,
		DateFormatter
	} from '@internationalized/date';
	import { cn } from '$lib/utils';

	interface Props {
		value?: DateValue | undefined;
		placeholder?: string;
		disabled?: boolean;
		onValueChange?: (value: DateValue | undefined) => void;
	}

	let {
		value = $bindable(undefined),
		placeholder = 'Pick a date',
		disabled = false,
		onValueChange
	}: Props = $props();

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	function handleValueChange(v: DateValue | undefined) {
		value = v;
		onValueChange?.(v);
	}
</script>

<Popover.Root>
	<Popover.Trigger
		class={cn(
			buttonVariants({ variant: 'outline' }),
			'w-full justify-start pl-4 text-left font-normal',
			!value && 'text-muted-foreground'
		)}
		{disabled}
	>
		{value ? df.format(value.toDate(getLocalTimeZone())) : placeholder}
		<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" side="bottom">
		<CalendarPrimitive.Root
			type="single"
			bind:value
			onValueChange={handleValueChange}
			class="rounded-md border p-3"
		>
			{#snippet children({ months, weekdays })}
				<Calendar.Header>
					<Calendar.PrevButton />
					<Calendar.Heading />
					<Calendar.NextButton />
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
