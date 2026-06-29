import { MetaCharacter } from "./meta-character";

export type RedirectMode = "a" | "w";

const MetaToRedirectModeMap: Record<MetaCharacter, RedirectMode> = {
  [MetaCharacter.StdoutTruncate]: "w",
  [MetaCharacter.StdoutAppend]: "a",
  [MetaCharacter.StderrTruncate]: "w",
  [MetaCharacter.StderrAppend]: "a",
} as const;

export function getRedirectMode(metaCharacter: MetaCharacter): RedirectMode {
  return MetaToRedirectModeMap[metaCharacter] ?? "w";
}
