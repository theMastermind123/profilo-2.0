import { useContext } from "react";
import _ from "lodash";
import { Wrapper } from "../styles/Output.styled";
import { termContext } from "../Terminal";
import portfolio from "@/config/portfolio";

const Email: React.FC = () => {
  const { history, rerender } = useContext(termContext);
  const { email } = portfolio.identity;

  /* ===== get current command ===== */
  const currentCommand = _.split(history[0], " ");

  if (rerender && currentCommand[0] === "email" && currentCommand.length <= 1) {
    window.open("mailto:" + email.mailto, "_self");
  }

  const handleEmailClick = () => {
    window.open("mailto:" + email.mailto, "_self");
  };

  return (
    <Wrapper>
      <span
        onClick={handleEmailClick}
        style={{
          cursor: 'pointer',
          textDecoration: 'underline',
          color: 'inherit'
        }}
      >
        {email.display}
      </span>
    </Wrapper>
  );
};

export default Email;
