if(!window.commonui)
    var commonui = {}

//=======================================================================

commonui.range = {

_prototype:{
zRange: true,
//T:null,
//R:null,
//__p:null,
getParentNode :function(){
	if (this.T==2)
		return this.R.parentElement()
	else if (this.T==1){
		var x = this.R.commonAncestorContainer
		while(x.nodeType!=1)
			x=x.parentNode
		return x
		}
		

	},//fe

isCollapse :function(){
	if (this.T==2){
		if(this.R.text.length>0)
			return false
		else
			return true
		}
	else if (this.T==1)
		return this.R.collapsed

	},//fe

getBoundingClientRect :function(){
	return this.R.getBoundingClientRect()
	},//fe

getClientRects :function(){
	return this.R.getClientRects()
	},//fe

getNodes : function(){
	var x = document.createElement('span')
	if (this.T==2)
		x.innerHTML = this.R.htmlText
	else if (this.T==1){
		var x = document.createElement('span')
		x.appendChild(this.R.cloneContents())
		}
	return x
	},//fe

getHtml : function(){
	if (this.T==2)
		return this.R.htmlText
	else if (this.T==1){
		var x = document.createElement('span')
		x.appendChild(this.R.cloneContents())
		return x.innerHTML
		}
	},//fe

clone : function(){
	var x = function(){}
	x.prototype = this.__proto__ ? this.__proto__ : this.__p
	var y = new x()
	if (this.T==2)
		y.R = this.R.duplicate()
	else if (this.T==1)
		y.R = this.R.cloneRange()
	return y
	},//fe

compare : function(v,r){
	if(r.zRange)r=r.R
	if (this.T==2){
		v = v.replace(/(^|_)(s|e)/gi,function($0,$1,$2){return ($1?'To':'')+$2.toUpperCase()})
		return this.R.compareEndPoints(v,r)
		}
	else if (this.T==1){
		v = v.replace(/([a-z])to([a-z])/gi,function($0,$1,$2){$1+'_TO_'+$2}).toUpperCase()
		return this.R.compareBoundaryPoints(Range[v],r)
		}
	},//fe

isEqual : function(r){
	if(r.zRange)r=r.R
	if (this.T==2)
		return this.R.isEqual(r)
	else if (this.T==1){
		if(this.compare('START_TO_START',r)==0 && this.compare('END_TO_END',r)==0)
			return true
		else
			return false
		}
	},//fe

detach : function (){
	if (this.T==1 && this.R)
		this.R.detach()
	},//fe

getText : function(){
	if (this.T==2)
		return this.R.text
	else if (this.T==1)
		return this.R.toString()
	},//fe

select : function(){
	if(this.T==1){
		var s = window.getSelection()
		s.removeAllRanges();
		s.addRange(this.R);
		}
	else if (this.T==2){
		this.R.select();
		}
	},//fe

selectAllChildren : function(o){
	if (this.T==1) {
		var s = window.getSelection()
		s.selectAllChildren (o);
		} 
	else if (this.T==2){        
		var r = document.body.createTextRange();
		r.moveToElementText (o);
		r.select();
		}
	}
},//pe

_getRangeObj:function(){
this.T = window.getSelection ? 1 : (document.selection ? 2 : null)
if(this.T==1){
	var s = window.getSelection()
	if(s.focusNode==null)
		return
	this.R = s.getRangeAt(0)
	}
else if (this.T==2){
	var s = document.selection
	if(!s)
		return
	this.R = s.createRange()
	}
},//pe

get:function(){

this._getRangeObj.prototype = this._prototype
var r = new this._getRangeObj()
r.__p = this._prototype

if(!r.R)
	return null
else 
	return r

}//pe

}//ce

//=======================================================================

commonui.post=function(u,p,t,m,c){

if(!m)m='post'
if(!t)t=''

var f = document.createElement('form')

f.method = m
f.action = u
f.target = t
f.acceptCharset = c
f.style.display='none'

for (var k in p){
    var x = document.createElement('input')
    x.name=k
    x.value=p[k]
	f.appendChild(x)
    }

document.body.appendChild(f)
f.submit()
document.body.removeChild(f)

}//fe

