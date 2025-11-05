type FancyLoaderProps = {
  label?: string;
  className?: string;
};

export function FancyLoader({ label = 'Loading...', className = '' }: FancyLoaderProps) {
  return (
    <div
      className={`route-loading ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="music-loader" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="route-loading-text">{label}</div>
    </div>
  );
}

export default FancyLoader;
