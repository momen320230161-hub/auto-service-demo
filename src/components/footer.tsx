import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
export function Footer() {
  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link className="footer-brand" href="/">
              {site.name}
              <span> / {site.descriptor}</span>
            </Link>
            <p>
              A considered approach to car care.
              <br />A concept, ready to make your own.
            </p>
          </div>
          <div className="contact-details">
            <h2>Let’s get in touch</h2>
            <dl>
              {[
                ["Phone", site.contact.phone],
                ["Email", site.contact.email],
                ["Workshop", site.contact.address],
                ["Hours", site.contact.hours],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/booking">
              Explore the request demo{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{site.status}</span>
          <p>Illustrative services. No real bookings or messages are sent.</p>
          <a className="inline-flex items-center gap-2" href="#top">
            Back to top <ArrowUp size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
