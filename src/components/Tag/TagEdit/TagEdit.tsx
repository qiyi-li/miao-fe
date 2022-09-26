import { defineComponent, PropType, reactive } from 'vue';
import { Button } from '../../../shared/Button/Button';
import { Icon } from '../../../shared/Icon/Icon';
import { FData, Rules, validate } from '../../../shared/validate';
import { MainLayout } from '../../Layouts/MainLayout';
import s from '../TagForm/TagForm.module.scss'
import { TagForm } from '../TagForm/TagForm';
export const TagEdit = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup(props, context) {
        const errors = reactive<{ [f in keyof FData]?: string[] }>({})
        const formData: FData = reactive({
            name: '',
            sign: '',
        })
        const onSubmit = (e: Event) => {
            e.stopPropagation()
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
        return () => (<MainLayout>{{
            title: () => '编辑标签',
            icon: () => <Icon name="left" onClick={() => { }} />,
            main: () => {
                return <>
                    <TagForm />
                    <div class={s.actions}>
                        <Button level='danger' class={s.removeTags} onClick={() => { }}>删除标签</Button>
                        <Button level='danger' class={s.removeTagsAndItems} onClick={() => { }}>删除标签和记账</Button>
                    </div>
                </>
            }
        }}</MainLayout>)
    }
})