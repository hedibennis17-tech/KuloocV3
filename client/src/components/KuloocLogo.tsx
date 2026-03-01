/**
 * KuloocLogo — Composant logo Kulooc Canada — Design SaaS Premium
 * K rouge + KULOOC blanc + feuille d'érable
 */
interface KuloocLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon";
  className?: string;
}

const sizes = {
  sm: { icon: 28, text: "text-base", gap: "gap-2" },
  md: { icon: 36, text: "text-xl", gap: "gap-2.5" },
  lg: { icon: 44, text: "text-2xl", gap: "gap-3" },
  xl: { icon: 56, text: "text-3xl", gap: "gap-4" },
};

export function KuloocLogo({ size = "md", variant = "full", className = "" }: KuloocLogoProps) {
  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      {/* Icon — K in red square */}
      <div
        style={{ width: s.icon, height: s.icon, boxShadow: "0 4px 16px rgba(227,24,55,0.35)" }}
        className="bg-[#E31837] rounded-[0.35em] flex items-center justify-center flex-shrink-0"
      >
        <span
          className="text-white font-bold leading-none select-none"
          style={{
            fontSize: s.icon * 0.55,
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          K
        </span>
      </div>

      {/* Text */}
      {variant === "full" && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-bold text-white ${s.text}`}
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
          >
            KULOOC
          </span>
          <span
            className="text-white/35 font-medium uppercase"
            style={{ fontSize: "9px", letterSpacing: "0.14em" }}
          >
            Canada 🍁
          </span>
        </div>
      )}
    </div>
  );
}
