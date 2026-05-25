<script lang="ts">
  import { page } from '$app/state'

  const { children } = $props()

  const isNotePage = $derived(!/^\/notes\/?$/.test(page.url.pathname))
</script>

{#if isNotePage}
  <div class="flex flex-1 flex-col justify-center">
    <article>
      {@render children()}
    </article>
  </div>
{:else}
  <article>
    {@render children()}
  </article>
{/if}
