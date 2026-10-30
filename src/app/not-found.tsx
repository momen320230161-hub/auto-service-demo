import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="page-message container">
      <p className="section-kicker">Page not found · 404</p>
      <h1>Let’s get you back on track.</h1>
      <p>This link doesn’t lead to a page. Explore the services or start a new demo request from the homepage.</p>
      <Link href="/" className="button">
        <ArrowLeft size={18} aria-hidden="true" /> Back to home
      </Link>
    </main>
  );
}
