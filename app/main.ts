import { createInterface, emitKeypressEvents } from "readline";
import { CommandParser, type CommandGroup } from "./libs/command-parser";
import { CommandExecutor } from "./libs/command-executor";
import { BuiltInCommands } from "./commands";

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

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

process.stdin.on("keypress", (str, key) => {
  const possibleCommand = findPossibleCommands(rl.line);

  if (key.name === "tab" && possibleCommand) {
    rl.write(null, { ctrl: true, name: "u" }); // Ctrl+U (clear line)
    rl.write(possibleCommand);
    return;
  }

  if (possibleCommand) {
    suggestCommand(possibleCommand, rl.line.length);
  }
});

function findPossibleCommands(input: string): string | null {
  input = input.trimEnd();

  const availableCommands = Object.keys(BuiltInCommands);

  if (input.length === 0) {
    return null;
  }

  const matchingCommands = availableCommands.find((command) =>
    command.startsWith(input),
  );

  return matchingCommands || null;
}

function suggestCommand(command: string, padLeft: number): void {
  const FADED_GRAY = "\x1b[90m";
  const RESET_COLOR = "\x1b[0m";
  const MOVE_CURSOR_BACK = `\x1b[${command.length - padLeft}D`;

  process.stdout.write(
    `${FADED_GRAY}${command.length !== padLeft ? command.slice(padLeft) : " "}${RESET_COLOR}${MOVE_CURSOR_BACK}`,
  );
}
