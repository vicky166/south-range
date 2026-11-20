import type { Metadata } from "next";
import { site } from "@/config/site";
import type { FieldNote, TourRecord } from "@/data/types";

const defaultImage =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=75";

export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const picture = image ?? defaultImage;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      images: [{ url: picture, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [picture],
    },
  };
}

export function tourJsonLd(tour: TourRecord) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.shortDescription,
    url: `${site.url}/tours/${tour.slug}`,
    image: tour.images.map((image) => image.src),
    touristType: tour.categoryName,
    itinerary: tour.itinerary?.map((day) => ({
      "@type": "CreativeWork",
      name: day.title,
      text: day.detail,
    })),
    provider: {
      "@type": "Organization",
      name: tour.operatorName,
      description: tour.operatorDescription,
    },
  };
}

export function articleJsonLd(note: FieldNote) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.dek,
    url: `${site.url}/field-notes/${note.slug}`,
    image: [note.image.src],
    datePublished: note.publishedAt,
    publisher: { "@type": "Organization", name: site.name },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/tours?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
