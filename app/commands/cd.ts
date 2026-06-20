import fs from "fs";
import type { ShellContext } from "../main";

export function cdCommand(args: string[], context: ShellContext): void {
  let targetPath = args[0];

  if (!targetPath) {
    fs.writeSync(context[2], "cd: missing operand\n");
    return;
  }

  if (targetPath === "~") {
    targetPath = process.env.HOME || "/";
  }

  try {
    process.chdir(targetPath);
  } catch (err) {
    fs.writeSync(context[2], `cd: no such file or directory: ${targetPath}\n`);
  }
}
