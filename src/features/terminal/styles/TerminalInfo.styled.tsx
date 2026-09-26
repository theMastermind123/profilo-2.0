import styled from "styled-components";

export const Wrapper = styled.span`
  display: inline-block;
  margin-right: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  user-select: none;
`;

export const WebsiteName = styled.span`
  /* Kali prompt: red user@host */
  color: #ff6b6b;
`;

export const User = styled.span`
  /* Kali prompt: red user@host, with a faint glow to echo the CRT feel */
  color: #ff6b6b;
  text-shadow: 0 0 8px rgba(255, 107, 107, 0.35);
`;

/** The `:~$` path/seed suffix, dimmed in the cyan accent so it recedes. */
export const Prompt = styled.span`
  color: ${({ theme }) => theme.colors?.text[300]};
`;
