import styled from "styled-components";

export const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 0;

  padding: 1.25rem;
  padding-top: 0.75rem;

  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;

  /* Prettier, modern scrollbar for the terminal */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: ${({ theme }) => theme.colors?.scrollHandle} transparent; /* Firefox */

  &::-webkit-scrollbar { width: 12px; }
  &::-webkit-scrollbar-track {
    background: linear-gradient(180deg, rgba(0,0,0,0.22), rgba(0,0,0,0.28));
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, ${({ theme }) => theme.colors?.scrollHandle}, ${({ theme }) => theme.colors?.scrollHandleHover});
    border-radius: 8px;
    border: 3px solid transparent;
    background-clip: padding-box;
    transition: background 0.2s ease, border-color 0.2s ease;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, ${({ theme }) => theme.colors?.scrollHandleHover}, ${({ theme }) => theme.colors?.scrollHandleHover});
    border-color: transparent;
  }
  &::-webkit-scrollbar-corner { background: transparent; }

  ${({ theme }) => theme.backgroundImage && `
    /* Let the window frame provide the glass backdrop; keep inner terminal transparent */
    background-color: transparent;
  `}
`;

export const CmdNotFound = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  /* Error state reads clearly in the red accent with a faint glow */
  color: ${({ theme }) => theme.colors?.secondary};
  text-shadow: 0 0 10px rgba(255, 107, 107, 0.25);
`;

export const Empty = styled.div`
  margin-bottom: 0.25rem;
`;

export const MobileSpan = styled.span`
  line-height: 1.5rem;
  margin-right: 0.75rem;

  @media (min-width: 550px) {
    display: none;
  }
`;

export const MobileBr = styled.br`
  @media (min-width: 550px) {
    display: none;
  }
`;

export const Form = styled.form`
  @media (min-width: 550px) {
    display: flex;
  }
`;

export const Input = styled.input`
  flex-grow: 1;
  color: ${({ theme }) => theme.colors?.text[100]};
  /* subtle cyan glow on the typed command, echoing the CRT theme */
  text-shadow: 0 0 6px rgba(0, 212, 255, 0.15);

  @media (max-width: 550px) {
    min-width: 85%;
  }
`;

export const Hints = styled.span`
  display: inline-block;
  margin: 0.125rem 0.5rem 0.125rem 0;
  padding: 0.05rem 0.45rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors?.text[100]};
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;
