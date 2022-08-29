import { defineComponent } from 'vue';
export const Foo = defineComponent({
    setup(props,context) {
        return () => (<div>fo</div>)
    }
})