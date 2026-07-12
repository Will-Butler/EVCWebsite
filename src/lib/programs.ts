// Programs & events content. Edit here to update the Programs page — copy is
// intentionally kept out of JSX so non-developers can revise it easily.

export interface Program {
  slug: string;
  name: string;
  tagline: string;
  cadence: string;
  description: string;
  highlights: string[];
  /** Single emoji used as a lightweight icon (no external image needed). */
  icon: string;
}

export const PROGRAMS: Program[] = [
  {
    slug: "e-week",
    name: "E-Week",
    tagline: "A week-long celebration of entrepreneurship across industries.",
    cadence: "Annual · Spring",
    icon: "🚀",
    description:
      "E-Week is our flagship entrepreneurship week. We partner with clubs across UNC Kenan-Flagler to host a full week of events, each built around entrepreneurship in a different industry — from healthcare and consumer to fintech, sports, and deep tech. Expect fireside chats, founder panels, and networking that connect MBA students with the people actually building companies.",
    highlights: [
      "Cross-club collaboration spanning multiple industries",
      "Daily fireside chats and founder networking",
      "A different entrepreneurship theme each day",
    ],
  },
  {
    slug: "vcic",
    name: "VCIC",
    tagline: "We host the world's largest student venture capital competition.",
    cadence: "Annual",
    icon: "🏆",
    description:
      "The Venture Capital Investment Competition (VCIC) is the largest student VC competition in the world, and UNC Kenan-Flagler is proud to host. Students step into the shoes of venture capitalists — sourcing, evaluating real startups, conducting due diligence, and negotiating term sheets in front of practicing investors. It's the closest thing to being on the other side of the table before you get there.",
    highlights: [
      "The world's largest student VC competition",
      "Real founders, real diligence, real term sheets",
      "Judged by practicing venture capital investors",
    ],
  },
  {
    slug: "career-trek",
    name: "Career Trek",
    tagline: "Learning at ground zero — on-site with VCs and startups.",
    cadence: "Annual",
    icon: "🧭",
    description:
      "On the Career Trek we travel to meet venture capital firms and startups where the work actually happens. Instead of hearing about the industry secondhand, students sit down with investors and founders in their offices, see how firms operate day to day, and build the relationships that turn into internships and full-time roles.",
    highlights: [
      "Site visits to VC firms and startups",
      "Direct access to investors and founders",
      "Relationship-building that leads to opportunities",
    ],
  },
  {
    slug: "career-labs",
    name: "Career Labs",
    tagline: "Weekly sessions that break down the path into VC and startups.",
    cadence: "Weekly",
    icon: "🧪",
    description:
      "Career Labs run every week and break down a different aspect of the entrepreneurship and venture capital career path — how to recruit, how to stand out, and how to fit your own background and goals into a role, whether that's founding a company or breaking into VC. Led by second-year students and industry experts, they turn a hard-to-navigate path into concrete, personalized next steps.",
    highlights: [
      "A new facet of the career path each week",
      "Tailored to your background — entrepreneurship or VC",
      "Led by second-years and industry experts",
    ],
  },
  {
    slug: "panels-fireside-chats",
    name: "Panels & Fireside Chats",
    tagline: "Candid conversations with founders, VCs, and KFBS faculty.",
    cadence: "Throughout the year",
    icon: "🎙️",
    description:
      "Across the year we host panels and fireside chats with real founders, venture capital investors, and UNC Kenan-Flagler faculty working in the space. These are candid, off-the-cuff conversations about how companies actually get built and funded — the wins, the failures, and the lessons you won't find in a case study.",
    highlights: [
      "Founders and VCs sharing unfiltered lessons",
      "KFBS faculty active in entrepreneurship and VC",
      "Small-format, high-access conversations",
    ],
  },
  {
    slug: "triangle-mixer",
    name: "Triangle Mixer",
    tagline: "Connecting the Research Triangle's entrepreneurship community.",
    cadence: "Annual",
    icon: "🤝",
    description:
      "The Triangle Mixer brings together the entrepreneurship and venture capital clubs from UNC, Duke, and NC State. It's a chance to expand your network beyond Chapel Hill and tap into the broader Research Triangle startup ecosystem — one of the fastest-growing in the country.",
    highlights: [
      "Joint event with Duke and NC State",
      "Access to the wider Research Triangle ecosystem",
      "Cross-school founder and investor connections",
    ],
  },
];
