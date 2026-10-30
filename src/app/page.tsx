import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveRight, Wrench } from "lucide-react";
import { homeContent as content, services, site } from "@/content/site";
import { ServiceIcon } from "@/components/icons";
export default function Home() {
  return (
    <main id="main">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-intro">
            <span className="small-rule" />
            {content.intro}
          </div>
          <h1 id="hero-title">{site.hero.title}</h1>
          <p>{site.hero.description}</p>
          <div className="hero-actions">
            <Link className="button" href="/booking">
              Request appointment <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
            <a className="text-link" href="#services">
              Explore services <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-note">
            <Wrench size={17} strokeWidth={1.5} aria-hidden="true" />
            <span>
              {content.note}
              <br />
              <span className="muted">{content.noteDetail}</span>
            </span>
          </div>
        </div>
        <figure className="hero-visual">
          <div className="hero-photo">
            <Image
              src="/images/service-work.jpg"
              alt={content.imageAlt}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          </div>
          <figcaption className="photo-caption">
            <strong>{content.caption[0]}</strong>
            <span>{content.caption[1]}</span>
          </figcaption>
        </figure>
      </section>
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="section-kicker">{content.services.kicker}</p>
              <h2>
                {content.services.title[0]}
                <br className="desktop-break" /> {content.services.title[1]}
              </h2>
            </div>
            <p>
              {content.services.description[0]}
              <br />
              {content.services.description[1]}
              <span className="demo-note">{content.services.disclaimer}</span>
            </p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/booking?service=${service.id}`}
                className="service-item"
              >
                <ServiceIcon name={service.icon} />
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <ArrowUpRight
                  className="service-arrow"
                  size={21}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
          <div className="service-help">
            <span>{content.services.help}</span>
            <Link className="text-link" href="/booking?service=unsure">
              {content.services.helpAction}{" "}
              <MoveRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section id="approach" className="approach container">
        <div className="approach-intro">
          <p className="section-kicker">{content.approach.kicker}</p>
          <h2>
            {content.approach.title[0]}
            <br />
            {content.approach.title[1]}
          </h2>
          <p>{content.approach.description}</p>
          <Link className="text-link" href="/booking">
            Try the booking demo <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <ol className="process-list">
          {content.approach.steps.map((item, index) => (
            <li key={item.title}>
              <span className="step-number">0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="booking-banner container">
        <div>
          <p className="section-kicker">{content.booking.kicker}</p>
          <h2>
            {content.booking.title[0]}
            <br />
            {content.booking.title[1]}
          </h2>
        </div>
        <div>
          <p>
            {content.booking.description[0]}
            <br />
            {content.booking.description[1]}
          </p>
          <Link href="/booking" className="button">
            Explore appointment request{" "}
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
          <small>{content.booking.disclaimer}</small>
        </div>
        <span className="road-lines" aria-hidden="true" />
      </section>
    </main>
  );
}
