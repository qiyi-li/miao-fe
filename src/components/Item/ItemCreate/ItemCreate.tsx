import {defineComponent, onMounted, PropType, ref} from 'vue';
import {Icon} from '../../../shared/Icon/Icon';
import {Tab, Tabs} from '../../../shared/Tabs/Tabs';
import {MainLayout} from '../../Layouts/MainLayout';
import {InputPad} from '../InputPad/InputPad';
import s from './ItemCreate.module.scss';
import {http} from '../../../shared/HttpClient';
import {Button} from '../../../shared/Button/Button';
import {useTags} from '../../../shared/useTags';

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
              <div class={s.tags_wrapper}>
                <div class={s.tag}>
                  <div class={s.sign}>
                    <Icon name="add" class={s.createTag}/>
                  </div>
                  <div class={s.name}>
                    新增
                  </div>
                </div>
                {expensesTags.value.map(tag =>
                  <div class={[s.tag, s.selected]}>
                    <div class={s.sign}>
                      {tag.sign}
                    </div>
                    <div class={s.name}>
                      {tag.name}
                    </div>
                  </div>
                )}
              </div>
              <div class={s.more}>
                {hasMore.value ?
                  <Button class={s.loadMore}>加载更多</Button> :
                  <span class={s.noMore}>没有更多</span>
                }
              </div>
            </Tab>
            <Tab name="收入" class={s.tags_wrapper}>
              <div class={s.tag}>
                <div class={s.sign}>
                  <Icon name="add" class={s.createTag}/>
                </div>
                <div class={s.name}>
                  新增
                </div>
              </div>
              {incomeTags.value.map(tag =>
                <div class={[s.tag, s.selected]}>
                  <div class={s.sign}>
                    {tag.sign}
                  </div>
                  <div class={s.name}>
                    {tag.name}
                  </div>
                </div>
              )}
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
