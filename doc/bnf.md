# BNF

```txt
program             -> declaration* EOF ;

# declaration
declaration         -> variableDeclaration
                    | statement ;
variableDeclaration -> "var" IDENTIFIER ( "=" expression)? ";" ;

# statement
statement           -> expressionStatement
                    | ifStatement
                    | printStatement
                    | whileStatement
                    | block ;
expressionStatement -> expression ";" ;
ifStatement         -> "if" "(" expression ")" statement ( "else" statement )? ;
printStatement      -> "print" expression ";" ;
whileStatement      -> "while" "(" expression ")" statement ;
block               -> "{" declaration* "}" ;

# expression
expression          -> assignment ;
assignment          -> IDENTIFIER "=" assignment
                    | logic_or ;
logic_or            -> logic_and ( "or" logic_and )* ;
logic_and           -> equality ( "and" equality )* ;
equality            -> comparision ( ("!=" | "==") comparision )* ;
comparision         -> term ( ( ">" | ">=" | "<" | "<=" ) term )* ;
term                -> fanctor ( ( "-" | "+" ) fanctor )* ;
fanctor             -> unary ( ( "/" | "*" ) unary )* ;
unary               -> ( "!" | "-" ) unary
                    | primary
primary             -> NUMBER
                    | STRING
                    | "true"
                    | "false"
                    | "nil"
                    | IDENTIFIER
                    | "(" expression ")"
```
