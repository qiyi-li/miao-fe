import s from './welcome.module.scss';
import { FunctionalComponent } from 'vue';

export const Second: FunctionalComponent = () => {
  return <div class={s.card}>
    <svg>
      <use xlinkHref='#clock'></use>
    </svg>
    <h2>每日记账<br />做一个有“记”划的人</h2>
  </div>
}

Second.displayName = 'Second'