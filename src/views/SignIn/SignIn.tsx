import {defineComponent, PropType, reactive} from 'vue';
import {MainLayout} from '../../components/Layouts/MainLayout';
import {Button} from '../../shared/Button/Button';
import {Form, FormItem} from '../../shared/Form/Form';
import {Icon} from '../../shared/Icon/Icon';
import s from './SignIn.module.scss';
import axios from 'axios';

export const SignIn = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    const formData = reactive({
      email: '',
      code: '',
    });
    const errors = reactive({
      email: [],
      code: []
    });
    const onSubmit = (e: Event) => {

    };
    const sendValidationCode = async () => {
      const response = await axios.post('/api/v1/validation_codes', {email: formData.email});
      console.log({response});
    };

    return () => (
      <MainLayout>{
        {
          title: () => '登录',
          icon: () => <Icon name="left"/>,
          main: () => <div class={s.wrapper}>
            <div class={s.logo}>
              <Icon name="mangosteen" class={s.icon}/>
              <h1>山竹记账</h1>
            </div>
            <Form onSubmit={onSubmit}>
              <FormItem label="邮箱地址" type="text"
                        placeholder="请输入邮箱，然后点击发送验证码"
                        v-model={formData.email} error={errors.email?.[0]}/>
              <FormItem onClick={sendValidationCode} label="验证码" type="validationCode"
                        placeholder="请输入六位数字"
                        v-model={formData.code} error={errors.code?.[0]}/>
              <FormItem style={{paddingTop: '96px'}}>
                <Button>登录</Button>
              </FormItem>
            </Form>
          </div>
        }}</MainLayout>
    );
  }
});
