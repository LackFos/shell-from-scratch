import type { CommandGroup } from "./index.ts";

export class CommandParser {
  static parse(input: string): CommandGroup[] {
    const commandGroups: CommandGroup[] = [[]];

    var [...rawTokens] = input.split(" ");

    for (const rawToken of rawTokens) {
      const currentGroupIndex = commandGroups.length - 1;

      commandGroups[currentGroupIndex].push(rawToken);

      if (rawToken === ">" || rawToken === "1>") {
        commandGroups.push([]);
      }
    }

    return commandGroups;
  }
}
