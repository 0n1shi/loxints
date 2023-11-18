# BNF

```txt
program             -> declaration* EOF ;

# declaration
declaration         -> classDeclaration
                    | functionDeclaration
                    | variableDeclaration
                    | statement ;
classDeclaration    -> "class" IDENTIFIER "{" function* "}" ;
functionDeclaration -> "fun" function ;
variableDeclaration -> "var" IDENTIFIER ( "=" expression )? ";" ;

function            -> IDENTIFIER "(" parameters? ")" block ;
parameters          -> IDENTIFIER ( "," IDENTIFIER )* ;

# statement
statement           -> expressionStatement
                    | forStatement
                    | ifStatement
                    | printStatement
                    | returnStatement
                    | whileStatement
                    | block ;
expressionStatement -> expression ";" ;
forStatement        -> "for" "(" ( variableDeclaration | expressionStatement | ";" ) expression?  ";" expression? ")" statement ;
ifStatement         -> "if" "(" expression ")" statement ( "else" statement )? ;
printStatement      -> "print" expression ";" ;
returnStatement     -> "return" expression? ";" ;
whileStatement      -> "while" "(" expression ")" statement ;
block               -> "{" declaration* "}" ;

# expression
expression          -> assignment ;
assignment          -> ( call "." )? IDENTIFIER "=" assignment
                    | logic_or ;
logic_or            -> logic_and ( "or" logic_and )* ;
logic_and           -> equality ( "and" equality )* ;
equality            -> comparision ( ("!=" | "==") comparision )* ;
comparision         -> term ( ( ">" | ">=" | "<" | "<=" ) term )* ;
term                -> fanctor ( ( "-" | "+" ) fanctor )* ;
fanctor             -> unary ( ( "/" | "*" ) unary )* ;
unary               -> ( "!" | "-" ) unary
                    | call
call                -> primary ( "(" arguments? ")" | "." IDENTIFIER )* ;
arguments           -> expression ( "," expression )* ;
primary             -> NUMBER
                    | STRING
                    | "true"
                    | "false"
                    | "nil"
                    | IDENTIFIER
                    | "(" expression ")"
```
