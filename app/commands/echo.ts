export function echoCommand(input: string): void {
  const stringToPrint = input.slice(5).trim();
  console.log(stringToPrint);
}