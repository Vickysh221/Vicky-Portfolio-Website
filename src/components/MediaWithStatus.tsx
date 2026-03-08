import { useState, type CSSProperties, type ImgHTMLAttributes, type VideoHTMLAttributes } from 'react';

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
  const hasSources = Array.isArray(sources) && sources.length > 0;

  return (
    <div style={wrapperStyle}>
      {status !== 'loaded' && (
        <div style={status === 'error' ? errorOverlayStyle : statusOverlayStyle}>
          {status === 'loading' ? 'Loading video...' : 'Video failed to load'}
        </div>
      )}
      <video
        {...props}
        src={hasSources ? undefined : props.src}
        preload={props.preload ?? 'metadata'}
        playsInline={props.playsInline ?? true}
        onLoadedData={(event) => {
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
