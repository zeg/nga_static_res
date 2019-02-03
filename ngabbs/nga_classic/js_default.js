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
var l=location
if(l.host=='bbs.ngacn.cc')
	l.replace(l.protocol+'//'+'bbs.nga.cn'+l.pathname+l.search+l.hash)

if(!ngaAds || !ngaAds.bbs_ads12 || (window.__GP && window.__GP.greater && !window.__GP['super'] ) || __SETTING.uA[6]==2)
	return

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
/*
(function(){
var x=0,j=false,y=''
for(var	i=0;i<10000;i++){
if(j===false){j=0
	continue}
if(j>0){x++
	j=0-x*x*48
	y+=i+','}
j++}
console.log(y)
})()
 */
})()
//fe


//内嵌窗口阅读==================
var iframeReadSetWindowTitle = function(til){document.title=til}



commonui.loadNotiScript=function(f){loader.script(__SCRIPTS.notification,f)}
//commonui.checkIfInIframe =function(){return commonui.checkIfInIframe.check};

//防止滚轮影响父页面============

;(function (){

var e = null,c=commonui,g,h,m,vgg,vg,vc,bs=true

d = function(){
	if(e==0)return
	e=0
	bs.position=bs.overflowY=bs.top =bs.width=g.style.marginTop=document.body.parentNode.style.overflowY=''
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
	if(bs===true)
		 bs= document.body.style
	bs.position = 'fixed'
	bs.overflowY = 'scroll'
	bs.top =  '-'+q.yf+'px'
	bs.width='100%'
	document.body.parentNode.style.overflowY='visible'
	//g.style.marginTop = '-'+q.yf+'px'
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
return __IMG_BASE+'/proxy/cache_attach/bbs_index_data.js?'+Math.floor(__NOW/7200)
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
				u:'http://tools.ngacn.cc/iframe/-452227/VGCDmgCalc/index.html',
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
var w = window,noV = (w.__UA && w.__UA[0]==1 && w.__UA[1]<=6) || __SETTING.currentClientWidth<1400, h = w.__IMGPATH +'/head',r = 0
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
		return [1,h+'/20161110.jpg',0,190]
		
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
		return [1,h+'/20140115-46468.jpg',0,190]
	case -6194253:
		return [1,h+'/20140115-6194253.jpg',0,190]
	case -152678:
	case 545:
	case 479:
	case 594:
	case 418:
		return [1,h+'/20181109.jpg',0,190]
	case -985658:
		return [1,h+'/-985658.jpg',0,190]
	case 431:
		return [1,h+'/20180627.jpg',0,190]
	case 321:
		return [1,h+'/20170412.jpg',0,190]
	case 452:
		return [1,h+'/20140617.jpg',0,190]
	case 422:
		return [1,h+'/20181121.jpg',0,190]
	case -51095:
		return [1,h+'/20140915a.png',0,190]
	case -7202235:
		return [1,h+'/20180310.jpg',0,190]
	case 426:
		return [1,h+'/2015030604.jpg',0,190]
	case -362960:
		return [1,h+'/20180515.jpg',0,190]
	case -7861121:
		return [1,h+'/20180616.jpg',0,190]
	case 482:
		return [1,h+'/20170414.jpg',0,190]
	case 414:
		return Math.random()>0.5 ? [1,h+'/20161123.jpg',0,190]	: [1,h+'/20181025.jpg',0,280,null,4]
	case 427:
	case 489:
		return [1,h+'/20151231.jpg',0,190]
	case 124:
		return [1,h+'/20160202.jpg',0,190]
	case 441:
		return [1,h+'/20151112.jpg',0,190,h+'/wows_e3.mp4',Math.random()>0.99?0:1,'054e57']
	case 497:
		return [1,h+'/20160314.jpg',0,190]
	case 459:
		return [1,h+'/'+(Math.random()>0.5?'20180725':'20181103d')+'.jpg',0,190]
	case 492:
		return [1,h+'/20160418.jpg',0,190]
	case -149110:
		return [1,h+'/20160519.jpg',0,190]
	case 555:
		return [1,h+'/20170406.jpg',0,190,h+'/20180202.mp4',Math.random()>0.99?0:1,'474747']
	//case -447601:
		//return [1,h+'/20180212.jpg',0,190,h+'/20180213.mp4',Math.random()>0.99?0:1,'474747']
	case 516:
		return [1,h+'/20170419.jpg',0,190]
	case -15219445:
		return [1,h+'/20170609.jpg',0,190]
	case 568:
		return [1,h+'/20170804.jpg',0,190]
	case 564:
		return [1,h+'/20180328.jpg',0,190]
	case 563:
		return [1,h+'/20171205.jpg',0,190]
	case 560:
		var r = Math.random()
		return [1,h+'/'+(r>0.5?'20180205':'20180206')+'.jpg',0,190,h+'/20180919.mp4',Math.random()>0.99?0:1,'474747']
	case 549:
		var r = Math.random()
		return [1,h+'/'+(r>0.5?'20180424':'20180425')+'.jpg',0,190]
	case 540:
		return [1,h+'/20171013.jpg',0,190]
	case 587:
		return [1,h+'/20180803.jpg',0,190]
	case -47218:
		return [1,h+'/20180209.jpg',0,190]
	case -4567100:
		return [1,h+'/20180410.jpg',0,190]
	//case -7:
	case -81981:
		return [1,h+'/20180615.jpg',0,190]
	case 617:
		return [1,h+'/20180724.jpg',0,190]
	case 631:
	case 632:
		var r = Math.random()
		return [1,h+'/'+(r>0.25?(r>0.5?(r>0.75?'20181103':'20181103a'):'20181103b'):'20181103c')+'.jpg',0,190]
	case 603:
		return [1,h+'/20180906.jpg',0,190]
	case 538:
		var r = Math.random()
		return [1,h+'/'+(r>0.166?(r>0.333?(r>0.5?(r>0.666?(r>0.833?'20180910_1':'20180910_2'):'20180910_3'):'20180910_4'):'20180910_5'):'20180910_6')+'.jpg',0,190]
	case -8180483:
		var r = Math.random()
		return [1,h+'/'+(r>0.5?'20180526':'201805261')+'.jpg',0,190,h+'/20180526.mp4',Math.random()>0.99?0:1,'0a1323']
	//default:
	//	return [1,h+'/20170725.jpg',0,190]
	}
//if(typeof bit=='number' && fid && (bit & 512))
	//return [1,w.__IMG_BASE +'/proxy/cache_attach/_f/or/_forum_bg'+fid,0,190]

return [1,w.__IMGPATH+'/head/20160831_'+(Math.ceil(Math.random()*20))+'.jpg',0,190]
}//fe


ngaAds.bbs_ads9_gen_old = ngaAds.bbs_ads9_gen ? ngaAds.bbs_ads9_gen : function(){}
ngaAds.bbs_ads9_gen = function (){
if((__SETTING.bit & 4) || !window.__CURRENT_FID || window.__CURRENT_TID)
	return;
var x, p =location.protocol
switch(__CURRENT_FID){
	case 7:
		x = p+'//ccq.178.com/iframe/index.html?fid=7'
		break;
	case -152678:
		x = p+'//ccq.178.com/iframe/-152678/index.html'
		break;
	case 321:
		x = p+'//ccq.178.com/iframe/index.html?fid=321'
		break;
	case -362960:
		x = p+'//ccq.178.com/201411/t_209179391466.html'
		break;
	case 422:
		x = p+'//ccq.178.com/201411/t_209252535303.html'
		break;
	case 431:
		x = p+'//ccq.178.com/201412/t_212811964561.html'
		break;
	case 318:
		x = {0:p+'//ccq.178.com/iframe/index.html?fid=318',1:190}
		break;
	case 469:
		x = {0:p+'//game.stargame.com/play/startgame?id=144',1:741}
		break;
	case 488:
		x = {0:p+'//s1.czdtx.178.com/nga_game.php?game=czdtx',1:950}
		break;
	case 474:
		x = {0:p+'//s1.xjwy.178.com/nga_game.php?game=xjwy',1:750}
		break;
	case 484:
		x = {0:p+'//game.stargame.com/play/startgame?id=87',1:750}
		break;
	case 487:
		x = {0:p+'//s1.djmy.178.com/nga_game.php?game=djmy',1:760}
		break;

	case 452:
		x = p+'//ccq.178.com/201507/t_230506050628.html'
		break;
	case 459:
		x = p+'//ccq.178.com/iframe/459/index.html'
		break;
	case -7861121:
		x = p+'//ccq.178.com/iframe/-7861121/index.html'
		break;
	case 492:
		x = p+'//ccq.178.com/iframe/index.html?fid=492'
		break;
	case 538:
		x = p+'//ccq.178.com/iframe/index.html?fid=538'
		break;
	case 414:
		x = p+'//ccq.178.com/201711/t_304208553480.html'
		break;
	case -81981:
		x = p+'//ccq.178.com/iframe/index.html?fid=-81981'
		break;
	case 503:
		x = {0:p+'//s1.zqsd.178.com/nga_game.php?game=zqsd',1:750}
		break;
	case 537:
		x = {0:p+'//game.stargame.com/play/startgame?id=80',1:750}
		break;
	case 543:
		x = {0:p+'//wgapi.178.com/nga_game.php?game=dzz',1:750}
		break;
	case 493:
		x = {0:p+'//s1.zszx.178.com/nga_game.php?game=zszx&id=1',1:750}
		break
	case 546:
		x = {0:p+'//wgapi.178.com/nga_game.php?game=gty',1:750}
		break
	case 516:
		x = p+'//ccq.178.com/iframe/index.html?fid=516'
		break;
	case 563:
		x = p+'//ccq.178.com/iframe/index.html?fid=563'
		break;
	case 482:
		x = p+'//ccq.178.com/iframe/index.html?fid=482'
		break;
	case 568:
		x = p+'//tools.178.com/iframe/index.php?fid=568'
		break;
	case 540:
		x = p+'//tools.178.com/iframe/index.php?fid=540'
		break;
	case -149110:
		x = '<span style="text-align:center"><table class=" stdbtn" style="margin-left:auto;margin-right:auto"><tbody><tr><td><a href="javascript:void(0)" class="b teal" onclick="ngaAds.open_69124(event,\''+p+'//js.ntwikis.com/?nologin=1\',600)"><nobr><span style="font-size:1.5em">战舰少女资料库</span></nobr></a></td></tr></tbody></table></span>'
	}
if(x){
	var h=190
	if(x.constructor == Object)
		h = x[1],x = x[0]
	var y = $('toptopics').nextSibling
	while(y.nodeType!=1)
		y = y.nextSibling
	y.innerHTML += "<div id='bbs_ads9_add' class='catenew'>"+
		(x.substr(0,4) == 'http' ? 
		"<ifra"+"me src='"+x+"' style='margin:0px;overflow:hidden;width:100%;height:"+h+"px;border:none' scrolling='no' frameborder='0' allowTransparency='true'></ifr"+"ame>":
		x)+
		"</div>"
	}
this.bbs_ads9_gen_old()
}//fe





//获取附件地址==================
;(function(){
var HTTPS = location.protocol=='https:'?1:0

if(__ATTACH_BASE == 'http://test.attach.ngacn.cc'){
	_P_ATTACH_BASE_VIEW = 'http://test.attach.ngacn.cc/attachments'
	__AVATAR_BASE_VIEW = _P_AVATAR_BASE_VIEW = 'http://test.attach.ngacn.cc/avatars'
	}
else{
	_P_ATTACH_BASE_VIEW = HTTPS ? 'https://'+__ATTACH_BASE_VIEW_SEC : 'http://'+__ATTACH_BASE_VIEW
	__AVATAR_BASE_VIEW = _P_AVATAR_BASE_VIEW = _P_ATTACH_BASE_VIEW+'/avatars/2002'
	_P_ATTACH_BASE_VIEW = _P_ATTACH_BASE_VIEW+'/attachments'
	}


commonui.getAttachBase=function(u){//相对地址
return _P_ATTACH_BASE_VIEW
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

commonui.ifSelfDomain==function(d){
if(d=='bbs.ngacn.cc' || d=='nga.178.com' || d=='nga.donews.com' || d=='bbs.nga.cn' || d=='bbs.bigccq.cn' || d=='ngabbs.com')
	return 1
}
/*
 *自动替换帖子中[img]图片的地址
 */
commonui.correctAttachUrl = function(u){
if(u.charAt(0)=='.')
	return _P_ATTACH_BASE_VIEW+u.substr(1)
u= u.replace(/^http(s)?:\/\/img7?\.(?:nga\.cn|ngacn\.cc|nga\.178\.com|nga\.donews\.com|ngabbs\.com)\//,function($0,$1){return HTTPS||$1 ? 'https://'+__ATTACH_BASE_VIEW_SEC+'/' : 'http://'+__ATTACH_BASE_VIEW+'/'})
return u
//if(__ATTACH_BASE == 'http://img6.nga.178.com:8080')
//	return u.replace(/^http:\/\/(img\d?)\.ngacn\.cc\//,'http://$1.nga.178.com/')
//else
//	return u.replace(/^http:\/\/(img\d?)\.nga\.178\.com\//,'http://$1.ngacn.cc/')
}//fe

commonui.toRelAthUrl = function(u){
u= u.replace(/^http(s)?:\/\/img7?\.(?:nga\.cn|ngacn\.cc|nga\.178\.com|nga\.donews\.com|ngabbs\.com)\//,'./')
return u
}//fe

commonui.toRelUrl = function(u){
u= u.replace(/^http(s)?:\/\/(?:bbs\.nga\.cn|bbs\.ngacn\.cc|nga\.178\.com|nga\.donews\.com|ngabbs\.com)\//,'/')
return u
}//fe

commonui.checkSigImg = function(u){
if(commonui.ifUrlAttach(u+'') )
	return 1
if((u+'').match(/^https?:\/\/(card\.psnprofiles\.com|card\.exophase\.com|steamsignature\.com\/card)/))
	return 1
}//



_ALL_IMG_HOST_REG = /^https?:\/\/img\d*\.(?:ngacn\.cc|nga\.cn|nga\.178\.com|nga\.donews\.com|nga\.bnbsky\.com)\//











var d1 = function(){
	return (window.__CURRENT_FID==570) ? 1 : -2
	}
//1未知 2可信
commonui.checkLinkTable = {
'ngacn.cc':{_:2,'bbs.ngacn.cc':3},// _ 指无更多前缀的域名 2为保持原链接 3为替换成当前host
'nga.cn':{_:2,'bbs.nga.cn':3},
'donews.com':{_:2,'nga.donews.com':{_:3,'img.nga.donews.com':2,'img4.nga.donews.com':2}},
'bigccq.cn':{_:4,'bbs.bigccq.cn':4},
'178.com':{_:2,'nga.178.com':{_:3,'img.nga.178.com':2,'img4.nga.178.com':2},'club.178.com':3,'wb.178.com':-2},
'ngabbs.com':{_:3},
'ngacn.com':{_:4,'bbs.ngacn.com':4},
_:1,
'worldofwarcraft.com':2,
'ofcard.com':2,
'uusee.com':2,
'youtube.com':2,
'youku.com':2,
'weplay.cn':2,
'tudou.com':2,
'uencn.com':2,
'sc2.cc':2,
'wowchina.com':2,
'microsoft.com':2,
'dmzj.com':2,
'com.cn':{_:1,'sina.com.cn':2},
'pixiv.net':{_:1,'embed.pixiv.net':2},
'loli.my':{_:1,'static.loli.my':2},//bilibili视频
'hdslb.com':2, //bilibili视频
'plures.net':{_:1,'r.plures.net':2},//v.longzhu.com视频
'bilibili.us':2,
'bilibili.com':2,
'bilibili.tv':2,
'66play.com':2,
'acg.tv':2,
'acfun.com':2,//acfun视频
'acfun.cn':2,
'acfun.tv':2,//acfun视频
'173.com':2,
'aixifan.com':{_:1,'cdn.aixifan.com':2},//acfun视频
'pdim.gs':{_:1,'s3.pdim.gs':2},//熊猫TV
'huomaotv.cn':{_:1,'www.huomaotv.cn':2},//熊猫TV
'letv.com':2,
'qq.com':{_:2,'jq.qq.com':-2},
'766.com':2,
'iqiyi.com':2,
'qiyi.com':2,
'pptv.com':2,
'feixiong.tv':2,
'163.com':2, //网易视频
'126.net':2, //网易视频
'netease.com':{_:1,'cc.netease.com':{_:1,'res.cc.netease.com':2}}, //网易视频
'douyu.tv':2, // 斗鱼
'douyutv.com':2, // 斗鱼
'douyucdn.cn':2,
'douyu.com':2, 
'zhanqi.tv':2, // 
'bogou.tv':2, // 播狗
'steampowered.com':2,

'iyingdi.cn':-2,
'skyline.top':-2,
'iplaymtg.com':-2,
'joyme.com':-2,
'duowan.com':-2,
'woweyes.net':-2,
'laoyuegou.com':-2,
'tuwan.com':-2,
'laimaika.com':-2,

'2zhk.com':d1,
't.cn':d1,
'sina.lt':d1,
'url.cn':d1,
't.co':d1,
'goo.gl':d1,
'hiurl.me':d1,
'dwz.cn':d1,
'985.so':d1,
'980.so':d1,
'9.cn':d1,
'qyub.cn':d1,
'ppt.cc':d1,
'qr.net':d1,
'tinyurl.com':d1,
'bocaidj.com':d1,
'bit.ly':d1,
'xici800.cn':d1,
'jiaoyimao.com':d1,
'suo.im':d1,
'hupu.com':function(u){
	return (window.__CURRENT_FID==-81981 || window.__CURRENT_FID==485 || window.__CURRENT_FID==-7) ? 1 : -2
	},
'taobao.com':function(u){
	if(u.url.match(/coupon\.|taoquan\.|click\.|activity_id/))
		return d1(u)
	else
		return 1
	}
}

commonui.checkIframeTable = {
'wow.178.com/':2,
'challonge.com/':2,
'music.163.com':function(u){
	var m = u.match(/height=(\d+)/i)
	return [u.replace(/(\W)auto=.+?(\W|$)/i,'$1$2'), m[1]>=90?330:298, (m[1]|0)+20]//[url,width,height]
	}
}

})();

//地址是否是附件================
commonui.ifUrlAttach = function(u){
if(u.match(/^https?:\/\/(img\d?\.ngacn\.cc|img\d?\.nga\.cn|ngaimg\.178\.com|img\d?\.nga\.178\.com|img\.nga\.donews\.com|img\.nga\.bnbsky\.com)\//))
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

commonui.aE(window,'DOMContentLoaded',function(){
	commonui.mobanner()
	__SCRIPTS.syncLoad = __SCRIPTS.asyncLoad
	loader.script = function(s,f,c,y){__SCRIPTS.load(s,f,c,0)}
	})
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
	if(t.count_b<4 && __SETTING.uA[2]!=4){
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
		}
var s = {
	close:["214 43.3 596 596","M810 579.3l-238-238 238-238-60-60-238 238-238-238-60 60 238 238-238 238 60 60 238-238 238 238z","close","d7"],
	menu:["86 107.3 852 512","M86 619.3h852v-86H86v86zm0-214h852v-86H86v86zm0-214h852v-84H86v84z","dehaze","2261"],
	help:["86 -255.3 852 852","M642 138.7c24-24 40-58 40-96 0-94-76-170-170-170s-170 76-170 170h84c0-46 40-86 86-86s86 40 86 86c0 24-10 44-26 60l-52 54c-30 32-50 74-50 120v22h84c0-64 20-88 50-120zm-88 330v-84h-84v84h84zm-42-724c236 0 426 190 426 426s-190 426-426 426-426-190-426-426 190-426 426-426z","help","2370"],
	turned_in:["214 -213.3 596 768","M726-213.3c46 0 84 40 84 86v682l-298-128-298 128v-682c0-46 38-86 84-86h428z","turned_in","23f9"],
	label:["128 43.3 810 596","M752 603.3l186-262-186-262c-16-22-42-36-70-36H214c-46 0-86 38-86 84v428c0 46 40 84 86 84h468c28 0 54-14 70-36z","label","23fa"],
	up:["256 0.7 512 316","M316 316.7l-60-60L512 .7l256 256-60 60-196-196z","keyboard_arrow_up","25b2"],
	right:["366 95.3 316 512","M366 155.3l196 196-196 196 60 60 256-256-256-256z","keyboard_arrow_right","25b6"],
	down:["256 -7.3 512 316","M316-7.3l196 196 196-196 60 60-256 256-256-256z","keyboard_arrow_down","25bc"],
	left:["342 107.3 316 512","M658 167.3l-60-60-256 256 256 256 60-60-196-196z","keyboard_arrow_left","25c0"],
	star:["86 -255.3 852 810","M512 394.7l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z","star","2605"],
	gear:["96.5 -255.3 831 852","M512 320.7c82 0 150-68 150-150s-68-150-150-150-150 68-150 150 68 150 150 150zm318-108l90 70c8 6 10 18 4 28l-86 148c-6 10-16 12-26 8l-106-42c-22 16-46 32-72 42l-16 112c-2 10-10 18-20 18H426c-10 0-18-8-20-18l-16-112c-26-10-50-24-72-42l-106 42c-10 4-20 2-26-8l-86-148c-6-10-4-22 4-28l90-70c-2-14-2-28-2-42s0-28 2-42l-90-70c-8-6-10-18-4-28l86-148c6-10 16-12 26-8l106 42c22-16 46-32 72-42l16-112c2-10 10-18 20-18h172c10 0 18 8 20 18l16 112c26 10 50 24 72 42l106-42c10-4 20-2 26 8l86 148c6 10 4 22-4 28l-90 70c2 14 2 28 2 42s0 28-2 42z","settings","2699"],
	link:["12.2 -308 999.5 1000","M440.2 315.8a52.2 52.2 0 0 1-36.8-15.2 244.4 244.4 0 0 1 0-345.1l192-192c46.1-46.1 107.4-71.5 172.5-71.5s126.4 25.4 172.5 71.5a244.4 244.4 0 0 1 0 345.1l-87.8 87.8a52 52 0 1 1-73.5-73.5l87.8-87.8a140.1 140.1 0 0 0-99-239c-37.4 0-72.6 14.6-99 41l-192 192a140.1 140.1 0 0 0 0 198 52 52 0 0 1-36.8 88.7zM256 692a242.1 242.1 0 0 1-172.5-71.5 244.4 244.4 0 0 1 0-345.1l87.8-87.8a52 52 0 1 1 73.5 73.5L157 348.9a140.1 140.1 0 0 0 99 239c37.4 0 72.6-14.6 99-41l192-192a140.1 140.1 0 0 0 0-198 52 52 0 1 1 73.5-73.5 244.4 244.4 0 0 1 0 345.1l-192 192A242.4 242.4 0 0 1 256 692z","link","271a"],
	good:["42 -299.3 940 854","M982 84.7l-2 4h2v82c0 12-2 22-6 32l-130 300c-12 30-42 52-78 52H384c-46 0-86-40-86-86v-426c0-24 10-44 26-60l280-282 46 46c12 12 18 26 18 44v14L626 .7h270c46 0 86 38 86 84zm-940 470v-512h172v512H42z","thumb_up","2bc5"],
	bad:["42 -213.3 940 854","M810-213.3h172v512H810v-512zm-170 0c46 0 86 40 86 86v426c0 24-10 44-26 60l-280 282-46-46c-12-12-18-26-18-44v-14l42-196H128c-46 0-86-38-86-84l2-4h-2v-82c0-12 2-22 6-32l130-300c12-30 42-52 78-52h384z","thumb_down","2bc6"],
	img:["86 -255.3 852 852","M170 212.7v300h300v84H170c-46 0-84-38-84-84v-300h84zm684 300v-300h84v300c0 46-38 84-84 84H554v-84h300zm0-768c46 0 84 38 84 84v300h-84v-300H554v-84h300zm-128 276c0 36-28 64-64 64s-64-28-64-64 28-64 64-64 64 28 64 64zm-300 192l128 158 86-114 128 170H256zm-256-384v300H86v-300c0-46 38-84 84-84h300v84H170z","wallpaper","e1bc"],
	tbody:["128 -213.3 768 768","M810 128.7v-256H554v256h256zm0 340v-256H554v256h256zm-340-340v-256H214v256h256zm0 340v-256H214v256h256zm-342-682h768v768H128v-768z","border_all","e228"],
	smile:["86 -255.3 852 852","M512 340.7c64 0 118-34 148-84h70c-34 88-118 148-218 148s-184-60-218-148h70c30 50 84 84 148 84zm0 172c188 0 342-154 342-342s-154-342-342-342-342 154-342 342 154 342 342 342zm0-768c236 0 426 190 426 426s-190 426-426 426-426-190-426-426 190-426 426-426zm-214 320c0-36 28-64 64-64s64 28 64 64-28 64-64 64-64-28-64-64zm300 0c0-36 28-64 64-64s64 28 64 64-28 64-64 64-64-28-64-64z","sentiment_satisfied","e813"]
	}		
/*
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
//var sp=opt&1?'':'\u00A0', v = '<svg xmlns="http://www.w3.org/2000/svg" viewbox="'+s[k][0]+'" style="height:1em;line-height:1em;vertical-align:-0.1em;fill:'+(c?c:'#ffffff')+';"><path d="'+s[k][1]+'"></path></svg>'
//if(opt&2)	return '<span>'+sp+v+sp+'</span>'
//return _$('/span','innerHTML',sp+v+sp)


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
	hisDefLeft:[7,5,6,8,151,10],
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
	7:{disableDefault:1,arg:['style','padding:0.2em 0.5em','href','/',
			'innerHTML',typeof SVGRect === 'function' ? '<svg xmlns="http://www.w3.org/2000/svg" style="height:50px;fill:'+__COLOR.border0+'" viewBox="129.22 30.208 1120.58 411.795"><path fill-rule="evenodd" d="M1192.47 335.038L1165.6 219.78l-8.62-2.889 7.7 118.147h-59V82.75l5.75-5.853 46.75-5.5L1188.6 189.6l8.78 2.567L1189.93 83l3.33-5.884 56.54-5.449v263.371h-57.33zm-234.661-.538l-10.352-8.734-9.16-57.937.053-11.09 9.291-167.1 9.631-9.9 92.158-13.713 28.49 34.508 5.5 40.053v30.233h-53.2l-11.51-55.48-17.86 3.149-5.1 149.449 5.1 23.035 22.05-3.722 6.73-52.221 53.79.011v73l-19.46 26.438zM898.5 288.715h34.044V335H898.5v-46.285zm-75.236-.39h-25.438l-4.276 46.713h-62.614l30.132-248.484 10.408-9.636 81.144-9.271 36.232 267.391h-61.771zm-10.229-158.973L807.128 133 796.92 242.254h24.48zM669.371 316.417l-16.115 18.059-64.447.019-10.352-8.734-9.16-57.937.053-11.09 9.291-167.1 9.631-9.9 92.156-13.713 28.5 34.508 5.491 40.053v30.238h-53.2l-11.5-55.48-17.861 3.149-5.1 149.449 5.1 23.035 22.047-3.722 3.07-21.4 3.667-30.821h-19.488v-39.489h73.261v139.5H675.15zm-122.9 18.621h-57.337L462.271 219.78l-8.629-2.889 7.7 118.147h-58.993V82.75l5.751-5.85 46.75-5.5 30.414 118.2 8.787 2.567L486.593 83l3.336-5.884 62.208-7.468L546.47 101v234.038zm-142.462 30.815h-13.692v6.678h-11.5v-6.678H359.4v6.678h-11.3v-6.678h-14.093v-8.071H348.1v-6.795h11.3v6.795h19.408v-6.795h11.5v6.795H404v8.071zm-234.822-79.74l-39.967-2.864V30.208h225.066l-3.241 45.227 27.772 1.99v257.637H165.681zm29.651-207.861l-11.5 3.113-10.947 19.082 17.7 12.294 18.836-5.649.721-2.125-2.778-23.806 3.658-26.774zm44.005 3.472l-10.358 17.594 5.886 19.985 8.53-4.207 8.773-3.079 4.846-23.094L264.7 51.8zm41.569 6.755L269.1 112.263l4.08 15.258 18.785-4.063 3.972-16.213 2.875-14.007 3.659-26.774zm32.2 19.806l-15.772 23.489 4.1 11.71 15.617-4.165 9.09-21.65 5.375-27.933zm37.24 34.067l-.822-9.27 1.881-14.973-13.04 19.749-13.62 3.757 5.87 16.816 14.175.083zM261.48 302.875l27.273 10.638 19.234-35.658-12.241-31.208-50.99-7.719-2.656 34.283zm-58.357-137.367l31.5 1.976 68.321 52.41 12.569 3.58 20.868-11.174-2.187-24.364-76.618-50.41-71.294-8.139-34.841 33.519-3.041 27.824s11.908 24.2 20.466 36.516c11.464.276 40.155 1.029 40.155 1.029l-11.2-54.534zm-31.088 190.144l2.528 18.455-6.16-.328L166.2 356.4zm17.6 18.455l2.92-18.455 4.43.743-3.28 17.712h-4.07zm-22.264 16.526v-8.926h9.51v-30.674h9.846v30.654h8.295v8.925h-8.445l11.585 24.528-4.428 6.715-2.972-7.967-3.631-8.1-.383 36.212h-9.883v-.02l.219-36.193-4.218 11.253-4.146 10.139-5.72-8.493 13.676-28.053h-9.306zm48.164-12.764h-12.589v-5.7h12.591v-8.023h-13.413v-6.463h13.413v-6.653h11.284v6.653h13.416v6.463h-13.416v8.023H239.3v5.7h-12.479v8.242h15.246v7.3h-40.86v-7.3h14.33v-8.242zm23.765 64.093h-9.744l1.019-2.1V429.1h-18.904v12.865h-8.725v-41.524H239.3v41.521zm-20.7-34.279h-6.931v14.663h6.931v-14.663zm11.975 0h-6.725v14.663h6.725v-14.663zm-1.028 34.279h.009l-.009.018v-.018zm112.912-58.531H362.9v-8.48h12.4v8.48h20.436v20.362h7.352v9.35h-22.676l3.2 3.638a83.019 83.019 0 0 0 19.446 16.241l-7.2 8.964a102.793 102.793 0 0 1-24.7-23.443l-1.581-2.09-1.856 1.741c-2.756 3.544-12.461 15.428-25.067 23.792l-7.316-9.022a88.52 88.52 0 0 0 19.352-16.183l3.27-3.638h-23.053v-9.35h7.554v-20.362zm32.841 20.362h10.75V391.1H375.3v12.7zm-23.158 0H362.9V391.1h-10.756v12.7zm154.719-9.99h-6.031v-11.515h6.031v-18.44h-6.776v-11.717H525.5v11.739h-6.224v18.44h5.262v11.512h-5.262v22l7.854-.556v11.944l-28.869 2.058V417.3l8.6-.575V393.8zM572.519 351v11.164h-37.257V351h37.257zm5.048 36.737h-7.426V430.5h8.23l.924-.761v11.245h-21v-53.267h-8.329l-3.634 54.254-11.782-.721 3.555-53.514h-6.933V376.8h46.39v10.934zm120.066-36.749h14.28v7.472h28.62v20.007h-10.527V367h-50.464v11.464h-10.529v-20.005h28.62v-7.472zm4.76 56.974l-.342-3.379-28.037 16.129-4.174-6.221 31.019-16.937-1.753-6.97-24.326 13.1-4.193-6.758 23.536-11.792-1.048-4.05h-5.931v-6.761h35.276v6.761h-14.1l1.372 2.993a79.408 79.408 0 0 1 3.427 9.237l.906 2.88 16.319-11.232 5.83 7.641-16.923 11.139L741 428.468l-8.187 7.144-16.665-20.512-.564 5.377a64.2 64.2 0 0 1-6.294 21.526l-13.471-2.8.381-.212.283-.673a76.951 76.951 0 0 0 3.974-11.348l1.271-5.069-26.885 15.975-4.741-6.7 32.413-18.3v-1.228a34.229 34.229 0 0 0-.122-3.687zm158.148-54.115l-5.289 11.553v75.63H844.87L845 387l-4.024 9.42-2.476 5.38-6.816-8.076 20.046-42.668zm6.174 1.359h36.763v56.57h6.136v9.163h-48.135v-9.163h5.236v-56.57zm10.088 56.57h16.479v-7.959H876.8v7.959zm0-13.823h16.479V389.9H876.8v8.056zm0-13.3h16.479V376.7H876.8v7.959zm0-13.609h16.479v-8.056H876.8v8.056zm4.352 59.775l-11.849 11.161-6.705-7.454 12.05-11.065zm29.581 3.727l-6.56 7.434-11.924-11.16 6.394-7.358zm113.7-18.671l-15.67 21.9-7.5-7.324 15.66-21zm6.89-13.681h-28.57v-10.31h5.93v-35.441L1061.64 351l1.16 9.087-42.62 4.439v27.362h11.14v-20.58h13.82v20.58h26.28V402.2h-26.28V442h-16.42l2.61-3.313V402.2zm44.2 28.233l-7.59 7.324-15.58-21.779 7.51-6.434zm98.44-61.071h-3.86v-8.624h13.53v-9.684h11.27v9.684h14.16v8.624h-4.68v17.619h5.72v9.606h-42.18v-9.606h6.04v-17.618zm9.81 17.619h11.02v-17.618h-11.02v17.619zM1207.51 442h-35.63v-35.2h35.63V442zm-10.22-25.3h-14.86v15.694h14.86V416.7zm42.26-26.851l.46.748a46.807 46.807 0 0 1 6.55 23.472c0 10.293-4.02 21.372-12.86 21.372h-7.22v6.459h-10.25V353H1247zm-13.11-26.616v24.79h.02l4.2.413 4.64-25.2h-8.86zm4.01 28.9l-3.99 1.061v30.6h2.94c3.96 0 6.5-4.576 6.5-11.667 0-5.841-2.18-13.876-5.45-20.003z" data-name="Color Fill 5"/></svg>' :'<img src="'+__IMG_STYLE+'/logo11-1.png" style="height:50px"/>']},
	8:{href:'http://game.nga.cn/',innerHTML:'评分'},
	9:{href:'http://g.nga.cn/',innerHTML:'聚聚'},
	10:{href:'http://app.nga.cn/',innerHTML:'移动端'},

	22:{ innerHTML:'用户脚本',on:{event:'click',func:function(e){commonui.loadUserScript(__NUKE.position.dummyEvent(e))} }, check:function(){if(__CURRENT_UID)return true} },

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
//115:{u:0,href:'https://'+location.hostname+'/nuke.php?__lib=login&__act=login_ui', target:'_blank',innerHTML:'登录',disableDefault:1,on:{event:'click',func:function(e){
	//	if(__SETTING.bit&24){
	//		this.target=''
	//		this.href=this.href.replace(/(?:&url=.+)|$/,'&url='+encodeURIComponent(location.href))
	//		}
	//	}}},

	115:{arg:['innerHTML','登录','href','javascript:void(0)','onclick',function(){commonui.accountAction('login')}],disableDefault:1,u:0},
//116:{u:0,href:'http://account.178.com/?p=register', innerHTML:'注册',disableDefault:1},
	//117:{u:1,href:'/nuke.php?func=message', innerHTML:'短消息',disableDefault:1},
	116:{arg:['innerHTML','注册','onclick',function(){commonui.accountAction('register')}],disableDefault:1,u:0},
	118:{u:1,innerHTML:'搜索',on:{event:'click',func:function(e){commonui.uniSearchWindow(e)}},disableDefault:1},

	119:{u:1,disableDefault:1,arg:['title','登出: 若你的帐号在其他终端登录本站, 亦可一并登出' ,'innerHTML','登出',
		'href','javascript:void(0)',
		'onclick',function(e){commonui.accountAction('logout')}]
		},
	//120~140 for custom
	141:{ innerHTML:'界面设置',on:{event:'click', func:function(e){__SETTING.ui()} }},
	142:{ innerHTML:'移动验证器(beta)',on:{event:'click', func:function(e){commonui.extraAuthInput(e)} }},

	144:{u:1,innerHTML:'我的',subKeys:[25,158,146,1,2,3,104,93,107,101,102,154]},
	18:{innerHTML:'设置',subKeys:[97,95,141,22,108,142,109,110,111,112,113,152,153,155,156,157,164]},
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
//149:{u:1,href:'https://account.178.com/?p=renew_pass',innerHTML:'修改密码',disableDefault:1},
	149:{arg:['innerHTML','修改密码','onclick',function(){commonui.accountAction('changepass')}],disableDefault:1,u:1},
//150:{href:'https://account.178.com/?p=reset_pass',innerHTML:'重置密码',disableDefault:1},
	150:{arg:['innerHTML','重置密码','onclick',function(){commonui.accountAction('resetpass')}],disableDefault:1,u:1},
	151:{href:'https://shop482085632.taobao.com',innerHTML:'商城'},
	152:{u:1,check:function(){if(__GP.ubMod)return true},innerHTML:'debug',on:{event:'click',func:function(e){commonui.userDebug()}}},
	153:{u:1,check:function(){if(__GP.ubMod && window.__DEBUG)return true},innerHTML:'update src',on:{event:'click',func:function(e){adminui.updateSrc()}}},
	154:{u:1,check:function(){if(__GP.greater || __GP.rvrc>=200)return true},innerHTML:'随机头衔',on:{event:'click',func:function(e){commonui.randomTitle()}}},
	155:{check:function(){if(window.__DEBUG)return true},innerHTML:'NGA.CN',on:{event:'click',func:function(){location.href=location.href.replace(/:\/\/[^\/]+/,'://bbs.nga.cn')}}},
	156:{check:function(){if(window.__DEBUG)return true},innerHTML:'NGACN.CC',on:{event:'click',func:function(){location.href=location.href.replace(/:\/\/[^\/]+/,'://bbs.ngacn.cc')}}},
	157:{u:1,check:function(){if(__GP['super'])return true},innerHTML:'设置版面图标',on:{event:'click',func:function(e){adminui.fIconGen()}}},
	158:{innerHTML:'账号设置'  ,subKeys:[149,150,159,166]},
	159:{arg:['innerHTML','绑定手机号','onclick',function(){commonui.accountAction('setphone')}],disableDefault:1,u:1},
	160:{href:'http://tv.nga.cn/',innerHTML:'赛事'},
	161:{u:1,check:function(){if(__GP.ubStaff || __GP.lesser)return true},href:'/nuke.php?func=message&asuid=42686479',innerHTML:'公共收件箱(主题推荐)',disableDefault:1,color:'sandybrown'},
	162:{u:1,tagName:'span',disableDefault:1,innerHTML:function(){
		return ['\u00A0',
			_$('/input', 'name', 'search', 'type', 'text', 'style', 'width:8em','placeholder','\u2003\u2003\u2003\u2003\u2003 搜索', '_on',function(){
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
	163:{u:1,check:function(){if(__GP.superlesser && __GP.greater)return true},href:'/nuke.php?func=message&asuid=42766294',innerHTML:'公共收件箱(版务申诉)',disableDefault:1,color:'sandybrown'},
	164:{innerHTML:'提交debug信息',on:{event:'click',func:function(e){
			if(!confirm('是否要提交debug信息'))
				return
			var x=document.getElementsByTagName('head')[0].outerHTML+"\n"+document.body.outerHTML+"\n\n==============",y=document.getElementsByTagName('script')
			for(var i=0;i<y.length;i++){
				if(y[i])
					x+="\n"+y[i].src
				}
			__NUKE.doRequest({
				u:{u:__API._base,
						a:{__lib:"admin_code",__act:"upload_debug_info",data:binl2b64(str2binl(x)),raw:3}
						}
				})
			}}},
	165:{u:1,check:function(){if(__GP.ubMod && window.__DEBUG)return true},innerHTML:'new post',on:{event:'click',func:function(e){adminui.new_post()}}},
	166:{arg:['innerHTML','更换手机号','onclick',function(){commonui.accountAction('changephone')}],disableDefault:1,u:1},
	
	
	
	999:null
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
			var e = __NUKE.doRequestIfErr(d)
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
				$2 = commonui.toRelUrl($2)
			else if($1=='img')
				$2 = commonui.correctAttachUrl($2)
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
							})+" <a href='javascript:void(0)' class='small_colored_text_btn block_txt_c0 xtxt' style='font-weight:normal' title='在弹出窗口中浏览这个帖子' onclick='ubbcode.fastViewPost(event,"+d[_QPK_TID]+","+d[_QPK_PID]+")'>&nbsp;+&nbsp;</a> <a href='/read.php?tid="+d[_QPK_TID]+(d[_QPK_PID]?"&pid="+d[_QPK_PID]+"&to=1":'')+"' class='small_colored_text_btn block_txt_c0 xtxt' target='_blank' style='font-weight:normal'>&nbsp;*&nbsp;</a>"
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
var subclp
for (var k in o.content){
	if(o.content[k]){
		if(i%y==0)
			this.row = this.row==0?1:0
		if(o.content[k].clp){
			if(!subclp){
				subclp=1
				c+=this.genforum(o.content[k], null, i==0?1:0, y, i%y, this.row, sw)+'<span style="display:none">'
				}
			delete o.content[k].clp
			}
		c+=this.genforum(o.content[k], null, i==0?1:0, y, i%y, this.row, sw)
		i++
		}
	}
c+=(subclp?'</span>':'')+"<div class='clear'></div></div>"

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
if(x.clp)
	return "<div class='"+this.bg[cpl+''+row+''+col]+' c b'+cpl+''+row+''+col+(invert?' invert':'')+(first?' first':'')+"' style='"+(sw?"width:"+sw+'%;':'')+"background-image:url("+this.getIcon(0)+")'><div class='a'><div class='b'><a href='javascript:void(0)' onclick='var tmp = this.parentNode.parentNode.parentNode;tmp.style.display=\"none\";tmp.nextSibling.style.display=\"\"' class='uitxt2'>显示更多&gt;&gt;</a><br/><p> </p></div class='b'></div class='a'></div class='c'>"
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

