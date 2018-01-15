/*
 * SyCODE Syntax Highlighter
 * Version 1.0.0
 * Copyright (C) 2007-2008 Muchool.com
 * http://www.muchool.com
 *
 * example: Highlighter.Execute(cleanCode, language);
 *
 * This library is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General 
 * Public License as published by the Free Software Foundation; either version 2.1 of the License, or (at your option) 
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied 
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more 
 * details.
 *
 * You should have received a copy of the GNU Lesser General Public License along with this library;if not, write to 
 * the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA 
 */

var Highlighter = {
	Color:{
		'skyblue':'skyblue',
		'royalblue':'royalblue',
		'darkblue':'darkblue',
		'orangered':'orangered',
		'crimson':'crimson',
		'firebrick':'firebrick',
		'darkred':'darkred',
		'limegreen':'limegreen',
		'seagreen':'seagreen',
		'teal':'teal',
		'deeppink':'deeppink',
		'tomato':'tomato',
		'coral':'coral',
		'purple':'purple',
		'indigo':'indigo',
		'burlywood':'burlywood',
		'sandybrown':'sandybrown',
		'sienna':'sienna',
		'chocolate':'chocolate',
		'orange':'#A06700',
		'green':'#3D9F0E',
		'gray':'#555',
		'red':'#D00',
		'blue':'#06B',
		'silver':'#888'
	},
	Brushes: {},
	RegexLib: {
		MultiLineCComments : new RegExp('/\\*[\\s\\S]*?\\*/', 'gm'),
		SingleLineCComments : new RegExp('//.*$', 'gm'),
		SingleLinePerlComments : new RegExp('#.*$', 'gm'),
		DoubleQuotedString : new RegExp('"(?:\\.|(\\\\\\")|[^\\""\\n])*"','g'),
		SingleQuotedString : new RegExp("'(?:\\.|(\\\\\\')|[^\\''\\n])*'", 'g')
	},
	Match: function(value, index, css) {
		this.value = value;
		this.index = index;
		this.length = value.length;
		this.css = css;
	},
	Execute: function(str,lang) {
		var registered = new Object();
		var self = this;
		this.linecount=0;
		for(var brush in Highlighter.Brushes)
		{
			var aliases = Highlighter.Brushes[brush].Aliases;
			if(aliases == null) continue;
			for(var i=0;i<aliases.length;i++) registered[aliases[i].toLowerCase()] = brush;
		};
		if(!!registered[lang.toLowerCase()]) {
			var ht = new Highlighter.Brushes[registered[lang.toLowerCase()]]();
			return ht.Highlight(str);
		}
		else {
			str = str.replace(/&/g, '&amp;');
			str = str.replace(/</g, '&lt;');
			str = str.replace(/>/g, '&gt;');
			str = str.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
			str = str.replace(/[ ]{2}/g, '&nbsp;&nbsp;');
			return str.replace(/\n/g, '<br/>');
		}
	}
};

Highlighter.Brushe = new Function();
Highlighter.Brushe.SortCallback = function(m1, m2) {
	if(m1.index < m2.index)
		return -1;
	else if(m1.index > m2.index)
		return 1;
	else
	{
		if(m1.length < m2.length)
			return -1;
		else if(m1.length > m2.length)
			return 1;
	}
	return 0;
}
Highlighter.Brushe.prototype = {
	GetMatches: function(regex, css) {
		var index = 0;
		var match = null;
	
		while((match = regex.exec(this.code)) != null)
			this.matches.push(new Highlighter.Match(match[0], match.index, css));
	},
	AddBit: function(str, css) {
		if(str == null || str.length == 0)
			return;
		var self = this;
		str = str.replace(/&/g, '&amp;');
		str = str.replace(/</g, '&lt;');
		str = str.replace(/>/g, '&gt;');
		str = str.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
		str = str.replace(/[ ]{2}/g, '&nbsp;&nbsp;');
		str = str.replace(/\n/g, 
			function(){
				self.linecount++;
				return "<br/>";
				}
			);
		if(css != null)
		{
			this.buffer.push('<span style="' + css + '">' + str + '</span>');
		}
		else
		{
			this.buffer.push(str);
		}
	},
	ProcessRegexList: function() {
		for(var i = 0; i < this.regexList.length; i++)
			this.GetMatches(this.regexList[i].regex, this.regexList[i].css);
	},
	Highlight: function(code) {
		function Trim(str)
		{
			return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
		}
	
		function Unindent(str)
		{
			var lines = str.split('\n');
			var indents = new Array();
			var regex = new RegExp('^\\s*', 'g');
			var min = 1000;
	
			for(var i = 0; i < lines.length && min > 0; i++)
			{
				if(Trim(lines[i]).length == 0)
					continue;
					
				var matches = regex.exec(lines[i]);
	
				if(matches != null && matches.length > 0)
					min = Math.min(matches[0].length, min);
			}
	
			if(min > 0)
				for(var i = 0; i < lines.length; i++)
					lines[i] = lines[i].substr(min);
	
			return lines.join('\n');
		}
		
		function Copy(string, pos1, pos2)
		{
			return string.substr(pos1, pos2 - pos1);
		}
		
		if(code == null)
			code = '';
		
		this.originalCode = code;
		this.code = Unindent(code);
		this.buffer = new Array();
		this.matches = new Array();
		this.linecount=1;
	
		this.ProcessRegexList();
		
		if(this.matches.length == 0)
		{
			this.AddBit(this.code, null);
			return this.buffer.join('');
		}
	
		this.matches = this.matches.sort(Highlighter.Brushe.SortCallback);
	
		var pos	= 0;
		for(var i = 0; i < this.matches.length; i++)
		{
			var match = this.matches[i];
	
			if(match == null || match.length == 0)
				continue;
	
			if(match.index >= pos)
			{
				this.AddBit(Copy(this.code, pos, match.index), null);
				this.AddBit(match.value, match.css);
				pos = match.index + match.length;
			}
		}
		
		this.AddBit(this.code.substr(pos), null);
		return '<div>'+this.GetLineNo(this.linecount)+'<div style="white-space:nowrap;float:left;overflow:auto;margin-left:25px">'+this.buffer.join('')+'</div><div style="clear:both;height:0;line-height:0;font-size:0"></div></div>';
	},
	GetKeywords: function(str) {
		return '\\b' + str.replace(/\s+/g, '\\b|\\b') + '\\b';
	},
	GetKeywordsCSS: function(str) {
		return '\\b([a-z_]|)' + str.replace(/ /g, '(?=:)\\b|\\b([a-z_\\*]|\\*|)') + '(?=:)\\b';
	},
	GetValuesCSS: function(str) {
		return '\\b' + str.replace(/ /g, '(?!-)(?!:)\\b|\\b()') + '\:\\b';
	},
	GetLineNo: function (l){
		var x ='';
		var y ='';
		for (var i=1; i<=l; i++)
			{
			x += i+':<br/>';
			}
		return "<div unselectable='on' onselectstart='return false' style='-moz-user-select:none;color:gray;float:left;margin-right:-25px;text-align:right'>"+x+"</div>";
	}
}