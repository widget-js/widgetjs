import {LanguageCode, LanguageTextMap} from "../lang/LanguageCode";

/**
 * 根据语言环境获取文本
 * @param langMap       对象
 * @param {LanguageCode} langCode  语言环境 例如：zh-CN，en-US
 * @param fallbackToBrowser
 */
export function getTextByLanguageCode(langMap: LanguageTextMap, langCode?: LanguageCode, fallbackToBrowser: boolean = true): string | undefined {
  let result: string | undefined;
  if (langCode) {
    if (langCode in langMap) {
      return langMap[langCode]
    }
  }
  // fallback to browser default language
  if (result == undefined && fallbackToBrowser) {
    if (typeof navigator != 'undefined' && navigator.languages) {
      const langCode = navigator.language as LanguageCode;
      result = getTextByLanguageCode(langMap, langCode, false);
      if (result != undefined) {
        return result;
      }
    }
  }

  // fallback to first language
  if (result == undefined) {
    let langCode = Object.keys(langMap);
    if (langCode.length > 0) {
      return langMap[langCode[0] as LanguageCode];
    }
  }

  return undefined;
}
