import { defineComponent, PropType } from 'vue';
import s from './Tabs.module.scss'

export const Tabs = defineComponent({
    props: {
        selected: {
            type: String as PropType<string>,
            required: false
        },
        classPrefix: {
            type: String
        },
        onChange: {
            type: Function as PropType<(name: string) => void>,
            required: false
        }
    },
    emits: ['update:selected'],
    setup(props, context) {
        const { slots } = context
        const eles = slots.default?.() || []
        const cp = props.classPrefix
        return () => (<div class={[s.tabs,cp+'tabs']}>
            <ol class={[s.tabs_nav,cp+'_tabs_nav']}>
                {eles.map((item, index) => {
                    return <li key={index}
                        onClick={() => context.emit('update:selected', item.props?.value)}
                        class={[item.props?.value === props.selected ? s.selected : '',cp+'_tabs_nav_item']}>
                        {item.props?.name}
                    </li>
                })}
            </ol>
            <main>
                <div key={props.selected}>
                    {eles.find(item=>item.props?.value===props.selected)}
                </div>
            </main>
        </div>)
    }
})


export const Tab = defineComponent({
    props: {
        name: {
            type: String as PropType<string>,
            required:true
        },
        value: {
            type: String as PropType<string>,
            required:true
        },
    },
    setup(props, context) {
        return () => (<div>{context.slots.default?.()}</div>)
    }
})
