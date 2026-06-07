export function cdCommand(input: string): void {
  let targetPath = input.slice(3).trim();

  if (targetPath === "~") {
    targetPath = process.env.HOME || "/";
  }

  try {
    process.chdir(targetPath);
  } catch (err) {
    console.log(`cd: ${targetPath}: No such file or directory`);
  }
}