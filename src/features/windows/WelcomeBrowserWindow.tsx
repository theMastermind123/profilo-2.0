import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import portfolio from "@/config/portfolio";

// Simple browser-like window that is draggable/resizable and shows a welcome message

const identity = portfolio.identity;
const browser = portfolio.browser;

/** Convert a #RRGGBB hex to an rgba() string with the given alpha. */
const hexToRgba = (hex: string, alpha: number): string => {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

type Props = {
  onClose: () => void;
  onMinimize?: () => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
  x?: number; y?: number; width?: number; height?: number;
  onMove?: (x:number, y:number) => void;
  onResize?: (next: { width:number; height:number; x?:number; y?:number }) => void;
  visible?: boolean;
  onFocus?: () => void;
  zIndex?: number;
};

const Frame = styled.div<{ x?:number; y?:number; width?:number; height?:number; maximized?: boolean; hidden?: boolean; isTransforming?: boolean; zIndex?: number }>`
  position: fixed;
  box-sizing: border-box;
  ${({ theme }) => theme.backgroundImage && `
    background: rgba(0, 0, 0, 0.55);
    border-radius: 14px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.12);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px) saturate(1.1);
    -webkit-backdrop-filter: blur(16px) saturate(1.1);
  `}
  ${({ hidden }) => hidden && css`display:none;`}
  ${({ maximized, theme }) => maximized && theme.backgroundImage && css`
    inset: 0; margin: 0; max-width: none; width: 100vw; height: 100vh; border-radius: 0;
  `}
  ${({ maximized, x, y, width, height }) => !maximized && css`
    left: ${x ?? 140}px; top: ${y ?? 60}px; width: ${width ?? 900}px; height: ${height ?? 560}px;
  `}
  z-index: ${({ zIndex }) => zIndex ?? 200}; /* above desktop icons but below modals */
  transition: ${({ isTransforming }) => isTransforming ? 'left 180ms ease, top 180ms ease, width 180ms ease, height 180ms ease, border-radius 180ms ease' : 'none'};
`;

const TitleBar = styled.div`
  ${({ theme }) => theme.backgroundImage && `
    background: linear-gradient(to bottom, rgba(32, 32, 32, 0.9), rgba(24, 24, 24, 0.9));
    height: 32px; display: flex; align-items: center; justify-content: center;
    padding: 0 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); position: relative; cursor: move;
  `}
`;

const WindowTitle = styled.div`
  ${({ theme }) => theme.backgroundImage && `
    font-size: 13px; color: #ECEFF4; font-weight: 500; flex: 1; text-align: center; font-family: system-ui, -apple-system, sans-serif;
  `}
`;

const WindowControls = styled.div`
  ${({ theme }) => theme.backgroundImage && `
    position: absolute; right: 12px; top: 0; height: 100%; display: flex; align-items: center; gap: 0;
  `}
`;

const ControlButton = styled.button<{ variant?: 'min'|'max'|'close' }>`
  ${({ theme, variant }) => theme.backgroundImage && `
    width: 46px; height: 100%; cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background 0.15s ease; border: none; background: transparent; color: #d9d9d9;
    &:hover { background: ${variant === 'close' ? '#E81123' : 'rgba(0,0,0,0.08)'}; }
    &:active { background: ${variant === 'close' ? '#F1707A' : 'rgba(0,0,0,0.12)'}; }
    svg { width: 12px; height: 12px; fill: currentColor; }
    ${variant === 'close' ? `&:hover svg { color: #fff; } &:active svg { color: #fff; }` : ''}
  `}
`;

const Toolbar = styled.div`
  ${({ theme }) => theme.backgroundImage && `
    height: 36px; display:flex; align-items:center; padding: 0 16px;
    background: rgba(24, 24, 24, 0.85);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    font-family: system-ui, -apple-system, sans-serif;
  `}
`;

