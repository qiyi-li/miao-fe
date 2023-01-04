import {defineComponent, onMounted, PropType, reactive, toRaw} from 'vue';
import {Button} from '../../../shared/Button/Button';
import {EmojiSelect} from '../../../shared/EmojiSelect/EmojiSelect';
import {Form, FormItem} from '../../../shared/Form/Form';
import {FData, Rules, validate} from '../../../shared/validate';
import s from './TagForm.module.scss';
import {useRoute, useRouter} from 'vue-router';
import {http} from '../../../shared/HttpClient';
import {onFormError} from '../../../shared/onFormError';

export const TagForm = defineComponent({
  props: {
    id: Number
  },
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const errors = reactive<{ [f in keyof FData]?: string[] }>({});
    const formData: FData = reactive({
      id: undefined,
      name: '',
      sign: '',
      kind: route.query.kind as string
    });
    onMounted(async () => {
      if (props.id) {
        const {data} = await http.get<Resource<Tag>>(`tags/${props.id}`, {_mock: 'tagShow'});
        Object.assign(formData, data.resource);
      }
    });
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      const roles: Rules<typeof formData> = [
        {key: 'name', type: 'required', value: true,},
        {key: 'name', type: 'pattern', value: /^.{1,4}$/, message: '只能填 1 到 4 个字符'},
        {key: 'sign', type: 'required', value: true,}
      ];
      Object.assign(errors, validate(roles, formData));
      if (!(errors?.name?.length || errors?.sign?.length)) {
        const promise = await formData.id ?
          http.patch(`/tags/${formData.id}`, formData, {
            params: {_mock: 'tagEdit'},
          }) :
          http.post('/tags', formData, {
            params: {_mock: 'tagCreate'},
          });
        await promise.catch((error) => {
          onFormError(error, (data) => Object.assign(errors, data.errors));
        });
        router.back();
      }
    };
    return () => (<Form onSubmit={onSubmit}>
      <FormItem label="标签名(最多4个字符)"
                type="text"
                v-model={formData.name}
                error={errors['name']?.[0]}/>
      <FormItem label={'符号 ' + formData.sign}
                type="emojiSelect" v-model={formData.sign}
                error={errors['sign']?.[0]}/>
      <FormItem>
        <p class={s.tips}>记账时长按标签即可进行编辑</p>
      </FormItem>
      <FormItem>
        <Button type={'submit'} class={[s.button]}>确定</Button>
      </FormItem>
    </Form>);
  }
});
