<script lang="ts">
  import { page } from "$app/state";
  import Button from "$lib/components/ui/button/button.svelte";

  let { children } = $props();
  let templates = [
    {
      name: "Guide",
      sub: [
        {
          name: "Usage",
          url: "/docs/usage",
        },
        {
          name: "Sponsors",
          url: "/docs/sponsors",
        },
      ],
    },
    {
      name: "Components",
      sub: [
        {
          name: "Password Input",
          url: "/docs/components/password-input",
        },
        {
          name: "Tags Input",
          url: "/docs/components/tags-input",
        },
        {
          name: "Phone Input",
          url: "/docs/components/phone-input",
        },
        {
          name: "Location Input",
          url: "/docs/components/location-input",
        },
      ],
    },
  ];
  let isActive = (url: string) => {
    return page.url.pathname === url;
  };
</script>

<div class="max-w-5xl mx-auto">
  <div class="flex gap-4">
    <div class="sticky top-20 w-52 bg-accent/60 rounded-lg p-4 h-fit">
      {#each templates as item}
        <div>
          <div class="flex justify-between items-center">
            <h2 class="text-md font-semibold">{item.name}</h2>
            <Button size="icon" class="size-6 text-xs" variant="secondary">
              {item.sub.length}
            </Button>
          </div>
          <div class="border-l px-2 ml-1 mt-1">
            {#each item.sub as subItem}
              <a
                href={subItem.url}
                class={[
                  "block text-muted-foreground px-1 py-1 text-sm rounded-md transition-all duration-150 hover:text-primary",
                  isActive(subItem.url) && "text-primary bg-primary/5",
                ]}>{subItem.name}</a
              >
            {/each}
          </div>
        </div>
      {/each}
    </div>
    <div class="">
      {@render children()}
    </div>
  </div>
</div>
