import { useEffect, useState } from 'react';
import Portfolio from './Portfolio';
import UnityCameraCasePage from './UnityCameraCasePage';

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

  if (hashPath === 'jidu-hmi/unity3d-camera') {
    return <UnityCameraCasePage routePath={hashPath} />;
  }

  return <Portfolio />;
}
