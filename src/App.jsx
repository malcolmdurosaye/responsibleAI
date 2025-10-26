import React, { useMemo, useState, useEffect } from "react";

/* ----------------------- Helpers ----------------------- */
function ensureFavicon(src = "/images/logo11.png") {
  let link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = src;
}

/** Posts an email to Substack without leaving the page */
function subscribeToSubstack(email) {
  if (!email) return;
  const form = document.createElement("form");
  form.method = "post";
  form.action = "https://malcolmdurosaye.substack.com/api/v1/free";
  form.style.display = "none";

  const emailInput = document.createElement("input");
  emailInput.name = "email";
  emailInput.value = email;
  form.appendChild(emailInput);

  const firstUrl = document.createElement("input");
  firstUrl.name = "first_url";
  firstUrl.value = window.location.href;
  form.appendChild(firstUrl);

  // Optional: compliance flags Substack accepts
  const referer = document.createElement("input");
  referer.name = "referrer";
  referer.value = window.location.href;
  form.appendChild(referer);

  document.body.appendChild(form);
  form.submit();
  setTimeout(() => form.remove(), 1000);
}

/* ----------------------- App ----------------------- */
export default function App() {
  const [page, setPage] = useState("home");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // mobile hamburger

  // ---- Simple hash-based routing so browser Back/Forward works ----
  useEffect(() => {
    const current = (window.location.hash || "#home").slice(1);
    setPage(current || "home");

    const onHashChange = () => {
      const next = (window.location.hash || "#home").slice(1);
      setPage(next || "home");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // keep hash in sync when page changes (for programmatic navigation)
  useEffect(() => {
    if ("#" + page !== window.location.hash) {
      window.location.hash = page;
    }
  }, [page]);

  // Inject favicon
  useEffect(() => {
    ensureFavicon("/images/logo11.png");
  }, []);

  const go = (p) => {
    setPage(p);
    setMenuOpen(false);
  };

  /* ---------------- Data: newsletters + resources (single source) ---------------- */
  const newsletters = useMemo(
    () => [
      {
        id: "n1",
        title: "AI Goes Political: Power, Policy, and the People",
        summary:
          "With the AI Act officially in effect, Europe has drawn a hard line. If you're building or deploying AI in the EU, it must be safe, explainable, and rights-respecting.",
        tags: ["Policy", "Governance", "Europe"],
        date: "2025-06-02",
        img: "/images/new1.png",
        src: "https://malcolmdurosaye.substack.com/p/ai-goes-political-power-policy-and",
      },
      {
        id: "n2",
        title:
          "While Governments Regulate AI; Microsoft Rates Model Safety—Together They Deliver",
        summary:
          "From model safety scorecards on Azure to emerging AI laws in Thailand and civil-society action in India, a global snapshot of transparent governance in action.",
        tags: ["Safety", "Transparency", "Global"],
        date: "2025-06-10",
        img: "/images/new2.png",
        src: "https://malcolmdurosaye.substack.com/p/while-governments-regulate-ai-microsoft",
      },
      {
        id: "n3",
        title: "Addressing AI’s Carbon Cost: Five Cars per Model",
        summary:
          "We’re zeroing in on a startling reality: training a single AI model can emit as much carbon as five cars in their lifetimes.",
        tags: ["Sustainability", "Climate", "AI Impact"],
        date: "2025-06-20",
        img: "/images/new3.png",
        src: "https://malcolmdurosaye.substack.com/p/addressing-ais-carbon-cost-five-cars",
      },
      {
        id: "n4",
        title:
          "Emerging Risks and Disconnects (overconfidence among C-suite leaders, innovation outpacing regulation)",
        summary:
          "The future of AI governance isn’t just being drafted in government offices; it’s being tested in boardrooms, shaped by CEOs and challenged by hackers.",
        tags: ["Risk", "Governance", "Leadership"],
        date: "2025-06-27",
        img: "/images/new4.png",
        src: "https://malcolmdurosaye.substack.com/p/emerging-risks-and-disconnects-overconfidence",
      },
      {
        id: "n5",
        title: "Inside the Big Beautiful Bill: States 1, Trump 0",
        summary:
          "The U.S. Senate has rejected a key provision in Trump’s sweeping budget bill, a clause that would have blocked states from enforcing their own AI laws.",
        tags: ["Policy", "US", "Regulation"],
        date: "2025-07-04",
        img: "/images/new5.png",
        src: "https://malcolmdurosaye.substack.com/p/inside-the-big-beautiful-bill-states",
      },
      // Add more as you publish; Search and Content will auto-use them
    ],
    []
  );

  const resourcesData = useMemo(
    () => [
      {
        id: "r1",
        title: "UNESCO Readiness Assessment Methodology",
        points: [
          "Assesses national strategies, institutions, and readiness to implement responsible AI.",
          "Reviews data systems, digital infrastructure, and human capital for AI innovation.",
          "Evaluates how well human rights, fairness, and accountability are built into AI policies and practices.",
        ],
        openHref:
          "https://unesdoc.unesco.org/ark:/48223/pf0000385198",
        downloadHref:
          "https://unesdoc.unesco.org/ark:/48223/pf0000385198",
      },
      {
        id: "r2",
        title: "UNESCO Ethical Impact Assessment Tool",
        points: [
          "Identify potential social, cultural, and human rights impacts of AI systems.",
          "Spot ethical risks early and develop strategies to address them.",
          "Promote responsible decision-making through documentation and public trust.",
        ],
        openHref: "https://unesdoc.unesco.org/ark:/48223/pf0000386276",
        downloadHref:
          "https://unesdoc.unesco.org/ark:/48223/pf0000386276",
      },
      {
        id: "r3",
        title: "The Global AI Vibrancy Tool",
        points: [
          "Tracks performance across research, talent, investment, and policy.",
          "Visualizes strengths and gaps using open datasets.",
          "Helps identify growth and collaboration opportunities.",
        ],
        openHref: "https://hai.stanford.edu/ai-index/global-vibrancy-tool",
        downloadHref: "https://hai.stanford.edu/ai-index/global-vibrancy-tool",
      },
      {
        id: "r4",
        title: "NIST AI Risk Management Framework",
        points: [
          "Identify, measure, and mitigate risks to ensure AI systems are trustworthy.",
          "Map, Measure, Manage, and Govern — from understanding risks to accountability.",
          "Adaptable for organizations of all sizes and sectors.",
        ],
        openHref:
          "https://www.nist.gov/itl/ai-risk-management-framework",
        downloadHref:
          "https://www.nist.gov/itl/ai-risk-management-framework",
      },
      {
        id: "r5",
        title: "UNICC AI Sandbox (coming soon)",
        points: [
          "Trusted cloud environment to design, test, and deploy responsibly.",
          "Curated datasets, reusable playbooks, and a common model catalog.",
          "Accelerates pilot-to-production with compliance and interoperability.",
        ],
        openHref: "https://www.unicc.org/ai-sandbox-as-a-service/",
        downloadHref: "https://www.unicc.org/ai-sandbox-as-a-service/",
      },
    ],
    []
  );

  // For the legacy “articles” search we now combine newsletters + map to a common shape:
  const searchable = useMemo(() => {
    const newsAsSearch = newsletters.map((n) => ({
      id: n.id,
      type: "Newsletter",
      title: n.title,
      summary: n.summary,
      tags: n.tags,
      date: n.date,
      img: n.img,
      href: n.src,
    }));
    const resAsSearch = resourcesData.map((r) => ({
      id: r.id,
      type: "Resource",
      title: r.title,
      summary: r.points[0],
      tags: ["Resource"],
      date: "2025-01-01",
      img: "/images/brief.png",
      href: r.openHref || r.downloadHref || "#",
    }));
    return [...newsAsSearch, ...resAsSearch];
  }, [newsletters, resourcesData]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return searchable.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        (a.tags || []).join(" ").toLowerCase().includes(q)
    );
  }, [searchable, query]);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Responsible AI & Beyond logo"
              className="max-h-10 object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 rounded-xl bg-slate-100 p-1">
            <NavItem label="Home" active={page === "home"} onClick={() => go("home")} />
            <NavItem label="Newsletter" active={page === "content"} onClick={() => go("content")} />
            <NavItem label="Resources" active={page === "resources"} onClick={() => go("resources")} />
            <NavItem label="Search" active={page === "search"} onClick={() => go("search")} />
          </nav>

          {/* Mobile: Hamburger */}
          <div className="md:hidden">
            <button
              aria-label="Open menu"
              className="p-2 rounded-lg border border-slate-300"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {/* Simple hamburger icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="#2274C6" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col">
              <MobileLink onClick={() => go("home")}>Home</MobileLink>
              <MobileLink onClick={() => go("content")}>Newsletter</MobileLink>
              <MobileLink onClick={() => go("resources")}>Resources</MobileLink>
              <MobileLink onClick={() => go("search")}>Search</MobileLink>
            </div>
          </div>
        )}
      </header>

      {page === "home" && <Home setPage={go} onSubscribe={subscribeToSubstack} />}
      {page === "content" && (
        <Content
          setPage={go}
          newsletters={newsletters}
          resourcesData={resourcesData}
        />
      )}
      {page === "resources" && <Resources resourcesData={resourcesData} />}
      {page === "search" && (
        <Search
          query={query}
          setQuery={setQuery}
          filtered={filtered}
        />
      )}

      {/* FOOTER */}
      <footer className="mt-8 bg-[#2274C6] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3 items-start">
          {/* Column 1: Logo + tagline + icons */}
          <div className="flex flex-col items-start">
            <img
              src="/images/logo2.svg"
              alt="Responsible AI & Beyond"
              className="h-16 sm:h-20 w-auto object-contain"
            />
            <p className="mt-3 text-sm leading-relaxed text-white">
              A weekly roundup on AI governance, safety, inclusion, and the socio-technical shifts shaping our world.
            </p>

            {/* Substack + Spotify */}
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://malcolmdurosaye.substack.com/s/responsible-ai-and-beyond"
                target="_blank"
                rel="noreferrer"
                aria-label="Substack"
              >
                <img src="/images/Substackw.svg" alt="" className="w-10 h-10" />
              </a>
              <a
                href="https://open.spotify.com/show/6NVstSGhBKTcXjLm8AWyAn?si=e69af3c3d82e4db8"
                target="_blank"
                rel="noreferrer"
                aria-label="Spotify"
              >
                <img src="/images/Spotifyw.svg" alt="" className="w-10 h-10" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h4 className="font-medium">Quick links</h4>
            <ul className="mt-3 space-y-4 sm:space-y-3 md:space-y-2 text-sm">
              <li><button className="block py-2 md:py-1 hover:underline" onClick={() => go("home")}>Home</button></li>
              <li><button className="block py-2 md:py-1 hover:underline" onClick={() => go("content")}>Newsletter</button></li>
              <li><button className="block py-2 md:py-1 hover:underline" onClick={() => go("resources")}>Resources</button></li>
              <li><button className="block py-2 md:py-1 hover:underline" onClick={() => go("search")}>Search</button></li>
            </ul>
          </div>

          {/* Column 3: Subscribe */}
          <div>
            <h4 className="font-medium">Subscribe</h4>
            <p className="mt-2 text-sm">
              Get the newsletter in your inbox. No spam, just clarity.
            </p>
            <FooterSubscribe onSubscribe={subscribeToSubstack} />
          </div>
        </div>
        <div className="text-center text-xs text-white/90 pb-8">
          © {new Date().getFullYear()} Responsible AI & Beyond
        </div>
      </footer>
    </div>
  );
}

