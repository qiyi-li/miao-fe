import { defineComponent, PropType, reactive, ref } from 'vue';
import { Icon } from '../../../shared/Icon/Icon';
import { Tabs, Tab } from '../../../shared/Tabs/Tabs';
import { Time } from '../../../shared/time';
import { MainLayout } from '../../Layouts/MainLayout';
import { ItemSummary } from '../ItemSummary/ItemSummary';
import s from './ItemList.module.scss'
export const ItemList = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup(props, context) {
        const refSelected = ref('本月')
        const time = new Time()
        console.log({ time })
        const customTime = reactive({
            start: new Time(), end: new Time()
        })
        const timeList = [
            {
                start: time.firstDayOfMonth(),
                end: time.lastDayOfMonth()
            },
            {
                start: time.add(-1, 'month').firstDayOfMonth(),
                end: time.add(-1, 'month').lastDayOfMonth()
            },
            {
                start: time.firstDayOfYear(),
                end: time.lastDayOfYear()
            }
        ]
        return () => (<MainLayout>{
            {
                title: () => '山竹记账',
                icon: () => <Icon name="menu" />,
                main: () => (
                    <Tabs classPrefix={'customTabs'} v-model:selected={refSelected.value}>
                        <Tab name="本月">
                            <ItemSummary
                                startDate={timeList[0].start.format()}
                                endDate={timeList[0].end.format()}
                            />
                        </Tab>
                        <Tab name="上月">
                            <ItemSummary
                                startDate={timeList[1].start.format()}
                                endDate={timeList[1].end.format()}
                            />
                        </Tab>
                        <Tab name="今年">
                            <ItemSummary
                                startDate={timeList[2].start.format()}
                                endDate={timeList[2].end.format()}
                            />
                        </Tab>
                        <Tab name="自定义时间">
                            <ItemSummary
                                startDate={customTime.start.format()}
                                endDate={customTime.end.format()}
                            />
                        </Tab>
                    </Tabs>
                )
            }
        }</MainLayout>)
    }
})
