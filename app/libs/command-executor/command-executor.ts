import fs from "fs";
import { spawn } from "child_process";
import { CommandParser, type CommandGroup } from "../command-parser";
import { BuiltInCommands } from "../../commands";
import type { ShellContext } from "../../main";
import { RedirectType } from "../command-parser";
import {
  getRedirectMode,
  getRedirectType,
  type RedirectMode,
} from "../command-parser/types";

export class CommandExecutor {
  async execute(commandGroups: CommandGroup[]): Promise<void> {
    let skipNext = false;
    let isCommandFound = false;

    for (const [index, commandGroup] of commandGroups.entries()) {
      if (skipNext) {
        skipNext = false;
        continue;
      }

      var [command, ...args] = commandGroup;

      const shellContext: ShellContext = [
        process.stdin.fd,
        process.stdout.fd,
        process.stderr.fd,
      ];

      const lastArg = args[args.length - 1];
      const redirectType = CommandParser.metaCharacter(lastArg);
      const redirectMode: RedirectMode = redirectType
        ? getRedirectMode(redirectType)
        : "w";

      if (redirectType) {
        skipNext = true;

        const fd = fs.openSync(`${commandGroups[index + 1]}`, redirectMode);

        if (getRedirectType(redirectType) === RedirectType.Stdout) {
          shellContext[1] = fd;
        }

        if (getRedirectType(redirectType) === RedirectType.Stderr) {
          shellContext[2] = fd;
        }

        args = args.slice(0, -1);
      }

      // Builtin Commands
      if (BuiltInCommands[command]) {
        isCommandFound = true;
        BuiltInCommands[command](args, shellContext);
        continue;
      }

      // Fallback to system commands
      try {
        const options = { encoding: "utf-8", stdio: shellContext };

        await new Promise<void>((resolve, reject) => {
          const childProcess = spawn(command, args, options);

          isCommandFound = true;

          childProcess.on("error", (error) => {
            console.log(`${command}: command not found`);
            reject(error);
          });

          if (childProcess.stdout) {
            childProcess.stdout.on("data", (data: string) => {
              process.stdout.write(data);
            });
          }

          if (childProcess.stderr) {
            childProcess.stderr.on("data", (data: string) => {
              process.stderr.write(data);
            });
          }

          childProcess.on("close", () => {
            resolve();
          });
        });

        continue;
      } catch (error) {
        continue;
      }
    }

    if (!isCommandFound) {
      console.log(`$: command not found`);
    }
  }
}
