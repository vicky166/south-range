import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/seo";
import { getCountries, getOperators, getPublishedTours } from "@/lib/catalog";

export const metadata = pageMetadata({
  title: "About",
  description:
    "South Range is a curated directory of adventure tours across South Asia, listing journeys from independent operators.",
  path: "/about",
});

const principles = [
  {
    title: "A directory, not an operator.",
    text: "South Range gathers adventure and experience-based tours across South Asia so a traveller can compare them in one place. It does not run trips, and it does not claim partnerships, licences or certifications it does not have.",
  },
  {
    title: "One journey, one link.",
    text: "Every tour record can store one outbound address, its KLNK URL. The booking control on that tour’s page uses that address and no other. If the address is missing or is not a valid http or https URL, the page says so and shows no button.",
  },
  {
    title: "Nothing invented to fill a gap.",
    text: "No star ratings, no review counts, no “only two seats left”. A price appears only once it has been verified with the operator; until then the listing says it is not verified.",
  },
  {
    title: "Sample, and labelled as such.",
    text: "The operators, itineraries and example.com KLNK addresses in this build are placeholders so the design and data model can be reviewed. They carry a sample label until real records replace them.",
  },
];

export default function AboutPage() {
  const operators = getOperators();
  const countries = getCountries();
  const tours = getPublishedTours();

  return (
    <article>
      <PageIntro
        number="05"
        kicker="About the index"
        title={
          <>
            Find the journey. <span className="display-italic">Then go to the people who run it.</span>
          </>
        }
        dek={`${tours.length} published sample journeys from ${operators.length} operators, across ${countries.map((country) => country.name).join(", ")}.`}
      />

      <section aria-labelledby="principles-heading" className="bg-pine py-16 text-paper md:py-24">
        <div className="container-page">
          <h2 id="principles-heading" className="meta text-paper/60">
            <span className="text-[#e08a62]">Manifesto</span> · Four rules the index keeps
          </h2>
          <ol className="mt-10 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {principles.map((principle, index) => (
              <li key={principle.title} className="border-t border-paper/25 pt-6">
                <p className="display-italic text-3xl text-paper/50">{["I.", "II.", "III.", "IV."][index]}</p>
                <h3 className="display mt-3 text-[clamp(1.8rem,3.2vw,2.6rem)] leading-[1.02]">{principle.title}</h3>
                <p className="mt-4 max-w-lg leading-7 text-paper/75">{principle.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="register-heading" className="container-page py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-4">
          <h2 id="register-heading" className="display text-[clamp(2.2rem,5vw,4rem)] leading-none">
            The operator <span className="display-italic">register.</span>
          </h2>
          <p className="meta text-ink-soft">
            {operators.length} listed · {operators.filter((operator) => operator.sample).length} sample
          </p>
        </div>
        <ol>
          {operators.map((operator, index) => {
            const count = tours.filter((tour) => tour.operatorId === operator.id).length;
            const places = [...new Set(tours.filter((tour) => tour.operatorId === operator.id).map((tour) => tour.countryName))];
            return (
              <li key={operator.id} className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8">
                <p className="meta text-clay md:col-span-1">R/{String(index + 1).padStart(2, "0")}</p>
                <div className="md:col-span-4">
                  <h3 className="font-serif text-3xl leading-tight">{operator.name}</h3>
                  {operator.sample ? <p className="meta mt-1 text-clay">Sample operator</p> : null}
                </div>
                <p className="leading-7 text-ink-soft md:col-span-4">{operator.description}</p>
                <div className="md:col-span-3 md:text-right">
                  <p className="meta text-ink-soft">{places.join(" · ")}</p>
                  <Link href={`/tours?operator=${operator.id}`} className="meta link-line mt-3 inline-block text-ink">
                    {count === 1 ? "1 journey" : `${count} journeys`} <span aria-hidden="true" className="arrow text-clay">→</span>
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/tours" className="btn-primary">
            Browse every journey <span aria-hidden="true" className="arrow">→</span>
          </Link>
          <Link href="/contact" className="btn-secondary">
            Write to the index
          </Link>
        </div>
      </section>
    </article>
  );
}
