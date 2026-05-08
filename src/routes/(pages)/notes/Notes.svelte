<script lang="ts">
  import type { Note } from './Notes'

  const notes = import.meta.glob('./*/*.svx', { eager: true }) as Record<string, Note>
</script>

  <ul>
    {#each Object.entries(notes) as [path, note] (path)}
      {@const href = `/notes/${path.split('/').slice(0, -1).join('/')}/`}
      <li>
        <a href={href}>{note.metadata.title}</a>
      </li>
    {/each}
  </ul>
