<template>
  <OverlapWrapper
      ref="overlapWrapper"
      v-if="dataLoaded"
      :is-auto-hide="isAutoHide"
      :loading="loading"
      v-model:is-always-on-top="isAlwaysOnTop"
      v-model:is-focused="isFocused"
      @refresh="methods.refresh"
      :skeleton-count="widget.height ?? 3">
    <webview
        :src="widgetUrl"
        ref="webview"
        enableblinkfeatures="PreciseMemoryInfo, CSSVariables"
        disablewebsecurity
        :key="refreshKey"
        v-if="preloadPath"
        :preload="preloadPath"
        :webpreferences="`backgroundThrottling=${widget.backgroundThrottling}`"
    />
    <template #actions>
      <SettingTwo
          v-if="widget.isConfigurable()"
          class="icon"
          @click="methods.showConfigRoute"
          theme="outline"
          size="12"
          fill="#fff"
      />
    </template>
  </OverlapWrapper>
</template>

<script lang="ts">
import {ref, watch} from 'vue'
import {useOverlapWidget} from '@/composition/use-overlap-widget'
import {useWebview} from '@/composition/use-webview'
import OverlapWrapper from '@/views/overlap/OverlapWrapper.vue'
import {SettingTwo} from '@icon-park/vue-next'

export default {
  name: 'OverlapView',
  components: {OverlapWrapper, SettingTwo},
  setup() {
    const overlapWrapper = ref()

    const webview = ref()
    const {loading, ready} = useWebview(webview)
    const {
      dataLoaded,
      refreshKey,
      isAutoHide,
      preloadPath,
      widget,
      isFocused,
      isAlwaysOnTop,
      widgetUrl,
      methods,
      widgetSizeStyle
    } = useOverlapWidget({
      onBlur: () => {
        isFocused.value = false
        if (isAutoHide.value) {
          overlapWrapper.value?.hideWidget()
        }
      }
    })

    return {
      webview,
      overlapWrapper,
      loading,
      dataLoaded,
      refreshKey,
      isAutoHide,
      preloadPath,
      widget,
      isFocused,
      isAlwaysOnTop,
      widgetUrl,
      methods,
      widgetSizeStyle
    }
  }
}
</script>

<style lang="scss" scoped>
webview {
  position: absolute;
  inset: 0;
  transition-timing-function: ease-out;
  transition-duration: 0.2s;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.2));
}

.icon {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  cursor: pointer;
  padding: 4px;
  z-index: 1;
}
</style>
