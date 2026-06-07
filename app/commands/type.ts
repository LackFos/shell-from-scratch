import fs from "node:fs";
import path from "node:path";

type ShellCommand = (input: string) => void;

export function typeCommand(input: string, commands: Record<string, ShellCommand>): void {
  const commandToSearch = input.slice(5);

  // Builtin Commands
  if (commands[commandToSearch]) {
    console.log(`${commandToSearch} is a shell builtin`);
    return;
  }

  // External Commands
  const rawPath: String = process.env.PATH || "";
  const paths = rawPath.split(":");

  for (const directory of paths) {
    const fullpath = path.join(directory, commandToSearch);

    try {
      const file = fs.statSync(fullpath);

      if (file && file.isFile()) {
        fs.accessSync(fullpath, fs.constants.X_OK);
        console.log(`${commandToSearch} is ${fullpath}`);
        return;
      }
    } catch (error) {
      continue;
    }

    if (fs.existsSync(fullpath)) {
      console.log(`${commandToSearch} is ${fullpath}`);
      return;
    }
  }

  console.log(`${commandToSearch}: not found`);
}