import { defineComponent } from 'vue';
import s from './FloatButton.module.scss'
export const FloatButton = defineComponent({
    setup(props,context) {
        return () => (<div class={s.float_button}>FloatButton</div>)
    }
})