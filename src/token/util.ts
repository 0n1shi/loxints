export function isDigit(v: string): boolean {
  if (v.match(/[0-9]/g)) return true;
  return false;
}

export function isAlphabet(v: string): boolean {
  if (v.match(/[a-zA-Z]/g)) return true;
  return false;
}

export function isAplhaNumeric(v: string): boolean {
  return isDigit(v) || isAlphabet(v);
}
