import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-surface-muted)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(36rem 18rem at 88% -20%, rgba(75,156,211,0.18) 0%, transparent 60%), radial-gradient(28rem 16rem at -6% 120%, rgba(255,106,61,0.12) 0%, transparent 55%)",
        }}
      />
      <div className="container-page relative py-16 md:py-24">
        {eyebrow && <p className="eyebrow rise-in">{eyebrow}</p>}
        <h1
          className="rise-in mt-4 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight text-[var(--color-navy)] md:text-6xl"
          style={{ animationDelay: "0.08s" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="rise-in mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-slate-body)]"
            style={{ animationDelay: "0.16s" }}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
