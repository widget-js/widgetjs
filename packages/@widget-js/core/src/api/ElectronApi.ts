import {ElectronUtils} from "../utils/ElectronUtils";

export class ElectronApi {

    static async addIpcListener(key: String, f: Function) {
        await ElectronUtils.getAPI()?.addIpcListener(key, f);
    }

    static async removeIpcListener(key: String) {
        await ElectronUtils.getAPI()?.removeIpcListener(key);
    }

}
