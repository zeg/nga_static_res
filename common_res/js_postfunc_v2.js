if(!window.postfunc)
	var postfunc = {}
if(!window.commonui)
	var commonui = {}
/**
 *����bit
 */
postfunc._bit = {
'allow_lesser_nuke_and_no_adj':2, //����lesser nuke��ʹ��Ĭ�ϵ������������ı�ֵ�۳�����
'high_allowvisit':4, //δ��֤���û����û��ڽ����ڼ䲻�ܲ鿴
'if_auto_translate':8, //����������ͬ��ʷ����
'free_edit':16, //�༭���ⲻ��ʱ������
'if_filter_key':32, //�Ƿ������ü���
'if_topic_key_color':64, //�Ƿ������÷�����ɫ
'if_custom_level':128, //�Ƿ���������������
'if_force_topickey':256, //�Ƿ�������ǿ�Ʒ���
'if_hint':65536 //�Ƿ�������ǿ�Ʒ���
}

/**
*���������������
 */
postfunc.hintTable = []

/**
 *����bit
 */
postfunc.postBit = {
_POST_IF_COMMENT:1,//�Ƿ�������
_POST_IF_HIDDEN:2,//�Ƿ�����
_POST_IF_HAVE_COMMENT:4,//�Ƿ�������
_POST_IF_HAVE_DELAY_ACTION:8,//�Ƿ�����ʱ����

_POST_IF_LOG:32,//�Ƿ񱻱����
_POST_IF_NO_HINT:64,//�Ƿ���ֹ�ظ���ʾ
_POST_IF_FREE_EDIT:128,//�Ƿ��ڿɱ༭
_POST_IF_SELF_REPLY:256,//�Ƿ�ֻ���Լ��ظ�

_POST_IF_LOCK:1024,//�Ƿ�����
_POST_IF_HIDE_TITLE:2048,//�Ƿ���ʾ�������ı��
_POST_IF_HAS_AUTO_TRANSLATE:4096,//�Ƿ��п����Զ����������
_POST_IF_HAS_UPLOAD:8192,//�Ƿ����ϴ��ļ�

_POST_IF_SET:32768,
_POST_IF_SET_ELM:65536,
_POST_IF_UNION_HIDDEN:131072//�Ƿ��ںϲ���������ʾ
}

postfunc.tmBit1 = {
_TM_BIT1_REPLY_ONCE:1073741824,//
}

postfunc.postOptBit = {
_OPT_VOTE_REPLY_VIEW:2048,//
_OPT_VOTE_END_VIEW:4096,//
}

/**
 *����������action
 */
postfunc.__NEW = 'new'
postfunc.__REPLY = 'reply'
postfunc.__REPLY_BLANK = 'replyblank'
postfunc.__QUOTE = 'quote'
postfunc.__MODIFY = 'modify'

postfunc._ATTACH_UPLOAD = window.__ATTACH_BASE+'/attach.php';

/**
 *�ļ��ϴ�ʹ�õ��ı���
postfunc.fileSelector=null //�ļ�ѡ��input
postfunc.waitAttachList =null //�ȴ��ϴ����ļ���Ϣ����
postfunc.attachList=null //�Ѿ��ϴ����ļ���Ϣ����
postfunc.album=null //�����Ϣ����
postfunc.attachBtn
postfunc.albumImgCount=null//������
postfunc.uploadedAttach=[]//�Ѿ��ϴ����ļ���Ϣ����

this.o_attachBtn
this.o_attachList
this.o_waitAttachList
this.o_attachForm
this.o_fileSelector
*/


/**
postfunc.currentFid		//��ǰ������fid
postfunc.contentBak //�༭ʱ���ݵ�����
postfunc.titleBak //�༭ʱ���ݵ����� (����ȷ���Ƿ��޸�

//this.form

this.o_subject	//input����
this.o_content	//input����
this.o_selfReply	//checkboxֻ�����ߺͰ����ɻظ�
this.o_hidden	//checkbox��������
this.o_vote		//textareaͶƱ����
this.o_voteType	//select 0ͶƱ 1Ͷעͭ��
this.o_voteMax	//inputÿ������Ͷ 0����
this.o_voteEnd	//inputСʱ�����
this.o_attach	//input��������
this.o_attachChk	//input����У��
this.o_voteBetMin	//inputͶע���ֵ
this.o_voteBetMax	//inputͶע��Сֵ
this.o_voteLimit	//inputͶƱ����������
this.o_modifyAppend
this.o_comment
this.o_anony

this.o_pvwindow	//Ԥ������

this.o_f_content	//���ٷ���input����
*/



/*����������ť*/
//commonui.topicBtn.d[11]
//commonui.postBtn.d[6]
//commonui.postBtn.d[7]
//commonui.postBtn.d[8]
//commonui.forumBtns[6]

/**
 *�Ƿ�֧�ֶ��ļ��ϴ�
 */
postfunc.ifMultiple= (window.XMLHttpRequest!==undefined && ('withCredentials' in new XMLHttpRequest()) && window.FormData !== undefined) ? true : false

//��ǰ������Ϣ
postfunc.currentPostStat =null

/**
 *�ڹ��λ�ò�������
 */
postfunc.addText = function (txt,opt){
var o = this.o_content
if (o.setSelectionRange){
	var s = o.selectionStart;
	o.value = o.value.substring(0,s) + txt + o.value.substring(o.selectionEnd,o.value.length)
	s += txt.length;
	o.setSelectionRange(s,s)
	}
else{
	if (!this._selection){
		o.value+=txt
		}
	else{
		this._selection.text=txt
		this._selection.collapse(true);
		this._selection.select();
		}
	}
if((opt&1)==0)
	o.focus()
}//fe

/**
 *��ȡѡ�е�����
 */
postfunc.getSelectText = function(){
if(document.selection && document.selection.createRange)
	return document.selection.createRange().text;
else
	return this.o_content.value.substring(this.o_content.selectionStart,this.o_content.selectionEnd)
return '';
}
//fe

/***
*����focus
*/
postfunc.setFocus = function(){
this.o_content.focus();
}

/**
*���λ�ò���tag
*/
postfunc.addTag = function(tag,value){
if(value) this.addText("["+tag+"="+value+"]"+this.getSelectText()+"[/"+tag+"]");
else this.addText("["+tag+"]"+this.getSelectText()+"[/"+tag+"]");
}
/*
postfunc.stripsomebbscode = function(v){
v = v.replace(/\[\/?lessernuke\]/gim,'');
return v;
}
//fe

postfunc.getCursorPos = function (o){
var s,e
if(document.selection){
	this._selection = document.selection.createRange.duplicate();
	}
else{
	s = o.selectionStart
	e = o.selectionEnd
	}
this._selectionStart = s
this._selectionEnd = e
}//fe
*/
postfunc.inputchar = function(e,o)
{
//if (e.keyCode == 9)
//	return this.addText('	');

if(document.selection)
	{
	var rng = document.selection.createRange();
	rng.moveStart("character",-1)
	var c= rng.text.charCodeAt(0)
	}
else
	{
	var c = o.value.charCodeAt(o.selectionStart-1)
	var rng = false;
	}
if (c==12304)
	{
	if (rng)
		{
		rng.text='['
		}
	else
		{
		rng = o.selectionStart
		o.value=o.value.substring(0,rng-1)+'['+o.value.substr(rng)
		o.selectionStart= o.selectionEnd = rng
		}
	}
else if (c==12305)
	{
	if (rng)
		{
		rng.text=']'
		}
	else
		{
		rng = o.selectionStart
		o.value=o.value.substring(0,rng-1)+']'+o.value.substr(rng)
		o.selectionStart= o.selectionEnd = rng
		}
	}
else if (c==65309)
	{
	if (rng)
		{
		rng.text='='
		}
	else
		{
		rng = o.selectionStart
		o.value=o.value.substring(0,rng-1)+'='+o.value.substr(rng)
		o.selectionStart= o.selectionEnd = rng
		}
	}
else if (c==12289)
	{
	if (rng)
		{
		rng.moveStart("character",-1)
		if (rng.text.charAt(0)=='[')
			{
			rng.text='[/'
			}
		}
	else
		{
		if (o.value.charAt(o.selectionStart-2)=='[')
			{
			rng = o.selectionStart
			o.value=o.value.substring(0,rng-1)+'/'+o.value.substr(rng)
			o.selectionStart= o.selectionEnd = rng
			}
		}
	}
}
//fe


/**
 *����һ����������
 */
postfunc.addHiddenInfo=function(txt){
if (!this.hiddenInfo)this.hiddenInfo=[]
this.hiddenInfo.push(txt)
}//fe


/**
 *ϵͳ���
 * @return [�豸��+ϵͳ, �����] 100:δ֪android����� 101:iosδ֪ios����� 102:BlackBerryδ֪bb����� 103:δ֪WP�����
 */
postfunc.deviceDetect = function(){
var z = window.navigator.userAgent.match(/(.+?)\((.+?)\)/) , u = function(z){return z.replace(/(?:\s+Build)?\/.+?$/i,'')}

if(!z || z[1].match(/Android/i)){
	if(z)
		z=z[1]
	else
		z = window.navigator.userAgent
	var x = z.match(/^(.+?) (?:Linux\/[^ ]+ )?Android\/[^ ]+/)
	if(x)
		return [u(x[1]),100]
	return
	}

z=z[2].replace(/ (?:U|I|N)(?:;|$)/,'').replace(/ [a-z]{2}-[a-z]{2}(?:;|$)/i,'')//ȥ�����ܺ����� (Linux; U; Android 4.1.2; zh-CN; GT-I9300)

var y = z.match(/Android|iPhone|iPod|iPad|BlackBerry|Windows Phone|IEMobile/i)
if(!y)return

z = z.split(/\s*;\s*/)
y = y[0].toLowerCase()

if(y=='android'){
	if(z[1].match(/Android/i)){
		if(z[0]=='Linux')
			z = z[2]
		else
			z = z[0]
		}

	if(typeof(z)=='string')
		return [u(z),100]

	return ['[AD]',100]
	}
else if(y=='iphone' || y=='ipad' || y=='ipod'){
	if(z[1].match(/OS [\d\w]+ like Mac OS/))
		z = z[2]?z[2]:z[0]
	
	if(typeof(z)=='string')
		return [u(z),101]
	
	return ['[iOS]',101]
	}
else if(y=='windows phone' || y=='iemobile'){
	if(z[z.length-2]=='NOKIA')
		z = z[z.length-1]
	
	if(typeof z =='string')
		return [u(z),103]

	return ['[WP]',103]
	}
else if(y=='blackberry'){
	if(z[0]=='BlackBerry')
		z = z[1]
	
	if(typeof(z)=='string')
		return [u(z),102]

	return ['[BB]',102]
	}
}//fe

/**
*178 ���
*/
postfunc.listAlbum = function(o){
o.innerHTML = ''
window.tmp=undefined
httpDataGetter.script_muti_get("http://i.178.com/?&_app=album&_controller=category&_action=getAlbumInfo&random="+Math.random(),
	function(r){
		if(window.tmp)r=window.tmp
		else return false;
		if (r.error)
			{
			if(r.error=='not login')r.error = 'δ��¼'
			o.innerHTML = r.error;
			return true
			}
		var list=''
		for (var i=0;i<r.length;i++)
			{
			if(r[i].preview)r[i].preview='<img src="'+r[i].preview+'"/>'
			list+='<a href="javascript:void(0)" onclick="postfunc.openAlbum(this.parentNode,'+r[i].id+')" style="display:block;width:136px;height:130px;overflow:hidden;text-align:center;float:left;border:1px solid #aaa;margin:3px"><div style="width:130px;height:98px;border:1px solid #000;background:#444;margin:2px auto">'+r[i].preview+'</div>'+r[i].title+' ('+r[i].count+')</a>'
			}
		if (list)
			o.innerHTML = list
		else
			o.innerHTML = 'û�����'
		return true

	},
	function(){
		o.innerHTML = '��ȡ����'
	},
	'gbk'
	);
}//fe

