<template>
  <widget-base-dialog title="启动中">
    <template #main>
      <div class="loading" v-loading="true" element-loading-background="transparent"/>
    </template>
  </widget-base-dialog>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.loading {
  height: 100px;
}
</style>
