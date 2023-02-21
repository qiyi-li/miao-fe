import { RouteRecordRaw } from "vue-router";
import { ItemCreate } from "../components/Item/ItemCreate/ItemCreate";
import { ItemList } from "../components/Item/ItemList/ItemList";
import { TagCreate } from "../components/Tag/TagCreate/TagCreate";
import { TagEdit } from "../components/Tag/TagEdit/TagEdit";
import { First } from "../components/Welcome/First";
import { FirstActions } from "../components/Welcome/FirstActions";
import { Forth } from "../components/Welcome/Forth";
import { ForthActions } from "../components/Welcome/ForthActions";
import { Second } from "../components/Welcome/Second";
import { SecondActions } from "../components/Welcome/SecondActions";
import { Third } from "../components/Welcome/Third";
import { ThirdActions } from "../components/Welcome/ThirdActions";

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: ()=>import('../views/welcome/Welcome'),
    beforeEnter: (to, from, next) => {
      localStorage.getItem('skipFeatures') === 'yes' ? next('/items') : next()
    },
    children: [
      { path: '', redirect: '/welcome/1', },
      { path: '1', name: "Welcome1", components: { main: First, footer: FirstActions }, },
      { path: '2', name: "Welcome2", components: { main: Second, footer: SecondActions }, },
      { path: '3', name: "Welcome3", components: { main: Third, footer: ThirdActions }, },
      { path: '4', name: "Welcome4", components: { main: Forth, footer: ForthActions }, },
    ]
  },
  {
    path: '/items',
    component: ()=>import('../views/ItemPage/ItemPage'),
    children: [
      { path: '', component: ItemList },
      { path: 'create', component: ItemCreate }
    ]
  },
  {
    path: '/tags', component: ()=>import('../views/Tag/Tag'),
    children: [
      { path: 'create', component: TagCreate },
      { path: ':id/edit', component: TagEdit }
    ]
  },
  { path: '/sign_in', component: ()=>import("../views/SignIn/SignIn") },
  { path: '/statistics', component: ()=>import("../views/Statistics/Statistics") }
]
