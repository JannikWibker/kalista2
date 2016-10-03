import { gen_id_from_tree, component_hierarchy } from './util.js'
import cache from './cache.js'

let _build = (component, render_id) => {
  let tree // clue: the component does not get passed here as a 'component' but as a tag
  if(component.isComponent) {
    let render_cache_item = cache.read('render_cache', render_id)
    render_cache_item.willMount.push(component.id)
    cache.change('render_cache', render_id, render_cache_item)
    tree = component.render()
    tree.componentName = component.name
    component.onRender()
    console.log('FIRST', tree)
  } else {
    tree = component
  }
  if(tree.children) {
    tree.children.forEach((item, i) => {
      tree.children[i] = _build(tree.children[i], render_id)
    })
  }
  console.log('SEC', tree)
  return tree
}

let _render = (component, render_id, document) => {
  let element, tree
  // if(component.isComponent) {             // if the 'component' argument is a component
  //   let render_cache_item = cache.read('render_cache', render_id)
  //   render_cache_item.willMount.push(component.id)
  //   cache.change('render_cache', render_id, render_cache_item)
  //   tree = component.render()             // call the render function
  //   console.log(gen_id_from_tree(tree))
  //   tree.componentName = component.name   // set the componentName (inside the JSX tree) if the component has a name
  //   component.onRender()                  // call the onRender function
  //
  // } else {
  //   tree = component                      // else set the tree variable to the 'component' argument (which actually isn't a component)
  // }
  tree = _build(component, render_id, document)
  if(typeof tree.tag === 'object') {                                // tree.tag is the component if a component is used inside of JSX
    element = _render(tree.tag, render_id, document).node           // this component is just passed to render again (its a bit like unwrapping something recursively IYKWIM)
  } else if(typeof tree.tag === 'function') {                       // checking if its a function (JSX that is not inside of a component but the return value of a function will trigger this)
    element = _render(tree.tag(), render_id.node, document)         // evaluation the function and then passing it back to render (like it is done with components)
  } else if(typeof tree === 'object' && tree.tag === 'text') {      // if the tree is just text
    return { node: document.createTextNode(tree.text), tree: tree } // create a text node
  } else {
    element = document.createElement(tree.tag)                      // else create a element with the tag of 'tree.tag'
    tree = gen_id_from_tree(tree)                                   // create 'kalista-dataid' for the whole tree
  }
  if(tree.prop) {                                                   // if properties are given, loop trough them and set them
    Object.keys(tree.prop).forEach((key) => {
      element.setAttribute(key, tree.prop[key])
    })
  }

  element.setAttribute('kalista-dataid', tree['__id__'])            // set 'kalista-dataid', used for diffing

  if(tree.children) {                                               // if the element has children, create them
    tree.children.forEach((value, i) => {
      let obj = _render(value, render_id, document)
      element.appendChild(obj.node)
    })
  }
  return { node: element, willMount: [], tree: tree } // returning the element (used for recursion)
}

export default _render
