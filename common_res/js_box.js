
;(function(){

var $ = _$, HTTP = new XMLHttpRequest()
cs = document.characterSet || document.defaultCharset || document.charset;
var error = function(e,a){
commonui.progbar(100)
if(!a)
	commonui.alert(e)
console.log(e)
}

HTTP.onerror = function(e){
	error('HTTP ERROR')
	}
	
HTTP.onload = HTTP.onabout = function(e){

	}

HTTP.onprogress = function(e){
	commonui.progbar(30,5000)
	}



var P = {}, preg = /^(?:https?:\/\/[^\/]+?)?(\/(?:(?:read|thread)\.php)?)/;

P.frame = (window.parent==window)
P.off=false
P.aInit=false
P.init=function(o){
if(!window.commonui)
	return setTimeout(function(){P.init()},50)

if(this.off)return
if(this.aInit)return
this.aInit=true

if(commonui)
	commonui.htmlLoader =  this

window.addEventListener('popstate',function(e){P.onPopHis(e.state)})
document.body.addEventListener('click',function(e){
	if(e.shiftKey || e.altKey || e.ctrlKey)
		return
	var h = commonui.parentAHerf(e.target || e.srcElement)
	if(!h || !h._useloadread)//&1使用htmlloader加载 &8如果可能使用连续加载
		return
	var m = h.href.match(preg)
	if(m){
		if(window.iframeRead){
			if(commonui.checkIfInIframe()){
				if(m[1]=='/thread.php')
					return
				}
			else{
				if(location.pathname=='/thread.php' && m[1]=='/read.php')
					return
				}
			}
		var o = h
		while(o && !o.id)
			o=o.parentNode
		e.returnValue = false
		e.cancelBubble = true;
		e.preventDefault()
		e.stopPropagation()
		P.go(1|((h._useloadread&8)?8:0)|(h.href==location.href?32:0),
				{//go
				url:h.href,
				fromUrl:location.href,
				pos: ((o && o.id)?{posId:o.id,posRect:P.getRect(o)}:null) 
				}
			)
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
 * @param {type} act &1加载链接 &4不添加历史记录 &8如果可能连续加载页面 &16替换历史记录 &32清除缓存
 * @param {type} go {url:目标地址, 
 *		pos:{偏移坐标等信息
 *		xf:
 *		yf:
 *		posId:定位元素或元素的id
 *		posRect:定位元素原来的位置
 *		}, isHis:是从历史来的}
 * @returns {undefined}
 */
P.go = function(act,go){
if(act & 1){
	commonui.progbar(10,5000)
	if(!this.mc)
		this.mcInit()
	P.ifContinuePage=P.updateContinuePage(go.url)
	if((act&8)==0)
		P.ifContinuePage &= ~3
	if((P.ifContinuePage&4) && P.curUrl.pathname=='/read.php')
		act |=16
	if((act&4)==0 /*&& this.frame*/){
		if(act & 16){
			console.log('hisreplace','',go.url)
			var s = {from:'htmlLoader',til:go.til?go.til:go.url,url:go.url}
			history.replaceState(s,s.til,s.url)
			}
		else{
			//var s = history.state
			var s={from:'htmlLoader',til:document.title,url:location.href,pos:go.pos?go.pos:__NUKE.position.get()}
			//console.log('hisreplaceaddpos',s.til,s.url)
			history.replaceState(s,s.til,s.url)//加载链接时更新历史记录(添加滚动偏移)
			//console.log('hispush','',go.url)
			history.pushState({from:'htmlLoader'},go.til?go.til:go.url,go.url)
			}
		}
	window.__fromUrl = go.fromUrl
	if((P.ifContinuePage&3)==0)
		this.hideCurrent()
	this.loadNew(act,go)
	}
}//fe



P.hideCurrent = function(){
this.mcHide()
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
commonui.progbar(20,5000)
}//fe

P.getRect = function(o){
var x = o.getBoundingClientRect()
return {top:x.top,right:x.right,bottom:x.bottom,left:x.left}
}//


P.showNew = function(act,data,go){
var html=data.html.join(''),script = [],til = data.til,url=data.url, ok = P.ifContinuePage, scrollto

if((ok&3)==0)
	P.mcClear()//del global var here


for(var i=0;i<data.scriptPre.length;i++)
	commonui.eval(data.scriptPre[i])

//load ads
if(ngaAds && ngaAds.reset){
	ngaAds.reset()
	if(navigator.userAgent.match(/iphone|mobile|IEMobile/i))
		ngaAds.loadGroup('mobi')
	else{
		if(url.match(/\/read\.php/))
			ngaAds.loadGroup('read')
		else if(url.match(/\/thread\.php/))
			ngaAds.loadGroup('thread')
		else
			ngaAds.loadGroup('other')
		}
	}
//add new html
if(ok&3){//连续翻页
	var th='<theader><tr><th colspan=6 id="continuepage'+(P.curUrl._arg.page-(ok&1?0:1))+'" style="font-size:0.833em;font-weight:normal"> PAGE '+(P.curUrl._arg.page+(ok&1?0:1))+' </th></tr></theader>'
	if(P.curUrl.pathname=='/thread.php'){
		var e = html.lastIndexOf("<!--topiclistend-->"), b = html.indexOf("<!--topicliststart-->"), lp = $('topicrows'), x = $('/table')
		html = html.substr(b,e-b)
		x.innerHTML=(ok&1?th:'')+'<tbody>'+html+'</tbody>'+(ok&2?th:'')
		}
	else if(P.curUrl.pathname=='/read.php'){
		var e = html.lastIndexOf("<!--postlistend-->"), b = html.indexOf("<!--postliststart-->"), lp = $('m_posts_c'), x = $('/span'),th='<table class="forumbox postbox" cellspacing="1px">'+th+'</table>'
		html = html.substr(b,e-b)
		x.innerHTML=(ok&1?th:'')+html+(ok&2?th:'')
		}
	if(ok&1){//向后
		scrollto = P.nearElm(lp.lastChild,1)
		scrollto = {posId:scrollto,posRect:scrollto.getBoundingClientRect(),dir:'bottom'}
		while(x.firstChild)
			lp.appendChild(x.firstChild)
		}
	else{//向前
		scrollto = {posId:lp,posRect:lp.getBoundingClientRect(),dir:'top'}
		while(x.lastChild)
			lp.insertBefore(x.lastChild,lp.firstChild)
		}

	var e= document.getElementsByName('pageball')
	commonui.pageBtn(e[0],[__PAGE[0], __PAGE[1], P.minUrl._arg.page, __PAGE[3], P.maxUrl._arg.page],4|16)
	commonui.pageBtn(e[1],[__PAGE[0], __PAGE[1], P.minUrl._arg.page, __PAGE[3], P.maxUrl._arg.page],2|8)
	}
else{
	P.mcInsert(html)
	}



//inline script proc
if(ok&3){//连续加载页时只运行一部分脚本
	for(var i=0;i<data.script.length;i++)
		if(data.script[i].match(/^\s*(\/\/topicloadallstart|commonui\.topicArg\.add|\/\/userinfostart|ngaAds\.bbs_ads8_load_new|commonui\.postArg\.proc|ubbcode\.attach\.load|\/\/everyload|\/\/everypage)/) )
			script.push(data.script[i])
	}
else{
	//save global var name in script
	/*var e = (this.mcClear.currentGlobal=[])
	for(var i=0;i<data.script.length;i++)
		data.script[i].replace(/(?:^|\n)\s*(__[a-zA-z)-9_]+)(?:\s*)=/g,
			function(m,n){
				console.log(m)
				e.push(n)
				return m
				})*/
	script = data.script
	}



if(go.isHis)
	scrollto = go.pos
//console.log('act',act)
commonui.progbar(75,5000)
P.runScript(script,0,function(){
	P.mcShow()
	var p = url.match(/page=(\d+)/)
	p = p?p[1]:1
	document.title = til+' P'+p

	P.scroll(scrollto)
	
	if((act&4)==0){
		//if(P.frame)
		//console.log('his'+(act&16 ? 'replace' :'push'),url,document.title)
		history.replaceState({from:'htmlLoader',url:url,til:document.title},document.title,url)//渲染完成后更新访问历史
		}

	P.otherOnContentLoad(act,go.url,go.fromUrl)

	if(!P.frame){
		try{
			window.parent.iframeRead.complete(document.title,url,2|(act&4))
			}
		catch(e){console.log(e)}
		}
	commonui.progbar(100)
	})
}//fe

P.runScript = function(ss,i,f){
if(!i)i=0
for(;i<ss.length;i++){
	if(__SCRIPTS.loading){
		console.log('wait load '+__SCRIPTS.loading)
		return __SCRIPTS.wload(function(){console.log('wait load ok');P.runScript(ss,i,f)})
		//return setTimeout(function(){P.runScript(ss,i,f)},15)
		}
	commonui.eval.call(window,ss[i])
	}
if(f)f()
}//

/**
 * 
 * @param {type} so {
 *		posId 滚动目标元素的id或obj
 *		posRect 目标元素的初始位置
 *		dir 对齐目标元素的边 top 或 bottom
 *		}
 * @returns {undefined}
 */
P.scroll = function(so){
if(!so)
	return
if(so.posId){
	var o = typeof so.posId == 'string' ? $(so.posId) : so.posId
	if(o){
		var po=__NUKE.position.get(), tt = so.dir ? so.posRect[so.dir] : so.posRect.top
		if(so.posRect && (tt>po.ch || tt<0))// 初始位置在屏幕外
			tt = 1
		else
			tt = 2
		if(tt ==1){//滚动到中央
			//console.log('scroll to '+o.id+' '+(so.dir?so.dir:'top'))
			var qo = o.getBoundingClientRect()[so.dir?so.dir:'top']
			window.setTimeout(function(){scroll(0,qo+po.yf-po.ch/2)})
			}
		else{//滚动到原位
			var ret = o.getBoundingClientRect()
			if(ret.top != so.posRect.top || ret.bottom != so.posRect.bottom){
				//console.log('scroll to '+o.id+' org')
				var xf = po.xf - (ret.left + so.posRect.left), yf = po.yf + (ret.top - so.posRect.top)
				window.setTimeout(function(){scroll(xf,yf)})
				}
			//else
			//	console.log('no scroll')
			}

		}
	}
else if(so.pos && (so.pos.yf || so.pos.xf)){
	//console.log('scroll',so.pos.xf,so.pos.yf)
	window.setTimeout(function(){scroll(so.pos.xf,so.pos.yf)})
	}	
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
	
this.otherOnClear()

//return z
}//fe


P.otherOnContentLoad = function(act , url, fromUrl){
if((this.ifContinuePage&3)==0 && location.hash && commonui.hashAction)//hash action
	commonui.hashAction()

if(commonui.customBackgroundUpdate && window.__CURRENT_FID)
	commonui.customBackgroundUpdate( commonui.getForumBg(__CURRENT_FID,window.__CURRENT_F_BIT) )
}//

P.otherOnClear = function(){
if(i = this.mcClear.currentGlobal.length){
	while(--i>=0)
		window[this.mcClear.currentGlobal[i]] = undefined
	//this.mcClear.currentGlobal=[]
	}
if(commonui.postBtn){
	if(commonui.postBtn.clearCache)
		commonui.postBtn.clearCache()
	if(commonui.postBtn.clearArgCache)
		commonui.postBtn.clearArgCache()
	}

if(commonui.postArg && commonui.postArg.clearCache)
	commonui.postArg.clearCache()

if(commonui.time2dis)
	commonui.time2dis.now=null

if(postfunc && postfunc.reset)
	postfunc.reset()

//if(commonui.topicArg && commonui.topicArg.clearCache)
//	commonui.topicArg.clearCache()
}//

P.mcClear.currentGlobal=["__CURRENT_FID", "__CURRENT_F_BIT", "__CURRENT_F_ALLOWPOST", "__ALL_FORUM_DATA", "__ALL_SET_DATA", "__SELECTED_FORUM", "__SELECTED_FORUM_ADD", "__SELECTED_SET", "__SUB_AND_UNION_FORUM_AND_SET", "__CURRENT_ORDER", "__CURRENT_PAGE", "__SUB_SET", "__SUB_AND_UNION_FORUM",  "__CURRENT_F_ALLOWREPLY", "__CURRENT_TID", "__CUSTOM_LEVEL",'__AUTO_TRANS_FID','__SEARCHING']

P.mcInsert = function(html){
var x = $('/span'),mc=this.mc,at=this.mcAt

x.innerHTML=html
while(x.firstChild)
	mc.insertBefore(x.removeChild(x.firstChild),at)
}//fe

P.onPopHis = function(st){
if(st && st.from=='htmlLoader' && st.url){
	console.log('pop1',st)
	st.isHis = 1
	this.go(5,st)
	}
console.log('ig pop1',st)
}//fe

P.his=[]
P.loadNew=function(act,go){

if(commonui.insAdsChk){
	if(commonui.insAdsChk(go.url))
		return console.log('show ins ads, cancel load')
}
if(act&32){
	var m = go.url.match(preg),h=[]
	for(var i=0;i<this.his.length;i++){
		var n = this.his[i].url.match(preg)
		if(m[1]!=n[1])
			h.push(this.his[i])
		else
			this.his[i]=null
		}
	this.his = h
	}
for(var i=0;i<this.his.length;i++){
	if(go.url==this.his[i].url)
		return P.showNew(act,this.his[i],go)
	}
	
var ugo = go.url
HTTP.__rep = 0
HTTP.abort()
HTTP.open('GET', ugo)
HTTP.onreadystatechange = function (){
	if (HTTP.readyState !== HTTP.DONE)
		return;
	var all = HTTP.responseText
	if (HTTP.status != 200 || HTTP.getResponseHeader("X-NGA-CONTENT-TYPE")=='short-message'){
		var c = all.match(/<!--msgcodestart-->(\d+)<!--msgcodeend-->/)
		if(c && c[1]==15 && HTTP.__rep<1){
			__COOKIE.setCookieInSecond('guestJs',__NOW,1200)
			HTTP.__rep++
			return setTimeout(function(){
				HTTP.abort()
				HTTP.open('GET',ugo)
				HTTP.send()
				},500)
			}
		var c = all.match(/<!--msginfostart-->(.+?)<!--msginfoend-->/g)
		if(c){
			var ap = ugo.substr(ugo.indexOf('?')).match(/(?:uid|stid|fid|tid|page|pid)=(?:-?\d+)/g)
			return error(_$('/span','className','ltxt b','innerHTML',c.join('<br/>'))._.add(
				__CURRENT_UID ? null : [_$('/br'),_$('/br'),'你可能需要 ' , _$('/a','href','javascript:void(0)','onclick',function(){},'innerHTML','[登录]'), ' 后访问...'],
				((__SETTING.uA[2]==4 || __SETTING.uA[2]==2) && ap)? 
					[_$('/br'),_$('/br'),_$('/a','href','javascript:void(0)','nga://?'+ap.join('&') , '使用APP打开...','onclick',function(e){
						if(__SETTING.uA[0]==7){
							alert('请在右上菜单中选择 "在浏览器打开"')
							commonui.cancelBubble(e)
							return commonui.cancelEvent(e)
							}
						if(__SETTING.uA[2]==2){
							var st=e.timeStamp,to= setTimeout(function() {
								if (!st || (Date.now() - st) < 800)
									 window.location.assign('http://app.nga.cn/');
								}, 600)
							commonui.aE(window,'blur',function() {if(to)clearTimeout(to)})
							}
						})]
					: null
				))
			}
		return error('HTTP ERROR '+HTTP.status);
		}
	commonui.progbar(40,5000)
	var data = P.htmlProc(all,go)

	P.his.push(data)
	if(P.his.length>5)
		P.his.shift()
	commonui.progbar(50,5000)
	P.showNew(act,data,go)
	}//
HTTP.overrideMimeType("text/html; charset="+cs)
HTTP.send()
}//fe

P.clearHis=function(){
while(P.his.length)
	P.his.shift()
}//fe

P.htmlProc = function(all,go){
var s = all.indexOf("<div id='mainmenu'>"), e = all.lastIndexOf("<div id='footer'"), b = all.indexOf("</head>"),
head = all.substr(0,b),
body = all.substr(s,e-s),
til = head.match(/<title>(.+?)<\/title>/),
scp = head.match(/\/\/loadscriptstart([\x00-\xff]+?)\/\/loadscriptend/g)

body = body.split(/<\/?script[^>]*>/)
body.shift();body.shift()//remove mainmenu and mainmenu init
data = {}
data.til = til?til[1]:go.url//标题
data.scriptPre = []//预加载脚本
data.script = []
data.html = []
if(scp){
	for(var i =0;i<scp.length;i++)
		data.scriptPre.push(scp[i])
	}
data.url =go.url

for(var i=0;i<body.length;i++){
	if(i&1){
		body[i] = body[i].replace(/\/\/loadscriptstart([\n.]+?)\/\/loadscriptend/,function($0){data.scriptPre.push($0);return ''})
		data.script.push(body[i])
		}
	else
		data.html.push(body[i])
	}
return data
}//


P.assign = function(u){
//console.log(u)
var m = u.match(preg)
//console.log(m)
if(m)
	this.go(1,{url:u})
else
	location.assign(u)
}//

P.minUrl=null //连续翻页时最小页
P.maxUrl=location.href//连续翻页时最大页
P.curUrl=null //连续翻页时当前页
P.ifContinuePage=null //本次加载是否是连续翻页 &2比最小页小1 &1比最大页大1 &4除了页数都一样

//判断url是否是连续翻页
P.updateContinuePage = function(gl){//本次加载的url
if(typeof gl == 'string'){
	gl = commonui.urlToAry(gl)
	gl._arg = P.searchArg(gl.search)
	if(!gl._arg.page)
		gl._arg.page=1
	gl._arg.page = gl._arg.page|0
	P.curUrl = gl
	}
if(typeof P.maxUrl == 'string'){
	P.maxUrl = commonui.urlToAry(P.maxUrl)
	P.maxUrl._arg = P.searchArg(P.maxUrl.search)
	if(!P.maxUrl._arg.page)
		P.maxUrl._arg.page=1
	P.maxUrl._arg.page = P.maxUrl._arg.page|0
	}
if(P.ifSamePage(gl,P.maxUrl)){//除了page之外的参数相同
	if(!P.minUrl)
		P.minUrl = __NUKE.simpleClone(P.maxUrl)
	if(P.maxUrl._arg.page-P.minUrl._arg.page>10){
		P.maxUrl = gl
		P.minUrl=null
		return 4
		}
	if(gl._arg.page - P.maxUrl._arg.page ==1){//比最大页大1
		P.maxUrl = gl
		return 1|4
		}
	if(P.minUrl._arg.page - gl._arg.page ==1){//比最小页小1
		P.minUrl = gl
		return 2|4
		}
	P.maxUrl = gl
	P.minUrl=null
	return 4
	}
P.maxUrl = gl
P.minUrl=null
}//

P.searchArg = function(x){
arg = {}
x.replace(/([^\?&=]+)=([^\?&=]*)/g,function($0,$1,$2){arg[$1]=$2})
return arg
}//

P.ifSamePage = function(nl,cl){
var ok = 0
if(nl.hostname == cl.hostname && nl.pathname == cl.pathname){
	if(nl.pathname=='/thread.php' || nl.pathname=='/read.php'){
		ok = 1
		if(ok){
			for(var k in nl._arg){
				if(k!='page'){
					if(nl._arg[k] != cl._arg[k])
						return ok = 0
					}
				}
			for(var k in cl._arg){
				if(k!='page'){
					if(nl._arg[k] != cl._arg[k])
						return ok = 0
					}
				}
			}
		}
	}
return ok
}//

P.nearElm = function(o,opt){

while(o.nodeType!=1 || o.nodeName=='SCRIPT'){
	var p = o[opt&1 ? 'previousSibling' : 'nextSibling']

	o = p?p:o.parentNode
	}
return o
}//

window.__LOADERREAD = P
window._LOADERREAD = P
})();




__SCRIPTS.src=function(s){
if(s=='read'||s=='armory'||s=='quoteTo')
	if(this.lo[s])return 1
}