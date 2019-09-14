
//==================================
//commonui
//==================================
if (!window.commonui)
	var commonui = {}

commonui._w = window

//==================================
//补充一些基本
//==================================
if(!window.__NUKE){
var __NUKE = {}
__NUKE.scEn=function (v,no){
switch (typeof(v)) { 
	case 'string':
		return v.replace(/~/g,'');
	case 'number':
		return v.toString(10);
	case 'boolean':
		return v?1:0
	case 'object':
		if(no)return ''
		var buf=[]
		for (var k in v)
			buf.push(this.scEn(k,1) + '~' + this.scEn(v[k],1));
		return buf.join('~');
	default: 
		return '';
	}
}//fe

__NUKE.scDe=function (s){
s = s.split('~')
if(s.length==1)return s
var v={}
for (var i=0;i<s.length;i+=2)
	v[s[i]]=s[i+1]
return v
}//fe
}//end if





//判断在iframe中===============
;(function(){
var x=false
if (window.parent!=window.self)
	x = true
commonui.checkIfInIframe = function(){return x}
})();//fe





//==================================
//__API 论坛api
//==================================
var __API = {
auto_trans:function(fid){//自动翻译获取列表
	return [this._cache+'auto_translate/'+fid+'.js',
		this._base+'__lib=auto_translate&__act=auto_translate&raw=1&fid='+fid]
	},
auto_trans_set:function(fid){//自动翻译修改
	return this._base+'__lib=auto_translate&__act=auto_translate&set=1&fid='+fid
	},
//auto_trans_save:function(form,fid){//自动翻译保存 , 内容 content
//	return this._gen(form, '__lib', 'auto_translate', '__act', 'auto_translate', 'save', 1, 'fid', fid )
//	},
admin_code:function(){//管理密码
	return this._base+'__lib=admin_code&__act=admin_code&raw=1'
	},
user_forum_manage:function(fid){//用户版面管理
	return this._base+'func=userforum&act=manage&fid='+fid
	},
user_forum_nuke:function(fid){//用户版面关闭
	return this._base+'func=nuke_user_forum&fid='+fid
	},
forum_manage:function(fid){//版面管理
	return this._base+'func=modifyforum&fid='+fid
	},
minor_moderator:function(fid){//副版主设置
	return this._base+'func=minor_moderator&fid='+fid
	},
forum_stat:function(fid){//版面统计
	return this._base+'func=admin_stat&day_limit=30&fid='+fid
	},
topic_key_set:function(fid){//主题分类设置
	return this._base+'func=topic_key&fid='+fid
	},
keyword_watch_set:function(fid){//关键字监视设置
	return this._base+'func=logpost&setkey=1&fid='+fid
	},
keyword_watch:function(fid){//关键字件事记录
	return this._base+'func=logpost&fid='+fid
	},
filter_key:function(fid){//监视
	return [this._cache+'filter/'+fid+'.js?'+Math.floor(__NOW/3600),
		this._base+'func=logpost&getkey&fid='+fid+'&time='+Math.floor(__NOW/3600)]
	},
topic_key:function(fid,x){//主题分类
	return [this._cache+'bbs_topic_key/'+fid+'.js?'+Math.floor(__NOW/3600),
		this._base+'__lib=topic_key&__act=get&raw=1&fid='+fid+'&time='+Math.floor(__NOW/3600)]
	},
nuke:function(uid,tid,pid,info,infoadd,time_range,limit,mode,ip){//nuke
	return {u:this._base+'__lib=nuke&__act=nuke_act&raw=3',a:{
		uid:uid,tid:tid?tid:'',pid:pid?pid:'',info:info,infoadd:infoadd,time_range:time_range?time_range:'',limit:limit?limit:'',mode:mode,ip:ip
		}}
	},
digest:function(fid){
	return "/thread.php?&recommend=1&fid="+fid+"&order_by=postdatedesc&admin=1"
	},
viewFPg:function(fid){
	return this._base+"__lib=view_privilege&__act=view&fid="+fid
	},
set_user_reputation:function(fid,user,value){//用户声望
	return {u:this._base+'__lib=user_reputation&__act=set&raw=3',a:{
		user:user,fid:fid,value:value
		}}
	//return this._base+'func=set_user_reputation&fid='+fid
	},
userRepu:function(fid){
	return this._base+"func=set_user_reputation&fid="+fid
	},
ufSetting:function(fid){
	return this._base+"func=userforum&act=manage&fid="+fid
	},
favorTopic:function(tid,pid,act){
	return this._base+"__lib=topic_favor&__act=topic_favor&action="+(act ? 'addopen_g' : 'add')+"&raw=3&tid="+tid+(pid? '&pid='+pid : '')
	},
favorTopicDel:function(tid,page){//tid=tid,tid_pid,tid,tid ...
	return {u:this._base+"__lib=topic_favor&__act=topic_favor&raw=3",a:{action:'del',tidarray:tid,page:page}}
	},
remarkAdd:function(uid,remark,pub){
	return {u:this._base,a:{__lib:'user_remark',__act:'add',uid:uid,remark:remark,pub:pub?1:'',raw:3}}
	},
remarkDel:function(uid,id){
	return {u:this._base,a:{__lib:'user_remark',__act:'del',uid:uid,rid:id,raw:3}}
	},
remarkGet:function(uid){
	return this._base+"__lib=user_remark&__act=get&raw=1&uid="+uid
	},
userInfo:function(uid,name){
	uid = uid ? "&uid="+uid :''
	name = name ? "&username="+name:''
	return this._base+"__lib=ucp&__act=get&lite=js"+uid+name
	},/*
editLock:function(tid,pid,lock){
	return {u:this._base, a:{__lib:'topic_lock', __act:'edit_lock', tid:tid, lock:(lock?1:0), pid:(pid?pid:0),raw:3} }
	},*/
messageNew:function(s,c,t,asuid,iso){
	return {
		u:this._base+"__lib=message&__act=message&act=new&raw=3"+(asuid?'&asuid='+asuid:'')+(iso?'&isolate=1':''),
		a:{subject:s, content:c, to:t}
		}
	},
messageReply:function(s,c,m,asuid){
	return {
		u:this._base+"__lib=message&__act=message&act=reply&raw=3"+(asuid?'&asuid='+asuid:''),
		a:{subject:s, content:c, mid:m}
		}
	},
messageAdd:function(t,m,asuid){
	return {
		u:this._base+"__lib=message&__act=message&act=add&raw=3"+(asuid?'&asuid='+asuid:''),
		a:{to:t, mid:m}
		}
	},
messageAddBlock:function(t,asuid){
	return {
		u:this._base+"__lib=message&__act=message&act=add_block&raw=3"+(asuid?'&asuid='+asuid:''),
		a:{buids:t}
		}
	},
messageDel:function(mid,asuid){
	return {
		u:this._base+"__lib=message&__act=message&act=del_topic&raw=3"+(asuid?'&asuid='+asuid:''),
		a:{mid:mid}
		}
	},
messageDelBlock:function(t,asuid){
	return {
		u:this._base+"__lib=message&__act=message&act=del_block&raw=3"+(asuid?'&asuid='+asuid:''),
		a:{buids:t}
		}
	},
messageLeave:function(mid,uid,asuid){
	return {
		u:this._base+"__lib=message&__act=message&act=leave_topic&raw=3"+(asuid?'&asuid='+asuid:''),
		a:{mid:mid,luid:uid}
		}
	},
messagelistBlock:function(asuid){
	return this._base+"__lib=message&__act=message&act=list_block&raw=1&rand="+Math.floor((new Date).getTime()/3000)+(asuid?'&asuid='+asuid:'')
	},
messageRead:function(mid,page,asuid){
	return this._base+'__lib=message&__act=message&act=read&raw=1&mid='+mid+'&page='+page+'&rand='+Math.floor((new Date).getTime()/3)+(asuid?'&asuid='+asuid:'')
	},
messageList:function(page,asuid){
	return this._base+'__lib=message&__act=message&act=list&raw=1&page='+page+'&rand='+Math.floor((new Date).getTime()/3)+(asuid?'&asuid='+asuid:'')
	},
vote:function(x,y){
	return {u:this._base,
		a:{__lib:'vote',__act:'vote',tid:x,voteid:y,raw:3}
		}
	},
voteSettle:function(x,y){
	return {u:this._base,
		a:{__lib:'vote',__act:'settle',tid:x,winid:y,raw:3}
		}
	},
delAttach:function(pid,tid,aid){
	return {u:this._base,
		a:{func:"delattach",pid:pid,tid:tid,aid:aid,raw:3}
		}
	},
notiGet:function(){
	return this._base+'__lib=noti&__act=get_all'
	},
notiTopicIgnore:function(tid,pid){
	return {u:this._base,
		a:{func:"noti_tag",no_hint:1,tid:tid,pid:pid?pid:0,raw:3}
		}
	},
topicMove2:function(tid,fid,pm,info,op,delay,stid){
	return {u:this._base,
		a:{__lib:"topic_move",__act:"move",tid:tid,fid:fid,pm:pm,info:info,op:op,delay:delay,stid:stid,raw:3}
		}
	},
getAvatar:function(uid){
	return {u:this._base,
		a:{__lib:"set_avatar",__act:"get",uid:uid,raw:3}
		}
	},
setAvatar:function(uid,a,d){
	return {u:this._base,
		a:{__lib:"set_avatar",__act:"set",uid:uid,avatar:a,disable:d?d:'',raw:3}
		}
	},
getSign:function(uid){
	return {u:this._base,
		a:{__lib:"set_sign",__act:"get",uid:uid,raw:3}
		}
	},
setSign:function(uid,s,d){
	return {u:this._base,
		a:{__lib:"set_sign",__act:"set",uid:uid,sign:s,disable:d?d:'',raw:3}
		}
	},
/*
topicMove:function(tid,fid,pm,info,notag,delay,stid){
	return {u:this._base,
		a:{__lib:"topic_move_2",__act:"move",tid:tid,fid:fid,pm:pm,info:info,notag:notag,delay:delay,stid:stid,raw:3}
		}
	},
topicQuote:function(tid,fid,mode){
	return {u:this._base,
		a:{__lib:"topic_move_2",__act:"quote",tid:tid,fid:fid,mode:mode,raw:3}
		}
	},
*/
topicPush:function(tid,down){
	return {u:this._base,
		a:{__lib:"topic_push",__act:"push",tid:tid,down:(down?1:''),raw:3}
		}
	},
setTopicAdmin:function(stid,admin){
	var a = (admin === undefined) ? 
		{__lib:"topic_set",__act:"update_admin",stid:stid,raw:3} : 
		{__lib:"topic_set",__act:"update_admin",stid:stid,admin:admin,raw:3}
	return {u:this._base,
		a:a
		}
	},
setTopicBlock:function(stid,block){
	var a = (block === undefined) ? 
		{__lib:"topic_set",__act:"update_block",stid:stid,raw:3} : 
		{__lib:"topic_set",__act:"update_block",stid:stid,block:block,raw:3}
	return {u:this._base,
		a:a
		}
	},
postGet:function(tid,pid,mode,fid,stid,isComment){
	if(!mode)mode = 'reply'
	return {
		u:'/post.php',
		a:{
			__output:3,
			action:mode,
			fid:fid?fid:'',
			tid:tid?tid:'',
			pid:pid?pid:'',
			stid:stid?stid:'',
			comment:isComment?1:''
			}
		}
	},/*
topicLock:function(tid,lock,pm,info,delay,cfid){
	return {u:this._base,
		a:{__lib:"topic_lock",__act:"lock",tid:tid,pm:pm,info:info,lock:lock,delay:delay,cfid:cfid,raw:3}
		}
	},*/
setPost:function(ids,ton,toff,pon,poff,pm,info,delay,cfid){
	return {u:this._base,
		a:{__lib:"topic_lock",__act:"set",ids:ids,ton:ton,toff:toff,pon:pon,poff:poff,pm:pm,info:info,delay:delay,cfid:cfid,raw:3}
		}
	},
topicColor:function(tid,font,nr){
	return {u:this._base,
		a:{__lib:"topic_color",__act:"set",tid:tid,nr:nr,font:font,raw:3}
		}
	},
logoutCurrent:function(){
	return {u:this._base,
		a:{__lib:"login",__act:"logout",logout_current_only:1,raw:3}
		}
	},
activeHelper:function(){
	return '/read.php?tid=6724814'
	},
forumSubscription:function(ufid,fid,type){//1 add 2 del
	return {u:this._base,
		a:{func:"save_subscription",ufid:ufid,fid:fid,type:type,raw:3}
		}
	},
lesserNuke:function(tid,pid,level,info,infos){
	return {u:this._base,
		a:{__lib:"lesser_nuke",__act:"lesser_nuke",tid:tid,pid:pid?pid:0,level:level,info:info,infos:infos,raw:3}
		}
	},
lesserNuke2:function(tid,pid,opt,info,infos,ifsk){
	return {u:this._base,
		a:{__lib:"nuke",__act:"lesser_nuke",tid:tid,pid:pid?pid:0,opt:opt,info:info,infos:infos,infosk:ifsk,raw:3}
		}
	},
topicTop:function(tid,level){
	return {u:this._base,
		a:{__lib:"topic_top",__act:"set",tid:tid,level:level?level:0,raw:3}
		}
	},
reputationLevelSet:function(fid,txt){
	if(!txt)txt=''
	return {u:this._base,
		a:{__lib:"reputation_level",__act:"set",fid:fid,txt:txt,raw:3}
		}
	},
reputationLevel:function(fid){
	return {u:this._base,
		a:{__lib:"reputation_level",__act:"get",fid:fid,raw:3}
		}
	},
extraAuth:function(code,reset){
	return {u:this._base,
		a:{__lib:"safe_reg",__act:"auth_code_check",code:code,reset:reset,raw:3}
		}
	},
userDebug:function(uid,day,type){
	return {u:this._base,
		a:{__lib:"admin_code",__act:"set_debug",uid:uid|0,day:day|0,type:type|0,raw:3}
		}
	},
post:function(){//参数按以下顺序
	var b = ['action',//操作
		'fid',//版面id
		'tid',//主题id
		'pid',//回复id
		'stid',//
		'post_subject',//标题
		'post_content',//内容
		'mention',//发送@提醒
		'hidden',//隐藏帖子 仅版主可见
		'self_reply',//只有作者和版主可回复
		'attachments',//附件
		'attachments_check',//附件校验
		'hidden_content',//隐藏的内容
		'filter_key',//有监视词
		'has_auto_translate',//有自动翻译词
		'hide_upload',//折叠上传文件
		'content_not_modify',//内容无修改
		'subject_not_modify',//标题无修改
		'from_device',//来自设备
		'from_client',//来自系统
		'newvote',//投票内容
		'newvote_type',// 0投票 1投注铜币
		'newvote_max',//每人最多可投 0不限
		'newvote_end',//小时后结束
		'newvote_betmax',//投注最大值
		'newvote_betmin',//投注最小值
		'newvote_limit',//投票的声望限制
		'modify_append',//修改时修改内容添加在原内容之后
		'comment',//评论/贴条回复
		'anony',//匿名
		'live',//直播
		'reply_anony',//回复匿名
		'topic_vote',//评分主题的打分
		'per_check_code'//验证码
		], a = {
		nojump:1,
		lite:'htmljs',
		step:2
		}
	for(var i=0;i<arguments.length;i++){
		if(arguments[i]==='' || arguments[i]===0 || arguments[i]===undefined || arguments[i]===null){}
		else
			a[b[i]] = arguments[i]
		}
	return {u:'/post.php',	a:a}
	},//fe
phpRawurlencode:function(text){//
	return {u:this._base,
		a:{__lib:"misc",__act:"php_rawurlencode",text:text,raw:3}
		}
	},
_gen:function(){
	var f = arguments[0]
	f.action = this._base
	for(var i=1;i<arguments.length;i+=2)
		f.appendChild(_$('input/').$0('type','hidden','name',arguments[i],'value',arguments[i+1]))
	},
_cache:'/data/bbscache/',
_base:'/nuke.php?'
}//ce









