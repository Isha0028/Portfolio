import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { profile } from "../data/resume";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#education", label: "Education" },
  { href: "#achievements", label: "Awards" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-black/20" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-base font-bold text-white">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan via-violet to-pink">
            <span className="h-2.5 w-2.5 rounded-full bg-ink" />
          </span>
          Isha
        </a>

        <ul className="hidden items-center gap-7 text-sm font-medium text-mist md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={profile.resumeUrl}
          download
          className="hidden rounded-full bg-gradient-to-r from-cyan via-violet to-pink px-5 py-2 text-sm font-semibold text-ink md:inline-block"
        >
          Resume
        </a>

        <button
          aria-label="Toggle menu"
          className="text-2xl text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-line px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4 text-sm font-medium text-mist">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resumeUrl}
                download
                className="mt-2 inline-block rounded-full bg-gradient-to-r from-cyan via-violet to-pink px-5 py-2 font-semibold text-ink"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
