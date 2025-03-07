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
  import Dock from "lucide-svelte/icons/dock";
  import CodeXML from "lucide-svelte/icons/code-xml";
  import Zap from "lucide-svelte/icons/zap";
  import { form_generator } from "$lib/form-generator/form-gen.svelte";
  let isFormsnap = () => {
    form_generator.formsnap = "formsnap";
  };
  let isNormalCode = () => {
    form_generator.formsnap = "";
  };
</script>

<div class="col-span-1 lg:col-span-3 ">
  <Tabs value="preview" class="h-full flex items-start lg:items-center flex-col">
    <TabsList
      class="h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse"
    >
      <TabsTrigger
        value="preview"
        class="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary text-xs sm:text-sm"
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
        onclick={isFormsnap}
        value="formsnap"
        class="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary text-xs sm:text-sm"
      >
        <Zap
          class="-ms-0.5 me-1.5 opacity-60"
          size={16}
          stroke-width={2}
          aria-hidden="true"
        />
        Formsnap
        <!-- <Badge class="ms-1.5 rounded-full text-xs">New</Badge> -->
        <span
          class="hidden sm:inline-flex items-center rounded-full bg-green-50 dark:bg-white/80 dark:text-black/80 px-2.5 py-0.5 ms-2.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
          >New</span
        >
      </TabsTrigger>
      <TabsTrigger
        onclick={isNormalCode}
        value="code"
        class="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary text-xs sm:text-sm"
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
        class="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary text-xs sm:text-sm"
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
    <TabsContent value="preview" class="w-full h-full -mt-1">
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
