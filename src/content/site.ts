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
    title: "Good care. For the road ahead.",
    description:
      "From the everyday essentials to the things you can’t quite put your finger on. Explore a simpler approach to looking after your car.",
  },
};
export const services = [
  {
    id: "oil",
    name: "Oil & filter",
    description:
      "The everyday essential. Routine oil and filter service for your next maintenance visit.",
    icon: "oil",
  },
  {
    id: "brakes",
    name: "Brakes",
    description:
      "Unusual sounds or a different feel? Start with a brake inspection and discuss the next steps.",
    icon: "brakes",
  },
  {
    id: "diagnostics",
    name: "Diagnostics",
    description:
      "Warning lights and performance concerns. A starting point for understanding what’s going on.",
    icon: "diagnostics",
  },
  {
    id: "battery",
    name: "Battery",
    description:
      "Slow starts or battery concerns. Explore condition checks and replacement requests.",
    icon: "battery",
  },
  {
    id: "tires",
    name: "Tires & alignment",
    description:
      "Wear, balance and alignment inquiries to help you plan your next tire service.",
    icon: "tires",
  },
  {
    id: "ac",
    name: "Air conditioning",
    description:
      "Cooling and ventilation concerns, from weak airflow to a cabin that won’t cool down.",
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
  intro: "A little care goes a long way.",
  note: "A service experience, thoughtfully reimagined.",
  noteDetail: "An independent workshop concept.",
  imageAlt: "Close-up of an automotive engine with belts, pulleys and hoses",
  caption: ["Behind every good journey.", "A little attention to detail."],
  services: {
    kicker: "Looking after the essentials",
    title: ["Care for every", "part of your journey."],
    description: [
      "Routine upkeep or something unexpected.",
      "Find a starting point for what your car needs.",
    ],
    disclaimer: "Illustrative services. Client offerings to be confirmed.",
    help: "Not sure where to start? Describe what you’ve noticed.",
    helpAction: "Let’s work it out",
  },
  approach: {
    kicker: "Less guesswork. More clarity.",
    title: ["A simpler route", "to your next service."],
    description:
      "Your car has a story. Start with the details, choose a preferred time, and see what a considered request experience can feel like.",
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
    kicker: "Your next chapter starts here",
    title: ["Let’s take care", "of what’s next."],
    description: [
      "A few details about you and your car.",
      "A clearer picture of the road ahead.",
    ],
    disclaimer: "Demo only. Nothing is booked or submitted.",
  },
};
