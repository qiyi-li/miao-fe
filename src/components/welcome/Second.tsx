import { defineComponent } from 'vue';
import {WelcomeLayout} from './WelcomeLayout'
import clock from '../../assets/icons/clock.svg';
export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>{{
        icon: () => <img src={clock} />,
        title: () => <h2>每日提醒<br/>不遗漏每一笔账单</h2>,
        action: ()=>"/welcome/3",
        buttonName:()=>{return "下一步"}
      }}</WelcomeLayout>
    )
  }
})