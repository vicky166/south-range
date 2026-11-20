import { bookingLink } from "@/lib/klnk";

export function KlnkCta({ url, title }: { url: string | null; title: string }) {
  const href = bookingLink(url);

  if (!href) {
    return (
      <div className="border border-dashed border-ink/40 bg-paper-deep px-4 py-4" role="status">
        <p className="meta text-clay">No booking link</p>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          {title} does not have a valid KLNK address yet, so there is no booking or enquiry button to follow.
        </p>
      </div>
    );
  }

  return (
    <div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-between">
        Continue to this tour’s KLNK
        <span aria-hidden="true" className="arrow">↗</span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      <p className="mt-3 text-sm leading-6 text-ink-soft">
        Leaves South Range and opens only the KLNK address stored for {title}.
      </p>
      <p className="mt-2 break-all font-mono text-[0.7rem] leading-5 text-ink-soft">{href}</p>
    </div>
  );
}
