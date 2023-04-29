interface Language {
  locale: string
  language: string
  code: string
}

interface ILanguageMap {
  'ar-SA': Language
  'bn-BD': Language
  'en-US': Language
  'de-DE': Language
  'el-GR': Language
  'es-ES': Language
  'fi-FI': Language
  'fil-PH': Language
  'fr-FR': Language
  'hi-IN': Language
  'hu-HU': Language
  'id-ID': Language
  'it-IT': Language
  'ja-JP': Language
  'ko-KR': Language
  'nl-NL': Language
  'pl-PL': Language
  'pt-BR': Language
  'pt-PT': Language
  'ro-RO': Language
  'ru-RU': Language
  'sv-SE': Language
  'ta-IN': Language
  'tr-TR': Language
  'uk-UA': Language
  'vi-VN': Language
  'zh-CN': Language
  'zh-TW': Language
}

class LanguageMapImpl implements ILanguageMap {
  'ar-SA': Language = {locale: 'ar-SA', language: 'العربية', code: 'ar'}
  'bn-BD': Language = {locale: 'bn-BD', language: 'বাংলা', code: 'bn'}
  'en-US': Language = {locale: 'en-US', language: 'English', code: 'en'}
  'de-DE': Language = {locale: 'de-DE', language: 'Deutsch', code: 'de'}
  'el-GR': Language = {locale: 'el-GR', language: 'Ελληνικά', code: 'el'}
  'es-ES': Language = {locale: 'es-ES', language: 'Español', code: 'es-ES'}
  'fi-FI': Language = {locale: 'fi-FI', language: 'Suomalainen', code: 'fi'}
  'fil-PH': Language = {locale: 'fil-PH', language: 'Filipino', code: 'fil'}
  'fr-FR': Language = {locale: 'fr-FR', language: 'Français', code: 'fr'}
  'hi-IN': Language = {locale: 'hi-IN', language: 'हिंदी', code: 'hi'}
  'hu-HU': Language = {locale: 'hu-HU', language: 'Magyar', code: 'hu'}
  'id-ID': Language = {locale: 'id-ID', language: 'Bahasa Indonesia', code: 'id'}
  'it-IT': Language = {locale: 'it-IT', language: 'Italiano', code: 'it'}
  'ja-JP': Language = {locale: 'ja-JP', language: '日本語', code: 'ja'}
  'ko-KR': Language = {locale: 'ko-KR', language: '한국어', code: 'ko'}
  'nl-NL': Language = {locale: 'nl-NL', language: 'Nederlands', code: 'nl'}
  'pl-PL': Language = {locale: 'pl-PL', language: 'Polski', code: 'pl'}
  'pt-BR': Language = {locale: 'pt-BR', language: 'Português (Brazil)', code: 'pt-br'}
  'pt-PT': Language = {locale: 'pt-PT', language: 'Português', code: 'pt-pt'}
  'ro-RO': Language = {locale: 'ro-RO', language: 'Română', code: 'ro'}
  'ru-RU': Language = {locale: 'ru-RU', language: 'Русский', code: 'ru'}
  'sv-SE': Language = {locale: 'sv-SE', language: 'Svenska', code: 'sv'}
  'ta-IN': Language = {locale: 'ta-IN', language: 'தமிழ்', code: 'ta'}
  'tr-TR': Language = {locale: 'tr-TR', language: 'Türkçe', code: 'tr'}
  'uk-UA': Language = {locale: 'uk-UA', language: 'Українська', code: 'uk'}
  'vi-VN': Language = {locale: 'vi-VN', language: 'Tiếng Việt', code: 'vi'}
  'zh-CN': Language = {locale: 'zh-CN', language: '简体中文', code: 'zh-cn'}
  'zh-TW': Language = {locale: 'zh-TW', language: '繁體中文', code: 'zh-tw'}
}

export type LanguageCode = keyof ILanguageMap
export type LanguageTextMap = {
  [key in LanguageCode]?: string;
}
