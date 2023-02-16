import {defineStore} from 'pinia'
import { http } from '../shared/HttpClient'

type State={
    items: Item[]
    hasMore: boolean
    page: number
}
type Actions={
    fetchItems: (startDate:string,endDate:string,more?:boolean)=>void
    reset: ()=>void
}
export const useItemStore = (id:string)=>defineStore<string,State,{},Actions>(id,{
    state:()=>({
        items: [],
        hasMore: false,
        page: 0
    }),
    actions: {
        async fetchItems(startDate,endDate,more){
            if (!startDate || !endDate) return;
            const response = await http.get<Resources<Item>>('/items', {
              happen_after: startDate,
              per_page:10,
              happen_before: endDate,
              page: more?this.page + 1:1,
              _mock: 'itemIndex',
            },{_loading: true});
            const {resources, pager} = response.data;
            if(more){
                this.items.push(...resources)
                this.page += 1;
            }else{
                this.page = 1
                this.items = resources;
            }
            this.hasMore = (pager.page - 1) * pager.per_page + resources.length < pager.count;
        },
        reset(){
            this.items=[]
            this.hasMore=false
            this.page=0
        }
    }
})