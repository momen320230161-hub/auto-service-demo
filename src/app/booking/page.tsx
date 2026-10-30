import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingForm } from "@/components/booking-form";
export const metadata: Metadata = { title: "Request an appointment — Demo" };
export default function BookingPage() {
  return (
    <main id="main" tabIndex={-1} className="booking-page container">
      <Suspense fallback={<p>Loading the request demo…</p>}>
        <BookingForm />
      </Suspense>
    </main>
  );
}
