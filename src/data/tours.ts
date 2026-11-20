import { photo } from "./images";
import type { Tour } from "./types";

/**
 * Sample catalogue. Every record is fictional.
 *
 * To add a tour:
 * 1. Copy a record in this array.
 * 2. Set a new id and slug (the slug becomes /tours/your-slug).
 * 3. Point country, destinationSlug, categorySlug, activitySlugs and operatorId
 *    at records that already exist in the data files. Add those records first
 *    if they are new.
 * 4. Set klnkUrl to the https address supplied for that tour alone.
 *    Use null if you do not have one yet. Never copy another tour's URL,
 *    and never invent one. The example.com values below are placeholders.
 * 5. Leave price null and priceVerified false unless you have a verified figure.
 * 6. Set published to false to keep a draft off the site.
 * 7. Set sample to false only when the listing is real.
 *
 * To change a KLNK address, edit klnkUrl on that tour only.
 * To add an operator, add it in operators.ts, then reference its id here.
 */

const sampleNote =
  "Sample copy for layout and navigation. Not a confirmed departure and not a quote.";

export const tours: Tour[] = [
  {
    id: "tour-sham-valley",
    slug: "sham-valley-camp-circuit",
    title: "Sham Valley Camp Circuit",
    shortDescription:
      "A lower-altitude Ladakh walk between villages, with two nights in camp and no summit attempt.",
    description:
      "This sample listing follows village paths in the Sham Valley, west of Leh. The days are short on purpose so the route can be read as an introduction to the altitude, not a high pass. Ridge Desk is a fictional operator. The itinerary is illustrative copy for the directory.",
    country: "india",
    destinationSlug: "ladakh",
    categorySlug: "trekking-hiking",
    activitySlugs: ["high-altitude-walking", "camping"],
    durationDays: 6,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "pexels-5014921",
        "Prayer flags on a dry hillside below a monastery above Leh, with bare mountains behind",
      ),
      photo(
        "pexels-33351441",
        "A wide, dry valley floor below bare brown mountains",
      ),
    ],
    highlights: [
      "Village-to-village walking below the higher passes",
      "Two sample camp nights",
      "A rest day written into the middle of the route",
      "No invented permit or summit claim",
    ],
    itinerary: [
      {
        title: "Day 1 — Leh, on foot only after rest",
        detail:
          "The sample day is for arrival and a short flat walk. No pass is crossed.",
      },
      {
        title: "Day 2 — Toward the first village",
        detail: "A half-day path between fields, ending before dark.",
      },
      {
        title: "Day 3 — Camp night",
        detail: "A short ridge and a camp. The copy does not name a real campsite operator.",
      },
      {
        title: "Day 4 — Rest",
        detail: "A deliberate rest day. Nothing is scheduled beyond a village walk.",
      },
      {
        title: "Day 5 — Return valley",
        detail: "Walking back toward the road on a lower path.",
      },
      {
        title: "Day 6 — Leh",
        detail: "The sample ends in Leh with no onward tour attached.",
      },
    ],
    includedServices: [
      "Sample description of a guide for the walking days",
      "Two nights of camping in the copy, not a booked site",
      "Village guesthouse nights where the itinerary says so",
    ],
    excludedServices: [
      "Flights into Ladakh",
      "Travel insurance",
      "Any cost not written in this sample",
    ],
    importantInformation: [
      sampleNote,
      "The route is written for walkers who are comfortable with a full day on foot at altitude. It is still sample copy.",
    ],
    operatorId: "ridge-desk",
    klnkUrl: "https://example.com/klnk/demo/sham-valley-camp-circuit",
    featured: true,
    trending: false,
    published: true,
    sample: true,
    createdAt: "2026-09-02",
    updatedAt: "2026-11-01",
  },
  {
    id: "tour-malana-ridge",
    slug: "malana-ridge-footpath",
    title: "Malana Ridge Footpath",
    shortDescription:
      "Five days on forest paths in Himachal, visiting villages without entering private courtyards.",
    description:
      "A sample footpath in Himachal Pradesh, written so the directory has a western Himalayan trek from the same fictional mountain operator as the Ladakh walk. The days stay on public paths in the copy and do not describe ceremonies or homes as if access were arranged.",
    country: "india",
    destinationSlug: "himachal-pradesh",
    categorySlug: "trekking-hiking",
    activitySlugs: ["high-altitude-walking", "village-walks"],
    durationDays: 5,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "photo-1486870591958-9b9d0d1dda99",
        "A snow-streaked peak above a plain of golden grass",
      ),
      photo(
        "photo-1551632811-561732d1e306",
        "Two hikers with packs on a trail below jagged peaks",
      ),
    ],
    highlights: [
      "Forest walking rather than a road transfer",
      "Village viewpoints described from the path",
      "One shorter day in the middle",
      "Listed by a different itinerary than the Ladakh sample",
    ],
    itinerary: [
      {
        title: "Day 1 — Road to the trailhead",
        detail: "The sample starts after a morning drive. Walking begins after lunch.",
      },
      {
        title: "Day 2 — Forest contour",
        detail: "A full day on a contour path with no river crossing invented.",
      },
      {
        title: "Day 3 — Short day",
        detail: "A shorter walk and a long afternoon in camp or a simple lodge.",
      },
      {
        title: "Day 4 — Ridge view",
        detail: "An out-and-back to a viewpoint, returning the same way.",
      },
      {
        title: "Day 5 — Out to the road",
        detail: "Descent to a roadhead. The sample ends there.",
      },
    ],
    includedServices: ["Walking leader in the sample copy", "Lodge or camp nights as named each day"],
    excludedServices: ["Travel to the region", "Personal equipment"],
    importantInformation: [sampleNote],
    operatorId: "ridge-desk",
    klnkUrl: "https://example.com/klnk/demo/malana-ridge-footpath",
    featured: false,
    trending: false,
    published: true,
    sample: true,
    createdAt: "2026-09-04",
    updatedAt: "2026-11-01",
  },
  {
    id: "tour-kuari",
    slug: "kuari-pass-meadow-walk",
    title: "Kuari Pass Meadow Walk",
    shortDescription:
      "Eight days of meadow walking in Uttarakhand, with the pass treated as a viewpoint, not a trophy.",
    description:
      "This sample crosses into the mountain-adventures category so the directory can separate a pass walk from the shorter village treks. The copy stays general: meadows, a pass view, and a return by the same valley. It does not invent a government permit package.",
    country: "india",
    destinationSlug: "uttarakhand",
    categorySlug: "mountain-adventures",
    activitySlugs: ["high-altitude-walking"],
    durationDays: 8,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "photo-1626621341517-bbf3d9990a23",
        "A line of walkers crossing a snowy ridge between pine trees",
      ),
      photo(
        "photo-1506905925346-21bda4d32df4",
        "Snow peaks at sunrise above a sea of cloud",
      ),
    ],
    highlights: [
      "Meadow camps in the sample itinerary",
      "A pass used as a viewpoint day",
      "Two shorter days for weather",
      "Return by the same valley",
    ],
    itinerary: [
      {
        title: "Day 1 — Trailhead",
        detail: "Arrive and walk only as far as the first pasture.",
      },
      {
        title: "Day 2 — Forest",
        detail: "A steady climb through forest to a clearing.",
      },
      {
        title: "Day 3 — Meadow",
        detail: "A shorter day between pastures.",
      },
      {
        title: "Day 4 — Toward the pass",
        detail: "Walk to a high camp. The pass itself is the next day.",
      },
      {
        title: "Day 5 — Viewpoint",
        detail: "Out and back to the pass view, sleeping at the same camp.",
      },
      {
        title: "Day 6 — Weather hold",
        detail: "A day with no distance, used if the sample needs a buffer.",
      },
      {
        title: "Day 7 — Descent",
        detail: "Down to the forest camp.",
      },
      {
        title: "Day 8 — Road",
        detail: "Walk out to the road. The listing ends.",
      },
    ],
    includedServices: ["Sample camp support on the walking days"],
    excludedServices: ["Insurance", "Travel to the trailhead"],
    importantInformation: [
      sampleNote,
      "Snow can close a pass. The sample includes a hold day for that reason and still is not a live departure.",
    ],
    operatorId: "ridge-desk",
    klnkUrl: "https://example.com/klnk/demo/kuari-pass-meadow-walk",
    featured: false,
    trending: false,
    published: true,
    sample: true,
    createdAt: "2026-09-06",
    updatedAt: "2026-11-02",
  },
  {
    id: "tour-sandstone",
    slug: "sandstone-fort-circuit",
    title: "Sandstone Fort Circuit",
    shortDescription:
      "Six days between fort towns in Rajasthan, with long afternoons and no shopping stops written in.",
    description:
      "Cedar Field, a fictional operator, lists this cultural circuit so the directory is not only mountains. The sample moves between sandstone towns, keeps one fort visit a day, and leaves the evenings unscheduled. It is not a hotel package and it does not name real palaces as partners.",
    country: "india",
    destinationSlug: "rajasthan",
    categorySlug: "cultural-experiences",
    activitySlugs: ["heritage-sites"],
    durationDays: 6,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "photo-1477587458883-47145ed94245",
        "The pink sandstone facade of the Hawa Mahal in Jaipur, with horses in the street",
      ),
      photo(
        "photo-1599661046289-e31897846e41",
        "Ochre fort walls and a gateway climbing a hillside",
      ),
    ],
    highlights: [
      "One fort or old town each day",
      "Afternoons left open in the sample",
      "Road time kept under half a day",
      "A different operator from the desert camp",
    ],
    itinerary: [
      {
        title: "Day 1 — Old town on foot",
        detail: "A walking afternoon in the first town. No monument list is promised.",
      },
      {
        title: "Day 2 — Fort ridge",
        detail: "Morning at a fort, rest during the heat.",
      },
      {
        title: "Day 3 — Drive and bazaar",
        detail: "A morning drive and an evening market walk.",
      },
      {
        title: "Day 4 — Lake town",
        detail: "A day beside water, with the schedule kept light.",
      },
      {
        title: "Day 5 — Second fort",
        detail: "Another morning visit and a free afternoon.",
      },
      {
        title: "Day 6 — Departure",
        detail: "The sample ends after breakfast.",
      },
    ],
    includedServices: ["A local host in the sample copy", "Breakfast where a day names it"],
    excludedServices: ["Monument tickets", "Intercity travel into Rajasthan"],
    importantInformation: [sampleNote],
    operatorId: "cedar-field",
    klnkUrl: "https://example.com/klnk/demo/sandstone-fort-circuit",
    featured: true,
    trending: false,
    published: true,
    sample: true,
    createdAt: "2026-09-08",
    updatedAt: "2026-11-02",
  },
  {
    id: "tour-thar-camp",
    slug: "thar-night-camp",
    title: "Thar Night Camp",
    shortDescription:
      "Two nights outside a desert town. The KLNK address on this record is intentionally invalid.",
    description:
      "A short camping sample from Monsoon Note, separate from the fort circuit so two operators can list Rajasthan. The klnkUrl on this record is not a usable address. The tour page must not show a booking button.",
    country: "india",
    destinationSlug: "rajasthan",
    categorySlug: "camping",
    activitySlugs: ["camping"],
    durationDays: 2,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "pexels-36033417",
        "Two camels and riders crossing sand dunes near Jaisalmer at dusk",
      ),
      photo(
        "pexels-30725009",
        "A rider on a camel crossing open sand under a pale sky",
      ),
    ],
    highlights: [
      "Two nights only",
      "A dune walk at dusk in the copy",
      "No wildlife sighting promised",
      "Booking control hidden because the KLNK value is invalid",
    ],
    itinerary: [
      {
        title: "Day 1 — Out of town",
        detail: "Leave after lunch and reach camp before sunset.",
      },
      {
        title: "Day 2 — Morning walk and return",
        detail: "A short walk and a drive back. The sample ends.",
      },
    ],
    includedServices: ["Camp night in the sample description"],
    excludedServices: ["Travel to Rajasthan"],
    importantInformation: [
      sampleNote,
      "This sample stores a KLNK value that is not a usable web address, so the booking control stays hidden.",
    ],
    operatorId: "monsoon-note",
    klnkUrl: "not-a-valid-klnk",
    featured: false,
    trending: false,
    published: true,
    sample: true,
    createdAt: "2026-09-10",
    updatedAt: "2026-11-03",
  },
  {
    id: "tour-backwater",
    slug: "backwater-village-days",
    title: "Backwater Village Days",
    shortDescription:
      "Four slow days in a Kerala village: a boat stretch, a kitchen morning, and no resort schedule.",
    description:
      "River Lane lists this local journey so the directory has a south Indian pace that is not a trek. The sample uses a village stay and a short boat stretch. It does not claim a homestay brand or a fixed departure date.",
    country: "india",
    destinationSlug: "kerala",
    categorySlug: "local-experiences",
    activitySlugs: ["food-and-markets", "river-and-lake"],
    durationDays: 4,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "photo-1602216056096-3b40cc0c9944",
        "Houseboat on a backwater lined with palms",
      ),
      photo(
        "photo-1593693397690-362cb9666fc2",
        "A houseboat cruising a wide backwater under a bright sky",
      ),
    ],
    highlights: [
      "A village base rather than a cruise",
      "One morning in a kitchen, described generally",
      "A short boat stretch, not a houseboat charter",
      "Listed by River Lane, not the mountain operator",
    ],
    itinerary: [
      {
        title: "Day 1 — Arrive and walk the lane",
        detail: "Settle in and walk the village lane before dark.",
      },
      {
        title: "Day 2 — Kitchen morning",
        detail: "A morning of cooking together. The afternoon is free.",
      },
      {
        title: "Day 3 — Boat stretch",
        detail: "A few hours on the water and back by late afternoon.",
      },
      {
        title: "Day 4 — Leave",
        detail: "Departure after breakfast.",
      },
    ],
    includedServices: ["Village stay in the sample copy", "The boat hours named on day 3"],
    excludedServices: ["Trains into Kerala", "Meals that are not named"],
    importantInformation: [sampleNote],
    operatorId: "river-lane",
    klnkUrl: "https://example.com/klnk/demo/backwater-village-days",
    featured: true,
    trending: true,
    published: true,
    sample: true,
    createdAt: "2026-09-12",
    updatedAt: "2026-11-04",
  },
  {
    id: "tour-periyar",
    slug: "periyar-forest-watch",
    title: "Periyar Forest Watch",
    shortDescription:
      "Three days watching the forest edge. Sightings are not promised, and there is no day-by-day itinerary yet.",
    description:
      "A wildlife sample in Kerala from Cedar Field, so the same state can hold two different operators. The listing explains a forest watch and deliberately leaves the itinerary empty until a real day plan exists. Price is not shown.",
    country: "india",
    destinationSlug: "kerala",
    categorySlug: "wildlife-safaris",
    activitySlugs: ["wildlife-viewing"],
    durationDays: 3,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "photo-1441974231531-c6227db76b6e",
        "Sunlight through a dense green forest",
      ),
      photo(
        "photo-1561731216-c3a4d99437d5",
        "A tiger looking straight at the camera",
      ),
    ],
    highlights: [
      "Forest-edge mornings",
      "No sighting guarantee in the copy",
      "Itinerary left empty on purpose",
      "A second Kerala listing from a different operator",
    ],
    itinerary: null,
    includedServices: ["A naturalist in the sample description", "Park entry written as included"],
    excludedServices: ["Travel to the park", "Camera fees if a gate asks for them"],
    importantInformation: [
      sampleNote,
      "Animals are not scheduled. The copy says so to keep the listing honest.",
    ],
    operatorId: "cedar-field",
    klnkUrl: "https://example.com/klnk/demo/periyar-forest-watch",
    featured: false,
    trending: false,
    published: true,
    sample: true,
    createdAt: "2026-09-14",
    updatedAt: "2026-11-04",
  },
  {
    id: "tour-headland",
    slug: "headland-cycle",
    title: "Headland Cycle",
    shortDescription:
      "Three short coastal rides in Goa, with a support vehicle in the copy and no race timing.",
    description:
      "Monsoon Note lists a cycling sample so the category is not an empty page. Distances stay modest and the middle day is shorter. The route is fictional and does not name a real cycle-tour company.",
    country: "india",
    destinationSlug: "goa",
    categorySlug: "cycling-tours",
    activitySlugs: ["cycling", "coast"],
    durationDays: 3,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "photo-1512343879784-a960bf40e7f2",
        "Palms leaning over a bright shoreline",
      ),
      photo(
        "photo-1541625602330-2277a4c46182",
        "Two road cyclists riding a coastal road",
      ),
    ],
    highlights: [
      "Rides kept under a half day",
      "One headland and one inland lane",
      "Support vehicle mentioned only as sample copy",
      "No event or race attached",
    ],
    itinerary: [
      {
        title: "Day 1 — Coast lane",
        detail: "A morning ride and a long afternoon off the bike.",
      },
      {
        title: "Day 2 — Shorter loop",
        detail: "An easier loop for anyone who wants a lighter day.",
      },
      {
        title: "Day 3 — Headland and end",
        detail: "A final morning ride. The sample ends at noon.",
      },
    ],
    includedServices: ["Bicycle in the sample copy", "A support vehicle on the riding days"],
    excludedServices: ["Flights", "Helmet if you prefer your own"],
    importantInformation: [sampleNote],
    operatorId: "monsoon-note",
    klnkUrl: "https://example.com/klnk/demo/headland-cycle",
    featured: true,
    trending: true,
    published: true,
    sample: true,
    createdAt: "2026-09-16",
    updatedAt: "2026-11-05",
  },
  {
    id: "tour-kathmandu",
    slug: "shrine-and-market-walk",
    title: "Shrine and Market Walk",
    shortDescription:
      "Three days on foot in Kathmandu: courtyards, a market morning, and no trek transfer.",
    description:
      "A valley listing from Cedar Field so Nepal is not only high trails. The sample stays inside the city and does not pretend to include a flight to the mountains. Excluded services are left empty to show that the page hides a missing list.",
    country: "nepal",
    destinationSlug: "kathmandu",
    categorySlug: "cultural-experiences",
    activitySlugs: ["heritage-sites", "food-and-markets"],
    durationDays: 3,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "pexels-11785267",
        "Boudhanath stupa hung with lines of prayer flags under a blue sky",
      ),
      photo(
        "pexels-6102862",
        "The gilded spire of Boudhanath stupa, painted with watchful eyes",
      ),
    ],
    highlights: [
      "Walking only, no mountain transfer",
      "A market morning",
      "Courtyard time without a fixed monument checklist",
      "Excluded list intentionally empty",
    ],
    itinerary: [
      {
        title: "Day 1 — Neighbourhood",
        detail: "Arrive and walk one neighbourhood before dark.",
      },
      {
        title: "Day 2 — Market and courtyards",
        detail: "Morning market, afternoon courtyards, evening free.",
      },
      {
        title: "Day 3 — Ridge above the city",
        detail: "A short walk to a viewpoint and the sample ends.",
      },
    ],
    includedServices: ["A walking host on days 2 and 3"],
    excludedServices: null,
    importantInformation: [sampleNote],
    operatorId: "cedar-field",
    klnkUrl: "https://example.com/klnk/demo/shrine-and-market-walk",
    featured: false,
    trending: false,
    published: true,
    sample: true,
    createdAt: "2026-09-18",
    updatedAt: "2026-11-05",
  },
  {
    id: "tour-phewa",
    slug: "phewa-shore-days",
    title: "Phewa Shore Days",
    shortDescription:
      "Four days beside the lake at Pokhara, with a boat morning and no paraglide add-on.",
    description:
      "River Lane lists Pokhara as a water journey so it is not bundled into the Annapurna trek. The sample is lakeside walking and one boat morning. It does not sell a flight or a summit view as a guarantee, though the mountains are part of the setting.",
    country: "nepal",
    destinationSlug: "pokhara",
    categorySlug: "water-adventures",
    activitySlugs: ["river-and-lake"],
    durationDays: 4,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "pexels-38160025",
        "Rows of painted rowing boats on Phewa Lake below green hills",
      ),
      photo(
        "pexels-15846574",
        "Painted wooden boats moored on Phewa Lake below hazy hills",
      ),
    ],
    highlights: [
      "Lakeside base",
      "One boat morning",
      "A day with no activity booked in the copy",
      "Separate from the Annapurna trek sample",
    ],
    itinerary: [
      {
        title: "Day 1 — Shore walk",
        detail: "Arrive and walk the shore path.",
      },
      {
        title: "Day 2 — Boat morning",
        detail: "A few hours on the water. Afternoon free.",
      },
      {
        title: "Day 3 — Unscheduled",
        detail: "A day with nothing planned, written that way on purpose.",
      },
      {
        title: "Day 4 — Leave",
        detail: "The sample ends after breakfast.",
      },
    ],
    includedServices: ["Lakeside stay in the sample", "The boat hours on day 2"],
    excludedServices: ["Flights", "Activities that are not named"],
    importantInformation: [sampleNote],
    operatorId: "river-lane",
    klnkUrl: "https://example.com/klnk/demo/phewa-shore-days",
    featured: false,
    trending: true,
    published: true,
    sample: true,
    createdAt: "2026-09-20",
    updatedAt: "2026-11-06",
  },
  {
    id: "tour-namche",
    slug: "namche-ridge-walk",
    title: "Namche Ridge Walk",
    shortDescription:
      "Fifteen days of acclimatised walking toward Namche, with rest days and no summit.",
    description:
      "The longest sample in the catalogue, from Ridge Desk, so the duration filter has a route of 15 days or more. The copy stops at the Namche ridge and walks back. It does not include a peak attempt, oxygen, or a permit brokerage.",
    country: "nepal",
    destinationSlug: "everest-region",
    categorySlug: "trekking-hiking",
    activitySlugs: ["high-altitude-walking"],
    durationDays: 15,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "photo-1544735716-392fe2489ffa",
        "A small stupa on a forested ridge below a wall of snow peaks",
      ),
      photo(
        "photo-1486870591958-9b9d0d1dda99",
        "A snow-streaked peak above a plain of golden grass",
      ),
    ],
    highlights: [
      "Rest days written in, not optional in the copy",
      "Turns around at the Namche ridge",
      "No summit language",
      "The only sample of 15 days or more",
    ],
    itinerary: [
      {
        title: "Days 1–2 — Valley approach",
        detail: "Two short days to start walking without gaining height quickly.",
      },
      {
        title: "Days 3–5 — Toward Namche",
        detail: "Gradual walking days with one afternoon off.",
      },
      {
        title: "Days 6–7 — Rest",
        detail: "Two rest days at the same place. The copy does not fill them.",
      },
      {
        title: "Days 8–9 — Ridge",
        detail: "A viewpoint day and a night back at the same lodge level.",
      },
      {
        title: "Days 10–15 — Walk out",
        detail: "The return is longer than the way in, with a final rest day.",
      },
    ],
    includedServices: ["A walking leader in the sample", "Lodge nights on the walking days"],
    excludedServices: ["International flights", "Insurance", "Personal kit"],
    importantInformation: [
      sampleNote,
      "Altitude is the constraint in this copy. The rest days are part of the sample, not a live medical plan.",
    ],
    operatorId: "ridge-desk",
    klnkUrl: "https://example.com/klnk/demo/namche-ridge-walk",
    featured: true,
    trending: true,
    published: true,
    sample: true,
    createdAt: "2026-09-22",
    updatedAt: "2026-11-06",
  },
  {
    id: "tour-poon",
    slug: "poon-hill-forest-loop",
    title: "Poon Hill Forest Loop",
    shortDescription:
      "Seven days in the Annapurna forests, looping to a viewpoint and back through villages.",
    description:
      "A second Nepal trek from Ridge Desk, shorter than the Everest sample and in a different region. The loop is written as forest, villages and one dawn viewpoint. Included services are omitted so the page can hide an empty column.",
    country: "nepal",
    destinationSlug: "annapurna-region",
    categorySlug: "trekking-hiking",
    activitySlugs: ["high-altitude-walking", "village-walks"],
    durationDays: 7,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "photo-1526772662000-3f88f10405ff",
        "A walker beside a stone cairn high above a mountain valley",
      ),
      photo(
        "photo-1551632811-561732d1e306",
        "Hikers following a dirt path through grass",
      ),
    ],
    highlights: [
      "Forest walking",
      "One dawn viewpoint",
      "Village nights in the copy",
      "Included list left empty on purpose",
    ],
    itinerary: [
      {
        title: "Day 1 — In",
        detail: "A short afternoon walk from the road.",
      },
      {
        title: "Day 2 — Forest",
        detail: "A full day under the trees.",
      },
      {
        title: "Day 3 — Villages",
        detail: "Walking between villages, ending early.",
      },
      {
        title: "Day 4 — Viewpoint",
        detail: "An early walk to the viewpoint and a return to the same lodge.",
      },
      {
        title: "Day 5 — Contour",
        detail: "A contour day with little height gain.",
      },
      {
        title: "Day 6 — Down",
        detail: "Descent toward the road.",
      },
      {
        title: "Day 7 — Out",
        detail: "The sample ends at the road.",
      },
    ],
    includedServices: null,
    excludedServices: ["Flights into Nepal", "Travel to the trailhead"],
    importantInformation: [sampleNote],
    operatorId: "ridge-desk",
    klnkUrl: "https://example.com/klnk/demo/poon-hill-forest-loop",
    featured: false,
    trending: false,
    published: true,
    sample: true,
    createdAt: "2026-09-24",
    updatedAt: "2026-11-07",
  },
  {
    id: "tour-paro",
    slug: "paro-valley-ridge-walk",
    title: "Paro Valley Ridge Walk",
    shortDescription:
      "Five days in Paro: valley paths, one ridge, and time in town that is not filled.",
    description:
      "Cedar Field lists a Bhutan sample that mixes walking and town time. The ridge day is the long one. Other days stay short. The copy does not claim a national tourism partnership or a festival date.",
    country: "bhutan",
    destinationSlug: "paro",
    categorySlug: "cultural-experiences",
    activitySlugs: ["heritage-sites", "high-altitude-walking"],
    durationDays: 5,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "pexels-7806281",
        "Paro Taktsang on its cliff, seen through strings of prayer flags",
      ),
      photo(
        "pexels-37908899",
        "Paro Taktsang, the Tiger's Nest monastery, built into a sheer cliff",
      ),
    ],
    highlights: [
      "One long ridge day",
      "Other days kept short",
      "Town time left unscheduled",
      "No festival date invented",
    ],
    itinerary: [
      {
        title: "Day 1 — Valley floor",
        detail: "A flat walk and an early evening.",
      },
      {
        title: "Day 2 — Town",
        detail: "A morning visit and a free afternoon.",
      },
      {
        title: "Day 3 — Ridge",
        detail: "The long walking day, returning to the same base.",
      },
      {
        title: "Day 4 — Fields",
        detail: "A half day on field paths.",
      },
      {
        title: "Day 5 — Leave",
        detail: "The sample ends.",
      },
    ],
    includedServices: ["A host for the walking day", "Lodging in the sample copy"],
    excludedServices: ["Flights", "Visa fees"],
    importantInformation: [sampleNote],
    operatorId: "cedar-field",
    klnkUrl: "https://example.com/klnk/demo/paro-valley-ridge-walk",
    featured: true,
    trending: false,
    published: true,
    sample: true,
    createdAt: "2026-09-26",
    updatedAt: "2026-11-07",
  },
  {
    id: "tour-thimphu",
    slug: "thimphu-archive-walk",
    title: "Thimphu Archive Walk",
    shortDescription:
      "Three quiet days in Thimphu. This listing has its own KLNK placeholder, separate from Paro.",
    description:
      "A local-experience sample in Thimphu from the same fictional operator as Paro, with a different URL. The days are archives, a market and a short walk above town. Nothing is sold as a sightseeing bus.",
    country: "bhutan",
    destinationSlug: "thimphu",
    categorySlug: "local-experiences",
    activitySlugs: ["heritage-sites", "food-and-markets"],
    durationDays: 3,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "pexels-34556006",
        "A row of gilded stupas against a cloudy sky in Thimphu",
      ),
      photo(
        "pexels-34738160",
        "Thimphu spread across a green hillside, seen from above",
      ),
    ],
    highlights: [
      "Archive morning",
      "Market walk",
      "A short ridge above town",
      "Its own KLNK placeholder, not the Paro link",
    ],
    itinerary: [
      {
        title: "Day 1 — Archive",
        detail: "A morning indoors and a free afternoon.",
      },
      {
        title: "Day 2 — Market",
        detail: "Market lanes and a long lunch. No further plan.",
      },
      {
        title: "Day 3 — Ridge and leave",
        detail: "A short walk, then the sample ends.",
      },
    ],
    includedServices: ["A host on the archive morning"],
    excludedServices: ["Flights", "Museum tickets if a desk charges them"],
    importantInformation: [sampleNote],
    operatorId: "cedar-field",
    klnkUrl: "https://example.com/klnk/demo/thimphu-archive-walk",
    featured: false,
    trending: false,
    published: true,
    sample: true,
    createdAt: "2026-09-28",
    updatedAt: "2026-11-08",
  },
  {
    id: "tour-ella",
    slug: "hill-country-rail-days",
    title: "Hill Country Rail Days",
    shortDescription:
      "Four days of hill-country roads and a tea walk near Ella, with more time outside the car than in it.",
    description:
      "Monsoon Note lists a road trip so the category has a real sample. The copy uses the train line as scenery and puts a tea walk on the second day. It does not reserve a named carriage or promise a seat.",
    country: "sri-lanka",
    destinationSlug: "ella",
    categorySlug: "road-trips",
    activitySlugs: ["scenic-drives"],
    durationDays: 4,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "pexels-34218649",
        "The Nine Arches bridge from above, set in thick green forest",
      ),
      photo(
        "pexels-30581907",
        "The Nine Arches railway bridge in Ella, surrounded by forest",
      ),
    ],
    highlights: [
      "More walking than driving",
      "A tea-garden walk",
      "No reserved carriage claimed",
      "A road-trip category with an actual listing",
    ],
    itinerary: [
      {
        title: "Day 1 — Into the hills",
        detail: "A drive with a long stop. Walking in the late afternoon.",
      },
      {
        title: "Day 2 — Tea walk",
        detail: "Morning on foot among tea slopes. Afternoon free.",
      },
      {
        title: "Day 3 — Viewpoint road",
        detail: "A short drive and a longer walk to a view.",
      },
      {
        title: "Day 4 — Down",
        detail: "Leave the hills. The sample ends.",
      },
    ],
    includedServices: ["A driver on the transfer days", "The tea walk host"],
    excludedServices: ["Train tickets", "International flights"],
    importantInformation: [sampleNote],
    operatorId: "monsoon-note",
    klnkUrl: "https://example.com/klnk/demo/hill-country-rail-days",
    featured: false,
    trending: true,
    published: true,
    sample: true,
    createdAt: "2026-10-02",
    updatedAt: "2026-11-08",
  },
  {
    id: "tour-kandy",
    slug: "lake-and-temple-town",
    title: "Lake and Temple Town",
    shortDescription:
      "Three days around Kandy lake: a morning circuit, a temple-town walk, and an empty afternoon.",
    description:
      "Cedar Field lists Kandy as its own cultural sample, separate from the Ella road trip and from a different operator. The copy keeps the religious sites general and does not describe ritual access that has not been arranged.",
    country: "sri-lanka",
    destinationSlug: "kandy",
    categorySlug: "cultural-experiences",
    activitySlugs: ["heritage-sites"],
    durationDays: 3,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "pexels-32795550",
        "Kandy Lake with the town and green hills around it",
      ),
      photo(
        "pexels-14372006",
        "Kandy Lake at dusk, with town lights reflected in the water",
      ),
    ],
    highlights: [
      "A lake circuit on foot",
      "One temple-town morning",
      "An afternoon with nothing added",
      "Different operator from the Ella road sample",
    ],
    itinerary: [
      {
        title: "Day 1 — Lake circuit",
        detail: "Walk the lake and stop early.",
      },
      {
        title: "Day 2 — Temple town",
        detail: "A morning walk. The copy does not schedule an inner ritual.",
      },
      {
        title: "Day 3 — Leave",
        detail: "The sample ends after breakfast.",
      },
    ],
    includedServices: ["A walking host on day 2"],
    excludedServices: ["Train or road travel into Kandy"],
    importantInformation: [sampleNote],
    operatorId: "cedar-field",
    klnkUrl: "https://example.com/klnk/demo/lake-and-temple-town",
    featured: false,
    trending: false,
    published: true,
    sample: true,
    createdAt: "2026-10-04",
    updatedAt: "2026-11-09",
  },
  {
    id: "tour-mirissa",
    slug: "south-coast-swim-days",
    title: "South Coast Swim Days",
    shortDescription:
      "Four days on the south coast for swimming and shore walks. No boat sighting is included.",
    description:
      "River Lane lists Mirissa as a coast sample. The copy is swimming, shore walks and one unscheduled day. It explicitly does not include a wildlife boat, so the listing cannot be read as a whale tour.",
    country: "sri-lanka",
    destinationSlug: "mirissa",
    categorySlug: "water-adventures",
    activitySlugs: ["coast"],
    durationDays: 4,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "photo-1507525428034-b723cf961d3e",
        "Low sun over a pale beach and clear shallow water",
      ),
    ],
    highlights: [
      "Swim mornings",
      "A shore walk",
      "One empty day",
      "No boat trip in the sample",
    ],
    itinerary: [
      {
        title: "Day 1 — Arrive and swim",
        detail: "A short swim if the sea is calm, then rest.",
      },
      {
        title: "Day 2 — Shore walk",
        detail: "Walking the coast path in the morning.",
      },
      {
        title: "Day 3 — Unscheduled",
        detail: "Nothing is added. The day stays open.",
      },
      {
        title: "Day 4 — Leave",
        detail: "The sample ends.",
      },
    ],
    includedServices: ["A simple shore stay in the copy"],
    excludedServices: ["Boat trips", "Flights"],
    importantInformation: [
      sampleNote,
      "Sea conditions change. The copy does not tell anyone to swim in rough water.",
    ],
    operatorId: "river-lane",
    klnkUrl: "https://example.com/klnk/demo/south-coast-swim-days",
    featured: false,
    trending: false,
    published: true,
    sample: true,
    createdAt: "2026-10-06",
    updatedAt: "2026-11-09",
  },
  {
    id: "tour-hunza",
    slug: "apricot-valley-walk",
    title: "Apricot Valley Walk",
    shortDescription:
      "Six days of village walking in Hunza, below the high glaciers and without a jeep safari add-on.",
    description:
      "Ridge Desk lists Hunza so Pakistan is present in the directory with its own page and its own KLNK placeholder. The sample stays in the villages and orchards. It does not describe a border crossing or a restricted zone.",
    country: "pakistan",
    destinationSlug: "hunza",
    categorySlug: "mountain-adventures",
    activitySlugs: ["village-walks", "high-altitude-walking"],
    durationDays: 6,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "pexels-35170643",
        "A walker with arms raised on a rock above the Hunza valley",
      ),
      photo(
        "pexels-15793176",
        "A river cutting through a dry, steep-sided valley below brown mountains",
      ),
    ],
    highlights: [
      "Village and orchard paths",
      "No glacier travel in the copy",
      "A rest day in the middle",
      "Its own KLNK placeholder for this valley",
    ],
    itinerary: [
      {
        title: "Day 1 — Valley floor",
        detail: "Arrive and walk an orchard path.",
      },
      {
        title: "Day 2 — Between villages",
        detail: "A full walking day on village paths.",
      },
      {
        title: "Day 3 — Rest",
        detail: "A day with no distance.",
      },
      {
        title: "Day 4 — Higher path",
        detail: "A higher path with a return to the same village.",
      },
      {
        title: "Day 5 — Long contour",
        detail: "The longest day, still below the glaciers in the copy.",
      },
      {
        title: "Day 6 — Leave",
        detail: "The sample ends in the valley.",
      },
    ],
    includedServices: ["A walking host", "Simple village stays in the copy"],
    excludedServices: ["Flights", "Travel insurance"],
    importantInformation: [sampleNote],
    operatorId: "ridge-desk",
    klnkUrl: "https://example.com/klnk/demo/apricot-valley-walk",
    featured: false,
    trending: false,
    published: true,
    sample: true,
    createdAt: "2026-10-08",
    updatedAt: "2026-11-10",
  },
  {
    id: "tour-sundarbans",
    slug: "mangrove-creek-camp",
    title: "Mangrove Creek Camp",
    shortDescription:
      "Three days on a mangrove creek. No KLNK address is stored, so booking stays unavailable.",
    description:
      "River Lane lists a Sundarbans camp so Bangladesh has a destination page. klnkUrl is null. The tour can be read and compared, and the page explains that there is no booking button until an address is added. Wildlife is described as possible, not promised.",
    country: "bangladesh",
    destinationSlug: "sundarbans",
    categorySlug: "wildlife-safaris",
    activitySlugs: ["wildlife-viewing", "camping"],
    durationDays: 3,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "pexels-33337866",
        "A brown tidal creek lined with green mangrove forest",
      ),
    ],
    highlights: [
      "Creek travel in the sample",
      "A camp night",
      "No sighting promise",
      "Booking hidden because klnkUrl is null",
    ],
    itinerary: [
      {
        title: "Day 1 — Into the creeks",
        detail: "A boat afternoon and a camp night.",
      },
      {
        title: "Day 2 — Creek watch",
        detail: "A day on the water. Animals are not scheduled.",
      },
      {
        title: "Day 3 — Out",
        detail: "Return. The sample ends.",
      },
    ],
    includedServices: ["Boat days in the copy", "One camp night"],
    excludedServices: ["Travel to the jetty"],
    importantInformation: [
      sampleNote,
      "Leave klnkUrl empty until you have the real address. The button appears on its own when the value is a valid http or https URL.",
    ],
    operatorId: "river-lane",
    klnkUrl: null,
    featured: false,
    trending: true,
    published: true,
    sample: true,
    createdAt: "2026-10-12",
    updatedAt: "2026-11-12",
  },
  {
    id: "tour-draft",
    slug: "unpublished-draft-route",
    title: "Unpublished Draft Route",
    shortDescription: "A draft that must not appear on any public page.",
    description:
      "This record exists so the published flag can be tested. It has a KLNK placeholder that should never be linked from the site while published is false.",
    country: "india",
    destinationSlug: "goa",
    categorySlug: "local-experiences",
    activitySlugs: ["coast"],
    durationDays: 2,
    price: null,
    currency: null,
    priceVerified: false,
    images: [
      photo(
        "photo-1512343879784-a960bf40e7f2",
        "Palm trees on a coast, used only for this hidden draft",
      ),
    ],
    highlights: ["Hidden while unpublished"],
    itinerary: null,
    includedServices: null,
    excludedServices: null,
    importantInformation: ["Draft. Not public."],
    operatorId: "monsoon-note",
    klnkUrl: "https://example.com/klnk/demo/unpublished-draft-route",
    featured: true,
    trending: true,
    published: false,
    sample: true,
    createdAt: "2026-10-20",
    updatedAt: "2026-11-12",
  },
];
