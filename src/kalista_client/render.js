import _render from '../render.js'
import { gen_hash } from '../util.js'
import cache from '../cache.js'
import { vdom } from '../diff.js'

let render = (component, element) => {
  let render_id = gen_hash(32)
  cache.write('render_cache', render_id, {id: render_id, willMount: []})
  let obj = _render(component, render_id, document)
  let components = cache.read('components')
  cache.read('render_cache', render_id).willMount.forEach((id) => {
    components.forEach((component) => {
      if(component.id === id) {
        component.onMount()
      }
    })
  })
  if(typeof element === 'object') {
    element.appendChild(obj.node)
  }
  //console.log(obj.tree)
  return obj.node
}

export default render
