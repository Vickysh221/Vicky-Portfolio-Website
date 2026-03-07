import { useEffect, useState } from 'react';
import Portfolio from './Portfolio';
import DocPage from './DocPage';

function getHashPath(): string {
  return window.location.hash.replace(/^#\/?/, '');
}

export default function App() {
  const [hashPath, setHashPath] = useState(getHashPath());

  useEffect(() => {
    const onHashChange = () => setHashPath(getHashPath());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const segments = hashPath.split('/').filter(Boolean);
  const isBTypeSubPage = segments.length >= 2;

  if (isBTypeSubPage) {
    return <DocPage routePath={hashPath} />;
  }

  return <Portfolio />;
}
