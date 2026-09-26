import {
  SkillGroup,
  SkillLabel,
  SkillList,
  SkillsIntro,
  SkillsWrapper,
} from "../styles/Skills.styled";
import portfolio from "@/config/portfolio";

const Skills: React.FC = () => {
  const { intro, groups } = portfolio.skills;
  return (
    <SkillsWrapper data-testid="skills">
      <SkillsIntro>{intro}</SkillsIntro>
      {groups.map((group) => (
        <SkillGroup key={group.label}>
          <SkillLabel>{`${group.label}: `}</SkillLabel>
          <SkillList>{group.items.join(", ")}</SkillList>
        </SkillGroup>
      ))}
    </SkillsWrapper>
  );
};

export default Skills;
