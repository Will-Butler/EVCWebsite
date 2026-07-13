"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { submitVenture } from "@/lib/actions";
import { SITE } from "@/lib/constants";

type Status = "idle" | "submitting" | "done" | "error";

export default function AddVentureForm() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(e.currentTarget);
    const industries = String(form.get("industries") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const yearRaw = String(form.get("year") || "").trim();

    const result = await submitVenture({
      name: String(form.get("name") || "").trim(),
      description: String(form.get("description") || "").trim(),
      industries,
      founder: String(form.get("founder") || "").trim(),
      year: yearRaw ? Number(yearRaw) : null,
      contact_email: String(form.get("contact_email") || "").trim(),
      website: String(form.get("website") || "").trim(),
    });

    if (!result.ok) {
      setStatus("error");
      setError(result.error ?? "Something went wrong.");
      return;
    }
    setStatus("done");
  }

  function close() {
    setOpen(false);
    // Reset after the close animation-less unmount so reopening is fresh.
    setTimeout(() => {
      setStatus("idle");
      setError(null);
    }, 150);
  }

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
        + Add Venture
      </button>

      <Modal open={open} onClose={close} title="Submit a venture">
        {status === "done" ? (
          <div className="text-center">
            <p className="text-2xl" aria-hidden>
              ✅
            </p>
            <p className="mt-2 font-semibold text-[var(--color-navy)]">
              Thanks — your venture was submitted!
            </p>
            <p className="mt-1 text-sm text-[var(--color-slate-body)]">
              An EVC admin will review it and publish it to the repository
              shortly.
            </p>
            <button onClick={close} className="btn btn-outline mt-5">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-[var(--color-slate-body)]">
              Building something? Add it to the EVC venture repository.
              Submissions are reviewed before they appear publicly.
            </p>

            <div>
              <label className="label" htmlFor="v-name">
                Venture name *
              </label>
              <input id="v-name" name="name" required className="input" placeholder="Acme Inc." />
            </div>

            <div>
              <label className="label" htmlFor="v-desc">
                One-line description *
              </label>
              <textarea
                id="v-desc"
                name="description"
                required
                rows={3}
                className="input"
                placeholder="What does the venture do?"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="v-founder">
                  Founder *
                </label>
                <input id="v-founder" name="founder" required className="input" placeholder="Your name" />
              </div>
              <div>
                <label className="label" htmlFor="v-year">
                  Year founded
                </label>
                <input
                  id="v-year"
                  name="year"
                  type="number"
                  min="2000"
                  max="2100"
                  className="input"
                  placeholder="2026"
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="v-industries">
                Industries (comma-separated)
              </label>
              <input
                id="v-industries"
                name="industries"
                className="input"
                placeholder="Fintech, Consumer"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="v-email">
                  Contact email
                </label>
                <input id="v-email" name="contact_email" type="email" className="input" placeholder="you@email.com" />
              </div>
              <div>
                <label className="label" htmlFor="v-website">
                  Website
                </label>
                <input id="v-website" name="website" type="url" className="input" placeholder="https://…" />
              </div>
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Submitting…" : "Submit venture"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
