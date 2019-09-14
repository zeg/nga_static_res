if(!window.commonui)var commonui={}


var KEY={_BIT_REPLY:0,
_BIT_MSG:1,
_BIT_SYS:2,

_TYPE_REPLY_TOPIC:1,
_TYPE_REPLY_REPLY:2,
_TYPE_COMMENT_TOPIC:3,
_TYPE_COMMENT_REPLY:4,
_TYPE_KEYWORD_WATCH_TOPIC:5,
_TYPE_KEYWORD_WATCH_REPLY:6,
_TYPE_MENTION_TOPIC:7,
_TYPE_MENTION_REPLY:8,
_TYPE_IP_CHANGE:9,
_TYPE_MESSAGE_NEW:10,
_TYPE_MESSAGE_REPLY:11,
_TYPE_MESSAGE_ADD:12,
_TYPE_REPORT_TOPIC:13,
_TYPE_REPORT_REPLY:14,
_TYPE_RECOMMEND_POST:15,
_TYPE_KEYWORD_WATCH:16,
_TYPE_UPVOTE:17,

_TYPE:0,
_FROM_UID:1,
_FROM_UNAME:2,
_TO_UID:3,
_TO_UNAME:4,
_TEXT:5,
_ABOUT_ID:6,
_ABOUT_ID_2:7,
_ABOUT_ID_3:8,
_TIME:9,
_ABOUT_ID_4:10,
_TEXT_2:11}

with(KEY){

var TPL = {}
TPL[_BIT_REPLY] = TPL[_BIT_MSG] = TPL[_BIT_SYS] = {}

var T = TPL[_BIT_REPLY]
T[_TYPE_REPLY_TOPIC] = function(x){return x[_ABOUT_ID_4] ? '{_U} {_R} �����{_T1} {_R2} {_TNO}<br/>' : '{_U} {_R} �����{_T1} {_R4} {_TNO}<br/>'}
T[_TYPE_REPLY_REPLY] = function(x){return x[_ABOUT_ID_4] ? '{_U} {_R} ������{_T1} {_R2} �е� {_R3} {_RNO}<br/>' : '{_U} {_R} ������{_T1} {_R4} �е� {_R3} {_RNO}<br/>'}
T[_TYPE_COMMENT_TOPIC] = '{_U} <a class="b" href="/read.php?tid={_ABOUT_ID}">����</a> ��������� {_T} {_TNO}<br/>'
T[_TYPE_COMMENT_REPLY] = function(x){return x[_ABOUT_ID_4] ? '{_U} <a class="b" href="/read.php?pid={_ABOUT_ID_3}">����</a> ������{_T1} {_R2} �е� {_R3} {_RNO}<br/>' : '{_U} <a class="b" href="/read.php?pid={_ABOUT_ID_3}">����</a> ���������� {_T} �е� {_R3} {_RNO}<br/>'}
T[_TYPE_MENTION_TOPIC] = '{_U} ������ {_T} ���ᵽ����<br/>',
T[_TYPE_MENTION_REPLY] = function(x){return x[_ABOUT_ID_4]? '{_U} ��{_T1} {_R2} �е� {_R} ���ᵽ����<br/>': '{_U} ������ {_T} �е� {_R} ���ᵽ����<br/>'}
T[_TYPE_RECOMMEND_POST] = function(x){return '{_U} ����������{_T} �е�'+(x[_ABOUT_ID_2] ? ' {_R}' : ' ����')+' ��ʹ���˵��� {_RNO}<br/>'}

var T = TPL[_BIT_MSG]
T[_TYPE_MESSAGE_NEW] = '{_U} �������µ� {_M}<br/>',
T[_TYPE_MESSAGE_REPLY] = '{_U} �ظ��� {_M}<br/>',
T[_TYPE_MESSAGE_ADD] = '{_U} ���������û����� {_M}<br/>',
T[_TYPE_REPORT_TOPIC] = '{_U} �ٱ������� {_T} <span title="{_TEXT_2}" class="silver">{_TEXT_2_S}</span><br/>',
T[_TYPE_REPORT_REPLY] = function(x){return x[_ABOUT_ID_4]?'{_U} �ٱ��� {_T1} �е� {_R6} <span title="{_TEXT_2}" class="silver">{_TEXT_2_S}</span><br/>' : '{_U} �ٱ������� {_T} �е� {_R5} <span title="{_TEXT_2}" class="silver">{_TEXT_2_S}</span><br/>'}

var T = TPL[_BIT_SYS]
T[_TYPE_KEYWORD_WATCH_TOPIC] = '{_U} ���������� {_T} �����˹ؼ��ʼ���<br/>',
T[_TYPE_KEYWORD_WATCH_REPLY] = function(x){x[_ABOUT_ID_4] ? '{_U} ��{_T1} {_R2} �е� {_R5} �����˹ؼ��ʼ���<br/>' : '{_U} ������ {_T} �е� {_R5} �����˹ؼ��ʼ���<br/>'}
T[_TYPE_KEYWORD_WATCH] = 'FID:{_ABOUT_ID}�еķ��������˹ؼ��ʼ��� �鿴<a href="javascript:void(0)" onclick="commonui.filterList(event,{_ABOUT_ID},{_ABOUT_ID_2})" class="b red"/>��ϸ��Ϣ</a><br/>'
T[_TYPE_IP_CHANGE] = '<span class="red">����ʺſ��ܼ�¼���µ�IP �鿴 <a href="/nuke.php?func=adminlog&f=access_log" target="_blank" class="b red"/>���ʼ�¼</a> �����ϸ��Ϣ</span><br/>',
T[_TYPE_UPVOTE] = function(x){
	if(x[_ABOUT_ID_2]){
		x[_ABOUT_ID_3] = x[_ABOUT_ID_2]
		return '�������� {_R2} �е� {_R} �����֧�ֻ򷴶� {_RNO}<br/>'
		}
	else
		return '������� {_T} �����֧�ֻ򷴶� {_TNO}<br/>'
	}
		
}//

