<template>
  <el-form-item :label="props.title">
    <el-slider :show-input="showInput" :min="min" :max="max" v-model="valueModel"></el-slider>
  </el-form-item>
</template>

<script lang="ts" setup>
import {computed} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  value: {
    type: Number,
  },
  max: {
    type: Number,
    default: 100
  },
  min: {
    type: Number,
    default: 0
  },
  showInput: {
    type: Boolean,
    default: false,
  }
});

const emits = defineEmits(['update:value'])

const valueModel = computed({
  get: () => {
    return props.value
  },
  set: (value) => {
    emits('update:value', value)
  }
})


</script>

<style scoped>
.el-slider {
  padding-left: 8px;
  padding-right: 1.5rem;
}
</style>
