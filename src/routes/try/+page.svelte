<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group/index";
  import { Label } from "$lib/components/ui/label/index";

  import { zodClient } from "sveltekit-superforms/adapters";
  import { schema } from "./schema";
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms";
  import Button from "$lib/components/ui/button/button.svelte";

  let {
    data,
  }: {
    data: PageData;
  } = $props();

  let { form, enhance, errors } = superForm(data.form, {
    validators: zodClient(schema),
  });
</script>

<div class="flex justify-center items-center min-h-screen">
  <form method="POST" use:enhance class="space-y-2 min-w-96">
    <div class="space-y-3">
      <Label class="text-sm font-medium">Gender</Label>
      <RadioGroup.Root bind:value={$form.radio} name="radio">
        <div class="flex items-center space-x-2">
          <RadioGroup.Item value="male" id="r1" />
          <Label for="r1">Male</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroup.Item value="female" id="r2" />
          <Label for="r2">Female</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroup.Item value="other" id="r3" />
          <Label for="r3">Other</Label>
        </div>
      </RadioGroup.Root>
      <div>
        <p class="text-xs text-muted-foreground">Select your Gender</p>
        <div>
          {#if $errors.radio}
            <p class="text-red-500 text-xs">{$errors.radio}</p>
          {/if}
        </div>
      </div>
    </div>
    <div>
      <Button size="sm" type="submit">Submit</Button>
    </div>
  </form>
</div>
