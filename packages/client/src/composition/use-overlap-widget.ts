import {useWindowSize} from '@vueuse/core'
import {computed, ComputedRef, Ref, ref, watch} from 'vue'
import {
    AppApi,
    BroadcastEvent,
    BrowserWindowApi,
    Channel,
    ElectronUtils,
    HostedMode,
    HostedWidget,
    HostedWidgetApi,
    UrlUtils,
    Widget,
    WidgetApi, WidgetApiEvent,
    WidgetPackage,
    WidgetParams
} from '@widget-js/core'
import {useAppBroadcast, useIpcListener} from '@widget-js/vue3'
import {useRoute} from 'vue-router'

export function useOverlapWidget(option: UseOverlapWidgetOption): UseOverlapWidgetReturn {
    const padding = 8
    const extraHeight = 0
    const isFocused = ref(true)
    const refreshKey = ref(new Date().toISOString())
    let router = useRoute()
    const preloadPath = ref<string | undefined>()
    AppApi.getPreloadPath().then((result) => {
        preloadPath.value = result
    })

    const widgetId = router.query.id as string
    const widgetName = router.query.name as string
    const packageName = router.query.package as string
    const isAutoHide = ref(false)
    const isAlwaysOnTop = ref(false)
    const widgetPackage = ref<WidgetPackage>()
    const widget = ref<Widget | undefined>(undefined)
    const hostedWidget = ref<HostedWidget>()
    const {width: windowWidth, height: windowHeight} = useWindowSize({includeScrollbar: false})

    const widgetWidth = computed(() => {
        return windowWidth.value - padding * 2
    })

    const widgetHeight = computed(() => {
        return windowHeight.value - padding * 2 - extraHeight
    })
    const refresh = () => {
        widgetUrl.value = getWidgetUrl()
        refreshKey.value = new Date().toISOString()
    }

    WidgetApi.getWidget(widgetName as string).then((dbWidget: Widget) => {
        widget.value = dbWidget
        console.log(JSON.stringify(widget.value))
    })

    WidgetApi.getWidgetPackage(packageName as string).then((dbPackage: WidgetPackage) => {
        widgetPackage.value = dbPackage
    })
    HostedWidgetApi.getHostedWidget(widgetId).then((result: HostedWidget) => {
        hostedWidget.value = result
        isAutoHide.value = result.browserWindowStatus?.isAutoHide ?? false
        isAlwaysOnTop.value = result.browserWindowStatus?.isAlwaysOnTop ?? false
    })
    const widgetUrl = ref('')
    const dataLoaded = computed(() => {
        return widget.value != null && widgetPackage.value != null
    })
    watch(dataLoaded, (newValue) => {
        if (newValue) {
            widgetUrl.value = getWidgetUrl()
        }
    })
    const getWidgetUrl = () => {
        return UrlUtils.getWidgetUrl(
            widget.value!.getIndexRoute().url,
            widgetPackage.value!,
            getWidgetParams()
        )
    }

    const showConfigRoute = async () => {
        const url = await WidgetApi.getWidgetConfigUrl(widgetName, getWidgetParams())
        if (url) {
            await BrowserWindowApi.openUrl(url)
        }
    }
    const getWidgetParams = () => {
        const widgetParams = new WidgetParams()
        widgetParams.id = widgetId
        widgetParams.widthPx = widgetWidth.value
        widgetParams.heightPx = widgetHeight.value
        widgetParams.mode = HostedMode.OVERLAP
        widgetParams.name = widget.value!.name
        return widgetParams
    }

    useAppBroadcast([WidgetApiEvent.DATA_CHANGED, 'hide-overlap'], (event: BroadcastEvent) => {
        if (event.event == WidgetApiEvent.DATA_CHANGED) {
            if (event.payload.name == widgetName) {
                option.onRefresh?.()
            }
        } else if (event.event == 'hide-overlap') {
            if (event.payload == widgetId) {
                option.onHideOverlap?.()
            }
        }
    })

    useIpcListener(Channel.BROWSER_WINDOW, async (args) => {
        const event = args[0]
        console.log('ipc event:', event)

        if (event == 'blur') {
            option.onBlur?.()
        } else if (event == 'focus') {
            isFocused.value = true
            console.log('focus')
            // this.showWidget();
        } else if (event == 'resized') {
            refresh()
        } else if (event == 'setAutoHide') {
            isAutoHide.value = args[1]
        } else if (event == 'refresh') {
            option.onResized?.()
            refresh()
        } else if (event == 'settings') {
            const widgetConfigUrl = await WidgetApi.getWidgetConfigUrl(
                widget.value!.name,
                getWidgetParams()
            )
            await BrowserWindowApi.openUrl(widgetConfigUrl!)
        } else if (event == 'close') {
            await HostedWidgetApi.removeHostedWidget(this.id)
        }
    })

    const widgetSizeStyle = computed(() => {
        return {width: `${widgetWidth.value}px`, height: `${widgetHeight.value}px`}
    })
    return {
        widgetWidth,
        widgetHeight,
        windowWidth,
        windowHeight,
        isFocused,
        isAutoHide,
        refreshKey,
        widgetUrl,
        widgetName,
        widgetId,
        dataLoaded,
        widget,
        preloadPath,
        isAlwaysOnTop,
        widgetSizeStyle,
        methods: {
            showConfigRoute,
            refresh
        }
    }
}

export interface UseOverlapWidgetOption {
    onHideOverlap?: () => void
    onRefresh?: () => void
    onBlur?: () => void
    onResized?: () => void
}

export interface UseOverlapWidgetReturn {
    widgetWidth: ComputedRef<number>
    widgetHeight: ComputedRef<number>
    widget: Ref<Widget | undefined>
    dataLoaded: ComputedRef<boolean>
    windowWidth: Ref<number>
    windowHeight: Ref<number>
    isFocused: Ref<boolean>
    isAutoHide: Ref<boolean>
    isAlwaysOnTop: Ref<boolean>
    refreshKey: Ref<string>
    widgetUrl: Ref<string>
    widgetName: string
    widgetId: string
    preloadPath: Ref<string | undefined>
    methods: {
        showConfigRoute: () => void
        refresh: () => void
    }
    widgetSizeStyle: ComputedRef<{ width: string; height: string }>
}
