import React, { useMemo, useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  const [query, setQuery] = useState("");

  const articles = useMemo(
    () => [
      { id: 1, title: "How Governments Are Adopting the AU Continental AI Strategy (2024–2025)", tags: ["Policy","Africa","Strategy"], summary: "A roundup of national AI strategy updates across Africa, tracking readiness, funding, and implementation gaps.", date: "2025-09-28" },
      { id: 2, title: "Model Evaluations 101: From Red-Team Drills to Societal Impact Checks", tags: ["Safety","Evaluation","Governance"], summary: "Explains capability, safety, and socio-technical evals with a lightweight checklist teams can start using today.", date: "2025-08-19" },
      { id: 3, title: "Inclusive by Design: Localization Tactics for Low-Power Agri-LLMs", tags: ["Inclusion","Localization","Agriculture"], summary: "Concrete practices for building localized assistants that work for small-scale producers and rural contexts.", date: "2025-07-12" },
      { id: 4, title: "The DPI Angle: Interoperability, Open Standards, and Accountability", tags: ["DPI","Open Standards","Accountability"], summary: "Why digital public infrastructure matters for scalable, responsible AI systems in the public sector.", date: "2025-06-30" },
    ], []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.tags.join(" ").toLowerCase().includes(q)
    );
  }, [articles, query]);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-700" />
            <div>
              <p className="text-xs tracking-wider uppercase text-slate-500">Newsletter</p>
              <h1 className="text-lg font-semibold tracking-tight">Responsible AI & Beyond</h1>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-2 rounded-xl bg-slate-100 p-1">
            <NavItem label="Home" active={page==="home"} onClick={()=>setPage("home")} />
            <NavItem label="Content" active={page==="content"} onClick={()=>setPage("content")} />
            <NavItem label="Resources" active={page==="resources"} onClick={()=>setPage("resources")} />
            <NavItem label="Search" active={page==="search"} onClick={()=>setPage("search")} />
          </nav>
          <div className="md:hidden">
            <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={page} onChange={e=>setPage(e.target.value)}>
              <option value="home">Home</option>
              <option value="content">Content</option>
              <option value="resources">Resources</option>
              <option value="search">Search</option>
            </select>
          </div>
        </div>
      </header>

      {page==="home" && <Home setPage={setPage} />}
      {page==="content" && <Content setPage={setPage} />}
      {page==="resources" && <Resources />}
      {page==="search" && <Search query={query} setQuery={setQuery} filtered={filtered} onOpen={(id)=>alert('Open article #' + id)} />}

      <footer className="border-t border-slate-200 mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold">Responsible AI & Beyond</h3>
            <p className="mt-2 text-sm text-slate-600">A weekly roundup on AI governance, safety, inclusion, and the socio‑technical shifts shaping our world.</p>
          </div>
          <div>
            <h4 className="font-medium">Quick links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><button className="hover:underline" onClick={()=>setPage("home")}>Home</button></li>
              <li><button className="hover:underline" onClick={()=>setPage("content")}>Latest Content</button></li>
              <li><button className="hover:underline" onClick={()=>setPage("resources")}>Resources</button></li>
              <li><button className="hover:underline" onClick={()=>setPage("search")}>Search</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Subscribe</h4>
            <p className="mt-2 text-sm text-slate-600">Get the newsletter in your inbox. No spam, just clarity.</p>
            <form onSubmit={(e)=>{ e.preventDefault(); alert(`Thanks! You'll receive a confirmation email.`); }} className="mt-4 flex items-center gap-2">
              <input type="email" required placeholder="you@example.com" className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800">Join</button>
            </form>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 pb-8">© {new Date().getFullYear()} Responsible AI & Beyond</div>
      </footer>
    </div>
  );
}

function NavItem({ label, active, onClick }) {
  return (
    <button onClick={onClick} className={"px-4 py-2 text-sm rounded-lg transition " + (active ? "bg-white shadow font-medium" : "text-slate-600 hover:bg-white/70")}>
      {label}
    </button>
  );
}

function Section({ eyebrow, title, subtitle, children, kicker }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-12 gap-10 items-start">
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
  return <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">{children}</span>;
}

