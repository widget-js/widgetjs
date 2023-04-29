<template>
  <el-form-item :label="props.title">
    <el-checkbox  v-model="checkedModel"/>
  </el-form-item>
</template>

<script lang="ts" setup>
import {computed} from "vue";
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  checked: {
    type: Boolean,
  },
});

const emits = defineEmits(['update:checked'])

const checkedModel = computed({
  get: () => {
    return props.checked
  },
  set: (value) => {
    emits('update:checked', value)
  }
})


</script>

<style scoped>

</style>