/* ----------------------- UI Bits ----------------------- */

function NavItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-4 py-2 text-sm rounded-lg transition " +
        (active ? "bg-white shadow font-medium" : "text-slate-600 hover:bg-white/70")
      }
    >
      {label}
    </button>
  );
}

function MobileLink({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left py-2 px-1 text-base font-medium text-[#2274C6]"
    >
      {children}
    </button>
  );
}

function Section({ eyebrow, title, subtitle, children, kicker }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
      <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="md:col-span-5">
          {eyebrow && <p className="text-xs tracking-widest uppercase text-slate-500">{eyebrow}</p>}
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-2">{title}</h2>
          {subtitle && <p className="mt-3 text-slate-600">{subtitle}</p>}
        </div>
        <div className="md:col-span-7">{children}</div>
      </div>
      {kicker && <div className="mt-8 text-sm text-slate-500">{kicker}</div>}
    </section>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
      {children}
    </span>
  );
}

/* ----------------------- Pages ----------------------- */

function Home({ setPage, onSubscribe }) {
  const [emailTop, setEmailTop] = useState("");
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* subtle bg image */}
        <img
          src="/images/hero-raib.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30 pointer-events-none"
        />

        {/* Reduced top/bottom padding to match content page feel */}
        <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
          {/* Mobile: stack as a single column; Desktop: two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 sm:gap-8 lg:gap-16">
            {/* Text (left) */}
            <div className="flex flex-col justify-center">
              <p className="text-[10px] sm:text-xs tracking-widest uppercase text-slate-500">Weekly Newsletter</p>
              <h2 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
                Responsible AI & Beyond
              </h2>
              <p className="mt-5 text-base sm:text-lg text-slate-700">
                Clear, practical insight on AI governance, safety, and inclusion with a special lens on emerging ecosystems.
              </p>

              {/* Desktop & tablet buttons (keep under text) */}
              <div className="mt-8 hidden md:flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setPage("content")}
                  className="rounded-2xl bg-[#2274C6] text-white px-6 py-3 text-sm font-medium hover:bg-[#2B6DE2]"
                >
                  Read the latest
                </button>
                <button
                  onClick={() => setPage("resources")}
                  className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-medium hover:bg-slate-50"
                >
                  Explore resources
                </button>
              </div>
            </div>

            {/* Image (right / below on mobile) */}
            <div className="flex items-center justify-center md:justify-end">
              <img
                src="/images/hero-art.svg"
                alt="Responsible AI illustration"
                className="w-full max-w-[18rem] xs:max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1280px) 32rem, (min-width: 1024px) 28rem, (min-width: 640px) 24rem, 18rem"
              />
            </div>

            {/* Mobile-only buttons: placed AFTER image to match requested order */}
            <div className="md:hidden">
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setPage("content")}
                  className="rounded-2xl bg-[#2274C6] text-white px-6 py-3 text-sm font-medium hover:bg-[#2B6DE2]"
                >
                  Read the latest
                </button>
                <button
                  onClick={() => setPage("resources")}
                  className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-medium hover:bg-slate-50"
                >
                  Explore resources
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Framework"
        title="A new era of responsible AI"
        subtitle="AI is transforming the world, but progress without principles risks deepening inequality. Responsible AI and Beyond puts ethics at the center, bridging global advances with local insight to help leaders build AI that is trustworthy, fair, and inclusive."
      >
        <div className="grid sm:grid-cols-3 gap-4">
          <Card img="/images/governance.png" title="Governance & Policy" text="Readouts of regulations, standards, and what they mean for real systems." />
          <Card img="/images/safety.png" title="Safety & Security" text="Evals, incidents, mitigations, and red-teaming patterns that scale." />
          <Card img="/images/inclusion.png" title="Inclusion & Access" text="Localization, accessibility, and DPI approaches that broaden impact." />
        </div>
      </Section>

      <Section eyebrow="Focus Areas" title="From research to decision-making" subtitle="We turn frontier research and field lessons into templates you can use tomorrow.">
        <ul className="space-y-4 text-slate-700">
          <li className="flex items-start gap-3"><Pill>01</Pill><span><strong>Policy explainers</strong> that simplifies laws and standards for teams shipping products.</span></li>
          <li className="flex items-start gap-3"><Pill>02</Pill><span><strong>Risk management playbooks</strong> (NIST AI RMF-aligned) adapted for resource-constrained teams.</span></li>
          <li className="flex items-start gap-3"><Pill>03</Pill><span><strong>Localization blueprints</strong> for low-power, low-cost models in agriculture, health, and public services.</span></li>
          <li className="flex items-start gap-3"><Pill>04</Pill><span><strong>Procurement & DPI guides</strong> for interoperable, open, and accountable AI in government.</span></li>
        </ul>
      </Section>

      <Section eyebrow="Approach" title="Technologies shaping governance" subtitle="We look beyond the headlines to understand what truly shapes the future of AI.">
        <div className="grid md:grid-cols-2 gap-6">
          <BulletCard title="Model & System Evaluations" points={["Capabilities, hazards, and real-world misuse modes","Human-in-the-loop and red-team drills","Societal impact checks aligned to local context"]} />
          <BulletCard title="Privacy & Safety Tooling" points={["Data minimization and consent patterns","Audit logging, provenance, and traceability","Content labeling, feedback channels, and transparency"]} />
        </div>
      </Section>

      <Section eyebrow="Partnerships" title="Collaboration over hype" subtitle="We work with civil society, government, academia, and industry to surface field evidence and share workable solutions." kicker={<div className="flex flex-wrap gap-2"><Pill>Working groups</Pill><Pill>Policy roundtables</Pill><Pill>Open resources</Pill><Pill>Community spotlights</Pill></div>}>
        <div className="rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-700">
            Interested in partnering or sharing a story? Reach out at{" "}
            <a className="underline" href="mailto:raib@netandstrategy.com">raib@netandstrategy.com</a>.
          </p>
        </div>
      </Section>

      <Section eyebrow="Next" title="What’s ahead" subtitle="Briefings on upcoming standards, sandboxes, and community events across Africa and beyond.">
        <Timeline />
      </Section>

      {/* CTA with Substack subscription + icons INSIDE the container */}
      <Cta onSubscribe={onSubscribe} onEmailChange={setEmailTop} email={emailTop} />
    </main>
  );
}