var TPLSUB = {
_U:'<a class="b" target="_blank" href="/nuke.php?func=ucp&uid={_FROM_UID}">{_FROM_UNAME}</a>',
_R:'<a class="b" href="/read.php?pid={_ABOUT_ID_2}">�ظ�</a>',
_R2:'<nobr><a class="b" href="/read.php?tid={_ABOUT_ID}&page={_ABOUT_ID_4}#pid{_ABOUT_ID_2}Anchor" title="{_TEXT}">{_TEXT_S}</a></nobr>',
_R4:'<nobr><a class="b" href="/read.php?tid={_ABOUT_ID}&pid={_ABOUT_ID_2}&to=1" title="{_TEXT}">{_TEXT_S}</a></nobr>',
_R5:'<nobr><a class="b" href="/read.php?tid={_ABOUT_ID}&pid={_ABOUT_ID_2}&to=1">�ظ�</a></nobr>',
_R3:'<a class="b" href="/read.php?pid={_ABOUT_ID_3}">�ظ�</a>',
_R6:'<nobr><a class="b" href="/read.php?tid={_ABOUT_ID}&page={_ABOUT_ID_4}#pid{_ABOUT_ID_2}Anchor">�ظ�</a></nobr>',
_T:'<nobr><a class="b" href="/read.php?tid={_ABOUT_ID}" title="{_TEXT}">{_TEXT_S}</a></nobr>',
_T1:'<a class="b" href="/read.php?tid={_ABOUT_ID}">����</a>',
_TNO:'<a href="javascript:void(0)" onclick="commonui.notification.setNoti({_ABOUT_ID})" class="b silver" title="������ʾ������Ļظ�������">����ʾ</a>',
_RNO:'<a href="javascript:void(0)" class="b silver" onclick="commonui.notification.setNoti({_ABOUT_ID},{_ABOUT_ID_3})" title="������ʾ�˻ظ��Ļظ�������">����ʾ</a>',
_M:'<a class="b" href="/nuke.php?func=message#mid={_ABOUT_ID}">�Ի�</a>'
}

