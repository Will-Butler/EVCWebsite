"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, SITE } from "@/lib/constants";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-white/85 backdrop-blur">
      <nav
        className="container-page flex h-16 items-center justify-between"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-[var(--color-navy)] ring-1 ring-black/10 transition-transform duration-300 group-hover:-rotate-6"
          >
            <Image
              src="/EVCLogo.png"
              alt=""
              width={40}
              height={40}
              className="h-full w-full object-cover"
              priority
            />
          </span>
          <span className="hidden text-sm font-semibold leading-tight text-[var(--color-navy)] sm:block">
            Entrepreneurship &amp; Venture Capital Club
            <span className="block text-xs font-medium text-[var(--color-slate-body)]">
              {SITE.school}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`nav-link rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-[var(--color-navy)]"
                  : "text-[var(--color-slate-body)] hover:text-[var(--color-navy)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/admin" className="btn btn-navy ml-2 py-2 text-sm">
            Admin
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--color-navy)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-[var(--color-line)] bg-white md:hidden"
        >
          <div className="container-page flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-md px-3 py-2.5 text-sm font-medium ${
                  isActive(item.href)
                    ? "bg-[var(--color-surface-muted)] text-[var(--color-carolina-dark)]"
                    : "text-[var(--color-slate-body)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-md px-3 py-2.5 text-sm font-semibold text-[var(--color-navy)]"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
