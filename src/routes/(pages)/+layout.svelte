<script lang="ts">  
  import { page } from '$app/state'
  const { children } = $props()
</script>

<div class="container mx-auto p-4 max-w-3xl">
  {#if page.url.pathname !== '/'}
    <div class="mb-2">
	  <a href=".." class="text-muted-foreground text-sm no-underline!">← Back</a>
    </div>
	{/if}
	{@render children()}
</div>
