import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { primaryTests } from "../../test/data/primary.ts";
import { unaryTests } from "../../test/data/unary.ts";
import { fanctorTests } from "../../test/data/fanctor.ts";
import { termTests } from "../../test/data/term.ts";
import { comparisionTests } from "../../test/data/comparision.ts";
import { equalityTests } from "../../test/data/equality.ts";
import { logicAndTests } from "../../test/data/logic_and.ts";
import { logicOrTests } from "../../test/data/logic_or.ts";
import { assignmentTests } from "../../test/data/assignment.ts";
import { blockTests } from "../../test/data/block.ts";
import { whileStatementTests } from "../../test/data/while_statement.ts";
import { printStatementTests } from "../../test/data/print_statement.ts";
import { ifStatementTests } from "../../test/data/if_statement.ts";
import { forStatementTests } from "../../test/data/for_statement.ts";
import { expressionStatementTests } from "../../test/data/expression_statement.ts";
import { variableDeclarationTests } from "../../test/data/variable_declaration.ts";

import {
  makeAssignment,
  makeBlock,
  makeComparision,
  makeEquality,
  makeExpressionStatement,
  makeFanctor,
  makeForStatement,
  makeIfStatement,
  makeLogicAnd,
  makeLogicOr,
  makePrimary,
  makePrintStatement,
  makeTerm,
  makeUnary,
  makeVariableDeclaration,
  makeWhileStatement,
} from "../func.ts";

Deno.test("Testing tokenize variable declarations", async (context) => {
  for (const test of variableDeclarationTests) {
    await context.step(test.name, () => {
      const [ast] = makeVariableDeclaration(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize expression staments", async (context) => {
  for (const test of expressionStatementTests) {
    await context.step(test.name, () => {
      const [ast] = makeExpressionStatement(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize for staments", async (context) => {
  for (const test of forStatementTests) {
    await context.step(test.name, () => {
      const [ast] = makeForStatement(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize if staments", async (context) => {
  for (const test of ifStatementTests) {
    await context.step(test.name, () => {
      const [ast] = makeIfStatement(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize print staments", async (context) => {
  for (const test of printStatementTests) {
    await context.step(test.name, () => {
      const [ast] = makePrintStatement(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize while staments", async (context) => {
  for (const test of whileStatementTests) {
    await context.step(test.name, () => {
      const [ast] = makeWhileStatement(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize blocks", async (context) => {
  for (const test of blockTests) {
    await context.step(test.name, () => {
      const [ast] = makeBlock(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize assignments", async (context) => {
  for (const test of assignmentTests) {
    await context.step(test.name, () => {
      const [ast] = makeAssignment(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize logic-ors", async (context) => {
  for (const test of logicOrTests) {
    await context.step(test.name, () => {
      const [ast] = makeLogicOr(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize logic-ands", async (context) => {
  for (const test of logicAndTests) {
    await context.step(test.name, () => {
      const [ast] = makeLogicAnd(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize equalities", async (context) => {
  for (const test of equalityTests) {
    await context.step(test.name, () => {
      const [ast] = makeEquality(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize comparisions", async (context) => {
  for (const test of comparisionTests) {
    await context.step(test.name, () => {
      const [ast] = makeComparision(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize terms", async (context) => {
  for (const test of termTests) {
    await context.step(test.name, () => {
      const [ast] = makeTerm(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize fanctors", async (context) => {
  for (const test of fanctorTests) {
    await context.step(test.name, () => {
      const [ast] = makeFanctor(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize unaries", async (context) => {
  for (const test of unaryTests) {
    await context.step(test.name, () => {
      const [ast] = makeUnary(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
Deno.test("Testing tokenize primaries", async (context) => {
  for (const test of primaryTests) {
    await context.step(test.name, () => {
      const [ast] = makePrimary(test.tokens);
      assertEquals(ast, test.ast);
    });
  }
});
