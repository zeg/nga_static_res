
if(!window.commonui)
	var commonui = {}


//============================
//帖子显示参数储存处理===========
commonui.postArg = {
data:{},
w:window,
def:{},
inited:0,
init:function(){
commonui.blockword.init()
},
//设置帖子参数的默认值 参见proc
setDefault:function(fid,stid,tid,tAid,topicMiscBit1,punUsers,visit,mods,vote,customLevel){//版面id 所在合集的stid 主题id 帖子id 主题作者id tmbit1 贴中禁言的用户 访问数 版主 主题的投票/投注/打分信息
if(!this.inited){
	this.inited=1
	this.init()
	}
if(!customLevel && window.__CUSTOM_LEVEL)
	customLevel = window.__CUSTOM_LEVEL
if(typeof customLevel=='string')
	eval("customLevel="+customLevel)
this.def = {
	fid:fid,
	stid:stid|0,
	tid:tid,
	tAid:tAid|0,
	punUsers:punUsers ? (function(){var y={};(punUsers+'').replace(/\d+/g,function($0){y[$0]=1;return $0});return y})() : null,
	mods:mods ? (function(){//1版主 2副版主 4副版主过期  8副版加标记
		var now = __NOW,x=1,v,y={},z = function($0){
			if($0.substr($0.length-1)=='t'){
				x=2,v=$0.substr(0,$0.length-1)|0
				if((v&4095)&1)
					x|=8
				if(v-now<0)
					x|=4
				}
			else{
				if(x&2){
					if((x&4)==0){
						y[$0] = x
						x = 1
						}
					}
				else
					y[$0] = 1
				} 
			return $0
			}
		mods.replace(/\d+t?/g,z)
		return y
		})() : {},
	tmBit1:topicMiscBit1|0,
	noimg:(__SETTING.bit & 64)? 1:0,
	small:(__SETTING.bit & 8) && true,
	vsmall:(__SETTING.bit & 4) && true,
	visit:visit ? (function(vi){
		if(typeof vi=='string')
			return vi.split(',')
		else
			return [vi[8],vi[24],vi[72]]//lib_read::get_topic_visit		
		})(visit) : null,
	ie8: __UA && __UA[0]==1 && __UA[1]<=8, //under ie8
	recommendC:function(v){
		this.recommendO.innerHTML = (this.recommend+=v)
		},
	__GP:this.w.__GP,
	__CURRENT_UID:this.w.__CURRENT_UID,
	topicVote:(vote&&vote.length>1) ? __NUKE.scDe(vote) : (vote|0),
	customLevel:customLevel
	}
},
clearCache:function(){
this.def={}
for(var k in this.data){
	if(k != 'length' && this.data.hasOwnProperty(k))
		delete this.data[k]
	}
},
arg:[
'i',0,//楼层或数据id

'pC',0,//帖子block
'subjectC',0,//标题
'contentC',0,//内容
'signC',0,//签名
'uInfoC',0,//用户信息
'pInfoC',0,//帖子信息
'postBtnC',0,//帖子操作按钮容器

'fid',2,//版面id 设null
'tid',2,//主题id 设null
'pid',0,//帖子id
'type',1,//帖子类型bit

'tAid',2,//主题作者id 设null
'pAid',0,//帖子作者id
'postTime',0,//发帖时间戳
'recommend',0,//帖子推荐值
'cLength',1,//帖子内容长度

'ip',0,//发帖ip
'orgForum',0,//原版面名
'fromClient',0,//发送自客户端
'orgFid',0,//原版面fid
'stid',2,//所在合集的stid 设null
'atItem',2,//对帖子使用的道具
'opt',2 //额外选项bit  &1限制显示长度,去掉引用,增加原链接   &2跳过渲染部分
],
//设置帖子参数 参数顺序见arg
proc:function(){
var n = function(){}
n.prototype = this.def
var m = new n()

for(var i=0;i<arguments.length;i++){
	if((this.arg[i*2+1]&2) && !arguments[i])continue
	m[this.arg[i*2]] = (this.arg[i*2+1]&1) ? (arguments[i]|0) : arguments[i];
	}

m.comment = ( m.contentC.id.substr(0,11)=='postcomment')?true:false//是否显示为评论
m.opt = m.opt?(m.opt|0):0 //&1限制显示长度,去掉引用,增加原链接
//if(m.comment && (m.type & 1)==0){
//	if(m.uInfoC.parentNode.parentNode.id.substr(0,14)=='hightlight_for'){
//		m.hightPost = 1//是热点回复
//		m.opt|=1
//		}
//	}

if(m.recommend && m.recommend.constructor!=Number){
	i = (m.recommend+'').split(',')//推荐值,支持,反对
	m.score = (i[1]|=0)
	m.score_2 = (i[2]|=0)
	m.recommend = i[1]-i[2]>0 ? i[1]-i[2] : 0
	}
else{
	m.score = m.score_2 = 0
	m.recommend |= 0
	}
m.correctNode = m.i==0?true:false
m.atItem = m.atItem?commonui.atItems._CREATE(m.atItem) : null//此贴所含有的道具(obj) .length .id(i)获取第i个道具的id  .count(i)获取第i个的数量  .i(id)返回特定id的index .info(i)获取第i个道具的info
m.recommendO = _$('/span','className','white','title',(m.__GP.ubMod ? m.score+'支持 '+m.score_2+'反对 (版主可见)' : ''),'innerHTML',m.recommend ? m.recommend : (m.__GP.ubMod ? 0 :''))

this.data[ m.i ] = m

if(m.opt&2)
	return
this.w.commonui.postBtn.load(m.i)
this.w.commonui.postDisp(m.i)
}//fe
}//ce commonui.postArg

//============================
//帖子显示=====================
//帖子/发布者信息/签名显示=======
commonui.postDisp = function (argid){

var w = window,
$ = _$,
a = this.postArg.data[argid],
uI = this.userInfo.users[a.pAid],
isLesser = (this.userInfo.groups[uI.memberid][1] & 16),
_TM_BIT1_COUNT_VIEW = 67108864

if(!a.cLength)
	a.cLength = a.contentC.innerHTML.length;
if (a.contentC.innerHTML && a.contentC.innerHTML.substr(0,24).indexOf('lessernuke')>-1)
	a.cLength=0;

var lite=(a.vsmall ? 1:0)// &1小屏幕 / &2显示头像 / &4显示签名 /&8 app
if(window.__APPEMBED)
	lite |= 8

//推荐按钮
var ogood = $('/span','className','small_colored_text_btn block_txt_c2 stxt')._.add(
	$('/span','className','urltip nobr','style','fontSize:1.2em;marginTop:-1.8em;color:'+__COLOR.txt2),
	$('/a','className','white','href','javascript:void(0)','title','支持',__TXT('good'),'onclick',function(){commonui.postScoreAdd(this,a)}),
	a.recommendO,
	$('/a','className','white','href','javascript:void(0)','title','反对',__TXT('bad'),'onclick',function(){commonui.postScoreAdd(this,a,1)})
	)
//ip
, oip = a.ip ? $('/a','className','stxt','href','javascript:void(0)','style','color:inherit','innerHTML','['+a.ip+']','onclick',function(e){commonui.ipArea(e,a.ip)}) : null
//源版面
, oofrm = a.orgForum && (a.fid!=108 || a.__GP.ubMod)? 
	$('/a','style','marginLeft:0.7em;color:inherit','href','/thread.php?fid='+a.orgFid,'innerHTML',"["+a.orgForum+"]") : null
//posttime
,optime = $('/span','id','postdate'+a.i,'style','marginLeft:0.7em','className','stxt',
		'innerHTML',this.time2date(a.postTime,'Y-m-d H:i'), 
		a.__GP.admincheck?'onclick':null,a.__GP.admincheck?function(){if(this.style.color){adminui.selectPid(a.tid,a.pid,1);this.style.color=''}else{adminui.selectPid(a.tid,a.pid,0);this.style.color='darkred'}}:null)
//count
,ocount = (a.i==0 && a.visit && a.__GP.admincheck && a.__GP.greater) ? $('/a','href','javascript:void(0)','innerHTML',(a.tmBit1 & _TM_BIT1_COUNT_VIEW) ? '??' : a.visit[0],'style','marginLeft:0.7em','className','small_colored_text_btn block_txt_c0 stxt',
		'onclick',function(){if(a.tmBit1 & _TM_BIT1_COUNT_VIEW) adminui.forumStat(null,null,a.tid); else alert('本日访问'+a.visit[0]+'次 其中用户'+a.visit[1]+'次 第一页'+a.visit[2]+'次')}) : null
//收藏
,ofav = $('/a','style','marginLeft:'+(a.small?'2em':'0.7em'),'className','small_colored_text_btn block_txt_c0 stxt','href','javascript:void(0)',
			'title','收藏','onclick',function(e){commonui.favor(e,this,a.tid,a.pid)},
			__TXT('star')
			)
//操作菜单
,oopt = $('/a','style','marginLeft:'+(a.small?'2em':'0.7em'),'className','small_colored_text_btn block_txt_c0 stxt','href','javascript:void(0)',
			'title','操作菜单','onclick',function(e){
				if(lite&8)
					return commonui.postBtnLite(e,1,argid)
				commonui.postBtn.allBtn(e,argid)},
			'oncontextmenu',function(e){commonui.postBtn.allBtn(e,argid);return commonui.cancelEvent(e)},
			__TXT('gear')
			)
//属性
,otype = (a.type || a.tmBit1) ? $('/span','innerHTML',this.getPostBitInfo(a.fid, a.tid, a.pid , a.type, a.tmBit1, 2|(a.comment?4:0), a.__GP.admincheck)) : null
//标题
,osubj = $(a.subjectC).$0('style','line-height:inherit;vertical-align:-0.15em')

//回复
,rly = $('/a','style','padding:0 0.85em;marginLeft:'+(a.small?'2em':'0.7em'),'className','small_colored_text_btn block_txt_c0 stxt','href','javascript:void(0)',
	'title','回复','onclick',function(e){
		if(window.__APPEMBED)
			window.__API['do']('8?replyStr#',{tid:a.tid,pid:a.pid})
		else
			commonui.openPostWindow(e,postfunc.__REPLY,'',a.tid,a.pid)
		},
	'oncontextmenu',function(e){commonui.openPostWindow(e,postfunc.__REPLY,'',a.tid,a.pid);return commonui.cancelEvent(e)},
	__TXT.svg('bubble','width:0.8em;fill:'+__COLOR.bg1)
	)

//客户端
,clt = a.fromClient ? this.postDispFromClient(a.fromClient) : null
if(clt)
	clt.$0('className','stxt','style','margin-left:'+(a.small?'1.5em':'0.7em')+';')

if(lite&8){
	var pInfoC_add =[
		oip,
		oofrm,
		optime,
		clt,
		ocount
		],
	subjectCC_add = [otype,osubj],
	opra_add = [
		$('/div',ogood,'style','float:left'),
		rly,
		ofav,
		oopt]
	}
else{
	var pInfoC_add =[
		oip,
		oofrm,
		optime,
		clt,
		ocount,
		ofav,
		a.comment ? ogood : null,
		oopt
		],
	subjectCC_add = [a.comment ? null : ogood,otype,osubj]
	}

//subject块
var x = a.subjectC.parentNode
var xx = x.firstChild
if(xx.nodeType!=1)xx=xx.nextSibling
if(xx.nodeName=='BR')
	x.removeChild(xx)
x.removeChild(a.subjectC)
x.insertBefore(
	a.subjectCC=$('/div',	subjectCC_add		),
	x.firstChild
	)



//if((a.comment || a.cLength>40 || a.pAid==a.__CURRENT_UID) && uI.active>=0)
//	lite = lite | 2;



//pinfo块
a.pInfoC.innerHTML=ngaAds.bbs_ads32_gen();

$(a.pInfoC).$0('style','lineHeight:inherit;color:'+((lite&8) ? __COLOR.border2 : __COLOR.gbg2),pInfoC_add)

if(lite&8)
	$(a.postBtnC).$0(opra_add)

if(a.atItem)
	a.pInfoC.parentNode.insertBefore(commonui.postDispAtitems(argid,a.atItem),a.pInfoC.nextSibling)


//if(small)
//	a.pInfoC.parentNode.insertBefore($('/div')._.css('clear','both'),a.pInfoC.nextSibling)
if(this.blockword.ru && this.blockword.checkUsername(uI.uid,uI.username))
	a.userblocked = 1
else if(this.blockword.rc && this.blockword.checkContent(a.subjectC.innerHTML + a.contentC.innerHTML))
	a.userblocked = 2

if (a.comment){//comment
	var posterinfo =  $(a.uInfoC.cloneNode(),'innerHTML',this.posterInfo.main(lite, a.i, a.fid, a.tid, a.pid, a.cLength, a.pAid, a.type, a.stid, a.comment),'style','display:block')
	a.pInfoC.style.display='none'
	a.uInfoC.parentNode.replaceChild(posterinfo,a.uInfoC)
	a.uInfoC = posterinfo
	w.ubbcode.bbsCode({
		i:a.i,
		c:a.contentC,
		noImg:2,
		fId:a.fid,
		tId:a.tid,
		pId:a.pid,
		authorId:a.pAid,
		rvrc:uI.rvrc,
		isSig:0,
		callBack: (a.type & 4096) ? function(a){commonui.autoTranslate.main(a.c,a.fId)} : null,
		isLesser:isLesser,
		isNukePost:(a.type & 2048) ? 1 : ((a.punUsers && a.punUsers[a.pAid]) ? 2 : 0),
		isComment:1,
		maxLength:(a.opt&1) ? 256 : 0,
		fullLink:(a.opt&1) ? 1 : 0,
		removeQuote:1
		})
	
	if(a.userblocked ){
		try{
		var tmp = a.uInfoC.nextElementSibling
		}catch(e){}
	
		if(tmp.nodeName=='TABLE'){
			tmp.style.display=a.uInfoC.style.display ='none'
			a.uInfoC.parentNode.insertBefore($('/div'
				,$('/span','className','hint','innerHTML',a.userblocked ==1? '被你屏蔽的用户发布的内容' : '包含有被你屏蔽的内容')
				,'style','text-align:center;border:1px solid;margin:1px'
				,'className','userblockcontents'
				,'onclick',function(){
					var o = this
					if(!o._click){
						o._click = 1
						o.style.backgroundColor = __COLOR.gbg7
						if(o._tl)clearTimeout(o._tl)
						return o._tl=setTimeout(function(){
							o._click = 0
							o.style.backgroundColor = ''
							},2000)
						}
					o.style.display='none'
					o.nextElementSibling.style.display=''
					o.nextElementSibling.nextElementSibling.style.display=''
					}
				),a.uInfoC)
			}
			
		}
	return
	}


if(a.atItem && a.atItem.sp && a.atItem){
	if(a.atItem.sp[4]){
		a.pC.parentNode.className+=' ceffect'+a.atItem.sp[4]
		}
	if(a.atItem.sp[1]){
		this.postDispAvatarBg(
		a.uInfoC.parentNode, 
		__IMG_STYLE+'/'+a.atItem.sp[1], a.atItem.sp[2])
		}
	}

var tmp = commonui.getAvatarMagicInfo(uI.buffs)

if(tmp){
	this.postDispAvatarBg(a.uInfoC.parentNode, tmp.avatarBg)
	if(tmp.append)
		a.contentC.innerHTML+=' [color=silver]……'+tmp.append+'~[/color]'
	}


/*
if (rmd && rmd<-3){
	rmd=Math.floor(100+rmd*10/1.5);
	cC.style.opacity = '0.'+rmd;
	cC.style.MozOpacity = '0.'+rmd;
	//cC.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+rmd+')';
	cLen = 0
	}
*/

if(a.contentC.nodeName=='P' && a.ie8){//ie8 not allow nest p
	var x = $('/span')
	x.id = a.contentC.id
	x.className=a.contentC.className
	a.txt = a.contentC.innerHTML
	a.contentC.parentNode.replaceChild(x,a.contentC)
	a.contentC = x
	}
var clo = ((a.type & 4096)?1:0)  | (a.i<2?2:0)
w.ubbcode.bbsCode({
	i:a.i,
	c:a.contentC,
	opt:((a.tmBit1&255) ? 1 : 0)  | ((a.atItem && a.atItem.i(26)!==false)?512:0),
	noImg:a.noimg,
	fId:a.fid,
	tId:a.tid,
	pId:a.pid,
	authorId:a.pAid,
	rvrc:uI.rvrc,
	isSig:0,
	postType:a.type,
	isLesser:isLesser,
	isNukePost:(a.type & 2048) ? 1 : ((a.punUsers && a.punUsers[a.pAid]) ? 2 : 0),
	txt:a.txt!==undefined?a.txt:undefined,
	callBack:clo ? function(a){
		if(clo&1)
			commonui.autoTranslate.main(a.c,a.fId)
		if(clo&2)
			setTimeout(function(){ngaAds.bbs_ads8_load_new_load(a.i)},1000)}:null
	})

a.cLength = this.postDispCalcContentLength(a.contentC);

if(uI.active>=0){
	if(a.pAid==a.__CURRENT_UID)
		lite |= 6
	else if(a.cLength>20){
		lite |= 2
		if(uI.postnum>20)
			lite |= 4
		}
	}


//commonui.dispUserInfo(lite,pos,avatar,honor,regdate,lastlogin,lesser,ip,level,mute,medal,postNum,rvrc,repu,aid,fid,money,site,ifRemark,$('postauthor'+pos).innerHTML)
a.contentC.parentNode.className+=' pc'+uI.memberid

var tmp = this.postArg.def.mods[a.pAid]|0
if((tmp&1) || (tmp&10)==10)
	a.contentC.parentNode.className+=' pc5'
	
if(a.atItem && a.atItem.sp && a.atItem.sp[0])
	a.contentC.parentNode.style.color = a.atItem.sp[0]

var posterinfo =  $(a.uInfoC.cloneNode(),'innerHTML',this.posterInfo.main(lite, a.i, a.fid, a.tid, a.pid, a.cLength, a.pAid, a.type, a.stid, a.comment),'style','display:block')
,uInfoCParentC
if(lite & 8){
	a.uInfoC.parentNode.replaceChild(posterinfo,a.uInfoC)
	a.uInfoC = posterinfo
	a.uInfoC.appendChild($('/div','className','clear'))
	var uInfoCParentC = a.uInfoC.parentNode
	}
else if(lite & 1){
	var x=a.uInfoC.parentNode.style
	x.display='none'
	posterinfo.className='posterInfoLine'
	a.pC.insertBefore(posterinfo,a.pC.getElementsByTagName('div')[1])
	var uInfoCParentC = posterinfo.parentNode
	}
else{
	var uInfoCParentC = a.uInfoC.parentNode
	uInfoCParentC.replaceChild(posterinfo,a.uInfoC)
	a.uInfoC = posterinfo
	if(window.__CURRENT_UID==a.pAid && (window.__GP.ubMod || window.__GP.rvrc>10) && window.File && window.FileReader && window.FileList){
		this.postDispSetUserInfoBg(uInfoCParentC)
		a.uInfoC.firstChild.appendChild($('/a','href','javascript:void(0)','style','color:#aaa;',__TXT('gear'),'onclick',function(e){commonui.postDispSetUserInfoBgEdit(e)}))
		}
	}


//this.usernamelink($('postauthor'+pos),aid, pos % 20 )//修改链接
if(a.small)
	this.postDispAdjCommetWidth(a)
if(a.signC && uI.signature)
	this.postDispSign(a,uI,lite)

if(this.quoteTo && a.contentC.parentNode.id.substr(0,21)=='postcontentandsubject')
	this.aE(a.contentC.parentNode,'mouseup',function(e){commonui.quoteTo.onmouseup(e, parseInt(this.id.substr(21),10) )})
	

if(a.userblocked ){
	try{
	var tmp = a.pInfoC.parentNode.parentNode.parentNode
	}catch(e){}

	if(tmp.parentNode.nodeName=='TABLE' && tmp.nodeName=='TBODY'){
		tmp.style.display='none'
		tmp.parentNode.insertBefore($('/caption'
			,$('/span','className','hint','innerHTML',a.userblocked ==1? '被你屏蔽的用户发布的内容' : '包含有被你屏蔽的内容')
			,'style','text-align:center;border:1px solid;margin:1px'
			,'className','userblockcontents'
			,'onclick',function(){
				var o = this
				if(!o._click){
					o._click = 1
					o.style.backgroundColor = __COLOR.gbg7
					if(o._tl)clearTimeout(o._tl)
					return o._tl=setTimeout(function(){
						o._click = 0
						o.style.backgroundColor = ''
						},2000)
					}
				o.style.display='none'
				o.nextSibling.style.display=''
				}
			),tmp)
		}
		
	}

}//fe commonui.postDisp


