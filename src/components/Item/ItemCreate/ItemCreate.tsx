import {defineComponent, PropType, reactive, ref} from 'vue';
import {Tab, Tabs} from '../../../shared/Tabs/Tabs';
import {MainLayout} from '../../Layouts/MainLayout';
import {InputPad} from '../InputPad/InputPad';
import s from './ItemCreate.module.scss';
import {Tags} from '../../../shared/Tags/Tags';
import {useRouter} from 'vue-router';
import {AxiosError} from 'axios';
import {Dialog} from 'vant';
import {http} from '../../../shared/HttpClient';
import {BackIcon} from '../../../shared/BackIcon/BackIcon';
import { validate } from '../../../shared/validate';
import _, { indexOf } from 'lodash';

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    const formData = reactive<Partial<Item>>({
      kind: 'expenses',
      tag_ids: [],
      amount: 0,
      happen_at: new Date().toISOString()
    });
    const errors = reactive<FormDataErrors<FormData>>({
      kind:[],
      tag_ids:[],
      amount:[],
      happen_at:[]
    })
    const router = useRouter();
    const onError = async (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        await Dialog.alert({
          title: '出错',
          message: Object.values(error.response.data.errors).join('\n')
        });
      }
      throw error;
    };
    const onSubmit = async () => {
      Object.assign(errors,{kind:[],tag_ids:[],amount:[],happen_at:[]})
      Object.assign(errors, validate([
        {key:'kind',type:'required',value:true,message:'类型必填'},
        {key:'tag_ids',type:'required',value:true,message:'请选择一个标签'},
        {key:'amount',type:'notEqual',value:0,message:'金额不能为0'},
        {key:'amount',type:'required',value:true,message:'金额必填'},
        {key:'happen_at',type:'required',value:true,message:'时间必填'}
      ],formData))
      if(Object.values(errors).join('').length){
        return await Dialog.alert({
          title: '出错',
          message: Object.values(errors).filter(i=>i.length>0).join('\n')
        });
      }
      const res = await http.post<Resource<Item>>('/items', formData,
        {params: {_mock: 'itemCreate'},_loading:true}
      ).catch(onError);
      console.log({res});
      await router.push('/items');
    };

    return () => (
      <MainLayout class={'layout'}>{{
        title: () => '记一笔', 
        icon: () => <BackIcon/>,
        main: () => <div class={s.wrapper}>
          <Tabs v-model:selected={formData.kind} class={s.tabs}>
            <Tab name="支出" value="expenses">
              <Tags kind="expenses" v-model:selected={formData.tag_ids![0]}/>
            </Tab>
            <Tab name="收入" value="income" class={s.tags_wrapper}>
              <Tags kind="income" v-model:selected={formData.tag_ids![0]}/>
            </Tab>
          </Tabs>
          <div class={s.inputPad_wrapper}>
            <InputPad v-model:happenAt={formData.happen_at}
                      onSubmit={onSubmit}
                      v-model:amount={formData.amount}/>
          </div>
        </div>
      }}</MainLayout>
    );
  }
});
