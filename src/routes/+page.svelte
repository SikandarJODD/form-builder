<script lang="ts">
  import Features from "$lib/landing/comps/Features.svelte";
  import Footer from "$lib/landing/comps/Footer.svelte";
  import Hero from "$lib/landing/comps/Hero.svelte";
  import HowItWorks from "$lib/landing/comps/HowItWorks.svelte";
  import Solution from "$lib/landing/comps/solution/Solution.svelte";
  import Faq from "$lib/landing/comps/Faq.svelte";
</script>

<svelte:head>
  <title>Svelte Form Builder V2</title>
  <meta
    name="description"
    content="Svelte Form Builder V2 - A powerful, easy-to-use form builder for Svelte with built-in support for Zod, Valibot, and Arktype validation. Create dynamic forms with templates, save/load functionality, 3-panel layout, and more."
  />
  <meta property="og:title" content="Svelte Form Builder V2" />
  <meta
    property="og:description"
    content="A powerful form builder for Svelte with Zod, Valibot, Arktype validation, templates, and advanced V2 features. Create validated forms effortlessly in SvelteKit."
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
    content="Svelte Form Builder V2, Svelte forms, Zod validation, Valibot validation, Arktype validation, sveltekit-superforms, form validation, SvelteKit, form library, svelte, form, builder, sveltekit, sveltekit form builder, svelte form builder, svelte form, sveltekit form, form validation, sveltekit superform builder, superform zod form builder, sveltekit zod form builder, svelte-form builder, svelte valibot validation, formsnap builder, valibot forms builder, form templates, save forms, 3-panel layout, side-by-side fields, form sharing, JSON import"
  />
  <!-- Twitter -->
  <meta property="og:url" content="https://svelte-form-builder.vercel.app" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Svelte Form Builder V2" />
  <meta
    name="twitter:description"
    content="Easily build dynamic, validated forms in SvelteKit with Zod, Valibot, Arktype, templates, and advanced V2 features."
  />
  <meta
    name="twitter:image"
    content="https://i.pinimg.com/736x/0d/22/63/0d2263fb3a30077c8e8f0def7187095f.jpg"
  />
  <meta name="twitter:site" content="@Sikandar_Bhide" />

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Website",
      "name": "Svelte Form Builder V2",
      "url": "https://svelte-form-builder.vercel.app",
      "potentialAction": [
        {
          "@type": "ViewAction",
          "target": "https://svelte-form-builder.vercel.app/v2",
          "name": "V2 Builder"
        },
        {
          "@type": "ViewAction",
          "target": "https://svelte-form-builder.vercel.app/playground",
          "name": "Playground"
        },
        {
          "@type": "ViewAction",
          "target": "https://svelte-form-builder.vercel.app/templates",
          "name": "Templates"
        },
        {
          "@type": "ViewAction",
          "target": "https://svelte-form-builder.vercel.app/docs",
          "name": "Docs"
        }
      ]
    }
  </script>
</svelte:head>

<Hero></Hero>
<Features></Features>
<Solution />
<HowItWorks></HowItWorks>
<Faq />
<Footer></Footer>
