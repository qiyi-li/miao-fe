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
        const numsDisplay = ref('0')
        const lastNum = ref('0')
        const onConfirm = (val: Date) => {
            refDate.value = val
            show.value = false
        }
        const showDatePicker = () => show.value = true
        const hideDatePicker = () => show.value = false
        const numsList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
        const appendFn = (val: string) => {
            const value = numsDisplay.value
            if (value.length === 16) return
            if (value === '0' && val === '0') return
            if (value[value.length - 1] === '.' && val === '.') return
            if (numsList.indexOf(val) < 0) lastNum.value = '' //输入+|-时候充值lastNum

            if (val === '.') {
                if (numsList.indexOf(value[value.length - 1]) === -1) {//最后一位是+|-
                    numsDisplay.value += '0' + val
                    lastNum.value = '0' + val
                } else if (value === '0') {//value只有0
                    numsDisplay.value += val
                    lastNum.value = '0' + val
                } else if (lastNum.value.indexOf('.') === -1) {//如果最新的数字中没有 '.',再加 '.'
                    numsDisplay.value += val
                    lastNum.value += val
                }
                return
            }

            if (numsList.indexOf(val) >= 0 && value === '0') {//输入数字且当前value为'0'
                numsDisplay.value = val
                lastNum.value = val
            } else if (numsList.indexOf(val) === -1 && numsList.indexOf(value[value.length - 1]) === -1) {//如果输入为+|-
                return
            } else {
                numsDisplay.value += val
                if (numsList.indexOf(val) >= 0) lastNum.value += val
            }
            console.log(lastNum.value)
        }
        const clear = () => numsDisplay.value = '0'
        const back = () => {
            console.log(numsDisplay.value.slice(0, -1))
            if (numsDisplay.value !== '0' && numsDisplay.value.length > 1) {
                numsDisplay.value = numsDisplay.value.slice(0, -1)
            } else if (numsDisplay.value.length === 1) {
                numsDisplay.value = '0'
            }
            lastNum.value = lastNum.value.slice(0, -1)
        }
        const now = new Date()
        const buttons = [
            { text: () => '1', onClick: () => appendFn('1') },
            { text: () => '2', onClick: () => appendFn('2') },
            { text: () => '3', onClick: () => appendFn('3') },
            { text: () => <span class={s.AC}>AC</span>, onClick: clear },
            { text: () => '4', onClick: () => appendFn('4') },
            { text: () => '5', onClick: () => appendFn('5') },
            { text: () => '6', onClick: () => appendFn('6') },
            { text: () => '+', onClick: () => appendFn('+') },
            { text: () => '7', onClick: () => appendFn('7') },
            { text: () => '8', onClick: () => appendFn('8') },
            { text: () => '9', onClick: () => appendFn('9') },
            { text: () => '-', onClick: () => appendFn('-') },
            { text: () => '.', onClick: () => appendFn('.') },
            { text: () => '0', onClick: () => appendFn('0') },
            { text: () => <Icon name={'delete'} class={s.button_icon} />, onClick: back },
            { text: () => '提交', onClick: () => { } },
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
                <span class={s.amount}>{numsDisplay.value}</span>
            </div>
            <div class={s.buttons}>
                {buttons.map(button =>
                    <button onClick={button?.onClick}>
                        <span class={s.button_container}>
                            {button?.text?.()}
                        </span>
                    </button>
                )}
            </div>
        </>
    }
})
