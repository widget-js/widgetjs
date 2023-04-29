import {ref, Ref, unref, watch} from 'vue'

export function useWebview(webviewRef: Ref): UseWebviewReturn {
    const loading = ref(true)
    const ready = ref(false)
    let listenerAdded = false
    const addListener = () => {
        if (listenerAdded) {
            return
        }
        const webview = unref(webviewRef)
        //@ts-ignore
        webview?.addEventListener('dom-ready', () => {
            console.log('dom-ready')
            //@ts-ignore
            ready.value = true
            loading.value = false
        })

        webview?.addEventListener('did-fail-load', () => {
            console.log('did-fail-load')
            //@ts-ignore
            loading.value = false
        })

        webview?.addEventListener('did-stop-loading', () => {
            loading.value = false
        })

        webview?.addEventListener('did-start-loading', () => {
            console.log('did-start-loading')
            loading.value = true
        })
        listenerAdded = true
    }
    if (webviewRef.value) {
        addListener()
    } else {
        watch(webviewRef, (newValue) => {
            if (newValue) {
                addListener()
            }
        })
    }
    return {
        loading,
        ready
    }
}

interface UseWebviewReturn {
    loading: Ref<boolean>
    ready: Ref<boolean>
}
