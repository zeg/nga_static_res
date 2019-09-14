
//==================================
//commonui
//==================================
if (!window.commonui)
	var commonui = {}

commonui._w = window

//==================================
//����һЩ����
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





//�ж���iframe��===============
;(function(){
var x=false
if (window.parent!=window.self)
	x = true
commonui.checkIfInIframe = function(){return x}
})();//fe





//==================================
//__API ��̳api
//==================================
var __API = {
auto_trans:function(fid){//�Զ������ȡ�б�
	return [this._cache+'auto_translate/'+fid+'.js',
		this._base+'__lib=auto_translate&__act=auto_translate&raw=1&fid='+fid]
	},
auto_trans_set:function(fid){//�Զ������޸�
	return this._base+'__lib=auto_translate&__act=auto_translate&set=1&fid='+fid
	},
//auto_trans_save:function(form,fid){//�Զ����뱣�� , ���� content
//	return this._gen(form, '__lib', 'auto_translate', '__act', 'auto_translate', 'save', 1, 'fid', fid )
//	},
admin_code:function(){//��������
	return this._base+'__lib=admin_code&__act=admin_code&raw=1'
	},
user_forum_manage:function(fid){//�û��������
	return this._base+'func=userforum&act=manage&fid='+fid
	},
user_forum_nuke:function(fid){//�û�����ر�
	return this._base+'func=nuke_user_forum&fid='+fid
	},
forum_manage:function(fid){//�������
	return this._base+'func=modifyforum&fid='+fid
	},
minor_moderator:function(fid){//����������
	return this._base+'func=minor_moderator&fid='+fid
	},
forum_stat:function(fid){//����ͳ��
	return this._base+'func=admin_stat&day_limit=30&fid='+fid
	},
topic_key_set:function(fid){//�����������
	return this._base+'func=topic_key&fid='+fid
	},
keyword_watch_set:function(fid){//�ؼ��ּ�������
	return this._base+'func=logpost&setkey=1&fid='+fid
	},
keyword_watch:function(fid){//�ؼ��ּ��¼�¼
	return this._base+'func=logpost&fid='+fid
	},
filter_key:function(fid){//����
	return [this._cache+'filter/'+fid+'.js?'+Math.floor(__NOW/3600),
		this._base+'func=logpost&getkey&fid='+fid+'&time='+Math.floor(__NOW/3600)]
	},
topic_key:function(fid,x){//�������
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
set_user_reputation:function(fid,user,value){//�û�����
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
post:function(){//����������˳��
	var b = ['action',//����
		'fid',//����id
		'tid',//����id
		'pid',//�ظ�id
		'stid',//
		'post_subject',//����
		'post_content',//����
		'mention',//����@����
		'hidden',//�������� �������ɼ�
		'self_reply',//ֻ�����ߺͰ����ɻظ�
		'attachments',//����
		'attachments_check',//����У��
		'hidden_content',//���ص�����
		'filter_key',//�м��Ӵ�
		'has_auto_translate',//���Զ������
		'hide_upload',//�۵��ϴ��ļ�
		'content_not_modify',//�������޸�
		'subject_not_modify',//�������޸�
		'from_device',//�����豸
		'from_client',//����ϵͳ
		'newvote',//ͶƱ����
		'newvote_type',// 0ͶƱ 1Ͷעͭ��
		'newvote_max',//ÿ������Ͷ 0����
		'newvote_end',//Сʱ�����
		'newvote_betmax',//Ͷע���ֵ
		'newvote_betmin',//Ͷע��Сֵ
		'newvote_limit',//ͶƱ����������
		'modify_append',//�޸�ʱ�޸����������ԭ����֮��
		'comment',//����/�����ظ�
		'anony',//����
		'live',//ֱ��
		'reply_anony',//�ظ�����
		'topic_vote',//��������Ĵ��
		'per_check_code'//��֤��
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
//__SETTING �û�����
//==================================
var __LITE = {}, __UA = {}//old
var __SETTING = {
o:null,

defB:65536,

bit:0,

bits:{
auto	:1, //���������Զ�

//���гߴ綼����Ϊ�Զ��ߴ�
size24	:2, //24+����ʾ��
size10	:4,//10������
size7	:8,//7������
size4	:16, //4������

lessPic	:64,//��ͼƬ
iframe	:128,//��Ƕ�Ķ�
fontDef :256,//��ָ���������� ʹ��ϵͳĬ��
fontHei	:512,//ָ����������Ϊ΢���ź�(���������δ�����Զ�ѡ�� (windows vista+�ź� ��������ָ��
embed	:1024,//�ͻ�����Ƕ(bitfoot
inIframe:2048,//�Ƿ�����һ��iframe��
touch	:4096,//�Ƿ�֧�ִ���

touched :8192,//�Ƿ����� ���û�����
orientation:16384, //�Ƿ�֧����ת ���û�����
notGenericDevice:32768, //�Ƿ��Ƿ�����ǱʼǱ��������豸 ���û�����

style0:65536, //ʹ����ʽ0
style1:131072, //ʹ����ʽ1
style2:262144, //ʹ����ʽ2
autoPic:524288,//�����豸�ߴ�ѡ��ͼƬ ����lessPicʱ��Ч
style3:1048576, //ʹ����ʽ3
fontBig:2097152, //�Ӵ�����
fixWidth:4194304, //���ƿ��

//�ж�����
noTopBg : 1024 | 64 | 2048,//�ޱ���
},
width:null,
cName:'uisetting',
css:'',

uA:{},// 0:����� 1ie 2chrome 3ff 1:������汾 2:����ϵͳ 1windows 2android 3osx 3:����ϵͳ�汾

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

if(u.match(/iphone|mobile safari|IEMobile/i))//�ֻ�
	a[6] |= 2
else if(u.match(/mobile|Tablet|ipad/i) && a[2]!=1)//ƽ�� һ��ֻ��עmobile����mobile safari firefox��עtablet windowsƽ�����
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
this.o._.addTitle('��������');
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
	'�ҵ���Ļ̫�������',
	$('/br'),
	'��',fontBig,
	'�Ӵ�����',
	$('/br'),
	'��',fixWidth,
	'����ҳ����',
	$('/br'),
	$(size24_10).$0('onchange',function(){if(this.checked){lessPic.checked=false}}),
	'�Զ��жϳߴ� ',
	$('/span').$0('className','silver','innerHTML','��ͨ���� �ֻ�/ƽ���/����'),
	$('/br'),

	$(size10_7).$0('onchange',function(){if(this.checked){lessPic.checked=true}}),
	'��Ļ�ߴ���7~10�� ',
	$('/span').$0('className','silver','innerHTML','ƽ�����'),
	$('/br'),

	$(size7_4).$0('onchange',function(){if(this.checked){lessPic.checked=true}}),
	'��Ļ�ߴ���5~7�� ',
	$('/span').$0('className','silver','innerHTML','�ֻ����� ƽ������'),
	$('/br'),

	$(size4).$0('onchange',function(){if(this.checked){lessPic.checked=true}}),
	'��Ļ�ߴ���5������ ',
	$('/span').$0('className','silver','innerHTML','�ֻ�����'),
	$('/br'),
	$('/br'),

	lessPic,
	'��ʾ���ٵ�ͼƬ',
	$('/br'),
	$('/span').$0('className','silver','innerHTML','�ֶ�����ͼƬ ����ٶ�'),
	$('/br'),
	$('/br'),

	iframe,
	'����Ƕ��������ʾ����',
	$('/br'),
	$('/span').$0('className','silver','innerHTML','����ҳ����ش��� ����ٶ� �ϴ����ʾ������<sup>*</sup>','title','IE9+, IEMobile 10+, Chrome12+, Android broswer 4+, FireFox16+, Safari3.1+, iOS Safari4+'),
	$('/br'),
	$('/br'),

	fontAuto,
	'�Զ�ѡ������',
	$('/br'),
	fontDef.disabled ? null:  $('/span')._.add(
		fontDef,
		'ϵͳĬ������',
		$('/br')
		),
	fontHei.disabled ? null:  $('/span')._.add(
		fontHei,
		'����',
		$('/br')
		),
	$('/br'),


	[ '����ɫ��',
	$('/br'),
	$(style),
	'Ĭ�� ',
	$(style0),
	'�� ',
	$(style1),
	'�� ',
	$(style2),
	'�� ',
	$(style3),
	'�� ',
	$('/br'),
	$('/br')] ,

	$('/button')._.attr({innerHTML:'ȷ��',type:'button'})._.on('click',function(){
			var x = this.parentNode.getElementsByTagName('input'),bit=0
			//�ߴ�
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
			//ͼƬ
			if(lessPic.checked)
				bit = bit | self.bits.lessPic
			//��Ƕ
			if(iframe.checked)
				bit = bit | self.bits.iframe
			//����
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
			alert('������ϣ�������� ���˵�>��̳����>�������� ���޸�')
			window.location.reload()
			}
		),

	$('/button')._.attr({innerHTML:'ȡ��(ȫ�Զ�)',type:'button'})._.on('click',function(){
			var bit=self.bits.auto
			self.save(bit)
			alert('������ϣ�������� ���˵�>��̳����>�������� ���޸�')
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

//�з����Ӧ���豸��ΪС�ߴ��ֳ��豸��������
//window.orientation for iosSafari androidDefault mqq ucweb
//window.navigator.mozNotification for mobileFirfox
if(typeof(ww.orientation) == 'undefined' && !ww.navigator.mozNotification)
	return window.innerWidth>50? window.innerWidth : ww.screen.width//û�з�����豸������Ļ���

var w=max(ww.screen.width,ww.screen.height)

if(ww.innerWidth<ww.innerHeight)
	max=function(a,b){
		if(a<b) return a
		else	return b
		}
//console.log(ww.screen.width+'/'+ww.outerWidth+'/'+ww.outerHeight+'/'+ww.innerWidth+'/'+ww.innerHeight)

var cPix = ww.__COOKIE.getCookie('devPix')

if(!cPix){//��ת�������ȼ��
	if(ww.document.referrer.indexOf('resolution_detect.html')==-1)
		ww.location.replace(ww.location.protocol+'//'+ww.location.host+'/nuke/resolution_detect.html?'+ww.location.href)//���������
	else
		alert('��Ļ�����ȼ��ʧ��')
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

//�Ƽ��ֱ��� = ʵ�ʷֱ���/devicePixelRatio
//�Ƽ��ֱ���һ��ϵ� �ʶ���devicePixelRatio�ɱ�����СһЩ 1->1 2->1.5
if(cPix[4])
	w = Math.floor(w/((cPix[4]+1)*0.5))

if(w==0)
	w=480

return w
},
*/
getWidth:function(){

var ww=window, w, s=this.bits, b = this.bit,scw = 19//��body����֮ǰ�޷��õ���������� Ԥ��һ��
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

if(b & s.embed){//�����Ƕ��ͻ���
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
else if( (b&(s.size10|s.size7|s.size4|s.size24))==0 || (b & s.auto)){//���û��ߴ��ѡ���Զ�
	if(this.uA[6]&1){//tablet
		if(ww.innerWidth>ww.innerHeight && ww.innerWidth>700)//����
			mm(0,ww.innerWidth<950?1000:ww.innerWidth)
		else//����
			ss(s.autoPic|s.lessPic)
		}
	else if(this.uA[6]&2){//phone
		if(ww.screen.width>ww.screen.height)//����
			ss(s.autoPic|s.lessPic)
		else//����
			sss(s.autoPic|s.lessPic)
		}
	else{//def PC  document.documentElement.clientWidth
		w= (ww.innerWidth>50? ww.innerWidth : ww.screen.width)-scw//�����������Ȼ���Ļ���
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
else{//������˳ߴ�
	w= (ww.innerWidth>50? ww.innerWidth : ww.screen.width)-19//�����������Ȼ���Ļ��� ��body����֮ǰ�޷��õ����������
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
	//this.css+='body, textarea, select, input, button {font-family:Microsoft Yahei, ΢���ź�, Verdana, Tahoma, Arial, sans-serif}'
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
//����̳�����޹صĻ������� level1
//==================================
{
//�¼�ע��=====================
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

//�¼�ȡ��=====================
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

//�¼�����=====================
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

//����
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

//������������ȡ================
commonui.compPropName = function(a,b){
if(b.toLowerCase() in a)
	return b.toLowerCase()
var c= this.compatibleCheck.c
for(var k in c)
	if(c[k]+b in a)
		return c[k]+b
}//fe
commonui.compPropName.c= {0:'moz',1:'webkit',2:'ms',3:'o',4:'khtml'}

//��������ʾ����Ϊ��λ��ȡ�ַ���==
/**
 *@param s �ַ���
 *@param l �����˳��Ƚ����ض�
 *@param t �ضϵ��˳��� �������l
 *@param �ضϺ���ĩβ���ӵ��ַ��� ����Ϊ��
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

//ʱ��ת����===================
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

//ʱ��תʱ��===================
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
	z='����ǰ'
	if(x<60)
		x="�ղ�"
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
		x='1Сʱǰ'
	}
else{
	if (y>(this.time2dis.nowDayStart-172800)){
		if (y>this.time2dis.nowDayStart)
			z='����'
		else if (y>(this.time2dis.nowDayStart-86400))
			z='����'
		else
			z='ǰ��'
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

//��ȡ��ʽ=====================
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

//��ȡborder+padding��ֵ
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

//��ȡ�߶�=====================
commonui.getScroll=function (){
var x = document.documentElement.scrollLeft || document.body.scrollLeft || 0;
var y = document.documentElement.scrollTop || document.body.scrollTop || 0;
return {x:x,y:y}
}//fe

//�Ƴ�����=====================
commonui.removeSelf= function(o){
o.parentNode.removeChild(o)
}

//��ȡǰһ��/��һ��Ԫ��=========
/**
 *o this
 *p <0���� >0����
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

//��ȡ�ؼ�����ֵ================
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

//��ȡbody������ߴ�px==========
;(function(){
var s = 0
commonui.getBaseFontPx = function(){
return s ? s : (s = parseInt(commonui.getStyle(document.body,'fontSize'),10))
}//fe
})();

//��ɫת��=====================
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
//����̳�����޹صĻ������� level2
//==================================
{
//�ۼӲ�����������marginright���
//����֮ǰ��marginright
;(function(){
var mW=0
commonui.addMmcMargin= function(w){
	mW += w
	__NUKE.addCss("#mmc {margin-right:"+mW+"px}")
	__NUKE.position.mr = mW
	return mW-w
	}
})();


//��׼��ť=====================
commonui.stdBtns = function(){

var $=_$,y = $('/tr') , x = $('/table','className','stdbtn','cellSpacing',0)._.add($('/tbody')._.add( y ))

//tr
x._.__tr = y
//length
x._.__length=0
//�����һ����Ԫ
/**
 * 
 * @param {type} a ��ť��Ԫ
 * @param {type} opt &1��ӵ����� &2���س��㹦�ܣ�this.__islongclickʱΪ����500����ĳ��㣩
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
//�����һ����Ԫ
x._.__ins = function(a){
	this.__add(a,1)
	}
//�Ƴ�һ�� ָ��index�������һ��
x._.__remove = function(i){
	if(i)
		this.__tr.removeChild(this.__tr.childNodes[i])
	else
		this.__tr.removeChild(this.__tr.lastChild)
	this.__length--
	}
//������Բ��
x._.__cL = function(x){
	var f = function(o,x){
		x = x?'Right':'Left'
		o.style['borderTop'+x+'Radius']=o.style['borderBottom'+x+'Radius']='0';
		}
	f( x?this.__tr.lastChild.firstChild:this.__tr.firstChild.firstChild ,x)
	f(this.self,x)
	}
//����Ҳ�Բ��
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
	r.style.width = (w-1)+'px'//vml��ȶ�һ����
	r.style.height = (h-1)+'px'//vml�߶ȶ�һ����
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

//inline tip����===============
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
add:function (o,oo,arg){//arg.triggerElm ����node  arg.hide=1 �Ƴ�����Ԫ�ؼ���ʧ
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
 * ���������� �״ε��û�ȴ���bodyInit��ִ��
 * @param {type} opt ==1ʱ���ø�frame��callname���� ==0����
 * @param {type} host ָ������ ��"https://xxx.oo"
 * @param {type} callname Ҫ���õĺ�����
 * @param {type} callback �ص����� callname�ķ���ֵ������
 * @param {type} arg ��callname����
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

//���ػ���=====================
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
//��������=====================


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

//��������=====================
;(function(){
var EVENT_INIT = 0, HIS

commonui.createCommmonWindow = function (opt){//&1�޶��� &2�ޱ�����
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
	if(arguments[0]===null){//��һ��������nullʱreset ����ʹ��һ��show�ſ�����ʾ
		if(d==c){
			c = (c==c1 ? c2 : c1)
			c.innerHTML=''
			t.lastChild.innerHTML=''
			this.self._.__c = c
			}
		if(arguments.length<=1)
			return this.self
		}
	else if(arguments[0]===false){//��һ��������falseʱ��յ�ǰ��ʾ��
		c.innerHTML=''
		t.lastChild.innerHTML=''
		arguments[0]=null
		if(arguments.length<=1)
			return this.self	
		}
	if(arguments.length>1){ //�������ʱֱ�ӵ���add
		c._.add.apply(c._,arguments)
		return this.self
		}
	else if (typeof(x)=='object')
		c.appendChild(x)
	else//��������ʱ��������innerhtml
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

//���alert===================
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

//�������� - ������洰��=======
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

//��ѡcheckbox����=============
commonui.massAdmin ={
getChecked:function (){
var i = ''
for (var id in this.d){
	if (parseInt(id,10))
		i+=','+id
	}
if (!i){
	window.alert('������Ҫѡ��һ��')
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
	if(s && s.firstChild.innerHTML!='����')
		s.firstChild.innerHTML='����'
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
		s.firstChild.innerHTML='ȫѡ'
	}
},//fe
d:{},
l:0
}

//��ֹ�ظ��ύ=================
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

//��ĳԪ���� touchmove ��� mouseover===============
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

//�ı������ַ��ı���ɫ==========
/*
 * @param y �ַ���
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

//canvas��ͼ==================
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

//document.write����===========
if(window.__filterWrite)
	commonui.filterWrite = window.__filterWrite
else
	commonui.filterWrite={load:function(){}, unload:function(){} }


//���ε��=====================
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

//��ҳurl�滻==================
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

//QR������=====================
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
//����ģ��С
//==================================
{
//��ȡ���ӻ����������˵��
(function(){
var P, VP,EP, PBALL=0,TMBALL=0
G=1,//guest
U=2,//user
MOD=4,//��ʾ��Ҫ����Ȩ��
LE=8,//��Ҫlesser
WD=16,//warden
SL=32,//superlesser
SU=64,//super
AD=128,//admin

MMOD=256,//�޸���Ҫ����Ȩ��
MLE=512,//��Ҫlesser
MWD=1024,//warden
MSL=2048,//superlesser
MSU=4096,//super
MAD=8192,//admin
MNO=524288,//�����޸�

TT=16384,//������
PP=32768,//���ظ�
TS=65536,//���ϼ�
QF=131072,//�����澵��
QQ=262144,//������
PB={
1:		[G|TT,					8192,		'',		'+',		"#BD7E6D",	'�������и���',										''],
2:		[G|TT|PP,				262144,	'����',	'',		'#909090',	'����ʾ��������Ϣ',									''],
3:		[G|PP,					1,			'����',	'',		'#909090',	'���Ƕ�ĳһ�����ӵ�����/�ظ�/����',				''],
4:		[G|MMOD|TT|PP,			1024,		'����',	'����',	'#C58080',	'�޷��༭/�ظ�',										'�޷��༭/�ظ�*'],
5:		[MOD|LE|MMOD|TT|PP,	2,			'����',	'����',	'#C58080',	'ֻ������/�����ɼ�',								'����/�����ɼ�����**'],
6:		[MOD|MMOD|TT,			131072,	'����',	'����',	'#909090',	'�������ϰ�������ʾ',								'�������ϰ�������ʾ'],
7:		[MOD|MMOD|TT|PP,		128,		'�༭',	'',		'#909090',	'����ʱ���Կɱ༭',									'����ʱ���Կɱ༭'],
8:		[G|MAD|TT|TS,			32768,	'�ϼ�',	'�ϼ�',	'#A0B4F0',	'��һ���ϼ����� �û������ںϼ��з���������',	'ת�ɺϼ�'],
9:		[G|MAD|TT|QF,			2097152,	'����',	'����',	'#A0B4F0',	'����һ��������ľ���',								'ת�ɰ��澵��'],
10:	[G|MMOD|TT,				256,		'ռ¥',	'',		'#909090',	'ֻ�����ⷢ�����Լ��ظ�',							'ֻ�����ⷢ�����Լ��ظ�'],
11:	[MOD|MWD|TT|PP,		16384,	'����',	'����',	'#C58080',	'����/�����ɼ�',					'����/�����ɼ�'],
12:	[MOD|MNO|TS|QF|QQ,	1026,		'�³�',	'�³�',	'#A0B4F0',	'�ϼ�/����/���澵���ϸ�',						'�ϼ�/����/���澵���ϸ�'],
13:	[MOD|MMOD|TS|QF|QQ,	16777216,'�³�',	'�³�',	'#A0B4F0',	'�ϼ�/����/���澵���ϸ�',						'�ϼ�/����/���澵���ϸ�'],
14:	[MOD|MSL|TT|PP,		2048,		'����',	'����',	'#909090',	'���û��ڴ����ڱ�����',								'�������'],
15:	[MOD|TT|PP,				8,			'��ʱ',	'��ʱ',	'#909090',	'�鿴Ԥ��������¼',									''],
16:	[MOD|TT|PP,				32,		'���',	'���',	'#909090',	'�鿴���/�ٱ���¼',								''],
17:	[MOD|MSL|TT,			524288,	'����',	'+',		"#BD7E6D",	'�������б�����ʾ����',								'�������б�����ʾ����'],
18:	[MOD|MMOD|MWD|TT|PP,	512,		'���',	'A',		'#C58080',	'���ȴ����',								'���ȴ����'],
},
TMB={
1:		[G|MMOD|TS,		131072,		'ȫ��',	'ȫ��',	'#C58080',	'�ϼ����޷��༭/�ظ�/����������',					'�����ϼ���ȫ������'],
2:		[MOD|MMOD|TS,	524288,		'�³�1',	'�³�1',	'#A0B4F0',	'�ϼ������ⲻ�ϸ�',									'�ϼ������ⲻ�ϸ�'],
3:		[MOD|MMOD|TS|QF,16777216,	'�۵�',	'�۵�',	'#A0B4F0',	'',													'�ϼ�/���澵����ʾ����������'],
4:		[MOD|MSU|TT,	256,			'����',	'����',	'#909090',	'',													'�ظ�����ע��ʱ������'],
5:		[G|MMOD|TT,		2097152,		'ȫ��',	'ȫ��',	'#C58080',	'�ظ����������Զ�����',							'�ظ��Զ�����'],
6:		[G|MMOD|TT,		33554432,	'ȫ��',	'ȫ��',	'#C58080',	'�ظ����������Զ�����',							'�ظ��Զ�����'],
7:		[MOD|MMOD|TT,	67108864,	'ͳ��',	'ͳ��',	'#909090',	'',													'��¼ÿ�շ�����(��Ҫ����޸���һ������)'],
//512:			[MOD|MSU|TT,	512,	'����1',	'����1',	'#909090',	'',													'δ�����û��ɻظ�'],
//1024:			[MOD|MSU|TT,	1024,	'����2',	'����2',	'#909090',	'',													'�����û��ɻظ�'],
//2048:			[MOD|MSU|TT,	2048,	'����3',	'����3',	'#909090',	'',													'NUKE�û��ɻظ�'],
8:		[MOD|MAD|TT,	134217728,	'����',	'',		'#909090',	'',													'�����б�����ʾ����ظ�'],
9:		[G|MMOD|TT,		1073741824,	'����',	'����',	'#909090',	'ÿ���û�ֻ�ܻظ�һ��(2000�ظ�����)',			'ÿ���û�ֻ�ܻظ�һ��(2000�ظ�����)'],
10:	[G|TT,			65536,		'ֱ��',	'ֱ��',	'#909090',	'����һ��ֱ��',										''],
11:	[G|TT|MMOD,		262144,		'�»ظ���ǰ',	'����','#C58080','�»ظ���ǰ','�»ظ���ǰ']
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
C=function(y,h,u){//&1Ϊ�������б���ʹ�� &2Ϊ�Ķ�������ʹ�� &4Ϊ���� 
var z
if(h&1){
	if(y[3])
		z=y[3]
	}
else if(h&2){
	if(y[2])
		z=y[2]
	if((h&4)&&z=='����')
		return  ''
	}

if(z)
	return commonui.txtTagTemplate(z, y[5], u, y[4], (y[0]&3)==0 ? '��״ֻ̬�а����ɼ�' : '')

return ''
}//

for(var k in PB)
	PBALL|=PB[k][1]

for(var k in TMB)
	TMBALL|=TMB[k][1]

commonui.txtTagTemplate=function(txt,til,url,bgc,sp){//���� ��˵�� ���� ��ɫ ������˵��
 return "  <"+(url?"a href='"+url+"'":'span')+
			((txt=='+')? " style='font-size:1.085em;color:"+bgc+"'" : 
				" class='block_txt white nobr vertmod' style='background-color:"+bgc+(sp ? ";padding-right:0.2em;border-right:0.2em solid "+__COLOR.border0 : '')+"'")+
		  " title='"+til+(sp ? ' '+sp : '')+"'>"+txt+"</"+(url?'a':'span')+">"
}//

commonui.getPostBitEdit=function(isset,ispost,isqf,isq,mod){//�Ǻϼ� �ǻظ� �ǰ��澵�� �Ǿ��� �ǰ���
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
 * ��ȡ���ӵ�bit����˵��
 * @param {type} fid
 * @param {type} tid
 * @param {type} pid
 * @param {type} pb ����bit (type)
 * @param {type} tmb1 ����bit1 (topicMiscBit1)
 * @param {type} html ���ظ�ʽ &1Ϊ�������б���ʹ�� &2Ϊ�Ķ�������ʹ�� &4Ϊ���� &8
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
//��ʽ������mini===============
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

//(ȡ��)��ע
//1fo�û�
//2fo����
//4fo�ظ�
//8ȡ��fo�û�
//16ȡ��fo����
//32ȡ��fo�ظ�
//64fo�û��Ļظ�
//128ȡ��fo�û��Ļظ�
commonui.follow = function(x,id){
if(!__CURRENT_UID)
	return alert('��û�е�¼')
if(!confirm((x&71) ? '�Ƿ��ע':'�Ƿ�ȡ����ע'))
	return
__NUKE.doRequest({
	u:{u:__API._base,
		a:{__lib:"follow",__act:"follow",id:id,type:x,raw:3}
		},
	b:this
	})
}//fe

//�ɵ�ǰ�����⣩��ַ���ɵ����ӵ�����=====================
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


//�����û���html===============
/**
*uid uid
*name �û���
*l ��������(һ�����ַ�Ϊ��λ)
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
		n = x+"<span class='b silver'>��</span>"
		}
	}

if(o&1)
	n = n+"<span class='b silver'>?</span>"

//if(!window.__GP || !__GP.admincheck){
//	return o ? "<span title='"+( (o&2)?name+' ':''  )+(  (o&1)?'����һ�������û� ':'' )+"'>"+n+"</span>" : n
//	}

var c=[],hex = Math.abs(DJBHash(name)).toString(16)+'000000'
for(var i=0;i<6;i+=2)
	c.push( ('0x'+hex.substr(i,2))-0 )

c[0] = c[1]/255
c[1] = c[1]/255/2+0.25
c[2] = c[2]/255/2+0.25

c = this.hsvToRgb(c[0],c[1],c[2])
hex = "<b class='block_txt' "+(o?"title='"+( (o&2)?name+' ':''  )+(  (o&1)?'����һ�������û� ':'' )+"'":'')+" style='padding-left:0.2em;padding-right:0.2em;min-width:1em;text-align:center;background:#"+( ("0" + c[0].toString(16)).slice(-2) + ("0" + c[1].toString(16)).slice(-2) + ("0" + c[2].toString(16)).slice(-2))+";color:#ffffff'>"

if(n.match(/^UID:?\d+/i)){
	if(n.length>6)
		return n.substr(0,n.length-4)+hex+n.substr(n.length-4)+"</b>"
	else
		return n.substr(0,3)+hex+n.substr(3)+"</b>"
	}
else
	return hex+n.substr(0,1)+"</b>"+n.substr(1)
}//fe

//topicMiscVar����=============
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
	else//δ֪�İ���1byte id/4byte data����
		i+=5;
	}
return z;
}//fe
}//ce


//�����û�������================
/**
 * @param {type} aname
 * @param {type} html
 * @returns {Array|Object.anonyName.n|String}
 */
commonui.anonyName=function(aname,html){
var t1='���ұ����켺�����ɹ��ӳ���î������δ�����纥', t2='�����������������������������ֹ��θ���֣��л������˷뺫�������������ﶭԬ����Ҷ������κ����������Ҧ¬���ӽ���̷�η���½��ʯ����Τ���񷽺��������ذ׽���Ѧ��������ʷ���պع�ë�¹�����Ǯ����������Ī�������¿�ʩ��ţ�����ϰ���������������ׯ����³������ղ��ŷ����������������ף�����з�����¼�÷ͯ��ϵ������Ϳ�����ʢ����Ƚ����·�������ܲ��ɱ��������ѷ������Ľ�Ĳ������ʱ��ũ˾׿�ż��Ѽ�����«����¦���᯾������Ѳ�����ϯ���װ����Ĺ�ȫ١Ӧ��ɹ����߱弧ʦ�ͳ������̵�ɳ���׿�ɣ��������ݰ������ܳز���Է����',i=6,n=['']
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
	return "<span title='����һ���������Ե��û�' anonymous='"+aname+"'><span style='color:#"+n[1]+"'>&#9787;</span><span style='color:gray'>"+n[0]+"</span><span style='color:#"+n[2]+"'>&#9787;</span></span>"
return n;
}//fe



//�û�ͷ��ѡ��=================
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
	if (!a.t || a.t==1)//���
		i=Math.floor(Math.random()*a.l)//ʱ��
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
		if(a.match(/\||%7c/i)){//���ַ
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
commonui.avatarReal2Short=function(im,uid){//�����ı�վͷ���ַ��ԭ����д
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

//����ͷ��=====================
commonui.setAvatar = function (e,uid,ad){
	__SCRIPTS.load('imgEdit',function(){commonui.setAvatar2(e,uid,ad)})

}//fe


//������======================
commonui.tempcountlog = function(x){
loader.script( '/nuke.php?func=temp&count_log_'+(x?1:2))
}



//�����û���������tip===========
commonui.ucplink = function(e,uid){
if(!uid)return
if(!this.ucplinko){
	this.ucplinko = _$('/span').$0('className','urltip2 urltip3','style',{textAlign:'left',margin:'0'})
	document.body.appendChild(this.ucplinko)
	}
this.ucplinko.innerHTML = "<nobr><a href='http://i.178.com/?_app=index&_controller=index&_action=index&uid="+uid+"'>[178�û�����]</a> <a href='/nuke.php?func=ucp&uid="+uid+"'>[��̳����]</a> <a target='_blank' href='http://t.178.com/"+uid+"'>[t.178.com]</a></nobr>"
tTip.showdscp(e,this.ucplinko);
}

//�û�����״̬����==============
;(function(){
var x 
commonui.activeInfo = function(a,uid){
if( x===undefined )
	x =   (uid && uid == window.__CURRENT_UID ? 1 : 0) | 
			  (window.__GP && __GP.lesser ? 2 : 0) | 
			  (window.__GP && (__GP.userBit & 3096) ? 4 : 0)

var y
if(a==1)
	y = ['green','ACTIVED','�Ѽ���','','��ʹ�ü����뼤��']
else if(a==0)
	y = ['orange','UNACTIVED','δ����','�˺�δ����','��������û����İ��ֻ�����']
else if(a==4)
	y = ['seagreen','ACTIVED','�Ѽ���','','�Ѱ��ֻ�����']
else if(a==5)
	y = ['teal','ACTIVED','�Ѽ���','','�Ѱ�΢�ż���']
else if(a==-1)
	y = ['darkred','NUKED','NUKED','��Υ������������','����ʹ�ü�������']
else if(a==-5)
	y = ['gray','LOCKED','����','��Υ��ע��򷢲�Υ����������������','���ܽ���']
else if(a==-4)
	y = ['sienna','LOCKED','����','���˺Ű�ȫ���ⱻ����','�޸��������','/nuke.php?__lib=login&__act=account&changepass']
else if(a==-3)
	y = ['deeppink','LOCKED','����','���˺Ű�ȫ���ⱻ����','ʹ��[������������]����, ��ʹ����̳app�е�[��������]�����������(���ֻ�ʱ����������ʱ��֮ǰ)','/nuke.php?__lib=login&__act=account&resetpass']
else if(a==-2)
	y = ['darkred','LOCKED','����','���˺ű����򷢲�Υ��������������','ֻ���˹����� ���İ��������˵��']
else if(a<0)
	y = ['gray','LOCKED','����','unknow','']
else if(a>0)
	y = ['gray','ACTIVED','�Ѽ���','unknow','']

if(x==0)
	y[4]=''
if((x&1)==0)
	y[5]=''

return y
}//fe
})();

//��׼block===================
/**
* @param id node id
* @param name ����
* @param info ���ӽ���
* @param node/ o ����
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


//������
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
//����ģ���
//==================================
{
//��������Ϣ����================
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



//�û��ű�����==================
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
//�����������ʼ�¼============
;(function(){

var H=false

//������������ʷ�������ӵ���=====
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

//������ʷ����=================
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

//��������ʷ����================
commonui.genHisLink = function(oo,f){
if(H===false){
	var arg = arguments
	return this.userCache.hostGet('https://bbs.ngacn.cc','ForumViewHis',function(x){H=x; commonui.genHisLink.apply(commonui,arg)})
	}
if(!H)
	return null
var $ = _$, x = $('/span'), self= this, t1='����������', t2='����������� (����ӵ���ҳ���ٵ�����)', sw = function(o,y){
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

//������ʷ����=================
/***********************
*@param n ������
*@param id ����id
*@param stidN ����������
*@param stid ��������id
*@param page ��ǰpage
*
*��ʷ���ʼ�¼�Ľṹ
*{
	{0:����id
	1:������
	2:����״̬
	3:�Զ���������
	4:�Զ���������
	5:�ϼ�����id
	6:�ϼ�������
	7:��ǰpage
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

		if(lc<8){//����8������Զ�����
			//add hit count
			d=new Date
			d = Math.floor( (d.valueOf()/1000-d.getTimezoneOffset()*60)/86400 ) //����ʱ���1970 1 1����ǰ������
			dis = d-h[i][3]
			if(dis<0)//old
				h[i][4] = 0
			else if(dis<1)//����ÿ��+1
				h[i][4]++
			else if(dis>=1 && dis<2)//����+10
				h[i][4]+=10
			else//���������õ�10
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
//��ҳ========================
{
//��ҳ��ť//===================
/**
 * 
 * @param {type} o
 * @param {type} p p[1] ���ҳ Ϊ0ʱ��ʾ ��������1ҳ   С��0��ʾ ��������p[1]*-1ҳ
 * @param {type} opt &1auto &2����ʾ��ǰ���ֵķ�ҳ &4����ʾ��󲿷ֵķ�ҳ &8��ʾ��һҳ���� &16��ʾǰһҳ����
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

if(max < 1){//��������ҳ
	if(max<0)//��ʾָ����ҳ��
		e = cur2-max
	else//��ʾ��һҳ
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
				'title','������һҳ',
				'className','uitxt1',
				'_useloadread',9,
				'onclick',hlp
				) )
	oo._.__add( _$('/a',
			'href',url+(i!=1 ? '&page='+i : ''),
			'innerHTML','&nbsp;'+i+(i==max? '.' : '&nbsp;'),
			'className',(i>cur2 ? (max>1 ? 'uitxt1' : 'silver') : (i<cur ? 'uitxt1' : ((i==cur || i==cur2)?'invert':'silver')) ),
			'title',(i>cur && max<=1 ? '�����е�'+i+'ҳ' : (i==max? '���ҳ' : '') ),
			'value',i,
			'_useloadread',1,
			hl ? {onclick:hl} : null
			) )
	if(i==cur2 && i<e && (opt&8) && hln)
		oo._.__add( commonui.pageBtn.continueNextO = _$('/a',
				'href',url+'&page='+(i+1),
				'innerHTML','&gt;',
				'title','������һҳ',
				'className','uitxt1',
				'_useloadread',9,
				'onclick',hln
				) )
		
	}

if(cur>1 && (bit&4)==0 && (opt&2)==0){
	oo._.__ins(
		_$('/a',
			'href',url+'&page='+(cur-1),
			'innerHTML','ǰҳ',
			'title','��һҳ',
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
			'innerHTML',bit & 8 ? '��' : '��ҳ',
			'title','��һҳ',
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
			'innerHTML','��ҳ',
			'title','��һҳ',
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
			'innerHTML',bit & 8 ? 'β' : 'ĩҳ',
			'title','���ҳ ��'+max+'ҳ',
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
			'innerHTML','��',
			'name','topage',
			'title','��ָ����ҳ��',
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

//��ҳ��ת select==============
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
	s._.add(_$('/option').$0('innerHTML','ĩҳ('+mp+')','value',mp))

this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addContent(
	window.location.pathname.indexOf('/read.php')==-1 ? '' : _$('/span')._.add(
		'��',
		_$('/input').$0('size',4),
		_$('/button')._.attr({innerHTML:' ¥ ',type:'button'})._.on('click',function(){
				var x = __NUKE.toInt(this.previousSibling.value)
				if(!x)return
				var l = window.location
				l.href = l.protocol+'//'+l.host+l.pathname+(l.search.replace(/(?:\?|&)page=(?:e|\d+)/gi,'')+'&page='+Math.ceil((x+1)/postPerPage)).replace(/^&/,'?')+'#l'+x;
				}
			),
		_$('/br'),
		_$('/br')
		),
	'��',
	_$('/input').$0('size',4),
	_$('/button')._.attr({innerHTML:' ҳ ',type:'button'})._.on('click',function(){
			var x = __NUKE.toInt(this.previousSibling.value)
			if(!x)return
			var l = window.location
			l.href = l.protocol+'//'+l.host+l.pathname+(l.search.replace(/(?:\?|&)page=(?:e|\d+)/gi,'')+'&page='+x).replace(/^&/,'?')
			}
		),
	_$('/br'),
	_$('/br'),
	'��',
	s,
	'ҳ'
	)
this.adminwindow._.show(e)
}//fe

//�жϷ�ҳ��ť�Ƿ�����==========
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
	return alert('��Ҫ�ȵ�½')
var x,y,z,$ = _$
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('debug')
this.adminwindow._.addContent(
	$('/input').$0('value','','placeholder','JSdebug����IP(����'),
	$('/button').$0('innerHTML','����','type','button','onclick',
		function(){
			commonui._debug.on(this.previousSibling.value?this.previousSibling.value:1)
			alert('���óɹ� ��ˢ��ҳ��')
			}),
	$('/button').$0('innerHTML','�ر�','type','button','onclick',
		function(){
			commonui._debug.on(0)
			alert('���óɹ� ��ˢ��ҳ��')
			}),
	'(����Ա��׼����Ч) ',
	$('/br'),
	$('/br')
	)

if(!__GP.admin)
	return this.adminwindow._.show(e)

this.adminwindow._.addContent(
	'�����ض��û���debug',
	$('/br'),
	x=$('/input').$0('size',20),
	'UID ',$('/br'),
	y=$('/input').$0('size',20),
	'����(<90 ��0���)',
	$('/br'),
	z=$('/select').$0(
		$('/option').$0('value',1024,'innerHTML','JS'),
		$('/option').$0('value',1024|2048|4096,'innerHTML','JS+PHP')
		),'���� ',
	$('/br'),
	$('/button')._.attr({innerHTML:'ȷ��',type:'button'})._.on('click',function(){
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
//���Ӳ�����ť �� ������ť����===
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
		'innerHTML','����',
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
		$('/h4').$0('className',"textTitle",'innerHTML','�����ַ'),
		$('/span','className',"xtxt",'innerHTML',s+'/read.php?tid=<span class=red>'+arg.tid+'</span>','onclick',function(){commonui.buttonBase.selTxt(this)}),' '
		)

if (arg.pid!='tpc' && arg.pid>0){
	x._.add(
		$('/h4','className',"textTitle",'innerHTML','�˻ظ���ַ'),
		$('/span','className',"xtxt",'innerHTML',s+'/read.php?pid=<span class=blue>'+arg.pid+'</span>','onclick',function(){commonui.buttonBase.selTxt(this)}),' ',
		$('/h4','className',"textTitle",'innerHTML','��λ�õ�ַ'),
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

x._.aC( $('/br') , $('/br') , _$("<button type='button' onclick='commonui.hideAdminWindow()'>�ر�</button>") , _$("<button/>")._.attr({type:'button',innerHTML:'�����ʷ��¼'})._.on('click',function(){self.clearHis()}) )

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
//����========================
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
//�Ӱ���/���ϰ��� ��ʾ/ѡ��======
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
 * ����bit�����������ص�ǰ����array
 * @param {type} have ������ϵ�bit
 * @param {type} not �����ų���bit
bit maskͬlib_thread::_SUB
1���ϰ���
2�û���ѡ���
4(�û����úϲ�Ĭ������֮��)��ѡ���
8�������õ�
16�Ǹ����⼯��
32�Ǹ�������ľ���
64�ǵ�ǰ���ڵİ���
128�û�ѡ���
256�û�δѡ���
512Ĭ��ѡ���
1024Ĭ��δѡ���
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
*û���û�ѡ��İ���(��������ǰ)ʱ����fid ���򷵻�0
*/
getCurrent : function(fid){
var y=this.get(4,64)
if(y.i==0)
	return fid
return 0
},

/**
 *�������ϰ���ѡ�񴰿�
 *@param e(event �¼� ����ȷ������λ��
 *@param fid(int ��ǰ����id
 *@param callback(function ѡ����callback ��һ������Ϊѡ��İ���id �ڶ�������Ϊѡ��İ����� ����trueʱ����ֹ�����¼�
 */
selectWindow : function(e,fid,callback,txt){
var $=_$,y=this.get(4),x=$('/span'),c=commonui,z=''

if(!txt)
	txt=['/post.php?action=new&_newui&','��','��������']

x.__sfs = y.f
x.__xoxooxoxooxox = function(e,sfid,name,stid){
	if(!callback(sfid,name,stid))
		c.cancelEvent(e)
	c.adminwindow._.hide()
	}
	
for(var j=0;j<y.i;j++){
	var f = y[j]
	if(j==8)
		z += "<button type='button' onclick='this.style.display=\"none\";this.nextSibling.style.display=\"\"'>����</button><span style='display:none'>"
	z +="<a style='font-size:130%;font-weight:bold' href='"+txt[0]+(f[4]&16?'stid=':'fid=')+f[0]+"' onclick='this.parentNode.__xoxooxoxooxox(event?event:window.event,"+(f[4]&16?'null':'this.name')+",this.title,"+(f[4]&16?'this.name':'null')+")' class='"+(f[0]==fid? 'uitxt1' : '')+"' title='"+f[1].replace("'",' ')+"' name='"+f[0]+"'><span class='silver'>"+txt[1]+"</span> "+f[1]+" <span class='silver'>"+txt[2]+"</span></a><br/>"+(f[2] ? '<span class=gray>'+f[2]+"</span><br/>":'')+"<span style='line-height:50%'><br/></span>"
	}
if(j>=8)
	z+='</span>'
x.innerHTML=z
c.createadminwindow()
c.adminwindow._.addContent(null)
c.adminwindow._.addTitle('ѡ�񷢲�����İ���')
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

if(bit & 8 || iw<500)//7��/500���� ����
	w = 1
else if(bit & 4 || iw<800)//10��/800���� 2��
	w = 2
else if(iw>1600 )//���ڿ�1600+ 6��
	w = 6
else if(iw>1280 )//���ڿ�1280+ 5��
	w = 5
else if(iw>1024 )//���ڿ�1024+ 4��
	w = 4
else//3��
	w = 3

while(w>1 && Math.ceil(sub.i / w)==Math.ceil(sub.i / (w-1)))//�����Ҫ��������ͬ������-1
	w-=1

if(sub.i<w)//���������������Ҫ��
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
		f.ck = (f[4]&2) || (f[4]&768)==768 || (f[4]&1280)==1280 //��ѡ�� �� �û����ú�Ĭ�ϲ�ͬ��
					
		if(!bg[i])
			bg += bg
		x.push(
			$('/div','name','fbk','class','c b'+bg[i], 'style',{width:wx,backgroundImage:'url('+f.icon+')','float':(i+1)%w==0 ? 'right' : 'left'},
				$('/div', 'class', 'a',
					$('/div', 'class', 'b',
						$('/a', 'href', f.herf, 'innerHTML', f[1]),
						(f[4]&48)&&(__GP.admincheck&14)? $('/a', 'href', '/read.php?tid='+f[3], 'class', 'small_colored_text_btn block_txt_c0 nobr', 'style', 'backgroundColor:silver;fontFamily:inherit', 'innerHTML', (f[4]&16) ? '�ϼ�' : '����') : null,
						$('/br'),
						$('/p')._.add(f[2], f.ck ? $('/input','type','checkbox','checked',f[4]&4?'checked':'', 'value', ((f[4]&16)||f[3] ? 't': '')+(f[3]?f[3]:f[0]), 'title','��ʾ/����ʾ�˰�������','onclick',function(){commonui.selectForum.select(this,this.value,this.checked?1:0,ff)}) : null)
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
		$('/a', 'style','float:right;color:#fff;height:1.5em;padding:0 0.3em;marginTop:-1.5em;borderBottomRightRadius: 2.5px;background:'+__COLOR.border2, 'href', 'javascript:void(0)', 'innerHTML', '����', 'onclick', function(){
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
		$('/button', 'onclick', function(){this.style.display="none";this.nextSibling.style.display="block"}, 'type','button', 'innerHTML','�����ʾ���صİ���'),
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
//��ҷ�˵�=====================
commonui.dragMenuInit = function(){
}//fe


}//be






//==================================
//����UI ����
//==================================
{
//�ղ�����=====================
commonui.favor = function (e,o,tid,pid){
var x , a, b, $=_$, c=function(){if(a && b){alert('�������');commonui.adminwindow._.hide()}}
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('�ղ�'+(pid?'�ظ�':'����'))
this.adminwindow._.addContent(
	x = $('/div')._.add(
			$('/input').$0('type','checkbox','checked','1'), ' �����ղ�', $('/br'),
				//$('/input').$0('type','checkbox'),' �����ղص� ', 
				//$('/a').$0('href','/column.php','target','_blank','innerHTML','[�۾�]', 'onclick',function(){commonui.adminwindow._.hide()}), 
				//$('/br'),
				//$('/a').$0('href','/column.php?action=create_archive','target','_blank','innerHTML','[�����ղز���дժҪ]', 'onclick',function(){commonui.adminwindow._.hide()}), 
				//$('/br'),
			$('/br'),
			$('/button').$0('innerHTML','ȷ��','onclick',function(){
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
	alert('��ѡ������')
}//fe


/**
  * randomTitle
  * @param {type} e
  * @returns {unresolved}
  */
commonui.randomTitle = function (){
if(!window.__CURRENT_UID || !window.__NOW)
	return alert('��Ҫ�ȵ�½')
this.createadminwindow()
this.adminwindow._.addContent(null)
var $ = _$,x=$('/span')
this.adminwindow._.addTitle('��ʱͷ��')
this.adminwindow._.addContent(
	x=$('/span')._.add(
		'�ύһ��ͷ�� �㽫������֮һ�ļ��ʻ�����Լ��ύ��ͷ�� ����7��',
		$('/br'),
		'��ʱ�޵�ͷ��֮��ụ�า�� ���ǲ���Ӱ������ͷ��',
		$('/br'),$('/br'),
		$('/input')._.attr('size',20),
		$('/br'),$('/br'),
		$('/button')._.attr({innerHTML:'�ύ',type:'button'})._.on('click',function(){
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
							'������ͷ�� '+d.data[0][0]+' �� '+d.data[0][2]+'('+d.data[0][1]+') �ṩ ����7��',
							$('/br'),$('/br'),
							$('/button')._.attr({innerHTML:'ʹ��',type:'button'})._.on('click',function(){
								commonui.adminwindow._.hide()
								}),
							$('/button')._.attr({innerHTML:'��ʹ��',type:'button'})._.on('click',function(){
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

//�ؼ��ּ��Ӽ�¼===============
commonui.filterList = function(e,fid,id,n){
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('�ؼ��ּ��Ӽ�¼ FID:'+fid)
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


//����ǩ��=====================
commonui.setSign = function (e,uid,ad){
if(!__CURRENT_UID)
	return alert('��Ҫ�ȵ�½')
var x,y,$=_$,n = function(u){return $('/input').$0('value',u?u:'','size','50')}
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('����ǩ��'+(uid==__CURRENT_UID?'':' UID:'+uid))
this.adminwindow._.addContent(x = $('/span'),
	(ad && uid!=__CURRENT_UID)?$('/span')._.add(
		'����ǩ�� ',
		y=$('/select')._.add(
			$('/option').$0('innerHTML','--','value',0),
			$('/option').$0('innerHTML','3��','value',3),
			$('/option').$0('innerHTML','7��','value',7),
			$('/option').$0('innerHTML','15��','value',15),
			$('/option').$0('innerHTML','30��','value',30),
			$('/option').$0('innerHTML','60��','value',60)
			),
		'�� ',
		$('/br')
		):null,
	x = $('/textarea').$0('value','','cols','35','rows','20','title','ǩ������ʹ��bbscode'),
	$('/br'),
	$('/button').$0('innerHTML','ȷ��','type','button','onclick',
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

//�ƶ���֤��===================
commonui.extraAuthInput = function (e){
if(!window.__CURRENT_UID)
	return alert('��Ҫ�ȵ�½')
this.createadminwindow()
this.adminwindow._.addTitle('�ƶ���֤��(beta)')
this.adminwindow._.addContent(null)
var $ = _$,self=this
if(__GP.userBit & 128)	this.adminwindow._.addContent(
	'��ȷ���豸ʱ��׼ȷ ',$('/button').$0('type','button','innerHTML','�鿴������ʱ��','onclick',function(){
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
	'�����ƶ���֤������ʾ������',$('/br'),
	$('/input')._.attr('size',20),
	$('/button')._.attr({innerHTML:'��֤',type:'button'})._.on('click',function(){
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
	$('/input').$0('type','checkbox'),'������������/�ͻ����ϵ���֤״̬',
	$('/br'),$('/br'),$('/br'),
	$('/button').$0('type','button','innerHTML','������ƶ���֤��','onclick',function(){
		if(confirm('���ȷ�� ȡ����֤����˵���������͵�����ʺ�����'))
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
	"�����Ϊ����ʺŰ��ƶ���֤�� ",
	$('/a').$0('href','http://baike.baidu.com/view/2233048.htm','target','_blank','className','b','innerHTML','(ʲô���ƶ���֤��)'),
	$('/br'),$('/br'),
	'���ƶ���֤����ĳЩ��������Ҫʹ����֤����֤֮�󷽿ɽ��У�����',$('/br'),
	' . ĳЩ������',$('/br'),
	$('/br'),
	'��/ȡ���� ��Ҫͨ������ʺŵ�������в���',$('/br'),
	$('/br'),
	'���µ��ƶ���֤����ʹ�ɵ�ʧЧ',$('/br'),
	$('/br'),
	'�����ʹ�ö���豸/�ͻ���/������������޲���������Ҫ��ÿһ���豸/�ͻ���/�������������֤',$('/br'),
	$('/br'),
	'��֤��ÿ����֤֮����ܱ����������֤״̬',$('/br'),
	$('/br'),
	'�����Ľ��������IP�仯�ϴ��������ҪƵ��������֤',$('/br'),
	$('/br'),$('/br'),
	$('/button')._.attr({innerHTML:'��һ��',type:'button'})._.on('click',function(){
			var x,y,z
			self.adminwindow._.addContent(false)
			self.adminwindow._.addContent(
				'�����ϣ��Ϊ����ʺŰ��ƶ���֤��',$('/br'),
				x=$('/input').$0('type','checkbox'),$('/b').$0('innerHTML','������ȷ������ʺ�ע��������ʵ����'),$('/br'),
				'������������޷�ʹ��',$('/a').$0('href','/read.php?tid=7504167','className','b','innerHTML','�ɲ��մ�������','target','_blank'),
				$('/br'),$('/br'),
				y=$('/input').$0('type','checkbox'),$('/b').$0('innerHTML','Ȼ��������ƶ��豸�а�װ "Google Authenticator" �� "Google�����֤��"'),$('/br'),
				'Google�����֤���������� ����Google�˺����ʹ��',$('/br'),
				'���ڰ�ȫ������г������ش˳���',$('/br'),
				$('/a').$0('href','https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2','className','b','innerHTML','Android','target','_blank'),', ',$('/a').$0('href','http://www.wandoujia.com/apps/com.google.android.apps.authenticator2','className','b','innerHTML','Android*','target','_blank'),', ',$('/a').$0('href','https://itunes.apple.com/en/app/google-authenticator/id388497605','className','b','innerHTML','IOS','target','_blank'),', ',$('/a').$0('href','http://www.windowsphone.com/en-us/store/app/authenticator/021dd79f-0598-e011-986b-78e7d1fa76f8','className','b','innerHTML','WP','target','_blank'),', ',$('/a').$0('href','https://winauth.com/','className','b','innerHTML','Windows','target','_blank'),
				$('/br'),$('/br'),
				'��װ����֤��֮�� ���ڴ�����һ����ʱ����(���ֺ���ĸ)',$('/br'),
				'�������һ��������˺�',$('/br'),
				z=$('/input')._.attr('maxlength',6,'size',10),
				$('/button')._.attr({innerHTML:'��һ��',type:'button'})._.on('click',function(){
						if(!x.checked || !y.checked)return alert('��ȷ�Ϲ�ѡǰ������')
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
x._.addTitle('��¼��¼')
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
this.adminwindow._.addTitle('�μ�NUKE');

this.adminwindow._.addContent(
	$('/span')._.add(
		rg = $('/input').$0('type','radio','name','opt0'),'ȫ��̳ ',
		rf = $('/input').$0('type','radio','name','opt0','checked',1),'������ ',
		rs = $('/input').$0('type','radio','name','opt0'),'���ϼ� ',
		rr = $('/input').$0('type','radio','name','opt0'),'�������� ',
		$('/br'),
		m2 = $('/input').$0('type','radio','name','opt1','checked',1),'����2�� ',
		m4 = $('/input').$0('type','radio','name','opt1'),'����4�� ',
		m6 = $('/input').$0('type','radio','name','opt1'),'����6�� ',
		$('/br'),
		$('/input').$0('type','radio','name','opt2','checked',1),'���ۼ����� ',
		n1 = $('/input').$0('type','radio','name','opt2'),'�ۼ�����',$('/span','className','silver','innerHTML','(150) '),
		n2 = $('/input').$0('type','radio','name','opt2'),'�ӱ��ۼ�����',
		$('/br'),
		n3 = $('/input').$0('type','checkbox'),'ͬʱ�ۼ�����',$('/span','className','silver','innerHTML','(150:1 ��������ʽ�����İ���)'),
		$('/br'),
		n4 = $('/input').$0('type','checkbox'),'��ʱ',$('/span','className','silver','innerHTML','(���´η��Կ�ʼ����)'),
		$('/br'),
		$('/br'),
		is = $('/input').$0('placeholder','����˵��(����ʾ��������)','maxlength','20','onfocus',function(e){if(isl.style.display=='none'){
				isl.style.display=''
				this.blur()
				this.placeholder='ʹ�ù������Դǽ�����ֹ��д'
				commonui.cancelEvent(e)
				}
			}),
		 f ? (isl = $('/span','style','display:none',$('/br'))) :null,
		$('/br'),
		$('/br'),
		il = $('/textarea').$0('placeholder','�����Ĳ���˵��(��ͨ�����ŷ���)','rows','3','cols','20'),
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
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
				return alert("��Ҫ����˵��")
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
		y._.add($('/br'), '��������¼', $('/br'), t)
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
			isl._.add($('/button','innerHTML','�༭','type','button','onclick',function(e){commonui.editRule(e,f)}))
			}
		})
	
}//fe

commonui.editRule = function(e,f){
var $ = _$, info
if(!f)return
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('�༭Ԥ��˵�� FID:'+f);

this.adminwindow._.addContent(
	info = $('/textarea').$0('value','','rows','20','cols','20'),
	$('/br'),
	$('/span').$0('innerHTML','���л��߿ո�ָ�'),$('/br'),
	$('/br'),
	$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
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


//�������=====================
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
this.adminwindow._.addTitle('����/����');
if(warning){
	y=$('/b')._.cls('red')
	for(var k in warning){
		if(typeof(warning[k])=='object')
			y._.add(warning[k][1],$('/br'))
		} 
	}
this.adminwindow._.addContent(
	$('/form')._.add(
		'������300��, һЩBBSCODE��Ч',
		$('/br'),
		y,
		y?$('/span').$0('class','silver','innerHTML','���ⷢ���� �������������еĻظ�<br/>���һ�����ӱ����������� ��ô���ķ�����Ҳ��������<br/>'):null,
		$('/br'),
		x = $('/textarea').$0('name','info','rows','5','cols','40'),
		$('/br'),
		a = $('/input').$0('type','checkbox','checked',''),
		' ����(100ͭ��)',
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
				x.value = x.value.replace(/^\s+|\s+$/,'')
				if(x.value.length==0)return
				//alert(c ? c+x.value : x.value)

				commonui.newPost(
					this,
					postfunc.__REPLY,//����
					fbit,//����bit type
					fid,//����id
					tid,//����id
					pid,//�ظ�id
					null,//o_setTopic
					null,//����
					c ? c+x.value : x.value,//����
					0,//�������� �������ɼ�
					0,//ֻ�����ߺͰ����ɻظ�
					null,//����
					null,//����У��
					null,//ͶƱ����
					null,// 0ͶƱ 1Ͷעͭ��
					null,//ÿ������Ͷ 0����
					null,//Сʱ�����
					null,//Ͷע���ֵ
					null,//Ͷע��Сֵ
					null,//ͶƱ����������
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


//���ü�������Ĺ���Ա==========
/**
 *adminsΪundefined��ȡ��ǰ�Ĺ���Ա��Ϣ
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

this.adminwindow._.addTitle('���ü��Ϲ���Ա');

this.adminwindow._.addContent(
	$('/span')._.add(
		'���Ϲ���Ա���Ա༭�������������',
		$('/br'),
		'���Խ������Ƴ�����',
		$('/br'),
		'���Ա༭������',
		$('/br'),
		'ÿ������һ���û�ID���û���',
		$('/br'),
		'�����û���ǰ���\\ ',
		$('/br'),
		x = $('/textarea').$0('value',y,'rows','5','cols','40'),
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
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

//���ü�������ĺ�����==========
/**
 *adminsΪundefined��ȡ��ǰ�Ĺ���Ա��Ϣ
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
this.adminwindow._.addTitle('���ü������������');

this.adminwindow._.addContent(
	$('/span')._.add(
		'�������е��û��޷��ڼ����з���',
		$('/br'),
		'ÿ������һ���û�ID���û���',
		$('/br'),
		'�����û���ǰ���\\ ',
		$('/br'),
		x = $('/textarea').$0('value',y,'rows','5','cols','40'),
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
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

//�������ӻ����������==========
commonui.setPost = function (e,tid,pid,tf)
{
this.createadminwindow()
this.adminwindow._.addContent(null)
var $ = _$, de=null,t=null,p=null,pm,info,infoss,tff

this.adminwindow._.addTitle('������������');


de = $('/select').$0('name','delay')
de.$0($('/option').$0('value','','innerHTML','����'))
for (var i=0.5;i<24;i+=0.5)
	de.$0($('/option').$0('value',i*3600,'innerHTML',i+"Сʱ��"))


var f = function(e){
	var x = this
	if(x.innerHTML=='on')
		x.innerHTML='off',x.title='��';
	else if(x.innerHTML=='off')
		x.innerHTML='--',x.style.backgroundColor='gray',x.title='���ֵ�ǰ����';
	else if(x.innerHTML=='--')
		x.innerHTML='on',x.style.backgroundColor='#551200',x.title='��';
	}, 
	ck=function(k){
	return $('/a').$0('href','javascript:void(0)','title','���ֵ�ǰ����','className','small_colored_text_btn stxt block_txt_c0','name',k,'onclick',f,'innerHTML','--','style',{backgroundColor:'gray'})
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
		$('/br'),$('/span').$0('className','small_colored_text_btn stxt block_txt_c0','innerHTML','--','style',{backgroundColor:'gray'}),' ��Ϊ"���ֵ�ǰ״̬"',
		$('/br'),'*�����������Ļظ����б��в��ɼ�',
		$('/br'),'**���ص�״̬������߽��ڱ༭ʱ�ɼ�',
		$('/br'),$('/br'),
		pm = $('/input').$0('type','checkbox','name','pm'),' ���û����Ͷ���Ϣ',
		$('/br'),
		info = $('/textarea').$0('name','info','rows','3','cols','20'),
		tf ? $('/span')._.add(
			$('/br'),
			infoss = $('/select').$0($('/option').$0('innerHTML','Ԥ��˵��','style',{color:'silver'}), 'onchange',function(){if(this.selectedIndex)this.parentNode.previousSibling.value+=' '+this.options[this.selectedIndex].innerHTML}),
			$('/button').$0('innerHTML','�༭','type','button','onclick',function(e){commonui.editRule(e,tf)})
			) :null,
		$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
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
					if(!confirm('תΪ�ϼ�����ת�� �Ƿ����'))
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

//�ٱ�========================
commonui.logPost = function (e,tid,pid)
{
var $ = _$
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('������ٱ�����')
this.adminwindow._.addContent(
	$('/span')._.add(
		$('/input','placeholder','�ٱ�����'),$('/br'),
		$('/button','innerHTML','�ύ','type','button','onclick',function(){
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
//�Ƽ�========================
commonui.logPostRecommend = function (e,tid,pid)
{
var $ = _$
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('������Ա�Ƽ�����')
this.adminwindow._.addContent( 
	$('/span')._.add(
		$('/button','innerHTML','�ύ','type','button','onclick',function(){
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
//�����û�����=================
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
this.adminwindow._.addTitle('�����û��ڱ����������');

this.adminwindow._.addContent(
		x = $('/input').$0('type','text','size','10','value',uid?uid:''),' UID���û���',
		$('/br'),
		y = $('/input').$0('type','text','size','5'),' ����ֵ(-21000~21000)',
		$('/br'),$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
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

//��̳��Ϣ=====================
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
		�� <span class='numeric'>"+totalinbbs+"</span> ������,<span class='numeric'>"+userinbbs+" <span title='δ��֤'>("+unvalidateuser+")</span></span> λ��Ա,<span class='numeric'>"+guestinbbs+"</span> λ�ÿ�<br/>\
		��� <span class='numeric'>"+data['higholnum']+"</span> �� <span class='numeric'>("+time2date(data['higholtime'])+")</span><br/>\
		�� <span class='numeric'>"+data['threads']+"</span> ƪ����,<span class='numeric'>"+data['posts']+"</span>  ƪ����,<span class='numeric'>"+data['members']+"</span>  λ��Ա<br/>\
		<a href='thread.php?authorid="+__CURRENT_UID+"&date=all'>�ҵ�����</a> �� <a href='thread.php?recommend=1&date=all'>������</a> �� <a href='/thread.php?favor=1'>�ҵ��ղ�</a> �� ��ӭ�»�Ա <a href='profile.php?uid="+data['newmember']['uid']+"' class='green'>"+data['newmember']['username']+"</a>\
	</td>\
</tr></table>";
	return true;
	},
function(){
	o.innerHTML='��ȡ����';
	},
'gbk'
);
}//fe

//�˺Ų���===
commonui.accountAction = function(act){
if(!this.ucp)
	__SCRIPTS.load('ucp',function(){commonui.ucp.accountAction(act)})
else
	commonui.ucp.accountAction(act)
}//fe
commonui.accountAction.close = function(){commonui.adminwindow._.hide()}

//178ֱ��======================
commonui.loadLiveIframe = function(tid){
put("<iframe src='http://zhibo.178.com/comment/?tid="+tid+"&parent="+location.hostname+"' style='border:none;width:100%;overflow:hidden' scrolling='no' id='live_iframe' name='live_iframe' class='live_iframe'></iframe>")
var a = $('m_pbtntop').getElementsByTagName('a')
for(var i=0;i<a.length;i++)
	if(a[i].title=='����ظ�')
		a[i].parentNode.style.display='none'
}

//=============================
commonui.fastPostUi =function(){}



}//be






