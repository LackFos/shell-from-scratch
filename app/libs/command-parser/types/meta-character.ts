export const MetaCharacter = {
  StdoutTruncate: "StdoutTruncate",
  StderrTruncate: "StderrTruncate",
  StdoutAppend: "StdoutAppend",
  StderrAppend: "StderrAppend",
} as const;

export type MetaCharacter = (typeof MetaCharacter)[keyof typeof MetaCharacter];

export const TokenToMetaCharacterMap: Record<string, MetaCharacter> = {
  ">": MetaCharacter.StdoutTruncate,
  "1>": MetaCharacter.StdoutTruncate,
  "2>": MetaCharacter.StderrTruncate,
  ">>": MetaCharacter.StdoutAppend,
  "1>>": MetaCharacter.StdoutAppend,
  "2>>": MetaCharacter.StderrAppend,
} as const;
