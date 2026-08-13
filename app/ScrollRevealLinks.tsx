"use client";

import { useEffect, useRef } from "react";

type LinkItem = {
  number: string;
  title: string;
  description: string;
  href: string;
};

export default function ScrollRevealLinks({ links }: { links: LinkItem[] }) {
  const listRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const cards = Array.from(list.querySelectorAll<HTMLElement>(".link-card"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      cards.forEach((card) => card.classList.add("is-visible"));
      return;
    }

    list.classList.add("scroll-reveal-ready");

    let lastScrollY = window.scrollY;
    let direction: "up" | "down" = "down";
    let ticking = false;

    const updateDirection = () => {
      const nextScrollY = window.scrollY;
      if (nextScrollY !== lastScrollY) direction = nextScrollY > lastScrollY ? "down" : "up";
      lastScrollY = nextScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateDirection);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            card.classList.add("is-visible");
          } else if (direction === "up" && entry.boundingClientRect.top >= window.innerHeight) {
            card.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );

    cards.forEach((card) => observer.observe(card));
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      list.classList.remove("scroll-reveal-ready");
    };
  }, []);

  return (
    <nav className="link-list" aria-label="Nasirr's links" ref={listRef}>
      {links.map((link) => (
        <a className="link-card" href={link.href} key={link.number} target="_blank" rel="noreferrer">
          <span className="link-number">{link.number}</span>
          <span className="link-copy">
            <strong>{link.title}</strong>
            <small>{link.description}</small>
          </span>
        </a>
      ))}
    </nav>
  );
}
