import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";

if (import.meta.main) {
  const runCommand = new Command()
    .arguments("<file_path:string>")
    .description("run source code of file path")
    .action((options: any, file_path: string) => {
      console.log("run source code");
    });
  await new Command()
    .name("loxints")
    .version("v0.1.0")
    .description("light-weight script language")
    .command("run", runCommand)
    .parse(Deno.args);
}
