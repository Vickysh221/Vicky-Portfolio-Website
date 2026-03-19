import { useRef, useState, type CSSProperties, type ImgHTMLAttributes, type VideoHTMLAttributes } from 'react';

type Status = 'loading' | 'loaded' | 'error';

const wrapperStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
};

const statusOverlayStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px',
  letterSpacing: '0.08em',
  borderRadius: '5px',
  color: '#b59f7b',
  background: 'rgba(16, 14, 12, 0.5)',
  pointerEvents: 'none',
};

const errorOverlayStyle: CSSProperties = {
  ...statusOverlayStyle,
  color: '#d58f83',
};

const playbackRailStyle: CSSProperties = {
  position: 'absolute',
  top: 10,
  right: 10,
  display: 'flex',
  gap: 6,
  padding: '4px',
  borderRadius: '999px',
  background: 'rgba(16, 14, 12, 0.72)',
  border: '1px solid rgba(181, 159, 123, 0.18)',
  zIndex: 2,
};

function playbackButtonStyle(active: boolean): CSSProperties {
  return {
    border: 'none',
    borderRadius: '999px',
    padding: '4px 8px',
    fontSize: '11px',
    lineHeight: 1,
    color: active ? '#17120d' : '#d8ccb6',
    background: active ? '#c8a96e' : 'transparent',
    cursor: 'pointer',
  };
}

type ImageWithStatusProps = ImgHTMLAttributes<HTMLImageElement>;

export function ImageWithStatus({ onLoad, onError, ...props }: ImageWithStatusProps) {
  const [status, setStatus] = useState<Status>('loading');

  return (
    <div style={wrapperStyle}>
      {status !== 'loaded' && (
        <div style={status === 'error' ? errorOverlayStyle : statusOverlayStyle}>
          {status === 'loading' ? 'Loading image...' : 'Image failed to load'}
        </div>
      )}
      <img
        {...props}
        loading={props.loading ?? 'lazy'}
        decoding={props.decoding ?? 'async'}
        onLoad={(event) => {
          setStatus('loaded');
          onLoad?.(event);
        }}
        onError={(event) => {
          setStatus('error');
          onError?.(event);
        }}
      />
    </div>
  );
}

type VideoSource = {
  src: string;
  type?: string;
  media?: string;
};

type VideoWithStatusProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'children'> & {
  sources?: VideoSource[];
};

export function VideoWithStatus({ onLoadedData, onError, sources, ...props }: VideoWithStatusProps) {
  const [status, setStatus] = useState<Status>('loading');
  const [playbackRate, setPlaybackRate] = useState(1);
  const hasSources = Array.isArray(sources) && sources.length > 0;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playbackRates = [1, 1.5, 2];

  function applyPlaybackRate(nextRate: number) {
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
      videoRef.current.defaultPlaybackRate = nextRate;
    }
  }

  return (
    <div style={wrapperStyle}>
      <div style={playbackRailStyle}>
        {playbackRates.map((rate) => (
          <button key={rate} type="button" style={playbackButtonStyle(playbackRate === rate)} onClick={() => applyPlaybackRate(rate)}>
            {rate}x
          </button>
        ))}
      </div>
      {status !== 'loaded' && (
        <div style={status === 'error' ? errorOverlayStyle : statusOverlayStyle}>
          {status === 'loading' ? 'Loading video...' : 'Video failed to load'}
        </div>
      )}
      <video
        {...props}
        ref={videoRef}
        src={hasSources ? undefined : props.src}
        preload={props.preload ?? 'metadata'}
        playsInline={props.playsInline ?? true}
        onLoadedData={(event) => {
          event.currentTarget.playbackRate = playbackRate;
          event.currentTarget.defaultPlaybackRate = playbackRate;
          setStatus('loaded');
          onLoadedData?.(event);
        }}
        onError={(event) => {
          setStatus('error');
          onError?.(event);
        }}
      >
        {sources?.map((source, index) => (
          <source key={`${source.src}-${index}`} src={source.src} type={source.type} media={source.media} />
        ))}
      </video>
    </div>
  );
}
