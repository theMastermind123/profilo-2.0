import {
  Bullets,
  Company,
  ExperienceHeader,
  ExperienceIntro,
  ExperienceItem,
  ExperienceWrapper,
  Meta,
  Role,
} from "../styles/Experience.styled";
import portfolio from "@/config/portfolio";

const Experience: React.FC = () => {
  const { intro, items } = portfolio.experience;
  return (
    <ExperienceWrapper data-testid="experience">
      <ExperienceIntro>{intro}</ExperienceIntro>
      {items.map((item) => (
        <ExperienceItem key={`${item.company}_${item.period}`}>
          <ExperienceHeader>
            <span>
              <Company>{item.company}</Company>
              {" — "}
              <Role>{item.role}</Role>
            </span>
            <Meta>
              {item.period} · {item.location}
            </Meta>
          </ExperienceHeader>
          <Bullets>
            {item.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </Bullets>
        </ExperienceItem>
      ))}
    </ExperienceWrapper>
  );
};

export default Experience;
