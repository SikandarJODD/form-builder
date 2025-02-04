<script>
  import TemplatesSidebar from "$lib/components/templates/TemplatesSidebar.svelte";

  let { children } = $props();
</script>

<TemplatesSidebar>
  {@render children()}
</TemplatesSidebar>
