import type { Operator } from "./types";

/**
 * Fictional operators for the sample catalogue.
 * Add a real operator by appending a record with sample: false.
 * Tours point here with operatorId. Nothing in the UI is tied to one operator.
 */
export const operators: Operator[] = [
  {
    id: "ridge-desk",
    slug: "ridge-desk",
    name: "Ridge Desk",
    description:
      "Fictional sample operator used to demonstrate mountain and trekking listings. Not a real company, and not affiliated with any guide service.",
    sample: true,
  },
  {
    id: "river-lane",
    slug: "river-lane",
    name: "River Lane",
    description:
      "Fictional sample operator used for water, coast and mangrove listings. Not a real company.",
    sample: true,
  },
  {
    id: "cedar-field",
    slug: "cedar-field",
    name: "Cedar Field",
    description:
      "Fictional sample operator used for culture, towns and wildlife listings. Not a real company.",
    sample: true,
  },
  {
    id: "monsoon-note",
    slug: "monsoon-note",
    name: "Monsoon Note",
    description:
      "Fictional sample operator used for camping, cycling and road-trip listings. Not a real company.",
    sample: true,
  },
];