/**
*178 ���
*/
postfunc.openAlbum = function (o,id,page){
o.innerHTML = ''
if(!page)page=''
window.tmp=undefined
httpDataGetter.script_muti_get("http://i.178.com/?id="+id+"&pagesize=20&page="+page+"&_app=album&_controller=category&_action=getPicByCategory",
	function(r){
		if(window.tmp)r=window.tmp
		else return false;
		if (r.error)
			{
			if(r.error=='not login')r.error = 'δ��¼'
			o.innerHTML = r.error;
			return true
			}
		var info = '';
		if (r.info)
			{
			if (r.info.PAGECOUNT>1)
				{
				for (var i=1;i<r.info.PAGECOUNT;i++)
					info+'<a href="javascript:void(0)" onclick="postfunc.openAlbum(this.parentNode,'+id+','+i+')">['+i+']</a>';
				}
			}
		if(info)info='<div style="clear:both">'+info+'</div>'
		var list=''
		for (var i=0;i<r.ROWS.length;i++)
			{
			if(r.ROWS[i].url)r.ROWS[i].urls='<img src="'+r.ROWS[i].thumb+'"/>'
			list+='<a title="�������ͼƬ����" href="javascript:void(0)" onclick="postfunc.addText(\'[img]'+r.ROWS[i].url+'[/img]\');" style="display:block;width:136px;height:130px;overflow:hidden;text-align:center;float:left;border:1px solid #aaa;margin:3px"><div style="width:130px;height:98px;border:1px solid #000;background:#444;margin:2px auto">'+r.ROWS[i].urls+'</div>'+r.ROWS[i].title+'</a>'
			}
		if (list)
			o.innerHTML = info+list+info
		else
			o.innerHTML = 'û��ͼƬ'
		return true

	},
	function(){
		o.innerHTML = '��ȡ����'
	},
	'gbk'
	);
}//fe


/**
 *�������ר�öԻ��� 
 */
postfunc.dialog = {
createWindow : function (id){
if (this.w)return
this.w = commonui.createCommmonWindow()
document.body.appendChild(this.w);
this.w.id = id;
this.w.style.width = 'auto';
},

returnVal:function(o)
{
var rr = []
var r = o.getElementsByTagName('input')
for (var i=0;i<r.length;i++)
	rr[r[i].name] = r[i].value

r = o.getElementsByTagName('select')
for (var i=0;i<r.length;i++)
	rr[r[i].name] = r[i].options[r[i].selectedIndex].value

r = o.getElementsByTagName('textarea')
for (var i=0;i<r.length;i++)
	rr[r[i].name] = r[i].value

if (this.func){
	rr = this.func(rr)
	if (rr===false)
		return;
	}
return rr
},

genDialog:function(a){
//var a = window.dialogArguments
if (typeof(a) == 'string'){
	a = {0:a}
	this.func = function (v){
		return v[0]
		}//fe
	}

var c = _$('<div/>')
for (var k in a)
	{
	if(isNaN(parseInt(k)))continue;
	if (typeof(a[k]) == 'string'){
		c._.aC( _$('<span/>')._.attr('innerHTML',a[k].replace(/(<select|<input|<textarea)/i,function($0,$1){return $1+' name="'+k+'"'}) ,1) )._.aC(_$('<br/>'))._.aC(_$('<br/>'))
		}
	else if (typeof(a[k]) == 'object')
		{
		c._.aC( _$('<b>'+a[k].hint+'</b>') )._.aC( _$('<br/>') )
		if(a[k].opts){
			var y = _$('<select/>')._.attr('name',k)
			for (var kk in a[k].opts){
				if(typeof(a[k].opts[kk])!='object')continue
				y._.aC( _$('<option/>')._.attr('innerHTML',a[k].opts[kk][0],1)._.attr('value',a[k].opts[kk][1]) )
				}
			}
		else if(a[k].cols)
			var y = _$('<textarea/>')._.attr('name',k)._.attr('cols',a[k].cols)._.attr('rows',a[k].rows)
		else
			var y = _$('<input/>')._.attr('name',k)._.attr('type','text')
		c._.aC( y )._.aC( _$('<br/>') )._.aC( _$('<br/>') )
		}
	else if (typeof(a[k]) == 'function')
		this.func = a[k]
	}
this.arg = a
return c
}//fe
}//ce




/**
 *�ļ��ϴ�ʹ�õ��ı���
postfunc.fileSelector=null //�ļ�ѡ��input
postfunc.waitAttachList =null //�ȴ��ϴ����ļ���Ϣ����
postfunc.attachList=null //�Ѿ��ϴ����ļ���Ϣ����
postfunc.album=null //�����Ϣ����
postfunc.attachBtn
postfunc.albumImgCount=null//������
 */


/**
 *�����ϴ��ļ���

postfunc.fileUpload=function(p,url){
var $ = _$, f = this.attachForm
p.innerHTML=''
this.ifMultiple= (window.XMLHttpRequest!==undefined && ('withCredentials' in new XMLHttpRequest()) && window.FormData !== undefined) ? true : false
this.o_attachList = $('/span').$0('id','uploadedattach')
this.o_waitAttachList = $('/span').$0('id','waituploadattach')
this.fileSelector = this.attachNewFileSelect()
this.o_attachForm = $('/form').$0('method','post','id','attachform','target','upload_iframe','name','attachform','action',url,'encoding','multipart/form-data','enctype','multipart/form-data','style',{clear:'both'})
this.attachBtn = $('/button').$0('type','button','innerHTML','�ϴ�','onclick',function(){this.disabled=true;postfunc.attachUpload()} )
this.uploadedAttach=[]

$(p)._.add(
	this.o_attachList,
	this.o_attachForm,
	this.o_waitAttachList,
	$('/div').$0('style',{clear:'both'}),
	this.fileSelector,
	this.o_attachBtn,
	this.ifMultiple ? ' (����һ��ѡ��������)' : null
	)
}//fe
*/

/**
 *ѡ���ϴ��ļ�callback
 */
postfunc.attachNewFileSelect=function(){
var x =	_$('/input').$0('type','file', 'name','attachment_file1', 'onchange',function(){
	var $=_$,p = postfunc.o_waitAttachList
	if(!p.__xooxoxx){
		p.parentNode.insertBefore($('/div').$0('innerHTML','���ϴ��ĸ���','style',{clear:'both'}) ,p)
		p.__xooxoxx = true
		}
	p.innerHTML=''

	if(this.files){//��ѡ�ļ�ʱ
		var fs = this.files
		if(!fs.length)return
		for(var i =0; i<fs.length; i++)
			p.insertBefore(postfunc.attachNewFile(fs[i]),p.firstChild)
		}
	else{//��ѡ�ļ�ʱ
		if(!this.value)return
		var f = this.value.match(/[^\/\\]+$/)
		var fo = {name:f[0],__noimg:true}
		f=f[0].split('.')[1]
		if(f=='jpg' || f=='jpeg' || f=='gif' || f=='png')
			fo.type='image/'+f
		p.insertBefore(postfunc.attachNewFile(fo),p.firstChild)
		}


	} )//fe
if(this.ifMultiple)
	x.multiple=1
return x
}//fe

postfunc.rawUrlEncode = function(x){
var j,y=''
for(var i=0;i<x.length;i++)
	if((j=x.charCodeAt(i)) >255)
		y+=encodeURIComponent(x.charAt(i))
	else if((j>=48 && j<=57) || (j>=65 && j<=90) || (j>=97 && j<=122))
		y+=String.fromCharCode(j)
	else
		y+='%'+j.toString(16)
return y
}//fe

/**
 *�ϴ�һ�����ϴ��ĸ���
 * ��ʽ���� ��<input type=file>�ƽ��� ֻ�ڵ�ѡ�ļ�ʱ��
 */
postfunc.attachUploadSingle=function(){
var $=_$, f = $(this.o_attachForm), z = this.o_waitAttachList.firstChild, x = this.attachNewFileSelect()
this.o_fileSelector.parentNode.replaceChild(x,this.o_fileSelector)
this.o_fileSelector.style.display='none'
f._.add(
	z,
	$('/input').$0('name','attachment_file1_url_utf8_name','type','hidden','value',this.rawUrlEncode(z.__file.name.replace(/([^\/\\]+)$/,'$1'))),
	$('/input').$0('name','func','type','hidden','value','upload'),
	$('/input').$0('name','v2','type','hidden','value','1'),
	$('/input').$0('name','auth','type','hidden','value',this.currentAuth),
	$('/input').$0('name','fid','type','hidden','value',this.currentFid),
	this.o_fileSelector
	)
this.o_fileSelector = x
f.submit()
this.o_attachBtn.disabled=null
}

/**
 *�ϴ�һ�����ϴ��ĸ���
 * ��ʽ���� �ڶ�ѡ�ļ�ʱ�� ��<input type=file>�ж���ļ��е�һ��ͨ��XHR�ϴ�
 */
postfunc.attachUpload=function(){
var f = this.o_attachForm
f.innerHTML=''
var z = this.o_waitAttachList.firstChild
if(!z){
	this.o_attachBtn.disabled=null
	return
	}
if(!this.ifMultiple)//��ѡ�ļ����Ϸ���
	return postfunc.attachUploadSingle();


//��ȡ��ǰҳ�����
if(typeof this.attachUpload.mt!='string' && this.attachUpload.mt!==false){
	var mt = document.getElementsByTagName('head')[0].getElementsByTagName('meta')
	for(var i=0;i<mt.length;i++){
		if(mt[i].httpEquiv=="Content-Type"){
			mt = mt[i].content.match(/charset\s*=\s*(.+?)\s*(?:;|$)/)
			this.attachUpload.mt = mt ? mt[1].toLowerCase() : false
			break
			}
		}
	}
if(this.attachUpload.mt && this.attachUpload.mt!='utf-8'){//���ҳ����벻��utf8
	var dd = z.getElementsByTagName('input')
	for(var i = 0;i<dd.length;i++){
		if(dd[i].name=='attachment_file1_dscp' && dd[i].value){//�����д�ļ�˵�����÷���������˵�����ֵ�rawurlencode�Ա��ֱ��벻תΪutf8
			var dd = dd[i]
			break;
			}
		}
	if(dd.value){
		__NUKE.doRequest({u:__API.phpRawurlencode(dd.value),
			f:function(d){
				d = d.data[0]
				dd.value = d? d:'';
				dd.name='attachment_file1_dscp_phprawurlencode'
				postfunc.attachUpload()//��ֵ�����������ύ
				}
			})
		return;//��������
		}
	}

f.appendChild(z)
var x = new FormData(f), self=this, onam = z.__file.name.replace(/([^\/\\]+)$/,'$1')
x.append('func','upload')
x.append('v2','1')
x.append('origin_domain',window.location.hostname )
x.append('lite','js')
x.append('auth',this.currentAuth)
x.append('fid',this.currentFid)
if(z.__file64){
	x.append('attachment_base64_file1',z.__file64)
	var typ = z.__file64.match(/^data:image\/(png|jpeg);base64,/)
	if(!typ)
		return alert('data url error')
	x.append('attachment_file1_url_utf8_name',this.rawUrlEncode(onam+'.'+typ[1]))
	}
else{
	x.append('attachment_file1_url_utf8_name',this.rawUrlEncode(onam))
	x.append('attachment_file1',z.__file)
	}
var xhr =  new XMLHttpRequest()//new XDomainRequest()
xhr.onload = function(e) {
	var xhr = e.target
	self.o_attachBtn.innerHTML = self.o_attachBtn.innerHTML.substr(0,2)
	if (xhr.readyState !== 4 && xhr.status !== 200){
		self.o_attachBtn.disabled=null
		return alert('request error')
		}
	eval( xhr.responseText)
	var y = window.script_muti_get_var_store
	if(y.error_code){
		var errs = {1:'�����ϴ��ر�',
			2:'�����ϴ��������',
			3:'�˺���֤��ʱ����ˢ��ҳ��֮������',
			4:'�ļ��ϴ����������Ի�ر�����Ա',
			5:'���ϴ��ļ�',
			6:'�ļ����ʹ���',
			7:'����������',
			8:'����˵������',
			9:'��������',
			10:'�޷�������ʱ�ļ��������Ի�ر�����Ա',
			13:'����������5�����ϴ�����',
			100:'δ֪������ر�����Ա'}
		self.o_attachBtn.disabled=null
		return alert(errs[y.error_code])
		}
	else if(y.error){
		self.o_attachBtn.disabled=null
		return alert(y.error)
		}
	postfunc.add1Attach(y.data.attachments, y.data.attachments_check, y.data.url,  y.data.isImg,  y.data.thumb)
	}
if(xhr.upload)
	xhr.upload.onprogress = function(e){
		if (e.lengthComputable)
			self.o_attachBtn.innerHTML = self.o_attachBtn.innerHTML.substr(0,2) + ' ' + Math.round(e.loaded * 100 / e.total).toString() + '% ('+(self.o_waitAttachList.childNodes.length+1)+')';
		}
xhr.open("POST", f.action); // Boooom!	
xhr.withCredentials=true //must after open
xhr.send(x);
 
}//fe


