<script lang="ts">
  import { Tabs, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
  import { Database, type Icon } from "lucide-svelte";
  import type { Component } from "svelte";
  import Box from "lucide-svelte/icons/box";
  import Dock from "lucide-svelte/icons/dock";
  import CodeXML from "lucide-svelte/icons/code-xml";
  import Zap from "lucide-svelte/icons/zap";

  let { tab_value = $bindable("preview") } = $props();
  type TabConent = {
    value: string;
    content?: Component;
    isNew?: boolean;
    icon: typeof Icon;
  };
  let tabs_content: TabConent[] = [
    {
      value: "preview",
      icon: Dock,
    },
    {
      value: "client",
      icon: Zap,
    },
    {
      value: "server",
      icon: Database,
    },
    {
      value: "schema",
      icon: CodeXML,
    },
  ];
</script>

<Tabs bind:value={tab_value}>
  <TabsList
    class="h-auto -space-x-px bg-background  p-0 shadow-sm shadow-black/5 rtl:space-x-reverse"
  >
    {#each tabs_content as tabItem}
      {@const Icon = tabItem.icon}
      <TabsTrigger
        value={tabItem.value}
        class="relative capitalize overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary texr-xs sm:text-sm"
      >
        <Icon
          class="hidden sm:flex -ms-0.5 me-1.5 opacity-60"
          size={16}
          stroke-width={2}
          aria-hidden="true"
        />
        {tabItem.value}
        {#if tabItem.isNew}
          <span
            class="hidden sm:inline-flex items-center rounded-full bg-green-50 dark:bg-white/80 dark:text-black/80 px-2.5 py-0.5 ms-2.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
            >New</span
          >
        {/if}
      </TabsTrigger>
    {/each}
  </TabsList>
</Tabs>
