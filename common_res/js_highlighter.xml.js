Highlighter.Brushes.Xml = function() {
	this.regexList = [
		{ regex: new RegExp('(\\&lt;|<)\\![\\s\\w]+[\\s\\S]*?(\\&gt;|>)', 'gm'),			css: 'color:#ff1493' },
		{ regex: new RegExp('(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)', 'gm'),		css: 'color:#808080' },
		{ regex: new RegExp('(\\&lt;|<)\\!--[\\s\\S]*?--(\\&gt;|>)', 'gm'),				css: 'color:#006600' },
		{ regex: new RegExp('\\b[\\w\\?\\-:]+(?=(\\s*=[^<>]*>))', 'gm'),				css: 'color:red' },
		{ regex: new RegExp('xsl:[\\w-]+(?=([\\s\\S]*=[\\s\\S]*)|(\\s*\\?*(\\&gt;|>)+))', 'gmi'),	css: 'color:#50AF98' },
		{ regex: new RegExp('(\\&lt;|<)/?((?!xsl:)[/\\w\\?-]*)?(?!\\!|-|\\])|/*\\?*(\\&gt;|>)', 'gmi'),	css: 'color:blue' }
	];
}
Highlighter.Brushes.Xml.prototype	= new Highlighter.Brushe();
Highlighter.Brushes.Xml.Aliases	= ['asp', 'jsp', 'aspx', 'htt', 'htx', 'phtml', 'wml', 'rss', 'xhtml', 'shtml', 'dhtml', 'dtd', 'html', 'htm', 'xhtml', 'xml', 'xsd', 'xsl', 'xslt', 'config'];