import {createApp} from 'vue';
import {App} from './App';
import {createRouter} from 'vue-router';
import {routes} from './config/routes';
import {history} from './shared/history';
import '@svgstore';
import {createPinia} from 'pinia'
import { useMeSotre } from './stores/useMeStore';


const router = createRouter({
    history,
    routes:routes
})
const pinia = createPinia()
const app =createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
const meStore= useMeSotre()

meStore.fetchMe()

router.beforeEach(async (to, from) => {
    if (to.path === '/' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in')
      || to.path === '/start') {
        return true
    } else {
        return await meStore.mePromise!.then(
          () => true,
          () => {
              return '/sign_in?return_to=' + to.path;}
        )
    }
})