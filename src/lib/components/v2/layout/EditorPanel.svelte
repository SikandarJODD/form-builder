<script lang="ts">
	import { formV2 } from '../state/form-v2.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Popover from '$lib/components/ui/popover';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { flip } from 'svelte/animate';
	import { dragHandleZone, dragHandle } from 'svelte-dnd-action';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import Plus from '@lucide/svelte/icons/plus';
	import GripVertical from '@lucide/svelte/icons/grip-vertical';
	import Ungroup from '@lucide/svelte/icons/ungroup';
	import ArrowLeftRight from '@lucide/svelte/icons/arrow-left-right';
	import Pencil from '@lucide/svelte/icons/pencil';
	import type { InputType } from '$lib/form-generator/form-gen.svelte';
	// Field Icons
	import TextCursorInput from '@lucide/svelte/icons/text-cursor-input';
	import Mail from '@lucide/svelte/icons/mail';
	import Lock from '@lucide/svelte/icons/lock';
	import Hash from '@lucide/svelte/icons/hash';
	import AlignLeft from '@lucide/svelte/icons/align-left';
	import ToggleLeft from '@lucide/svelte/icons/toggle-left';
	import CheckSquare from '@lucide/svelte/icons/check-square';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import Circle from '@lucide/svelte/icons/circle';
	import Calendar from '@lucide/svelte/icons/calendar';
	import SlidersHorizontal from '@lucide/svelte/icons/sliders-horizontal';
	import Keyboard from '@lucide/svelte/icons/keyboard';
	import Phone from '@lucide/svelte/icons/phone';
	import Search from '@lucide/svelte/icons/search';
	import Tags from '@lucide/svelte/icons/tags';
	import Upload from '@lucide/svelte/icons/upload';
	import MapPin from '@lucide/svelte/icons/map-pin';
	// Display Icons
	import Heading1 from '@lucide/svelte/icons/heading-1';
	import Heading2 from '@lucide/svelte/icons/heading-2';
	import Heading3 from '@lucide/svelte/icons/heading-3';
	import Text from '@lucide/svelte/icons/text';
	import Minus from '@lucide/svelte/icons/minus';

	import type { InputTypeV2 } from '../state/form-v2.svelte';

	// Map field types to icons
	const getFieldIcon = (category: string) => {
		const iconMap: Record<string, typeof TextCursorInput> = {
			text: TextCursorInput,
			email: Mail,
			password: Lock,
			number: Hash,
			textarea: AlignLeft,
			switch: ToggleLeft,
			checkbox: CheckSquare,
			select: ChevronDown,
			radio: Circle,
			'date-picker': Calendar,
			slider: SlidersHorizontal,
			'input-otp': Keyboard,
			phone: Phone,
			combobox: Search,
			'tags-input': Tags,
			file: Upload,
			'location-input': MapPin,
			// Display elements
			h1: Heading1,
			h2: Heading2,
			h3: Heading3,
			desc: Text,
			separator: Minus,
			display: Text
		};
		return iconMap[category] || TextCursorInput;
	};

	const handleDeleteField = (fieldId: string) => {
		formV2.removeField(fieldId);
	};

	const handleUpdateField = (fieldId: string, key: keyof InputTypeV2, value: unknown) => {
		formV2.updateField(fieldId, { [key]: value });
	};

	const handleAddSideBySide = (rowId: string, field: InputType) => {
		formV2.addFieldToRow(rowId, field);
	};

	const handleUngroup = (rowId: string) => {
		formV2.ungroupRow(rowId);
	};

	// Drag and drop configuration
	const flipDurationMs = 200;

	// Track which row's popover is open
	let openPopoverId = $state<string | null>(null);

	// Track which option is being edited
	let editingOption = $state<{ fieldId: string; optionId: string } | null>(null);
	let editOptionValue = $state('');
	let editOptionLabel = $state('');
</script>

