import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";

type Account = Admin | User;

class Admin {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

if (import.meta.main) {
  const account: Account = new Admin("Mike");
  console.log(account instanceof User);
  console.log(account instanceof Admin);
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
