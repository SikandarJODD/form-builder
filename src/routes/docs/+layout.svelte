<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";
  import Sidebar from "$lib/components/docs/comps/Sidebar.svelte";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="max-w-5xl mx-auto py-4">
  <Sidebar>
    {@render children()}
  </Sidebar>
</div>
