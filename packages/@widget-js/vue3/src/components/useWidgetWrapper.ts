import {BrowserWindowApi, BrowserWindowApiEvent, Channel, HostedWidgetApi, WidgetParams} from "@widget-js/core";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {TransitionPresets, useTransition, useWindowSize} from "@vueuse/core";
import {useIpcListener} from "@/composition/use-ipc";

export function useWidgetWrapper(props) {

  const wrapper = ref<HTMLElement>()
  const updateCssProperty = () => {
    wrapper.value?.style.setProperty('--padding', `${props.padding * 2}px`)
    wrapper.value?.style.setProperty('--shadowColor', props.shadowColor)
  }
  onMounted(async () => {
    await nextTick()
    updateCssProperty()
  })

  watch(() => props, (newVal) => {
    updateCssProperty()
  }, {deep: true})

  return {
    wrapper
  }
}

export function useOverlapWidgetWrapper() {
  const isAutoHide = ref<boolean>(false)
  const widgetY = ref(0)
  const {height} = useWindowSize();
  const isWidgetHide = computed(() => {
    return widgetY.value < -height.value + 24
  })

  onMounted(async () => {
    const widgetParams = WidgetParams.fromCurrentLocation();
    const hostedWidget = await HostedWidgetApi.getHostedWidget(widgetParams.id!);
    isAutoHide.value = hostedWidget.browserWindowStatus?.isAutoHide ?? false
    if (isAutoHide.value) {
      //启动时触发隐藏
      BrowserWindowApi.isFocused().then((isFocused) => {
        if (!isFocused) {
          hideWidget()
        }
      })
    }
  })

  const hideWidget = () => {
    widgetY.value = -height.value - 16
    BrowserWindowApi.setIgnoreMouseEvent(true)
  }

  const showWidget = () => {
    widgetY.value = 0
    BrowserWindowApi.setIgnoreMouseEvent(false)
  }

  const widgetYTransition = useTransition(widgetY, {
    duration: 300,
    transition: TransitionPresets.easeOutCubic,
    onFinished: () => {
    }
  })
  BrowserWindowApi.setIgnoreMouseEvent(false)
  useIpcListener(Channel.BROWSER_WINDOW, (...args) => {
    const type = args[0]
    if (type == BrowserWindowApiEvent.FOCUS) {
      showWidget()
    } else if (type == BrowserWindowApiEvent.BLUR) {
      if (isAutoHide.value) {
        hideWidget();
      }
    } else if (type == BrowserWindowApiEvent.CANCEL_SNAP_TO_EDGE) {
      showWidget()
      isAutoHide.value = false
    } else if (type == BrowserWindowApiEvent.SNAP_TO_EDGE) {
      isAutoHide.value = true
    }
  })
  return {
    widgetYTransition, isWidgetHide
  }
}
