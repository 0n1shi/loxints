import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { tokenize } from "../../token/func.ts";
import { primaryTests } from "../data/primary.ts";
import { unaryTests } from "../data/unary.ts";
import { fanctorTests } from "../data/fanctor.ts";
import { termTests } from "../data/term.ts";
import { comparisionTests } from "../data/comparision.ts";
import { equalityTests } from "../data/equality.ts";
import { logicAndTests } from "../data/logic_and.ts";
import { logicOrTests } from "../data/logic_or.ts";
import { assignmentTests } from "../data/assignment.ts";
import { blockTests } from "../data/block.ts";
import { whileStatementTests } from "../data/while_statement.ts";
import { printStatementTests } from "../data/print_statement.ts";
import { ifStatementTests } from "../data/if_statement.ts";
import { forStatementTests } from "../data/for_statement.ts";
import { expressionStatementTests } from "../data/expression_statement.ts";
import { variableDeclarationTests } from "../data/variable_declaration.ts";
import { argumentsTests } from "../data/arguments.ts";
import { returnStatementTests } from "../data/return_statement.ts";
import { callTests } from "../data/call.ts";
import { functionDeclarationTests } from "../data/function_declaration.ts";
import { expressionTests } from "../data/expression.ts";
import { classTests } from "../data/class.ts";

Deno.test("Testing tokenize class declarations", async (context) => {
  for (const test of classTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize function declarations", async (context) => {
  for (const test of functionDeclarationTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
    test.after();
  }
});
Deno.test("Testing tokenize variable declarations", async (context) => {
  for (const test of variableDeclarationTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize expression staments", async (context) => {
  for (const test of expressionStatementTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize for staments", async (context) => {
  for (const test of forStatementTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize if staments", async (context) => {
  for (const test of ifStatementTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize print staments", async (context) => {
  for (const test of printStatementTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize return staments", async (context) => {
  for (const test of returnStatementTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize while staments", async (context) => {
  for (const test of whileStatementTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize blocks", async (context) => {
  for (const test of blockTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize expressions", async (context) => {
  for (const test of expressionTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize assignments", async (context) => {
  for (const test of assignmentTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize logic-ors", async (context) => {
  for (const test of logicOrTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize logic-ands", async (context) => {
  for (const test of logicAndTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize equalities", async (context) => {
  for (const test of equalityTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize comparisions", async (context) => {
  for (const test of comparisionTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize terms", async (context) => {
  for (const test of termTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize fanctors", async (context) => {
  for (const test of fanctorTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize unaries", async (context) => {
  for (const test of unaryTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize calls", async (context) => {
  for (const test of callTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize arguments", async (context) => {
  for (const test of argumentsTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
Deno.test("Testing tokenize primaries", async (context) => {
  for (const test of primaryTests) {
    await context.step(test.name, () => {
      const [tokens, lines] = tokenize(test.program);
      assertEquals(tokens, test.tokens);
      assertEquals(lines, test.lines);
    });
  }
});