const LocationBar = styled.div`
  flex:1; height: 24px; border-radius: 6px; background: rgba(255,255,255,0.05);
  display:flex; align-items:center; padding: 0 12px; color:#ECEFF4; font-size:13px;
  border: 1px solid rgba(255,255,255,0.08);
  font-weight: 400;
`;

const Content = styled.div<{ maximized?: boolean }>`
  height: ${({ maximized }) => maximized ? 'calc(100vh - 32px - 36px)' : 'calc(100% - 32px - 36px)'};
  padding: 22px 24px; color:#ECEFF4; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  overflow:auto;
`;

const Handle = styled.div<{ pos: 'n'|'s'|'e'|'w'|'ne'|'nw'|'se'|'sw' }>`
  position:absolute; z-index:5;
  ${({ pos }) => pos === 'n' && css`top: -2px; left: 6px; right: 6px; height: 6px; cursor: ns-resize;`}
  ${({ pos }) => pos === 's' && css`bottom: -2px; left: 6px; right: 6px; height: 6px; cursor: ns-resize;`}
  ${({ pos }) => pos === 'e' && css`top: 6px; right: -2px; bottom: 6px; width: 6px; cursor: ew-resize;`}
  ${({ pos }) => pos === 'w' && css`top: 6px; left: -2px; bottom: 6px; width: 6px; cursor: ew-resize;`}
  ${({ pos }) => pos === 'ne' && css`top: -2px; right: -2px; width: 10px; height: 10px; cursor: nesw-resize;`}
  ${({ pos }) => pos === 'nw' && css`top: -2px; left: -2px; width: 10px; height: 10px; cursor: nwse-resize;`}
  ${({ pos }) => pos === 'se' && css`bottom: -2px; right: -2px; width: 10px; height: 10px; cursor: nwse-resize;`}
  ${({ pos }) => pos === 'sw' && css`bottom: -2px; left: -2px; width: 10px; height: 10px; cursor: nesw-resize;`}
`;

const MIN_W = 520; const MIN_H = 340;
const clamp = (v:number, min:number, max:number) => Math.max(min, Math.min(max, v));

