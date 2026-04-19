const { useState, useEffect, useRef } = React;

// ---------- DATA ----------
const DATA = {
  name: "Sahiel Bose",
  tagline: "Statistics & Data Science at UCLA. Building AI systems that reason, decide, and ship.",
  location: "Los Angeles, CA  /  Bay Area",
  email: "sahielbose@gmail.com",
  phone: "(925) 871-8844",
  github: "github.com/sahielbose",
  linkedin: "linkedin.com/in/sahiel-bose",
  about: [
    "I'm a founder, researcher, and engineer working at the intersection of machine learning and real-world systems — from multi-agent LLM pipelines to neurotech devices.",
    "Currently co-founding Optivia, interning at ThinkNeuro, and researching reasoning in LLMs at UC Santa Cruz's AIEA Lab.",
  ],
  experience: [
    {
      company: "Optivia",
      role: "Co-Founder",
      location: "Dublin, CA",
      period: "Mar 2025 — Present",
      kind: "Founder",
      bullets: [
        "Lead design & development of AI agents for the Optivia prototype — primary architect of its core intelligence, agentic workflows, and decision-making logic.",
        "Designed the mathematical modeling and algorithmic logic behind a multi-agent pipeline: prompt routing, complexity scoring, model selection, prompt engineering.",
        "Built a framework that intercepts user inputs, dynamically enriches prompts with targeted clarifying questions, and activates Claude Code commands via multi-agent systems + the Anthropic SDK.",
      ],
    },
    {
      company: "ThinkNeuro LLC",
      role: "Software Engineering Intern",
      location: "Dublin, CA",
      period: "Nov 2024 — Present",
      kind: "Engineering",
      bullets: [
        "Developing a mobile application in React Native for neuroscience research use cases.",
        "Building a machine learning model to reduce false detections in opioid overdose prediction.",
        "Co-authoring a research paper on opioid overdose and its research applications.",
      ],
    },
    {
      company: "UC Santa Cruz — AIEA Lab",
      role: "Research Intern",
      location: "Santa Cruz, CA",
      period: "Oct 2024 — Present",
      kind: "Research",
      bullets: [
        "Research logical reasoning in large language models and methods to enhance their problem-solving.",
        "Develop structured exercises to improve LLMs' logical inference and reasoning abilities.",
        "Explore algorithmic techniques to refine and optimize LLM-generated reasoning processes.",
      ],
    },
    {
      company: "UC Riverside Research Lab",
      role: "Research Intern",
      location: "Riverside, CA",
      period: "May 2025 — Jan 2026",
      kind: "Research",
      bullets: [
        "Assisted a Ph.D. student on a Graph Neural Network project detecting traffic congestion hotspots in large-scale road networks.",
        "Supported data preprocessing, model training, and optimization for urban-planning insights.",
        "Collaborated on research involving real-world infrastructure and transportation systems.",
      ],
    },
  ],
  projects: [
    {
      title: "Opioid Overdose Prediction Device",
      subtitle: "Neurotech · Machine Learning",
      period: "Nov 2024 — Present",
      status: "Patent + copyright in progress",
      description:
        "A neurotechnology device for opioid overdose prediction. Contributing to hardware-software integration, model development, and co-authoring the research paper.",
      tags: ["ML", "Neurotech", "Hardware"],
    },
    {
      title: "ProSLM",
      subtitle: "LLM Systems · Deployment",
      period: "Jun 2025 — Present",
      status: "UC Santa Cruz",
      description:
        "Supporting website hosting and integration for the ProSLM project — connecting research components into a unified, deployable platform.",
      tags: ["LLMs", "Deployment", "Infra"],
    },
    {
      title: "HotSpot Detection with GNNs",
      subtitle: "Graph Neural Networks · Geospatial AI",
      period: "May 2025 — Jan 2026",
      status: "UC Riverside",
      description:
        "Developed GNN models that identify traffic congestion hotspots from real-time geospatial data. Benchmarked on smaller datasets to validate transport-network performance.",
      tags: ["GNNs", "Geospatial", "Python"],
    },
    {
      title: "ASL Recognition System",
      subtitle: "CNNs · LSTMs · Raspberry Pi",
      period: "Dec 2024 — Mar 2025",
      status: "2nd place — ACSEF",
      description:
        "Co-led design of an AI-powered ASL recognition system to bridge communication for Deaf and hard-of-hearing users. CNNs + LSTMs deployed on Raspberry Pi.",
      tags: ["CV", "Edge", "LSTM"],
    },
  ],
  education: [
    {
      school: "University of California, Los Angeles",
      degree: "B.S. Statistics & Data Science",
      location: "Los Angeles, CA",
      period: "2025 — 2029",
    },
  ],
  skills: {
    "AI techniques": ["Logical Reasoning", "Deep Learning", "Neural Networks", "Agentic Workflows", "Prompt Engineering", "Multi-Agent Systems", "Model Training", "KNN", "Linear Regression"],
    "Frameworks": ["TensorFlow", "PyTorch", "Keras", "React Native", "n8n", "Anthropic SDK"],
    "Models & domains": ["CNNs", "RNNs", "GNNs", "GANs", "LLMs", "NLP", "Computer Vision", "AI Agents", "Prompt Routing"],
    "Languages": ["Python", "JavaScript"],
  },
};

