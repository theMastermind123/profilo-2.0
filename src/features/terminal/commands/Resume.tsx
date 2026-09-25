import { useContext } from "react";
import _ from "lodash";
import { termContext } from "../Terminal";
import portfolio from "@/config/portfolio";

const Resume: React.FC = () => {
  const { history, rerender } = useContext(termContext);

  /* ===== get current command ===== */
  const currentCommand = _.split(history[0], " ");

  /* ===== check current command makes redirect ===== */
  if (rerender && currentCommand[0] === "resume") {
    window.open(portfolio.resume.externalUrl, "_blank");
  }

  return <span></span>;
};

export default Resume;