//==================================
//__SETTING 用户设置
//==================================
var __LITE = {}, __UA = {}//old
var __SETTING = {
o:null,

defB:65536,

bit:0,

bits:{
auto	:1, //所有设置自动

//所有尺寸都不设为自动尺寸
size24	:2, //24+大显示器
size10	:4,//10寸以下
size7	:8,//7寸以下
size4	:16, //4寸以下

lessPic	:64,//少图片
iframe	:128,//内嵌阅读
fontDef :256,//不指定中文字体 使用系统默认
fontHei	:512,//指定中文字体为微软雅黑(两个字体均未设则自动选择 (windows vista+雅黑 其他均不指定
embed	:1024,//客户端内嵌(bitfoot
inIframe:2048,//是否正在一个iframe中
touch	:4096,//是否支持触摸

touched :8192,//是否触摸过 非用户设置
orientation:16384, //是否支持旋转 非用户设置
notGenericDevice:32768, //是否是非桌面非笔记本的特殊设备 非用户设置

style0:65536, //使用样式0
style1:131072, //使用样式1
style2:262144, //使用样式2
autoPic:524288,//根据设备尺寸选择图片 仅在lessPic时有效
style3:1048576, //使用样式3
fontBig:2097152, //加大字体
fixWidth:4194304, //限制宽度

//判断条件
noTopBg : 1024 | 64 | 2048,//无背景
},
width:null,
cName:'uisetting',
css:'',

uA:{},// 0:浏览器 1ie 2chrome 3ff 1:浏览器版本 2:操作系统 1windows 2android 3osx 3:操作系统版本

UAInit:function (){
var u = window.navigator.userAgent.toLowerCase(), x,
a={0:0, // 1 ie, 2 chrome, 3 firefox, 4 opera, 5 safari, 6 edge, 7 micromessenger, 8 QQ
1:0,//.ver
2:0,//1 windows, 2 android, 3 osx, 4 ios, 5 windows phone
3:0,//.ver
4:0,//1 edge, 2 trident, 3 webkit, 4 gecko
5:0,//.ver
6:0//bit 1 tablet, 2 phone
}
x = u.match(/(msie|opr|opera|chromium|chrome|safari|firefox|micromessenger|MQQBrowser\s*QQ)\/?\s*(\.?[\d\.]+)/i)
if(x){
	a[1] = parseInt(x[2],10)
	a[0] = x[1]=='msie' ? 1 : (
				(x[1]=='chromium' || x[1]=='chrome') ? 2 : (
					x[1]=='firefox' ? 3 : (
						x[1]=='micromessenger' ? 7 : (
							x[1]=='safari' ? 5 : (
								(x[1]=='MQQBrowser QQ' || x[1]=='MQQBrowserQQ') ? 8 : (
									(x[1]=='opera' || x[1]=='opr') ? 4 : 0
									)
								)
							)
						)
					)
				)
	}
x = u.match(/(edge|trident|applewebKit|webkit|like gecko|gecko)\/?\s*(\.?[\d\.]+)/i)
if(x){
	a[5] = parseInt(x[2],10)
	a[4] = x[1]=='edge' ? 1 : (
				x[1]=='trident' ? 2 : (
					(x[1]=='applewebkit' || x[1]=='webkit') ? 3 : (
						x[1]=='gecko' ? 4 : 0
						)
					)
				)
	if(a[4]==1){//edge
		a[0] = 6
		a[1]==a[5]
		}
	else if(a[4]==2){//ie11
		if(a[5]==7)
			a[1]=11
		a[0] = 1
		}
	}
x = u.match(/(windows nt|windows phone os|windows phone|android|iphone os|mac os x|ios|linux)\/?\s*(\.?[\d\._]+)/i)
if(x){
	a[3] = parseInt(x[2],10)
	a[2] = x[1]=='windows nt' ? 1 : (
				x[1]=='android' ? 2 : (
					(x[1]=='iphone os' || x[1]=='ios') ? 4 : (
						x[1]=='mac os x' ? 3 : (
							(x[1]=='windows phone os' || x[1]=='windows phone') ? 5 : 0
							)
						)
					)
				)
	}

if(u.match(/iphone|mobile safari|IEMobile/i))//手机
	a[6] |= 2
else if(u.match(/mobile|Tablet|ipad/i) && a[2]!=1)//平板 一般只标注mobile而非mobile safari firefox标注tablet windows平板除外
	a[6] |= 1

if(a[0]==1 && a[1]<=6){
	try{
		document.execCommand('BackgroundImageCache',false,true)
		document.execCommandx('BackgroundImageCache',false,true)
	}catch(e){};
	window.isIE6=true;//
	}
this.uA = a
window.__UA = a//old
},

ui:function(){
var bit = __NUKE.toInt(__COOKIE.getMiscCookie(this.cName));

this.save(this.bits.auto,7)
this.o = commonui.createCommmonWindow()
this.o._.addContent(null)
var $ = window._$, self=this
this.o._.addTitle('界面设置');
var size24 = $('/input','type','radio','checked',0,'name','ssize'),
size24_10 = size24.cloneNode(),
size10_7 = size24.cloneNode(),
size7_4 = size24.cloneNode(),
size4 = size24.cloneNode(),
style = $('/input','type','radio','checked',0,'name','style__'),
style0 = style.cloneNode(),
style1 = style.cloneNode(),
style2 = style.cloneNode(),
style3 = style.cloneNode(),
sizeauto = size24.cloneNode(),
lessPic = $('/input','type','checkbox','checked',0),
iframe = lessPic.cloneNode(),
fontDef = $('/input','type','radio','checked',0,'name','font'),
fontHei = fontDef.cloneNode(),
fontAuto = fontDef.cloneNode(),
fontBig = lessPic.cloneNode(),
fixWidth = lessPic.cloneNode()


if(bit & this.bits.size24)
	size24.checked = true
else if(bit & this.bits.size4)
	size4.checked = true
else if(bit & this.bits.size7)
	size7_4.checked = true
else if(bit & this.bits.size10)
	size10_7.checked = true
else
	size24_10.checked = true

if(bit & this.bits.lessPic)
	lessPic.checked = true

if(bit & this.bits.iframe)
	iframe.checked = true
else{
	var a = this.uA
	if((bit & this.bits.size24) && (a[2]==2 || a[2]==4)){
		if((a[0]==1 && a[1]>=9) || (a[0]==2 && a[1]>=25) || (a[0]==3 && a[1]>=16) || (a[0]==4 && a[1]>=15) || (a[0]==5 && a[1]>=536))
		iframe.checked = true
		}
	}

if(this.uA[2]!=1){
	fontDef.disabled = fontHei.disabled = true
	fontAuto.checked=true
	}
else{
	if(bit & this.bits.fontDef)
		fontDef.checked = true
	if(bit & this.bits.fontHei)
		fontHei.checked = true
	else
		fontAuto.checked=true
	}

fontBig.checked = (bit & this.bits.fontBig) ? true : false
fixWidth.checked = (bit & this.bits.fixWidth) ? true : false

if(bit & this.bits.style0)
	style0.checked = true
if(bit & this.bits.style1)
	style1.checked = true
if(bit & this.bits.style2)
	style2.checked = true
if(bit & this.bits.style3)
	style3.checked = true
else
	style.checked = true

this.o._.addContent(

	size24.$0('onchange',function(){if(this.checked){iframe.checked=true;lessPic.checked=false}}),
	'我的屏幕太他妈大了',
	$('/br'),
	'　',fontBig,
	'加大字体',
	$('/br'),
	'　',fixWidth,
	'限制页面宽度',
	$('/br'),
	$(size24_10).$0('onchange',function(){if(this.checked){lessPic.checked=false}}),
	'自动判断尺寸 ',
	$('/span').$0('className','silver','innerHTML','普通电脑 手机/平板横/竖屏'),
	$('/br'),

	$(size10_7).$0('onchange',function(){if(this.checked){lessPic.checked=true}}),
	'屏幕尺寸在7~10寸 ',
	$('/span').$0('className','silver','innerHTML','平板横屏'),
	$('/br'),

	$(size7_4).$0('onchange',function(){if(this.checked){lessPic.checked=true}}),
	'屏幕尺寸在5~7寸 ',
	$('/span').$0('className','silver','innerHTML','手机横屏 平板竖屏'),
	$('/br'),

	$(size4).$0('onchange',function(){if(this.checked){lessPic.checked=true}}),
	'屏幕尺寸在5寸以下 ',
	$('/span').$0('className','silver','innerHTML','手机竖屏'),
	$('/br'),
	$('/br'),

	lessPic,
	'显示较少的图片',
	$('/br'),
	$('/span').$0('className','silver','innerHTML','手动加载图片 提高速度'),
	$('/br'),
	$('/br'),

	iframe,
	'在内嵌窗口中显示主题',
	$('/br'),
	$('/span').$0('className','silver','innerHTML','减少页面加载次数 提高速度 较大的显示器适用<sup>*</sup>','title','IE9+, IEMobile 10+, Chrome12+, Android broswer 4+, FireFox16+, Safari3.1+, iOS Safari4+'),
	$('/br'),
	$('/br'),

	fontAuto,
	'自动选择字体',
	$('/br'),
	fontDef.disabled ? null:  $('/span')._.add(
		fontDef,
		'系统默认字体',
		$('/br')
		),
	fontHei.disabled ? null:  $('/span')._.add(
		fontHei,
		'黑体',
		$('/br')
		),
	$('/br'),


	[ '界面色调',
	$('/br'),
	$(style),
	'默认 ',
	$(style0),
	'黄 ',
	$(style1),
	'青 ',
	$(style2),
	'紫 ',
	$(style3),
	'黑 ',
	$('/br'),
	$('/br')] ,

	$('/button')._.attr({innerHTML:'确定',type:'button'})._.on('click',function(){
			var x = this.parentNode.getElementsByTagName('input'),bit=0
			//尺寸
			if(size24_10.checked)
				bit=0
			else{
				if(size24.checked)
					bit = bit | self.bits.size24
				if(size10_7.checked)
					bit = bit | self.bits.size10
				if(size7_4.checked)
					bit = bit | self.bits.size7
				if(size4.checked)
					bit = bit | self.bits.size4
				}
			//图片
			if(lessPic.checked)
				bit = bit | self.bits.lessPic
			//内嵌
			if(iframe.checked)
				bit = bit | self.bits.iframe
			//字体
			if(self.uA[2]==1){
				if(fontDef.checked)
					bit = bit | self.bits.fontDef
				else if(fontHei.checked)
					bit = bit | self.bits.fontHei
				}

			if(style0.checked)
				bit = bit | self.bits.style0
			if(style1.checked)
				bit = bit | self.bits.style1
			if(style2.checked)
				bit = bit | self.bits.style2
			if(style3.checked)
				bit = bit | self.bits.style3
			
			if(fontBig.checked)
				bit = bit | self.bits.fontBig
			if(fixWidth.checked)
				bit = bit | self.bits.fixWidth		
			self.save(bit)
			alert('保存完毕，你可以在 主菜单>论坛设置>界面设置 中修改')
			window.location.reload()
			}
		),

	$('/button')._.attr({innerHTML:'取消(全自动)',type:'button'})._.on('click',function(){
			var bit=self.bits.auto
			self.save(bit)
			alert('保存完毕，你可以在 主菜单>论坛设置>界面设置 中修改')
			window.location.reload()
			}
		)
	)
this.o._.show()
},

get:function(k){
return this.bit & this.bits[k]
},
/*
initOld:function(){
var	bit = this.bit, bits = this.bits, w = window, c = w.__COOKIE

this.UAInit()

if ('ontouchstart' in document.documentElement || w.navigator.msMaxTouchPoints)
	bit = bit | bits.touch

if(w.navigator.userAgent.indexOf('d3-bigfoot')!=-1 || w.location.hash.indexOf('ua=d3-bigfoot')!=-1){
	bit = bit | bits.embed | bits.inIframe
	w.__LITE.embed=true//old
	}

var f = parseInt(c.getMiscCookie('globalfont'),10);
if(f==1)
	bit = bit | bits.fontHei
else if(f==2)
	bit = bit | bits.fontDef

if(parseInt(c.getMiscCookie('notLoadPAndS'),10)){
	bit = bit | bits.lessPic
	w.__LITE.notLoadPAndS=true//old
	}

if(parseInt(c.getMiscCookie('iframeread'),10)){
	bit = bit | bits.iframe
	}

if(w.commonui.checkIfInIframe && w.commonui.checkIfInIframe()){
	w.__LITE.inIframe=true//old
	bit = bit | bits.inIframe
	}

if(typeof(w.orientation) != 'undefined' || w.navigator.mozNotification)
	bit = bit | bits.notGenericDevice

bit = bit | bits.auto
this.bit = bit
var w = this.getWidth()
if(w)
	this.setWidth(w)
this.setfont()
this.setIframe()

},
*/
syncLoadStyle:function(def){
var s = 
(this.bit & this.bits.style0) ? 0 : (
	(this.bit & this.bits.style1) ? 1 : (
		(this.bit & this.bits.style2) ? 2 :	(
			(this.bit & this.bits.style3) ? 3 :	(
				(def ? def : 0)
				)
			)
		)
	)
for(var i=1;i<__STYLE[s].length;i++){
	if(__STYLE[s][i].match(/\.css[^\.]*$/))
		document.write("<link rel='stylesheet' href='"+__STYLE[s][i]+"' type='text/css'/>")
	else
		document.write('<scr'+'ipt src=\"'+__STYLE[s][i]+'\" type=\"text/javasc'+'ript\" onload="__SETTING.applyThemeColor()"></scr'+'ipt>')
	}
},

applyThemeColor:function(){
document.getElementsByTagName('head')[0].appendChild(	_$('/meta','name','theme-color','content',__COLOR.border4))
if(this.smwm)
	__COLOR.mwm = this.smwm
},

save:function(bit,day){
this.bit = bit
__COOKIE.setMiscCookieInSecond(this.cName,bit,86400*(day?day:90))
},

init:function(defS,obit){
var w=window, ci=commonui, n = w.__NUKE, bits = this.bits, c=w.__COOKIE, bit = obit ? obit : c.getMiscCookie(this.cName), self=this;
//if(w.navigator.userAgent.indexOf('d3-bigfoot')!=-1 || w.location.hash.indexOf('ua=d3-bigfoot')!=-1){
//	bit = bits.auto | bits.embed | bits.inIframe
//	w.__LITE.embed=true//old
//	}
this.defS = defS;
//if((__GP._bit & 4)||(__CURRENT_UID & 3)==3){
	if(bit===null){
		c.setMiscCookieInSecond(this.cName,'a',300)
		bit=bits.auto
		}
	else if(bit=='j'){
		ci.aE(window, 'DOMContentLoaded', function(){__SETTING.ui()})
		c.setMiscCookieInSecond(this.cName,'a',300)
		bit=bits.auto
		}
	else if(bit.toString().match(/^[a-i]$/)){
		c.setMiscCookieInSecond(this.cName,String.fromCharCode(bit.toString().charCodeAt(0)+1),300)
		bit=bits.auto
		}
//	}
//else if(bit===null)
//	bit=bits.auto

bit = n.toInt(bit)

this.UAInit()

if ('ontouchstart' in document.documentElement || w.navigator.msMaxTouchPoints)
	bit = bit | bits.touch

if(typeof(w.orientation) != 'undefined' || w.navigator.mozNotification)
	bit = bit | bits.notGenericDevice

if(ci.checkIfInIframe && ci.checkIfInIframe()){
	w.__LITE.inIframe=true//old
	bit = bit | bits.inIframe
	}

if(bit & bits.auto){//old
	var f = parseInt(c.getMiscCookie('globalfont'),10);
	if(f==1)
		bit = bit | bits.fontHei
	else if(f==2)
		bit = bit | bits.fontDef

	if(parseInt(c.getMiscCookie('notLoadPAndS'),10)){
		bit = bit | bits.lessPic
		w.__LITE.notLoadPAndS=true//old
		}

	if(parseInt(c.getMiscCookie('iframeread'),10)){
		bit = bit | bits.iframe
		}
	}

var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
if(conn && conn.type=='cellular')
	bit = bit | bits.lessPic


this.bit = bit

this.syncLoadStyle(defS)

if((this.width = (this.getWidth()|0))>0)
	this.setWidth(this.width)
else
	this.width*=-1
this.setfont()
this.currentClientWidth = __NUKE.position.get().cw
if(this.css)
	__NUKE.addCss(this.css)
//commonui.aE(window,'DOMContentLoaded',function(){__SETTING.currentClientWidth = __NUKE.position.get().cw})
},
/*
devPixDetect:function(){
var max=function(a,b){
	if(a>b) return a
	else	return b
},ww=window

//有方向感应的设备视为小尺寸手持设备检测解析度
//window.orientation for iosSafari androidDefault mqq ucweb
//window.navigator.mozNotification for mobileFirfox
if(typeof(ww.orientation) == 'undefined' && !ww.navigator.mozNotification)
	return window.innerWidth>50? window.innerWidth : ww.screen.width//没有方向的设备返回屏幕宽度

var w=max(ww.screen.width,ww.screen.height)

if(ww.innerWidth<ww.innerHeight)
	max=function(a,b){
		if(a<b) return a
		else	return b
		}
//console.log(ww.screen.width+'/'+ww.outerWidth+'/'+ww.outerHeight+'/'+ww.innerWidth+'/'+ww.innerHeight)

var cPix = ww.__COOKIE.getCookie('devPix')

if(!cPix){//跳转到解析度检测
	if(ww.document.referrer.indexOf('resolution_detect.html')==-1)
		ww.location.replace(ww.location.protocol+'//'+ww.location.host+'/nuke/resolution_detect.html?'+ww.location.href)//检测后会跳回
	else
		alert('屏幕解析度检测失败')
	}

if(cPix){//console.log(cPix)
	cPix = cPix.split('/')
	for(var i=0;i<cPix.length;i++){
		cPix[i]=parseInt(cPix[i],10) 
		if(!cPix[i])cPix[i]=0
		}

	}
else
	cPix = [480,320,480,320,1] //w.outerWidth w.outerHeight w.screen.width w.screen.height w.devicePixelRatio

if(this.uA[2]==2 && this.uA[3]<=2){//android<3
	if(ww.navigator.userAgent.toLowerCase().indexOf(' uc')!=-1){//uc
		if(cPix[2])
			w=max(cPix[2],cPix[3])
		else
			w = 480
		}
	else
		w=max(cPix[0],cPix[1])
	}
else
	w=max(cPix[2],cPix[3])

if(this.uA[2]==4)//ios
	w = w*cPix[4]

//推荐分辨率 = 实际分辨率/devicePixelRatio
//推荐分辨率一般较低 故尔将devicePixelRatio成比例减小一些 1->1 2->1.5
if(cPix[4])
	w = Math.floor(w/((cPix[4]+1)*0.5))

if(w==0)
	w=480

return w
},
*/
getWidth:function(){

var ww=window, w, s=this.bits, b = this.bit,scw = 19//在body出现之前无法得到滚动条宽度 预设一个
sss = function(o){
	b |= s.size10 | s.size7 | s.size4 | o
	w=525
	ww.__VERY_SMALL_SCREEN = ww.__SMALL_SCREEN = true//old
	},
ss = function(o){
	b |= s.size10 | s.size7 | o
	ww.__SMALL_SCREEN = true//old
	w=700
	},
mm = function(o,z){
	b |= s.size10 | o
	w=z
	}

if(b & s.embed){//如果是嵌入客户端
	b = 0
	sss(s.lessPic)
	var m = ww.navigator.userAgent.match(/size(\d+)\*(\d+)/)
	if(m)
		w=m[1]|0
	else if(ww.location.hash){
		m = ww.location.hash.match(/size=(\d+)_(\d+)/)
		if(m)
			w=m[1]|0
		}
	}
else if( (b&(s.size10|s.size7|s.size4|s.size24))==0 || (b & s.auto)){//如果没设尺寸或选择自动
	if(this.uA[6]&1){//tablet
		if(ww.innerWidth>ww.innerHeight && ww.innerWidth>700)//横屏
			mm(0,ww.innerWidth<950?1000:ww.innerWidth)
		else//竖屏
			ss(s.autoPic|s.lessPic)
		}
	else if(this.uA[6]&2){//phone
		if(ww.screen.width>ww.screen.height)//横屏
			ss(s.autoPic|s.lessPic)
		else//竖屏
			sss(s.autoPic|s.lessPic)
		}
	else{//def PC  document.documentElement.clientWidth
		w= (ww.innerWidth>50? ww.innerWidth : ww.screen.width)-scw//返回浏览器宽度或屏幕宽度
		//console.log(document.documentElement.clientWidth+' '+ww.innerWidth+' '+ww.screen.width)
		if(w<=550)//525*1.05
			sss(s.autoPic|s.lessPic)
		else if(w<=735)//700*1.05
			ss(s.autoPic|s.lessPic)
		else if(w<=987)//940*1.05
			mm(0,(b & s.inIframe) ? w=w*-1 : 940)
		else if(w<=1000)
			mm(0,(b & s.inIframe) ? w=w*-1 : 1000)
		else
			w=w*-1
		}
	/*
	w = this.devPixDetect()
	if (w>0){
		if(w<625){
			w =525
			this.bit = b | s.size10 | s.size7 | s.size4 | ((b & s.auto) ? s.lessPic : 0)
			ww.__VERY_SMALL_SCREEN = ww.__SMALL_SCREEN = true//old
			}
		else if (w<700){
			w=625
			this.bit = b | s.size10 | s.size7 | ((b & s.auto) ? s.lessPic : 0)
			ww.__SMALL_SCREEN = true//old
			}
		else if(w<=1000){
			w=700
			this.bit = b | s.size10 | ((b & s.auto) ? s.lessPic : 0)
			ww.__SMALL_SCREEN = true//old
			}
		else
			w=0
		}
	else
		w=0
	*/
	}
else{//如果设了尺寸
	w= (ww.innerWidth>50? ww.innerWidth : ww.screen.width)-19//返回浏览器宽度或屏幕宽度 在body出现之前无法得到滚动条宽度
	if(b & s.size4)
		sss(0)
	else if(b & s.size7)
		ss(0)
	else if(b & s.size10)
		mm(0,w*-1)
	else
		w=w*-1
	}
this.bit=b
return w
},


setfont:function(){
var bit = this.bit, bs = this.bits
if((bit & (bs.fontHei | bs.fontdef))==0){
	if (this.uA[2]==1){
		if (this.uA[3]>=6)
			bit = bit | bs.fontHei
		}
	else
		bit = bit | bs.fontDef
	}
if((bit & (bs.size10 | bs.size7 | bs.size4)) == 0 ){
	if(bit & bs.fontBig)
		this.css+='\nbody {font-size:14px}'
	}
	
if( (bit & bs.fixWidth) && window.innerWidth>1920)
	this.css+='\n#mc {max-width:1900px;margin:auto}'

if(bit & bs.fontHei){
	//this.css+='body, textarea, select, input, button {font-family:Microsoft Yahei, 微软雅黑, Verdana, Tahoma, Arial, sans-serif}'
	if(this.uA[2]==3 || this.uA[2]==4)
		this.css+='\nbody, textarea, select, input, button {font-family:"Helvetica Neue", Helvetica, Verdana, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif}'
	else
		this.css+='\nbody, textarea, select, input, button {font-family:Verdana, Tahoma, Arial, "Microsoft YaHei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif}'
	}
if(this.uA[4]==3 || this.uA[4]==1){//webkit/edge
	if(this.uA[0]==5){//safari
		if(bit & bs.size10)//small screen tablet or phone
			this.css+='\nbutton, .small_colored_text_btn, .block_txt {line-height:1.25em;padding-top:0;padding-bottom:0.15em} \n .vertmod{vertical-align:0.083em} \n .nav_root, .nav_link, .nav_spr {padding-bottom:0.15em;} \n .stdbtn a {padding-bottom:0.15em;}'
		else
			this.css+='\nbutton, .small_colored_text_btn, .block_txt {line-height:1.35em;padding-top:0.05em;padding-bottom:0} \n .vertmod{}'
		}
	else{
		if(bit & bs.size10)//small screen tablet or phone
			this.css+='\nbutton, .block_txt {line-height:1.4em;padding-top:0.1em;padding-bottom:0} \n .small_colored_text_btn {line-height:1.5em;padding-top:0;padding-bottom:0} \n .vertmod{vertical-align:0.083em} \n .nav_root, .nav_link, .nav_spr {padding-top:0.15em;} \n .stdbtn a {padding-top:0.15em;}'
		else
			this.css+='\nbutton, .block_txt {line-height:1.4em;padding-top:0.1em;padding-bottom:0} \n .small_colored_text_btn {line-height:1.5em;padding-top:0;padding-bottom:0} \n .vertmod{vertical-align:0.083em}'
		}
	}
else	
	this.css+='\nbutton, .block_txt {line-height:1.4em;padding-top:0.1em;padding-bottom:0} \n .small_colored_text_btn {line-height:1.5em;padding-top:0;padding-bottom:0} \n .vertmod{vertical-align:0.083em}'
},

smwm:0,
setWidth:function(w){
var h = document.getElementsByTagName('head')[0], ww = window, fz = this.bit & this.bits.size7 ? true : false
h.appendChild(_$('</meta>')._.attr({name:'viewport',content:'width='+w}))
this.smwm = 3
if(window.__COLOR)
	__COLOR.mwm = this.smwm
this.css+='\n@-ms-viewport {width:'+w+'px}\nbody {font-size:'+(fz?19:16)+'px} \nbody * {max-height:50000em;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%; -ms-text-size-adjust:100%}\n.posterInfoLine {font-size:0.85em}\nbody , #minWidthSpacer {width:'+w+'px} \n #adsc1, #_178NavAll_110906_765453, #mc , #custombg {width:'+w+'px;overflow:hidden} \n .urltip, .urltip2, .default_tip {font-size:1em} \n .notLoadImg #mainmenu {margin-bottom:0px} \n .single_ttip2 {max-width:'+w+'px}\n.postrow td.c1 {display:none} \n.module_wrap {margin-left:'+this.smwm+'px;margin-right:'+this.smwm+'px}\n.adsc {max-width:'+w+'px;overflow:hidden}\n.navhisurltip {line-height:2em;margin-top:2.5em}\n.navhisurltip .star {margin-top:0.5em} \n #m_nav .bbsinfo {display:none} \n #iframereadc {border-left-width:1px} \n #m_cate5 {font-size:0.736em} \n #postsubject {display:none}'
ww.commonui.aE(window,'DOMContentLoaded',function(){document.body.style.width='auto',$('mc').style.overflow='visible'})

},

setIframe:function(){
if(this.bit & this.bits.iframe)
	__SCRIPTS.asyncLoad( 'iframeRead2' , function(){iframeRead.init()} )
//if( window.__DEBUG/* || (window.matchMedia && matchMedia('(display-mode: standalone)').matches)*/)
//	__SCRIPTS.asyncLoad( 'loaderRead' , function(){_LOADERREAD.init()} )
}
}//ce










