/** @jsx kalista.dom */
import kalista from '../src/kalista'
import cache from '../src/cache.js'
import kalista_client from '../src/kalista_client'
import kalista_server from '../src/kalista_server'

let Test = kalista.component('Test2', {
  init() { /*console.log(this)*/ },
  onMount() { /*console.log('mounted ' + this.name)*/ },
  onRender() { /*console.log('rendered ' + this.name)*/ },
  render() {
    return (
      <div>
        <input type="text" />
        <div>{ this.prop.class }</div>
      </div>
    )
  }
})
let Testcomponent = kalista.component('Test1', {
  init() {
    //console.log(this)
  },
  onMount() {
    //console.log('mounted ' + this.name)
  },
  onRender() {
    //console.log('rendered ' + this.name)
  },
  render() {
    //console.log('rendered')
    return (
      <div>
        <div id="123">
          456
          <Test class="blub" />
        </div>
      </div>
    )
  }
})
console.log(kalista_client.render(<Testcomponent />, document.querySelector('#app')))
//console.log(kalista_server.render(<Testcomponent class="123" />).outerHTML)
