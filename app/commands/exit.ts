import { rl } from "./../main";

export function exitCommand(): void {
  rl.close();
  process.exit(0);
}
