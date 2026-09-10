export function splitChars(text: string): { char: string; space: boolean }[] {
  return text.split("").map((char) => ({ char, space: char === " " }));
}

export function splitWords(text: string): string[] {
  return text.split(" ");
}
