import Link from "next/link";
import { MediaImage } from "@/components/ui/MediaImage";
import { PageIntro } from "@/components/ui/PageIntro";
import { getCategories } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experiences",
  description:
    "Browse adventure categories: trekking, wildlife, culture, camping, water, road trips, cycling and local days.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  const categories = getCategories();

  return (
    <>
      <PageIntro
        number="02"
        kicker="Choose your path"
        aside={`${categories.length} paths`}
        title={
          <>
            How do you <span className="display-italic">want to move?</span>
          </>
        }
        dek="On foot, on a saddle, on water or at a kitchen table. Each path gathers the published journeys that travel that way."
      />

      <div className="container-page pb-24">
        <ol className="border-t border-ink">
          {categories.map((category, index) => (
            <li key={category.slug} className="border-b border-line">
              <Link
                href={`/experiences/${category.slug}`}
                className="group grid grid-cols-[minmax(0,1fr)_6.5rem] items-center gap-x-5 gap-y-3 py-6 sm:grid-cols-[3rem_minmax(0,1fr)_9rem] md:py-8 lg:grid-cols-[3rem_minmax(0,1.3fr)_minmax(0,1fr)_7rem_13rem]"
              >
                <span className="meta hidden text-clay sm:block">P/{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className="display block text-[clamp(2rem,5.4vw,4.2rem)] leading-[0.98] text-ink transition-colors duration-300 group-hover:italic group-hover:text-clay">
                    {category.name}
                  </span>
                  <span className="meta mt-2 block text-ink-soft lg:hidden">
                    {category.tourCount === 1 ? "1 journey" : `${category.tourCount} journeys`}
                  </span>
                </span>
                <span className="col-span-full hidden text-sm leading-6 text-ink-soft sm:col-span-1 sm:col-start-2 sm:row-start-2 sm:block lg:col-start-3 lg:row-start-1">
                  {category.summary}
                </span>
                <span className="meta hidden text-ink lg:block">
                  {category.tourCount === 1 ? "1 journey" : `${category.tourCount} journeys`}{" "}
                  <span aria-hidden="true" className="arrow text-clay">→</span>
                </span>
                <span className="frame relative block aspect-[4/3] bg-paper-deep sm:row-span-2 sm:col-start-3 lg:col-start-5 lg:row-span-1">
                  <MediaImage
                    src={category.image.src}
                    alt=""
                    sizes="(min-width: 1024px) 13rem, 9rem"
                    className="grayscale-[35%] transition duration-700 group-hover:scale-[1.06] group-hover:grayscale-0"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
