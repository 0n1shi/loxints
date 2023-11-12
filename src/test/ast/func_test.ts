import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { primaryTests } from "../data/primary.ts";
import { unaryTests } from "../data/unary.ts";
import { fanctorTests } from "../data/fanctor.ts";
import { termTests } from "../data/term.ts";
import { comparisionTests } from "../data/comparision.ts";
import { equalityTests } from "../data/equality.ts";
import { logicAndTests } from "../data/logic_and.ts";
import { logicOrTests } from "../data/logic_or.ts";
import { assignmentTests } from "../data/assignment.ts";
import { returnStatementTests } from "../data/return_statement.ts";
import { blockTests } from "../data/block.ts";
import { whileStatementTests } from "../data/while_statement.ts";
import { printStatementTests } from "../data/print_statement.ts";
import { ifStatementTests } from "../data/if_statement.ts";
import { forStatementTests } from "../data/for_statement.ts";
import { expressionStatementTests } from "../data/expression_statement.ts";
import { variableDeclarationTests } from "../data/variable_declaration.ts";
import { argumentsTests } from "../data/arguments.ts";
import { callTests } from "../data/call.ts";
import { functionDeclarationTests } from "../data/function_declaration.ts";
import { expressionTests } from "../data/expression.ts";

import {
  makeArguments,
  makeAssignment,
  makeBlock,
  makeCall,
  makeComparision,
  makeEquality,
  makeExpression,
  makeExpressionStatement,
  makeFanctor,
  makeForStatement,
  makeFunctionDeclaration,
  makeIfStatement,
  makeLogicAnd,
  makeLogicOr,
  makePrimary,
  makePrintStatement,
  makeReturnStatement,
  makeTerm,
  makeUnary,
  makeVariableDeclaration,
  makeWhileStatement,
} from "../../ast/func.ts";

Deno.test("Testing ast for function declarations", async (context) => {
  for (const test of functionDeclarationTests) {
    await context.step(test.name, () => {
      const [ast] = makeFunctionDeclaration(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for variable declarations", async (context) => {
  for (const test of variableDeclarationTests) {
    await context.step(test.name, () => {
      const [ast] = makeVariableDeclaration(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for expression staments", async (context) => {
  for (const test of expressionStatementTests) {
    await context.step(test.name, () => {
      const [ast] = makeExpressionStatement(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for for staments", async (context) => {
  for (const test of forStatementTests) {
    await context.step(test.name, () => {
      const [ast] = makeForStatement(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for if staments", async (context) => {
  for (const test of ifStatementTests) {
    await context.step(test.name, () => {
      const [ast] = makeIfStatement(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for print staments", async (context) => {
  for (const test of printStatementTests) {
    await context.step(test.name, () => {
      const [ast] = makePrintStatement(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for return staments", async (context) => {
  for (const test of returnStatementTests) {
    await context.step(test.name, () => {
      const [ast] = makeReturnStatement(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for while staments", async (context) => {
  for (const test of whileStatementTests) {
    await context.step(test.name, () => {
      const [ast] = makeWhileStatement(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for blocks", async (context) => {
  for (const test of blockTests) {
    await context.step(test.name, () => {
      const [ast] = makeBlock(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for expressions", async (context) => {
  for (const test of expressionTests) {
    await context.step(test.name, () => {
      const [ast] = makeExpression(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for assignments", async (context) => {
  for (const test of assignmentTests) {
    await context.step(test.name, () => {
      const [ast] = makeAssignment(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for logic-ors", async (context) => {
  for (const test of logicOrTests) {
    await context.step(test.name, () => {
      const [ast] = makeLogicOr(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for logic-ands", async (context) => {
  for (const test of logicAndTests) {
    await context.step(test.name, () => {
      const [ast] = makeLogicAnd(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for equalities", async (context) => {
  for (const test of equalityTests) {
    await context.step(test.name, () => {
      const [ast] = makeEquality(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for comparisions", async (context) => {
  for (const test of comparisionTests) {
    await context.step(test.name, () => {
      const [ast] = makeComparision(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for terms", async (context) => {
  for (const test of termTests) {
    await context.step(test.name, () => {
      const [ast] = makeTerm(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for fanctors", async (context) => {
  for (const test of fanctorTests) {
    await context.step(test.name, () => {
      const [ast] = makeFanctor(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for unaries", async (context) => {
  for (const test of unaryTests) {
    await context.step(test.name, () => {
      const [ast] = makeUnary(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for calls", async (context) => {
  for (const test of callTests) {
    await context.step(test.name, () => {
      const [ast] = makeCall(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for arguments", async (context) => {
  for (const test of argumentsTests) {
    await context.step(test.name, () => {
      const [ast] = makeArguments(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing ast for primaries", async (context) => {
  for (const test of primaryTests) {
    await context.step(test.name, () => {
      const [ast] = makePrimary(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
