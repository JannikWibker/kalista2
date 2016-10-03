// importing functions
import dom from './dom.js'
import { diff } from './diff.js'
import render from './render.js'
import component from './component.js'
// assembling the kalista object
let kalista = {
  version: '2.0.1',
  dom,
  render,
  diff,
  component
}
// exporting kalista object
export default kalista
