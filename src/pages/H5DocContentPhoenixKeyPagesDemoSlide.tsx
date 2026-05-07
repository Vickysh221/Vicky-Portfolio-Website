const PHOENIX_DEMO_ROUTE = '/web-design-develop/key-pages';
const PHOENIX_DEMO_SLIDE_INDEX = 0;
export const PHOENIX_DEMO_IFRAME_URL = 'https://onion-twirl-13449336.figma.site/';

export function isPhoenixKeyPagesDemoSlide(route: string, slideIndex: number): boolean {
  return route === PHOENIX_DEMO_ROUTE && slideIndex === PHOENIX_DEMO_SLIDE_INDEX;
}

export default function PhoenixKeyPagesDemoSlide(_props: { accentColor: string }) {
  return (
    <div style={{ color: 'rgba(200,169,110,0.3)', fontSize: 11, letterSpacing: '0.2em', padding: '20px 0' }}>
      LOADING DEMO…
    </div>
  );
}
