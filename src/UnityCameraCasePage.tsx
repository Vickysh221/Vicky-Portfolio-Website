import { DocSpecContent } from './DocPage';

type UnityCameraCasePageProps = {
  routePath: string;
};

export default function UnityCameraCasePage({ routePath }: UnityCameraCasePageProps) {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{
        background: '#0e0c09',
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(5,3,1,0.8) 100%)',
        }}
      />

      <div
        className="absolute z-30"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(980px, 92vw)',
          maxHeight: '84vh',
          overflow: 'hidden',
          border: '1px solid rgba(200,169,110,0.3)',
          background: 'rgba(8,6,4,0.86)',
          backdropFilter: 'blur(10px)',
          padding: '24px',
        }}
      >
        <div style={{ color: '#c8a96e', fontSize: '9px', letterSpacing: '0.3em', marginBottom: '12px' }}>
          JIDU HMI · UNITY3D CAMERA
        </div>

        <div
          style={{
            border: '1px dashed rgba(200, 169, 110, 0.15)',
            padding: '28px',
            textAlign: 'center',
            maxHeight: 'calc(84vh - 100px)',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              color: 'rgba(200, 169, 110, 0.25)',
              fontSize: '9px',
              letterSpacing: '0.3em',
              marginBottom: '18px',
            }}
          >
            CONTENT
          </div>

          <DocSpecContent routePath={routePath} />
        </div>
      </div>
    </div>
  );
}
