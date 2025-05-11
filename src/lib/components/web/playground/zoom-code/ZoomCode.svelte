<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog/index";
  import CopyCode from "../code/CopyCode.svelte";
  type Props = {
    title?: string;
    description?: string;
    code: string;
  };
  let {
    title = "Formsnap Code",
    description = "This is the code for the Formsnap component",
    code = "coding is fun",
  }: Props = $props();
</script>

<Dialog.Root>
  <Dialog.Trigger
    class={buttonVariants({ variant: "secondary", size: "icon" })}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><path d="M8 3H5a2 2 0 0 0-2 2v3" /><path
        d="M21 8V5a2 2 0 0 0-2-2h-3"
      /><path d="M3 16v3a2 2 0 0 0 2 2h3" /><path
        d="M16 21h3a2 2 0 0 0 2-2v-3"
      /></svg
    >
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[920px] sm:h-[650px]">
    <Dialog.Header>
      <Dialog.Title>
        {title}
      </Dialog.Title>
      <Dialog.Description>
        {description}
      </Dialog.Description>
    </Dialog.Header>
      <CopyCode {code} lang='svelte' codeclass='text-sm' />
  </Dialog.Content>
</Dialog.Root>
