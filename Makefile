
all:
	deno compile --unstable --allow-read --output bin/lox main.ts

test:
	deno test --quiet src/

test_token:
	deno test --quiet src/token

test_ast:
	deno test --quiet src/ast

test_eval:
	deno test --quiet src/eval
