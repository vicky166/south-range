export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: ContactFields): FieldErrors {
  const errors: FieldErrors = {};
  if (input.name.trim().length < 2) {
    errors.name = "Enter your name.";
  }
  if (!emailPattern.test(input.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (input.subject.trim().length < 3) {
    errors.subject = "Enter a subject.";
  }
  if (input.message.trim().length < 20) {
    errors.message = "Write at least 20 characters so the note is useful.";
  }
  return errors;
}

export function validateNewsletterEmail(email: string): string | null {
  if (!emailPattern.test(email.trim())) {
    return "Enter a valid email address.";
  }
  return null;
}

export const NOT_DELIVERED =
  "The form checked your details. Nothing was sent or stored, because this site has no mail or newsletter service connected.";
