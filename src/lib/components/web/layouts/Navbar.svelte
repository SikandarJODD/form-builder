<script>
  import { slide } from "svelte/transition";
  let navs = [
    { name: "Home", url: "/" },
    {
      name: "Templates",
      url: "/templates",
    },
    {
      name: "Docs",
      url: "/docs",
    },
  ];
  import Button from "$lib/components/ui/button/button.svelte";

  // Mobile and user profile state
  let isMobileMenu = $state(false);
  // Dark & Light Mode
  import { toggleMode, mode } from "mode-watcher";
</script>

<nav class="bg-background border-b sticky top-0 z-50">
  <div class="mx-auto max-w-5xl px-4 sm:px-0">
    <div class="flex h-14 items-center justify-between">
      <div class="flex items-center w-full">
        <a href="/" aria-label="home" class="shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-table-column"
            ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
              d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z"
            /><path d="M10 10h11" /><path d="M10 3v18" /><path
              d="M9 3l-6 6"
            /><path d="M10 7l-7 7" /><path d="M10 12l-7 7" /><path
              d="M10 17l-4 4"
            /></svg
          >
        </a>
        <div class="hidden sm:ml-6 sm:flex justify-between w-full items-center">
          <div class="flex space-x-4">
            {#each navs as nav}
              <a href={nav.url}>
                <span
                  class="text-muted-foreground hover:text-primary transition-all duration-150"
                  >{nav.name}</span
                >
              </a>
            {/each}
          </div>
          <div>
            <Button class="font-normal rounded-full" href="/playground"
              >Playground</Button
            >
          </div>
        </div>
      </div>
      <div class="hidden sm:ml-4 sm:block">
        {@render socials()}
      </div>
      <div class="-mr-2 flex sm:hidden">
        <!-- Mobile menu button -->
        <Button
          onclick={() => (isMobileMenu = !isMobileMenu)}
          size="icon"
          variant="secondary"
        >
          <span class="sr-only">Open main menu</span>
          <!-- Mobile Menu  -->
          <svg
            class="{isMobileMenu ? 'hidden' : 'block'} size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <!-- Menu Open : Cross -->
          <svg
            class="{isMobileMenu ? 'block' : 'hidden'} size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>
    </div>
  </div>

  <!-- Mobile menu, show/hide based on menu state. -->
  {#if isMobileMenu}
    <div transition:slide class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        {#each navs as nav}
          <a
            href={nav.url}
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-300"
            >{nav.name}</a
          >
        {/each}
        <a
          href="/playground"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300"
          >Playground</a
        >
      </div>
      <div class="flex justify-end pb-2 pr-4">
        {@render socials()}
      </div>
    </div>
  {/if}
</nav>

{#snippet ThemeToggle()}
  <Button
    onclick={toggleMode}
    variant="outline"
    class="[&_svg]:size-5 size-9 rounded-full"
    size="icon"
  >
    <!-- Sun Icon -->
    {#if $mode === "light"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-[1.2rem] w-[1.2rem]"
        ><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path
          d="M12 20v2"
        /><path d="m4.93 4.93 1.41 1.41" /><path
          d="m17.66 17.66 1.41 1.41"
        /><path d="M2 12h2" /><path d="M20 12h2" /><path
          d="m6.34 17.66-1.41 1.41"
        /><path d="m19.07 4.93-1.41 1.41" /></svg
      >
    {:else}
      <!-- Moon Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-[1.2rem] w-[1.2rem]"
        ><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg
      >
    {/if}
    <span class="sr-only">Toggle theme</span>
  </Button>
{/snippet}

{#snippet socials()}
  <div class="flex items-center space-x-0.5 md:space-x-1">
    <!-- Peerlist -->
    <!-- <Button
      size="icon"
      class="[&_svg]:size-5 size-9 rounded-full"
      variant="outline"
      href="https://peerlist.io/bhide"
      target="_blank"
      ><svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="rounded-full"
      >
        <path
          d="M28 0C6.22222 0 0 6.22222 0 28C0 49.7778 6.23778 56 28 56C49.7622 56 56 49.7778 56 28C56 6.22222 49.7622 0 28 0Z"
          fill="#00AA45"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.24755 7.24755C3.5875 10.9076 2 17.153 2 28C2 38.8461 3.59108 45.0918 7.25306 48.7521C10.9153 52.4127 17.1612 54 28 54C38.8388 54 45.0847 52.4127 48.7469 48.7521C52.4089 45.0918 54 38.8461 54 28C54 17.1539 52.4089 10.9082 48.7469 7.24787C45.0847 3.58733 38.8388 2 28 2C17.153 2 10.9076 3.5875 7.24755 7.24755ZM0 28C0 6.22222 6.22222 0 28 0C49.7622 0 56 6.22222 56 28C56 49.7778 49.7622 56 28 56C6.23778 56 0 49.7778 0 28Z"
          fill="#219653"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M27.0769 13H15V47H24.3846V39.8889H27.0769C34.7305 39.8889 41 33.9048 41 26.4444C41 18.984 34.7305 13 27.0769 13ZM24.3846 30.7778V22.1111H27.0769C29.6194 22.1111 31.6154 24.0864 31.6154 26.4444C31.6154 28.8024 29.6194 30.7778 27.0769 30.7778H24.3846Z"
          fill="#24292E"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18 12H29.0769C36.2141 12 42 17.5716 42 24.4444C42 31.3173 36.2141 36.8889 29.0769 36.8889H25.3846V44H18V12ZM25.3846 29.7778H29.0769C32.1357 29.7778 34.6154 27.39 34.6154 24.4444C34.6154 21.4989 32.1357 19.1111 29.0769 19.1111H25.3846V29.7778Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17 11H29.0769C36.7305 11 43 16.984 43 24.4444C43 31.9048 36.7305 37.8889 29.0769 37.8889H26.3846V45H17V11ZM19 13V43H24.3846V35.8889H29.0769C35.6978 35.8889 41 30.7298 41 24.4444C41 18.1591 35.6978 13 29.0769 13H19ZM24.3846 18.1111H29.0769C32.6521 18.1111 35.6154 20.9114 35.6154 24.4444C35.6154 27.9775 32.6521 30.7778 29.0769 30.7778H24.3846V18.1111ZM26.3846 20.1111V28.7778H29.0769C31.6194 28.7778 33.6154 26.8024 33.6154 24.4444C33.6154 22.0864 31.6194 20.1111 29.0769 20.1111H26.3846Z"
          fill="#24292E"
        />
      </svg>
    </Button> -->
    <!-- Gihub -->
    <Button
      size="icon"
      class="[&_svg]:size-5 size-9 rounded-full"
      variant="outline"
      target="_blank"
      href="https://github.com/SikandarJODD/form-builder"
      ><svg
        viewBox="0 0 256 250"
        width="256"
        height="250"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
      >
        <path
          d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z"
        />
      </svg></Button
    >
    <!-- Twitter  -->
    <Button
      size="icon"
      class="[&_svg]:size-4 size-9 rounded-full"
      variant="outline"
      href="https://x.com/Sikandar_Bhide"
      target="_blank"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="1200"
        height="1227"
        fill="currentColor"
        viewBox="0 0 1200 1227"
        ><path
          d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
        /></svg
      ></Button
    >

    {@render ThemeToggle()}
  </div>
{/snippet}
