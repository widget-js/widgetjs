import EmojiTimeline from "../../../src/widgets/labor-progress/EmojiTimeline";
import dayjs from "dayjs";

test("isActivated", () => {
    const timeline = new EmojiTimeline({hour: 6, minute: 0}, {hour: 11, minute: 59}, "")
    const dayjs1 = dayjs().set("hour", 6).set("minute", 0).set("second", 0).set("millisecond", 0)
    const dayjs2 = dayjs().set("hour", 11).set("minute", 59).set("second", 0).set("millisecond", 0)
    const dayjs3 = dayjs().set("hour", 7).set("minute", 0).set("second", 0).set("millisecond", 0)
    const dayjs4 = dayjs().set("hour", 12).set("minute", 0).set("second", 0).set("millisecond", 0)
    const dayjs5 = dayjs().set("hour", 11).set("minute", 59).set("second", 59).set("millisecond", 999)

    console.info(dayjs1.format());
    console.info(dayjs2.format());
    console.info(dayjs3.format());
    console.info(dayjs4.format());
    console.info(dayjs5.format());

    expect(timeline.isActivated(dayjs1)).toBe(false)
    expect(timeline.isActivated(dayjs2)).toBe(true)
    expect(timeline.isActivated(dayjs3)).toBe(true)
    expect(timeline.isActivated(dayjs4)).toBe(false)
    expect(timeline.isActivated(dayjs5)).toBe(false)
})
