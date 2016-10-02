/** @jsx kalista.dom */
import { kalista } from '../src/kalista'
import cache from '../src/cache.js'

let Test = kalista.component('Test2', {
  init() { console.log(this)},
  onMount() { console.log('mounted ' + this.name)},
  onRender() { console.log('rendered ' + this.name)},
  render() {
    return (
      <div>
        some text
      </div>
    )
  }
})
let Testcomponent = kalista.component('Test1', {
  init() {
    console.log(this)
  },
  onMount() {
    console.log('mounted ' + this.name)
  },
  onRender() {
    console.log('rendered ' + this.name)
  },
  render() {
    return (
      <div>
        <div id="123">
          456
          <Test />
        </div>
      </div>
    )
  }
})

//kalista.render(Testcomponent, document.querySelector('#app'))
console.log(kalista.render(Testcomponent).outerHTML)
cache.del('status')
console.log(cache.read('status'))
