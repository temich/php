<script lang="ts">
  import { notes } from './Notes'
</script>

<ul>
  {#each notes as note (note.slug)}
    <li>
      <a href={note.href}>{note.metadata.title}</a>
    </li>
  {/each}
</ul>
