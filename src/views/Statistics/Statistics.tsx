import { defineComponent } from 'vue';
import { TimeTabsLayouts } from '../../components/Layouts/TimeTabsLayouts';
import { Charts } from '../../components/Statistics/Charts/Charts';
export const StatisticsPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <TimeTabsLayouts component={Charts} />
    )
  }
}) 