import {defineComponent, PropType, ref} from 'vue';
import {useTags} from '../useTags';
import s from './Tags.module.scss';
import {http} from '../HttpClient';
import {Icon} from '../Icon/Icon';
import {Button} from '../Button/Button';
import {RouterLink, useRouter} from 'vue-router';

export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true
    },
    selected: Number
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    const {tags, hasMore, page, fetchTags} = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: props.kind,
        page: (page + 1).toString(),
        _mock: 'tagIndex'
      },{_loading:true});
    });
    const router = useRouter();
    const timer = ref<number>();
    const currentTag = ref<HTMLDivElement>();
    const onTouchStart = (e: TouchEvent, tag: Tag) => {
      currentTag.value = e.currentTarget as HTMLDivElement;
      timer.value = setTimeout(async () => {
        await router.push(`/tags/${tag.id}/edit?kind=${props.kind}&return_to=${router.currentRoute.value.fullPath}`);
        //触发长按
      }, 500);
    };
    const onTouchEnd = () => {
      clearTimeout(timer.value);
    };
    const onTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      if (currentTag.value !== pointedElement && currentTag.value?.contains(pointedElement) === false) {
        clearTimeout(timer.value);
      }
    };
    const onSelect = (tag: Tag) => {
      context.emit('update:selected', tag.id);
    };
    return () => <>
      <div class={s.tags_wrapper} onTouchmove={onTouchMove}>
        <RouterLink to={`/tags/create?kind=${props.kind}`}>
          <div class={s.tag}>
            <div class={s.sign}>
              <Icon name="add" class={s.createTag}/>
            </div>
            <div class={s.name}>
              新增
            </div>
          </div>
        </RouterLink>
        {tags.value.map(tag =>
          <div class={[s.tag, props.selected === tag.id ? s.selected : '']}
               onClick={() => onSelect(tag)}
               onTouchstart={(e) => onTouchStart(e, tag)}
               onTouchend={onTouchEnd}
          >
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
          <Button class={s.loadMore} onClick={fetchTags}>加载更多</Button> :
          <span class={s.noMore}>没有更多</span>
        }
      </div>
    </>;
  }
});
