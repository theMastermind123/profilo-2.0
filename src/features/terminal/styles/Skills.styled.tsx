import styled from "styled-components";

export const SkillsWrapper = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.875rem;
`;

export const SkillsIntro = styled.div`
  margin-bottom: 1rem;
  line-height: 1.5rem;
`;

export const SkillGroup = styled.div`
  margin-bottom: 0.6rem;
  line-height: 1.5rem;
`;

export const SkillLabel = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary};
`;

export const SkillList = styled.span`
  color: ${({ theme }) => theme.colors?.text[200]};
`;
