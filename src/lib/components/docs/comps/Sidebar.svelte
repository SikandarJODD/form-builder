<script lang="ts">
  import { page } from "$app/state";
  import Button from "$lib/components/ui/button/button.svelte";

  let { children } = $props();
  let templates = [
    // {
    //   name: "Guide",
    //   sub: [
    //     {
    //       name: "Usage",
    //       url: "/docs/usage",
    //     },
    //     {
    //       name: "Sponsors",
    //       url: "/docs/sponsors",
    //     },
    //   ],
    // },
    {
      name: "Components",
      sub: [
        {
          name: "Password Input",
          url: "/docs/components/password-input",
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

<div class="max-w-5xl mx-auto px-6 sm:px-0">
  <div class="flex gap-6 flex-col sm:flex-row">
    <div class="sm:sticky top-20 min-w-52 bg-accent/60 rounded-lg p-4 h-fit">
      {#each templates as item}
        <div>
          <div class="flex justify-between items-center">
            <h2 class="text-md font-semibold">{item.name}</h2>
            <Button size="icon" class="size-6 text-xs" variant="secondary">
              {item.sub.length}
            </Button>
          </div>
          <div class="border-l pl-1 ml-1 my-1">
            {#each item.sub as subItem}
              <a
                href={subItem.url}
                class={[
                  "block text-muted-foreground px-2 py-1 text-sm rounded-sm transition-all duration-150 hover:text-primary",
                  isActive(subItem.url) && "text-primary bg-primary/5",
                ]}>{subItem.name}</a
              >
            {/each}
          </div>
        </div>
      {/each}
    </div>
    <div>
      {@render children()}
    </div>
  </div>
</div>
