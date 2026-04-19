const { useState, useEffect, useRef } = React;

// ---------- DATA ----------
const DATA = {
  name: "Sahiel Bose",
  tagline: "Statistics and Data Science at UCLA. I build AI systems that reason, decide, and ship, from multi-agent LLM pipelines to neurotech devices.",
  email: "sahielbose@gmail.com",
  phone: "(925) 871-8844",
  github: "github.com/sahielbose",
  linkedin: "linkedin.com/in/sahiel-bose",
  about: [
    "I am a Freshman at UCLA studying Statistics and Data Science.",
    "Currently co-founding Optivia, interning at ThinkNeuro, and researching reasoning in LLMs at UC Santa Cruz's AIEA Lab.",
  ],
  experience: [
    {
      company: "Optivia",
      role: "Co-Founder",
      location: "Dublin, CA",
      period: "Mar 2025 – Present",
      kind: "Founder",
      short: "Leading architecture for an agentic AI platform: multi-agent pipelines, prompt routing, decision logic.",
      bullets: [
        "Lead design & development of AI agents for the Optivia prototype, serving as the primary architect of its core intelligence, agentic workflows, and decision-making logic.",
        "Designed the mathematical modeling and algorithmic logic behind a multi-agent pipeline: prompt routing, complexity scoring, model selection, prompt engineering.",
        "Built a framework that intercepts user inputs, dynamically enriches prompts with targeted clarifying questions, and activates Claude Code commands via multi-agent systems + the Anthropic SDK.",
      ],
      stack: ["Anthropic SDK", "Multi-Agent", "Python", "Prompt Routing"],
    },
    {
      company: "ThinkNeuro LLC",
      role: "Software Engineering Intern",
      location: "Dublin, CA",
      period: "Nov 2024 – Present",
      kind: "Engineering",
      short: "Shipping a React Native neuroscience app + ML models for opioid-overdose prediction.",
      bullets: [
        "Developing a mobile application in React Native for neuroscience research use cases.",
        "Building a machine learning model to reduce false detections in opioid overdose prediction.",
        "Co-authoring a research paper on opioid overdose and its research applications.",
      ],
      stack: ["React Native", "JavaScript", "ML", "Neurotech"],
    },
    {
      company: "UC Santa Cruz · AIEA Lab",
      role: "Research Intern",
      location: "Santa Cruz, CA",
      period: "Oct 2024 – Present",
      kind: "Research",
      short: "Researching logical reasoning in LLMs and methods to improve problem-solving.",
      bullets: [
        "Research logical reasoning in large language models and methods to enhance their problem-solving.",
        "Develop structured exercises to improve LLMs' logical inference and reasoning abilities.",
        "Explore algorithmic techniques to refine and optimize LLM-generated reasoning processes.",
      ],
      stack: ["LLMs", "Reasoning", "Python"],
    },
    {
      company: "UC Riverside Research Lab",
      role: "Research Intern",
      location: "Riverside, CA",
      period: "May 2025 – Jan 2026",
      kind: "Research",
      short: "GNN-based traffic congestion hotspot detection across large-scale road networks.",
      bullets: [
        "Assisted a Ph.D. student on a Graph Neural Network project detecting traffic congestion hotspots in large-scale road networks.",
        "Supported data preprocessing, model training, and optimization for urban-planning insights.",
        "Collaborated on research involving real-world infrastructure and transportation systems.",
      ],
      stack: ["GNNs", "Geospatial", "PyTorch"],
    },
  ],
  projects: [
    {
      title: "Opioid Overdose Prediction Device",
      subtitle: "Neurotech × Machine Learning",
      period: "'24 – Now",
      status: "Patent + copyright in progress",
      description:
        "A neurotechnology device for opioid overdose prediction. Contributing to hardware-software integration, model development, and co-authoring the research paper.",
      tags: ["ML", "Neurotech", "Hardware"],
      accent: "purple",
    },
    {
      title: "ProSLM",
      subtitle: "LLM Systems · Deployment",
      period: "'25 – Now",
      status: "UC Santa Cruz",
      description:
        "Supporting website hosting and integration for the ProSLM project, connecting research components into a unified, deployable platform.",
      tags: ["LLMs", "Deployment", "Infra"],
      accent: "blue",
    },
    {
      title: "HotSpot Detection with GNNs",
      subtitle: "Graph Neural Networks · Geospatial AI",
      period: "'25 – '26",
      status: "UC Riverside",
      description:
        "Developed GNN models that identify traffic congestion hotspots from real-time geospatial data. Benchmarked on smaller datasets to validate transport-network performance.",
      tags: ["GNNs", "Geospatial", "Python"],
      accent: "green",
    },
    {
      title: "ASL Recognition System",
      subtitle: "CNNs · LSTMs · Raspberry Pi",
      period: "'24 – '25",
      status: "🥈 2nd · ACSEF",
      description:
        "Co-led design of an AI-powered ASL recognition system to bridge communication for Deaf and hard-of-hearing users. CNNs + LSTMs deployed on Raspberry Pi.",
      tags: ["CV", "Edge", "LSTM"],
      accent: "amber",
    },
  ],
  skills: {
    "AI / ML": ["Logical Reasoning", "Deep Learning", "Neural Networks", "Agentic Workflows", "Prompt Engineering", "Multi-Agent Systems", "Model Training", "KNN", "Linear Regression"],
    "Frameworks": ["TensorFlow", "PyTorch", "Keras", "React Native", "n8n", "Anthropic SDK"],
    "Models": ["CNNs", "RNNs", "GNNs", "GANs", "LLMs", "NLP", "Computer Vision", "AI Agents", "Prompt Routing"],
    "Languages": ["Python", "JavaScript"],
  },
};

