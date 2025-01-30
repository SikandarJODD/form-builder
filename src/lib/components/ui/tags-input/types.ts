import type { HTMLInputAttributes } from 'svelte/elements';

export interface TagsInputProps extends HTMLInputAttributes {
	value?: string[];
	class?: string;
	placeholder?: string;
	disabled?: boolean;
	validate?: (val: string, tags: string[]) => string | undefined;
}
