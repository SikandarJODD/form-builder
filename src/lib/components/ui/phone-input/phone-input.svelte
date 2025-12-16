<script lang="ts">
  import CountrySelector from "./country-selector.svelte";
  import { defaultOptions, type Props } from ".";
  import { TelInput, normalizedCountries } from "svelte-tel-input";
  import "svelte-tel-input/styles/flags.css";
  import { cn } from "$lib/utils";

  const countries = normalizedCountries;

  let {
    class: className = undefined,
    defaultCountry = null,
    country = $bindable(defaultCountry),
    options = defaultOptions,
    placeholder = $bindable(undefined),
    readonly = $bindable(false),
    disabled = $bindable(false),
    value = $bindable(null),
    valid = $bindable(false),
    detailedValue = $bindable(),
    id = undefined,
    order = undefined,
    name = undefined,
    ...rest
  }: Props = $props();

  let el: HTMLInputElement | undefined = $state();

  export const focus = () => {
    // sort of an after update kinda thing
    setTimeout(() => {
      el?.focus();
    }, 0);
  };
</script>

<div class="flex place-items-center">
  <CountrySelector
    {order}
    {countries}
    bind:selected={country}
    onselect={focus}
  />
  <TelInput
    {name}
    id={id}
    bind:country
    bind:detailedValue
    bind:value
    bind:valid
    bind:readonly
    bind:disabled
    bind:placeholder
    bind:el
    {options}
    required
    class={cn(
      "flex h-9 min-w-0 max-w-[212px] rounded-lg rounded-l-none border border-l-0 border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
      className
    )}
    {...rest}
  />
</div>
