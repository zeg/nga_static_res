/*
========================
NJtools nga javascript tool lib
------------
(c), Zeg, All Rights Reserved
Distributed under MIT license
========================
*/


;(function($){
var FORM,SCRIPT,TARGET,ARGS,RUN
/**
* ʹ��jsonp��ʽ��������������� ��get��post
* @param a ���������һ��object �ṹ����
* a._id ��Ҫ�����
* a._noLock ��Ҫ�����
* a.u �����ַ 
*		Ϊstringʱʹ��get���� ʹ�ò���script��ǩ�ķ�ʽ��ȡ���� ���Կ���
*		Ϊ{u:url,a:{k1:v1,k2:v2....}}ʱʹ��post���� ʹ��iframe��XHR��ʽ��ȡ���� ������XHR���ڷ���������ض�header
*		��Ҫʹ�á������ַ��ʱ[�����ַ0,�����ַ1 ...]
* a.c ������Ϣ���ַ��� ����Ĭ��Ϊ�գ���ҳ����ͬ����
* a.b �ύ��ť/������ (���Ժ���
* a.f �ɹ�ʱcallback���� ��˺�������true��Ϊ�ɹ� ����false��Ϊʧ�� ʧ�ܲ����С������ַ��ʱ�����������һ��
* a.ff ʧ��ʱʱcallback���� �������ȫ��ʧ�ܻ� a.fȫ������falseʱִ��
* a.t ����target(����postʱ��) ��Ϊdom node���Ŀ��iframe���������� �粻��ʹ������iframe
* a.n �������������ݱ��������� ����Ĭ��Ϊscript_muti_get_var_store (����������ݱ�������Ϊcallback a.f�ĵ�һ������ 
* a.ca �Ƿ񻺴��� (����a.u��stringʱ
* a.xr �Ƿ�ʹ��XHR(����postʱ
*/
var doRequest=function(a){

if(!FORM){
	FORM = $('/form','method','post','style','display:none')
	document.body.insertBefore(FORM,document.body.firstChild)
	TARGET = $('/span','style','display:none')
	document.body.insertBefore(TARGET,document.body.firstChild)
	ARGS=[]
	CACHE=[]
	}

if(!a._id)
	a._id = 'doHttpRequest'+Math.floor(Math.random()*10000)
if(!a.n)
	a.n = 'script_muti_get_var_store'
if(!a.t)
	a.t = TARGET

var f = _doRequestLock(a)
if(f)return alert(f)

if(!a.f){
	a.f = function(d){//����.error����ʾ.error ������ʾ.data
		if(!d)
			return
		var x,y='';
		if(d.error)
			x= d.error
		else if(d.data)
			x=d.data
		if(!x)
			x={0:'ERROR NO DATA'}
		if(typeof x=='string')
			y=x
		else{
			for(var k in x)
				y+=x[k]+'\n'
			}
		alert(y)
		return true
		}
	a.ff = function(){
		alert('ERROR REQUEST')
		}
	}

if(a.ca && typeof a.u=='string'){
	if(CACHE[a.u])
		return a.f.call(window,CACHE[a.u])
	}
	
ARGS.push(a)

if(!RUN){
	RUN=true
	return setTimeout(function(){_doRequest()})
	}
}//fe

var _doRequest=function(){
	
var a = ARGS[0]

if(!a)
	return RUN=false

if(!a.u){
	_doRequestLock(a,true)
	ARGS.shift()
	return setTimeout(function(){_doRequest()})
	}

var u = typeof(a.u)=='string' || a.u.u ? a.u : a.u[0]

if(typeof(u)=='string'){
	if(SCRIPT)SCRIPT.parentNode.removeChild(SCRIPT)
	SCRIPT = $('/script','id',a._id, 'src',u, 'charset',a.c?a.c:'', 'type','text/javascript','onreadystatechange',_doRequestCallback,'onload',_doRequestCallback,'onerror',_doRequestCallback)
	window[a.n]=null
	document.getElementsByTagName('head')[0].appendChild(SCRIPT)
	return
	}

if(window.commonui && commonui.triggerEventBeforePost)
	commonui.triggerEventBeforePost()

if(a.xr){
	var fd = new FormData()
	for(var k in a.u.a)
		fd.append(k,a.u.a[k])
	var xr = new XMLHttpRequest()
	xr.onload = function(e) {
		var xhr = e.target,er,y
		if (xhr.readyState !== 4 && xhr.status !== 200)
			er = 'SERVER_RETURN_'+xhr.status
		else{
			
			try{
				y = {}
				eval('y["'+a.n+'"]='+xhr.responseText)
				}
			catch(err){
				er=err
				}
			}
		if(er){
			console.log(er)
			y={}
			}
		return _doRequestCallback.call({readyState:'complete',nodeName:'IFRAME',contentWindow:y})
		}
	//if(xr.upload)
	//	xr.upload.onprogress = function(e){if (e.lengthComputable) console.log(Math.round(e.loaded * 100 / e.total).toString()+'%') }
	xr.open("POST", a.u.u) // Boooom!	
	xr.withCredentials=true //must after open
	xr.send(fd)
	return
	}

FORM.innerHTML=''
FORM.action = u.u
for(var k in u.a)
	FORM._.add($('/input','type','hidden','value',u.a[k],'name',k))

if(typeof(a.t)=='object' && a.t.nodeType==1){
	FORM.target = a._id
	a.t.innerHTML = ''
	a.t.appendChild(
		$('/iframe','name',a._id,'id',a._id, 'scrolling','no', 'allowtransparency','true', 'frameBorder','0','style','width:'+(a.t.offsetWidth ? a.t.offsetWidth+'px' : '200px')+'height:'+(a.t.offsetHeight ? a.t.offsetHeight+'px' : '50px')+';border:none;overflow:hidden')
		)
	a.t.firstChild.$0('onreadystatechange',_doRequestCallback,'onload',_doRequestCallback,'onerror',_doRequestCallback)
	}
else if(typeof(a.t)=='string')
	FORM.target = a.t

FORM.submit()
}//fe

var _doRequestCache={}

var _doRequestLock=function(a,clear){
if(clear){
	if(a.b){
		a.b.disabled = a.b.__submiting = false
		if(a.b.style)
			a.b.style.crusor = ''
		}
	return
	}
if(a.b){
	if(a.b.disabled || a.b.__submiting)
		return '�ύ�� ���Ժ�����'
	a.b.disabled = a.b.__submiting = true
	if(a.b.style)
		a.b.style.crusor = 'wait'
	}
}//fe

var _doRequestCallback = function(e){
var o = this
if((o.readyState && o.readyState!='complete' && o.readyState!='loaded')||o.__loadRunned)
	return
o.__loadRunned = true
var r = true, a = ARGS[0]
if(a.f){
	var d = null
	try{
		d = o.nodeName == 'IFRAME' ? o.contentWindow[a.n] : window[a.n]
		}
	catch(e){
		console.log('_doRequestCallback:'+e)
		d = null
		}
	if(d && d.debug)
		console.log(d.debug)
	if(a.ca && typeof(a.u)=='string')
		_doRequestCache[a.u] = d
	r = a.f.call(window, d)
	}
if(r || typeof(a.u)=='string' || a.u.u || a.u.length==1){//��ɹ� �� ��get �� ��post �� ����get��post���Ҷ�����û����һ���� ��ʱ�� ��������
	if(!r && a.ff)
		a.ff.call(window)
	a.u=null
	}
else
	a.u.shift()
setTimeout(function(){_doRequest()})
}//fe

/**
* http post
* ͬdoRequest
*/
doPost = function(a){
if(a.a){
	a.u={u:a.u,a:a.a}
	delete a.a
	}
else if(typeof(a.u)=='string'){
	a.u={u:a.u,a:{nouse:'post'}}
	}
return doRequest(a)
}//fe


$.doRequest = doRequest
$.doPost = doPost

})(
	_$ //NJtools��������$  �����޸�
	);

/**
//����:

����doRequest��ע��
 */
