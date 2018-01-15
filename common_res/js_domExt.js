var domExtPrototype={ 
'each':function(fn) { 
	var s = this.self 
	if (s.els) 
		for ( var i = 0, len = s.els.length; i<len; ++i ) 
			fn.call(s.els[i]); 
	else 
		fn.call(s) 
	return s; 
	}, 
'cls':function(cn) { 
	this.each(function(){this.className += ' '+cn;}); 
	return this.self; 
	}, 
'css':function(o,v) { 
	if (v) 
		this.each(function(){this.style[o] = v;}); 
	else 
		for (var prop in o)  
			this.css(prop, o[prop]); 
	return this.self; 
	}, 
'on':function(type, fn) { 
	var listen = function(el) { 
			if (window.addEventListener) { 
				el.addEventListener(type, fn, false); 
			} else if (window.attachEvent) { 
				el.attachEvent('on'+type, function() {fn.call(el, window.event);}); 
			} 
		}; 
	this.each(function(){listen(this);}); 
	return this.self; 
	}, 
'attr':function(o,v) { 
	if (v) 
		this.each(function(){this[o] = v;}); 
	else 
		for (var prop in o)  
			this.attr(prop, o[prop]); 
	return this.self; 
	}, 
'aC':function() { 
	var o = this.self; 
	var i=0; 
	if (typeof arguments[0]=='number') 
		{ 
		i=1; 
		if (o.els) 
			o = o.els[arguments[0]] 
		} 
	if (arguments[i+1]) 
		for (;i<arguments.length;i++) 
			o.appendChild(arguments[i]); 
	else 
		o.appendChild(arguments[i]) 
	return o; 
	} 
}//oe 

window.$ = function (){ 
var els={} 
var m=null 
var single=true 
for (var i=0,j=0;i<arguments.length;++i,++j) 
	{ 
	var e = arguments[i]; 
	if (typeof e == 'string') { 
		if (e.indexOf('<')==0){ 
			if(m = e.match(/^<(\/?)([a-zA-Z0-9]+)(\/?)>$/)){ 
				if (m[3] || m[1]) 
					els[j] = document.createElement(m[2]); 
				else{ 
					m =document.getElementsByTagName(m[2]) 
					for (var ii=0;ii<m.length;ii++,++j) 
						els[j]=m[ii]; 
					--j; 
					single=false 
					} 
				} 
			else{ 
				m = e.match(/^<([a-zA-Z0-9]+)>(.*?)<\/([a-zA-Z0-9]+)>$/) 
				if(m && m[1]==m[3]){ 
					els[j] = document.createElement(m[1]); 
					if(m[2])e.innerHTML=m[2]; 
					} 
				else 
					els[j]=null 
				} 
			} 
		else 
			els[j] = document.getElementById(e); 
		} 
	else 
		els[j] = e 
	} 
els.length = j; 
if(arguments.length==1 && single) 
	{ 
	if(!els[0])return null; 
	var o = els[0]; 
	o._=function(){} 
	o._.prototype=domExtPrototype 
	o._ = new o._ 
	} 
else 
	{ 
	var o = els; 
	o._=function(){} 
	o._.prototype=domExtPrototype 
	o._ = new o._ 
	o._.els=o; 
	} 
o._.self = o 
return o; 
}//fe 

/*
//新建元素 
var x = $('<span/>') 
var x = $('<span>abcd</span>') 
//用id取元素 
var x = $('xxoo') 
//用名字取元素 
var x = $('<span>') 
//链式调用 
$('xxoo')._.cls('xxxxoooo')._.attr('title','abcd')._.aC($('<span/>'),$('<div/>')) 
//一次取多个元素 
var muti = $('<span>','<div>','xxoo') 
var first = muti[0] 
var firstOneWithMoreFunction = $(muti[0]) 
*/