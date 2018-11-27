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
* 使用jsonp方式向服务器请求数据 可get或post
* @param a 输入参数是一个object 结构如下
* a._id 不要设这个
* a._noLock 不要设这个
* a.u 请求地址 
*		为string时使用get方法 使用插入script标签的方式获取数据 可以跨域
*		为{u:url,a:{k1:v1,k2:v2....}}时使用post方法 使用iframe或XHR方式获取数据 跨域需XHR并在服务器输出特定header
*		需要使用“多组地址”时[请求地址0,请求地址1 ...]
* a.c 返回信息的字符集 不设默认为空（和页面相同编码
* a.b 提交按钮/或链接 (可以忽略
* a.f 成功时callback函数 如此函数返回true意为成功 返回false意为失败 失败并且有“多组地址”时则继续尝试下一个
* a.ff 失败时时callback函数 如果请求全部失败或 a.f全部返回false时执行
* a.t 表单的target(仅在post时用) 如为dom node则表单目标iframe会置于其中 如不设使用隐形iframe
* a.n 服务器返回数据变量的名字 不设默认为script_muti_get_var_store (如果存在数据变量会作为callback a.f的第一个参数 
* a.ca 是否缓存结果 (仅在a.u是string时
* a.xr 是否使用XHR(仅在post时
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
	a.f = function(d){//如有.error则显示.error 否则显示.data
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
		var xhr = e.target
		if (xhr.readyState !== 4 && xhr.status !== 200)
			return _doRequestCallback.call({readyState:'complete',nodeName:'IFRAME',contentWindow:{}})
		y = eval(xhr.responseText)
		return _doRequestCallback.call({readyState:'complete',nodeName:'IFRAME',contentWindow:{script_muti_get_var_store:y}})
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
		return '提交中 请稍后再试'
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
if(r || typeof(a.u)=='string' || a.u.u || a.u.length==1){//如成功 或 单get 或 单post 或 队列get或post并且队列中没有下一个了 的时候 结束任务
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
* 同doRequest
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
	_$ //NJtools的主函数$  自行修改
	);

/**
//用例:

参照doRequest的注释
 */
