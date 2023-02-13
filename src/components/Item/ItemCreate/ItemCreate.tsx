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

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    const selectedTabKey = ref('支出');
    const formData = reactive({
      kind: '支出',
      tags_id: [],
      amount: 0,
      happen_at: new Date().toISOString()
    });
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
      const res = await http.post<Resource<Item>>('/items', formData,
        {params: {_mock: 'itemCreate'},_loading:true}
      ).catch(onError);
      console.log({res});
      await router.push('/items');
    };

    const onChange = (name: string) => selectedTabKey.value = name;
    return () => (
      <MainLayout class={'layout'}>{{
        title: () => '记一笔',
        icon: () => <BackIcon/>,
        main: () => <div class={s.wrapper}>
          <Tabs v-model:selected={formData.kind} class={s.tabs}>
            <Tab name="支出">
              <Tags kind="expenses" v-model:selected={formData.tags_id[0]}/>
            </Tab>
            <Tab name="收入" class={s.tags_wrapper}>
              <Tags kind="income" v-model:selected={formData.tags_id[0]}/>
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
