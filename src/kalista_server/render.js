import { document } from 'html-element'
import _render from '../render.js'
import { gen_hash } from '../util.js'
import cache from '../cache.js'

let render = (component) => {
  let render_id = gen_hash(32)
  cache.write('render_cache', render_id, {id: render_id, willMount: []})
  let node = _render(component, render_id, document).node
  let components = cache.read('components')
  cache.read('render_cache', render_id).willMount.forEach((id) => {
    components.forEach((component) => {
      if(component.id === id) {
        component.onMount()
      }
    })
  })
  return node
}

export default render