// ---------- HOOKS ----------
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.15, ...options });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 200;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids.join(',')]);
  return active;
}

// ---------- COMPONENTS ----------
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style = {} }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(14px)',
        transition: `opacity .8s cubic-bezier(.2,.7,.2,1) ${delay}s, transform .8s cubic-bezier(.2,.7,.2,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

function SideNav({ sections }) {
  const active = useActiveSection(sections.map(s => s.id));
  return (
    <nav className="sidenav">
      <div className="sidenav-mark">
        <span className="dot" />
        <span className="sidenav-name">Sahiel Bose</span>
      </div>
      <ul>
        {sections.map((s, i) => (
          <li key={s.id} className={active === s.id ? 'active' : ''}>
            <a href={`#${s.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(s.id).scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <span className="label">{s.label}</span>
              <span className="line" />
            </a>
          </li>
        ))}
      </ul>
      <div className="sidenav-foot">
        <a href={`mailto:${DATA.email}`} className="foot-link">Email</a>
        <a href={`https://${DATA.github}`} target="_blank" rel="noreferrer" className="foot-link">GitHub</a>
        <a href={`https://${DATA.linkedin}`} target="_blank" rel="noreferrer" className="foot-link">LinkedIn</a>
      </div>
    </nav>
  );
}

