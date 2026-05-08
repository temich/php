import type { LayoutLoad } from './$types'
import { findNote } from './Notes'

export const load: LayoutLoad = ({ route }) => {
  const slug = route.id?.split('/').at(-1)
  if (!slug) 
    return {}

  return { metadata: findNote(slug)?.metadata }
}
