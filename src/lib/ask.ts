import type { TourQuery } from "../data/types";
import { getActivities, getCategories, getCountries, getDestinations } from "./catalog";
import { durationOptions } from "./filters";

/**
 * "Describe it" search. A plain sentence is read with simple word rules
 * (no model, no network) and turned into the same filters the directory
 * already uses. Anything it cannot place falls back to a keyword search.
 */

export type AskTerm = {
  key: keyof TourQuery;
  label: string;
};

export type AskReading = {
  text: string;
  query: TourQuery;
  terms: AskTerm[];
};

const countryAliases: Record<string, string[]> = {
  "sri-lanka": ["srilanka", "ceylon"],
};

const destinationAliases: Record<string, string[]> = {
  ladakh: ["leh", "zanskar"],
  "himachal-pradesh": ["himachal", "manali", "kullu", "malana"],
  uttarakhand: ["garhwal", "kuari"],
  rajasthan: ["thar", "jaisalmer", "jodhpur", "jaipur", "desert"],
  kerala: ["backwater", "backwaters", "periyar"],
  "everest-region": ["everest", "khumbu", "namche", "sherpa"],
  "annapurna-region": ["annapurna", "poon hill"],
  pokhara: ["phewa"],
  paro: ["tiger's nest", "tigers nest"],
  hunza: ["karakoram"],
  sundarbans: ["sundarban", "mangrove", "mangroves"],
};

const categoryWords: Record<string, string[]> = {
  "trekking-hiking": ["trek", "treks", "trekking", "hike", "hikes", "hiking", "walk", "walks", "walking", "on foot"],
  "mountain-adventures": ["mountain", "mountains", "peaks", "himalaya", "himalayas", "himalayan", "high pass"],
  "wildlife-safaris": ["wildlife", "safari", "safaris", "tiger", "tigers", "elephant", "elephants", "birds", "birding", "animals"],
  "cultural-experiences": ["culture", "cultural", "temple", "temples", "monastery", "monasteries", "fort", "forts", "heritage", "history"],
  camping: ["camp", "camping", "tent", "tents", "under canvas", "stars"],
  "water-adventures": ["water", "kayak", "kayaking", "raft", "rafting", "swim", "swimming", "beach", "beaches", "boat", "lake", "river", "sea", "coast"],
  "road-trips": ["road trip", "road trips", "drive", "driving", "jeep", "overland"],
  "cycling-tours": ["cycle", "cycling", "bike", "biking", "bicycle"],
  "local-experiences": ["local", "village", "villages", "homestay", "food", "cooking", "market", "markets", "slow"],
};

const activityWords: Record<string, string[]> = {
  "high-altitude-walking": ["altitude", "high altitude", "high-altitude"],
  "wildlife-viewing": ["wildlife viewing", "spot wildlife"],
  "heritage-sites": ["heritage sites", "ruins"],
  "food-and-markets": ["food and markets", "street food"],
  "scenic-drives": ["scenic drive", "scenic drives"],
};

const numberWords: Record<string, number> = {
  a: 1,
  an: 1,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  couple: 2,
};

function normalise(text: string): string {
  return ` ${text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9'+\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

/** Position of the first whole-phrase match, or -1. */
function find(haystack: string, phrases: string[]): number {
  let best = -1;
  for (const phrase of phrases) {
    const index = haystack.indexOf(` ${phrase} `);
    if (index !== -1 && (best === -1 || index < best)) best = index;
  }
  return best;
}

/** Earliest-mentioned match wins, so "camping, maybe some trekking" reads as camping. */
function firstMatch(haystack: string, table: [string, string[]][]): string | undefined {
  let winner: string | undefined;
  let winnerAt = Infinity;
  for (const [slug, phrases] of table) {
    const at = find(haystack, phrases);
    if (at !== -1 && at < winnerAt) {
      winner = slug;
      winnerAt = at;
    }
  }
  return winner;
}

function bucketFor(days: number): string {
  if (days <= 3) return "1-3";
  if (days <= 7) return "4-7";
  if (days <= 14) return "8-14";
  return "15+";
}

function readDuration(haystack: string): string | undefined {
  const count = (word: string) => (/^\d+$/.test(word) ? Number(word) : numberWords[word]);

  const days = haystack.match(/ (\d+|a|an|one|two|three|four|five|six|seven|eight|nine|ten|couple)(?: of)? (?:days?|nights?) /);
  if (days && count(days[1])) return bucketFor(count(days[1]));

  const weeks = haystack.match(/ (\d+|a|an|one|two|three|four|couple)(?: of)? weeks? /);
  if (weeks && count(weeks[1])) return bucketFor(count(weeks[1]) * 7);

  if (find(haystack, ["weekend", "short", "quick", "few days", "day trip"]) !== -1) return "1-3";
  if (find(haystack, ["week", "a week"]) !== -1) return "4-7";
  if (find(haystack, ["fortnight"]) !== -1) return "8-14";
  if (find(haystack, ["month", "long", "longest", "epic"]) !== -1) return "15+";
  return undefined;
}

export function readAsk(text: string): AskReading {
  const trimmed = text.trim().slice(0, 200);
  const haystack = normalise(trimmed);
  const query: TourQuery = {};
  const terms: AskTerm[] = [];

  const destinations = getDestinations();
  const destination = firstMatch(
    haystack,
    destinations.map((item) => [item.slug, [item.name.toLowerCase(), ...(destinationAliases[item.slug] ?? [])]]),
  );
  if (destination) {
    const match = destinations.find((item) => item.slug === destination)!;
    query.destination = destination;
    terms.push({ key: "destination", label: `${match.name}, ${match.countryName}` });
  } else {
    const countries = getCountries();
    const country = firstMatch(
      haystack,
      countries.map((item) => [item.slug, [item.name.toLowerCase(), ...(countryAliases[item.slug] ?? [])]]),
    );
    if (country) {
      query.country = country;
      terms.push({ key: "country", label: countries.find((item) => item.slug === country)!.name });
    }
  }

  const categories = getCategories();
  const category = firstMatch(
    haystack,
    Object.entries(categoryWords).filter(([slug]) => categories.some((item) => item.slug === slug)),
  );
  if (category) {
    query.category = category;
    terms.push({ key: "category", label: categories.find((item) => item.slug === category)!.name });
  }

  const activities = getActivities();
  const activity = firstMatch(
    haystack,
    Object.entries(activityWords).filter(([slug]) => activities.some((item) => item.slug === slug)),
  );
  if (activity) {
    query.activity = activity;
    terms.push({ key: "activity", label: activities.find((item) => item.slug === activity)!.name });
  }

  const duration = readDuration(haystack);
  if (duration) {
    query.duration = duration;
    terms.push({ key: "duration", label: durationOptions.find((option) => option.value === duration)!.label });
  }

  if (terms.length === 0 && trimmed) {
    query.q = trimmed;
    terms.push({ key: "q", label: `“${trimmed}”` });
  }

  return { text: trimmed, query, terms };
}

/** Example prompts shown beside the search. Each one is checked by a test to return results. */
export const askExamples = [
  { kicker: "Trekking", text: "A week of trekking in Nepal" },
  { kicker: "Wildlife", text: "Mangroves and wildlife in Bangladesh" },
  { kicker: "Slow", text: "Slow village days by the water in Kerala" },
  { kicker: "Culture", text: "Temples and monasteries in Bhutan" },
] as const;

/** Placeholder for the postcard field; also checked by a test to return results. */
export const askPlaceholder = "swimming and slow mornings on the Sri Lanka coast…";
