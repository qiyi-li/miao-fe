import { Dialog } from 'vant';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useMeSotre } from '../../stores/useMeStore';
import { Icon } from '../Icon/Icon';
import s from './Overlay.module.scss';
export const Overlay = defineComponent({
    props: {
        onClose: {
            type: Function as PropType<() => void>
        }
    },
    setup: (props, context) => {
        const meStore = useMeSotre()
        const close = () => {
            props.onClose?.()
        }
        const router = useRouter()
        const onSignOut = async()=>{
            await Dialog.confirm({
                title:'确认',
                message:'确认退出登录？'
            })
            localStorage.removeItem('jwt')
            router.push('/')
        }
        const me = ref<User>()
        onMounted(async()=>{
            const response = await meStore.mePromise
            me.value = response?.data.resource
        })
        const route = useRoute()
        return () => <>
            <div class={s.mask} onClick={close}></div>
            <div class={s.overlay}>
                <section class={s.currentUser}>
                    {me.value?
                    <div>
                        <h2 class={s.email}>
                            {me.value.email}
                        </h2>
                        <p onClick={onSignOut}>点击这里退出登录</p>
                    </div>:
                    <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
                        <h2>未登录用户</h2>
                        <p>点击这里登录</p>
                    </RouterLink>
                }
                </section>
                <nav>
                    <ul class={s.action_list}>
                        <li onClick={()=>route.fullPath==='/statistics'&&close()}>
                            <RouterLink to="/statistics" class={s.action}>
                                <Icon name="charts" class={s.icon} />
                                <span>统计图表</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/items/create" class={s.action}>
                                <Icon name="add" class={s.icon} />
                                <span>开始记账</span>
                            </RouterLink>
                        </li>
                        <li onClick={()=>route.fullPath==='/items'&&close()}>
                            <RouterLink to="/items" class={s.action}>
                                <Icon name="cloud" class={s.icon} />
                                <span>记账列表</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/notify" class={s.action}>
                                <Icon name="notify" class={s.icon} />
                                <span>记账提醒</span>
                            </RouterLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    }
})
export const OverlayIcon = defineComponent({
    setup(props, ctx) {
        const refOverlayVisible = ref(false)
        const onClickMenu = () => {
            refOverlayVisible.value = !refOverlayVisible.value
        }
        return () => <>
            <Icon name="menu" class={s.icon} onClick={onClickMenu} />
            {refOverlayVisible.value &&
                <Overlay onClose={() => refOverlayVisible.value = false} />
            }
        </>
    },
})