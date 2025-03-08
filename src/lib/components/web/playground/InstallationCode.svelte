<script>
  import { form_generator } from "$lib/form-generator/form-gen.svelte";
  import CopyCode from "./code/CopyCode.svelte";
  import * as Popover from "$lib/components/ui/popover/index";
  import Button from "$lib/components/ui/button/button.svelte";
  let { blurbg = $bindable() } = $props();
  let open = $state(false);
  $effect(() => {
    if (open) {
      blurbg = true;
    } else {
      blurbg = false;
    }
  });
</script>

<Popover.Root bind:open>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button
        variant="secondary"
        data-umami-event="Install Command Button"
        class="z-50"
        size="icon"
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-download"
          ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline
            points="7 10 12 15 17 10"
          /><line x1="12" x2="12" y1="15" y2="3" /></svg
        >
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content side='left' align='start' sideOffset={6} class="relative w-[550px] rounded-xl">
    <h3 class='text-xl font-medium'>
      Installation Command
    </h3>
    <p class="mb-2 text-muted-foreground text-sm">
      Visit <a
        href="https://next.shadcn-svelte.com"
        class="underline text-primary/80 underline-offset-2"
        target="_blank">Shadcn Svelte</a
      >,
      <a
        href="https://www.shadcn-svelte-extras.com"
        class="underline text-primary/80 underline-offset-2"
        target="_blank">Shadcn Extra</a
      > for more details.
    </p>
    <CopyCode code={form_generator.command} lang="shellscript" />
  </Popover.Content>
</Popover.Root>