<div class="flex h-full flex-col">
	<!-- Panel Header -->
	<div class="border-b p-4">
		<h3 class="text-sm font-semibold">Editor</h3>
		<p class="text-xs text-muted-foreground">Design your form elements</p>
	</div>

	<!-- Scrollable Editor Content -->
	<ScrollArea class="flex-1">
		{#if formV2.rows.length === 0}
			<!-- Empty State -->
			<div class="flex h-64 flex-col items-center justify-center p-4 text-center">
				<div class="mb-4 rounded-full bg-muted p-4">
					<Plus class="h-6 w-6 text-muted-foreground" />
				</div>
				<h4 class="mb-1 text-sm font-medium">No fields added</h4>
				<p class="text-xs text-muted-foreground">Click on fields from the left panel to add them</p>
			</div>
		{:else}
			<!-- Field Rows - Drag & Drop Zone -->
			<div
				class="space-y-2 p-3"
				use:dragHandleZone={{
					items: formV2.rows,
					flipDurationMs,
					dropTargetStyle: {},
					type: 'field-rows'
				}}
				onconsider={formV2.handleDndConsider}
				onfinalize={formV2.handleDndFinalize}
			>
				{#each formV2.rows as row (row.id)}
					<!-- Row Container - supports side-by-side fields -->
					<div
						class={['rounded-lg border bg-card transition-shadow', row.fields.length > 1 && 'p-2']}
						animate:flip={{ duration: flipDurationMs }}
					>
						{#if row.fields.length > 1}
							<!-- Row Header with Ungroup & Drag Handle -->
							<div class="mb-2 flex items-center justify-between border-b pb-2">
								<div class="flex items-center gap-2">
									<button
										use:dragHandle
										aria-label="drag-handle for row {row.id}"
										class="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
									>
										<GripVertical class="h-4 w-4" />
									</button>
									<span class="text-xs text-muted-foreground">Side-by-side fields</span>
								</div>
								<div class="flex items-center gap-1">
									<Button
										variant="ghost"
										size="sm"
										class="h-6 text-xs"
										onclick={() => formV2.swapFieldsInRow(row.id)}
										title="Swap field positions"
									>
										<ArrowLeftRight class="mr-1 h-3 w-3" />
										Swap
									</Button>
									<Button
										variant="ghost"
										size="sm"
										class="h-6 text-xs"
										onclick={() => handleUngroup(row.id)}
									>
										<Ungroup class="mr-1 h-3 w-3" />
										Ungroup
									</Button>
								</div>
							</div>
						{/if}
						<div class={['gap-2', row.fields.length > 1 && 'grid grid-cols-2']}>
							{#each row.fields as field (field.id)}
								{@const FieldIcon = getFieldIcon(field.category)}
								<div class={['', row.fields.length > 1 && 'rounded-lg border bg-background']}>
									<!-- Field Header -->
									<div class="flex items-center gap-2 p-3">
										{#if row.fields.length === 1}
											<!-- Drag handle for single field rows -->
											<button
												use:dragHandle
												aria-label="drag-handle for {field.name}"
												class="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
											>
												<GripVertical class="h-4 w-4" />
											</button>
										{/if}
										<FieldIcon class="h-4 w-4 text-muted-foreground" />
										<span class="flex-1 truncate text-sm font-medium">
											{field.label || field.name}
										</span>
										<div class="flex items-center gap-1">
											<Button
												variant="ghost"
												size="icon-sm"
												onclick={() => handleDeleteField(field.id!)}
												class="h-7 w-7 text-destructive hover:text-destructive"
											>
												<Trash2 class="h-3.5 w-3.5" />
											</Button>
											{#if row.fields.length < 2}
												<!-- Popover for adding side-by-side field -->
												<Popover.Root
													bind:open={
														() => openPopoverId === row.id,
														(v) => (openPopoverId = v ? row.id : null)
													}
												>
													<Popover.Trigger>
														<Button
															variant="ghost"
															size="icon-sm"
															class="h-7 w-7"
															title="Add side-by-side field"
														>
															<Plus class="h-3.5 w-3.5" />
														</Button>
													</Popover.Trigger>
													<Popover.Content class="w-56 p-2" align="end" side="bottom">
														<div class="space-y-2">
															<p class="px-1 text-xs font-medium text-muted-foreground">
																Select field to add
															</p>
															<ScrollArea class="h-48">
																<div class="space-y-0.5">
																	{#each formV2.availableFields as fieldOption}
																		{@const FieldOptionIcon = getFieldIcon(fieldOption.category)}
																		<button
																			class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-accent"
																			onclick={() => {
																				handleAddSideBySide(row.id, fieldOption);
																				openPopoverId = null;
																			}}
																		>
																			<FieldOptionIcon class="h-3.5 w-3.5 text-muted-foreground" />
																			<span>{fieldOption.name}</span>
																		</button>
																	{/each}
																</div>
															</ScrollArea>
														</div>
													</Popover.Content>
												</Popover.Root>
											{/if}
										</div>
									</div>

									<!-- Field Customization (Accordion) -->
									<Accordion.Root type="single" class="w-full">
										<Accordion.Item value="customize">
											<Accordion.Trigger class="px-3 py-2 text-xs hover:no-underline">
												Customize Field
											</Accordion.Trigger>
											<Accordion.Content class="px-3 pb-3">
												<div class="space-y-3">
													<!-- Label -->
													<div class="space-y-1.5">
														<Label class="text-xs">Label</Label>
														<Input
															value={field.label}
															oninput={(e) =>
																handleUpdateField(field.id!, 'label', e.currentTarget.value)}
															placeholder="Field label"
															class="h-8 text-sm"
														/>
													</div>

													<!-- Name (ID) -->
													<div class="space-y-1.5">
														<Label class="text-xs">Name (ID)</Label>
														<Input
															value={field.named_id}
															oninput={(e) =>
																handleUpdateField(field.id!, 'named_id', e.currentTarget.value)}
															placeholder="field_name"
															class="h-8 font-mono text-sm"
														/>
													</div>

													<!-- Placeholder -->
													<div class="space-y-1.5">
														<Label class="text-xs">Placeholder</Label>
														<Input
															value={field.placeholder}
															oninput={(e) =>
																handleUpdateField(field.id!, 'placeholder', e.currentTarget.value)}
															placeholder="Enter placeholder"
															class="h-8 text-sm"
														/>
													</div>

													<!-- Description -->
													<div class="space-y-1.5">
														<Label class="text-xs">Description</Label>
														<Input
															value={field.description}
															oninput={(e) =>
																handleUpdateField(field.id!, 'description', e.currentTarget.value)}
															placeholder="Field description"
															class="h-8 text-sm"
														/>
													</div>

													<!-- Options Editor for select, combobox, radio -->
													{#if field.category === 'select' || field.category === 'combobox' || field.category === 'radio'}
														<div class="mt-3 space-y-2 border-t pt-3">
															<div class="mb-3 flex items-center justify-between">
																<Label class="text-xs font-semibold">Options</Label>
																<Button
																	variant="outline"
																	size="sm"
																	class="h-7 gap-1.5 text-xs"
																	onclick={() => formV2.addOption(field.id!)}
																>
																	<Plus class="h-3.5 w-3.5" />
																	Add Option
																</Button>
															</div>

															{#if field.options && field.options.length > 0}
																<div
																	class="space-y-2"
																	use:dragHandleZone={{
																		items: field.options,
																		flipDurationMs: 200,
																		dropTargetStyle: {},
																		type: `options-${field.id}`
																	}}
																	onconsider={(e) => {
																		formV2.reorderOptions(field.id!, e.detail.items);
																	}}
																	onfinalize={(e) => {
																		formV2.reorderOptions(field.id!, e.detail.items);
																	}}
																>
																	{#each field.options as option (option.id)}
																		<div
																			class="group flex items-start gap-2 rounded-lg border bg-card p-2.5 transition-colors hover:bg-accent/50"
																			animate:flip={{ duration: 200 }}
																		>
																			<button
																				use:dragHandle
																				aria-label="drag-handle for option {option.label}"
																				class="mt-0.5 cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
																			>
																				<GripVertical class="h-4 w-4" />
																			</button>

																			<div class="min-w-0 flex-1">
																				{#if editingOption?.fieldId === field.id && editingOption?.optionId === option.id}
																					<!-- Edit Mode -->
																					<div class="space-y-1.5">
																						<Input
																							value={editOptionLabel}
																							oninput={(e) =>
																								(editOptionLabel = e.currentTarget.value)}
																							placeholder="Label"
																							class="h-7 text-xs"
																							autofocus
																						/>
																						<Input
																							value={editOptionValue}
																							oninput={(e) =>
																								(editOptionValue = e.currentTarget.value)}
																							placeholder="value"
																							class="h-7 font-mono text-xs"
																						/>
																						<div class="flex gap-1">
																							<Button
																								variant="default"
																								size="sm"
																								class="h-6 flex-1 text-xs"
																								onclick={() => {
																									formV2.updateOption(field.id!, option.id, {
																										label: editOptionLabel,
																										value: editOptionValue
																									});
																									editingOption = null;
																								}}
																							>
																								Save
																							</Button>
																							<Button
																								variant="ghost"
																								size="sm"
																								class="h-6 flex-1 text-xs"
																								onclick={() => (editingOption = null)}
																							>
																								Cancel
																							</Button>
																						</div>
																					</div>
																				{:else}
																					<!-- Display Mode -->
																					<div class="space-y-0.5">
																						<div class="truncate text-sm font-medium">
																							{option.label}
																						</div>
																						<div class="font-mono text-xs text-muted-foreground">
																							Value: {option.value}
																						</div>
																					</div>
																				{/if}
																			</div>

																			{#if !editingOption || editingOption?.optionId !== option.id}
																				<div
																					class="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100"
																				>
																					<Button
																						variant="ghost"
																						size="icon-sm"
																						class="h-7 w-7"
																						onclick={() => {
																							editingOption = {
																								fieldId: field.id!,
																								optionId: option.id
																							};
																							editOptionLabel = option.label;
																							editOptionValue = option.value;
																						}}
																						title="Edit option"
																					>
																						<Pencil class="h-3.5 w-3.5" />
																					</Button>
																					<Button
																						variant="ghost"
																						size="icon-sm"
																						class="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
																						onclick={() =>
																							formV2.deleteOption(field.id!, option.id)}
																						title="Delete option"
																					>
																						<Trash2 class="h-3.5 w-3.5" />
																					</Button>
																				</div>
																			{/if}
																		</div>
																	{/each}
																</div>
															{:else}
																<div
																	class="rounded-lg border bg-muted/30 py-3 text-center text-xs text-muted-foreground"
																>
																	No options added yet
																</div>
															{/if}
														</div>
													{/if}

													<!-- Checkboxes -->
													<div class="mt-3 flex gap-4 border-t pt-3">
														<div class="flex items-center gap-2">
															<Checkbox
																checked={field.required}
																onCheckedChange={(checked) =>
																	handleUpdateField(field.id!, 'required', checked)}
															/>
															<Label class="text-xs">Required</Label>
														</div>
														<div class="flex items-center gap-2">
															<Checkbox
																checked={field.disabled}
																onCheckedChange={(checked) =>
																	handleUpdateField(field.id!, 'disabled', checked)}
															/>
															<Label class="text-xs">Disabled</Label>
														</div>
													</div>
												</div>
											</Accordion.Content>
										</Accordion.Item>
									</Accordion.Root>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</ScrollArea>
</div>

<style>
	/* Drag and drop visual feedback */
	:global([data-is-dragging='true']) {
		opacity: 0.8;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
		z-index: 50;
	}

	:global(.dnd-shadow-item) {
		border: 2px dashed hsl(var(--muted-foreground) / 0.3) !important;
		background: hsl(var(--muted) / 0.5) !important;
	}
</style>
