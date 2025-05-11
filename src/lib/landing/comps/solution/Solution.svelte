<script>
  import SubSoln1 from "./SubSoln1.svelte";
  import SubSoln2 from "./SubSoln2.svelte";
  import SubSoln3 from "./SubSoln3.svelte";
  import SubSoln4 from "./SubSoln4.svelte";
  import Section from "../Section.svelte";
  import { cn } from "$lib/utils";

  let features = [
    {
      title: "Code Snippets Ready for Use",
      description:
        "Instantly integrate copy/paste-ready code into your projects, accelerating development without sacrificing quality.",
      class: "hover:bg-red-500/10 transition-all duration-500 ease-out",
      content: SubSoln1,
    },
    {
      title: "Simplified Validation Setup",
      description:
        "Easily implement powerful form validations with support for both Zod and Valibot, ensuring data accuracy with minimal effort.",
      class:
        "order-3 xl:order-none hover:bg-blue-500/10 transition-all duration-500 ease-out",
      content: SubSoln2,
    },
    {
      title: "Comprehensive Component Library",
      description:
        "Access a complete set of pre-built components tailored for dynamic forms, saving you time and effort.",
      class:
        "md:row-span-2 hover:bg-orange-500/10 transition-all duration-500 ease-out",
      content: SubSoln3,
    },
    {
      title: "Flexible Customization Options",
      description:
        "Customize form behavior effortlessly with support for Zod & Valibot and other powerful tools.",
      class:
        "flex-row order-4 md:col-span-2 md:flex-row xl:order-none hover:bg-green-500/10 transition-all duration-500 ease-out",
      content: SubSoln4,
    },
  ];
</script>

<Section
  title="FEATURES"
  subtitle="Form Building, But Make It Easy"
  description="Effortless, customizable, and ready-to-copy form solutions that make developers feel like they’re cheating at the game of form creation!"
  class="bg-neutral-100 dark:bg-neutral-900"
>
  <div
    class="mx-auto mt-16 grid max-w-sm grid-cols-1 gap-6 text-gray-500 md:max-w-3xl md:grid-cols-2 xl:grid-rows-2 md:grid-rows-3 xl:max-w-6xl xl:auto-rows-fr xl:grid-cols-3"
  >
    {#each features as feature, index}
      {@const Component = feature.content}
      <div
        class={cn(
          "group relative items-start overflow-hidden bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl",
          feature.class
        )}
      >
        <div>
          <h3 class="font-semibold mb-2 text-primary text-lg">
            {feature.title}
          </h3>
          <p class="text-muted-foreground">{feature.description}</p>
        </div>
        <Component />
        <div
          class="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-neutral-50 dark:from-neutral-900 pointer-events-none"
        ></div>
      </div>
    {/each}
  </div>
</Section>
