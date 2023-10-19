import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { tokenize } from "./src/token/func.ts";
import { makeAST } from "./src/ast/func.ts";
import { evaluateAST } from "./src/eval/func.ts";

if (import.meta.main) {
  const run = new Command()
    .arguments("<file_path:string>")
    .description("run source code of file path")
    .action((_, file_path: string) => {
      const sourceCode = Deno.readTextFileSync(file_path);
      const [tokens, lineNumber] = tokenize(sourceCode);
      const [ast, leftTokens] = makeAST(tokens);
      const result = evaluateAST(ast);
      console.log(`type of result: ${result.type}`);
      console.log(`val of result: ${result.value}`);
      console.log(`line number: ${lineNumber}`);
      console.log(`left tokens: ${leftTokens}`);
    });
  const interpret = new Command()
    .description("start interpreter")
    .action(() => {
      while (true) {
        const sourceCode = prompt(">");
        if (sourceCode === null) continue;
        const [tokens] = tokenize(sourceCode);
        const [ast] = makeAST(tokens);
        const result = evaluateAST(ast);
        console.log(result.value);
      }
    });
  await new Command()
    .name("loxints")
    .version("v0.1.0")
    .description("light-weight script language")
    .command("run", run)
    .command("int", interpret)
    .parse(Deno.args);
}
