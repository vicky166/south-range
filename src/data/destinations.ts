import { photo } from "./images";
import type { Destination } from "./types";

/**
 * Destinations with real copy. The catalogue hides any destination that has
 * no published tour, so an empty record never becomes a public listing.
 */
export const destinations: Destination[] = [
  {
    slug: "ladakh",
    name: "Ladakh",
    country: "india",
    summary:
      "High desert valleys and short acclimatised walks. The sample listing here stays in the lower villages rather than inventing a summit.",
    image: photo(
      "pexels-5015219",
      "A white monastery on a bare ridge above a green valley, with snow peaks behind",
    ),
    coordinates: { lat: 34.15, lng: 77.58 },
    tagline: "High desert, slow villages",
    season: "Jun – Sep",
    featured: true,
  },
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    country: "india",
    summary:
      "Forested ridges and village paths in the western Himalaya, represented by one sample footpath.",
    image: photo(
      "photo-1486870591958-9b9d0d1dda99",
      "A snow-streaked peak above a plain of golden grass",
    ),
    coordinates: { lat: 32.24, lng: 77.19 },
    featured: false,
  },
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    country: "india",
    summary:
      "Meadow walks east of the Ganges headwaters. The sample route is a pass walk, not an expedition.",
    image: photo(
      "photo-1506905925346-21bda4d32df4",
      "Snow peaks at sunrise above a sea of cloud",
    ),
    coordinates: { lat: 30.56, lng: 79.56 },
    featured: false,
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    country: "india",
    summary:
      "Sandstone towns and a short desert camp. Two sample operators list different styles of journey here.",
    image: photo(
      "photo-1477587458883-47145ed94245",
      "The pink sandstone facade of the Hawa Mahal in Jaipur, with horses in the street",
    ),
    coordinates: { lat: 26.92, lng: 70.91 },
    featured: false,
  },
  {
    slug: "kerala",
    name: "Kerala",
    country: "india",
    summary:
      "Backwater villages and a forest watch, listed separately so the directory can show more than one style in the same state.",
    image: photo(
      "photo-1602216056096-3b40cc0c9944",
      "A houseboat moving through a palm-lined backwater",
    ),
    coordinates: { lat: 9.5, lng: 76.34 },
    featured: true,
  },
  {
    slug: "goa",
    name: "Goa",
    country: "india",
    summary:
      "A short coastal ride on headland roads, kept separate from beach-resort packages.",
    image: photo(
      "photo-1512343879784-a960bf40e7f2",
      "Palm trees along a bright coast",
    ),
    coordinates: { lat: 15.3, lng: 74.12 },
    featured: false,
  },
  {
    slug: "kathmandu",
    name: "Kathmandu",
    country: "nepal",
    summary:
      "A walking sample through shrines and markets in the valley, not a trek departure.",
    image: photo(
      "pexels-11785267",
      "Boudhanath stupa hung with lines of prayer flags under a blue sky",
    ),
    coordinates: { lat: 27.72, lng: 85.32 },
    featured: false,
  },
  {
    slug: "pokhara",
    name: "Pokhara",
    country: "nepal",
    summary:
      "Lake-shore days with the Annapurna skyline in view, listed as a water journey rather than a trek.",
    image: photo(
      "pexels-15846574",
      "Painted wooden boats moored on Phewa Lake below hazy hills",
    ),
    coordinates: { lat: 28.21, lng: 83.99 },
    tagline: "A lake beneath the Annapurnas",
    season: "Oct – Nov · Mar – Apr",
    featured: false,
  },
  {
    slug: "everest-region",
    name: "Everest Region",
    country: "nepal",
    summary:
      "A longer acclimatised walk toward Namche. The sample does not claim a summit or a permit service.",
    image: photo(
      "photo-1544735716-392fe2489ffa",
      "A small stupa on a forested ridge below a wall of snow peaks",
    ),
    coordinates: { lat: 27.8, lng: 86.71 },
    featured: true,
  },
  {
    slug: "annapurna-region",
    name: "Annapurna Region",
    country: "nepal",
    summary:
      "A forest loop toward a well-known viewpoint, written as a sample itinerary with rest days.",
    image: photo(
      "photo-1526772662000-3f88f10405ff",
      "A walker beside a stone cairn high above a mountain valley",
    ),
    coordinates: { lat: 28.53, lng: 83.88 },
    featured: false,
  },
  {
    slug: "paro",
    name: "Paro",
    country: "bhutan",
    summary:
      "Valley paths and a ridge walk above Paro, paced as a short cultural journey.",
    image: photo(
      "pexels-37908899",
      "Paro Taktsang, the Tiger's Nest monastery, built into a sheer cliff",
    ),
    coordinates: { lat: 27.43, lng: 89.42 },
    tagline: "A valley of dzongs and ridgelines",
    season: "Mar – May · Sep – Nov",
    featured: true,
  },
  {
    slug: "thimphu",
    name: "Thimphu",
    country: "bhutan",
    summary:
      "A slow town listing: archives, markets and a short walk above the valley.",
    image: photo(
      "pexels-34738160",
      "Thimphu spread across a green hillside, seen from above",
    ),
    coordinates: { lat: 27.47, lng: 89.64 },
    featured: false,
  },
  {
    slug: "ella",
    name: "Ella",
    country: "sri-lanka",
    summary:
      "Hill-country roads and tea walks, listed as a road journey with time on foot.",
    image: photo(
      "pexels-30581907",
      "The Nine Arches railway bridge in Ella, surrounded by forest",
    ),
    coordinates: { lat: 6.87, lng: 81.05 },
    featured: true,
  },
  {
    slug: "kandy",
    name: "Kandy",
    country: "sri-lanka",
    summary:
      "A lake circuit and temple-town walks, kept to a few days.",
    image: photo(
      "pexels-32795550",
      "Kandy Lake with the town and green hills around it",
    ),
    coordinates: { lat: 7.29, lng: 80.63 },
    featured: false,
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    country: "sri-lanka",
    summary:
      "South-coast swim days. The sample does not promise whale sightings.",
    image: photo(
      "photo-1507525428034-b723cf961d3e",
      "A pale sandy beach meeting turquoise water",
    ),
    coordinates: { lat: 5.95, lng: 80.46 },
    tagline: "The south coast, unhurried",
    season: "Nov – Apr",
    featured: false,
  },
  {
    slug: "hunza",
    name: "Hunza",
    country: "pakistan",
    summary:
      "Apricot villages and a valley walk beneath the Karakoram, as one sample listing.",
    image: photo(
      "pexels-35061821",
      "The Hunza valley at dusk, with autumn poplars above a winding blue river",
    ),
    coordinates: { lat: 36.32, lng: 74.65 },
    tagline: "Orchards under the Karakoram",
    season: "Apr – Oct",
    featured: false,
  },
  {
    slug: "sundarbans",
    name: "Sundarbans",
    country: "bangladesh",
    summary:
      "A mangrove creek camp. Booking stays unavailable until a KLNK address is stored on the tour.",
    image: photo(
      "pexels-33337866",
      "A brown tidal creek lined with green mangrove forest",
    ),
    coordinates: { lat: 21.95, lng: 89.18 },
    tagline: "Tide country, by boat",
    season: "Nov – Feb",
    featured: false,
  },
];
