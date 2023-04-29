import {ApiConstants, AppApi} from "@widget-js/core";
import {onMounted, ref, watch} from "vue";

export function useDebugConfig() {
    const debugMode = ref(false);
    onMounted(async () => {
        debugMode.value = await AppApi.getConfig(ApiConstants.CONFIG_DEBUG_MODE, false) as boolean;
        watch(debugMode, async (newValue) => {
            await AppApi.setConfig(ApiConstants.CONFIG_DEBUG_MODE, newValue);
        });
    });

    return debugMode;
}

export function useGridSizeConfig() {
    const gridSize = ref(70);
    onMounted(async () => {
        gridSize.value = await AppApi.getConfig(ApiConstants.CONFIG_GRID_SIZE, 70) as number;
        watch(gridSize, async (newValue) => {
            await AppApi.setConfig(ApiConstants.CONFIG_GRID_SIZE, newValue);
        });
    });

    return gridSize;
}
