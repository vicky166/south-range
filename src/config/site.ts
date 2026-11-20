export const site = {
  name: "South Range",
  description:
    "A curated directory of adventure tours across South Asia, bringing together journeys from independent operators.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Sample listings stay out of search indexes until a maintainer opts in.
   * Set NEXT_PUBLIC_ALLOW_INDEXING=true when the catalogue is real content.
   */
  indexable: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  email: "directory@example.com",
} as const;
