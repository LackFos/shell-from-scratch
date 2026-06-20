import type { ShellContext } from "../main";

import { cdCommand } from "./cd";
import { echoCommand } from "./echo";
import { exitCommand } from "./exit";
import { helloCommand } from "./hello";
import { pwdCommand } from "./pwd";
import { typeCommand } from "./type";

export type ShellCommand = (input: string[], context: ShellContext) => void;

export const BuiltInCommands: Record<string, ShellCommand> = {
  echo: echoCommand,
  exit: exitCommand,
  hello: helloCommand,
  type: typeCommand,
  pwd: pwdCommand,
  cd: cdCommand,
};
