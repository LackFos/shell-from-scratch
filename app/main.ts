import fs from "node:fs";
import { createInterface } from "readline";
import { spawnSync } from "node:child_process";
import {
  cdCommand,
  echoCommand,
  exitCommand,
  helloCommand,
  pwdCommand,
  typeCommand,
  type ShellCommand,
} from "./commands";

export const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

const commands: Record<string, ShellCommand> = {
  hello: helloCommand,
  echo: echoCommand,
  exit: exitCommand,
  type: (input: string) => typeCommand(input, commands),
  pwd: pwdCommand,
  cd: cdCommand,
};

function matchCommand(input: string): void {
  var [command, ...args] = input.split(" ");
  console.log(1);
  // Builtin Commands
  if (commands[command]) {
    commands[command](input);
    return;
  }

  // Fallback to system commands
  try {
    const options = {
      encoding: "utf-8",
    };

    if (args[1] === ">") {
      args = [];
      const fileDescriptor = fs.openSync(args[2], "w");
      options.stdio = ["inherit", fileDescriptor, "inherit"];
    }

    const result = spawnSync(command, args, options);
    const stdout = result["stdout"].trim();
    const stderr = result["stderr"].trim();
    console.log(stdout || stderr);
    return;
  } catch (error) {
    console.log(error);
  }

  console.log(`${input}: command not found`);
}

rl.prompt();

rl.on("line", (command: string) => {
  matchCommand(command);
  rl.prompt();
});
