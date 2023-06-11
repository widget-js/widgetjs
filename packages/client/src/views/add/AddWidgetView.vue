<template>
  <widget-base-dialog title="添加组件">
    <template #main>
      <el-row justify="center">
        <el-input size="large"
                  v-model="keyword"
                  class="round-border"
                  placeholder="请输入关键词"
        >
          <template v-slot:prefix>
            <span class="icon mgc_search_line" style="padding-left: 16px"></span>
          </template>
        </el-input>
      </el-row>
      <el-scrollbar height="620px" v-loading="loading" style="margin-top: 16px">
        <el-row justify="start">
          <template v-for="item in widgetsRef">
            <el-col :span="12">
              <div class="grid-content ep-bg-purple"/>
              <search-item :widget="item" :widget-package="widgetPackages.get(item.packageName)"></search-item>
            </el-col>
          </template>
        </el-row>
      </el-scrollbar>
    </template>
  </widget-base-dialog>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, reactive, ref} from "vue";
import SearchItem from "@/views/add/SearchItem.vue";
import {Widget, WidgetApi, WidgetPackage} from "@widget-js/core";

const selectedTag = ref("")
const keyword = ref("")
const resultList = ref(null)
const widgetsRef = ref<Array<Widget>>()
const map = new Map<string, WidgetPackage>()
const widgetPackages = reactive(map);
const loading = ref(true)

WidgetApi.getWidgetPackages().then((packages) => {
  for (let key in packages) {
    const widgetPackage = WidgetPackage.parseObject(packages[key]);
    widgetPackages.set(widgetPackage.name, widgetPackage);
  }
  WidgetApi.getWidgets().then((widgets) => {
    const newWidget: Array<Widget> = [];
    for (let widget of widgets) {
      if (widgetPackages.has(widget.packageName ?? "")) {
        if (widget.name == 'cn.widgetjs.widgets.dynamic_island') {
          continue
        }
        newWidget.push(widget);
      } else {
        console.error(`${widget.name}'s package not exists:${widget.packageName}`)
      }
    }
    widgetsRef.value = newWidget;
    console.log(newWidget);
    loading.value = false;
  });
})
onMounted(async () => {
  await nextTick();
  document.title = "添加组件"
})
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.dialog-wrapper {
  .main {
    background-color: $fill-color-default;
  }
}

.footer:not(*) {
  padding: 0;
}

.el-col:nth-child(odd) {
  padding-right: 10px;
}

.el-col:nth-child(even) {
  padding-left: 10px;
}

</style>
