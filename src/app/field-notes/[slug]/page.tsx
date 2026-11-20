import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TourCard } from "@/components/tours/TourCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { MediaImage } from "@/components/ui/MediaImage";
import { getFieldNote, getFieldNotes, queryTours } from "@/lib/catalog";
import { tourQueryHref } from "@/lib/filters";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type FieldNotePageProps = {
  params: Promise<{ slug: string }>;
};

/** Every note slug is prerendered, so this page never reads request data. */
export const instant = false;

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" });

export function generateStaticParams() {
  return getFieldNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: FieldNotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) return { title: "Field note not found" };
  return pageMetadata({
    title: note.title,
    description: note.dek,
    path: `/field-notes/${note.slug}`,
    image: note.image.src,
  });
}

export default async function FieldNotePage({ params }: FieldNotePageProps) {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) notFound();

  const notes = getFieldNotes();
  const index = notes.findIndex((item) => item.slug === note.slug);
  const next = notes[(index + 1) % notes.length];
  const related = note.relatedQuery ? queryTours(note.relatedQuery).slice(0, 3) : [];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Field Notes", path: "/field-notes" },
    { name: note.title, path: `/field-notes/${note.slug}` },
  ];

  return (
    <article>
      <JsonLd data={articleJsonLd(note)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <header className="container-page pt-8 md:pt-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Field Notes", href: "/field-notes" },
            { label: note.title },
          ]}
        />
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-t border-ink pt-4">
          <p className="meta flex gap-3 text-ink-soft">
            <span className="text-clay">Note {String(index + 1).padStart(2, "0")}</span>
            <span>{note.kicker}</span>
          </p>
          <p className="meta text-ink-soft">
            <time dateTime={note.publishedAt}>{dateFormat.format(new Date(note.publishedAt))}</time>
          </p>
        </div>
        <h1 className="display mx-auto mt-10 max-w-5xl text-center text-[clamp(2.8rem,8.6vw,7rem)] leading-[0.9]">
          {note.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-ink-soft md:text-xl md:leading-9">
          {note.dek}
        </p>
      </header>

      <figure className="container-page mt-12 md:mt-16">
        <div className="reveal-clip frame relative aspect-[4/3] bg-pine md:aspect-[21/9]">
          <MediaImage src={note.image.src} alt={note.image.alt} sizes="(min-width: 1320px) 1240px, 100vw" priority />
        </div>
        <figcaption className="meta mt-3 text-[0.62rem] text-ink-soft">Fig. 01 — {note.image.alt}</figcaption>
      </figure>

      <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24 border-t border-line pt-4">
            <p className="field-label">Filed under</p>
            <p className="mt-1 font-serif text-xl">{note.kicker}</p>
            <p className="field-label mt-5">Reading</p>
            <p className="mt-1 text-sm text-ink-soft">
              {Math.max(1, Math.round(note.body.flatMap((section) => section.paragraphs).join(" ").split(/\s+/).length / 200))} min
            </p>
          </div>
        </aside>
        <div className="max-w-2xl lg:col-span-7">
          {note.body.map((section, sectionIndex) => (
            <section key={section.heading ?? sectionIndex} className={sectionIndex > 0 ? "mt-12" : undefined}>
              {section.heading ? (
                <h2 className="display text-[clamp(1.8rem,3.2vw,2.6rem)] leading-none">
                  <span className="meta mr-3 align-middle text-clay">§ {String(sectionIndex + 1).padStart(2, "0")}</span>
                  {section.heading}
                </h2>
              ) : null}
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={`mt-5 text-[1.06rem] leading-8 text-ink md:text-lg md:leading-9 ${
                    sectionIndex === 0 && paragraphIndex === 0 ? "dropcap" : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}
              {sectionIndex === 0 && note.pullQuote ? (
                <blockquote className="display-italic my-12 border-y border-ink py-8 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.1] text-pine lg:-mr-24">
                  “{note.pullQuote}”
                </blockquote>
              ) : null}
            </section>
          ))}
          <p className="meta mt-14 border-t border-line pt-4 text-ink-soft">
            General guidance only. Check details with the operator, and for health questions, a doctor.
          </p>
        </div>
      </div>

      {related.length > 0 && note.relatedQuery ? (
        <section aria-labelledby="related-heading" className="border-t border-line bg-paper-deep py-14 md:py-20">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-4">
              <h2 id="related-heading" className="display text-[clamp(2rem,4.4vw,3.4rem)] leading-none">
                Put it <span className="display-italic">into practice.</span>
              </h2>
              <Link href={tourQueryHref(note.relatedQuery)} className="meta link-line text-ink">
                See them all in the index <span aria-hidden="true" className="arrow text-clay">→</span>
              </Link>
            </div>
            <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((tour) => (
                <li key={tour.id}>
                  <TourCard tour={tour} heading="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {next && next.slug !== note.slug ? (
        <nav aria-label="Next field note" className="container-page py-14 md:py-20">
          <Link href={`/field-notes/${next.slug}`} className="group block border-t border-ink pt-5">
            <span className="meta text-clay">Next note</span>
            <span className="display mt-3 block text-[clamp(2rem,5vw,4rem)] leading-none transition-colors group-hover:italic group-hover:text-clay">
              {next.title} <span aria-hidden="true" className="arrow">→</span>
            </span>
          </Link>
        </nav>
      ) : null}
    </article>
  );
}
