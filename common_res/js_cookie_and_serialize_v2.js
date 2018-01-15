<!--
if (!__IMG_BASE)
{
var __AJAX_DOMAIN = window.location.href.toLowerCase().replace(/^http:\/\//,'').replace(/(\/|:).*/,'').replace(/^[^\.]+\.([^\.]+\.)/,'$1');
var __IMG_BASE = 'http://img.'+__AJAX_DOMAIN;
var __CKDOMAIN = '.'+__AJAX_DOMAIN;
}

function cookieAndSerialize(domain,path,misccookiename)
{
this.cookieCache = {};
if (domain)
	{
		this.domain = domain;
	}
else
	{
		this.domain = window.location.href.toLowerCase().replace(/^http:\/\//,'').replace(/(\/|:).*/,'').replace(/^[^\.]+\.([^\.]+\.)/,'$1');
		if (this.domain.indexOf('ngacn.com')!=-1)
			{
				this.domain = '.ngacn.com';
			}
	}
this.path = path;
this.date = new Date;
this.now = this.date.getTime();
this.misccookiename = misccookiename

this.setCookieInSecond = function (name,value,sec)
{
this.date.setTime(this.now + sec*1000);
document.cookie = name + "="+ escape (value) + ";domain="+this.domain+";path="+this.path+";expires=" + this.date.toUTCString();
}
//fe

this.setMiscCookieInSecond = function (name,value,sec)
{
this.extractMiscCookie();
if (sec>0)
	{
		this.date.setTime(this.now + sec*1000);
		this.cookieCache[this.misccookiename][name] = {};
		this.cookieCache[this.misccookiename][name]['v'] = value;
		this.cookieCache[this.misccookiename][name]['t'] = this.date.toUTCString();
	}
else
	{
		delete this.cookieCache[this.misccookiename][name];
	}
this.setCookieInSecond(this.misccookiename,this.json_encode(this.cookieCache[this.misccookiename]),31536000);
}
//fe

this.extractMiscCookie = function()
{
var c = this.cookieCache
var n = this.misccookiename;
if (typeof(c[n]) != 'object')
	{
		this.getCookie(n);
		if (typeof(c[n])=='string'){
			if(c[n].charAt(0)=='a')
				c[n] = this.simpTxtAryPhpUnserialize(c[n]);
			else if(c[n].charAt(0)=='{'){
				var tmp = {}
				try{eval('var tmp='+c[n]+';');}catch(e){}
				c[n] = tmp;
				}
			else{
				c[n]={}
				}
			}
		else
			c[n]={}
	}
}

this.getMiscCookie = function (name)
{
this.extractMiscCookie();
if (this.cookieCache[this.misccookiename][name] && (Date.parse(this.cookieCache[this.misccookiename][name]['t'])>=this.now) )
	{
		return this.cookieCache[this.misccookiename][name]['v'];
	}
else
	{
		if (this.cookieCache[this.misccookiename][name])
			{
				delete this.cookieCache[this.misccookiename][name];
				this.setCookieInSecond(this.misccookiename,this.json_encode(this.cookieCache[this.misccookiename]),31536000);
			}
		return null;
	}
}
//fe

this.getCookie = function (name)
{
if (typeof(this.cookieCache[name])=='undefined')
	{
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if (arr)
			{
				this.cookieCache[name] = unescape(arr[2]);
			}
		else
			{
				this.cookieCache[name] = null;
			}
	}
return this.cookieCache[name];
}
//fe

this.ifMiscCookie = function ()
{
if (typeof(this._ifMiscCookie)=='boolean') return this._ifMiscCookie;
else if (document.cookie.match(new RegExp("(?:^| )"+this.misccookiename+"="))) this._ifMiscCookie = true;
else this._ifMiscCookie = false;
return this._ifMiscCookie;
}
//fe

//only array/string type avilable,no mutibyte char
this.simpTxtAryPhpSerialize = function (a)
{
var s = "";
var i = 0;
for (k in a)
	{
		if (typeof(a[k]) == 'object')
			{
				s = s + "s:" + String(k).length + ':"' + String(k) + '";'+ this.simpTxtAryPhpSerialize (a[k]);
				i++;
			}
		else if (typeof(a[k]) != 'undefined')
			{
				s = s + "s:" + String(k).length + ':"' + String(k) + '";s:' + String(a[k]).length + ':"' + String(a[k]) + '";';
				i++;
			}
	}
s = "a:" + i + ":{" + s + "}";
return s;
}
//fe

//only array/string type avilable,no mutibyte char
this.simpTxtAryPhpUnserialize = function (txt)
{
	if(!txt)return {};
	function cut1()
	{
	var t;
	var l;
	var x;
	txt = txt.replace(/["};]*;?(s|a):(\d+):["{]?/,function($0,$1,$2)
		{
			t = $1;
			l = $2;
			return ('');
		}
	);
	if (t == 's')
		{
			x = txt.substr(0,l);
			txt = txt.substr(l);
		}
	else if (t == 'a')
		{
			txt = 'a:'+l+':{'+txt;
			x = rep();
		}
	return (x);
	}
	function rep()
	{
		var total;
		var i = 0;
		var a = {};
		txt = txt.replace(/"|}?;?(a):(\d+):\{?/,function($0,$1,$2)
			{
				total = $2;
				return ('');
			}
		);
		while (i<total)
			{
				a[cut1()]=cut1();
				i = i+1;
			}
		return (a);
	}
return (rep());
}
//fe


this.json_encode=function(v) { 
switch (typeof(v)) { 
	case 'string':
		return '"' + v.replace('"','\\"') + '"';
	case 'number':
		return v.toString(10);
	case 'boolean':
		return v.toString();
	case 'object':
		var buf = []
		for (var k in v)
			{
			if (typeof(k)=='string')
				buf.push('"'+k.replace('"','\\"') + '":' + this.json_encode(v[k]));
			else
				buf.push(k + ':' + this.json_encode(v[k]));
			}
		if (v.constructor==Array)
			return '[' + buf.join(',') + ']';
		else
			return '{' + buf.join(',') + '}';
	default: 
		return 'null';
	}
}//fe

}//ce
-->