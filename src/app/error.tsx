"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-page py-20 md:py-28">
      <p className="meta text-clay">N° 500 · Lost signal</p>
      <h1 className="display mt-4 max-w-4xl text-[clamp(2.8rem,8vw,6rem)] leading-[0.9]">
        This page <span className="display-italic">did not load.</span>
      </h1>
      <p className="mt-6 max-w-lg text-lg leading-8 text-ink-soft">
        Try the page again. If it keeps failing, the catalogue data or the route needs a look.
      </p>
      <button type="button" className="btn-primary mt-8" onClick={() => reset()}>
        Try again <span aria-hidden="true" className="arrow">→</span>
      </button>
    </div>
  );
}
