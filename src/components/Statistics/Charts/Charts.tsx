import { defineComponent, PropType, ref } from 'vue';
import { FormItem } from '../../../shared/Form/Form';
import s from './Charts.module.scss';
import { Bars } from '../Bar/Bar';
import { LineChart } from '../LineChart/LineChart';
import { PieChart } from '../PieChart/PieChart';

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    }
  },
  setup: (props, context) => {
    const category = ref('expenses')

    return () => (
      <div class={s.wrapper}>
        <FormItem label='类型' type="select" options={[
          { value: 'expenses', text: '支出' },
          { value: 'income', text: '收入' }
        ]} v-model={category.value} />
        <LineChart />
        <PieChart />
        <Bars />
      </div>
    )
  }
})