/**
 *����һ���ո���dom obj
 *isimg �Ƿ���ͼƬ
 *return {__imgC:����ͼdom����, __infoC:��Ϣdom����}
 */
postfunc.attachFileC = function(isimg){
var $=_$,z = $('/table')._.cls('c1')._.css({'float':'left',margin:'0 0.416em 0.416em 0'})._.add(
	$('/tbody')._.add(
		$('/tr')._.add(
			isimg ? $('/td') :null,
			$('/td','style','verticalAlign:top')				
			)
		)
	)
if(isimg)
	z.__imgC = z.firstChild.firstChild.firstChild
z.__infoC = z.firstChild.firstChild.lastChild
return z
}

postfunc.wmsel=postfunc.wmdefsel=false
/**
 *����һ�����ϴ�����dom obj
 *fileO <input type=file>��files�е�һ���ļ�object �� һ����ٵ��ļ�object(����name type __fake ��������)
 */
postfunc.attachNewFile = function(fileO){
var $=_$,si1,si2,si3
if(fileO.type.indexOf('image/')===0){
	var wm = fileO.type.match(/\/jpe?g|png/) ? true : false, wmo, z = this.attachFileC(true)
	
	if(!fileO.__fake &&  window.FileReader){
		var tmpImg = $("/img")._.css({'float':'left',border:'0.25em solid #551200',visibility:'hidden'})
		tmpImg.__r = new FileReader()
		tmpImg.__r.__p = tmpImg
		tmpImg.__r.onload = function(e) {this.__p.src = e.target.result}
		tmpImg.onload = function(){this.onload=null;commonui.resizeImg(this,160,90),this.style.visibility=''}
		tmpImg.__r.readAsDataURL(fileO);
		z.__imgC._.add(tmpImg)
		}
	
	z.__infoC._.add(
		fileO.name+' '+'('+fileO.type+')',
		$('/br'),
		wm ? wmo = $('/select').$0('name','attachment_file1_watermark',
			$('/option').$0('value','br','innerHTML','����ˮӡ'),
			$('/option').$0('value','bl','innerHTML','����ˮӡ'),
			$('/option').$0('value','tl','innerHTML','����ˮӡ'),
			$('/option').$0('value','tr','innerHTML','����ˮӡ'),
			$('/option').$0('value','cn','innerHTML','����ˮӡ'),
			$('/option').$0('value','','innerHTML','��ˮӡ'),
			'onchange',function(){postfunc.wmsel = this.selectedIndex}
			) : null,
		wm ? $('/br') : null,
		$('/input').$0('name','attachment_file1_dscp', 'type','text', 'onfocus',function(){this.nextSibling.style.display='none'}),
		$('/span').$0('innerHTML','����˵��','className','silver', 'style',{marginLeft:'-5em',marginRight:'1em'}),
		$('/input').$0('name','attachment_file1_img','type','hidden','value',1),
		$('/br'),
		si1=$('/input','type','hidden','name','attachment_file1_auto_size','value',__SETTING.uA[6]&3 ? 1:''),
		si2=$('/input','type','radio','onclick',function(){si3.checked='';si1.value=this.value},'value','1','checked',si1.value ? 'checked' : ''),'�Զ���ͼ ',
		si3=$('/input','type','radio','onclick',function(){si2.checked='';si1.value=this.value},'value','0','checked',si1.value ? '' : 'checked'),'����ԭͼ',
		(window.FileReader && (fileO.type=='image/jpeg' || fileO.type=='image/png')) ? [$('/br'),$('/button','type','button','innerHTML','�༭ͼƬ','onclick',function(e){
			var r = new FileReader()
			r.onload = function(e) {commonui.imageEditor(e, e.target.result, function(img64,thumb64){z.__file64=img64;z.__imgC.firstChild.src=thumb64})}
			r.readAsDataURL(fileO)
			})]:null
		)
	if(wmo){
		if(this.wmdefsel!==false)
			wmo.selectedIndex = this.wmdefsel
		else if(this.wmsel!==false)
			wmo.selectedIndex = this.wmsel
		else
			this.wmsel = wmo.selectedIndex
		}
	}
else{
	var z = this.attachFileC()
	z.__infoC._.add(
		fileO.name+' '+'('+fileO.type+')',
		$('/br'),
		$('/input').$0('name','attachment_file1_dscp','type','text', 'onfocus',function(){this.nextSibling.style.display='none'}),
		$('/span').$0('innerHTML','����˵��','className','silver', 'style',{marginLeft:'-5em',marginRight:'1em'})
		)

	}
z.__fileName = fileO.name
z.__file = fileO
return z
}//fe

commonui.imageEditor= function(e,img,callback){if(this.imageEditor.load)return;this.imageEditor.load=1;loader.script(__SCRIPTS.imgEdit,function(){commonui.imageEditor(e,img,callback)})}
/**
 * ����һ�����ϴ��ĸ��� �� �����ϴ��ɹ�callback
 * attach ������Ϣ
 * checkSum ������ϢУ��
 * ��������������ʱΪ �����ϴ��ɹ�callback
 * 
 * url �����ĵ�ַ
 * isimg �����Ƿ���ͼƬ
 * thumb �����Ƿ�������ͼ 3С 2��С 1����С 0��
 */
postfunc.add1Attach=function (attach,checkSum,url,isimg,thumb,utf8oname,tid,pid,aid){

if(!this.o_attachList.firstChild)
	this.o_attachList.parentNode.insertBefore( _$('/div').$0('innerHTML','���и���','style',{clear:'both'}), this.o_attachList)


var z= this.o_attachForm.firstChild

if(isimg)
	thumb = this.add1Attach.getDispThumb(thumb)

if(!z){
	z = this.attachFileC(isimg ? true :false)
	if(isimg){
		z.__imgC._.add(
			_$('/img').$0('src',commonui.getAttachBase(url)+'/'+url+thumb.def,'style',{'float':'left',border:'0.25em solid #551200'})
			)
		}
	}

z.__infoC.innerHTML=''
if(isimg){
	if(z.__fileName)
		z.__infoC.innerHTML += z.__fileName+'<br/>'
	z.__infoC.innerHTML += '<span class="silver xtxt"> ����·����븽��</span><br/>'
	for(var i = 0;i<thumb.length;i++)
		z.__infoC.innerHTML+=this.add1Attach.sub(thumb[i][1],url+thumb[i][0])
	z.__infoC.innerHTML+=this.add1Attach.sub('������С',url)

	//ͼƬ����5����ʾʹ��������ʾ
	if(!this.album)this.album=_$('<div>���д���ͼƬ��ʱ����ʹ�����<span class="silver">([album])</span><br/><span class="orange">[album=�鿴ȫ������][/album]</span><br/><br/></div>')
	this.album.innerHTML=this.album.innerHTML.replace('[/album]','<br/>./'+url+'[/album]')
	this.albumImgCount++
	if(this.albumImgCount==5)
		this.o_attachList.parentNode.insertBefore(this.album,this.o_attachList)
	if(tid && aid)
		z.__infoC.appendChild(_$('/div','innerHTML','<button class="deleteAttach xtxt" style="width:5.5em" type=button title="���ɾ���ø���" onclick="if(confirm(\'�Ƿ�Ҫɾ��\')){__NUKE.doPost(__API.delAttach('+(pid?pid:0)+', '+tid+', \''+aid+'\'));var x = this.parentNode.parentNode.parentNode.parentNode.parentNode; x.parentNode.removeChild(x)}">ɾ������</button>'));
	}
else{
	if(z.__fileName)
		z.__infoC.innerHTML += z.__fileName+'<br/>'
	if(!utf8oname && typeof(attach)=='string')
		var utf8oname = __NUKE.scDe(attach).url_utf8_org_name
		
	z.__infoC.innerHTML='<span class=gray>�ļ�</span> <span class=orange>[attach]./'+url+(utf8oname?'?filename='+utf8oname:'')+'[/attach]</span>'
	if(__GP.ubMod && url.match(/\.(mp4|webm|ogg|mp3|aac)$/))
		z.__infoC.innerHTML+='<br/><span class=gray>����</span> <span class=orange>[flash]./'+url+(utf8oname?'?filename='+utf8oname:'')+'[/flash]</span><br/><span class=gray>�ڼӷ�/����������Ч</span><br/><span class=gray>ʹ��h264����mp4/mp3/aac�Ի����������</span>'

	}

this.o_attachList.appendChild(z)

this.uploadedAttach.push({0:url,1:isimg})

if (!attach || !checkSum)return

this.o_attach.value+=attach+'\t';//tab �ָ����������Ϣ
this.o_attachChk.value+=checkSum+'\t';

window.setTimeout(function(){postfunc.attachUpload()},200)
}//fe

postfunc.add1Attach.sub=function(t,u){return '<button class="gray xtxt" style="width:5.5em" type=button onclick="this.style.backgroundColor=\'silver\';postfunc.addText(this.nextSibling.innerHTML.substr(1)+String.fromCharCode(10))" title="����ڹ���λ�ò���ͼƬ">'+t+'</button><span class="orange xtxt en_font"> [img]./'+u+'[/img]</span><br/>'}//fe

postfunc.add1Attach.getDispThumb = function(thumb){
var t = [],thumb = parseInt(thumb,10)
t.def = '';
if(!thumb)
	return t
if(thumb & 64)
	t.def = '.medium.jpg', t.push(['.medium.jpg','640x?']);
if((thumb & 32) || thumb==1)
	t.def = '.thumb.jpg', t.push(['.thumb.jpg','320x240']);
if((thumb & 16) || thumb==2)
	t.def = '.thumb_s.jpg', t.push(['.thumb_s.jpg','130x97']);
if((thumb & 8) || thumb==3)
	t.push(['.thumb_ss.jpg','60x45']);

return t;

}//fe





//
postfunc.genFormFromApiData=function(d){
var ift=function(x){
	if((typeof x=='string' || typeof x=='number') && x!=='')
		return true
	}
return this.genForm(
	d.action,d.fid,d.tid,d.pid,d.__ST?d.__ST.tid:null,
	d.__F.bit_data|0,
	d.post_type|0,
	ift(d.subject) ? d.subject+'':'' ,
	ift(d.content) ? d.content+'':'' ,
	d.attachs,
	d.auth,
	d.modify_append,
	d.if_moderator,
	(d.__T && d.__T.post_misc_var) ? d.__T.post_misc_var.vote : null,
	(d.__P && d.__P.post_misc_var) ? d.__P.post_misc_var.vote : null,
	(d.__T && d.__T.topic_misc_var) ? d.__T.topic_misc_var[1]|0 : 0,//tmbit1
	d.type|0
	)
 }//fe


