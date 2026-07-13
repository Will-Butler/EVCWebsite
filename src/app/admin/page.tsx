import { dbListVentures, dbListPeople, hasDb } from "@/lib/db";
import { moderate } from "@/lib/actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import type { ModerationStatus } from "@/lib/types";

// Access to this page is enforced at the edge by Cloudflare Access — see
// README ("Protect /admin with Cloudflare Access"). No login code lives here.
export const dynamic = "force-dynamic";

type Table = "ventures" | "people";

type Row = {
  id: string;
  status: ModerationStatus;
  title: string;
  subtitle: string;
  detail: string;
};

export default async function AdminPage() {
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
            <code>npx wrangler d1 migrations apply kfbsevc --local</code> and
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

  const ventureRows: Row[] = ventures.map((v) => ({
    id: v.id,
    status: v.status,
    title: v.name,
    subtitle: [v.founder, v.year].filter(Boolean).join(" · "),
    detail: v.description ?? "",
  }));

  const peopleRows: Row[] = people.map((p) => ({
    id: p.id,
    status: p.status,
    title: p.name,
    subtitle: [p.relation, p.company].filter(Boolean).join(" · "),
    detail: p.bio ?? "",
  }));

  return (
    <Shell>
      <ModerationSection
        table="ventures"
        heading="Ventures"
        rows={ventureRows}
        emptyLabel="No ventures submitted yet."
      />
      <ModerationSection
        table="people"
        heading="Network"
        rows={peopleRows}
        emptyLabel="No people submitted yet."
      />
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
        Review submissions and manage what appears publicly. Access is
        restricted to authorized club officers.
      </p>
      <div className="mt-10 space-y-14">{children}</div>
    </section>
  );
}

function ModerationSection({
  table,
  heading,
  rows,
  emptyLabel,
}: {
  table: Table;
  heading: string;
  rows: Row[];
  emptyLabel: string;
}) {
  const pending = rows.filter((r) => r.status === "pending").length;
  // Pending first, so items needing review sit at the top.
  const sorted = [...rows].sort((a, b) =>
    a.status === b.status ? 0 : a.status === "pending" ? -1 : 1,
  );

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
          {rows.length} total
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="mt-4 text-[var(--color-slate-body)]">{emptyLabel}</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {sorted.map((r) => (
            <li
              key={r.id}
              className="card flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[var(--color-navy)]">
                    {r.title}
                  </span>
                  <span
                    className={`badge ${
                      r.status === "pending"
                        ? "!border-amber-200 !bg-amber-50 !text-amber-700"
                        : "!border-emerald-200 !bg-emerald-50 !text-emerald-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
                {r.subtitle && (
                  <p className="text-xs text-[var(--color-slate-body)]">
                    {r.subtitle}
                  </p>
                )}
                {r.detail && (
                  <p className="mt-1 line-clamp-2 max-w-2xl text-sm text-[var(--color-slate-body)]">
                    {r.detail}
                  </p>
                )}
              </div>

              <div className="flex flex-none gap-2">
                {r.status === "pending" ? (
                  <ActionForm table={table} id={r.id} op="approve">
                    <button className="btn btn-primary text-sm">Approve</button>
                  </ActionForm>
                ) : (
                  <ActionForm table={table} id={r.id} op="unpublish">
                    <button className="btn btn-outline text-sm">
                      Unpublish
                    </button>
                  </ActionForm>
                )}
                <ActionForm table={table} id={r.id} op="delete">
                  <ConfirmButton
                    message={`Delete "${r.title}"? This cannot be undone.`}
                    className="btn btn-outline text-sm !text-red-600 hover:!border-red-300"
                  >
                    Delete
                  </ConfirmButton>
                </ActionForm>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ActionForm({
  table,
  id,
  op,
  children,
}: {
  table: Table;
  id: string;
  op: "approve" | "unpublish" | "delete";
  children: React.ReactNode;
}) {
  return (
    <form action={moderate}>
      <input type="hidden" name="table" value={table} />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="op" value={op} />
      {children}
    </form>
  );
}
