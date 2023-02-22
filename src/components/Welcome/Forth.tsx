import s from './welcome.module.scss';
export const Forth = () => (
  <div class={s.card}>
    <svg>
      <use xlinkHref='#cloud'></use>
    </svg>
    <h2>存储服务<br />更换设备也不用担心丢失</h2>
  </div>
)

Forth.displayName = 'Forth'