function Home({ setPage }) {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <img src="/images/hero-raib.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs tracking-widest uppercase text-slate-500">Weekly Briefing</p>
            <h2 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight">Responsible AI & Beyond</h2>
            <p className="mt-5 text-lg text-slate-700">Clear, practical insight on AI governance, safety, and inclusion — with a special lens on Africa and other emerging ecosystems.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={()=>setPage("content")} className="rounded-2xl bg-slate-900 text-white px-6 py-3 text-sm font-medium hover:bg-slate-800">Read the latest</button>
              <button onClick={()=>setPage("resources")} className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-medium hover:bg-slate-50">Explore resources</button>
            </div>
          </div>

          {/* Right-hand illustration */}
          <div className="relative flex justify-center">
            <img src="/images/hero-art.svg" alt="Responsible AI illustration" className="w-full max-w-lg drop-shadow-lg" />
          </div>
        </div>
      </section>

      <Section eyebrow="Context" title="A new era of responsible AI" subtitle="AI adoption is accelerating — but trust, safety, and equity must keep pace. We translate complex developments into practical steps for policymakers, builders, and civil society.">
        <div className="grid sm:grid-cols-3 gap-4">
          <Card img="/images/governance.png" title="Governance & Policy" text="Readouts of regulations, standards, and what they mean for real systems." />
          <Card img="/images/safety.png" title="Safety & Security" text="Evals, incidents, mitigations, and red‑teaming patterns that scale." />
          <Card img="/images/inclusion.png" title="Inclusion & Access" text="Localization, accessibility, and DPI approaches that broaden impact." />
        </div>
      </Section>

      <Section eyebrow="Focus Areas" title="From research to decision‑making" subtitle="We turn frontier research and field lessons into templates you can use tomorrow.">
        <ul className="space-y-4 text-slate-700">
          <li className="flex items-start gap-3"><Pill>01</Pill><span><strong>Policy explainers</strong> that de‑jargonize laws and standards for teams shipping products.</span></li>
          <li className="flex items-start gap-3"><Pill>02</Pill><span><strong>Risk management playbooks</strong> (NIST AI RMF‑aligned) adapted for resource‑constrained teams.</span></li>
          <li className="flex items-start gap-3"><Pill>03</Pill><span><strong>Localization blueprints</strong> for low‑power, low‑cost models in agriculture, health, and public services.</span></li>
          <li className="flex items-start gap-3"><Pill>04</Pill><span><strong>Procurement & DPI guides</strong> for interoperable, open, and accountable AI in government.</span></li>
        </ul>
      </Section>

      <Section eyebrow="Methods" title="Technologies shaping governance" subtitle="We track what matters, not just what’s shiny.">
        <div className="grid md:grid-cols-2 gap-6">
          <BulletCard title="Model & System Evaluations" points={["Capabilities, hazards, and real‑world misuse modes","Human‑in‑the‑loop and red‑team drills","Societal impact checks aligned to local context"]} />
          <BulletCard title="Privacy & Safety Tooling" points={["Data minimization and consent patterns","Audit logging, provenance, and traceability","Content labeling, feedback channels, and transparency"]} />
        </div>
      </Section>

      <Section eyebrow="Partnerships" title="Collaboration over hype" subtitle="We work with civil society, government, academia, and industry to surface field evidence and share workable practices." kicker={<div className="flex flex-wrap gap-2"><Pill>Working groups</Pill><Pill>Policy roundtables</Pill><Pill>Open resources</Pill><Pill>Community spotlights</Pill></div>}>
        <div className="rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-700">Interested in partnering or sharing a field story? Reach out at <a className="underline" href="mailto:hello@responsibleaibeyond.org">hello@responsibleaibeyond.org</a>.</p>
        </div>
      </Section>

      <Section eyebrow="Next" title="What’s ahead" subtitle="Briefings on upcoming standards, sandboxes, and community events across Africa and beyond.">
        <Timeline />
      </Section>

      <Cta />
    </main>
  );
}

