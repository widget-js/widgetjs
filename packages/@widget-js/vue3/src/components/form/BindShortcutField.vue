<template>
  <el-input @focus="onShortcutFocus" :disabled="disableShortcutInput"
            v-model="shortcutModel"
            :placeholder="placeholder">
  </el-input>
</template>

<script lang="ts" setup>
import {ElMessageBox} from "element-plus";
import {computed, ref} from "vue";
import {useMagicKeys} from "@vueuse/core";

const props = defineProps({
  shortcut: {
    type: String
  },
  placeholder: {
    type: String,
    default: "点击设置快捷键"
  }
});

const disableShortcutInput = ref(false);
const emits = defineEmits(["update:shortcut"]);

const shortcutModel = computed({
  get: () => {
    return props.shortcut;
  },
  set: (newValue) => {
    emits("update:shortcut", newValue);
  }
});

function onShortcutFocus() {
  disableShortcutInput.value = true;
  ElMessageBox.confirm('按Esc清除快捷键', "请输入快捷键", {
    closeOnPressEscape: false,
    showConfirmButton: false,
    confirmButtonText: "确定",
    cancelButtonText: "取消"
  })
      .then(() => {

      })
      .finally(() => {
        disableShortcutInput.value = false;
      })
      .catch(() => {
        // catch error
      })
}

useMagicKeys({
  onEventFired: (e) => {
    if (!disableShortcutInput.value) {
      return
    }

    if (e.type == 'keyup' && e.key) {
      console.log(e);
      if (e.key == "Unidentified") {
        return;
      }
      if (e.key == 'Escape') {
        shortcutModel.value = "";
        disableShortcutInput.value = false;
        ElMessageBox.close();
        return;
      }
      const notModifierKey = e.key != "Alt" && e.key != "Shift" && e.key != "Control";
      const withModifierKey = e.ctrlKey || e.altKey || e.shiftKey;
      if (notModifierKey && withModifierKey) {
        const arr: string[] = [];
        if (e.ctrlKey) {
          arr.push("Ctrl");
        }
        if (e.altKey) {
          arr.push("Alt");
        }
        if (e.shiftKey) {
          arr.push("Shift");
        }
        arr.push(e.key == " " ? "Space" : e.key.toUpperCase())
        shortcutModel.value = arr.join("+");
        disableShortcutInput.value = false;
        console.log("new shortcut", shortcutModel.value);
        ElMessageBox.close();
      }
    }
  },
})
</script>

<style scoped>

</style>