function Content({ setPage, newsletters, resourcesData }) {
  // Pagination: 6 per page
  const pageSize = 6;
  const [p, setP] = useState(1);
  const totalPages = Math.max(1, Math.ceil(newsletters.length / pageSize));
  const pageItems = newsletters.slice((p - 1) * pageSize, p * pageSize);

  return (
    <main>
      <Section eyebrow="Newsletter" title="Latest from the newsletter" subtitle="Short, actionable, and grounded in real-world constraints.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageItems.map((it) => (
            <article key={it.id} className="rounded-2xl border border-slate-200 overflow-hidden hover:shadow-sm transition">
              <img src={it.img || "/images/brief.png"} alt="" className="w-full h-36 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold leading-snug">{it.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{it.summary}</p>
                <div className="mt-4">
                  <a
                    href={it.src}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium underline underline-offset-4"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setP((v) => Math.max(1, v - 1))}
              className="px-3 py-2 rounded-lg border text-sm hover:bg-slate-50"
              disabled={p === 1}
            >
              Prev
            </button>
            <Pagination total={totalPages} page={p} onChange={setP} />
            <button
              onClick={() => setP((v) => Math.min(totalPages, v + 1))}
              className="px-3 py-2 rounded-lg border text-sm hover:bg-slate-50"
              disabled={p === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </Section>

      <Section eyebrow="For Builders & Stakeholders" title="Resources" subtitle="Ethical frameworks, checklists, and articles to help you design and deploy AI responsibly.">
        <div className="grid md:grid-cols-2 gap-6">
          {resourcesData.slice(0, 4).map((r) => (
            <DocCard key={r.id} title={r.title} href={r.downloadHref || r.openHref || "#"} />
          ))}
        </div>
        <div className="mt-6">
          {/* View all resources button -> primary blue */}
          <button
            onClick={() => setPage("resources")}
            className="rounded-xl bg-[#2274C6] text-white px-5 py-3 text-sm font-medium hover:bg-[#2B6DE2]"
          >
            View all resources
          </button>
        </div>
      </Section>
    </main>
  );
}

function Resources({ resourcesData }) {
  // Pagination for Resources grid
  const pageSize = 4;
  const [p, setP] = useState(1);
  const totalPages = Math.max(1, Math.ceil(resourcesData.length / pageSize));
  const pageBlocks = resourcesData.slice((p - 1) * pageSize, p * pageSize);

  return (
    <main>
      <Section eyebrow="Library" title="Resource hub" subtitle="A curated, evolving index of guides, checklists, and primers.">
        <div className="grid md:grid-cols-2 gap-6">
          {pageBlocks.map((b) => (
            <div key={b.id} className="rounded-2xl border border-slate-200 p-6 bg-[url(/images/grid.svg)] bg-[length:24px_24px] bg-white/90 backdrop-blur">
              <h3 className="font-semibold">{b.title}</h3>
              <ul className="mt-3 list-disc pl-4 text-sm text-slate-700 space-y-2">
                {b.points.map((it, j) => (<li key={j}>{it}</li>))}
              </ul>
              <div className="mt-4">
                {/* Only show Download; if no downloadHref, fall back to openHref so users can still get the file */}
                {(b.downloadHref || b.openHref) && (
                  <a
                    className="text-sm font-medium underline underline-offset-4"
                    href={b.downloadHref || b.openHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setP((v) => Math.max(1, v - 1))}
              className="px-3 py-2 rounded-lg border text-sm hover:bg-slate-50"
              disabled={p === 1}
            >
              Prev
            </button>
            <Pagination total={totalPages} page={p} onChange={setP} />
            <button
              onClick={() => setP((v) => Math.min(totalPages, v + 1))}
              className="px-3 py-2 rounded-lg border text-sm hover:bg-slate-50"
              disabled={p === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </Section>
    </main>
  );
}

function Search({ query, setQuery, filtered }) {
  return (
    <main>
      <Section eyebrow="Search" title="Find articles & resources">
        <div className="rounded-2xl border border-slate-200 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try ‘evaluation’ or ‘DPI’"
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2274C6]"
            />
            <button className="rounded-xl bg-[#2274C6] text-white px-5 py-2 text-sm font-medium hover:bg-[#2B6DE2]">
              Search
            </button>
          </div>
          <div className="mt-6 divide-y divide-slate-200">
            {filtered.map((a) => (
              <div key={a.id} className="py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <img src={a.img || "/images/brief.png"} alt="" className="w-16 h-16 object-cover rounded-lg border" />
                    <div>
                      <div className="text-xs text-slate-500 mb-1">{a.type}</div>
                      <h3 className="font-medium leading-tight">{a.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{a.summary}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(a.tags || []).map((t) => (<Pill key={t}>{t}</Pill>))}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">{new Date(a.date).toLocaleDateString()}</div>
                </div>
                <div className="mt-3">
                  <a
                    className="text-sm font-medium underline underline-offset-4"
                    href={a.href || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open
                  </a>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-slate-600 py-6">No results yet. Try a different keyword.</p>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}

/* ----------------------- Reusable cards ----------------------- */

function Card({ title, text, img }) {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
      <div>{img && (<img src={img} alt="" className="w-full h-28 object-cover" />)}</div>
      <div className="p-6">
        <h3 className="font-semibold leading-snug">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{text}</p>
      </div>
    </div>
  );
}

function BulletCard({ title, points }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6">
      <h3 className="font-semibold leading-snug">{title}</h3>
      <ul className="mt-3 list-disc pl-4 text-sm text-slate-700 space-y-2">
        {points.map((p, i) => (<li key={i}>{p}</li>))}
      </ul>
    </div>
  );
}

function DocCard({ title, href }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6 bg-white/60">
      <h3 className="font-semibold leading-snug">{title}</h3>
      <div className="mt-4">
        <a
          className="text-sm font-medium underline underline-offset-4"
          href={href || "#"}
          target="_blank"
          rel="noreferrer"
        >
          Download
        </a>
      </div>
    </div>
  );
}

function Timeline() {
  const items = [
    { when: "Q4 2025", title: "AI Policy Roundup: Year-end special", detail: "A year-end look at global shifts in AI governance and what they mean for 2026." },
    { when: "Q1 2026", title: "Localization Sprint: Community call", detail: "A community call to share how AI is being adapted across agriculture, health, and public services." },
    { when: "Q2 2026", title: "Safety & Evaluations Toolkit v1", detail: "An open, lightweight kit for teams adopting basic safety workflows." },
  ];
  return (
    <ol className="space-y-6">
      {items.map((it, i) => (
        <li key={i} className="relative pl-8">
          <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-slate-900" />
          <p className="text-xs uppercase tracking-widest text-slate-500">{it.when}</p>
          <p className="font-medium mt-1">{it.title}</p>
          <p className="text-sm text-slate-600 mt-1">{it.detail}</p>
        </li>
      ))}
    </ol>
  );
}

function Cta({ onSubscribe, email, onEmailChange }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-10 md:p-14">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold tracking-tight">Join the community</h3>
            <p className="mt-2 text-slate-600">
              Get weekly insights, contribute field stories, and help shape pragmatic, human-centered AI.
            </p>

            {/* Substack + Spotify icons INSIDE CTA, under the line above */}
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://malcolmdurosaye.substack.com/s/responsible-ai-and-beyond"
                target="_blank"
                rel="noreferrer"
                aria-label="Substack"
                className="opacity-80 hover:opacity-100 transition"
              >
                <img src="/images/Substackd.svg" alt="" className="w-9 h-9" />
              </a>
              <a
                href="https://open.spotify.com/show/6NVstSGhBKTcXjLm8AWyAn?si=e69af3c3d82e4db8"
                target="_blank"
                rel="noreferrer"
                aria-label="Spotify"
                className="opacity-80 hover:opacity-100 transition"
              >
                <img src="/images/Spotifyd.svg" alt="" className="w-9 h-9" />
              </a>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const emailVal = formData.get("email");
              onSubscribe(String(emailVal));
              alert("Subscribed! Please check your inbox to confirm.");
            }}
            className="flex gap-2"
          >
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => onEmailChange?.(e.target.value)}
              placeholder="name@email.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2274C6]"
            />
            {/* Subscribe button -> primary blue */}
            <button className="rounded-xl bg-[#2274C6] text-white px-5 py-2 text-sm font-medium hover:bg-[#2B6DE2]">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function FooterSubscribe({ onSubscribe }) {
  const [email, setEmail] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        onSubscribe(email);
        alert("Thanks! Check your inbox to confirm your subscription.");
        setEmail("");
      }}
      className="mt-4 flex items-center gap-2"
    >
      <input
        type="email"
        required
        placeholder="name@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-white/40 bg-white/10 px-4 py-2 text-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/70"
      />
      {/* JOIN button must be white and should also subscribe */}
      <button className="rounded-xl bg-white text-[#2274C6] px-4 py-2 text-sm font-medium hover:text-[#2B6DE2]">
        Join
      </button>
    </form>
  );
}

/* ---------- Shared Pagination component ---------- */
function Pagination({ total, page, onChange }) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="inline-flex items-center gap-1">
      {pages.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`min-w-8 px-3 py-2 rounded-lg text-sm border ${
            n === page
              ? "bg-[#2274C6] text-white border-[#2274C6]"
              : "bg-white text-slate-700 hover:bg-slate-50"
          }`}
          aria-current={n === page ? "page" : undefined}
        >
          {n}
        </button>
      ))}
    </div>
  );
}
