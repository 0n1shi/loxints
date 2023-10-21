# BNF

```txt
program             -> statement* EOF ;

# statement
statement           -> expressionStatement | printStatement
expressionStatement -> expression ";" ;
printStatement      -> "print" expression ";" ;

# expression
expression          -> equality ;
equality            -> comparision ( ("!=" | "==") comparision )* ;
comparision         -> term ( ( ">" | ">=" | "<" | "<=" ) term )* ;
term                -> fanctor ( ( "-" | "+" ) fanctor )* ;
fanctor             -> unary ( ( "/" | "*" ) unary )* ;
unary               -> ( "!" | "-" ) unary | primary
primary             -> NUMBER | STRING | "true" | "false" | "nil" | "(" expression ")"
```
