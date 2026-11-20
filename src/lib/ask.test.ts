import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { askExamples, askPlaceholder, readAsk } from "./ask";
import { getDestinations, queryTours } from "./catalog";

describe("ask search", () => {
  it("turns a sentence into directory filters", () => {
    const reading = readAsk("Two weeks of trekking in Nepal");
    assert.deepEqual(reading.query, { country: "nepal", category: "trekking-hiking", duration: "8-14" });
    assert.deepEqual(
      reading.terms.map((term) => term.key),
      ["country", "category", "duration"],
    );
  });

  it("prefers a named place over its country and understands aliases", () => {
    assert.equal(readAsk("A trek near Namche in Nepal").query.destination, "everest-region");
    assert.equal(readAsk("A trek near Namche in Nepal").query.country, undefined);
    assert.equal(readAsk("Something in Ceylon").query.country, "sri-lanka");
  });

  it("reads durations written as words or numbers", () => {
    assert.equal(readAsk("10 days anywhere").query.duration, "8-14");
    assert.equal(readAsk("a weekend away").query.duration, "1-3");
    assert.equal(readAsk("three nights").query.duration, "1-3");
    assert.equal(readAsk("a month in the mountains").query.duration, "15+");
  });

  it("falls back to a keyword search when no rule matches", () => {
    const reading = readAsk("  zzzz  ");
    assert.deepEqual(reading.query, { q: "zzzz" });
    assert.equal(readAsk("").terms.length, 0);
  });

  it("caps very long input", () => {
    assert.equal(readAsk("x".repeat(500)).text.length, 200);
  });

  it("only shows example prompts that return journeys", () => {
    for (const text of [...askExamples.map((example) => example.text), askPlaceholder]) {
      assert.ok(queryTours(readAsk(text).query).length > 0, `no journeys for "${text}"`);
    }
  });

  it("only features destinations with a tagline when they have journeys", () => {
    for (const destination of getDestinations().filter((item) => item.tagline)) {
      assert.ok(destination.tourCount > 0, destination.slug);
      assert.ok(destination.season, `${destination.slug} has a tagline but no season`);
    }
  });
});
