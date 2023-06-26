import {HostedMode} from "../HostedMode";

export interface IHostedWidget {
    hostedMode: HostedMode;
    x: number;
    y: number;
    id: string;


    getWidgetName(): string;

    getWidth(): number;

    getHeight(): number;


    getWidgetPackageName(): string;


    getTitle(): string;

    getUrl(): string;


}

