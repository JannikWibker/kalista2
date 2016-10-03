/** @jsx kalista.dom */
import kalista from '../src/kalista'
import cache from '../src/cache.js'
import kalista_client from '../src/kalista_client'
import kalista_server from '../src/kalista_server'

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

//console.log(kalista_client.render(Testcomponent, document.querySelector('#app')))
console.log(kalista_server.render(Testcomponent).outerHTML)
