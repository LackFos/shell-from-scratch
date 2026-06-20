import { rl, type ShellContext } from "./../main";

export function exitCommand(args: string[], context: ShellContext): void {
  rl.close();
  process.exit(0);
}
