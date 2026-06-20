import fs from "fs";
import type { ShellContext } from "../main";

export function pwdCommand(args: string[], context: ShellContext): void {
  const currentDirectory = process.cwd();
  fs.writeSync(context[1], `${currentDirectory}\n`);
}