const WelcomeBrowserWindow: React.FC<Props> = ({ onClose, onMinimize, isMaximized=false, onToggleMaximize, x=140, y=60, width=900, height=560, onMove, onResize, visible=true, onFocus, zIndex }) => {
  const posRef = useRef({ x, y });
  const sizeRef = useRef({ width, height });
  useEffect(() => { posRef.current = { x, y }; }, [x, y]);
  useEffect(() => { sizeRef.current = { width, height }; }, [width, height]);

  const dragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, sx: 0, sy: 0 });
  const [isTransforming, setIsTransforming] = useState(false);
  const resizing = useRef<null | { dir: React.ComponentProps<typeof Handle>['pos']; mx: number; my: number; sx: number; sy: number; sw: number; sh: number }>(null);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (isMaximized) return;
    if (dragging.current) {
      const dx = e.clientX - dragStart.current.mx; const dy = e.clientY - dragStart.current.my;
      const ww = window.innerWidth; const wh = window.innerHeight;
      const nx = clamp(dragStart.current.sx + dx, 0, Math.max(0, ww - sizeRef.current.width));
      const ny = clamp(dragStart.current.sy + dy, 0, Math.max(0, wh - sizeRef.current.height));
      onMove && onMove(nx, ny);
    } else if (resizing.current) {
      const { dir, mx, my, sx, sy, sw, sh } = resizing.current;
      let nw = sw, nh = sh, nx = sx, ny = sy; const dx = e.clientX - mx; const dy = e.clientY - my;
      if (dir.includes('e')) nw = sw + dx; if (dir.includes('s')) nh = sh + dy;
      if (dir.includes('w')) { nw = sw - dx; nx = sx + dx; }
      if (dir.includes('n')) { nh = sh - dy; ny = sy + dy; }
      nw = Math.max(MIN_W, nw); nh = Math.max(MIN_H, nh);
      const ww = window.innerWidth; const wh = window.innerHeight;
      nx = clamp(nx, 0, Math.max(0, ww - nw)); ny = clamp(ny, 0, Math.max(0, wh - nh));
      onResize && onResize({ width: nw, height: nh, x: nx, y: ny });
    }
  }, [isMaximized, onMove, onResize]);

  const onMouseUp = useCallback(() => {
    dragging.current = false; resizing.current = null;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    const t = setTimeout(() => setIsTransforming(false), 0);
    return () => clearTimeout(t);
  }, [onMouseMove]);

  const startDrag = (e: React.MouseEvent) => {
    if (isMaximized) return;
    dragging.current = true;
    setIsTransforming(false);
    dragStart.current = { mx: e.clientX, my: e.clientY, sx: posRef.current.x, sy: posRef.current.y };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const startResize = (dir: React.ComponentProps<typeof Handle>['pos']) => (e: React.MouseEvent) => {
    if (isMaximized) return; e.stopPropagation();
    resizing.current = { dir, mx: e.clientX, my: e.clientY, sx: posRef.current.x, sy: posRef.current.y, sw: sizeRef.current.width, sh: sizeRef.current.height };
    setIsTransforming(false);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <Frame x={x} y={y} width={width} height={height} maximized={isMaximized} hidden={!visible} isTransforming={!dragging.current && !resizing.current} zIndex={zIndex}>
      <TitleBar onMouseDown={(e) => { startDrag(e); onFocus && onFocus(); }}>
        <WindowTitle>{browser.windowTitle}</WindowTitle>
        <WindowControls aria-label="Window controls">
          {onMinimize && (
            <ControlButton variant='min' title='Minimize' aria-label='Minimize' onClick={onMinimize}>
              <svg viewBox="0 0 10 10" aria-hidden="true"><rect x="1" y="5" width="8" height="1" rx="0.5" /></svg>
            </ControlButton>
          )}
          {onToggleMaximize && (
            <ControlButton variant='max' title='Maximize' aria-label='Maximize' onClick={onToggleMaximize}>
              <svg viewBox="0 0 10 10" aria-hidden="true"><rect x="2" y="2" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
            </ControlButton>
          )}
          <ControlButton variant='close' title='Close' aria-label='Close' onClick={onClose}>
            <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2 L8 8 M8 2 L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </ControlButton>
        </WindowControls>
      </TitleBar>

      {!isMaximized && (
        <>
          <Handle pos='n' onMouseDown={startResize('n')} />
          <Handle pos='s' onMouseDown={startResize('s')} />
          <Handle pos='e' onMouseDown={startResize('e')} />
          <Handle pos='w' onMouseDown={startResize('w')} />
          <Handle pos='ne' onMouseDown={startResize('ne')} />
          <Handle pos='nw' onMouseDown={startResize('nw')} />
          <Handle pos='se' onMouseDown={startResize('se')} />
          <Handle pos='sw' onMouseDown={startResize('sw')} />
        </>
      )}

      <Toolbar>
        <LocationBar>{browser.locationBar}</LocationBar>
      </Toolbar>

      <Content maximized={isMaximized}>
        <div className="bw-wrap">
          {/* Hero */}
          <section className="bw-hero">
            <div className="bw-avatar-ring">
              <img className="bw-avatar" src={identity.avatar} alt={identity.name} />
            </div>
            <div className="bw-hero-text">
              <h1 className="bw-name">{identity.name}</h1>
              <p className="bw-subtitle">{browser.hero.subtitle}</p>
              <div className="bw-pills" role="group" aria-label="Quick links">
                {browser.hero.quickLinks.map((link) => (
                  <a
                    key={link.label}
                    className="bw-pill"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    style={
                      {
                        '--c': link.color,
                        '--pill-bg': hexToRgba(link.accent, 0.16),
                        '--pill-bg-hover': hexToRgba(link.accent, 0.28),
                        '--pill-border': hexToRgba(link.accent, 0.42),
                      } as React.CSSProperties
                    }
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Highlight cards */}
          <div className="bw-cards">
            {browser.cards.map((card) => (
              <div
                key={card.title}
                className="bw-card"
                role="button"
                tabIndex={0}
                aria-label={card.title}
                style={
                  {
                    '--accent': card.accent,
                    '--accent-alt': card.accentAlt,
                    '--hl': card.highlightColor,
                    '--card-bg': `linear-gradient(135deg, ${hexToRgba(card.accent, 0.16)} 0%, ${hexToRgba(card.accentAlt, 0.10)} 100%)`,
                    '--card-border': hexToRgba(card.accent, 0.28),
                    '--card-border-hover': hexToRgba(card.accent, 0.6),
                    '--card-glow': hexToRgba(card.accent, 0.24),
                  } as React.CSSProperties
                }
                onClick={() => window.open(card.link, '_blank')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.open(card.link, '_blank');
                  }
                }}
              >
                <div className="bw-card-head">
                  <span className="bw-card-emoji" aria-hidden>{card.emoji}</span>
                  <h3 className="bw-card-title">{card.title}</h3>
                </div>
                <p className="bw-card-body">
                  {card.body}
                  {card.highlight && <strong className="bw-card-hl"> {card.highlight}</strong>}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .bw-wrap{max-width:900px;margin:0 auto;display:flex;flex-direction:column;gap:26px;animation:fadeInUp .6s ease-out}
          .bw-hero{display:grid;grid-template-columns:132px 1fr;gap:22px;align-items:center}
          .bw-avatar-ring{width:132px;height:132px;border-radius:20px;padding:2px;background:linear-gradient(135deg,#88C0D0,#5E81AC);box-shadow:0 16px 34px rgba(0,0,0,.45)}
          .bw-avatar{width:100%;height:100%;object-fit:cover;border-radius:18px;display:block;border:1px solid rgba(0,0,0,.35)}
          .bw-name{margin:0;font-size:clamp(1.7rem,4vw,2.4rem);line-height:1.15;font-weight:800;letter-spacing:-.02em;background:linear-gradient(135deg,#88C0D0 0%,#5E81AC 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}
          .bw-subtitle{margin:6px 0 0;font-size:1.05rem;color:#D8DEE9;opacity:.92}
          .bw-pills{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}
          .bw-pill{text-decoration:none;color:var(--c);background:var(--pill-bg);padding:7px 14px;border-radius:999px;border:1px solid var(--pill-border);font-size:.9rem;font-weight:600;transition:transform .15s ease,background .15s ease,box-shadow .15s ease}
          .bw-pill:hover{transform:translateY(-2px);background:var(--pill-bg-hover);box-shadow:0 8px 18px rgba(0,0,0,.35)}
          .bw-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}
          .bw-card{position:relative;overflow:hidden;background:var(--card-bg);border:1px solid var(--card-border);border-radius:16px;padding:18px 18px 18px 22px;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}
          .bw-card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,var(--accent),var(--accent-alt))}
          .bw-card:hover{transform:translateY(-4px);border-color:var(--card-border-hover);box-shadow:0 16px 32px var(--card-glow)}
          .bw-card:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
          .bw-card-head{display:flex;align-items:center;gap:10px;margin-bottom:10px}
          .bw-card-emoji{font-size:1.5rem;line-height:1}
          .bw-card-title{margin:0;color:var(--accent);font-size:1.08rem;font-weight:700}
          .bw-card-body{margin:0;line-height:1.6;color:#D8DEE9;font-size:.95rem}
          .bw-card-hl{color:var(--hl);font-weight:700}
          @keyframes fadeInUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
          @media (max-width:560px){.bw-hero{grid-template-columns:1fr;justify-items:center;text-align:center}.bw-pills{justify-content:center}}
        `}</style>
      </Content>
    </Frame>
  );
};

export default WelcomeBrowserWindow;

