<script lang="ts">
  import SidebarSide from "$lib/components/web/playground/SidebarSide.svelte";
  import PreviewSide from "$lib/components/web/playground/PreviewSide.svelte";
</script>

<div class="flex min-h-full flex-col">
  <div class="mx-auto w-full grow lg:flex xl:px-2">
    <div class="flex-1 lg:flex">
      <SidebarSide />
      <PreviewSide />
    </div>
  </div>
</div>
