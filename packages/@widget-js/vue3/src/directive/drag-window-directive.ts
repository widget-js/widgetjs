import {BrowserWindowApi} from "@widget-js/core";

const DragWindowDirective = {
    mounted(el: HTMLElement, binding, vnode, prevVnode) {
        el.addEventListener('mousedown', (e: MouseEvent) => {
                if (e.target == el) {
                    BrowserWindowApi.startDraggingWindow();
                }
            }
        )
        el.addEventListener('mouseup', (e: MouseEvent) => {
                if (e.target == el) {
                    BrowserWindowApi.stopDraggingWindow();
                }
            }
        )
    },
    unmounted(el: HTMLElement, binding, vnode, prevVnode) {
    }
}
export default DragWindowDirective;
