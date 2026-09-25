import {
  AboutWrapper,
  HighlightAlt,
  HighlightSpan,
} from "../styles/About.styled";
import portfolio from "@/config/portfolio";

const About: React.FC = () => {
  const { about, identity } = portfolio;
  return (
    <AboutWrapper data-testid="about">
      <p>
        {about.greeting} <HighlightSpan>{identity.name}</HighlightSpan>.
      </p>
      <p>
        {about.rolePrefix} <HighlightAlt>{about.roleHighlight}</HighlightAlt>{" "}
        {about.roleSuffix}
      </p>
      {about.paragraphs.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </AboutWrapper>
  );
};

export default About;
