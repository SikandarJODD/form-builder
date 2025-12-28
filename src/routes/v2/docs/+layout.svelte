<script lang="ts">
  import type { Snippet } from "svelte";
  import * as Sidebar from "$lib/components/ui/sidebar";
  import { page } from "$app/state";
  // import { Rocket, House, Download, BookOpen, Sparkles } from "@lucide/svelte";
  import Rocket from "@lucide/svelte/icons/rocket";
  import House from "@lucide/svelte/icons/house";
  import Download from "@lucide/svelte/icons/download";
  import BookOpen from "@lucide/svelte/icons/book-open";
  import Sparkles from "@lucide/svelte/icons/sparkles";
  import Code2 from "@lucide/svelte/icons/code-2";

  let { children }: { children: Snippet } = $props();

  // V2 Documentation navigation structure
  const docNav = [
    {
      title: "Getting Started",
      items: [
        { title: "Documentation", url: "/v2/docs", icon: House },
        { title: "Introduction", url: "/v2/docs/introduction", icon: BookOpen },
        { title: "Features", url: "/v2/docs/features", icon: Sparkles },
        { title: "Installation", url: "/v2/docs/installation", icon: Download },
        { title: "Usage Guide", url: "/v2/docs/usage", icon: Code2 },
      ],
    },
    {
      title: "Resources",
      items: [
        { title: "Open Builder", url: "/v2", icon: Rocket },
        { title: "Main Docs", url: "/docs", icon: BookOpen },
      ],
    },
  ];

  // Check if current path matches the nav item
  function isActive(url: string): boolean {
    return page.url.pathname === url;
  }
</script>

<Sidebar.Provider>
  <div class="flex min-h-screen w-full">
    <!-- Sidebar -->
    <Sidebar.Root class="border-r">
      <Sidebar.Content class='mt-16'>
        <!-- <Sidebar.Header class="border-b px-6 py-4">
          <a href="/v2/docs" class="flex items-center gap-2">
            <Rocket class="h-6 w-6" />
            <span class="text-lg font-semibold">V2 Docs</span>
          </a>
        </Sidebar.Header> -->

        <div class="px-3 py-4">
          {#each docNav as section}
            <Sidebar.Group>
              <Sidebar.GroupLabel
                class="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {section.title}
              </Sidebar.GroupLabel>
              <Sidebar.GroupContent>
                <Sidebar.Menu>
                  {#each section.items as item}
                    {@const Icon = item.icon}
                    <Sidebar.MenuItem>
                      <a
                        href={item.url}
                        class="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground {isActive(
                          item.url
                        )
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground'}"
                      >
                        <Icon class="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </Sidebar.MenuItem>
                  {/each}
                </Sidebar.Menu>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          {/each}
        </div>
      </Sidebar.Content>

      <Sidebar.Footer class="border-t p-4">
        <div class="text-xs text-muted-foreground">
          <p>Form Builder V2</p>
          <p class="mt-1">Enhanced Documentation</p>
        </div>
      </Sidebar.Footer>
    </Sidebar.Root>

    <!-- Main Content Area -->
    <Sidebar.Inset class="flex-1">
      <div class="flex h-14 items-center border-b px-6">
        <Sidebar.Trigger />
        <div class="ml-4">
          <h1 class="text-lg font-semibold">V2 Documentation</h1>
        </div>
      </div>

      <main class="flex-1">
        {@render children()}
      </main>
    </Sidebar.Inset>
  </div>
</Sidebar.Provider>
