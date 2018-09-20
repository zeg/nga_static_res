/*
========================
commonlib forward compatible and old functions for nga
方法兼容转换 和一些不再使用的方法
------------
(c), Zeg, All Rights Reserved
Distributed under GPLv3 license
========================
*/


//==================================
//forward compatible for nga
//兼容转换
//==================================
var httpDataGetter={script_muti_get:function(u,h,hf,c,cN){
var a = {
	u:u,
	f:h,
	ff:hf,
	c:(typeof(c)=='object' ? c.charset : c),
	n:(cN ? cN : typeof(c)=='object' ? c.varName : null) 
	}
return __NUKE.doRequest(a)
}
}


if (!__IMG_BASE)
{
var __AJAX_DOMAIN = window.location.href.toLowerCase().replace(/^http:\/\//,'').replace(/(\/|:).*/,'').replace(/^[^\.]+\.([^\.]+\.)/,'$1');
var __IMG_BASE = 'http://img.'+__AJAX_DOMAIN;
var __CKDOMAIN = '.'+__AJAX_DOMAIN;
}

var /*w_i = loader.w_i, w_s = loader.w_s,*/ id2e = $, cookieFuncs = __COOKIE, tTip={showdscp:function(e,o){return o._.show ? o._.show(e) : __NUKE.position.setPos(o,e)}};

if(!window.console)
	var console = {log:function(){}}

var loader = __LOADER

if(window.__SCRIPTS)
	__LOADER.script = function(src,callback,charset,sync){
		return __SCRIPTS.load(src,callback,charset,sync)
		}

__NUKE.doRequest = _$.doRequest
__NUKE.doPost = _$.doPost

//==================================
//old functions for nga
//不再使用的方法
//==================================

/**
 *
 */
__NUKE.getDocSize=function(){
var p = this.position.get()
p.sW = p.pw
p.sH = p.ph
p.cW = p.cw
p.cH = p.ch
p.sL = p.xf
p.sT = p.yf
return p
}//fe

/**
 *一种简单的编码 
 */
__NUKE.scEn=function (v,no){
switch (typeof(v)) { 
	case 'string':
		return v.replace(/~/g,'');
	case 'number':
		return v.toString(10);
	case 'boolean':
		return v?1:0
	case 'object':
		if(no)return ''
		var buf=[]
		for (var k in v)
			buf.push(this.scEn(k,1) + '~' + this.scEn(v[k],1));
		return buf.join('~');
	default: 
		return '';
	}
}//fe

/**
 *一种简单的编码的解码
 */
__NUKE.scDe=function (s){
s = s.split('~')
if(s.length==1)return s
var v={}
for (var i=0;i<s.length;i+=2)
	v[s[i]]=s[i+1]
return v
},//fe

/**
 *
 */
__NUKE.toInt=function(n){
var n = parseInt(n,10)
if(!n)n=0
return n
}//fe


/*
 *增加子节点
 *@param node , node , node , node , node , node ...
 *node为null时忽略
 *node为string时node=$(node)
 *node为array时 insertBefore(node.0,node.1)
 */
domExtPrototype.aC=function(){
	var o = this.self, i=0, a=arguments
	for (;i<a.length;i++){
		if(a[i]===null)continue
		if(a[i].constructor==Array){
			if(typeof(a[i][0])=='string')a[i][0]=$(a[i][0])
			o.insertBefore(a[i][0],a[i][1])
			}
		else{
			if(typeof(a[i])=='string')a[i]=$(a[i])
			o.appendChild(a[i])
			}
		}
	return o;
	}
	
/*
 *保存数据
 *@param name , value
 */
domExtPrototype.sV=function (o,v){
	if(!this.anyVar)this.anyVar={}
	if (v!==undefined) 
		this.anyVar[o]=v
	else 
		for (var k in o)  
			this.sV(k, o[k]) 
	return this.self
	}
/*
 *取出数据
 *@param name
 */
domExtPrototype.gV=function (k){
	if(!this.anyVar)this.anyVar={}
	return this.anyVar[k] 
	}