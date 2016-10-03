# kalista2
second attempt at making a JSX-based framework

# how to install
for now just clone this repository and do a npm install. Changing the entry point and context in the webpack config is recommended aswell as deleting the "app_test" folder.

# how to use
the framework is in some ways like react.

importing:
```js
import kalista from '../src/kalista'
import kalista_client from '../src/kalista_client'
import kalista_server from '../src/kalista_server'
```

components are created like this:
```js
let Component = kalista.component('Component', {
  init() { },
  onMount() { },
  onRender() { },
  render() {
    return (
      <div></div>
    )
  }
})
```

the render function is needed, the other functions can be left out

rendering components:
outputting to the dom:
```js
kalista_client.render(Component, document.querySelector('#app'))
```
outputting as a string:
```js
kalista_server.render(Component).outerHTML
```


