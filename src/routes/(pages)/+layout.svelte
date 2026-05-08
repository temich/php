<script lang="ts">  
  import { page } from '$app/state'
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
  {#if page.url.pathname !== '/'}
    <div class="mb-2">
	  <a href=".." class="text-muted-foreground text-sm no-underline!">← Back</a>
    </div>
	{/if}
	{@render children()}
</div>
