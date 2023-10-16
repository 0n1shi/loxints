export enum ValueType {
  String = "[string]",
  Number = "[number]",
  Boolean = "[boolean]",
  Nil = "[nil]",
}

export class Value {
  type: ValueType;
  value: string | number | boolean | null;

  constructor(type: ValueType, value: string | number | boolean | null) {
    this.type = type;
    this.value = value;
  }
}
