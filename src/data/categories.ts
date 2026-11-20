import { photo } from "./images";
import type { Category } from "./types";

/** Add a category here. It appears once a published tour uses categorySlug. */
export const categories: Category[] = [
  {
    slug: "trekking-hiking",
    name: "Trekking and Hiking",
    summary: "Multi-day walks on trails, from valley paths to high ridges.",
    image: photo(
      "photo-1551632811-561732d1e306",
      "Two people walking a grassy mountain trail",
    ),
  },
  {
    slug: "mountain-adventures",
    name: "Mountain Adventures",
    summary: "High valleys and passes where the journey is the point, not a summit claim.",
    image: photo(
      "photo-1464822759023-fed622ff2c3b",
      "Snow mountains above a forested valley and a lake",
    ),
  },
  {
    slug: "wildlife-safaris",
    name: "Wildlife and Safaris",
    summary: "Forest and mangrove days organised around watching animals, not a guarantee of sightings.",
    image: photo(
      "photo-1561731216-c3a4d99437d5",
      "A tiger looking straight at the camera",
    ),
  },
  {
    slug: "cultural-experiences",
    name: "Cultural Experiences",
    summary: "Towns, shrines, forts and markets, paced for looking rather than ticking sites.",
    image: photo(
      "photo-1548013146-72479768bada",
      "The Taj Mahal framed by a carved sandstone archway",
    ),
  },
  {
    slug: "camping",
    name: "Camping",
    summary: "Nights outdoors, with the sample listing clear about what is and is not included.",
    image: photo(
      "photo-1504280390367-361c6d9f38f4",
      "Looking out of an open tent toward a pine forest",
    ),
  },
  {
    slug: "water-adventures",
    name: "Water Adventures",
    summary: "Lakes, rivers and the coast, listed only where a sample itinerary exists.",
    image: photo(
      "photo-1439066615861-d1af74d74000",
      "A wooden jetty on a still, forest-lined lake",
    ),
  },
  {
    slug: "road-trips",
    name: "Road Trips",
    summary: "Scenic drives with time out of the vehicle, not a transfer between hotels.",
    image: photo(
      "photo-1469854523086-cc02fe5d8800",
      "A camper van on a desert road below red rock towers",
    ),
  },
  {
    slug: "cycling-tours",
    name: "Cycling Tours",
    summary: "Rides on quiet roads and coastal lanes, with distance described in the itinerary.",
    image: photo(
      "photo-1541625602330-2277a4c46182",
      "Two road cyclists riding a coastal road",
    ),
  },
  {
    slug: "local-experiences",
    name: "Local Experiences",
    summary: "Slower days in villages, markets and neighbourhoods.",
    image: photo(
      "photo-1602216056096-3b40cc0c9944",
      "A houseboat on a palm-lined backwater",
    ),
  },
];
