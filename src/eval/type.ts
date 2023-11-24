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
  ClassMethod = "[class method]",
  UserFunction = "[user function]",
  NativeFunction = "[native function]",
}

export class Class {
  name: string;
  private fields: Map<string, Value>;
  private superClass?: Class;

  constructor(name: string, superClass?: Class) {
    this.name = name;
    this.fields = new Map();
    this.superClass = superClass;
  }

  has(key: string): boolean {
    return this.fields.has(key) ||
      (this.superClass != undefined && this.superClass.has(key));
  }

  get(key: string): Value {
    if (this.fields.has(key)) {
      return this.fields.get(key)!;
    }
    if (this.superClass && this.superClass.has(key)) {
      return this.superClass.get(key);
    }
    throw new UndefinedClassMember(this.name, key);
  }

  set(key: string, val: Value): Class {
    this.fields.set(key, val);
    return this;
  }
}

export class ClassInstance {
  cls: Class;
  fields: Map<string, Value>;

  constructor(cls: Class) {
    this.cls = cls;
    this.fields = new Map();
  }

  get(key: string): Value {
    if (this.fields.has(key)) {
      return this.fields.get(key)!;
    }
    if (this.cls.has(key)) {
      return this.cls.get(key);
    }

    throw new UndefinedClassMember(this.cls.name, key);
  }

  set(key: string, val: Value): ClassInstance {
    this.fields.set(key, val);
    return this;
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

export class ClassMethod {
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
  | ClassMethod
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
