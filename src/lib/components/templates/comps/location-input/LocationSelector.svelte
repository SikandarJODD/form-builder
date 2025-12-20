<script lang="ts">
  import { cn } from "$lib/utils";

  import Check from "@lucide/svelte/icons/check";
  import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";

  import Button from "$lib/components/ui/button/button.svelte";
  import * as Popover from "$lib/components/ui/popover/index";
  import * as Command from "$lib/components/ui/command/index";
  import { ScrollArea, Scrollbar } from "$lib/components/ui/scroll-area/index";

  import countries from "$lib/data/countries.json";
  import states from "$lib/data/states.json";
  import type { CountryProps, Props, StateProps } from "./types";

  let {
    disabled = false,
    onCountryChange,
    onStateChange,
    selectedCountry = $bindable(null),
    selectedState = $bindable(null),
  }: Props = $props();

  // Using Svelte 5 runes for reactive state

  let openCountryDropdown = $state(false);
  let openStateDropdown = $state(false);

  // Cast imported JSON data to their respective types
  let countriesData = countries as CountryProps[];
  let statesData = states as StateProps[];

  function handleCountrySelect(country: CountryProps) {
    selectedCountry = country;
    selectedState = null; // Reset state when country changes
    onCountryChange?.(country);
    onStateChange?.(null);
  }

  function handleStateSelect(state: StateProps) {
    selectedState = state;
    onStateChange?.(state);
  }

  let availableStates: StateProps[] | [] = $derived.by(() => {
    if (!selectedCountry) return [];
    return statesData.filter(
      (state) => state.country_id === selectedCountry?.id
    );
  });
</script>

<div class="flex gap-4">
  <!--  Country Selector  -->
  <Popover.Root
    open={openCountryDropdown}
    onOpenChange={() => (openCountryDropdown = !openCountryDropdown)}
  >
    <Popover.Trigger class={[availableStates.length > 0 ? "w-1/2" : "w-full"]}>
      {#snippet child({ props })}
        <Button
          {...props}
          variant="outline"
          role="combobox"
          aria-expanded={openCountryDropdown}
          {disabled}
          class="w-full justify-between"
        >
          {#if selectedCountry}
            <div class="flex items-center gap-2">
              <span>{selectedCountry.emoji}</span>
              <span>{selectedCountry.name}</span>
            </div>
          {:else}
            <span>Select Country...</span>
          {/if}
          <ChevronsUpDown class="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content
      class={["p-0", availableStates.length > 0 ? "w-fit" : "w-96"]}
      align="start"
    >
      <Command.Root>
        <Command.Input placeholder="Search country..." />
        <Command.List>
          <Command.Empty>No country found.</Command.Empty>
          <Command.Group>
            <ScrollArea class="h-[300px]">
              {#each countriesData as country}
                <Command.Item
                  value={country.name}
                  onSelect={() => {
                    handleCountrySelect(country);
                    openCountryDropdown = false;
                  }}
                  class="flex cursor-pointer items-center justify-between text-sm"
                >
                  <div class="flex items-center gap-2">
                    <span>{country.emoji}</span>
                    <span>{country.name}</span>
                  </div>
                  <Check
                    class={cn(
                      "h-4 w-4",
                      selectedCountry?.id === country.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </Command.Item>
              {/each}
              <Scrollbar orientation="vertical" />
            </ScrollArea>
          </Command.Group>
        </Command.List>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>

  <!-- State Selector - Only shown if selected country has states -->
  {#if availableStates.length > 0}
    <Popover.Root
      open={openStateDropdown}
      onOpenChange={() => (openStateDropdown = !openStateDropdown)}
    >
      <Popover.Trigger class="w-1/2">
        {#snippet child({ props })}
          <Button
            {...props}
            variant="outline"
            role="combobox"
            aria-expanded={openStateDropdown}
            disabled={!selectedCountry}
            class="w-full justify-between"
          >
            {#if selectedState}
              <span>{selectedState.name}</span>
            {:else}
              <span>Select State...</span>
            {/if}
            <ChevronsUpDown class="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content class="p-0" align="start">
        <Command.Root>
          <Command.Input placeholder="Search state..." />
          <Command.List>
            <Command.Empty>No state found.</Command.Empty>
            <Command.Group>
              <ScrollArea class="h-[300px]">
                {#each availableStates as state}
                  <Command.Item
                    value={state.name}
                    onSelect={() => {
                      handleStateSelect(state);
                      openStateDropdown = false;
                    }}
                    class="flex cursor-pointer items-center justify-between text-sm"
                  >
                    <span>{state.name}</span>
                    <Check
                      class={cn(
                        "h-4 w-4",
                        selectedState?.id === state.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </Command.Item>
                {/each}
                <Scrollbar orientation="vertical" />
              </ScrollArea>
            </Command.Group>
          </Command.List>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  {/if}
</div>
