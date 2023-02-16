import {defineComponent, onMounted, PropType, reactive, ref, watch} from 'vue';
import {FloatButton} from '../../../shared/FloatButton/FloatButton';
import s from './ItemSummary.module.scss';
import {http} from '../../../shared/HttpClient';
import {Button} from '../../../shared/Button/Button';
import {Money} from '../../../shared/Money/Money';
import {Datetime} from '../../../shared/Datetime/Datetime';
import { RouterLink } from 'vue-router';
import { Center } from '../../../shared/Center/Center';
import { Icon } from '../../../shared/Icon/Icon';
import _ from 'lodash';
import { useItemStore } from '../../../stores/useItemStore';

export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    }
  },
  setup(props, context) {
    const itemStore = useItemStore(`items-${props.startDate}-${props.endDate}`)()

    const itemsBalance = reactive({expenses: 0, income: 0, balance: 0});
    const fetchItemsBalance = async () => {
      if (!props.startDate || !props.endDate) { return; }
      const response = await http.get('/items/balance', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        _mock: 'itemIndexBalance',
      },{_loading:true});
      Object.assign(itemsBalance, response.data);
    };
    onMounted(()=>{
      itemStore.fetchItems(props.startDate||'',props.endDate||'')
    });
    onMounted(fetchItemsBalance);

    watch(() => [props.startDate, props.endDate], async () => {
      itemStore.fetchItems(props.startDate||'',props.endDate||'');
      await fetchItemsBalance();
    });
    return () => (<div>
      {itemStore.items&&itemStore.items.length>0 ? (
        <>
          <ul class={s.total}>
            <li>
              <span>收入</span>
              <Money value={itemsBalance.income}/>
            </li>
            <li>
              <span>支出</span>
              <Money value={itemsBalance.expenses}/>
            </li>
            <li>
              <span>净收入</span>
              <Money value={itemsBalance.balance}/>
            </li>
          </ul>
          <ol class={s.list}>
            {itemStore.items.map((item) => (
              <li>
                <div class={s.sign}>
                  <span>{!_.isEmpty(item.tags)?item.tags![0].sign:'💰'}</span>
                </div>
                <div class={s.text}>
                  <div class={s.tagAndAmount}> 
                    <span class={s.tag}>{!_.isEmpty(item.tags)?item.tags![0].name : '未分类'}</span>
                    <span class={s.amount}>￥<Money value={item.amount}/></span>
                  </div>
                  <div class={s.time}><Datetime value={item.happen_at}/></div>
                </div>
              </li>
            ))}
          </ol>
          <div class={s.more}>
            {itemStore.hasMore ?
              <Button onClick={()=>itemStore.fetchItems(props.startDate||'',props.endDate||'',true)}>加载更多</Button> :
              <span>没有更多</span>
            }
          </div>
        </>
      ) : (
      <div>
          <Center class={s.pig_wrapper}>
            <Icon name="pig" class={s.pig} />
        </Center>

        <div class={s.button_wrapper}>
            <RouterLink to='/items/create'>
                <Button class={s.button}>开始记账</Button>
            </RouterLink>
        </div>
      </div>)}
      <RouterLink to='/items/create'>
          <FloatButton iconName={'add'} />
      </RouterLink>
    </div>);
  }
});
