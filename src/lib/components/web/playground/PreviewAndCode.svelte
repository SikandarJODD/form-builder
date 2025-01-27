<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index";
  import PreviewComponents from "./PreviewComponents.svelte";
  import ZodSchemaCode from "./ZodSchemaCode.svelte";
</script>

<Tabs.Root value="preview" class="h-full flex items-center flex-col">
  <Tabs.List class="w-fit mx-auto">
    <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
    <Tabs.Trigger value="code">Code</Tabs.Trigger>
    <Tabs.Trigger value="zodschema">ZOD Schema</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="preview" class="w-full">
    <PreviewComponents />
  </Tabs.Content>
  <Tabs.Content value="code">Change your password here.</Tabs.Content>
  <Tabs.Content value="zodschema" class="w-full">
    <ZodSchemaCode />
  </Tabs.Content>
</Tabs.Root>
