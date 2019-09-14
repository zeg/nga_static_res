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
 *�򵥵ĸ���һ��object
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
 *����һ����object �̳��ڲ���object
 */
inheritClone : function (o){
if(o == null || typeof(o) != 'object')
	return o;
var oo =function(){};
oo.prototype=o
return new oo;
},//fe


/*
 *��ȡcss/event����������������� �õ�һ�����Լ�� ���ɺ���һϵ�еļ�������
 *��һ������ ���ڼ���obj
 *��i������ ������(����ĸСд ֮��ÿ������ĸ��д)
 *��i+1������ ������������ 1 style 2 event 3 css (event���͵ļ����ff��������
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
 *ҳ��ߴ��Լ�����¼�λ����ع���
 */
position : {
b:null,
mr:null,//�Ҳ�����������

/**
 *����һ������������������ļٵ�event object
 *��̳һЩ����ֱ��ʹ��event object���������õ����λ��
 *��ĳЩ��Ҫ��ʱ���е����event object�����޷�����
 *�����ô˺�������һ����event
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
 *��ȡҳ��ߴ��Լ�����¼�λ�� 
 *@param e �¼�object �޴˲����򷵻�������û��x, y, px, py����
 *@return ����һ������object �ṹ����
 *p = {
 *x , y, �¼���Դ��ڵ�λ��(�������˹�������λ��)
 *px , py, �¼����ҳ���λ��(�����˹�����֮���)
 *xf, yf, ҳ������� 
 *pw , ph, ҳ��ߴ� ��/��
 *cw , ch ���ڳߴ� ��/��
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
 *���ض�λ����ʾobj
 *@param o dom object
 *@param x x�����event
 *@param y y����
 *@param z 1 ����o�����  2 ����o�Ŀ��Ϊ����� 4����Ϊ100%��Ⱥ͸߶�(�����ռ�) 8����4px���ָ��ƫ�� 16�Զ���� 32�������겻����λ��
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
 *�ж�һ��mouseout�¼� �Ƿ�������Ƶ�Ԫ��֮��
 *@param e event mouseout�¼�
 *@param o Ԫ��node
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
 *����һ����ͼƬnode ͼƬ��Ⱦ֮�������ָ����callback����
 *@param f callback���� �����е�this��ͼƬnode����
 */
trigger:function(f){
return _$('<img/>')._.attr('src','about:blank')._.css('display','none')._.on('error',f)
},//fe

/**
 *���css��ʽ
 *@param css css��ʽ���ı�
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
 *�����¼�
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
*���doRequest���صı�׼�����Ƿ���ȷ �ڳɹ�ʱcallback���������е��� (���nga��̳�ĳ������ݸ�ʽ) 
*���ش�����Ϣ �緵��true��Ϊ��ʱ
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