//==================================
//与论坛特性无关的基础功能 level1
//==================================
{
//事件注册=====================
;(function(){
var F_BDL=[],F_BDI=[],F_BPO=[]
commonui.aE=function(obj,e,fn) {
if (e=='DOMContentLoaded'){
	F_BDL.push(fn)
	if(F_BDL.done)fn()
	return
	}
else if(e=='bodyInit'){
	F_BDI.push(fn)
	if(F_BDI.done)fn()
	return
	}
else if (e=='beforeunload' || e=='pagehide')
	e= ('onpagehide' in window) ? 'pagehide' : 'beforeunload'
else if (e=='beforepost'){
	F_BPO.push(fn)
	return
	}

if (obj.addEventListener)
	obj.addEventListener(e,fn,false)
else if (obj.attachEvent)
	obj.attachEvent('on'+e,function(ee){if(!ee)ee=window.event;fn.call(obj,ee)})
}//fe
commonui.dE=function(obj,e,fn){
if (obj.removeEventListener)
	obj.removeEventListener(e,fn,false)
}//fe
commonui.triggerEventDOMContentLoadedAct = function(){
for (var i=0;i< F_BDL.length;i++)
	F_BDL[i]()
F_BDL.done=true
}//fe
commonui.triggerEventBodyInit = function(){
for (var i=0;i< F_BDI.length;i++)
	F_BDI[i]()
F_BDI.done=true
}//fe
commonui.triggerEventBeforePost = function(){
for (var i=0;i< F_BPO.length;i++)
	F_BPO[i]()
}//fe
})();

//事件取消=====================
commonui.cancelBubble=function(e){
if (!e) var e = window.event;
e.cancelBubble = true;
if (e.stopPropagation) e.stopPropagation()
return false
}
commonui.cancelEvent=function(e){
if (!e) var e = window.event;
e.returnValue = false
if (e.preventDefault) e.preventDefault()
return false
}

//事件生成=====================
commonui.triggerEvent = function(o,n){
var e,w=window;
  if (w.document.createEvent) {
    e = w.document.createEvent("HTMLEvents");
    e.initEvent(n, true, true);
  } else {
    e = w.document.createEventObject();
    e.eventType = n;
  }

  //e.eventName = eventName;
  //e.memo = memo || { };

  if (w.document.createEvent) {
    o.dispatchEvent(e);
  } else {
    o.fireEvent("on" + e.eventType, e);
  }
}
//foreach==================
commonui.forEach=function(H,f){
for(var i=0;i<H.length;i++)
	f(i,H[i])
}//

//mouseleave==================
commonui.ifMouseOut=function(e,o){
var /*t = e.srcElement ? e.srcElement : e.target, */r = e.relatedTarget ? e.relatedTarget : e.toElement;
while (r && r != o && r.nodeName != 'BODY')
	r= r.parentNode
if (r==o) return;
return true
}//fe

/**
 *[url,protocol,host,pathname,search,hash]
 */
commonui.urlToAry = function(u){
if(u = u.match(/^(?:(https?:|ftp:|)\/\/)?([^\x00-\x20\/><"']*)([^\x00-\x1f\?><"']*)([^\x00-\x1f#><"']*)([^\x00-\x1f><"']*)$/i)){
	u = {protocol:u[1]?u[1]:'https:',host:(u[2]?unescape(u[2]).toLowerCase():location.host),pathname:u[3]?u[3]:'/',search:u[4]?u[4]:'',hash:u[5]?u[5]:''}
	u.url = u.protocol+'//'+u.host+u.pathname+u.search+u.hash
	return u
	}
}//fe

//遍历
//opt&1 'k,v,k,v...'
//opt&2 {k:v,k:v...}
commonui.uniEach = function(dat,f,opt){
if(opt&1){
	var k='',v='',j=0,i=0
	while(j<dat.length){
		i=dat.indexOf(',',j)
		k = dat.substr(j,i>-1?i-j:undefined)
		j=i>-1?i+1:dat.length
		i=dat.indexOf(',',j)
		v = dat.substr(j,i>-1?i-j:undefined)
		f(k,v)
		j=i>-1?i+1:dat.length
		}
	}
else if(opt&2){
	for(var k in dat)
		f(k,dat[k])
	}
}//

//兼容属性名获取================
commonui.compPropName = function(a,b){
if(b.toLowerCase() in a)
	return b.toLowerCase()
var c= this.compatibleCheck.c
for(var k in c)
	if(c[k]+b in a)
		return c[k]+b
}//fe
commonui.compPropName.c= {0:'moz',1:'webkit',2:'ms',3:'o',4:'khtml'}

//以中文显示长度为单位截取字符串==
/**
 *@param s 字符串
 *@param l 超过此长度将被截断
 *@param t 截断到此长度 不设等于l
 *@param 截断后在末尾连接的字符串 不设为空
 */
commonui.cutstrbylen=function(s,l,t,a)
{
var j = 0.0, c, z;
if(s===undefined || s.constructor!=String)
	s = new String(s)
for (var i=0;i<s.length;i++){
	c = s.charCodeAt(i);
	if (c > 127)
		j = j+1;
	else if ( (c<=122 && c>=97)||(c<=90 && c>=65) )
		j = j+0.65;
	else
		j = j+0.35;
	if (t && !z && j>=t)
		z = i
	if (j>=l)
		return s.substr(0,(z ? z : i)+1)+(a===undefined ? '' : a);
	}
return s;
}

//时间转日期===================
commonui.time2date = function(t,f){
if(!t)return '';
if(!this._time2date_date)this._time2date_date=new Date;
var y=this._time2date_date;
y.setTime(t*1000);
if(!f)f='Y-m-d H:i:s'
var x = function(s){s=String(s);if(s.length<2)s='0'+s;return s}
f = f.replace(/([a-zA-Z])/g,function($0,$1){
	switch ($1)
		{
		case 'Y':
			return y.getFullYear()
		case 'y':
			$1 = String(y.getFullYear())
			return $1.substr($1.length-2)
		case 'm':
			return x(y.getMonth()+1)
		case 'd':
			return x(y.getDate())
		case 'H':
			return x(y.getHours())
		case 'i':
			return x(y.getMinutes())
		case 's':
			return x(y.getSeconds())
		}
	})
return f
}//fe
commonui.time2shortdate=function(t,f){
if(!f)f='y-m-d H:i'
return this.time2date(t,f)
}//fe

//时间转时段===================
commonui.time2dis = function(y,f)
{
if(!this.time2dis.now){
	if (window.__NOW)
		this.time2dis.now = __NOW
	else{
		this.time2dis.now = new Date;
		this.time2dis.now = Math.floor(this.time2dis.now.getTime()/1000)
		}
	var z = new Date(this.time2dis.now*1000)
	z.setHours(0,0,0)
	this.time2dis.nowDayStart = Math.floor(z.getTime()/1000)
	z.setDate(1)
	z.setMonth(0)
	this.time2dis.nowYearStart = Math.floor(z.getTime()/1000)
	}

var x = this.time2dis.now-y,z=''

if (x<4500){
	z='分钟前'
	if(x<60)
		x="刚才"
	else if(x<450)
		x=5+z
	else if(x<750)
		x=10+z
	else if(x<1050)
		x=15+z
	else if(x<1350)
		x=20+z
	else if(x<1650)
		x=25+z
	else if(x<2100)
		x=30+z
	else if(x<2700)
		x=40+z
	else if(x<3300)
		x=50+z
	else
		x='1小时前'
	}
else{
	if (y>(this.time2dis.nowDayStart-172800)){
		if (y>this.time2dis.nowDayStart)
			z='今天'
		else if (y>(this.time2dis.nowDayStart-86400))
			z='昨天'
		else
			z='前天'
		z+=' H:i'
		}
	else if(y>this.time2dis.nowYearStart)
		z='m-d H:i'
	else
		z=f?f:'Y-m-d'
	x = this.time2date(y,z)
	}

return x;
}//fe

//获取样式=====================
;(
function(){
if(window.getComputedStyle){
	var x = window.document.defaultView.getComputedStyle
	commonui.getStyle = function(o,s){
		return x(o,null)[s]
		}
	}
else{
	commonui.getStyle = function(o,s){
		try{
			return o.currentStyle[s]
			}
		catch(e){
			return ''
			}
		}
	}
}//fe
)();

//获取border+padding的值
commonui.getPad=function(o){
var x = [0,0,0,0], y=function(z){
	var b = []
	commonui.getStyle(o,z).replace(/[-\d\.]+/g,function($0){b.push(Math.round($0))})
	if(b[0]===undefined)return
	if(b[1]===undefined)
		x[2]+=b[0],x[0]+=b[0],x[3]+=b[0],x[1]+=b[0]
	else if(b[2]===undefined)
		x[2]+=b[0],x[0]+=b[0],x[3]+=b[1],x[1]+=b[1]
	else if(b[3]===undefined)
		x[0]+=b[0],x[1]+=b[1],x[2]+=b[2],x[3]+=b[1]
	else
		x[0]+=b[0],x[1]+=b[1],x[2]+=b[2],x[3]+=b[3]
	}
y('borderWidth')
y('padding')
return x
}//fe

//获取高度=====================
commonui.getScroll=function (){
var x = document.documentElement.scrollLeft || document.body.scrollLeft || 0;
var y = document.documentElement.scrollTop || document.body.scrollTop || 0;
return {x:x,y:y}
}//fe

//移除自身=====================
commonui.removeSelf= function(o){
o.parentNode.removeChild(o)
}

//获取前一个/后一个元素=========
/**
 *o this
 *p <0向左 >0向右
 *s &1 block &2 inline &4 invert &8 hide this
 */
commonui.sw = function(o,p,s){
var n = (p<0)?'previousSibling':'nextSibling', pp = o
while(pp = pp[n]){
	if((--p)==0){
		n = (s&1)?'block':((s&2)?'inline':'')
		pp.style.display =  ((s&4) && pp.style.display==n) ? 'none' : n
		if(s&8)o.style.display='none'
		break;
		}
	}
}

//获取控件输入值================
commonui.getInputValue = function(f,n){
var x = f.elements.namedItem(n)
if(!x){
	for(var i=0;i<f.elements.length;i++){//old ie
		if(f.elements[i].name==n)
			x=f.elements[i]
		}
	}
if(!x.nodeName && x.length){
	for(var i=0;i<x.length;i++){
		if(x[i].checked)
			return x[i].value
		}
	return
	}
if(x.nodeName=='select')
	return x.options[x.selectedIndex].value
if(x.type=='checkbox')
	return x.checked ? 1 :''
return x.value
}

//获取body的字体尺寸px==========
;(function(){
var s = 0
commonui.getBaseFontPx = function(){
return s ? s : (s = parseInt(commonui.getStyle(document.body,'fontSize'),10))
}//fe
})();

//颜色转换=====================
commonui.rgbToHsv=function(r, g, b){//0-255
if(g===undefined)
	var g=r[1],b=r[2],r=r[0]
r = r/255, g = g/255, b = b/255;
var max = Math.max(r, g, b), min = Math.min(r, g, b);
var h, s, v = max;

var d = max - min;
s = max == 0 ? 0 : d / max;

if(max == min){
	h = 0; // achromatic
}else{
	switch(max){
		case r: h = (g - b) / d + (g < b ? 6 : 0); break;
		case g: h = (b - r) / d + 2; break;
		case b: h = (r - g) / d + 4; break;
	}
	h /= 6;
}

return [h, s, v];//0~1
}//fe

commonui.getRGBFromStyle=function(s){
if(!s)return null
if(s.substr(0,1)=='#')
	s = this.hexToRgb(s)
else{
	s = s.match(/\d+/g)
	for(var i=0;i<s.length;i++)
		s[i]=s[i]|0
	}
return s
}

/*
function calcDis(x,y,z){
var c = commonui
x = c.hexToRgb(x)
x = c.rgbToHsv(x)
y = c.hexToRgb(y)
y = c.rgbToHsv(y)
z = c.hexToRgb(z)
z = c.rgbToHsv(z)

//d = [y[0]-x[0],y[1]-x[1],y[2]-x[2]]
d = [y[0]/x[0],y[1]/x[1],y[2]/x[2]]
//z = [z[0]+d[0],z[1]+d[1],z[2]+d[2]]
z = [z[0]*d[0],z[1]*d[1],z[2]*d[2]]
return c.rgbToHex(c.hsvToRgb(z))
}

*/

commonui.hsvToRgb=function(h, s, v){//0~1
if(s===undefined)
	var s=h[1],v=h[2],h=h[0]
var r, g, b;

var i = Math.floor(h * 6);
var f = h * 6 - i;
var p = v * (1 - s);
var q = v * (1 - f * s);
var t = v * (1 - (1 - f) * s);

switch(i % 6){
	case 0: r = v, g = t, b = p; break;
	case 1: r = q, g = v, b = p; break;
	case 2: r = p, g = v, b = t; break;
	case 3: r = p, g = q, b = v; break;
	case 4: r = t, g = p, b = v; break;
	case 5: r = v, g = p, b = q; break;
}

return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];//0-255
}//fe

commonui.hexToRgb=function (h){
if (h.length>4){
	h = h.match(/[0-9a-f]{2}/ig)
	return [ ("0x"+h[0])- 0, ("0x"+h[1])- 0, ("0x"+h[2])- 0]
	}
h = h.match(/[0-9a-f]/ig)
return [ ("0x"+h[0]+h[0])- 0, ("0x"+h[1]+h[1])- 0, ("0x"+h[2]+h[2])- 0]
}//fe

/**
 * 
 * @param rgb [r,g,b] or 'rgb(a)0~255,0~255,0~255'
 * @returns #hexcolor
 */
commonui.rgbToHex=function (rgb){
if(rgb.constructor==String)
	rgb = rgb.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
else
	rgb.unshift(0)
if(rgb){
	for (var h='#',i=1; i<4; i++)
		h+=("0" + parseInt(rgb[i],10).toString(16)).slice(-2)
	return h
	}
else
	return ''
}//fe

/**
 * 
 * @param rgb [r,g,b] or hexcolor
 * @param h 0~1
 * @param s 0~1
 * @param v 0~1
 * @returns #hexcolor
 */
commonui.relativeColor=function(rgb,h,s,v){
var c = rgb.constructor==String ? this.hexToRgb(rgb) : rgb
c = this.rgbToHsv(c[0],c[1],c[2])
c[0]=Math.abs(h+c[0])
if(c[0]>1)
	c[0]-=1
c[1]+=s
if(c[1]<0)c[1]=0
if(c[1]>1)c[1]=1
c[2]+=v
if(c[2]<0)c[2]=0
if(c[2]>1)c[2]=1
c = this.hsvToRgb(c[0],c[1],c[2])
return this.rgbToHex(c)
}//fe

/**
 * 
 * @param c [hexcolor1,hexcolor2]
 * @param m 0~2
 * @returns {Array}
 */
commonui.colorDiff=function(c,m){
for(var i=0;i<c.length;i++){
	c[i] = c[i].constructor==String ? this.hexToRgb(c[i]) : c[i]
	c[i] = this.rgbToHsv(c[i][0],c[i][1],c[i][2])
	}
return [(c[1][0]-c[0][0])*m, (c[1][1]-c[0][1])*m, (c[1][2]-c[0][2])*m]
}//fe



commonui.fillDefault=function(m,d){
for(var k in m){
	if(typeof m[k]=='object'){
		if(k in d)
			this.fillDefault(m[k],d[k])
		else
			d[k]=m[k]
		}
	else if(!(k in d))
		d[k]=m[k]
	}
}//fe



;(function(){
var o = document.write, w = function(x){
commonui.eval.documentWrite+=x+''
}//

commonui.eval = function(script){
this.eval.documentWrite = ''
document.write = w
try{
	eval.call(window,script)
	//Function("with(window){\n"+script+"\n}")()
	}
catch(e){
	console.log(e,script)
	}
document.write = o
}//fe

})();

commonui.parentAHerf = function(o){
if(o.nodeName=='A')
	return o
for(var i =0;i<4;i++){
	o=o.parentNode
	if(!o)return
	if(o.nodeName=='A')return o
	}
}//fe



}//be






//==================================
//与论坛特性无关的基础功能 level2
//==================================
{
//累加并设置主容器marginright宽度
//返回之前的marginright
;(function(){
var mW=0
commonui.addMmcMargin= function(w){
	mW += w
	__NUKE.addCss("#mmc {margin-right:"+mW+"px}")
	__NUKE.position.mr = mW
	return mW-w
	}
})();


//标准按钮=====================
commonui.stdBtns = function(){

var $=_$,y = $('/tr') , x = $('/table','className','stdbtn','cellSpacing',0)._.add($('/tbody')._.add( y ))

//tr
x._.__tr = y
//length
x._.__length=0
//右添加一个单元
/**
 * 
 * @param {type} a 按钮单元
 * @param {type} opt &1添加到最左 &2加载长点功能（this.__islongclick时为超过500毫秒的长点）
 * @returns {undefined}
 */
x._.__add = function(a,opt){
	this.__length++
	if((opt&2) || a.__islongclick){
		a.$0(
			'onmousedown',function(e){
				var o = this
				o.__islongclick = 0
				o.__stdbtndowntime = e.timeStamp
				o.__stdbtntimeout1 = window.setTimeout(function(){
					o.style.color='#fff'
					o.style.backgroundColor=__COLOR.border0
					}, 500) 
				o.__stdbtntimeout2 = window.setTimeout(function(){
					o.style.color=o.style.backgroundColor=''
					}, 1200) 
				},
			'onmouseup',function(e){
				if(this.__stdbtndowntime && e.timeStamp-this.__stdbtndowntime>=500)
					this.__islongclick=1
				if(this.__stdbtntimeout1)
					window.clearTimeout(this.__stdbtntimeout1)
				this.style.color=this.style.backgroundColor=''
				}
			)
		a.__islongclick = 0
		}
	if(opt & 1)
		this.__tr.insertBefore($('/td')._.add(a),this.__tr.firstChild)
	else
		this.__tr.appendChild($('/td')._.add(a))
	}
//左添加一个单元
x._.__ins = function(a){
	this.__add(a,1)
	}
//移除一个 指定index或者最后一个
x._.__remove = function(i){
	if(i)
		this.__tr.removeChild(this.__tr.childNodes[i])
	else
		this.__tr.removeChild(this.__tr.lastChild)
	this.__length--
	}
//清除左侧圆角
x._.__cL = function(x){
	var f = function(o,x){
		x = x?'Right':'Left'
		o.style['borderTop'+x+'Radius']=o.style['borderBottom'+x+'Radius']='0';
		}
	f( x?this.__tr.lastChild.firstChild:this.__tr.firstChild.firstChild ,x)
	f(this.self,x)
	}
//清除右侧圆角
x._.__cR = function(){
	this.__cL(1)
	}
return x
/*
if(__SETTING.uA[0]!=1 || __SETTING.uA[1]>8)
	return x

x._.__setStyleBak={}
x._.css=function(){
	if(arguments.length==1){
		var o = arguments[0]
		for (var k in o)
			this.__setStyleBak[k]=this.self.style[k]=o[k]
		}
	else
		for(var i=0;i<arguments.length;i+=2)
			this.__setStyleBak[arguments[i]]=this.self.style[arguments[i]]=arguments[i+1]
	return this.self
	}
x._.__vml = function(no){
	if(__SETTING.uA[0]==1 && __SETTING.uA[1]<=8){}
	else return this.self

	if(this.__length==0)
		return this.self

	var x = this.self, y = x.firstChild

	if(y.nodeName!='tr')
		y = y.firstChild
	x.className +=' stdbtnie'
	y.firstChild.className+=' first'
	y.lastChild.className+=' last'
	
	if (!__SETTING.__loadVml){
		__SETTING.__loadVml = true
		document.namespaces.add("vml", "urn:schemas-microsoft-com:vml")
		}
		
	var z = document.createElement("div"), r = document.createElement("vml:roundrect")
	r.strokecolor=__COLOR.border1
	r.strokeweight="1px"
	r.fillcolor = '#fff'
	var y=x.getBoundingClientRect(), w = y.right-y.left, h = y.bottom-y.top
	r.style.width = (w-1)+'px'//vml宽度多一像素
	r.style.height = (h-1)+'px'//vml高度多一像素
	//r.coordorigin="0px 0px"
	//r.coordsize = (w-1)+' '+(h-1)
	//r.path = coords(true, (w-1), (h-1), [5,5,5,5], 0, 0, 1)
	r.className = 'stdbtnvml'
	if(no&1)
		r.arcsize = '0'
	else
		r.arcsize = '0.1'

	if(no&2){
		for(var k in x._.__setStyleBak){
			x.style[k]=''
			z.style[k]=x._.__setStyleBak[k]
			}
		}
	z.style.width = w+'px'
	z.style.height = h+'px'

	z.appendChild(r)
	x.parentNode.replaceChild(z,x)	
	r.appendChild(x)
	return z
	}
return x*/
}//fe

//inline tip生成===============
commonui.genTip={
style:{
backgroundColor:'#fffee1',
border:'1px solid #444',
padding:'0px 2px 1px 2px',
textDecoration:'none',
position:'absolute',
display:'none',
lineHeight:'1.33em',
marginTop:'-1.2em',
borderRadius:'3px'
},
add:function (o,oo,arg){//arg.triggerElm 触发node  arg.hide=1 移出触发元素既消失
if(typeof(o)=='string')
	o=$(o)
var t = document.createElement('span')
	t.name='tip'
if (typeof(oo)=='string')
	t.innerHTML = oo
else
	t.appendChild(oo)
for (var k in this.style)
	t.style[k]=this.style[k]
if (arg && arg.margin)
	t.style.marginTop = typeof(arg.margin)=='number'? arg.margin+'px' : arg.margin
//else
//	t.style.marginTop = '-'+(o.offsetHeight-1)+'px'
o.parentNode.insertBefore(t,o)
if(arg && arg.triggerElm)o=arg.triggerElm
o._tip = t
t._parent = o
o.onmouseover = function(){this._tip.style.display='inline'}
if(arg && arg.hide==1){
	o.onmouseout = function(e){
		if (commonui.genTip.checkTo(e,this))
			this._tip.style.display='none'
		}
	}
else{
	o.onmouseout = function(e){
		if (commonui.genTip.checkTo(e,this,this._tip))
			this._tip.style.display='none'
		}
	t.onmouseout = function(e){
		if (commonui.genTip.checkTo(e,this,this._parent))
			this.style.display='none'
		}
	}
},//fe
checkTo:function (e,o,oo){
if (!e) var e = window.event;
var j = e.relatedTarget || e.toElement
for(var i=0;i<4;i++){
	if(!j)
		break
	if(j==o)
		return
	if(oo && j==oo)
		return
	j=j.parentNode
	}
return 1
}//fe

}//ce


;(function(){
if(!window.addEventListener || !('onmessage' in window)){
	commonui.crossDomainCall=function(opt, host, callname, callback, arg){if(callback)callback()}
	commonui.crossDomainCall.setCallBack=function(){}
	return
	}

var F={},CB={
locationReload : function(){
	window.location.reload()
	},
closeAccountUi : function(){
	commonui.accountAction.close()
	}
},CALL = function(opt,act,tar){
//	d = this.urlToAry(document.referrer),d = d.protocol+'//'+d.host
if(opt & 1)
	return window.parent.postMessage(act, tar)
var a = arguments
if(!F[tar]){
	//if(document.body)
	//	document.body.insertBefore(
	//		F[tar]= _$('/iframe','style','display:none','src', tar+'/crossdomain.html','onload',function(){this.__loaded=1;CALL.apply(window,a)}),
	//		document.body.firstChild)
	//else
		commonui.aE(window,'bodyInit',function(){
			document.body.insertBefore(
				F[tar]= _$('/iframe','style','display:none','src', tar+'/crossdomain.html','onload',function(){this.__loaded=1;CALL.apply(window,a)}),
				document.body.firstChild)
			//CALL.apply(window,a)
			})
	return
	}
else if(!F[tar].__loaded)
	return setTimeout(function(){CALL.apply(window,a)},300)

F[tar].contentWindow.postMessage(act, tar)

	
}//fe

/**
 * 跨域函数调用 首次调用会等待至bodyInit后执行
 * @param {type} opt ==1时调用父frame中callname函数 ==0其他
 * @param {type} host 指定域名 如"https://xxx.oo"
 * @param {type} callname 要调用的函数名
 * @param {type} callback 回调函数 callname的返回值做参数
 * @param {type} arg 给callname参数
 * @returns {undefined}
 */
commonui.crossDomainCall = function(opt, host, callname, callback, arg){
if(callback){
	var k = 'cb'+Math.random()
	CB[k] = callback
	}
return CALL(opt, callname+' '+(callback?k:'null')+' '+arg, host)
}//fe

commonui.crossDomainCall.setCallBack=function(k,v){CB[k] = v}

window.addEventListener("message", function(e){
if(!e.origin.match(/(?:nga\.cn|ngacn\.cc|nga\.178\.com|nga\.donews\.com|ngabbs.com|bigccq\.cn)(?::\d+)?$/))
	return
var call,callback,a = (e.data+'').replace(/^([^\s]+)\s+([^\s]+)\s+/,function($0,$1,$2){call=$1;callback=$2;return ''})
if(call){
	if(CB[call])
		return CB[call](a)
	else if(window['crossDoaminCall_'+call])
		return window['crossDoaminCall_'+call](a)
	}
})

})();//fe

//本地缓存=====================
;(function(){
var co = commonui, C = {}, CH = false, P = 'userCache_'+(window.__CURRENT_UID ? __CURRENT_UID+'_' : '0_') , PO = location.protocol ,S = domStorageFuncs, CK = __COOKIE, H=co.crossDomainCall,
HS = ['http://bbs.ngacn.cc','http://nga.donews.com','http://bbs.nga.cn','http://nga.178.com','http://bbs.bigccq.cn','https://bbs.ngacn.cc','https://bbs.donews.com','https://bbs.nga.cn','https://nga.178.com','https://bbs.bigccq.cn','http://ngabbs.com','https://ngabbs.com'],
CH = location.protocol+'//'+location.host

commonui.userCache ={
//time<0 delete, time==0 30 day
set:function (k,v,t,o){
k = P+k
S.set(k, CK.json_encode(v), t|0)
if((o&1)==0)
	return
for(var i=0;i<HS.length;i++){
	if(HS[i] != CH)
		H(0, HS[i], 'setStorage', null, k+' '+t+' '+CK.json_encode(v))
	}
},//fe

get:function (k){
//console.log('local usercache get '+k)
k = P+k
return CK.json_decode(S.get(k))
},//fe

del:function (k,o){
this.set(k,null,-1,o)
},//fe

hostGet:function (host,k,call){
//if(!window.__DEBUG)
	return this.asyncGet(host,k,call)
k = P+k
//console.log('host '+host+' usercache get '+k)
return H(0, host, 'getStorage', function(x){ call(CK.json_decode(x)) }, k)
},//fe

hostSet:function (host,k,v,t,call){
//if(!window.__DEBUG)
	return this.asyncSet(host,k,v,t,call)
k = P+k
return H(0, host, 'setStorage', call?function(x){ call(x) }:null, k+' '+t+' '+CK.json_encode(v))
},//fe

asyncGet:function(nouse,k,call){
var x = this.get(k)
setTimeout(function(){call(x)})
},//fe

asyncSet:function(nouse,k,v,t){
var x = this.set(k,v,t)
},//fe

changeUid:function(uid){
P = 'userCache_'+uid+'_'
}//fe
}//ce
})();
//弹窗界面=====================


commonui.liteWindow = function(e,til,content){
var $ = _$
if(!this.liteWindow.w){
	var v = $('/div','className','single_ttip3','style','background:rgba(0,0,0,0.5);border-radius:0.3em;padding:0.3em;position:absolute;'
		,$('/span', 'className','title')
		,$('/span', 'className','content')
		,$('/div','className','clear')
		)
	v.style.display='none'
	v._title = v.firstChild
	v._content = v._title.nextSibling
	commonui.aE(document.body,'click',function(e){
		if(e._liteWindowIgorne)
			return
		if(commonui.ifMouseOut(e,v))
			return v.style.display='none'
		})
	document.body.appendChild(v)
	this.liteWindow.w = v
	}
var w = this.liteWindow.w
if(til || content){
	w._title.innerHTML = ''
	w._content.innerHTML = ''
	if(til)
		w._title._.add(til,$('/br'))
	if(content)
		w._content._.add(content)
	}
e._liteWindowIgorne = true
__NUKE.position.setPos(w,e,null,1)
}//

//弹窗界面=====================
;(function(){
var EVENT_INIT = 0, HIS

commonui.createCommmonWindow = function (opt){//&1无动画 &2无标题栏
var $ = _$,ss=__SETTING.bit&__SETTING.bits.size4,r = __NUKE.cpblName(document.body.style,'transition',1,'transform',1,'transformOrigin',1,'opacity',1)

,t = $('/div').$0(
	'className','tip_title'+((opt&2)?' x':''),
	'draggable',true,
	'ondragstart' , function(e){
		var x = this.parentNode.parentNode, b = x.getBoundingClientRect(), p= __NUKE.position.get(e)
		this._p = {x:p.x,y:p.y,l:b.left+p.xf,t:b.top+p.yf}
		},
	'ondrag' , function(e){
		var p = __NUKE.position.get(e)
		if(p.x || p.y){
			this._p.x1 = p.x
			this._p.y1 = p.y
			}
		},
	'ondragend' , function(e){
		var x = this.parentNode.parentNode, p = __NUKE.position.get(e)
		l = Math.round(this._p.x1 - this._p.x + this._p.l),
		t = Math.round(this._p.y1 - this._p.y + this._p.t)
		x.style.left = (l>=p.pw ? p.pw-50 : (x.getBoundingClientRect().right<0 ? l+50 : l )) + 'px'
		x.style.top = (t>=0?t:0) + 'px'
		},
	
	$('/a','className','colored_text_btn','href','javascript:void(0)',__TXT('close')._.css('line-height:1.85em'),'onclick',function(){
		//if(ss && window.history)
		//	history.back()
		this.parentNode.parentNode.parentNode._.hide()
		}),
	$('/span','className','title','innerHTML','&nbsp;')
	),
c1 = $('/div')._.cls('div3'),
c2 = $('/div')._.cls('div3'),
c = c1,
d = c1,

w = $('/div','className','single_ttip2','style',/*ss?'position:fixed;left:0;top:0;bottom:0;right:0;overflow:auto':*/'','id','commonwindow'+(Math.random()+'').substr(2),
		$('/div','className','div1',
			t,
			$('/div','className','div2',
				c
				)
			)
		)
/*
if(ss && window.addEventListener && !EVENT_INIT){
	EVENT_INIT = 1
	HIS = []
	window.addEventListener('popstate',function(e){
		if(e.state && e.state.from=='commonWindow'){
			var od = HIS.pop()
			if(od)
				$(od)._.hide()
			}
		})
	}*/
	

if(__SETTING.uA[0]==1 && __SETTING.uA[1]<=8)
	w.style.borderWidth='4px'
w.style.display='none'
w._.__c = c
w._.__t = t
w._._commonWindowfocusTime = 0
if(r[0] && r[1] && r[2] && r[3] && (opt&1)==0){}
else r=false

if(r)
	w._.on(r[0]+'end',function(){
		if(this.__transToHide){
			this.__transToHide=0
			this.style.display='none'
			this.style[r[3]]=''
			}
		this.style[r[0]]=''
		})
	w.style[r[2]]='0 0'

w._.addTitle=function(i){
	if(!i)i=''
	t.className='tip_title'
	t.lastChild.innerHTML = i
	return this.self
	}//fe
w._.addAfterContent=function(o){
	c.parentNode.parentNode.appendChild(o)
	}//fe
w._.addBeforeContent=function(o){
	c.parentNode.parentNode.insertBefore(o,c)
	}//fe
w._.addContent=function (x){
	if(arguments[0]===null){//第一个参数是null时reset 必须使用一次show才可以显示
		if(d==c){
			c = (c==c1 ? c2 : c1)
			c.innerHTML=''
			t.lastChild.innerHTML=''
			this.self._.__c = c
			}
		if(arguments.length<=1)
			return this.self
		}
	else if(arguments[0]===false){//第一个参数是false时清空当前显示的
		c.innerHTML=''
		t.lastChild.innerHTML=''
		arguments[0]=null
		if(arguments.length<=1)
			return this.self	
		}
	if(arguments.length>1){ //多个参数时直接调用add
		c._.add.apply(c._,arguments)
		return this.self
		}
	else if (typeof(x)=='object')
		c.appendChild(x)
	else//单个参数时可以设置innerhtml
		c.innerHTML+=x
	return this.self
	}//fe
w._.show=function (x,y,z){
	var o = this.self
	if(d!=c){
		d.parentNode.replaceChild(c,d)
		d=c
		}
	if(!o.parentNode || o.parentNode.nodeType!=1 || o.nextSibling)
		document.body.appendChild(o)
	this.zsort()
	/*if(ss){
		o.style.position='fixed'
		o.style.display='block'
		o.style.opacity=1
		//if(window.history && history.pushState){
		//	HIS.push(o.id)
		//	history.pushState({from:'commonWindow'}, document.title, location.href)
		//	}
		return o
		}*/
	if(r){
		var a = (o.style.display=='none'),p = __NUKE.position.setPos(o,x,y,z|32)
		if(!a){
			if(Math.abs(p.px-parseInt(o.style.left)) > p.cw/3 || Math.abs(p.py-parseInt(o.style.top)) > p.ch/3)
				a = true
			}
		if(a){
			o.style[r[1]]='translate('+(p.px-p.ox)+'px,'+(p.py-p.oy)+'px) scale(0.01)'
			o.style.visibility='inherit';
			window.setTimeout(function(){
				o.style[r[0]]=r[1]+" 0.2s ease-out 50ms"
				o.style[r[1]]='translate(0px,0px) scale(1)'
				})
			}
		else{
			o.style[r[0]]="left 0.2s ease-out 50ms,top 0.2s ease-out 50ms"
			o.style.visibility='inherit';
			}
		o.style.left = p.ox+'px';
		o.style.top = p.oy+'px';
		}
	else
		__NUKE.position.setPos(o,x,y,z|0)
	return o
	}//fe
w._.hide=function (e){
	var o = this.self
	if(r){
		o.__transToHide = 1
		o.style[r[0]]=r[3]+" 0.2s ease-out 50ms"
		o.style[r[3]]='0'
		}
	else
		o.style.display='none'
	return this.self
	}//fe
w._.zsort = function(e){
	var x = commonui.allCommonWindow
	if(x[0]!=this.self){
		var y=this.self, i=-1, j=1000
		x.sort(function(a,b){
			if(a==y)
				return -1
			else if(b==y)
				return 1
			else
				return 0
			})
		while((++i)<x.length){
			x[i].style.zIndex=(--j)
			x[i]._._commonWindowfocused=0
			}
		x[i-1]._._commonWindowfocusTime = e ? e.timeStamp : (window.performance ? performance.now() : 0 )
		}
	x[x.length-1]._._commonWindowfocused =1
	}//
if(w.addEventListener)
w.addEventListener('mousedown',function(e){
	this._.zsort(e)
	},true)

commonui.allCommonWindow.push(w)

return w
}//fe

commonui.allCommonWindow = []
})();

//替代alert===================
;(function(){
var x
commonui.alert = function(txt,til){
if(!x)x=this.createCommmonWindow()
x._.addContent(null)
if(til)x._.addTitle(til)
x._.addContent(txt)
x._.show()
}//
})();

//弹窗界面 - 管理界面窗口=======
commonui.createadminwindow = function(id,opt){
if(this.adminwindow)return this.adminwindow
this.adminwindow = this.createCommmonWindow(opt)
if(!id)
	this.adminwindow.id = 'commonuiwindow';
else
	this.adminwindow.id = id;
document.body.appendChild(this.adminwindow);
return this.adminwindow
}//fe
commonui.hideAdminWindow = function(){
this.adminwindow.style.display='none'
return this.adminwindow
}//fe
commonui.unselectCheckBox = function(o){
this.massAdmin.unCheckAll(o ? o : document)
}

//多选checkbox公用=============
commonui.massAdmin ={
getChecked:function (){
var i = ''
for (var id in this.d){
	if (parseInt(id,10))
		i+=','+id
	}
if (!i){
	window.alert('你至少要选择一个')
	return '';
	}
this.unCheckAll()
i= i.substr(1)
return i
},//fe
unCheckAll:function(o){
for(var id in this.d)
	this._uncheck(this.d[id],id)
},//fe
checkAll:function(o){
if(this.l)
	return this.unCheckAll(o)

var x = o.getElementsByTagName('input')
for(var i=0;i<x.length;i++){
	with(x[i]){
		if(type=='checkbox' && parseInt(value,10)){
			//if(this.l<15)
				this._check(x[i],value)
			//else
			//	this._uncheck(x[i],value)
			}
		}
	}
},//fe
check:function(o,id){

if (!o.checked){
	this._uncheck(o,id)
	}
else{
	this._check(o,id)
	}
},//fe
_check:function(o,id){
if(!o.checked)
	o.checked='checked'
if(!this.d[id]){
	this.d[id]=o
	this.l++
	var s = $('selectallbtn')
	if(s && s.firstChild.innerHTML!='重置')
		s.firstChild.innerHTML='重置'
	}
},//fe
_uncheck:function(o,id){
if(o.checked)
	o.checked=false
if(this.d[id]){
	delete this.d[id]
	this.l--;
	var s = $('selectallbtn')
	if(this.l==0 && s)
		s.firstChild.innerHTML='全选'
	}
},//fe
d:{},
l:0
}

//防止重复提交=================
commonui.remuseInputAfterSubmit = function(o)
{
var f = o.parentNode;
if (f.nodeName=='FORM'){
	if (o.readyState=='complete')
	{
		f.submiting = false;
		var i = f.getElementsByTagName('input');
		for (var j=0; j<i.length; j++){
			if (i[j].getAttribute('type')=='submit'){
				i[j].disabled = false;
			}
		}
	}
}
}//fe

commonui.disableInputOnSubmit = function(o)
{
if (o.submiting){return false;}
o.submiting = true;
var i = o.getElementsByTagName('input');
for (var j=0; j<i.length; j++){
		if (i[j].getAttribute('type')=='submit'){
			i[j].disabled = true;
		}
	}
}//fe

//在某元素上 touchmove 替代 mouseover===============
commonui.touchOver = {
$:_$,
init:function(o){
this.$(o)._.on('touchmove',function(e){
var c = commonui
if(!this._previousTTime || e.timeStamp.valueOf()-this._previousTTime>1000){
	if(!this._touchFocus){
		this._touchFocus=true
		this._previousTTime = e.timeStamp.valueOf()
		c.triggerEvent(this,'mouseover')
		c.touchOver.focus(o)
		}
	else{
		this._touchFocus=false
		this._previousTTime = e.timeStamp.valueOf()
		c.triggerEvent(this,'mouseout')
		c.touchOver.blur(o)
		}
	}
c.cancelBubble(e)
c.cancelEvent(e)
})
},//fe
focus:function(o){
o.style.backgroundColor='#faa'
o.style.MozBoxShadow='inset 0 0 3px #f00,0 0 3px #f00';
o.style.WebkitBoxShadow='inset 0 0 3px #f00,0 0 3px #f00';
o.style.boxShadow='inset 0 0 3px #f00,0 0 3px #f00';
},
blur : function(o){
o.style.backgroundColor=''
o.style.MozBoxShadow='';
o.style.WebkitBoxShadow='';
o.style.boxShadow='';
}
}

//改变特殊字符的背景色==========
/*
 * @param y 字符串
 */
commonui.colorChar = function (y){
z=''
for (var i=0; i<y.length; i++){
	var u=y.substr(i,1),x = y.charCodeAt(i)
	if(x>=0x00 && x<=0x7f)z+=u
	else if(x>=0x3400 && x<=0x4DB5)z+=u
	else if(x>=0x4E00 && x<=0x9FA5)z+=u
	else if(x>=0x9FA6 && x<=0x9FBB)z+=u
	else if(x>=0xF900 && x<=0xFA2D)z+=u
	else if(x>=0xFA30 && x<=0xFAD9)z+=u
	else if(x>=0xFA70 && x<=0xFAD9)z+=u
	else z+='<span style="color:limegreen;background:#fcc">'+u+'</span>';
	}
return z
}

//canvas缩图==================
commonui.resizeImg = function(img,mw,mh,opt){
var c = document.createElement("canvas"), x = c.getContext("2d")
var w = img.width, h = img.height
if (w > h) {
  if (w > mw) {
	h *= mw / w
	w = mw
  }
} else {
  if (h > mh) {
	w *= mh / h
	h = mh
  }
}
c.width = w
c.height = h
x.drawImage(img, 0, 0, w, h)
if(opt&1)
	return c.toDataURL("image/png")
img.src = c.toDataURL("image/png")
}

//document.write过滤===========
if(window.__filterWrite)
	commonui.filterWrite = window.__filterWrite
else
	commonui.filterWrite={load:function(){}, unload:function(){} }


//二次点击=====================
commonui.doubleclick = {

currentFocus : null,
allElmCount:0,


focus : function(e,o){
if(!o)o=this
var x = commonui.doubleclick
if(x.currentFocus && x.currentFocus!=o)
	x.blur(null,x.currentFocus)
x.currentFocus=o
o._touchSelected=true
o.style.backgroundColor='#faa'
o.style.MozBoxShadow='inset 0 0 3px #f00,0 0 3px #f00';
o.style.WebkitBoxShadow='inset 0 0 3px #f00,0 0 3px #f00';
o.style.boxShadow='inset 0 0 3px #f00,0 0 3px #f00';
},

blur : function (e,o){
if(!o)o=this
o.style.backgroundColor=''
o.style.MozBoxShadow='';
o.style.WebkitBoxShadow='';
o.style.boxShadow='';
o._touchSelected=false
},

ontouchstart : function (e){
var o = this
if(!o._touchSelected){
	o._previousEventTime = e.timeStamp.valueOf()
	commonui.doubleclick.focus(e,this)
	}
},

onclick : function(e){
if (!(window.__SETTING.bit & 4096))
	return
var o = this,et = e.timeStamp.valueOf()
if (o._previousEventTime && (et-o._previousEventTime)<1000){
	try{e.stopPropagation();e.preventDefault()}catch(er){}
	e.cancelBubble =true,e.returnValue = false
	return
	}
if(o._touchSelected){
	commonui.doubleclick.blur(e,o)
	}
else{
	commonui.doubleclick.focus(e,o)
	try{e.stopPropagation();e.preventDefault()}catch(er){}
	e.cancelBubble =true,e.returnValue = false
	}
},

init:function(a){
if(a._haveSetTouchHandler)return
_$(a)._.on('click',commonui.doubleclick.onclick)._.on('touchstart',commonui.doubleclick.ontouchstart)
a._haveSetTouchHandler = true
},

onTouchStartInitAll:function(){
var a = document.getElementsByTagName('*')
if(a.length != commonui.doubleclick.allElmCount){
	commonui.doubleclick.allElmCount = a.length
	a = document.getElementsByTagName('a')
	for (var i=0; i<a.length; i++)
		commonui.doubleclick.init(a[i])
	}
}
}//ce

//翻页url替换==================
/*
 * @param str) s location.search
 * @param str) m arg name, e.g.'page'
 * @param str/int) n val, e.g. '1' -> set to 1, 1 -> add 1
 * @returns str)
 */
commonui.urlReplace = function(s,m,n){
var p = new RegExp("^(\\?)?(?:((?:.*&)?"+m+")(?:=(\\d*))?(&|$|#))?",'i')
return s.replace(p,function($0,$1,$2,$3,$4){
	return $2 ? $1+$2+'='+( n.constructor==String ? n : (($3=$3|0)+($3?0:1)+n) )+$4 
	: '?'+m+'='+( n.constructor==String ? n : (n+1) )+($4?$4:'&')
	})
}//fe


//global long touch and touchmove event=============
commonui.touchMoveAE = false
commonui.touchMoveInit = function(){
if ('ontouchstart' in document.documentElement || window.navigator.msMaxTouchPoints){}
else
	return

var p = __NUKE.position.get, ts={}, eE=[], eM=[], eS=[]

commonui.aE(document,'touchstart',function(e){
	if(!ts || (!eE.length && !eM.length && !eS.length))return
	if(!e.changedTouches)
		return ts = null
	if(e.changedTouches[1])
		return
	var t= e.changedTouches[0],r=0
	ts[t.identifier] = {x:t.clientX,y:t.clientY,mx:t.clientX,my:t.clientY,now:(new Date).getTime()}
	if(eS.length){
		for(var j=0;j<eS.length;j++){
			if(eS[j])
				r |= eS[j](t,ts[t.identifier])
			}
		if(r&1)
			return commonui.cancelEvent(e)
		}
	})

commonui.aE(document,'touchmove',function(e){
	if(!ts || !eM.length)return
	for(var k=0;k<e.changedTouches.length;k++){
		var t= e.changedTouches[k],r=0
		if(ts[t.identifier]){
			for(var j=0;j<eM.length;j++){
				if(eM[j])
					r |= eM[j](t,ts[t.identifier])
				}
			if(r&1)
				return commonui.cancelEvent(e)
			}
		}
	})

commonui.aE(document,'touchend',function(e){
	if(!ts || !eE.length)return
	for(var k=0;k<e.changedTouches.length;k++){
		var t= e.changedTouches[k],r=0
		if(ts[t.identifier]){
			for(var j=0;j<eE.length;j++){
				if(eE[j])
					r |= eE[j](t,ts[t.identifier])
				}
			delete ts[t.identifier]
			if(r&1)
				return commonui.cancelEvent(e)
			}
		}
	})

/**
 * 
 * @param {type} e
 * @param {type} f function(ev,savedEv){ return 1 will cancel event}
 * @returns {Number}
 */
commonui.touchMoveAE = function(e,f){
	if(e=='touchmove')
		return eM.push(f)-1
	else if(e=='touchend')
		return eE.push(f)-1
	else if(e=='touchstart')
		return eS.push(f)-1
	}//fe
}//init fe

//QR码生成=====================
commonui.QRCode = {
QR:null,
query:[],
loadDataUrl:function(imgo,str,f){//img obj / qr string / callback
if(!str)
	return
if(!this.QR){
	this.query.push([imgo,str])
	if(this.QR!==0){
		this.QR=0
		var self = this
		loader.script(__COMMONRES_PATH+'/js_qrcode.min.js',
			function(){
				for(var i=0;i<self.query.length;i++){
					self.query[i][0].src = self.QR.generatePNG(self.query[i][1],{ecclevel:'L'})
					if(f)f.call(self.query[i][0])
					}
				}
			);
		}
	return
	}
imgo.src = this.QR.generatePNG(imgo.alt,{ecclevel:'L'})
if(f)f.call(imgo)
}//fe
}//ce


}//be






//==================================
//功能模块小
//==================================
{
//获取帖子或主题的类型说明
(function(){
var P, VP,EP, PBALL=0,TMBALL=0
G=1,//guest
U=2,//user
MOD=4,//显示需要版主权限
LE=8,//需要lesser
WD=16,//warden
SL=32,//superlesser
SU=64,//super
AD=128,//admin

MMOD=256,//修改需要版主权限
MLE=512,//需要lesser
MWD=1024,//warden
MSL=2048,//superlesser
MSU=4096,//super
MAD=8192,//admin
MNO=524288,//不能修改

TT=16384,//仅主题
PP=32768,//仅回复
TS=65536,//仅合集
QF=131072,//仅版面镜像
QQ=262144,//仅镜像
PB={
1:		[G|TT,					8192,		'',		'+',		"#BD7E6D",	'主题中有附件',										''],
2:		[G|TT|PP,				262144,	'匿名',	'',		'#909090',	'不显示发帖人信息',									''],
3:		[G|PP,					1,			'评论',	'',		'#909090',	'这是对某一个帖子的评论/回复/贴条',				''],
4:		[G|MMOD|TT|PP,			1024,		'锁定',	'锁定',	'#C58080',	'无法编辑/回复',										'无法编辑/回复*'],
5:		[MOD|LE|MMOD|TT|PP,	2,			'隐藏',	'隐藏',	'#C58080',	'只有作者/版主可见',								'作者/版主可见内容**'],
6:		[MOD|MMOD|TT,			131072,	'本区',	'本区',	'#909090',	'不在联合版面中显示',								'不在联合版面中显示'],
7:		[MOD|MMOD|TT|PP,		128,		'编辑',	'',		'#909090',	'超过时限仍可编辑',									'超过时限仍可编辑'],
8:		[G|MAD|TT|TS,			32768,	'合集',	'合集',	'#A0B4F0',	'是一个合集主题 用户可以在合集中发布子主题',	'转成合集'],
9:		[G|MAD|TT|QF,			2097152,	'版面',	'版面',	'#A0B4F0',	'这是一个到版面的镜像',								'转成版面镜像'],
10:	[G|MMOD|TT,				256,		'占楼',	'',		'#909090',	'只能主题发布者自己回复',							'只能主题发布者自己回复'],
11:	[MOD|MWD|TT|PP,		16384,	'屏蔽',	'屏蔽',	'#C58080',	'作者/版主可见',					'作者/版主可见'],
12:	[MOD|MNO|TS|QF|QQ,	1026,		'下沉',	'下沉',	'#A0B4F0',	'合集/镜像/版面镜像不上浮',						'合集/镜像/版面镜像不上浮'],
13:	[MOD|MMOD|TS|QF|QQ,	16777216,'下沉',	'下沉',	'#A0B4F0',	'合集/镜像/版面镜像不上浮',						'合集/镜像/版面镜像不上浮'],
14:	[MOD|MSL|TT|PP,		2048,		'处罚',	'处罚',	'#909090',	'有用户在此贴内被处罚',								'处罚标记'],
15:	[MOD|TT|PP,				8,			'延时',	'延时',	'#909090',	'查看预订操作记录',									''],
16:	[MOD|TT|PP,				32,		'标记',	'标记',	'#909090',	'查看标记/举报记录',								''],
17:	[MOD|MSL|TT,			524288,	'附件',	'+',		"#BD7E6D",	'在主题列表中显示附件',								'在主题列表中显示附件'],
18:	[MOD|MMOD|MWD|TT|PP,	512,		'审核',	'A',		'#C58080',	'正等待审核',								'正等待审核'],
},
TMB={
1:		[G|MMOD|TS,		131072,		'全锁',	'全锁',	'#C58080',	'合集内无法编辑/回复/发布子主题',					'锁定合集的全部主题'],
2:		[MOD|MMOD|TS,	524288,		'下沉1',	'下沉1',	'#A0B4F0',	'合集子主题不上浮',									'合集子主题不上浮'],
3:		[MOD|MMOD|TS|QF,16777216,	'折叠',	'折叠',	'#A0B4F0',	'',													'合集/版面镜像不显示附加子主题'],
4:		[MOD|MSU|TT,	256,			'开放',	'开放',	'#909090',	'',													'回复不受注册时间限制'],
5:		[G|MMOD|TT,		2097152,		'全匿',	'全匿',	'#C58080',	'回复这个主题会自动匿名',							'回复自动匿名'],
6:		[G|MMOD|TT,		33554432,	'全隐',	'全隐',	'#C58080',	'回复这个主题会自动隐藏',							'回复自动隐藏'],
7:		[MOD|MMOD|TT,	67108864,	'统计',	'统计',	'#909090',	'',													'记录每日访问量(需要最后修改在一个月内)'],
//512:			[MOD|MSU|TT,	512,	'开放1',	'开放1',	'#909090',	'',													'未激活用户可回复'],
//1024:			[MOD|MSU|TT,	1024,	'开放2',	'开放2',	'#909090',	'',													'禁言用户可回复'],
//2048:			[MOD|MSU|TT,	2048,	'开放3',	'开放3',	'#909090',	'',													'NUKE用户可回复'],
8:		[MOD|MAD|TT,	134217728,	'内容',	'',		'#909090',	'',													'主题列表中显示最近回复'],
9:		[G|MMOD|TT,		1073741824,	'单帖',	'单帖',	'#909090',	'每个用户只能回复一次(2000回复以内)',			'每个用户只能回复一次(2000回复以内)'],
10:	[G|TT,			65536,		'直播',	'直播',	'#909090',	'这是一条直播',										''],
11:	[G|TT|MMOD,		262144,		'新回复在前',	'倒序','#C58080','新回复在前','新回复在前']
}

var INIT=function(){
P=G
if(window.__CURRENT_UID)
	P|=U
if(window.__GP){
	if(__GP.lesser)
		P|=LE|MLE
	if(__GP.greater)
		P|=WD|MWD
	if(__GP.superlesser)
		P|=SL|MSL
	if(__GP['super'])
		P|=SU|MSU
	if(__GP.admin)
		P|=AD|MAD
	}
},
C=function(y,h,u){//&1为在主题列表中使用 &2为阅读帖子中使用 &4为贴条 
var z
if(h&1){
	if(y[3])
		z=y[3]
	}
else if(h&2){
	if(y[2])
		z=y[2]
	if((h&4)&&z=='评论')
		return  ''
	}

if(z)
	return commonui.txtTagTemplate(z, y[5], u, y[4], (y[0]&3)==0 ? '此状态只有版主可见' : '')

return ''
}//

for(var k in PB)
	PBALL|=PB[k][1]

for(var k in TMB)
	TMBALL|=TMB[k][1]

commonui.txtTagTemplate=function(txt,til,url,bgc,sp){//文字 长说明 链接 颜色 加特殊说明
 return "  <"+(url?"a href='"+url+"'":'span')+
			((txt=='+')? " style='font-size:1.085em;color:"+bgc+"'" : 
				" class='block_txt white nobr vertmod' style='background-color:"+bgc+(sp ? ";padding-right:0.2em;border-right:0.2em solid "+__COLOR.border0 : '')+"'")+
		  " title='"+til+(sp ? ' '+sp : '')+"'>"+txt+"</"+(url?'a':'span')+">"
}//

commonui.getPostBitEdit=function(isset,ispost,isqf,isq,mod){//是合集 是回复 是版面镜像 是镜像 是版主
if(P===undefined)
	INIT()
if(EP===undefined)
	EP=(P|((mod&2)?MMOD:0))&16128
var x = [[],[]],z,y=ispost?PP:TT
if(isset)y|=TS
if(isqf)y|=QF
if(isq)y|=QQ
for(var k in PB){
	z=PB[k]
	if(EP&z[0])
		if(y&z[0])
			x[0].push([z[1],z[2]+' '+z[6]])
	}
if(y&TT){
	for(var k in TMB){
		z=TMB[k]
		if(z[0]&EP)
			if(y&z[0])
				x[1].push([z[1],z[2]+' '+z[6]])
		}
	}
return x
}//

/**
 * 获取帖子的bit属性说明
 * @param {type} fid
 * @param {type} tid
 * @param {type} pid
 * @param {type} pb 帖子bit (type)
 * @param {type} tmb1 主题bit1 (topicMiscBit1)
 * @param {type} html 返回格式 &1为在主题列表中使用 &2为阅读帖子中使用 &4为贴条 &8
 * @param {type} mod admincheckbit
 * @returns {unresolved}
 */
commonui.getPostBitInfo = function(fid, tid, pid, pb, tmb1, h, mod){

if((PBALL&pb)==0 && (TMBALL&tmb1)==0)
	return ''
if(P===undefined)
	INIT()
if(VP===undefined)
	VP=(P|((mod&2)?MOD:0))&255
var x='',z,u,y=pid?PP:TT
if(pb&32768)y|=TS
if(pb&2097152)y|=QF
if(PBALL&pb)
	for(var k in PB){
		z = PB[k]
		if(z[0] & VP){
			if((pb & z[1])==z[1] && (z[0]&y)){
				if(pb&2129960){
					if(z[1]==8)
						u = "javascript:adminui.getDelayAction("+tid+",0)"
					else if(z[1]==32)
						u = "/nuke.php?func=logpost&tid="+tid
					else if(z[1]==32768 || z[1]==2097152)
						u = "/read.php?tid="+tid
					else
						u=null
					x+=C(z,h,u)
					}
				else
					x+=C(z,h)
				}
			}
		}

if(TMBALL&tmb1)
	for(var k in TMB){
		z = TMB[k]
		if(z[0] & VP){
			if((tmb1 & z[1]) ==z[1] &&(z[0]&y)){
				x+=C(z,h)
				}
			}
		}
return x
}//fe
})()
//格式化内容mini===============
commonui.postDispMini = function(cS,cC,fid,tid,pid,aid,type){
if(type)
	cS.innerHTML+=this.getPostBitInfo(fid, tid, pid, type, 0, 2)
ubbcode.bbsCode({
	c:cC,
	noImg:1,
	fId:fid,
	tId:tid,
	pId:pid,
	authorId:aid,
	rvrc:0,
	isSig:0
	})
}//fe

commonui.domainSelect = function(){return ''}

//(取消)关注
//1fo用户
//2fo主题
//4fo回复
//8取消fo用户
//16取消fo主题
//32取消fo回复
//64fo用户的回复
//128取消fo用户的回复
commonui.follow = function(x,id){
if(!__CURRENT_UID)
	return alert('你没有登录')
if(!confirm((x&71) ? '是否关注':'是否取消关注'))
	return
__NUKE.doRequest({
	u:{u:__API._base,
		a:{__lib:"follow",__act:"follow",id:id,type:x,raw:3}
		},
	b:this
	})
}//fe

//由当前（主题）地址生成到帖子的链接=====================
commonui.genPidLink = function(pid,lou){
if(window.__PAGE)
	return __PAGE[0]+'&page='+__PAGE[2]+'#pid'+pid+'Anchor'
return ''
/*
if(!this.genPidLink.base){
	var l = window.location;
	if(l.pathname!='/read.php')
		this.genPidLink.base=1
	else
		this.genPidLink.base = l.pathname+l.search.replace(/(&|\?)(?:_ff|topid|to|pid)=.+?(?:&|$)/ig,'$1')
	}
if(this.genPidLink.base===1)
	return ''
else
	return this.genPidLink.base+( pid ? '&pid='+pid+'&to=1' : '#'+lou )
*/
}


//生成用户名html===============
/**
*uid uid
*name 用户名
*l 长度限制(一中文字符为单位)
*/
commonui.htmlName = function(name,l){

var o = 0
if(name.charAt(0)=='#' && name.match(/^#anony_[a-f0-9]{32}$/))
	var n = this.anonyName(name)[0],o=o|1
else
	var n = name

if(l && n.length>l){
	var x = this.cutstrbylen(n,l)
	if(x != n){
		o = o|2
		n = x+"<span class='b silver'>…</span>"
		}
	}

if(o&1)
	n = n+"<span class='b silver'>?</span>"

//if(!window.__GP || !__GP.admincheck){
//	return o ? "<span title='"+( (o&2)?name+' ':''  )+(  (o&1)?'这是一个匿名用户 ':'' )+"'>"+n+"</span>" : n
//	}

var c=[],hex = Math.abs(DJBHash(name)).toString(16)+'000000'
for(var i=0;i<6;i+=2)
	c.push( ('0x'+hex.substr(i,2))-0 )

c[0] = c[1]/255
c[1] = c[1]/255/2+0.25
c[2] = c[2]/255/2+0.25

c = this.hsvToRgb(c[0],c[1],c[2])
hex = "<b class='block_txt' "+(o?"title='"+( (o&2)?name+' ':''  )+(  (o&1)?'这是一个匿名用户 ':'' )+"'":'')+" style='padding-left:0.2em;padding-right:0.2em;min-width:1em;text-align:center;background:#"+( ("0" + c[0].toString(16)).slice(-2) + ("0" + c[1].toString(16)).slice(-2) + ("0" + c[2].toString(16)).slice(-2))+";color:#ffffff'>"

if(n.match(/^UID:?\d+/i)){
	if(n.length>6)
		return n.substr(0,n.length-4)+hex+n.substr(n.length-4)+"</b>"
	else
		return n.substr(0,3)+hex+n.substr(3)+"</b>"
	}
else
	return hex+n.substr(0,1)+"</b>"+n.substr(1)
}//fe

//topicMiscVar解析=============
commonui.topicMiscVar = {
_BIT1:1,
_STID:2,
_SFID:3,
_FONT_RED:1,
_FONT_BLUE:2,
_FONT_GREEN:4,
_FONT_ORANGE:8,
_FONT_SILVER:16,
_FONT_B:32,
_FONT_I:64,
_FONT_U:128,
_ALL_FONT:255,

unpack:function(x){
if(x.match(/~1?$/))
	return;
var z={},x = b642bin(x),i=0,y;
if(x==='')
	return z;
while(y = bin2UInt(x.substr(i,1))){
	if(y==this._BIT1){
		z._BIT1 = bin2UInt(x.substr(i+1,4));
		i+=5;
		}
	else if(y==this._STID){
		z._STID = bin2UInt(x.substr(i+1,4));
		i+=5;
		}
	else if(y==this._SFID){
		z._SFID = bin2UInt(x.substr(i+1,4));
		i+=5;
		}
	else//未知的按照1byte id/4byte data跳过
		i+=5;
	}
return z;
}//fe
}//ce


//匿名用户名生成================
/**
 * @param {type} aname
 * @param {type} html
 * @returns {Array|Object.anonyName.n|String}
 */
commonui.anonyName=function(aname,html){
var t1='甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥', t2='王李张刘陈杨黄吴赵周徐孙马朱胡林郭何高罗郑梁谢宋唐许邓冯韩曹曾彭萧蔡潘田董袁于余叶蒋杜苏魏程吕丁沈任姚卢傅钟姜崔谭廖范汪陆金石戴贾韦夏邱方侯邹熊孟秦白江阎薛尹段雷黎史龙陶贺顾毛郝龚邵万钱严赖覃洪武莫孔汤向常温康施文牛樊葛邢安齐易乔伍庞颜倪庄聂章鲁岳翟殷詹申欧耿关兰焦俞左柳甘祝包宁尚符舒阮柯纪梅童凌毕单季裴霍涂成苗谷盛曲翁冉骆蓝路游辛靳管柴蒙鲍华喻祁蒲房滕屈饶解牟艾尤阳时穆农司卓古吉缪简车项连芦麦褚娄窦戚岑景党宫费卜冷晏席卫米柏宗瞿桂全佟应臧闵苟邬边卞姬师和仇栾隋商刁沙荣巫寇桑郎甄丛仲虞敖巩明佘池查麻苑迟邝',i=6,n=['']
for(var j=0;j<6;j++){
	if(j==0||j==3)
		n[0]+=t1.charAt( ('0x0'+aname.substr(i+1,1))-0 )
	else if(j<6)
		n[0]+=t2.charAt( ('0x'+aname.substr(i,2))-0 )
	i+=2
	}
n[1]= aname.substr(i,6)
i+=6
n[2]=aname.substr(i,6)
if(html)
	return "<span title='这是一个匿名发言的用户' anonymous='"+aname+"'><span style='color:#"+n[1]+"'>&#9787;</span><span style='color:gray'>"+n[0]+"</span><span style='color:#"+n[2]+"'>&#9787;</span></span>"
return n;
}//fe



//用户头像选择=================
//{t:(int)type, l:(int)length, 0:{0:(str)avatar,cX:(int)centerX,cY:(int)centerY}, 1:(str)avatar  }
commonui.selectUserPortrait = function(a,buff,uid){
if(buff){
	var y = (
		buff[102] ? 'a_sheep_b.png' : (
		buff[99] ? 'a_sheep.png' : (
		buff[119] ? 'a_sheep_d.png' : (
		buff[124] ? 'a_sheep_e.png' : (
		buff[120] ? 'bronya1.png' : (
		buff[107] ? 'a_sheep_c.png': (
		null)))))))
	if(y){
		y = new String(__IMGPATH+'/face/'+y)
		y.noborder=1
		if(buff[120])
			y.func='avatarBlockrain'
		return y
		}
	if(buff[111])
		return ''
	}
return this.selectAvatar(a,uid)
}//fe

;(function(){
var hu
,select = function(a){
if(!a || !a[0])
	return ''
var i=0
if(!a.l && a[1]){
	a.l = 0
	while(a[a.l])
		a.l++
	}
if(a.l>1){
	if (!a.t || a.t==1)//随机
		i=Math.floor(Math.random()*a.l)//时段
	else if (a.t==2){
		if(!hu){
			hu = ((new Date()).getHours()+8)/24
			if (hu>=1)hu = hu-1
			}
		i=Math.floor(hu*a.l)
		}
	}
return (a[i].constructor==String) ? a[i] : ((a[i].constructor==Object) ? a[i][0] :'')
}//
,toArray=function(a){
if (a && a.constructor==String){
	if(a.charAt(0)=='{' && a.charAt(a.length-1)=='}')
		a = __COOKIE.json_decode(a)
	else if(a.substr(0,8)=='/*$js$*/')
		a = __COOKIE.json_decode(a.substr(8))
	else{
		if(a.match(/\||%7c/i)){//多地址
			var b = a.split(/\||%7c/i),a ={l:0}
			for(var i=0;i<b.length;i++){
				if(b[i]=='t2')
					a.t=2
				else if(b[i].charAt(0)=='.' || b[i].charAt(0)=='h'){
					a[i]=b[i]
					a.l++
					}
				}
			if(!a.l)
				a=''
			}
		else if(a.charAt(0)=='.' || a.substr(0,4)=='http')
			return a
		else
			return ''			
		}
	}
if(a && a.l && a[0])
	return a
return ''
}//
commonui.avatarReal2Short=function(im,uid){//完整的本站头像地址还原成缩写
if(im.match(_ALL_IMG_HOST_REG) && (m = im.match(/\/[0-9a-z]{3}\/[0-9a-z]{3}\/[0-9a-z]{3}\/(\d+)_(\d+)\.(jpg|png|gif)\?(\d+)$/i))){
	if(m[1]==uid)
		im = '.a/'+m[1]+'_'+m[2]+'.'+m[3]+'?'+m[4]
	}
return im
}//
commonui.avatarUrl=function(y,uid){
if(y.charAt(0)=='.' && (i=y.match(/^\.a\/(\d+)_(\d+)\.(jpg|png|gif)\?(\d+)/)))
	y= __AVATAR_BASE_VIEW+'/'+('000000000'+(i[1]|0).toString(16)).replace(/.+?([0-9a-z]{3})([0-9a-z]{3})([0-9a-z]{3})$/,'$3/$2/$1')+'/'+i[1]+'_'+i[2]+'.'+i[3]+'?'+i[4]
else if(y.charAt(0)=='h' && y.match(/^https?:\/\/([^\/]+)\//)){
	if(!y.match(_ALL_IMG_HOST_REG) && uid!=window.__CURRENT_UID)
		y=''
	}
else if(y)
	y= __IMGPATH+'/face/'+y
else
	y= ''
if(this.correctAttachUrl)
	y = this.correctAttachUrl(y)
return y
}//fe

commonui.allAvatar = function(a,uid){
a=toArray(a)
if(a){
	if(a.constructor==String)
		a = {l:1,0:a}
	else if(a.constructor==Object){
		a.l = 0
		while(a[a.l]){
			a[a.l] = this.avatarUrl(a[a.l].constructor==String ? a[a.l] : a[a.l][0],uid)
			a.l++
			}
		}
	}
return a
	
}//

commonui.selectAvatar = function(a,uid){
a= toArray(a)
if(a && a.constructor==Object)
	a = select(a)
return this.avatarUrl(a,uid)
}//fe
})();

//设置头像=====================
commonui.setAvatar = function (e,uid,ad){
	__SCRIPTS.load('imgEdit',function(){commonui.setAvatar2(e,uid,ad)})

}//fe


//计数器======================
commonui.tempcountlog = function(x){
loader.script( '/nuke.php?func=temp&count_log_'+(x?1:2))
}



//生成用户名的连接tip===========
commonui.ucplink = function(e,uid){
if(!uid)return
if(!this.ucplinko){
	this.ucplinko = _$('/span').$0('className','urltip2 urltip3','style',{textAlign:'left',margin:'0'})
	document.body.appendChild(this.ucplinko)
	}
this.ucplinko.innerHTML = "<nobr><a href='http://i.178.com/?_app=index&_controller=index&_action=index&uid="+uid+"'>[178用户中心]</a> <a href='/nuke.php?func=ucp&uid="+uid+"'>[论坛资料]</a> <a target='_blank' href='http://t.178.com/"+uid+"'>[t.178.com]</a></nobr>"
tTip.showdscp(e,this.ucplinko);
}

//用户激活状态解释==============
;(function(){
var x 
commonui.activeInfo = function(a,uid){
if( x===undefined )
	x =   (uid && uid == window.__CURRENT_UID ? 1 : 0) | 
			  (window.__GP && __GP.lesser ? 2 : 0) | 
			  (window.__GP && (__GP.userBit & 3096) ? 4 : 0)

var y
if(a==1)
	y = ['green','ACTIVED','已激活','','已使用激活码激活']
else if(a==0)
	y = ['orange','UNACTIVED','未激活','账号未激活','你可以在用户中心绑定手机激活']
else if(a==4)
	y = ['seagreen','ACTIVED','已激活','','已绑定手机激活']
else if(a==5)
	y = ['teal','ACTIVED','已激活','','已绑定微信激活']
else if(a==-1)
	y = ['darkred','NUKED','NUKED','因违反版规而被禁用','必须使用激活码解除']
else if(a==-5)
	y = ['gray','LOCKED','锁定','因违规注册或发布违规广告等情况而被禁用','不能解锁']
else if(a==-4)
	y = ['sienna','LOCKED','锁定','因账号安全问题被禁用','修改密码解锁','/nuke.php?__lib=login&__act=account&changepass']
else if(a==-3)
	y = ['deeppink','LOCKED','锁定','因账号安全问题被禁用','使用[邮箱重置密码]解锁, 或使用论坛app中的[忘记密码]重置密码解锁(绑定手机时间需在锁定时间之前)','/nuke.php?__lib=login&__act=account&resetpass']
else if(a==-2)
	y = ['darkred','LOCKED','锁定','因账号被盗或发布违规广告等情况被禁用','只能人工解锁 参阅版务区相关说明']
else if(a<0)
	y = ['gray','LOCKED','锁定','unknow','']
else if(a>0)
	y = ['gray','ACTIVED','已激活','unknow','']

if(x==0)
	y[4]=''
if((x&1)==0)
	y[5]=''

return y
}//fe
})();

//标准block===================
/**
* @param id node id
* @param name 标题
* @param info 附加介绍
* @param node/ o 内容
*/
commonui.genStdBlock_a =function(id,name,info,o){
var $ = window._$
return $('/span').$0('id',id,
	$('/h2').$0('className','catetitle','innerHTML',':: '+name+' ::',
		__NUKE.trigger(function(){
			if(commonui.customBackgroundCheckHeight && commonui.customBackgroundCheckHeight(this.parentNode))
				this.parentNode.className+=" invertThis"
			})
		),
	$('/div').$0('style',{textAlign:'left',lineHeight:'1.8em'}, 'className','cateblock', 'id',id+'Content',
		$('/div','class','contentBlock','style',{padding:'5px 10px'},
			info ? $('/div').$0('className','gray', 'innerHTML',info) : null,
			o,
			$('/div').$0('className','clear')
			)
		)
	)
}


//进度条
;(function(){
var prog,progv=0,ti,cal
function init(){
prog = _$('/div','style','position:fixed;display:none;bottom:0;left:0;right:0;height:1em;background:silver;fontSize:0.3em;borderLeft:0 solid '+__COLOR.border0+';transition:border-left-width 0.3s linear 0s,0.3s')
document.body.appendChild(prog)	
}//
function progr(){
progv = 0
prog.style.borderLeftWidth=0
prog.style.display = 'none'
if(cal)cal()
}//
commonui.progbar = function(v,o,f){//progress/% hidetimeout/ms
if(!prog)
	init()
if(v!=progv){
	if(progv==0){
		prog.style.display = ''
		cal = null
		}
	progv = v, prog.style.borderLeftWidth = (prog.offsetWidth*v/100)+'px'
	if(ti)
		clearTimeout(ti)
	if(v==100)
		ti = window.setTimeout(function(){progr()},300)
	else if(o)
		ti = window.setTimeout(function(){progr()},o)
	if(f)
		cal = f
	}
}//

})();


}//be







//==================================
//功能模块大
//==================================
{
//发帖人信息生成================
commonui.userInfo = {
w:window,
u:{uid:0,username:'',credit:0,medal:'',reputation:'',groupid:0,memberid:0,avatar:'',active:0,yz:0,site:'',honor:'',regdate:0,mute_time:0,postnum:0,rvrc:0,money:0,thisvisit:0,signature:'',nickname:'',buffs:{},bit_data:0},
users:{},
groups:null,
medals:null,
buffs:null,
reputations:null,
clearCache:function(){
this.users={}
this.groups=null
this.medals=null
this.buffs=null
this.reputations=null
},
setAll:function(v){
if(v.__REPUTATIONS)
	this.reputations = v.__REPUTATIONS
delete v.__REPUTATIONS
if(v.__GROUPS)
	this.groups = v.__GROUPS
delete v.__GROUPS
if(v.__MEDALS)
	this.medals = v.__MEDALS
delete v.__MEDALS
var n=function(u){
	if(u.buffs){
		var now = window.__NOW
		for(var k in u.buffs){
			if(u.buffs[k][1]<now)
				u.buffs[k]=null
			}
		}
	for(var k in u)
		this[k]=u[k]
	if(typeof this.username != 'string')
		this.username = new String(this.username)
	this.active = this.yz
	}
n.prototype=this.u
for(var k in v)
	this.users[k] = new n(v[k])

}
}//ce



//用户脚本设置==================
commonui.ifuserscript=function(){}
commonui.loadUserScript=function(e){
if (!window.domStorageFuncs || !__CURRENT_UID || !Object.freeze)return
if(!e){
	if(!parseInt(cookieFuncs.getMiscCookie('user_script_'+__CURRENT_UID),10))
		return
	}
if(commonui.userScript){
	if(e)
		commonui.userScript.setUi(e)
	else
		commonui.userScript.load()
	}
else
	loader.script(__SCRIPTS.userScript,function(){ commonui.loadUserScript(e) })
}//fe


//============================
//导航与版面访问记录============
;(function(){

var H=false

//导航中生成历史访问链接弹窗=====
commonui.advNav = function (o){
var $ = _$, a = o.getElementsByTagName('a'), u = a[0], p = u.parentNode, s = o.getElementsByTagName('span')

p.appendChild($('/div').$0('className','clear'))

for(var i=0;i<s.length;i++){
	if(s[i].className=='nav_spr')
		s[i].innerHTML = '&emsp;<span>&raquo;</span>'
	}

for(var i=0;i<a.length;i++){
	var z = a[i], m=z.href.match(/\wfid=(-?\d+)/)
	if(z.parentNode.nodeName=='H1')
		z.parentNode.parentNode.replaceChild(z,z.parentNode)
	if(m && m[1] && (m[2]=this.domainSelect(m[1])))
		z.href = m[2]+z.getAttribute("href")
	if(z.className=='nav_root'){
		z.href = this.domainSelect(-1)+z.getAttribute("href")
		z.innerHTML = this.advNav.rootName
		}
	else if(z.className!='nav_link')
		continue
	z._useloadread=1
	m = (z.dataset ? z.dataset.fb : z.getAttribute("data-fb"))|0
	if(m&262144){
		if(__GP.admincheck)
			z.style.opacity=0.5
		else
			z.style.display='none'
		}
	if(z.innerHTML.length<5)
		z.innerHTML = z.innerHTML.replace(/(.)/g,"&nbsp;$1").substr(6)
	}

var x = $('/div').$0(
	'ontouchstart',function(e){
		this._ttime= y.style.display!='block' ? e.timeStamp : 0
		},
	'onclick',function(e){
		if(this._ttime && e.timeStamp-this._ttime<1000)
			return commonui.cancelEvent(e)
		},
	'onmouseover',function(e){
		if(y.style.display=='block')
			return
		if(!y.__loaded){
			commonui.genHisLink(y)
			y.__loaded = y.firstChild ? 1 : 2
			}
		var z = x.getBoundingClientRect()
		y.style.left = z.left+'px'
		y.style.top = (__NUKE.position.get().yf+z.bottom-(z.bottom-z.top)*0.25|0)+'px'
		y.style.display='block'
		},
	'className','nav_root_c'
	)
,out = function(e){
		var to = e.relatedTarget || e.toElement;
		for(var i=0;i<6;i++){
			if(to == x.parentNode || to==y)
				return
			if(!to || !(to = to.parentNode))
				break
			}
		y.style.display='none'
		},
y = $('/div','style','position:absolute;float:left;background:'+__COLOR.bg1+';border:0.0769em solid '+__COLOR.border4+';padding:0 0.3em;textAlign:left;marginTop:0;fontSize:1.083em;lineHeight:1.8em;zIndex:1;display:none','onmouseout',out)

p.replaceChild(x,u)
x.parentNode.parentNode.parentNode.insertBefore(y,x.parentNode.parentNode)
$(x.parentNode).$0(
	'onmouseout',out
	)
x.appendChild(u)
//if(w.__SETTING.bit & 4096)
	//w.commonui.touchOver.init(x)
}//fe

//锁定历史链接=================
commonui.lockViewHis = function (fid,lock,stid){
if(H===false){
	var arg = arguments
	return this.userCache.hostGet('https://bbs.ngacn.cc','ForumViewHis',function(x){H=x; commonui.lockViewHis.apply(commonui,arg)})
	}
var x=null
for (var i in H){
	x=H[i]
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
		this.userCache.hostSet('https://bbs.ngacn.cc','ForumViewHis',H,3600*24*30)
		return lock
		}
	}
}//fe

//锁定到历史链接================
commonui.genHisLink = function(oo,f){
if(H===false){
	var arg = arguments
	return this.userCache.hostGet('https://bbs.ngacn.cc','ForumViewHis',function(x){H=x; commonui.genHisLink.apply(commonui,arg)})
	}
if(!H)
	return null
var $ = _$, x = $('/span'), self= this, t1='点击解除锁定', t2='锁定这个链接 (可添加到首页快速导航中)', sw = function(o,y){
	var x = (o.title == t1)
	self.lockViewHis(y[0],(x ? 0 : 1),y[5])
	o.title = x ? t2 : t1
	o.style.color = x ? 'gray' : __COLOR.border0
	}
for (var k in H){
	var y = H[k]
	x._.add(
		$('/span',
			'_hisdata',y,
			$('/a',
				//'name',y[0]+','+(y[5]?y[5]:''),
				'href','javascript:void(0)',
				'onclick',function(){sw(this,this.parentNode._hisdata)},
				'title',(y[2] ? t1:t2),
				__TXT('label',1)._.add('\u00A0'),
				'style',(y[2] ? 'color:'+__COLOR.border0 : 'color:gray')
				),
			$('/a').$0(
				'className','b',
				'href',f?'javascript:void(0)' : this.domainSelect(y[0])+'/thread.php?fid='+y[0],
				'innerHTML',y[1],
				'_useloadread',1,
				f?'onclick':null,
				f? function(e){var z = __NUKE.simpleClone(this.parentNode._hisdata);delete z[5];commonui.cancelEvent(e);commonui.cancelBubble(e);f(e,z);return false} : null
				),
			y[5] ? $('/br') : null,
			y[5] ? $('/a').$0(
				'className','teal b',
				'style','marginLeft:1.3em',
				'href',f?'javascript:void(0)' : this.domainSelect(y[0])+'/thread.php?stid='+y[5],
				'innerHTML',y[6],
				'_useloadread',1,
				f?'onclick':null,
				f? function(e){f(e,this.parentNode._hisdata)} : null
				) : null
			),
		$('/br')
		)
	}
oo._.add(x)
}//fe

//加入历史链接=================
/***********************
*@param n 版面名
*@param id 版面id
*@param stidN 集合主题名
*@param stid 集合主题id
*@param page 当前page
*
*历史访问记录的结构
*{
	{0:版面id
	1:版面名
	2:锁定状态
	3:自动锁定计数
	4:自动锁定计数
	5:合集主题id
	6:合集主题名
	7:当前page
	}
*}
*/
commonui.addForumViewHis = function(n,id,stidN,stid,p){

if(!this.addForumViewHis.load){
	this.addForumViewHis.load =1
	var arg = arguments
	this.aE(window,'bodyInit',function(){
		setTimeout(function(){commonui.addForumViewHis.apply(commonui,arg)},500)
		})
	return
	}
	
if(H===false){
	var arg = arguments
	return this.userCache.hostGet('https://bbs.ngacn.cc','ForumViewHis',function(x){H=x; commonui.addForumViewHis.apply(commonui,arg)})
	}
var h = H,p = p|0
if(!h || typeof(h[0])!='object'){
	h={0:{0:id,1:n}}
	if(stid){
		h[0][5] = stid
		h[0][6] = this.cutstrbylen(stidN,11,10,'...')
		}
	if(p)h[0][7] = p
	this.userCache.hostSet('https://bbs.ngacn.cc','ForumViewHis',h,3600*24*30)
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
	this.userCache.hostSet('https://bbs.ngacn.cc','ForumViewHis',h,3600*24*30)
	if(lock)
		this.lockViewHis(id,true)
	return x ? true : false
	}

}//fe


})();//be


//============================
//翻页========================
{
//翻页按钮//===================
/**
 * 
 * @param {type} o
 * @param {type} p p[1] 最后页 为0时显示 可能有下1页   小于0显示 可能有下p[1]*-1页
 * @param {type} opt &1auto &2不显示向前部分的翻页 &4不显示向后部分的翻页 &8显示下一页加载 &16显示前一页加载
 * @returns {undefined}
 */
commonui.pageBtn = function(o,p,opt){
if(opt&1)
	opt |= o.id=='pagebtop' ? 16 : 8
/*
if((opt&1) && this.pageBtn.cache && this.pageBtn.cache.nodeName=='TABLE'){
	o.innerHTML=''
	o.appendChild(	this.pageBtn.cache.cloneNode(1)	)
	var x = o.getElementsByTagName('a')
	for(var i=0;i<x.length;i++){
		if(x[i].name=='topage')
			_$(x[i])._.on('click',function(e){commonui.jumpToForm(e,p[3],p[2],p[1])})
		}
	return
	}
*/


var hl,hln,hlp, s, bit = __SETTING.bit, more = (bit & 8) ? 1 : ((bit & 4) ? 3 : 5),url=p[0], max=p[1], cur=p[2], postPerPage=p[3], cur2 =p[4], e = max

if(cur2){
	if(cur2<cur){
		cur = cur2
		cur2 = p[2]
		}
	}
else
	cur2 = cur

s = opt&2 ? cur2-more : cur-more 
if(s<1)
	s=1
if(commonui.htmlLoader)
	hl=hlp=hln=function(){}
else if(commonui.loadReadHidden){
	if(__SETTING.uA[6]&3)
		hl = function(e){commonui.loadReadHidden(this.value,1);commonui.cancelBubble(e);commonui.cancelEvent(e)}
	hlp = function(e){commonui.cancelBubble(e);commonui.cancelEvent(e);commonui.loadReadHidden(0,4)}
	hln = function(e){commonui.cancelBubble(e);commonui.cancelEvent(e);commonui.loadReadHidden(0,2)}
	}
else
	hl=hlp=hln=function(){}

if(max < 1){//可能有下页
	if(max<0)//显示指定的页数
		e = cur2-max
	else//显示下一页
		e = cur2+1
	}

if(opt&4){
	if(e>cur+more)
		e = cur+more
	}
else{
	if(e>cur2+more)
		e = cur2+more
	}



if(e<s)
	return

var oo = this.stdBtns()

for(var i=s;i<=e;i++){
	//if((opt&2) && i<cur)
	//	continue
	//if((opt&4) && i>cur)
	//	continue
	if(i==cur && i>1 && (opt&16) && hlp)
		oo._.__add( _$('/a',
				'href',url+'&page='+(i-1),
				'innerHTML','&lt;',
				'title','加载上一页',
				'className','uitxt1',
				'_useloadread',9,
				'onclick',hlp
				) )
	oo._.__add( _$('/a',
			'href',url+(i!=1 ? '&page='+i : ''),
			'innerHTML','&nbsp;'+i+(i==max? '.' : '&nbsp;'),
			'className',(i>cur2 ? (max>1 ? 'uitxt1' : 'silver') : (i<cur ? 'uitxt1' : ((i==cur || i==cur2)?'invert':'silver')) ),
			'title',(i>cur && max<=1 ? '可能有第'+i+'页' : (i==max? '最后页' : '') ),
			'value',i,
			'_useloadread',1,
			hl ? {onclick:hl} : null
			) )
	if(i==cur2 && i<e && (opt&8) && hln)
		oo._.__add( commonui.pageBtn.continueNextO = _$('/a',
				'href',url+'&page='+(i+1),
				'innerHTML','&gt;',
				'title','加载下一页',
				'className','uitxt1',
				'_useloadread',9,
				'onclick',hln
				) )
		
	}

if(cur>1 && (bit&4)==0 && (opt&2)==0){
	oo._.__ins(
		_$('/a',
			'href',url+'&page='+(cur-1),
			'innerHTML','前页',
			'title','上一页',
			'className','uitxt1',
			'value',(cur-1),
			'_useloadread',1,
			hl ? {onclick:hl} : null
			),1
		)
	}
if(s>1){
	oo._.__ins(
		_$('/a',
			'href',url,
			'innerHTML',bit & 8 ? '首' : '首页',
			'title','第一页',
			'className','uitxt1',
			'value',1,
			'_useloadread',1,
			hl ? {onclick:hl} : null
			),1
		)
	}
if(cur2<max && (bit&4)==0 && (opt&4)==0){
	oo._.__add(
		_$('/a',
			'href',url+'&page='+(cur+1),
			'innerHTML','后页',
			'title','下一页',
			'className','uitxt1',
			'value',(cur+1),
			'_useloadread',1,
			hl ? {onclick:hl} : null
			),1
		)
	}
if(e<max && (url.substr(0,9)=='/read.php' || __GP.admincheck)){
	oo._.__add(
		_$('/a',
			'href',url+'&page='+max,
			'innerHTML',bit & 8 ? '尾' : '末页',
			'title','最后页 第'+max+'页',
			'className','uitxt1',
			'value',max,
			'_useloadread',1,
			hl ? {onclick:hl} : null
			)
		)
	}
if(max>1 || max<1){
	oo._.__add(
		_$('/a',
			'href','javascript:void(0)',
			'innerHTML','到',
			'name','topage',
			'title','到指定的页数',
			'className','uitxt1',
			'onclick',function(e){commonui.jumpToForm(e,postPerPage,cur,max)}
			)
		)
	}
o.innerHTML=''

if(!oo._.__length)
	return

o.appendChild(oo)
if(oo._.__vml)
	oo._.__vml()
//this.pageBtn.cache =o.firstChild

}//fe

commonui.pageBtn.continueNext = function(){
if(this.continueNextO)
	__NUKE.fireEvent(this.continueNextO,'click')
}//

//翻页跳转 select==============
commonui.jumpToForm = function (e,postPerPage,cp,mp){

var min = cp-10, max = cp+10, s = _$('/select')
if(min<1)min=1
if(max>mp)max=mp
if(min>1)
	s._.add(_$('/option').$0('innerHTML',1,'value',1))

for(var i=min; i<=max; i++)
	s._.add(_$('/option').$0('innerHTML',i,'value',i,i==cp?'selected':'_null',1))
s._.on('change',function(){
	if(!this.options[this.selectedIndex].value)
		return
	var l = window.location , h = l.protocol+'//'+l.host+l.pathname+(l.search.replace(/(?:\?|&)page=(?:e|\d+)/gi,'')+'&page='+this.options[this.selectedIndex].value).replace(/^&/,'?')
	window.location.href = h
	})
if(max<mp)
	s._.add(_$('/option').$0('innerHTML','末页('+mp+')','value',mp))

this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addContent(
	window.location.pathname.indexOf('/read.php')==-1 ? '' : _$('/span')._.add(
		'到',
		_$('/input').$0('size',4),
		_$('/button')._.attr({innerHTML:' 楼 ',type:'button'})._.on('click',function(){
				var x = __NUKE.toInt(this.previousSibling.value)
				if(!x)return
				var l = window.location
				l.href = l.protocol+'//'+l.host+l.pathname+(l.search.replace(/(?:\?|&)page=(?:e|\d+)/gi,'')+'&page='+Math.ceil((x+1)/postPerPage)).replace(/^&/,'?')+'#l'+x;
				}
			),
		_$('/br'),
		_$('/br')
		),
	'到',
	_$('/input').$0('size',4),
	_$('/button')._.attr({innerHTML:' 页 ',type:'button'})._.on('click',function(){
			var x = __NUKE.toInt(this.previousSibling.value)
			if(!x)return
			var l = window.location
			l.href = l.protocol+'//'+l.host+l.pathname+(l.search.replace(/(?:\?|&)page=(?:e|\d+)/gi,'')+'&page='+x).replace(/^&/,'?')
			}
		),
	_$('/br'),
	_$('/br'),
	'到',
	s,
	'页'
	)
this.adminwindow._.show(e)
}//fe

//判断翻页按钮是否折行==========
commonui.pageBtnAdjHeight = function(o,oo){
//window.setTimeout(function(){
//	if(!oo.offsetHeight || o.offsetHeight<oo.offsetHeight*1.5)return
//	o.className = 'doublebtns'
//	},150)
}//fe

}//be





//============================
//debug
{
//debug======================
commonui._debug={
data:{},
length:0,
on:function(x){
__COOKIE.setCookieInSecond("debug",x,x?86400:-1)
},
push:function (e){
this.data[this.length++]=e
},
_d:function d(f,c){
if(f && typeof(c)=='undefined'){
	c=f
	f=''
	}
var r =''
for (var k in c){
	if (typeof(c[k])=='object')
		r+=this._d(f+k+'.',c[k]);
	else
		r+=f+k+' = '+c[k]+'\n';
	}
return r
},
gen:function(){
if (typeof(cookieFuncs.cookieCache[cookieFuncs.misccookiename]) != 'object')
	cookieFuncs.extractMiscCookie();
var r=''
r+='---js debug---\n';
r+=this._d('',this.data);
r+='---cookies---\n';
var cc = document.cookie.split(';');
r+=this._d('',cc);
r+='---misccookies---\n';
r+=this._d('',cookieFuncs.cookieCache[cookieFuncs.misccookiename]);
return r
},
display:function (){
document.write(this.gen())
}
}//ce
//debug setting ui============
commonui.userDebug = function (e){
if(!window.__CURRENT_UID || !window.__NOW)
	return alert('需要先登陆')
var x,y,z,$ = _$
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('debug')
this.adminwindow._.addContent(
	$('/input').$0('value','','placeholder','JSdebug主机IP(内网'),
	$('/button').$0('innerHTML','开启','type','button','onclick',
		function(){
			commonui._debug.on(this.previousSibling.value?this.previousSibling.value:1)
			alert('设置成功 请刷新页面')
			}),
	$('/button').$0('innerHTML','关闭','type','button','onclick',
		function(){
			commonui._debug.on(0)
			alert('设置成功 请刷新页面')
			}),
	'(管理员批准后生效) ',
	$('/br'),
	$('/br')
	)

if(!__GP.admin)
	return this.adminwindow._.show(e)

this.adminwindow._.addContent(
	'设置特定用户的debug',
	$('/br'),
	x=$('/input').$0('size',20),
	'UID ',$('/br'),
	y=$('/input').$0('size',20),
	'天数(<90 设0解除)',
	$('/br'),
	z=$('/select').$0(
		$('/option').$0('value',1024,'innerHTML','JS'),
		$('/option').$0('value',1024|2048|4096,'innerHTML','JS+PHP')
		),'类型 ',
	$('/br'),
	$('/button')._.attr({innerHTML:'确定',type:'button'})._.on('click',function(){
			__NUKE.doRequest({
				u:__API.userDebug(x.value, y.value, z.options[z.selectedIndex].value),
				b:this,
				f:function(d){
					var e = __NUKE.doRequestIfErr(d)
					if(e)
						return alert(e)
					alert(d.data[0])
					}
				})
			}
		)
	)
this.adminwindow._.show(e)
}//fe
}//be


//============================
//帖子操作按钮 兼 操作按钮公用===
commonui.buttonBase={
parent:commonui,

replaceUrl:function (u){
var e = encodeURIComponent;
return u.replace('_TOPIC',e(document.title)).replace('_URL',e(document.location.href)).replace(/_BBSURL/g,e(window.__BBSURL))
},

genU:function(a,u){
return u ? " href='"+u.replace(/\{(.+?)\}/g,function($0,$1){return a[$1]})+"' " : " href='javascript:void(0)' "
},//fe

genT:function(a,t){
return t ? " title='"+t+"' " : ' '
},//fe

genC:function(btn,c){
return btn ? " class='cell rep txtbtnx "+(c?c:'silver')+"' " : " class='b "+(c?c:'silver')+"' "
},

genA:function(a,id,nohis){
var d = this.d[id]
if(!d || (d.ck && !d.ck(a)))return null
var tag=d.tag ? d.tag : 'a', self=this, n=nohis ?  d.n1 : (d.n3 ? d.n3 : d.n1), btn=_$('/'+tag).$0('href',
	d.u ? d.u.replace(/\{(.+?)\}/g,function($0,$1){return a[$1]}) : "javascript:void(0)",
	'className',"cell rep txtbtnx nobr "+(d.c?d.c:'silver')
	)
if(n.constructor==String)
	btn.innerHTML= n
else
	btn._.add(n)
if(d.on){
	if(typeof d.on == 'function')
		btn._.on('click',function(e){d.on(e,a,this)})
	else{
		for(var k in d.on)
			btn._.on(k,function(e){d.on[e.type](e,a,this)})
		}
	}
if(!nohis)
	btn._.on('click',function(e){self.saveHis(id)})
if(d.id)
	btn.id=d.id
if(d.n2)
	btn.title=d.n2
if(d.target)
	btn.target=d.target
if(d.__islongclick)
	btn.__islongclick = 1
return btn
},

genB:function(argid){

var i=0,l=this.def,xx=null,b=_$("/div").$0('style',{position:'absolute'},'className','c2 postbtnsc'),max= __SETTING.bit & 8 ? 5 : 8,o = this.parent.stdBtns(),self=this
if(!this.his){
	this.his = this.parent.userCache.get(this.saveKey);
	if(!this.his)this.his=[]
	}
while(1){
	for (var k=0;k<l.length;k++){
		if(i++>=max)break
		if(xx=this.genA(this.argCache[argid],l[k],1))
			o._.__add(xx)
		}
	if(l==this.his)break
	l=this.his
	}
o._.__add(
	_$('/a').$0(
		'innerHTML','更多',
		'href','javascript:void(0)',
		'className','uitxt1',
		'onclick',function(e){self.allBtn(e,argid)}
		)
	)

b._.add(o)
return b
},//fe

allBtn:function(e,arg,nohis){
var w=window,$=w._$,c = w.commonui,z=null,x= $('/div').$0('className','ltxt'),y=this.all,self=this,s = ' '+w.location.protocol+'//'+w.location.host

if(typeof(arg)!='object')
	arg = this.argCache[arg]

c.createadminwindow()
c.adminwindow._.addContent(null)

for (var k in y){
	var u=$('/span')
	for (var kk=0;kk<y[k].length;kk++){
		var z=this.genA(arg,y[k][kk],nohis)
		if(z)
			u._.add(' ',z)
		}
	if(u.childNodes.length)
		x.$0($('/h4').$0('className',"textTitle",'innerHTML',k),u)
	}


if(arg.tid)
	x._.add(
		$('/h4').$0('className',"textTitle",'innerHTML','主题地址'),
		$('/span','className',"xtxt",'innerHTML',s+'/read.php?tid=<span class=red>'+arg.tid+'</span>','onclick',function(){commonui.buttonBase.selTxt(this)}),' '
		)

if (arg.pid!='tpc' && arg.pid>0){
	x._.add(
		$('/h4','className',"textTitle",'innerHTML','此回复地址'),
		$('/span','className',"xtxt",'innerHTML',s+'/read.php?pid=<span class=blue>'+arg.pid+'</span>','onclick',function(){commonui.buttonBase.selTxt(this)}),' ',
		$('/h4','className',"textTitle",'innerHTML','此位置地址'),
		$('/span','className',"xtxt",'innerHTML',s+c.genPidLink(arg.pid,arg.i),'onclick',function(){commonui.buttonBase.selTxt(this)}),' '
		)
	}

if((arg.tid || arg.pid) && c.QRCode && w.__UA && (w.__UA[2]==1 || w.__UA[2]==3) && !(w.__UA[0]==1 && w.__UA[1]<8)){
	x._.add(
		$('/br'),
		$('/img').$0('src','about:blank', 
			'style',{display:'none'}, 
			'alt',w.location.protocol+'//'+w.location.hostname+'/?j='+
				(arg.tid ? 't'+arg.tid : '')+(arg.pid!='tpc' && arg.pid>0 ? 'p'+arg.pid : '')/*+(w.__CURRENT_UID ? 'h'+w.__CURRENT_UID : '')*/, 
			'onerror', function(){
				c.QRCode.loadDataUrl(this,this.alt,function(){this.style.display=''})
				}
			)
		)
	}

x._.aC( $('/br') , $('/br') , _$("<button type='button' onclick='commonui.hideAdminWindow()'>关闭</button>") , _$("<button/>")._.attr({type:'button',innerHTML:'清空历史记录'})._.on('click',function(){self.clearHis()}) )

c.adminwindow._.addContent(x)

c.adminwindow._.show(e)

},//fe


selTxt:function(o){
window.setTimeout(function(){
	var d = window.document, s, r
	if (window.getSelection && d.createRange) {
		s = window.getSelection()
		if(!s.isCollapsed && 
			(s.containsNode(o.firstChild) || 
			(o.lastChild.lastChild && s.containsNode(o.lastChild.lastChild))
				)
			)
			return
		r = d.createRange()
		r.selectNodeContents(o)
		s.removeAllRanges()
		s.addRange(r)
	} else if (d.body.createTextRange) {
		// ie
		r = d.body.createTextRange()
		r.moveToElementText(o)
		r.select()
		}
	},50)
},//

saveHis:function(id){
if(!this.d[id] || !this.d[id].n1 || !this.his)return
for (var k=0;k<this.def.length;k++){
	if(this.def[k]==id)return
	}
var x=[],i=0
x.push(id)
for (var k=0;k<this.his.length;k++){
	if(this.d[this.his[k]] && this.d[this.his[k]].n1 && this.his[k]!=id){
		x.push(this.his[k])
		if(i++>=8)break
		}
	}
this.his=x
commonui.userCache.set(this.saveKey,this.his,86400*30);
this.clearCache(1)
},//fe

clearHis:function(){
commonui.userCache.del(this.saveKey)
this.his=[]
this.clearCache(1)
},//fe

btnCache:{},

clearCache:function(){
if(this.btnCache){
	var x = []
	for (var k in this.btnCache)
		x.push(k)
	for (var i=0;i<x.length;i++)
		delete this.btnCache[x[i]]
	}
}//

}//ce


//============================
//翻译========================
commonui.autoTranslate={
fid:null,
from:null,
to:null,
exp:null,
list:[],
running:null,
main:function(o,fid,callback){
if (this.from===false)
	return

this.list.push(o)

if(this.from===null){
	this.from=true
	var self = this
	__NUKE.doRequest({
		u:window.__API.auto_trans(fid),
		f:function(x){
			if (__NUKE.doRequestIfErr(x))
				return false;
			if(!x.data || x.error){
				self.from=false
				return true
				}
			self.fid=fid
			if(typeof x.data[0][1]=='object')
				x.data = x.data[0]
			var from = x.data[0]
			self.to = x.data[1]
			self.exp = ''
			for (var k in from){
				self.exp+='|'+k.replace(/[\$\(\)\*\+\.\[\]\?\^\{\}\\]/g,"\\$0")
				if(k.toUpperCase()!=k)from[k.toUpperCase()]=from[k]
				}
			self.exp = new RegExp(self.exp.substr(1),'ig')
			self.from = from
			if(callback)
				callback()
			else
				self.loopStart()
			return true
			},
		ff:function(){self.from=false}
		})
	}
else if(callback)
	callback()
else
	this.loopStart()
},//fe

test:function (txt){
if(!this.exp)return
this.exp.lastIndex = 0
var diff = this.exp.exec(txt)
while(diff){
	var p = diff.index>0 ? txt.substr(diff.index-1,1) : ' ',
	s= diff.index+diff[0].length<txt.length ? txt.substr(diff.index+diff[0].length,1) : ' '
	if (!(p+diff[0]+s).match(/^[a-zA-Z0-9_\-]{2}|[a-zA-Z0-9_\-]{2}$/))
		return true
	if(diff.lastIndex>=txt.length)
		break
	diff = this.exp.exec(txt)
	}
},//fe

loopStart:function(o){
if(this.running)
	return
this.running=true

if(!this.from || this.from===true)
	return this.running=false

while(o=this.list.shift())
	this.actNode(o)

this.running=false
},//fe

repeatCount:{},

actNode:function(o){

if(o._hasAutoTranslated)
	return
o._hasAutoTranslated=true

var self = this, txt = [], getTxt = function(n){
	var nc = n.childNodes, l =nc.length, nn
	for(var i=0;i<l;i++){
		if(nc[i].nodeType==3)
			txt.push(nc[i])
		else if(nc[i].nodeType==1){
			nn = nc[i].nodeName.toLowerCase()
			if(nn=='div' || nn=='span' || nn=='h5' || nn=='h4')
				getTxt(nc[i])
			}
		}
	}

getTxt(o)
this.repeatCount={}
for(var i=0;i<txt.length;i++){
	var diff=false, ntxt = txt[i].nodeValue.replace(
		this.exp,
		function($0,$i){
			if (txt[i].nodeValue.substr($i-1,$0.length+2).match(/^[a-zA-Z0-9_\-]{2}|[a-zA-Z0-9_\-]{2}$/))
				return $0
			diff=true
			var u = $0.toUpperCase()
			if(!self.repeatCount[u] || self.repeatCount[u]==4)
				self.repeatCount[u]=1
			else 
				self.repeatCount[u]++
			if(self.repeatCount[u]==1)
				return '<span class="auto_trans" title="'+self.to[self.from[$0.toUpperCase()]]+'">'+$0+'</span>'
			else
				return $0
			}
		)//replace
	if(diff){
		diff = document.createElement('span')
		diff.innerHTML = ntxt
		txt[i].parentNode.replaceChild(diff,txt[i])
		}
	}
}//fe


}//ce




//============================
//子版面/联合版面 显示/选择======
commonui.selectForum = {
_ALL:null,
_NO_CURRENT:null,
reset:function(){
this._ALL = null
this._NO_CURRENT=null
},
init:function(){
var y = window.__CURRENT_FID
if(z=window.__SUB_AND_UNION_FORUM_AND_SET){
	z=z.match(/[t-]?\d+/g)
	this._ALL={}
	if(y)
		this._ALL[0] = window.__ALL_FORUM_DATA[y]
	for(var i=0;i<z.length;i++)
		this._ALL[i+1] = window.__ALL_FORUM_DATA[z[i]]
	return
	}
var z= window.__ALL_FORUM_DATA

if(!z){
	z={}
	if(x = window.__SELECTED_FORUM){
		var x = x.split(',')
		for(var i=0;i<x.length;i++)
			z[x[i]] = [x[i],'','',0,4|2|(x[i]==y ? 64 : 0)]
		window.__ALL_FORUM_DATA = z
		}
	}
if(y){
	if(!z[y])
		z[y] = [y,'','',0,64|4|2]
	else if(!z[y][4])
		z[y][4] = 64|4|2
	}
else
	this._NO_CURRENT=1

this._ALL = z
},//


/**
 * 按照bit过滤条件返回当前版面array
 * @param {type} have 必须符合的bit
 * @param {type} not 必须排除的bit
bit mask同lib_thread::_SUB
1联合版面
2用户可选择的
4(用户设置合并默认设置之后)已选择的
8版主设置的
16是个主题集合
32是个到版面的镜像
64是当前所在的版面
128用户选择的
256用户未选择的
512默认选择的
1024默认未选择的
 * @returns 
 */
get:function(have,not){
var w = window, y = {s:{},f:{},i:0,join:function(t){var x='';for(var i=0;i<this.i;i++)x+=this[i][0]+t;return x.substr(0,x.length-1)}}, z = w.__ALL_FORUM_DATA, v=function(i){return z && z[i] ? z[i] : [i,'','',0,0]}
have|=0
not|=0
if(!this._ALL)
	this.init()

for(var k in this._ALL){
	var f = this._ALL[k]
	if(((f[4]&have) || have==0) && (f[4]&not)==0)
		y[y.i++]=y.f[k]= f
	}

if(this._NO_CURRENT)
	y.nocfid = 1
return y
},

/*
*没有用户选择的版面(不包括当前)时返回fid 否则返回0
*/
getCurrent : function(fid){
var y=this.get(4,64)
if(y.i==0)
	return fid
return 0
},

/**
 *生成联合版面选择窗口
 *@param e(event 事件 用以确定窗口位置
 *@param fid(int 当前版面id
 *@param callback(function 选择后的callback 第一个参数为选择的版面id 第二个参数为选择的版面名 返回true时不阻止链接事件
 */
selectWindow : function(e,fid,callback,txt){
var $=_$,y=this.get(4),x=$('/span'),c=commonui,z=''

if(!txt)
	txt=['/post.php?action=new&_newui&','在','发布主题']

x.__sfs = y.f
x.__xoxooxoxooxox = function(e,sfid,name,stid){
	if(!callback(sfid,name,stid))
		c.cancelEvent(e)
	c.adminwindow._.hide()
	}
	
for(var j=0;j<y.i;j++){
	var f = y[j]
	if(j==8)
		z += "<button type='button' onclick='this.style.display=\"none\";this.nextSibling.style.display=\"\"'>更多</button><span style='display:none'>"
	z +="<a style='font-size:130%;font-weight:bold' href='"+txt[0]+(f[4]&16?'stid=':'fid=')+f[0]+"' onclick='this.parentNode.__xoxooxoxooxox(event?event:window.event,"+(f[4]&16?'null':'this.name')+",this.title,"+(f[4]&16?'this.name':'null')+")' class='"+(f[0]==fid? 'uitxt1' : '')+"' title='"+f[1].replace("'",' ')+"' name='"+f[0]+"'><span class='silver'>"+txt[1]+"</span> "+f[1]+" <span class='silver'>"+txt[2]+"</span></a><br/>"+(f[2] ? '<span class=gray>'+f[2]+"</span><br/>":'')+"<span style='line-height:50%'><br/></span>"
	}
if(j>=8)
	z+='</span>'
x.innerHTML=z
c.createadminwindow()
c.adminwindow._.addContent(null)
c.adminwindow._.addTitle('选择发布主题的版面')
c.adminwindow._.addContent(x)
c.adminwindow._.show(e)
return
		
},

moreSub:null,
genMoreSub:function(){
if(this.moreSub)
	return this.genSubForum(this.moreSub,2)
},
genSubForum:function(sub,opt){
var w,
bg, 
ww=window, 
bit=__SETTING.bit,
$ = _$,
iw=__SETTING.currentClientWidth
if(!this._ALL)
	this.init()
if(!sub){
	sub = this.get(0,64)

	if(!sub.i)
		return '';

	if(sub.i>14){
		var ns = {s:sub.s,f:sub.f,join:sub.join,i:0}
		for(var i=8;i<sub.i;i++)
			ns[ns.i++] = sub[i]
		sub.i = 8
		this.moreSub = ns
		}
	}

if(bit & 8 || iw<500)//7寸/500以下 单列
	w = 1
else if(bit & 4 || iw<800)//10寸/800以下 2列
	w = 2
else if(iw>1600 )//窗口宽1600+ 6列
	w = 6
else if(iw>1280 )//窗口宽1280+ 5列
	w = 5
else if(iw>1024 )//窗口宽1024+ 4列
	w = 4
else//3列
	w = 3

while(w>1 && Math.ceil(sub.i / w)==Math.ceil(sub.i / (w-1)))//如果需要的行数相同则列数-1
	w-=1

if(sub.i<w)//如果数量比列数还要少
	w= sub.i

switch(w){
	case 1:
		bg = '232323', wx = '100%'
		break;
	case 2:
		bg = '23322332', wx = '49.99%'
		break;
	case 3:
		bg = '232323', wx = '33.33%'	
		break;
	case 4:
		bg = '23233232', wx = '24.99%'
		break;
	case 5:
		bg = '232323', wx = '19.99%'
		break;
	case 6:
		bg = '232323323232', wx = '16.66%'
		break;
	}


var x=[],ff=ww.__CURRENT_FID
if(sub){
	//var data=ww.__ALL_FORUM_DATA
	for(var i=0;i<sub.i;i++){
		var f = sub[i]
		f[4] |= 0

		f.icon = (f[4]&16) ? commonui.forumIcon(0,f[0]) : commonui.forumIcon(f[0])
		f.herf = (f[4]&16) ? "/thread.php?stid="+f[0] : commonui.domainSelect(f[0])+"/thread.php?fid="+f[0]+"&ff="+ff
		f.ck = (f[4]&2) || (f[4]&768)==768 || (f[4]&1280)==1280 //可选的 或 用户设置和默认不同的
					
		if(!bg[i])
			bg += bg
		x.push(
			$('/div','name','fbk','class','c b'+bg[i], 'style',{width:wx,backgroundImage:'url('+f.icon+')','float':(i+1)%w==0 ? 'right' : 'left'},
				$('/div', 'class', 'a',
					$('/div', 'class', 'b',
						$('/a', 'href', f.herf, 'innerHTML', f[1]),
						(f[4]&48)&&(__GP.admincheck&14)? $('/a', 'href', '/read.php?tid='+f[3], 'class', 'small_colored_text_btn block_txt_c0 nobr', 'style', 'backgroundColor:silver;fontFamily:inherit', 'innerHTML', (f[4]&16) ? '合集' : '版面') : null,
						$('/br'),
						$('/p')._.add(f[2], f.ck ? $('/input','type','checkbox','checked',f[4]&4?'checked':'', 'value', ((f[4]&16)||f[3] ? 't': '')+(f[3]?f[3]:f[0]), 'title','显示/不显示此版面主题','onclick',function(){commonui.selectForum.select(this,this.value,this.checked?1:0,ff)}) : null)
						)
					)
				)
			)
 
		}
	}

if(opt&1)
	return x

if((opt&2)==0 && this.moreSub ){
	x[x.length-1]._.add(
		$('/a', 'style','float:right;color:#fff;height:1.5em;padding:0 0.3em;marginTop:-1.5em;borderBottomRightRadius: 2.5px;background:'+__COLOR.border2, 'href', 'javascript:void(0)', 'innerHTML', '更多', 'onclick', function(){
			this.style.display='none'
			var z=this.parentNode.parentNode, y = commonui.selectForum.genSubForum(commonui.selectForum.moreSub , 1)
			z._.add(y)
			})
		)
	}
	
var c = $('/div','className','catenew',
	'id','sub_forums',
	'style',{overflow:'hidden'}
	)
	
if(bit & (1024 | 8)){//7inch embe
	c._.add(
		$('/button', 'onclick', function(){this.style.display="none";this.nextSibling.style.display="block"}, 'type','button', 'innerHTML','点击显示隐藏的版面'),
		$('/span','style','display:none')._.add(x)
		)
	}
else
	c._.add(x)

return c
},//fe

select:function(o,id,show,cfid){
if(!cfid)cfid = window.__CURRENT_FID
if(id|0)//forum
	__NUKE.doRequest({
		u:{u:__API._base+'__lib=user_option&__act=set&raw=3&'+(show ? 'add':'del')+'='+id,
			a:{fid:cfid,type:0}
			},
		b:o
		})
else//set or quote topic, start with 't'
	commonui.ignoreTopic(o,cfid,id.substr(1),!show)
}//fe

}//ce




//============================
//拖曳菜单=====================
commonui.dragMenuInit = function(){
}//fe


}//be






//==================================
//公用UI 杂项
//==================================
{
//收藏主题=====================
commonui.favor = function (e,o,tid,pid){
var x , a, b, $=_$, c=function(){if(a && b){alert('操作完成');commonui.adminwindow._.hide()}}
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('收藏'+(pid?'回复':'主题'))
this.adminwindow._.addContent(
	x = $('/div')._.add(
			$('/input').$0('type','checkbox','checked','1'), ' 个人收藏', $('/br'),
				//$('/input').$0('type','checkbox'),' 公开收藏到 ', 
				//$('/a').$0('href','/column.php','target','_blank','innerHTML','[聚聚]', 'onclick',function(){commonui.adminwindow._.hide()}), 
				//$('/br'),
				//$('/a').$0('href','/column.php?action=create_archive','target','_blank','innerHTML','[公开收藏并编写摘要]', 'onclick',function(){commonui.adminwindow._.hide()}), 
				//$('/br'),
			$('/br'),
			$('/button').$0('innerHTML','确定','onclick',function(){
				this.disabled=1
				var y = x.getElementsByTagName('input')
				if(y[0] && y[0].checked)
					__NUKE.doPost({u:__API.favorTopic(tid,pid),
						f:function(){
							a = 1
							c()
							} 
						})
				else
					a=1
				if(y[1] && y[1].checked)
					__NUKE.doPost({u:__API.favorTopic(tid,pid,1),
						f:function(){
							b = 1
							c()
							} 
						})
				else
					b=1
				})
			)
	)
this.adminwindow._.show(e)
}//fe

commonui.favordelmass = function (o){
var tids=commonui.massAdmin.getChecked(), p = window.location.search.match(/(?:\?|&)page=(\d+)/)
if(p)
	p = p[1]
else
	p = 1
if(tids)
	__NUKE.doPost({u:__API.favorTopicDel(tids,p),	b:(o & o.tagName)?o:null })
else
	alert('请选择主题')
}//fe


/**
  * randomTitle
  * @param {type} e
  * @returns {unresolved}
  */
commonui.randomTitle = function (){
if(!window.__CURRENT_UID || !window.__NOW)
	return alert('需要先登陆')
this.createadminwindow()
this.adminwindow._.addContent(null)
var $ = _$,x=$('/span')
this.adminwindow._.addTitle('限时头衔')
this.adminwindow._.addContent(
	x=$('/span')._.add(
		'提交一个头衔 你将有三分之一的几率获得你自己提交的头衔 持续7天',
		$('/br'),
		'有时限的头衔之间会互相覆盖 但是不会影响永久头衔',
		$('/br'),$('/br'),
		$('/input')._.attr('size',20),
		$('/br'),$('/br'),
		$('/button')._.attr({innerHTML:'提交',type:'button'})._.on('click',function(){
				var p = this.previousSibling.previousSibling.previousSibling.value.replace(/^\s*|\s*$/g,'')
				__NUKE.doRequest({
					u:{u:__API._base,
							a:{__lib:"set_title",__act:"random_title",title:p,raw:3}
							},
					b:this,
					f:function(d){
						var e 
						if(e = __NUKE.doRequestIfErr(d))
							return alert(e)
						x.innerHTML = ''
						x._.add(
							'你获得了头衔 '+d.data[0][0]+' 由 '+d.data[0][2]+'('+d.data[0][1]+') 提供 持续7天',
							$('/br'),$('/br'),
							$('/button')._.attr({innerHTML:'使用',type:'button'})._.on('click',function(){
								commonui.adminwindow._.hide()
								}),
							$('/button')._.attr({innerHTML:'不使用',type:'button'})._.on('click',function(){
								__NUKE.doRequest({
									u:{u:__API._base,
											a:{__lib:"set_title",__act:"remove_random_title",raw:3}
											},
									b:this
									})
								commonui.adminwindow._.hide()
								})
							)
						}
					})
				}
			)
		)
	)
this.adminwindow._.show()
}//fe

//baidu ip====================
commonui.ipArea = function (e,ip){
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addContent(
	_$('/div').$0('style',{width:'366px',height:'150px',overflow:'hidden'},
		_$('/iframe').$0('src','http://www.ip.cn/index.php?ip='+ip,'style',{width:'366px',height:'410px',border:'none',marginTop:'-250px'})
		)
	)
this.adminwindow._.show(e)
}//fe

//关键字监视记录===============
commonui.filterList = function(e,fid,id,n){
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('关键字监视记录 FID:'+fid)
var $ = _$, x=$('/table').$0('className','forumbox')
this.adminwindow._.addContent(x)
this.adminwindow._.show(e)
__NUKE.doRequest({
	u:{u:__API._base,a:{__lib:'filter',__act:'get_log',raw:3,fid:fid,id:id}},
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		var l = d.data[0], t = d.data[1], u = d.data[2],i=0
		for(var k in l){
			x._.add(
				$('/tr').$0('className','row'+(1+((i++)&1)),
					$('/td').$0('className','c1',
						$('/a').$0('className','b','target','_blank','innerHTML',u[l[k][3]][0],'href','/nuke.php?func=ucp&uid='+l[k][3])
						),
					$('/td').$0('className','c2',
						$('/a').$0('className','b','target','_blank','innerHTML',t[l[k][0]][0],'href','/read.php?tid='+l[k][0]+(l[k][1]?'&pid='+l[k][1]+'&to=1':''))
						),
					$('/td').$0('className','c3',
						'innerHTML',commonui.time2date(l[k][4], 'm-d H:i')
						),
					$('/td').$0('className','c4',
						'innerHTML',l[k][5]
						)
					)
				)
			}
		//request2
		}
	})//request
}//fe


//设置签名=====================
commonui.setSign = function (e,uid,ad){
if(!__CURRENT_UID)
	return alert('需要先登陆')
var x,y,$=_$,n = function(u){return $('/input').$0('value',u?u:'','size','50')}
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('设置签名'+(uid==__CURRENT_UID?'':' UID:'+uid))
this.adminwindow._.addContent(x = $('/span'),
	(ad && uid!=__CURRENT_UID)?$('/span')._.add(
		'禁用签名 ',
		y=$('/select')._.add(
			$('/option').$0('innerHTML','--','value',0),
			$('/option').$0('innerHTML','3天','value',3),
			$('/option').$0('innerHTML','7天','value',7),
			$('/option').$0('innerHTML','15天','value',15),
			$('/option').$0('innerHTML','30天','value',30),
			$('/option').$0('innerHTML','60天','value',60)
			),
		'天 ',
		$('/br')
		):null,
	x = $('/textarea').$0('value','','cols','35','rows','20','title','签名可以使用bbscode'),
	$('/br'),
	$('/button').$0('innerHTML','确定','type','button','onclick',
		function(){
			__NUKE.doRequest({
				u:__API.setSign(uid,x.value,y?y.options[y.selectedIndex].value:''),
				b:this,
				f:function(d){
					var e = __NUKE.doRequestIfErr(d)
					if(e)
						return alert(e)
					alert(d.data[0])
					}
				})
			})
	)

__NUKE.doRequest({
	u:__API.getSign(uid),
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		x.value = ubbcode.unSecureText(d.data[0]+'').replace(/\s*$/,'')
		}
	})

this.adminwindow._.show(e)
}//fe

//移动验证器===================
commonui.extraAuthInput = function (e){
if(!window.__CURRENT_UID)
	return alert('需要先登陆')
this.createadminwindow()
this.adminwindow._.addTitle('移动验证器(beta)')
this.adminwindow._.addContent(null)
var $ = _$,self=this
if(__GP.userBit & 128)	this.adminwindow._.addContent(
	'请确保设备时间准确 ',$('/button').$0('type','button','innerHTML','查看服务器时间','onclick',function(){
		__NUKE.doRequest({
			u:'/nuke.php?__lib=safe_reg&__act=get_server_time&raw=1',
			b:this,
			f:function(d){
				var e = __NUKE.doRequestIfErr(d)
				if(e)
					return alert(e)
				alert(d.data[1])
				}
			})
		}),$('/br'),
	'输入移动验证器上显示的数字',$('/br'),
	$('/input')._.attr('size',20),
	$('/button')._.attr({innerHTML:'验证',type:'button'})._.on('click',function(){
			var p = this.previousSibling.value.replace(/^\s*|\s*$/g,''),
			s='salt'+Math.floor(Math.random()*10000), md5 = hex_md5(p+s+__CURRENT_UID)+s
			__NUKE.doRequest({
				u:window.__API.extraAuth(md5,this.nextSibling.nextSibling.checked?1:''),
				b:this,
				f:function(d){
					var e = __NUKE.doRequestIfErr(d)
					if(e)
						return alert(e)
					alert(d.data[0])
					}
				})

			}
		),$('/br'),
	$('/input').$0('type','checkbox'),'清除其他浏览器/客户端上的验证状态',
	$('/br'),$('/br'),$('/br'),
	$('/button').$0('type','button','innerHTML','解除绑定移动验证器','onclick',function(){
		if(confirm('点击确认 取消验证器的说明将被发送到你的帐号信箱'))
			__NUKE.doRequest({
				u:'/nuke.php?__lib=safe_reg&__act=auth_unactive_send&raw=1',
				b:this,
				f:function(d){
					var e = __NUKE.doRequestIfErr(d)
					if(e)
						return alert(e)
					alert(d.data[0])
					}
				})
		})
	)
else	this.adminwindow._.addContent(
	"你可以为你的帐号绑定移动验证器 ",
	$('/a').$0('href','http://baike.baidu.com/view/2233048.htm','target','_blank','className','b','innerHTML','(什么是移动验证器)'),
	$('/br'),$('/br'),
	'绑定移动验证器后某些操作将需要使用验证器验证之后方可进行，包括',$('/br'),
	' . 某些管理功能',$('/br'),
	$('/br'),
	'绑定/取消绑定 需要通过你的帐号的邮箱进行操作',$('/br'),
	$('/br'),
	'绑定新的移动验证器会使旧的失效',$('/br'),
	$('/br'),
	'如果你使用多个设备/客户端/浏览器进行受限操作，你需要在每一个设备/客户端/浏览器都进行验证',$('/br'),
	$('/br'),
	'验证器每次验证之后可能保持数天的验证状态',$('/br'),
	$('/br'),
	'如果你的接入网络的IP变化较大，你可能需要频繁进行验证',$('/br'),
	$('/br'),$('/br'),
	$('/button')._.attr({innerHTML:'下一步',type:'button'})._.on('click',function(){
			var x,y,z
			self.adminwindow._.addContent(false)
			self.adminwindow._.addContent(
				'如果你希望为你的帐号绑定移动验证器',$('/br'),
				x=$('/input').$0('type','checkbox'),$('/b').$0('innerHTML','请首先确保你的帐号注册邮箱真实可用'),$('/br'),
				'假如你的邮箱无法使用',$('/a').$0('href','/read.php?tid=7504167','className','b','innerHTML','可参照此贴处理','target','_blank'),
				$('/br'),$('/br'),
				y=$('/input').$0('type','checkbox'),$('/b').$0('innerHTML','然后在你的移动设备中安装 "Google Authenticator" 或 "Google身份验证器"'),$('/br'),
				'Google身份验证器无需联网 无需Google账号亦可使用',$('/br'),
				'请在安全的软件市场中下载此程序',$('/br'),
				$('/a').$0('href','https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2','className','b','innerHTML','Android','target','_blank'),', ',$('/a').$0('href','http://www.wandoujia.com/apps/com.google.android.apps.authenticator2','className','b','innerHTML','Android*','target','_blank'),', ',$('/a').$0('href','https://itunes.apple.com/en/app/google-authenticator/id388497605','className','b','innerHTML','IOS','target','_blank'),', ',$('/a').$0('href','http://www.windowsphone.com/en-us/store/app/authenticator/021dd79f-0598-e011-986b-78e7d1fa76f8','className','b','innerHTML','WP','target','_blank'),', ',$('/a').$0('href','https://winauth.com/','className','b','innerHTML','Windows','target','_blank'),
				$('/br'),$('/br'),
				'安装好验证器之后 请在此填入一个临时密码(数字和字母)',$('/br'),
				'并点击下一步以添加账号',$('/br'),
				z=$('/input')._.attr('maxlength',6,'size',10),
				$('/button')._.attr({innerHTML:'下一步',type:'button'})._.on('click',function(){
						if(!x.checked || !y.checked)return alert('请确认勾选前提条件')
						var p = z.value.replace(/^\s*|\s*$/g,'')
						if(!p)return
						var s='salt'+Math.floor(Math.random()*10000), md5 = hex_md5(p+s+__CURRENT_UID)+s
						__NUKE.doRequest({
							u:{u:'/nuke.php?__lib=safe_reg&__act=auth_code_send&raw=3',a:{secret:this.previousSibling.value}},
							b:this,
							f:function(d){
								var e = __NUKE.doRequestIfErr(d)
								if(e)
									return alert(e)
								alert(d.data[0])
								}
							})

						}
					)
				)
 
		})
	)
this.adminwindow._.css('width','40em')
this.adminwindow._.show(e)
}//fe

commonui.loginlog=function(){
if(!window.__GP || !__GP.loginlog)
	return
var x = this.createCommmonWindow()
x.style.position='fixed'
x._.addTitle('登录记录')
document.body.insertBefore(x,document.body.firstChild)
__NUKE.doRequest({
	u:{u:'/nuke.php?__lib=ucp&__act=self_login_log&raw=3',a:{ck:__GP.loginlog}},
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return
		for(var k in d.data[0]){
			var v= d.data[0][k]
			x._.addContent(
				_$('/span','innerHTML',commonui.time2date(v[1],'Y-m-d H:i:s')+' &emsp; '+v[2]+' &emsp; '+[v[0] >>> 24, v[0] >>> 16 & 0xFF, v[0] >>> 8 & 0xFF, v[0] & 0xFF].join('.')),_$('/br'))
			}
		if(v)
			x._.show(0,0)
		}
	})
}//fe


//lesser nuke=================
commonui.lessernuke = function (e,tid,pid,f)
{
this.createadminwindow()
this.adminwindow._.addContent(null)
var self=this,$ = _$, rg, rf, rs, m2, m4, m6, n1, n2, n3, n4, il, is, il, rf, ff=location.search.match(/_ff=(\d+)/), y= $('/span')
this.adminwindow._.addTitle('次级NUKE');

this.adminwindow._.addContent(
	$('/span')._.add(
		rg = $('/input').$0('type','radio','name','opt0'),'全论坛 ',
		rf = $('/input').$0('type','radio','name','opt0','checked',1),'本版面 ',
		rs = $('/input').$0('type','radio','name','opt0'),'本合集 ',
		rr = $('/input').$0('type','radio','name','opt0'),'本版声望 ',
		$('/br'),
		m2 = $('/input').$0('type','radio','name','opt1','checked',1),'禁言2天 ',
		m4 = $('/input').$0('type','radio','name','opt1'),'禁言4天 ',
		m6 = $('/input').$0('type','radio','name','opt1'),'禁言6天 ',
		$('/br'),
		$('/input').$0('type','radio','name','opt2','checked',1),'不扣减声望 ',
		n1 = $('/input').$0('type','radio','name','opt2'),'扣减声望',$('/span','className','silver','innerHTML','(150) '),
		n2 = $('/input').$0('type','radio','name','opt2'),'加倍扣减声望',
		$('/br'),
		n3 = $('/input').$0('type','checkbox'),'同时扣减威望',$('/span','className','silver','innerHTML','(150:1 仅在有正式声望的版面)'),
		$('/br'),
		n4 = $('/input').$0('type','checkbox'),'延时',$('/span','className','silver','innerHTML','(从下次发言开始禁言)'),
		$('/br'),
		$('/br'),
		is = $('/input').$0('placeholder','操作说明(将显示在帖子中)','maxlength','20','onfocus',function(e){if(isl.style.display=='none'){
				isl.style.display=''
				this.blur()
				this.placeholder='使用攻击性言辞将被禁止填写'
				commonui.cancelEvent(e)
				}
			}),
		 f ? (isl = $('/span','style','display:none',$('/br'))) :null,
		$('/br'),
		$('/br'),
		il = $('/textarea').$0('placeholder','更长的操作说明(将通过短信发送)','rows','3','cols','20'),
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
			var opt = 0;
			if(rg.checked)opt|=128
			if(rf.checked)opt|=256
			if(rs.checked)opt|=512
			if(rr.checked)opt|=8192
			if(m2.checked)opt|=16
			if(m4.checked)opt|=32
			if(m6.checked)opt|=64
			if(n1.checked)opt|=1
			if(n2.checked)opt|=2
			if(!n3.checked)opt|=2048
			if(n4.checked)opt|=4096
			var sls =  isl.getElementsByTagName('input'),ist=is.value? is.value : ''
			for(var i=0;i<sls.length;i++){
				if(sls[i].checked)
					ist+="\t"+sls[i].value
				}
			if(!ist)
				return alert("需要操作说明")
			self.lessernuke['info_'+tid+'_'+pid] = ist
			__NUKE.doRequest({
				u:__API.lesserNuke2(tid, pid, opt, il ? il.value.replace(/^\s+|\s+$/g,''):'' , ist,''),
				b:this,
				inline:true
				})
			}
		),
		y
	)
	)

this.adminwindow._.show(e)

__NUKE.doRequest({
	u:{u:'/nuke.php?__lib=admin_log_search&__act=lesser_list&raw=3',a:{tid:tid,pid:pid}},
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return
		var d = d.data[0], t= $('/table').$0('className','forumbox')
		for(var k in d)
			t._.add($('/tr').$0('className','row'+(1+(k&1)))._.add(
				$('/td').$0('className','c1','style','padding:0.25em').$0('innerHTML',adminui._formatLog(d[k][5])	),
				$('/td').$0('className','c2','style','padding:0.25em')._.add(
					$('/span').$0('className','xtxt','innerHTML',commonui.time2date(d[k][6], 'y-m-d H:i'))
					)
				))
		y.innerHTML = ''
		y._.add($('/br'), '被操作记录', $('/br'), t)
		}
	})
	
