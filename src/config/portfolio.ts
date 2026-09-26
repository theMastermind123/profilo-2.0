/**
 * ============================================================================
 *  PORTFOLIO CONFIG  —  the single source of truth for the whole site.
 * ============================================================================
 *
 *  👉 To make this portfolio yours, you (almost) only need to edit THIS file.
 *
 *  Everything below drives: the terminal commands, the desktop shortcuts, the
 *  browser "welcome" window, the resume window, the SEO/meta tags and the
 *  structured data injected into index.html.
 *
 *  NOTE: keep this file framework-agnostic (plain data + types, no JSX / React
 *  imports). The Vite build reads it to generate the document <head>.
 * ============================================================================
 */

/* ---------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/** Icon keys available in `features/desktop/DesktopShortcut.tsx`. */
export type ShortcutIcon =
  | "Terminal"
  | "LinkedIn"
  | "GitHub"
  | "Facebook"
  | "Blog"
  | "PDF"
  | "Browser"
  | "Fullscreen"
  | "FullscreenExit";

/** Which app window a desktop shortcut opens. */
export type ShortcutWindow = "browser" | "terminal" | "resume";

export type SocialLink = {
  /** Numeric id used by the `socials go <id>` command. Keep them sequential. */
  id: number;
  /** Human readable name, e.g. "GitHub". */
  label: string;
  /** Full URL opened when the link is clicked. */
  url: string;
  /** Icon key — must match an entry in `DesktopShortcut.Icons`. */
  icon: ShortcutIcon;
  /** Terminal column padding used to align the `socials` output. */
  tab: number;
};

export type Project = {
  /** Numeric id used by the `projects go <id>` command. Keep them sequential. */
  id: number;
  title: string;
  desc: string;
  url: string;
};

export type EducationItem = {
  title: string;
  desc: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  /** Date range label, e.g. "Jun 2026 – Aug 2026". */
  period: string;
  location: string;
  bullets: string[];
};

export type SkillGroup = {
  /** Category label, e.g. "Programming". */
  label: string;
  items: string[];
};

export type TerminalCommand = {
  /** The word the user types. */
  cmd: string;
  /** Description shown by the `help` command. */
  desc: string;
  /** Terminal column padding used to align the `help` output. */
  tab: number;
};

/**
 * A desktop shortcut opens exactly one of an in-app `window` or an external
 * `href`. The two union members make that mutually exclusive at compile time,
 * so a shortcut can never be authored with both (or neither).
 */
export type DesktopShortcutConfig =
  | { label: string; icon: ShortcutIcon; window: ShortcutWindow; href?: never }
  | { label: string; icon: ShortcutIcon; href: string; window?: never };

export type QuickLink = {
  label: string;
  href: string;
  /** Text colour (hex). */
  color: string;
  /** Pill background/border colour (hex, rendered at low opacity). */
  accent: string;
};

export type BrowserCard = {
  /** Emoji shown as the card icon. */
  emoji: string;
  title: string;
  /** Body text rendered before the highlighted part. */
  body: string;
  /** Bold/highlighted tail of the body text (empty string for none). */
  highlight: string;
  /** URL opened when the card is clicked. */
  link: string;
  /** Primary accent (hex) — used for the title + gradient start + border. */
  accent: string;
  /** Secondary accent (hex) — gradient end. */
  accentAlt: string;
  /** Colour of the highlighted text. */
  highlightColor: string;
};

export type SeoPerson = {
  jobTitle: string;
  addressLocality: string;
  addressCountry: string;
  knowsAbout: string[];
  sameAs: string[];
};

export type SeoFontLink = {
  rel: string;
  href: string;
  crossorigin?: boolean;
  as?: string;
  onload?: string;
};

export type SeoConfig = {
  lang: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string;
  url: string;
  siteName: string;
  image: string;
  imageAlt: string;
  author: string;
  themeColor: string;
  robots: string;
  favicon: string;
  /** Google Fonts <link> tags injected into <head>. */
  fonts: SeoFontLink[];
  person: SeoPerson;
  website: { name: string; description: string; inLanguage: string };
};

