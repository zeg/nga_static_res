
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

border:2,//��������߿���

mSize:0,//ҳ��������
hSize:0,//���������۵�ʱ�Ŀ��
sSize:0,//��������չ���Ŀ��
stat:0,//��ǰ״̬ 0�۵� 1չ��
toStat:0,//����Ϊ״̬
trans:null,
pMW:0,//ҳ���Ҳ���ռ�õĿ��
actTimout:null,
toUrl:null,
clickSound:null,
aInit:null,
atext:null,
gopt:0,//&1 nosavehis
//initGoUrl:null,

go:function(u){
var s = this

s.f.style.display='none'

s.show(u)

},//fe


//---------------------------
initA:function(o){//��ҳ��init
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
	var h = commonui.parentAHerf(e.target || e.srcElement)
	if(!h)return
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
	h = commonui.parentAHerf(e.target || e.srcElement)
	if(!h)
		return s.hide()
	//console.log('h.__mousedowntime '+h.__mousedowntime)
	if(h.__mousedowntime && e.timeStamp-h.__mousedowntime>=500)
		return h.__mousedowntime=0
	var m = h.href.match(p)
	
	if(m && (m[1]=='/read.php' || m[1]=='/nuke.php') && l.pathname != m[1]){


		s.atext = h.textContext  ? h.textContext : (h.innerText?h.innerText:h.innerHTML)
		e.returnValue = false
		e.cancelBubble = true;
		e.preventDefault()
		e.stopPropagation()
		s.go(h.href)
		return false
		}
	else
		s.hide()
	},
	true)
//if(this.initGoUrl)
//	this.go(this.initGoUrl)
},//fe

initB : function(){//��ҳ��init
var p = /^(?:https?:\/\/[^\/]+?)?(\/(?:read|nuke)\.php)/;
commonui.aE(window,'bodyInit',function(){
	document.body.addEventListener('click',function(e){
		//console.log('click '+e.timeStamp)
		var h = commonui.parentAHerf(e.target || e.srcElement)
		if(!h)
			return
		//console.log('h.__mousedowntime '+h.__mousedowntime)
		if(h.href.match(p))
			return
		if(h.target!='_blank')
			h.target='_parent'
		},
		true)
	})
try{
	window.parent.iframeRead.complete(document.title,location.href,1|(this.gopt&4))	
}catch(e){
	console.log(e)
	//commonui.crossDomainCall(1, '*', "iframeReadSetWindowTitle", null, document.title)
	}
},//fe

//---------------------------
calcPopSize:function(){
var z=__SETTING.currentClientWidth-this.mSize-this.pMW, y=0
if(z<0)z=0
if( __SETTING.bit & 4){//<= 10 inch
	y = __SETTING.currentClientWidth
	}
else{
	y = Math.floor(__SETTING.currentClientWidth*0.6)
	if(y<900)y=900
	if(y>__SETTING.currentClientWidth)y = Math.floor(__SETTING.currentClientWidth*0.9)
	}
this.hSize = z, this.sSize = y
},//fe

//---------------------------
initOnLoad:function(){
//if(l.hash && l.hash.charAt(1)=='/')
	//s.go(l.hash.substr(1))
this.f = _$('/iframe','style','width:'+this.sSize+'px;height:100%;border:none;direction:rtl;display:none',
	'frameborder','no',
	'border',0,
	'src',''
	)
this.o._.add(this.f)
this.initA()

},//fe

//body��ʼʱ����
init:function(){
this.trans = __NUKE.cpblName(document.getElementsByTagName('head')[0].style,'transition',1)
if(Event.prototype.preventDefault && Event.prototype.stopPropagation && Element.prototype.addEventListener && this.trans){}
else
	return

var w=window, p = __SETTING.currentClientWidth, c=w.commonui, $=_$, s=this

if(commonui.checkIfInIframe()){
	s.off=true
	s.initB()
	return
	}

if(p<1650 || location.pathname=='/read.php')
	s.mSize=p
else{
	s.mSize=1650
	s.pMW = commonui.addMmcMargin(p-s.mSize)
	}

s.calcPopSize()

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
	 )

document.body.insertBefore(s.o,document.body.firstChild)
document.body.insertBefore(s.c,document.body.firstChild)

c.aE(w,'DOMContentLoaded',function(){
	s.initOnLoad()
	})

},//fe

complete:function(til,url,opt){// &1 call from page load,  &2 call from ajax load, &4 pop from his

		console.log('til his 1',til, url)
		if((this.gopt&4)==0){
			//if(!history.state)
				//history.pushState({'from':'ifr','url':null,'purl':location.href,'til':document.title},document.title,location.href)
			var u = commonui.urlToAry(url), l =location
			
			history[opt&2 ? 'pushState' : 'replaceState']({'from':'ifr','url':url,'purl':l.href,'til':til},til,l.protocol+'//'+l.hostname+l.pathname+l.search+'#ifr:'+u.pathname+u.search)
			}
		document.title = til
		this.gopt = 0

},//

/**
*����¼��Ƿ��Ƿ����ڲ�����ť�򴰿ڱ߿��� 
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

actionTimeout1:null,
actionTimeout2:null,
action:function(u){

this.toUrl = u

if(this.actTimout)
	return
var s = this, l = location
if(s.actionTimeout1)
	clearTimeout(s.actionTimeout1)
if(s.actionTimeout2)
	clearTimeout(s.actionTimeout2)

s.actionTimeout1 = setTimeout(function(){
	if(s.stat!=s.toStat){
		if(s.toStat==1){
			s.stat = 1
			s.o.style.width=s.sSize+'px'
			s.c.style.display='none'
			if(s.toUrl && s.toUrl!=s.f.src)
				s.actionTimeout2 = setTimeout(function(){
					s.f.style.display=''
					try{
						if(s.f.contentWindow._LOADERREAD)
							s.f.contentWindow._LOADERREAD.assign( s.toUrl )
						else
							s.f.contentWindow.location.assign( s.toUrl )
						s.f.contentWindow.focus()
						//l.assign(l.href.replace(/#.+$/,'')+'#do:ifr:'+s.toUrl.replace(/https?:\/\/[^\/]+/,''))
					}catch(er){console.log(er)}
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

		try{
			if(s.f.contentWindow._LOADERREAD)
				s.f.contentWindow._LOADERREAD.assign( s.toUrl )
			else
				s.f.contentWindow.location.assign( s.toUrl )
			s.f.contentWindow.focus()
			//l.assign(l.href.replace(/#.+$/,'')+'#do:ifr:'+s.toUrl.replace(/https?:\/\/[^\/]+/,''))
			}catch(er){console.log(er)}
		}
	s.actTimout=null
	},100)
}//fe
}//ce


var sameWindowOpen={
initA : function(o){iframeRead.initA(o)}
}

commonui.aE(window,'popstate',function(e){
	if(e.state && e.state.from=='ifr'){
		console.log('pop2',e.state)
		iframeRead.gopt |=4
		iframeRead.go(e.state.url)
		}
	})

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
		if(n<0)n=0//�߿���������
		o.style[h] = n+'px'
		if(f<=0 && ff)
			ff()
		},	16)
	}
	
}//fe
}//if

