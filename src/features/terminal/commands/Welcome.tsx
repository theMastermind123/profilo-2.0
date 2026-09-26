import { useContext, useMemo } from "react";
import figlet from "figlet";
import standard from "figlet/importable-fonts/Standard.js";
import small from "figlet/importable-fonts/Small.js";
import {
  Cmd,
  HeroContainer,
  PreName,
  PreNameMobile,
  PreWrapper,
} from "../styles/Welcome.styled";
import { termContext } from "../Terminal";
import portfolio from "@/config/portfolio";

// Register the fonts used by the banner once, at module load.
figlet.parseFont("Standard", standard);
figlet.parseFont("Small", small);

/** Render `text` as ASCII art, wrapping onto a second line at spaces. */
const renderBanner = (text: string, font: string) =>
  figlet.textSync(text, {
    font,
    horizontalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  });

const Welcome: React.FC = () => {
  const { executeCommand } = useContext(termContext);

  const handleHelpClick = () => {
    if (executeCommand) {
      executeCommand(portfolio.terminal.helpCommand);
    }
  };

  const { bannerText, bannerFont, bannerFontMobile } = portfolio.terminal;
  const banner = useMemo(
    () => renderBanner(bannerText, bannerFont),
    [bannerText, bannerFont]
  );
  const mobileBanner = useMemo(
    () => renderBanner(bannerText, bannerFontMobile),
    [bannerText, bannerFontMobile]
  );

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
