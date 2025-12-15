<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import "../app.css";
  import Navbar from "$lib/components/web/layouts/Navbar.svelte";
  import { Toaster } from "svelte-sonner";
  import { initAnalytics } from "$lib/analytics";
  import { onMount } from "svelte";

  let { children } = $props();

  onMount(() => {
    initAnalytics();
  });
</script>

<Toaster />

<ModeWatcher defaultMode="dark" />

<Navbar />
{@render children()}
