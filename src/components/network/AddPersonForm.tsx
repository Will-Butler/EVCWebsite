"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { RELATION_TYPES } from "@/lib/types";
import { SITE } from "@/lib/constants";

type Status = "idle" | "submitting" | "done" | "error";

export default function AddPersonForm() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const supabase = getBrowserSupabase();
    if (!supabase) {
      setStatus("error");
      setError(
        "The directory isn't connected yet. Please email us to be added.",
      );
      return;
    }

    const form = new FormData(e.currentTarget);
    const gradRaw = String(form.get("grad_year") || "").trim();

    const { error: insertError } = await supabase.from("people").insert({
      name: String(form.get("name") || "").trim(),
      relation: String(form.get("relation") || "Current Student"),
      title: String(form.get("title") || "").trim() || null,
      company: String(form.get("company") || "").trim() || null,
      grad_year: gradRaw ? Number(gradRaw) : null,
      email: String(form.get("email") || "").trim() || null,
      linkedin: String(form.get("linkedin") || "").trim() || null,
      bio: String(form.get("bio") || "").trim() || null,
      status: "pending",
    });

    if (insertError) {
      setStatus("error");
      setError(insertError.message);
      return;
    }
    setStatus("done");
  }

  function close() {
    setOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setError(null);
    }, 150);
  }

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
        + Add Person
      </button>

      <Modal open={open} onClose={close} title="Join the network">
        {status === "done" ? (
          <div className="text-center">
            <p className="text-2xl" aria-hidden>
              ✅
            </p>
            <p className="mt-2 font-semibold text-[var(--color-navy)]">
              You&apos;re submitted!
            </p>
            <p className="mt-1 text-sm text-[var(--color-slate-body)]">
              An EVC admin will review and publish your profile to the directory
              soon.
            </p>
            <button onClick={close} className="btn btn-outline mt-5">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-[var(--color-slate-body)]">
              Add yourself to the EVC network so members can find and connect
              with you. Entries are reviewed before appearing publicly.
            </p>

            <div>
              <label className="label" htmlFor="p-name">
                Full name *
              </label>
              <input id="p-name" name="name" required className="input" placeholder="Jane Doe" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="p-relation">
                  Relationship to EVC *
                </label>
                <select id="p-relation" name="relation" required className="input" defaultValue="Current Student">
                  {RELATION_TYPES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="p-grad">
                  Grad year
                </label>
                <input id="p-grad" name="grad_year" type="number" min="1950" max="2100" className="input" placeholder="2027" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="p-title">
                  Title / role
                </label>
                <input id="p-title" name="title" className="input" placeholder="Associate, Founder…" />
              </div>
              <div>
                <label className="label" htmlFor="p-company">
                  Company
                </label>
                <input id="p-company" name="company" className="input" placeholder="Acme Ventures" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="p-email">
                  Email
                </label>
                <input id="p-email" name="email" type="email" className="input" placeholder="you@email.com" />
              </div>
              <div>
                <label className="label" htmlFor="p-linkedin">
                  LinkedIn URL
                </label>
                <input id="p-linkedin" name="linkedin" type="url" className="input" placeholder="https://linkedin.com/in/…" />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="p-bio">
                Short bio
              </label>
              <textarea id="p-bio" name="bio" rows={3} className="input" placeholder="A sentence or two about your background and interests." />
            </div>

            {status === "error" && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}{" "}
                <a className="font-semibold underline" href={`mailto:${SITE.email}`}>
                  Email us
                </a>
              </p>
            )}

            <div className="flex justify-end gap-3 pt-1">
              <button type="button" onClick={close} className="btn btn-outline">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
                {status === "submitting" ? "Submitting…" : "Join network"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
