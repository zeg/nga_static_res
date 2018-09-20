
;(function(){


var $ = _$, HTTP = new XMLHttpRequest()
cs = document.characterSet || document.defaultCharset || document.charset;

HTTP.onerror = function(e){
	error('HTTP ERROR')
	}
	
HTTP.onload = HTTP.onabout = function(e){

	}

HTTP.onprogress = function(e){

	}



var P = {}, preg = /^(?:https?:\/\/[^\/]+?)?(\/(?:read|thread)\.php)/;

P.off=false
P.aInit=false
P.init=function(o){
if(this.off)return
if(this.aInit)return
this.aInit=true

document.body.addEventListener('click',function(e){
	var h = commonui.parentAHerf(e.target || e.srcElement)
	if(!h)return
	var m = h.href.match(preg)
	if(m){
		if(window.iframeRead){
			if(window.parent!=window){
				if(m[1]=='/thread.php')
					return
				}
			else{
				if(location.pathname=='/thread.php' && m[1]=='/read.php')
					return
				}
			}
		e.returnValue = false
		e.cancelBubble = true;
		e.preventDefault()
		e.stopPropagation()
		P.go(1,{url:h.href})
		return false
		}
	P.go(0)
	},
	true)

}//fe

P.mc=null
P.mcAt=null
P.mcInit = function(){
this.mc = $('mc')
this.mcAt = $('footer')



}//
P.mcShow=function(){
this.mc.style.display=''
}//
P.mcHide=function(){
this.mc.style.display='none'
}//

/**
 * 
 * @param {type} act &1加载链接 &4不更新历史记录
 * @param {type} go {url:目标地址, p:偏移坐标等信息}
 * @returns {undefined}
 */
P.go = function(act,go){
if(act & 1){
	if(!this.mc)
		this.mcInit()
	if((act&4)==0){
			var s = history.state
			if(!s)s={til:document.title,url:location.href}
			s.p = __NUKE.position.get()
			console.log(s)
			history.replaceState(s,s.til,s.url)//加载链接时更新历史记录(添加滚动偏移)
		}
	this.hideCurrent()
	this.loadNew(act,go)
	}
}//fe



P.hideCurrent = function(){
this.mcHide()
this.mcClear()
var x = document.body.childNodes
for(var i=0;i<x.length;i++){
	if(x[i].className && x[i].className.match(/single_ttip2/))
		document.body.removeChild(x[i--])
	}
if(commonui.loadReadHidden)
	commonui.loadReadHidden.reset()
if(commonui.selectForum)
	commonui.selectForum.reset()
//this.his.push(z)
//if(this.his.length>5)
//	this.his.shift()
}//fe

P.showNew = function(act,data,go){
var html='',sc = [],til = data.til,url=data.url
for(var i=0;i<data.length;i++){
	if(i&1){
		data[i] = data[i].replace(/\/\/loadscriptstart([\n.]+?)\/\/loadscriptend/,function($0){console.log($0);commonui.eval.call(window,$0);return ''})
		sc.push(data[i])
		}
	else
		html+=data[i]
	}
P.mcInsert(html)
P.runScript(sc,0,function(){
	P.mcShow()
	var p = url.match(/page=(\d+)/)
	p = p?p[1]:1
	document.title = til+' P'+p
	
	if(go.p && (go.p.yf || go.p.xf)){
		//console.log('scroll',go.p.xf,go.p.yf)
		window.setTimeout(function(){scroll(go.p.xf,go.p.yf)})
		}
	if((act&4)==0){
		console.log(url,document.title)
		history.pushState({'url':url,'til':document.title},document.title,url)//渲染完成后保存访问历史
		}
	})
}//fe

P.runScript = function(ss,i,f){
if(!i)i=0
for(;i<ss.length;i++){
	if(__SCRIPTS.loading){
		console.log('wait load')
		return setTimeout(function(){P.runScript(ss,i,f)},15)
		}
	commonui.eval.call(window,ss[i])
	}
if(f)f()
}//

P.mcClear = function(){
var x = this.mc.childNodes,y=[]//,z=$('/span')
for(var i=0;i<x.length;i++){
	y.push(x[i])
	}
for(var i=0;i<y.length;i++){
	var o = y[i]
	if(o.nodeName=='SCRIPT')o.parentNode.removeChild(o)
	else if(o.id=='mainmenu' || o.id=='footer'){}
	else{
		o.parentNode.removeChild(o)
		//z.appendChild(o)
		}
	}
//return z
}//fe

P.mcInsert = function(html){
var x = $('/span'),mc=this.mc,at=this.mcAt
x.innerHTML=html
while(x.firstChild)
	mc.insertBefore(x.removeChild(x.firstChild),at)
}//fe

P.onPopHis = function(st){
if(st.url){
	this.go(5,st)
	}
}//fe

P.his=[]
P.loadNew=function(act,go){
for(var i=0;i<this.his.length;i++){
	if(go.url==this.his[i].url)
		return P.showNew(act,this.his[i],go)
	}
HTTP.abort()
HTTP.open('GET',go.url)

HTTP.onreadystatechange = function (){
	if (HTTP.readyState !== HTTP.DONE)
		return;
	if (HTTP.status !== 200)
		return error('HTTP ERROR '+HTTP.status);

	var all = HTTP.responseText, s = all.indexOf("<div id='mainmenu'>"), e = all.lastIndexOf("<div id='footer'"), b = all.indexOf("</head>"),
	head = all.substr(0,b),
	data = all.substr(s,e-s),
	til = head.match(/<title>(.+?)<\/title>/)
	
	data = data.split(/<\/?script[^>]*>/)
	data.shift();data.shift()//remove mainmenu and mainmenu init

	data.til = til?til[1]:go.url
	data.url =go.url
	
	P.his.push(data)
	if(P.his.length>5)
		P.his.shift()
	
	P.showNew(act,data,go)
	}//
HTTP.overrideMimeType("text/html; charset="+cs)
HTTP.send()
}//fe


P.assign = function(u){
	console.log(u)
var m = u.match(preg)
console.log(m)
if(m)
	this.go(1,{url:u})
else
	location.assign(u)
}//

commonui.htmlLoader = P

commonui.aE(window,'popstate',function(e){P.onPopHis(e.state)})


})();




var _LOADERREAD = commonui.htmlLoader



__SCRIPTS.src=function(s){
if(s=='read'||s=='armory'||s=='quoteTo')
	if(this.lo[s])return 1
}