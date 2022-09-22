import { defineComponent, PropType } from 'vue';
import { Icon } from '../../../shared/Icon/Icon';
import { MainLayout } from '../../Layouts/MainLayout';
import s from './TagCreate.module.scss'
export const TagCreate = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup(props, context) {
        return () => (<MainLayout>{{
            title: () => '新建标签',
            icon: () => <Icon name='left' />,
            main: () => {
                return <form>
                    <div class={s.form_item}>
                        <label for="name">标签名</label>
                        <input type="text" name="name" />
                    </div>
                    <div class={s.form_item}>
                        <label for="emoji">符号</label>
                        <input type="text" name="emoji" />

                    </div>
                    <div>
                        <p>记账时长按标签即可进行编辑</p>
                    </div>
                    <div>
                        <button>确定</button>
                    </div>
                </form>
            }
        }}</MainLayout>)
    }
})