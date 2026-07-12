import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import NetworkDirectory from "@/components/network/NetworkDirectory";
import AddPersonForm from "@/components/network/AddPersonForm";
import { getApprovedPeople } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Network Directory",
  description:
    "The EVC network at UNC Kenan-Flagler: connect with MBA students, alumni, faculty, founders, and venture capital investors. Find mentors, co-founders, and collaborators.",
  path: "/network",
});

export const dynamic = "force-dynamic";

export default async function NetworkPage() {
  const people = await getApprovedPeople();

  return (
    <>
      <PageHeader
        eyebrow="Network Directory"
        title="Connect across the EVC community"
        intro="Discover members, alumni, faculty, founders, and investors in the UNC Kenan-Flagler entrepreneurship and venture capital community — and find the mentors and co-founders who can help you build."
      />

      <section className="container-page py-12 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-medium text-[var(--color-slate-body)]">
            {people.length} {people.length === 1 ? "person" : "people"} in the
            EVC network
          </p>
          <AddPersonForm />
        </div>

        <div className="mt-8">
          {people.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="text-lg font-semibold text-[var(--color-navy)]">
                The directory is just getting started
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-slate-body)]">
                Be one of the first to join the EVC network. Add yourself and
                help members find and connect with you.
              </p>
            </div>
          ) : (
            <NetworkDirectory people={people} />
          )}
        </div>
      </section>
    </>
  );
}
