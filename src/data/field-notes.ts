import { photo } from "./images";
import type { FieldNote } from "./types";

/**
 * Field Notes are short editorial guides. They give general advice and
 * explain how the directory works. They do not describe a trip anyone took,
 * and they do not stand in for medical or legal advice.
 */
export const fieldNotes: FieldNote[] = [
  {
    slug: "read-a-listing-before-you-follow-it",
    title: "Read a Listing Before You Follow It",
    kicker: "How the index works",
    dek: "Every journey here belongs to one operator and leaves through one link. Here is what to check before you click.",
    image: photo(
      "photo-1626621331169-5f34be280ed9",
      "Snow-covered terraces and a hill village beneath drifting cloud",
    ),
    publishedAt: "2026-11-12",
    pullQuote: "The directory points. The operator plans, prices and books.",
    body: [
      {
        paragraphs: [
          "South Range is an index, not a tour company. Each listing is written for one journey run by one independent operator, and the operator's name sits on every card and every page. If two operators work in the same valley, they get two separate listings.",
          "That separation matters most at the end of a page. The booking or enquiry button on a tour opens the KLNK address stored for that tour and nothing else. No two tours share a link, and no link is guessed. When a tour has no valid address yet, the page says booking is unavailable instead of showing a button that goes nowhere.",
        ],
      },
      {
        heading: "Three things to check",
        paragraphs: [
          "The operator. Read the short operator note on the tour page and use the link to see their other listings. A pattern of trips tells you more than one description does.",
          "The price line. A figure only appears when it has been verified for that listing. If a page says there is no verified price, ask the operator directly before you plan around a number.",
          "The sample label. While the index is being built, some listings are placeholders for layout and are marked as samples. A sample is not a departure and its link is not a booking system.",
        ],
      },
    ],
  },
  {
    slug: "altitude-is-not-a-race",
    title: "Altitude Is Not a Race",
    kicker: "On the trail",
    dek: "The best high routes are written slowly. Why rest days are part of the walk, not a pause in it.",
    image: photo(
      "photo-1605649487212-47bdab064df7",
      "Snow-dusted mountain wall above dark pine forest in morning haze",
    ),
    publishedAt: "2026-11-05",
    pullQuote: "Climb high if you must, but sleep a little lower and a little later.",
    relatedQuery: { activity: "high-altitude-walking" },
    body: [
      {
        paragraphs: [
          "Many of the walks in this index start high. Leh, Namche and the upper Annapurna trails all sit at heights where the body needs time to adjust, and fitness at sea level does not guarantee an easy first day.",
          "Widely published travel-health guidance suggests that above about 3,000 metres you avoid raising the height you sleep at by more than roughly 500 metres a day, and build in a rest day every three or four days. Good itineraries already do this. Treat a short day as part of the plan.",
        ],
      },
      {
        heading: "Listen early",
        paragraphs: [
          "Headache, nausea, dizziness and unusual tiredness are common early signs of altitude illness. They are a reason to stop climbing, not to push on. If symptoms get worse, going down is the standard first response.",
          "Talk to a doctor or a travel clinic before a high trip, especially about medication and existing conditions. Ask the operator how their route handles acclimatisation and what happens if someone needs to descend.",
        ],
      },
    ],
  },
  {
    slug: "the-case-for-a-slower-itinerary",
    title: "The Case for a Slower Itinerary",
    kicker: "Ways to travel",
    dek: "Fewer places, longer stays, and the small courtesies that make a village walk feel like a visit rather than a viewing.",
    image: photo(
      "photo-1602216056096-3b40cc0c9944",
      "A covered houseboat on a palm-lined backwater",
    ),
    publishedAt: "2026-10-28",
    relatedQuery: { category: "local-experiences" },
    body: [
      {
        paragraphs: [
          "It is tempting to fit four regions into ten days. The journeys that stay with people tend to do the opposite: two or three bases, real time on foot, and an afternoon with nothing scheduled.",
          "Slower routes also cost less in transfers and leave room for weather, which in the mountains and during the monsoon is never a footnote.",
        ],
      },
      {
        heading: "Small courtesies",
        paragraphs: [
          "Ask before you photograph people, and accept a no. At temples, monasteries and mosques, cover shoulders and knees and remove your shoes where you are asked to. Walk clockwise around stupas and prayer wheels in Buddhist areas.",
          "Buy from the people whose village you are walking through when you can, and keep to the path in fields. None of this is complicated, and all of it changes how a place receives you.",
        ],
      },
    ],
  },
];
