<script lang="ts">  
  let { children } = $props();
</script>

<div class="container mx-auto p-4">
	<a href=".." class="text-muted-foreground text-sm no-underline!">← Back</a>
	{@render children()}
</div>
