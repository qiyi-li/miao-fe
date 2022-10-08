import { computed, defineComponent, PropType, ref, VNode } from 'vue';
import { DatetimePicker, Popup } from 'vant';
import { Time } from '../time';
import { EmojiSelect } from '../EmojiSelect/EmojiSelect';
import s from './Form.module.scss';
import dayjs from 'dayjs';
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    }
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    )
  }
})

export const FormItem = defineComponent({
  props: {
    label: {
      type: String
    },
    modelValue: {
      type: [String, Number]
    },
    type: {
      type: String as PropType<'text' | 'emojiSelect' | 'date'>,
    },
    error: {
      type: String
    }
  },
  emits: ['update:modelValue'],
  setup: (props, context) => {
    const refDateVisible = ref(false)
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input
            value={props.modelValue}
            onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
            class={[s.formItem, s.input, s.error]} />
        case 'emojiSelect':
          return <EmojiSelect
            v-model:sign={props.modelValue}
            onUpdateModelValue={value => {
              context.emit('update:modelValue', value)
            }}
            class={[s.formItem, s.emojiList, s.error]} />
        case 'date':
          return <>
            <input readonly={true} value={props.modelValue}
              onClick={() => { refDateVisible.value = true }}
              class={[s.formItem,s.input]}
            />
            <Popup position='bottom' close-on-click-overlay={false} v-model:show={refDateVisible.value}>
              <DatetimePicker value={new Date(props.modelValue||'')} type="date" title="选择年月日"
                onConfirm={(date: Date) => {
                  context.emit('update:modelValue', new Time(date).format())
                  refDateVisible.value = false
                }}
                onCancel={() => refDateVisible.value = false} />
            </Popup>
          </>
        case undefined:
          return context.slots.default?.()
      }
    })
    return () => {
      return <div class={s.formRow}>
        <label class={s.formLabel}>
          {props.label &&
            <span class={s.formItem_name}>{props.label}</span>
          }
          <div class={s.formItem_value}>
            {content.value}
          </div>
          {props.error &&
            <div class={s.formItem_errorHint}>
              <span>{props.error}</span>
            </div>
          }
        </label>
      </div>
    }
  }
})