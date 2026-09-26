import styled from "styled-components";

export const HelpWrapper = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

export const CmdList = styled.div`
  margin-bottom: 0.25rem;
`;

export const Cmd = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
  transition: text-shadow 0.15s ease, opacity 0.15s ease;

  &:hover {
    text-decoration: underline;
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.45);
  }
`;

export const CmdDesc = styled.span`
  color: ${({ theme }) => theme.colors?.text[200]};
  margin-bottom: 0.75rem;

  @media (max-width: 550px) {
    display: block;
  }
`;

export const KeyContainer = styled.div`
  font-size: 0.875rem;
  margin-top: 1rem;

  @media (max-width: 550px) {
    display: none;
  }

  div {
    margin-top: 0.25rem;
  }
`;
