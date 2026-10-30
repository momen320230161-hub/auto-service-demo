import { services, timeWindows } from "@/content/site";
import type { Booking, Errors } from "@/types/booking";
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function validateStep(step: number, data: Booking): Errors {
  const errors: Errors = {};
  if (
    step === 0 &&
    ![...services.map((s) => s.id), "unsure"].includes(data.service)
  )
    errors.service = "Choose a service, or select ‘Not sure yet’.";
  if (
    step === 1 &&
    data.year &&
    (!/^\d{4}$/.test(data.year) ||
      Number(data.year) < 1900 ||
      Number(data.year) > new Date().getFullYear() + 1)
  )
    errors.year = "Enter a four-digit year between 1900 and next year.";
  if (step === 2) {
    const chosen = new Date(`${data.date}T12:00:00`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
      Number.isNaN(chosen.getTime()) ||
      localDate(chosen) !== data.date ||
      data.date < localDate()
    )
      errors.date = "Choose today or a future date.";
    if (!timeWindows.includes(data.time))
      errors.time = "Choose a preferred time window.";
  }
  if (step === 3) {
    if (data.name.trim().length < 2)
      errors.name = "Enter your name (at least 2 characters).";
    if (!data.email.trim()) errors.email = "Enter an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      errors.email = "Enter a valid email address.";
    if (
      data.phone.trim() &&
      (!/^[+\d()\s.-]{7,25}$/.test(data.phone.trim()) ||
        data.phone.replace(/\D/g, "").length < 7)
    )
      errors.phone = "Enter a valid phone number, or leave it blank.";
    if (!data.consent)
      errors.consent = "Confirm you understand this is a local-only demo.";
  }
  return errors;
}
