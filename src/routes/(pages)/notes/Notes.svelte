<script lang="ts">
  import type { Note } from './Notes'

  const notes = import.meta.glob('./*/*.svx', { eager: true }) as Record<string, Note>
</script>

  <ul>
    {#each Object.entries(notes) as [path, note] (path)}
      {@const date = new Date(note.metadata.date)}
      {@const href = `/notes/${path.split('/').slice(0, -1).join('/')}/`}
      <li>
        <span class="text-muted-foreground text-sm">{date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
        <a href={href}>{note.metadata.title}</a>
      </li>
    {/each}
  </ul>