export interface PortfolioConfig {
  identity: {
    name: string;
    role: string;
    location: string;
    phone: string;
    avatar: string;
    email: { display: string; mailto: string };
  };
  about: {
    greeting: string;
    rolePrefix: string;
    roleHighlight: string;
    roleSuffix: string;
    paragraphs: string[];
  };
  education: { intro: string; items: EducationItem[] };
  experience: { intro: string; items: ExperienceItem[] };
  skills: { intro: string; groups: SkillGroup[] };
  projects: { intro: string[]; items: Project[] };
  socials: { intro: string; items: SocialLink[] };
  resume: { externalUrl: string; pdfPath: string; windowTitle: string };
  terminal: {
    user: string;
    host: string;
    homePath: string;
    whoami: string;
    initialCommands: string[];
    /** Source text for the ASCII banner (rendered at runtime with figlet). */
    bannerText: string;
    /** figlet font names used for the desktop / mobile welcome banners. */
    bannerFont: string;
    bannerFontMobile: string;
    helpHint: string;
    helpCommand: string;
    hiddenCommands: string[];
    easterEggs: { sudoHost: string; neofetch: string; uname: string; ls: string };
  };
  commands: TerminalCommand[];
  desktop: { shortcuts: DesktopShortcutConfig[] };
  browser: {
    windowTitle: string;
    locationBar: string;
    hero: { subtitle: string; quickLinks: QuickLink[] };
    cards: BrowserCard[];
  };
  seo: SeoConfig;
}

/* ---------------------------------------------------------------------------
 * Derived values — rebrand from here
 * ------------------------------------------------------------------------- */

/** Full display name. Feeds identity, SEO, help text and the a11y heading. */
const NAME = "Abdannasser Mbarki";
/** Terminal prompt host (also `whoami` output and the `sudo` easter egg). */
const HOST = "kali";
/** Lowercase username used to build the `pwd` output. */
const USERNAME = "abdannassermbarki";
/** Resume PDF path under /public (resume window + browser quick-link). */
const RESUME_PDF = "/Abdannasser_Mbarki_Resume.pdf";

/**
 * Social / profile URLs — define each ONCE. These are referenced by the
 * `socials` command, the desktop shortcuts, the browser quick-links, the
 * browser cards and the SEO `sameAs` list, so changing a handle is a single
 * edit and they can never drift out of sync.
 */
const GITHUB_URL = "https://github.com/theMastermind123";
const LINKEDIN_URL = "https://www.linkedin.com/in/abdannasser-mbarki-499b241ba/";
const BLOG_URL = "https://dev.to/abdannassermbarki";

/**
 * Column widths used to auto-align output. `tab` = column − label length, so
 * descriptions/URLs line up without hand-counting spaces (see `commands` /
 * `socials` below).
 */
const CMD_COLUMN = 13; // where `help` descriptions start
const SOCIAL_COLUMN = 12; // where `socials` URLs start

/* ---------------------------------------------------------------------------
 * Config
 * ------------------------------------------------------------------------- */

