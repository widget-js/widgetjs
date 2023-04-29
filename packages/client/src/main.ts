import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/iconfont/iconfont.css'
import 'animate.css'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/loading.scss'
import '@widget-js/vue3/dist/style.css'
import '@widget-js/vue3/dist/mingcute_icon/Mingcute.css'
import { WidgetJsPlugin } from '@widget-js/vue3'
import '@icon-park/vue-next/styles/index.css'
const app = createApp(App)
app.use(WidgetJsPlugin).use(router).mount('#app')
app.config.warnHandler = () => null
app.config.compilerOptions.isCustomElement = (tag) => {
  console.log(tag)
  return tag.startsWith('webview')
}

// axios.defaults.cros=true
