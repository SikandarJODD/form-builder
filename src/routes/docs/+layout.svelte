<script lang="ts">
  import type { Snippet } from "svelte";
  import * as Sidebar from "$lib/components/ui/sidebar";
  import { page } from "$app/state";
  import { Book, House, Download, Code, BookOpen } from "@lucide/svelte/icons";

  let { children }: { children: Snippet } = $props();

  // Documentation navigation structure
  const docNav = [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", url: "/docs", icon: House },
        { title: "Installation", url: "/docs/installation", icon: Download },
        { title: "Usage", url: "/docs/usage", icon: Code },
      ],
    },
    {
      title: "Learn",
      items: [
        { title: "Comprehensive Guide", url: "/docs/guide", icon: BookOpen },
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
      <Sidebar.Content>
        <Sidebar.Header class="border-b px-6 py-4">
          <a href="/docs" class="flex items-center gap-2">
            <Book class="h-6 w-6" />
            <span class="text-lg font-semibold">Documentation</span>
          </a>
        </Sidebar.Header>

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
          <p>Svelte Form Builder</p>
          <p class="mt-1">Version 2.0</p>
        </div>
      </Sidebar.Footer>
    </Sidebar.Root>

    <!-- Main Content Area -->
    <Sidebar.Inset class="flex-1">
      <div class="flex h-14 items-center border-b px-6">
        <Sidebar.Trigger />
        <div class="ml-4">
          <h1 class="text-lg font-semibold">Documentation</h1>
        </div>
      </div>

      <main class="flex-1">
        <div class="container max-w-4xl py-8 px-6">
          {@render children()}
        </div>
      </main>
    </Sidebar.Inset>
  </div>
</Sidebar.Provider>
