import { useI18n } from '../i18n/LanguageProvider.tsx';

export default function LanguageToggle() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="language-toggle-shell" role="group" aria-label="Language switcher">
      <button
        type="button"
        className={language === 'zh' ? 'is-active' : ''}
        aria-pressed={language === 'zh'}
        aria-label="Switch to Chinese"
        onClick={() => setLanguage('zh')}
      >
        中
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={language === 'en' ? 'is-active' : ''}
        aria-pressed={language === 'en'}
        aria-label="Switch to English"
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}
