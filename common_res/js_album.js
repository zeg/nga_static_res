var zAlbum = 
{
init:function (){
//if (!window.domStorageFuncs)
//	return this.error('你的浏览器不支持此功能',1)

var uid,tid,pid,id,page,img,x

if(!window.__CURRENT_UID){
	uid = this.getIdInQuery('uid')
	if (uid==null)
		return this.error('参数错误，可以尝试重新打开相册',1)
		
	window.__CURRENT_UID = uid
	}
else
	uid = window.__CURRENT_UID
//ck = window.location.href.match(/(?:\?|&)cd=([^&]+)/i)
//if(ck)cd=cd[1]
//else ck=window.location.hostname
//window.domStorageFuncs.init(ck);

img = commonui.userCache.get('ubbcode_album_cache')
if(!img)
	return this.error('未找到相册数据，可以尝试重新打开相册',2)
tid = this.getIdInQuery('tid')
pid = this.getIdInQuery('pid')
id = this.getIdInQuery('id')
if (img.pid!=pid || img.tid!=tid || img.id!=id)
	return this.error('同时只能打开一个相册，可以尝试重新打开相册',2)
	

page = this.getIdInQuery('page')
if(!page)this.page=page=0
if(!img.album)return this.error('参数错误，可以尝试重新打开相册',1)
if(page>=img.album.length){
	this.error('已到最后页')
	this.page=page=img.album.length-1
	}
if(page<0){
	this.error('已到最前页')
	this.page=page=0
	}
if(!img.album[page]){
	this.error('指定页不存在')
	this.page=page=0
	}

if(img.title)document.title= img.title+' P:'+page

this.pageBase = window.location.search.replace(/^\?/,'&').replace(/&?page=\d+&?/,'&')
var x='';
for (var i=0;i<img.album.length;i++){
	if(i==page)
		x+="<b>["+i+"]</b> "
	else
		x+="<a href='"+window.location.pathname+'?page='+i+this.pageBase+"'>["+i+"]</a> "
	}
$('p').innerHTML=x+"<a href='"+(pid ? '/read.php?pid='+pid : '/read.php?tid='+tid)+"'>[back]</a> <a href='javascript:void(0)' onclick='zAlbum.error(0,2)'>[back &amp; clear]</a>"

this.loadImage(img.album[page])

},//fe

getIdInQuery:function (id){
var r = new RegExp('(?:\\?|&)'+id+'=(\\d+)','i')
x = window.location.href.match(r)
if(x)x=parseInt(x[1],10)
else x=null
this[id]=x
return x
},//fe

error:function (msg,jump){
if(msg)
	window.alert(msg)
if(jump){
	if (jump==2)
		commonui.userCache.del('ubbcode_album_cache')
	//var pid = this.getIdInQuery('pid')
	//if (pid)
	//	return window.location.href='/read.php?pid='+pid
//	var tid = this.getIdInQuery('tid')
	//if (tid)
	//	return window.location.href='/read.php?tid='+tid
	}
},//fe

loadImage:function (src){
var x = new Image()
var self=this
x.onload=x.onreadystatechange=function(){
	if(this && this.readyState && this.readyState!='complete')
		return
	this.onreadystatechange = this.onload=null
	var c = $('c')
	c.style.height=this.height+'px'
	c.style.width=this.width+'px'
	c.innerHTML=''
	c.style.backgroundImage='url("'+this.src+'")'

	var c = document.body

	c.onmousedown = function (e){
		self.mouseDown(e)
		}

	c.onmousemove = function (e){
		self.mouseMove(e)
		}

	c.onmouseup = function (e){
		self.mouseUp(e)
		}

	window.onmouseout = c.onmouseout = function (e){
		self.mouseOut(e)
		}

	document.onfocusout = window.onblur = function (){
		self.lostFocus=true
		}

	}
x.src=src
},//fe

mouseDown:function (e){
if (!e) var e = window.event;
this._x = e.clientX
this._y = e.clientY
this._moved = false
this._move=true
this.lostFocus=false
window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
},//fe

mouseMove:function (e){
if(!this._move)return
if (!e) var e = window.event;

var x = e.clientX-this._x
var y = e.clientY-this._y

if(x==0 && y==0)return
this._moved = true

var scroll=this.getScroll()
x = scroll.x-x/2
y = scroll.y-y/2

if(x<0)x=0
if(y<0)y=0
window.scrollTo(x,y)

if(e.preventDefault)e.preventDefault()
if(e.stopPropagation)e.stopPropagation()
return false //prevent default
},//fe

mouseUp:function (e){
if (!e) var e = window.event;
this._move=false
if(this._moved)return
if(e.button>1)return //ie left=1, w3c left=0 middle=1
if(this.lostFocus)return this.lostFocus=false
var p = this.page+1
//if (e.button==2)
//	p = this.page-1
window.location.assign(window.location.pathname+'?page='+p+this.pageBase)
},//fe

mouseOut:function (e,o){
if (!e) var e = window.event;
var to = e.relatedTarget || e.toElement;
while(to && to != this){
	if(to.parentNode)
		to = to.parentNode
	else
		to=false
	}
if(!to)this._move=false
},//fe

getScroll:function() {
if(!this.getScrollCheck){
	var c
	if(typeof(window.pageYOffset)!='undefined')
		c ={0:window,1:'pageXOffset',2:'pageYOffset'}
	else if(document.documentElement)
		c ={0:document.documentElement,1:'scrollLeft',2:'scrollTop'}
	else if(document.body)
		c ={0:document.body,1:'scrollLeft',2:'scrollTop'}
	else
		c ={0:{0:0},1:0,2:0}
	this.getScrollCheck=c
	}
return {x:this.getScrollCheck[0][this.getScrollCheck[1]],y:this.getScrollCheck[0][this.getScrollCheck[2]]}
},

getScrollCheck:false,
_x:0,
_y:0,
_moved:false,
_move:false,
tid:0,
pid:0,
uid:0,
page:0,
lostFocus:false
}//ce