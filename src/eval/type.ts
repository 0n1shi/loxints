import { Block } from "../ast/type.ts";
import { UndefinedClassMember, UndefinedVariableError } from "./error.ts";

export class ReturnValueError extends Error {
  value: Value;

  constructor(value: Value) {
    super();
    this.value = value;
  }
}

export enum ValueType {
  String = "[string]",
  Number = "[number]",
  Boolean = "[boolean]",
  Nil = "[nil]",
  Class = "[class]",
  ClassInstance = "[class instance]",
  UserFunction = "[user function]",
  NativeFunction = "[native function]",
}

export class Class {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export class ClassInstance {
  className: string;
  fields: Map<string, any>;

  constructor(className: string) {
    this.className = className;
    this.fields = new Map();
  }

  get(key: string): any {
    if (this.fields.has(key)) {
      return this.fields.get(key);
    }

    throw new UndefinedClassMember(this.className, key);
  }
}

export class UserFunction {
  parameters: string[];
  block: Block;
  environment: Environment;

  constructor(parameters: string[], block: Block, environment: Environment) {
    this.parameters = parameters;
    this.block = block;
    this.environment = environment;
  }
}

export type NativeFunction = (...args: any[]) => any;

export type ValueTypeInTS =
  | string
  | number
  | boolean
  | null
  | Class
  | ClassInstance
  | UserFunction
  | NativeFunction;

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

  add(key: string, value: Value): Environment {
    this.variables.set(key, value);
    return this;
  }

  put(key: string, value: Value): Environment {
    if (this.variables.has(key)) {
      this.variables.set(key, value);
      return this;
    }
    if (this.parent) {
      this.parent.put(key, value);
      return this;
    }

    throw new UndefinedVariableError(key);
  }
}
