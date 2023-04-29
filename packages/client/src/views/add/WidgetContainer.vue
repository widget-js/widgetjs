<template>
  <div ref="widget-container" :style="{
                  transform:`scale(${scale})`,
                  height: `${containerHeight}px`,
                  }"
       class="widget-container">
    <img :class="{'preview-image':true,scaled:scale<1}" :src="previewImage" alt="" v-if="!!widget.previewImage"
         :height="widgetHeight"
         :width="widgetWidth">
    <widget-frame v-else :url="WidgetUtil.buildPreviewWidgetUrl(widget,widgetPackage,widgetWidth,widgetHeight)"
                  :id="widget.name"
                  :width="widgetWidth"
                  :skeleton-count="widget.height"
                  :mute-audio="true"
                  :show-cover="true"
                  :height="widgetHeight"/>
  </div>
</template>

<script lang="ts" setup>
import WidgetUtil from "@/utils/WidgetUtil";
import {Widget, WidgetApi, WidgetPackage} from "@widget-js/core"
import WidgetFrame from "@/components/WidgetFrame.vue";
import {nextTick, onMounted, ref} from "vue";

const props = defineProps({
  widget: {
    type: Widget,
    required: true
  },
  widgetPackage: {
    type: WidgetPackage,
    required: true
  }
})
const previewImage = ref("")
console.log(JSON.stringify(props.widget))

if (props.widget.previewImage) {
  WidgetApi.getWidgetPackageUrl(props.widget.packageName!).then((url) => {
    previewImage.value = url + props.widget.previewImage!;
  })
}
const cellSize = 72;
const containerWidth = cellSize * 4
const containerHeight = cellSize * 2
let scale = 1.0;
console.info(`${props.widget.name},w-${props.widget.width},h-${props.widget?.height}`)

if (props.widget.width > 2 || props.widget.width > 2) {
  if (props.widget.width > props.widget?.height) {
    console.info("props.widget:", props.widget.width)
    if (props.widget.width > 4) {
      scale = 4 / props.widget.width;
    } else if (props.widget?.height > 2) {
      scale = 2 / props.widget?.height;
    }
  } else {
    console.info("props.widget:", props.widget?.height)
    scale = 2 / props.widget?.height;
  }
}

console.info("Scale:", scale)
const widgetWidth = cellSize * props.widget?.width;
const widgetHeight = cellSize * props.widget?.height;

onMounted(async () => {
  await nextTick();
})
</script>

<style scoped lang="scss">
.widget-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  display: flex;
  height: 36px;
  align-items: center;
}

.preview-image {
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.2));
}


iframe {
  transform: scale(1);
  transition-timing-function: ease-out;
  transition-duration: 0.2s;
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.2));

  &.editing {
    transform: scale(0.9);
  }
}

.toolbox {
  position: absolute;
  right: 0;
  top: 0;

  .el-button.is-circle {
    border-radius: 50%;
    padding: 8px;
    border-color: white;
    border-width: 2px;
    width: 32px;
    height: 32px;
  }

  .mgc_delete_line {
    &::before {
      color: white;
    }
  }

  .mgc_edit_2_fill {
    &::before {
      color: white;
    }
  }

  .mgc_edit_2_line {
    &::before {
      color: white;
    }
  }

  .mgc_delete_fill {
    &::before {
      color: white;
    }
  }

  .mgc_close_line {
    &::before {
      color: white;
    }
  }
}
</style>
