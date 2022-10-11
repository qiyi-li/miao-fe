import { defineComponent, PropType, reactive, ref } from 'vue';
import { Time } from '../../../shared/time';
import { ItemSummary } from '../ItemSummary/ItemSummary';
import { TimeTabsLayouts } from '../../Layouts/TimeTabsLayouts';
export const ItemList = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup(props, context) {
        const refSelected = ref('本月')
        const time = new Time()
        const customTime = reactive({
            start: new Time().format(), end: new Time().format()
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
        const refOverlayVisible = ref(false)
        const onSubmitCustomTime = (e: Event) => {
            e.preventDefault()
            refOverlayVisible.value = false
        }
        return () => (<TimeTabsLayouts component={ItemSummary}/>)
    }
})
