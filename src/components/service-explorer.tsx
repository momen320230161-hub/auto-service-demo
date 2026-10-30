"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services, serviceDetails } from "@/content/site";
import { ServiceIcon } from "@/components/icons";

export function ServiceExplorer() {
  const [selected, setSelected] = useState<string>(services[0].id);
  const service = services.find((item) => item.id === selected)!;
  const detail = serviceDetails[service.id];
  return (
    <div className="service-explorer">
      <div className="service-menu" role="group" aria-label="Explore sample services">
        {services.map((item) => (
          <button key={item.id} type="button" aria-pressed={selected === item.id}
            aria-controls="service-detail" onClick={() => setSelected(item.id)}>
            <ServiceIcon name={item.icon} size={24} />
            <span>{item.name}</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div id="service-detail" className="service-detail">
        <div aria-live="polite" aria-atomic="true">
          <p className="section-kicker">{detail.category}</p>
          <h3>{service.name}</h3>
          <p className="service-description">{detail.description}</p>
          <h4>What you can tell us</h4>
          <ul>{detail.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul>
        </div>
        <Link className="button" href={`/booking?service=${service.id}`}>
          Choose {service.name.toLowerCase()} <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
