import {defineComponent, PropType} from 'vue';
import {Icon} from '../../../shared/Icon/Icon';
import {MainLayout} from '../../Layouts/MainLayout';
import {TagForm} from '../TagForm/TagForm';
import {BackIcon} from '../../../shared/BackIcon/BackIcon';

export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup() {
    return () => (<MainLayout>{{
      title: () => '新建标签',
      icon: () => <BackIcon/>,
      main: () => {
        return <TagForm/>;
      }
    }}</MainLayout>);
  }
});
