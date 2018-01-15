if(!window.commonui)var commonui={}
commonui.loadTopicUpdate = {
'data':{},
'dataLength':0,
'applying':false,
'postContinerId':'',
'commentContinerIdPrefix':'',
'topicInfo':null,
'refreshtoend':'',
'thisTid':0,
'date':null,
'joinAddress':'http://push.ngacn.cc/nga_join_push_channel.html',
'domain':'',
'inited':false,
'refreshToEndCheck':[],

'init':function(info,pc,cc){
document.domain = this.domain=__AJAX_DOMAIN
this.postContinerId = pc
this.commentContinerIdPrefix = cc
this.topicInfo = info
this.updateMaxPage()
this.thisFid = parseInt(info.fid,10)
this.thisTid = parseInt(info.tid,10)
this.joinTopicUpdateChannel()
this.inited=true
},//fe

'addRefreshToEndCheck':function(f){
if(typeof(f)=='function')this.refreshToEndCheck.push(f)
},

'updateMaxPage':function(){
var m = Math.ceil((this.topicInfo.lastIndex+1)/this.topicInfo.pageSize)
if(this.topicInfo.maxPage){
	if(m>this.topicInfo.maxPage){
		commonui.pagerEditor.changePage(1)
		}
	else if(m<this.topicInfo.maxPage){
		commonui.pagerEditor.changePage(-1)
		}
	}
this.topicInfo.maxPage=m
},//fe

'joinTopicUpdateChannel':function(){
var f = document.createElement('iframe')
f.src = this.joinAddress+'?cid=tid'+this.thisTid+'&domain='+this.domain
f.style.display='none'
document.body.insertBefore(f,document.body.firstChild)
},//fe

'get':function(r){
if(!r || !r.action || (r.action!='new reply' && r.action!='new comment'))return
if(r.error){
	window.alert(r.error)
	return
	}
if(parseInt(r.tid,10) != this.thisTid){return}
var pid = parseInt(r.pid,10)
if(pid!=pid){return}

if(this.topicInfo.maxPage==this.topicInfo.page){//如果在最后一页
	this.refreshtoend = '&page=e'
	/*
	if(this.topicInfo.lastIndex+1==this.topicInfo.pageSize*this.topicInfo.page){//如果没有空间
		this.insert(pid)
		commonui.msgpop.pop('主题新增了一个回复')
		return this.refreshToEnd()
		}
	*/
	}
else
	{
	if(r.action=='new reply'){
		this.insert(pid)
		return commonui.msgpop.pop('主题新增了一个回复')
		}
	}
	
var self=this
var u = './nuke.php?func=loadtopicupdate&lastindex='+this.topicInfo.lastIndex+'&fid='+this.thisFid+'&pid='+pid+'&tid='+this.thisTid+this.refreshtoend
this.insert(pid)
httpDataGetter.script_muti_get(u,
		function(x){
			if (!x)
				return false;
			x.pid = pid;
			self.data[pid]=x;
			if(!self.applying)
				window.setTimeout(function(){self.apply()},Math.floor(5000*Math.random()))
			return true;
			},
		function(){
			self.rollback(pid)
			},
		'gbk'
	);
},//fe

'refreshToEnd':function(reload){
for(var i=0;i<this.refreshToEndCheck.length;i++){
	if(!this.refreshToEndCheck[i]()){return}
	}
if(reload){return window.location.reload()}
var x=window.location.href.replace(/(\?|&)page=(e|\d+)/i,function($0,$1){return $1+'page='+this.topicInfo.maxPage})
if(x==window.location.href)
	window.location.reload()
else
	window.location.href=x
},//fe

'apply':function(){
this.applying=true;
if(this.dataLength>0)
	{
	var p = false
	for(var k in this.data){
		if(p==false || p>k)p = k;
		}
	if(this.data[p].error)
		{
		if(this.data[p].error.indexOf('REFRESH')!=-1){
			this.refreshToEnd()
			return
			}
		this.rollback(p)
		}
	else
		{
		if(this.data[p].commentToId && this.topicInfo.pids[this.data[p].commentToId.toString()]){
			this.addComment(this.data[p])
			var pop=this.data[p].username+' 发表了一条评论'
			}
		else{
			this.addPost(this.data[p])
			var pop=this.data[p].username+' 发表了一条回复'
			}
		commonui.msgpop.pop(pop)
		this.clearCache(p)
		}
	if(this.dataLength>0){
		var self = this
		window.setTimeout(function(){self.apply()},Math.floor(5000*Math.random()))
		return
		}
	}
this.applying=false;
},//fe

'clearCache':function(pid){
this.dataLength--
delete this.data[pid]
},//fe

'rollback':function(pid){
this.topicInfo.lastIndex--
delete this.topicInfo.pids[pid]
this.clearCache(pid)
this.updateMaxPage()
},//fe

'insert':function(pid){
this.dataLength++
this.topicInfo.lastIndex++
this.data[pid]={'isNull':1}
this.topicInfo.pids[pid]=1
//this.updateMaxPage()
},//fe

'addPost':function(d){
var s = document.createElement('span')
s.innerHTML = d.data
$(this.postContinerId).appendChild(s)
},//fe

'addComment':function(d){
this.addPost(d)
var s = document.createElement('span')
var x = $(this.commentContinerIdPrefix+d.commentToId)
var l = x.lastChild
while(l.nodeType != 1)
	l=l.previousSibling
if(l.nodeName=='BR')
	s.innerHTML = d.commentData+'<div class=clear></div>'
else
	s.innerHTML = d.commentData+'<br><br>'
x.appendChild(s)
if(x.style.display=='none')
	x.style.display=''
}//fe

}//ce

