<script lang="ts">
  import ClientServerCode from "./code/ClientServerCode.svelte";
  import FormsnapCode from "./code/FormsnapCode.svelte";
  import PreviewComponents from "./PreviewComponents.svelte";
  import ZodSchemaCode from "./ZodSchemaCode.svelte";
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "$lib/components/ui/tabs";
  import Box from "lucide-svelte/icons/box";
  import House from "lucide-svelte/icons/house";
  import PanelsTopLeft from "lucide-svelte/icons/panels-top-left";
  import Dock from "lucide-svelte/icons/dock";
  import CodeXML from "lucide-svelte/icons/code-xml";
  import Zap from "lucide-svelte/icons/zap";
  import Badge from "$lib/components/ui/badge/badge.svelte";
</script>

<div class="col-span-3">
  <Tabs value="preview" class="h-full flex items-center flex-col">
    <TabsList
      class="mb-3 h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse"
    >
      <TabsTrigger
        value="preview"
        class="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
      >
        <Dock
          class="-ms-0.5 me-1.5 opacity-60"
          size={16}
          stroke-width={2}
          aria-hidden="true"
        />
        Preview
      </TabsTrigger>
      <TabsTrigger
        value="formsnap"
        class="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
      >
        <Zap
          class="-ms-0.5 me-1.5 opacity-60"
          size={16}
          stroke-width={2}
          aria-hidden="true"
        />
        Formsnap
        <Badge class="ms-1.5 rounded-full">New</Badge>
      </TabsTrigger>
      <TabsTrigger
        value="code"
        class="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
      >
        <Box
          class="-ms-0.5 me-1.5 opacity-60"
          size={16}
          stroke-width={2}
          aria-hidden="true"
        />
        Code
      </TabsTrigger>
      <TabsTrigger
        value="schema"
        class="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
      >
        <CodeXML
          class="-ms-0.5 me-1.5 opacity-60"
          size={16}
          stroke-width={2}
          aria-hidden="true"
        />
        Schema
      </TabsTrigger>
    </TabsList>
    <TabsContent value="preview" class="w-full h-full">
      <PreviewComponents />
    </TabsContent>
    <TabsContent value="formsnap" class="w-full h-full">
      <FormsnapCode />
    </TabsContent>
    <TabsContent value="code" class="w-full">
      <ClientServerCode />
    </TabsContent>
    <TabsContent value="schema" class="w-full">
      <ZodSchemaCode />
    </TabsContent>
  </Tabs>
</div>
