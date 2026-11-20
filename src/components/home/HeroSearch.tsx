import { getCategories, getDestinationGroups } from "@/lib/catalog";
import { durationOptions } from "@/lib/filters";

/**
 * Search written as a sentence on a ticket. Each blank is a real select that
 * maps onto the directory query: where → country or destination, then
 * category and duration. Submitting opens /tours with those filters applied.
 */
export function HeroSearch() {
  const groups = getDestinationGroups();
  const categories = getCategories();

  return (
    <div className="ticket-shadow">
      <form action="/tours" method="get" role="search" aria-label="Find a journey" className="ticket">
        <div className="min-w-0 px-4 pb-5 pt-4 sm:px-7 sm:pb-6 sm:pt-5">
          <p className="meta flex justify-between gap-4 text-ink-soft">
            <span>Route ticket</span>
            <span className="hidden sm:inline lg:hidden xl:inline">Valid in six countries</span>
          </p>
          <p className="mt-3 font-serif text-[clamp(1.15rem,4.2vw,1.7rem)] leading-[1.55] text-ink">
            Take me to{" "}
            <select className="inline-select" name="where" defaultValue="" aria-label="Where do you want to go?">
              <option value="">anywhere in South Asia</option>
              {groups.map((group) => (
                <optgroup key={group.country.slug} label={group.country.name}>
                  <option value={`country:${group.country.slug}`}>all of {group.country.name}</option>
                  {group.destinations.map((destination) => (
                    <option key={destination.slug} value={`destination:${destination.slug}`}>
                      {destination.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>{" "}
            for{" "}
            <select className="inline-select" name="category" defaultValue="" aria-label="Choose an experience">
              <option value="">any kind of adventure</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name.toLowerCase()}
                </option>
              ))}
            </select>
            , lasting{" "}
            <select className="inline-select" name="duration" defaultValue="" aria-label="Duration (optional)">
              <option value="">as long as it takes</option>
              {durationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            .
          </p>
        </div>
        <div className="ticket-stub flex flex-col items-stretch gap-3 px-4 py-4 sm:items-stretch sm:justify-center sm:px-5 sm:py-5 md:gap-4">
          <p className="meta text-ink-soft sm:text-center">Admit one explorer</p>
          <button type="submit" className="btn-primary w-full px-5 py-3 sm:w-auto sm:self-center">
            Find journeys <span aria-hidden="true" className="arrow">→</span>
          </button>
        </div>
      </form>
    </div>
  );
}
