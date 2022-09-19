import { defineComponent, PropType, ref } from 'vue';
import { Icon } from '../../../shared/Icon/Icon';
import { Tab, Tabs } from '../../../shared/Tabs/Tabs';
import { MainLayout } from '../../Layouts/MainLayout';
import s from './ItemCreate.module.scss'
export const ItemCreate = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup(props, context) {
        const selectedTabKey = ref('支出')
        const onChange = (name: string) => selectedTabKey.value = name
        return () => (
            <MainLayout>{{
                title: () => '记一笔',
                icon: () => <Icon name='left' class={s.navIcon} />,
                main: () => <>
                    <Tabs v-model:selected={selectedTabKey.value}>
                        <Tab name='支出'>123123123</Tab>
                        <Tab name='收入'>收5464564564入</Tab>
                    </Tabs>
                </>
            }}</MainLayout>
        )
    }
})