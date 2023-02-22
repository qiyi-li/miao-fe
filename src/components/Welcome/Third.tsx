import s from './welcome.module.scss';
export const Third = () => {
  return (
    <div class={s.card}>
      <svg>
        <use xlinkHref='#chart'></use>
      </svg>
      <h2>图表统计<br />整体回顾消费情况</h2>
    </div>
  )
}
Third.displayName = 'Third'