"use server";

import {
  NOT_DELIVERED,
  validateContact,
  validateNewsletterEmail,
  type ContactFields,
} from "@/lib/forms";

export type ContactState = {
  status: "idle" | "invalid" | "accepted";
  message: string;
  fieldErrors: Partial<Record<keyof ContactFields, string>>;
};

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const fieldErrors = validateContact({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  });

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "invalid",
      message: "Check the highlighted fields. Nothing was sent.",
      fieldErrors,
    };
  }

  return {
    status: "accepted",
    message: NOT_DELIVERED,
    fieldErrors: {},
  };
}

export type NewsletterState = {
  status: "idle" | "invalid" | "accepted";
  message: string;
};

export async function submitNewsletter(
  _previous: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const error = validateNewsletterEmail(String(formData.get("email") ?? ""));
  if (error) {
    return { status: "invalid", message: error };
  }
  return { status: "accepted", message: NOT_DELIVERED };
}
