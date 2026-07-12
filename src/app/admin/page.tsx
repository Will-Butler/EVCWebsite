"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Person, Venture } from "@/lib/types";
import { SITE } from "@/lib/constants";

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = getBrowserSupabase();
    // When unconfigured the component renders <NotConfigured/> before `ready`
    // is ever read, so there's nothing to update here.
    if (!supabase) return;
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setSession(data.session);
      setReady(true);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <Shell>
        <NotConfigured />
      </Shell>
    );
  }

  if (!ready) {
    return (
      <Shell>
        <p className="text-[var(--color-slate-body)]">Loading…</p>
      </Shell>
    );
  }

  return <Shell>{session ? <Dashboard /> : <LoginForm />}</Shell>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="container-page py-16 md:py-20">
      <p className="eyebrow">Admin</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-navy)]">
        EVC content administration
      </h1>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function NotConfigured() {
  return (
    <div className="card max-w-lg p-8">
      <p className="font-semibold text-[var(--color-navy)]">
        Supabase isn&apos;t connected yet
      </p>
      <p className="mt-2 text-sm text-[var(--color-slate-body)]">
        Add your <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
        <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>.env.local</code>{" "}
        (and to your Cloudflare project), then create an admin user in the
        Supabase dashboard. See <code>README.md</code> for the full setup.
      </p>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    setBusy(false);
  }

  return (
    <form onSubmit={handleSubmit} className="card max-w-sm space-y-4 p-8">
      <div>
        <label className="label" htmlFor="admin-email">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          required
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
      </div>
      <div>
        <label className="label" htmlFor="admin-password">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          required
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-navy w-full" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-xs text-[var(--color-slate-body)]">
        Admin accounts are created in the Supabase dashboard. Trouble signing
        in? Email {SITE.email}.
      </p>
    </form>
  );
}

type Tab = "ventures" | "people";

function Dashboard() {
  const [tab, setTab] = useState<Tab>("ventures");
  const [ventures, setVentures] = useState<Venture[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  // Defaults to true so the initial mount shows "Loading…" without a
  // synchronous setState inside the effect (state updates happen post-await).
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    const [v, p] = await Promise.all([
      supabase.from("ventures").select("*").order("created_at", { ascending: false }),
      supabase.from("people").select("*").order("created_at", { ascending: false }),
    ]);
    if (v.data) setVentures(v.data as Venture[]);
    if (p.data) setPeople(p.data as Person[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Fetch records once on mount. `load` only updates state after awaiting,
    // so this is the endorsed data-fetching-in-effect pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function signOut() {
    await getBrowserSupabase()?.auth.signOut();
  }

  async function setStatus(table: Tab, id: string, status: "pending" | "approved") {
    await getBrowserSupabase()?.from(table).update({ status }).eq("id", id);
    await load();
  }

  async function remove(table: Tab, id: string, label: string) {
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    await getBrowserSupabase()?.from(table).delete().eq("id", id);
    await load();
  }

  const pendingV = ventures.filter((v) => v.status === "pending").length;
  const pendingP = people.filter((p) => p.status === "pending").length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <TabButton active={tab === "ventures"} onClick={() => setTab("ventures")}>
            Ventures {pendingV > 0 && <Count n={pendingV} />}
          </TabButton>
          <TabButton active={tab === "people"} onClick={() => setTab("people")}>
            People {pendingP > 0 && <Count n={pendingP} />}
          </TabButton>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="btn btn-outline text-sm">
            Refresh
          </button>
          <button onClick={signOut} className="btn btn-outline text-sm">
            Sign out
          </button>
        </div>
      </div>

      {loading ? (
        <p className="mt-8 text-[var(--color-slate-body)]">Loading records…</p>
      ) : tab === "ventures" ? (
        <ModerationList
          rows={ventures.map((v) => ({
            id: v.id,
            status: v.status,
            title: v.name,
            subtitle: [v.founder, v.year].filter(Boolean).join(" · "),
            detail: v.description ?? "",
          }))}
          onApprove={(id) => setStatus("ventures", id, "approved")}
          onUnpublish={(id) => setStatus("ventures", id, "pending")}
          onDelete={(id, label) => remove("ventures", id, label)}
          emptyLabel="No ventures yet."
        />
      ) : (
        <ModerationList
          rows={people.map((p) => ({
            id: p.id,
            status: p.status,
            title: p.name,
            subtitle: [p.relation, p.company].filter(Boolean).join(" · "),
            detail: p.bio ?? "",
          }))}
          onApprove={(id) => setStatus("people", id, "approved")}
          onUnpublish={(id) => setStatus("people", id, "pending")}
          onDelete={(id, label) => remove("people", id, label)}
          emptyLabel="No people yet."
        />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "bg-[var(--color-navy)] text-white"
          : "border border-[var(--color-line)] text-[var(--color-navy)]"
      }`}
    >
      {children}
    </button>
  );
}

function Count({ n }: { n: number }) {
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-carolina)] px-1.5 text-xs font-bold text-white">
      {n}
    </span>
  );
}

type Row = {
  id: string;
  status: "pending" | "approved";
  title: string;
  subtitle: string;
  detail: string;
};

function ModerationList({
  rows,
  onApprove,
  onUnpublish,
  onDelete,
  emptyLabel,
}: {
  rows: Row[];
  onApprove: (id: string) => void;
  onUnpublish: (id: string) => void;
  onDelete: (id: string, label: string) => void;
  emptyLabel: string;
}) {
  if (rows.length === 0) {
    return <p className="mt-8 text-[var(--color-slate-body)]">{emptyLabel}</p>;
  }
  return (
    <ul className="mt-6 space-y-3">
      {rows.map((r) => (
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
              <button
                onClick={() => onApprove(r.id)}
                className="btn btn-primary text-sm"
              >
                Approve
              </button>
            ) : (
              <button
                onClick={() => onUnpublish(r.id)}
                className="btn btn-outline text-sm"
              >
                Unpublish
              </button>
            )}
            <button
              onClick={() => onDelete(r.id, r.title)}
              className="btn btn-outline text-sm !text-red-600 hover:!border-red-300"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
