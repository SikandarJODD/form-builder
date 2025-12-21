<script>
  import * as Accordion from "$lib/components/ui/accordion/index";
  import Section from "./Section.svelte";
  let faqs = [
    {
      question: "What is this tool for?",
      answer: `This tool simplifies the form-building process for developers, particularly those using Sveltekit and Superforms.`,
    },
    {
      question: "Is this tool free?",
      answer: `Yes, this tool is completely free and open-source.`,
    },
    {
      question: "How often is it updated?",
      answer: `I strive to update it weekly based on user feedback, but I guarantee at least a monthly update.`,
    },
    {
      question: "What are the new V2 features?",
      answer: `V2 introduces advanced features like 6 pre-built templates, save/load/edit/duplicate forms, 3-panel resizable layout, side-by-side field customization, keyboard shortcuts, share forms via link, and JSON import with AI prompts.`,
    },
    {
      question: "What's the difference between V2 and Playground?",
      answer: `Playground is the original version with basic form building. V2 is the enhanced version with templates, form management, advanced layout, and more productivity features.`,
    },
    {
      question: "How do I use templates in V2?",
      answer: `In V2, click the "Templates" tab to browse and load pre-built form templates. You can then customize them further in the editor.`,
    },
    {
      question: "Can I save my forms in V2?",
      answer: `Yes! V2 allows you to save forms with custom names, load them later, edit, duplicate, or delete them. Your forms are stored locally in your browser.`,
    },
    {
      question: "I encountered a bug; what should I do?",
      answer: `Please DM me or open an issue on GitHub, and I'll address it as soon as possible.`,
    },
  ];
</script>

<Section title="FAQ" subtitle="Frequently asked questions">
  <div class="mx-auto my-12 md:max-w-[800px]">
    <Accordion.Root
      type="single"
      class="flex w-full flex-col items-center justify-center space-y-2"
    >
      {#each faqs as faq, idx}
        <Accordion.Item
          value={faq.question}
          class="w-full border rounded-lg overflow-hidden"
        >
          <Accordion.Trigger class="px-4">
            {faq.question}
          </Accordion.Trigger>
          <Accordion.Content class="px-4">{faq.answer}</Accordion.Content>
        </Accordion.Item>
      {/each}
    </Accordion.Root>
    <div class="mt-8 text-center">
      <p class="text-muted-foreground">
        Have more questions? Please DM me on <a
          href="https://x.com/Sikandar_Bhide"
          target="_blank"
          class="underline text-primary">@Sikandar_Bhide</a
        >
        or create an issue on
        <a
          href="https://github.com/SikandarJODD/form-builder"
          target="_blank"
          class="underline text-primary">GitHub</a
        >.
      </p>
    </div>
  </div>
</Section>
