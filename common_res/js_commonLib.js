/*
========================
commonlib misc functions for nga
------------
(c), Zeg, All Rights Reserved
Distributed under GPLv3 license
========================
*/


window.$ = function(id){return document.getElementById(id)}
window.put = function(txt){document.write(txt)}

var __NUKE = {
	
_w : window,
_d : window.document,

/**
 *简单的复制一个object
 */
simpleClone : function (o){
if(o == null || typeof(o) != 'object')
	return o;
var oo = new o.constructor(); // changed (twice)
for(var k in o)
	oo[k] = this.simpleClone(o[k]);
return oo;
},//fe

/**
 *生成一个新object 继承于参数object
 */
inheritClone : function (o){
if(o == null || typeof(o) != 'object')
	return o;
var oo =function(){};
oo.prototype=o
return new oo;
},//fe


/*
 *获取css/event等浏览器兼容属性名 用第一个属性检测 生成后面一系列的兼容名称
 *第一个参数 用于检测的obj
 *第i个参数 属性名(首字母小写 之后每词首字母大写)
 *第i+1个参数 属性名的类型 1 style 2 event 3 css (event类型的检测在ff中有问题
 */
cpblName : function(){
var a = arguments, x=[], w,
l=function(x){return x.replace(/[A-Z]/g,function($0){return '-'+$0.toLowerCase()})},
u = function(x){return x.substr(0,1).toUpperCase()+x.substr(1)},
c={0:'moz',1:'webkit',2:'ms',3:'o',4:'khtml'}
if(a[2]==1){
	if(a[1] in a[0])
		x[0] = a[1]
	else{
		a[1] = u(a[1])
		for(var i=0;i<5;i++){
			if(c[i]+a[1] in a[0]){
				x[0] = c[i]+a[1]
				break
				}
			}
		}
	}
else if(a[2]==2){
	w = a[1].toLowerCase()
	if('on'+l in a[0])
		x[0] = w
	else{
		for(var i=0;i<5;i++){
			if('on'+c[i]+w in a[0]){
				x[0] = c[i]+u(a[1])
				break
				}
			}
		}
	}
else{
	if(a[1] in a[0])
		x[0] = l(a[1])
	else{
		w = u(a[1])
		for(var i=0;i<5;i++){
			if(c[i]+w in a[0]){
				x[0] = '-'+c[i]+'-'+l(a[1])
				break
				}
			}
		}
	}
if(x[0]===undefined)
	return []
for(var j=3;j<a.length;j+=2){
	if(a[j+1]==1)
		x.push( i ? c[i]+u(a[j]) : a[j] )
	else if(a[j+1]==2)
		x.push( i ? c[i]+u(a[j]) : a[j].toLowerCase() )
	else
		x.push( i ? '-'+c[i]+'-'+l(a[j]) : l(a[j]) )
	}
return x
},//fe

/**
 *页面尺寸以及点击事件位置相关功能
 */
position : {
b:null,
mr:null,//右侧留白像素数

/**
 *复制一个可以用来计算坐标的假的event object
 *论坛一些函数直接使用event object做参数来得到点击位置
 *但某些需要延时运行的情况event object可能无法保留
 *可利用此函数复制一个假event
 */
dummyEvent:function(e){
if (e.targetTouches){
	if(e.targetTouches[0])
		e = e.targetTouches[0];
	else if(e.changedTouches[0])
		e = e.changedTouches[0];
	}
return {clientX:e.clientX,clientY:e.clientY,pageX:e.pageX,pageY:e.pageY}
},//fe
getOffset:null,

/*
 *获取页面尺寸以及点击事件位置 
 *@param e 事件object 无此参数则返回数据中没有x, y, px, py属性
 *@return 返回一个坐标object 结构如下
 *p = {
 *x , y, 事件相对窗口的位置(不计算了滚动条的位置)
 *px , py, 事件相对页面的位置(计算了滚动条之后的)
 *xf, yf, 页面滚动量 
 *pw , ph, 页面尺寸 宽/高
 *cw , ch 窗口尺寸 宽/高
 *}
 */
get:function(e){

if (!this.b)
	this.b=(!document.compatMode || document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;

if (!this.getOffset){
	if (typeof window.pageYOffset != 'undefined')
		this.getOffset = function(){
			var b = this.b;
			return {xf:window.pageXOffset, yf:window.pageYOffset, pw:b.scrollWidth, ph:b.scrollHeight, cw:b.clientWidth, ch:b.clientHeight} 
			}
	else
		this.getOffset = function(){
			var b = this.b;
			return {xf:b.scrollLeft,yf:b.scrollTop, pw:b.scrollWidth, ph:b.scrollHeight, cw:b.clientWidth, ch:b.clientHeight}
			}
	}
	
var p = this.getOffset()

if(e){
	if (e.targetTouches){
		if(e.targetTouches[0])
			e = e.targetTouches[0];
		else if(e.changedTouches[0])
			e = e.changedTouches[0];
		}
	if(e.pageX===undefined){
		p.x = e.clientX
		p.y = e.clientY
		p.px = p.x+p.xf
		p.py = p.y+p.yf
		}
	else if(p.yf && e.pageY==e.clientY){//mobile safari
		p.x = e.pageX - p.xf
		p.y = e.pageY - p.yf
		p.px = e.pageX
		p.py = e.pageY
		}	
	else{
		p.x = e.clientX
		p.y = e.clientY
		p.px = e.pageX
		p.py = e.pageY		
		}
	p.cx = e.clientX
	p.cy = e.clientY
	}

return p	
	
},//fe

/**
 *在特定位置显示obj
 *@param o dom object
 *@param x x坐标或event
 *@param y y坐标
 *@param z 1 设置o最大宽度  2 设置o的宽度为最大宽度 4设置为100%宽度和高度(不留空间) 8不留4px鼠标指针偏移 16自动宽度 32返回坐标不设置位置
 */
setPos : function(o,x,y,z){
if(typeof x=='number' && typeof y=='number'){
	o.style.left = x+'px'
	o.style.top = y+'px'
	if(z&32){
		o.style.visibility='hidden'
		o.style.display = 'block'
		var p = this.get()
		p.ow = o.offsetWidth
		p.oh = o.offsetHeight
		p.ox = x
		p.oy = y
		p.x = x
		p.y = y
		p.px = x+p.xf
		p.py = y+p.yf
		return p
		}
	o.style.display='block';
	return
	}

var p = this.get(x)
if(this.mr){
	p.pw -= this.mr
	p.cw -= this.mr
	}
	
if(z&1)
	o.style.maxWidth = p.cw-26+'px'
if(z&2)
	o.style.width = p.cw-26+'px'
if(z&16){
	if(!this.em){
		if(commonui && commonui.getBaseFontPx)
			this.em = commonui.getBaseFontPx()
		else{
			this.em = _$('/span').$0('innerHTML','&emsp;')
			document.body.appendChild(this.em)
			var t = this.em.offsetWidth
			document.body.removeChild(this.em)
			this.em = t
			}
		}
	o.style.width = (this.em*50<(p.cw-26) ? this.em*50 : (p.cw-26)*0.75)+'px'
	}
if(z&4){
	o.style.height ='100%'
	o.style.width ='100%'
	}
o.style.visibility='hidden';
o.style.display = 'block';
var xf , yf , ow =(o.offsetWidth?o.offsetWidth:0) , oh = (o.offsetHeight?o.offsetHeight:0), sp = (z&(4|8)) ? 0 : 5

if(x===undefined || x===null){
	p.x = Math.floor(p.cw/2)
	p.y = Math.floor(p.ch/2)
	p.px = p.x+p.xf
	p.py = p.y+p.yf
	xf = -Math.floor(ow/2)
	yf = -Math.floor(oh/2)
	}
else{
	if(p.cw-p.x-ow>sp*2)xf=sp;//right
	else xf = p.cw-p.x-ow-sp;//left

	if(p.ch-p.y-oh>sp*2) yf=sp;//down
	else yf = p.ch-p.y-oh-sp;//up
	}

xf = p.x + p.xf + xf
yf = p.y + p.yf + yf
if(xf<0)xf = sp;
if(yf<0)yf = sp;

if(z&32){
	p.ow = ow
	p.oh = oh
	p.ox = xf
	p.oy = yf
	return p
	}
o.style.left = xf+'px';
o.style.top = yf+'px';
o.style.visibility='inherit';
}//fe

},//ce position



/**
 *判断一个mouseout事件 是否是鼠标移到元素之外
 *@param e event mouseout事件
 *@param o 元素node
 */
ifMouseLeave:function(e,o){
if (!e) var e = window.event;
var r = e.relatedTarget ? e.relatedTarget : e.toElement,t=r
while (r && r != o && r.nodeName != 'BODY')
	r= r.parentNode
if (r==o) return false;
return t
},//fe

/**
 *返回一个空图片node 图片渲染之后会运行指定的callback函数
 *@param f callback函数 函数中的this是图片node本身
 */
trigger:function(f){
return _$('<img/>')._.attr('src','about:blank')._.css('display','none')._.on('error',f)
},//fe

/**
 *添加css样式
 *@param css css样式表文本
 */
addCss:function(css){
var h = document.getElementsByTagName('head')[0],s = document.createElement('style');
s.type = 'text/css';
if (s.styleSheet){
	h.appendChild(s);
	s.styleSheet.cssText = css;
	}
else {
	s.appendChild(document.createTextNode(css));
	h.appendChild(s);
	}
},//fe

/**
 *触发事件
 */
fireEvent:function(o,n){
var e={}; // The custom event that will be created

if (document.createEvent) {
	e = document.createEvent("HTMLEvents");
	e.initEvent(n, true, true);
	}
else {
	e = document.createEventObject();
	e.eventType = n;
	}
e.eventName = n;

if (document.createEvent)
	o.dispatchEvent(e);
else
	o.fireEvent("on" + e.eventType, e);
},//fe



/**
*检测doRequest返回的标准数据是否正确 在成功时callback函数中自行调用 (针对nga论坛的常用数据格式) 
*返回错误信息 如返回true则为超时
*/
doRequestIfErr : function(x,tt){
if(!x)
	return 'no data'
if(x.error)
	return x.error[0]
if(!x.data)
	return 'no data'
if(x.data.constructor === Array){
	if(!x.data.length)
		return 'no data'
	}
else{
	var k=null;
	for(var k in x.data){
		break
		}
	if(k===null)
		return 'no data'
	}
if(x.time && (tt || x.timeout)){
	var t = window.__NOW
	if(!t)
		t = Math.floor((new Date).getTime()/1000)
	
	if(t-x.time > (tt ? tt : x.timeout)){
		console.log('doReqDataTimeout')
		return true
		}
	}
}//fe


}//ce

if(("IntersectionObserver" in window) && ('IntersectionObserverEntry' in window) && ('intersectionRatio' in window.IntersectionObserverEntry.prototype)){
	var __INSECTOB = new IntersectionObserver(function(entries, observer) {
		for(var i=0;i<entries.length;i++){
			if(entries[i].intersectionRatio>0){
				var o = entries[i].target;
				if(typeof o._onIntersection == 'function')
					o._onIntersection()
				__INSECTOB.unobserve(o);
				}
			}
		},{threshold:0.05})
	__INSECTOB.add = function(o,f){
		o._onIntersection = f
		this.observe(o)
		}
	}

/*
========================
NJtools nga javascript tool lib
------------
(c), Zeg, All Rights Reserved
Distributed under MIT license
========================
*/


;(function(NAME){
/*
*Element 原型扩展
*/
window.domExtPrototype={ 
/*
 *增加样式class
 */
cls:function(cn){
	this.self.className += ' '+cn
	return this.self 
	},
/*
 *设定css样式
 *@param name , value , name , value , name , value ...
 *@param (obj)o/{name:value,name:value,name:value...}
 */
css:function(){
	var o = this.self, a=arguments
	if(a.length==1){
		var c = arguments[0]
		for (var k in c){
			if(k.charAt(0)=='-')
				k=this.csn(o.style,k.substr(1))
			o.style[k]=c[k]
			}
		}
	else
		for(var i=0;i<a.length;i+=2){
			if(a[i].charAt(0)=='-')
				a[i]=this.csn(o.style,a[i].substr(1))
			o.style[a[i]]=a[i+1]
			}
	return o
	},
csn:function(s,k,r){
	if( k in s)
		return k
	else{
		var kk = k.substr(0,1).toUpperCase()+k.substr(1)
		if(this.csnp[0]+kk in s)
			return this.csnp[0]+kk
		else{
			for(var i=1;i<this.csnp.length;i++){
				if(this.csnp[i]+kk in s){
					this.csnp[0] = this.csnp[i]
					return this.csnp[i]+kk
					}
				}
			}
		}
	return r?null:k
	},
csnp:[
	'',
	'webkit',
	'ms',
	'moz'
	],
/*
 *绑定事件
 *@param 事件名(无on) , callback(第一个参数是event)
 */
on:function(type, fn){
	if (window.addEventListener)
		this.self.addEventListener(type, fn, false); 
	else if (window.attachEvent){
		var o = this.self
		o.attachEvent('on'+type, function(){fn.call(o, window.event)} ) 
		}
	return this.self; 
	},
/*
 *增加子节点
 *@param node , node , node , node , node , node ...
 *node为null时忽略
 *node为string时node=document.createTextNode(node)
 *node为array时
 */
add:function(){
	var o = this.self, i=0, a=arguments
	for (;i<a.length;i++){
		if(a[i]===null)
			continue
		else if(typeof a[i] =='object'){
			if(a[i].constructor==Array){
				this.add.apply(this,a[i])
				}
			else
				o.appendChild(a[i])
			}
		else
			o.appendChild(document.createTextNode(a[i].toString()))
		}
	return o
	},

/*
 *综合调用
 *@param attrName , attrValue , attrName , attrValue ... 设置属性 具体参看attr函数
 *@param {name: value, name: value ...} 批量设置属性
 *@param event , callback , event , callback ... 注册事件 具体参看on函数
 *@param domNode , domNode ...  增加子节点 (有nodeType属性的object视为domNode) null参数会被跳过 具体参看add函数
 *以上参数可混用
 *设定className属性时如value为null则清空
 *设定style属性时value为{cssName: value, cssName: value ...}
 */
call:function(){
	for(var i=0;i<arguments.length;++i){
		var a = arguments[i]
		if(a===null)
			continue
		else if(typeof a == 'object'){
			if(a.constructor==Array)
				this.add.apply(this,a)
			else if(a.nodeType)
				this.self.appendChild(a)
			else
				for(var k in a)
					this.attr(k,a[k])
			}
		else
			this.attr(a,arguments[++i])
		}
	return this.self
	},
/*
 *设定属性或样式或事件注册
 *@param name , value 
 *@param event , callback 
 *@param {name: value, name: value ...}
 *自定义属性名用 _ 开头
 *设定className时如value为null则清空 否则为添加到原className结尾
 *设定style时value为'cssName:value;cssName:value;...'或{cssName: value, cssName: value ...}
 */
attr:function(k,v){
	if(typeof v == 'function' && k.substr(0,2)=='on')
		return this.on(k.substr(2),v)
	if(arguments.length==1 && typeof k =='object'){
		for(var i in k)
			this.attr(i,k[i])
		return this.self
		}
	var o = this.self
	switch(k){
		case 'className':
			if(v===null)
				o.className=null
			else if(v)
				o.className+=' '+v
			break
		case 'style':
			if(typeof v=='string'){
				var n=0,m=0,c=v.length-2
				while(n>-1 && n<c && (m=v.indexOf(':',n))>0)
					o.style[v.slice(n,m)]=v.slice(m+1,(n=v.indexOf(';',m+1))>-1?n++:undefined)
				//v = v.split(/:|;/)
				//for(var s=0;s<v.length;++s)
				//	o.style[v[s]]=v[++s]
				}
			else
				for(var s in v)
					o.style[s]=v[s]
			break
		case 'id':
		case 'innerHTML':
		case 'title':
		case 'checked':
		case 'accessKey':
		case 'dir':
		case 'disabled':
		case 'lang':
		case 'tabIndex':
		case 'width':
		case 'value':
		case 'height':
			o[k]=v
			break
		default:
			if(k.charAt(0)=='_')
				o[k]=v
			else
				o.setAttribute(k,v)
		}
	return o
	}
}//oe


/*
*为element原型增加综合调用函数$0
*/
if (window.Element)
    window.Element.prototype.$0=function(){return this._.call.apply(this._,arguments)}
else//ie6 ie7
	var $0ie = function(){return this._.call.apply(this._,arguments)}

/*
取元素或新建元素
*/
window[NAME] = function (o){//fs
if(typeof o == 'string'){
	if(o.charAt(0)=='/')
		o = document.createElement(o.substr(1))
	else if(o.charAt(0)=='<'){//$('<span>') or $('<span/>') or $('<span>abcd</span>')
		var x
		if(x=o.match(/^<?\/?([a-zA-Z0-9]+)\/?>?$/))
			o = document.createElement(x[1])
		else{
			x = document.createElement('span')
			x.innerHTML = o
			o = x.firstChild
			}
		}
	else
		o = document.getElementById(o)
	}
if(o!==null){
	if(o._==null){
		o._=function(){}
		o._.prototype=domExtPrototype
		o._ = new o._
		o._.self = o
		if(!('$0' in o))//ie6 ie7
			o.$0=$0ie
		}
	if(arguments[1]!==undefined){
		delete arguments[0]
		arguments[0] = null
		o._.call.apply(o._,arguments)
		}
	}
return o
}//fe

})(window.$ ? '_$' : '$');//指定主函数名字 自行修改

/**
//用例:

//新建元素
var x = $('/span')

//用id取元素 
var x = $('xxoo')

//例子
$('/span','id','xxoo','style','width:100%',$('/span'),'className','xxoo')//使用主函数一次生成

$('xxoo').$0('style',{width:'100%'},$('/span'),'onclick',function(e){alert(123)}).$0('className','xxoo')//使用$0方法 $0参看domExtPrototype.call

$('/span')._.cls('xxxxoooo')._.attr('title','abcd')._.add($('/span'),$('/div'),'test text')//使用不同的方法链式调用 使用参看domExtPrototype

*/



/*
========================
commonlib file loader functions for nga
脚本/样式表文件加载器
------------
(c), Zeg, All Rights Reserved
Distributed under GPLv3 license
========================
*/

var __LOADER = {

/**
 *加载样式表文件
 *@param src 地址
 *@param sync 是否用同步模式 (直接document.write
 */
css:function (src,sync){
if(sync){
	sync = "<link rel='stylesheet' href='"+src+"' type='text/css'/>"
	if(document._documentWirteBak)document._documentWirteBak(sync)
	else document.write(sync)
	return
	}
var x = document.createElement('link')
x.href = src
x.rel = 'stylesheet'
x.type = 'text/css'
var h = document.getElementsByTagName('head')[0]
h.insertBefore(x,h.firstChild)
},//fe

scriptTpl:null,

/**
 *加载脚本
 *@param src 地址
 *@param callback 回调函数 函数中的this为script node本身
 *@param charset 指定脚本的编码 一般不用设 浏览器会自动识别
 *@param sync 是否用同步模式 (直接document.write
 */
script:function (src,callback,charset,sync){
if(typeof(src)=='object'){
	callback = src[1]
	charset = src[2]
	sync = src[3]
	src = src[0]
	}	
if(!this.scriptTpl)this.scriptTpl = document.createElement('script')
if(sync){
	if(callback){
		var k='call'+Math.random().toString().substr(2)
		this.callback[k]=callback
		if(this.scriptTpl.readyState)
			var c=" onreadystatechange='if(this.readyState && this.readyState != \"loaded\" && this.readyState != \"complete\")return;window.loader.callback."+k+".call(this)' "
		else
			var c=" onload='window.loader.callback."+k+".call(this)' "
		}
	else
		c=''
	sync = "<scr"+"ipt src='"+src+"' "+(charset ? "charset='"+charset+"'" : '')+" "+c+" type='text/javasc"+"ript'></scr"+"ipt>"
	if(document._documentWirteBak)document._documentWirteBak(sync)
	else document.write(sync)
	return
	}
var x = this.scriptTpl.cloneNode(0)
x.src=src
if(charset)x.charset = charset
if (callback) {
	if(x.readyState){
		x.onreadystatechange = function() {
			if (this.readyState && this.readyState != 'loaded' && this.readyState != 'complete')return;
			callback.call(this);
			}
		}
	else{
		x.onload = function() {callback.call(this)}
		}
	}

var h = document.getElementsByTagName('head')[0]
h.insertBefore(x,h.firstChild)
//commonui._debug.push('start '+src)
},

callback:{}

}//ce

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
	case 'function':
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
/*
========================
commonlib localstorage functions for nga
------------
(c), Zeg, All Rights Reserved
Distributed under GPLv3 license
========================
*/

//==================================
//DOM STORE
//浏览器本地储存 使用commonui.userCache 不要直接用这个
//==================================
;(function(){
var O, err, W=window, NOW = W.__NOW ? (__NOW|0) : Math.floor((new Date).getTime()/1000)


try{
	O=W.localStorage
	}
catch(e){
	// some time localStorage cant access in IE8 IE9 IE10
	err=1
	}

if(!O){
	try{
		O=W.globalStorage[location.host]
		}
	catch(e){
		// some time globalStorage cant access in  FIREFOX
		err=2
		}
	}

if(!O){
	try{
		if(W.ActiveXObject){
			w.document.documentElement.addBehavior("#default#userdata")
			var OO=w.document.documentElement, AR='localStoragePolyfill'
			OO.load(AR)
			O = {
            getItem     : function(id) { return OO.getAttribute(id) || undefined; },
            setItem     : function(id, val) { OO.setAttribute(id, val); OO.save(AR); },
            removeItem  : function(id) { OO.removeAttribute(id); OO.save(AR); },
            clear       : function() { } 
				}
			}
		}
	catch(e){
		err=3
		}
	}

if(!O && !OO){
	W.domStorageFuncs = {
		set:function(){},
		get:function(){},
		remove:function(){}
		}
	return
	}
	
W.domStorageFuncs = {
	o:true,
	set:function(k, v, t){
		if(t==0)
			t = 86400*30
		else if(t<0)
			return this.remove(k)
		//if(Math.random()<0.02)
		//	this.checkTimeout()
		O.setItem(k, (NOW+(t|0))+''+v);
		},//fe
	get:function(k){
		try{
			var x =O.getItem(k);
			}
		catch(err){
			return;
			}
		if(x && (x.substr(0,10)|0)>NOW)
			return x.substr(10)
		else
			O.removeItem(k)
		return ''
		},//fe
	remove:function(k){
		O.removeItem(k)
		},
	checkTimeout:function (){
		if(O.length)
			for (var i=0;i<O.length;i++){
				var y = O.getItem(O.key(i)).substr(0,10)
				if (!y || (y && y<NOW))
					O.removeItem(O.key(i))
				}
		}//fe
	}

})();
/*
========================
NJtools nga javascript tool lib
------------
(c), Zeg, All Rights Reserved
Distributed under MIT license
========================
*/


;(function($){
var FORM,SCRIPT,TARGET,ARGS,RUN
/**
* 使用jsonp方式向服务器请求数据 可get或post
* @param a 输入参数是一个object 结构如下
* a._id 不要设这个
* a._noLock 不要设这个
* a.u 请求地址 
*		为string时使用get方法 使用插入script标签的方式获取数据 可以跨域
*		为{u:url,a:{k1:v1,k2:v2....}}时使用post方法 使用iframe或XHR方式获取数据 跨域需XHR并在服务器输出特定header
*		需要使用“多组地址”时[请求地址0,请求地址1 ...]
* a.c 返回信息的字符集 不设默认为空（和页面相同编码
* a.b 提交按钮/或链接 (可以忽略
* a.f 成功时callback函数 如此函数返回true意为成功 返回false意为失败 失败并且有“多组地址”时则继续尝试下一个
* a.ff 失败时时callback函数 如果请求全部失败或 a.f全部返回false时执行
* a.t 表单的target(仅在post时用) 如为dom node则表单目标iframe会置于其中 如不设使用隐形iframe
* a.n 服务器返回数据变量的名字 不设默认为script_muti_get_var_store (如果存在数据变量会作为callback a.f的第一个参数 
* a.ca 是否缓存结果 (仅在a.u是string时
* a.xr 是否使用XHR(仅在post时
*/
var doRequest=function(a){

if(!FORM){
	FORM = $('/form','method','post','style','display:none')
	document.body.insertBefore(FORM,document.body.firstChild)
	TARGET = $('/span','style','display:none')
	document.body.insertBefore(TARGET,document.body.firstChild)
	ARGS=[]
	CACHE=[]
	}

if(!a._id)
	a._id = 'doHttpRequest'+Math.floor(Math.random()*10000)
if(!a.n)
	a.n = 'script_muti_get_var_store'
if(!a.t)
	a.t = TARGET

var f = _doRequestLock(a)
if(f)return alert(f)

if(!a.f){
	a.f = function(d){//如有.error则显示.error 否则显示.data
		if(!d)
			return
		var x,y='';
		if(d.error)
			x= d.error
		else if(d.data)
			x=d.data
		if(!x)
			x={0:'ERROR NO DATA'}
		if(typeof x=='string')
			y=x
		else{
			for(var k in x)
				y+=x[k]+'\n'
			}
		alert(y)
		return true
		}
	a.ff = function(){
		alert('ERROR REQUEST')
		}
	}

if(a.ca && typeof a.u=='string'){
	if(CACHE[a.u])
		return a.f.call(window,CACHE[a.u])
	}
	
ARGS.push(a)

if(!RUN){
	RUN=true
	return setTimeout(function(){_doRequest()})
	}
}//fe

var _doRequest=function(){
	
var a = ARGS[0]

if(!a)
	return RUN=false

if(!a.u){
	_doRequestLock(a,true)
	ARGS.shift()
	return setTimeout(function(){_doRequest()})
	}

var u = typeof(a.u)=='string' || a.u.u ? a.u : a.u[0]

if(typeof(u)=='string'){
	if(SCRIPT)SCRIPT.parentNode.removeChild(SCRIPT)
	SCRIPT = $('/script','id',a._id, 'src',u, 'charset',a.c?a.c:'', 'type','text/javascript','onreadystatechange',_doRequestCallback,'onload',_doRequestCallback,'onerror',_doRequestCallback)
	window[a.n]=null
	document.getElementsByTagName('head')[0].appendChild(SCRIPT)
	return
	}

if(window.commonui && commonui.triggerEventBeforePost)
	commonui.triggerEventBeforePost()

if(a.xr){
	var fd = new FormData()
	for(var k in a.u.a)
		fd.append(k,a.u.a[k])
	var xr = new XMLHttpRequest()
	xr.onload = function(e) {
		var xhr = e.target,er,y
		if (xhr.readyState !== 4 && xhr.status !== 200)
			er = 'SERVER_RETURN_'+xhr.status
		else{
			
			try{
				y = {}
				eval('y["'+a.n+'"]='+xhr.responseText)
				}
			catch(err){
				er=err
				}
			}
		if(er){
			console.log(er)
			y={}
			}
		return _doRequestCallback.call({readyState:'complete',nodeName:'IFRAME',contentWindow:y})
		}
	//if(xr.upload)
	//	xr.upload.onprogress = function(e){if (e.lengthComputable) console.log(Math.round(e.loaded * 100 / e.total).toString()+'%') }
	xr.open("POST", a.u.u) // Boooom!	
	xr.withCredentials=true //must after open
	xr.send(fd)
	return
	}

FORM.innerHTML=''
FORM.action = u.u
for(var k in u.a)
	FORM._.add($('/input','type','hidden','value',u.a[k],'name',k))

if(typeof(a.t)=='object' && a.t.nodeType==1){
	FORM.target = a._id
	a.t.innerHTML = ''
	a.t.appendChild(
		$('/iframe','name',a._id,'id',a._id, 'scrolling','no', 'allowtransparency','true', 'frameBorder','0','style','width:'+(a.t.offsetWidth ? a.t.offsetWidth+'px' : '200px')+'height:'+(a.t.offsetHeight ? a.t.offsetHeight+'px' : '50px')+';border:none;overflow:hidden')
		)
	a.t.firstChild.$0('onreadystatechange',_doRequestCallback,'onload',_doRequestCallback,'onerror',_doRequestCallback)
	}
else if(typeof(a.t)=='string')
	FORM.target = a.t

FORM.submit()
}//fe

var _doRequestCache={}

var _doRequestLock=function(a,clear){
if(clear){
	if(a.b){
		a.b.disabled = a.b.__submiting = false
		if(a.b.style)
			a.b.style.crusor = ''
		}
	return
	}
if(a.b){
	if(a.b.disabled || a.b.__submiting)
		return '提交中 请稍后再试'
	a.b.disabled = a.b.__submiting = true
	if(a.b.style)
		a.b.style.crusor = 'wait'
	}
}//fe

var _doRequestCallback = function(e){
var o = this
if((o.readyState && o.readyState!='complete' && o.readyState!='loaded')||o.__loadRunned)
	return
o.__loadRunned = true
var r = true, a = ARGS[0]
if(a.f){
	var d = null
	try{
		d = o.nodeName == 'IFRAME' ? o.contentWindow[a.n] : window[a.n]
		}
	catch(e){
		console.log('_doRequestCallback:'+e)
		d = null
		}
	if(d && d.debug)
		console.log(d.debug)
	if(a.ca && typeof(a.u)=='string')
		_doRequestCache[a.u] = d
	r = a.f.call(window, d)
	}
if(r || typeof(a.u)=='string' || a.u.u || a.u.length==1){//如成功 或 单get 或 单post 或 队列get或post并且队列中没有下一个了 的时候 结束任务
	if(!r && a.ff)
		a.ff.call(window)
	a.u=null
	}
else
	a.u.shift()
setTimeout(function(){_doRequest()})
}//fe

/**
* http post
* 同doRequest
*/
doPost = function(a){
if(a.a){
	a.u={u:a.u,a:a.a}
	delete a.a
	}
else if(typeof(a.u)=='string'){
	a.u={u:a.u,a:{nouse:'post'}}
	}
return doRequest(a)
}//fe


$.doRequest = doRequest
$.doPost = doPost

})(
	_$ //NJtools的主函数$  自行修改
	);

/**
//用例:

参照doRequest的注释
 */


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
