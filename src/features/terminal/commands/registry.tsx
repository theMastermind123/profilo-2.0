import { ReactNode } from "react";
import About from "./About";
import Clear from "./Clear";
import Echo from "./Echo";
import Education from "./Education";
import Email from "./Email";
import GeneralOutput from "./GeneralOutput";
import Help from "./Help";
import History from "./History";
import Projects from "./Projects";
import Resume from "./Resume";
import Socials from "./Socials";
import Welcome from "./Welcome";
import { OutputContainer } from "../styles/Output.styled";
import portfolio from "@/config/portfolio";

/**
 * Single source of truth for terminal command *behaviour*.
 *
 * Command names / descriptions / recognition come from `config/portfolio.ts`
 * (`portfolio.commands` + `portfolio.terminal.hiddenCommands`). This map wires
 * each command name to what it renders, so `Output.tsx` no longer needs a
 * hand-maintained `specialCmds` list, an easter-egg `if`-chain and a render
 * object kept in sync separately.
 *
 * Adding a command = one entry in the config list (for it to be recognised)
 * plus one entry here (for it to render).
 */
export type CommandEntry = {
  /** Command accepts trailing args, so the `Usage:` guard is skipped. */
  acceptsArgs?: boolean;
  /**
   * Render without `Output.tsx`'s standard `<OutputContainer>` wrapper. Used by
   * the hidden easter eggs, which supply their own container (and therefore do
   * not get the `latest-output` test hook).
   */
  bare?: boolean;
  /** Produce the command output. `arg` is the trailing input (space-split). */
  render: (ctx: { arg: string[] }) => ReactNode;
};

/** Helper: a hidden easter egg that just prints a block of config text. */
const egg = (text: string): CommandEntry => ({
  bare: true,
  render: () => (
    <OutputContainer>
      <GeneralOutput>{text}</GeneralOutput>
    </OutputContainer>
  ),
});

const { easterEggs } = portfolio.terminal;

export const commandRegistry: Record<string, CommandEntry> = {
  // ---- listed commands (shown in `help`) ----
  about: { render: () => <About /> },
  clear: { render: () => <Clear /> },
  echo: { acceptsArgs: true, render: () => <Echo /> },
  education: { render: () => <Education /> },
  email: { render: () => <Email /> },
  resume: { render: () => <Resume /> },
  help: { render: () => <Help /> },
  history: { render: () => <History /> },
  projects: { acceptsArgs: true, render: () => <Projects /> },
  pwd: { render: () => <GeneralOutput>{portfolio.terminal.homePath}</GeneralOutput> },
  socials: { acceptsArgs: true, render: () => <Socials /> },
  welcome: { render: () => <Welcome /> },
  whoami: { render: () => <GeneralOutput>{portfolio.terminal.whoami}</GeneralOutput> },

  // ---- hidden easter eggs (self-wrapped, see `bare`) ----
  sudo: {
    bare: true,
    render: ({ arg }) => {
      const full = ["sudo", ...arg].join(" ");
      return (
        <OutputContainer>
          <GeneralOutput>{full}: command not found</GeneralOutput>
          <GeneralOutput>
            Hint: sudo: unable to resolve host {easterEggs.sudoHost}: Name or service not known
          </GeneralOutput>
          <GeneralOutput>Hint: you are already root</GeneralOutput>
        </OutputContainer>
      );
    },
  },
  neofetch: egg(easterEggs.neofetch),
  uname: egg(easterEggs.uname),
  ls: egg(easterEggs.ls),
};

export default commandRegistry;
