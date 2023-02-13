import { computed, defineComponent, PropType, reactive } from 'vue';
import { Money } from '../../../shared/Money/Money';
import s from './Bar.module.scss';
export const Bars = defineComponent({
  props: {
    data: {
      type: Array as PropType<{tag:Tag, amount:number, percent: number}[]>
    }
  },
  setup: (props, context) => {
    const data3 = reactive([
      { tag: { id: 1, name: '房租', sign: 'x' }, amount: 3000 },
      { tag: { id: 2, name: '吃饭', sign: 'x' }, amount: 1000 },
      { tag: { id: 3, name: '娱乐', sign: 'x' }, amount: 900 },
    ])
    const betterData3 = computed(() => {
      const total = data3.reduce((sum, item) => sum + item.amount, 0)
      return data3.map(item => ({
        ...item,
        percent: Math.round(item.amount / total * 100) + '%'
      }))
    })
    return () => (
      <div class={s.wrapper}>
          {(props.data && props.data.length > 0) ?
          props.data.map(({ tag, amount, percent }) => {
            return (
              <div class={s.topItem}>
                <div class={s.sign}>
                  {tag.sign}
                </div>
                <div class={s.bar_wrapper}>
                  <div class={s.bar_text}>
                    <span> {tag.name} - {percent}% </span>
                    <span> ￥<Money value={amount}/> </span>
                  </div>
                  <div class={s.bar}>
                    <div class={s.bar_inner} style={{width: `${percent}%`}}></div>
                  </div>
                </div>
              </div>
            )
          }): <div>没有数据</div>
        }
        </div>
    )
  }
})