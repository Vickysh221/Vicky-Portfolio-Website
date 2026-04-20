import { useI18n } from '../i18n/LanguageProvider.tsx';
import { UI_COPY } from '../i18n/uiCopy.ts';

export default function LanguageToggle() {
  const { language, setLanguage, text } = useI18n();

  return (
    <div className="language-toggle-shell" role="group" aria-label={text(UI_COPY.languageSwitcher)}>
      <button
        type="button"
        className={language === 'zh' ? 'is-active' : ''}
        aria-pressed={language === 'zh'}
        aria-label={text(UI_COPY.switchToChinese)}
        onClick={() => setLanguage('zh')}
      >
        中
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={language === 'en' ? 'is-active' : ''}
        aria-pressed={language === 'en'}
        aria-label={text(UI_COPY.switchToEnglish)}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}