export const portfolio: PortfolioConfig = {
  /** Core identity reused across the terminal, windows and SEO. */
  identity: {
    name: NAME,
    role: "Security & AI Engineer",
    location: "Tunis / Sfax, Tunisia",
    phone: "+216 94 805 654",
    /** Avatar shown in the browser window hero (path under /public). */
    avatar: "/abdannassermbarki.jpg",
    email: {
      /** Address displayed by the `email` command. */
      display: "abdannassermbarki@gmail.com",
      /** Address used for the `mailto:` link. */
      mailto: "contact@abdannassermbarki.tn",
    },
  },

  /** The `about` command output. */
  about: {
    greeting: "Hi, my name is",
    rolePrefix: "I'm a",
    roleHighlight: "security & ai engineer",
    roleSuffix: "based in Tunisia.",
    paragraphs: [
      "I build agentic, LLM-powered systems and break things — offensive security, network analysis and reverse engineering.",
      "Founder of Securinets ENIG; active in CTFs, KVM introspection research and multi-agent AI workflows.",
    ],
  },

  /** The `education` command output. */
  education: {
    intro: "Here is my education background!",
    items: [
      {
        title: "National School of Engineers of Gabès (ENIG)",
        desc: "National Engineering Degree — Specialization: GCR. Relevant coursework: Artificial Intelligence, Agentic Systems, Network Security, Web Development, Telecommunications, and Embedded Systems.",
      },
      {
        title: "PEIN — Institut Préparatoire aux Études d'Ingénieurs de Nabeul",
        desc: "Core skills developed: Advanced Mathematics, Physics, Analytical Problem Solving, Adaptability, and High-Pressure Work Management.",
      },
    ],
  },

  /** The `projects` command output + `projects go <id>` redirects. */
  projects: {
    intro: [
      "“Talk is cheap. Show me the code”? I got you!",
      "Here are some of my projects you shouldn't miss",
    ],
    items: [
      {
        id: 1,
        title: "Canserv — AI Healthcare App",
        desc: "React Native · Google Gemini · Firebase. 3rd place nationally at CSTAM IEEE. Agentic-RAG health assistant using Gemini + computer vision to analyze food, estimate calories and give real-time feedback; Firebase-authenticated, encrypted cloud data.",
        url: GITHUB_URL,
      },
      {
        id: 2,
        title: "ESCANOR — National Rooftop PV Forecast",
        desc: "Python · LightGBM · Optuna. Solar power forecasting pipeline for STEG from intraday to D+3, with LightGBM quantile models and conformal calibration for uncertainty estimation.",
        url: GITHUB_URL,
      },
      {
        id: 3,
        title: "Haru Personal Assistant",
        desc: "Python · Llama.cpp · Qwen · Electron · Live2D. Local-LLM virtual assistant (Qwen via llama.cpp) with emotion-aware Live2D reactions and voice interaction.",
        url: GITHUB_URL,
      },
      {
        id: 4,
        title: "Resume Reviewer NLP",
        desc: "Python · Scikit-Learn · Node.js · React. NLP engine scoring resumes on a 0–100 scale with keyword extraction and an AI feedback loop for skill-gap and ATS optimization.",
        url: GITHUB_URL,
      },
    ],
  },

  /** The `experience` command output. */
  experience: {
    intro: "Here is my professional experience!",
    items: [
      {
        company: "Progress Box",
        role: "KVM-VMI Security Intern",
        period: "Jun 2026 – Aug 2026",
        location: "Tunisia",
        bullets: [
          "Developing a KVM-based introspection system for monitoring virtualized Android Automotive OS security.",
          "Implemented network, I/O, syscall, and process introspection with LibVMI and KVM.",
          "Configured nested virtualization and compiled custom Linux kernel, QEMU, and LibVMI environments.",
        ],
      },
      {
        company: "Knauf",
        role: "Full-stack Development Intern",
        period: "Jul 2025 – Aug 2025",
        location: "Sidi Bouzid, Tunisia",
        bullets: [
          "Developed a React/Express platform digitizing 3 factory roles, reducing manual reporting time by 60%.",
          "Engineered RESTful APIs with WebSocket integration, improving data retrieval speed by 30%.",
          "Created automated dashboards and secure UI modules to streamline client order management.",
        ],
      },
    ],
  },

  /** The `skills` command output. */
  skills: {
    intro: "Here are my technical skills!",
    groups: [
      { label: "Programming", items: ["Python", "JavaScript", "C", "Java", "PHP", "React", "Node.js", "Express.js", "FastAPI", "REST APIs", "SQL", "MongoDB"] },
      { label: "AI/ML", items: ["LLMs", "RAG", "Agentic AI", "Prompt Engineering", "PyTorch", "TensorFlow", "LightGBM", "Ollama"] },
      { label: "Systems/Networking", items: ["Linux", "Docker", "KVM", "QEMU", "LibVMI", "System Administration", "TCP/IP", "Network Security"] },
      { label: "Security/Tools", items: ["Wireshark", "Nmap", "Burp Suite", "Metasploit", "Ghidra", "GDB", "Git", "GitHub", "GitLab", "Postman", "Jupyter", "Cisco Packet Tracer", "Huawei eNSP"] },
    ],
  },

  /** The `socials` command output + `socials go <id>` redirects. */
  socials: {
    intro: "Here are my social links",
    // `tab` (URL alignment) is auto-computed from the "<id>. <label>" width.
    items: (
      [
        { id: 1, label: "GitHub", url: GITHUB_URL, icon: "GitHub" },
        {
          id: 2,
          label: "Linkedin",
          url: LINKEDIN_URL,
          icon: "LinkedIn",
        },
        { id: 3, label: "Blog", url: BLOG_URL, icon: "Blog" },
      ] as Omit<SocialLink, "tab">[]
    ).map((s) => ({ ...s, tab: SOCIAL_COLUMN - `${s.id}. ${s.label}`.length })),
  },

  /** Resume command + resume window. */
  resume: {
    /** Opened by the `resume` terminal command (external URL). */
    externalUrl: "https://abdannassermbarki.tn/CV-Abdannasser-Mbarki.pdf",
    /** PDF embedded in the resume window (path under /public). */
    pdfPath: RESUME_PDF,
    windowTitle: "Resume",
  },

  /** Terminal chrome: prompt, boot commands, hero banner and easter eggs. */
  terminal: {
    /** Prompt rendered as `<user>@<host>:~$`. */
    user: HOST,
    host: HOST,
    /** Output of the `pwd` command. */
    homePath: `/home/${USERNAME}`,
    /** Output of the `whoami` command. */
    whoami: HOST,
    /** Commands auto-executed when the terminal opens (oldest first). */
    initialCommands: ["welcome", "about"],
    /** ASCII-art banner shown by the `welcome` command. */
    bannerText: NAME,
    bannerFont: "Standard",
    bannerFontMobile: "Small",
    /* legacy box-drawing banner (kept for reference):
╔═╗╔╗ ╔╦╗╔═╗╔╗╔╔╗╔╔═╗╔═╗╔═╗╔═╗╦═╗  ╔╦╗╔╗ ╔═╗╦═╗╦╔═╦
╠═╣╠╩╗ ║║╠═╣║║║║║║╠═╣╚═╗╚═╗║╣ ╠╦╝  ║║║╠╩╗╠═╣╠╦╝╠╩╗║
╩ ╩╚═╝═╩╝╩ ╩╝╚╝╝╚╝╩ ╩╚═╝╚═╝╚═╝╩╚═  ╩ ╩╚═╝╩ ╩╩╚═╩ ╩╩
    */
    helpHint: "For a list of available commands, type",
    helpCommand: "help",
    /** Hidden easter-egg commands (accepted but not listed in `help`). */
    hiddenCommands: ["sudo", "neofetch", "uname", "ls"],
    easterEggs: {
      sudoHost: HOST,
      neofetch: `kali 2024.2 \n Kernel: 6.5.0-kali1-amd64 \n Shell: bash 5.2.15 \n Resolution: 1920x1080 \n DE: XFCE \n WM: Xfwm4 \n CPU: Intel i7-9750H (12) @ 4.5GHz \n Memory: 2.1GiB / 16GiB`,
      uname: "Linux",
      ls: "Desktop Documents Downloads Music Pictures Public Templates Videos",
    },
  },

  /**
   * Commands listed by `help` and matched by the terminal.
   * NOTE: this list is the single source of truth for command *names*,
   * *descriptions* and *recognition* (Terminal matches against it). Each
   * command's *behaviour* lives in `src/features/terminal/commands/registry.tsx`
   * — one entry per command there. Adding a command = one entry here (+ a
   * hidden one in `terminal.hiddenCommands`) plus one `registry` entry.
   * `tab` (description alignment) is auto-computed from the command name width.
   */
  commands: (
    [
      { cmd: "about", desc: `about ${NAME}` },
      { cmd: "clear", desc: "clear the terminal" },
      { cmd: "echo", desc: "print out anything" },
      { cmd: "education", desc: "my education background" },
      { cmd: "email", desc: "send me an email" },
      { cmd: "experience", desc: "view my work experience" },
      { cmd: "resume", desc: "go to my resume" },
      { cmd: "help", desc: "check available commands" },
      { cmd: "history", desc: "view command history" },
      { cmd: "projects", desc: "view projects that I've coded" },
      { cmd: "pwd", desc: "print current working directory" },
      { cmd: "skills", desc: "view my technical skills" },
      { cmd: "socials", desc: "check out my social accounts" },
      { cmd: "welcome", desc: "display hero section" },
      { cmd: "whoami", desc: "about current user" },
    ] as Omit<TerminalCommand, "tab">[]
  ).map((c) => ({ ...c, tab: CMD_COLUMN - c.cmd.length })),

  /** Desktop icons. Order matters (top-to-bottom / grid order). */
  desktop: {
    shortcuts: [
      { label: "Browser", icon: "Browser", window: "browser" },
      { label: "Terminal", icon: "Terminal", window: "terminal" },
      {
        label: "LinkedIn",
        icon: "LinkedIn",
        href: LINKEDIN_URL,
      },
      { label: "GitHub", icon: "GitHub", href: GITHUB_URL },
      { label: "Blog", icon: "Blog", href: BLOG_URL },
      { label: "Resume", icon: "PDF", window: "resume" },
    ],
  },

  /** The browser-style "welcome" window shown on load. */
  browser: {
    windowTitle: "Browser",
    /** Fake address shown in the location bar. */
    locationBar: "https://abdannassermbarki.tn",
    hero: {
      subtitle: "Security & AI Engineer",
      quickLinks: [
        { label: "GitHub", href: GITHUB_URL, color: "#88C0D0", accent: "#88C0D0" },
        {
          label: "LinkedIn",
          href: LINKEDIN_URL,
          color: "#A3BE8C",
          accent: "#A3BE8C",
        },
        { label: "Blog", href: BLOG_URL, color: "#B48EAD", accent: "#B48EAD" },
        { label: "Resume", href: RESUME_PDF, color: "#EBCB8B", accent: "#EBCB8B" },
      ],
    },
    cards: [
      {
        emoji: "🛡️",
        title: "Security & AI Engineering",
        body: "Offensive security, reverse engineering and agentic systems: ",
        highlight: "LLM-powered systems, CTFs and KVM introspection research",
        link: GITHUB_URL,
        accent: "#88C0D0",
        accentAlt: "#5E81AC",
        highlightColor: "#A3BE8C",
      },
      {
        emoji: "💼",
        title: "Experience",
        body: "Offensive-security and full-stack internships: ",
        highlight: "KVM-VMI security at Progress Box and React/Express at Knauf",
        link: LINKEDIN_URL,
        accent: "#A3BE8C",
        accentAlt: "#BF616A",
        highlightColor: "#EBCB8B",
      },
      {
        emoji: "🏫",
        title: "Education",
        body: "National Engineering Degree (GCR) at ENIG: Network Security, Web Development, Artificial Intelligence, Telecommunications, and Embedded Systems.",
        highlight: "",
        link: "https://enig.rnu.tn/",
        accent: "#EBCB8B",
        accentAlt: "#D08770",
        highlightColor: "#D08770",
      },
    ],
  },

  /** Everything used to build the document <head> and structured data. */
  seo: {
    lang: "en",
    title: `${NAME.toLowerCase()} | Security & AI Engineer`,
    metaTitle: `${NAME} — Security & AI Engineer`,
    description: "Security & AI engineer — offensive security, reverse engineering and agentic, LLM-powered systems.",
    keywords: `${NAME}, security engineer, ai engineer, cybersecurity, offensive security, reverse engineering, agentic ai, llm applications, penetration testing, kali linux, network security, machine learning, ctf`,
    url: "https://abdannassermbarki.tn/",
    siteName: NAME,
    image: "https://abdannassermbarki.tn/og.jpg",
    imageAlt: `${NAME} cyber security engineer portfolio`,
    author: NAME,
    themeColor: "#000000",
    robots: "index, follow",
    favicon: "/favicon.png",
    fonts: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
      {
        rel: "preload",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&display=swap",
        as: "style",
        onload: "this.onload=null;this.rel='stylesheet'",
      },
    ],
    person: {
      jobTitle: "Security & AI Engineer",
      addressLocality: "Tunis",
      addressCountry: "Tunisia",
      knowsAbout: ["Offensive Security", "Agentic AI & LLM Applications", "Reverse Engineering", "Network Security"],
      sameAs: [GITHUB_URL, LINKEDIN_URL, BLOG_URL],
    },
    website: {
      name: `${NAME} Portfolio`,
      description: "Security & AI engineering: offensive security, reverse engineering, and agentic LLM-powered systems.",
      inLanguage: "en",
    },
  },
};

export default portfolio;
