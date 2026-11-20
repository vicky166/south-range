import { atlasBounds } from "@/lib/geo";

export type AtlasPoint = {
  slug: string;
  name: string;
  lat: number;
  lng: number;
};

const SCALE = 10;
const width = (atlasBounds.maxLng - atlasBounds.minLng) * SCALE;
const height = (atlasBounds.maxLat - atlasBounds.minLat) * SCALE;
const TROPIC_OF_CANCER = 23.44;

const x = (lng: number) => (lng - atlasBounds.minLng) * SCALE;
const y = (lat: number) => (atlasBounds.maxLat - lat) * SCALE;

const meridians = [70, 75, 80, 85, 90];
const parallels = [5, 10, 15, 20, 25, 30, 35];

/**
 * A coordinate grid rather than a drawn map: graticule lines, the Tropic of
 * Cancer, and one dot per destination at its listed coordinates.
 */
export function AtlasMap({
  points,
  active,
  tone = "light",
  className = "",
}: {
  points: AtlasPoint[];
  active?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const ink = tone === "dark" ? "#f1ebdf" : "#1c1b18";
  const faint = tone === "dark" ? "rgba(241,235,223,0.18)" : "rgba(28,27,24,0.14)";
  const label = tone === "dark" ? "rgba(241,235,223,0.55)" : "rgba(28,27,24,0.5)";
  const current = points.find((point) => point.slug === active);
  const labelRight = current ? x(current.lng) < width * 0.62 : true;

  return (
    <svg
      viewBox={`-26 -14 ${width + 40} ${height + 30}`}
      className={className}
      role="img"
      aria-label={
        current
          ? `Grid of destination coordinates, highlighting ${current.name}`
          : "Grid of destination coordinates across South Asia"
      }
    >
      {meridians.map((lng) => (
        <g key={`m${lng}`}>
          <line x1={x(lng)} x2={x(lng)} y1={0} y2={height} stroke={faint} strokeWidth={1} />
          <text x={x(lng)} y={-5} textAnchor="middle" fontSize={8} fill={label} fontFamily="var(--font-mono)">
            {lng}°E
          </text>
        </g>
      ))}
      {parallels.map((lat) => (
        <g key={`p${lat}`}>
          <line x1={0} x2={width} y1={y(lat)} y2={y(lat)} stroke={faint} strokeWidth={1} />
          <text x={-5} y={y(lat) + 3} textAnchor="end" fontSize={8} fill={label} fontFamily="var(--font-mono)">
            {lat}°N
          </text>
        </g>
      ))}
      <line
        x1={0}
        x2={width}
        y1={y(TROPIC_OF_CANCER)}
        y2={y(TROPIC_OF_CANCER)}
        stroke="#b4532a"
        strokeOpacity={0.55}
        strokeDasharray="2 4"
      />
      <text
        x={width - 2}
        y={y(TROPIC_OF_CANCER) - 4}
        textAnchor="end"
        fontSize={7}
        fill="#b4532a"
        fillOpacity={0.8}
        fontFamily="var(--font-mono)"
        letterSpacing="0.08em"
      >
        TROPIC OF CANCER
      </text>
      <rect x={0} y={0} width={width} height={height} fill="none" stroke={faint} />
      {points.map((point) =>
        point.slug === active ? null : (
          <circle key={point.slug} cx={x(point.lng)} cy={y(point.lat)} r={2.6} fill={ink} fillOpacity={0.7} />
        ),
      )}
      {current ? (
        <g>
          <circle cx={x(current.lng)} cy={y(current.lat)} r={11} fill="none" stroke="#b4532a" strokeOpacity={0.5} />
          <circle cx={x(current.lng)} cy={y(current.lat)} r={4.5} fill="#b4532a" />
          <line
            x1={x(current.lng) + (labelRight ? 12 : -12)}
            x2={x(current.lng) + (labelRight ? 30 : -30)}
            y1={y(current.lat)}
            y2={y(current.lat)}
            stroke="#b4532a"
          />
          <text
            x={x(current.lng) + (labelRight ? 34 : -34)}
            y={y(current.lat) + 4}
            textAnchor={labelRight ? "start" : "end"}
            fontSize={12}
            fill={ink}
            fontFamily="var(--font-serif)"
            fontStyle="italic"
          >
            {current.name}
          </text>
        </g>
      ) : null}
    </svg>
  );
}
