import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import {
  evaluateAssignment,
  evaluateCall,
  evaluateComparision,
  evaluateEquality,
  evaluateExpression,
  evaluateFanctor,
  evaluateLogicAnd,
  evaluateLogicOr,
  evaluatePrimary,
  evaluateTerm,
  evaluateUnary,
} from "../../eval/func.ts";
import { primaryTests } from "../../test/data/primary.ts";
import { callTests } from "../../test/data/call.ts";
import { unaryTests } from "../../test/data/unary.ts";
import { fanctorTests } from "../../test/data/fanctor.ts";
import { termTests } from "../../test/data/term.ts";
import { comparisionTests } from "../../test/data/comparision.ts";
import { equalityTests } from "../../test/data/equality.ts";
import { logicAndTests } from "../../test/data/logic_and.ts";
import { logicOrTests } from "../../test/data/logic_or.ts";
import { assignmentTests } from "../../test/data/assignment.ts";
import { expressionTests } from "../data/expression.ts";

Deno.test("Testing evaluation of expression", async (context) => {
  for (const test of expressionTests) {
    await context.step(test.name, () => {
      const value = evaluateExpression(test.ast, test.environmentBefore);
      assertEquals(value, test.value);
      assertEquals(test.environmentBefore, test.environmentAfter);
    });
  }
});
Deno.test("Testing evaluation of assignment", async (context) => {
  for (const test of assignmentTests) {
    await context.step(test.name, () => {
      const value = evaluateAssignment(test.ast, test.environmentBefore);
      assertEquals(value, test.value);
      assertEquals(test.environmentBefore, test.environmentAfter);
    });
  }
});
Deno.test("Testing evaluation of logic or", async (context) => {
  for (const test of logicOrTests) {
    await context.step(test.name, () => {
      const value = evaluateLogicOr(test.ast, test.environmentBefore);
      assertEquals(value, test.value);
      assertEquals(test.environmentBefore, test.environmentAfter);
    });
  }
});
Deno.test("Testing evaluation of logic and", async (context) => {
  for (const test of logicAndTests) {
    await context.step(test.name, () => {
      const value = evaluateLogicAnd(test.ast, test.environmentBefore);
      assertEquals(value, test.value);
      assertEquals(test.environmentBefore, test.environmentAfter);
    });
  }
});
Deno.test("Testing evaluation of equality", async (context) => {
  for (const test of equalityTests) {
    await context.step(test.name, () => {
      const value = evaluateEquality(test.ast, test.environmentBefore);
      assertEquals(value, test.value);
      assertEquals(test.environmentBefore, test.environmentAfter);
    });
  }
});
Deno.test("Testing evaluation of comparision", async (context) => {
  for (const test of comparisionTests) {
    await context.step(test.name, () => {
      const value = evaluateComparision(test.ast, test.environmentBefore);
      assertEquals(value, test.value);
      assertEquals(test.environmentBefore, test.environmentAfter);
    });
  }
});
Deno.test("Testing evaluation of term", async (context) => {
  for (const test of termTests) {
    await context.step(test.name, () => {
      const value = evaluateTerm(test.ast, test.environmentBefore);
      assertEquals(value, test.value);
      assertEquals(test.environmentBefore, test.environmentAfter);
    });
  }
});
Deno.test("Testing evaluation of fanctor", async (context) => {
  for (const test of fanctorTests) {
    await context.step(test.name, () => {
      const value = evaluateFanctor(test.ast, test.environmentBefore);
      assertEquals(value, test.value);
      assertEquals(test.environmentBefore, test.environmentAfter);
    });
  }
});
Deno.test("Testing evaluation of unary", async (context) => {
  for (const test of unaryTests) {
    await context.step(test.name, () => {
      const value = evaluateUnary(test.ast, test.environmentBefore);
      assertEquals(value, test.value);
      assertEquals(test.environmentBefore, test.environmentAfter);
    });
  }
});
Deno.test("Testing evaluation of call", async (context) => {
  for (const test of callTests) {
    await context.step(test.name, () => {
      const value = evaluateCall(test.ast, test.environmentBefore);
      assertEquals(value, test.value);
      assertEquals(test.environmentBefore, test.environmentAfter);
    });
  }
});
Deno.test("Testing evaluation of primary", async (context) => {
  for (const test of primaryTests) {
    await context.step(test.name, () => {
      const value = evaluatePrimary(test.ast, test.environmentBefore);
      assertEquals(value, test.value);
      assertEquals(test.environmentBefore, test.environmentAfter);
    });
  }
});