commonui.notification={

cache:null,

moving:null,

boxY:0,

boxYTo:0,

timeout:null,

bg:2,

color:{
	0:{
		1:'blue',
		2:'blue',
		3:'blue',
		4:'blue',
		7:'green',
		8:'green'
		},
	1:{
		10:'orange',
		11:'orange',
		12:'orange'
		},
	2:{
		5:'red',
		6:'red',
		9:'red'
		}
	},

box:null,

_tab:{},

stat:0,

setNoti:function(tid,pid){
__NUKE.doPost(__API.notiTopicIgnore(tid,pid))

},//fe

load:function(z,y,ti){//z&1�ǵ�����ʾ z&2���û�������
z=z|0

if(z&1){
	if((window.sessionStorage && sessionStorage.getItem('notipop')==ti) || commonui.userCache.get('notificationDisabled'))
		return
	sessionStorage.setItem('notipop',ti) 
	}

var self = this

__NUKE.doRequest({
	u:{
		u:'/nuke.php?__lib=noti&raw=3',
		a:{__act:'get_all',time_limit:(z&1)?'x':1}
		},
	f:function (r){
		var e = __NUKE.doRequestIfErr(r)
		if(e)
			return
		r = r.data[0]
		if (!r)return alert('�ռ�����û����Ϣ')
		delete r.unread
		for (var k in r){
			for (var i=0;i<r[k].length;i++){
				if(!r[k][i]) continue;
				var x = r[k][i]
				//self.addToCache(k,x)

					if(self.stat==2)
						self._add(k,x)
					else{
						if(i>=(r[k].length-5))
							self._add(k,x,0)
						}
					
				} 
			if ((r[k].length-5)>=0 && self.stat!=2)
				self._more.style.display=''
			}
		//self.saveCache()
		if(self.stat==0)self.stat = 1
		self.openBox(y)
		},//fe
	ff:function (){}//fe
	})

},//fe


addMsg:function(k,x){
this.loadCache()
this.addToCache(k,x)
this.saveCache()
if(this.stat==2)this._add(k,x)
else this._add(k,x,0)
if(this.stat==0)this.stat = 1
this.openBox()
},//fe


openIndex:function (){
if(commonui.userCache.get('notificationDisabled'))
	commonui.userCache.del('notificationDisabled')

//if(this.stat!=0)
//	this.closeBox()
this.stat = 2

this.load(2,1)

},//fe

addToCache:function(k,x){
if(!this.cache[k])this.cache[k]=[]
this.cache[k].push(x)
if (this.cache[k].length>50)this.cache[k].shift()
},//fe


_add:function(k,x,tab){
if(!this.box)
	this.createBox()
with(KEY){
var str = TPL[k][x[_TYPE]]
if(typeof(str)=='function')
	str = str(x)
if(!tab)tab=k
this._tab[tab].insertBefore(this.linkConv(_$('<span class="bg'+(this.bg^=3)+'"><b style="color:'+this.color[k][x[_TYPE]]+'">&#9632;</b> <span class="silver">'+(x[_TIME] ? commonui.time2dis(x[_TIME])+' ' : '')
	+str.replace(/\{(_[A-Z0-9_]+)\}/g,function ($0,$1){
		return (TPLSUB[$1] ? TPLSUB[$1] : $0)
		}).replace(/\{(_[A-Z0-9_]+)\}/g,function ($0,$1){
		if($1=='_TEXT_S' && x[_TEXT]){
			var s=commonui.cutstrbylen(x[_TEXT],19)
			if(s.length<x[_TEXT].length)s+='...'
			return s
			}
		if($1=='_TEXT_2_S' && x[_TEXT_2]){
			var s=commonui.cutstrbylen(x[_TEXT_2],19)
			if(s.length<x[_TEXT_2].length)s+='...'
			return s
			}
		return (x[KEY[$1]] ? x[KEY[$1]] : $0)
		})
	+'</span></span>')),this._tab[tab].firstChild)
for (var k in this._tab){
	if(this._tab[k].firstChild){
		if(this._tab[k].style.display=='none')
			this._tab[k].style.display=''
		}
	else{
		if(this._tab[k].style.display!='none')
			this._tab[k].style.display='none'
		}
	}
}//with
},//fe

createBox:function (){
var $ = _$,s = this
s.box=commonui.createCommmonWindow()
s.box._._hide = s.box._.hide
s.box._.hide = function(){s.closeBox()}
s.box._.addTitle('������Ϣ')
s.box._.css({display:'none',left:'0px',top:'0px',width:'auto',position:'fixed'})
s.boxY = 0
s._tab[0] = $('/td')._.css('padding','0 5px 0 0','verticalAlign','top')
if(window.__SETTING && (__SETTING.bit & 4)==0){//10������
	s._tab[1] = s._tab[0].cloneNode()
	s._tab[2] = s._tab[0].cloneNode()
	var tr = $("/tr")._.add(s._tab[0],s._tab[1],s._tab[2])
	}
else{
	s._tab[1] = s._tab[0]
	s._tab[2] = s._tab[0]
	var tr = $("/tr")._.add(s._tab[0])
	}
s._more = $("<span><br/>�и��������δ��ʾ <button type='button' onclick='commonui.notification.openIndex(this.parentNode)'>�鿴</button></span>")._.css('display','none')
s.box._.addContent($("<span><button type='button' onclick='commonui.notification.clearData()'>���</button><button type='button' onclick='commonui.notification.openIndex(this.parentNode)'>����</button><button type='button' onclick='commonui.notification.closeBox()'>�ر�</button><br/></span>"))
s.box._.addContent($("</table>")._.aC(_$("</tbody>")._.aC(tr)))
s.box._.addContent(s._more)
s.box._.addContent($("<span><br/>һ������<button type='button' onclick='commonui.notification.disable()'>������ʾ</button>��Ϣ<span class=silver>(�鿴������Ϣ�����¿���)</span></span>"))
s.linkConv(s.box)
},//fe

clearData:function (){
commonui.userCache.del('notificationCache')
this.cache=null
__NUKE.doRequest({
	u:{
		u:'/nuke.php?__lib=noti&raw=3',
		a:{__act:'del'}
		},
	f:function (r){
		var e = __NUKE.doRequestIfErr(r)
		if(e)
			return
		return true
		},//fe
	ff:function (){}//fe
	})
this.closeBox()
},//fe

linkConv:function (o){
var w=window
if((w.__SETTING.bit & 128) && w.iframeRead)
	w.iframeRead.initA(o)
else
	{
	var a = o.getElementsByTagName('a')
	for (var i=0;i<a.length;i++){
		if(a[i].href!='javascript:void(0)')
			a[i].target='_blank'
		}
	}
return o
},//fe

openBox:function (no){
if(!this.box)
	this.createBox()
if(this.box.style.display!='none')
	return
if (!document.body)
	return window.setTimeout(function(){commonui.notification.openBox(no)},3000)
if(this.box.parentNode!=document.body)
	document.body.appendChild(this.box)
this.box._.show(0,0)
if(no || this.box.offsetHeight>__NUKE.position.get().ch){
	if(this.box.style.position!='absolute')
		this.box.style.position='absolute'
	if(this.timeout)
		window.clearInterval(this.timeout)
	}
else{
	if(this.box.style.position!='fixed')
		this.box.style.position='fixed'
	if(window.__UA && __UA[0]==1 && __UA[1]<=6)
		this.timeout = window.setInterval(function(){commonui.notification.checkPos()},3000)
	}
},//fe

closeBox:function (){
if(!this.box)return this.createBox()
this._tab[0].innerHTML=this._tab[1].innerHTML=this._tab[2].innerHTML=''
this._more.style.display='none'
this.stat = 0
this.box._._hide()
if(this.timeout)
	window.clearInterval(this.timeout)
},//fe

loadCache:function (){
this.cache = commonui.userCache.get('notificationCache')
if (!this.cache)this.cache={}
},//fe

saveCache:function (){
commonui.userCache.set('notificationCache',this.cache,86400*7)
},//fe

moveTo:function (to){
return this.box._.css('top',Math.floor(to)+'px')
if (to){
	if(this.moving)return
	this.moving = true
	this.boxYTo = to
	}
if (this.boxYTo==this.boxY)
	return this.moving=false
var x = (this.boxYTo-this.boxY)/5
if(x>0){
	if (x>10)x=10
	else if (x<1)x=1
	}
else if(x<0){
	if (x<-10)x=-10
	else if (x>-1)x=-1
	}
this.boxY+=Math.floor(x)
this.box._.css('top',this.boxY+'px')
window.setTimeout(function(){commonui.notification.moveTo()},25)
},//fe

checkPos:function (){
var p = this.getScroll()
if (this.boxY < p.y || this.boxY > p.y+100)
	this.moveTo(p.y)
},//fe

disable:function(){
commonui.userCache.set('notificationDisabled',1,86400*30)
},//

getScroll:function (){
if (commonui.getScroll())return commonui.getScroll()
var x = document.documentElement.scrollLeft || document.body.scrollLeft || 0;
var y = document.documentElement.scrollTop || document.body.scrollTop || 0;
return {x:x,y:y}
}//fe

}//ce

