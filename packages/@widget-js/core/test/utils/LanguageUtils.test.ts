import {getTextByLanguageCode} from "../../src/utils/LanguageUtils";
import {LanguageTextMap} from "../../src";

test('getTextByLangCode', () => {
  const title: LanguageTextMap = {
    'zh-CN': '标题',
    'en-US': 'title',
    'ja-JP': 'タイトル',
  }
  const obj = {title}

  const zh = getTextByLanguageCode(obj.title, 'zh-CN');
  expect(zh).toBe('标题');

  const en = getTextByLanguageCode(obj.title, 'en-US');
  expect(en).toBe('title');

  const jp = getTextByLanguageCode(obj.title, 'ja-JP');
  expect(jp).toBe("タイトル");

  const ru = getTextByLanguageCode(obj.title, 'ru-RU');
  expect(ru).toBe("标题");

})
