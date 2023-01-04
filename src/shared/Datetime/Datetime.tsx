import {computed, defineComponent, PropType} from 'vue';
import dayjs from 'dayjs';

export const Datetime = defineComponent({
  props: {
    value: {
      type: [Date, String] as PropType<string | Date>,
      required: true,
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  setup: (props, context) => {
    const toDisplay = computed(() => dayjs(props.value).format(props.format));
    return () => <div>{toDisplay.value}</div>;
  },
});
