import { EduIntro, EduList } from "../styles/Education.styled";
import { Wrapper } from "../styles/Output.styled";
import portfolio from "@/config/portfolio";

const Education: React.FC = () => {
  const { education } = portfolio;
  return (
    <Wrapper data-testid="education">
      <EduIntro>{education.intro}</EduIntro>
      {education.items.map(({ title, desc }) => (
        <EduList key={title}>
          <div className="title">{title}</div>
          <div className="desc">{desc}</div>
        </EduList>
      ))}
    </Wrapper>
  );
};

export default Education;
