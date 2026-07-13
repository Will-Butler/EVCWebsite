import { headers } from "next/headers";
import { dbListVentures, dbListPeople, hasDb } from "@/lib/db";
import VentureAdminCard from "@/components/admin/VentureAdminCard";
import PersonAdminCard from "@/components/admin/PersonAdminCard";
import type { ModerationStatus } from "@/lib/types";

// Access to this page is enforced at the edge by Cloudflare Access — see
// README ("Protect /admin with Cloudflare Access"). No login code lives here.
export const dynamic = "force-dynamic";

// Sort pending items to the top so they're reviewed first.
function pendingFirst<T extends { status: ModerationStatus }>(rows: T[]): T[] {
  return [...rows].sort((a, b) =>
    a.status === b.status ? 0 : a.status === "pending" ? -1 : 1,
  );
}

export default async function AdminPage() {
  // Fail closed: in production the dashboard only renders for requests that
  // came through Cloudflare Access, which injects this identity header (and
  // strips any client-supplied copy). If Access isn't in front of /admin, the
  // header is absent and we refuse to render — so a misconfigured Access policy
  // can never expose submissions. Local dev (non-production) is exempt.
  if (process.env.NODE_ENV === "production") {
    const email = (await headers()).get("cf-access-authenticated-user-email");
    if (!email) {
      return (
        <Shell>
          <div className="card max-w-lg p-8">
            <p className="font-semibold text-[var(--color-navy)]">
              Access required
            </p>
            <p className="mt-2 text-sm text-[var(--color-slate-body)]">
              This dashboard is restricted to authorized club officers and is
              protected by Cloudflare Access. If you&apos;re seeing this page,
              the Access application isn&apos;t in front of{" "}
              <code>/admin</code> yet — check the Zero Trust → Access
              configuration.
            </p>
          </div>
        </Shell>
      );
    }
  }

  if (!hasDb()) {
    return (
      <Shell>
        <div className="card max-w-lg p-8">
          <p className="font-semibold text-[var(--color-navy)]">
            The database isn&apos;t connected yet
          </p>
          <p className="mt-2 text-sm text-[var(--color-slate-body)]">
            Create the D1 database and apply the schema (see{" "}
            <code>README.md</code>), then redeploy. Locally, run{" "}
            <code>npx wrangler d1 migrations apply uncevc --local</code> and
            use <code>npm run cf:preview</code>.
          </p>
        </div>
      </Shell>
    );
  }

  const [ventures, people] = await Promise.all([
    dbListVentures(false),
    dbListPeople(false),
  ]);

  return (
    <Shell>
      <Section
        heading="Ventures"
        total={ventures.length}
        pending={ventures.filter((v) => v.status === "pending").length}
        emptyLabel="No ventures submitted yet."
      >
        {pendingFirst(ventures).map((v) => (
          <VentureAdminCard key={v.id} v={v} />
        ))}
      </Section>

      <Section
        heading="Network"
        total={people.length}
        pending={people.filter((p) => p.status === "pending").length}
        emptyLabel="No people submitted yet."
      >
        {pendingFirst(people).map((p) => (
          <PersonAdminCard key={p.id} p={p} />
        ))}
      </Section>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="container-page py-16 md:py-20">
      <p className="eyebrow">Admin</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-navy)]">
        Content administration
      </h1>
      <p className="mt-2 text-sm text-[var(--color-slate-body)]">
        Review submissions, edit records, and manage what appears publicly.
        Access is restricted to authorized club officers.
      </p>
      <div className="mt-10 space-y-14">{children}</div>
    </section>
  );
}

function Section({
  heading,
  total,
  pending,
  emptyLabel,
  children,
}: {
  heading: string;
  total: number;
  pending: number;
  emptyLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-[var(--color-navy)]">{heading}</h2>
        {pending > 0 && (
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[var(--color-carolina)] px-2 text-xs font-bold text-white">
            {pending} pending
          </span>
        )}
        <span className="text-sm text-[var(--color-slate-body)]">
          {total} total
        </span>
      </div>

      {total === 0 ? (
        <p className="mt-4 text-[var(--color-slate-body)]">{emptyLabel}</p>
      ) : (
        <ul className="mt-5 space-y-3">{children}</ul>
      )}
    </div>
  );
}
