import { useContext } from "react";
import { OutputContainer, UsageDiv } from "./styles/Output.styled";
import { termContext } from "./Terminal";
import { commandRegistry } from "./commands/registry";

type Props = {
  index: number;
  cmd: string;
};

const Output: React.FC<Props> = ({ index, cmd }) => {
  const { arg } = useContext(termContext);

  // All command behaviour lives in the registry (see commands/registry.tsx).
  const entry = commandRegistry[cmd];
  if (!entry) return null;

  // Commands that don't take args show `Usage:` on any trailing input
  // (eg: `about tt`).
  if (!entry.acceptsArgs && arg.length > 0)
    return <UsageDiv data-testid="usage-output">Usage: {cmd}</UsageDiv>;

  const content = entry.render({ arg });

  // Hidden easter eggs render their own wrapper; normal commands get the
  // standard container (with the `latest-output` hook on the newest output).
  if (entry.bare) return <>{content}</>;
  return (
    <OutputContainer data-testid={index === 0 ? "latest-output" : null}>
      {content}
    </OutputContainer>
  );
};

export default Output;
