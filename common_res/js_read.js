
if(!window.commonui)
	var commonui = {}


//============================
//������ʾ�������洦��===========
commonui.postArg = {
data:{},
w:window,
def:{},
toInt:__NUKE.toInt,
//�������Ӳ�����Ĭ��ֵ �μ�proc
setDefault:function(fid,stid,tid,tAid,topicMiscBit1,punUsers,visit,mods,vote,customLevel){//����id ���ںϼ���stid ����id ����id ��������id tmbit1 ���н��Ե��û� ������ ���� �����ͶƱ/Ͷע/�����Ϣ
if(!customLevel && window.__CUSTOM_LEVEL)
	customLevel = window.__CUSTOM_LEVEL
if(typeof customLevel=='string')
	eval("customLevel="+customLevel)
this.def = {
	fid:fid,
	stid:stid|0,
	tid:tid,
	tAid:tAid|0,
	punUsers:punUsers ? (function(){var y={};punUsers.replace(/\d+/g,function($0){y[$0]=1;return $0});return y})() : null,
	mods:mods ? (function(){//1���� 2������
		var now = __NOW,x,y={},z = function($0){
			if($0.substr($0.length-1)=='t')
				x = $0.substr(0,$0.length-1)-now>=0 ? 3 : 1
			else if(x){
				y[$0] = x-1
				x = 0
				}
			else
				y[$0] = 1
			return $0
			}
		mods.replace(/\d+t?/g,z)
		return y
		})() : {},
	tmBit1:this.toInt(topicMiscBit1),
	noimg:(__SETTING.bit & 64) && true,
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
'i',0,//¥�������id

'pC',0,//����block
'subjectC',0,//����
'contentC',0,//����
'signC',0,//ǩ��
'uInfoC',0,//�û���Ϣ
'pInfoC',0,//������Ϣ
'postBtnC',0,//���Ӳ�����ť����

'fid',2,//����id ��null
'tid',2,//����id ��null
'pid',0,//����id
'type',1,//��������bit

'tAid',2,//��������id ��null
'pAid',0,//��������id
'postTime',0,//����ʱ���
'recommend',0,//�����Ƽ�ֵ
'cLength',1,//�������ݳ���

'ip',0,//����ip
'orgForum',0,//ԭ������
'fromClient',0,//�����Կͻ���
'orgFid',0,//ԭ����fid
'stid',2,//���ںϼ���stid ��null
'atItem',2,//������ʹ�õĵ���
'opt',2 //����ѡ��bit  &1������ʾ����,ȥ������,����ԭ����   &2������Ⱦ����
],
//�������Ӳ��� ����˳���arg
proc:function(){
var n = function(){}
n.prototype = this.def
var m = new n()

for(var i=0;i<arguments.length;i++){
	if((this.arg[i*2+1]&2) && !arguments[i])continue
	m[this.arg[i*2]] = (this.arg[i*2+1]&1) ? (arguments[i]|0) : arguments[i];
	}

m.comment = ( m.contentC.id.substr(0,11)=='postcomment')?true:false//�Ƿ���ʾΪ����
m.opt = m.opt?(m.opt|0):0 //&1������ʾ����,ȥ������,����ԭ����
//if(m.comment && (m.type & 1)==0){
//	if(m.uInfoC.parentNode.parentNode.id.substr(0,14)=='hightlight_for'){
//		m.hightPost = 1//���ȵ�ظ�
//		m.opt|=1
//		}
//	}

if(m.recommend && m.recommend.constructor!=Number){
	i = (m.recommend+'').split(',')//�Ƽ�ֵ,֧��,����
	m.score = (i[1]|=0)
	m.score_2 = (i[2]|=0)
	m.recommend = i[1]-i[2]>0 ? i[1]-i[2] : 0
	}
else{
	m.score = m.score_2 = 0
	m.recommend |= 0
	}
m.correctNode = m.i==0?true:false
m.atItem = m.atItem?commonui.atItems._CREATE(m.atItem) : null//���������еĵ���(obj) .length .id(i)��ȡ��i�����ߵ�id  .count(i)��ȡ��i��������  .i(id)�����ض�id��index .info(i)��ȡ��i�����ߵ�info
m.recommendO = _$('/span','className','white','title',(m.__GP.ubMod ? m.score+'֧�� '+m.score_2+'���� (�����ɼ�)' : ''),'innerHTML',m.recommend ? m.recommend : (m.__GP.ubMod ? 0 :''))

this.data[ m.i ] = m

if(m.opt&2)
	return
this.w.commonui.postBtn.load(m.i)
this.w.commonui.postDisp(m.i)
}//fe
}//ce commonui.postArg

//============================
//������ʾ=====================
//����/��������Ϣ/ǩ����ʾ=======
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

var lite=(a.vsmall ? 1:0)// &1С��Ļ / &2��ʾͷ�� / &4��ʾǩ�� /&8 app
if(window.__APPEMBED)
	lite |= 8

//�Ƽ���ť
var ogood = $('/span','className','small_colored_text_btn block_txt_c2 stxt')._.add(
	$('/span','className','urltip nobr','style','fontSize:1.2em;marginTop:-1.8em;color:'+__COLOR.txt2),
	$('/a','className','white','href','javascript:void(0)','title','֧��',__TXT('good'),'onclick',function(){commonui.postScoreAdd(this,a)}),
	a.recommendO,
	$('/a','className','white','href','javascript:void(0)','title','����',__TXT('bad'),'onclick',function(){commonui.postScoreAdd(this,a,1)})
	),
//ip
oip = a.ip ? $('/a','className','stxt','href','javascript:void(0)','style','color:inherit','innerHTML','['+a.ip+']','onclick',function(e){commonui.ipArea(e,a.ip)}) : null,
//Դ����
oofrm = a.orgForum && (a.fid!=108 || a.__GP.ubMod)? 
	$('/a','style','marginLeft:0.7em;color:inherit','href','/thread.php?fid='+a.orgFid,'innerHTML',"["+a.orgForum+"]") : null,
//posttime
optime = $('/span','id','postdate'+a.i,'style','marginLeft:0.7em','className','stxt',
		'innerHTML',this.time2date(a.postTime,'Y-m-d H:i'), 
		a.__GP.admincheck?'onclick':null,a.__GP.admincheck?function(){if(this.style.color){adminui.selectPid(a.tid,a.pid,1);this.style.color=''}else{adminui.selectPid(a.tid,a.pid,0);this.style.color='darkred'}}:null)
//count
ocount = (a.i==0 && a.visit && a.__GP.admincheck && a.__GP.greater) ? $('/a','href','javascript:void(0)','innerHTML',(a.tmBit1 & _TM_BIT1_COUNT_VIEW) ? '??' : a.visit[0],'style','marginLeft:0.7em','className','small_colored_text_btn block_txt_c0 stxt',
		'onclick',function(){if(a.tmBit1 & _TM_BIT1_COUNT_VIEW) adminui.forumStat(null,null,a.tid); else alert('���շ���'+a.visit[0]+'�� �����û�'+a.visit[1]+'�� ��һҳ'+a.visit[2]+'��')}) : null,
//�ղ�
ofav = $('/a','style','marginLeft:'+(a.small?'2em':'0.7em'),'className','small_colored_text_btn block_txt_c0 stxt','href','javascript:void(0)',
			'title','�ղ�','onclick',function(e){commonui.favor(e,this,a.tid,a.pid)},
			__TXT('star')
			),
//�����˵�
oopt = $('/a','style','marginLeft:'+(a.small?'2em':'0.7em'),'className','small_colored_text_btn block_txt_c0 stxt','href','javascript:void(0)',
			'title','�����˵�','onclick',function(e){
				if(lite&8)
					return commonui.postBtnLite(e,1,argid)
				commonui.postBtn.allBtn(e,argid)},
			'oncontextmenu',function(e){commonui.postBtn.allBtn(e,argid);return commonui.cancelEvent(e)},
			__TXT('gear')
			),
//����
otype = (a.type || a.tmBit1) ? $('/span','innerHTML',this.getPostBitInfo(a.fid, a.tid, a.pid , a.type, a.tmBit1, 2|(a.comment?4:0), a.__GP.admincheck)) : null,
//����
osubj = $(a.subjectC).$0('style','line-height:inherit;vertical-align:-0.15em'),
//�ͻ���
clt = a.fromClient ? this.postDispFromClient(a.fromClient) : null


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
		$('/a','style','padding:0 0.85em;marginLeft:'+(a.small?'2em':'0.7em'),'className','small_colored_text_btn block_txt_c0 stxt','href','javascript:void(0)',
			'title','�ظ�','onclick',function(e,a){
				commonui.openPostWindow(e,postfunc.__REPLY,'',a.tid,a.pid)
				return commonui.cancelEvent(e)
				},
			__TXT.svg('bubble','width:0.8em;fill:'+__COLOR.bg1)
			),
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

//subject��
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



//pinfo��
a.pInfoC.innerHTML=ngaAds.bbs_ads32_gen();
console.log(pInfoC_add)
$(a.pInfoC).$0('style','lineHeight:inherit;color:'+((lite&8) ? __COLOR.border2 : __COLOR.gbg2),pInfoC_add)

if(lite&8)
	$(a.postBtnC).$0(opra_add)

if(a.atItem)
	a.pInfoC.parentNode.insertBefore(commonui.postDispAtitems(argid,a.atItem),a.pInfoC.nextSibling)


//if(small)
//	a.pInfoC.parentNode.insertBefore($('/div')._.css('clear','both'),a.pInfoC.nextSibling)

if (a.comment){//comment
	var posterinfo =  $(a.uInfoC.cloneNode(),'innerHTML',this.posterInfo.main(lite, a.i, a.fid, a.tid, a.pid, a.cLength, a.pAid, a.type, a.stid, a.comment),'style','display:block')
	a.pInfoC.style.display='none'
	a.uInfoC.parentNode.replaceChild(posterinfo,a.uInfoC)
	a.uInfoC = posterinfo
	return w.ubbcode.bbsCode({
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

	
if(uI.buffs[99] || uI.buffs[102] || uI.buffs[107] || uI.buffs[120] || uI.buffs[119] || uI.buffs[124]){
	this.postDispAvatarBg(a.uInfoC.parentNode, __IMG_STYLE+'/avatarbg.png')
	a.contentC.innerHTML+=' [color=silver]����'+(
		uI.buffs[102] ? '��' : (
		uI.buffs[107] ? 'poi': (
		uI.buffs[120] ? '������': (
		uI.buffs[99] ? '��': (
		''))))
		)+'~[/color]'
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


//this.usernamelink($('postauthor'+pos),aid, pos % 20 )//�޸�����
if(a.small)
	this.postDispAdjCommetWidth(a)
if(a.signC && uI.signature)
	this.postDispSign(a,uI,lite)

if(this.quoteTo && a.contentC.parentNode.id.substr(0,21)=='postcontentandsubject')
	this.aE(a.contentC.parentNode,'mouseup',function(e){commonui.quoteTo.onmouseup(e, parseInt(this.id.substr(21),10) )})

}//fe commonui.postDisp


//�Ѿ�ʹ�õĶ�������
commonui.postDispAtitems = function(argid,atItem){
var $=_$,x = $('/span','className','silver b opacity75'),i,j,l
for(i=0;i<5;i++){
	j=atItem.info(i)
	if(j)
		x._.add( (l=atItem.count(i))+(l>9?'':'��'), $('/img','src',atItem._P+'/'+j[1],'style','verticalAlign:middle;width:3em;height:3em','title',j[2]),$('/br'))
	}
return $('/div',
		'title','����',
		'onclick',function(e){commonui.recommendPost(e,argid,this)},
		'style','clear:right;cssFloat:right;float:right;marginBottom:-0.2em;textAlign:right;cursor:pointer',
		x 
		)
}//


//�豸��Ϣ������
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

	return $("/a",'title',(y==8||y==9||y==7) ? ('������'+(client[2]?' '+client[2]+' �ϵ�':'')+' NGA�ٷ��ͻ���') : (client[2]?'������ '+client[2]:'������ δ֪�豸'),
				'className',' inlineBlock','style','width:16px;height:16px;margin-left:0.4em;vertical-align:middle;filter:'+((y==8||y==9||y==7) ? 'none' : 'opacity(0.6)'),'style',{'background':'url("'+this.postDispFromClient.src+'") no-repeat -2px '+x+"px"},
				'href','http://app.'+location.hostname
				)

		

	}
return null
}//

commonui.postDispFromClient.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAABVCAMAAACcjy+PAAAAD1BMVEUAAADgwZ7gwZ7gwZ7gwZ54CaA+AAAABXRSTlMAOspz/+jVyFoAAAD6SURBVDjLzVRLdsQwCJPA9z9xjLqIA7Zn5rVpuwgL50XmKwzAr4R5nOKQ4QDQzmsTgpdCGwejDOyN059iHxMyAIjzvOIagEBit+J2xYw5AEAKgOLpb8vC8Qyh+UtttHhV48wfSLCTYOjCPLscyV81XleMgiIxe8PpnoIvSXLiOT2SGioqu8xFCUplRYIQ2PFQ8Sp0zAwgs+Rn1DHYV59o0vzxU3lcURz+6D1b612jH7Y87zuzENW5yLiSZdOV5QgMMWL2J0IC9TFGDg5j2RNPkXpX9ejamvpRtXExa7PC+PvL/ruLzcu67Xx/6+84Ng7atA6y58Q2oP8oX22US3uf0QSiAAAAAElFTkSuQmCC'

//�û���Ϣ���򱳾�ͼ
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

//�����û���Ϣ���򱳾�ͼ
commonui.postDispSetUserInfoBgEdit = function(e){
	commonui.createadminwindow()
	var x = commonui.adminwindow,$=_$
	x._.addContent(null)
	x._.addTitle('���ñ���ͼ')
	var y = $('/span')._.add(
		'ͼƬ�������������������',
		$('/br'),
		'���ܻ�������� �����б���ԭͼ',
		$('/br'),
		'������ ',
		$('/input','type','radio','name','CPBalign_74635','value',1,'checked','checked'),'���� ',
		$('/input','type','radio','name','CPBalign_74635','value',2),'���� ',
		$('/input','type','radio','name','CPBalign_74635','value',4),'���� ',
		$('/input','type','radio','name','CPBalign_74635','value',8),'���� ',
		$('/br'),
		$('/input','type','checkbox','value',16,'checked','checked'),'��͸�� ',
		$('/input','type','checkbox','value',32),'ƽ�� ',
		//'�ļ���С������1536k',
		$('/br'),
		//֧��window.FileReader
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
					return alert('�ļ�����');
				commonui.userCache.set("customPosterBackgroundFile",data+'~'+opt,86400*300)
				}
			else
				commonui.userCache.del("customPosterBackgroundFile")
			alert("������� ˢ��ҳ�����Ч")
			commonui.adminwindow._.hide()},'type','button','innerHTML','ȷ��'),
		$('/button','onclick',function(){commonui.userCache.del("customPosterBackgroundFile")
			alert("������� ˢ��ҳ�����Ч")
			commonui.adminwindow._.hide()
			},'type','button','innerHTML','�������ͼ')
		)
	x._.addContent(y)
	x._.show(e)
}//



