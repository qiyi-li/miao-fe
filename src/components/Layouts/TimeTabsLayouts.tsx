import {Overlay} from 'vant';
import {defineComponent, PropType, reactive, ref} from 'vue';
import {Form, FormItem} from '../../shared/Form/Form';
import {OverlayIcon} from '../../shared/Overlay/Overlay';
import {Tab, Tabs} from '../../shared/Tabs/Tabs';
import {Time} from '../../shared/time';
import s from './TimeTabsLayouts.module.scss';
import {MainLayout} from './MainLayout';
import dayjs from 'dayjs';

const demo = defineComponent({
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
});
export const TimeTabsLayouts = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    },
    component: {
      type: Object as PropType<typeof demo>,
      required: true
    },
    hideThisYear: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const refSelected = ref('本月');
    const time = new Time();
    const customTime = reactive<{
      start?: string,
      end?: string
    }>({});
    const tempTime = reactive({
      start: new Time().format(),
      end: new Time().format()
    })
    const timeList = [
      {
        start: time.firstDayOfMonth(),
        end: time.lastDayOfMonth()
      },
      {
        start: time.add(-1, 'month').firstDayOfMonth(),
        end: time.add(-1, 'month').lastDayOfMonth()
      },
      {
        start: time.firstDayOfYear(),
        end: time.lastDayOfYear()
      }
    ];
    const refOverlayVisible = ref(false);
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault();
      refOverlayVisible.value = false;
      if(dayjs(tempTime.start).isSame(tempTime.end)){
        return window.alert('开始时间与结束时间不能一致')
      }
      if(dayjs(tempTime.start).isAfter(tempTime.end)){
        Object.assign(customTime, {start:tempTime.end,end:tempTime.start})
      }
      Object.assign(customTime, tempTime)
    };
    return () => (<MainLayout>{
      {
        title: () => '小喵记账',
        icon: () => <OverlayIcon/>,
        main: () => (
          <>
          {props.hideThisYear ?
            <Tabs classPrefix={'customTabs'} v-model:selected={refSelected.value}
                  onUpdate:selected={(v: string) => refOverlayVisible.value = v === '自定义时间'}>
              <Tab name="本月" value='本月'>
                <props.component
                  startDate={timeList[0].start.format()}
                  endDate={timeList[0].end.format()}/>
              </Tab>
              <Tab name="上月" value='上月'>
                <props.component
                  startDate={timeList[1].start.format()}
                  endDate={timeList[1].end.format()}/>
              </Tab>
              <Tab name="自定义时间" value='自定义时间'>
                <props.component
                  startDate={customTime.start}
                  endDate={customTime.end}/>
              </Tab>
            </Tabs>
            :
            <Tabs classPrefix={'customTabs'} v-model:selected={refSelected.value}
                  onUpdate:selected={(v: string) => refOverlayVisible.value = v === '自定义时间'}>
              <Tab name="本月" value='本月'> 
                <props.component
                  startDate={timeList[0].start.format()}
                  endDate={timeList[0].end.format()}/>
              </Tab>
              <Tab name="上月" value='上月'>
                <props.component
                  startDate={timeList[1].start.format()}
                  endDate={timeList[1].end.format()}/>
              </Tab>
              <Tab name="今年" value='今年'>
                <props.component
                  startDate={timeList[2].start.format()}
                  endDate={timeList[2].end.format()}/>
              </Tab>
              <Tab name="自定义时间" value='自定义时间'>
                <props.component
                  startDate={customTime.start}
                  endDate={customTime.end}/>
              </Tab>
            </Tabs>
            }
            <Overlay show={refOverlayVisible.value} class={s.overlay}>
              <div class={s.overlay_inner}>
                <header>
                  请选择时间
                </header>
                <main>
                  <Form onSubmit={onSubmitCustomTime}>
                    <FormItem label="开始时间" v-model={tempTime.start} type="date"/>
                    <FormItem label="结束时间" v-model={tempTime.end} type="date"/>
                    <FormItem>
                      <div class={s.actions}>
                        <button type="button" onClick={() => refOverlayVisible.value = false}>取消</button>
                        <button type="submit">确认</button>
                      </div>
                    </FormItem>
                  </Form>
                </main>
              </div>
            </Overlay>
          </>
        )
      }
    }</MainLayout>);
  }
});