//���ɷ������봰��
postfunc.genForm = function(mode,//����new �ظ�reply ����quote �޸�modify
fid,//���ڰ���id
tid,//�ظ�������id
pid,//�ظ��Ļظ�id
stid,//���ڵĺϼ�id
fbit,//�����bitλ
bit,//���ӵ�bitλ ���༭ʱ
subject,//���� ���༭ʱ
content,//���� ���༭ʱ
attach,//����  ���༭ʱ
auth,//�����ϴ���֤��
modifyAppend,//ֻ����д���ݲ����޸�
if_mod,//��ǰ�û��Ƿ���� lib_privilege::if_forum_admin
topic_vote,//�����vote���� ���༭��ظ�ʱ
post_vote,//�ظ���vote���� ���༭
tmbit1,
tbit//�����bitλ
			){
var self=this,
_GP = __GP,
$ = _$,
t =function(x){return window.document.createTextNode(x)}, 
i=1,
otherData='',
s = function(y,o,f,i){
	var x = $('/select').$0('onchange',function(){if(this.options[this.selectedIndex].value)f.call(this); this.selectedIndex=0},$('/option').$0('value','','innerHTML','Ĭ��'),'style',{width:'5em',marginRight:'1em'})
	for(var k in o)
		x._.add(
			$('/option').$0('value',k,'innerHTML', o[k]?o[k]:'' , 'style', o[k] ? '' :'backgroundColor:'+k )
			)
	return $('/span').$0(t(y+' '), x )
	},
ss = function(){
	return $('button')
	}

bit|=0
tmbit1|=0

//��������
content = ubbcode.unSecureText(content).replace(/\s*$/,'')
subject = ubbcode.unSecureText(subject)
this.contentBak = content
this.titleBak = subject

//��ʼ������
this.currentAuth = auth
this.currentFid = fid
this.o_subject//����
this.o_content//����
this.o_selfReply = {}//ֻ�����ߺͰ����ɻظ�
this.o_hidden//��������
this.o_vote = {}//ͶƱ����
this.o_voteType = {}// 0ͶƱ 1Ͷעͭ��
this.o_voteMax = {}//ÿ������Ͷ 0����
this.o_voteEnd = {}//Сʱ�����
this.o_attach
this.o_attachChk
this.o_voteBetMin = {}//Ͷע���ֵ
this.o_voteBetMax = {}//Ͷע��Сֵ
this.o_voteLimit = {}//ͶƱ����������
this.o_pvwindow
this.o_anony={}

this.o_topicVote
this.o_attachBtn
this.o_attachList
this.o_waitAttachList
this.o_attachForm
this.o_fileSelector
this.album
this.albumImgCount=0
this.ifMultiple
this.uploadedAttach=[]
this.o_setTopic={}
this.o_liveTopic={}
this.o_replyAnony={}
this.o_replyOnce={}
this.o_voteView={}

var f_post = function(ob){
	if(self.o_replyOnce.checked)
		tmbit1 |= self.tmBit1._TM_BIT1_REPLY_ONCE
	else
		tmbit1 &= ~self.tmBit1._TM_BIT1_REPLY_ONCE
	if(wordSeg)
		otherData = '/*wordSeg '+wordSeg+' */'
	post_opt = 0
	if(self.o_voteView.value==1)
		post_opt|=postfunc.postOptBit._OPT_VOTE_REPLY_VIEW
	else if(self.o_voteView.value==2)
		post_opt|=postfunc.postOptBit._OPT_VOTE_END_VIEW
	commonui.newPost(
		ob,
		mode,//����
		fbit,//����bit type
		fid,//����id
		tid,//����id
		pid,//�ظ�id
		mode==self.__NEW ? (self.o_setTopic.checked ? -1 : stid ) : null,//o_setTopic
		self.o_subject.value,//����
		self.o_content.value,//����
		self.o_hidden.checked ? 1 : 0,//�������� �������ɼ�
		self.o_selfReply.checked ? 1 : 0,//ֻ�����ߺͰ����ɻظ�
		self.o_attach.value,//����
		self.o_attachChk.value,//����У��
		self.o_vote.value,//ͶƱ����
		self.o_voteType.value,// 0ͶƱ 1Ͷעͭ��
		self.o_voteMax.value,//ÿ������Ͷ 0����
		self.o_voteEnd.value,//Сʱ�����
		self.o_voteBetMax.value,//Ͷע���ֵ
		self.o_voteBetMin.value,//Ͷע��Сֵ
		self.o_voteLimit.value,//ͶƱ����������
		self.o_modifyAppend ? self.o_modifyAppend.value : null,
		null,//self.o_comment ? (self.o_comment.checked ? 1 :0) : null
		self.o_anony.checked ? 1 : 0,//����
		self.o_liveTopic.checked ? 1 : 0,//live
		self.o_replyAnony.checked ? 1 : 0,//����huifu
		self.o_topicVote ? (function(o){
			var u = o.getElementsByTagName('input'),w={}
			for(var i=0;i<u.length;i++){
				u[i].value = u[i].value.replace(/\s*/g,'')
				if(u[i].value)
					w[u[i].name] = u[i].value
				else
					return ''
				}
			return __NUKE.scEn(w)
			})(self.o_topicVote) : null,
		tmbit1,
		otherData,
		post_opt
		)
	}
var vo0,vo1,vo2,vo3,vo4,vo5,vo6,vo7,vo8,vo9,wordSeg=''
var o_main = $('/span').$0(
	
	$('/table').$0(
		'className','forumbox',
		'cellspacing',1,
		'cellSpacing',1,
		'style',{borderWidth:'0',background:'#fff'},

		//$('/caption').$0(
		//	$('/h2').$0(t(':: ����/�༭ ::'))
		//	),

		//$('/thead').$0(
		//	$('/tr').$0(
		//		$('/td').$0(t('&nbsp; &nbsp;'))
		//		)
		//	),
		this.o_attach = $('/input').$0('name','attachments','type','hidden','id','attachments','value',''),
		this.o_attachChk = $('/input').$0('name','attachments_check','type','hidden','id','attachments_check','value',''),
		$('/tbody').$0(

			$('/tr').$0(
				'className','row'+(((i++)&1)+1),
				$('/td').$0(
					'className','c2',

					this.o_subject = $('/input').$0(
						'className','title',
						'maxLength','100',
						'name','post_subject',
						'id','post_subject',
						'title','����',
						'style',{width:'65%',marginRight:'0.5em'},
						'value',subject
						),

					mode==this.__NEW || mode==this.__MODIFY ? $('/span').$0(
						'name','tk',
						commonui.createTopicKeySelector(fid,function(k){self.o_subject.value = k+' '+self.o_subject.value})
						) : null,

					commonui.prePostHintAfterSubject ? commonui.prePostHintAfterSubject(mode, fid, tid, pid, stid) : null

					)//td
				),//tr__SETTING.bit & 4

			$('/tr').$0('className','row'+(((i++)&1)+1),
				$('/td').$0('className','c2',
					this.codeHelp()
					)
				),//tr

			$('/tr').$0('className','row'+(((i++)&1)+1),
				$('/td').$0('className','c2',
					s('����',ubbcode.fonts,function(){self.addTag('font',this.value)}),
					s('�ֺ�',ubbcode.fontSize,function(){self.addTag('size',this.value)}),
					s('��ɫ',ubbcode.fontColor,function(){self.addTag('color',this.value)}),
					t(' '),
					$('/button').$0('innerHTML','<b>B</b>','title','����','type','button','onclick',function(){self.addTag("b")}),
					t(' '),
					$('/button').$0('innerHTML','<u>U</u>','title','�º���','type','button','onclick',function(){self.addTag("u")}),
					t(' '),
					$('/button').$0('innerHTML','<span style="font-style:italic"> I </span>','title','б��','type','button','onclick',function(){self.addTag("i")}),
					t(' '),
					$('/button').$0('innerHTML','<del class="gray">DEL</del>','title','ɾ����','type','button','onclick',function(){self.addTag("del")}),
					t(' '),
					$('/button').$0('innerHTML','<b>&#8220;</b>','title','����','type','button','onclick',function(){self.addTag("quote")}),
					t(' '),
					$('/button').$0('innerHTML','<b>&#8212;</b>','title','�ָ���','type','button','onclick',function(){self.addText("======")}),
					t(' '),
					$('/button').$0('innerHTML','<b>H</b>','title','�������','type','button','onclick',function(){self.addText("==="+self.getSelectText()+"===")}),
					t(' '),
					$('/button').$0('style',{paddingLeft:0,paddingRight:0},'title','����ͼƬ','type','button','onclick',function(e){self.uiAddTag(e,11)},
						__TXT('img')._.css('fontSize','1.15em')
						),
					t(' '),
					$('/button').$0('style',{paddingLeft:0,paddingRight:0},'title','���볬����','type','button','onclick',function(e){self.uiAddTag(e,13)},
						__TXT('link')._.css('fontSize','1.15em')
						),
					t(' '),
					$('/button').$0('style',{paddingLeft:0,paddingRight:0},'title','�������','type','button','onclick',function(e){
							var o = ubbcode.smiles
							self.dialog.createWindow('uiAddTag')
							self.dialog.w.style.display='none'
							self.dialog.w._.addContent(null)
							self.dialog.w._.addTitle('�������')
							for(var k in o)
								self.dialog.w._.addContent(
									$('/button').$0('innerHTML',ubbcode.smilesN[k], 'name', k , 'onclick' ,function(){
										var oo = ubbcode.smiles[this.name],
											x=this.nextSibling,
											i = __IMGPATH,
											p = this.name==0?'':this.name+':'
										if(x.firstChild)return
										for(var j in oo){
											x._.add(
												$('/img').$0('src',i+'/post/smile/'+oo[j],'name',j,'onclick',function(){self.dialog.w._.hide();self.addText("[s:"+p+this.name+"]")}),
												' '
												)
											}
										}),
									$('/div')
									)
							self.dialog.w._.show(e,null,2)
							},
						__TXT('smile')._.css('fontSize','1.15em')
						),
					t(' '),
					$('/button').$0('style',{paddingLeft:0,paddingRight:0},'title','������','type','button','onclick',
						function(e){
							self.dialog.createWindow('uiAddTag')
							self.dialog.w.style.display='none'
							self.dialog.w._.addContent(null)
							self.dialog.w._.addTitle('������')
							self.dialog.w._.addContent(
								$('/div').$0('contenteditable','true','innerHTML','ʹ�ð칫����༭���<br/>���Ʊ��ճ�����˴�','style','overflow:hidden;padding:0.5em;width:19em;height:5em;background:silver;border:1px solid #000',
									'onpaste',function(){
										var o = this
										o.innerHTML=''
										setTimeout(function(){
											var m = self.parseTableClip(o.innerHTML)
											if(m){
												if(confirm('�Ƿ�Ҫ�ڹ��λ��ճ�����'))
													self.addText(m)
												}
											else
												alert('����ʶ���ʽ')
											o.innerHTML = 'ʹ�ð칫����༭���<br/>���Ʊ��ճ�����˴�'
											},50)
										})
								)
							self.dialog.w._.show(e)
							},
						__TXT('tbody')._.css('fontSize','1.15em')
						)
					)
				),//tr

			$('/tr').$0('className','row'+(((i++)&1)+1),
				$('/td','className','c2')._.add(
					this.o_hidden = $('/input').$0('name','hidden','type','checkbox','value',1,'_nochange',1,'checked','','onchange',function(e){
						if(this._nochange){
							console.log(bit , postfunc.postBit._POST_IF_HIDDEN)
							this.checked = (bit & postfunc.postBit._POST_IF_HIDDEN) ? 'checked' : ''
							console.log(this.checked)
							var o=this
							setTimeout(function(){console.log(o.checked)})
							commonui.cancelEvent(e)
							return this._nochange=0
							}
						}),
					t('�������� �������ɼ� '),
					mode==this.__NEW ? this.o_selfReply = $('/input').$0('name','self_reply','type','checkbox','value',1,'checked',(tbit & this.postBit._POST_IF_SELF_REPLY) ? 1 : '') : null,
					mode==this.__NEW ? t('ֻ�����ߺͰ����ɻظ� ') : null,
					mode==this.__NEW && _GP.lesser ? this.o_setTopic = $('/input').$0('type','checkbox','checked',(tbit & this.postBit._POST_IF_SET) ? 1 : '') : null,
					mode==this.__NEW && _GP.lesser ? $('/span').$0('innerHTML','�ϼ����� ','title','����������ͬһ������ �û��������·��������� �������������۳�5��� �������') : null,
					mode==this.__NEW && _GP.lesser ? $('/span').$0('title','����һ��ֱ�� ����ֱ��ϵͳ�и������� (ֱ��ϵͳ�����û����ɷ���)')._.add(this.o_liveTopic = $('/input').$0('type','checkbox'), '����ֱ��(alpha) ') : null,
					mode!=this.__MODIFY ? this.o_anony = $('/input').$0('type','checkbox','checked','','onclick',function(){if(this.checked)alert('��������������Ҫ5000ͭ��\n\n���������ظ���Ҫ100ͭ��\n\n�����������������Υ����潫����ش���\n\n��Ϊ����Ҫ������˵һ�Σ��� �� �� ��')}) : null,
					mode!=this.__MODIFY ? $('/span').$0('innerHTML','�������� ','title','����������������ʾ�����˵��κ���Ϣ') : null,

					mode==this.__NEW && if_mod ? $('/span').$0('title','���������еĻظ��Զ�����')._.add(this.o_replyAnony= $('/input').$0('type','checkbox'), '�ظ��Զ����� ') : null,
					(mode==this.__NEW/*||mode==this.__MODIFY*/) ? $('/span').$0('title','2000���ظ�֮�� �����ⷢ����֮����û�ֻ�ܻظ�һ��')._.add(this.o_replyOnce= $('/input').$0('type','checkbox','checked',(tmbit1 & this.tmBit1._TM_BIT1_REPLY_ONCE) ? 1 : ''), 'ÿ���û�ֻ�ܻظ�һ�� ') : null,
					/*
					((mode==this.__REPLY || mode==this.__QUOTE) && _GP.admin) ? 
						$('/span')._.add(
							this.o_comment = $('/input').$0('name','comment','type','checkbox','value',1,'checked',comment? 1 : ''),
							'��������/����(alpha) '
							)
						 : null,
						 */
					$('/button').$0('innerHTML','Ԥ��','title','','type','button','onclick',function(){self.preview()}),
					' ',
					$('/button').$0('innerHTML','����','title','�鿴���ӳ���','type','button','onclick',function(){window.alert('������Ϣ�Ѿ��� '+self.o_content.value.length+' �ֽ�');}),
					' ����alt�ɲ������'
					)
				),//tr
					
			$('/tr').$0('className','row'+(((i++)&1)+1),
				$('/td').$0('className','c2',
					modifyAppend ? t('���ӳ����޸�ʱ�ޣ��ڴ��ύ�����ݽ���������ԭ��') : null,
					modifyAppend ? this.o_modifyAppend = $('/select').$0(
						$('/option').$0('value','1','innerHTML', 'ĩβ'),
						$('/option').$0('value','2','innerHTML', '��ͷ')
						) :null,
					modifyAppend ? t('�������޸�ԭ������ϵ����') :null,
					this.o_content = $('/textarea').$0(
						'autofocus', '',
						'name','post_content',
						'style',{width:'98%',height:'25em',lineHeight:'1.538em'},
						'value',content,
/*						'onmousedown',function(e){
							this._mousedowntime = e.timeStamp
							},
						'onclick',function(e){
							if(this._mousedowntime && e.timeStamp-this._mousedowntime>1000 && e.timeStamp-this._mousedowntime<2000){
								this._mousedowntime = 0
								var z = this._as ? this._as : this._as = commonui.createCommmonWindow()
								z._.addContent(null)
								z._.addTitle('�ڹ��λ�ò��븽��ͼ')
								var x = $('uploadedattach').cloneNode(1),y = x.getElementsByTagName('span')
								for(var i=0;i<y.length;i++)
									y[i].style.display='none'
								y = x.getElementsByTagName('button')
								for(var i=0;i<y.length;i++)
									y[i].onclick=function(){postfunc.addText(this.nextSibling.innerHTML.substr(1)+String.fromCharCode(10));z._.hide()}
								z._.addContent(x)
								z._.show(e)
								commonui.cancelBubble(e)
								return commonui.cancelEvent(e)
								}
							},*/
						'onmouseup',function (){
							if(document.selection)
								self._selection = document.selection.createRange().duplicate();
							},//fe
						'_prvSPos',0,
						'_prvSPos1',0,
						'onkeyup',function (e){
							if(e.keyCode == 18){
								if(this._cws){
									this._cws = false
									this._cw._.hide()
									}
								}
							this.focus()
							self.inputchar(e,this)
							this.focus()
							if(document.selection)
								self._selection = document.selection.createRange().duplicate();
							},//fe
						'onkeydown',function (e){
							if(e.keyCode == 18){
								if(!this._cw){
									var _cwt={},bb = function(y,x,z){_cwt[x]=z?z:y;return [$('/span','innerHTML',y),$('/button','type','button','style','margin:0 0.8em 0 0.5em','innerHTML',x)]}
									this._cw = commonui.createCommmonWindow(1)
									this._cw._.addTitle('����Ӧ�İ����Բ�������')
									this._cw._.addContent(
										$('/span')._.add(
											bb('tab/�ո�',1,'\t'),
											bb('&#9679;',2),
											bb('&#9675;',3),
											bb('&#9899;',4),
											bb('&#9898;',5),
											bb('&#9733;',6),
											bb('&#9734;',7),
											bb('&#9632;',8),
											bb('&#9633;',9)
											)
										)
									this._cwt = _cwt
									}
								this._cw._.show()
								this._cws = true
								commonui.cancelEvent(e)
								}
							else{
								if(this._cws){
									if(e.altKey && this._cwt[e.key]){
										self.addText(this._cwt[e.key])
										commonui.cancelEvent(e)
										}
									this._cws = false
									this._cw._.hide()
									}
								}
							if(e.ctrlKey && e.keyCode == 13){
								f_post(null)
								commonui.cancelEvent(e)
								}
							},//fe
						'onpaste',function(e){
							var h = e.clipboardData.getData('text/html')
							if(!h)return
							var m = self.parseTableClip(h)
							if(m && confirm('�Ƿ�Ҫ�ڹ��λ��ճ�����')){
								self.addText(m)
								return commonui.cancelEvent(e)
								}
							}//fe
						)
					)
				),//tr
			self.o_topicVote = (function(tv,pv){
				if(tv && (mode==self.__REPLY || (mode==self.__MODIFY && pid))){}
				else
					return null
				if(pv)pv = __NUKE.scDe(pv)
				var x=$('/span')._.add( $('/b')._.add('��������ָ������Ŀ����'),'('+tv.min+'~'+tv.max+'��)')
				for(var k in tv){
					if(k|0)
						x._.add($('/br'), tv[k], ' ', $('/input','name',k,'value',(pv&&pv[k])?pv[k]:''))
					}
				return $('/tr','className','row'+(((i++)&1)+1),
					$('/td','className','c2',
						x
						)
					)
				})(topic_vote,post_vote),
			mode==this.__NEW ? $('/tr').$0('className','row'+(((i++)&1)+1),
				$('/td').$0('className','c2',
					this.o_voteType = $('/select').$0(
						'name','newvote_type',
						$('/option').$0('value','','innerHTML','��ͶƱ'),
						$('/option').$0('value','0','innerHTML','ͶƱ'),
						(if_mod&14)&&_GP.greater? $('/option').$0('value','1','innerHTML','Ͷעͭ��') : null,
						(if_mod&14)?$('/option').$0('value','2','innerHTML','����') : null,
						'onchange', function(){
							vo5.style.display = this.value==''? 'none' : ''
							if(this.value == '0'){
								vo0.innerHTML = ' ÿ��һ��ύ�����޸�\u2003ÿ������Ͷ '
								vo2.innerHTML = ' ��\u2003�� '
								vo4.innerHTML = ' Сʱ�����'
								vo9.innerHTML = '\u2003����ͶƱ�������� '
								vo6.value=vo8.value=''
								vo6.disabled=vo8.disabled=''
								}
							else if(this.value== '1'){
								vo0.innerHTML = ' ÿ��һ��ύ�����޸�\u2003ÿ������Ͷ '
								vo2.innerHTML = ' ��\u2003�� '
								vo4.innerHTML = ' Сʱ�����\u2003Ͷע��Сֵ '
								vo7.innerHTML = '\u2003Ͷע���ֵ '
								vo9.innerHTML = '\u2003����Ͷע�������� '
								vo6.value=vo8.value=''
								vo6.disabled=vo8.disabled=''
								}
							else if(this.value== '2'){
								vo0.innerHTML = ' ÿ��һ��ύ�����޸�\u2003'
								vo2.innerHTML = '�� '
								vo4.innerHTML = ' Сʱ�����\u2003������Сֵ '
								vo7.innerHTML = '\u2003�������ֵ '
								vo9.innerHTML = '\u2003���������������� '
								vo1.value=''
								vo6.value = 1
								vo8.value = 10
								vo6.disabled=vo8.disabled='disabled'
								}
							vo6.style.display = vo7.style.display = vo8.style.display = (this.value == '0' ?'none' : '')
							vo1.style.display = (this.value == '2' ?'none' : '')
							}
						),
					vo5 = $('/span','style','display:none')._.add(
						vo0 = $('/span'),
						vo1 = this.o_voteMax = $('/input').$0('name','newvote_max','size','3','value',1),
						vo2 = $('/span'),
						this.o_voteEnd = $('/input').$0('name','newvote_end','size','3','value','����'),
						vo4 = $('/span'),
						vo6 = this.o_voteBetMin = $('/input').$0('name','newvote_betmin','size','3','value',''),
						vo7 = $('/span'),
						vo8 =	this.o_voteBetMax = $('/input').$0('name','newvote_betmax','size','3','value',''),
						vo9 = $('/span'),
						this.o_voteLimit = $('/input').$0('name','newvote_limit','size','5','value','','title','��������ĵ�һ������ -21000~21000'),
						'\u2003',
						this.o_voteView = $('/select',
							$('/option','value',0,'innerHTML','��ʱ�鿴���'),
							$('/option','value',1,'innerHTML','�ύ��ɲ鿴���'),
							$('/option','value',2,'innerHTML','������ɲ鿴���')
							),
						(if_mod&14) ? null : ' �ǰ�������ͶƱ��۳�50����',
						this.o_vote = $('/textarea').$0('name','newvote','style',{width:'98%',height:'6em',lineHeight:'1.538em'},'value','')
						)
					)
				) : null//tr
/*
			$('/tr').$0('className','row'+(((i++)&1)+1),
				$('/td').$0('className','c2',
					t('����'),
					$('/a').$0('className','b','href','http://i.178.com/?_app=album&_controller=category&_action=view_list&uid='+__CURRENT_UID,'target','_blank','innerHTML','���˿ռ����'),
					t('�е�ͼƬ '),
					$('/a').$0('className','b','href','javascript:void(0)','innerHTML','���ҵ�����б�','onclick',function(){self.listAlbum(this.nextSibling.nextSibling.nextSibling)}),
					$('/span').$0('innerHTML', ' '),
					$('/a').$0('className','b','href','http://i.178.com/~album.photo.send_batch_form/cid/0/uid/'+__CURRENT_UID,'target','_blank','innerHTML','�����ϴ������'),
					$('/div')
					)
				)//tr
				*/
			)//tbody

		)
	)

//-----------------------------------------------------
var o_ath = $('/table').$0(
	'className','forumbox',
	'cellspacing',1,
	'cellSpacing',1,
	'style',{borderWidth:'0',background:'#fff',marginTop:'-2px'},
	
	$('/tbody').$0(
		$('/tr').$0('className','row'+(((i++)&1)+1),
			
			$('/td').$0('className','c2','id','attachformC',
			
				this.o_attachList = $('/span').$0('id','uploadedattach'),
				this.o_attachForm = $('/form').$0(
					'method','post',
					'id','attachform',
					'target','upload_iframe',
					'name','attachform',
					'action',this._ATTACH_UPLOAD+'?',
					'encoding','multipart/form-data',
					'enctype','multipart/form-data',
					'style',{clear:'both'}),
				this.o_waitAttachList =  $('/span').$0('id','waituploadattach'),
				$('/div').$0('style',{clear:'both'}),
				this.o_fileSelector = this.attachNewFileSelect(),
				this.o_attachBtn = $('/button').$0(
					'type','button',
					'innerHTML','�ϴ�ͼƬ/�ļ�����',
					'onclick',function(){this.disabled=true;postfunc.attachUpload()} ),
				this.ifMultiple ? t(' (��һ��ѡ����ļ� ���Ϸ�) ') : null,
				$('/a','href','javascript:void(0)','onclick',function(){this.style.display='none',this.nextSibling.style.display=''},__TXT('gear')),
				$('/select','style','display:none',
					$('/option').$0('value','','innerHTML','----'),
					$('/option').$0('value','br','innerHTML','Ĭ������ˮӡ'),
					$('/option').$0('value','bl','innerHTML','Ĭ������ˮӡ'),
					$('/option').$0('value','tl','innerHTML','Ĭ������ˮӡ'),
					$('/option').$0('value','tr','innerHTML','Ĭ������ˮӡ'),
					$('/option').$0('value','cn','innerHTML','Ĭ������ˮӡ'),
					$('/option').$0('value','','innerHTML','Ĭ����ˮӡ'),
					'onchange',function(){if(this.selectedIndex)postfunc.wmdefsel = this.selectedIndex-1}
					),
				$('<iframe name="upload_iframe"></iframe>').$0('name','upload_iframe','id','upload_iframe', 'style',{display:'none'})
				)
			)
		)
	
	)
	
if ('selectionStart' in this.o_content) 
	this.o_content.$0('onkeyup',function(e){
		var n= this.selectionEnd
		if(this.selectionStart==n &&wordSeg.length<100){
			if(n-this._prvSPos>1 && n-this._prvSPos<5)
				wordSeg+=this.value.substr(this._prvSPos,n-this._prvSPos)
			
			}
		this._prvSPos = this.value.charAt(n-1)==' '?n-1 : n
			
		/*mspinyin
			if(this.selectionStart==this.selectionEnd && wordSeg.length<100){
				/*mspinyin
				var s = this.selectionStart
				if(s<this._prvSPos1){
					if(s-this._prvSPos>1 && s-this._prvSPos<5){
						wordSeg+=this.value.substr(this._prvSPos,s-this._prvSPos)+'\t'
						this._prvSPos = s
						}
					}
				this._prvSPos1 = s
				}
		*/
		})

if(attach){
	for(var j in attach){
		var tmp = attach[j]
		//console.log(tmp)
		this.add1Attach(null,null,tmp.attachurl, tmp.type=='img'?1:0, tmp.thumb,tmp.url_utf8_org_name, tid, pid, tmp.name)
		}
	} 
//-----------------------------------------------------


var o_btn = commonui.stdBtns()

o_btn._.__add(
	$('/a').$0(
	'innerHTML','<span style="font-size:1.23em">�� ��(Ctrl+Enter)</span>',
	'href','javascript:void(0)',
	'className','uitxt1',
	'onclick',function(){
			f_post(this)
			}
		)
	)

if (commonui.userCache){
	o_btn._.__add(
		_$('/a').$0(
			'innerHTML','�ָ��ϴ����������',
			'href','javascript:void(0)',
			'onclick',function(e){var t = commonui.userCache.get("bbsPostBackup")
				if(t)
					postfunc.o_content.value+=t
				else
					alert('�Ҳ������������')}
			)
		)
	var saveTime = 0, saveLength=0, save=function(e){
		if(this.value.length>0 && this.value.length != saveLength && e.timeStamp-saveTime>10000){
			console.log('post autosave '+this.value.length+'char')
			commonui.userCache.set('bbsPostBackup',this.value)
			saveTime = e.timeStamp
			saveLength = this.value.length
			}
		} 
	this.o_content._.on('keyup',save)
	this.o_content._.on('change',save)
	this.o_content._.on('paste',save)
	}

o_btn._.css('margin','1em auto auto auto')

var drpo = function (e) {
	if (e.dataTransfer.files) {
		e.dataTransfer.dropEffect = 'copy';
		commonui.cancelEvent(e)
		commonui.cancelBubble(e)
		this.style.boxShadow='0 0 5px 0 '+__COLOR.border0
		}
	}

var drp = function (e) {
	if (e.dataTransfer.files) {
		self.o_fileSelector.files = e.dataTransfer.files;
		this.style.boxShadow=''
		commonui.cancelEvent(e)
		commonui.cancelBubble(e)
		}
	}

//if (o_main)
	//o_main.$0('ondrop',drp,'ondragover',drpo);

if (o_ath){
	o_ath.ondrop=drp
	o_ath.ondragover=drpo
	o_ath.onmouseout=function(){this.style.boxShadow=''}
	
	}
//-----------------------------------------------------
//
//����
/*
this.title = this.o_subject
this.content = this.o_content
this.attachBtn = this.o_attachBtn
this.attachList = this.o_attachList
this.attachForm = this.o_attachForm
this.waitAttachList = this.o_waitAttachList
this.fileSelector = this.o_fileSelector

this.form = {
	elements:{
		namedItem:function(x){
			switch(x){
				case 'fid':
					return {value:fid}
				case 'attachments':
					return self.o_attach
				case 'attachments_check':
					return self.o_attachChk
				}
			}
		}
	}
*/
//-----------------------------------------------------
return $('/span').$0(

			o_main,o_ath,o_btn,$('/br')

			)


}

