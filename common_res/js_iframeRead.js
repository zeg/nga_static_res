
commonui.crossDomainCall.setCallBack('iframeReadSetWindowTitle', function(x){
document.title = x+' # '+document.title.replace(/.+? # /,'')
})//fe

commonui.crossDomainCall.setCallBack('iframeReadShow', function(){
iframeRead.show()
})//fe

var iframeRead = {

f:null,
o:null,
c:null,

off:null,

border:2,//弹出层左边框宽度

mSize:0,//页面主体宽度
hSize:0,//弹出部分折叠时的宽度
sSize:0,//弹出部分展开的宽度
stat:0,//当前状态 0折叠 1展开
toStat:0,//将变为状态
trans:null,
pMW:0,//页面右侧已占用的宽度
actTimout:null,
toUrl:null,
clickSound:null,
aInit:null,


go:function(u){
var s = this

s.f.style.display='none'

s.show(u)

},//fe


//---------------------------
initA:function(o){
if(this.off)return
if(this.aInit)return
this.aInit=true

if(window.Audio){
	var click = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjE1LjEwMgAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAACWAB6enp6enp6enp6enp6enp6enp6enp6enqmpqampqampqampqampqampqampqampqam09PT09PT09PT09PT09PT09PT09PT09PT0/////////////////////////////////8AAAAATGF2YzU2LjE0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAlizUXvjAAAAAAD/+xDEAAAEpINPtBEAAKURLkMK0AEQAmxAggDgAYFMbm78jv0J6E1fP+pPIEJIQjTnOcAIJwfiQMcTsdDNcDidXRm6CFWx4vj2SS8vppoooo+mgZkYLvWYl4z+MsTNSa4RUyGqemRFh//7EsQCAEUMN2nckYAAqQ5qrJCKkYQLSAACELQhISI1s2EVolJNQeLMOIOUfoKE4DeSAyda5Bp64iXEjbAAiXKo31zLIahS66UyRlJTz6WpxzVaCjCSW0pTk5gdxQdsmh9KaE0qx2xABP/7EMQCgAUUKVN0kQAImxDowxZwAQEfUAFIyYS8lJWkepOlEGDgkgqij+XvLuv+BbnRPwG2eYA32Fh1JHvR3T5BI1HkxYrY2B8Nfy48OitZ3x4weMFVDv4kCSBUuqD2SkxBTUUzLjk5//sSxAQDwAABpBwAACAAADSAAAAELjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
	click.volume=0.05;
	this.clickSound = function(){click.play()}
	}

var s = this, l= location, p = /^(?:https?:\/\/[^\/]+?)?(\/(?:read|nuke)\.php)/;
document.body.addEventListener('mousedown',function(e){
	//console.log('down '+e.timeStamp)
	var h = e.target || e.srcElement
	if(h.nodeName!='A')
		return
	if(h.href.indexOf('/read.php')!=-1 || h.href.indexOf('/nuke.php')!=-1){
		h.__mousedowntime = e.timeStamp
		//console.log('h.__mousedowntime '+h.__mousedowntime)
		if(iframeRead.clickSound)
			iframeRead.playSoundTimeout = setTimeout(iframeRead.clickSound,500)
		}
	},
	true)
document.body.addEventListener('mouseup',function(e){
	//console.log('up '+e.timeStamp)
	if(iframeRead.playSoundTimeout)
		clearTimeout(iframeRead.playSoundTimeout)
	},
	true)
document.body.addEventListener('click',function(e){
	//console.log('click '+e.timeStamp)
	var h = e.target || e.srcElement
	if(h==s.c)
		return s.show()
	if(h.nodeName!='A')h=h.parentNode
	if(h.nodeName!='A')
		return s.hide()
	//console.log('h.__mousedowntime '+h.__mousedowntime)
	if(h.__mousedowntime && e.timeStamp-h.__mousedowntime>=500)
		return h.__mousedowntime=0
	var m = h.href.match(p)
	if(m && (m[1]=='/read.php' || m[1]=='/nuke.php') && l.pathname != m[1]){
		e.returnValue = false
		e.cancelBubble = true;
		e.preventDefault()
		e.stopPropagation()
		iframeRead.go(h.href)
		return false
		}
	else
		s.hide()
	},
	true)
},//fe

initB : function(){
var p = /^(?:http:\/\/[^\/]+?)?(\/(?:read|nuke)\.php)/;
commonui.aE(window,'bodyInit',function(){
	document.body.addEventListener('click',function(e){
		//console.log('click '+e.timeStamp)
		var h = e.target || e.srcElement
		if(h.nodeName!='A')h=h.parentNode
		if(h.nodeName!='A')
			return
		//console.log('h.__mousedowntime '+h.__mousedowntime)
		if(h.href.match(p))
			return
		h.target='parent'
		},
		true)
	})
},//fe

//---------------------------
calcPopSize:function(){
var p = __NUKE.position.get(), z=p.cw-this.mSize-this.pMW, y=0
if(z<0)z=0
if( __SETTING.bit & 4){//<= 10 inch
	y = p.cw
	}
else{
	y = Math.floor(p.cw*0.6)
	if(y<900)y=900
	if(y>p.cw)y = Math.floor(p.cw*0.9)
	}
this.hSize = z, this.sSize = y
},//fe

//---------------------------
initOnLoad:function(){
var $=_$, s= this, l = location

s.calcPopSize()

s.f = $('/iframe').$0('style',{width:s.sSize+'px',height:'100%',border:'none',direction:'rtl',display:'none'},
	'frameborder','no',
	'border',0,
	'src','/nuke/iframeRead.html'
	)

s.c = $('/div').$0(
	'style',"position:fixed;top:0px;right:"+s.pMW+"px;width:"+s.hSize+"px;bottom:0px;overflow:hidden;zIndex:6;opacity:0.50;background:#000",
	'onmousedown',function(e){
		s.show()
		commonui.cancelBubble(e)
		return commonui.cancelEvent(e)
		}
	)

s.o = $('/div').$0(
	'style',"position:fixed;top:0px;right:"+s.pMW+"px;width:"+s.hSize+"px;bottom:0px;borderLeft:"+s.border+"px solid "+__COLOR.border0+";background:"+__COLOR.bg0+";overflow:hidden;direction:rtl;zIndex:5"+(s.trans?(";"+s.trans[0]+":width 0.5s linear 0s,0.5s"):''),
	 s.f
	 )

document.body.appendChild(s.o)
document.body.appendChild(s.c)

if(l.hash && l.hash.charAt(1)=='/')
	s.go(l.hash.substr(1))

s.initA()

},//fe

//body开始时加载
init:function(){
this.trans = __NUKE.cpblName(document.getElementsByTagName('head')[0].style,'transition',1)
if(Event.prototype.preventDefault && Event.prototype.stopPropagation && Element.prototype.addEventListener && this.trans){}
else
	return

var w=window, p = w.__NUKE.position.get(), x, n=w.__NUKE, c=w.commonui, d=w.document, s=this, pMW=0

if(commonui.checkIfInIframe()){
	try{
		window.parent.iframeReadSetWindowTitle(document.title)
		window.parent.iframeReadShow()
		}
	catch(x){
		commonui.crossDomainCall(1, '*', "iframeReadSetWindowTitle", null, document.title)
		commonui.crossDomainCall(1, '*', "iframeReadShow", null, null)
		}
	this.off=true
	this.initB()
	return
	}

if(p.cw<1650 || location.pathname=='/read.php')
	s.mSize=p.cw
else{
	s.mSize=1650
	s.pMW = commonui.addMmcMargin(p.cw-this.mSize)
	}

c.aE(w,'DOMContentLoaded',function(){
	s.initOnLoad()
	})

},//fe

/**
*点击事件是否是发生在操作按钮或窗口边框上 
 */
ifClickOnBtn:function(e){
var t = e.srcElement ? e.srcElement : e.target
if(t.nodeName!='A')t=t.parentNode
if(t==this.o || t==this.blank || t==this.close)
	return true
},

hide:function(){
this.toStat = 0
this.action()
},//fe

show:function(u){
this.toStat = 1
this.action(u)
},//fe

action:function(u){

this.toUrl = u
if(this.actTimout)
	return
var s = this, l = location
setTimeout(function(){
	if(s.stat!=s.toStat){
		if(s.toStat==1){
			s.stat = 1
			s.o.style.width=s.sSize+'px'
			s.c.style.display='none'
			if(s.toUrl && s.toUrl!=s.f.src)
				setTimeout(function(){
					s.f.style.display=''
					try{s.f.contentWindow.location.assign( s.toUrl )
						s.f.contentWindow.focus()}catch(er){}
					},550)
			}
		else{
			s.stat = 0
			setTimeout(function(){s.c.style.display=''},550)
			s.o.style.width=s.hSize+'px'
			}
		}
	else if(s.toUrl && s.toUrl!=s.f.src){
		s.f.style.display=''

		try{s.f.contentWindow.location.assign( s.toUrl )
			s.f.contentWindow.focus()}catch(er){}
		}
		
	s.actTimout=null
	},100)
}//fe
}//ce


var sameWindowOpen={
initA : function(o){iframeRead.initA(o)}
}


if(!domExtPrototype.aniSize){
domExtPrototype.aniSize = function(to,f,h,ff){
var o=this.self, w=window, n = o[h?'offsetHeight':'offsetWidth'], h=h?'height':'width', per = Math.floor((to-n)/f), c= {0:'moz',1:'webkit',2:'ms',3:'o',4:'khtml'}, x = function(a,b){
	if(b.toLowerCase() in a)
		return b.toLowerCase()
	for(var k in c)
		if(c[k]+b in a)
			return c[k]+b
	} , r = x(w,'RequestAnimationFrame');
this._aniSizeKey = Math.random()
var k = this._aniSizeKey
if(r){
	var i = function(){
		if(k!=o._._aniSizeKey)
			return
		if(f<=0)
			n=to
		else
			n+=per
		f--
		o.style[h] = n+'px'
		if(f>=0)
			w[r](i)
		else if(ff)
			ff()
		}
	w[r](i)
	}
else{
	var i = window.setInterval(
	function(){
		if(k!=o._._aniSizeKey){
			window.clearInterval(i)
			return
			}
		if(f<=0){
			n=to
			window.clearInterval(i)
			}
		else
			n+=per
		f--
		if(n<0)n=0//边框可能有误差
		o.style[h] = n+'px'
		if(f<=0 && ff)
			ff()
		},	16)
	}
	
}//fe
}

