import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { evaluateCall, evaluatePrimary } from "../func.ts";
import { primaryTests } from "../../test/data/primary.ts";
import { callTests } from "../../test/data/call.ts";

Deno.test("Testing evaluation of primary", async (context) => {
  for (const test of primaryTests) {
    await context.step(test.name, () => {
      const value = evaluatePrimary(test.ast, test.environmentBefore);
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
