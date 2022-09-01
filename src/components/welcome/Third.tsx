import { defineComponent } from 'vue';
import chart from '../../assets/icons/chart.svg';
import {WelcomeLayout} from './WelcomeLayout'
export const Third = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>{{
        icon: () => <img src={chart} />,
        title: () => <h2>每日提醒<br/>不遗漏每一笔账单</h2>,
        action: ()=>"/welcome/4",
        buttonName:()=>{return "下一步"}
      }}</WelcomeLayout>
    )
  }
})