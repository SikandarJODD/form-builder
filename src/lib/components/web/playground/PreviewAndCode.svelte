<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index";
  import ClientServerCode from "./code/ClientServerCode.svelte";
  import PreviewComponents from "./PreviewComponents.svelte";
  import ZodSchemaCode from "./ZodSchemaCode.svelte";
</script>

<div class='col-span-3 '>
  <Tabs.Root value="preview" class="h-full flex items-center flex-col">
    <Tabs.List class="w-fit mx-auto">
      <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
      <Tabs.Trigger value="code">Code</Tabs.Trigger>
      <Tabs.Trigger value="zodschema">ZOD Schema</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="preview" class="w-full h-full">
      <PreviewComponents />
    </Tabs.Content>
    <Tabs.Content value="code" class="w-full">
      <ClientServerCode />
    </Tabs.Content>
    <Tabs.Content value="zodschema" class="w-full">
      <ZodSchemaCode />
    </Tabs.Content>
  </Tabs.Root>
</div>
