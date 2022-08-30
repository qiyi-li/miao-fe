import { defineComponent, ref } from 'vue'
import { RouterView } from 'vue-router'

export const App = defineComponent({
  setup() {
    const refCount = ref(0)
    const onClick = ()=>refCount.value+=1
    return () => (
      <div>
        <header>
          <ul>
            <li>
              <router-link to="/">Foo</router-link>
            </li>
            <li>
            <router-link to="/bar">Bar</router-link>
            </li>
          </ul>
        </header>
        <RouterView/>
        <footer>footer</footer>
      </div>)
  }
})