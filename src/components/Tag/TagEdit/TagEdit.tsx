import {defineComponent, PropType} from 'vue';
import {Button} from '../../../shared/Button/Button';
import {MainLayout} from '../../Layouts/MainLayout';
import s from '../TagForm/TagForm.module.scss';
import {TagForm} from '../TagForm/TagForm';
import {BackIcon} from '../../../shared/BackIcon/BackIcon';
import {useRoute, useRouter} from 'vue-router';
import {Dialog} from 'vant';
import 'vant/lib/dialog/style';
import {http} from '../../../shared/HttpClient';

export const TagEdit = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const onError = () => {
      Dialog.alert({title: '提示', message: '删除失败'});
    };
    const onDelete = async (options?: { withItems?: boolean }) => {
      await Dialog.confirm({
        title: '确认',
        message: '你真的要删除吗？'
      });
      await http.delete(`/tags/${numberId}`, {
        withItems: options?.withItems ? 'true' : 'false'
      }).catch(onError);
      router.back();
    };
    const numberId = parseInt(route.params.id.toString());
    if (Number.isNaN(numberId)) {
      return () => <div>id 不存在</div>;
    }
    return () => (<MainLayout>{{
      title: () => '编辑标签',
      icon: () => <BackIcon/>,
      main: () => {
        return <>
          <TagForm id={numberId}/>
          <div class={s.actions}>
            <Button level="danger" class={s.removeTags} onClick={() => onDelete()}>删除标签</Button>
            <Button level="danger" class={s.removeTagsAndItems}
                    onClick={() => onDelete({withItems: true})}>删除标签和记账</Button>
          </div>
        </>;
      }
    }}</MainLayout>);
  }
});
