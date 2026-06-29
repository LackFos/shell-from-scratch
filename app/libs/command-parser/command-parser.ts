import type { CommandGroup } from "./index.ts";
import {
  MetaCharacter,
  TokenToMetaCharacterMap,
} from "../command-parser/types";

export class CommandParser {
  static metaCharacter(rawToken: string): MetaCharacter | null {
    return TokenToMetaCharacterMap[rawToken] ?? null;
  }

  static parse(input: string): CommandGroup[] {
    const commandGroups: CommandGroup[] = [[]];

    var [...rawTokens] = input.split(" ");

    for (const rawToken of rawTokens) {
      const currentGroupIndex = commandGroups.length - 1;

      commandGroups[currentGroupIndex].push(rawToken);

      const isMetaCharacter = CommandParser.metaCharacter(rawToken) !== null;

      if (isMetaCharacter) {
        commandGroups.push([]);
      }
    }

    return commandGroups;
  }
}