commonui.msgpop = {
'w':null,
'hide':null,
pop:function(msg,sound){
if(!this.w)this.init();
var s = document.documentElement.scrollTop || document.body.scrollTop || 0;
this.w.innerHTML = msg;
if(sound)
	this.w.innerHTML+='<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" style="display:none"><param name="src" value="./nuke/ding.wav"><param name="autoplay" value="true"><embed type="audio/x-wav" src="./nuke/ding.wav" autoplay="true" autostart="true" hidden="true"></object>'
this.w.style.top = s+'px'
this.w.style.display = 'block'
if(this.hide)window.clearTimeout(this.hide)
var self = this
this.hide = window.setTimeout(function(){self.w.style.display='none';self.w.innerHTML=''},7000)
},//fe
init:function(){
var d = document.createElement('div')
d.className = 'commonui_massage_pop_window'
d.style.position='absolute'
d.style.zIndex = 100
d.style.display='none'
d.style.right='0px'
this.w = d
document.body.appendChild(d)
}//fe
}//ce

commonui.pagerEditor = {
'nextPageLinkElm':[],
'lastPageLinkElm':[],
'page':0,
'maxPage':0,
'addLinkElm':function(cp,e,mp,ee){
this.nextPageLinkElm.push(e)
if(ee.nodeName=='A'){
	this.lastPageLinkElm.push(ee)
	}
this.page = cp
this.maxPage = mp
},//fe
'replaceHref':function(e,num){
var cp=0;
e.href=e.href.replace(/(&|\?)page=(\d+)/i,function($0,$1,$2){
	cp = parseInt($2,10)
	return $1+'page='+(cp+num)
	})
return cp
},//fe
'changePage':function(n){
if(!n){return}
for(var i=0;i<this.lastPageLinkElm.length;i++){
	this.replaceHref(this.lastPageLinkElm[i],n)
	}
if(this.page==this.maxPage){
	for(var i=0;i<this.nextPageLinkElm.length;i++){
		var e = this.nextPageLinkElm[i]
		if(e.style.display)e.style.display=''
		}
	}
for(var i=0;i<this.nextPageLinkElm.length;i++){
	var e = this.nextPageLinkElm[i]
	if(n>0){
		for(var j=1;j<=n;j++){
			var a = e.cloneNode()
			a.innerHTML = this.maxPage+j
			a.href = a.href.replace(/(\?|&)page=\d+/i,'$1page='+(this.maxPage+j))
			a.title=''
			e.parentNode.insertBefore(a,e)
			}
		}
	else{
		for(var j=-1;j>=n;j++){
			e.parentNode.removeNode(e.previousSibling)
			}
		}
	}
}//fe
}//ce