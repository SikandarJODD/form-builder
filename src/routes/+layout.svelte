<script lang="ts">
  import { ModeWatcher } from "mode-watcher";

  import "../app.css";
  import Navbar from "$lib/components/web/layouts/Navbar.svelte";
  import { Toaster } from "svelte-sonner";
  let { children } = $props();
  // Analytics

</script>
<Toaster  />


<ModeWatcher defaultMode='dark' />

<Navbar />
{@render children()}
