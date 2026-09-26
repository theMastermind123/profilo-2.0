import styled from "styled-components";

export const ProjectContainer = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.875rem;
`;

export const ProjectsIntro = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  line-height: 1.5rem;
`;

export const ProjectTitle = styled.div`
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors?.primary};
  transition: text-shadow 0.15s ease, opacity 0.15s ease;

  &:hover {
    text-decoration: underline;
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.45);
  }
`;

export const ProjectDesc = styled.div`
  color: ${({ theme }) => theme.colors?.text[200]};
  text-align: justify;
  line-height: 1.5rem;
  max-width: 500px;
`;
