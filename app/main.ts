import { createInterface } from "readline";
import { CommandParser, type CommandGroup } from "./libs/command-parser";
import { CommandExecutor } from "./libs/command-executor";

export type ShellContext = number[];

export const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

rl.prompt();

rl.on("line", async (input: string) => {
  const commands: CommandGroup[] = CommandParser.parse(input);

  const commandExecutor = new CommandExecutor();
  await commandExecutor.execute(commands);

  rl.prompt();
});
