<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import { form_generator } from "$lib/form-generator/form-gen.svelte";
  import * as Select from "$lib/components/ui/select/index";
  import * as InputOTP from "$lib/components/ui/input-otp/index";
  import { flip } from "svelte/animate";
  import { Calendar } from "$lib/components/ui/calendar/index";
  import * as Popover from "$lib/components/ui/popover/index";
  import CalendarIcon from "lucide-svelte/icons/calendar";
  import {
    CalendarDate,
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
    parseDate,
    today,
  } from "@internationalized/date";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  let dvalue = $state<DateValue>();
  let placeholder = $state(today(getLocalTimeZone()));

  // $effect(() => {
  //   dvalue = $formData.dob ? parseDate($formData.dob) : undefined;
  // });

  import { cn } from "$lib/utils";
  import TagsInput from "$lib/components/ui/tags-input/tags-input.svelte";
  import PhoneInput from "$lib/components/ui/phone-input/phone-input.svelte";
  // select and radio box need options

  let select_examples = [
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
  ];

  let value = $state("");

  let triggerContent = $derived(
    select_examples.find((f) => f.value === value)?.label ?? "Svelte"
  );
</script>

{#if form_generator.selected_inputs.length === 0}
  <div class="flex flex-col items-center justify-center size-full">
    <p class="text-muted-foreground">No components selected</p>
  </div>
{:else}
  <div class="flex flex-col space-y-4 p-2 max-w-md mx-auto mt-4">
    <div class="space-y-2">
      {#each form_generator.selected_inputs as comp (comp.id)}
        <div animate:flip={{ duration: 300 }}>
          {#if comp.category === "text"}
            <div>
              <Label for={comp.named_id && "name"}>{comp.label}</Label>
              <Input
                type={comp.type}
                id={comp.named_id && "name"}
                name={comp.named_id && "name"}
                placeholder={comp.placeholder}
              />
              <p class="text-xs text-muted-foreground">
                {comp.description}
              </p>
            </div>
          {/if}
          {#if comp.category === "switch"}
            <div
              class="flex flex-row items-center justify-between rounded-lg border p-4"
            >
              <div class="space-y-0.5">
                <Label>
                  {comp.label}
                </Label>
                <p class="text-sm text-muted-foreground">
                  {comp.description}
                </p>
              </div>
              <Switch name={comp.named_id} id={comp.named_id} />
            </div>
          {/if}
          {#if comp.type === "textarea"}
            <Label>Bio</Label>
            <Textarea
              placeholder="Tell us a little bit about yourself"
              class="resize-none"
            />
            <p class="text-xs text-muted-foreground">
              You can <span>@mention</span> other users and organizations.
            </p>
          {/if}
          {#if comp.type === "select"}
            <div>
              <Label>Framework</Label>
              <Select.Root type="single" bind:value>
                <Select.Trigger>
                  {triggerContent}
                </Select.Trigger>
                <Select.Content>
                  {#each select_examples as item}
                    <Select.Item value={item.value} label={item.label} />
                  {/each}
                </Select.Content>
              </Select.Root>
              <p class="text-xs text-muted-foreground">
                You can manage email addresses in your email settings.
              </p>
            </div>
          {/if}
          {#if comp.category === "checkbox"}
            <div
              class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
            >
              <Checkbox />
              <div class="space-y-1 leading-none">
                <Label>Use different settings for my mobile devices</Label>
                <p class="text-sm text-muted-foreground">
                  You can manage your mobile notifications in the <a
                    href="/examples/forms">mobile settings</a
                  > page.
                </p>
              </div>
              <!-- add input for copy code -->
              <!-- <input name= value={$formData.mobile} type="hidden" /> -->
            </div>
          {/if}
          {#if comp.category === "input-otp"}
            <div>
              <Label for={comp.named_id}>{comp.label}</Label>
              <InputOTP.Root
                maxlength={6}
                name={comp.named_id}
                id={comp.named_id}
              >
                {#snippet children({ cells })}
                  <InputOTP.Group>
                    {#each cells.slice(0, 3) as cell}
                      <InputOTP.Slot {cell} />
                    {/each}
                  </InputOTP.Group>
                  <InputOTP.Separator />
                  <InputOTP.Group>
                    {#each cells.slice(3, 6) as cell}
                      <InputOTP.Slot {cell} />
                    {/each}
                  </InputOTP.Group>
                {/snippet}
              </InputOTP.Root>
              <p class="text-xs text-muted-foreground">
                {comp.description}
              </p>
            </div>
          {/if}
          {#if comp.category === "date-picker"}
            <div>
              <Label for={comp.named_id}>{comp.label}</Label>
              <div>
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
                        {dvalue
                          ? df.format(dvalue.toDate(getLocalTimeZone()))
                          : "Pick a date"}
                      </Button>
                    {/snippet}
                  </Popover.Trigger>
                  <Popover.Content class="w-auto p-0" side="top">
                    <Calendar
                      type="single"
                      id={comp.named_id}
                      value={dvalue}
                      bind:placeholder
                      minValue={new CalendarDate(1900, 1, 1)}
                      maxValue={today(getLocalTimeZone())}
                      calendarLabel="Date of birth"
                    />
                  </Popover.Content>
                </Popover.Root>
              </div>
              <p class="text-xs text-muted-foreground">
                {comp.description}
              </p>
              <!-- <input hidden value={$formData.dob} name={props.name} /> -->
            </div>
          {/if}
          {#if comp.category === "phone"}
            <div>
              <Label>Phone Number</Label>
              <PhoneInput
                country="IN"
                name="phone"
                placeholder="Enter a phone number"
              />
              <p class="text-xs text-muted-foreground">
                {comp.description}
              </p>
            </div>
          {/if}
          <!-- {#if comp.type === "radio"}
      {#each comp.options as option}
        <input
          type="radio"
          id={option.id}
          name={comp.name}
          value={option.value}
        />
        <label for={option.id}>{option.label}</label>
      {/each}
    {/if} -->

          {#if comp.type === "file"}
            <input type="file" id={comp.id} />
            <label for={comp.id}>{comp.name}</label>
          {/if}
          {#if comp.type === "range"}
            <input type="range" id={comp.id} />
          {/if}
          {#if comp.type === "tags-input"}
            <div>
              <Label for={comp.named_id}>{comp.label}</Label>
              <TagsInput placeholder={comp.description} />
              <p class="text-xs text-muted-foreground">
                {comp.description}
              </p>
            </div>
          {/if}
          <!-- {#if comp.type === "color"}
      <input type="color" id={comp.id} />
    {/if}
    {#if comp.type === "date"}
      <input type="date" id={comp.id} />
    {/if}
    {#if comp.type === "datetime-local"}
      <input type="datetime-local" id={comp.id} />
    {/if}
    {#if comp.type === "month"}
      <input type="month" id={comp.id} />
    {/if} -->
        </div>
      {/each}
    </div>
    <Button class="w-fit" size="sm">Submit</Button>
  </div>
{/if}
