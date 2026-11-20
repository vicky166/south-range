import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getAllCategories, getDestinations, getFieldNotes, getPublishedTours } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/tours",
    "/destinations",
    "/experiences",
    "/field-notes",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${site.url}${path || "/"}`.replace(/\/$/, "") || site.url,
      lastModified: "2026-11-12",
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...getPublishedTours().map((tour) => ({
      url: `${site.url}/tours/${tour.slug}`,
      lastModified: tour.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...getDestinations().map((destination) => ({
      url: `${site.url}/destinations/${destination.slug}`,
      lastModified: "2026-11-12",
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...getAllCategories().map((category) => ({
      url: `${site.url}/experiences/${category.slug}`,
      lastModified: "2026-11-12",
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...getFieldNotes().map((note) => ({
      url: `${site.url}/field-notes/${note.slug}`,
      lastModified: note.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
