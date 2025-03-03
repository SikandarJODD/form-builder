<script lang="ts">
  import { superForm, filesProxy } from "sveltekit-superforms";
  // add your own path
  import type { PageData } from "./$types";
  import Label from "$lib/components/ui/label/label.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
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
  // Form Validation & Schema
  import { zod } from "sveltekit-superforms/adapters";
  import { schema } from "./schema";

  let {
    data,
  }: {
    data: PageData;
  } = $props();

  let { form, message, errors, enhance } = superForm(data.form, {
    validators: zod(schema),
  });

  message.subscribe((message) => {
    if (message) {
      toast.success(message.text, {
        description: "Your attachments were uploaded.",
      });
    }
  });

  const files = filesProxy(form, "file");
</script>

<div class="flex min-h-[60vh] flex-col items-center justify-center">
  {#if $message}
    <p class="text-emerald-400">{$message}</p>
  {/if}
  <form
    enctype="multipart/form-data"
    method="post"
    use:enhance
    class="w-full md:w-96 space-y-2 p-4 lg:p-0"
  >
    <div>
      <Label for="file">Upload File*</Label>
      <FileDropZone
        {onUpload}
        {onFileRejected}
        maxFileSize={10 * MEGABYTE}
        accept="image/*"
        maxFiles={4}
        fileCount={$files.length}
      />
      <p class="text-sm text-muted-foreground">Select file to upload.</p>
      <input name="file" type="file" bind:files={$files} class="hidden" />
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
      {#if $errors.file?._errors}
        {#each $errors.file?._errors as item}
          <p class="text-destructive text-sm">{item}</p>
        {/each}
      {/if}
    </div>
    <div>
      <Button type="submit" size="sm">Submit</Button>
    </div>
  </form>
</div>
