import {defineComponent} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {Icon} from '../Icon/Icon';

export const BackIcon = defineComponent({
  setup: () => {
    const route = useRoute();
    const router = useRouter();
    const onClick = async () => {
      const {return_to} = route.query;
      if (return_to) {
        await router.push(return_to.toString());
      } else {
        if(route.fullPath==='/items/create'){
          router.push('/items')
        }else{
          router.back();
        }
      }
    };
    return () => <Icon name="left" onClick={onClick}/>;
  },
});
