syntax keyword nil nil

syntax keyword function print
syntax keyword function mod
syntax keyword function clock
syntax keyword function fun

syntax keyword statement class
syntax keyword statement if
syntax keyword statement else
syntax keyword statement for
syntax keyword statement while
syntax keyword statement return

syntax keyword var var

syntax region string start=+"+ end=+"+
syntax region comment start=+//+ end=+\n+

syntax keyword boolean true
syntax keyword boolean false
syntax keyword boolean nil

syntax keyword logic and
syntax keyword logic or

syntax iskeyword @,!,+,-,*,/,>,<,=
syntax keyword operator !
syntax keyword operator +
syntax keyword operator -
syntax keyword operator *
syntax keyword operator /
syntax keyword operator >
syntax keyword operator <
syntax keyword operator =

highlight link class Class
highlight link nil Special
highlight link function Function
highlight link var Define
highlight link string String
highlight link statement Statement
highlight link logic Operator
highlight link operator Operator
highlight link comment Comment


" Error          xxx ctermfg=204 guifg=#e06c75
" Todo           xxx ctermfg=170 guifg=#c678dd
" String         xxx ctermfg=114 guifg=#98c379
" Constant       xxx ctermfg=38 guifg=#56b6c2
" Character      xxx ctermfg=114 guifg=#98c379
" Number         xxx ctermfg=173 guifg=#d19a66
" Boolean        xxx ctermfg=173 guifg=#d19a66
" Float          xxx ctermfg=173 guifg=#d19a66
" Function       xxx ctermfg=39 guifg=#61afef
" Identifier     xxx ctermfg=204 guifg=#e06c75
" Conditional    xxx ctermfg=170 guifg=#c678dd
" Statement      xxx ctermfg=170 guifg=#c678dd
" Repeat         xxx ctermfg=170 guifg=#c678dd
" Label          xxx ctermfg=170 guifg=#c678dd
" Operator       xxx ctermfg=170 guifg=#c678dd
" Keyword        xxx ctermfg=170 guifg=#c678dd
" Exception      xxx ctermfg=170 guifg=#c678dd
" Include        xxx ctermfg=39 guifg=#61afef
" PreProc        xxx ctermfg=180 guifg=#e5c07b
" Define         xxx ctermfg=170 guifg=#c678dd
" Macro          xxx ctermfg=170 guifg=#c678dd
" PreCondit      xxx ctermfg=180 guifg=#e5c07b
" StorageClass   xxx ctermfg=180 guifg=#e5c07b
" Type           xxx ctermfg=180 guifg=#e5c07b
" Structure      xxx ctermfg=180 guifg=#e5c07b
" Typedef        xxx ctermfg=180 guifg=#e5c07b
" Tag            xxx cleared
" Special        xxx ctermfg=39 guifg=#61afef
" SpecialChar    xxx ctermfg=173 guifg=#d19a66
" Delimiter      xxx cleared
" SpecialComment xxx ctermfg=59 guifg=#5c6370
" Debug          xxx cleared

