import { defineComponent } from 'vue';
import s from './First.module.scss';
import { RouterLink } from 'vue-router';
export const WelcomeLayout = defineComponent({
    setup: (prop1s, context) => {
        const { slots } = context
        console.log(slots.buttonName?.(),slots.action?.())
        return () => (
            <div class={s.wrapper}>
                <div class={s.card}>
                    {slots.icon?.()}
                    {slots.title?.()}
                </div>
                <div class={s.actions}>
                    <RouterLink class={s.fake} to="/start" >跳过</RouterLink>
                    <RouterLink to={`${slots.action?.()[0]?.children}`} >{slots.buttonName?.()[0]?.children}</RouterLink>
                    <RouterLink to="/start" >跳过</RouterLink>
                </div>
            </div>
        )
    }
})