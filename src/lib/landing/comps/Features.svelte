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

  let problems = [
    {
      title: "Schema Generation",
      description:
        "We use Zod and Valibot, powerful schema-based libraries, to validate data dynamically-building schemas tailored to each user's input!",
      icon: ShieldCheck,
    },
    {
      title: "Client & Server Code",
      description:
        "Our platform provides client and server-side code generation, allowing you to focus on building your application.",
      icon: FileCode2,
    },
    {
      title: "Customization",
      description:
        "Customize form inputs with attributes like min, max, required, labels, descriptions, and more for a seamless user experience! 🚀",
      icon: FilePenLine,
    },
  ];
</script>

<Section title="Features" subtitle="Formsnap + Superforms + Schema">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
    {#each problems as problem, index}
      {@const Icon = problem.icon}
      <Card class="bg-background border-none shadow-none">
        <CardContent class="p-6 space-y-4">
          <div
            class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
          >
            <Icon class="w-6 h-6 text-primary" />
          </div>
          <h3 class="text-xl font-semibold">{problem.title}</h3>
          <p class="text-muted-foreground">{problem.description}</p>
        </CardContent>
      </Card>
    {/each}
  </div>
</Section>