//已经使用的对贴道具
commonui.postDispAtitems = function(argid,atItem){
var $=_$,x = $('/span','className','silver b opacity75'),i,j,l
for(i=0;i<5;i++){
	j=atItem.info(i)
	if(j)
		x._.add( (l=atItem.count(i))+(l>9?'':'×'), $('/img','src',atItem._P+'/'+j[1],'style','verticalAlign:middle;width:3em;height:3em','title',j[2]),$('/br'))
	}
return $('/div',
		'title','评价',
		'onclick',function(e){commonui.recommendPost(e,argid,this)},
		'style','clear:right;cssFloat:right;float:right;marginBottom:-0.2em;textAlign:right;cursor:pointer',
		x 
		)
}//


//设备信息的链接
commonui.postDispFromClient = function(client,lite){
var client = (client+'').match(/^(\d+)\s*(.*)$/),$=_$
if(client){
	client[1]|=0

	var x,y=client[1]
	if(y==8||y==100)
		x=-43
	else if(y==9 || y== 103)
		x=-3
	else if(y==101 || y== 7)
		x=-22
	else
		x=-64

	return $("/a",'title',(y==8||y==9||y==7) ? ('发送自'+(client[2]?' '+client[2]+' 上的':'')+' NGA官方客户端') : (client[2]?'发送自 '+client[2]:'发送自 未知设备'),
				'className',' inlineBlock','style','width:16px;height:16px;vertical-align:middle;filter:'+((y==8||y==9||y==7) ? 'none' : 'opacity(0.6)'),'style',{'background':'url("'+this.postDispFromClient.src+'") no-repeat -2px '+x+"px"},
				'href','http://app.nga.cn'
				)

		

	}
return null
}//

commonui.postDispFromClient.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAABVCAMAAACcjy+PAAAAD1BMVEUAAADgwZ7gwZ7gwZ7gwZ54CaA+AAAABXRSTlMAOspz/+jVyFoAAAD6SURBVDjLzVRLdsQwCJPA9z9xjLqIA7Zn5rVpuwgL50XmKwzAr4R5nOKQ4QDQzmsTgpdCGwejDOyN059iHxMyAIjzvOIagEBit+J2xYw5AEAKgOLpb8vC8Qyh+UtttHhV48wfSLCTYOjCPLscyV81XleMgiIxe8PpnoIvSXLiOT2SGioqu8xFCUplRYIQ2PFQ8Sp0zAwgs+Rn1DHYV59o0vzxU3lcURz+6D1b612jH7Y87zuzENW5yLiSZdOV5QgMMWL2J0IC9TFGDg5j2RNPkXpX9ejamvpRtXExa7PC+PvL/ruLzcu67Xx/6+84Ng7atA6y58Q2oP8oX22US3uf0QSiAAAAAElFTkSuQmCC'

//用户信息区域背景图
commonui.postDispSetUserInfoBg = function(uInfoCBg){
var pbg = commonui.userCache.get("customPosterBackgroundFile")
if(pbg){
	var opt = 0
	uInfoCBg.style.backgroundImage = "url("+pbg.replace(/~(\d+)$/,function($0,$1){opt = ($1|0);return ''})+")"
	uInfoCBg.style.backgroundPosition = (opt&1) ? "top left" : 
												( (opt&2) ? "right top" : 
													( (opt&4) ? "right bottom" : 
														( (opt&8) ? "left bottom" : '')
														)
													)
	uInfoCBg.style.backgroundRepeat = (opt&32) ? "repeat" : "no-repeat"
	}
}//

//设置用户信息区域背景图
commonui.postDispSetUserInfoBgEdit = function(e){
	commonui.createadminwindow()
	var x = commonui.adminwindow,$=_$
	x._.addContent(null)
	x._.addTitle('设置背景图')
	var y = $('/span')._.add(
		'图片将保存在浏览器储存中',
		$('/br'),
		'可能会意外清除 请自行备份原图',
		$('/br'),
		'对齐至 ',
		$('/input','type','radio','name','CPBalign_74635','value',1,'checked','checked'),'左上 ',
		$('/input','type','radio','name','CPBalign_74635','value',2),'右上 ',
		$('/input','type','radio','name','CPBalign_74635','value',4),'右下 ',
		$('/input','type','radio','name','CPBalign_74635','value',8),'左下 ',
		$('/br'),
		$('/input','type','checkbox','value',16,'checked','checked'),'半透明 ',
		$('/input','type','checkbox','value',32),'平铺 ',
		//'文件大小不超过1536k',
		$('/br'),
		//支持window.FileReader
		$('/input','type','file','onchange',function(e) {
				var f = e.target.files[0], reader = new FileReader(),p = this.parentNode
				reader.onload = function(e) {
					p._data = e.target.result
					};
				reader.readAsDataURL(f);
				}
			),
		$('/br'),
		$('/br'),
		$('/button','onclick',function(){
			var data = this.parentNode._data
			if(data){
				var opt = 0,x = this.parentNode.getElementsByTagName('input')
				for(var i=0;i<x.length;i++){
					if(x[i].checked)
						opt |= (x[i].value|0)
					}
				if(opt&16)
					data = commonui.gradientImage(data, opt)
				if(data.length>(1024*1024))
					return alert('文件过大');
				commonui.userCache.set("customPosterBackgroundFile",data+'~'+opt,86400*300)
				}
			else
				commonui.userCache.del("customPosterBackgroundFile")
			alert("设置完毕 刷新页面后生效")
			commonui.adminwindow._.hide()},'type','button','innerHTML','确定'),
		$('/button','onclick',function(){commonui.userCache.del("customPosterBackgroundFile")
			alert("设置完毕 刷新页面后生效")
			commonui.adminwindow._.hide()
			},'type','button','innerHTML','清除背景图')
		)
	x._.addContent(y)
	x._.show(e)
}//



//计算内容长度
commonui.postDispCalcContentLength=function(contentC){
var x = contentC.childNodes,y=0
for(var i=0;i<x.length;i++){
	if(x[i].nodeType==3 && x[i].nodeValue){
		y+=x[i].nodeValue.length
		if(y>20)
			break;
		}
	}
return y
}//


//调整贴条的宽度到 （默认一行两个 调整为一行一个
commonui.postDispAdjCommetWidth=function(a){
for(var j=0;j<2;j++){
	if(x = $((j?'comment_for_':'hightlight_for_')+(a.pid ? a.pid : a.i))){
		x = x.childNodes
		for(var i=0;i<x.length;i++){
			if(x[i].className=='comment_c left'){
				x[i].className='comment_c'
				x[i].style.width=''
				}
			}
		}
	}
}//

