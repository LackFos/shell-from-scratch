import { MetaCharacter } from "./meta-character";

// Redirect Type
export const RedirectType = {
  Stdout: "Stdout",
  Stderr: "Stderr",
} as const;

export type RedirectType = (typeof RedirectType)[keyof typeof RedirectType];

const MetaToRedirectMap: Record<MetaCharacter, RedirectType> = {
  [MetaCharacter.StdoutTruncate]: RedirectType.Stdout,
  [MetaCharacter.StdoutAppend]: RedirectType.Stdout,
  [MetaCharacter.StderrTruncate]: RedirectType.Stderr,
  [MetaCharacter.StderrAppend]: RedirectType.Stderr,
} as const;

export function getRedirectType(
  metaCharacter: MetaCharacter,
): RedirectType | null {
  return MetaToRedirectMap[metaCharacter] ?? null;
}
