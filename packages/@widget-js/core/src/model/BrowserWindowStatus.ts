
export default class BrowserWindowStatus {
    height: number;
    width: number;
    x?: number;
    y?: number;
    isAlwaysOnTop = false;
    isAutoHide = false;

    constructor(width: number, height: number) {
        this.height = height;
        this.width = width;
    }
}
