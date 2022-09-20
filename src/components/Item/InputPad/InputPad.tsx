import { defineComponent, PropType, ref } from 'vue';
import { Icon } from '../../../shared/Icon/Icon';
import s from './InputPad.module.scss';
import { DatetimePicker, Popup } from 'vant'
import 'vant/es/datetime-picker/style'
import dayjs from 'dayjs'
import 'vant/es/popup/style'
export const InputPad = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props, context) => {
        const refDate = ref<Date>(new Date)
        const show = ref(false)
        const onConfirm = (val: Date) => {
            refDate.value = val
            show.value = false
        }
        const showDatePicker = ()=>show.value=true
        const hideDatePicker = ()=>show.value=false
        
        const now = new Date()
        const buttons = [
            { text: '1', onClick: () => { } },
            { text: '2', onClick: () => { } },
            { text: '3', onClick: () => { } },
            { text: '清空', onClick: () => { } },
            { text: '4', onClick: () => { } },
            { text: '5', onClick: () => { } },
            { text: '6', onClick: () => { } },
            { text: '+', onClick: () => { } },
            { text: '7', onClick: () => { } },
            { text: '8', onClick: () => { } },
            { text: '9', onClick: () => { } },
            { text: '-', onClick: () => { } },
            { text: '.', onClick: () => { } },
            { text: '0', onClick: () => { } },
            { text: '删', onClick: () => { } },
            { text: '提交', onClick: () => { } },
        ]
        return () => <>
            <div class={s.dateAndAmount}>
                <Popup show={show.value} position={'bottom'} onClick-overlay={hideDatePicker} >
                    <DatetimePicker v-model={refDate.value} title={'选择年月日'} type={"date"} onConfirm={onConfirm} onCancel={hideDatePicker} />
                </Popup>
                <span class={s.date} onClick={showDatePicker}>
                    <Icon name="date" class={s.icon} />
                    <span>{dayjs(refDate.value).format('YYYY-MM-DD')}</span>
                </span>
                <span class={s.amount}>123123</span>
            </div>
            <div class={s.buttons}>
                {buttons.map(button =>
                    <button onClick={button.onClick}>
                        <span>
                            {button.text}
                        </span>
                    </button>
                )}
            </div>
        </>
    }
})