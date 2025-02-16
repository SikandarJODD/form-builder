<script lang="ts">
  import { ModeWatcher } from "mode-watcher";

  import "../app.css";
  import Navbar from "$lib/components/web/layouts/Navbar.svelte";
  let { children } = $props();
  // Analytics

</script>


<ModeWatcher defaultMode='dark' />

<Navbar />
{@render children()}
