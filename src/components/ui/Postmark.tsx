/**
 * A rubber-stamp cancellation: two rings with text set on the top and bottom
 * arcs, and wavy lines trailing to the left. Decorative only.
 */
export function Postmark({ id, top, bottom, className = "" }: { id: string; top: string; bottom?: string; className?: string }) {
  return (
    <svg viewBox="0 0 170 100" aria-hidden="true" className={`postmark ${className}`}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="120" cy="50" r="42" />
        <circle cx="120" cy="50" r="29" />
        <path d="M2 34q9-6 18 0t18 0 18 0 18 0" />
        <path d="M2 46q9-6 18 0t18 0 18 0 18 0" />
        <path d="M2 58q9-6 18 0t18 0 18 0 18 0" />
        <path d="M2 70q9-6 18 0t18 0 18 0 18 0" />
      </g>
      <defs>
        <path id={`${id}-top`} d="M87 50a33 33 0 0 1 66 0" />
        <path id={`${id}-bottom`} d="M81 50a39 39 0 0 0 78 0" />
      </defs>
      <text fill="currentColor" fontSize="9" letterSpacing="1.4" style={{ fontFamily: "var(--font-mono)" }}>
        <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
          {top.toUpperCase()}
        </textPath>
      </text>
      {bottom ? (
        <text fill="currentColor" fontSize="8" letterSpacing="0.6" style={{ fontFamily: "var(--font-mono)" }}>
          <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">
            {bottom.toUpperCase()}
          </textPath>
        </text>
      ) : null}
      <path d="M120 38 123 47 132 50 123 53 120 62 117 53 108 50 117 47Z" fill="currentColor" />
    </svg>
  );
}
