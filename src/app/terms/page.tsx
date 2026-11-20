import { PageIntro } from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms",
  description: "Terms for using the South Range directory.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article>
      <PageIntro number="L/02" kicker="The small print" title="Terms" />
      <div className="container-page pb-24">
      <div className="prose-range max-w-2xl border-t border-line lg:ml-[25%]">
        <p>
          South Range is a directory of tours. It does not sell places, take payment, or operate the trips it lists. A booking or enquiry continues on the KLNK address configured for that specific tour.
        </p>
        <h2>Sample content</h2>
        <p>
          Listings marked as samples are fictional. They are here to show the structure of the site. They are not offers, and the example.com links are not booking systems.
        </p>
        <h2>Accuracy</h2>
        <p>
          When real tours replace the samples, the operator who supplies the listing is responsible for the description, the price if one is marked verified, and the KLNK address. South Range does not invent those values.
        </p>
        <h2>Use of the site</h2>
        <p>
          You may browse the public pages. Do not treat a sample listing as a confirmed departure. If a tour has no valid KLNK address, it is not available for booking through this site.
        </p>
      </div>
      </div>
    </article>
  );
}
