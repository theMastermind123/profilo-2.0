import styled from "styled-components";

export const ExperienceWrapper = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.875rem;
`;

export const ExperienceIntro = styled.div`
  margin-bottom: 1rem;
  line-height: 1.5rem;
`;

export const ExperienceItem = styled.div`
  margin-bottom: 1.25rem;
`;

export const ExperienceHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.25rem 1rem;
`;

export const Company = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary};
`;

export const Role = styled.span`
  color: ${({ theme }) => theme.colors?.text[100]};
`;

export const Meta = styled.span`
  color: ${({ theme }) => theme.colors?.text[200]};
  font-size: 0.85rem;
`;

export const Bullets = styled.ul`
  margin: 0.4rem 0 0;
  padding-left: 1.25rem;
  list-style: disc;
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.5rem;

  li {
    margin-top: 0.25rem;
  }
`;
