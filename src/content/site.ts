export const site = {
  name: "Motive",
  descriptor: "Auto care",
  status: "Concept demo · Sample brand",
  description:
    "An automotive service website concept. Explore illustrative services and a local-only appointment request demo.",
  contact: {
    confirmed: false,
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
export const serviceDetails = {
  oil: {
    category: "Routine maintenance",
    description: "Start a request for an oil and filter service. Add your vehicle details so the workshop can discuss the appropriate maintenance with you.",
    prompts: ["When the oil was last changed, if known", "Your current mileage", "Any maintenance reminder on the dashboard"],
  },
  brakes: {
    category: "Braking concerns",
    description: "Describe a change in how your brakes sound or feel. A request gives the workshop context for a conversation about an inspection.",
    prompts: ["Noise or vibration when braking", "A change in pedal feel", "When you first noticed the concern"],
  },
  diagnostics: {
    category: "Understanding the problem",
    description: "A warning light or an unfamiliar change can be difficult to describe. Start with what you have noticed; you don’t need to know the cause.",
    prompts: ["The warning light or message shown", "When the change happens", "Whether it is occasional or constant"],
  },
  battery: {
    category: "Starting & electrical",
    description: "Use this request to discuss battery condition or starting difficulties. Include the symptoms rather than guessing which part needs replacing.",
    prompts: ["What happens when you try to start", "How long the vehicle has been parked", "Battery age, if known"],
  },
  tires: {
    category: "Tires & road feel",
    description: "Ask about tire wear, balancing or alignment. Describe what you have seen or felt so the workshop can understand the concern.",
    prompts: ["Visible or uneven tire wear", "Vibration or pulling to one side", "Recent tire changes, if any"],
  },
  ac: {
    category: "Cabin comfort",
    description: "Start an inquiry about cooling or ventilation. A short description of the airflow and temperature helps explain what needs attention.",
    prompts: ["Whether the air is warm or weak", "If the problem changes while driving", "Any unusual sound or smell"],
  },
} as const;
export const timeWindows = [
  "Morning (8am–12pm)",
  "Afternoon (12pm–5pm)",
  "No preference",
];

export const homeContent = {
  intro: "Maintenance. Repairs. A place to start.",
  imageAlt:
    "Mechanic working under the open hood of a silver vehicle in a workshop",
  caption: [
    "Care starts with a closer look.",
    "Illustrative workshop photography · Concept demo",
  ],
  services: {
    kicker: "Explore our services",
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
        title: "Choose a service",
        text: "Choose a service, or describe the sound, light or feeling you’ve noticed.",
      },
      {
        title: "Add your preferences",
        text: "Add your vehicle details and a preferred date and time window.",
      },
      {
        title: "Review your request",
        text: "Check your details. In a real service, the workshop would follow up to arrange a visit.",
      },
    ],
  },
  booking: {
    kicker: "No diagnosis needed",
    title: ["Not sure?", "Start with what you notice."],
    description: [
      "A sound, a warning light, a change in how it feels.",
      "Describe it in your own words in the request demo.",
    ],
    disclaimer: "Demo only. Nothing is booked or submitted.",
  },
};