/**
 *����Ԥ��
 */
postfunc.preview = function(){
if(!this.o_pvwindow)
	document.body.appendChild(_$('/span',(this.o_pvwindow = commonui.createCommmonWindow(1))))//�ص��������� ��ֹ����bbscodeʱ�ߴ����
	
var w=window, $=_$, op=this.o_pvwindow, opc=op.parentNode, pc = $('/div').$0('className','postcontent ubbcode','innerHTML',
	this.o_content.value.replace(/\t/g,'&emsp;&emsp;').replace(/\n/g,'<br/>').replace(/\r/g,'')
	)
op.style.width=$('mmc')?Math.round($('mmc').offsetWidth*0.9)+'px':'800px'
opc.style.visibility='hidden'
op._.addContent(null)
op._.addTitle('����Ԥ��')
op._.addContent(			
			$('/div').$0('className','fastViewPost',
				$('/div').$0('className','forumbox',
					$('/div').$0('className','postrow',
						$('/div').$0('className','c2',
							pc
							)
						)
					)
				)
			)
op._.show()

ubbcode.bbsCode({c:pc,
	opt:1,
	tId:Math.floor(Math.random*10000),
	pId:Math.floor(Math.random*10000),
	authorId:w.__CURRENT_UID,
	noImg:0,
	rvrc:w.__GP.rvrc,
	isLesser:w.__GP.lesser,
	callBack:function(){window.setTimeout(function(){op._.show();opc.style.visibility='inherit'},500)}
	})

}//fe

