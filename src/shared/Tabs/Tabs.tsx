import { defineComponent, PropType } from 'vue';
import s from './Tabs.module.scss'
export const Tabs = defineComponent({
    props: {
        selected: {
            type: String as PropType<string>,
            required: false
        },
        onChange: {
            type: Function as PropType<(name: string) => void>,
            required: false
        }
    },
    setup(props, context) {
        const { slots } = context
        const eles = slots.default?.() || []
        console.log(eles)
        for (let i = 0; i < eles.length; i++) {
            console.log(eles[i].type === Tab)
            if (eles[i].type !== Tab) {

                // throw new Error('<Tabs> only accepts <Tab> as children')
            } else {
                // throw new Error('Tabs cannot use other than Tab')
            }
        }
        return () => (<div class={s.tabs}>
            <ol class={s.tabs_nav}>
                {eles.map((item, index) => {
                    return <li key={index}
                        onClick={() => context.emit('update:selected', item.props?.name)}
                        class={item.props?.name === props.selected ? s.selected : ''}>
                        {item.props?.name}
                    </li>
                })}
            </ol>
            <main>
                {eles.find(i => i.props?.name === props.selected)}
            </main>
        </div>)
    }
})


export const Tab = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup(props, context) {
        return () => (<div>{context.slots.default?.()}</div>)
    }
})