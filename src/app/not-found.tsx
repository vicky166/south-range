import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid gap-10 py-20 md:py-28 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="meta text-clay">N° 404 · Off the map</p>
        <h1 className="display mt-4 text-[clamp(3rem,10vw,7.4rem)] leading-[0.88]">
          You found the edge <span className="display-italic">of the index.</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-ink-soft">
          The link may be mistyped, or the journey is no longer published. Getting lost is the point, but not like this.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/tours" className="btn-primary">
            Every journey <span aria-hidden="true" className="arrow">→</span>
          </Link>
          <Link href="/destinations" className="btn-secondary">
            Open the atlas
          </Link>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="meta self-end border-t border-dashed border-ink/30 pt-4 text-ink-soft lg:col-span-4 lg:col-start-9"
      >
        ??.??°N ??.??°E
        <br />
        Somewhere beyond 04°N – 38°N · 66°E – 94°E
      </p>
    </div>
  );
}
