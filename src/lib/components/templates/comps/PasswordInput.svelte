<script lang="ts">
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
</script>

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
      class="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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
