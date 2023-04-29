import {HostedMode} from "../../src";

test('add', () => {
    const isNormal = HostedMode.NORMAL & 0x0001;
    const isOverlap = HostedMode.OVERLAP & 0x0001;

    expect(isNormal > 0).toBe(true);
    expect(isOverlap > 0).toBe(false);
    expect((HostedMode.OVERLAP & 0x0010) > 0).toBe(true);
})
