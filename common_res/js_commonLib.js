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
*Element ԭ����չ
*/
window.domExtPrototype={ 
/*
 *������ʽclass
 */
cls:function(cn){
	this.self.className += ' '+cn
	return this.self 
	},
/*
 *�趨css��ʽ
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
 *���¼�
 *@param �¼���(��on) , callback(��һ��������event)
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
 *�����ӽڵ�
 *@param node , node , node , node , node , node ...
 *nodeΪnullʱ����
 *nodeΪstringʱnode=document.createTextNode(node)
 *nodeΪarrayʱ
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
 *�ۺϵ���
 *@param attrName , attrValue , attrName , attrValue ... �������� ����ο�attr����
 *@param {name: value, name: value ...} ������������
 *@param event , callback , event , callback ... ע���¼� ����ο�on����
 *@param domNode , domNode ...  �����ӽڵ� (��nodeType���Ե�object��ΪdomNode) null�����ᱻ���� ����ο�add����
 *���ϲ����ɻ���
 *�趨className����ʱ��valueΪnull�����
 *�趨style����ʱvalueΪ{cssName: value, cssName: value ...}
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
 *�趨���Ի���ʽ���¼�ע��
 *@param name , value 
 *@param event , callback 
 *@param {name: value, name: value ...}
 *�Զ����������� _ ��ͷ
 *�趨classNameʱ��valueΪnull����� ����Ϊ��ӵ�ԭclassName��β
 *�趨styleʱvalueΪ'cssName:value;cssName:value;...'��{cssName: value, cssName: value ...}
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
*Ϊelementԭ�������ۺϵ��ú���$0
*/
if (window.Element)
    window.Element.prototype.$0=function(){return this._.call.apply(this._,arguments)}
else//ie6 ie7
	var $0ie = function(){return this._.call.apply(this._,arguments)}

/*
ȡԪ�ػ��½�Ԫ��
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

})(window.$ ? '_$' : '$');//ָ������������ �����޸�

/**
//����:

//�½�Ԫ��
var x = $('/span')

//��idȡԪ�� 
var x = $('xxoo')

//����
$('/span','id','xxoo','style','width:100%',$('/span'),'className','xxoo')//ʹ��������һ������

$('xxoo').$0('style',{width:'100%'},$('/span'),'onclick',function(e){alert(123)}).$0('className','xxoo')//ʹ��$0���� $0�ο�domExtPrototype.call

$('/span')._.cls('xxxxoooo')._.attr('title','abcd')._.add($('/span'),$('/div'),'test text')//ʹ�ò�ͬ�ķ�����ʽ���� ʹ�òο�domExtPrototype

*/



/*
========================
commonlib file loader functions for nga
�ű�/��ʽ���ļ�������
------------
(c), Zeg, All Rights Reserved
Distributed under GPLv3 license
========================
*/

var __LOADER = {

/**
 *������ʽ���ļ�
 *@param src ��ַ
 *@param sync �Ƿ���ͬ��ģʽ (ֱ��document.write
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
 *���ؽű�
 *@param src ��ַ
 *@param callback �ص����� �����е�thisΪscript node����
 *@param charset ָ���ű��ı��� һ�㲻���� ��������Զ�ʶ��
 *@param sync �Ƿ���ͬ��ģʽ (ֱ��document.write
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
 *�򵥵�json����
 *�����ϸ�json���� ֻ��javascipt������ȷʶ��ĸ�ʽ
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
//��������ش��� ʹ��commonui.userCache ��Ҫֱ�������
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
* ʹ��jsonp��ʽ��������������� ��get��post
* @param a ���������һ��object �ṹ����
* a._id ��Ҫ�����
* a._noLock ��Ҫ�����
* a.u �����ַ 
*		Ϊstringʱʹ��get���� ʹ�ò���script��ǩ�ķ�ʽ��ȡ���� ���Կ���
*		Ϊ{u:url,a:{k1:v1,k2:v2....}}ʱʹ��post���� ʹ��iframe��XHR��ʽ��ȡ���� ������XHR���ڷ���������ض�header
*		��Ҫʹ�á������ַ��ʱ[�����ַ0,�����ַ1 ...]
* a.c ������Ϣ���ַ��� ����Ĭ��Ϊ�գ���ҳ����ͬ����
* a.b �ύ��ť/������ (���Ժ���
* a.f �ɹ�ʱcallback���� ��˺�������true��Ϊ�ɹ� ����false��Ϊʧ�� ʧ�ܲ����С������ַ��ʱ�����������һ��
* a.ff ʧ��ʱʱcallback���� �������ȫ��ʧ�ܻ� a.fȫ������falseʱִ��
* a.t ����target(����postʱ��) ��Ϊdom node���Ŀ��iframe���������� �粻��ʹ������iframe
* a.n �������������ݱ��������� ����Ĭ��Ϊscript_muti_get_var_store (����������ݱ�������Ϊcallback a.f�ĵ�һ������ 
* a.ca �Ƿ񻺴��� (����a.u��stringʱ
* a.xr �Ƿ�ʹ��XHR(����postʱ
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
	a.f = function(d){//����.error����ʾ.error ������ʾ.data
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
		var xhr = e.target
		if (xhr.readyState !== 4 && xhr.status !== 200)
			return _doRequestCallback.call({readyState:'complete',nodeName:'IFRAME',contentWindow:{}})
		y = eval(xhr.responseText)
		return _doRequestCallback.call({readyState:'complete',nodeName:'IFRAME',contentWindow:{script_muti_get_var_store:y}})
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
		return '�ύ�� ���Ժ�����'
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
if(r || typeof(a.u)=='string' || a.u.u || a.u.length==1){//��ɹ� �� ��get �� ��post �� ����get��post���Ҷ�����û����һ���� ��ʱ�� ��������
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
* ͬdoRequest
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
	_$ //NJtools��������$  �����޸�
	);

/**
//����:

����doRequest��ע��
 */


/*
========================
commonlib forward compatible and old functions for nga
��������ת�� ��һЩ����ʹ�õķ���
------------
(c), Zeg, All Rights Reserved
Distributed under GPLv3 license
========================
*/


//==================================
//forward compatible for nga
//����ת��
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
//����ʹ�õķ���
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
 *һ�ּ򵥵ı��� 
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
 *һ�ּ򵥵ı���Ľ���
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
 *�����ӽڵ�
 *@param node , node , node , node , node , node ...
 *nodeΪnullʱ����
 *nodeΪstringʱnode=$(node)
 *nodeΪarrayʱ insertBefore(node.0,node.1)
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
 *��������
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
 *ȡ������
 *@param name
 */
domExtPrototype.gV=function (k){
	if(!this.anyVar)this.anyVar={}
	return this.anyVar[k] 
	}
