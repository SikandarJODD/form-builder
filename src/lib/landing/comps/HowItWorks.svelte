<script>
  import { MousePointerClick, Code, ArrowUpDown } from "lucide-svelte";
  import Section from "./Section.svelte";
  import Features from "$lib/components/magicui/Features/Features.svelte";

  import ChooseComponents from "$lib/images/choose_components.png";
  import EditComponents from "$lib/images/edit_field.png";
  import FinalCode from "$lib/images/final_code.png";
  const data = [
    {
      id: 1,
      title: "1. Choose Your Components",
      content:
        "Select from a rich library of pre-built form components. Customize and combine them effortlessly to create forms tailored to your needs.",
      image: ChooseComponents,
      icon: MousePointerClick,
    },
    {
      id: 2,
      title: "2. Add or Reorder Fields",
      content:
        "Easily add new form fields or rearrange existing ones. Our intuitive interface lets you structure your form exactly the way you want.",
      image: EditComponents,
      icon: ArrowUpDown,
    },
    {
      id: 3,
      title: "3. Set Up Form Generation Options",
      content:
        "Define how your form should behave. Configure validation rules, set SSR options, and choose your validation library for maximum flexibility.",
      image: FinalCode,
      icon: Code,
    },
  ];
</script>

<Section title="How it works" subtitle="Just 3 steps to make a form">
  <Features {data} />
</Section>
