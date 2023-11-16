import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { tokenize } from "./src/token/func.ts";
import { makeAST } from "./src/ast/func.ts";
import { execute, executeProgram } from "./src/eval/func.ts";
import { Environment } from "./src/eval/type.ts";

if (import.meta.main) {
  const run = new Command()
    .description("run source code of file path")
    .option("-d --debug", "debug mode", {
      default: false,
    })
    .arguments("<file_path:string>")
    .action(({ debug }, file_path: string) => {
      const sourceCode = Deno.readTextFileSync(file_path);
      const [tokens, lineNumber] = tokenize(sourceCode);
      const [ast, leftTokens] = makeAST(tokens);
      if (debug) {
        console.log("-------------- output --------------");
      }
      execute(ast);
      if (debug) {
        console.log("--------------- meta ---------------");
        console.log(`line number: ${lineNumber}`);
        console.log(`left tokens: ${leftTokens}`);
      }
    });
  const interpret = new Command()
    .description("start interpreter")
    .action(() => {
      const environment = new Environment();
      while (true) {
        const sourceCode = prompt(">");
        if (sourceCode === null) continue;
        const [tokens] = tokenize(sourceCode);
        const [ast] = makeAST(tokens);
        executeProgram(ast, environment);
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
