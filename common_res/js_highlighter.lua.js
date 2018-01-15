Highlighter.Brushes.Lua = function() {
    var keywords = 'and do else elseif end function if local nil not or repeat return then until while';

    var funcs = 'abs acos appendto ascii asin assert atan atan2 call ceil clock collectgarbage copytagmethods cos date deg dofile dostring error execute exit floor foreach foreachvar format frexp getbinmethod getenv getglobal gettagmethod gsub ldexp log log10 max min mod newtag next nextvar print rad random randomseed rawgetglobal rawgettable rawsetglobal rawsettable read readfrom remove rename seterrormethod setglobal setlocale settag settagmethod sin sqrt strbyte strchar strfind strlen strlower strrep strsub strupper tag tan tmpname tonumber tostring type write writeto';

    var methods = 'cgi cgilua cgilua_url char2hexa chdir dbluaerrorfb dblua_escape decode default_script encodecgi encodetable escape filetype getvalue hexa hexa2char html_mask includehtml insertfield lua_mask maketable map mkurl nopipe preprocess redirect relativeurl relative_url saveluavar savestate script_path script_pdir script_vdir stateerrormethod statefile stdin strsplit unescape';
    
    var packages = 'PI _INPUT _OUTPUT _STDERR _STDIN _STDOUT DBClose DBExec DBOpen DBRow';
    
    var operators =    '\\$nodebug\\b|\\.{2,3}|\\b\\$debug \\$else \\$end \\$endinput \\$if \\$ifnot';

    this.regexList = [
        { regex: new RegExp('--(.*)$', 'gm'),                css: 'color:seagreen' },
        { regex: Highlighter.RegexLib.DoubleQuotedString,        css: 'color:seagreen' },
        { regex: Highlighter.RegexLib.SingleQuotedString,        css: 'color:seagreen' },
        { regex: new RegExp(this.GetKeywords(keywords), 'gmi'),        css: 'color:darkblue;font-weight:bold;font-style:italic' },
        { regex: new RegExp(this.GetKeywords(funcs), 'gmi'),        css: 'color:mediumvioletred;font-weight:bold' },
        { regex: new RegExp(this.GetKeywords(methods), 'gmi'),        css: 'color:chocolate;font-weight:bold' },
        { regex: new RegExp(this.GetKeywords(packages), 'gmi'),        css: 'color:darkred' },
        { regex: new RegExp(this.GetKeywords(operators), 'gmi'),    css: 'color:firebrick' }
    ];
}
Highlighter.Brushes.Lua.prototype    = new Highlighter.Brushe();
Highlighter.Brushes.Lua.Aliases    = ['lua'];