if(f)
	__NUKE.doRequest({
		u:{u:'/nuke.php?__lib=modify_forum&__act=get_rule&raw=3',a:{tid:tid,pid:pid,fid:f,ffid:(ff?ff[1]:'')}},
		f:function(d){
			var e = __NUKE.doRequestIfErr(d)
			if(e)
				return
			var x = d.data[0].replace(/^\s+|\s+$/g,'').split("\n")
			for(var i=0;i<x.length;i++){
				if(x[i]){
					isl._.add(
						$('/nobr')._.add($('/input','type','checkbox','value',x[i]),
						x[i]),' '
						)
					}
				}
			isl._.add($('/button','innerHTML','编辑','type','button','onclick',function(e){commonui.editRule(e,f)}))
			}
		})
	
}//fe

commonui.editRule = function(e,f){
var $ = _$, info
if(!f)return
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('编辑预设说明 FID:'+f);

this.adminwindow._.addContent(
	info = $('/textarea').$0('value','','rows','20','cols','20'),
	$('/br'),
	$('/span').$0('innerHTML','换行或者空格分隔'),$('/br'),
	$('/br'),
	$('/button').$0('innerHTML','确定','type','button','onclick',function(){
		__NUKE.doRequest({
			u:{u:'/nuke.php?__lib=modify_forum&__act=set_rule&raw=3',a:{fid:f,rule:info.value.replace(/^\s+|\s+$/g,'').replace(/\s+/g,'\n')}},
			b:this
			})
		}
	)
	)
this.adminwindow._.show(e)

__NUKE.doRequest({
	u:{u:'/nuke.php?__lib=modify_forum&__act=get_rule&nop=1&raw=3',a:{fid:f}},
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return
		info.value = d.data[0].replace(/^\s+|\s+$/g,'').replace(/\s+/g,'\n')
		}
	})
}//fe


