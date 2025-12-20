<script lang="ts">
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import Database from '@lucide/svelte/icons/database';
	import { type Icon as IconType } from '@lucide/svelte';
	import type { Component } from 'svelte';
	import Box from '@lucide/svelte/icons/box';
	import Dock from '@lucide/svelte/icons/dock';
	import CodeXML from '@lucide/svelte/icons/code-xml';
	import Zap from '@lucide/svelte/icons/zap';

	let { tab_value = $bindable('preview') } = $props();
	type TabConent = {
		value: string;
		content?: Component;
		isNew?: boolean;
		icon: typeof IconType;
	};
	let tabs_content: TabConent[] = [
		{
			value: 'preview',
			icon: Dock
		},
		{
			value: 'client',
			icon: Zap
		},
		{
			value: 'server',
			icon: Database
		},
		{
			value: 'schema',
			icon: CodeXML
		}
	];
</script>

<Tabs bind:value={tab_value}>
	<TabsList
		class="h-auto -space-x-px bg-background  p-0 shadow-2xs shadow-black/5 rtl:space-x-reverse"
	>
		{#each tabs_content as tabItem}
			{@const Icon = tabItem.icon}
			<TabsTrigger
				value={tabItem.value}
				class="texr-xs relative overflow-hidden rounded-none border border-border py-2 capitalize after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary sm:text-sm"
			>
				<Icon
					class="-ms-0.5 me-1.5 hidden opacity-60 sm:flex"
					size={16}
					stroke-width={2}
					aria-hidden="true"
				/>
				{tabItem.value}
				{#if tabItem.isNew}
					<span
						class="ms-2.5 hidden items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset sm:inline-flex dark:bg-white/80 dark:text-black/80"
						>New</span
					>
				{/if}
			</TabsTrigger>
		{/each}
	</TabsList>
</Tabs>
