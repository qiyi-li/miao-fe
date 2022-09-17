import { defineComponent } from 'vue';
import { Button } from '../../shared/Button/Button';
import s from './Start.module.scss'
export const Start = defineComponent({
    setup(props, context) {
        const onClick = ()=>{
            console.log('click')
        }
        return () => (
            <div class={s.start}>
                Start
                <nav>menu</nav>
                <main>
                    <div class={s.button_wrapper}>
                        <Button onClick={onClick} class={s.button}>123123123</Button>
                    </div>
                </main>
            </div>
        )
    }
})