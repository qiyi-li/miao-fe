import {defineComponent, onMounted, PropType, ref} from 'vue';
import {Icon} from '../../../shared/Icon/Icon';
import {Tab, Tabs} from '../../../shared/Tabs/Tabs';
import {MainLayout} from '../../Layouts/MainLayout';
import {InputPad} from '../InputPad/InputPad';
import s from './ItemCreate.module.scss';
import {http} from '../../../shared/HttpClient';
import {Button} from '../../../shared/Button/Button';
import {useTags} from '../../../shared/useTags';
import {Tags} from '../../../shared/Tags/Tags';

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    const selectedTabKey = ref('支出');
    const {tags: expensesTags, hasMore, fetchTags} = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'expenses',
        _mock: 'tagIndex',
        page: (page + 1).toString()
      });
    });
    const { tags: incomeTags,
      hasMore: hasMore2,
      fetchTags: fetchTags2
    } = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'income',
        _mock: 'tagIndex',
        page: (page + 1).toString(),
      })})


    const onChange = (name: string) => selectedTabKey.value = name;
    return () => (
      <MainLayout class={'layout'}>{{
        title: () => '记一笔',
        icon: () => <Icon name="left" class={s.navIcon}/>,
        main: () => <div class={s.wrapper}>
          <Tabs v-model:selected={selectedTabKey.value} class={s.tabs}>
            <Tab name="支出">
              <Tags kind="expenses"/>
            </Tab>
            <Tab name="收入" class={s.tags_wrapper}>
              <Tags kind="income"/>
            </Tab>
          </Tabs>
          <div class={s.inputPad_wrapper}>
            <InputPad/>
          </div>
        </div>
      }}</MainLayout>
    );
  }
});
