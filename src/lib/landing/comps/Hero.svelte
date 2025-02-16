<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { HeartIcon, Zap } from "lucide-svelte";
  import StarIcon from "lucide-svelte/icons/star";
  import { onMount } from "svelte";
  import { Motion } from "motion-start";
  import NumberTicker from "$lib/components/magicui/NumberTicker/NumberTicker.svelte";

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
  <div class="relative isolate px-6 pt-14 lg:px-8">
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-32">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div class="z-10 flex items-center justify-center">
          {@render heropill()}
        </div>
      </div>
      <div class="text-center">
        <!-- <h1
          class="text-balance text-5xl font-semibold tracking-tight text-primary sm:text-7xl"
        >
          Svelte Form Builder
        </h1>
        <p class="mt-8 text-pretty text-lg text-muted-foreground sm:text-xl/8">
          Create forms with Shadcn-Svelte, Superforms and schema within minutes.
        </p> -->
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
              class="h-10 w-[9.5rem] flex justify-start rounded-full border-2 border-white dark:border-gray-800 shadow"
            >
              <HeartIcon />
              Sponsor
            </Button>
          </a>
          <a
            href="https://github.com/SikandarJODD/form-builder"
            target="_blank"
            class="h-10 cursor-pointer flex w-auto items-center space-x-1 rounded-full bg-muted px-3 group border-2 border-white whitespace-pre shadow hover:shadow-lg"
          >
            <p class="font-medium text-primary text-sm">
              Star Project on GitHub
            </p>
            <div
              class="flex items-center rounded-full px-2 py-1 text-center font-medium text-sm"
            >
              <StarIcon strokeWidth={1.6} />
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
      class="text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl"
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
        class="hover:underline"
      >
        Shadcn Svelte
      </a>,{" "}
      <a
        href="https://superforms.rocks"
        target="_blank"
        class="hover:underline"
      >
        Superforms
      </a>{" "}
      and schema within minutes.
    </Motion.p>
  </div>
{/snippet}

{#snippet heroCTA()}
  <Motion.div
    className="mx-auto mt-3 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:mt-6 sm:flex-row sm:space-x-4 sm:space-y-0"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.8, ease }}
  >
    <Button variant="secondary" class="rounded-lg">Go to Playground</Button>
  </Motion.div>
{/snippet}
