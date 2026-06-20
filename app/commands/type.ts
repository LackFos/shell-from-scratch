import fs from "fs";
import path from "path";
import { BuiltInCommands } from ".";
import type { ShellContext } from "../main";

export function typeCommand(args: string[], context: ShellContext): void {
  const commandToSearch = args[0];

  if (!commandToSearch) {
    fs.writeSync(context[2], "type: missing operand\n");
    return;
  }

  // Builtin Commands
  if (BuiltInCommands[commandToSearch]) {
    fs.writeSync(context[1], `${commandToSearch} is a shell builtin\n`);
    return;
  }

  // External Commands
  const rawPath: string = process.env.PATH || "";
  const paths = rawPath.split(":");

  for (const directory of paths) {
    const fullpath = path.join(directory, commandToSearch);

    try {
      const file = fs.statSync(fullpath);

      if (file && file.isFile()) {
        fs.accessSync(fullpath, fs.constants.X_OK);
        fs.writeSync(context[1], `${commandToSearch} is ${fullpath}\n`);
        return;
      }
    } catch (error) {
      continue;
    }
  }

  fs.writeSync(context[2], `${commandToSearch} not found\n`);
}
