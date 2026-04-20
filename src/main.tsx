import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { LanguageProvider } from './i18n/LanguageProvider.tsx';

// StrictMode removed to prevent double-init of Three.js singleton
createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </HashRouter>,
);
