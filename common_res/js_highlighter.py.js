Highlighter.Brushes.Python = function() {
    var keywords =  'and assert break class continue def del elif else except exec finally for from global if import in is lambda not or pass print raise return try yield while';
    var special =  'None True False self cls class_'
    this.regexList = [
        { regex: Highlighter.RegexLib.SingleLinePerlComments,                   css: 'color:#008080' },
        { regex: new RegExp("^\\s*@\\w+", 'gm'),                                css: 'color:#ff1493' },
        { regex: new RegExp("(['\"]{3})([^\\1])*?\\1", 'gm'),                   css: 'color:#FF8000' },
        { regex: new RegExp('"(?!")(?:\\.|\\\\\\"|[^\\""\\n\\r])*"', 'gm'),     css: 'color:#990000' },
        { regex: new RegExp("'(?!')*(?:\\.|(\\\\\\')|[^\\''\\n\\r])*'", 'gm'),  css: 'color:#990000' },
        { regex: new RegExp("\\b\\d+\\.?\\w*", 'g'),                            css: 'color:red' },
        { regex: new RegExp(this.GetKeywords(keywords), 'gm'),                  css: 'color:blue' },
        { regex: new RegExp(this.GetKeywords(special), 'gm'),                   css: 'color:#8A2BE2' }
    ];
}
Highlighter.Brushes.Python.prototype  = new Highlighter.Brushe();
Highlighter.Brushes.Python.Aliases    = ['py', 'python'];