//�������ݳ���
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


//���������Ŀ�ȵ� ��Ĭ��һ������ ����Ϊһ��һ��
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

//��ʾǩ��
commonui.postDispSign=function(a,uI,lite){
if(lite & 4){
	a.signC.innerHTML = "<span class='sigline'><span class='en_font xtxt'>"+location.hostname.toLocaleUpperCase()+"</span></span>"
	if(uI.buffs[113])
		a.signC.innerHTML += "<button type='button' disabled='disabled'>ǩ��������</button>"
	else if(a.noimg || (lite & 8)){
		a.signC.appendChild( _$('/button','type',"button",'innerHTML','�����ʾǩ��','onclick',function(){
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
			if(opt&1){//����100% ����0%
				if(j>hw)
					u.data[ak] = g(u.data[ak],j,hw)
				if(i>hh)
					u.data[ak] = g(u.data[ak],i,hh)
				}
			if(opt&2){//����100% ����0%
				if(j<hw)
					u.data[ak] = l(u.data[ak],j,hw)
				if(i>hh)
					u.data[ak] = g(u.data[ak],i,hh)
				}
			if(opt&4){//����100% ����0%
				if(j<hw)
					u.data[ak] = l(u.data[ak],j,hw)
				if(i<hh)
					u.data[ak] = l(u.data[ak],i,hh)
				}
			if(opt&8){//����100% ����0%
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
//ͷ�񱳾�ͼ====================
commonui.postDispAvatarBg = function(o,i,p){
o.style.background='#fff url("'+i+'")'+(p?' '+p:' 50% 0.5em no-repeat')
o.style.backgroundColor=''
}//


//ǩ���߶�=====================
commonui.postSignCheckHeight=function(o){
if(o.offsetHeight<=300){
	o.style.visibility=''
	return
	}
o.style.display='none'
o.style.visibility=''
o.parentNode.insertBefore(
	_$('<button type="button">ǩ���߶ȳ���300</button>')._.on('click',function(){this.style.display='none';this.nextSibling.style.display=''}),
	o
	)
}//fe
//����ʹ��================
commonui.atItemBuyUse = function(e,tid,pid){
var x, $ = _$
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('������ʹ�õ���')
this.adminwindow._.addContent(x = $('/span'))
var s = function(o){
	if(!window._ITEM)
		return loader.script(__SCRIPTS.userItem,function(){
			s(o)
			} )
	var y = tid+'\t'+(pid?pid:0)+'\t0'
	var io = new_ITEM_inset(o)
	io.storeBuyAndUse(1,5,'21,23,24,25,26',y,null)//���5 ��������
	}//fe
s(x)
this.adminwindow._.show(e)
}//fe
//�Ƽ���������=================
commonui.recommendPost = function(e,i,o){
if(!window.__CURRENT_UID && !i.length)
	return
var a = commonui.postArg.data[i], tid = a.tid, pid = a.pid, i = a.atItem, y,$ = _$

this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('ʹ�õ���')
var self = this, store = function(y){
	if(!window._ITEM)
		return loader.script(__SCRIPTS.userItem,function(){
			store(y,o)
			} )
	t.innerHTML=''
	y = tid+'\t'+(pid?pid:0)+'\t'+y
	var io = new_ITEM_inset(t)
	io.storeBuyAndUse(1,5,0,y,null)//���5 ��������
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
				' '+i.count(j)+'��',
				$('/img').$0('src',i._P+'/'+k[1],'style',{width:'2em',height:'2em',verticalAlign:'middle'},'title',k[0]+' : '+k[2])
				)

		if((y++)&1)
			x._.add($('/br'))
		}
	this.adminwindow._.addContent(
		$('/br'),$('/br'),
		$('/h4').$0('className',"textTitle silver",'innerHTML','�����û�����ʹ�õĵ���'),
		x
		)
	}
this.adminwindow._.show(e)
store(0)
}//fe

//�޸ļ�¼��ʽ��================
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
							o+="��ͬ����������"
						else if($2[2]!='0')
							o+="��������"
						else if($2[1]!='0')
							o+="�ڰ�����"
						o+='����'+$2[0]+'�� '
						}

					if($2[3]!='0'){
						o+='�۳�����'+$2[3]
						if($2[4]!='0')
							o+=' �۳�����'+($2[4]/10)
						}
					return o+$3+'</span>&emsp;'
					}
				else
					return '<span '+s(1)+'>'+c('&#10005;')+'-'+$2[0]+'���� -'+$2[1]+'���� ����'+$2[2]+'��'+$3+'</span>&emsp;'
				}
			else if($1=='U')
				return '<span '+s(1)+'>'+c('&#10003;')+$2[0]+'���� '+$2[1]+'���� '+$2[2]+'G'+($3==' UM'?' �������':'')+' (ȡ������)</span>&emsp;'
			else if($1=='E'){
				var o='<span '+s()+'>'
				if($2[1]=='0' && $2[2]=='#ANONYMOUS#')
					o+='�����û� '
				else if($2[1]=='0' && $2[2]=='0')
					o+=''
				else
					o+="<a href='/nuke.php?func=ucp&uid="+$2[1]+"'>"+$3.substr(1)+"</a> " 
				x +=  o+'��'+commonui.time2date($2[0], 'Y-m-d H:i')+'�޸�</span>&emsp;'
				return ''
				}
			else if($1=='A')
				return '<span '+s(1)+'>'+c('&#10003;')+$2[0]+'���� '+$2[1]+'���� '+$2[2]+'G'+$3+(__GP.greater ? " <a class='block_txt block_txt_c0' style='margin-right:-0.4em' href='javascript:void(0)' onclick='adminui.viewLog(0,0,"+$2[3]+")'>?</a>":'')+'</span>&emsp;'
			else
				return '<span '+s(1)+'>'+c('&#10003;')+$2[0]+'���� '+$2[1]+'���� '+$2[2]+'G'+$3+$4+'</span>&emsp;'
			});
		}/*
	else if(z.substr(0,4)=='$fav'){

			x+='<span '+s()+'>'
			z = z.substr(4).split('/')
			for(var j=1;j<z.length;j+=2)
				x += "<a href='/column.php?uid="+z[j]+"'>"+z[j+1]+"</a> "
			if((z.length-1)/2<z[0])
				x += '��'+z[0]+'��'
			x+='(����)�ղ��˴���</span>&emsp;'
			
		}*/
	}
