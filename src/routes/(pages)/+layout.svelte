<script lang="ts">  
  import { page } from '$app/state'
	import { House } from '@lucide/svelte';
  const { children } = $props()

  const meta = $derived(page.data.metadata)
  const tags = $derived(
    meta?.keywords?.split(',').map(k => k.trim()).filter(Boolean) ?? []
  )
</script>

<svelte:head>
  {#if meta?.title}
    <title>{meta.title}</title>
    <meta property="og:title" content={meta.title} />
  {/if}
  {#if meta?.description}
    <meta name="description" content={meta.description} />
    <meta property="og:description" content={meta.description} />
  {/if}
  {#if meta?.keywords}
    <meta name="keywords" content={meta.keywords} />
  {/if}
  {#each tags as tag (tag)}
    <meta property="article:tag" content={tag} />
  {/each}
</svelte:head>

<div class="container mx-auto p-4 max-w-3xl">
	{@render children()}
  {#if page.url.pathname !== '/'}
  <footer class="my-4 text-muted-foreground text-sm">
    <div class="my-4 flex items-center [&>div]:flex-1">
      <div class="text-left">
          <a href=".." class="no-underline!">← Back</a>
      </div>
      <div class="flex items-center justify-center">
        <a href="/"><House class="size-4 text-muted-foreground"/></a>
      </div>
      <div class="text-right text-xs">
        <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
      </div>
    </div>
  </footer>
  {/if}  
</div>
