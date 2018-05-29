/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
论坛通用函数 v1.00
written by zeg 2006-4-27
========================
*/
//============================
//即刻执行=====================
{

//var test
//小屏幕隐藏顶部菜单 下拉时显示
;(function(){
if((__SETTING.bit & 8) && (location.pathname=='/read.php' || location.pathname=='/thread.php')){}else return

var t = __NUKE.cpblName(document.getElementsByTagName('head')[0].style,'transition',3), x, y = __NUKE.position.get, i=0, p=null, j=0, prog, c = commonui, l,m,n,
d = function(o,r){
	if(o){
		i+=o
		if(i>=r){
			if($('mainmenu'))
				$('mainmenu').style.marginTop=0
			i=0
			setTimeout(function(){d = function(){}})
			}
		}
	else
		i=0
	},
z = function(e){
	x = y(e)
	if(x.yf==0 && (e.detail<0 || e.wheelDelta>0)){
		d(1,7)
		f(0)
		}
	else if(x.ph-x.yf-x.ch<10 && (e.detail>0 || e.wheelDelta<0)){
		f(1,15,5)
		d(0)
		}
	else{
		f(0)
		d(0)
		}
	},
w = function(e){
	x = y(e)
	p = x.cy-p
	if(x.yf<=0){
		if(p)
			d(p,m)
		f(0)
		p=x.cy
		}
	else if(x.ph-x.yf-x.ch<5){
		if(p)
			f(-p,l,m)
		d(0)
		p=x.cy
		}
	else{
		f(0)
		d(0)
		p=x.cy
		}
	},
u = function(e){
	if(p===null){
		if(!c.loadReadHidden)
			f=function(){}
		//if(!test){test = _$('/input','style','position:fixed;bottom:100px;left:0;right:0');document.body.appendChild(test)}
		}
	p = y(e)
	l = (p.ch/3)|0
	m = (l/4)|0
	p = p.cy
	},
f = function(o,r,s){
	if(o){
		if(c.loadReadHidden.lock)return
		j+=o
		if(j>=s){
			prog.style.borderLeftWidth = ((j-s)/(r-s)*prog.offsetWidth+1)+'px'
			if(j>=r){
				prog.style.borderLeftWidth='1px'
				j=0
				c.loadReadHidden(0,2)
				}
			}
		}
	else{
		prog.style.borderLeftWidth='1px'
		j=0
		}
	}

__NUKE.addCss('#mainmenu {margin-top:-50px; '+(t?t[0]+':margin-top 0.3s linear 0s,0.3s':'')+' }')
c.aE(window,'touchstart',u)
c.aE(window,'touchmove',w)
c.aE(window,'mousewheel',z)
commonui.aE(window,'DOMContentLoaded',
function(){
prog = _$('/div','style','position:fixed;bottom:0px;left:-1px;right:0;height:1em;fontSize:0.6em;borderLeft:1px solid '+__COLOR.border0)
document.body.appendChild(prog)
})
})();


//do sth from hash============
if(location.hash){

commonui.hashAction = function(){

var c=commonui, m = location.hash.match(/^#pid(\d+)Anchor$/)
if(m){
	var x=$(m[0].substr(1))
	if(x){
		while(x.nodeName!='TABLE' && x.nodeName!='BODY')
			x = x.parentNode
		if(x.nodeName=='TABLE')
			x.style.borderLeft='10px solid '+__COLOR.border0
		}
	return
	}

var m = location.hash.match(/^#do:(item|ifr)(?::(.+))?$/)
if(!m)return
switch(m[1]){
	case 'item':
		var tmp = function(){
			if(m[2]=='codeui')
				c.userItem.codeUi()
			else if(m[2]=='codeanduseui')
				c.userItem.codeUi(true)
			else if(n=m[2].match(/list(?::(.+))?$/)){
				if(n[1])
					c.userItem.list(1,0,0,n[2])
				else
					c.userItem.list()
				}
			}
		if(c.userItem)
			tmp()
		else
			loader.script(__SCRIPTS.userItem,function(){tmp()} )
		break;
	//case 'ifr':
	//	if(window.iframeRead)
	//		iframeRead.initGoUrl=m[2]
	//	else
	//		location.replace(m[2])
	//	break
	}
}//fe

commonui.aE(window,'DOMContentLoaded',commonui.hashAction);//aE

}//if



//全屏中专广告==================
(function(){

if(!ngaAds || !ngaAds.bbs_ads12 || (window.__GP && window.__GP.greater && !window.__GP['super'] ) || __SETTING.uA[6]==2)
	return
var l=location
if(l.pathname!='/' && l.pathname!='/thread.php' && l.pathname!='/read.php')
	return
var C = __COOKIE,n = ngaAds,v = __NUKE.toInt(C.getMiscCookie('insad_views')), c = C.getMiscCookie('pv_count_for_insad')
if (n.bbs_ads12.refreshid && C.getMiscCookie('insad_refreshid')!=n.bbs_ads12.refreshid){
	C.setMiscCookieInSecond('insad_refreshid',n.bbs_ads12.refreshid,3600*24*7)
	c=null
	}

if(c===null){
	var d = new Date
	d = (24-d.getHours())*3600 + (60-d.getMinutes())*60 + d.getSeconds()
	C.setMiscCookieInSecond('pv_count_for_insad',0,d)
	C.setMiscCookieInSecond('insad_views',0,d)
	return
	}

if(__NUKE.toInt(c)>0){
	v++
	C.setMiscCookieInSecond('insad_views',v)
	C.setMiscCookieInSecond("pv_count_for_insad",0-v*v*48)
	if(n.bbs_ads12.o)
		n.bbs_ads12.o = _$('/div').$0('style','position:fixed;zIndex:7;left:0;top:0;right:0;bottom:0;background:#000;textAlign:center',
			_$('/a').$0('href','javascript:void(0)','innerHTML','点此跳过广告','style','fontFamily:"Microsoft YaHei" simhei,Verdana, Tahoma, Arial, simsum;fontSize:1.8em;lineHeight:2.5em;fontWeight:bold;color:#D4C8A0','onclick',function(){this.parentNode.parentNode.removeChild(this.parentNode)}),
			_$('/br'),
			_$('/a').$0('href',n.bbs_ads12.url,'target','_blank',
				_$('/img').$0('src',n.bbs_ads12.file),
				'onmouseup',function(){var o=this;setTimeout(function(){o.parentNode.parentNode.removeChild(o.parentNode)},100)}
				),
			n.bbs_ads12.title ? _$('/br') : null,
			n.bbs_ads12.title ? _$('/span').$0('innerHTML',n.bbs_ads12.title,'style','fontFamily:"Microsoft YaHei" simhei,Verdana, Tahoma, Arial, simsum;fontSize:1.8em;lineHeight:2.5em;fontWeight:bold;color:#D4C8A0') : null
			)
	else
		l.replace( l.protocol+'//'+l.host+'/misc/adpage_insert_2.html?'+l.href );
	}
})()
//fe


//内嵌窗口阅读==================
commonui.loadNotiScript=function(f){loader.script(__SCRIPTS.notification,f)}
//commonui.checkIfInIframe =function(){return commonui.checkIfInIframe.check};

//防止滚轮影响父页面============

;(function (){

var e = null,c=commonui,g,h,m,vgg,vg,vc

d = function(){
	if(e==0)return
	e=0
	this.document.body.style.height=this.document.body.style.overflowY=g.style.marginTop=''
	if(vg)
		vg.style.marginTop = vgg.style.marginTop = vc.style.marginTop = ''
	scrollTo(m,h)
	}

c.crossDomainCall.setCallBack('iframeReadNoScrollInit', function(){
	if(e!==null)return
	e=0
	g = $('minWidthSpacer')
	vgg = $('videobgbg')
	vg= $('videobg')
	vc= $('videobgcover')
	c.aE(window,'mouseover',d)
	c.aE(window,'touchstart',d)
	})//f

c.crossDomainCall.setCallBack('iframeReadNoScroll', function(){
	if(e==1)
		return
	e=1
	var q = __NUKE.position.get()
	document.body.style.height = (q.ch-1)+'px'
	document.body.style.overflowY = 'hidden'
	g.style.marginTop = '-'+q.yf+'px'
	if(vg)
		vg.style.marginTop = vgg.style.marginTop = vc.style.marginTop = '-'+q.yf+'px'
	h = q.yf
	m = q.xf
	})

if(window.parent==window.self)return
try{
	var no = window.parent
	no.iframeReadNoScrollInit()
	var no = no.iframeReadNoScroll,
	f = function(){
		no()
		}
	}
catch(o){
	f = function(){
		c.crossDomainCall(1,'*', "iframeReadNoScroll", null, null)
		}
	c.crossDomainCall(1,'*', "iframeReadNoScrollInit", null, null)
	}

c.aE(window,'touchstart',f)
c.aE(window,'mouseover',f)
//commonui.aE(__UA[0]==1 ? document : window,__UA[0]==3 ? 'DOMMouseScroll' : 'mousewheel',function(e){//防止滚轮影响父页面 manual mousescroll
	//window.scrollBy(0, e.wheelDelta ? e.wheelDelta*-1 : e.detail/3*120)
	//commonui.cancelBubble(e)
	//return commonui.cancelEvent(e)
//	},1)
})();//fe

//============================
//ip change alert=============
/*
;(function(){
if(!window.__GP || !window.__GP['greater'] || !__CURRENT_UID)return
var x = cookieFuncs.getCookie('CheckLog'+__CURRENT_UID)
if (x && x.length>32){
	cookieFuncs.setCookieInSecond('CheckLog'+__CURRENT_UID,x.substr(0,32),86400*7)
	commonui.loadNotiScript(function(){commonui.notification.addMsg(2,{0:9})})
	}
})();//fe
*/

}//be

//date
var date = new Date;

//----------------------------
commonui.topicArg.init()

//--------------------------
commonui.touchMoveInit()

//============================
//覆盖默认/补齐=================
{
//补api=======================
__API.indexForumList=function(){
var r = Math.floor(__NOW/7200)
if(location.protocol=='https:')
	return '/nuke.php?__lib=nga_index&__act=get_all_forums&raw=1'
return [
	__IMG_BASE+'/proxy/cache_attach/67/6f/676f37d60a946f8b1ca2375c59512539.js?1_'+r,
	__IMG_BASE+'/proxy/proxy.php?r=1_'+r+'&host=bbs.ngacn.cc&url=nuke.php%3F__lib%3Dnga_index%26__act%3Dget_all_forums%26raw%3D1'
	]
}//fe


//自定义发帖检测================
commonui.postPerCheck =function(arg){//返回true终止发帖
var fid=arg[3],act=arg[1],stid=arg[6]//commonui.newPost
//if(act == postfunc.__NEW){
if(fid==-7){
	var x = commonui.userCache.get('pohint-7')|0
	if(x<2){
		commonui.userCache.set('pohint-7',x+1,86400)
		if(!window.confirm('请勿转载/讨论涉及中国之军/政相关新闻/话题\n可能会遭致禁言或更高处罚\n是否继续发帖'))
			return true;
		}
	}
//if(fid==-43){
	//if(!window.confirm('本版禁止讨论近现代中国相关话题 (1921年~现在)\n违者禁言\n是否继续'))
		//return true;
	//}
else if(fid==400 || fid==318 || fid==395 || fid==396 || fid==446 || fid==397 || fid==398 || fid==399){
	var x = $('d3selector001')
	if(!x)return;
	x.contentWindow.getUrls()
	arg[8] = '[diablo3charsim]'+x.contentDocument.getElementById('sharelink').value + '[/diablo3charsim]\n'+ arg[8].replace(/^\s*/,'')//content
	}
//	}
}//fe

//发短信时提示==================
commonui.preMessageHint = function(){
if(window.__CURRENT_UID && window.__GP && __GP.active<0)
	return _$('/span')._.add(
		_$('/br'),
		_$('/a').$0('href',"/read.php?tid=7504167",'innerHTML','[解锁等帐号安全问题]','target','_blank','className','b ngared'),
		' 请发至收件人 ',
		_$('/a').$0('href',"/read.php?tid=7504167",'innerHTML','34909933','target','_blank','className','b ngared'),
		', 请不要发送给版主 '
		)
else
	return null
}//fe

//发帖时提示===================
commonui.prePostHintAfterSubject = function(act, fid, tid, pid, stid){

var y = (window.__CURRENT_F_BIT & 8192) ? _$('/span')._.add(
	_$('/br'),
	'未激活的用户可',
	__CURRENT_UID ? _$('/a','href','javascript:void(0)','innerHTML','[绑定手机]','onclick',function(e){__SCRIPTS.load('ucp',function(){commonui.setPhone()})},'className','b ngared') : '绑定手机',
	'进行帐号激活 以在论坛发帖',
	_$('/br'),
	'请不要从任何途径购买论坛帐号 论坛备有详细的用户追踪记录 发现盗用帐号或违规激活会立即封禁',
	_$('/br'),
	'如果账号因安全问题而被锁定 请至银色黎明版查看',_$('/a').$0('href',"/read.php?tid=7504167",'innerHTML','[相关说明]','target','_blank','className','b ngared'),
	_$('/br')
	):null;

if(fid==400 || fid==318 || fid==395 || fid==396 || fid==446 || fid==397 || fid==398 || fid==399){
	return _$('/span')._.add(' ',
		_$('/button').$0('innerHTML','新版装备与技能模拟器','onclick',function(e){
			ngaAds.open_69124(e,'http://db.178.com/d3/s/',1430)
			}),
		y
		)
	}

return y
}//fe

//特定版面补===================
if(window.__CURRENT_FID){
	//if(!window.postfunc)window.postfunc={}
	switch (__CURRENT_FID){
		case -152678:
			commonui.forumBtns.d[15] = {n1:'战绩查询',c:'uitxt1',
				u:'http://lolnewbf.178.com/search/index',
				ck:function(a){if(a.fid==-152678)return 1} }
			commonui.forumBtns.def1.unshift(15)
			break;
		case -452227:
			commonui.forumBtns.d[15] = {n1:'对战模拟',c:'uitxt1',
				u:'http://tools.nga.cn/iframe/-452227/VGCDmgCalc/index.html',
				ck:function(a){if(a.fid==-452227)return 1} }
			commonui.forumBtns.def1.unshift(15)
			break;
		}
	}

}//be

//============================
//杂项功能=====================
{

function time2date(t){
return commonui.time2date(t)
}

//fe

//fe
function add_pv_count()
{
var w = window, pv = __NUKE.toInt(__COOKIE.getMiscCookie('pv_count_for_insad'))
console.log('show ad in '+(-pv)+' pv')
__COOKIE.setMiscCookieInSecond('pv_count_for_insad',pv+1);

if (w.location.href.indexOf('allblank')!=-1){
	var x = document.body.getElementsByTagName('A');
	for (var i=0; i<x.length; i++)
		{
		if (x[i].href.indexOf('read.php') != -1 && x[i].href.indexOf('thread.php') == -1)
			{
			x[i].target='_blank'
			}
		}
	}

if (w.location.href.indexOf('autoreload')!=-1){
	w._reloader=function(){
		var date=new Date;
		if(date.getTime()-w.userlastmove<10000) {w.setTimeout(w._reloader,60*1000);document.title='xxxx'}
		else w.location.reload()
	}
	w.setTimeout(w._reloader,60*5000);
	var tmp = function(){var date=new Date;w.userlastmove=date.getTime();document.title=w.userlastmove}
	addEvent(w,'scroll',tmp);
	addEvent(document.body,'click',tmp);
	}
}//fe

function nextElement(obj){
var next = obj.nextSibling;
while (next && next.nodeType != 1)
	next = next.nextSibling;
return next;
}
//fe

function prevElement(obj){
var prev = obj.previousSibling;
while (prev && prev.nodeType != 1)
	prev = prev.previousSibling;
return prev;
}
//fe

function findNameInNeighbor(o,n){
o = o.parentNode;
return findNameInChild(o,n);
}
//fe

function findNameInChild(o,n){
for (var i=0; i<o.childNodes.length;i++){
	if (o.childNodes[i].getAttribute && o.childNodes[i].getAttribute('name') == n){
			return o.childNodes[i];
		}
	}
}//fe

function elmIncL3(e1,e2)
{
if (e2 == e1)
	{
		return true;
	}
if (e2.parentNode == e1)
	{
		return true;
	}
if (e2.parentNode.parentNode == e1)
	{
		return true;
	}
return false;
}
//fe

function cutstrbylen(s,l)
{
var j = 0.0;
var c= '';
for (var i=0;i<s.length;i++)
	{
		c = s.charCodeAt(i);
		if (c > 127)
			{
				j = j+1;
			}
		else if ( (c<=122 && c>=97)||(c<=90 && c>=65) )
			{
				j = j+0.65;
			}
		else
			{
				j = j+0.35;
			}
		if (j>=l)
			{
				return (s.substr(0,i+1));
			}
	}
return (s);
}
//fe
function getStyle(o,css)
{
if( document.defaultView && document.defaultView.getComputedStyle )
	{
		return document.defaultView.getComputedStyle( o, '' ).getPropertyValue(
		css.replace( /([A-Z])/g, '-$1'));
	}
else if ( o.currentStyle )
	{
		return o.currentStyle[ css ];
	}
else
	{
		false;
	}
}
//fe
function jsdebug()
{
if (typeof(cookieFuncs.cookieCache[cookieFuncs.misccookiename]) != 'object')
	cookieFuncs.extractMiscCookie();

	function d(f,c)
		{
			for (var k in c)
				{
					if (typeof(c[k])=='object')
						{
							d(f+k+'.',c[k]);
						}
					else
						{
							put(f+k+' = '+c[k]+'\n');
						}
				}
		}
if(commonui  && commonui._debug){
	put('---js debug---\n');
	d('',commonui._debug)
	}
put('---cookies---\n');
var cc = document.cookie.split(';');
for (var k in cc)
	{
		put(cc[k]+'\n');
	}
put('---misccookies---\n');
d('',cookieFuncs.cookieCache[cookieFuncs.misccookiename]);

}
//fe

function addEvent(obj,evt,fn) {
commonui.aE(obj,evt,fn)
}

function addEventDOMContentLoadedAct(){
commonui.triggerEventDOMContentLoadedAct ()
}//fe
}//be
//--------------------------


//============================
//杂项论坛功能==================
{
/**
* 获取论坛背景图================
* @param fid 当前版面ID
* @param int 当前页面宽度
 */
commonui.getForumBg=function(fid){
var w = window,noV = (w.__UA && w.__UA[0]==1 && w.__UA[1]<=6) || __SETTING.currentClientWidth<1400
//if(Math.random()>0.5)
//	return [1,w.__IMGPATH +'/head/20171121.jpg',0,190]
switch (fid){
	
	case 318:
	case 394:
	case 393:
	case 395:
	case 396:
	case 397:
	case 398:
	case 399:
	case 400:
	case 409:
	case 446:
	case 467:
	case 470:
	case 471:
	case 547:
		return [1,w.__IMGPATH +'/head/20161110.jpg',0,190]
		
	//case -65653:
	//	if(!noV)
	//		return [2,w.__IMGPATH +'/head/20131126.jpg',190,1600]
	//	break;
	case 224:
		if(w.__UA && w.__UA[0]==1 && w.__UA[1]<9){}//__IMGPATH +'/head/test1.jpg'
		else
			return noV ? [1,0,1600,190] : [2,0,190,1600]
		break;
	case -46468:
		return [1,w.__IMGPATH +'/head/20140115-46468.jpg',0,190]
	case -6194253:
		return [1,w.__IMGPATH +'/head/20140115-6194253.jpg',0,190]
	case -152678:
		return [1,w.__IMGPATH +'/head/20180502.jpg',0,190]
	case -985658:
		return [1,w.__IMGPATH +'/head/-985658.jpg',0,190]
	case 431:
		return [1,w.__IMGPATH +'/head/20171225.jpg',0,190]
	case 321:
		return [1,w.__IMGPATH +'/head/20170412.jpg',0,190]
	case 452:
		return [1,w.__IMGPATH +'/head/20140617.jpg',0,190]
	case 422:
		return [1,w.__IMGPATH +'/head/20180402.jpg?7',0,190]
	case -51095:
		return [1,w.__IMGPATH +'/head/20140915a.png',0,190]
	case -7202235:
		return [1,w.__IMGPATH +'/head/20180310.jpg',0,190]
	case 426:
		return [1,w.__IMGPATH +'/head/2015030604.jpg',0,190]
	case -362960:
		return [1,w.__IMGPATH +'/head/20180515.jpg',0,190]
	case -7861121:
		return [1,w.__IMGPATH +'/head/20180111.jpg',0,190]
	case 482:
		return [1,w.__IMGPATH +'/head/20170414.jpg',0,190]
	case 414:
		return [1,w.__IMGPATH +'/head/20161123.jpg',0,190]
	case 427:
	case 489:
		return [1,w.__IMGPATH +'/head/20151231.jpg',0,190]
	case 124:
		return [1,w.__IMGPATH +'/head/20160202.jpg',0,190]
	case 441:
		return [1,w.__IMGPATH +'/head/20151112.jpg',0,190,w.__IMGPATH +'/head/wows_e3.mp4',Math.random()>0.99?0:1,'054e57']
	case 497:
		return [1,w.__IMGPATH +'/head/20160314.jpg',0,190]
	case 459:
		return [1,w.__IMGPATH +'/head/20180323.jpg',0,190]
	case 492:
		return [1,w.__IMGPATH +'/head/20160418.jpg',0,190]
	case -149110:
		return [1,w.__IMGPATH +'/head/20160519.jpg',0,190]
	case 555:
		return [1,w.__IMGPATH +'/head/20170406.jpg',0,190,w.__IMGPATH +'/head/20180202.mp4',Math.random()>0.99?0:1,'474747']
	case -447601:
		return [1,w.__IMGPATH +'/head/20180212.jpg',0,190,w.__IMGPATH +'/head/20180213.mp4',Math.random()>0.99?0:1,'474747']
	case 516:
		return [1,w.__IMGPATH +'/head/20170419.jpg',0,190]
	case -15219445:
		return [1,w.__IMGPATH +'/head/20170609.jpg',0,190]
	case 568:
		return [1,w.__IMGPATH +'/head/20170804.jpg',0,190]
	case 564:
		return [1,w.__IMGPATH +'/head/20180328.jpg',0,190]
	case 563:
		return [1,w.__IMGPATH +'/head/20171205.jpg',0,190]
	case 560:
		var r = Math.random()
		return [1,w.__IMGPATH +'/head/'+(r>0.5?'20180205':'20180206')+'.jpg',0,190,w.__IMGPATH +'/head/20180210.mp4',Math.random()>0.99?0:1,'474747']
	case 549:
		var r = Math.random()
		return [1,w.__IMGPATH +'/head/'+(r>0.5?'20180424':'20180425')+'.jpg',0,190]
	case 540:
		return [1,w.__IMGPATH +'/head/20171013.jpg',0,190]
	case -47218:
		return [1,w.__IMGPATH +'/head/20180209.jpg',0,190]
	case -4567100:
		return [1,w.__IMGPATH +'/head/20180410.jpg',0,190]
	case 538:
		var r = Math.random()
		return [1,w.__IMGPATH +'/head/'+(r>0.166?(r>0.333?(r>0.5?(r>0.666?(r>0.833?'20180525':'201805251'):'201805252'):'201805253'):'201805254'):'201805255')+'.jpg',0,190]
	case -8180483:
		var r = Math.random()
		return [1,w.__IMGPATH +'/head/'+(r>0.5?'20180526':'201805261')+'.jpg',0,190,w.__IMGPATH +'/head/20180526.mp4',Math.random()>0.99?0:1,'0a1323']
	//default:
	//	return [1,w.__IMGPATH +'/head/20170725.jpg',0,190]
	}
//if(typeof bit=='number' && fid && (bit & 512))
	//return [1,w.__IMG_BASE +'/proxy/cache_attach/_f/or/_forum_bg'+fid,0,190]

return [1,w.__IMGPATH+'/head/20160831_'+(Math.ceil(Math.random()*20))+'.jpg',0,190]
}//fe


var bbs_ads9_old = window.bbs_ads9 ? bbs_ads9 : function(){}
bbs_ads9 = function (){
if((__SETTING.bit & 4) || !window.__CURRENT_FID || window.__CURRENT_TID)
	return;
var x
switch(__CURRENT_FID){
	case 7:
		x = 'http://ccq.178.com/iframe/index.html?fid=7'
		break;
	case -152678:
		x = 'http://ccq.178.com/iframe/-152678/index.html'
		break;
	case 321:
		x = 'http://ccq.178.com/iframe/index.html?fid=321'
		break;
	case -362960:
		x = 'http://ccq.178.com/201411/t_209179391466.html'
		break;
	case 422:
		x = 'http://ccq.178.com/201411/t_209252535303.html'
		break;
	case 431:
		x = 'http://ccq.178.com/201412/t_212811964561.html'
		break;
	case 318:
		x = {0:'http://ccq.178.com/iframe/index.html?fid=318',1:190}
		break;
	case 469:
		x = {0:'http://game.stargame.com/play/startgame?id=144',1:741}
		break;
	case 488:
		x = {0:'http://s1.czdtx.178.com/nga_game.php?game=czdtx',1:950}
		break;
	case 474:
		x = {0:'http://s1.xjwy.178.com/nga_game.php?game=xjwy',1:750}
		break;
	case 484:
		x = {0:'http://s1.xmzyw.178.com/nga_game.php?game=xmzyw&id=1',1:750}
		break;
	case 487:
		x = {0:'http://s1.djmy.178.com/nga_game.php?game=djmy',1:760}
		break;

	case 452:
		x = 'http://ccq.178.com/201507/t_230506050628.html'
		break;
	case 459:
		x = 'http://ccq.178.com/iframe/459/index.html'
		break;
	case -7861121:
		x = 'http://ccq.178.com/iframe/-7861121/index.html'
		break;
	case 492:
		x = 'http://ccq.178.com/iframe/index.html?fid=492'
		break;
	case 538:
		x = 'http://ccq.178.com/iframe/index.html?fid=538'
		break;
	case 414:
		x = 'http://ccq.178.com/201711/t_304208553480.html'
		break;
	case -81981:
		x = 'http://ccq.178.com/iframe/index.html?fid=-81981'
		break;
	case 503:
		x = {0:'http://s1.zqsd.178.com/nga_game.php?game=zqsd',1:750}
		break;
	case 537:
		x = {0:'http://s1.dhh.178.com/nga_game.php?game=dhh&id=1',1:750}
		break;
	case 543:
		x = {0:'http://wgapi.178.com/nga_game.php?game=dzz',1:750}
		break;
	case 493:
		x = {0:'http://s1.zszx.178.com/nga_game.php?game=zszx&id=1',1:750}
		break
	case 546:
		x = {0:'http://wgapi.178.com/nga_game.php?game=gty',1:750}
		break
	case 516:
		x = 'http://ccq.178.com/iframe/index.html?fid=516'
		break;
	case 563:
		x = 'http://ccq.178.com/iframe/index.html?fid=563'
		break;
	case 482:
		x = 'http://ccq.178.com/iframe/index.html?fid=482'
		break;
	case 568:
		x = 'http://ccq.178.com/iframe/568/index.html'
		break;
	case 540:
		x = 'http://tools.nga.cn/iframe/index.php?fid=540'
		break;
	case -149110:
		x = '<span style="text-align:center"><table class=" stdbtn" style="margin-left:auto;margin-right:auto"><tbody><tr><td><a href="javascript:void(0)" class="b teal" onclick="ngaAds.open_69124(event,\'http://js.ntwikis.com/?nologin=1\',600)"><nobr><span style="font-size:1.5em">战舰少女资料库</span></nobr></a></td></tr></tbody></table></span>'
	}
if(x){
	var h=190
	if(x.constructor == Object)
		h = x[1],x = x[0]
	document.write(
		"<div id='bbs_ads9_add' class='catenew'>"+
		(x.substr(0,7) == 'http://' ? 
		"<ifra"+"me src='"+x+"' style='margin:0px;overflow:hidden;width:100%;height:"+h+"px;border:none' scrolling='no' frameborder='0' allowTransparency='true'></ifr"+"ame>":
		x)+
		"</div>"
		)
	}
bbs_ads9_old()
}//fe
var bbs_ds9 = bbs_ads9
/*
 *自动替换帖子中[img]图片的地址
 */
commonui.correctAttachUrl = function(u){
return u
//if(__ATTACH_BASE == 'http://img6.nga.178.com:8080')
//	return u.replace(/^http:\/\/(img\d?)\.ngacn\.cc\//,'http://$1.nga.178.com/')
//else
//	return u.replace(/^http:\/\/(img\d?)\.nga\.178\.com\//,'http://$1.ngacn.cc/')
}//fe



//获取附件地址==================
;(function(){
if(__ATTACH_BASE == 'http://test.attach.ngacn.cc'){
	__ATTACH_BASE_VIEW = 'http://test.attach.ngacn.cc/attachments'
	__AVATAR_BASE_VIEW = 'http://test.attach.ngacn.cc/avatars'
	}
else{
	__ATTACH_BASE_VIEW = /*location.protocol =='https:' ? 'https://img.nga.cn/attachments' : */ 'http://'+location.hostname.replace(/^(?:bbs\.)?/,'img.')
	__AVATAR_BASE_VIEW = __ATTACH_BASE_VIEW+'/avatars/2002'
	__ATTACH_BASE_VIEW = __ATTACH_BASE_VIEW+'/attachments'
	}
commonui.getAttachBase=function(u){//相对地址
return __ATTACH_BASE_VIEW
/*
if(u.substr(0,2)!='./')
	u='./'+u
var m = u.match(/^\.\/mon_(\d+)\/(\d+)/)
if(m){
	if(__ATTACH_BASE == 'http://test.attach.ngacn.cc')
		return 'http://test.attach.ngacn.cc/attachments'
	var b = (__ATTACH_BASE == 'http://img6.ngacn.cc:8080') ? true : false
	if(parseInt(m[1].toString()+m[2].toString(),10)>=20130104){
		//if(b)
		//	return 'http://img6.ngacn.cc/attachments'
		//else
			return 'http://img6.nga.178.com/attachments'
		}
	else{
		//if(b)
		//	return 'http://img.ngacn.cc/attachments'
		//else
			return 'http://img.nga.178.com/attachments'
		}
	}
return ''*/
}
})();

//地址是否是附件================
commonui.ifUrlAttach = function(u){
if(u.match(/^http:\/\/(img\.ngacn\.cc|img6\.ngacn\.cc|img\.nga\.cn|img6\.nga\.cn|ngaimg\.178\.com|img\.nga\.178\.com|img6\.nga\.178\.com)\//))
	return true
}

//body起始处加载================
/**
 * 设置 内嵌/不加载图片 样式
 * 设置论坛背景图
 * 设置178导航
 * 设置顶通栏广告
 * 必须在div#mmc存在后运行
 */
commonui.initAfterBody=function(){
var w = window, b =__SETTING.bit ,x=''
__SETTING.setIframe()
if(b & (1024 | 64 | 2048)){
	if(b & 1024){
		x+=' notLoadImg isInAnIframe embed'
		w.ngaAds.clear()
		}
	else{
		if(b & 64)
			x+=' notLoadImg'
		if(b & 2048)
			x+=' isInAnIframe'
		}
	document.body.className+=x
	}
else{
	//if(window._178NavAll_110906_765453)
	//	w.put(_178NavAll_110906_765453(w.__CURRENT_UNAME,1))
	//if(location.pathname == '/read.php')
	//	w.put(w.ngaAds.bbs_ads1_gen())
	this.customBackgroundInit( this.getForumBg(w.__CURRENT_FID,w.__CURRENT_F_BIT) )
	}
	
if((__SETTING.bit & (4|8|16))==0 && __SETTING.uA[0]==2 && w.getComputedStyle){//非小屏幕且是chrome 则用缩放取代小字号
	var y = w.document, x = _$('/span','style','position:absolute;visibility:hidden;fontSize:9px')
	y.body.insertBefore(x,y.body.firstChild)
	var z = parseInt(y.defaultView.getComputedStyle(x,null).getPropertyValue('font-size'),10)
	y.body.removeChild(x)
	if(z && z>9)
		__NUKE.addCss('.xtxt , .stxt , .xxtxt {display:inline-block;font-size:inherit;transform: scale(0.75) translateY(8%);} \n .stxt {transform: scale(0.83) translateY(8%);} \n .xxtxt {transform: scale(0.583) translateY(8%);} ')
	}

var x=null
if(x = this._addEventOnbodyInitFuncs){//commonui.aE : onbodyInit
	for (var i=0;i< x.length;i++)
		x[i]()
	x.done=true
	}
else
	this._addEventOnbodyInitFuncs={done:true}
/*
//commonui.storageSync()
if(window.getMatchedCSSRules){
	document.document
	document.body.insertBefore(x = _$('/div','className','adsc','style','clear:both;height:0;lineHeight:0;fontSize:0;overflow:hidden'),document.body.firstChild)
	var y = getMatchedCSSRules(x)
	//if(y && y[0] && y[0].parentStyleSheet)
		//y[0].parentStyleSheet.disabled=1		
	}
*/

if(w.__DEBUG)

if ('serviceWorker' in navigator){
	navigator.serviceWorker.register(__SCRIPTS.service,{scope: '/'}).then(function(reg) {
		if(reg.installing)
		  console.log('Service worker installing');
		else if(reg.waiting)
		  console.log('Service worker installed');
		else if(reg.active) 
		  console.log('Service worker active');
	 })['catch'](function(err) {
		console.log('Registration failed with ' + err);
	 });
  }

if(ngaAds && ngaAds.bbs_ads12 && ngaAds.bbs_ads12.o && ngaAds.bbs_ads12.o!==true)
	document.body.insertBefore(ngaAds.bbs_ads12.o,document.body.firstChild)

commonui.aE(window,'DOMContentLoaded',function(){commonui.mobanner()})

if(this.loginlog)
	this.loginlog()
}//fe

//广告========================
commonui.mobanner = function(){
var r = 60,t = this.mobanner.unpack(__COOKIE.getMiscCookie('mobanner1')|0), ads, now=false
if(__SETTING.uA[2] ==2 || __SETTING.uA[2] ==4 || __SETTING.uA[2] ==5 ){
	if(t.count_a<4){
		now = this.mobanner.getMi()
		if(now-t.time_a>r && (ads = ngaAds.bbs_ads44_gen())){
			var $ = _$, x = $('/div','style','position:fixed;backgroundColor:rgba(255, 252, 238, 0.95);bottom:0px;color:#fff;width:100%;lineHeight:3em;textAlign:center;zIndex:6',
				$('/a','style','margin:0 auto 0 0;padding:0.1em 0.6em 0.2em 0.6em;border-radius:1.2em;background:'+__COLOR.border2+';color:'+__COLOR.inverttxt1,'href','javascript:void(0)','innerHTML','\u2573','onclick',function(){x.style.display='none';t.time_a = now;t.count_a++;__COOKIE.setMiscCookieInSecond('mobanner1',commonui.mobanner.pack(t),(1440-now+5)*60)}),
				ads
				)
			document.body.appendChild(x)
			}
		}
	if(t.count_b<4){
		if(now===false)now = this.mobanner.getMi()
		if(now-t.time_b>r && !ads){
			var $ = _$,x = $('/div','style','position:fixed;backgroundColor:rgba(255, 252, 238, 0.95);bottom:0px;color:#fff;width:100%;lineHeight:3em;textAlign:center;zIndex:6',
				$('/a','style','margin:0 0.5em 0 auto;padding:0.1em 1em 0.2em 1em;border-radius:1.2em;background:'+__COLOR.border0+';color:'+__COLOR.inverttxt2,'href','http://app.nga.cn/dl','target','_blank','innerHTML','下载NGA客户端'),
				$('/a','style','margin:0 auto 0 auto;padding:0.1em 1em 0.2em 1em;border-radius:1.2em;background:'+__COLOR.border2+';color:'+__COLOR.inverttxt1,'href','javascript:void(0)','innerHTML','继续访问','onclick',function(){x.style.display='none';t.time_b = now;t.count_b++;__COOKIE.setMiscCookieInSecond('mobanner1',commonui.mobanner.pack(t),(1440-now+5)*60)})
				)
			document.body.appendChild(x)
			}
		}
	}
else{
	if(t.count_a<4 && __SETTING.currentClientWidth>1000 && window.__CURRENT_FID && __CURRENT_FID==459 && !window.__CURRENT_TID && window.__NOW>1524499200 && window.__NOW<1524672000){
		if(now===false)now = this.mobanner.getMi()
		if(now-t.time_a>r){
			var $ = _$,x = $('/span','style','position:fixed;bottom:0;right:0;textAlign:right;zIndex:6',
				$('/a','style','backgroundColor:'+__COLOR.gbg1+';color:'+__COLOR.gbg6+';line-height:2em;display:block;padding:0 0.5em;float:right','href','javascript:void(0)','innerHTML',' 关闭 ','onclick',function(){x.style.display='none';t.time_a = now;t.count_a++;__COOKIE.setMiscCookieInSecond('mobanner1',commonui.mobanner.pack(t),(1440-now+5)*60)}),
				$('/ins','className','adsbygoogle','data-ad-client',"ca-pub-3127873732676646",'data-ad-slot',"5552429680",'style','clear:both;display:block;width:300px;height:250px;padding:5px;background:'+__COLOR.gbg1),
				$('/script','async','async','src',"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js")
				);
			(adsbygoogle = window.adsbygoogle || []).push({});
			document.body.appendChild(x)
			}
		}
	}

/*	if(window.navigator.userAgent.match(/micromessenger/i)){
		var y=5,x = $('/div','style','position:fixed;backgroundColor:rgba(255, 252, 238, 0.95);top:0px;width:100%;fontSize:1.5em;height:6em;lineHeight:2em;marginTop:-6em;transition:margin-top 0.3s ease-out;textAlign:center;zIndex:6')._.add(
			'点击右上角菜单',$('/br'),
			'选择',$('/b')._.add('在浏览器中打开'),'以访问完整内容'
			)
		commonui.aE(window,'scroll',function(){
			if(y==1){
				y=0
				x.style.marginTop = '0'
				}
			else if(y>1)
				y--
			})
		}
	else*/ 
	/*
	if(document.referrer.match(/^https?:\/\/.+?\.(?:baidu\.com|so\.com|sogou\.com|sm\.cn|bing\.com|google\.com)\//))
		var x = $('/table','style','position:fixed;backgroundColor:rgba(255, 252, 238, 0.95);height:100%;bottom:0px;color:#fff;width:100%;zIndex:6',
			$('/tr',
				$('/td','style','textAlign:center;verticalAlign:bottom;lineHeight:2em;',
					$('/img','src',__IMG_STYLE+'/app1024.gif','style','margin:1em auto;width:80%'),
					$('/a','style','display:block;border:0.2em solid #323232;height:2em;width:80%;margin:1em auto;border-radius:1.2em;boxShadow: 0.15em 0.15em #efb973, inset 0.15em 0.15em #fffcee;textShadow: 0.1em 0.1em #fffcee;background:#efb973','href','http://app.nga.cn/kp/phone.html','target','_blank','innerHTML','下载NGA手机客户端'),
					$('/a','style','display:block;border:0.2em solid #323232;height:2em;width:80%;margin:2em auto;border-radius:1.2em;boxShadow: 0.15em 0.15em silver, inset 0.15em 0.15em #fffcee;textShadow: 0.1em 0.1em #fffcee;background:silver','href','javascript:void(0)','innerHTML','继续访问','onclick',function(){x.style.display='none';__COOKIE.setMiscCookieInSecond('mobanner1',3,31600)})
				
					)
				  
				)
			)
	else*/

}//fe
commonui.mobanner.unpack = function(a){
return {time_a:a>>21&2047,count_a:a>>16&31,time_b:a>>5&2047,count_b:a&31}
}//
commonui.mobanner.pack = function(a){
return (a.time_a&2047)<<21|(a.count_a&31)<<16|(a.time_b&2047)<<5|(a.count_b&31)
}//
commonui.mobanner.getMi = function(){
var now=(__NOW-(new Date).getTimezoneOffset()*60)/86400
return (now-(now|0))*86400/60&2047
}//

//search======================
commonui.uniSearchWindow = function (e){
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('搜索')
this.adminwindow._.addContent(this.uniSearchInput())
this.adminwindow._.show(e);
}//fe

commonui.uniSearchInput=function(ni){
var s=this,st,stc,sf,su,au,re,fc,fa,fo,foi,foii,k=ni,$=_$,fcs,csf = s.selectForum.get(4, 16),go = function(o){
k.value = k.value.replace(/^\s+|\s+$/g,'')
if (!k.value)
	return alert('请输入关键词')
if(o==st || o==stc || o==au){
	fo.method='post'
	if(o==au){
		if(fcs.checked){
			fcs.checked = ''
			fc.checked = 'checked'
			}
		fo.action = '/thread.php?__inchst=UTF8&author='+encodeURIComponent(k.value)
		}
	else
		fo.action = '/thread.php?key='+encodeURIComponent(k.value)
	if(fcs.checked)
		fo.action += '&fid='+csf.join(',')
	else if(fc.checked)
		fo.action += '&fid='+s.selectForum.get(64).join(',')
	if(o==stc)
		fo.action += '&content=1'
	if(re.checked)
		fo.action += '&recommend=1'
	}
if(o==sf){
	fo.action = '/forum.php?'
	foi.name='key'
	foi.value=k.value
	}
if(o==su){
	fo.action = '/nuke.php?'
	foii.name='func'
	foii.value='ucp'
	foi.value=k.value.replace(/^\s*|\s*$/g,'')
	if(foi.value.match(/^\d+$/))
		foi.name='uid'
	else{
		if(foi.value.substr(0,1)=='\\')
			foi.value = foi.value.substr(1)
		foi.name='username'
		}
	}
	/*
if(sd.checked){
	fo.method='post'
	fo.target = '_blank';
	fo.action = 'http://db.178.com/wow/cn/search.html?name='+encodeURIComponent(k.value);
	}*/
fo.submit()
}
if(k)
	$(k).$0('onkeydown',function(e){
		if(e.keyCode==13)__NUKE.fireEvent(st, 'click')
		})
var h = $('/span')._.css({whiteSpace:'nowrap',width:'23em'})._.add(
	fo=$('/form').$0(
		'method','get',
		'target','_blank',
		'action','',
		foii=$('/input').$0('type','hidden'),
		foi=$('/input').$0('type','hidden')
		),
	k ? null : ([k=$('/input','type','text','size','28','maxlength','50','onkeydown',
						function(e){if(e.keyCode==13)__NUKE.fireEvent(st, 'click')}
						),
					//$('/button').$0('type','button','innerHTML','搜索','onclick',function(){go(this)}),
					//' ',
					//$('/a').$0('href','/search.php','className','b','innerHTML','高级搜索'),
					$('/br'),
					$('/br')]),
	st=$('/button','type','button','innerHTML','搜索主题标题','onclick',function(){go(this)}),
	fcs=$('/input','type','radio','name','rsch2','style','marginLeft:5.2em'),'勾选的版面*',
	$('/br'),
	stc=$('/button','type','button','innerHTML', '搜索主题标题和主题内容','onclick',function(){go(this)}),fc=$('/input','type','radio','name','rsch2'),' 当前版面',
	$('/br'),
	sf=$('/button','type','button','innerHTML', '搜索版面或版主','onclick',function(){go(this)}),fa=$('/input','type','radio','name','rsch2','style','marginLeft:4.2em'),' 全部版面',
	$('/br'),
	su=$('/button','type','button','innerHTML','搜索用户**','onclick',function(){go(this)}),re=$('/input','type','checkbox','name','recommend','style','marginLeft:6.3em'),' 精华主题',
//	$('/br'),
//	sd=$('/button','type','button','innerHTML','搜索魔兽世界数据库','onclick',function(){go(this)}),
	$('/br'),
	au=$('/button','type','button','innerHTML','搜索用户发布的主题**','onclick',function(){go(this)}),
	$('/br'),
	$('/br'),
	$('/span','className','silver','innerHTML','*包括选中联合版面和版面的镜像 不包括合集的镜像<br/>**输入用户ID或用户名 数字用户名需在前加\x5c')
	)

st.checked=1
if (csf.i==0){
	fa.checked=1
	fcs.disabled=1
	fc.disabled=1
	}
else if (csf.i==1)
	fc.checked=1,fcs.disabled=1
else{
	if(csf.nocfid)
		fc.disabled=1
	fcs.checked=1
	}
return h
}//

//顺序加载脚本=================
commonui.loadScriptInOrder_loadedScript = {}
commonui.loadScriptInOrder = function(s,onready)
{
if (typeof(s)=='string') s=new Array(s);
var cur = s.shift();
if (this.loadScriptInOrder_loadedScript[cur])
	{
	if(s.length)this.loadScriptInOrder(s,onready);
	else onready();
	return;
	}
var h = document.createElement('script');
h.src = cur;
h.onload=h.onreadystatechange = function(){
	if (this.readyState && this.readyState != 'loaded' && this.readyState != 'complete')
		return;
	commonui.loadScriptInOrder_loadedScript[this.src]=1;
	if (s.length==0) onready();
	else commonui.loadScriptInOrder(s,onready);
	}
document.getElementsByTagName('head')[0].appendChild(h)
}

//修改记录格式化================
commonui.loadAlertInfo=function(info)
{
if(!info)return;
info = info.split(/\t|\n/);
var e = '';
var p = '';
for (var k in info){
	if(typeof(info[k])!='string')continue
	info[k] = info[k].replace(/^[\t\n ]+/,'');
	if (info[k])
		{
		if (info[k].substr(0,4).toLowerCase()=='edit')e+=info[k]+' ';
		else p+=info[k].replace(/\[(L|U)?([\d\.\/ ]+)( .+?)?\](.+)?/g,function($0,$1,$2,$3,$4){
				$2 = $2.split(' ')
				$3 = $3!==undefined?' '+$3:''
				$4 = $4!==undefined?' '+$4:''
				if($1=='L')
					return '[-'+$2[0]+'声望 -'+$2[1]+'威望 禁言'+$2[2]+'天'+$3+']&emsp;'
				else if($1=='U')
					return '['+$2[0]+'声望 '+$2[1]+'威望 '+$2[2]+'G'+($3==' UM'?' 解除禁言':'')+' (取消操作)]&emsp;'
				else
					return '['+$2[0]+'声望 '+$2[1]+'威望 '+$2[2]+'G'+$3+$4+']&emsp;'
				});
		}
	}
if(e)put('<div class="silver">'+e+'</div>');
if(p)put("<table class='quote'><tr><td>评分记录 "+p+'</td></tr></table>');
}

commonui.modInfo = function(g,c){
switch(g){
	case 3:
		return ['','正式任命的管理员','8a46a0','51325c']
	case 4:
		return ['','社区正式任命的超级版主','18677e','21505d']
	case 5:
	case 82:
		return c ? ['','社区正式任命的版主','18507e','21425d',c==2?'副':'','本版面管理任命的副版主','21425d'] : null
	case 77:
	case 83:
		return ['','社区正式任命的版主','18507e','21425d']
	}
return c ? (['','','','','非',c==2?'非正式任命副版主':'非正式任命版主',c==2?'aaa':'888']) : null
}

//切换显示隐藏==================
commonui.switchDisp = function(o,d,close)
{
if (o.style.display && o.style.display=='none')
	{
	if(d)o.style.display=d
	else o.style.display=''
	if(close)
		{
		o.onmouseout=function(e){
			if (!e) var e = window.event;
			var to = (e.relatedTarget) ? e.relatedTarget : e.toElement;
			if (to && to!=this && to.parentNode!=this && to.parentNode.parentNode!=this)
				{
				this.style.display='none'
				}
			}
		}
	}
else
	o.style.display='none'
}


//金币格式化===================
commonui.calc_money = function (c){
c = parseInt(c,10);
if (!c || c <= 0)
	return ('');
var g = Math.floor(c / 10000), s = Math.floor(c / 100) - g * 100,  h ='' , t = ''
c = c - g * 10000 - s * 100;
if (g){
	t+=g+'金币 '
	h += g+"<img alt='金币' style='margin:2px 1px -2px 0px' src='"+__IMG_STYLE+"/g.gif'/>";
	}
if (s){
	t+=s+'银币 '
	if(g<100)
		h += s+"<img alt='银币' style='margin:2px 1px -2px 0px' src='"+__IMG_STYLE+"/s.gif'>";
	}
if (c){
	t+=c+'铜币 '
	if(!g)
		h += c+"<img alt='铜币' style='margin:2px 1px -2px 0px' src='"+__IMG_STYLE+"/c.gif'/>";
	}
return "<span title='"+t+"'>"+h+"</span>"
}//fe

//小广告=======================
commonui.menuRight = function(){
return ""
}

var __TXT
;(function(){
var g={
		_c:"font-family:'comm_glyphs';webkitFontSmoothing:antialiased;mozOsxFontSmoothing:grayscale;lineHeight:1em",
		star:'\u2605',
		gear:'\u2699',
		menu:'\u2261',
		smile:'\ue813',
		good:'\u2bc5',
		bad:'\u2bc6',
		img:'\ue1bc',
		tbody:'\ue228',
		close:'\xd7',
		link:'\u271a',
		up:'\u25b2',
		label:'\u23fa'
		}/*
if(__SETTING.uA[0]==1 && __SETTING.uA[1]<9 || __SETTING.uA[4]==2 && __SETTING.uA[5]<9)
	g={
		star:['&#9733;','fontFamily:SimHei,Verdana, Tahoma,Arial,sans-serif'],
		gear:'&#8801;',
		menu:'&#8801;',
		smile:'表情',
		good:'&#9650;',
		bad:'&#9660;',
		img:'图片',
		tbody:'表格',
		close:'&#215;',
		link:'链接'
		}*/
		
__TXT = function(k,opt){
if(opt&2)
	return "<span style=\""+g._c+"\">"+(g[k]?g[k]:'notfound')+"</span>"
return _$('/span')._.add((opt&1) ? null:'\u00A0',_$('/span','style',g._c)._.add(g[k]),(opt&1) ? null:'\u00A0')
}
})();




}//be

//============================
//主菜单=======================
commonui.mainMenuItems={
	//hisAddon:[100],
	hisDefLeft:[7,5,6,8,9,160,10,151],
	hisDef:[0,115,116,119,146,162],
	0:{subKeys:[144,18,118,147],
		title:(__GP.userBit&256) ? '移动验证成功' : '点此打开主菜单',
		innerHTML:__CURRENT_UID ? '<div class="half">你好<br/>'+commonui.cutstrbylen(__CURRENT_UNAME,7,6,'...')+'</div>' : '开始',
		className:((__GP.userBit&256) ? 'teal' : 'invert')
		},//0为根菜单
	1:{href:'/thread.php?recommend=1',innerHTML:'精华主题',color:'#80C0C0'},
	2:{u:1,href:'/thread.php?favor=1',innerHTML:'收藏的主题',color:'#80C0C0'},
	3:{u:1,href:'/thread.php?authorid='+__CURRENT_UID,innerHTML:'我的主题',color:'#80C0C0'},
	/*
	4:{u:1,disableDefault:1,html:_$('/div')._.add(_$('/img').$0('src','about:blank','style',{display:'none'},'onerror',function(){
			var i = new Image(),self = this, x=commonui.loadCurUserPortrait(__CURRENT_AVATAR)
			i.src = x
			i.onreadystatechange=i.onload=function(){
				if(this&&this.readyState&&this.readyState!='complete')
					return
				this.onreadystatechange = this.onload=null
				self.parentNode._.css('borderLeft','0.5em solid #591804','height','100%','width',(this.width+2)+'px','background','#FFF0CD url('+i.src+') 1px '+(x.cY ? x.cY*100 : 50)+'% no-repeat','boxShadow','#FFF0CD '+(x*2)+'px 0 '+x+'px -'+x+'px inset')
				}//
			}))},//头像预留
		*/
	5:{href:'http://nga.cn',innerHTML:'首页'},
	6:{href:'/',innerHTML:'论坛',className:'active'},
	7:{href:'/',innerHTML:_$('/img').$0('src',__IMG_STYLE+'/logo10.png','style'),disableDefault:1},
	8:{href:'http://game.nga.cn/',innerHTML:'评分'},
	9:{href:'http://g.nga.cn/',innerHTML:'聚聚'},
	10:{href:'http://app.178.com/',innerHTML:'移动端'},

/*
	4:{ innerHTML:'魔兽世界',subKeys:[5,7,28,39,54,61,72,83,86,87],color:'#808FBC' },
	5:{innerHTML:'魔兽世界专题站',href:"http://wow.178.com"},

	7:{ innerHTML:'工具',subKeys:[8,9,10,11,12,13,14,15,16,17,100] },
	8:{ innerHTML:'数据库（简体）',href:"http://db.178.com/wow/cn/index.html" },
	9:{ innerHTML:'数据库（繁体）',href:"http://db.178.com/wow/tw/index.html" },
	10:{ innerHTML:'大脚插件',href:"http://bigfoot.178.com/" },
	11:{ innerHTML:'天赋模拟器',href:"http://wow.178.com/talent/" },
	12:{ innerHTML:'签名生成器',href:"http://wowsig.178.com/" },
	13:{ innerHTML:'成就查询',href:"http://wow.178.com/chengjiu/" },
	14:{ innerHTML:'3D幻化试衣间',href:"http://db.178.com/wow/transmogrification/index.html" },
	15:{ innerHTML:'竞技场点数计算器',href:"http://wow.178.com/jjc/" },
	16:{ innerHTML:'WMO战斗数据分析',href:"http://wmo.178.com/" },
	17:{ innerHTML:'魔兽网络加速',href:"http://www.ofcard.com/showinfo.do?cardid=3809&amp;username=173178" },

	18:{ innerHTML:'论坛设置',subKeys:[19,20,21,22,97,101,102,109,110,111,112,113,108,141,142] },
	19:{ html:function(){return commonui.picswitch()},title:'选择显示较少的图片',disableDefault:1 },
	20:{ html:function(){return commonui.setfont()},title:'选择论坛显示字体',disableDefault:1},
	21:{ html:function(){return commonui.iframeread()},title:'是否在内嵌窗口内阅读主题',disableDefault:1},
	*/
	22:{ innerHTML:'用户脚本',on:{event:'click',func:function(e){commonui.loadUserScript(__NUKE.position.dummyEvent(e))} }, check:function(){if(__CURRENT_UID)return true} },
/*
	23:{ innerHTML:'暗黑破坏神',subKeys:[24,98,99,106],color:'firebrick' },
	24:{innerHTML:'暗黑破坏神专题站',href:"http://d3.178.com"},
*/
	25:{u:1,href:'/nuke.php?func=ucp&uid='+__CURRENT_UID,innerHTML:'论坛用户中心',disableDefault:1,color:'#551200'},
	26:{u:1,href:'/nuke.php?func=message',innerHTML:'短消息',disableDefault:1,color:'sandybrown'},
	27:{u:1,
		check:function(){
			if(commonui.userCache)
				return true
			},
		innerHTML:'提醒信息',
		on:{
			event:'click',
			func:function(){
				if(commonui.notification)commonui.notification.openIndex()
				else commonui.loadNotiScript(function(){commonui.notification.openIndex()})
				}
			},
		color:'sandybrown'
		},
/*
	28:{ innerHTML:'职业',subKeys:[29,30,31,32,33,34,35,36,37,38] },
	29:{ innerHTML:'死亡骑士',href:"http://wow.178.com/list/dk/" },
	30:{ innerHTML:'战士',href:"http://wow.178.com/list/zs/" },
	31:{ innerHTML:'圣骑士',href:"http://wow.178.com/list/sq/" },
	32:{ innerHTML:'猎人',href:"http://wow.178.com/list/lr/" },
	33:{ innerHTML:'萨满祭司',href:"http://wow.178.com/list/sm/" },
	34:{ innerHTML:'潜行者',href:"http://wow.178.com/list/dz/" },
	35:{ innerHTML:'德鲁伊',href:"http://wow.178.com/list/dly/" },
	36:{ innerHTML:'法师',href:"http://wow.178.com/list/fs/" },
	37:{ innerHTML:'牧师',href:"http://wow.178.com/list/ms/" },
	38:{ innerHTML:'术士',href:"http://wow.178.com/list/ss/" },

	39:{ innerHTML:'技能',subKeys:[89,40,41,42,43,44,45,46,47,48,49,50,51,52,53,94] },
	40:{ innerHTML:'附魔',href:"http://wow.178.com/fumo/" },
	41:{ innerHTML:'珠宝',href:"http://wow.178.com/zhubao/" },
	42:{ innerHTML:'铭文',href:"http://wow.178.com/mingwen/" },
	43:{ innerHTML:'工程学',href:"http://wow.178.com/gongcheng/" },
	44:{ innerHTML:'锻造',href:"http://wow.178.com/duanzao/" },
	45:{ innerHTML:'制皮',href:"http://wow.178.com/zhipi/" },
	46:{ innerHTML:'裁缝',href:"http://wow.178.com/caifeng/" },
	47:{ innerHTML:'炼金',href:"http://wow.178.com/lianjin/" },
	48:{ innerHTML:'钓鱼',href:"http://wow.178.com/diaoyu/" },
	49:{ innerHTML:'烹饪',href:"http://wow.178.com/pengren/" },
	50:{ innerHTML:'采矿',href:"http://wow.178.com/caikuang/" },
	51:{ innerHTML:'草药',href:"http://wow.178.com/caoyao/" },
	52:{ innerHTML:'剥皮',href:"http://wow.178.com/bopi/" },
	53:{ innerHTML:'急救',href:"http://wow.178.com/jijiu/" },

	54:{ innerHTML:'攻略',subKeys:[55,56,57,58,59,60] },
	55:{ innerHTML:'副本',href:"http://wow.178.com/list/fuben/index.html" },
	56:{ innerHTML:'成就',href:"http://wow.178.com/list/chengjiu/index.html" },
	57:{ innerHTML:'声望',href:"http://wow.178.com/list/shengwang/index.html" },
	58:{ innerHTML:'PVP',href:"http://wow.178.com/list/pvp/index.html" },
	59:{ innerHTML:'任务',href:"http://wow.178.com/list/renwu/index.html" },
	60:{ innerHTML:'物品',href:"http://wow.178.com/list/wupin/index.html" },

	61:{ innerHTML:'图片',subKeys:[62,63,64,65,66,67,68,69,70,71] },
	62:{ innerHTML:'画匠专栏',href:"http://wow.178.com/pic/" },
	63:{ innerHTML:'NGA画窟活动',href:"http://wow.178.com/list/39465524376.html" },
	64:{ innerHTML:'NGA画窟作品集',href:"http://wow.178.com/list/18492273712.html" },
	65:{ innerHTML:'搞笑图片',href:"http://wow.178.com/list/33270107982.html" },
	66:{ innerHTML:'漫画',href:"http://wow.178.com/list/manhua/index.html" },
	67:{ innerHTML:'热门连载',href:"http://wow.178.com/list/39465028323.html" },
	68:{ innerHTML:'游戏周边',href:"http://wow.178.com/200907/t_42237847459.html" },
	69:{ innerHTML:'暴雪画廊',href:"http://wow.178.com/list/39465575675.html" },
	70:{ innerHTML:'精美壁纸',href:"http://wow.178.com/list/bizhi/index.html" },
	71:{ innerHTML:'魔兽翻唱',href:"http://wow.178.com/list/30568303503.html" },

	72:{ innerHTML:'UI插件',subKeys:[88,73,74,75,76,77,78,79,80,81,82] },
	73:{ innerHTML:'商业物品',href:"http://wowui.178.com/sort/36" },
	74:{ innerHTML:'战斗增强',href:"http://wowui.178.com/sort/29" },
	75:{ innerHTML:'聊天交流',href:"http://wowui.178.com/sort/45" },
	76:{ innerHTML:'地图',href:"http://wowui.178.com/sort/22" },
	77:{ innerHTML:'团队和副本',href:"http://wowui.178.com/sort/12" },
	78:{ innerHTML:'界面增强',href:"http://wowui.178.com/sort/18" },
	79:{ innerHTML:'任务',href:"http://wowui.178.com/sort/26" },
	80:{ innerHTML:'PvP',href:"http://wowui.178.com/sort/30" },
	81:{ innerHTML:'职业',href:"http://wowui.178.com/sort/1" },
	82:{ innerHTML:'管理与周边',href:"http://wowui.178.com/sort/35" },

	83:{ innerHTML:'公会',subKeys:[84,85] },
	84:{ innerHTML:'公会系统',href:"http://gh.178.com/" },
	85:{ innerHTML:'DKP系统',href:"http://dkp.178.com/" },


	86:{ innerHTML:'魔兽数据库',href:"http://db.178.com/wow/" },
	87:{ innerHTML:'人口普查',href:"http://db.178.com/wow/summary/" },


	88:{ innerHTML:'插件中心',href:"http://wowui.178.com" },
	89:{ innerHTML:'技能首页',href:"http://http://wow.178.com/list/syjn/" },


	90:{ innerHTML:'点击开始找到你需要的功能',tagName:'span' ,color:'silver',disableDefault:1},

	91:{href:'/search.php',innerHTML:'高级搜索',color:'gray'},
	92:{tagName:'select','options':[ {k:'版面跳转',v:0} ],on:{
			event:'click',
			func:function(){
				if(this._loaded)return
				this._loaded=true
				commonui.onloadforumlist(this);
				this.onchange=function(){window.location="/thread.php?fid="+this.options[this.selectedIndex].value}
				}
			}
		},
	*/
	93:{u:1,href:'/thread.php?fid=357',innerHTML:'收藏的版面',check:function(){if(window.__GP && __GP['rvrc'] && __GP['rvrc']>=20)return true}},
	//94:{ innerHTML:'考古学',href:"http://wow.178.com/kaogu/" },
//95:custombg
//96:autodomain
	97:{ innerHTML:'控制台',on:{event:'click',func:function(e){commonui.console.open()} } },
	//98:{innerHTML:'游戏数据库',href:"http://db.178.com/d3/"},
	//99:{innerHTML:'技能模拟器',href:"http://db.178.com/d3/calculator/bar.htm"},
	//100:{ check:function(){if(!(__SETTING.bit & 4))return true},innerHTML:'魔兽点卡充值',href:"http://wow.178.com/200909/47347481167.html" },
	101:{ innerHTML:'设置头像',on:{event:'click',func:function(e){commonui.setAvatar(e,__CURRENT_UID)}} },
	102:{ innerHTML:'设置签名',on:{event:'click',func:function(e){commonui.setSign(e,__CURRENT_UID)}} },
	//103:{ innerHTML:'用户脚本',href:"/nuke.php?func=user_script" },
	104:{u:1,href:'/thread.php?searchpost=1&authorid='+__CURRENT_UID,innerHTML:'我的回复',color:'#80C0C0'},
	//105:{u:1,href:'http://i.178.com/?_app=index&_controller=index&_action=index&uid='+__CURRENT_UID,innerHTML:'178用户中心',color:'#551200'},
	
	//106:{href:'http://db.178.com/d3/calculator/dps.htm',innerHTML:'DPS计算器'},
	
	107:{ innerHTML:'物品/道具',color:'gray',check:function(){
			if(window.__CURRENT_UID)
				return true
			},on:{event:'click',func:function(e){
		if(commonui.userItem)
			commonui.userItem.open()
		else
			loader.script(__SCRIPTS.userItem,function(){commonui.userItem.open()} )
		} } },

	108:{u:1,check:function(){if(__GP.admin)return true},innerHTML:'管理密码输入',on:{event:'click',func:function(e){commonui.adminPassInput()}}},
	109:{u:1,check:function(){if(__GP.greater)return true},href:'/nuke.php?func=modifymedal',innerHTML:'论坛徽章设置'},
	110:{u:1,check:function(){if(__GP.admin)return true},href:'/nuke.php?func=modifygroup',innerHTML:'用户组设置'},
	111:{u:1,check:function(){if(__GP.admin)return true},href:'/nuke.php?func=modifyforum',innerHTML:'版面设置'},
	112:{u:1,check:function(){if(__GP.admin)return true},href:'/nuke.php?func=modifyreputation',innerHTML:'论坛声望设置'},
	113:{u:1,check:function(){if(__GP.admin)return true},href:'/nuke.php?func=listuser',innerHTML:'统计'},
	
	114:{on:{event:'click',func:function(e){commonui.mainMenu.menuOpen(e)}},innerHTML:'开始',className:'invert',disableDefault:1},
115:{u:0,href:'https://'+location.hostname+'/nuke.php?__lib=login&__act=login_ui', target:'_blank',innerHTML:'登录',disableDefault:1,on:{event:'click',func:function(e){
		if(__SETTING.bit&24){
			this.target=''
			this.href=this.href.replace(/(?:&url=.+)|$/,'&url='+encodeURIComponent(location.href))
			}
		}}},
	//115:{u:0,href:'https://account.178.com/?p=trylogin&to='+encodeURIComponent(location.href), innerHTML:'登录',disableDefault:1},
116:{u:0,href:'http://account.178.com/?p=register', innerHTML:'注册',disableDefault:1},
	//117:{u:1,href:'/nuke.php?func=message', innerHTML:'短消息',disableDefault:1},
	
	118:{u:1,innerHTML:'搜索',on:{event:'click',func:function(e){commonui.uniSearchWindow(e)}},disableDefault:1},

	119:{u:1,title:'登出: 若你的帐号在其他终端登录本站, 亦可一并登出' ,innerHTML:'登出',
		href:'javscript:void(0)',
		on:{event:'click',func:function(e){
				if(!confirm("你确认要登出吗"))
					return commonui.cancelEvent(e)

				var x = confirm("是否要将其他终端一并登出\n\n(本机或其他设备上的浏览器与APP等)") ? 1: 0 , y = 0

				__NUKE.doRequest({
					u:{u:__API._base,
							a:{__lib:"login",__act:"logout",logout_current_only:x ? '' : 1,nojump:1,raw:3}
							},
					b:this,
					f:function(d){
						if(d.data && d.data[0]){
							for(var k in d.data){
								if(d.data[k].substr(0,4)=='http')
									__NUKE.doRequest({
										u:d.data[k].replace('raw=3','raw=1'),
										f:function(){y++}
										})
								}
							}
						if(x)
							__NUKE.doRequest({
								u:{u:location.protocol+'//account.178.com/q_account.php?_act=logout&to=',a:{'null':'null'}},
								f:function(){y++}
								})
						window.setTimeout(
							function(){
								if(y>=4)
									alert('操作成功')
								else
									alert('网络速度较慢 请等待')
							},3000)
						}
					})
					
				commonui.cancelEvent(e);
				return false
				}//fe
			},
		disableDefault:1
		},
	//120~140 for custom
	141:{ innerHTML:'界面设置',on:{event:'click', func:function(e){__SETTING.ui()} }},
	142:{ innerHTML:'移动验证器(beta)',on:{event:'click', func:function(e){commonui.extraAuthInput(e)} }},

	144:{u:1,innerHTML:'我的',subKeys:[25,158,146,1,2,3,104,93,107,101,102,154]},
	18:{innerHTML:'设置',subKeys:[97,95,141,22,108,142,109,110,111,112,113,152,153,155,156,157]},
	146:{innerHTML:'消息',subKeys:[26,27,148,161,163]},
	147:{ innerHTML:'商店',color:'gray',check:function(){
			if(window.__CURRENT_UID)
				return true
			},on:{event:'click',func:function(e){
		if(commonui.userItem)
			commonui.userItem.storeUi()
		else
			loader.script(__SCRIPTS.userItem,function(){commonui.userItem.storeUi()} )
		} } },
	148:{u:1,check:function(){if(__GP.ubSecAct)return true},href:'/nuke.php?func=message&asuid=34909933',innerHTML:'公共收件箱(帐号安全)',disableDefault:1,color:'sandybrown'},
149:{u:1,href:'https://account.178.com/?p=renew_pass',innerHTML:'修改密码',disableDefault:1},
150:{href:'https://account.178.com/?p=reset_pass',innerHTML:'重置密码',disableDefault:1},
	151:{href:'https://shop482085632.taobao.com',innerHTML:'商城'},
	152:{u:1,check:function(){if(__GP.ubMod)return true},innerHTML:'debug',on:{event:'click',func:function(e){commonui.userDebug()}}},
	153:{u:1,check:function(){if(__GP.ubMod && window.__DEBUG)return true},innerHTML:'update src',on:{event:'click',func:function(e){adminui.updateSrc()}}},
	154:{u:1,check:function(){if(__GP.greater || __GP.rvrc>=200)return true},innerHTML:'随机头衔',on:{event:'click',func:function(e){commonui.randomTitle()}}},
	155:{check:function(){if(window.__DEBUG)return true},innerHTML:'NGA.CN',on:{event:'click',func:function(){location.href=location.href.replace(/:\/\/[^\/]+/,'://bbs.nga.cn')}}},
	156:{check:function(){if(window.__DEBUG)return true},innerHTML:'NGACN.CC',on:{event:'click',func:function(){location.href=location.href.replace(/:\/\/[^\/]+/,'://bbs.ngacn.cc')}}},
	157:{u:1,check:function(){if(__GP['super'])return true},innerHTML:'设置版面图标',on:{event:'click',func:function(e){adminui.fIconGen()}}},
	158:{innerHTML:'账号设置'  ,subKeys:[149,150,159]},
159:{u:1,innerHTML:'绑定手机号'  ,on:{event:'click',func:function(e){__SCRIPTS.load('ucp',function(){commonui.setPhone()})}}},
	160:{href:'http://tv.nga.cn/',innerHTML:'赛事'},
	161:{u:1,check:function(){if(__GP.ubStaff || __GP.lesser)return true},href:'/nuke.php?func=message&asuid=42686479',innerHTML:'公共收件箱(主题推荐)',disableDefault:1,color:'sandybrown'},
	162:{u:1,tagName:'span',disableDefault:1,innerHTML:function(){
		return ['\u00A0',
			_$('/input','style','width:8em','placeholder','\u2003\u2003\u2003\u2003\u2003 搜索','_on',function(){
				var o= this.__w
				if(!o){
					o = (this.__w = commonui.createCommmonWindow(2))
					o._.addContent(
						_$('/span')._.add(
							commonui.uniSearchInput(this)
							)	  
						)
					o.firstChild.lastChild.style.backgroundColor=__COLOR.bg4
					with(o.style){
						left=top='0'
						visibility='hidden'
						display = 'block'
						boxShadow='none'
						borderTop='none'
						borderColor=__COLOR.gbg4
						marginTop='-1px'
						}
					document.body.appendChild(o)
					o._b = (o.offsetWidth-o.clientWidth)/2+o.clientWidth
					var se = this
					commonui.aE(document.body,'click',function(e){
						var h = e.target || e.srcElement
						for(var i=0;i<7;i++){
							if(h==o||h==se.parentNode.parentNode)
								return
							h=h.parentNode
							if(!h)
								break
							}
						o._.hide()
						})
					}
				if(o.style.display == 'none' || o.style.visibility == 'hidden'){
					var p = this.parentNode.parentNode.getBoundingClientRect()
					o._.show(p.left+p.width-o._b,p.top+p.height)
					}
				},
				'onchange',function(){this._on()},
				'onclick',function(){this._on()}),
			'\u00A0']
		}},
		163:{u:1,check:function(){if(__GP.superlesser && __GP.greater)return true},href:'/nuke.php?func=message&asuid=42766294',innerHTML:'公共收件箱(版务申诉)',disableDefault:1,color:'sandybrown'}
		
	}

if((__NOW/3600)&1){
commonui.mainMenuItems[159]={arg:['innerHTML','绑定手机号','onclick',function(){commonui.accountAction('setphone')}],disableDefault:1,u:1}
commonui.mainMenuItems[149]={arg:['innerHTML','修改密码','onclick',function(){commonui.accountAction('changepass')}],disableDefault:1,u:1}
commonui.mainMenuItems[150]={arg:['innerHTML','重置密码','onclick',function(){commonui.accountAction('resetpass')}],disableDefault:1,u:1}
commonui.mainMenuItems[116]={arg:['innerHTML','注册','onclick',function(){commonui.accountAction('register')}],disableDefault:1,u:0}
commonui.mainMenuItems[115]={arg:['innerHTML','登录','onclick',function(){commonui.accountAction('login')}],disableDefault:1,u:0}
}
//============================
//版面icon====================
;(function(){
var f = [320,181,182,183,184,185,186,187,188,189,255,'10',306,'10',336,'10',190,213,218,258,272,191,200,240,274,315,333,327,318,332,321,7,-7,'354',354,310,323,264,10,335,18,13,16,12,8,102,254,355,116,193,201,230,334,335,29,387,388,390,391,-46468,393,394,395,396,397,398,399,-152678,403,-447601,-2371813,-65653,411,412,414,311,'414',-235147,420,422,-8725919,425,428,427,-7861121,-6194253,-84,431,430,435,432,442,444,445,426,-362960,452,-187579,-47218,-51095,-452227,-532408,459,-7202235,464,441,-1437546,469,463,474,406,446,-343809,476,477,486,'s8702375',492,-149110,124,494,490,501,482,480,497,-5080470,465,526,489,-81981,485,529,-547859,537,538,540,418,479,'418',545,'418',550,549,516,555,551,484,-4567100,'-4567100b',-353371,-608808,556,559,-15219445,560,563,-8180483,493,'493_1',564,568,0],
s= [8702375],
uf = window.__UFICON ? __UFICON : [],
us = window.__USICON ? __USICON : [],
g=function(y,x,z){
var p = y.indexOf(x|0)
return (p==-1) ? null : ( (y[p+1] && y[p+1].constructor==String) ? (y[p+1].charAt(0)=='?' ? x+z+y[p+1] : y[p+1]+z) : x+z )
}
if(!f.indexOf)
	f.indexOf=s.indexOf=uf.indexOf=us.indexOf=function(x){
		for(var i=0;i<this.length;i++)
			if(this[i]===x)
				return i
		return -1
		}
commonui.forumIcon = function(fid,stid){
var i
if(stid){
	if(i = g(s,stid,'.png'))
		return __IMG_STYLE+'/f/s'+i
	if(i = g(us,stid,'v.png'))
		return __IMG_BASE+'/proxy/cache_attach/ficon/'+i
	}
if(fid){
	if(i = g(f,fid,'.png'))
		return __IMG_STYLE+'/f/'+i
	if(i = g(uf,fid,'u.png'))
		return __IMG_BASE+'/proxy/cache_attach/ficon/'+i
	}
return __IMG_STYLE+'/f/00.png'
}//fe

})();

//============================
//首页========================
commonui.indexBlock = {

single: 0,
l:null,
r:null,
rr:null,
blkwd:null,
his:null,
data:null,

load:function (l,r,c,rr){
var self = this
if(this.data===null){
	var ee=1
	this.data = false
	return __NUKE.doRequest({
		u:window.__API.indexForumList(),
		f:function(d){
			var e = __NUKE.doRequestIfErr(d,7200)
			if(e===true && ee){
				ee=false
				return;
				}
			if(e)
				return console.log(e)
			self.data = d.data[0]
			commonui.indexBlock.load(l,r,c,rr)
			return true
			}
		})
	}
	
if(this.his===null){
	this.his=false
	return commonui.userCache.hostGet('https://bbs.ngacn.cc','ForumViewHis',function(x){self.his=x?x:false; commonui.indexBlock.load(l,r,c,rr)})
	}

var x,h,w = window

if(this.single = (w.__SETTING.bit & 4)){
	this.blkwd = $('mc').offsetWidth
	x = this.data.single
	}
else{
	this.blkwd = $('mc').offsetWidth/2
	x = this.data['double']
	}

this.blkwd = this.blkwd>800 ? 4 : 3

if(h= this.his){
	var hc =[]
	for (var k in h){
		if (h[k][2])
			hc.push(
				{fid:h[k][0],
				name:h[k][1]}
				)
		}
	if(hc.length)
		this.add(hc,'fast',0)
	}



if(w.__CURRENT_UID && w.__GP && w.__GP.userBit & 32){//当前用户有个人版
	for(var k in this.data.all.club.content){}
	this.add([ {fid:w.__CURRENT_UID*-1 , name:"我的个人版" , bit:1/*hight light*/} ],'other',k)
	}

if(this.added){
	for(var i in this.added){
		var k = i.split('\t'), y=this.data.all[k[0]].content
		y=y[k[1]]? y[k[1]] : y[0]
		if(k[2]|0)
			y.content[k[2]] = this.added[i]
		else{
			y[k[2]]=this.added[i]
			}
		}				
	}

var y='',z=''

for(var k in x[0]){
	if(this.data.all[x[0][k]])
		y+=this.genBlock( this.data.all[x[0][k]] )
	}
if(x[1]){
	for(var k in x[1]){
		if(this.data.all[x[1][k]])
			z+=this.genBlock( this.data.all[x[1][k]] )
		}
	}
else{
	r.style.display=c.style.display='none'
	l.style.width='100%'
	}

l.innerHTML=y
if(z)
	r.innerHTML=z

	


if ((w.ngaAds.bbs_ads26 || w.ngaAds.bbs_ads27) && !(w.__SETTING.bit & 16)){
	if(x[0] && x[1])
		var z = 75
	else
		var z = 150
	if(x[0])l.style.width=(l.offsetWidth-z)+'px'
	if(x[1])
		r.style.width=(r.offsetWidth-z)+'px', r.style.marginRight='5px'
	else
		l.style.marginRight='5px'
	rr.style.width='144px'
	rr.style.padding='4px 0px'
	rr.style.overflow='hidden'
	rr.style.height=(rr.parentNode.offsetHeight-8)+'px'
	rr.style.display='block'
	}

},//fe


added:null,

/*
将一个版面列表插入到某一块的末尾
x  array 数据数组 [版面数据,版面数据,版面数据 ...]
b  string 欲加入到的块ID 见this.data.all
c  int 欲加入到的子块ID
*/
add:function(x,b,c,i){
if(!this.added)
	this.added = []
var a = this.added
if(!i){
	i=10000
	for(var k in x){
	if(k!='length' && x[k])
		a[b+'\t'+c+'\t'+(i++)]=x[k]
		}
	}
else if(i=='headline'){
	if(!a[b+'\t'+c+'\t'+i])
		a[b+'\t'+c+'\t'+i]=[]
	var r=location.protocol
	for(var k=0;k<x.length;k+=2){
		var d = {txt:x[k]}
		x[k+1].replace(/\[(url|img)\](.+?)\[\/\1\]/g,function($0,$1,$2){
			if($1=='url')
				$2 = $2.replace(/^(https?:)\/\/([^\/]+)/,function($0,$1,$2){
					if($2=='bbs.nga.cn'||$2=='bbs.ngacn.cc'||$2=='nga.178.com'||$2=='bbs.bigccq.cn')
						return ''
					return $0
					})
			else if($1=='img'){
				if(r=='https:')
					$2 = $2.replace(/^http:\/\/img.nga[^\/]+/,'https://img.nga.cn')
				if($2.charAt(0)=='.')
					$2 = commonui.getAttachBase()+$2.substr(1)
				}
			d[$1]=$2
			})
		a[b+'\t'+c+'\t'+i].push(d)
		}
	}
},//fe


addHeadline:function(x,b,c){
if(!this.added)
	this.added = []
var i=10000
for(var k in x){
	if(k!='length' && x[k])
		this.added[b+'\t'+c+'\t'+(i++)]=x[k]
	}
},//fe

genBlock :function(o){
//o = this.data.all[o]
if(o.id=='follow')
	return this.followBlock(o)
var c = ''
for (var k in o.content){
	if(o.content[k])
		c+=this.genSubBlock(o.content[k])
	}
if(!c.length)
	return ''
return "<span id='indexBlock"+o.id+"' class='indexblock'><div class='catenew "+(o.name || c.substr(0,6)!='</div>'?'':'x')+"'><h2 class='catetitle "+(o.name?'':'x')+"' "+(o.info?"title='"+o.info+"'":'')+">:: "+o.name+" ::</h2>"+c+"</div class='catenew'></span id='indexBlock'>"+ngaAds.bbs_ads29_gen(o.id)
//return "<span id='indexBlock"+o.id+"' class='indexblock'><h2 class='catetitle' "+(o.info?"title='"+o.info+"'":'')+">:: "+o.name+" ::<img src='about:blank' onerror='if(commonui.customBackgroundCheckHeight && commonui.customBackgroundCheckHeight(this.parentNode))this.parentNode.className+=\" invertThis\"' class='x'/></h2><div class='catenew' id='indexBlock"+o.id+"Content'>"+(o.pic?this.genPicTitle(o.pic):'')+c+"</div class='catenew'></span id='indexBlock'>"+ngaAds.bbs_ads29_gen(o.id)
},//fe

followBlock:function(o){
	return ''
if(!__CURRENT_UID)return ''
if(!(__GP.userBit & 8192))return ''
var c = "indexBlock"+o.id+"Content" , $ = _$, self = this

return "<span id='indexBlock"+o.id+"' class='indexblock'><div class='catenew' id='indexBlock"+o.id+"Content'><h2 class='catetitle' "+(o.info?"title='"+o.info+"'":'')+">:: "+o.name+" ::</h2>"+c+"</div class='catenew'><img src='about:blank' onerror='commonui.indexBlock.genSubFollow(this.previousSibling)' class='x'/></span id='indexBlock'>"+ngaAds.bbs_ads29_gen(o.id)
//return "<span id='indexBlock"+o.id+"' class='indexblock'><h2 class='catetitle' "+(o.info?"title='"+o.info+"'":'')+">:: "+o.name+" ::</h2><div class='catenew' id='indexBlock"+o.id+"Content'>"+(o.pic?this.genPicTitle(o.pic):'')+"</div class='catenew'><img src='about:blank' onerror='if(commonui.customBackgroundCheckHeight && commonui.customBackgroundCheckHeight(this.previousSibling.previousSibling))this.previousSibling.previousSibling.className+=\" invertThis\";commonui.indexBlock.genSubFollow(this.previousSibling)' class='x'/></span id='indexBlock'>"+ngaAds.bbs_ads29_gen(o.id)
},//fe

genSubFollow:function(c,st){
var $ = _$,c = $(c),
_QPK_TYPE = 0,
_QPK_AID = 1,
_QPK_TID = 2,
_QPK_PID = 3,
_QPK_RPID = 4,
_QPK_TIME = 5,
_QPK_MORE =6,

_P_TID = 0,
_P_FID = 1,
_P_PID = 2,
_P_TYPE = 3,
_P_AID = 4,
_P_TIME = 5,
_P_SUBJ = 6,
_P_CNT = 7,

_Q_TP_USER = 1,//uid发布了tid/pid 回复pid为reply_to的回复
_Q_TP_TOPIC = 2,//tid中uid发布了pid 回复pid为reply_to的回复
_Q_TP_POST = 4//tid中uid发布了pid 回复pid为reply_to的回复


httpDataGetter.script_muti_get({u:__API._base+"__lib=follow&__act=get_push&raw=3",a:{raw:3,start:st?st:0}},
	function(x){
		var e = __NUKE.doRequestIfErr(x)
		if(e)
			return c._.add( $('/table').$0('className','forumbox', 'style','border:none',
				$('/tr').$0(
					$('/td').$0('className','c1','style','padding:0.25em')._.add(e)
					)
				) )

		//console.log(x.data)
		var l = x.data[0][1],//一页数据 lib_follow::get_push_list
		t = x.data[0][2], p = x.data[0][3], u = x.data[0][4], max = x.data[0][0], nextStart = x.data[0][5], i=0, tb= $('/table').$0('className','forumbox', 'style','border:none'), b = $('/tbody'),  prev
		tb._.add(b)

		for(var k in l){
			for(var j in l[k]){//一组数据 lib_follow::get_push_list
				var d = prev = l[k][j], //一个数据
				r,//tr
				tt = t[d[_QPK_TID]],//相关主题信息
				pp//相关帖子信息

				if(d[_QPK_TYPE] & _Q_TP_USER){
					if(d[_QPK_PID])
						pp = p[d[_QPK_PID]]
					else
						pp = t[d[_QPK_TID]]
					}
				else if(d[_QPK_TYPE] & _Q_TP_TOPIC){
					pp = p[d[_QPK_PID]]
					}
				else if(d[_QPK_TYPE] & _Q_TP_POST){
					pp = p[d[_QPK_PID]]
					}

				r = $('/td').$0('className','c1','style','padding:0.25em')._.add(
					$('/span').$0('style','float:right')._.add(
						$('/span')._.cls('gray b stxt')._.add(commonui.time2date(d[_QPK_TIME] , 'y-m-d H:i '))
						),
					'('+k+')',
					$('/a').$0('href','/nuke.php?func=ucp&uid='+d[_QPK_AID],'className','uitxt4','target','_blank','innerHTML',u[d[_QPK_AID]]),
					d[_QPK_PID] ? ' 回复了 ' :  ' 发布了 ',
					$('/a').$0('href','/read.php?tid='+d[_QPK_TID],'className','uitxt3','target','_blank','innerHTML',t[d[_QPK_TID]][_P_SUBJ]),
					d[_QPK_RPID] ? ' 中的 ' : '',
					d[_QPK_RPID] ? $('/a').$0('href','/read.php?tid='+d[_QPK_TID]+'&to=1&pid='+d[_QPK_RPID],'className','uitxt3','innerHTML','回复') : '',
					$('/br'),
					$('/div').$0('className','postcontent ubbcode subtxt_color','style','padding:0.5em',
						'innerHTML',ubbcode.bbsCode({
							txt:pp[_P_CNT].substr(0,pp[_P_CNT].length-2)+'…',
							noImg:1,
							fId:0,
							tId:d[_QPK_TID],
							pId:d[_QPK_PID] ? d[_QPK_PID] : 0,
							authorId:pp[_P_AID],
							rvrc:__GP.rvrc,
							isSig:0,
							isLesser:0,
							isNukePost:(pp[_P_TYPE] & 2048) ? 1 : 0
							})+" <a href='javascript:void(0)' class='small_colored_text_btn white xtxt' style='font-weight:normal' title='在弹出窗口中浏览这个帖子' onclick='ubbcode.fastViewPost(event,"+d[_QPK_TID]+","+d[_QPK_PID]+")'>&nbsp;+&nbsp;</a> <a href='/read.php?tid="+d[_QPK_TID]+(d[_QPK_PID]?"&pid="+d[_QPK_PID]+"&to=1":'')+"' class='small_colored_text_btn white xtxt' target='_blank' style='font-weight:normal'>&nbsp;*&nbsp;</a>"
						)
					)
				b._.add($('/tr').$0('className','row'+(1+((i++)&1)), r ))
				}
			}
		b._.add(
			$('/tr').$0(
				$('/td').$0('className','c1','style','padding:0.25em')._.add(
					$('/a').$0('href','javascript:void(0)','className','uitxt3','innerHTML','查看更多1234','onclick',function(){
						var x = this.parentNode.parentNode,y=x.parentNode.parentNode.parentNode
						x.parentNode.removeChild(x)
						commonui.indexBlock.genSubFollow(y,nextStart)
						})
					)
				)
			)
		c._.add(tb)
		return true
		},
	function(){
		c._.add( 'error 2')
		}
	);


},//fe

genPicTitle :function(o){//txt,link,color,shadow
if(!o.shadow)o.shadow = '#000'
if(!o.color)o.color = '#A99877'
if(o.link)
	o.txt = "<a href='"+o.link+"' taeget='_blank' style='color:"+o.color+";text-shadow:"+o.shadow+" 2px 2px'>"+o.txt+"</a>"
else if(o.txt)
	o.txt = "<span style='color:"+o.color+";text-shadow:"+o.shadow+" 2px 2px'>"+o.txt+"</span>"
else
	o.txt = ''
if(o.pic.substr(0,7)!='http://')
	o.pic = __IMG_STYLE+o.pic
return "<div style='height:38px;font-size:18px;font-weight:bold;vertical-align:bottom;text-align:right;padding:5px'>"+o.txt+"</div><img src='about:blank' class='x' onerror=\"this.parentNode.style.backgroundImage='url("+o.pic+")';this.parentNode.style.backgroundRepeat='repeat-x'\"/>"
},//fe

row:0,

genSubBlock:function(o){//content,subWidth,name,dscp,icon,nameWidth
var c='',y,j=0,i=0,sw

y = this.blkwd
for (var k in o.content)
	if(o.content[k])j++
while(y>3 && Math.ceil(j/y)==Math.ceil(j/(y-1)))
	y--
sw = y==4 ? 24.998:(y==3 ? 33.333 : 49.998)

	
if(o.headline){
	for (var k in o.content)
		break
	if(!this.data.hd)this.data.hd= []
	this.data.hd.push(o.headline)
	c += "</div><div class='headline'"+( k?"":" style='margin:0 0 4px 0'")+"><img src='about:blank' style='display:none' onerror='commonui.indexBlock.genHeadline(this.parentNode,"+(this.data.hd.length-1)+")'/></div>"
	i++
	if(!k)
		return c
	c+="<div class='catenew'>"
	}

c+="<div class='contentBlock'>"+(o.name ? "<h3 class='catetitle'>:: "+o.name+" ::</h3>" : '')
for (var k in o.content){
	if(o.content[k]){
		if(i%y==0)
			this.row = this.row==0?1:0
		c+=this.genforum(o.content[k], null, i==0?1:0, y, i%y, this.row, sw)
		i++
		}
	}
c+="<div class='clear'></div></div>"
if(!i)
	return '';

return (o.clp ? '<div class="contentBlock"><div class="c b3" style="width:100%;text-align:center"><div class="a"><div class="b"><a href="javascript:void(0)" onclick="var tmp = this.parentNode.parentNode.parentNode.parentNode;tmp.style.display=\'none\';tmp.nextSibling.style.display=\'\'" class="uitxt3"><span style="font-size:1.15em">显示更多版面</span></a></div></div></div><div class="clear"></div></div><span style="display:none">' : '')+c+(o.clp ? '</span>' :'')



},//fe
/*
genSubBlock :function(o){//content,subWidth,name,dscp,icon,nameWidth

var c='',y,j=0,i=0

	if (!o.subWidth || o.subWidth==33)
		y=3
	else if(o.subWidth==25)
		y=4
	else
		y=2

for (var k in o.content){
	if(o.content[k]){
		if(i%y==0)
			this.row = this.row==0?1:0
		c+=this.genforum(o.content[k], null, i==0?1:0, y, i%y, this.row)
		i++
		}
	}

if(!i)
	return '';


return (o.name ? "<h3 class='catetitle'>:: "+o.name+" ::</h3>" : '')+"<div class='c b2' style='float:none;width:auto;margin:0;height:auto'><div style='height:auto' class='b sw"+o.subWidth+"'>"+(o.clp ? '<div class="c b3" style="width:100%;text-align:center"><div class="a"><div class="b"><a href="javascript:void(0)" onclick="var tmp = this.parentNode.parentNode.parentNode;tmp.style.display=\'none\';tmp.nextSibling.style.display=\'\'" class="uitxt3"><span style="font-size:1.15em">显示更多版面</span></a></div></div></div><span style="display:none">' : '')+c+(o.clp ? '</span>' :'')+"<div class='clear'></div></div class='b sw'></div class='c b2'>"


},//fe
*/
genHeadline:function(o,h){
var x='', w= o.offsetWidth, y = w>800 ? 4 : (w>500 ? 3 : 2), m= function(){return Math.floor(Math.random()*256).toString(16).replace(/^.$/,function($0){return '0'+$0})},r = location.protocol
w = Math.floor((w+8)/y)-8
h = this.data.hd[h]
h.sort(function(x){return x.txt.substr(0,3)=='[1]' || Math.random()>0.5 ? 1 :-1})
for(var i =0;i<y;i++){
	var n = h[i]
	if(n){
		x+="<td style='width:"+w+"px;vertical-align:middle'><a href='"+n.url+"' target='_blank' style='background:"+
			  (n.img ? "url("+n.img+") 50% 50%" : '#'+m()+m()+m())
			  +"'><span style='display:block;height:100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACdJREFUeNpi+P//PwMTAxSwMMEIVjjBBifYUVkclBLsWAyF2AsQYAD75QP1L3TI8AAAAABJRU5ErkJggg==) bottom repeat-x'>"+(n.txt.substr(0,3)=='[1]' ? n.txt.substr(3) : n.txt)+"</span></a></td><td></td>"
		}
	}
o.innerHTML = "<table style='width:100%;height:100%;' cellspacing='0' cellpadding='0'><tr>"+x.substr(0,x.length-9)+"</tr></table>"
},//fe

genforum :function(x,i,first,cpl,col,row, sw){
if(typeof x=='number')
	var x = this.index[x]
if(typeof x[1] == 'object')
	var link = x[2], icon = x[3], k=x[0], name = this.single && x[1][2]?x[1][2]:x[1][0], info = this.single && x[1][3]?x[1][3]:x[1][1], invert = x[4],stid
else if(x.name)
	var link = x.link, icon = x.icon, k=x.fid, stid=x.stid, name = this.single && x.nameS ? x.nameS : x.name, info = this.single && x.infoS ? x.infoS : x.info, invert = (x.bit & 1) || (x.time && __NOW-x.time<86400*7)
else
	var link = x[3], icon = x[4], k=x[0], name = this.single && x[5]?x[5]:x[1], info = this.single && x[6]?x[6]:x[2], invert = x[7],stid

var target=''
if(!link)link = commonui.domainSelect(k)+(stid ? "/thread.php?stid="+stid : "/thread.php?fid="+k)
else target = "target='_blank'"
if(!info)info=''
if(this.single && col==3){
	name = commonui.cutstrbylen(name,7,6,'…')
	info = commonui.cutstrbylen(info,10,9,'…')
	}
return "<div class='"+this.bg[cpl+''+row+''+col]+' c b'+cpl+''+row+''+col+(invert?' invert':'')+(first?' first':'')+"' style='"+(sw?"width:"+sw+'%;':'')+"background-image:url("+this.getIcon(k,icon,invert,stid)+")'><div class='a'><div class='b'><a href='"+link+"' "+target+" class='"+(this.single?'uitxt3':'uitxt1')+"'>"+name+"</a><br/><p>"+info+" </p></div class='b'></div class='a'></div class='c'>"
},//fe

bg:{
'200':'b3 mol',
'201':'b4 mor',
'210':'b4 mol',
'211':'b3 mor',

'300':'b3 mol',
'301':'b4',
'302':'b3 mor',
'310':'b4 mol',
'311':'b3',
'312':'b4 mor',

'400':'b3 mol',
'401':'b4',
'402':'b3',
'403':'b4 mor',
'410':'b4 mol',
'411':'b3',
'412':'b4',
'413':'b3 mor'
},

change:function(d){
var o=d.previousSibling.previousSibling, w = o.offsetWidth, p = o.parentNode
p._saveChange = [ p.removeChild(o.nextSibling), p.removeChild(o), p.removeChild(d)]
_$(p)._.add(
	_$('/textarea').$0('style', 'height:2.4em;padding:1px;line-height:1.1em;width:90%', 'value', o.innerHTML+"\n"+d.innerHTML, 'onblur', function(){commonui.indexBlock.saveChange(this)})
	)
},//fe

saveChange:function(o){
var p = o.parentNode, n = o.value.match(/.+/g)
if(n&&n[0]){
	p._saveChange[1].innerHTML = n[0]
	p._saveChange[2].innerHTML = n[1]
	}
p.innerHTML = ""
p.appendChild(p._saveChange[1])
p.appendChild(p._saveChange[0])
p.appendChild(p._saveChange[2])
console.log( p._saveChange)
},//fe


getIcon:function (fid,icon,invert,stid){
if(icon){
	if(parseInt(icon,10))
		fid=icon
	else
		return icon
	}
fid = commonui.forumIcon(fid,stid)
if(invert)
	fid = fid+'.invert.png'
return fid
}//fe

}//ce


/**
 * 获取或者设置单一域名上的localStorage
 * @param {type} k key
 * @param {type} v v为函数时获取key的值并做作为v的参数执行 ， 为字符串时将key设置为v
 * @param {type} t 设置时使用的超时时间
 * @returns
 */
commonui.hostStg = function(k,v,t){
if(!this.hostStg.i){
	this.hostStg.i = _$('/iframe').$0('style','display:none','src', location.protocol+'//bbs.ngacn.cc/crossdomain.html','onload',function(){commonui.hostStg(k,v,t)})
	return document.body.insertBefore(this.hostStg.i,document.body.firstChild)
	}
if(typeof v=='function'){
	var n = 'hostGetStg'+Math.floor(Math.random()*100000)
	window[n] = function(a){
		v(a)
		window[n]=null
		delete window[n]
		}
	this.hostStg.i.contentWindow.postMessage('getStorage '+n+' '+k, location.protocol+'//bbs.ngacn.cc')
	//this.hostStg.i.src = location.protocol+'//bbs.ngacn.cc/crossdomain.html?call=getStorage&arg='+k+'&callback='+n
	}
else{
	this.hostStg.i.contentWindow.postMessage('setStorage null '+k+' '+t+' '+v, location.protocol+'//bbs.ngacn.cc')
	//this.hostStg.i.src = location.protocol+'//bbs.ngacn.cc/crossdomain.html?call=setStorage&arg='+k+' '+t+' '+v
	}
}//fe
/*
if(false){
commonui.genHisLink = function(h,f){
var x = _$('/span')._.cls('his_select_c'), self= this

this.hostStg('userCache_'+(window.__CURRENT_UID ? __CURRENT_UID : 0)+'_ForumViewHis', function(h){
	if(!h)
		return null
	h = __COOKIE.json_decode(h)
	if(!h)
		return null
	var $ = _$, t1='点击解除锁定', t2='锁定这个链接 (可添加到首页快速导航中)', sw = function(o,y){
		var x = (o.title == t1)
		self.lockViewHis(y[0],(x ? 0 : 1),y[5])
		o.title = x ? t2 : t1
		o.className = o.className.substr(0,17)+(x ? ' starleft' : ' starright')
		}
	for (var k in h){
		var y = h[k]
		x._.add(
			$('/span')._.add(
				$('/a').$0(
					//'name',y[0]+','+(y[5]?y[5]:''),
					'href','javascript:void(0)',
					'onclick',function(){sw(this,this.parentNode._.gV('data'))},
					'title',(y[2] ? t1:t2),
					'className','inlineBlock star '+(y[2] ? 'starright':'starleft')
					),
				$('/a').$0(
					'href',self.domainSelect(y[0])+'/thread.php?fid='+y[0],
					'innerHTML',y[1],
					f?'onclick':null,
					f? function(e){var z = this.parentNode._.gV('data');z['a']=z[5];delete z[5];var w= f(e,z);z[5]=z['a'];return w} : null
					),
				y[5] ? $('/br') : null,
				y[5] ? $('/a').$0(
					'className','teal sub',
					'href',self.domainSelect(y[0])+'/thread.php?stid='+y[5],
					'innerHTML',y[6],
					f?'onclick':null,
					f? function(e){f(e,this.parentNode._.gV('data'))} : null
					) : null
				)._.sV('data',y),
			$('/br')
			)
		}
	})

return x
}//fe

//锁定历史链接=================
commonui.lockViewHis = function (fid,lock,stid){
this.hostStg('userCache_'+(window.__CURRENT_UID ? __CURRENT_UID : 0)+'_ForumViewHis', function(h){
	h = h ? __COOKIE.json_decode(h) : {}
	var x=null
	for (var i in h){
		x=h[i]
		if (x && x[0]==fid && ( (stid || x[5]) ? x[5]==stid : true )){
			if(typeof lock=='undefined')
				lock=x[2] ? 0 : 1

			if (lock){
				x[2]=1
				delete x[3]
				delete x[4]
				}
			else{
				delete x[2]
				}
			commonui.hostStg('userCache_'+(window.__CURRENT_UID ? __CURRENT_UID : 0)+'_ForumViewHis',__COOKIE.json_encode(h),3600*24*30)
			return lock
			}
		}
	})
}//fe

commonui.addForumViewHis = function(n,id,stidN,stid,p)
{
this.hostStg('userCache_'+(window.__CURRENT_UID ? __CURRENT_UID : 0)+'_ForumViewHis', function(h){

	h = h ? __COOKIE.json_decode(h) : {}

	var p = p|0
	if(!h || typeof(h[0])!='object'){
		h={0:{0:id,1:n}}
		if(stid){
			h[0][5] = stid
			h[0][6] = commonui.cutstrbylen(stidN,11,10,'...')
			}
		if(p)h[0][7] = p
		commonui.hostStg('userCache_'+(window.__CURRENT_UID ? __CURRENT_UID : 0)+'_ForumViewHis',__COOKIE.json_encode(h),3600*24*30)
		return
		}

	var l=null,x=null,limit=22,d,lock,dis,lc=false
	for (var i=0;i<limit;i++){
		if(!h[i]){
			l = i//l is last space
			break
			}
		if(!h[i][2])//l is last unlock
			l = i
		if(id==h[i][0] && 
			( (stid || h[i][5]) ? h[i][5]==stid : true )
				){//if fid hit
			if(lc===false){
				lc=0
				for(var k in h){
					if(h[k][2])
						lc++
					}
				}

			if(lc<8){//少于8个检查自动锁定
				//add hit count
				d=new Date
				d = Math.floor( (d.valueOf()/1000-d.getTimezoneOffset()*60)/86400 ) //本地时间的1970 1 1到当前的天数
				dis = d-h[i][3]
				if(dis<0)//old
					h[i][4] = 0
				else if(dis<1)//当天每次+1
					h[i][4]++
				else if(dis>=1 && dis<2)//隔天+10
					h[i][4]+=10
				else//隔两天重置到10
					h[i][4]=10

				h[i][3]=d

				if(h[i][4]>40)
					lock = true

				}

			//l=i
			x=h[i]
			if(h[i][1]!=n)//if forum rename
				h[i][1] = n
			if(stid && h[i][6]!=stidN)//if set rename
				h[i][6] = stidN
			if(p)h[0][7] = p
			break	
			}
		}

	if(x && x[2])//if hit a lock
		return true


	if(l!==null){//l is the last nolock or last space
		for (var i=l;i>0;i--)
			h[i]=h[i-1]
		h[0]=x ? x : {0:id,1:n,3:d,4:1}
		if(stid){
			h[0][5] = stid
			h[0][6] = this.cutstrbylen(stidN,11,10,'...')
			}
		if(p)h[0][7] = p
		commonui.hostStg('userCache_'+(window.__CURRENT_UID ? __CURRENT_UID : 0)+'_ForumViewHis',__COOKIE.json_encode(h),3600*24*30)
		if(lock)
			this.lockViewHis(id,true)
		return x ? true : false
		}
	})
}//fe

}//if
*/
//============================
//特定domain补=================
;(function(){
//if(!window.__DEBUG)return;
var x = location.hostname, p = location.protocol+'//', l = __LASTDOMAIN, uid = window.__CURRENT_UID?__CURRENT_UID:0

if(x=='bbs.bigccq.cn'){
	commonui.mainMenuItems[7].innerHTML=''
	commonui.customBackgroundLogo =''
	commonui.advNav.rootName = 'CCQ'
	}
else{
	commonui.customBackgroundLogo = __IMG_STYLE+'/logoshadow6.png'
	commonui.advNav.rootName = 'NGA'
	}

commonui.domainIdToHost=function(id){
switch(id){
	case '1':
		return 'bbs.ngacn.cc';
		break;
	case '2':
		return 'nga.178.com';
		break;
	case '4':
		return 'bbs.bigccq.cn';
		break;
	case '3':
	default:
		return 'bbs.nga.cn';
	}
}//fe

var y= p+commonui.domainIdToHost(__LASTDOMAIN.charAt(3))

commonui.domainSelect=function(fid){
	return ''
if(fid==-7){
	if(x!='bbs.bigccq.cn')
		return p+'bbs.bigccq.cn'
	}
else if(fid){
	if(x=='bbs.bigccq.cn')
		return y
	}
return ''}//fe
/*
commonui.storageSync = function(){
if(!l || l.charAt(0)==l.charAt(1) || !window.domStorageFuncs)return
var y = this.domainIdToHost(l.charAt(1)),
i = _$('/iframe').$0('style','display:none','src',p+y+'/crossdomain.html?call=getStorage&arg=userCache_'+uid+'_ForumViewHis&callback=storageSyncFVHCallback')
document.body.insertBefore(i,document.body.firstChild)
}//fe

window.storageSyncFVHCallback = function(a){
try{
	a = __COOKIE.json_decode(a)
	}catch(err){return}
var h = commonui.userCache.get('ForumViewHis'),i=0,j=0
for(var k in h){
	i++
	if(h[k][2])
		j++
	}
for(var k in a){
	i--
	if(a[k][2])
		j--
	}
if(j<0 || (j==0 && i<0)){
	commonui.userCache.set('ForumViewHis',a,3600*24*30)
	}
}//fe
*/
})();

