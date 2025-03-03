<script>
  import {
    FileCode2,
    FilePenLine,
    Repeat2,
    ShieldCheck,
    ShieldClose,
    Workflow,
  } from "lucide-svelte";
  import Section from "./Section.svelte";
  import Card from "$lib/components/ui/card/card.svelte";
  import CardContent from "$lib/components/ui/card/card-content.svelte";
  import Edit from "$lib/images/edit.svelte";
  import Code from "$lib/images/code.svelte";
  import Schema from "$lib/images/schema.svelte";

  let problems = [
    {
      title: "Schema Generation",
      description:
        "We use Zod and Valibot, powerful schema-based libraries, to validate data dynamically-building schemas tailored to each user's input!",
      icon: Schema,
    },
    {
      title: "Client & Server Code",
      description:
        "Our platform provides client and server-side code generation, allowing you to focus on building your application.",
      icon: Code,
    },
    {
      title: "Customization",
      description:
        "Customize form inputs with attributes like min, max, required, labels, descriptions, and more for a seamless user experience! 🚀",
      icon: Edit,
    },
  ];
</script>

<Section title="Features" subtitle="Formsnap + Superforms + Schema">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mt-0 sm:mt-4">
    {#each problems as problem, index}
      {@const Icon = problem.icon}
      <Card class="bg-background border-none shadow-none">
        <CardContent class="p-4 md:p-6 space-y-2 sm:space-y-4">
          <div
            class="w-12 h-12 text-primary bg-primary/10 rounded-full flex items-center justify-center"
          >
            <Icon  />
          </div>
          <div class="space-y-1.5">
            <h3 class="text-xl font-semibold">{problem.title}</h3>
            <p class="text-muted-foreground">{problem.description}</p>
          </div>
        </CardContent>
      </Card>
    {/each}
  </div>
</Section>
