import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { homeContent as content, site } from "@/content/site";
import { ServiceExplorer } from "@/components/service-explorer";
export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
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
        </div>
        <figure className="hero-visual">
          <div className="hero-photo">
            <Image
              src="/images/service-work.jpg"
              alt={content.imageAlt}
              fill
              preload
              sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1280px) 52vw, 650px"
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
              <h2>{content.services.kicker}</h2>
              <p className="services-subtitle">
                {content.services.title[0]}
                {" "}{content.services.title[1]}
              </p>
            </div>
            <p>
              {content.services.description[0]}
              <br />
              {content.services.description[1]}
              <span className="demo-note">{content.services.disclaimer}</span>
            </p>
          </div>
          <ServiceExplorer />
        </div>
      </section>
      <section id="approach" className="approach container">
        <div className="approach-intro">
          <p className="section-kicker">{content.approach.kicker}</p>
          <h2>
            {content.approach.title[0]}
            <br />{" "}
            {content.approach.title[1]}
          </h2>

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
          <Link href="/booking?service=unsure" className="button">
            Describe a concern <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
          <small>{content.booking.disclaimer}</small>
        </div>
      </section>
    </main>
  );
}
