"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

// Highlights the section currently on screen. Desktop only; on mobile the
// page is a single column and the nav is hidden.
export function SectionNav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      // A thin band near the upper third of the viewport decides "current".
      { rootMargin: "-30% 0px -65% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="mt-14 hidden lg:block">
      <ul className="space-y-1">
        {sections.map(({ id, label }) => {
          const on = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={on ? "true" : undefined}
                className="group flex items-center gap-4 py-2 font-mono text-xs uppercase tracking-[0.2em]"
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    on ? "w-16 bg-accent" : "w-8 bg-muted/50 group-hover:w-16 group-hover:bg-text"
                  }`}
                />
                <span className={on ? "text-accent" : "text-muted group-hover:text-text"}>{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
