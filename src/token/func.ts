import { singleSymbles, Symbol, Token } from "./type.ts";

export function tokenize(sourceCode: string): Token[] {
  const sourceCodeLength = sourceCode.length;
  const tokens: Token[] = [];

  let cursor = 0;
  let line = 1;

  while (true) {
    if (cursor >= sourceCodeLength) {
      break;
    }

    const currentChar = sourceCode[cursor];
    cursor++;

    if (singleSymbles.includes(currentChar)) {
      const symbol = singleSymbles.filter((v) => v == currentChar)[0];
      tokens.push({
        symbol: symbol as Symbol,
      });
    }
  }
  return tokens;
}
