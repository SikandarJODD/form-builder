<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { valibotClient } from "sveltekit-superforms/adapters";
  import { schema } from "./schema";
  import {
    superForm,
    filesProxy,
  } from "sveltekit-superforms";
  import Label from "$lib/components/ui/label/label.svelte";

  // File Upload
  import { toast } from "svelte-sonner";
  import {
    displaySize,
    FileDropZone,
    MEGABYTE,
    type FileDropZoneProps,
  } from "$lib/components/ui/file-drop-zone";
  import { fly, slide } from "svelte/transition";
  import { Trash2 } from "lucide-svelte";
  import type { PageData } from "./$types";

  const onUpload: FileDropZoneProps["onUpload"] = async (uploadedFiles) => {
    // we use set instead of an assignment since it accepts a File[]
    files.set([...Array.from($files), ...uploadedFiles]);
  };
  const onFileRejected: FileDropZoneProps["onFileRejected"] = async ({
    reason,
    file,
  }) => {
    toast.error(`${file.name} failed to upload!`, { description: reason });
  };

  let { data }: { data: PageData } = $props();
  const { form: formData, enhance, message }  = superForm(data.form, {
    validators: valibotClient(schema),
  });
  message.subscribe((message) => {
    if (message) {
      toast.success(message.text, {
        description: "Your attachments were uploaded.",
      });
    }
  });

  const files = filesProxy(formData, "attachments");
</script>

<form
  method="POST"
  enctype="multipart/form-data"
  use:enhance
  class="flex w-[460px] mx-auto flex-col gap-2 p-6"
>
  <Label for="attachments">Upload File*</Label>
  <FileDropZone
    {onUpload}
    {onFileRejected}
    maxFileSize={10 * MEGABYTE}
    accept="image/*"
    maxFiles={4}
    fileCount={$files.length}
  />
  <p class="text-sm text-muted-foreground">Select file to upload.</p>
  <input name="attachments" type="file" bind:files={$files} class="hidden" />
  <div class="flex flex-col">
    {#each Array.from($files) as file, i (file.name)}
      <div
        in:slide
        out:fly={{ x: 20 }}
        class="flex place-items-center justify-between gap-0.5 hover:bg-accent dark:hover:bg-accent/60 p-2 rounded-lg transition-all duration-200"
      >
        <div class="flex gap-2 items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-paperclip"
              ><path d="M13.234 20.252 21 12.3" /><path
                d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486"
              /></svg
            >
          </div>
          <div class="flex flex-col">
            <span class="text-sm">{file.name}</span>
            <span class="text-xs text-muted-foreground"
              >{displaySize(file.size)}</span
            >
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          class="hover:text-primary text-muted-foreground"
          onclick={() => {
            // we use set instead of an assignment since it accepts a File[]
            files.set([
              ...Array.from($files).slice(0, i),
              ...Array.from($files).slice(i + 1),
            ]);
          }}
        >
          <Trash2 />
        </Button>
      </div>
    {/each}
  </div>
  <Button type="submit" class="w-fit">Submit</Button>
</form>