const PROJECT_ACCENTS = {
  purple: 'oklch(0.72 0.18 305)',
  blue:   'oklch(0.72 0.15 240)',
  green:  'oklch(0.78 0.13 155)',
  amber:  'oklch(0.80 0.14 75)',
};

// ---------- HOOKS ----------
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.12, ...options });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
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

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return p;
}

// ---------- PRIMITIVES ----------
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style = {} }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity .9s cubic-bezier(.2,.7,.2,1) ${delay}s, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

function SectionHead({ num, title, kicker }) {
  return (
    <Reveal className="section-head">
      <div className="section-meta">
        <span className="section-num mono">{num}</span>
        <span className="section-line" />
        <span className="section-kicker mono">{kicker}</span>
      </div>
      <h2 className="section-title">{title}</h2>
    </Reveal>
  );
}

// ---------- TOP NAV ----------
function TopNav({ sections }) {
  const active = useActiveSection(sections.map(s => s.id));
  const progress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 20);
    onS();
    window.addEventListener('scroll', onS, { passive: true });
    return () => window.removeEventListener('scroll', onS);
  }, []);

  return (
    <header className={`topnav ${scrolled ? 'scrolled' : ''}`}>
      <div className="topnav-inner">
        <a href="#intro" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span className="logo-mark">
            <svg viewBox="0 0 32 32" width="26" height="26">
              <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 16 L14 22 L24 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="logo-text">
            <span className="logo-name">Sahiel Bose</span>
          </span>
        </a>

        <nav className="topnav-links">
          {sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`}
               className={active === s.id ? 'active' : ''}
               onClick={(e) => { e.preventDefault(); document.getElementById(s.id).scrollIntoView({ behavior: 'smooth' }); }}>
              <span className="nav-num mono">{String(i + 1).padStart(2, '0')}</span>
              <span>{s.label}</span>
            </a>
          ))}
        </nav>

        <div className="topnav-cta">
          <a href={`mailto:${DATA.email}`} className="nav-pill">
            <span className="nav-pill-dot" />
            <span>Available</span>
          </a>
          <a href="assets/SahielBose_Resume.pdf" target="_blank" className="nav-btn">
            Résumé
            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
          </a>
        </div>
      </div>
      <div className="topnav-progress" style={{ transform: `scaleX(${progress})` }} />
    </header>
  );
}

// ---------- HERO ----------
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
      <div className="hero-bg">
        <div className="hero-grid-lines">
          {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
        </div>
        <div className="hero-glow" />
      </div>

      <div className="hero-content">
        <Reveal className="hero-eyebrow">
          <span className="eyebrow-tag mono">
            <span className="pulse" />
            Open to summer 2026 · research & engineering
          </span>
          <span className="eyebrow-loc mono">Los Angeles ↔ Bay Area · {time} PT</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mega">
            <span className="mega-line">Sahiel</span>
            <span className="mega-line"><span className="mega-italic">Bose</span><span className="mega-dot">.</span></span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="hero-lede">{DATA.tagline}</p>
        </Reveal>

        <Reveal delay={0.3} className="hero-actions">
          <a href="#work" className="btn primary" onClick={(e) => { e.preventDefault(); document.getElementById('work').scrollIntoView({ behavior: 'smooth' }); }}>
            <span>Selected work</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href={`mailto:${DATA.email}`} className="btn ghost">
            <span>Get in touch</span>
          </a>
        </Reveal>

        <Reveal delay={0.4} className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">4<span className="plus">+</span></div>
            <div className="hero-stat-lbl mono">concurrent roles</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">UCLA</div>
            <div className="hero-stat-lbl mono">stats and data science</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">1</div>
            <div className="hero-stat-lbl mono">patent in progress</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">2</div>
            <div className="hero-stat-lbl mono">ongoing research papers</div>
          </div>
        </Reveal>
      </div>

      <div className="hero-ticker">
        <div className="ticker-track">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="ticker-group">
              <span>Multi-Agent Systems</span><span className="tick">◆</span>
              <span>LLM Reasoning</span><span className="tick">◆</span>
              <span>Graph Neural Networks</span><span className="tick">◆</span>
              <span>Neurotech</span><span className="tick">◆</span>
              <span>Computer Vision</span><span className="tick">◆</span>
              <span>Anthropic SDK</span><span className="tick">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- ABOUT ----------
function About() {
  return (
    <section id="about" className="section">
      <SectionHead num="01" title="About" kicker="A short introduction" />
      <div className="about-grid">
        <div className="about-copy">
          {DATA.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}><p>{p}</p></Reveal>
          ))}
          <Reveal delay={0.15} className="about-links">
            <a href={`https://${DATA.github}`} target="_blank"><span>GitHub</span><svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></a>
            <a href={`https://${DATA.linkedin}`} target="_blank"><span>LinkedIn</span><svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></a>
            <a href={`mailto:${DATA.email}`}><span>Email</span><svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="about-specs">
          <div className="spec-card">
            <div className="spec-head mono">Currently</div>
            <div className="spec-list">
              <div><span className="spec-dot green" /><span>Shipping Optivia's agentic prototype</span></div>
              <div><span className="spec-dot green" /><span>Building neurotech app at ThinkNeuro</span></div>
              <div><span className="spec-dot amber" /><span>Researching LLM reasoning @ UCSC</span></div>
            </div>
          </div>
          <div className="spec-card">
            <div className="spec-head mono">Interests</div>
            <div className="spec-tags">
              <span>Agents</span>
              <span>Reasoning</span>
              <span>Neurotech</span>
              <span>Graph ML</span>
              <span>Systems</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- EDUCATION ----------
function Education() {
  return (
    <section id="education" className="section">
      <SectionHead num="02" title="Education" kicker="Where I'm studying" />
      <Reveal className="ucla-wrap">
        <div className="ucla-card">
          <div className="ucla-top">
            <div className="ucla-top-left">
              <div className="ucla-kicker mono">University of California</div>
              <div className="ucla-city">Los Angeles</div>
              <div className="ucla-pennant">
                <span>U</span><span>C</span><span>L</span><span>A</span>
              </div>
            </div>
            <div className="ucla-top-right">
              <svg viewBox="0 0 120 120" width="120" height="120" className="ucla-seal">
                <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <g fontFamily="'JetBrains Mono', monospace" fill="currentColor">
                  <text x="60" y="54" textAnchor="middle" fontSize="9" letterSpacing="2">LUX</text>
                  <text x="60" y="66" textAnchor="middle" fontSize="6" letterSpacing="1">ET VERITAS</text>
                  <text x="60" y="78" textAnchor="middle" fontSize="4" letterSpacing="1">MCMXIX</text>
                </g>
                {Array.from({ length: 36 }).map((_, i) => {
                  const a = (i / 36) * Math.PI * 2;
                  return <line key={i}
                    x1={60 + Math.cos(a) * 52}
                    y1={60 + Math.sin(a) * 52}
                    x2={60 + Math.cos(a) * 56}
                    y2={60 + Math.sin(a) * 56}
                    stroke="currentColor" strokeWidth="0.6" />;
                })}
              </svg>
            </div>
          </div>

          <div className="ucla-body">
            <div className="ucla-degree-row">
              <div>
                <div className="mono tag">Degree</div>
                <h3>B.S. Statistics and Data Science</h3>
              </div>
              <div className="ucla-years">
                <div className="year-big">2026</div>
                <div className="year-dash">–</div>
                <div className="year-big">2030</div>
              </div>
            </div>

            <div className="ucla-meta">
              <div>
                <div className="mono tag">College</div>
                <div>Letters &amp; Science</div>
              </div>
              <div>
                <div className="mono tag">Location</div>
                <div>Los Angeles, CA</div>
              </div>
              <div>
                <div className="mono tag">Class of</div>
                <div>2030</div>
              </div>
            </div>

            <div className="ucla-focus">
              <div className="mono tag">Focus</div>
              <div className="focus-tags">
                <span>Probability</span>
                <span>Statistical Inference</span>
                <span>Machine Learning</span>
                <span>Linear Algebra</span>
                <span>Data Structures</span>
                <span>Regression Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ---------- EXPERIENCE ----------
function Experience() {
  const [active, setActive] = useState(0);
  const x = DATA.experience[active];
  return (
    <section id="experience" className="section">
      <SectionHead num="03" title="Experience" kicker="Where I've been building" />
      <Reveal className="xp-layout">
        <div className="xp-tabs" role="tablist">
          {DATA.experience.map((e, i) => (
            <button
              key={e.company}
              className={`xp-tab ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="xp-tab-num mono">0{i + 1}</span>
              <span className="xp-tab-body">
                <span className="xp-tab-company">{e.company}</span>
                <span className="xp-tab-role mono">{e.role}</span>
              </span>
              <span className="xp-tab-period mono">{e.period}</span>
              <span className="xp-tab-arrow">→</span>
            </button>
          ))}
        </div>

        <div className="xp-panel" key={active}>
          <div className="xp-panel-head">
            <div>
              <div className="mono tag">{x.kind} · {x.location}</div>
              <h3>{x.role} <span className="at">at</span> <span className="co">{x.company}</span></h3>
            </div>
            <div className="xp-panel-period mono">{x.period}</div>
          </div>
          <p className="xp-panel-short">{x.short}</p>
          <ul className="xp-panel-bullets">
            {x.bullets.map((b, bi) => (
              <li key={bi} style={{ animationDelay: `${bi * 0.08}s` }}>
                <span className="bullet-idx mono">{String(bi + 1).padStart(2, '0')}</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="xp-panel-stack">
            {x.stack.map(s => <span key={s} className="stack-chip mono">{s}</span>)}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ---------- PROJECTS ----------
function Projects() {
  return (
    <section id="work" className="section">
      <SectionHead num="04" title="Selected work" kicker="Projects & research" />
      <div className="proj-grid">
        {DATA.projects.map((p, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <article className="proj-card" style={{ '--proj': PROJECT_ACCENTS[p.accent] }}>
              <div className="proj-card-top">
                <span className="proj-num mono">PROJ · 0{i + 1}</span>
                <span className="proj-period mono">{p.period}</span>
              </div>
              <div className="proj-art">
                <ProjArt kind={p.accent} />
              </div>
              <div className="proj-card-body">
                <div className="proj-sub mono">{p.subtitle}</div>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.description}</p>
                <div className="proj-tags">
                  {p.tags.map(t => <span key={t} className="chip mono">{t}</span>)}
                </div>
                <div className="proj-foot">
                  <span className="proj-status mono">{p.status}</span>
                  <span className="proj-arrow">↗</span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjArt({ kind }) {
  // Abstract generative-feeling SVG art per project
  if (kind === 'purple') {
    return (
      <svg viewBox="0 0 400 200" className="proj-svg">
        {Array.from({ length: 50 }).map((_, i) => {
          const x = 20 + (i % 10) * 36;
          const y = 40 + Math.floor(i / 10) * 28;
          const h = 4 + Math.abs(Math.sin(i * 0.8)) * 60;
          return <rect key={i} x={x} y={y - h/2 + 80} width="3" height={h} fill="currentColor" opacity={0.4 + (i % 5) * 0.12} />;
        })}
      </svg>
    );
  }
  if (kind === 'blue') {
    return (
      <svg viewBox="0 0 400 200" className="proj-svg">
        {Array.from({ length: 6 }).map((_, i) => (
          <path key={i}
            d={`M 0 ${120 + i * 6} Q 100 ${60 + i * 10} 200 ${120 + i * 6} T 400 ${120 + i * 6}`}
            fill="none" stroke="currentColor" strokeWidth="1" opacity={0.3 + i * 0.1} />
        ))}
      </svg>
    );
  }
  if (kind === 'green') {
    const nodes = Array.from({ length: 14 }).map((_, i) => ({
      x: 40 + (i % 7) * 50, y: 50 + Math.floor(i / 7) * 80
    }));
    return (
      <svg viewBox="0 0 400 200" className="proj-svg">
        {nodes.map((n, i) => nodes.slice(i + 1).map((m, j) => {
          const d = Math.hypot(m.x - n.x, m.y - n.y);
          if (d < 90) return <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="currentColor" strokeWidth="0.8" opacity="0.35" />;
          return null;
        }))}
        {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r="4" fill="currentColor" opacity="0.9" />)}
      </svg>
    );
  }
  // amber
  return (
    <svg viewBox="0 0 400 200" className="proj-svg">
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx={200} cy={100} r={10 + i * 14} fill="none" stroke="currentColor" strokeWidth="0.8" opacity={0.6 - i * 0.07} />
      ))}
      <circle cx="200" cy="100" r="6" fill="currentColor" />
    </svg>
  );
}

// ---------- SKILLS ----------
function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHead num="05" title="Toolkit" kicker="Technical skills" />
      <div className="skills-grid">
        {Object.entries(DATA.skills).map(([group, items], i) => (
          <Reveal key={group} delay={i * 0.05} className="skill-col">
            <div className="skill-col-head">
              <span className="mono">0{i + 1}</span>
              <span className="skill-col-title">{group}</span>
              <span className="skill-col-count mono">{items.length}</span>
            </div>
            <div className="skill-items">
              {items.map(it => <span key={it} className="skill-chip">{it}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ---------- CONTACT ----------
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <section id="contact" className="section contact">
      <SectionHead num="06" title="Let's build something" kicker="Get in touch" />
      <Reveal className="contact-big">
        <span className="contact-prefix mono">say hi →</span>
        <button onClick={copy} className="big-mail" title="Click to copy">
          {DATA.email}
          <span className="mail-copied mono">{copied ? '✓ copied' : 'copy'}</span>
        </button>
      </Reveal>
      <div className="contact-links">
        <Reveal delay={0.05}>
          <a href={`https://${DATA.github}`} target="_blank">
            <span className="mono label">01 / Code</span>
            <span className="big">GitHub</span>
            <span className="mono arr">↗</span>
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <a href={`https://${DATA.linkedin}`} target="_blank">
            <span className="mono label">02 / Network</span>
            <span className="big">LinkedIn</span>
            <span className="mono arr">↗</span>
          </a>
        </Reveal>
        <Reveal delay={0.15}>
          <a href="assets/SahielBose_Resume.pdf" target="_blank">
            <span className="mono label">03 / Résumé</span>
            <span className="big">PDF</span>
            <span className="mono arr">↗</span>
          </a>
        </Reveal>
        <Reveal delay={0.2}>
          <a href={`tel:${DATA.phone.replace(/\D/g, '')}`}>
            <span className="mono label">04 / Direct</span>
            <span className="big">{DATA.phone}</span>
            <span className="mono arr">↗</span>
          </a>
        </Reveal>
      </div>

      <div className="megafoot">
        <Reveal className="megafoot-row mono">
          <span>© 2026</span>
          <span>Los Angeles ↔ Bay Area</span>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- TWEAKS ----------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "navy",
  "serif": "instrument",
  "grain": true
}/*EDITMODE-END*/;

const ACCENTS = {
  purple: { name: 'Purple', value: 'oklch(0.72 0.18 305)', soft: 'oklch(0.72 0.18 305 / 0.16)' },
  navy:   { name: 'Navy',   value: 'oklch(0.68 0.16 260)', soft: 'oklch(0.68 0.16 260 / 0.16)' },
  amber:  { name: 'Amber',  value: 'oklch(0.78 0.14 70)',  soft: 'oklch(0.78 0.14 70 / 0.14)' },
  rose:   { name: 'Rose',   value: 'oklch(0.75 0.14 20)',  soft: 'oklch(0.75 0.14 20 / 0.14)' },
  sage:   { name: 'Sage',   value: 'oklch(0.78 0.09 150)', soft: 'oklch(0.78 0.09 150 / 0.14)' },
  ice:    { name: 'Ice',    value: 'oklch(0.82 0.08 230)', soft: 'oklch(0.82 0.08 230 / 0.14)' },
  paper:  { name: 'Paper',  value: 'oklch(0.92 0.01 90)',  soft: 'oklch(0.92 0.01 90 / 0.14)' },
};

const SERIFS = {
  instrument: { name: 'Instrument', stack: "'Instrument Serif', Georgia, serif" },
  fraunces:   { name: 'Fraunces',   stack: "'Fraunces', Georgia, serif" },
  playfair:   { name: 'Playfair',   stack: "'Playfair Display', Georgia, serif" },
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
            <button key={k} className={tweaks.serif === k ? 'seg-btn active' : 'seg-btn'} onClick={() => set({ serif: k })}>
              {s.name}
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
    const a = ACCENTS[tweaks.accent] || ACCENTS.navy;
    const s = SERIFS[tweaks.serif] || SERIFS.instrument;
    document.documentElement.style.setProperty('--accent', a.value);
    document.documentElement.style.setProperty('--accent-soft', a.soft);
    document.documentElement.style.setProperty('--serif', s.stack);
    document.documentElement.dataset.grain = tweaks.grain ? '1' : '0';
  }, [tweaks]);

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'work', label: 'Work' },
    { id: 'skills', label: 'Toolkit' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="app">
      <div className="grain-layer" />
      <TopNav sections={sections} />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
