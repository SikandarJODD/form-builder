<script>
  import PasswordInput from "$lib/components/templates/comps/PasswordInput.svelte";
  import PasswordInputCode from "$lib/components/templates/comps/PasswordInput.svelte?raw";
  import CopyCode from "$lib/components/web/playground/code/CopyCode.svelte";

  let code =
    `<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";

  import Eye from "lucide-svelte/icons/eye";
  import EyeOff from "lucide-svelte/icons/eye-off";

  let isVisible = $state(false);

  function toggleVisibility() {
    isVisible = !isVisible;
  }
  interface Props {
    id?: string;
    value?: string;
    label?: string;
    name?: string;
    error?: string[] | undefined;
    desc?: string;
    placeholder?: string;
  }
  let {
    id = "password",
    value = $bindable(""),
    label = "Password",
    name = "password",
    error = undefined,
    placeholder = "Password",
    desc = "",
  }: Props = $props();
</` +
    `script>

<div>
  <Label for={id} class={error && "text-destructive"}>{label}</Label>
  <div class="relative">
    <Input
      {id}
      class="pe-9"
      {name}
      {placeholder}
      bind:value
      type={isVisible ? "text" : "password"}
    />
    <button
      class="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg \n text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground \n focus-visible:border focus-visible:border-ring focus-visible:text-foreground \n focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring/30 \n focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed \n disabled:opacity-50"
      type="button"
      onclick={toggleVisibility}
      aria-label={isVisible ? "Hide password" : "Show password"}
      aria-pressed={isVisible}
      aria-controls="password"
    >
      {#if isVisible}
        <Eye size={16} stroke-width={2} aria-hidden="true" />
      {:else}
        <EyeOff size={16} stroke-width={2} aria-hidden="true" />
      {/if}
    </button>
  </div>
  {#if desc}
    <p class="text-muted-foreground text-xs">
      {desc}
    </p>
  {/if}
</div>
`;
let rawcode = PasswordInputCode;
</script>

<h2 class="text-2xl font-semibold">Password Input</h2>

<p class="text-muted-foreground">
  Password input is a component that consist of show/hide password feature.
</p>
<div class="w-full max-w-2xl mt-4">
  <CopyCode code={rawcode} lang="svelte" class="h-[400px]" />
</div>
<h3 class="text-xl font-semibold mt-6">Preview</h3>
<div
  class="mt-2 border border-dashed border-muted-foreground p-4 w-full min-h-64 flex justify-center items-center"
>
  <div class="w-fit mx-auto">
    <PasswordInput value="svelte" />
  </div>
</div>
