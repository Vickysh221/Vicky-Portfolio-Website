import { useI18n } from '../i18n/LanguageProvider.tsx';

export default function LanguageToggle() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="language-toggle-shell">
      <button
        type="button"
        className={language === 'zh' ? 'is-active' : ''}
        onClick={() => setLanguage('zh')}
      >
        中
      </button>
      <span>/</span>
      <button
        type="button"
        className={language === 'en' ? 'is-active' : ''}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}
