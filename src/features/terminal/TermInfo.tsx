import { User, WebsiteName, Wrapper } from "./styles/TerminalInfo.styled";
import portfolio from "@/config/portfolio";

const TermInfo = () => {
  const { user, host } = portfolio.terminal;
  return (
    <Wrapper>
      <User>{user}</User>@<WebsiteName>{host}</WebsiteName>:~$
    </Wrapper>
  );
};

export default TermInfo;
