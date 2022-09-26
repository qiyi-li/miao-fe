import { defineComponent,PropType, reactive } from 'vue';
import { Button } from '../../../shared/Button/Button';
import { EmojiSelect } from '../../../shared/EmojiSelect/EmojiSelect';
import { FData, Rules, validate } from '../../../shared/validate';
import s from './TagForm.module.scss'
export const TagForm = defineComponent({
    props: {
       name: {
           type: String as PropType<string>
        }
    },
    setup(props,context) {
        const errors = reactive<{ [f in keyof FData]?: string[] }>({})
        const formData: FData = reactive({
            name: '',
            sign: '',
        })
        const onSubmit = (e: Event) => {
            e.preventDefault()
            const roles: Rules<typeof formData> = [
                { key: 'name', type: 'required', value: true, },
                { key: 'name', type: 'pattern', value: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
                { key: 'sign', type: 'required', value: true, }
            ]
            Object.assign(errors, validate(roles, formData))
            if (!(errors?.name?.length || errors?.sign?.length)) {
                console.log({ formData })
            }
        }
        return () => (<form class={s.form} onSubmit={onSubmit}>
            <div class={s.form_item}>
                <label for="name">标签名</label>
                <input type="text" v-model={formData.name} class={s.input} name="name" />
                <div class={s.form_item_errorHint}>
                    <span>{errors?.name?.[0]}</span>
                </div>
            </div>
            <div class={[s.form_item,]}>
                <label for="emoji">符号{formData.sign}</label>
                <div class={s.emoji_list}>
                    <EmojiSelect v-model:sign={formData.sign} />
                </div>
                <div class={s.form_item_errorHint}>
                    <span>{errors?.sign?.[0]}</span>
                </div>
            </div>
            <p class={s.tips}>记账时长按标签即可进行编辑</p>
            <div class={s.formRow}>
                <div class={s.formItem_value}>
                    <Button class={[s.button]}>确定</Button>
                </div>
            </div>
        </form>)
    }
})