import { photo } from "./images";
import type { Collection } from "./types";

/**
 * Editorial collections. Each one is a saved directory query, so the tours
 * inside it always come from the live catalogue and the count stays honest.
 * Add a collection by appending a record. Use any TourQuery field.
 */
export const collections: Collection[] = [
  {
    slug: "above-the-treeline",
    title: "Above the Treeline",
    dek: "Walks where the air thins and the days get shorter on purpose.",
    image: photo(
      "photo-1571401835393-8c5f35328320",
      "Prayer flags strung across a ridge below a sharp snow peak",
    ),
    query: { activity: "high-altitude-walking" },
  },
  {
    slug: "old-stone-living-towns",
    title: "Old Stone, Living Towns",
    dek: "Forts, shrines and markets, paced for looking rather than ticking off.",
    image: photo(
      "photo-1477587458883-47145ed94245",
      "The pink sandstone facade of the Hawa Mahal in Jaipur, with horses in the street",
    ),
    query: { activity: "heritage-sites" },
  },
  {
    slug: "under-canvas",
    title: "Under Canvas",
    dek: "Nights outdoors, from desert sand to mangrove creeks.",
    image: photo(
      "photo-1504280390367-361c6d9f38f4",
      "Looking out of an open tent toward a pine forest",
    ),
    query: { activity: "camping" },
  },
  {
    slug: "the-waters-edge",
    title: "The Water's Edge",
    dek: "Backwaters and lake shores, where the boat sets the pace.",
    image: photo(
      "photo-1602216056096-3b40cc0c9944",
      "A houseboat moving through a palm-lined backwater",
    ),
    query: { activity: "river-and-lake" },
  },
];
