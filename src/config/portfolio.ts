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
  projects: { intro: string[]; items: Project[] };
  socials: { intro: string; items: SocialLink[] };
  resume: { externalUrl: string; pdfPath: string; windowTitle: string };
  terminal: {
    user: string;
    host: string;
    homePath: string;
    whoami: string;
    initialCommands: string[];
    banner: string;
    bannerMobile: string;
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
    role: "ICT Student in ENIG",
    location: "Tunisia",
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
    roleHighlight: "ict student in ENIG",
    roleSuffix: "based in Tunisia.",
    paragraphs: [
      "I am passionate about reverse engineering, software developpment and agentic systems.",
      "I also enjoy coding, problem solving and playing CTFs.",
    ],
  },

  /** The `education` command output. */
  education: {
    intro: "Here is my education background!",
    items: [
      {
        title: "Communication and Network Engineering",
        desc: "Network Security, Web Development, Artificial Intelligence, Telecommunication, and Embedded System",
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
        title: "Needs to be updated with my new projects",
        desc: "for now view my GitHub repositories.",
        url: "https://github.com/AbdannasserMbarki?tab=repositories",
      },
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
    banner: `
╔═╗╔╗ ╔╦╗╔═╗╔╗╔╔╗╔╔═╗╔═╗╔═╗╔═╗╦═╗  ╔╦╗╔╗ ╔═╗╦═╗╦╔═╦
╠═╣╠╩╗ ║║╠═╣║║║║║║╠═╣╚═╗╚═╗║╣ ╠╦╝  ║║║╠╩╗╠═╣╠╦╝╠╩╗║
╩ ╩╚═╝═╩╝╩ ╩╝╚╝╝╚╝╩ ╩╚═╝╚═╝╚═╝╩╚═  ╩ ╩╚═╝╩ ╩╩╚═╩ ╩╩
          `,
    /** Banner variant for small screens (falls back to `banner` if empty). */
    bannerMobile: "",
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
      { cmd: "resume", desc: "go to my resume" },
      { cmd: "help", desc: "check available commands" },
      { cmd: "history", desc: "view command history" },
      { cmd: "projects", desc: "view projects that I've coded" },
      { cmd: "pwd", desc: "print current working directory" },
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
      subtitle: "ICT Student in ENIG",
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
        title: "Security field",
        body: "Participating CTFs. Founder of the security club ",
        highlight: "Securinets ENIG",
        link: BLOG_URL,
        accent: "#88C0D0",
        accentAlt: "#5E81AC",
        highlightColor: "#A3BE8C",
      },
      {
        emoji: "💼",
        title: "Professional Experience",
        body: "Software developpment, reverse engineering, game developpment, agentic systems developpment: ",
        highlight: "A multidisciplinary background in Network Engineering and Full-stack Development",
        link: LINKEDIN_URL,
        accent: "#A3BE8C",
        accentAlt: "#BF616A",
        highlightColor: "#EBCB8B",
      },
      {
        emoji: "🏫",
        title: "Education",
        body: "Communication and Network Engineering at ENIG: Network Security, Web Development, Artificial Intelligence, Telecommunication, and Embedded Systems.",
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
    title: `${NAME.toLowerCase()} | Kali Linux Hacker Portfolio`,
    metaTitle: `${NAME} — ICT Student | Kali Linux Hacker Portfolio`,
    description: "ICT student in ENIG. This is an open-source hacker portfolio template.",
    keywords: `${NAME}, cyber security analyst, security engineer, kali linux, hacker portfolio, penetration testing, ethical hacker, red team, blue team, SOC, threat research, CTF writeups, open source portfolio`,
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
      jobTitle: "Cyber Security Engineer",
      addressLocality: "Tunis",
      addressCountry: "Tunisia",
      knowsAbout: ["Reverse Engineering", "Capture The Flag (CTF)", "Software Engineering", "Agentic AI"],
      sameAs: [GITHUB_URL, LINKEDIN_URL, BLOG_URL],
    },
    website: {
      name: `${NAME} Portfolio`,
      description: "reverse engineering, Software Engineering, Agentic AI, and CTFs.",
      inLanguage: "en",
    },
  },
};

export default portfolio;
