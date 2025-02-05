<script lang="ts">
  import CalendarIcon from "lucide-svelte/icons/calendar";
  import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
    parseDate,
    parseDateTime,
  } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as chrono from "chrono-node";
  import Label from "$lib/components/ui/label/label.svelte";
  import Input from "$lib/components/ui/input/input.svelte";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  let value: DateValue | undefined = undefined;
  let userInput = "";

  function parseUserInput(event: KeyboardEvent) {
    if (event.key === "Enter" && userInput.trim()) {
      // Use local time instead of UTC
      const now = new Date();
      const parsedDate = chrono.parseDate(userInput, now); // Ensure it uses local time

      if (parsedDate) {
        // Convert to YYYY-MM-DD format for @internationalized/date
        const localDateString = new Intl.DateTimeFormat("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: getLocalTimeZone(), // Ensure it matches local timezone
        }).format(parsedDate);
        value = parseDate(localDateString);
      } else {
        console.error("Invalid date format");
        value = parseDate(new Date().toISOString().split("T")[0]);
      }
    }
  }
</script>

<div class="container flex justify-center items-center min-h-[90vh]">
  <div class="max-w-96 space-y-2">
    <Label>Choose a date:</Label>
    <Input
      type="text"
      bind:value={userInput}
      placeholder="Type a time (e.g., 'after 4 hrs')"
      onkeydown={parseUserInput}
      class="input-box w-full"
    />
    <Popover.Root>
      <Popover.Trigger>
        {#snippet child({ props })}
          <Button
            variant="outline"
            class={cn(
              "w-[240px] justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
            {...props}
          >
            <CalendarIcon />
            {value
              ? df.format(value.toDate(getLocalTimeZone()))
              : "Pick a date"}
          </Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content class="w-auto p-0" align="start">
        <Calendar type="single" bind:value />
      </Popover.Content>
    </Popover.Root>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .input-box {
    width: 240px;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
