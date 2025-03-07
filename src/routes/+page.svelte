<script lang="ts">
  import Features from "$lib/landing/comps/Features.svelte";
  import Footer from "$lib/landing/comps/Footer.svelte";
  import Hero from "$lib/landing/comps/Hero.svelte";
  import HowItWorks from "$lib/landing/comps/HowItWorks.svelte";
  import Solution from "$lib/landing/comps/solution/Solution.svelte";
  import Faq from "$lib/landing/comps/Faq.svelte";
</script>

<svelte:head>
  <title>Svelte Form Builder</title>
  <meta
    name="description"
    content="Build forms with ease using Svelte Form Builder."
  />
  <meta property="og:title" content="Svelte Form Builder" />
  <meta
    property="og:description"
    content="Build forms with ease using Svelte Form Builder."
  />
  <meta
    property="og:image"
    content="https://i.pinimg.com/736x/0d/22/63/0d2263fb3a30077c8e8f0def7187095f.jpg"
  />
  <meta property="og:image:width" content="600" />
  <meta property="og:image:height" content="315" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Svelte Form Builder" />
  <meta
    name="keywords"
    content="svelte, form, builder, sveltekit, sveltekit form builder, svelte form builder, svelte form, sveltekit form, form validation, sveltekit superform builder, superform zod form builder, sveltekit zod form builder, svelte-form builder, svelte valibot validation, formsnap builder, valibot forms builder"
  />
  <!-- Twitter -->
  <meta property="og:url" content="https://svelte-form-builder.vercel.app" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Svelte Form Builder" />
  <meta
    name="twitter:description"
    content="Build forms with ease using Svelte Form Builder."
  />
  <meta
    name="twitter:image"
    content="https://i.pinimg.com/736x/0d/22/63/0d2263fb3a30077c8e8f0def7187095f.jpg"
  />
  <meta name="twitter:site" content="@Sikandar_Bhide" />
</svelte:head>

<Hero></Hero>
<Features></Features>
<Solution />
<HowItWorks></HowItWorks>
<Faq />
<Footer></Footer>