function Hero() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', hour12: false });
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="intro" className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <Reveal as="div" className="eyebrow">
            <span className="pulse" /> Available for summer 2026 — research & engineering
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display">
              Sahiel<br/>
              <span className="italic">Bose.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede">{DATA.tagline}</p>
          </Reveal>
          <Reveal delay={0.24} className="hero-meta">
            <div><span className="k">Based</span><span className="v">Los Angeles · Bay Area</span></div>
            <div><span className="k">Focus</span><span className="v">Multi-agent LLMs · Neurotech · GNNs</span></div>
            <div><span className="k">Local time</span><span className="v mono">{time} PT</span></div>
          </Reveal>
          <Reveal delay={0.32} className="hero-cta">
            <a href="#work" className="btn primary" onClick={(e) => { e.preventDefault(); document.getElementById('work').scrollIntoView({ behavior: 'smooth' }); }}>
              <span>See selected work</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="assets/SahielBose_Resume.pdf" target="_blank" rel="noreferrer" className="btn ghost">Résumé (PDF)</a>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="hero-portrait">
          <div className="portrait-frame">
            <img src="assets/sahiel.jpeg" alt="Sahiel Bose" />
            <div className="portrait-grain" />
            <div className="portrait-label">
              <span>S. BOSE</span>
              <span className="mono">— ’26</span>
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.4} className="hero-scroll">
        <span className="mono">scroll</span>
        <span className="scroll-line" />
      </Reveal>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <SectionHead num="01" title="About" kicker="A short introduction" />
      <div className="about-grid">
        <div className="about-copy">
          {DATA.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}><p>{p}</p></Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="about-card">
          <div className="about-card-row"><span>Role</span><span>Student · Founder · Researcher</span></div>
          <div className="about-card-row"><span>School</span><span>UCLA — Stats &amp; DS</span></div>
          <div className="about-card-row"><span>Stack</span><span className="mono">Python · PyTorch · RN · Anthropic SDK</span></div>
          <div className="about-card-row"><span>Interests</span><span>Agents · Reasoning · Neurotech</span></div>
          <div className="about-card-row"><span>Status</span><span className="status-dot"><span className="dot green" />Open to collabs</span></div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionHead({ num, title, kicker }) {
  return (
    <Reveal className="section-head">
      <div className="section-num mono">{num}</div>
      <div className="section-titles">
        <div className="section-kicker mono">{kicker}</div>
        <h2 className="section-title">{title}</h2>
      </div>
    </Reveal>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHead num="02" title="Experience" kicker="Where I've been building" />
      <div className="xp-list">
        {DATA.experience.map((x, i) => (
          <Reveal key={i} delay={i * 0.05} className="xp-row">
            <div className="xp-period mono">{x.period}</div>
            <div className="xp-body">
              <div className="xp-top">
                <h3>{x.company}</h3>
                <span className="xp-tag mono">{x.kind}</span>
              </div>
              <div className="xp-meta">
                <span>{x.role}</span>
                <span className="dot-sep">·</span>
                <span>{x.location}</span>
              </div>
              <ul>
                {x.bullets.map((b, bi) => (
                  <li key={bi}><span className="bullet-dash">—</span>{b}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [hover, setHover] = useState(null);
  return (
    <section id="work" className="section">
      <SectionHead num="03" title="Selected work" kicker="Projects & research" />
      <div className="proj-list" onMouseLeave={() => setHover(null)}>
        {DATA.projects.map((p, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <a
              className={`proj-row ${hover !== null && hover !== i ? 'dim' : ''}`}
              onMouseEnter={() => setHover(i)}
              href="#work"
              onClick={(e) => e.preventDefault()}
            >
              <div className="proj-idx mono">{String(i + 1).padStart(2, '0')}</div>
              <div className="proj-main">
                <h3>{p.title}</h3>
                <div className="proj-sub">{p.subtitle}</div>
              </div>
              <div className="proj-tags">
                {p.tags.map(t => <span key={t} className="chip mono">{t}</span>)}
              </div>
              <div className="proj-period mono">{p.period}</div>
              <div className="proj-expand">
                <p>{p.description}</p>
                <span className="proj-status mono">{p.status}</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section">
      <SectionHead num="04" title="Education" kicker="Academic path" />
      {DATA.education.map((e, i) => (
        <Reveal key={i} className="edu-card">
          <div className="edu-left">
            <div className="edu-mark">UCLA</div>
            <div className="edu-lines">
              <span /><span /><span />
            </div>
          </div>
          <div className="edu-right">
            <h3>{e.school}</h3>
            <div className="edu-degree">{e.degree}</div>
            <div className="edu-meta mono">
              <span>{e.location}</span>
              <span className="dot-sep">·</span>
              <span>{e.period}</span>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHead num="05" title="Toolkit" kicker="Technical skills" />
      <div className="skills-grid">
        {Object.entries(DATA.skills).map(([group, items], i) => (
          <Reveal key={group} delay={i * 0.05} className="skill-col">
            <div className="skill-head mono">{group}</div>
            <div className="skill-items">
              {items.map(it => <span key={it} className="skill-chip">{it}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <section id="contact" className="section contact">
      <SectionHead num="06" title="Let's talk" kicker="Get in touch" />
      <Reveal className="contact-big">
        <a href={`mailto:${DATA.email}`} className="big-mail">{DATA.email}</a>
        <button className="copy-btn mono" onClick={copy}>
          {copied ? '✓ copied' : 'copy'}
        </button>
      </Reveal>
      <div className="contact-links">
        <Reveal delay={0.05}><a href={`https://${DATA.github}`} target="_blank" rel="noreferrer">GitHub ↗</a></Reveal>
        <Reveal delay={0.1}><a href={`https://${DATA.linkedin}`} target="_blank" rel="noreferrer">LinkedIn ↗</a></Reveal>
        <Reveal delay={0.15}><a href={`tel:${DATA.phone.replace(/\D/g, '')}`}>{DATA.phone}</a></Reveal>
        <Reveal delay={0.2}><a href="assets/SahielBose_Resume.pdf" target="_blank">Résumé (PDF) ↗</a></Reveal>
      </div>
      <Reveal className="footer mono">
        <span>© 2026 Sahiel Bose</span>
        <span>Designed &amp; built with care · Los Angeles</span>
      </Reveal>
    </section>
  );
}

// ---------- TWEAKS ----------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "purple",
  "serif": "instrument",
  "grain": true
}/*EDITMODE-END*/;

const ACCENTS = {
  amber:  { name: 'Amber',  value: 'oklch(0.78 0.14 70)',  soft: 'oklch(0.78 0.14 70 / 0.14)' },
  rose:   { name: 'Rose',   value: 'oklch(0.75 0.14 20)',  soft: 'oklch(0.75 0.14 20 / 0.14)' },
  sage:   { name: 'Sage',   value: 'oklch(0.78 0.09 150)', soft: 'oklch(0.78 0.09 150 / 0.14)' },
  ice:    { name: 'Ice',    value: 'oklch(0.82 0.08 230)', soft: 'oklch(0.82 0.08 230 / 0.14)' },
  purple: { name: 'Purple', value: 'oklch(0.72 0.18 305)', soft: 'oklch(0.72 0.18 305 / 0.16)' },
  paper:  { name: 'Paper',  value: 'oklch(0.92 0.01 90)',  soft: 'oklch(0.92 0.01 90 / 0.14)' },
};

const SERIFS = {
  instrument: { name: 'Instrument Serif', stack: "'Instrument Serif', Georgia, serif" },
  fraunces:   { name: 'Fraunces',         stack: "'Fraunces', Georgia, serif" },
  playfair:   { name: 'Playfair Display', stack: "'Playfair Display', Georgia, serif" },
};

function TweaksPanel({ tweaks, setTweaks }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setOn(true);
      if (e.data?.type === '__deactivate_edit_mode') setOn(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const set = (patch) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
  };

  if (!on) return null;
  return (
    <div className="tweaks">
      <div className="tweaks-head">
        <span>Tweaks</span>
        <button onClick={() => setOn(false)}>×</button>
      </div>
      <div className="tweaks-row">
        <label className="mono">Accent</label>
        <div className="swatches">
          {Object.entries(ACCENTS).map(([k, a]) => (
            <button key={k} className={tweaks.accent === k ? 'sw active' : 'sw'} onClick={() => set({ accent: k })} style={{ background: a.value }} title={a.name} />
          ))}
        </div>
      </div>
      <div className="tweaks-row">
        <label className="mono">Display font</label>
        <div className="seg">
          {Object.entries(SERIFS).map(([k, s]) => (
            <button key={k} className={tweaks.serif === k ? 'seg-btn active' : 'seg-btn'} onClick={() => set({ serif: k })} style={{ fontFamily: s.stack }}>
              {s.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
      <div className="tweaks-row">
        <label className="mono">Film grain</label>
        <button className={tweaks.grain ? 'toggle on' : 'toggle'} onClick={() => set({ grain: !tweaks.grain })}>
          <span />
        </button>
      </div>
    </div>
  );
}

// ---------- APP ----------
function App() {
  const [tweaks, setTweaks] = useState(window.__tweaks || TWEAK_DEFAULTS);
  useEffect(() => {
    const a = ACCENTS[tweaks.accent] || ACCENTS.amber;
    const s = SERIFS[tweaks.serif] || SERIFS.instrument;
    document.documentElement.style.setProperty('--accent', a.value);
    document.documentElement.style.setProperty('--accent-soft', a.soft);
    document.documentElement.style.setProperty('--serif', s.stack);
    document.documentElement.dataset.grain = tweaks.grain ? '1' : '0';
  }, [tweaks]);

  const sections = [
    { id: 'intro', label: 'Intro' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'work', label: 'Work' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Toolkit' },
    { id: 'contact', label: 'Contact' },
  ];

  // Cursor halo
  const haloRef = useRef(null);
  useEffect(() => {
    const onMove = (e) => {
      if (haloRef.current) {
        haloRef.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
      }
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div className="app">
      <div className="halo" ref={haloRef} />
      <div className="grain-layer" />
      <SideNav sections={sections} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Skills />
        <Contact />
      </main>
      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
