export const site = {
  name: "Motive",
  descriptor: "Auto care",
  status: "Concept demo · Sample brand",
  description:
    "An automotive service website concept. Explore illustrative services and a local-only appointment request demo.",
  contact: {
    phone: "To be confirmed",
    address: "To be confirmed",
    hours: "To be confirmed",
    email: "To be confirmed",
  },
  hero: {
    title: "Car care, made clear.",
    description:
      "Explore maintenance and repair services, share your vehicle details, and choose a preferred time for a visit.",
  },
};
export const services = [
  {
    id: "oil",
    name: "Oil & filter",
    description: "Routine oil and filter changes for scheduled maintenance.",
    icon: "oil",
  },
  {
    id: "brakes",
    name: "Brakes",
    description:
      "Inspection requests for noise, vibration or changes in braking.",
    icon: "brakes",
  },
  {
    id: "diagnostics",
    name: "Diagnostics",
    description:
      "A starting point for warning lights and performance concerns.",
    icon: "diagnostics",
  },
  {
    id: "battery",
    name: "Battery",
    description: "Battery condition checks and replacement inquiries.",
    icon: "battery",
  },
  {
    id: "tires",
    name: "Tires & alignment",
    description: "Tire wear checks, balancing and alignment inquiries.",
    icon: "tires",
  },
  {
    id: "ac",
    name: "Air conditioning",
    description: "Checks for weak airflow or a cabin that won’t cool down.",
    icon: "ac",
  },
] as const;
export const steps = ["Service", "Vehicle", "Preference", "Contact", "Review"];
export const timeWindows = [
  "Morning (8am–12pm)",
  "Afternoon (12pm–5pm)",
  "No preference",
];

export const homeContent = {
  intro: "Maintenance & repair, thoughtfully considered.",
  note: "A service experience, thoughtfully reimagined.",
  noteDetail: "An independent workshop concept.",
  imageAlt:
    "Mechanic working under the open hood of a silver vehicle in a workshop",
  caption: [
    "Care starts with a closer look.",
    "Illustrative workshop photography · Concept demo",
  ],
  services: {
    kicker: "Explore the services",
    title: ["Everyday upkeep.", "Unexpected concerns."],
    description: [
      "Find a starting point for what your car needs.",
      "Not sure? You can describe the concern instead.",
    ],
    disclaimer: "Illustrative services. Client offerings to be confirmed.",
    help: "Not sure where to start? Describe what you’ve noticed.",
    helpAction: "Let’s work it out",
  },
  approach: {
    kicker: "How the request works",
    title: ["A few details.", "A clear next step."],
    description:
      "Choose a service, tell us about your car, and add a preferred time. Review everything before completing the demo.",
    steps: [
      {
        title: "Tell us what brings you in",
        text: "Choose a service, or describe the sound, light or feeling you’ve noticed.",
      },
      {
        title: "Make it work around your day",
        text: "Add your vehicle details and a preferred date and time window.",
      },
      {
        title: "Review before the next step",
        text: "Check your details. In a real service, the workshop would follow up to arrange a visit.",
      },
    ],
  },
  booking: {
    kicker: "Try the appointment request",
    title: ["Your car.", "Your next step."],
    description: [
      "Start with a service or describe a concern.",
      "You can review and edit before finishing.",
    ],
    disclaimer: "Demo only. Nothing is booked or submitted.",
  },
};