//添加评论=====================
commonui.comment = function (event,tid,pid)
{

__NUKE.doRequest({
	u:__API.postGet(tid,pid,postfunc.__REPLY,null,null,1),
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		if(d.data.__MESSAGE)
			return alert(d.data.__MESSAGE[1])

		var d= d.data

		commonui.comment_sub(event,d.tid,d.pid,d.fid,__NUKE.toInt(d.__F.bit_data),d.content,d.warning)

		}
	})
}//fe

commonui.comment_sub = function (e,tid,pid,fid,fbit,c,warning)
{
this.createadminwindow()
this.adminwindow._.addContent(null)
var $ = _$, x, y=null, a=null;
this.adminwindow._.addTitle('评论/贴条');
if(warning){
	y=$('/b')._.cls('red')
	for(var k in warning){
		if(typeof(warning[k])=='object')
			y._.add(warning[k][1],$('/br'))
		} 
	}
this.adminwindow._.addContent(
	$('/form')._.add(
		'不超过300字, 一些BBSCODE无效',
		$('/br'),
		y,
		y?$('/span').$0('class','silver','innerHTML','主题发布者 可以评论主题中的回复<br/>如果一个帖子被其他人评论 那么它的发布者也可以评论<br/>'):null,
		$('/br'),
		x = $('/textarea').$0('name','info','rows','5','cols','40'),
		$('/br'),
		a = $('/input').$0('type','checkbox','checked',''),
		' 匿名(100铜币)',
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				x.value = x.value.replace(/^\s+|\s+$/,'')
				if(x.value.length==0)return
				//alert(c ? c+x.value : x.value)

				commonui.newPost(
					this,
					postfunc.__REPLY,//操作
					fbit,//版面bit type
					fid,//版面id
					tid,//主题id
					pid,//回复id
					null,//o_setTopic
					null,//标题
					c ? c+x.value : x.value,//内容
					0,//隐藏帖子 仅版主可见
					0,//只有作者和版主可回复
					null,//附件
					null,//附件校验
					null,//投票内容
					null,// 0投票 1投注铜币
					null,//每人最多可投 0不限
					null,//小时后结束
					null,//投注最大值
					null,//投注最小值
					null,//投票的声望限制
					null,
					1,
					a.checked?1:null
					)
				}
			)
		)
	)
