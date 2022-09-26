import { defineComponent, PropType } from 'vue';
import { NavBar } from '../../shared/NavBar/NavBar';
import s from './MainLayout.module.scss'
export const MainLayout = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup(props, context) {
        const { slots } = context
        return () => (<div>
            <NavBar>{
                {
                    default: slots?.title,
                    icon: slots?.icon
                }
            }</NavBar>
            {slots.main?.()}
        </div>)
    }
})