export enum ValueType {
  String = "[string]",
  Number = "[number]",
  Boolean = "[boolean]",
  Nil = "[nil]",
}

export type ValueTypeInTS = string | number | boolean | null;

export class Value {
  type: ValueType;
  value: ValueTypeInTS;

  constructor(type: ValueType, value: ValueTypeInTS) {
    this.type = type;
    this.value = value;
  }
}

export class Environment {
  parent?: Environment;
  variables: Map<string, Value>;

  constructor(perent?: Environment) {
    this.variables = new Map<string, Value>();
    this.parent = perent;
  }

  has(key: string): boolean {
    if (this.variables.has(key)) return true;
    if (this.parent) return this.parent.has(key);
    return false;
  }

  get(key: string): Value | undefined {
    if (this.variables.has(key)) return this.variables.get(key);

    if (this.parent) return this.parent.get(key);

    return undefined;
  }

  set(key: string, value: Value): Environment {
    this.variables.set(key, value);
    return this;
  }
}
