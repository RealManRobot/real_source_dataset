/**
<!-- 淡入淡出 -->
<AniWrapper type="fade" mode="out-in" :appear="true" :duration="300" easing="ease">
  <div v-if="show">淡入淡出内容</div>
</AniWrapper>
<!-- 向上滑入 -->
<AniWrapper type="slide-up" mode="out-in" :appear="true" :duration="300" easing="ease">
  <div v-if="show">向上滑入内容</div>
</AniWrapper>
<!-- 向下滑入 -->
<AniWrapper type="slide-down" mode="out-in" :appear="true" :duration="300" easing="ease">
  <div v-if="show">向下滑入内容</div>
</AniWrapper>
<!-- 向左滑入 -->
<AniWrapper type="slide-left" mode="out-in" :appear="true" :duration="300" easing="ease">
  <div v-if="show">向左滑入内容</div>
</AniWrapper>
<!-- 向右滑入 -->
<AniWrapper type="slide-right" mode="out-in" :appear="true" :duration="300" easing="ease">
  <div v-if="show">向右滑入内容</div>
</AniWrapper>
<!-- 缩放 -->
<AniWrapper type="zoom" mode="out-in" :appear="true" :duration="300" easing="ease">
  <div v-if="show">缩放内容</div>
</AniWrapper>
 */
import { ref, computed  } from "vue"
export default function (props, emit) {
  const transitionName = computed(() => `transition-${props.type}`)

  return {
    transitionName,
    emit,
  }
}