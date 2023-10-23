
all:
	deno compile --unstable --allow-read --output bin/lox main.ts

test:
	deno test src/

test_token:
	deno test src/token

test_ast:
	deno test src/ast

test_eval:
	deno test src/eval
