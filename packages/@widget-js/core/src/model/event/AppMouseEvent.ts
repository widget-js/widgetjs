export interface AppMouseEvent {
    handled: boolean;
    wheelScrolled: boolean;
    clicked: boolean;
    isMouseButtonDown: boolean;
    isMouseButtonUp: boolean;
    timestamp: number;
    button: number;
    clicks: number;
    x: number;
    y: number;
    delta: number;
    location: string;
}
