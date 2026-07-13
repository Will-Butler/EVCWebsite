"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { moderate, updateVenture } from "@/lib/actions";
import ConfirmButton from "./ConfirmButton";
import type { Venture } from "@/lib/types";

export default function VentureAdminCard({ v }: { v: Venture }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const f = new FormData(e.currentTarget);
    const yearRaw = String(f.get("year") || "").trim();
    const res = await updateVenture(v.id, {
      name: String(f.get("name") || "").trim(),
      description: String(f.get("description") || "").trim(),
      industries: String(f.get("industries") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      founder: String(f.get("founder") || "").trim(),
      year: yearRaw ? Number(yearRaw) : null,
      contact_email: String(f.get("contact_email") || "").trim(),
      website: String(f.get("website") || "").trim(),
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
            <label className="label" htmlFor={`v-name-${v.id}`}>
              Name *
            </label>
            <input id={`v-name-${v.id}`} name="name" required defaultValue={v.name} className="input" />
          </div>
          <div>
            <label className="label" htmlFor={`v-desc-${v.id}`}>
              Description *
            </label>
            <textarea id={`v-desc-${v.id}`} name="description" required rows={2} defaultValue={v.description ?? ""} className="input" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor={`v-founder-${v.id}`}>
                Founder *
              </label>
              <input id={`v-founder-${v.id}`} name="founder" required defaultValue={v.founder ?? ""} className="input" />
            </div>
            <div>
              <label className="label" htmlFor={`v-year-${v.id}`}>
                Year
              </label>
              <input id={`v-year-${v.id}`} name="year" type="number" defaultValue={v.year ?? ""} className="input" />
            </div>
          </div>
          <div>
            <label className="label" htmlFor={`v-ind-${v.id}`}>
              Industries (comma-separated)
            </label>
            <input id={`v-ind-${v.id}`} name="industries" defaultValue={v.industries.join(", ")} className="input" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor={`v-email-${v.id}`}>
                Contact email
              </label>
              <input id={`v-email-${v.id}`} name="contact_email" type="email" defaultValue={v.contact_email ?? ""} className="input" />
            </div>
            <div>
              <label className="label" htmlFor={`v-web-${v.id}`}>
                Website
              </label>
              <input id={`v-web-${v.id}`} name="website" type="url" defaultValue={v.website ?? ""} className="input" />
            </div>
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
          <span className="font-semibold text-[var(--color-navy)]">{v.name}</span>
          <StatusBadge status={v.status} />
        </div>
        {(v.founder || v.year) && (
          <p className="text-xs text-[var(--color-slate-body)]">
            {[v.founder, v.year].filter(Boolean).join(" · ")}
          </p>
        )}
        {v.description && (
          <p className="mt-1 line-clamp-2 max-w-2xl text-sm text-[var(--color-slate-body)]">
            {v.description}
          </p>
        )}
      </div>
      <div className="flex flex-none flex-wrap gap-2">
        <button onClick={() => setEditing(true)} className="btn btn-outline text-sm">
          Edit
        </button>
        {v.status === "pending" ? (
          <ActionForm id={v.id} op="approve">
            <button className="btn btn-primary text-sm">Approve</button>
          </ActionForm>
        ) : (
          <ActionForm id={v.id} op="unpublish">
            <button className="btn btn-outline text-sm">Unpublish</button>
          </ActionForm>
        )}
        <ActionForm id={v.id} op="delete">
          <ConfirmButton
            message={`Delete "${v.name}"? This cannot be undone.`}
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
      <input type="hidden" name="table" value="ventures" />
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