//=======================================================================
commonui.quoteTo={
currentSelectId:null,
lastSelectRange:null,
currentSelectRange:null,
quoteData:null,
twitterData:null,

quote : function(){
	this.procText()
	//var c = $('atc_content')
	//if(!c)return
	//c.value+=(c.value?'\n':'')+this.quoteData
	//c.scrollIntoView()
	
	commonui.openPostWindow(null,postfunc.__REPLY,'',this.quoteDataX.tid,this.quoteDataX.pid?this.quoteDataX.pid:'','',null,this.quoteData)
	},

sina : function(x){
	if(!x)this.procText()
	var p = {
		appkey:'3938048249',
		title:this.twitterData,
		url:this.urlData
		}
	commonui.post('http://v.t.sina.com.cn/share/share.php',p,'_blank','get','UTF-8')
	},

qq : function(x){
	if(!x)this.procText()
	var p = {
		appkey:'8b5c8745ea364613adfda05c616d9abe',
		title:this.twitterData,
		url:this.urlData
		}
	commonui.post('http://v.t.qq.com/share/share.php',p,'_blank','get','UTF-8')
	},

nete : function(x){
	if(!x)this.procText()
	var p = {
		info:this.twitterData+' '+this.urlData
		}
	commonui.post('http://t.163.com/article/user/checkLogin.do',p,'_blank','get','UTF-8')
	},

hideWindow:function(e){//隐藏弹出窗 绑定至window mouseup
	if(!e)
		e = window.event
	if(e.__quoteToIgnoreThisEvent || e.keyCode==255)//弹出动作时忽略事件
		return;
	//console.log(4)
	var w = $('selectTextHintWindow')
	if(w && w.style.display!='none')
		w.style.display='none'
	},

onmouseup:function(e,l){
	/*
if(this.hold){
	this.hold=false
	return
	}
	*/
var w = $('selectTextHintWindow')
if(w && w.style.display!='none')
	w.style.display='none'

if(!commonui.postBtn.argCache || !commonui.postBtn.argCache[l])
	return

var r = commonui.range.get()

if(!r || r.isCollapse())
	return

this.currentSelectId = l
this.currentSelectRange = r

if(!w){
	w = _$('<div class="urltip urltip2" style="margin:0;height:16px;line-height:16px" id="selectTextHintWindow" onmouseup="commonui.cancelBubble(event)"><nobr><a href="javascript:void(0)" onclick="commonui.quoteTo.quote()" title="引用选中的文字" class="inlineBlock" style="background:url('+__IMG_STYLE+'/quoteto.png);width:16px;height:16px"></a>&nbsp; &nbsp;<a href="javascript:void(0)" onclick="commonui.quoteTo.sina()" title="分享到新浪微博" target="_blank" class="inlineBlock" style="background:url('+__IMG_STYLE+'/quoteto.png) 0px -16px;width:16px;height:16px"></a>&nbsp;<a href="javascript:void(0)" onclick="commonui.quoteTo.qq()" title="分享到腾讯微博" target="_blank" class="inlineBlock" style="background:url('+__IMG_STYLE+'/quoteto.png) 0px -32px;width:16px;height:16px"></a>&nbsp;<a href="javascript:void(0)" onclick="commonui.quoteTo.nete()" title="分享到网易微博" target="_blank" class="inlineBlock" style="background:url('+__IMG_STYLE+'/quoteto.png) 0px -48px;width:16px;height:16px"></a></nobr></div>')
	document.body.appendChild(w)
	}

if(!e)
	e = window.event

e.__quoteToIgnoreThisEvent = e.keyCode = 255//hideWindow中忽略此事件(ie6event不能添加自定义属性)(取消事件可能引起浏览器鼠标手势插件失灵)

var e = __NUKE.position.get(e)
var rp = r.getBoundingClientRect()

w.style.left = '0px'
w.style.top = '0px'
w.style.display='block'

var t=0
if(Math.abs(e.y-rp.top)>=Math.abs(e.y-rp.bottom))
	t=rp.bottom+3
else
	t=rp.top-w.offsetHeight-8

w.style.left = Math.floor(e.px)+'px'
w.style.top = Math.floor(t)+e.yf+'px'

},//fe

procText:function(){

var r=this.currentSelectRange, a = commonui.postBtn.argCache[this.currentSelectId], n = r.getNodes(), m = n.getElementsByTagName("*"), d=[],q=[]

for (var i=0; i<m.length; i++){
	if(m[i].style.display=='none')
		d.push(m[i])
	var j = m[i].className.match(/(?:^| )(x|urltip|urltip2)(?: |$)/i)
	if(j)
		d.push(m[i])
	}

for (var i=0; i<d.length; i++){
	if(d[i] && d[i].parentNode)
		d[i].parentNode.removeChild(d[i])
	}

a.pid = parseInt(a.pid,10)

var txt = (n.innerText ? n.innerText : n.textContent).replace(/(?:Reply to )?\[ (?:Reply|Topic) \] Post by .+? \(\d+-\d+-\d+ \d+:\d+\):?/i,''),dispname = _$('/span').$0('style',{display:'none'},'innerHTML',commonui.userInfo.users[a.pAid].username)

document.body.appendChild(dispname)

this.quoteData = "[quote]["+(a.pid?'pid':'tid')+"="+(a.pid?a.pid:a.tid)+"]"+(a.pid?'Reply':'Topic')+"[/"+(a.pid?'pid':'tid')+"] [b]Post by [uid"+(a.pAid>0 ? '='+a.pAid : '')+"]"+dispname.innerHTML+"[/uid] ("+commonui.time2date(a.postTime,'Y-m-d H:i')+"):[/b]\n\n"+txt+"[/quote]"

document.body.removeChild(dispname)

this.quoteDataX = {tid:a.tid,pid:a.pid}

this.twitterData= (a.authorid!=__CURRENT_UID ? '<'+$('postauthor'+this.currentSelectId).innerHTML+'@'+window.__BBSURL.replace('http://','')+'>:' : '' )+txt.replace(/\s+/g,' ')

this.urlData=window.__BBSURL+'/read.php?'+(a.pid?'pid='+a.pid:'tid='+a.tid)


},//fe



afterPostQuote:function(type,c,url){

if(c && url){
    this.twitterData = c

    this.urlData = url
    
    var x = document.getElementById("meta-refresh");
    if (x)
        x.parentNode.removeChild(x);

    if(!window.__IMG_STYLE)
        __IMG_STYLE = 'http://img4.ngacn.cc/ngabbs/nga_classic'

    var x  = "<br/><br/><span style='color:#AAA'>&gt; </span><span style='line-height:32px;font-size:14px;font-weight:bold'> <nobr><a href='javascript:void(0)' onclick='commonui.quoteTo.afterPostQuote(1)' style='color:#C080C0'><img src='"+__IMG_STYLE+"/q_sina.png' style='border:none;vertical-align:middle'/> 转发到新浪微博</a></nobr> <nobr><a href='javascript:void(0)' onclick='commonui.quoteTo.afterPostQuote(2)' style='color:#C080C0'><img src='"+__IMG_STYLE+"/q_nete.png' style='border:none;vertical-align:middle'/> 转发到网易微博</a></nobr> <nobr><a href='javascript:void(0)' onclick='commonui.quoteTo.afterPostQuote(3)' style='color:#C080C0'><img src='"+__IMG_STYLE+"/q_qq.png' style='border:none;vertical-align:middle'/> 转发到腾讯微博</a></nobr> </span>"
	
	if(type)
		return x
	else
		document.write(x)
    }

if(!type)return

switch(type){
    case 3:
        this.qq(1);
        break;
    case 2:
        this.nete(1);
        break;        
    case 1:
        this.sina(1);
        break;
    } 

    
}//fe


}//ce


//=======================================================================


//commonui.aE(window,'mouseup',function(e){commonui.quoteTo.hideWindow()})