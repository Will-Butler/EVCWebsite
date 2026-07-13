"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { moderate, updatePerson } from "@/lib/actions";
import ConfirmButton from "./ConfirmButton";
import { RELATION_TYPES, type Person } from "@/lib/types";

export default function PersonAdminCard({ p }: { p: Person }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const f = new FormData(e.currentTarget);
    const gradRaw = String(f.get("grad_year") || "").trim();
    const res = await updatePerson(p.id, {
      name: String(f.get("name") || "").trim(),
      relation: String(f.get("relation") || "Current Student"),
      title: String(f.get("title") || "").trim(),
      company: String(f.get("company") || "").trim(),
      grad_year: gradRaw ? Number(gradRaw) : null,
      email: String(f.get("email") || "").trim(),
      linkedin: String(f.get("linkedin") || "").trim(),
      bio: String(f.get("bio") || "").trim(),
    });
    setSaving(false);
    if (!res.ok) {
      setError(res.error ?? "Something went wrong.");
      return;
    }
    setEditing(false);
    router.refresh();
  }

  if (editing) {
    return (
      <li className="card p-4">
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="label" htmlFor={`p-name-${p.id}`}>
              Name *
            </label>
            <input id={`p-name-${p.id}`} name="name" required defaultValue={p.name} className="input" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor={`p-rel-${p.id}`}>
                Relation *
              </label>
              <select id={`p-rel-${p.id}`} name="relation" required defaultValue={p.relation} className="input">
                {RELATION_TYPES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
                {!RELATION_TYPES.includes(p.relation as (typeof RELATION_TYPES)[number]) && (
                  <option value={p.relation}>{p.relation}</option>
                )}
              </select>
            </div>
            <div>
              <label className="label" htmlFor={`p-grad-${p.id}`}>
                Grad year
              </label>
              <input id={`p-grad-${p.id}`} name="grad_year" type="number" defaultValue={p.grad_year ?? ""} className="input" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor={`p-title-${p.id}`}>
                Title / role
              </label>
              <input id={`p-title-${p.id}`} name="title" defaultValue={p.title ?? ""} className="input" />
            </div>
            <div>
              <label className="label" htmlFor={`p-co-${p.id}`}>
                Company
              </label>
              <input id={`p-co-${p.id}`} name="company" defaultValue={p.company ?? ""} className="input" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor={`p-email-${p.id}`}>
                Email
              </label>
              <input id={`p-email-${p.id}`} name="email" type="email" defaultValue={p.email ?? ""} className="input" />
            </div>
            <div>
              <label className="label" htmlFor={`p-li-${p.id}`}>
                LinkedIn
              </label>
              <input id={`p-li-${p.id}`} name="linkedin" type="url" defaultValue={p.linkedin ?? ""} className="input" />
            </div>
          </div>
          <div>
            <label className="label" htmlFor={`p-bio-${p.id}`}>
              Bio
            </label>
            <textarea id={`p-bio-${p.id}`} name="bio" rows={2} defaultValue={p.bio ?? ""} className="input" />
          </div>
          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-outline text-sm"
              onClick={() => {
                setEditing(false);
                setError(null);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary text-sm" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="card flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--color-navy)]">{p.name}</span>
          <StatusBadge status={p.status} />
        </div>
        <p className="text-xs text-[var(--color-slate-body)]">
          {[p.relation, p.company, p.grad_year].filter(Boolean).join(" · ")}
        </p>
        {p.bio && (
          <p className="mt-1 line-clamp-2 max-w-2xl text-sm text-[var(--color-slate-body)]">
            {p.bio}
          </p>
        )}
      </div>
      <div className="flex flex-none flex-wrap gap-2">
        <button onClick={() => setEditing(true)} className="btn btn-outline text-sm">
          Edit
        </button>
        {p.status === "pending" ? (
          <ActionForm id={p.id} op="approve">
            <button className="btn btn-primary text-sm">Approve</button>
          </ActionForm>
        ) : (
          <ActionForm id={p.id} op="unpublish">
            <button className="btn btn-outline text-sm">Unpublish</button>
          </ActionForm>
        )}
        <ActionForm id={p.id} op="delete">
          <ConfirmButton
            message={`Delete "${p.name}"? This cannot be undone.`}
            className="btn btn-outline text-sm !text-red-600 hover:!border-red-300"
          >
            Delete
          </ConfirmButton>
        </ActionForm>
      </div>
    </li>
  );
}

function ActionForm({
  id,
  op,
  children,
}: {
  id: string;
  op: "approve" | "unpublish" | "delete";
  children: React.ReactNode;
}) {
  return (
    <form action={moderate}>
      <input type="hidden" name="table" value="people" />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="op" value={op} />
      {children}
    </form>
  );
}

function StatusBadge({ status }: { status: "pending" | "approved" }) {
  return (
    <span
      className={`badge ${
        status === "pending"
          ? "!border-amber-200 !bg-amber-50 !text-amber-700"
          : "!border-emerald-200 !bg-emerald-50 !text-emerald-700"
      }`}
    >
      {status}
    </span>
  );
}
