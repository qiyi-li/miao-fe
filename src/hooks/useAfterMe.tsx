import { onMounted } from "vue"
import { useMeSotre } from "../stores/useMeStore"


export const useAfterMe = (fn:()=>void)=>{
    const meStore = useMeSotre()
    onMounted(async ()=>{
        try{
            await meStore.mePromise
        }catch(err){
            return
        }
        fn()
    })
}