import { defineComponent } from 'vue';
import cloud from '../../assets/icons/cloud.svg';
import {WelcomeLayout} from './WelcomeLayout'
export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>{{
        icon: () => <img src={cloud} />,
        title: () => <h2>每日提醒<br/>不遗漏每一笔账单</h2>,
        action: ()=>"/start",
        buttonName:()=>{return "完成"}
      }}</WelcomeLayout>
    )
  }
})