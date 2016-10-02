import { document } from 'html-element'
import { gen_id_from_tree, gen_hash, component_hierarchy } from './util.js'
import cache from './cache.js'

let render = (component, element) => {
  let render_id = gen_hash(32)
  cache.write('render_cache', render_id, {id: render_id, willMount: []})
  let node = _render(component, render_id).node
  let components = cache.read('components')
  cache.read('render_cache', render_id).willMount.forEach((id) => {
    components.forEach((component) => {
      if(component.id === id) {
        component.onMount()
      }
    })
  })
  if(typeof element === 'object') {
    element.appendChild(node)
  }
  return node
}

let _render = (component, render_id) => {
  let element, tree
  if(component.isComponent) {             // if the 'component' argument is a component
    tree = component.render()             // call the render function
    tree.componentName = component.name   // set the componentName (inside the JSX tree) if the component has a name
    component.onRender()                  // call the onRender function
    let render_cache_item = cache.read('render_cache', render_id)
    render_cache_item.willMount.push(component.id)
    cache.change('render_cache', render_id, render_cache_item)
  } else {
    tree = component                      // else set the tree variable to the 'component' argument (which actually isn't a component)
  }
  if(typeof tree.tag === 'object') {                            // tree.tag is the component if a component is used inside of JSX
    element = _render(tree.tag, render_id).node                 // this component is just passed to render again (its a bit like unwrapping something recursively IYKWIM)
  } else if(typeof tree.tag === 'function') {                   // checking if its a function (JSX that is not inside of a component but the return value of a function will trigger this)
    element = _render(tree.tag(), render_id.node)               // evaluation the function and then passing it back to render (like it is done with components)
  } else if(typeof tree === 'object' && tree.tag === 'text') {  // if the tree is just text
    return {node: document.createTextNode(tree.text) }          // create a text node
  } else {
    element = document.createElement(tree.tag)                  // else create a element with the tag of 'tree.tag'
    tree = gen_id_from_tree(tree)                               // create 'kalista-dataid' for the whole tree

  }
  if(tree.prop) {                                               // if properties are given, loop trough them and set them
    Object.keys(tree.prop).forEach((key) => {
      element.setAttribute(key, tree.prop[key])
    })
  }

  element.setAttribute('kalista-dataid', tree['__id__'])        // set 'kalista-dataid', used for diffing

  if(tree.children) {                                           // if the element has children, create them
    tree.children.forEach((value) => {
      element.appendChild(_render(value, render_id).node)
    })
  }
  return { node: element, willMount: [] } // returning the element (used for recursion)
}

export default render
