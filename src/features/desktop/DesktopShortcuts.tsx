import React from "react";
import styled from "styled-components";
import DesktopShortcut, { Icons } from "./DesktopShortcut";
import portfolio from "@/config/portfolio";
import type { ShortcutWindow } from "@/config/portfolio";

type Props = {
  onOpenTerminal: () => void;
  onOpenWelcome: () => void;
  onOpenResume: () => void;
  hidden?: boolean;
  activeTerminal?: boolean;
  activeBrowser?: boolean;
  activeResume?: boolean;
  mobileExpanded?: boolean;
};

const Grid = styled.div<{ hidden?: boolean; mobileExpanded?: boolean }>`
  position: fixed;
  display: grid;
  z-index: 10; /* below windows */
  ${({ hidden }) => hidden && 'display:none;'}

  ${({ mobileExpanded }) => mobileExpanded ? `
    top: 12px; left: 12px; right: 12px; bottom: 12px;
    grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
    grid-auto-rows: max-content;
    gap: 20px;
    justify-items: center;
    align-content: start;
    overflow: auto;
  ` : `
    top: 24px; left: 24px;
    grid-template-columns: repeat(1, max-content);
    grid-auto-rows: max-content;
    gap: 18px;
  `}
`;

const DesktopShortcuts: React.FC<Props> = ({ onOpenTerminal, onOpenWelcome, onOpenResume, hidden, activeTerminal, activeBrowser, activeResume, mobileExpanded }) => {
  const windowOpeners: Record<ShortcutWindow, () => void> = {
    browser: onOpenWelcome,
    terminal: onOpenTerminal,
    resume: onOpenResume,
  };
  const windowActive: Record<ShortcutWindow, boolean | undefined> = {
    browser: activeBrowser,
    terminal: activeTerminal,
    resume: activeResume,
  };

  return (
    <Grid hidden={hidden} mobileExpanded={mobileExpanded}>
      {portfolio.desktop.shortcuts.map((shortcut) => {
        const opener = shortcut.window ? windowOpeners[shortcut.window] : undefined;
        const active = shortcut.window ? windowActive[shortcut.window] : undefined;
        const href = shortcut.window ? undefined : shortcut.href;
        return (
          <DesktopShortcut
            key={shortcut.label}
            label={shortcut.label}
            icon={Icons[shortcut.icon]}
            onOpen={opener}
            href={href}
            active={active}
          />
        );
      })}
    </Grid>
  );
};

export default DesktopShortcuts;

