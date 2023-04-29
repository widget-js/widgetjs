import { HostedMode, Widget, WidgetKeyword } from '@widget-js/core'

const name = 'cn.widgetjs.widgets.chatgpt_search'
//组件标题
const title = { zh: 'ChatGPT搜索' }
//组件描述
const description = { zh: '一个集成AI、简单的搜索框' }
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND]
//组件路由地址
const url = '/widget/chatgpt_search'
//配置页路由地址
const configUrl = '/widget/config/chatgpt_search'
//组件关键词
const ChatgptSearchWidgetDefine = new Widget({
  name: name,
  title: title,
  description: description,
  keywords: keywords,
  lang: 'zh',
  shortcut: 'Ctrl+Shift+S',
  width: 8,
  height: 8,
  minWidth: 5,
  maxWidth: 12,
  minHeight: 5,
  previewImage: '/chatgpt.png',
  maxHeight: 15,
  supportHostedMode: HostedMode.OVERLAP,
  backgroundThrottling: false,
  routes: [
    {
      name: 'index',
      url,
      meta: {
        backgroundColor: 'white'
      },
      customOverlapView: true
    },
    {
      name: 'config',
      url: configUrl
    }
  ]
})

export default ChatgptSearchWidgetDefine
