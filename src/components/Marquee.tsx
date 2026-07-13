/**
 * Seamless infinite marquee. The track is duplicated so a -50% translate loops
 * cleanly; CSS pauses it on hover and disables it under reduced-motion. Pure
 * CSS — no client JS needed.
 */
export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee py-1" aria-hidden>
      <div className="marquee__track">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-2xl font-medium tracking-tight text-[var(--color-navy)]/70 md:text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item}
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-signal)]"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
