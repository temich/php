<script lang="ts">
  import Notes from './notes/Notes.svelte'
  import Bookmarks from './Bookmarks.svx'
</script>

<div class="space-y-4">
  <header>
    <h1>Artem Gurtovoi</h1>
    <p class="text-muted-foreground">Personal homepage</p>
  </header>

  <section>
    <h2>Notes</h2>
    <Notes />
  </section>

  <section>
    <h2>Bookmarks</h2>
    <Bookmarks />
  </section>
</div>
