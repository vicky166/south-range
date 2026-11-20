import { ContactForm } from "@/components/contact/ContactForm";
import { PageIntro } from "@/components/ui/PageIntro";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact South Range. The form checks your message locally and does not send it.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        number="06"
        kicker="Correspondence"
        title={
          <>
            Write to <span className="display-italic">the index.</span>
          </>
        }
        dek="Questions about the catalogue, a listing that looks wrong, or an operator who should be here."
      />
      <div className="container-page grid gap-12 pb-24 lg:grid-cols-12 lg:gap-10">
        <aside className="space-y-6 lg:col-span-4">
          <div className="border-l-2 border-clay pl-5">
            <p className="meta text-clay">Before you write</p>
            <p className="mt-2 leading-7 text-ink-soft">
              The form validates what you type. It does not deliver the message, because no inbox is connected yet.
            </p>
          </div>
          <div className="border-l-2 border-line pl-5">
            <p className="meta text-ink-soft">By email</p>
            <p className="mt-2 leading-7 text-ink-soft">
              <a className="link-line text-ink" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              is a placeholder on the example.com domain.
            </p>
          </div>
          <div className="border-l-2 border-line pl-5">
            <p className="meta text-ink-soft">About a booking</p>
            <p className="mt-2 leading-7 text-ink-soft">
              Bookings happen with each operator through that tour’s own KLNK link, not through this site.
            </p>
          </div>
        </aside>
        <div className="relative bg-paper-deep p-6 sm:p-10 lg:col-span-8">
          <span
            aria-hidden="true"
            className="meta absolute right-5 top-5 hidden border border-dashed border-clay px-2 py-3 text-center text-[0.55rem] leading-4 text-clay sm:block"
          >
            Post
            <br />
            here
          </span>
          <p className="meta text-ink-soft">Dear South Range,</p>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
