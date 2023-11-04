import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { tokenize } from "../../token/func.ts";
import { primaryTests } from "../../test/data/primary.ts";
import { unaryTests } from "../../test/data/unary.ts";
import { fanctorTests } from "../../test/data/fanctor.ts";
import { termTests } from "../../test/data/term.ts";
import { comparisionTests } from "../../test/data/comparision.ts";
import { equalityTests } from "../../test/data/equality.ts";

Deno.test("Testing tokenize primaries", async (context) => {
  for (const test of primaryTests) {
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

Deno.test("Testing tokenize fanctors", async (context) => {
  for (const test of fanctorTests) {
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

Deno.test("Testing tokenize comparisions", async (context) => {
  for (const test of comparisionTests) {
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
