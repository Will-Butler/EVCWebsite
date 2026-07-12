import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import VentureCard from "@/components/ventures/VentureCard";
import AddVentureForm from "@/components/ventures/AddVentureForm";
import { getApprovedVentures } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "MBA Student Ventures",
  description:
    "Explore active startups and ventures founded by UNC Kenan-Flagler MBA students. Browse the EVC venture repository and connect directly with founders.",
  path: "/ventures",
});

// Always fetch fresh so newly approved ventures appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function VenturesPage() {
  const ventures = await getApprovedVentures();

  return (
    <>
      <PageHeader
        eyebrow="Venture Repository"
        title="Ventures built by UNC Kenan-Flagler MBAs"
        intro="A living directory of the startups our members are building — across fintech, healthcare, media, edtech, and beyond. Discover what's being built and reach the founders directly."
      />

      <section className="container-page py-12 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-medium text-[var(--color-slate-body)]">
            {ventures.length} active{" "}
            {ventures.length === 1 ? "venture" : "ventures"} in the MBA program
          </p>
          <AddVentureForm />
        </div>

        {ventures.length === 0 ? (
          <div className="card mt-8 p-10 text-center">
            <p className="text-lg font-semibold text-[var(--color-navy)]">
              No ventures published yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-slate-body)]">
              Building something at Kenan-Flagler? Be the first to add your
              venture to the repository.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ventures.map((v) => (
              <VentureCard key={v.id} venture={v} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
