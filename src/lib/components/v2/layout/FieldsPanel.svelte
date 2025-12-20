<script lang="ts">
	import { formV2 } from '../state/form-v2.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

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

	import type { InputType } from '$lib/form-generator/form-gen.svelte';

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
			separator: Minus
		};
		return iconMap[category] || TextCursorInput;
	};

	const handleAddField = (field: InputType) => {
		formV2.addField(field);
	};
</script>

<div class="flex h-full flex-col">
	<!-- Panel Header -->
	<div class="border-b p-4">
		<h3 class="text-sm font-semibold">Fields</h3>
		<p class="text-xs text-muted-foreground">Select Field For the Form</p>
	</div>

	<!-- Scrollable Fields List -->
	<ScrollArea class="flex-1 p-3">
		<!-- Field Elements -->
		<div class="mb-4">
			<h4 class="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
				Field Elements
			</h4>
			<div class="grid grid-cols-2 gap-1.5">
				{#each formV2.availableFields as field}
					{@const Icon = getFieldIcon(field.category)}
					<Button
						variant="outline"
						size="sm"
						class="h-auto justify-start gap-2 px-2 py-2 text-xs font-normal"
						onclick={() => handleAddField(field)}
					>
						<Icon class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
						<span class="truncate">{field.name}</span>
					</Button>
				{/each}
			</div>
		</div>

		<!-- Display Elements -->
		<div>
			<h4 class="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
				Display Elements
			</h4>
			<div class="grid grid-cols-2 gap-1.5">
				{#each formV2.displayElements as element}
					{@const Icon = getFieldIcon(element.type)}
					<Button
						variant="outline"
						size="sm"
						class="h-auto justify-start gap-2 px-2 py-2 text-xs font-normal"
						onclick={() => handleAddField(element)}
					>
						<Icon class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
						<span class="truncate">{element.name}</span>
					</Button>
				{/each}
			</div>
		</div>
	</ScrollArea>
</div>
