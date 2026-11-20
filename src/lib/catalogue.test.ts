import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getCollections,
  getFieldNote,
  getFieldNotes,
  getPublishedTours,
  getTourBySlug,
  queryTours,
} from "./catalog";
import { filterAndSortTours, parseTourQuery, tourQueryHref } from "./filters";
import { atlasBounds, fieldNumber, formatCoordinates } from "./geo";
import { NOT_DELIVERED, validateContact, validateNewsletterEmail } from "./forms";
import { bookingLink } from "./klnk";

describe("booking links", () => {
  it("accepts only absolute http and https URLs", () => {
    assert.equal(
      bookingLink("https://example.com/klnk/demo/one"),
      "https://example.com/klnk/demo/one",
    );
    assert.equal(bookingLink("http://example.com/klnk/demo/two"), "http://example.com/klnk/demo/two");
    assert.equal(bookingLink("not-a-valid-klnk"), null);
    assert.equal(bookingLink(""), null);
    assert.equal(bookingLink("   "), null);
    assert.equal(bookingLink(null), null);
    assert.equal(bookingLink("javascript:alert(1)"), null);
    assert.equal(bookingLink("/tours/somewhere"), null);
  });
});

describe("catalogue", () => {
  it("hides unpublished tours", () => {
    assert.equal(getTourBySlug("unpublished-draft-route"), undefined);
    assert.equal(
      getPublishedTours().some((tour) => tour.slug === "unpublished-draft-route"),
      false,
    );
  });

  it("gives every published tour its own KLNK value", () => {
    const published = getPublishedTours();
    const links = published.map((tour) => tour.klnkUrl);
    const usable = published
      .map((tour) => bookingLink(tour.klnkUrl))
      .filter((link): link is string => Boolean(link));

    assert.equal(new Set(links).size, links.length);
    assert.equal(new Set(usable).size, usable.length);
    assert.ok(usable.length >= 2);
    assert.ok(published.some((tour) => tour.klnkUrl === null));
    assert.ok(published.some((tour) => bookingLink(tour.klnkUrl) === null && tour.klnkUrl !== null));

    for (const tour of published) {
      const href = bookingLink(tour.klnkUrl);
      if (tour.sample && href) {
        assert.equal(new URL(href).hostname, "example.com");
      }
    }
  });

  it("does not publish verified prices in the sample catalogue", () => {
    assert.equal(
      getPublishedTours().some((tour) => tour.priceVerified && tour.price != null),
      false,
    );
  });

  it("filters by country and category together", () => {
    const results = queryTours({ country: "nepal", category: "trekking-hiking" });
    assert.ok(results.length >= 2);
    assert.ok(results.every((tour) => tour.country === "nepal"));
    assert.ok(results.every((tour) => tour.categorySlug === "trekking-hiking"));
  });

  it("reads the homepage where field as a country or destination", () => {
    const ladakh = parseTourQuery({
      where: "destination:ladakh",
      category: "trekking-hiking",
    });
    assert.equal(ladakh.destination, "ladakh");
    assert.equal(ladakh.category, "trekking-hiking");
    const ladakhTours = queryTours(ladakh);
    assert.ok(ladakhTours.length > 0);
    assert.ok(ladakhTours.every((tour) => tour.destinationSlug === "ladakh"));

    const nepal = parseTourQuery({ where: "country:nepal", duration: "15+" });
    assert.equal(nepal.country, "nepal");
    assert.deepEqual(
      queryTours(nepal).map((tour) => tour.slug),
      ["namche-ridge-walk"],
    );
    assert.equal(parseTourQuery({ where: "not-a-place" }).country, undefined);
  });

  it("searches by title and returns an empty list when nothing matches", () => {
    const found = queryTours({ q: "Namche" });
    assert.ok(found.some((tour) => tour.slug === "namche-ridge-walk"));
    assert.deepEqual(queryTours({ q: "zzzz-no-such-tour" }), []);
  });

  it("sorts by duration and matches duration buckets", () => {
    const asc = queryTours({ sort: "duration-asc" });
    assert.ok(asc[0].durationDays <= asc[asc.length - 1].durationDays);
    const long = queryTours({ duration: "15+" });
    assert.deepEqual(
      long.map((tour) => tour.slug),
      ["namche-ridge-walk"],
    );
    const short = queryTours({ duration: "1-3" });
    assert.ok(short.every((tour) => tour.durationDays <= 3));
    assert.ok(short.length > 0);
  });

  it("can filter a verified price even though the sample set has none", () => {
    const [first] = getPublishedTours();
    const priced = {
      ...first,
      price: 1200,
      currency: "USD",
      priceVerified: true,
    };
    const results = filterAndSortTours([first, priced], { price: "verified" });
    assert.deepEqual(
      results.map((tour) => tour.id),
      [priced.id],
    );
  });
});

describe("forms", () => {
  it("rejects incomplete contact details", () => {
    const errors = validateContact({
      name: "A",
      email: "not-an-email",
      subject: "Hi",
      message: "Too short",
    });
    assert.ok(errors.name);
    assert.ok(errors.email);
    assert.ok(errors.subject);
    assert.ok(errors.message);
  });

  it("accepts a complete contact note and still says it was not delivered", () => {
    const errors = validateContact({
      name: "Ada Lovelace",
      email: "ada@example.com",
      subject: "Directory question",
      message: "This note is long enough to pass the local check.",
    });
    assert.deepEqual(errors, {});
    assert.match(NOT_DELIVERED, /not|Nothing was sent/i);
  });

  it("checks newsletter addresses locally", () => {
    assert.equal(validateNewsletterEmail("ada@example.com"), null);
    assert.ok(validateNewsletterEmail("ada"));
  });
});

describe("editorial layer", () => {
  it("builds collections only from published tours that match their query", () => {
    const collections = getCollections();
    assert.ok(collections.length > 0);
    for (const collection of collections) {
      assert.ok(collection.tours.length > 0, `${collection.slug} should not render empty`);
      assert.deepEqual(
        collection.tours.map((tour) => tour.slug),
        queryTours(collection.query).map((tour) => tour.slug),
      );
    }
  });

  it("links a saved query to the directory without empty params", () => {
    assert.equal(tourQueryHref({ activity: "camping", country: "" }), "/tours?activity=camping");
    assert.equal(tourQueryHref({}), "/tours");
    const roundTrip = parseTourQuery(Object.fromEntries(new URLSearchParams("country=nepal&duration=15%2B")));
    assert.equal(roundTrip.duration, "15+");
  });

  it("gives every destination coordinates inside the atlas grid", () => {
    for (const tour of getPublishedTours()) {
      const { lat, lng } = tour.destinationCoordinates;
      assert.ok(lat >= atlasBounds.minLat && lat <= atlasBounds.maxLat, `${tour.slug} latitude`);
      assert.ok(lng >= atlasBounds.minLng && lng <= atlasBounds.maxLng, `${tour.slug} longitude`);
    }
    assert.equal(formatCoordinates({ lat: 34.15, lng: 77.58 }), "34.15°N 77.58°E");
    assert.equal(fieldNumber(7), "N° 07");
  });

  it("orders field notes newest first and finds them by slug", () => {
    const notes = getFieldNotes();
    const dates = notes.map((note) => note.publishedAt);
    assert.deepEqual(dates, [...dates].sort().reverse());
    assert.equal(getFieldNote(notes[0].slug)?.title, notes[0].title);
    assert.equal(getFieldNote("no-such-note"), undefined);
  });
});
