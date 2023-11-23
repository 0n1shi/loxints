
all:
	deno compile --unstable --allow-read --output bin/lox main.ts

test:
	deno test --quiet src/

test_token:
	deno test --quiet src/test/token_test.ts

test_ast:
	deno test --quiet src/test/ast_test.ts

test_eval:
	deno test --quiet src/test/eval_test.ts
