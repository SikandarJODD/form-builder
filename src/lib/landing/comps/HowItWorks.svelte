<script>
  import MousePointerClick from "@lucide/svelte/icons/mouse-pointer-click";
  import Code from "@lucide/svelte/icons/code";
  import ArrowUpDown from "@lucide/svelte/icons/arrow-up-down";
  import Section from "./Section.svelte";
  import Features from "$lib/components/magicui/Features/Features.svelte";

  import ChooseComponents from "$lib/images/choose_components.png";
  import EditComponents from "$lib/images/edit_field.png";
  import FinalCode from "$lib/images/final_code.png";
  const data = [
    {
      id: 1,
      title: "1. Choose Templates or Fields",
      content:
        "Start with 6 pre-built templates or select from a rich library of form components. Customize and combine them effortlessly in the 3-panel layout.",
      image: ChooseComponents,
      icon: MousePointerClick,
    },
    {
      id: 2,
      title: "2. Edit with Side-by-Side Customization",
      content:
        "Drag and drop fields into side-by-side layouts. Edit properties, reorder, and preview live. Save your forms for later use.",
      image: EditComponents,
      icon: ArrowUpDown,
    },
    {
      id: 3,
      title: "3. Share, Import, or Copy Code",
      content:
        "Share forms via link, import JSON, or copy the generated client/server code. Supports Zod, Valibot, Arktype validation.",
      image: FinalCode,
      icon: Code,
    },
  ];
</script>

<Section title="How it works" subtitle="Just 3 steps with V2 power">
  <Features {data} />
</Section>
