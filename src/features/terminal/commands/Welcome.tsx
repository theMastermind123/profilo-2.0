import { useContext } from "react";
import {
  Cmd,
  HeroContainer,
  PreName,
  PreNameMobile,
  PreWrapper,
} from "../styles/Welcome.styled";
import { termContext } from "../Terminal";
import portfolio from "@/config/portfolio";

const Welcome: React.FC = () => {
  const { executeCommand } = useContext(termContext);

  const handleHelpClick = () => {
    if (executeCommand) {
      executeCommand(portfolio.terminal.helpCommand);
    }
  };

  const banner = portfolio.terminal.banner;
  const mobileBanner = portfolio.terminal.bannerMobile || banner;

  return (
    <HeroContainer data-testid="welcome">
      <div className="info-section">
        <PreName>{banner}</PreName>
        <PreWrapper>
          <PreNameMobile>{mobileBanner}</PreNameMobile>
        </PreWrapper>
        <div>
          {portfolio.terminal.helpHint} `<Cmd
            onClick={handleHelpClick}
            style={{ cursor: "pointer" }}
          >
            {portfolio.terminal.helpCommand}
          </Cmd>`
        </div>
        <br />
      </div>
    </HeroContainer>
  );
};

export default Welcome;