this.adminwindow._.show(e)

}//fe


//设置集合主题的管理员==========
/**
 *admins为undefined会取当前的管理员信息
 */
commonui.setTopicAdmin = function (e,stid,admins)
{
if(admins===undefined){
	__NUKE.doRequest({
		u:__API.setTopicAdmin(stid),
		f:function(d){
			var e = __NUKE.doRequestIfErr(d)
			if(e)
				return alert(e)
			commonui.setTopicAdmin( e, stid, d.data[0] ? d.data[0] : '' )
			return true
			}
		})
	return
	}
this.createadminwindow()
this.adminwindow._.addContent(null)
var $ = _$, x, y='';
for(var x in admins)
	y+=admins[x]+"\n"

this.adminwindow._.addTitle('设置集合管理员');

this.adminwindow._.addContent(
	$('/span')._.add(
		'集合管理员可以编辑集合主题的内容',
		$('/br'),
		'可以将主题移出集合',
		$('/br'),
		'可以编辑黑名单',
		$('/br'),
		'每行填入一个用户ID或用户名',
		$('/br'),
		'数字用户名前需加\\ ',
		$('/br'),
		x = $('/textarea').$0('value',y,'rows','5','cols','40'),
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				x.value = x.value.replace(/^\s+|\s+$/,'')
				//if(x.value.length==0)return
				__NUKE.doRequest({
					u:__API.setTopicAdmin(stid, x.value)
					})
				}//fe
			)
		)
	)
