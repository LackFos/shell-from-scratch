import fs from "fs";
import type { ShellContext } from "../main";

export function echoCommand(args: string[], context: ShellContext): void {
  fs.writeSync(context[1], `${args.join(" ")}\n`);
}
