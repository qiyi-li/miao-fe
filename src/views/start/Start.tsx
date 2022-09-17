import { defineComponent } from 'vue';
import { Button } from '../../shared/Button/Button';
import { Center } from '../../shared/Center/Center';
import { FloatButton } from '../../shared/FloatButton/FloatButton';
import { Icon } from '../../shared/Icon/Icon';
import { NavBar } from '../../shared/NavBar/NavBar';
import s from './Start.module.scss'
export const Start = defineComponent({
    setup(props, context) {
        return () => (
            <div class={s.start}>
                <NavBar>
                    {{
                        default: '山竹记账',
                        icon: <Icon name='menu' class={s.navIcon} />
                    }}
                </NavBar>
                <Center class={s.pig_wrapper}>
                    <Icon name="pig" class={s.pig} />
                </Center>

                <div class={s.button_wrapper}>
                    <Button class={s.button}>
                        开始记账
                    </Button>
                </div>
                <FloatButton iconName={'add'} />
            </div>
        )
    }
})