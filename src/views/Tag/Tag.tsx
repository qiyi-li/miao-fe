import { defineComponent, PropType } from 'vue';
import { RouterView } from 'vue-router';
import s from './Tags.module.scss'
export const Tag = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup(props, context) {
        return () => (<RouterView />)
    }
})