/**
 * �򿪷�������
* @param e (event)
* @param mode (str) ����new �ظ�reply ����quote �޸�modify
* @param fid (int) ��ǰ���� ��������''
* @param tid (int) �ظ������õ�����id ��������''
* @param pid (int) �ظ������õĻظ�id ��������''
* @param stid (int) 
* @param fids (obj) ������� �����ô˲���
*/
commonui.openPostWindow = function(e,mode,fid,tid,pid,stid,sfid,pcontent){
var self = this, p = postfunc
if(!commonui.quoteTo)
	loader.script(__SCRIPTS.quoteTo)
var ift=function(x){
	if((typeof x=='string' || typeof x=='number') && x!=='')
		return true
	}
if(!p.pwindow){
	p.pwindow = commonui.createCommmonWindow()
	var o = p.pwindow._.__c.parentNode
	o.style.padding=o.style.margin=0
	/*
	p.pwindow._.show=function (x,y,z){
		var o = this.__c.parentNode
		o.style.padding=o.style.margin=0
		var o = this.self
		o.style.overflow = 'auto'
		o.style.border=0
		var p = __NUKE.position.get()
		document.body.style.width=p.cw+'px'
		document.body.style.height=p.ch+'px'
		document.body.style.overflow='hidden'
		if(!o.parentNode || o.parentNode.nodeType!=1)
			document.body.appendChild(o)
		__NUKE.position.setPos(o,x,y,4)
		return o
		};//fe
	p.pwindow._.hide=function (){
		document.body.style.overflow=''
		document.body.style.width=''
		document.body.style.height=''
		this.self.style.display='none';
		return this.self
		};//fe
	*/
	}
if(mode== p.__REPLY_BLANK)
	mode= p.__REPLY
return __NUKE.doRequest({
	u:__API.postGet(tid,pid,mode,fid,stid),
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return commonui.alert(e)
		if(d.data.__MESSAGE)
			return commonui.alert(_$('/span','style','fontSize:1.23em;color:gray;fontWeight:bold','innerHTML',d.data.__MESSAGE[1]))
		var d= d.data, til=''
		
		commonui.fillDefault({
			subject:'',
			content:'',
			attachs:null,
			__ST:{
				tid:0,
				subject:''
				},
			__F:{
				name:'',
				bit_data:0
				},
			__T:{
				post_misc_var:{},
				topic_misc_var:{}
				},
			__P:{
				post_misc_var:{}
				}
			},d)

		til = d.__ST.subject ? d.__ST.subject : d.subject

		if(mode==p.__MODIFY)
			til = '�༭ '+til
		else if(mode==p.__QUOTE)
			til = '���ûظ� '+til
		else if(mode==p.__REPLY)
			til = '�ظ� '+til
		else
			til = '�� '+(til?til:d.__F.name)+' ��������'

		if(d.attach_url)
			postfunc._ATTACH_UPLOAD = d.attach_url
		
		postfunc.currentPostStat = d
		
		if(ift(pcontent))d.content = pcontent
		
		var d = postfunc.genFormFromApiData(d)
		/*
		postfunc.genForm(//mode,fid,tid,pid,stid,fbit,bit,subject,content,attach
			mode,d.fid,d.tid,d.pid,d.__ST.tid,
			d.__F.bit_data|0,
			d.post_type|0,
			d.subject+'' ,
			ift(pcontent) ? pcontent+'' : (d.content+'' ),
			d.attachs,
			d.auth,
			d.modify_append,
			d.if_moderator,
			d.__T.post_misc_var.vote,
			d.__P.post_misc_var.vote,
			d.__T.topic_misc_var[1]|0,//tmbit1
			d.type|0
			)*/
		if(__SETTING.uA[0]==1 && __SETTING.uA[1]<=6 && $('fastposttopickeyselector'))
			$('fastposttopickeyselector').style.display='none'
		p.pwindow._.addContent(null)
		p.pwindow._.addTitle(til)
		p.pwindow._.addContent(d)
		p.pwindow._.show(null,null,2)
		}
	})
}

/**
 *�򿪴������
 *@param e (event
 *@param hid (int ����id ��postfunc.hintTable
 */
postfunc.uiAddTag = function(e,hid){
if (!this.hintTable[hid])
	return
var a,c,f
var self = this
this.dialog.createWindow('uiAddTag')
this.dialog.w.style.display='none'
this.dialog.w._.addTitle('BBCODE����')
this.dialog.w._.addContent(null)
c = _$('<button>  �ر�  </button>')._.attr('type','button')._.on('focus',function(){this.blur()})._.on('click',function(){self.dialog.w.style.display='none'})

if(this.hintTable[hid][0]){
	f = this.dialog.genDialog(this.hintTable[hid])
	a = _$('<button>  ���  </button>')._.attr('type','button')._.on('focus',function(){this.blur()})._.on('click',function(){self.addText(self.dialog.returnVal(this.parentNode));self.dialog.w.style.display='none'})
	f = _$('<table/>')._.aC(
		_$('<tbody/>')._.aC(
			_$('<tr/>')._.aC(
				_$('<td/>','className','ubbcode','style','verticalAlign:top','innerHTML',typeof this.hintTable[hid].txt=='string'?'<div class=quote>'+this.hintTable[hid].txt+'</div>':'',typeof this.hintTable[hid].txt=='function'?this.hintTable[hid].txt():null)
				)._.aC(
				_$('<td/>')._.aC(f)._.css('verticalAlign','top')._.aC(a)._.aC(c)
				)
			)
		)
	}
else if(this.hintTable[hid].txt){
	f = _$('<div/>')._.cls('ubbcode')._.attr('innerHTML','<div class=quote>'+this.hintTable[hid].txt+'</div>',true)._.aC(c)
	}

this.dialog.w._.addContent(f)
this.dialog.w._.show(e)
}//fe



/**
 *��������б�
 */
postfunc.codeHelp=function()
{
var x,y,txt
if (ubbcode.codeHelpSpecial){
	x = []
	x=x.concat(ubbcode.codeHelpCommon,ubbcode.codeHelpSpecial);
	}
else
	x = ubbcode.codeHelpCommon

txt=''
for (var i=0;i<x.length;i++){
	var y = x[i]
	if(!y)
		continue
	if(!y[2])
		y[2]={}
	y[2].txt = typeof y[1]=='function' ? y[1] : y[1].replace(/\n|\r/g,'<br/>')
	if(typeof y[0]=='object')
		z=y[0]
	else
		var z = y[0].replace(/<\/?[a-z]+>/g,'').split('<br/>')
	txt +="<a href='javascript:void(0)' title='"+z[1]+"' class='small_colored_text_btn block_txt_c0' onfocus='this.blur()' onclick='postfunc.uiAddTag(event,"+this.hintTable.length+")'><nobr>"+z[0]+"</nobr></a> &nbsp;";
	this.hintTable.push(y[2])
	}

return _$('/span').$0('innerHTML',txt)
}




/**
 *���ɿ��ٷ�������
 *@param window.__CURRENT_FID(int ����id
 *@param window.__CURRENT_TID(int ����id ������idʱΪ�ظ� ����Ϊ��������
 *@param window.__CURRENT_STID(int 
 */
