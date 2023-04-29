<template>
  <div class="widget-frame" :style="{ ...sizeStyle, transform: `scale(${scale})` }">
    <webview
        :id="'webview' + id"
        :src="url"
        enableblinkfeatures="PreciseMemoryInfo, CSSVariables"
        disablewebsecurity
        ref="webview"
        v-if="preloadPath"
        :style="sizeStyle"
        :preload="preloadPath"
        :webpreferences="`backgroundThrottling=${backgroundThrottling}`"
    />
    <transition name="fade">
      <div v-if="loading" class="skeleton" :style="sizeStyle">
        <el-skeleton :rows="skeletonCount > 5 ? 5 : skeletonCount" animated/>
      </div>
    </transition>
    <div class="cover" ref="cover" @contextmenu.prevent="onWidgetCoverClicked" v-show="showCover"/>
  </div>
</template>

<script lang="ts">
import {nextTick, ref} from 'vue'
import {useEventBus} from '@vueuse/core'
import {AppEvent} from '@/common/AppEvent'
import {AppApi, ElectronUtils} from '@widget-js/core'
import {delay} from '@/utils/TimeUtils'
import {useWebview} from '@/composition/use-webview'

export default {
  name: 'WidgetFrame',
  props: {
    url: {
      type: String
    },
    id: {
      type: String,
      required: true
    },
    configurable: {
      type: Boolean,
      default: true
    },
    backgroundThrottling: {
      type: String,
      default: 'yes'
    },
    skeletonCount: {
      type: Number,
      default: 4
    },
    width: {
      type: Number
    },
    name: {
      type: String
    },
    height: {
      type: Number
    },
    showCover: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number,
      default: 1
    },
    muteAudio: {
      type: Boolean,
      default: false
    }
  },
  emits: ['context-menu'],
  setup(props, context) {
    const delayLoadURL = ref('')
    const webviewReady = ref(false)
    const webview = ref()
    const {loading, ready} = useWebview(webview)

    const bus = useEventBus<string>(AppEvent.CHANNEL_WIDGET)
    bus.on((payload: string) => {
      const event = JSON.parse(payload) as AppEvent
      if (event.type == AppEvent.TYPE_WIDGET_UPDATED) {
        if (event.payload.id == props.id || event.payload.name == props.name) {
          const webview = document.getElementById('webview' + props.id)
          // @ts-ignore
          webview.value?.reload()
        }
      }
    })
    const getWebview = () => {
      return document.getElementById('webview' + props.id)
    }
    const openDevTools = () => {
      //@ts-ignore
      webview.value?.openDevTools()
    }

    context.expose({
      openDevTools
    })
    const preloadPath = ref<string | undefined>()
    AppApi.getPreloadPath().then((path) => {
      preloadPath.value = path
    })
    return {
      loading,
      openDevTools,
      getWebview,
      preloadPath,
      webview,
      delayLoadURL,
      bus,
      webviewReady
    }
  },
  computed: {
    sizeStyle() {
      return {width: this.width + 'px', height: this.height + 'px'}
    }
  },
  watch: {},
  async mounted() {
    await nextTick()
  },
  methods: {
    onWidgetCoverClicked() {
      // this.openDevTools();
    }
  }
}
</script>

<style scoped lang="scss">
.widget-frame {
  position: relative;
  user-select: none;
  transition: all 0.2s ease-out;

  webview {
    transition-timing-function: ease-out;
    transition-duration: 0.2s;
    filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.2));
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .skeleton {
    position: absolute;
    width: 100%;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.35);
    top: 0;
    display: flex;
    padding: 16px;
    align-items: center;
    z-index: -1;
    justify-content: center;
    filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.2));
  }

  .cover {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
  }
}
</style>
