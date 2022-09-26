import { defineComponent, PropType, ref } from 'vue';
import { Icon } from '../../../shared/Icon/Icon';
import { Tabs, Tab } from '../../../shared/Tabs/Tabs';
import { MainLayout } from '../../Layouts/MainLayout';
import s from './ItemList.module.scss'
export const ItemList = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup(props, context) {
        const refSelected = ref('本月')
        return () => (<MainLayout>{
            {
                title: () => '山竹记账',
                icon: () => <Icon name="menu" />,
                main: () => (
                    <Tabs classPrefix={'customTabs'} v-model:selected={refSelected.value}>
                        <Tab name="本月">
                            list 1
                        </Tab>
                        <Tab name="上月">
                            list 2
                        </Tab>
                        <Tab name="今年">
                            list 3
                        </Tab>
                        <Tab name="自定义时间">
                            list 4
                        </Tab>
                    </Tabs>
                )
            }
        }</MainLayout>)
    }
})
