import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { evaluatePrimary } from "../func.ts";
import { primaryTests } from "../../test/data/primary.ts";

Deno.test("Testing ast for function declarations", async (context) => {
  for (const test of primaryTests) {
    await context.step(test.name, () => {
      const value = evaluatePrimary(test.ast, test.environmentBefore);
      assertEquals(value, test.value);
      assertEquals(test.environmentBefore, test.environmentAfter);
    });
  }
});
