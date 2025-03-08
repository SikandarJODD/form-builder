<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { HeartIcon, Zap } from "lucide-svelte";
  import { onMount } from "svelte";
  import { Motion } from "motion-start";
  import NumberTicker from "$lib/components/magicui/NumberTicker/NumberTicker.svelte";
  import GridPattern from "$lib/components/magicui/GridPattern/GridPattern.svelte";

  const ease = [0.16, 1, 0.3, 1];
  let stats = $state({
    stars: 0,
    lastUpdate: "",
  });
  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";

    const minutes = Math.floor(diffInSeconds / 60);
    if (diffInSeconds < 3600)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;

    const hours = Math.floor(diffInSeconds / 3600);
    if (diffInSeconds < 86400)
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;

    const days = Math.floor(diffInSeconds / 86400);
    if (diffInSeconds < 604800)
      return `${days} ${days === 1 ? "day" : "days"} ago`;

    const weeks = Math.floor(diffInSeconds / 604800);
    if (diffInSeconds < 2592000)
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;

    const months = Math.floor(diffInSeconds / 2592000);
    if (diffInSeconds < 31536000)
      return `${months} ${months === 1 ? "month" : "months"} ago`;

    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  };
  const fetchGitHubData = async () => {
    try {
      let repoResponse = await fetch(
        "https://api.github.com/repos/sikandarjodd/form-builder"
      );
      const repoData = await repoResponse.json();

      const lastUpdateDate = new Date(repoData.pushed_at);

      stats.stars = repoData.stargazers_count;
      stats.lastUpdate = getRelativeTime(lastUpdateDate);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };

  onMount(async () => {
    await fetchGitHubData();
  });
</script>

<div class="bg-background">
  <div class="relative isolate px-6 pt-0 md:pt-20 lg:px-8">
    <GridPattern
      width={30}
      height={30}
      strokeDashArray="4 2"
      class="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
    />
    <div class="mx-auto md:max-w-2xl py-24 sm:py-48 lg:py-32">
      <div class="mb-4 sm:mb-8 sm:flex sm:justify-center">
        <div class="z-10 flex items-center justify-center">
          {@render heropill()}
        </div>
      </div>
      <div class="text-center">
        <div>
          {@render heroTitle()}
        </div>
        <div class="mt-6 flex items-center justify-center gap-x-2">
          {@render heroCTA()}
        </div>
      </div>
    </div>
  </div>
</div>

{#snippet heropill()}
  <Motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease }}
    class="flex items-center"
  >
    <div class="space-y-3">
      <p class="text-center text-xs text-muted-foreground">
        Last Update {stats.lastUpdate}
      </p>
      <div class="flex flex-col md:flex-row gap-3 md:gap-5">
        <div class={"z-10 flex -space-x-12 rtl:space-x-reverse"}>
          <a
            href="https://github.com/sponsors/SikandarJODD"
            target="_blank"
            class="group"
          >
            <Button
              class="h-9 sm:h-10 w-[9.5rem] flex justify-start rounded-full border-2 border-white dark:border-gray-800 shadow"
            >
              <HeartIcon />
              Sponsor
            </Button>
          </a>
          <a
            href="https://github.com/SikandarJODD/form-builder"
            target="_blank"
            class="h-9 sm:h-10 cursor-pointer flex w-auto items-center space-x-1 rounded-full bg-muted px-3 group border-2 border-white whitespace-pre shadow hover:shadow-lg"
          >
            <p class="hidden md:flex font-medium text-primary text-sm">
              Star Project on GitHub
            </p>
            <div
              class="flex items-center rounded-full px-2 py-1 text-center font-medium text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                color="currentColor"
                fill="none"
                class="size-4 sm:size-5"
              >
                <path
                  d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <NumberTicker class="ml-1" value={stats.stars} />
            </div>
          </a>
        </div>
      </div>
    </div>
  </Motion.div>
{/snippet}

{#snippet heroTitle()}
  <div class="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-2">
    <Motion.h1
      class="text-center text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl"
      initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease,
        staggerChildren: 0.2,
      }}
    >
      {#each ["Svelte", "Form", "Builder"] as text, index}
        <Motion.span
          key={index}
          class="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.2,
            ease,
          }}
        >
          {text}
        </Motion.span>
      {/each}
    </Motion.h1>
    <Motion.p
      class="mx-auto max-w-xl text-center leading-7 text-muted-foreground"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.6,
        duration: 0.8,
        ease,
      }}
    >
      Create forms with{" "}
      <a
        href="https://next.shadcn-svelte.com"
        target="_blank"
        class="underline underline-offset-2 text-primary/90"
      >
        Shadcn Svelte
      </a>,{" "}
      <a
        href="https://superforms.rocks"
        target="_blank"
        class="underline underline-offset-2 text-primary/90"
      >
        Superforms
      </a>{" "}
      and schema within minutes.
    </Motion.p>
  </div>
{/snippet}

{#snippet heroCTA()}
  <Motion.div
    class="mx-auto mt-3 flex w-full sm:max-w-2xl flex-col items-center justify-center space-y-4 sm:mt-6 sm:flex-row sm:space-x-4 sm:space-y-0"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.8, ease }}
  >
    <Button data-umami-event="Hero Playground" variant="secondary" href="/playground" class="rounded-full sm:rounded-lg w-full sm:w-fit"
      >Go to Playground</Button
    >
  </Motion.div>
{/snippet}
