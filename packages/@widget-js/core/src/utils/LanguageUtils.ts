import {LanguageCode, LanguageTextMap} from "../lang/LanguageCode";

/**
 * 根据语言环境获取文本
 * @param obj       对象
 * @param key       属性名
 * @param {LanguageCode} langCode  语言环境 例如：zh-CN，en-US
 */
export function getTextByLanguageCode(obj: LanguageTextMap, langCode?: LanguageCode): string | undefined {
  let result: string | undefined;
  if (langCode) {
    if (langCode in obj) {
      return obj[langCode]
    }
  }
  // fallback to browser default language
  if (result == undefined) {
    if (typeof navigator != 'undefined' && navigator.languages) {
      for (let language of navigator.languages) {
        const langCode = language as LanguageCode;
        result = getTextByLanguageCode(obj, langCode);
        if (result != undefined) {
          return result;
        }
      }
    }
  }

  // fallback to first language
  if (result == undefined) {
    let langCode = Object.keys(obj);
    if (langCode.length > 0) {
      return obj[langCode[0] as LanguageCode];
    }
  }

  return undefined;
}
