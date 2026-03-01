/**
 * ImagePlaceholder — Kulooc V3
 * Bloc image vide avec nom affiché. Remplacer src quand l'image est fournie.
 */
interface ImagePlaceholderProps {
  name: string;
  className?: string;
  aspectRatio?: string;
}

export function ImagePlaceholder({ name, className = "", aspectRatio = "aspect-video" }: ImagePlaceholderProps) {
  return (
    <div className={`img-placeholder ${aspectRatio} ${className}`}>
      <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center mb-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
      <span className="text-xs uppercase tracking-widest text-white/40">{name}</span>
    </div>
  );
}
