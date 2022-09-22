import { defineComponent, PropType } from 'vue';
import { Button } from '../../../shared/Button/Button';
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
                return <form class={s.form}>
                    <div class={s.form_item}>
                        <label for="name">标签名</label>
                        <input type="text" class={s.input} name="name" />
                        <div class={s.form_item_errorHint}>
                            <span>必填</span>
                        </div>
                    </div>
                    <div class={[s.form_item,]}>
                        <label for="emoji">符号</label>
                        <div class={s.emoji_list}>
                            <nav>
                                <span class={s.selected}>表情</span>
                                <span>手势</span>
                                <span>职业</span>
                                <span>衣服</span>
                                <span>动物</span>
                                <span>自然</span>
                                <span>食物</span>
                                <span>运动</span>
                                <span>表情</span>
                                <span>手势</span>
                                <span>职业</span>
                                <span>衣服</span>
                                <span>动物</span>
                                <span>自然</span>
                                <span>食物</span>
                                <span>运动</span>
                            </nav>
                            <ol>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                                <li>😀</li>
                            </ol>
                        </div>
                        <div class={s.form_item_errorHint}>
                            <span>必填</span>
                        </div>
                    </div>
                    <p class={s.tips}>记账时长按标签即可进行编辑</p>
                    <div class={s.formRow}>
                        <div class={s.formItem_value}>
                            <Button class={[ s.button]}>确定</Button>
                        </div>
                    </div>
                </form>
            }
        }}</MainLayout>)
    }
})