$(ci).innerHTML = x+y
//$(ci).innerHTML = (x ? '<div class="silver">'+x+'</div>' : '')+(y?"<table class='quote'><tr><td>���ּ�¼ "+y+'</td></tr></table>':'')
}

//��������Ϣ��ʽ��==============
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
	d.avatar = this.avatar(i, 1, u.avatar, u.buffs)
	d.authorname = this.name(i,active, u.username, uid, u.buffs)
	return this.comment(d)
	}

d.avatar = this.avatar(i, lite, cLen>=15?u.avatar:'', u.buffs, a ? a.atItem :null, uid);
d.honor=this.honor(u.honor,lite)
//d.icon=this.levelIcon(this.uI.groups[u.memberid][1] & 16, rvrc)
d.l=this.floor(i, pid)
d.uid = this.uid(uid)
d.r_bar = this.r(lite, uid)
d.level = this.level(lite, this.uI.groups[u.memberid][0], rvrc, fid, uid, active, u.groupid, (a && a.mods) ? a.mods[uid] : 0, a.customLevel)
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
x+="<div style='float:left;margin-right:3px;min-width:49%;*width:49%'><nobr>"+d.level.level+"</nobr></div>"
x+="<div style='float:left;margin-right:3px'><nobr>"+d.level.r_value+"</nobr></div>"
//x+="<span class='clickextend' style='"+(lite&2 ? '' : 'display:none')+"'>"
x+="<div style='float:left;margin-right:3px;min-width:49%;*width:49%'><nobr>"+d.postnum+"</nobr></div>"
x+="<div style='float:left'><nobr>"+d.money+"</nobr></div>"
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

x+="<span class='gray nobr'>"+d.level.level+"</span> <span class='gray nobr'>"+d.level.r_value+"</span><span class='gray nobr'> "+d.postnum+"</span> <span class='gray nobr'>"+d.money+"</span> "

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
	var y = this.c.cutstrbylen(remark[k][4],9)
	if(y!=remark[k][4])
		y=y+'��'
	if(remark[k][3]&1)
		x+="<span class='block_txt block_txt_c3 nobr' style='margin-bottom:0.25em;color:"+__COLOR.quote1+"'title='"+'������ע '+remark[k][4]+"'>"+'<span class="block_txt block_txt_c0" style="margin-left:-0.4em">&#10003;</span> ' +z+y+"</span> "
	else
		x+="<span class='block_txt block_txt_c3 nobr' style='margin-bottom:0.25em;color:"+__COLOR.txt2+"'title='�����ɼ� '"+remark[k][4]+"' onmouseover='this.firstChild.style.visibility=\"\"' onmouseout='this.firstChild.style.visibility=\"hidden\"'><span style='visibility:hidden'>"+z+y+"</span></span> "
	}

