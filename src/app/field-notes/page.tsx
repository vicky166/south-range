import Link from "next/link";
import { MediaImage } from "@/components/ui/MediaImage";
import { PageIntro } from "@/components/ui/PageIntro";
import { getFieldNotes } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Field Notes",
  description: "Short guides on reading listings, walking at altitude and travelling slowly in South Asia.",
  path: "/field-notes",
});

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

export default function FieldNotesPage() {
  const [lead, ...rest] = getFieldNotes();

  return (
    <>
      <PageIntro
        number="04"
        kicker="Field notes"
        title={
          <>
            Notes from <span className="display-italic">the margins.</span>
          </>
        }
        dek="Short, practical guides. General advice and how the index works, never a stand-in for an operator’s briefing or a doctor."
      />

      {lead ? (
        <div className="container-page pb-24">
          <article className="grid gap-8 border-t border-ink pt-10 lg:grid-cols-12 lg:gap-10">
            <Link href={`/field-notes/${lead.slug}`} className="group block lg:col-span-7" tabIndex={-1} aria-hidden="true">
              <div className="frame relative aspect-[4/3] bg-pine lg:aspect-[5/4]">
                <MediaImage
                  src={lead.image.src}
                  alt=""
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  priority
                  className="transition duration-1000 group-hover:scale-[1.03]"
                />
              </div>
            </Link>
            <div className="lg:col-span-5 lg:pt-6">
              <p className="meta flex flex-wrap gap-x-3 text-ink-soft">
                <span className="text-clay">Note 01</span>
                <span>{lead.kicker}</span>
                <span>{dateFormat.format(new Date(lead.publishedAt))}</span>
              </p>
              <h2 className="display mt-4 text-[clamp(2.4rem,4.6vw,4rem)] leading-[0.96]">
                <Link href={`/field-notes/${lead.slug}`} className="link-line">
                  {lead.title}
                </Link>
              </h2>
              <p className="mt-5 text-lg leading-8 text-ink-soft">{lead.dek}</p>
              {lead.pullQuote ? (
                <blockquote className="display-italic mt-8 border-l-2 border-clay pl-5 text-2xl leading-snug">
                  “{lead.pullQuote}”
                </blockquote>
              ) : null}
            </div>
          </article>

          {rest.length > 0 ? (
            <ol className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-2">
              {rest.map((note, index) => (
                <li key={note.slug} className={index % 2 === 1 ? "md:mt-24" : undefined}>
                  <article>
                    <Link href={`/field-notes/${note.slug}`} className="group block" tabIndex={-1} aria-hidden="true">
                      <div className="frame relative aspect-[3/2] bg-pine">
                        <MediaImage
                          src={note.image.src}
                          alt=""
                          sizes="(min-width: 768px) 45vw, 100vw"
                          className="transition duration-1000 group-hover:scale-[1.03]"
                        />
                      </div>
                    </Link>
                    <p className="meta mt-5 flex flex-wrap gap-x-3 text-ink-soft">
                      <span className="text-clay">Note {String(index + 2).padStart(2, "0")}</span>
                      <span>{note.kicker}</span>
                      <span>{dateFormat.format(new Date(note.publishedAt))}</span>
                    </p>
                    <h2 className="display mt-3 text-[clamp(2rem,3.4vw,3rem)] leading-none">
                      <Link href={`/field-notes/${note.slug}`} className="link-line">
                        {note.title}
                      </Link>
                    </h2>
                    <p className="mt-4 max-w-lg leading-7 text-ink-soft">{note.dek}</p>
                  </article>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      ) : (
        <p className="container-page pb-24 text-ink-soft">No field notes are published yet.</p>
      )}
    </>
  );
}
