"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/content/site";
export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 961px)");
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (!event.matches) return;
      const active = document.activeElement;
      if (active === menuButton.current || active?.closest("#mobile-nav")) {
        document.querySelector<HTMLAnchorElement>(".desktop-nav a")?.focus();
      }
      setOpen(false);
    }
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", dismiss);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", dismiss);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label={`${site.name} ${site.descriptor} home`}
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            {site.name}
            <small>{site.descriptor}</small>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          <Link href="/#services">Services</Link>
          <Link href="/#approach">Our approach</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <Link className="button button-small header-cta" href="/booking">
          Request appointment <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {[
            ["Services", "/#services"],
            ["Our approach", "/#approach"],
            ["Contact", "/#contact"],
            ["Request appointment", "/booking"],
          ].map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