//显示签名
commonui.postDispSign=function(a,uI,lite){
if(lite & 4){
	a.signC.innerHTML = "<span class='sigline'><span class='en_font xtxt'>"+location.hostname.toLocaleUpperCase()+"</span></span>"
	if(uI.buffs[113])
		a.signC.innerHTML += "<button type='button' disabled='disabled'>签名被禁用</button>"
	else if(a.noimg || (lite & 8)){
		a.signC.appendChild( _$('/button','type',"button",'innerHTML','点击显示签名','onclick',function(){
			var x = this.parentNode
			x.innerHTML = "<span class='sigline'><span class='en_font xtxt'>"+location.hostname.toLocaleUpperCase()+"</span></span><div class='sign ubbcode' id='postsigncontent2'></div><div class='clear'></div>"
			ubbcode.bbsCode({
				c:x.childNodes[1],
				fId:a.fid,
				tId:a.tid,
				pId:a.pid,
				authorId:a.pAid,
				rvrc:uI.rvrc,
				isSig:true,
				opt:128,
				txt:uI.signature,
				suffix:"<div class='clear'></div>"
				})
			}) )
		}
	else{
		a.signC.innerHTML += "<div class='sign ubbcode' id='postsigncontent"+a.i+"' style='visibility:hidden'></div><div class='clear'></div>"
		ubbcode.bbsCode({
			c:a.signC.childNodes[1],
			fId:a.fid,
			tId:a.tid,
			pId:a.pid,
			authorId:a.pAid,
			rvrc:uI.rvrc,
			isSig:true,
			opt:128,
			callBack: function(a){window.setTimeout(function(){commonui.postSignCheckHeight(a.c)},1000)},
			txt:uI.signature,
			suffix:"<div class='clear'></div>"
			})
		}
	a.signC.style.display='block'
	}
else
	a.signC.style.display='none'
}//



commonui.postScoreAdd = function(o,a,x){
var s = o.parentNode,l = s.firstChild,t = function(y){
	l.$0('innerHTML',y,'style','display:initial')
	setTimeout(function(){l.style.display='none'},1000)
	}
__NUKE.doRequest({u:{u:__API._base,
	a:{__lib:"topic_recommend",__act:"add",tid:a.tid,pid:a.pid,value:x?-1:1,raw:3}
	},
	f:function(x){
		if (__NUKE.doRequestIfErr(x))
			return false;
		if(x.error)
			t(x.error[0])
		else{
			//alert(x.data[0])
			s.style.backgroundColor='silver'
			a.recommendC(x.data[1]|0)
			t(x.data[0])
			}
		return true
		}
	})
}

//===========================
//
commonui.gradientImage=function(dataUrl,opt){

var x = new Image(), y=document.createElement('canvas'), z = y.getContext('2d'), w ,h, hw, hh, u,
g = function(alpha,pos,center){
	return (alpha*(1-(pos-center)/center))|0
	},
l = function(alpha,pos,center){
	return (alpha*(1-(center-pos)/center))|0
	}
x.src =  dataUrl
w = y.width = z.width = x.width
h = y.height = z.height = x.height
z.drawImage(x, 0, 0)
u = z.getImageData(0, 0, w, h)
hw = (w/2)|0
hh = (h/2)|0
for(var i=0;i<h;i++){
	for(var j=0;j<w;j++){
		var ak = (i*w+j)*4 +3
		u.data[ak] = (u.data[ak]/3)|0
		if((opt&32)==0){
			if(opt&1){//左上100% 右下0%
				if(j>hw)
					u.data[ak] = g(u.data[ak],j,hw)
				if(i>hh)
					u.data[ak] = g(u.data[ak],i,hh)
				}
			if(opt&2){//右上100% 左下0%
				if(j<hw)
					u.data[ak] = l(u.data[ak],j,hw)
				if(i>hh)
					u.data[ak] = g(u.data[ak],i,hh)
				}
			if(opt&4){//右下100% 左上0%
				if(j<hw)
					u.data[ak] = l(u.data[ak],j,hw)
				if(i<hh)
					u.data[ak] = l(u.data[ak],i,hh)
				}
			if(opt&8){//左下100% 右上0%
				if(j>hw)
					u.data[ak] = g(u.data[ak],j,hw)
				if(i<hh)
					u.data[ak] = l(u.data[ak],i,hh)
				}
			}
		}
	}
z.putImageData(u,0,0)
return y.toDataURL()
}
//头像背景图====================
commonui.postDispAvatarBg = function(o,i,p){
o.style.background='#fff url("'+i+'")'+(p?' '+p:' 50% 0.5em no-repeat')
o.style.backgroundColor=''
}//


//签名高度=====================
commonui.postSignCheckHeight=function(o){
if(o.offsetHeight<=300){
	o.style.visibility=''
	return
	}
o.style.display='none'
o.style.visibility=''
o.parentNode.insertBefore(
	_$('<button type="button">签名高度超过300</button>')._.on('click',function(){this.style.display='none';this.nextSibling.style.display=''}),
	o
	)
}//fe
//购买并使用================
commonui.atItemBuyUse = function(e,tid,pid){
if(!window._ITEM)
	return __SCRIPTS.asyncLoad('userItem',function(){
		commonui.atItemBuyUse(e,tid,pid)
		} )
var x,z, $ = _$
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('对帖子使用道具')
this.adminwindow._.addContent(x = $('/span'),z=$('/span'))
var s = function(o,b,t){
	var y = tid+'\t'+(pid?pid:0)+'\t0'
	var io = new_ITEM_inset(o)
	console.log(b)
	io.storeBuyAndUse(1,5,b,y,t)//类别5 对贴道具
	}//fe
s(x,'9,10,11,12,13,14,15,16,17,18,19,20','选择一个礼物购买并使用')// 礼物类
s(z,'21,23,24,25,26','或购买一个道具并使用')// 功能类
this.adminwindow._.show(e)
}//fe
//推荐操作界面=================
/*
commonui.recommendPost = function(e,i,o){
if(!window.__CURRENT_UID && !i.length)
	return
var a = commonui.postArg.data[i], tid = a.tid, pid = a.pid, i = a.atItem, y,$ = _$

this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('使用道具')
var self = this, store = function(y){
	if(!window._ITEM)
		return loader.script(__SCRIPTS.userItem,function(){
			store(y,o)
			} )
	t.innerHTML=''
	y = tid+'\t'+(pid?pid:0)+'\t'+y
	var io = new_ITEM_inset(t)
	io.storeBuyAndUse(1,5,0,y,null)//类别5 对贴道具
	},//fe
 t,f
if(window.__CURRENT_UID)
	this.adminwindow._.addContent(
		$('/span',
			t = $('/span','classname','item_ui'	)
			)
		)
if(i){
	var x=$('/span').$0('className',"silver",'style',{lineHeight:'2.3em',fontSize:'2em',fontWeight:'bold'}),y=0
	for(var j=0;j<i.length;j++){
		var k = i.info(j)
		if(k)
			x._.add(
				' '+i.count(j)+'×',
				$('/img').$0('src',i._P+'/'+k[1],'style',{width:'2em',height:'2em',verticalAlign:'middle'},'title',k[0]+' : '+k[2])
				)

		if((y++)&1)
			x._.add($('/br'))
		}
	this.adminwindow._.addContent(
		$('/br'),$('/br'),
		$('/h4').$0('className',"textTitle silver",'innerHTML','其他用户此贴使用的道具'),
		x
		)
	}
this.adminwindow._.show(e)
store(0)
}//fe
*/
//修改记录格式化================
commonui.loadAlertInfo=function(info,ci)
{
if(!info)return;
info = info.split(/\t|\n/);
var x = '', y = '', 
	s = function(x){return " class='block_txt "+(x?'block_txt_c2':'block_txt_c3')+"' style='margin-bottom:0.25em' "},
	c = function(x){return '<span class="block_txt block_txt_c0" style="margin-left:-0.4em">'+x+'</span> '}
for (var i=0;i<info.length;i++){
	var z = info[i].replace(/^[\t\n ]+/,'');
	if (!z)
		continue
		
	if (z.match(/^edit /i)){
		x += z+' ';
		}
	else if(z.substr(0,1)=='['){
		y += z.replace(/\[([A-Z])?([-\d\.\/ ]+)( .+?)?\](.+)?/g,function($0,$1,$2,$3,$4){
			$2 = $2.split(' ')
			$3 = $3!==undefined?' '+$3:''
			$4 = $4!==undefined?' '+$4:''
			if($1=='L'){
				if($2.length>3){
					var o='<span '+s()+'>'+c('&#10005;')
					if($2[0]!='0'){
						if($2[1]==='00')
							o+="在同声望版面中"
						else if($2[2]!='0')
							o+="在主题中"
						else if($2[1]!='0')
							o+="在版面中"
						o+='禁言'+$2[0]+'天 '
						}

					if($2[3]!='0'){
						o+='扣除声望'+$2[3]
						if($2[4]!='0')
							o+=' 扣除威望'+($2[4]/10)
						}
					return o+$3+'</span>&emsp;'
					}
				else
					return '<span '+s(1)+'>'+c('&#10005;')+'-'+$2[0]+'声望 -'+$2[1]+'威望 禁言'+$2[2]+'天'+$3+'</span>&emsp;'
				}
			else if($1=='U')
				return '<span '+s(1)+'>'+c('&#10003;')+$2[0]+'声望 '+$2[1]+'威望 '+$2[2]+'G'+($3==' UM'?' 解除禁言':'')+' (取消操作)</span>&emsp;'
			else if($1=='E'){
				var o='<span '+s()+'>'
				if($2[1]=='0' && $2[2]=='#ANONYMOUS#')
					o+='匿名用户 '
				else if($2[1]=='0' && $2[2]=='0')
					o+=''
				else
					o+="<a href='/nuke.php?func=ucp&uid="+$2[1]+"'>"+$3.substr(1)+"</a> " 
				x +=  o+'在'+commonui.time2date($2[0], 'Y-m-d H:i')+'修改</span>&emsp;'
				return ''
				}
			else if($1=='A')
				return '<span '+s(1)+'>'+c('&#10003;')+$2[0]+'声望 '+$2[1]+'威望 '+$2[2]+'G'+$3+(__GP.greater ? " <a class='block_txt block_txt_c0' style='margin-right:-0.4em' href='javascript:void(0)' onclick='adminui.viewLog(0,0,"+$2[3]+")'>?</a>":'')+'</span>&emsp;'
			else
				return '<span '+s(1)+'>'+c('&#10003;')+$2[0]+'声望 '+$2[1]+'威望 '+$2[2]+'G'+$3+$4+'</span>&emsp;'
			});
		}/*
	else if(z.substr(0,4)=='$fav'){

			x+='<span '+s()+'>'
			z = z.substr(4).split('/')
			for(var j=1;j<z.length;j+=2)
				x += "<a href='/column.php?uid="+z[j]+"'>"+z[j+1]+"</a> "
			if((z.length-1)/2<z[0])
				x += '等'+z[0]+'人'
			x+='(公开)收藏了此贴</span>&emsp;'
			
		}*/
	}
$(ci).innerHTML = x+y
//$(ci).innerHTML = (x ? '<div class="silver">'+x+'</div>' : '')+(y?"<table class='quote'><tr><td>评分记录 "+y+'</td></tr></table>':'')
}

