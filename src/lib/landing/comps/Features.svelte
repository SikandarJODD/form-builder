<script>
  import Section from "./Section.svelte";
  import Card from "$lib/components/ui/card/card.svelte";
  import CardContent from "$lib/components/ui/card/card-content.svelte";
  import Edit from "$lib/images/edit.svelte";
  import Code from "$lib/images/code.svelte";
  import Schema from "$lib/images/schema.svelte";
  import FileText from "@lucide/svelte/icons/file-text";
  import Save from "@lucide/svelte/icons/save";
  import Layout from "@lucide/svelte/icons/layout";
  import Share2 from "@lucide/svelte/icons/share-2";
  import Upload from "@lucide/svelte/icons/upload";
  import Zap from "@lucide/svelte/icons/zap";

  let problems = [
    {
      title: "Schema Generation",
      description:
        "We use Zod, Valibot, and Arktype, powerful schema-based libraries, to validate data dynamically-building schemas tailored to each user's input!",
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
    {
      title: "6 Pre-built Templates",
      description:
        "Jumpstart your forms with ready-to-use templates for signup, login, feedback, contact, and more. Load and customize instantly.",
      icon: FileText,
    },
    {
      title: "Save & Manage Forms",
      description:
        "Save your forms, load them later, edit, duplicate, or delete. Never lose your work with persistent form management.",
      icon: Save,
    },
    {
      title: "3-Panel Layout",
      description:
        "Efficient 3-panel interface: fields/templates on the left, live editor in the middle, and real-time preview on the right.",
      icon: Layout,
    },
    {
      title: "Side-by-Side Fields",
      description:
        "Drag-and-drop fields into side-by-side layouts with accordion customization. Build complex forms effortlessly.",
      icon: Zap,
    },
    {
      title: "Share Forms via Link",
      description:
        "Generate shareable links for your forms. Anyone can view and edit (expires in 24 hours for security).",
      icon: Share2,
    },
    {
      title: "Import JSON",
      description:
        "Import forms from JSON with AI-friendly prompts and type definitions. Perfect for generated or exported forms.",
      icon: Upload,
    },
  ];
</script>

<Section title="Features" subtitle="Formsnap + Superforms + Schema + V2 Power">
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mt-0 sm:mt-4"
  >
    {#each problems as problem, index}
      {@const Icon = problem.icon}
      <Card class="bg-background border-none shadow-none">
        <CardContent class="p-4 md:p-6 space-y-2 sm:space-y-4">
          <div
            class="w-12 h-12 text-primary bg-primary/10 rounded-full flex items-center justify-center"
          >
            <Icon />
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
