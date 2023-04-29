<template>
  <el-form-item :label="title">
    <el-time-picker
        is-range
        v-model="valueModel"
        range-separator="-"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"/>
  </el-form-item>
</template>

<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
  name: "WidgetTimeRangeField",
  props: {
    title: {
      type: String,
      default: ""
    },
    startPlaceholder: {
      type: String,
      default: ""
    },
    endPlaceholder: {
      type: String,
      default: ""
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    }
  },
  emits: ['update:startTime', 'update:endTime'],
  computed: {
    valueModel: {
      get() {
        return [this.startTime, this.endTime]
      },
      set(value) {
        this.$emit('update:startTime', value[0])
        this.$emit('update:endTime', value[1])
      }
    }
  },
});
</script>

<style scoped>

</style>