return x
},//fe

avatar:function(i,lite,avatar,buff,at,uid){

if(this.sb & 64)//����ʾͷ��
	return ''

avatar = this.c.selectUserPortrait(avatar,buff,uid)

if(!avatar)
	return ''

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

level:function(lite,level,rvrc,fid,uid,active,gid,mod,customLevel){
var d = {}, le

//if(le=this.mI(gid,mod))
	//le = (le[1] ? '<a href="javascript:void(0)" onclick="alert(this.title)" class="block_txt block_txt_c0" title="'+le[1]+'" style="background-color:#'+le[3]+'">'+level+'</a>' : level)+(le[4] ? ' <a href="javascript:void(0)" onclick="alert(this.title)" class="block_txt block_txt_c0" title="'+le[5]+'" style="background-color:#'+le[6]+'">'+le[4]+'</a>' : '')

if ( !customLevel ){
	d.level = "����: <span name='level' class='silver' title='"+active[3]+"'>"+(le? le:level)+"</span>"
	d.r_value = "����: <span class='numericl silver' name='pg'>"+rvrc+"</span>"
	return d
	}

var cRv=0, z = customLevel[0].n, r =this.uI.reputations
for(var k in r){//ʹ�ð���ĵ�һ��������ֵ
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
for (var i=0;i<customLevel.length;i++){
	if (cRv>=customLevel[i].r)
		z=customLevel[i].n
	else
		break
	}

var y = cRv>9999 ? 'numeric' :'numericl'

d.level ="<span title='��̳����:"+level+" &emsp;����:"+rvrc+" "+active[3]+"'>����: <span name='level' class='silver'>"+(le?le:z)+"</span></span>"

if((lite&1)==0)
	d.r_value = "����: <span class='"+y+"'>"+cRv+"</span>"
else
	d.r_value=''

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
		r_bar[k]="<span title='"+n+"'>����: <span class='"+(v>9999 ? 'numeric' :'numericl')+"'>"+v+"</span></span>"
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
	return "<span title=' ע��ʱ��: "+regdate+" &#10; ����½: "+lastlogin+" '>ע��: <span class='numeric silver' name='regdate'>"+regdate.substr(2,8)+"</span></span>"
var tmp = postnum>9999 ? 'numeric': 'numericl'
return "<span title=' ע��ʱ��: "+regdate+" &#10; ����½: "+lastlogin+" '>����: <span class='"+tmp+" silver' name='postnum'>"+postnum+"</span></span>"
},//fe

money:function(money){
if(money<=0)
	return ''
return "�Ƹ�: <span class='numericl silver' name='money' value='"+money+"'>"+this.c.calc_money(money)+"</span>";

},//fe

medal:function(medal){
if (!medal)
	return ''
var x = '', r = this.uI.medals, medal = medal.toString().split(',')
for (var k in medal){
	if(k=='length' || !medal[k] || !this.uI.medals[medal[k]])
		continue
	var m = this.uI.medals[medal[k]]
	x+=" <img class='medalimg' src='"+this.__IMGPATH+"/medal/"+m[0]+"' title='"+m[1]+":&#10;"+m[2]+"' "+(m[3]==351||m[3]==386?" onclick='commonui.posterInfo.medalClick(event,this,"+m[3]+")' ":'')+"style='margin-bottom:-4px'/>"
	}
if(!x)
	return x
return "����:<span name='medal'>"+x+"</span>"
},//fe

medalClick:function(e,o,mid){
if(mid==351){
	if(!window.ubbcode||!ubbcode.psBtn)
		return loader.script(__COMMONRES_PATH+'/js_upup.js?0220',function(){commonui.posterInfo.medalClick(e,o,mid)})
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
	return ['orange','MUTED','����',"���û���ȫ�ֽ���״̬ ��"+this.c.time2date(muteTime,'Y-m-d H:i')]
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
						return ['orange','MUTED','����','���û���ȫ�ֽ���״̬ ����鿴�û���Ϣ']
					else
						return ['gray','MUTED','����','���û���ĳ�������ǽ���״̬ ����鿴�û���Ϣ']
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
	//x+="<a class='block_txt block_txt_c2' style='margin-bottom:0.25em' href='/column.php?uid="+authorid+"' title=''>�۾�</a> "
return x
}//fe
}//ce



//============================
//ͶƱ========================
//ͶƱ��ʾ=====================
commonui.vote = function(o,tid,x){
if(!x)
	return this.voteOld(o,tid)
var sum = 0,vsum=0,usum=0,w=window,__NUKE=w.__NUKE,id='vote'+Math.random(),type='radio',
TYPE_VOTE = 0,//ͶƱ��
TYPE_BET = 1,//Ͷע��
TYPE_SCORE = 2,//������
TYPE_SCORE_VOTE = 3,//������ĵ�����������

small = __SETTING.bit & __SETTING.bits.size4
bW = small ? 5 : 10

x = __NUKE.scDe(x)
x.type |= 0

if(x.type==TYPE_SCORE_VOTE){
	o.innerHTML = "<div><h4 class='silver subtitle'>����</h4>"+(function(x,y){
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
		var y = x['_'+k].split(',')//��������, ����Ͷע��, ������
		x[k]=[x[k], y[0]|0, y[1]|0]//����, ��������, ����Ͷע��
		if(y[2]>usum)
			usum = y[2]|0
		sum += y[0]|0
		if(y[1])
			vsum+=y[1]|0
		}
	}

var name = x.type==TYPE_SCORE ? '����' :(x.type==TYPE_BET?'Ͷע':'ͶƱ'), atv=!x.end || w.__NOW<=x.end, txt="<table id='"+id+"' style='font-size:"+(small?'0.842em':'')+"'><tbody>", info = "", btn='', i=0,savg=0

for (var k in x){
	if((k|0)==0)
		continue;
	i++
	txt += "<tr><td>"+x[k][0]+"</td>";
	if(atv && w.__CURRENT_UID){
		if(x.type==2){}
		else if(x.type==1)
			txt += "<td><input name='"+k+"' value='' title='��Ͷע�������ڴ�����Ͷע����' style='width:2em'/></td>"
		else
			txt += "<td><input type='"+type+"' name='vote"+tid+"' value='"+k+"'/></td>"
		}
	if(!atv && w.__GP.admincheck && x.type==1 && !x.done){
		txt += "<td><input type='"+type+"' name='vote"+tid+"' value='"+k+"'/></td>"
		}
	if(x.done){
		if(x.done.indexOf(','+k+',')!=-1)
			txt += "<td><b class='red'>ʤ��</b></td>"
		else
			txt += "<td></td>"
		}
	if(x.type==2){
		txt += "<td><b>"+(tmp = (x[k][2]/x[k][1]*100|0)/100)+"��</b></td><td style='width:"+bW+"em'><div style='background:"+__COLOR.quote1bg+";border-radius:0.17em;width:100%'><div style='background:"+__COLOR.border0+";border-radius:0.17em;height:1em;width:"+(tmp? tmp/x.max*100 : 0)+"%'></div></div></td>"
		this.vote['votedata_vote'+i+'value']= tmp
		savg+=tmp
		}
	else{
		txt += "<td><b><nobr>"+x[k][1]+"��</nobr></b></td>"
		txt += "<td><nobr>"+(((x[k][1]/sum*1000)|0)/10)+"%</nobr></td>"
		txt += "<td style='width:"+bW+"em'><div style='background:"+__COLOR.quote1bg+";border-radius:0.17em;width:100%'><div style='background:"+__COLOR.border0+";border-radius:0.17em;height:1em;width:"+(sum? x[k][1]/sum*100 : 0)+"%'></div></div></td>";
		if(x.type==1){
			txt+=small ? "</tr><tr style='box-shadow:0 0.052em "+__COLOR.quote1bg+"'><td colspan=2>" : "<td>"
			txt += "<b><nobr>Ͷע"+x[k][2]+"</nobr></b></td>"
			txt += "<td><nobr>"+(((x[k][2]/vsum*1000)|0)/10)+"%</nobr></td>"
			txt += "<td style='width:"+bW+"em'><div style='background:"+__COLOR.quote1bg+";border-radius:0.17em;width:100%'><div style='background:"+__COLOR.border0+";border-radius:0.17em;height:1em;width:"+(vsum? x[k][2]/vsum*100 : 0)+"%'></div></div></td>";
			}
		}
	txt+='</tr>'
	}
this.vote['votedata_voteavgvalue']= ((savg/i*10)|0)/10

txt += "</tbody></table> "

if(x.type==2)
	info += "����("+x.min+"~"+x.max+")"
else if(x.type==1)
	info += "Ͷע<a href='javascript:void(0)' class='b' onclick='alert(\"10000ͭ��=100����=1���\")'>ͭ��</a> ����"+x.min+" ���"+x.max+" ���Ͷע"+x.max_select+"��"
else
	info += "���ѡ��"+x.max_select+"��"

if(x.priv)
	info += " "+x.priv.replace(/r-?\d+_/,'��Ҫ�ﵽ')+'��������'

info += " ����"+usum+"��"+name;
this.vote['votedata_usernum']=usum

if(x.type!=2)
	info += " ����"+sum+(x.type==1?"��Ͷע":"Ʊ");

if(x.type==1)
	info += " ����Ͷע"+vsum+"ͭ��";

if(x.end)
	info+=" ����ʱ�� "+this.time2date(x.end,'Y-m-d H:i')

if(x.opt&1)
	info+=" �ύ��ɲ鿴���"

if(x.opt&2)
	info+=" ������ɲ鿴���"

if (atv && w.__CURRENT_UID)
	if(x.type==2)
		btn+="<br/>�ظ��������ύ������� (���ٻظ���������)"
	else
		btn += "<br/><button type='button' onclick='commonui.vote.submit(this.parentNode.parentNode,"+tid+","+x.type+","+x.max_select+","+x.min+","+x.max+","+x.end+")'>"+name+"</button> "

if(!atv && w.__GP.admincheck && x.type==1 && !x.done)
	btn += "<br/><button type='button' onclick='commonui.vote.submitSettle(this.parentNode.parentNode,"+tid+")'>����</button> (��ѡ�ж�Ϊ\"Ӯ\"��ѡ��)"

o.innerHTML = "<div><h4 class='silver subtitle'>"+name+"</h4>"+(i>16 ? '<div>'+info+'</div>' : '')+txt+'<div>'+info+btn+'</div></div>'


}//fe
//ͶƱ����=====================
commonui.vote.submitSettle = function (o,tid){
if(!confirm("��ѡ���˽���ͶƱ���Ƿ����"))
	return
if(!confirm("��ȷ��һ�� ��Ҫ����ͶƱ����ȷ��ѡ����ȷ��ʤ�����ô��"))
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
//ͶƱ�ύ=====================
commonui.vote.submit = function (o,tid,type,max_select,min,max,end){
var x = o.getElementsByTagName("input"),y=[],c=0
for (var i = 0;i<x.length;i++){
	if(type==1){
		if(x[i].value){
			c++
			if(c>max_select)
				return alert('����Ͷע����'+max_select+'��')
			var z =  __NUKE.toInt(x[i].value)
			if(z<min)
				return alert('������Сֵ')
			if(z>max)
				return alert('�������ֵ')
			y.push(x[i].name)
			y.push(x[i].value)
			}
		}
	else{
		if (x[i].checked){
			c++
			if(c>max_select)
				return alert('����Ͷע����'+max_select+'��')
			y.push(x[i].value)
			}
		}

	}
if (y.length)
	__NUKE.doRequest({u:__API.vote(tid,y.join(',')),
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



//============================
//��������=====================
commonui.atItems = {//�ο� items/lib_at_item.php
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
sp:null,//������Ч������У� [������ɫ ͷ��bg ͷ�������]
length:0,
_CO_RIOT:18,
_P:__IMG_STYLE+'/items',
_SP:{//�ض�id���ߵ���Ч
	18:"#bf4385\triotbg.png\t0 0 no-repeat\triotbr.png",
	//������ɫ/ ͷ��bg/  ͷ�������/ 
	19:"#bf4385\txishanbg.png\t0 0 no-repeat\txishanbr.png",
	23:"#bf4385\ttidebg.png\t0 0 no-repeat\ttidebr.png\t1",
	24:"#bf4385\talliancebg.png\t0 0 no-repeat\t\t1",
	25:"#bf4385\thordebg.png\t0 0 no-repeat\t\t1"
	},
_INFO:{
	1:'��Ӳ����\t5_1.gif\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
	2:'׶�ξ޽�\t5_2.gif\t��ȻҲû��~���ǻ�Ǯ��������֤���ҵĳ���~',
	10:'�㵱\t5_10.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
	11:'��ˮ��\t5_11.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
	12:'����\t5_12.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
	13:'����\t5_13.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
	14:'����\t5_14.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
	15:'�����ҩ\t5_15.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
	16:'ף��\t5_16.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
	17:'�洫DNA\t5_17.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
	18:'RIOT\t5_18.png\t����RIOT��˾�ķ���~',
	19:'��ɽ��\t5_19.png\t������ɽ�ӹ�˾�ķ���~',
	20:'���\t5_20.png\t��Ȼû��~���ǻ�Ǯ��������֤���ҵĳ���~',
	21:'��������\t5_21.png\t�������б�����ʾ���ⷢ���ߵ�ͷ�� ��40�������� ֻ�ܶ��Լ�����������ʹ��',
	23:'��\t5_23.png\t����ʹ�ò�ͬ����ʽ,��������Ч��',
	24:'����\t5_24.png\t����ʹ�ò�ͬ����ʽ,��������Ч��',
	25:'����\t5_24.png\t����ʹ�ò�ͬ����ʽ,��������Ч��',
	26:'������Ƶ/JSɳ��\t5_26.png?2\t����������Ƕ����Ƶ����/JSɳ��',
	},
_IF_HIDDEN:function(id){if(id==18||id==19)return 1},//���Ƽ������ﲻ��
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
//���Ӳ�����ťlite=============
commonui.postBtnLite = function(e,opt,argid){
var a = commonui.postArg.data[argid], $=_$
if(opt&1){
	var x = $('/span'
		,$('/a','href','javascript:void(0)','style','margin:0 0.5em','className','inlineBlock','onclick',function(e){
			if(window.__APPEMBED)
				window.__API.do('8?contentReport#',{tid:a.tid,pid:a.pid})
			else
				commonui.logPost(e,a.tid,a.pid)
			})._.add('�ٱ�',$('/br'),'�ٱ�')
		,$('/a','href','javascript:void(0)','style','margin:0 0.5em','className','inlineBlock','onclick',function(e){
			if(window.__APPEMBED)
				window.__API.do('parent6',{tid:a.tid,pid:a.pid})
			else
				commonui.comment(e,a.tid,a.pid)
			})._.add('����',$('/br'),'����')
		)
	}
if(x)
	commonui.liteWindow(e,null,x)
}//


//============================
//���Ӳ�����ť=================
commonui.postBtn={
parent:commonui,
saveKey:'postBtnHis',
d:{

4:{u:'/read.php?pid={pid}&to',n1:'����',n2:'��ת���������Ķ�����',c:'red',
	ck:function(a){if (a.pid && window.location.href.indexOf('pid=')!=-1)return 1} },

5:{n1:'�ٱ�',n2:'�ٱ�����������',on:function(e,a){commonui.logPost(e,a.tid,a.pid)},
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
	n1:'�༭',
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
	n1:'����',
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
	n1:'�ظ�',
	ck:function(a){if (a.__CURRENT_UID)return 1} },

9:{n1:'����',n2:'��һ����̵Ļظ� / ��ֽ��',on:function(e,a){commonui.comment(e,a.tid,a.pid)},
	ck:function(a){if (a.__CURRENT_UID)return 1} },

10:{n1:'����',on:function(e,a){adminui.addpoint(e,a.tid,a.pid,a.fid)},
	ck:function(a){if(a.__GP.admincheck&2)return 1} },

11:{u:'/nuke.php?func=set_user_reputation&uid={pAid}&fid={fid}',n1:'����',n2:'���ô��˵�����',
	ck:function(a){if (a.__GP.admincheck&2 && a.fid<0)return 1} },

//12:{n1:'����',on:function(e,a){adminui.muteuser(e,a.pAid)},
//	ck:function(a){if (a.__GP['super'])return 1} },

13:{n1:'Nuke',on:function(e,a){adminui.nukeUi(e,a.pAid,a.tid,a.pid)},c:'gray',
	ck:function(a){if (a.__GP.superlesser || (a.__GP.ubSecAct))return 1} },

14:{n1:'Nuke',n2:'���Բ��ۼ�����',n3:'Lesser Nuke',on:function(e,a){commonui.lessernuke(e,a.tid,a.pid,a.fid)},
	ck:function(a){if (a.__GP.admincheck)return 1} },

15:{n1:'ǩ��',n2:'���ǩ��',n3:'���ǩ��',on:function(e,a){commonui.setSign(e,a.pAid,a.__GP.greater)},
	ck:function(a){if (a.__GP.greater)return 1} },

16:{n1:'ͷ��',n2:'���ͷ��',n3:'���ͷ��',on:function(e,a){commonui.setAvatar(e,a.pAid,a.__GP.greater)},
	ck:function(a){if (a.__GP.greater)return 1} },

17: {
	n1: '����', n2: '������������', n3: '��������', on: function (e, a) { commonui.setPost(e, a.tid, a.pid, a.fid) },
	ck: function (a) { if ((a.__GP.admincheck & 2) && a.pid && parseInt(a.pid, 10) && a.pid > 0) return 1 }
},

18:{n1:'����',n2:'�԰����ṩ���������ж��շ���',on:function(e,a,o){if(o._.gV('transed'))return;commonui.autoTranslate.main($('postcontent'+a.lou),a.fid);o._.sV('transed',1)},
	ck:function(a){if (window.__AUTO_TRANS_FID)return 1} },

19:{u:"/nuke.php?func=message#to={pAid}",n1:'����',n2:'�����߷��Ͷ���Ϣ',
	ck:function(a){if (a.__CURRENT_UID)return 1} },

20:{u:"/nuke.php?func=ucp&uid={pAid}",n1:'����',n2:'�鿴��������',n3:'������Ϣ'},

21:{u:"/thread.php?authorid={pAid}",n1:'����&sup1;',n2:'�������߷���������',n3:'�������ߵ�����'},

22:{u:"/thread.php?searchpost=1&authorid={pAid}",n1:'����&sup2;',n2:'�������߷����Ļظ�',n3:'�������ߵĻظ�'},

23:{u:"/read.php?tid={tid}&authorid={pAid}",n1:'����&sup3;',n2:'���������ڱ������ڵĻظ�',n3:'���������ڻظ�(ֻ��������)'},

25:{u:"http://v.t.sina.com.cn/share/share.php?appkey=3938048249&title=_TOPIC&url=_URL",target:'_blank',n1:"����΢��",on:function(e,a,o){o.href=commonui.postBtn.replaceUrl(o.href)} },

28:{u:"javascript:scrollTo(0,0)",n1:__TXT('up'),n2:'�ص�ҳ�涥��'},
/*
29:{n1:'<input type="checkbox" name="delatc[]" value="0"/>',n2:'ѡ�лظ�',n3:'(<input type="checkbox" name="delatc[]" value="0"/>ѡ�лظ�)',
	ck:function(a){if (__GP['admincheck'] && a.pid && parseInt(a.pid,10) && a.pid>0){
		this.n3=this.n3.replace(/value="\d+"/i,'value="'+a.pid+'"')
		this.n1=this.n1.replace(/value="\d+"/i,'value="'+a.pid+'"')
		return 1}}
	,on:function(e,a){this.value=a.pid},tag:'span'},
*/
30:{u:'/nuke.php?func=edit_history&tid={tid}&pid={pid}',n2:'�鿴�༭��¼',n3:'�༭��¼',
	ck:function(a){if (a.pAid==a.__CURRENT_UID || (a.__GP.admincheck&2))return 1} },

/*31:{u:'/nuke.php?func=locktopic&edit_lock&tid={tid}&pid={pid}&lock=1',n2:'����ʱ�䳬��ʱ�޽�ֹ�༭',n3:'��ֹ�༭',
	ck:function(a){if (__GP['admincheck'])return 1} },*/

32:{n2:'����Ϊ����ʱ�䳬��ʱ�޿��Ա༭',n3:'��ɱ༭',on:function(e,a){commonui.setPost(e,a.tid,a.pid,a.fid)},
	ck:function(a){if (a.__GP.admincheck&2)return 1} },

33:{u:window.location.href+'&noBBCode',n2:'�鿴���ӵ�BBCodeԴ��',n3:'�鿴Դ��' },

34:{n1:'ת��',on:function(e,a,o){var x = commonui.postBtn.all;commonui.postBtn.all={'����':[24,25,26,27]};commonui.postBtn.allBtn(e,a);commonui.postBtn.all=x} },

35:{n1:'�ղ�',n2:'�ղش���������',on:function(e,a){commonui.favor(e,this,a.tid,a.pid)} },

36:{n1:'����',n2:'�Դ���ʹ�õ���',on:function(e,a){commonui.atItemBuyUse(e,a.tid,a.pid)} ,ck:function(a){if (a.__CURRENT_UID)return 1}},

37:{n1:'����2',n2:'�Դ���ʹ�õ���',on:function(e,a){commonui.recommendPost(e,a.i,this)},
	ck:function(a){if (a.__CURRENT_UID)return 1} },

38:{n1:'�Ƽ�',n2:'�Ƽ�������������Ա',on:function(e,a){commonui.logPostRecommend(e,a.tid,a.pid)},
	ck:function(a){if ( a.__GP.rvrc>=200 || a.__GP.admincheck)return 1} },

39:{n1:'��ע',n2:'Ϊ�û���ӱ�ע',on:function(e,a){adminui.remarkUi(e,a.tid,a.pid)},
	ck:function(a){if ( a.__GP.lesser && a.__GP.admincheck)return 1} },

40:{u:"/thread.php?searchpost=1&authorid={pAid}&fid={fid}",n1:'����\u2074',n2:'�������߰����ڵĻظ�',n3:'�������ڻظ�'},

41: {
	n1: '��¥', n2: '�������ظûظ�', n3: '�����ظ�', on: function (e, a) {
		__NUKE.doRequest({
			u: __API.setPost(a.tid + ',' + (a.pid ? a.pid : 0), 0, 0, 1026, 0, '', '', undefined, window.__CURRENT_FID ? __CURRENT_FID : ''),
			b: this
		})
	},
	ck: function (a) { if ((a.__GP.admincheck & 2) && a.pid && parseInt(a.pid, 10) && a.pid > 0) return 1 }
},

42: {
	n1: '���', n2: '�����������', n3: '�������', on: function (e, a) {
		__NUKE.doRequest({
			u: __API.setPost(a.tid + ',' + (a.pid ? a.pid : 0), 0, 0, 0, 1026, '', '', undefined, window.__CURRENT_FID ? __CURRENT_FID : ''),
			b: this
		})
	},
ck:function(a){if ((a.__GP.admincheck&2) && (a.pid|0))return 1} },
43: {
	n1: '', n2: '��˼�¼', n3: '��˼�¼', on: function (e, a) {
		__NUKE.doRequest({
			u:{u:__API._base,	a:{__lib:"filter",__act:"get_testlog",fid:-7,tid:a.tid,pid:a.pid,raw:3}	},
			f:function(d){
				if(d.data && d.data[0]){
					y=''
					for(var k in d.data[0]){
						var x=''
						eval('x='+d.data[0][k].data)
						y+=commonui._debug._d(x)
						}
					commonui.alert(_$('/pre')._.add(y))
					}
				},
		})
	},
ck:function(a){if (a.__GP.super)return 1} }
},

replaceUrl:function (u){
var e = encodeURIComponent;
return u.replace('_TOPIC',e(document.title)).replace('_URL',e(document.location.href)).replace(/_BBSURL/g,e(window.__BBSURL))
},

def:[28,6,7,8,34],
all:{
'����':[4,5,6,7,8,9,18,33,35,36,37,38],
'�û�':[19,20,21,22,23,40,39],
'����':[10,11,13,14,15,16,41,42,17,29,32,30,43],
'����':[25]
},

btnCache:{},

genU:commonui.buttonBase.genU,

genT:commonui.buttonBase.genT,//fe

genC:commonui.buttonBase.genC,

genA:commonui.buttonBase.genA,

genB:commonui.buttonBase.genB,//fe

load:function(argid){
if(!this.argCache)
	this.argCache = commonui.postArg.data
var arg = this.argCache[argid]

if(arg.pC && arg.pC.getBoundingClientRect && !arg.comment && window.__CURRENT_UID){//�������� ���ҵ�¼״̬
	var s = this
	_$(arg.pC).$0('ontouchstart',function(e){s.eventHandlerOver(e,this,arg)},'onmouseover',function(e){s.eventHandlerOver(e,this,arg)},'onmousewheel',function(e){s.eventHandlerOver(e,this,arg)},'onmouseout',function(e){if(!commonui.ifMouseOut(e,this))return;if(s.currentBtn)s.currentBtn.style.display='none'})
	}
},

pos:__NUKE.position.get,

eventHandlerOver:function(e,o,arg){

var x = o.getBoundingClientRect(),y=this.pos(e)

if(
	(arg.vsmall && y.x>x.left+(x.right-x.left)/5 && y.x<x.right-(x.right-x.left)/5) ||
	(!arg.vsmall && y.x<x.right-(x.right-x.left)/4)
	){
	if(this.currentBtn){
		if(e.type=='touchstart' || o._postBtn!=this.currentBtn){
			this.currentBtn.style.display='none'
			}
		}
	return
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
	
allBtn:commonui.buttonBase.allBtn,

saveHis:commonui.buttonBase.saveHis,//

clearHis:commonui.buttonBase.clearHis,//

clearCache:commonui.buttonBase.clearCache,//
clearArgCache:function(){
this.argCache = null
}//
}//ce




commonui.postBtn.allBtn = function(e,arg,nohis){
if(window.__CURRENT_FID!=-34587507)
	return this.parent.buttonBase.allBtn.call(this,e,arg,nohis)

if(!this._stylelo){
	this._stylelo = 1
	__NUKE.addCss('@font-face {font-family: "SrcSunHeavy";\n\
src: url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.eot?1");\n\
src: url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.eot?#iefix") format("embedded-opentype"),\n\
url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.ttf?1") format("truetype"),\n\
url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.woff?1") format("woff"),\n\
url("'+__IMG_STYLE+'/font/SourceHanSerifCN-Heavy.svg#SrcSunHeavy") format("svg");\n\
font-style: normal;\n\
font-weight: normal;}')
	}


var w=window,$=w._$,c = w.commonui,z=null,
x= $('/div','style','width:20em;color:'+__COLOR.gbg2+';font-family:SrcSunHeavy;font-size:26px;line-height:1.2em;'),y=this.all,self=this,s = ' '+w.location.protocol+'//'+w.location.host

if(typeof(arg)!='object')
	arg = this.argCache[arg]

if(!this.his){
	this.his = this.parent.userCache.get(this.saveKey);
	if(!this.his)this.his=[]
	}

var his = this.his, iin = function(x){
	for(var j=0;j<his.length;j++)
		if(x==his[j])
			return 1
	}

if(!this.adminWindowSp){
	var b = c.createCommmonWindow()
	var a = b.getElementsByTagName('div')
	b._.attr('style','background:none;box-shadow:none;border:none')
	for(var i=0;i<a.length;i++){
		a[i]._.attr('style','background:none;border:none')
		}
	b._.__t._.attr('style','background:rgba(40,40,40,0.5);border:none')
	b._.__t.firstChild._.attr('style','background:rgba(40,40,40,0.5);color:#eee')
	b.firstChild._.attr('style','transform:perspective(30em) rotatey(-10deg) scale(0.9);transform-origin: 100% 50% 0;')
	this.adminWindowSp = b
	}
this.adminWindowSp._.addContent(null)

var pvm = 1,nvm,a=null,b=null,i=null
for (var k in y){
	a=k
	for (var kk=0;kk<y[k].length;kk++){
		if(z=this.genA(arg,y[k][kk],nohis)){
			if(this.d[y[k][kk]].n1 && this.d[y[k][kk]].n1.charAt(0)=='��'){
				z.innerHTML=this.d[y[k][kk]].n3.replace('����','').replace(/\(.+/,'')
				if(b){
					if(b._sub)
						b._sub._.add(' | ',z)
					continue
					}
				else{
					i=z
					z = b = $('/div',$('/div','style','font-size:0.85em;padding:0 0.25em;background:'+__COLOR.gbg1+';color:'+__COLOR.bg0,'innerHTML','����'))
					}
				}
			nvm =  Math.random()
			z._.attr(
				'style','display:block;box-shadow:0px 0px 0.75em -0.3em '+__COLOR.gbg1+';height:2.4em;float:left;padding:0.2em 1em 0.5em 0.2em;margin:0.2em -'+nvm+'em 0.2em '+(pvm+0.4)+'em;color:'+__COLOR.gbg0+';background:'+__COLOR.gbg5
				)._.add(
				$('/div','style','font-size:0.75em;color:'+__COLOR.gbg4,'innerHTML','&nbsp;')._.add(i,i=null)
				)
			z._sub = z.lastChild
			if(iin(y[k][kk])){
				z.insertBefore(z.lastChild,z.firstChild)
				z._.attr('style','background:#00b3fd;color:#fff')
				}
			if(a)
				z.insertBefore( $('/div','style','font-size:0.5em;line-height:1.5em;height:1.5em;background:orangered;margin:-1.2em auto auto -1em;outline:double 3px orangered;float:left;padding:0 0.25em;color:#eee','innerHTML',a,a=null), z.firstChild)

			pvm = nvm
			x._.add(z)
			}	
		}
	}

	
if((arg.tid || arg.pid) && c.QRCode && w.__UA && (w.__UA[2]==1 || w.__UA[2]==3) && !(w.__UA[0]==1 && w.__UA[1]<8)){
	x._.add(
		$('/br'),
		$('/img').$0('src','about:blank', 
			'style','display:block;float:right;width:6.5em;height:6.5em;clear:both', 
			'alt',w.location.protocol+'//'+w.location.hostname+'/?j='+
				(arg.tid ? 't'+arg.tid : '')+(arg.pid!='tpc' && arg.pid>0 ? 'p'+arg.pid : '')/*+(w.__CURRENT_UID ? 'h'+w.__CURRENT_UID : '')*/, 
			'onerror', function(){
				c.QRCode.loadDataUrl(this,this.alt,function(){this.style.display=''})
				}
			)
		)
	}

if(arg.tid){
	nvm =  Math.random()*2
	x._.add(
		$('/div','style','display:block;box-shadow:0px 0px 0.75em -0.3em '+__COLOR.gbg1+';height:2.4em;float:left;padding:0.2em 1em 0.5em 0.2em;margin:0.2em -'+nvm+'em 0.2em '+(pvm+0.4)+'em;width:10em;color:'+__COLOR.gbg0+';background:'+__COLOR.gbg5
				)._.add(
				'�����ַ',
				$('/div','className',"xtxt",'style','font-size:0.5em;line-height:1.5em;color:'+__COLOR.gbg4,'innerHTML',' '+s+'/read.php?tid=<nobr class=red>'+arg.tid+'</nobr> ', 'onclick',function(){commonui.buttonBase.selTxt(this)})
				)
		)
	pvm = nvm
	}

if (arg.pid!='tpc' && arg.pid>0){
	nvm =  Math.random()*2
	x._.add(
		$('/div','style','display:block;box-shadow:0px 0px 0.75em -0.3em '+__COLOR.gbg1+';height:2.4em;float:left;padding:0.2em 1em 0.5em 0.2em;margin:0.2em -'+nvm+'em 0.2em '+(pvm+0.4)+'em;width:10em;color:'+__COLOR.gbg0+';background:'+__COLOR.gbg5
				)._.add(
				'�˻ظ���ַ',
				$('/div','className',"xtxt",'style','font-size:0.5em;line-height:1.5em;color:'+__COLOR.gbg4,'innerHTML',' '+s+'/read.php?pid=<nobr class=blue>'+arg.pid+'</nobr> ', 'onclick',function(){commonui.buttonBase.selTxt(this)})
				)
		)
	pvm = nvm
	
	nvm =  Math.random()*2
	x._.add(
		$('/div','style','display:block;box-shadow:0px 0px 0.75em -0.3em '+__COLOR.gbg1+';height:2.4em;float:left;padding:0.2em 1em 0.5em 0.2em;margin:0.2em -'+nvm+'em 0.2em '+(pvm+0.4)+'em;width:15em;color:'+__COLOR.gbg0+';background:'+__COLOR.gbg5
				)._.add(
				'��λ�õ�ַ',
				$('/div','className',"xtxt",'style','font-size:0.5em;line-height:1.5em;color:'+__COLOR.gbg4,'innerHTML',' '+s+c.genPidLink(arg.pid,arg.i)+' ', 'onclick',function(){commonui.buttonBase.selTxt(this)})
				)
		)
	pvm = nvm
	}

x._.add($('/div','className','clear'))

this.adminWindowSp._.addContent(x)

this.adminWindowSp._.show(e)

}//fe



//============================
//���������ť=================
commonui.topicBtn={
parent:commonui,
saveKey:'topicBtnHis',
d:{
1:{n1:'����',n2:'�༭������ɫ',n3:'������ɫ',
	on:function(e,a){adminui.colortopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

2:{n1:'����',n2:'����/�ر����� �������ⲻ�ܻظ�/�Ķ�',n3:'��������',
	on:function(e,a){commonui.setPost(e,a.tid,null,a.fid)},
	ck:function(a){if(a.admin)return 1} },

3:{n1:'�ƶ�',n2:'�ƶ����⵽��������',n3:'�ƶ�����',
	on:function(e,a){adminui.movetopic(e,a.tid,a.fid,0)},
	ck:function(a){if(a.admin)return 1} },

4:{n1:'����',n2:'���������洴������ľ��� �����ⱻ�ظ�ʱ����Ҳ�����',n3:'��������',
	on:function(e,a){adminui.movetopic(e,a.tid,a.fid,2)},
	ck:function(a){if(a.anyAdmin)return 1} },

5:{n1:'��ǰ',n2:'������Ļظ�ʱ���޸�Ϊ��ǰʱ��',n3:'��ǰ����',
	on:function(e,a){adminui.pushtopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

6:{n1:'����',n2:'�ֶ��޸��ڻظ���ɾ���������ҳ������',n3:'����ͳ�ƻظ�',
	u:'nuke.php?func=recountreply&tid={tid}',
	target:'_blank',
	ck:function(a){if(a.admin)return 1} },

7:{n1:'�ö�',n2:'������(������)��ʾ�ڰ������Ϸ� ��Ϊ���湫��',n3:'�ö�����',
	on:function(e,a){adminui.toptopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

8:{n1:'����',n2:'����������Ϊ����',n3:'��������',
	on:function(e,a){adminui.digesttopic(e,a.tid)},
	ck:function(a){if(a.admin&2)return 1} },

9:{n1:'ɾ��',n2:'�������������վ',n3:'ɾ������',
	on:function(e,a){adminui.movetopic(e,a.tid,a.fid,1)},
	ck:function(a){if((a.admin&2) || __CURRENT_UID == 17387322)return 1} },

10:{n1:'�ղ�',n2:'�ղ�����',
	on:function(e,a){commonui.favor(e,this,a.tid)},
	ck:function(a){if(__CURRENT_UID)return 1} },

11:{n1:'<span style="font-size:1.23em">����ظ�</span>',
	n2:'����ظ�',
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

12:{n1:'����',n2:'���������������',
	on:function(e,a){commonui.topicBtn.allBtn(e,a)},
	ck:function(a){if(a.anyAdmin || a.admin || __CURRENT_UID == 17387322)return 1} },

13:{/*n1:'����&sup1;',*/n2:'���ü����������Ա',n3:'���Ϲ���Ա',
	on:function(e,a){commonui.setTopicAdmin(this,a.tid)},
	ck:function(a){return 1} },

14:{/*n1:'����&sup2;',*/n2:'���ü������������',n3:'���Ϻ�����',
	on:function(e,a){commonui.setTopicBlock(this,a.tid)},
	ck:function(a){return 1} },
15:{n1:'APP�Ķ�',n2:'ʹ����̳APP�Ķ�������',n3:'APP�Ķ�����',
	u:'nga://?tid={tid}'.replace(/.*/,function($1){
		var p = location.search.match(/(?:uid|stid|fid|tid|page|pid)=(?:-?\d+)/g)
		if(p)
			return 'nga://?'+p.join('&')
		return $1
		}),
	c:'disable_tap_menu teal',
	on:function(e,a,o){
		if(__SETTING.uA[0]==7){
			alert('�������ϲ˵���ѡ�� "���������"')
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
16:{n1:'����',n2:'��ǰ��������ز�����¼',n3:'�������',
	on:function(e,a){adminui.viewLog(0, 0, 0, a.tid)},
	ck:function(a){if(a.admin&2)return 1} },
17:{n1:'ͳ��',n2:'�������ͳ��',n3:'ͳ������',
	on:function(e,a){adminui.forumStat(null,null,a.tid,commonui.time2date(__NOW,'Y-m-d'),10)},
	ck:function(a){if(a.admin&2)return 1} },
18:{n1:'PID',n2:'��¼PID',n3:'��¼PID',
	on:function(e,a){adminui.selectPid(0,0,2)},
	ck:function(a){if(a.admin)return 1}}
},

replaceUrl:commonui.buttonBase.replaceUrl,

def:[11,12,10,15],
all:{'�������':[1,2,3,4,5,6,7,8,9,13,14,16,17,18]},

genU:commonui.buttonBase.genU,

genT:commonui.buttonBase.genT,

genC:commonui.buttonBase.genC,

genA:commonui.buttonBase.genA,

load:function(o,fid,tid,admin){
	
if((admin || window.__GP.userBit & 4 ||__CURRENT_UID != 17387322 ) && !window.adminui)loader.script(__COMMONRES_PATH+'/js_admin.js')
var arg={fid:fid,
	tid:tid,
	admin:admin ? admin : window.__GP.admincheck,
	anyAdmin:window.__GP.userBit & 4,
	pid:0,
	greater:window.__GP.greater}, i=0,l=this.def,xx=null, max= __SETTING.bit & 8 ? 5 : 8,oo = commonui.stdBtns()

if(!this.his){
	this.his = commonui.userCache.get(this.saveKey);
	if(!this.his)this.his=[]
	}
while(1){
	for (var k=0;k<l.length;k++){
		if(i++>=max)break
		if(xx=this.genA(arg,l[k],1))
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
clearCache:commonui.buttonBase.clearCache//fe
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