commonui.fastPostUi = function(fid,tid,stid){
if(!window.__CURRENT_UID || !window.__CURRENT_FID || __SETTING.bit & 4)
	return

var z = _$('fast_post_c')
if(!z)return
var w=window, 
//fid = w.__CURRENT_FID,
//tid = w.__CURRENT_TID ? w.__CURRENT_TID : 0,
//stid = w.__CURRENT_STID ? w.__CURRENT_STID : 0,
sfid = tid ? fid : commonui.selectForum.getCurrent(fid)

var $ = _$,t =function(x){return document.createTextNode(x)},b= commonui.stdBtns(),p,sel=null,subject,content,selector

, fbit=0
, dopost = function(o){
commonui.newPost(
	o,
	tid?postfunc.__REPLY_BLANK:postfunc.__NEW,//����
	fbit,//����bit type
	sfid,//����id
	tid,//����id
	0,//�ظ�id
	stid,
	subject.value,//����
	content.value//����
	)
}, dopost0 = function(o){
if(!sfid)
	return alert('����ѡ�����İ���')
if(sfid==window.__CURRENT_FID)
	fbit = window.__CURRENT_F_BIT
else
	return __NUKE.doRequest({
		u:__API.postGet('','',postfunc.__NEW,sfid),
		f:function(d){
			var e = __NUKE.doRequestIfErr(d)
			if(e)
				return alert(e)
			fbit = __NUKE.toInt(d.data.__F.bit_data)
			dopost(o)
			}
		})
dopost(o)
}
/*
if(tid)
	p = window.__CURRENT_F_ALLOWREPLY
else
	p = window.__CURRENT_F_ALLOWPOST
if(p.indexOf('+u1')!=-1 && __GP.active==0)
	b._.__add($('/a').$0(
				'href',__API.activeHelper(),
				'innerHTML','����'+(tid?'�ظ�':'����')+'��Ҫ����(?)',
				'className','gray',
				'style',{fontSize:'1.23em'}
				),1 )
else*/
	b._.__add($('/a').$0(
			'onclick',function(){
				dopost0(this)
				},
			'href','javascript:void(0)',
			'innerHTML',(tid?'����ظ�':'��������')+'(Ctrl+Enter)',
			'className','uitxt1',
			'style',{fontSize:'1.23em'}
			),1 )
b._.css('margin','auto')
if(!sfid)
	var sel = $('/button').$0('style',{marginRight:'0.3em'},
			t('����ѡ��'),
			'onclick',function(e){
				var self = this
				commonui.selectForum.selectWindow(e,fid,
					function(sf,name,st){
						if(st){
							stid=st
							__NUKE.doRequest({
								u:__API.postGet(null,null,postfunc.__NEW,null,st),
								f:function(d){
									var e = __NUKE.doRequestIfErr(d)
									if(e)
										return alert(e)
									if(d.data.__MESSAGE)
										return alert(d.data.__MESSAGE[1])
									sfid=d.data.fid
									selector._.setFid(sfid)
									}
								})
							}
						else{
							sfid=sf
							selector._.setFid(sf)
							}
						self.innerHTML = name
						}
					)
				}
			)

z.$0(
	$('/div').$0('className','module_wrap',
		$('/div').$0('className','w100',
			$('/table').$0('className','forumbox','cellspacing',1,'cellSpacing',1,
				$('/caption').$0(
					$('/h2').$0('innerHTML','..:: ���ٷ��� ::..')
					),
				$('/thead').$0(
					$('/tr').$0(
						$('/th').$0(
							'colspan',2
							)
						)
					),
				$('/tbody').$0(
					$('/tr').$0('className','row1',
						$('/td').$0('className','c2','style',{textAlign:'center'},
							$('/div').$0('style',{textAlign:'left',marginBottom:'1em'},
								sel,
							
								subject = $('/input').$0('style',{width:'65%',marginRight:'0.3em'}),

								tid ? null : selector = commonui.createTopicKeySelector(sfid,function(k){subject.value = k+' '+subject.value}),
								
								(commonui.prePostHintAfterSubject ? commonui.prePostHintAfterSubject(tid?postfunc.__REPLY_BLANK:postfunc.__NEW, fid, tid, 0, stid) : null),

								postfunc.o_f_content = $('/textarea').$0('style',{width:'98%',height:'200px'},'onkeydown',function(e){if(e.ctrlKey && e.keyCode == 13)dopost0(null)}	)
								),
							b
							),
						ngaAds.bbs_ads16_gen()
						)
					)
				)
			)
		)
	)

content = postfunc.o_f_content

if(__SETTING.uA[0]==1 && __SETTING.uA[1]<=6 && selector){
	selector.id='fastposttopickeyselector'
	subject.onfocus = function(){selector.style.display=''}
	}


z.style.display='inline'

if(b._.__vml)
	var b = b._.__vml(2)
	
}





/**
 * ��������keyѡ����
 * @param fid(int ����id ���Բ���
 * @param call(function ѡ��key֮���callback���� ����Ϊѡ���key����
 */
commonui.createTopicKeySelector = function(fid,call){
var $ = _$, t= function(x){return document.createTextNode(x)}

var s = $('/select').$0('style',{width:'7em',overFlow:'hidden'},
	$('/option').$0(t('�������')),
	'onclick',function(e){
		if(!this._.__fid)
			return alert('����ѡ�����')
		if(this._.__fidCurrent == this._.__fid)return
		var o = this
		o.innerHTML = ''
		o._.add(_$('/option').$0('innerHTML','������...'))
		o._.__fidCurrent =o._.__fid
		o.disabled=true
		__NUKE.doRequest({
			u:__API.topic_key(this._.__fid),
			f:function(d){
				if(__NUKE.doRequestIfErr(d,3600))
					return false
				if(!d.data || d.error)
					return true
				if(typeof d.data[0][0] == 'object')
					d.data = d.data[0]
				o.options[0].innerHTML = '...'
				var r = d.data;
				for (var k in r){
					var x = document.createElement('option');
					x.value=r[k][0]
					x.innerHTML=r[k][0]
					if (r[k][1]) x.style.backgroundColor='#eee'
					o.appendChild(x)
					}
				o.onchange=function(){
					call(this.value)
					o.selectedIndex=0
					}
				o.disabled=false
				//o.onclick = function(){commonui.onloadtopic_key(this)}
				return true
				}
			})//doRequest
		commonui.cancelEvent(e)
		}
	)

s._.setFid = function(f){this.__fid = f}

if(fid)
	s._.setFid(fid)
return s
}//fe






