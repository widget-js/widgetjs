import {WidgetApiEvent} from "../../api/WidgetApi";
import {AppApiEvent} from "../../api/AppApi";

interface BroadcastEventOptions {
  event: WidgetApiEvent | AppApiEvent | string
  /**
   * 发送人，用于标记发送源，一般为组件名，如：com.example.widgets.countdown
   */
  sender?: string
  /**
   * 广播事件携带的数据，只支持部分数据类型。
   * 情见：https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
   */
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
