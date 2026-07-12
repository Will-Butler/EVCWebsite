import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center py-28 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--color-navy)]">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-[var(--color-slate-body)]">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/" className="btn btn-primary mt-6">
        Back to home
      </Link>
    </section>
  );
}