//发布者信息格式化==============
commonui.posterInfo={
w:window,
c:commonui,
uI:commonui.userInfo,
pA:commonui.postArg.data,
mI:commonui.modInfo,
__IMG_STYLE:window.__IMG_STYLE,
__IMGPATH:window.__IMGPATH,
sb:window.__SETTING.bit,
__NOW:window.__NOW,

main:function(lite,i,fid,tid,pid,cLen,uid,type,stid,comment){

var x ,d={},  u=this.uI.users[uid], rvrc=Math.floor(u.rvrc/10), active = this.active(u.uid,u.yz, u.mute_time, u.buffs,fid,tid,this.__NOW,stid), a = this.pA[i]

if(comment){
	d.avatar = this.avatar(i, lite|1, u.avatar, u.buffs)
	d.authorname = this.name(i,active, u.username, uid, u.buffs)
	return this.comment(d)
	}

d.avatar = this.avatar(i, lite, cLen>=15?u.avatar:'', u.buffs, a ? a.atItem :null, uid);
d.honor=this.honor(u.honor,lite)
//d.icon=this.levelIcon(this.uI.groups[u.memberid][1] & 16, rvrc)
d.l=this.floor(i, pid)
d.uid = this.uid(uid)
d.r_bar = this.r(lite, uid)
d.level = this.level(lite, this.uI.groups[u.memberid][0], rvrc, fid, uid, active, u.groupid, (a && a.mods) ? a.mods[uid] : 0, (a && a.customLevel)?a.customLevel :null)
d.authorname = this.name(i,active, u.username, uid, u.buffs, u.uuname)
d.postnum=this.basic(u.postnum, u.regdate, u.thisvisit)
d.money = this.money(u.money)
d.medal = this.medal(u.medal)
d.site = this.site(uid, u.site, u.bit_data & 32768 )
d.remark = this.remark(u.remark)+this.remark(u.remark_mod)


if((lite&1)==0)
	return this.normal(d,lite,a)
else 
	return this.lite(d)

},//fe

normal:function(d,lite,a){
var x = ''
if(d.authorname)x+="<div style='text-align:left;line-height:1.5em'>"+d.l+d.authorname+d.uid+"</div>"

if(d.avatar)x+=d.avatar

if(d.honor)x+=d.honor
x+="<div class='stat' style='margin:2px 0 0 0' "+(lite&2?'':"onclick='commonui.posterInfo.showAll(this)'")+"><div style='width:100%'>"

if(d.r_bar){
	for (var k in d.r_bar)
		x+="<div>"+d.r_bar[k]+"</div>"
	}
x+="<div style='float:left;margin-right:3px;min-width:49%;*width:49%'><nobr>"+d.level.p1+"</nobr></div>"
x+="<div style='float:left;margin-right:3px'><nobr>"+d.level.p2+"</nobr></div>"
//x+="<span class='clickextend' style='"+(lite&2 ? '' : 'display:none')+"'>"
x+="<div style='float:left;margin-right:3px;min-width:49%;*width:49%'><nobr>"+d.postnum+"</nobr></div>"
x+="<div style='float:left'><nobr>"+(d.level.p3? d.level.p3 : d.money)+"</nobr></div>"
x+="<div class='clear'></div></div>"
x+="<span class='clickextend' style='"+((lite&2)||(d.medal==''&&d.site==''&&d.remark=='') ? '' : 'display:none')+"'>"
if(d.medal)x+=d.medal+'<br/>'

if(d.site)x+=d.site+'<br/>'

if(d.remark)x+=d.remark

x+='<div class=clear></div></span></div><div class=stat_spacer></div>'
return x
},//fe
comment:function(d){
return d.authorname+'<br/>'+d.avatar
},//fe
lite:function(d){
var x=d.l
if(d.avatar)
	x+=d.avatar+' '
if(d.authorname)
	x+=d.authorname+d.uid+' '
if(d.honor)x+=d.honor+' '

x+="<span class='gray nobr'>"+d.level.p1+"</span> <span class='gray nobr'>"+(d.level.p2?d.level.p2:d.postnum)+"</span> <span class='gray nobr'> "+(d.level.p2?d.postnum:d.money)+"</span> "

if(d.medal)x+="<span class='gray nobr'>"+d.medal+'</span> '

if(d.site)x+="<span class='gray nobr'>"+d.site+'</span> '

if(d.remark)x+=d.remark
return x
},//fe

showAll:function(o){
if(o.__gtresgvb)return
o.__gtresgvb = true
o = o.getElementsByTagName('span')
for(var i=0;i<o.length;i++)
	if(o[i].className=='clickextend')
		o[i].style.display = ''
},//fe

remark:function(remark){
if(!remark)
	return ''
var x = ''
for(var k in remark){
	var z= ''
	remark[k][4]+=''
	if(remark[k][4].indexOf('=')!=-1)
		remark[k][4] = remark[k][4].replace(/(?:http:\/|bbs\.ngacn\.cc|nga\.178\.com)\/[a-z0-9_%\/\-?.]+?(tid|pid|fid)=(\d+)[a-z0-9_%\/\-]*/i,function($0,$1,$2){
			if($1=='tid')
				z="<a href='/read.php?tid="+$2+"'>[+]</a>"
			if($1=='pid')
				z="<a href='/read.php?pid="+$2+"'>[+]</a>"
			if($1=='fid')
				z="<a href='/thread.php?fid="+$2+"'>[+]</a>"
			return ''
			}).replace(/\[(tid|pid|fid)=(\d+)\]/i,function($0,$1,$2){
			if($1=='tid')
				z="<a href='/read.php?tid="+$2+"'>[+]</a>"
			if($1=='pid')
				z="<a href='/read.php?pid="+$2+"'>[+]</a>"
			if($1=='fid')
				z="<a href='/thread.php?fid="+$2+"'>[+]</a>"
			return ''
			})
	var y = this.c.cutstrbylen(remark[k][4],9,9,'…')
	if(remark[k][3]&1)
		x+="<span class='block_txt block_txt_c3 nobr' style='margin-bottom:0.25em;color:"+__COLOR.quote1+"'title='"+'公开备注 '+remark[k][4]+"'>"+'<span class="block_txt block_txt_c0" style="margin-left:-0.4em">&#10003;</span> ' +z+y+"</span> "
	else
		x+="<span class='block_txt block_txt_c3 nobr' style='margin-bottom:0.25em;color:"+__COLOR.txt2+"'title='版主可见 '"+remark[k][4]+"' onmouseover='this.firstChild.style.visibility=\"\"' onmouseout='this.firstChild.style.visibility=\"hidden\"'><span style='visibility:hidden'>"+z+y+"</span></span> "
	}

return x
},//fe

avatar:function(i,lite,avatar,buff,at,uid){

if(this.sb & 64)//不显示头像
	return ''

avatar = this.c.selectUserPortrait(avatar,buff,uid)

if(!avatar){
	if(lite&8)
		return "<div class='avatar avatar_none "+((lite&1)?'avatar_small':'')+"'></div>"
	return ''
	}

//if(at && at.sp && at.sp[4])

if(lite&1)
	return '<img src="'+
		avatar.replace(/http:\/\/pic1\.178\.com\/avatars\/(\d+)\/(\d+)\/(\d+)\/(\d+)_(\d+)\.jpg/ig,'http://pic1.178.com/avatars/$1/$2/$3/25_$5.jpg')+
		'" id="posteravatar'+i+'" class="avatar avatar_small'+
		(avatar.noborder?' avatar_noborder':'')+
		'"/>'+((at && at.sp && at.sp[3])?" <img src='"+__IMG_STYLE+'/'+at.sp[3]+"' style='vertical-align:bottom'/>":'')
else if(lite&2){
	if(avatar.func)
		return '<img src="'+avatar+'" id="posteravatar'+i+'" class="avatar'+(avatar.noborder?' avatar_noborder':'')+'" style="display:none;max-width:180px;max-height:255px" onload="commonui.posterInfo[\''+avatar.func+'\'](this)"/>'

	return '<img src="'+avatar+'" id="posteravatar'+i+'" style="max-width:180px;max-height:255px" class="avatar'+(avatar.noborder?' avatar_noborder':'')+'"/>'+((at && at.sp && at.sp[3])?"<img src='"+__IMG_STYLE+'/'+at.sp[3]+"' style='display:none' onload='this.style.marginLeft=this.style.marginRight=\"-\"+this.width/2+\"px\";this.style.display=\"\"'/>":'')
	}

return ''

},//fe

avatarBlockrain:function(o){
	
var x = _$('/canvas')
if(!x.getContext)return
x.width = (o.width*1.25)|0
x.height = (o.height*1.25)|0
x.className = o.className
x.id = o.id
var c = x.getContext('2d') ,
bwmax = 12,
blmax = x.width-bwmax,
sx = (o.width*0.125)|0,
sy = (o.height*0.125)|0,
p=[],ne = function(){
var y= [
	(Math.random()*blmax)|0, //left
	0,//top
	(Math.random()*bwmax/2+bwmax/2)|0,//width
	0,//height
	0//alpha 
	]
y[3]=y[2]*2
y[1]=x.height-y[3]
return y
}, f=function(){
if(p.length<6 && Math.random()<0.05)
	p.push( ne() )
if(p.length){
	c.clearRect(0,0,x.width,x.height)
	//c.filter='none'
	c.drawImage(o,sx,sy)
	}
for(var i=0;i<p.length;i++){
	var q = p[i]
	c.strokeStyle = 'rgba(237,234,247,'+(q[4]+0.2)+')'
	c.lineWidth = 1
	c.strokeRect(q[0], q[1], q[2], q[3])
	//c.clearRect(q[0]+1, q[1]+1, q[2]-2, q[3]-2)
	c.fillStyle = 'rgba(156,134,222,'+q[4]+')'
	c.fillRect(q[0]+1, q[1]+1, q[2]-2, q[3]-2)
	if(q[1]>20){
		if(q[4]<0.5)
			q[4]+=0.025
		}
	else{
		if(q[4]>0)
			q[4]-=0.025
		}
	q[1] -= 2
	if(q[1]<0)
		p[i] = ne()
	}
setTimeout(function(){requestAnimationFrame(f)},25)
}
c.globalCompositeOperation = 'overlay'
c.drawImage(o,sx,sy)
o.parentNode.replaceChild(x,o)
document.body.appendChild(o)
requestAnimationFrame(f)
},//fe

testavatar1:function(o){
var x = _$('/canvas')
x.width = o.width
x.height = o.height
x.style.marginLeft = '-'+x.width+'px'
x.style.marginTop = '0.25em'
x.style.marginBottom = '0.25em'
var c = x.getContext('2d') ,p=[],l =function(x1,y1,x2,y2,displace){
if (displace < 2)//curDetail = 2
	p.push(x1,y1,x2,y2)
else {
	var mid_x = (x2+x1)/2;
	var mid_y = (y2+y1)/2;
	mid_x += (Math.random()-.5)*displace;
	mid_y += (Math.random()-.5)*displace;
	l(x1,y1,mid_x,mid_y,displace/2);
	l(x2,y2,mid_x,mid_y,displace/2);
  }
}, f=function(){
if(p.length){
	p = []
	c.clearRect(0,0,x.width,x.height)
	}
else{
	c.beginPath()
	l( (Math.random()*x.width)|0, 0, (Math.random()*x.width)|0, x.height, 75)
	for(var i=0;i<p.length;i+=4){
		c.moveTo(p[i],p[i+1]);
		c.lineTo(p[i+2],p[i+3]);
		}	
	c.stroke();
	}
setTimeout(function(){requestAnimationFrame(f)},150)
}
c.lineWidth = 2
c.strokeStyle = '#ffffff'
c.shadowColor = '#ffffff'
c.shadowBlur = 10
o.parentNode.insertBefore(x,o.nextSibling)
requestAnimationFrame(f)
},//fe



honor:function(h,lite){
if(!h)
	return ''
if (h.substr(0,1)==' '){
	h = h.split(' ');
	h[1] = parseInt(h[1]);
	if(h[1] && h[1]>this.w.__NOW)
		h= h[2]
	else if(h[3])
		h=  h[3]
	else
		return ''
	}
if(lite&1)
	return "<span class='silver' name='honor'>"+h+"</span>"
return "<div class='silver' name='honor'>"+h+"</div>"
},//fe

levelIcon:function(lesser,rvrc){
//return this.__IMG_STYLE+'/uinfobg1.png?1'
/*
var x = this.__IMG_STYLE+'/level/'
if(lesser)
	return x+'sikle_bg.gif'
else if(rvrc>=0)
	return x+'nga_bg.gif'
else
	return x+'skeleton_bg.gif'
	*/
},//fe

floor:function(i,pid){
if(!i)
	return ''
return "<span class='right'>&nbsp;<a name='l"+i+"' href='"+this.c.genPidLink(pid,i)+"' class='small_colored_text_btn stxt block_txt_c0 vertmod'>#"+i+"</a></span>"
},//fe

uid:function(uid){
return " <a href='javascript:void(0)' name='uid'  class='small_colored_text_btn stxt block_txt_c0 vertmod' style='background:#aaa' onclick='commonui.ucplink(event,"+uid+")'>"+uid+"</a>"
},//fe

level:function(lite,level,rvrc,fid,uid,active,gid,mod//见setDefaults
	,customLevel){
var d = {}

//if(le=this.mI(gid,mod))
	//le = (le[1] ? '<a href="javascript:void(0)" onclick="alert(this.title)" class="block_txt block_txt_c0" title="'+le[1]+'" style="background-color:#'+le[3]+'">'+level+'</a>' : level)+(le[4] ? ' <a href="javascript:void(0)" onclick="alert(this.title)" class="block_txt block_txt_c0" title="'+le[5]+'" style="background-color:#'+le[6]+'">'+le[4]+'</a>' : '')

var cRv=0, y,z, l, r =this.uI.reputations
for(var k in r){//使用版面的第一个声望的值
	//if(k==fid){
		cRv=r[k][uid];
		if(!cRv)cRv=0;
		if(cRv>21000)
			cRv = 21000
		if(cRv<-21000)
			cRv = -21000
		break
	//	}
	}




if(cRv){//如果有声望
	y = cRv>9999 ? 'numeric' :'numericl'

	if(level.length>3){
		if(level.charAt(0)=='警')
			level = level.replace('等级','')
		}


	if(customLevel){//如果有自定义声望等级 p1声望等级 p2声望值 p3威望值+等级
		if(!customLevel.offset){
			for (var i=0,j=customLevel.length;i<j;i++){
				if (customLevel[i].r>=0){
					if(customLevel[i].r==0)
						j=i
					else
						j=i-1
					break
					}
				}
			customLevel.offset = j>=0?j:0
			}

		for (var i=0,j=0;i<customLevel.length;i++){
			if (cRv>=customLevel[i].r)
				j=i
			else
				break
			}

		z = customLevel[j].n
		l = j-customLevel.offset
		if(lite&1){
			d.p1 ="声望: <span class='silver' title='"+cRv+' / lv'+l+"'>"+z+"</span>"
			d.p2 = "威望: <span class='silver' title='"+rvrc+"'>"+level+"</span>"
			}
		else{
			d.p1 ="级别: <span class='silver'>"+z+"</span>"
			d.p2 ="声望: <span class='silver "+y+"'>"+cRv+(cRv ? '(lv'+l+')' : '')+"</span>"
			if(level.length>3)
				d.p3 = "级别: <span class='silver' title='威望 "+rvrc+"'>"+level+"</span>"
			else
				d.p3 = "威望: <span class='numericl silver'>"+rvrc+"</span><span class='silver'>("+level+")</span>"
			}
		}
	else{//p1声望值+等级 p2威望值+等级

		l = Math.floor((cRv|0)/1000)
		if(lite&1){
			d.p1 ="声望: <span class='silver "+y+"' title='"+cRv+"'>"+(cRv ? 'lv'+l : '0')+"</span>"
			d.p2 = "威望: <span class='silver' title='"+rvrc+"'>"+level+"</span>"
			}
		else{
			d.p1 ="声望: <span class='silver "+y+"'>"+cRv+(cRv ? "</span><span class='numericl silver'>(lv"+l+')' : '')+"</span>"
			if(level.length>3)
				d.p2 = "级别: <span class='silver' title='威望 "+rvrc+"'>"+level+"</span>"
			else
				d.p2 = "威望: <span class='numericl silver'>"+rvrc+"</span><span class='silver'>("+level+")</span>"
			}
		}
	}
else{
	//p1威望等级 p2威望值
	if(lite&1){
		if(!rvrc)
			d.p1 ="威望: <span class='silver'>"+rvrc+"</span>"
		else{
			d.p1 ="级别: <span class='silver'>"+level+"</span>"
			d.p2 = "威望: <span class='numericl silver'>"+rvrc+"</span>"
			}
		}
	else{
		d.p1 ="级别: <span class='silver'>"+level+"</span>"
		d.p2 = "威望: <span class='numericl silver'>"+rvrc+"</span>"
		}
	}

if((mod&10)==10){
	for(var k in d){
		if(d[k].match(/^(级别|威望)/)){
			d[k] = "级别: <span class='numericl silver' title='威望 "+rvrc+' '+level+" '>副版主</span>"
			break
			}
		}
	}
return d
},//fe

r:function(lite,uid){

var y,z,r_bar = {},r = this.uI.reputations
for(var k in r){
	var n = r[k][0], v = r[k][uid]
	if (v==0 || !v)
		continue;
	if (v>21000)
		v=21000
	if (v<-21000)
		v=-21000
	z = y = Math.abs(v/1000)
	y=Math.floor(y)
	if (z==y){
		y--;
		z=100;
		}
	else{
		z=(z-y)*100
		if (z<1)z=1
		}
	if((lite&1)==0)
		r_bar[k]="<div class='r_container' style='margin:2px 0 1px 0' title='"+n+' &emsp;'+v+"'><table cellspacing=1 class='"+(v>0 ?'blue':'red')+"' "+(y?"style='margin-bottom:-1px'":'')+"><tbody><td class='r_barc'><div style='width:"+z+"%' class=r_bar></div>"
	else{
		r_bar[k]="<span title='"+n+"'>声望: <span class='"+(v>9999 ? 'numeric' :'numericl')+"'>"+v+"</span></span>"
		continue
		}

	if(y){
		r_bar[k]+="<table style='width:100%' cellspacing=1 class='"+(v>0?'blue':'red')+"'><tbody><tr>"
		for (var i=0;i<y;i++)
			r_bar[k]+="<td class='dot'></td>"
		r_bar[k]+="</tr></tbody></table>"
		}

	r_bar[k]+="</div></td></tr></tbody></table>"
	}
return r_bar
},//fe

basic:function(postnum,regdate,lastlogin){
regdate = this.c.time2date(regdate,'Y-m-d H:i')
lastlogin = this.c.time2date(lastlogin,'Y-m-d H:i')
if(!this.w.__GP.admincheck)
	return "<span title=' 注册时间: "+regdate+" &#10; 最后登陆: "+lastlogin+" '>注册: <span class='numeric silver' name='regdate'>"+regdate.substr(2,8)+"</span></span>"
var tmp = postnum>9999 ? 'numeric': 'numericl'
return "<span title=' 注册时间: "+regdate+" &#10; 最后登陆: "+lastlogin+" '>发帖: <span class='"+tmp+" silver' name='postnum'>"+postnum+"</span></span>"
},//fe

money:function(money){
if(money<=0)
	return ''
return "财富: <span class='numericl silver' name='money' value='"+money+"'>"+this.c.calc_money(money)+"</span>";

},//fe

medal:function(medal){
if (!medal)
	return ''
var x = '', r = this.uI.medals, medal = medal.toString().split(',')
for (var k in medal){
	if(k=='length' || !medal[k] || !this.uI.medals[medal[k]])
		continue
	var m = this.uI.medals[medal[k]]
	x+=" <img class='medalimg' src='"+this.__IMGPATH+"/medal/"+m[0]+"' title='"+m[1]+":&#10;"+m[2]+"' "
	+(m[3]==396||m[3]==397 ? " onload='commonui.posterInfo.medalLoad(event,this,"+m[3]+")' " : '')
	+(m[3]==351||m[3]==386?" onclick='commonui.posterInfo.medalClick(event,this,"+m[3]+")' ":'')+" style='margin-bottom:-4px'/>"
	}
if(!x)
	return x
return "徽章:<span name='medal'>"+x+"</span>"
},//fe

medalLoad:function(e,o,id){
if(id==396||id==397){
	if(window.__INSECTOB){
		if(o.src.substr(o.src.length-8)!=".ani.gif")
			__INSECTOB.add(o,function(){
				setTimeout(function(){o.src=o.src+".ani.gif"},1000)				
				})

		}
	}
},//fe

medalClick:function(e,o,mid){
if(mid==351){
	if(!window.ubbcode||!ubbcode.psBtn)
		return loader.script(__COMMONRES_PATH+'/js_upup.js?0221',function(){commonui.posterInfo.medalClick(e,o,mid)})
	var p = __NUKE.position.get(e), c
	if(c=this.medalClick[351])c.parentNode.removeChild(c)
	if(c = (Math.random()>0.5 ? ubbcode.psBtn('WEAK UP','GET UP', 'GET OUT', 'THERE') : ubbcode.psBtn('TOOK THE','MASK', 'OFF TO', 'FEEL FREE'))){
		c._.css('left',p.px+'px','top',p.py+'px')
		document.body.appendChild(c)
		this.medalClick[351] = c
		c._go()
		}
	}
else if(mid==386){
	if(!window.ubbcode||!ubbcode.psBtn)
		return loader.script(__COMMONRES_PATH+'/js_upup.js?0220',function(){commonui.posterInfo.medalClick(e,o,mid)})
	ubbcode.mossBtn(e,o)
	}
},//fe

active:function(uid,active,muteTime,buffs,fid,tid,now,stid){
if(active<0){
	var y= this.c.activeInfo(active,uid)
	y[3] = y[3]+' '+y[4]
	return y
	}
else if(muteTime>this.__NOW)
	return ['orange','MUTED','禁言',"此用户在全局禁言状态 至"+this.c.time2date(muteTime,'Y-m-d H:i')]
else if(buffs){
	for(var i in buffs){
		for(var j in buffs[i]){
			if(buffs[i][j].constructor==Object)
				var b = buffs[i][j]
			else
				var b = buffs[i],j=false
			if(b[1]>=this.__NOW){
				if(b[2] == 105 || b[2] == 116 ||  b[2] == 117 ||  b[2] == 118){
					if((b[2] == 105 || b[2] == 116) && b[3]==0)
						return ['orange','MUTED','禁言','此用户在全局禁言状态 详情查看用户信息']
					else
						return ['gray','MUTED','禁言','此用户在某区域内是禁言状态 详情查看用户信息']
					}
				}
			if(j===false)
				break
			}
		}

/*
	else if(y==1)
		y='#474143'
	else if(y==2)
		y='#63502f'
	else if(y==3)
		y='#7f5e1a'
	else if(y==4)
		y='#956609'
	else if(y==5)
		y='#a06600'
	else if(y==6)
		y='#a05b00'
	else if(y==7)
		y='#a04700'
	else if(y==8)
		y='#9c3000'
	else
		y='#8c0000'
*/
	}
return ['','','','']
},//fe

name:function(i,active,authorname,authorid,buff,uuname){
	//console.log(uuname.replace(/(.{2})/g,'%$1'))//temp201710
	if(window.__GP && __GP.greater && uuname)
		authorname = decodeURIComponent(uuname.replace(/(.{2})/g,'%$1'))
if(this.c.htmlName)
	authorname = this.c.htmlName(authorname)

else if(buff && buff[103])
	authorname = this.c.anonyName(authorname,true);
	
return "<a href='nuke.php?func=ucp&uid="+authorid+"' id='postauthor"+i+"' class='author b nobr' "+(active[3]?"title='"+active[3]+"'":'')+">"+authorname+"</a>"+(active[1]?"<sup class='"+active[0]+" b en_font' onclick='alert(this.previousSibling.title)'>"+active[1]+'</sup>':'')
},//fe
site:function(authorid,site,fav){
var x = ''
if(site)
	x+="<a class='block_txt block_txt_c2' style='margin-bottom:0.25em' href='/thread.php?fid=-"+authorid+"' name='site'>"+site+"</a> "
//if(fav)
	//x+="<a class='block_txt block_txt_c2' style='margin-bottom:0.25em' href='/column.php?uid="+authorid+"' title=''>聚聚</a> "
return x
}//fe
}//ce



