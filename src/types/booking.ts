export type Booking = {
  service: string;
  make: string;
  model: string;
  year: string;
  notes: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
};
export type Errors = Partial<Record<keyof Booking, string>>;
export const emptyBooking: Booking = {
  service: "",
  make: "",
  model: "",
  year: "",
  notes: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  consent: false,
};
