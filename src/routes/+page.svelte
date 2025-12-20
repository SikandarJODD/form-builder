<script lang="ts">
	import Features from '$lib/landing/comps/Features.svelte';
	import Footer from '$lib/landing/comps/Footer.svelte';
	import Hero from '$lib/landing/comps/Hero.svelte';
	import HowItWorks from '$lib/landing/comps/HowItWorks.svelte';
	import Solution from '$lib/landing/comps/solution/Solution.svelte';
	import Faq from '$lib/landing/comps/Faq.svelte';
</script>

<svelte:head>
	<title>Svelte Form Builder</title>
	<meta
		name="description"
		content="Svelte Form Builder - A powerful, easy-to-use form builder for Svelte with built-in support for Zod and Valibot validation. Easily create dynamic, validated forms in SvelteKit with sveltekit-superforms."
	/>
	<meta property="og:title" content="Svelte Form Builder" />
	<meta
		property="og:description"
		content="A powerful form builder for Svelte with Zod and Valibot validation. Create validated forms effortlessly in SvelteKit."
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
		content="Svelte Form Builder, Svelte forms, Zod validation, Valibot validation, sveltekit-superforms, form validation, SvelteKit, form library, svelte, form, builder, sveltekit, sveltekit form builder, svelte form builder, svelte form, sveltekit form, form validation, sveltekit superform builder, superform zod form builder, sveltekit zod form builder, svelte-form builder, svelte valibot validation, formsnap builder, valibot forms builder"
	/>
	<!-- Twitter -->
	<meta property="og:url" content="https://svelte-form-builder.vercel.app" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Svelte Form Builder" />
	<meta
		name="twitter:description"
		content="Easily build dynamic, validated forms in SvelteKit with Zod and Valibot."
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
			"name": "Svelte Form Builder",
			"url": "https://svelte-form-builder.vercel.app",
			"potentialAction": [
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
