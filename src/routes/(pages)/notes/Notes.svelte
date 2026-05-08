<script lang="ts">
  import type { Note } from './Notes'

  const notes = import.meta.glob('./*/*.svx', { eager: true }) as Record<string, Note>
  
  const entries = Object.entries(notes).sort((a, b) => {
    const dateA = new Date(a[1].metadata.date)
    const dateB = new Date(b[1].metadata.date)

    return dateB.getTime() - dateA.getTime()
  })
</script>

  <ul>
    {#each entries as [path, note] (path)}
      {@const href = `/notes/${path.split('/').slice(0, -1).join('/')}/`}
      <li>
        <a href={href}>{note.metadata.title}</a>
      </li>
    {/each}
  </ul>