//============================
//投票========================
//投票显示=====================
commonui.vote = function(o,tid,x){
if(!x)
	return this.voteOld(o,tid)
var sum = 0,vsum=0,usum=0,w=window,__NUKE=w.__NUKE,id='vote'+Math.random(),type='radio',
TYPE_VOTE = 0,//投票类
TYPE_BET = 1,//投注类
TYPE_SCORE = 2,//评分类
TYPE_SCORE_VOTE = 3,//评分类的单条评分数据

small = __SETTING.bit & __SETTING.bits.size4
bW = small ? 5 : 10

x = __NUKE.scDe(x)
x.type |= 0

if(x.type==TYPE_SCORE_VOTE){
	o.innerHTML = "<div><h4 class='silver subtitle'>评分</h4>"+(function(x,y){
		var z=''
		for(var k in x){
			if(k|0){
				z+='<b>'+y[k]+'</b>:'+x[k]+' '
				}
			}
		return z
		})(x,this.postArg.def.topicVote)+"</div>"
	return 
	}

x.opt |= 0
x.max_select |= 0
x.min |= 0
x.max |= 0
x.end |= 0
if(x.done)
	x.done = ','+x.done.toString()+','
if(x.max_select>1)
	type='checkbox'

for (var k in x){
	if(k|0){
		var y = x['_'+k].split(',')//单项人数, 单项投注量, 总人数
		x[k]=[x[k], y[0]|0, y[1]|0]//标题, 单项人数, 单项投注量
		if(y[2]>usum)
			usum = y[2]|0
		sum += y[0]|0
		if(y[1])
			vsum+=y[1]|0
		}
	}

var name = x.type==TYPE_SCORE ? '评分' :(x.type==TYPE_BET?'投注':'投票'), atv=!x.end || w.__NOW<=x.end, txt="<table id='"+id+"' style='font-size:"+(small?'0.842em':'')+"'><tbody>", info = "", btn='', i=0,savg=0

for (var k in x){
	if((k|0)==0)
		continue;
	i++
	txt += "<tr><td>"+x[k][0]+"</td>";
	if(atv && w.__CURRENT_UID){
		if(x.type==2){}
		else if(x.type==1)
			txt += "<td><input name='"+k+"' value='' title='如投注此项则在此填入投注数量' style='width:2em'/></td>"
		else
			txt += "<td><input type='"+type+"' name='vote"+tid+"' value='"+k+"'/></td>"
		}
	if(!atv && w.__GP.admincheck && x.type==1 && !x.done){
		txt += "<td><input type='"+type+"' name='vote"+tid+"' value='"+k+"'/></td>"
		}
	if(x.done){
		if(x.done.indexOf(','+k+',')!=-1)
			txt += "<td><b class='red'>胜出</b></td>"
		else
			txt += "<td></td>"
		}
	if(x.type==2){
		txt += "<td><b>"+(tmp = (x[k][2]/x[k][1]*100|0)/100)+"分</b></td><td style='width:"+bW+"em'><div style='background:"+__COLOR.quote1bg+";border-radius:0.17em;width:100%'><div style='background:"+__COLOR.border0+";border-radius:0.17em;height:1em;width:"+(tmp? tmp/x.max*100 : 0)+"%'></div></div></td>"
		this.vote['votedata_vote'+i+'value']= tmp
		savg+=tmp
		}
	else{
		txt += "<td><b><nobr>"+x[k][1]+"人</nobr></b></td>"
		txt += "<td><nobr>"+(((x[k][1]/sum*1000)|0)/10)+"%</nobr></td>"
		txt += "<td style='width:"+bW+"em'><div style='background:"+__COLOR.quote1bg+";border-radius:0.17em;width:100%'><div style='background:"+__COLOR.border0+";border-radius:0.17em;height:1em;width:"+(sum? x[k][1]/sum*100 : 0)+"%'></div></div></td>";
		if(x.type==1){
			txt+=small ? "</tr><tr style='box-shadow:0 0.052em "+__COLOR.quote1bg+"'><td colspan=2>" : "<td>"
			txt += "<b><nobr>投注"+x[k][2]+"</nobr></b></td>"
			txt += "<td><nobr>"+(((x[k][2]/vsum*1000)|0)/10)+"%</nobr></td>"
			txt += "<td style='width:"+bW+"em'><div style='background:"+__COLOR.quote1bg+";border-radius:0.17em;width:100%'><div style='background:"+__COLOR.border0+";border-radius:0.17em;height:1em;width:"+(vsum? x[k][2]/vsum*100 : 0)+"%'></div></div></td>";
			}
		}
	txt+='</tr>'
	}
this.vote['votedata_voteavgvalue']= ((savg/i*10)|0)/10

txt += "</tbody></table> "

if(x.type==2)
	info += "评分("+x.min+"~"+x.max+")"
else if(x.type==1)
	info += "投注<a href='javascript:void(0)' class='b' onclick='alert(\"10000铜币=100银币=1金币\")'>铜币</a> 最少"+x.min+" 最多"+x.max+" 最多投注"+x.max_select+"项"
else
	info += "最多选择"+x.max_select+"项"

if(x.priv)
	info += " "+x.priv.replace(/r-?\d+_/,'需要达到')+'版面声望'

info += " 共计"+usum+"人"+name;
this.vote['votedata_usernum']=usum

if(x.type!=2)
	info += " 共计"+sum+(x.type==1?"次投注":"票");

if(x.type==1)
	info += " 共计投注"+vsum+"铜币";

if(x.end)
	info+=" 结束时间 "+this.time2date(x.end,'Y-m-d H:i')

if(x.opt&1)
	info+=" 提交后可查看结果"

if(x.opt&2)
	info+=" 结束后可查看结果"

if (atv && w.__CURRENT_UID)
	if(x.type==2)
		btn+="<br/>回复主题以提交你的评分 (快速回复不能评分)"
	else
		btn += "<br/><button type='button' onclick='commonui.vote.submit(this.parentNode.parentNode,"+tid+","+x.type+","+x.max_select+","+x.min+","+x.max+","+x.end+")'>"+name+"</button> "

if(!atv && w.__GP.admincheck && x.type==1 && !x.done)
	btn += "<br/><button type='button' onclick='commonui.vote.submitSettle(this.parentNode.parentNode,"+tid+")'>结算</button> (勾选判定为\"赢 \"的选项)"

o.innerHTML = "<div><h4 class='silver subtitle'>"+name+"</h4>"+(i>16 ? '<div>'+info+'</div>' : '')+txt+'<div>'+info+btn+'</div></div>'


}//fe
//投票结算=====================
commonui.vote.submitSettle = function (o,tid){
if(!confirm("你选择了结算投票！是否继续"))
	return
if(!confirm("再确认一次 将要结算投票！你确认选了正确的胜出结果么！"))
	return
var x = o.getElementsByTagName("input"),y=[]
for (var i = 0;i<x.length;i++){
	if(x[i].checked){
		y.push(x[i].value)
		}
	}
if (y.length)
	__NUKE.doRequest({u:__API.voteSettle(tid,y.join(',')),
		f:function(x){
			if (__NUKE.doRequestIfErr(x))
				return false;
			if(x.error)
				alert(x.error[0])
			else
				alert(x.data[0])
			return true
			}
		})
}//fe
//投票提交=====================
commonui.vote.submit = function (o,tid,type,max_select,min,max,end){
var x = o.getElementsByTagName("input"),y=[],c=0
for (var i = 0;i<x.length;i++){
	if(type==1){
		if(x[i].value){
			c++
			if(c>max_select)
				return alert('不能投注超过'+max_select+'项')
			var z = x[i].value|0
			if(z<min)
				return alert('超过最小值')
			if(z>max)
				return alert('超过最大值')
			y.push(x[i].name)
			y.push(x[i].value)
			}
		}
	else{
		if (x[i].checked){
			c++
			if(c>max_select)
				return alert('不能投票超过'+max_select+'项')
			y.push(x[i].value)
			}
		}

	}
if (y.length)
	__NUKE.doRequest({u:__API.vote(tid,y.join(',')),
		f:function(x){
			var y = __NUKE.doRequestIfErr(x)
			if(y)
				alert(y)
			else
				alert(x.data[0])
			return true
			}
		})
}//fe



