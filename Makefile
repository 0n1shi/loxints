
.PHONY: clean test

test:
	deno test src/

test_token:
	deno test src/ast

test_ast:
	deno test src/ast

test_eval:
	deno test src/ast
