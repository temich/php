<script lang="ts">  
  import { page } from '$app/state'
  const { children } = $props()
</script>

<div class="container mx-auto p-4 max-w-3xl">
  {#if page.url.pathname !== '/'}
	  <a href=".." class="text-muted-foreground text-sm no-underline!">← Back</a>
	{/if}
	{@render children()}
</div>
