<template>
  <el-form-item :label="props.title">
    <div class="colors">
      <el-color-picker v-model="colorModel" show-alpha :predefine="predefineColors"/>
      <div class="color" v-for="item in predefineColors" :style="{backgroundColor:item}" @click="colorClick(item)">
      </div>
    </div>
  </el-form-item>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
const predefineColors = ref([
  '#FFFFFF',
  '#909399',
  '#000000',
  '#e53935',
  '#fb8c00',
  '#fdd835',
  '#43a047',
  '#039be5',
  '#3949ab',
  '#8e24aa',
]);

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: "#fff"
  }
});

const emits = defineEmits(['update:color'])
const colorClick = (color: string) => {
  colorModel.value = color;
}
const colorModel = computed({
  get: () => {
    return props.color
  },
  set: (value) => {
    emits('update:color', value)
  }
})

</script>

<style scoped lang="scss">
@use "sass:map";
@import "../../scss/theme.scss";

.colors {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;

  .color {
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin-left: 12px;
    border-radius: 12px;
    border: 1px solid map.get($border-color, '');
  }
}
</style>
