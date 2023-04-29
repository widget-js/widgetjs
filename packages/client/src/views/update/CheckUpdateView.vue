<template>
  <div class="check-update">
    <widget-base-dialog title="检测更新">
      <template #main>
        <div v-loading="loading" element-loading-background="transparent">
        </div>
        <el-row justify="center">
          <el-col :span="24" v-if="error">{{ error }}</el-col>
          <template v-else>
            <el-col :span="24" v-if="!loading&&!hasNewVersion">已是最新版</el-col>
            <el-col :span="24" v-else-if="hasNewVersion" style="text-align: start">
              <h4>检测到新版本: {{ appVersion.version }}</h4>
              <pre style="font-size: 1rem">{{ appVersion.releaseNote }}</pre>
            </el-col>
          </template>
        </el-row>
      </template>
      <template v-if="hasNewVersion" #footer>
        <el-divider/>
        <el-row justify="end" class="footer">
          <el-button @click="cancel">忽略</el-button>
          <el-button type="primary" @click="upgrade">
            更新
          </el-button>
        </el-row>
      </template>
    </widget-base-dialog>
  </div>
</template>

<script lang="ts">
import {ref} from "vue";
import {ElectronUtils} from "@widget-js/core";
import {AppVersion} from "@/model/AppVersion";
import VersionUtils from "@/utils/VersionUtils";
import {WidgetBaseDialog} from "@widget-js/vue3";
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "CheckUpdateView",
  components: {WidgetBaseDialog},
  setup() {
    const loading = ref(true);
    const hasNewVersion = ref(false);
    const error = ref(null);
    const appVersion = ref<AppVersion>();
    return {loading, appVersion, hasNewVersion, error,}
  },
  mounted() {
    document.title = "检测更新"
    if (this.appVersion == null) {
      this.checkNewVersion();
    } else {
      this.loading = false;
    }
  },
  computed: {
    hasNewVersion() {
      return this.error == null && !this.loading && this.appVersion != null;
    }
  },
  methods: {
    cancel() {
      if (this.appVersion) {
        localStorage.setItem("ignore-version", this.appVersion.version);
      }
      window.close();
    },
    async upgrade() {
      this.loading = true;
      await ElectronUtils.getAPI().invoke("upgradeApp", JSON.stringify(this.appVersion));
      this.loading = false;
    },
    checkNewVersion() {
      VersionUtils.checkNewVersion((version: AppVersion) => {
        this.appVersion = version;
      }, (error) => {
        this.error = error
        console.log(error)
      }, () => {
        this.loading = false
      });
    }
  }

}
</script>

<style scoped lang="scss">
.check-update {

  .el-loading-parent--relative {
    min-height: 64px;
  }

  .footer {
    padding: 0 16px 16px 16px;
  }
}
</style>
