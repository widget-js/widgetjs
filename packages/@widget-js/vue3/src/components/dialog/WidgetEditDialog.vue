<template>
  <widget-base-dialog class="widget-edit-dialog" :title="option.title??widgetParams.title??'设置'">
    <template v-slot:main>
      <el-row justify="center" v-if="option.preview">
        <widget-fit-box class="widget-wrapper" :width="option.previewWidth" :height="option.previewHeight"
                        :widget-width="widgetParams.widthPx"
                        :widget-height="widgetParams.heightPx">
          <slot name="widget">
          </slot>
        </widget-fit-box>
      </el-row>
      <el-row justify="start">
        <el-col :span="24">
          <el-tabs v-model="activeName">
            <el-tab-pane label="组件设置" v-if="option.custom" name="custom">
              <slot name="form">
              </slot>
            </el-tab-pane>
            <el-tab-pane label="背景设置" name="background" v-if="option.isSupportBackgroundSetting()">
              <el-form>
                <widget-color-field v-if="option.backgroundColor" v-model:color="widgetData.backgroundColor"
                                    title="背景颜色"/>
                <widget-slider-field v-if="option.borderRadius" v-model:value="widgetData.borderRadius" :max="50"
                                     title="背景圆角"/>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="文字设置" name="third" v-if="option.isSupportTextSetting()">
              <el-form>
                <widget-color-field v-if="option.color" v-model:color="widgetData.color"
                                    title="文字颜色"/>
                <widget-slider-field v-if="option.fontSize" v-model:value="widgetData.fontSize" :max="50"
                                     title="文字大小"/>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-col>

      </el-row>
    </template>
    <template v-slot:footer>
      <el-divider/>
      <el-row justify="end" class="footer">
        <el-button style="margin-right: auto" @click="onCancelClick()">取消</el-button>
        <el-button type="info" @click="onApplyClick()">应用</el-button>
        <el-button type="primary" @click="onConfirmClick()">
          保存
        </el-button>
      </el-row>
    </template>
  </widget-base-dialog>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from "vue";
import WidgetColorField from "@/components/form/WidgetColorField.vue";
import {WidgetData, WidgetParams} from "@widget-js/core";
import WidgetDialogTitleBar from "@/components/dialog/WidgetDialogTitleBar.vue";
import WidgetSliderField from "@/components/form/WidgetSliderField.vue";
import {WidgetConfigOption} from "@/model/WidgetConfigOption";
import WidgetFitBox from "@/components/WidgetFitBox.vue";
import WidgetBaseDialog from "@/components/dialog/WidgetBaseDialog.vue";

export default defineComponent({
    name: "WidgetEditDialog",
    components: {WidgetBaseDialog, WidgetFitBox, WidgetSliderField, WidgetDialogTitleBar, WidgetColorField},
    setup: (props) => {
      const activeName = ref('custom');
      const backgroundColor = ref("white")
      const borderRadius = ref(22)
      if (!props.option.custom) {
        if (props.option.isSupportBackgroundSetting()) {
          activeName.value = "background"
        }
      }
      return {activeName, backgroundColor, borderRadius}
    },
    props: {
      widgetData: {
        type: Object as PropType<WidgetData>,
        required: true,
      },
      labelWidth: {
        type: String
      },
      widgetParams: {
        type: WidgetParams,
        required: true,
      },
      option: {
        type: WidgetConfigOption,
        required: true,
      }
    },
    emits: ["confirm", "cancel", "apply"],
    methods: {
      onCancelClick() {
        this.$emit("cancel")
        window.close();
      },
      onApplyClick() {
        this.$emit("apply")
      },
      onConfirmClick() {
        this.$emit("confirm")
      }
    }
  }
);

</script>

<style scoped lang="scss">
@import "@/scss/theme.scss";

.widget-edit-dialog {

  .el-divider--horizontal {
    margin: 0 0 12px 0;
  }

  .widget-wrapper {
    padding: 16px;
    filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.2));
  }

  .form {
    width: 100%;
  }

  .footer {
    padding: 0 16px 16px 16px;
  }
}


</style>