function Content({ setPage }) {
  const items = [
    { title: "Weekly Brief #37: AI Safety Updates & African Policy Watch", excerpt: "A concise digest covering governance, safety incidents, and inclusive AI practices you can apply this week." },
    { title: "Playbook: Lightweight AI Risk Reviews for Small Teams", excerpt: "A 2‑hour template for scoping, assessing, and documenting AI risks before launch — practical and affordable." },
    { title: "Case Study: Localizing Agri‑LLMs for Advisory Services", excerpt: "What worked, what didn’t, and what we’d do differently next time (power, data, literacy, and support)." },
  ];

  return (
    <main>
      <Section eyebrow="Content" title="Latest from the newsletter" subtitle="Short, actionable, and grounded in real‑world constraints.">
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <article key={i} className="rounded-2xl border border-slate-200 overflow-hidden hover:shadow-sm transition">
              <img src={i===0?"/images/brief.png":i===1?"/images/playbook.png":"/images/case.png"} alt="" className="w-full h-36 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold leading-snug">{it.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{it.excerpt}</p>
                <div className="mt-4">
                  <button onClick={()=>alert('Open article')} className="text-sm font-medium underline underline-offset-4">Read more</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="For Builders" title="Practical templates" subtitle="Copy‑paste checklists, worksheets, and policy explainers.">
        <div className="grid md:grid-cols-2 gap-6">
          <DocCard title="AI Risk Review (NIST‑aligned) — 4 pages" />
          <DocCard title="Model Card + Incident Log — 2 pages" />
          <DocCard title="Localization Readiness Worksheet — 1 page" />
          <DocCard title="Procurement & DPI Checklist — 2 pages" />
        </div>
        <div className="mt-6">
          <button onClick={()=>setPage("resources")} className="rounded-xl bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-slate-800">View all resources</button>
        </div>
      </Section>
    </main>
  );
}

function Resources() {
  const blocks = [
    { title: "AI Governance 101", items: ["Explainers on major frameworks (AU, OECD, NIST)","Sample policies (usage, procurement, incident response)","Glossary: from access controls to watermarking"] },
    { title: "Safety & Evaluations", items: ["Red‑team patterns and reporting","Human oversight & HIRAs","System cards, documentation, and audits"] },
    { title: "Inclusion & Localization", items: ["Language, literacy, and cultural fit","Low‑power deployment patterns","Community feedback and participatory design"] },
    { title: "Digital Public Infrastructure", items: ["Open standards and interoperability","Registries, consent, and data governance","Procurement templates and vendor questions"] },
  ];

  return (
    <main>
      <Section eyebrow="Library" title="Resource hub" subtitle="A curated, evolving index of guides, checklists, and primers.">
        <div className="grid md:grid-cols-2 gap-6">
          {blocks.map((b, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 p-6 bg-[url(/images/grid.svg)] bg-[length:24px_24px] bg-white/90 backdrop-blur">
              <h3 className="font-semibold">{b.title}</h3>
              <ul className="mt-3 list-disc pl-4 text-sm text-slate-700 space-y-2">
                {b.items.map((it, j) => (<li key={j}>{it}</li>))}
              </ul>
              <div className="mt-4">
                <button className="text-sm font-medium underline underline-offset-4" onClick={()=>alert('Open section')}>Open</button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}

function Search({ query, setQuery, filtered, onOpen }) {
  return (
    <main>
      <Section eyebrow="Search" title="Find articles & resources">
        <div className="rounded-2xl border border-slate-200 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Try ‘evaluation’ or ‘DPI’" className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button className="rounded-xl bg-slate-900 text-white px-5 py-2 text-sm font-medium hover:bg-slate-800">Search</button>
          </div>
          <div className="mt-6 divide-y divide-slate-200">
            {filtered.map((a) => (
              <div key={a.id} className="py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <img src="/images/brief.png" alt="" className="w-16 h-16 object-cover rounded-lg border" />
                    <div>
                      <h3 className="font-medium leading-tight">{a.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{a.summary}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {a.tags.map((t) => (<Pill key={t}>{t}</Pill>))}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">{new Date(a.date).toLocaleDateString()}</div>
                </div>
                <div className="mt-3">
                  <button className="text-sm font-medium underline underline-offset-4" onClick={()=>onOpen(a.id)}>Open</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (<p className="text-sm text-slate-600 py-6">No results yet. Try a different keyword.</p>)}
          </div>
        </div>
      </Section>
    </main>
  );
}

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

function DocCard({ title }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6 bg-white/60">
      <h3 className="font-semibold leading-snug">{title}</h3>
      <div className="mt-4">
        <button className="text-sm font-medium underline underline-offset-4" onClick={()=>alert('Download doc')}>Download</button>
      </div>
    </div>
  );
}

function Timeline() {
  const items = [
    { when: "Q4 2025", title: "AI Policy Roundup: Year‑end special", detail: "Comparative analysis of major global moves and what to expect in 2026." },
    { when: "Q1 2026", title: "Localization Sprint: Community call", detail: "Share case studies across agri, health, and public services." },
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

function Cta() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-10 md:p-14">
        <div className="grid md:grid-cols-3 gap-10 items-center">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold tracking-tight">Join the community</h3>
            <p className="mt-2 text-slate-600">Get weekly insights, contribute field stories, and help shape pragmatic, human‑centered AI.</p>
          </div>
          <form onSubmit={(e)=>{ e.preventDefault(); alert(`Welcome aboard! Check your inbox.`); }} className="flex gap-2">
            <input type="email" required placeholder="you@example.com" className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button className="rounded-xl bg-slate-900 text-white px-5 py-2 text-sm font-medium hover:bg-slate-800">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}
