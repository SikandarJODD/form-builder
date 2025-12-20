<script lang="ts">
	import ClientServerCode from './code/ClientServerCode.svelte';
	import FormsnapCode from './code/FormsnapCode.svelte';
	import PreviewComponents from './PreviewComponents.svelte';
	import ZodSchemaCode from './ZodSchemaCode.svelte';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import Box from '@lucide/svelte/icons/box';
	import Dock from '@lucide/svelte/icons/dock';
	import CodeXML from '@lucide/svelte/icons/code-xml';
	import Zap from '@lucide/svelte/icons/zap';
	import { form_generator } from '$lib/form-generator/form-gen.svelte';
	import { trackTabViewed, trackFormsnapToggled } from '$lib/analytics';

	let handleTabClick = (tabName: string) => {
		trackTabViewed(tabName);
	};

	let isFormsnap = () => {
		form_generator.formsnap = 'formsnap';
		trackFormsnapToggled(true);
	};

	let isNormalCode = () => {
		form_generator.formsnap = '';
		trackFormsnapToggled(false);
	};
</script>

<div class="col-span-1 lg:col-span-3">
	<Tabs value="preview" class="flex h-full flex-col items-start lg:items-center">
		<TabsList
			class="h-auto -space-x-px bg-background p-0 shadow-2xs shadow-black/5 rtl:space-x-reverse"
		>
			<TabsTrigger
				onclick={() => handleTabClick('preview')}
				value="preview"
				class="relative overflow-hidden rounded-none border border-border py-2 text-xs after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary sm:text-sm"
			>
				<Dock class="-ms-0.5 me-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
				Preview
			</TabsTrigger>
			<TabsTrigger
				onclick={() => {
					handleTabClick('formsnap');
					isFormsnap();
				}}
				value="formsnap"
				class="relative overflow-hidden rounded-none border border-border py-2 text-xs after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary sm:text-sm"
			>
				<Zap class="-ms-0.5 me-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
				Formsnap
				<!-- <Badge class="ms-1.5 rounded-full text-xs">New</Badge> -->
				<span
					class="ms-2.5 hidden items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset sm:inline-flex dark:bg-white/80 dark:text-black/80"
					>New</span
				>
			</TabsTrigger>
			<TabsTrigger
				onclick={() => {
					handleTabClick('code');
					isNormalCode();
				}}
				value="code"
				class="relative overflow-hidden rounded-none border border-border py-2 text-xs after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary sm:text-sm"
			>
				<Box class="-ms-0.5 me-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
				Code
			</TabsTrigger>
			<TabsTrigger
				onclick={() => handleTabClick('schema')}
				value="schema"
				class="relative overflow-hidden rounded-none border border-border py-2 text-xs after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary sm:text-sm"
			>
				<CodeXML class="-ms-0.5 me-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
				Schema
			</TabsTrigger>
		</TabsList>
		<TabsContent value="preview" class="-mt-1 h-full w-full">
			<PreviewComponents />
		</TabsContent>
		<TabsContent value="formsnap" class="h-full w-full">
			<FormsnapCode />
		</TabsContent>
		<TabsContent value="code" class="w-full">
			<ClientServerCode />
		</TabsContent>
		<TabsContent value="schema" class="w-full">
			<ZodSchemaCode />
		</TabsContent>
	</Tabs>
</div>
