import { Symbol, Token } from "./type.ts";

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

    switch (currentChar) {
      case Symbol.ParenLeft:
        tokens.push({
          symbol: Symbol.ParenLeft,
          value: null,
        });
        break;
      case Symbol.ParenRight:
        tokens.push({
          symbol: Symbol.ParenRight,
          value: null,
        });
        break;
    }
  }
  return tokens;
}
