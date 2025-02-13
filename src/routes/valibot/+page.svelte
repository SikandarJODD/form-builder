<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms";

  let { data }: { data: PageData } = $props();

  // Client API:
  const { form } = superForm(data.form);
</script>

<div class="flex justify-center items-center min-h-[90vh]">
  <form method="POST">
    <div>
      <Label for="name">Name</Label>
      <Input type="text" name="name" bind:value={$form.name} />
    </div>
    <div>
      <Label for="email">E-mail</Label>
      <Input type="email" name="email" bind:value={$form.email} />
    </div>
    <Button>Submit</Button>
  </form>
</div>