//============================
//对贴道具=====================
commonui.atItems = {//参看 items/lib_at_item.php
id:function(i){return this[i]&32767},
info:function(i){
	var id = this.id(i)
	if(this._IF_HIDDEN(id))return
	if(this._INFO[id]){
		if(this._INFO[id].constructor==String)
			this._INFO[id] = this._INFO[id].split('\t')
		return this._INFO[id]
		}
	},
count:function(i){return this[i]>>15},
i:function(id){for(var j=0;j<this.length;j++)if((this[j]&32767)==id)return j},
sp:null,//道具特效（如果有） [文字颜色 头像bg 头像框右下]
length:0,
_CO_RIOT:18,
_P:__IMG_STYLE+'/items',
_SP:{//特定id道具的特效
	18:"#bf4385\triotbg.png\t0 0 no-repeat\triotbr.png",
	//文字颜色/ 头像bg/  头像框右下/ 
	19:"#bf4385\txishanbg.png\t0 0 no-repeat\txishanbr.png",
	23:"#bf4385\ttidebg.png\t0 0 no-repeat\ttidebr.png\t1",
	24:"#bf4385\talliancebg.png\t0 0 no-repeat\t\t1",
	25:"#bf4385\thordebg.png\t0 0 no-repeat\t\t1",
	27:"#4d72ab\tblizzconbg.png?9\t0 0 no-repeat\t\t1"
	},
_INFO:{
	1:'坚硬法杖\t5_1.gif\t虽然没用~但是花钱买它可以证明我的诚意~',
	2:'锥形巨剑\t5_2.gif\t虽然也没用~但是花钱买它可以证明我的诚意~',
	10:'便当\t5_10.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	11:'查水表\t5_11.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	12:'肥皂\t5_12.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	13:'给跪\t5_13.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	14:'求交往\t5_14.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	15:'张嘴吃药\t5_15.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	16:'祝福\t5_16.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	17:'祖传DNA\t5_17.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	18:'RIOT\t5_18.png\t来自RIOT公司的发言~',
	19:'西山居\t5_19.png\t来自西山居公司的发言~',
	20:'红包\t5_20.png\t虽然没用~但是花钱买它可以证明我的诚意~',
	21:'高亮主题\t5_21.png\t在主题列表中显示主题发布者的头像 需40威望以上 只能对自己发布的主题使用',
	23:'浪\t5_23.png\t帖子使用不同的样式,加以特殊效果',
	24:'联盟\t5_24.png\t帖子使用不同的样式,加以特殊效果',
	25:'部落\t5_24.png\t帖子使用不同的样式,加以特殊效果',
	26:'播放视频/JS沙盒\t5_26.png?2\t允许贴子中嵌入视频播放/JS沙盒',
	},
_IF_HIDDEN:function(id){if(id==18||id==19)return 1},//在推荐道具里不显
_CREATE:function(a){//id,count,id,count,id,count...
	var b=function(){},c,s=this
	b.prototype=this
	b = new b
	
	commonui.uniEach(a, function(k,v){
		b[b.length++]=(v<<15)|(k&32767)
		if(s._SP[k&32767])
			c=1
		}, typeof a=='string'?1:2)

	if(c){
		for(var c in this._SP){
			for(var i=0;i<b.length;i++){
				if((b[i]&32767)==c){
					if(this._SP[c].constructor == String)
						this._SP[c] = this._SP[c].split("\t")
					b.sp = this._SP[c]
					break
					}
					
				}
			}
		}
	for(var i=0;i<b.length;i++){
		var a=null
		for(var j=0;j<b.length;j++){
			if(b[j]<b[j+1]){
				a = b[j]
				b[j] =  b[j+1]
				b[j+1] = a
				}
			}
		if(!a)
			break
		}
	return b
	}
}//fe
//============================
//帖子操作按钮lite=============
commonui.postBtnLite = function(e,opt,argid){
var a = commonui.postArg.data[argid], $=_$
if(opt&1){
	var x = $('/span'
		,__CURRENT_UID == a.pAid ? $('/a','href','javascript:void(0)','style','margin:0 0.5em','className','inlineBlock','onclick',function(e){
			if(window.__APPEMBED)
				window.__API['do']('7?contentEdit#',{tid:a.tid,pid:a.pid})
			else
				commonui.openPostWindow(e,postfunc.__MODIFY,'',a.tid,a.pid)
			})._.add('编辑',$('/br'),'编辑') : null
		,$('/a','href','javascript:void(0)','style','margin:0 0.5em','className','inlineBlock','onclick',function(e){
			if(window.__APPEMBED)
				window.__API['do']('8?contentReport#',{tid:a.tid,pid:a.pid})
			else
				commonui.logPost(e,a.tid,a.pid)
			})._.add('举报',$('/br'),'举报')
		,$('/a','href','javascript:void(0)','style','margin:0 0.5em','className','inlineBlock','onclick',function(e){
			if(window.__APPEMBED)
				window.__API['do']('6?tieTiao#',{tid:a.tid,pid:a.pid})
			else
				commonui.comment(e,a.tid,a.pid)
			})._.add('贴条',$('/br'),'贴条')
		)
	}
if(x)
	commonui.liteWindow(e,null,x)
}//


