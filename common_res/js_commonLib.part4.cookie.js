/*
========================
commonlib cookie functions for nga
------------
(c), Zeg, All Rights Reserved
Distributed under GPLv3 license
========================
*/


var __COOKIE = {
cookieCache:{},
domain:'',
path:'/',
date:null,
now:0,
misccookiename:'',

init:function (domain,path,misccookiename){
if (domain)
	this.domain = domain;
else
	this.domain = window.location.href.toLowerCase().replace(/^http:\/\//,'').replace(/(\/|:).*/,'')/*.replace(/^[^\.]+\.([^\.]+\.)/,'$1');*/
//this.path = path;
this.date = new Date;
this.now = this.date.getTime();
if(misccookiename)
	this.misccookiename = misccookiename
},//fe

setCookieInSecond:function (name,value,sec){
if(!this.domain)
	this.init()
if(sec == 0){
	var sec = (__SETTING && __SETTING.uA[0]==1) ? '' : 'expires=0'//session cookie
	}
else{
	this.date.setTime(0)
	this.date.setTime(this.now + sec*1000)
	var sec = 'expires=' + this.date.toUTCString()
	}
document.cookie = name + "="+ escape (value) + ";domain="+this.domain+";path="+this.path+";" + sec;
},//fe

deleteCookie:function(name){
this.setCookieInSecond(name,'',-1000)
},//fe

setMiscCookieInSecond:function (name,value,sec)
{
if(!this.misccookiename)
	return
this.extractMiscCookie()
var c = this.cookieCache[this.misccookiename]
if(sec===undefined && c[name]){
	c[name][0] = value	
	}
else if (sec>0){
	this.date.setTime(this.now + sec*1000);
	c[name] = {
		0:value,
		1:Math.floor(this.date.getTime()/1000)
		};
	}
else
	delete c[name];
this.setCookieInSecond(this.misccookiename,this.json_encode(c),31536000);
},//fe

extractMiscCookie:function(){
var c = this.cookieCache, n = this.misccookiename
if (typeof c[n] != 'object'){
	this.getCookie(n);
	if (typeof(c[n])=='string'){
		if(c[n].charAt(0)=='{'){
			var tmp = {},reset=false
			try{eval('var tmp='+c[n]+';');}catch(e){}
			
			for(var k in tmp){
				//old comparative
				if(tmp[k].t){
					tmp[k][1] = tmp[k].t
					delete(tmp[k].t)
					reset=true
					}
				if(tmp[k].v){
					tmp[k][0] = tmp[k].v
					delete(tmp[k].v)
					reset=true
					}
				if(typeof tmp[k][1]=='string'){
					tmp[k][1] = Math.floor(Date.parse(tmp[k].t)/1000)
					reset=true
					}
				//----------------	
					
				if(tmp[k][1]*1000<this.now){
					delete tmp[k]
					reset=true
					}
				}

			if(reset)
				this.setCookieInSecond(n,this.json_encode(tmp),31536000);

			c[n] = tmp;
			}
		else
			c[n]={}
		}
	else
		c[n]={}
	}
},//fe

getMiscCookie:function (name)
{
if(!this.misccookiename)
	return
this.extractMiscCookie()
var c = this.cookieCache[this.misccookiename]
if (c[name]){
	if(c[name][1]*1000>=this.now)
		return c[name][0]
	else{
		delete c[name]
		this.setCookieInSecond(this.misccookiename,this.json_encode(c),31536000);
		}
	}
return null
},//fe

getCookie:function (name){
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
},//fe

ifMiscCookie:function (){
if(!this.misccookiename)
	return
if (typeof(this._ifMiscCookie)=='boolean') return this._ifMiscCookie;
else if (document.cookie.match(new RegExp("(?:^| )"+this.misccookiename+"="))) this._ifMiscCookie = true;
else this._ifMiscCookie = false;
return this._ifMiscCookie;
},//fe

/**
 *简单的json编码
 *并非严格json编码 只是javascipt可以正确识别的格式
 */
json_encode:function(v) { 
switch (typeof(v)) { 
	case 'string':
		return '"' + v.replace(/"|\n|\\/g,function($0){return $0=='"' ? '\\"' : $0=='\n' ? '\\n' : '\\\\'}) + '"';
	case 'number':
		return v.toString(10);
	case 'boolean':
		return v.toString();
	case 'object':
		if(v==null)return 'null'
		var buf = []
		if (v.constructor==Array){
			for (var i=0;i<v.length;i++)
				buf.push(this.json_encode(v[i]));
			return '[' + buf.join(',') + ']';
			}
		else{
			for (var k in v){
				if (isNaN(parseInt(k,10)))
					buf.push('"'+k.replace('"','\\"') + '":' + this.json_encode(v[k]));
				else
					buf.push(k + ':' + this.json_encode(v[k]));
				}
			return '{' + buf.join(',') + '}';
			}
	default: 
		return 'null';
	}
},//fe

json_decode:function(txt){
	var x = null
	try{eval('x = '+txt)}
	catch (e){}
	return x
	}//fe
}//ce