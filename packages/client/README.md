## 桌面组件

### 项目目录结构

```
widgets
├── packages                      //Electron相关代码
│   └── @widget                   //
│       ├── cli                   // CLI
│       ├── ui                    // UI包
│       └── core                  // 核心包
├── electron                      //Electron相关代码
├── src
│   ├── components                // 常用Vue组件
│   ├── views                     //
│   ├── database                  // 数据库相关
│   ├── widgets                   // 桌面组件文件
│   │   └── countdown             // 每个桌面组件一个文件夹
│   │       ├── XXWidget.vue      // 桌面组件
│   │       └── XXConfig.vue      // 桌面配置页面
│   └── index.ts
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

### 代码同步

```bash
git clone https://github.com/widget-js/core.git
#第一次获取子模块代码
git submodule update --init
#后续更新子模块
git submodule update --remote
```

### CLI

按提示创建组件

```
yarn run widget
```

执行后会自动生成以下文件：

```
/widgets/xxx/XxxWidget.vue
/widgets/xxx/XxxConfig.vue  // 如果组件可配置
```

和以下路由：

```
/widget/xxx
/widget/config/xxx // 如果组件可配置
```

### 命名规范

####

#### 组件路由规范

采用 <code>under_line</code> 下划线风格

```
/widget/组件名
/widget/config/hello_world
```

#### 文件夹

采用 <code>kebab-case</code> 风格

```
/hello
/hello-world
```

#### Vue组件

采用 <code>CamelCased</code> 大驼峰风格

```
/components/Hello.vue
/components/HelloWorld.vue
```

#### Typescript文件

普通文件:采用 <code>kebab-case</code> 风格

```
/hello.ts
/hello-world.ts
```

class类:采用 <code>CamelCased</code> 大驼峰风格

```
/Hello.ts
/HelloWorld.ts
```

### 项目部署

#### 依赖下载

```
// 下载依赖可能需要翻墙
yarn install
```

#### 单独启动Vue

```
yarn serve
```

#### 启动Electron版

```
yarn electron:serve
```

#### 项目主要依赖

[Element Plus](https://element-plus.gitee.io/zh-CN/component/button.html)
[MingCute图标库](https://www.mingcute.com/)
[DayJs时间解析](https://dayjs.fenxianglu.cn)
[lunar-typescrip日期转换](https://6tail.cn/calendar/api.html)

#### 注意事项

1. 禁止在Vue代码里使用node方法，例如fs
