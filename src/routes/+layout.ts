import type { LayoutLoad } from './$types'

export const load: LayoutLoad = ({ setHeaders }) => {
  setHeaders({ 'cache-control': 'max-age=600' })
}
