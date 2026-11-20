import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TourCard } from "@/components/tours/TourCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { MediaImage } from "@/components/ui/MediaImage";
import { getAllCategories, getCategories, getCategory, getToursForCategory } from "@/lib/catalog";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type ExperiencePageProps = {
  params: Promise<{ slug: string }>;
};

/** Every category slug is prerendered, so this page never reads request data. */
export const instant = false;

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Experience not found" };
  return pageMetadata({
    title: category.name,
    description: category.summary,
    path: `/experiences/${category.slug}`,
    image: category.image.src,
  });
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const tours = getToursForCategory(category.slug);
  const others = getCategories().filter((item) => item.slug !== category.slug);
  const places = [...new Map(tours.map((tour) => [tour.destinationSlug, tour])).values()];
  const pathNumber = getAllCategories().findIndex((item) => item.slug === category.slug) + 1;

  return (
    <article>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Experiences", path: "/experiences" },
          { name: category.name, path: `/experiences/${category.slug}` },
        ])}
      />

      <header className="container-page pt-8 md:pt-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Experiences", href: "/experiences" },
            { label: category.name },
          ]}
        />
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-t border-ink pt-4">
          <p className="meta flex gap-3 text-ink-soft">
            <span className="text-clay">P/{String(pathNumber).padStart(2, "0")}</span>
            <span>A path through the index</span>
          </p>
          <p className="meta text-ink-soft">
            {tours.length === 1 ? "1 published journey" : `${tours.length} published journeys`}
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h1 className="display text-[clamp(2.8rem,9vw,7rem)] leading-[0.9]">{category.name}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft md:text-xl md:leading-9">{category.summary}</p>
            {tours.length > 0 ? (
              <Link href={`/tours?category=${category.slug}`} className="btn-primary mt-8">
                Filter the index by this path <span aria-hidden="true" className="arrow">→</span>
              </Link>
            ) : null}
          </div>
          <figure className="lg:col-span-5">
            <div className="reveal-clip frame relative aspect-[5/4] bg-pine lg:aspect-[4/3]">
              <MediaImage src={category.image.src} alt={category.image.alt} sizes="(min-width: 1024px) 40vw, 100vw" priority />
            </div>
            <figcaption className="meta mt-3 text-[0.62rem] text-ink-soft">Fig. 01 — {category.image.alt}</figcaption>
          </figure>
        </div>
      </header>

      {places.length > 0 ? (
        <div className="container-page mt-14">
          <p className="meta flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line py-4 text-ink-soft">
            <span className="text-clay">Where it goes</span>
            {places.map((tour) => (
              <Link key={tour.destinationSlug} href={`/destinations/${tour.destinationSlug}`} className="link-line text-ink">
                {tour.destinationName}
              </Link>
            ))}
          </p>
        </div>
      ) : null}

      <section aria-labelledby="path-journeys" className="container-page py-16 md:py-24">
        <h2 id="path-journeys" className="sr-only">
          Journeys on this path
        </h2>
        {tours.length > 0 ? (
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
            {tours.map((tour) => (
              <li key={tour.id}>
                <TourCard tour={tour} heading="h3" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="border border-dashed border-ink/30 px-6 py-14 text-center">
            <p className="meta text-clay">Unwalked path</p>
            <p className="mt-3 font-serif text-3xl">No journeys here, yet.</p>
            <p className="mx-auto mt-3 max-w-md text-ink-soft">
              This path is configured, and it fills in when a published tour points at it.
            </p>
          </div>
        )}
      </section>

      {others.length > 0 ? (
        <nav aria-labelledby="other-paths" className="border-t border-line bg-paper-deep py-14 md:py-20">
          <div className="container-page">
            <p id="other-paths" className="meta text-ink-soft">
              <span className="text-clay">Or take another path</span>
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
              {others.map((item, index) => (
                <li key={item.slug} className="flex items-baseline gap-3">
                  <Link
                    href={`/experiences/${item.slug}`}
                    className="font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight transition-colors hover:italic hover:text-clay"
                  >
                    {item.name}
                  </Link>
                  {index < others.length - 1 ? (
                    <span aria-hidden="true" className="font-serif text-2xl text-sand">
                      /
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      ) : null}
    </article>
  );
}
