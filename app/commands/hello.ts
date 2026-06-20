import fs from "fs";
import type { ShellContext } from "../main";

export function helloCommand(args: string[], context: ShellContext): void {
  fs.writeSync(context[1], "Hello, World!\n");
}