//============================
//帖子操作按钮=================
commonui.postBtn={
parent:commonui,
saveKey:'postBtnHis',
d:{

4:{u:'/read.php?pid={pid}&to',n1:'主题',n2:'跳转至主题内阅读此贴',c:'red',
	ck:function(a){if (a.pid && window.location.href.indexOf('pid=')!=-1)return 1} },

5:{n1:'举报',n2:'举报此贴至版主',on:function(e,a){commonui.logPost(e,a.tid,a.pid)},
	ck:function(a){if ( a.__GP.rvrc>-50 || a.__GP.admincheck)return 1} },

6:{
	u:'/post.php?action=modify&_newui&fid={fid}&tid={tid}&pid={pid}&article={i}',
	on:{
		click:function(e,a,o){
			if(o.__islongclick || o.__t3){
				commonui.openPostWindow(e,postfunc.__MODIFY,'',a.tid,a.pid)
				o.__islongclick = o.__t3 = 0
				return commonui.cancelEvent(e)
				}
			},
		touchstart:function(e,a,o){
			o.__t3 = 1
			}
		},
	__islongclick:1,
	n1:'编辑',
	c:'disable_tap_menu',
	ck:function(a){if (a.pAid==a.__CURRENT_UID || a.__GP.admincheck)return 1} },

7:{u:'/post.php?action=quote&_newui&fid={fid}&tid={tid}&pid={pid}&article={i}',
	on:{
		click:function(e,a,o){
			if(o.__islongclick || o.__t3){
				commonui.openPostWindow(e,postfunc.__QUOTE,'',a.tid,a.pid)
				o.__islongclick = o.__t3 = 0
				return commonui.cancelEvent(e)
				}
			},
		touchstart:function(e,a,o){
			o.__t3 = 1
			}
		},
	__islongclick:1,
	c:'disable_tap_menu',
	n1:'引用',
	ck:function(a){if (a.__CURRENT_UID)return 1} },

8:{u:'/post.php?action=reply&_newui&fid={fid}&tid={tid}&pid={pid}&article={i}',
	on:{
		click:function(e,a,o){
			if(o.__islongclick || o.__t3){
				commonui.openPostWindow(e,postfunc.__REPLY,'',a.tid,a.pid)
				o.__islongclick = o.__t3 = 0
				return commonui.cancelEvent(e)
				}
			},
		touchstart:function(e,a,o){
			o.__t3 = 1
			}
		},
	__islongclick:1,
	c:'disable_tap_menu',
	n1:'回复',
	ck:function(a){if (a.__CURRENT_UID)return 1} },

9:{n1:'评论',n2:'做一个简短的回复 / 贴纸条',on:function(e,a){commonui.comment(e,a.tid,a.pid)},
	ck:function(a){if (a.__CURRENT_UID)return 1} },

10:{n1:'评分',on:function(e,a){adminui.addpoint(e,a.tid,a.pid,a.fid)},
	ck:function(a){if(a.__GP.admincheck&2)return 1} },

11:{u:'/nuke.php?func=set_user_reputation&uid={pAid}&fid={fid}',n1:'声望',n2:'设置此人的声望',
	ck:function(a){if (a.__GP.admincheck&2 && a.fid<0)return 1} },

//12:{n1:'禁言',on:function(e,a){adminui.muteuser(e,a.pAid)},
//	ck:function(a){if (a.__GP['super'])return 1} },

13:{n1:'Nuke',on:function(e,a){adminui.nukeUi(e,a.pAid,a.tid,a.pid)},c:'ngared',
	ck:function(a){if (a.__GP.superlesser || (a.__GP.ubSecAct))return 1} },

14:{n1:'Nuke',n2:'禁言并扣减声望',n3:'Nuke',on:function(e,a){commonui.lessernuke(e,a.tid,a.pid,a.fid)},
	ck:function(a){if (a.__GP.admincheck)return 1} },

15:{n1:'签名',n2:'清除签名',n3:'清除签名',on:function(e,a){commonui.setSign(e,a.pAid,a.__GP.greater)},
	ck:function(a){if (a.__GP.greater)return 1} },

16:{n1:'头像',n2:'清除头像',n3:'清除头像',on:function(e,a){commonui.setAvatar(e,a.pAid,a.__GP.greater)},
	ck:function(a){if (a.__GP.greater)return 1} },

17: {
	n1: '属性', n2: '设置帖子属性', n3: '帖子属性', on: function (e, a) { commonui.setPost(e, a.tid, a.pid, a.fid) },
	ck: function (a) { if ((a.__GP.admincheck & 2) && a.pid && parseInt(a.pid, 10) && a.pid > 0) return 1 }
},

18:{n1:'翻译',n2:'以版主提供的术语表进行对照翻译',on:function(e,a,o){if(o._.gV('transed'))return;commonui.autoTranslate.main($('postcontent'+a.lou),a.fid);o._.sV('transed',1)},
	ck:function(a){if (window.__AUTO_TRANS_FID)return 1} },

19:{u:"/nuke.php?func=message#to={pAid}",n1:'短信',n2:'向作者发送短消息',
	ck:function(a){if (a.__CURRENT_UID)return 1} },

20:{u:"/nuke.php?func=ucp&uid={pAid}",n1:'作者',n2:'查看作者资料',n3:'作者信息'},

21:{u:"/thread.php?authorid={pAid}&fid={fid}",n1:'搜索&sup1;',n2:'搜索作者在本版面发布的主题',n3:'版内主题'},

22:{u:"/thread.php?searchpost=1&authorid={pAid}&fid={fid}",n1:'搜索&sup2;',n2:'搜索作者在本版面发布的回复',n3:'版内回复'},

23:{u:"/read.php?tid={tid}&authorid={pAid}",n1:'搜索&sup3;',n2:'搜索作者在本主题内的回复',n3:'只看作者'},

25:{u:"http://v.t.sina.com.cn/share/share.php?appkey=3938048249&title=_TOPIC&url=_URL",target:'_blank',n1:"分享到微博",on:function(e,a,o){o.href=commonui.postBtn.replaceUrl(o.href)} },

28:{u:"javascript:scrollTo(0,0)",n1:__TXT('up'),n2:'回到页面顶端'},
/*
29:{n1:'<input type="checkbox" name="delatc[]" value="0"/>',n2:'选中回复',n3:'(<input type="checkbox" name="delatc[]" value="0"/>选中回复)',
	ck:function(a){if (__GP['admincheck'] && a.pid && parseInt(a.pid,10) && a.pid>0){
		this.n3=this.n3.replace(/value="\d+"/i,'value="'+a.pid+'"')
		this.n1=this.n1.replace(/value="\d+"/i,'value="'+a.pid+'"')
		return 1}}
	,on:function(e,a){this.value=a.pid},tag:'span'},
*/
30:{n2:'查看编辑记录',n3:'编辑记录',
	ck:function(a){if (a.pAid==a.__CURRENT_UID || (a.__GP.admincheck&2))return 1} 
	,'on':function(e,a){
		var z, $ = _$,c=commonui
		,u = function(tid,pid,pg,z){
				z.innerHTML=''
				__NUKE.doRequest({
				u:{u:__API._base,a:{'__lib':'edit_history','__act':'edit_history','__output':3,'tid':tid,'pid':pid,'page':pg}},
				f:function(x){
					var y= __NUKE.doRequestIfErr(x)
					if (y)
						return alert(y);
					y=x.data[0]
					z._.add('├─── ',$('/br'))
					for(var i in y){
						z._.add('├─ '+commonui.time2date(y[i][1])+' 编辑内容'
							,$('/br')
							,$('/a','style','color:'+__COLOR.gbg4,'href',"./read.php?tid="+(a.tid|0)+"&pid="+(a.pid|0)+"&view_edit_bakup="+y[i][0],'target','_blank','innerHTML','├─── 查看历记录')
							,$('/br')
							)
						}
					z._.add($('/a','class','b','href',"javascript:void(0)",'innerHTML','下一页','onclick',function(){u(tid,pid,pg+1,z)}))
					}
				})
			}
		c.createadminwindow()
		c.adminwindow._.addContent(null)
		c.adminwindow._.addTitle('编辑历史')
		c.adminwindow._.addContent(
			z = $('/span')
			)
		c.adminwindow._.show(e)
		u(a.tid|0, a.pid|0, 1, z)
		}
	},

/*31:{u:'/nuke.php?func=locktopic&edit_lock&tid={tid}&pid={pid}&lock=1',n2:'发帖时间超过时限禁止编辑',n3:'禁止编辑',
	ck:function(a){if (__GP['admincheck'])return 1} },*/

32:{n2:'设置为发帖时间超过时限可以编辑',n3:'许可编辑',on:function(e,a){commonui.setPost(e,a.tid,a.pid,a.fid)},
	ck:function(a){if (a.__GP.admincheck&2)return 1} },

33:{u:window.location.href+'&noBBCode',n2:'查看帖子的BBCode源码',n3:'源码' },

34:{n1:'转发',on:function(e,a,o){var x = commonui.postBtn.all;commonui.postBtn.all={'分享':[24,25,26,27]};commonui.postBtn.allBtn(e,a);commonui.postBtn.all=x} },

35:{n1:'收藏',n2:'收藏此贴或主题',on:function(e,a){commonui.favor(e,this,a.tid,a.pid)} },

36:{n1:'道具',n2:'对此贴使用道具',on:function(e,a){commonui.atItemBuyUse(e,a.tid,a.pid)} ,ck:function(a){if (a.__CURRENT_UID)return 1}},

37:{n1:'道具2',n2:'对此贴使用道具',on:function(e,a){commonui.recommendPost(e,a.i,this)},ck:function(a){if (a.__CURRENT_UID)return 1} },

38:{n1:'推荐',n2:'推荐此贴至工作人员',on:function(e,a){commonui.logPostRecommend(e,a.tid,a.pid)},
	ck:function(a){if ( a.__GP.rvrc>=200 || a.__GP.admincheck)return 1} },

39:{n1:'备注',n2:'为用户添加备注',on:function(e,a){adminui.remarkUi(e,a.tid,a.pid)},
	ck:function(a){if ( a.__GP.lesser && a.__GP.admincheck)return 1} },

40:{u:"/thread.php?searchpost=1&authorid={pAid}&fid={fid}",n1:'搜索\u2074',n2:'搜索作者版面内的回复',n3:'版内回复'},

41: {
	n1: '抽楼', n2: '锁定隐藏该回复', n3: '锁隐', on: function (e, a) {
		__NUKE.doRequest({
			u: __API.setPost(a.tid + ',' + (a.pid ? a.pid : 0), 0, 0, 1026, 0, '', '', undefined, window.__CURRENT_FID ? __CURRENT_FID : ''),
			b: this
		})
	},
	ck: function (a) { if ((a.__GP.admincheck & 2) && a.pid && parseInt(a.pid, 10) && a.pid > 0) return 1 }
	},

42: {
	n1: '解抽', n2: '解除锁定隐藏', n3: '解除锁隐', on: function (e, a) {
		__NUKE.doRequest({
			u: __API.setPost(a.tid + ',' + (a.pid ? a.pid : 0), 0, 0, 0, 1026, '', '', undefined, window.__CURRENT_FID ? __CURRENT_FID : ''),
			b: this
		})
	},
ck:function(a){if ((a.__GP.admincheck&2) && (a.pid|0))return 1} },
43: {
	n1: '', n2: '审核记录', n3: '审核记录', on: function (e, a) {
		__NUKE.doRequest({
			u:{u:__API._base,	a:{__lib:"filter",__act:"get_testlog",fid:-7,tid:a.tid,pid:a.pid,raw:3}	},
			f:function(d){
				if(d.data && d.data[0]){
					var x=''
					eval('x='+d.data[0])
					for(var i=0;i<x.length;i++){
						if(typeof x[i]=='number')
							x[i] = '\n'+commonui.time2date(x[i]|0,'Y-m-d H:i:s')
						else if(x[i].extra)
							x[i].extra = x[i].extra.replace(/ac |pass|block|wait|review|manual|auto|:\d+/g,function(j){
								var x ='ac 4审核中心pass2通过block2阻止wait2等待review2查看post2帖子ignore2忽略del2删除manual2人工auto2自动'
								,i = x.indexOf(j)
								if(i>-1)
									return x.substr(i+j.length+1,x.charAt(i+j.length)|0)
								return 'by UID'+j
								})
						}
					commonui.alert(_$('/pre')._.add(commonui._debug._d(x)), null, 1)
					}
				}
		})
	},
	ck:function(a){if (a.__GP._bit & (8|4194304|2097152))return 1}
	},
44: {
	n1: '审核', n2: '审核通过', n3: '审核通过'
	, on: function (e, a) {
		__NUKE.doRequest({
			u:__API.setPost(a.tid + ',' + (a.pid ? a.pid : 0), 0, 0, 0, 512|67108864, '', '', undefined, window.__CURRENT_FID ? __CURRENT_FID : ''),
			b: this
		})
	},
ck:function(a){if(a.__GP._bit & (4|4194304|2097152))return 1} }
},

replaceUrl:function (u){
var e = encodeURIComponent;
return u.replace('_TOPIC',e(document.title)).replace('_URL',e(document.location.href)).replace(/_BBSURL/g,e(window.__BBSURL))
},

def:[28,6,7,8,34],
all:{
'帖子':[4,6,7,8,9,36,35,38,5,18,33],
'作者':[23,20,19,21,22],
'管理':[10,41,42,17,29,32,30,44,43],
'作者管理':[11,13,39,14,15,16],
'分享':[25]
},

btnCache:{},

genU:commonui.buttonBase.genU,

genT:commonui.buttonBase.genT,//fe

genC:commonui.buttonBase.genC,

genA:commonui.buttonBase.genA,

inhis:commonui.buttonBase.inhis,

genB:commonui.buttonBase.genB,//fe

init:function(){
if(!this.argCache)
	this.argCache = commonui.postArg.data
},

load:function(argid){
this.init()
var arg = this.argCache[argid]

if(arg.pC && arg.pC.getBoundingClientRect && !arg.comment && window.__CURRENT_UID){//不是评论 并且登录状态
	var s = this
	_$(arg.pC).$0('ontouchstart',function(e){s.eventHandlerOver(e,this,arg)},'onmouseover',function(e){s.eventHandlerOver(e,this,arg)},'onmousewheel',function(e){s.eventHandlerOver(e,this,arg)},'onmouseout',function(e){if(!commonui.ifMouseOut(e,this))return;if(s.currentBtn)s.currentBtn.style.display='none'})
	}
},

pos:__NUKE.position.get,

eventHandlerOver:function(e,o,arg){

if(e.type=='touchstart')
	o._touchstarttime = e.timeStamp
else if(e.type=='mouseover'){
	if(e.timeStamp && (e.timeStamp-o._touchstarttime)<500)//touch触发的mouse事件忽略
		return
	}

var x = o.getBoundingClientRect(),y=this.pos(e)

if(
	(arg.vsmall && y.x>x.left+(x.right-x.left)/5 && y.x<x.right-(x.right-x.left)/5) || //小屏点中间区域
	(!arg.vsmall && y.x<x.right-(x.right-x.left)/4) //大屏点左侧区域
	){
	if(this.currentBtn){
		if(o._postBtn!=this.currentBtn){//如点的不是本贴消失
			this.currentBtn.style.display='none'
			return
			}
		else if(e.type=='touchstart'){//touch时 除了点按钮条都消失
			var t = e.target
			while(t && t.nodeName!='body' && t!=this.currentBtn)
				t = t.parentNode
			if(this.currentBtn!=t){
				this.currentBtn.style.display='none'
				return
				}
			}
		}
	}

if(!o._postBtn){
	arg.postBtnC.appendChild(o._postBtn = this.genB(arg.i).$0('style','left:0px;top:0px;display:;visibility:hidden'))
	o._postBtn.$0('style','left:auto;top:auto;marginLeft:-'+(o._postBtn.offsetWidth)+'px;marginTop:-'+(o._postBtn.offsetHeight-1)+'px;visibility:visible')
	}

if(this.currentBtn &&  o._postBtn!=this.currentBtn)
	this.currentBtn.style.display='none'

if(o._postBtn.style.display!='')
	o._postBtn.style.display=''

this.currentBtn = o._postBtn

},//fe

eventHandlerOut:function(e){
if(!commonui.ifMouseOut(e,this))
	return
var argid = this._.gV('argid')
var b=commonui.postBtn.btnCache[argid]
if(b)b.style.display='none'
},//fe

floatBtn : function(cp,mp){

if(!this.floatBtn.o){
	var $=_$,v = $('/div','className','single_ttip3','style','position:fixed;left:0.5em;bottom:0.5em'
		,$('/span', 'className','content'
			,$('/a','href','javascript:void(0)','style','margin:0 0.5em','className','inlineBlock','onclick',function(e){
				if(window.__APPEMBED)
					window.__API['do']('999?topage#',{tid:a.tid})
				else
					{}
				},'innerHTML',0+' / '+0)
			,$('/a','href','javascript:void(0)','style','margin:0 0.5em','className','inlineBlock','onclick',function(e){
				var a = commonui.postArg.def
				if(a){
					if(window.__APPEMBED)
						window.__API['do']('9?moderatorStr#',{tid:a.tid})
					else
						commonui.topicBtn.allBtn(e,commonui.topicBtn.argCache)
					}
				})._.add('管理',$('/br'),'管理')
			,$('/a','href','javascript:void(0)','style','margin:0 0.5em','className','inlineBlock','onclick',function(e){
				var a = commonui.postArg.def
				if(a){
					if(window.__APPEMBED)
						window.__API['do']('4?replyStr#',{tid:a.tid,pid:a.pid})
					else
						commonui.openPostWindow(e,postfunc.__REPLY,'',a.tid)
					}
				})._.add('回复',$('/br'),'回复')
			)
		,$('/div','className','clear')
		)
	v.style.display=''
	document.body.appendChild(v)
	this.floatBtn.o = v
	var lastscroll=0,ti
		,show=function(){commonui.postBtn.floatBtn.o.style.display=''}
		,hide=function(){commonui.postBtn.floatBtn.o.style.display='none'}
	commonui.aE(window,'scroll',function(){
		if(ti)
			clearTimeout(ti)
		var st = window.pageYOffset || document.documentElement.scrollTop
		if (st > lastscroll){
			ti = setTimeout(hide,200)
			} 
		else {
			ti = setTimeout(show,200)
			}
		lastscroll = st <= 0 ? 0 : st; // For Mobile or negative scrolling
		})
	}
var x = this.floatBtn.o.firstChild.firstChild
if(cp)x._cp=cp
if(mp)x._mp=mp
x.innerHTML = x._cp+' / '+x._mp
x.nextSibling.style.display=commonui.postArg.def.__GP.admincheck ? '':'none'
},
	
allBtn:commonui.buttonBase.allBtn,

saveHis:commonui.buttonBase.saveHis,//

clearHis:commonui.buttonBase.clearHis,//

clearCache:commonui.buttonBase.clearCache,//
clearArgCache:function(){
delete this.argCache
this.argCache = {}
}//
}//ce