this.adminwindow._.show(e)
}//fe

//设置集合主题的黑名单==========
/**
 *admins为undefined会取当前的管理员信息
 */
commonui.setTopicBlock = function (e,stid,blocks)
{
if(blocks===undefined){
	__NUKE.doRequest({
		u:__API.setTopicBlock(stid),
		f:function(d){
			var e = __NUKE.doRequestIfErr(d)
			if(e)
				return alert(e)
			commonui.setTopicBlock( e, stid, d.data[0] ? d.data[0] : '' )
			return true
			}
		})
	return
	}
this.createadminwindow()
this.adminwindow._.addContent(null)
var $ = _$, x, y='';
for(var x in blocks)
	y+=blocks[x]+"\n"
this.adminwindow._.addTitle('设置集合主题黑名单');

this.adminwindow._.addContent(
	$('/span')._.add(
		'黑名单中的用户无法在集合中发帖',
		$('/br'),
		'每行填入一个用户ID或用户名',
		$('/br'),
		'数字用户名前需加\\ ',
		$('/br'),
		x = $('/textarea').$0('value',y,'rows','5','cols','40'),
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				x.value = x.value.replace(/^\s+|\s+$/,'')
				//if(x.value.length==0)return
				__NUKE.doRequest({
					u:__API.setTopicBlock(stid, x.value)
					})
				}//fe
			)
		)
	)
