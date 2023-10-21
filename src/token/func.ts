import { keywords, LineNumber, Token, TokenType } from "./type.ts";
import { isAlphabet, isAplhaNumeric, isDigit } from "./util.ts";

export function tokenize(sourceCode: string): [Token[], LineNumber] {
  const sourceCodeLength = sourceCode.length;
  const tokens: Token[] = [];

  let cursor = 0;
  let lineNumber: LineNumber = 1;

  while (true) {
    if (cursor >= sourceCodeLength) {
      break;
    }

    const currentChar = sourceCode[cursor];
    cursor++;

    switch (currentChar) {
      case TokenType.ParenLeft:
        tokens.push({
          type: TokenType.ParenLeft,
        });
        break;
      case TokenType.ParenRight:
        tokens.push({
          type: TokenType.ParenRight,
        });
        break;
      case TokenType.BraceLeft:
        tokens.push({
          type: TokenType.BraceLeft,
        });
        break;
      case TokenType.BraceRight:
        tokens.push({
          type: TokenType.BraceRight,
        });
        break;
      case TokenType.Comma:
        tokens.push({
          type: TokenType.Comma,
        });
        break;
      case TokenType.Dot:
        tokens.push({
          type: TokenType.Dot,
        });
        break;
      case TokenType.Minus:
        tokens.push({
          type: TokenType.Minus,
        });
        break;
      case TokenType.Plus:
        tokens.push({
          type: TokenType.Plus,
        });
        break;
      case TokenType.SemiColon:
        tokens.push({
          type: TokenType.SemiColon,
        });
        break;
      case TokenType.Star:
        tokens.push({
          type: TokenType.Star,
        });
        break;
      case "\0":
      case " ":
      case "\r":
      case "\t":
        break;
      case "\n":
        lineNumber++;
    }

    const nextChar = cursor < sourceCodeLength ? sourceCode[cursor] : "";

    switch (currentChar) {
      case TokenType.Bang:
        if (nextChar === TokenType.Equal) {
          tokens.push({
            type: TokenType.BangEqual,
          });
          cursor++;
        } else {
          tokens.push({
            type: TokenType.Bang,
          });
        }
        break;
      case TokenType.Equal:
        if (nextChar == TokenType.Equal) {
          tokens.push({
            type: TokenType.EqualEqual,
          });
          cursor++;
        } else {
          tokens.push({
            type: TokenType.Equal,
          });
        }
        break;
      case TokenType.Greater:
        if (nextChar == TokenType.Equal) {
          tokens.push({
            type: TokenType.GreaterEqual,
          });
          cursor++;
        } else {
          tokens.push({
            type: TokenType.Greater,
          });
        }
        break;
      case TokenType.Less:
        if (nextChar == TokenType.Equal) {
          tokens.push({
            type: TokenType.LessEqual,
          });
          cursor++;
        } else {
          tokens.push({
            type: TokenType.Less,
          });
        }
        break;
      case TokenType.Slash:
        if (nextChar == TokenType.Slash) {
          cursor++;
          while (sourceCode[cursor] != "\n") cursor++;
        } else {
          tokens.push({
            type: TokenType.Slash,
          });
        }
    }

    // TokenType.Number
    if (isDigit(currentChar)) {
      let value = currentChar;
      let nextChar = sourceCode[cursor];
      while (nextChar !== undefined && (isDigit(nextChar) || nextChar == ".")) {
        value += nextChar;
        cursor++;
        nextChar = sourceCode[cursor];
      }
      tokens.push({
        type: TokenType.Number,
        value: Number(value),
      });
    }

    // TokenType.Identifier
    if (isAlphabet(currentChar)) {
      let value = currentChar;
      let nextChar = sourceCode[cursor];
      while (
        nextChar !== undefined && (isAplhaNumeric(nextChar) || nextChar == "_")
      ) {
        value += nextChar;
        cursor++;
        nextChar = sourceCode[cursor];
      }
      tokens.push({
        type: TokenType.Identifier,
        value: value,
      });
    }

    // TokenType.String
    if (currentChar == '"') {
      let value = "";
      while (sourceCode[cursor] != '"') {
        value += sourceCode[cursor];
        cursor++;
      }
      cursor++; // drop a double quotation at the end.
      tokens.push({
        type: TokenType.String,
        value: value,
      });
    }
  }

  // keywords
  for (const token of tokens) {
    if (keywords.includes(token.value as TokenType)) {
      token.type = token.value as TokenType;
      delete token.value;
    }
  }

  return [tokens, lineNumber];
}
