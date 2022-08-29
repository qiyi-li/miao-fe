import { createApp } from 'vue'
import {App} from "./App"
import VueRouter from 'vue-router'
import { Bar } from './views/Bar'
import { Foo } from './views/Foo'

const routes = [
    {path:'/',component:Foo},
    {path:'/bar',component:Bar}
]
const router = VueRouter.createRouter({
    history:VueRouter.createWebHashHistory(),
    routes
})

 
const app =createApp(App)
app.use(router)
app.mount('#app')
