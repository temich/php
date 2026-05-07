<script lang="ts">
  let sent = $state(0)

  async function onclick(e: MouseEvent) {
    const button = e.currentTarget as HTMLButtonElement
    
    sent++

    const response = await fetch('./api')
    const text = await response.text()

    button.outerHTML = `<code>${response.status} ${response.statusText}</code><code>${text}</code>`
  }
</script>

<section class="space-y-2">
  <div class="flex gap-2">
    <div class="response">
      <button type="button" class="border px-2 py-1 rounded-md disabled:opacity-0" {onclick} disabled={sent !== 0}>
        Send request
      </button>    
    </div>
    <div class="response">
      <button type="button" class="border px-2 py-1 rounded-md disabled:opacity-50" {onclick} disabled={sent !== 1}>
        Send request
      </button>    
    </div>
  </div>
</section>

<style>
  .response {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 10ch;
    border: 1px solid #666;
    border-radius: 0.5rem;
  }
</style>
