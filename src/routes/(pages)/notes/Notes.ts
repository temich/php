type Metadata = NonNullable<App.PageData['metadata']>

type SvxModule = { metadata: Metadata }

const modules = import.meta.glob<SvxModule>('./*/+page.svx', { eager: true })

export interface Note {
  slug: string
  href: string
  metadata: Metadata
}

export const notes: Note[] = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split('/').slice(1, -1).join('/')

    return {
      slug,
      href: `/notes/${slug}/`,
      metadata: mod.metadata,
    }
  })
  .sort((a, b) => {
    const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0
    const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0
    
    return dateB - dateA
  })

export const findNote = (slug: string): Note | undefined =>
  notes.find(n => n.slug === slug)
