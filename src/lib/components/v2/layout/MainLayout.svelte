<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
	import Header from './Header.svelte';
	import FieldsPanel from './FieldsPanel.svelte';
	import EditorPanel from './EditorPanel.svelte';
	import PreviewPanel from './PreviewPanel.svelte';
</script>

<div class="flex h-screen flex-col bg-background">
	<!-- Header -->
	<Header />

	<!-- Main Content: 3-Panel Resizable Layout -->
	<Resizable.PaneGroup direction="horizontal" class="flex-1">
		<!-- Fields Panel (Left) -->
		<Resizable.Pane defaultSize={20} minSize={15} maxSize={25}>
			<FieldsPanel />
		</Resizable.Pane>

		<Resizable.Handle withHandle />

		<!-- Editor Panel (Middle) -->
		<Resizable.Pane defaultSize={40} minSize={30} maxSize={50}>
			<EditorPanel />
		</Resizable.Pane>

		<Resizable.Handle withHandle />

		<!-- Preview Panel (Right) -->
		<Resizable.Pane defaultSize={40} minSize={25} maxSize={55}>
			<PreviewPanel />
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
