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

  <section>
    <h2>Work</h2>
    <ul>
      <li>
        <a href="https://seed.me/">seed.me</a>
      </li>
      <li>
        <a href="https://github.com/toa-io/toa">Toa</a>: Runtime for distributed eventually consistent systems
      </li>
      <li>
        <a href="https://github.com/toa-io/comq">ComQ</a>: Communications layer over AMQP
      </li>
    </ul>
  </section>

  <section>
    <h2>Contact</h2>
    <ul>
      <li>
        <a href="mailto:a.gurtovoi@outlook.com">Email</a>
      </li>
      <li>
        <a href="https://github.com/temich/">GitHub</a>
      </li>
    </ul>
  </section>
</div>