/**
*����һ������
*/
;(function(){

var post_check_data={},
unlock = function(x){
	if(x)
		alert(x)
	opt&=~1
	},
argBak,
redo=function(){
	opt|=32
	commonui.newPost.apply(commonui,argBak)
	},
hasAutoTran ,
mention,
contentNoMod,
subjectNoMod,
fromDevice,
fromClient,
//perCheckCode,
opt=0//1 lock , 2basic checked , 4ǿ�Ʒ���checked , 8�ؼ�������checked, 16�Զ�����checked, 32 in redo, 64per check code checked



commonui.newPost = function(
btn,
action,//����
fbit,//����bit type
fid,//����id
tid,//����id
pid,//�ظ�id
stid,
subject,//����
content,//����
hidden,//�������� �������ɼ�
selfReply,//ֻ�����ߺͰ����ɻظ�
attach,//����
attachChk,//����У��
vote,//ͶƱ����
voteType,// 0ͶƱ 1Ͷעͭ��
voteMax,//ÿ������Ͷ 0����
voteEnd,//Сʱ�����
voteBetMax,//Ͷע���ֵ
voteBetMin,//Ͷע��Сֵ
voteLimit,//ͶƱ����������
modifyAppend,//�޸�ʱ�޸����������ԭ����֮��
comment,//����/�����ظ�
anony,//����
live,//ֱ��
replyAnony,//�ظ�����
topicVote,//������������
tmbit1,
otherData,
post_opt
){
if(opt&1)
	return
opt|=1
var C = this, P=window.postfunc, $=_$

argBak = arguments

if(opt&32)
	opt&=~32
else{
	hasAutoTran=mention=contentNoMod=subjectNoMod=fromDevic=fromClient=null
	opt&=1
	}


if(action == P.__REPLY_BLANK)
	action = P.__REPLY

if(action == P.__NEW && !C.quoteTo)
	return loader.script(__SCRIPTS.quoteTo,function(){unlock();redo()})

fid = fid|0
fbit = fbit|0
tid = tid|0
pid = pid|0
stid = stid|0
post_opt|=0

modifyAppend = modifyAppend ? 1 : ''
comment = comment ? 1 : ''
anony = anony ? 1 : ''
live = live ? 1 : ''
replyAnony = replyAnony ? 1 : ''

if(!post_check_data[fid])
	post_check_data[fid] = {}
var cache = post_check_data[fid]

if((opt&2) == 0){
	opt|=2
	if(!fid)
		return unlock('FID ERROR');

	if((action == P.__REPLY || action == P.__QUOTE || action == P.__MODIFY) && !tid && !pid)
		return unlock('T/PID ERROR');

	if(typeof subject == 'number')
		subject = subject.toString()
	if(typeof subject != 'string')
		subject = ''

	if(typeof content == 'number')
		content = content.toString()
	if(typeof content != 'string')
		content = ''

	if(typeof vote == 'number')
		vote = vote.toString()
	if(typeof vote != 'string')
		vote = ''
	if(voteType==1 && !voteEnd)
		return unlock('Ͷע�����н���ʱ��');
	
	if((post_opt & postfunc.postOptBit._OPT_VOTE_END_VIEW) && !voteEnd)
		return unlock('ͶƱ/Ͷע�����н���ʱ��');

	//�����еķ���
	var x = _$('</span>')
	x.innerHTML = subject
	subject = x.innerHTML.replace('&lt;','<').replace('&gt;','>').replace('&amp;','&')

	//���ݹ���
	if(content.length<3)
		return unlock('���ݹ���');

	if(comment && content.length>420)
		return unlock('���ݹ���');

	//�������
	if(action == P.__NEW && subject.length<1)
		return unlock('�������');

	//����ȷ��
	if (P.o_attachForm)
		if(P.o_waitAttachList.firstChild)
			if (!window.confirm('ȷ�ϸ����Ѿ�ȫ���ϴ����?'))
				return unlock();
	
	//CONTENT Chk
	if(content && ubbcode && ubbcode.postContentChk){
		content = ubbcode.postContentChk(content)
		if(content===false)
			return unlock('CONTENT ERROR')
		}
	
	}

//per check code
/*
if((opt&64)==0 ){
	if (cache._perCheckCode){
		opt|=64

		}
	else if(cache._perCheckCode!==false){
		cache._perCheckCode=false
		__NUKE.doRequest({
			u:{u:__API._base+'__lib=post&__act=per_check',a:{raw:3}},
			f:function(d){
				if(!d.data || d.error)
					return alert(d.error ? d.error[0] : 'no data')

				if(d.data[0] && d.data[0].length>16){
					commonui.createadminwindow()
					var a = commonui.adminwindow
					a._.addContent(null)
					if(d.data[0]=='NEED SEND SMS CODE')
						a._.addContent( 
							_$("/span",'style','fontSize:1.166em;fontWeight:bold;textAlign:center')._.add(
								'���û���Ҫ������֤������ɷ���',
								_$('/br'),_$('/br'),
								_$('/input'),
								_$('/br'),_$('/br'),
								_$('/button','name','sendsms','innerHTML',' ��β���� '+d.data[1]+' ���ֻ�������֤�� ','onclick',function(){
									if(this.name=='sendsms'){
										var s = this
										__NUKE.doRequest({
											u:{u:__API._base+'__lib=post&__act=per_check',a:{opt:1,raw:3}},
											f:function(d){
												if(!d.data || d.error)
													return alert(d.error ? d.error[0] : 'no data')
												s.name==''
												s.innerHTML=' ȷ �� '
												alert('�����ɹ� ��ȴ����ն���')
												}
											})
										return
										}
									a._.hide()
									cache._perCheckCode = this.previousSibling.previousSibling.previousSibling.value
									redo()
									})
								)
							)
					else
						a._.addContent( 
							_$("/span",'style','fontSize:1.166em;fontWeight:bold;textAlign:center')._.add(
								'���û���Ҫ������֤������ɷ���',
								_$('/br'),_$('/br'),
								_$('/img','src','data:image/png;base64,'+d.data[0]),
								_$('/br'),_$('/br'),
								_$('/input'),
								_$('/br'),_$('/br'),
								_$('/button','innerHTML',' ȷ �� ','onclick',function(){
									a._.hide()
									cache._perCheckCode = this.previousSibling.previousSibling.previousSibling.value
									redo()
									})
								)
							)
					a._.show()
					unlock()
					return true
					}
				else
					cache._perCheckCode = 1;
				unlock()
				redo()
				return true
				}
			})//doRequest
		return false;
		}
	}*/

//�Ƿ�������ǿ�Ʒ���
if(action == P.__NEW  && (fbit & P._bit.if_force_topickey) && (opt&4)==0 ){
	if (cache._topic_key){
		opt|=4
		var x,y,z
		
		for (var k in cache._topic_key){
			x = cache._topic_key[k]
			if(x[1]){
				y=1
				if(x[0].indexOf('[')==0) x=x[0]
				else x='['+x[0]+']'

				if (subject.indexOf(x)!=-1){
					z=1
					console.log(9)
					}
				}
			}
		if (y==1 && z!=1)
			return unlock('�����Ӱ���ָ�����������(��ɫ)��ѡ��һ������');
		}
	else if(cache._topic_key!==false){
		cache._topic_key=false
		__NUKE.doRequest({
			u:__API.topic_key(fid),
			f:function(d){
				if(__NUKE.doRequestIfErr(d,3600))
					return false
				if(!d.data || d.error)
					return true
				else{
					if(typeof d.data[0][0] == 'object')
						d.data = d.data[0]
					cache._topic_key = d.data;
					}
				unlock()
				redo()
				return true
				},
			c:__CHARSET
			})//doRequest
		return false;
		}
	}

//�ؼ�������
if (fid && (fbit & P._bit.if_hint) && (opt&8)==0){
	if (cache._post_hint){
		opt|=8
		var x = cache._post_hint.split(/\n+/)
		if((x[0]|0)>__NOW){
			var g = '',m
			for(var i=1;i<x.length;i+=2){
				if(x[i].charAt(0)=='/')
					g += '\t'+x[i].replace(/^\/|\/$/g,'')
				else
					g += '\t'+x[i].replace(/[\x00-\x7f]/g,function($0){
						var c = $0.charCodeAt(0)
						return c==9 ? '\t' : '\\x'+c.toString(16)
						})
				}
			g= g.substr(1).replace(/\t/g,'|')
			try{
				var z = new RegExp(g)
				if(z && (m=subject.match(z)) || 
					(m=content.replace(/(\[(?:url|img|flash)(?:\]|=)(?:\.\/|\/|[a-zA-Z]{3,10}?:\/\/[\x21\x23-\x26\x28-\x2b\x2d\x2e\x30-\x3b\x3d\x3f\x40-\x5a\x5f\x61-\x7a\x7e]+))(?:[\x21\x23-\x26\x28-\x2b\x2d-\x3b\x3d\x3f\x40-\x5a\x5f\x61-\x7a\x7e]+)?/,"$1").match(z)) 
					){
					for(var i=1;i<x.length;i+=2){
						if(x.length==2 || x[i].indexOf(m[0])!=-1){
							if(confirm('��⵽���������а���\n\n"'+m[0]+'"\n\n������ʾ\n\n'+x[i+1]+'\n\n�Ƿ����')){

								}
							else 
								return unlock();
							}
						}
					}
				}
			catch(z){
				console.log(z)
				}
				
			}
		}
	else if(cache._post_hint!==false){
		cache._post_hint=false
		__NUKE.doRequest({
			u:__API._base+'__lib=log_post&__act=get_post_hint&raw=1&fid='+fid,
			f:function(d){
				cache._post_hint = ''
				if(!d.data)
					return true
				cache._post_hint = d.data[0]
				unlock()
				redo()
				return true
				}
			})//doRequest
		return false;
		}
	}
	
//�Զ�����
if (fid && (fbit & P._bit.if_auto_translate) && (opt&16)==0){
	if(cache._auto_translate_table){
		opt|=16
		if( commonui.autoTranslate.test(content) )
			hasAutoTran = 1
		}
	else if(cache._auto_translate_table !== false ){
		cache._auto_translate_table = false
		commonui.autoTranslate.main(null, fid, function(){
			cache._auto_translate_table = true
			unlock()
			redo()
			})
		return false;
		}
	}


//����@����
var x = content.match(/\[@.{2,30}?\]/g)
if (x){
	var y=[]
	for (var i=0;i<x.length;i++ )
		y[x[i].substr(2,x[i].length-3).replace(/^\s+|\s+$/,'')]=1
	x='',i=0
	for (var k in y){
		x+='\t'+k;
		i++;
		if(i>4)break;
		}
	if(x)
		mention = x.substr(1)

	}

//����
/*
if (postfunc.uploadedAttach){
	var x = true
	for (var i=0;i<postfunc.uploadedAttach.length;i++){
		if (content.indexOf(postfunc.uploadedAttach[i][0])==-1){
			x=false
			break;
			}
		}
	if (x)
		hideUpload=1
	}
*/

//���������õ�ǿ�Ƹ�Ϊ���� 
/*
if (action == postfunc.__REPLY || action == postfunc.__QUOTE){
	if(pid){
		if (content.substr(0,50).indexOf('[pid='+pid+'][b]Post by')==-1)
			action = postfunc.__REPLY
		}
	}
*/

if(this.postPerCheck && this.postPerCheck(argBak))//�Զ����� ����true��ֹ����
	return unlock();

//���޸ı��
if (action == P.__MODIFY){
	if(P.contentBak == content)
		contentNoMod=1
	if(P.titleBak == subject)
		subjectNoMod=1
	
	if(content.match(/\[dice\](?:[\dd+\s]+?)\[\/dice\]/i)){
		if(!confirm("[dice]�����������������㣡\n\n���ڹؼ�����(��ҡ��)ʹ�� ������·������������������\n\n��Ҫ�����������༭��ԭ���ķ�ʽ���ɽ�������� \n\n�Է�����ǰ��֪��������\n\n����ע��༭����ʱ\n����[dice]����˳�� ��[dice]����������Ƴ��۵���\n����������������ᷢ���ı�\n\n�Ƿ����"))
			return unlock();
		}
	}

//device
if(__SETTING.bit & 32768){
	var x = P.deviceDetect()
	if(x){
		fromDevice=x[0]
		fromClient=x[1]
		}
	}

var argmap = {'action':action,//����
	'fid':fid,//����id
	'tid':tid,//����id
	'pid':pid,//�ظ�id
	'stid':stid,//
	'post_subject':subject,//����
	'post_content':content,//����
	'mention':mention,//����@����
	'hidden':hidden,//�������� �������ɼ�
	'self_reply':selfReply,//ֻ�����ߺͰ����ɻظ�
	'attachments':attach,//����
	'attachments_check':attachChk,//����У��
	'other_data':otherData,//���ص�����
	'filter_key':'',//�м��Ӵ�
	'has_auto_translate':hasAutoTran,//���Զ������
	'hide_upload':'',//�۵��ϴ��ļ�
	'content_not_modify':contentNoMod,//�������޸�
	'subject_not_modify':subjectNoMod,//�������޸�
	'from_device':fromDevice,//�����豸
	'from_client':fromClient,//����ϵͳ
	'newvote':vote,//ͶƱ����
	'newvote_type':voteType,// 0ͶƱ 1Ͷעͭ��
	'newvote_max':voteMax,//ÿ������Ͷ 0����
	'newvote_end':voteEnd,//Сʱ�����
	'newvote_betmax':voteBetMax,//Ͷע���ֵ
	'newvote_betmin':voteBetMin,//Ͷע��Сֵ
	'newvote_limit':voteLimit,//ͶƱ����������
	'modify_append':modifyAppend,//�޸�ʱ�޸����������ԭ����֮��
	'comment':comment,//����/�����ظ�
	'anony':anony,//����
	'live':live,//ֱ��
	'reply_anony':replyAnony,//�ظ�����
	'topic_vote':topicVote,//��������Ĵ��
	'tpic_misc_bit1':tmbit1,
	'per_check_code':cache._perCheckCode,//��֤��
	'nojump':1,
	'post_opt':post_opt|0,
	'lite':'htmljs',
	step:2
	},arg={}
for(var i in argmap){
	if(argmap[i]==='' || argmap[i]===0 || argmap[i]===undefined || argmap[i]===null){}
	else
		arg[i] = argmap[i]
	}





__NUKE.doRequest({
	u:{u:'/post.php',	a:arg},
	b:btn,
	f:function(d){
		if(d.data && d.data.__MESSAGE && d.data.__MESSAGE[1]=="������� ..."){
			if(P.pwindow)
				P.pwindow._.hide()
			C.createadminwindow()
			C.adminwindow._.addContent(null)
			C.adminwindow._.addTitle(d.data.__MESSAGE[1])

			var c01,c03=d.data.__MESSAGE[5],u = d.data.__MESSAGE[6],thetid,ifmod = postfunc.currentPostStat ? postfunc.currentPostStat.if_moderator : __GP.admincheck,apc=P.afterPostCount

			apc.clear()

			if(thetid=u.match(/(?:\?|&)tid=(\d+)/))thetid=thetid[1]

			if(btn && btn._nojump){
				//console.log(d.data.__MESSAGE[1])
				unlock('1 done')
				return true
				}

			C.adminwindow._.addContent(
				c01 = $('/div')._.cls('ltxt b')._.add(
					"������� ",
					apc.c = $('/span','innerHTML',apc.i),
					'�����ת ',
					apc.j = $('/a','href',u,'className','gray','innerHTML','(�����ת)'),
					' ',
					$('/a','href','javascript:void(0)','className','gray','innerHTML','(���ȡ����ת)'),
					' ',
					ifmod&&tid ? $('/a','href','javascript:void(0)','className','gray','innerHTML','(�����������)','onclick',function(e){
						var sv = commonui.userCache.get('tColorOnPost')
						if(!sv)
							return __NUKE.fireEvent(this.nextSibling,'click')

						__NUKE.doRequest({
							u:__API.topicColor(thetid,sv,1)
							})
						}) : null,
					ifmod&&tid ? _$('/a','href','javascript:void(0)','style','color:#aaa;',__TXT('gear'),'onclick',function(e){
						var y=this
						this.parentNode._.add(
							$('/br'),
							$('/span','style','fontWeight:normal')._.add(
								$('/input','type','radio','name','color','value','silver'),' ��ɫ',
								$('/input','type','checkbox','value','I'),'б�� ',
								$('/input','type','checkbox','value','U'),'���� ',
								$('/button','innerHTML','ȷ��','type','button','onclick',function(){
									var x = ''
									commonui.forEach(this.parentNode.getElementsByTagName('input'),function(i,o){
										if(o.checked)
											x+=o.value+','
										})
									if(x){
										commonui.userCache.set('tColorOnPost', x, 86400 * 30)
										__NUKE.fireEvent(y.previousSibling,'click')
										}
									})
								)
							)
						}) : null,
					action==P.__NEW ? $('/span','innerHTML',C.quoteTo.afterPostQuote(true,subject,u+c03)) : ''
					)//c01
				);//addContent
			C.adminwindow._.on(
				'mousedown',function(){
					apc.clear()
					}
				)
			C.adminwindow._.show()

			apc.t = setInterval(function(){
				apc.i--
				if(apc.c)
					apc.c.innerHTML = apc.i
				if(apc.i<1){
					if(apc.j)
						commonui.triggerEvent(apc.j,'click')
					apc.clear()
					}
				}, 1000)

			setTimeout(function(){unlock()},1000)

			return true
			}//if

		alert( (d.data && d.data.__MESSAGE && d.data.__MESSAGE[1]) ? d.data.__MESSAGE[1] : 'DATA ERROR')

		unlock()

		return true
		},//fe

	ff:function(){
		alert('REQUEST ERROR')
		unlock()
		}//fe
	})

}//fe



})();


postfunc.afterPostCount = {t:null,i:5,j:null,c:null,clear:function(){
	if(this.t)
		clearInterval(this.t)
	this.c = this.j = null
	this.i=5
	}}

postfunc.reset = function(){
if(this.afterPostCount && this.afterPostCount.clear)this.afterPostCount.clear()
}//






postfunc.parseTableClip = function(h){
var m = h.match(/^\s*<table(?:\s+[^>]+)?>([^\x00]+)<\/table>\s*$/i)
if(m){
	m = m[1]
	}
else{
	m = h.match(/^.+?schemas-microsoft-com/)
	if(!m)return
	m = h.substr(0,512).match(/<meta name=ProgId content=Excel.Sheet>|schemas-microsoft-com:office:excel/)
	if(!m)return
	m = h.match(/<([^>]+)>\s*<!--StartFragment-->([^\x00]+?)<!--EndFragment-->/)
	if(!m)return
	if(m[1].substr(0,5)!='table'){
		m[2]=m[2].replace(/^\s*<table(\s+[^>]+)?>\s*|\s*<\/table>\s*$/g,
			function($0){m[3]=1;return ''})
		if(!m[3])
			return
		}
	m = m[2]
	}
m = m.replace(/\s*<col(?:\s+[^>]+)?>\s*/ig,'')
		  .replace(/\s*<(\/?tr)(?:\s+[^>]+)?>\s*/ig,'\n[$1]')
		  .replace(/\s*<(\/?td)(\s+[^>]+)?>\s*/ig,function($0,$1,$2){
				var x= ($1=='td'?'\n':'')+'['+$1
				if($2)
					$2.replace(/colspan=\d+|rowspan=\d+/ig,function($0){
						x+=' '+$0
						return $0
						})
				return x+']'
				})
			//.replace(/<\/?(?:font|p|b|tbody)(?:\s+[^>]+)?>/ig,'')
			//.replace(/<span(?:\s+[^>]+)?>(&nbsp;)*<\/span>/ig,'')
return '[table]\n'+m.replace(/^\s+|\s+$/ig,'').replace(/<[^>]+>/,'')+'\n[/table]'
}//fe





