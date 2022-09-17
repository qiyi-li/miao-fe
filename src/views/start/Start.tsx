import { defineComponent } from 'vue';
import { Button } from '../../shared/Button/Button';
import { Center } from '../../shared/Center/Center';
import { FloatButton } from '../../shared/FloatButton/FloatButton';
import { Icon } from '../../shared/Icon/Icon';
import s from './Start.module.scss'
export const Start = defineComponent({
    setup(props, context) {
        const onClick = () => {
            console.log('click')
        }
        return () => (
            <div class={s.start}>
                <nav>menu</nav>
                <Center class={s.pig_wrapper}>
                    <Icon name="pig" class={s.pig} />
                </Center>

                <div class={s.button_wrapper}>
                    <Button onClick={onClick} class={s.button}>123123123</Button>
                </div>
                <FloatButton iconName={'add'} />
            </div>
        )
    }
})