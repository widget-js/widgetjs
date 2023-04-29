<template>
  <el-row justify="space-evenly" align="middle" class="title-bar" v-drag-window-directive>
    <div class="title" v-drag-window-directive>{{ title }}</div>
    <div class="actions">
      <el-button type="danger" circle size="small" @click="onCloseClick">
        <span class="icon mgc_close_line"/>
      </el-button>
    </div>
  </el-row>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import DragWindowDirective from "@/directive/drag-window-directive";

export default defineComponent(
    {
      props: {
        title: {
          type: String
        }
      },
      methods: {
        onCloseClick() {
          window.close()
        }
      },
      directives: {
        DragWindowDirective
      }
    }
)</script>

<style scoped lang="scss">
@import "@/scss/theme.scss";

.title-bar {
  height: 42px;
  background: linear-gradient(180deg, #409EFF 0%, #409EFF 100%);
  box-shadow: inset 1px 1px 1px 0 rgba(255, 255, 255, 0.25);
  border-radius: $border-radius-base $border-radius-base 0 0;

  .title {
    font-size: 1rem;
    font-weight: 400;
    color: #FFFFFF;
    user-select: none;
  }

  .actions {
    position: absolute;
    right: 1rem;
  }

  .icon::before {
    color: white;
  }
}

.close {
  width: 16px;
  height: 16px;
  opacity: 1;
}
</style>
