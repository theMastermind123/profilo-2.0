import {
  AboutWrapper,
  HighlightAlt,
  HighlightSpan,
} from "../styles/About.styled";

const About: React.FC = () => {
  return (
    <AboutWrapper data-testid="about">
      <p>
        Hi, my name is <HighlightSpan>Abdannasser Mbarki</HighlightSpan>.
      </p>
      <p>
        I'm a <HighlightAlt>ict student in ENIG</HighlightAlt> based in Tunisia.
      </p>
      <p>
        I am passionate about reverse engineering, software developpment and <br />
        agentic systems. I also enjoy coding, problem solving and playing CTFs.
      </p>
    </AboutWrapper>
  );
};

export default About;
