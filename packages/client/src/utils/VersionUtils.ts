import axios from "axios";
import {AppVersion} from "@/model/AppVersion";
import semver from "semver";
import {AppApi} from "@widget-js/core";

export default class VersionUtils {
    static checkNewVersion(onNewVersion: (version: AppVersion) => void, onError?: (error) => void, onFinally?: () => void) {
        axios.get("https://widget-fun.oss-cn-hangzhou.aliyuncs.com/version/version.json")
            .then(async (response) => {
                // handle success
                if (response.status == 200) {
                    let data = response.data as AppVersion;
                    const currentVersion = await AppApi.getVersion();
                    console.info("current:", currentVersion,"server:", data.version)
                    if (semver.gt(data.version, currentVersion)) {
                        console.info("New version detected:", data.version);
                        console.info("Download Link:", data.downloadLink);
                        onNewVersion(data)
                    }
                }
            })
            .catch((error) => {
                onError?.(error)
            })
            .finally(() => {
                onFinally?.();
            });
    }
}
