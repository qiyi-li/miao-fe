import {createApp} from 'vue';
import {App} from './App';
import {createRouter} from 'vue-router';
import {routes} from './config/routes';
import {history} from './shared/history';
import '@svgstore';
import {fetchMe, mePromise} from './shared/me';

const router = createRouter({
    history,
    routes:routes
})
console.log(123123);
fetchMe()

router.beforeEach(async (to, from) => {
    if (to.path === '/' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in')
      || to.path === '/start') {
        return true
    } else {
        console.log(111);
        return await mePromise!.then(
          () => true,
          () => {
              console.log(1231231231);
              return '/sign_in?return_to=' + to.path;}
        )
    }
})

const app =createApp(App)
app.use(router)
app.mount('#app')
