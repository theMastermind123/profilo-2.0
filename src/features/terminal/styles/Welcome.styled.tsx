import styled from "styled-components";

export const HeroContainer = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;

  @media (max-width: 932px) {
    margin-bottom: 1.5rem;
  }

  div {
    @media (min-width: 1024px) {
      flex-basis: 50%;
    }
  }
`;

export const PreName = styled.pre`
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors?.primary};
  text-shadow: 0 0 14px rgba(0, 212, 255, 0.35);

  @media (max-width: 550px) {
    display: none;
  }
`;

export const PreWrapper = styled.div`
  text-align: center;
`;

export const PreNameMobile = styled.pre`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: 550px) {
    display: none;
  }
`;

export const PreImg = styled.pre`
  @media (max-width: 550px) {
    display: none;
  }
`;

export const Seperator = styled.div`
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const Cmd = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
  transition: text-shadow 0.15s ease, opacity 0.15s ease;

  &:hover {
    text-decoration: underline;
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.45);
  }
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors?.secondary};
  text-decoration: none;
  line-height: 1.5rem;
  white-space: nowrap;
  border-bottom: 2px dashed ${({ theme }) => theme.colors?.secondary};
  transition: border-bottom-color 0.15s ease, text-shadow 0.15s ease;

  &:hover {
    border-bottom-style: solid;
    text-shadow: 0 0 10px rgba(255, 107, 107, 0.35);
  }
`;