this.adminwindow._.show(e)
}//fe

//设置帖子或主题的属性==========
commonui.setPost = function (e,tid,pid,tf)
{
this.createadminwindow()
this.adminwindow._.addContent(null)
var $ = _$, de=null,t=null,p=null,pm,info,infoss,tff

this.adminwindow._.addTitle('设置帖子属性');


de = $('/select').$0('name','delay')
de.$0($('/option').$0('value','','innerHTML','立刻'))
for (var i=0.5;i<24;i+=0.5)
	de.$0($('/option').$0('value',i*3600,'innerHTML',i+"小时后"))


var f = function(e){
	var x = this
	if(x.innerHTML=='on')
		x.innerHTML='off',x.title='否';
	else if(x.innerHTML=='off')
		x.innerHTML='--',x.style.backgroundColor='gray',x.title='保持当前设置';
	else if(x.innerHTML=='--')
		x.innerHTML='on',x.style.backgroundColor='#551200',x.title='是';
	}, 
	ck=function(k){
	return $('/a').$0('href','javascript:void(0)','title','保持当前设置','className','small_colored_text_btn stxt block_txt_c0','name',k,'onclick',f,'innerHTML','--','style',{backgroundColor:'gray'})
	},
g=function(all){
	for(var i=0;i<all[0].length;i++)
		p._.add( ck(all[0][i][0]), ' ', all[0][i][1], $('/br'))
	for(var i=0;i<all[1].length;i++)
		t._.add( ck(all[1][i][0]), ' ', all[1][i][1], $('/br'))
	},
p = $('/div')
t = $('/div')

this.adminwindow._.addContent(
	$('/form')._.add(
		de,
		p,
		pid ? null : t,
		$('/br'),$('/span').$0('className','small_colored_text_btn stxt block_txt_c0','innerHTML','--','style',{backgroundColor:'gray'}),' 意为"保持当前状态"',
		$('/br'),'*隐藏且锁定的回复在列表中不可见',
		$('/br'),'**隐藏的状态标记作者仅在编辑时可见',
		$('/br'),$('/br'),
		pm = $('/input').$0('type','checkbox','name','pm'),' 给用户发送短消息',
		$('/br'),
		info = $('/textarea').$0('name','info','rows','3','cols','20'),
		tf ? $('/span')._.add(
			$('/br'),
			infoss = $('/select').$0($('/option').$0('innerHTML','预设说明','style',{color:'silver'}), 'onchange',function(){if(this.selectedIndex)this.parentNode.previousSibling.value+=' '+this.options[this.selectedIndex].innerHTML}),
			$('/button').$0('innerHTML','编辑','type','button','onclick',function(e){commonui.editRule(e,tf)})
			) :null,
		$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				var f = this.parentNode
				if(!tid){
					var tids = commonui.massAdmin.getChecked()
					if(!tids)return
					tids = tids.replace(/,/g,',0,')+',0'
					}
				var tOn=0, tOff=0, pOn=0, pOff=0, x = p.getElementsByTagName('a')
				for(var i=0;i<x.length;i++){
					if(x[i].innerHTML=='on')
						pOn |= parseInt(x[i].name, 10)
					else if(x[i].innerHTML=='off')
						pOff |= parseInt(x[i].name, 10)
					}
				if(t){
					var x = t.getElementsByTagName('a')
					for(var i=0;i<x.length;i++){
						if(x[i].innerHTML=='on')
							tOn |= parseInt(x[i].name, 10)
						else if(x[i].innerHTML=='off')
							tOff |= parseInt(x[i].name, 10)
						}
					}
				if(pOn&32768){
					if(!confirm('转为合集后不能转回 是否继续'))
						return
					}
				if(!tOn && !tOff && !pOn && !pOff)
					return
				__NUKE.doRequest({
					u:__API.setPost(
						tid ? tid+','+(pid?pid:0) : tids, 
						tOn,
						tOff,
						pOn,
						pOff,
						pm.checked?1:'',
						info.value.replace(/^\s+|\s+$/,''),
						de.value,
						window.__CURRENT_FID?__CURRENT_FID:''

						),
					b:this
					})
				}
			)
		)
	)
this.adminwindow._.show(e)
if(tid){
__NUKE.doRequest({
	u:{u:__API._base+'__lib=topic_lock&__act=get&raw=3',
				a:{tid:tid,pid:pid?pid:0}
				},
	f:function(d){
		if(!d.data)return
		var tt = d.data[0]|0,tm = d.data[1]|0,pt = d.data[2]|0,qq= d.data[2]|0
		if(pt){
			var x = p.getElementsByTagName('a')
			for(var i=0;i<x.length;i++){
				if(((x[i].name|0)&pt) == (x[i].name|0))
					x[i].style.borderRight = '1em solid #5dbbbb'
				}
			}
		if(t && tm){
			x = t.getElementsByTagName('a')
			for(var i=0;i<x.length;i++){
				if(((x[i].name|0)&tm) == (x[i].name|0))
					x[i].style.borderRight = '1em solid #5dbbbb'
				}
			}
			
		g( commonui.getPostBitEdit((pt&32768)? 1 : 0, pid?1:0, (pt&2097152)?1:0, qq?1:0, (__GP.admincheck&2) ? 2:0) )
		

		}
	})
}
else
	g( this.getPostBitEdit(0, 0, 0, 0, (__GP.admincheck&2) ? 2:0) )
	
if(tf)
	__NUKE.doRequest({
		u:{u:'/nuke.php?__lib=modify_forum&__act=get_rule&raw=3',a:{fid:tf,ffid:((tff=location.search.match(/_ff=(\d+)/))?tff[1]:'')}},
		f:function(d){
			var e = __NUKE.doRequestIfErr(d)
			if(e)
				return
			var x = d.data[0].replace(/^\s+|\s+$/g,'').split("\n")
			for(var i=0;i<x.length;i++){
				infoss._.add(
					$('/option').$0('innerHTML',x[i])
					)
				}
			}
		})
}

//login========================
commonui.loginUi = function (u)
{
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addContent(_$('/iframe','style','border:0;width:390px;height:990px','frameborder','0','src','https://'+location.host+'/nuke.php?__lib=login&__act=login_ui'+(u?'&url='+encodeURIComponent(u):'')))
this.adminwindow._.show()
}//fe

//举报========================
commonui.logPost = function (e,tid,pid)
{
var $ = _$
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('向版主举报此贴')
this.adminwindow._.addContent(
	$('/span')._.add(
		$('/input','placeholder','举报理由'),$('/br'),
		$('/button','innerHTML','提交','type','button','onclick',function(){
				__NUKE.doRequest({
					u:{
						u:__API._base+'__lib=log_post&__act=report',
						a:{'tid':tid,'pid':pid,'info':this.previousSibling.previousSibling.value,'raw':3}
						},
					b:this
					})
				}
			)
		)
	)
this.adminwindow._.show(e)
}//fe
//推荐========================
commonui.logPostRecommend = function (e,tid,pid)
{
var $ = _$
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('向工作人员推荐此贴')
this.adminwindow._.addContent( 
	$('/span')._.add(
		$('/button','innerHTML','提交','type','button','onclick',function(){
				__NUKE.doRequest({
					u:{
						u:__API._base+'__lib=log_post&__act=recommend',
						a:{'tid':tid,'pid':pid,'raw':3}
						},
					b:this
					})
				}
			)
		)
	)
this.adminwindow._.show(e)
}//fe
//设置用户声望=================
/**
 * @param {type} e
 * @param {type} fid
 * @param {type} uid
 * @returns {undefined}
 */
commonui.setUserRepu = function (e,fid,uid)
{
this.createadminwindow()
this.adminwindow._.addContent(null)
var $ = _$, x,y,z
this.adminwindow._.addTitle('设置用户在本版面的声望');

this.adminwindow._.addContent(
		x = $('/input').$0('type','text','size','10','value',uid?uid:''),' UID或用户名',
		$('/br'),
		y = $('/input').$0('type','text','size','5'),' 声望值(-21000~21000)',
		$('/br'),$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				__NUKE.doRequest({
					u:__API.set_user_reputation(fid,x.value,y.value),
					b:this
					})
				}
			)

	)
this.adminwindow._.show(e)
}
//fe

//论坛信息=====================
/**
 * @param {type} o
 * @param {type} totalinbbs
 * @param {type} userinbbs
 * @param {type} unvalidateuser
 * @param {type} guestinbbs
 * @returns {undefined}
 */
commonui.getBoardInfo = function (o,totalinbbs,userinbbs,unvalidateuser,guestinbbs){
httpDataGetter.script_muti_get(
'/nuke.php?func=custom_index&f=info',
function(data){
	if (!data)return false;
	o.innerHTML = "<table style='width:100%' cellpadding='0px' cellspacing='0px'><tr>\
	<td style='text-align:left;vertical-align:bottom;'>\
		<div class='nav'><strong>"+data['notice']+"</strong></div>\
	</td>\
	<td style='text-align:right;line-height:18px'>\
		共 <span class='numeric'>"+totalinbbs+"</span> 人在线,<span class='numeric'>"+userinbbs+" <span title='未验证'>("+unvalidateuser+")</span></span> 位会员,<span class='numeric'>"+guestinbbs+"</span> 位访客<br/>\
		最多 <span class='numeric'>"+data['higholnum']+"</span> 人 <span class='numeric'>("+time2date(data['higholtime'])+")</span><br/>\
		共 <span class='numeric'>"+data['threads']+"</span> 篇主题,<span class='numeric'>"+data['posts']+"</span>  篇帖子,<span class='numeric'>"+data['members']+"</span>  位会员<br/>\
		<a href='thread.php?authorid="+__CURRENT_UID+"&date=all'>我的主题</a> · <a href='thread.php?recommend=1&date=all'>精华区</a> · <a href='/thread.php?favor=1'>我的收藏</a> · 欢迎新会员 <a href='profile.php?uid="+data['newmember']['uid']+"' class='green'>"+data['newmember']['username']+"</a>\
	</td>\
</tr></table>";
	return true;
	},
function(){
	o.innerHTML='读取错误';
	},
'gbk'
);
}//fe

//账号操作===
commonui.accountAction = function(act){
if(!this.ucp)
	__SCRIPTS.load('ucp',function(){commonui.ucp.accountAction(act)})
else
	commonui.ucp.accountAction(act)
}//fe
commonui.accountAction.close = function(){commonui.adminwindow._.hide()}

//178直播======================
commonui.loadLiveIframe = function(tid){
put("<iframe src='http://zhibo.178.com/comment/?tid="+tid+"&parent="+location.hostname+"' style='border:none;width:100%;overflow:hidden' scrolling='no' id='live_iframe' name='live_iframe' class='live_iframe'></iframe>")
var a = $('m_pbtntop').getElementsByTagName('a')
for(var i=0;i<a.length;i++)
	if(a[i].title=='发表回复')
		a[i].parentNode.style.display='none'
}

//=============================
commonui.fastPostUi =function(){}



}//be






