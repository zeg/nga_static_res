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
	
	if(t-x.time > (tt ? tt : x.timeout))
		return true
	}
}//fe


}//ce



