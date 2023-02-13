import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import 'vant/es/toast/style';
import "./App.scss"

export const App = defineComponent({
  setup() {
    return () => (
      <div class="page">
        <RouterView />
      </div>)
  }
})