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
