import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { MainLayout } from '../../components/Layouts/MainLayout';
import { Button } from '../../shared/Button/Button';
import { Center } from '../../shared/Center/Center';
import { FloatButton } from '../../shared/FloatButton/FloatButton';
import { Icon } from '../../shared/Icon/Icon';
import { Overlay } from '../../shared/Overlay/Overlay';
import s from './Start.module.scss'
export const Start = defineComponent({
    setup(props, context) {
        const overlayVisible = ref(false)
        return () => (
            <div class={s.start}>
                <MainLayout>{{
                    title: () => "山竹记账",
                    icon: () => <Icon name='menu' class={s.navIcon} onClick={() => { console.log('click'); overlayVisible.value = !overlayVisible.value }} />,
                    main: () => <>
                        <Center class={s.pig_wrapper}>
                            <Icon name="pig" class={s.pig} />
                        </Center>

                        <div class={s.button_wrapper}>
                            <RouterLink to='/items/create'>
                                <Button class={s.button}>开始记账</Button>
                            </RouterLink>
                        </div>
                        <RouterLink to='/items/create'>
                            <FloatButton iconName={'add'} />
                        </RouterLink>
                        {
                            overlayVisible.value && <Overlay onClose={() => overlayVisible.value = false} />
                        }
                    </>
                }}</MainLayout>

            </div>
        )
    }
})