import {WidgetApiEvent} from "../../api/WidgetApi";
import {AppApiEvent} from "../../api/AppApi";

interface BroadcastEventOptions {
  event: WidgetApiEvent | AppApiEvent | string
  /**
   * 发送人，用于标记发送源，一般为组件名，如：com.example.widgets.countdown
   */
  sender?: string
  payload?: any
}

export class BroadcastEvent {
  readonly event: string
  readonly sender?: string
  payload?: any

  constructor(options: BroadcastEventOptions) {
    this.event = options.event;
    this.sender = options.sender;
    this.payload = options.payload;
  }

}
