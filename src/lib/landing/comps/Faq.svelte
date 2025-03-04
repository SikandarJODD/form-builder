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
      question: "I encountered a bug; what should I do?",
      answer: `Please DM me or open an issue on GitHub, and I'll address it as soon as possible.`,
    },
    {
      question: "How can I contribute?",
      answer: `Please refer to the contribution guide on GitHub. You can also DM me  on Twitter to discuss how you can help.`,
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
  </div>
</Section>
