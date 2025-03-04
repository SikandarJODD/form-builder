<script lang="ts">
  import { page } from "$app/state";
  import Button from "../ui/button/button.svelte";

  let { children } = $props();
  let templates = [
    {
      name: "Authentication",
      sub: [
        {
          name: "Login",
          url: "/templates/authentication/login",
        },
        {
          name: "Register",
          url: "/templates/authentication/register",
        },
        {
          name: "Forgot Password",
          url: "/templates/authentication/forgot-password",
        },
        {
          name: "Reset Password",
          url: "/templates/authentication/reset-password",
        },
      ],
    },
    {
      name: "Contact",
      sub: [
        {
          name: "Contact",
          url: "/templates/contact/contact",
        },
      ],
    },
  ];
  let isActive = (url: string) => {
    return page.url.pathname === url;
  };
</script>

<div class="max-w-5xl mx-auto py-4 px-4 space-y-2">
  <h1 class="text-3xl font-semibold">Templates</h1>
  <p class="text-muted-foreground">
    Minimalist templates for building your next product. Built with Svelte,
    Sveltekit, TailwindCSS, ZOD, Superforms-Sveltekit and Typescript.
  </p>
</div>
<div class="max-w-5xl mx-auto px-4">
  <div class="grid grid-cols-1 sm:grid-cols-9 gap-4">
    <div class="sm:sticky top-20 sm:col-span-2 bg-accent/50 rounded-lg p-4 h-fit">
      {#each templates as item}
        <div>
          <div class="flex justify-between items-center">
            <h2 class="text-md font-semibold">{item.name}</h2>
            <Button size="icon" class="size-6 text-xs" variant="secondary">
              {item.sub.length}
            </Button>
          </div>
          <div class="border-l pl-2 ml-1 my-1">
            {#each item.sub as subItem}
              <a
                href={subItem.url}
                class={[
                  "block text-sm text-muted-foreground pl-2 py-1 rounded-md transition-all duration-150 hover:text-primary",
                  isActive(subItem.url) && "text-primary bg-primary/5",
                ]}>{subItem.name}</a
              >
            {/each}
          </div>
        </div>
      {/each}
    </div>
    <div class="sm:col-span-7">
      {@render children()}
    </div>
  </div>
</div>
