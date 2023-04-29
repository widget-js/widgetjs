import {HostedMode} from "./HostedMode";
import BrowserWindowStatus from "./BrowserWindowStatus";

export class HostedWidget {
    id!: string;
    widgetName!: string
    packageName!: string
    hostedMode!: number
    x: number = 0
    y: number = 0;
    browserWindowStatus?: BrowserWindowStatus;
    shortcut?: string;
    proxy?: string;

    isOverlap(): boolean {
        return (this.hostedMode & HostedMode.OVERLAP) > 0
    }
}
