import { gen_hash } from './util.js'
import cache from './cache.js'

let component = (name, componentObject) => { // component creation (with component object as an argument)
  if(typeof name !== 'string') {             // no name given, 'name' and 'componentObject' arguments must be swapped
    componentObject = name
    name = null
  }
  componentObject.id = gen_hash(16)          // generating a 16 digit long random id (numbers, alphabet (upper and lower caser)) with gen_hash from util.js
  componentObject.name = name                // if a name is given, set is as the name, else use null
  componentObject.isComponent = true         // isComponent is there to check if it is infact a component (useful for rendering)
  if(!componentObject.onMount) {             // setting onMount if it isn't set
    componentObject.onMount = function() {}
  }
  if(!componentObject.onRender) {            // setting onRender if it isn't set
    componentObject.onRender = function() {}
  }
  componentObject.init()                     // running the init of the component
  cache.write('components', componentObject)
  return componentObject                     // returning the componentObject
}

export default component
