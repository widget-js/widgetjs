<template>
  <div class="setting-section">
    <el-row justify="start" class="title">{{ title }}</el-row>
    <el-card shadow="hover" class="content">
      <slot></slot>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
  }
})
</script>

<style scoped lang="scss">
@import "@/assets/scss/theme.scss";

.setting-section {
  .title {
    @include title-medium-bold
  }
  .content{
    margin-top: 16px;
  }
}
</style>
