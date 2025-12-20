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
      title: "1. Select Input Fields",
      content:
        "Select from a rich library of pre-built form components. Customize and combine them effortlessly to create forms tailored to your needs.",
      image: ChooseComponents,
      icon: MousePointerClick,
    },
    {
      id: 2,
      title: "2. Edit or Reorder Fields",
      content:
        "Drag and drop to reorder fields. Edit field properties like label, placeholder, and validation rules.",
      image: EditComponents,
      icon: ArrowUpDown,
    },
    {
      id: 3,
      title: "3. Copy the Code",
      content:
        "Copy the generated code and use it in your project. The code is clean, readable, and easy to understand.",
      image: FinalCode,
      icon: Code,
    },
  ];
</script>

<Section title="How it works" subtitle="Just 3 steps to make a form">
  <Features {data} />
</Section>