commonui.postBtn.allBtn = function(e,argi,nohis){

var $=_$
,arg = typeof(argi)!='object' ? this.argCache[argi] : argi
,x = this.parent.buttonBase.allBtn.call(this, e, arg, nohis, 1)
,s = location.protocol+'//'+location.host
,l= x.lastChild,v

while(l && l.className.indexOf('group')==-1)
	l=l.previousSibling

if(l.lastChild.innerHTML=='分享到微博')
	l.lastChild.innerHTML='微博'

if(__GP.admincheck){
	var y = x.getElementsByTagName('a')
	for(var i=0;i<y.length;i++){
		v=y[i].firstChild.nodeValue
		if(v == '解除锁隐')
			y[i].$0('innerHTML','')._.add('锁隐',$('/div','className','info')._.add('解除'))
		else if(v.charAt(0) == '审')
			y[i].$0('innerHTML','')._.add(v.substr(0,2),$('/div','className','info')._.add(v.substr(2)))
		}
	}	

var y = $('/div','className','cell rep block_txt_big','style','background:none;padding-left:0;padding-right:0')


if(arg.tid){

	y._.add(
		$('/span','className',"url",'style','line-height:1.5em'
			,$('/span','className',"silver",'innerHTML','主题地址 ')
			,$('/input','className',"xtxt",'style','margin:0 0.1em;background:transparent;box-shadow:none;width:'+((__SETTING.bit&16) ? '15':'22')+'em;border:1px solid '+__COLOR.bg0,'value',s+'/read.php?tid='+arg.tid,'onfocus',function(){this.select()},'dir','rtl')
			)
		)
	}

if (arg.pid!='tpc' && arg.pid>0){
	y._.add(
		$('/br'),
		$('/span','className',"url",'style','line-height:1.5em'
			,$('/span','className',"silver",'innerHTML','回复地址 ')
			,$('/input','className',"xtxt",'style','margin:0 0.1em;background:transparent;box-shadow:none;width:'+((__SETTING.bit&16) ? '15':'22')+'em;border:1px solid '+__COLOR.bg0
				,'value',s+'/read.php?pid='+arg.pid+'&opt=128'
				,'onfocus',function(){this.select()},'dir','rtl')
			)
		)
	}

l._.add(y)

if((arg.tid || arg.pid) && commonui.QRCode && window.__UA && (__UA[2]==1 || __UA[2]==3) && !(__UA[0]==1 && __UA[1]<8)){
	l._.add(
		$('/img','src','about:blank', 
			'style','display:none;margin:0.5em 0 0 0;float:right', 
			'alt',s+'/?j='+
				(arg.tid ? 't'+arg.tid : '')+(arg.pid!='tpc' && arg.pid>0 ? 'p'+arg.pid : '')/*+(w.__CURRENT_UID ? 'h'+w.__CURRENT_UID : '')*/, 
			'onerror', function(){
				commonui.QRCode.loadDataUrl(this,this.alt,function(){this.style.display=''},{ecclevel:'L',bg:'',margin:0,color:__COLOR.border0})
				}
			)
		,$('/div','className','clear')
		)
	}



	
if(false){
	if(!this.adminWindowSpp){
		this.adminWindowSpp = commonui.createCommmonWindow()
		var b = this.adminWindowSpp
		,a = b.getElementsByTagName('div')
		b.$0('style','background:none;box-shadow:none;border:none;max-width:initial')
		for(var i=0;i<a.length;i++)
			a[i]._.attr('style','background:none;border:none')
			
		b._.__t._.attr('style','background:rgba(40,40,40,0.5);border:none')
		b._.__t.firstChild._.attr('style','background:rgba(40,40,40,0.5);color:#eee')
		b.firstChild._.attr('style','transform: scale(1.1) perspective(30em) rotatey(-7deg);transform-origin: 100% 50% 0;')

		if(!this._styleFontHSun){
			this._styleFontHSun = 1
			__NUKE.addCss('@font-face {font-family: "SrcSunHeavy";\n\
src: url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.eot?1");\n\
src: url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.eot?#iefix") format("embedded-opentype"),\n\
url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.ttf?1") format("truetype"),\n\
url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.woff?1") format("woff"),\n\
url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.svg#SrcSunHeavy") format("svg");\n\
font-style: normal;\n\
font-weight: normal;}')
			}
		}

	//x.$0('style','font-size:1.457em')
	var y = x.getElementsByTagName('a'),z=1
	for(var i=0;i<y.length;i++){
		if(y[i].className.indexOf('cell')>-1)
			y[i].$0('style','box-shadow:0px 0px 0.75em -0.3em #444')
		if(y[i].className.indexOf('his')>-1){z=0
			y[i]._.attr('style','background:#00b3fd;color:#fff;font-family:SrcSunHeavy')}
		else
			y[i]._.attr('style','background:#fff;color:#444;font-family:SrcSunHeavy')
		if(y[i].className.indexOf('firstcell')>-1)
			y[i]._.attr('style','margin-left:'+Math.random()+'em')
		}

	if(z)
		for(var i=0;i<y.length;i++){
			if(y[i] && (y[i].innerHTML=='回复' || y[i].innerHTML=='只看作者'))
				y[i]._.attr('style','background:#00b3fd;color:#fff')
			}

	var y = x.getElementsByTagName('span')
	for(var i=0;i<y.length;i++)
		if(y[i].className.indexOf('url')>-1){
			y[i]._.attr('style','background:#fff;color:#444')
			y[i].lastChild._.attr('style','border:none;color:#444')
			}
		else if(y[i].className.indexOf('title')>-1)
			y[i]._.attr('style','float:left;margin-top:-1em;margin-bottom:-1em;height:auto;padding:0.2em;position:relative;outline:double 3px orangered;background:orangered;width:auto;color:#fff')

	this.adminWindowSpp._.addContent(null)
	this.adminWindowSpp._.addContent(x)
	this.adminWindowSpp._.show(e)
	return 
	}

if(!this.adminWindowSp)
	this.adminWindowSp = commonui.createCommmonWindow()

this.adminWindowSp._.addContent(null)

this.adminWindowSp._.addContent(x)

this.adminWindowSp._.show(e)


}//fe



//============================
//主题操作按钮=================
commonui.topicBtn={
parent:commonui,
saveKey:'topicBtnHis',
d:{
1:{n1:'标题',n2:'编辑标题颜色',n3:'标题颜色',
	on:function(e,a){adminui.colortopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

2:{n1:'锁定',n2:'锁定/关闭主题 除版主外不能回复/阅读',n3:'锁定主题',
	on:function(e,a){commonui.setPost(e,a.tid,null,a.fid)},
	ck:function(a){if(a.admin)return 1} },

3:{n1:'移动',n2:'移动主题到其他版面',n3:'移动主题',
	on:function(e,a){adminui.movetopic(e,a.tid,a.fid,0)},
	ck:function(a){if(a.admin)return 1} },

4:{n1:'镜像',n2:'在其他版面创建主题的镜像 在主题被回复时镜像也会更新',n3:'镜像主题',
	on:function(e,a){adminui.movetopic(e,a.tid,a.fid,2)},
	ck:function(a){if(a.anyAdmin)return 1} },

5:{n1:'提前',n2:'将主题的回复时间修改为当前时间',n3:'提前主题',
	on:function(e,a){adminui.pushtopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

6:{n1:'计数',n2:'手动修复在回复被删除后主题的页数错误',n3:'重新统计回复',
	u:'nuke.php?func=recountreply&tid={tid}',
	target:'_blank',
	ck:function(a){if(a.admin)return 1} },

7:{n1:'置顶',n2:'将主题(的内容)显示在版面最上方 作为版面公告',n3:'置顶主题',
	on:function(e,a){adminui.toptopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

8:{n1:'精华',n2:'将主题设置为精华',n3:'精华主题',
	on:function(e,a){adminui.digesttopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

9:{n1:'删除',n2:'将主题移入回收站',n3:'删除主题',
	on:function(e,a){adminui.movetopic(e,a.tid,a.fid,1)},
	ck:function(a){if((a.admin&2) || __CURRENT_UID == 17387322)return 1} },

10:{n1:'收藏',n2:'收藏主题',
	on:function(e,a){commonui.favor(e,this,a.tid)},
	ck:function(a){if(__CURRENT_UID)return 1} },

11:{n1:function(){return _$('/span','style','fontSize:1.23em')._.add((__SETTING.bit&16?'':'发表')+'回复')},
	n2:'发表回复',
	c:'disable_tap_menu uitxt1',
	on:{
		click:function(e,a,o){
			if(o.__islongclick || o.__t3){
				commonui.openPostWindow(e,postfunc.__REPLY_BLANK,'',a.tid)
				o.__islongclick = o.__t3 = 0
				return commonui.cancelEvent(e)
				}
			},
		touchstart:function(e,a,o){
			o.__t3 = 1
			}
		},
	__islongclick:1,
	u:'/post.php?action=reply&_newui&fid={fid}&tid={tid}',
	ck:function(a){if(__CURRENT_UID)return 1} },

12:{n1:'操作',n2:'更多主题操作功能',
	on:function(e,a){commonui.topicBtn.allBtn(e,a)},
	ck:function(a){if(a.anyAdmin || a.admin || __CURRENT_UID == 17387322)return 1} },

13:{/*n1:'集合&sup1;',*/n2:'设置集合主题管理员',n3:'集合管理员',
	on:function(e,a){commonui.setTopicAdmin(this,a.tid)},
	ck:function(a){return 1} },

14:{/*n1:'集合&sup2;',*/n2:'设置集合主题黑名单',n3:'集合黑名单',
	on:function(e,a){commonui.setTopicBlock(this,a.tid)},
	ck:function(a){return 1} },
15:{n1:'APP阅读',n2:'使用论坛APP阅读此主题',n3:'APP阅读此贴',
	u:{replace:function(){
		var p = location.search.match(/(?:uid|stid|fid|tid|page|pid)=(?:-?\d+)/g)
		return 'nga://?'+( p? p.join('&') : '')
		}},
	c:'disable_tap_menu teal',
	on:function(e,a,o){
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
		},
	//on:function(e,a){setTimeout(function(){location.assign('http://app.178.com/phone.html')},3000)},
	ck:function(a){if(__SETTING.uA[2]==4 || __SETTING.uA[2]==2)return 1} },
16:{n1:'调查',n2:'当前主题内相关操作记录',n3:'调查操作',
	on:function(e,a){adminui.viewLog(0, 0, 0, a.tid)},
	ck:function(a){if(a.admin&2)return 1} },
17:{n1:'统计',n2:'主题近期统计',n3:'统计数据',
	on:function(e,a){adminui.forumStat(null,null,a.tid,commonui.time2date(__NOW,'Y-m-d'),10)},
	ck:function(a){if(a.admin&2)return 1} },
18:{n1:'PID',n2:'记录PID',n3:'记录PID',
	on:function(e,a){adminui.selectPid(0,0,2)},
	ck:function(a){if(a.admin)return 1}}
},

replaceUrl:commonui.buttonBase.replaceUrl,

def:[11,12,10,15],
all:{'主题操作':[1,2,3,4,5,6,7,8,9,13,14,16,17,18]},

genU:commonui.buttonBase.genU,

genT:commonui.buttonBase.genT,

genC:commonui.buttonBase.genC,

genA:commonui.buttonBase.genA,

argCache:null,

init:function(){
var a = commonui.postArg.def
this.argCache = {
	fid:a.fid,
	tid:a.tid,
	admin:a.__GP.admincheck,
	anyAdmin:a.__GP.userBit & 4,
	pid:0,
	greater:a.__GP.greater
	}
if((this.argCache.admin || this.argCache.anyAdmin ) && !window.adminui)
	loader.script(__COMMONRES_PATH+'/js_admin.js')
},

load:function(o,fid,tid,admin){
this.init()
var i=0,l=this.def,xx=null, max= __SETTING.bit & 8 ? 5 : 8,oo = commonui.stdBtns()

if(!this.his){
	this.his = commonui.userCache.get(this.saveKey);
	if(!this.his)this.his=[]
	}
while(1){
	for (var k=0;k<l.length;k++){
		if(i++>=max)break
		if(xx=this.genA(this.argCache,l[k],1))
			oo._.__ins(xx)
		}
	if(l==this.his)break
	l=this.his
	}
o.innerHTML=''

if(!oo._.__length)
	return

o.appendChild(oo)
},//fe


allBtn:commonui.buttonBase.allBtn,//fe

saveHis:function(id){if(id!=13 && id!=14)this.saveHis1(id)},//fe
saveHis1:commonui.buttonBase.saveHis,//fe

clearHis:commonui.buttonBase.clearHis,//fe
clearCache:commonui.buttonBase.clearCache,//fe
clearArgCache:function(){
	this.argCache = null
	}//
}//ce

/*
commonui.iDigi = function(t){
var h=29,x=0,y=0,z=_$('/div')._.cls('idigi'),k,u=z
for(var i=0;i<t.length;i++){
	k = t.charCodeAt(i)
	y = (k>=48 && k<=57) ? (k-48)*30 : 300
	u._.add(
		_$('/div')._.css('height',h+'px','background','url('+__IMG_STYLE+'/digi_gray.png) '+x+'px -'+y+'px no-repeat')
		)
	u=u.firstChild
	x += k==49 ? 22 : 26
	}
z._.css('width',x+'px')
return z
}//fe
*/


