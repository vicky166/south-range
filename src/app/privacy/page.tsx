import { site } from "@/config/site";
import { PageIntro } from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How South Range handles the little information the site asks for.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article>
      <PageIntro number="L/01" kicker="The small print" title="Privacy" />
      <div className="container-page pb-24">
      <div className="prose-range max-w-2xl border-t border-line lg:ml-[25%]">
        <p>
          South Range does not run accounts, payments or a mailing list. The contact form and the newsletter field check what you type in the browser session and then discard it. Nothing is written to a database.
        </p>
        <h2>What the site stores</h2>
        <p>
          Tour content lives in the project data files. It is not personal data about visitors. If a future version connects a form to email or a newsletter service, this page should be updated before that service is switched on.
        </p>
        <h2>Links that leave the site</h2>
        <p>
          A tour booking button opens the KLNK address stored on that tour. That destination is a different site, with its own privacy practices. The sample catalogue uses example.com placeholders, which are not booking systems.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this notice can be sent to {site.email}. That address is a placeholder until a real inbox is chosen.
        </p>
      </div>
      </div>
    </article>
  );
}
