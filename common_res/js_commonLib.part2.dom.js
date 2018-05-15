/*
========================
NJtools nga javascript tool lib
------------
(c), Zeg, All Rights Reserved
Distributed under MIT license
========================
*/


;(function(NAME){
/*
*Element 原型扩展
*/
window.domExtPrototype={ 
/*
 *增加样式class
 */
cls:function(cn){
	this.self.className += ' '+cn
	return this.self 
	},
/*
 *设定css样式
 *@param name , value , name , value , name , value ...
 *@param (obj)o/{name:value,name:value,name:value...}
 */
css:function(){
	var o = this.self, a=arguments
	if(a.length==1){
		var c = arguments[0]
		for (var k in c){
			if(k.charAt(0)=='-')
				k=this.csn(o.style,k.substr(1))
			o.style[k]=c[k]
			}
		}
	else
		for(var i=0;i<a.length;i+=2){
			if(a[i].charAt(0)=='-')
				a[i]=this.csn(o.style,a[i].substr(1))
			o.style[a[i]]=a[i+1]
			}
	return o
	},
csn:function(s,k,r){
	if( k in s)
		return k
	else{
		var kk = k.substr(0,1).toUpperCase()+k.substr(1)
		if(this.csnp[0]+kk in s)
			return this.csnp[0]+kk
		else{
			for(var i=1;i<this.csnp.length;i++){
				if(this.csnp[i]+kk in s){
					this.csnp[0] = this.csnp[i]
					return this.csnp[i]+kk
					}
				}
			}
		}
	return r?null:k
	},
csnp:[
	'',
	'webkit',
	'ms',
	'moz'
	],
/*
 *绑定事件
 *@param 事件名(无on) , callback(第一个参数是event)
 */
on:function(type, fn){
	if (window.addEventListener)
		this.self.addEventListener(type, fn, false); 
	else if (window.attachEvent){
		var o = this.self
		o.attachEvent('on'+type, function(){fn.call(o, window.event)} ) 
		}
	return this.self; 
	},
/*
 *增加子节点
 *@param node , node , node , node , node , node ...
 *node为null时忽略
 *node为string时node=document.createTextNode(node)
 *node为array时
 */
add:function(){
	var o = this.self, i=0, a=arguments
	for (;i<a.length;i++){
		if(a[i]===null)
			continue
		else if(typeof a[i] =='object'){
			if(a[i].constructor==Array){
				this.add.apply(this,a[i])
				}
			else
				o.appendChild(a[i])
			}
		else
			o.appendChild(document.createTextNode(a[i].toString()))
		}
	return o
	},

/*
 *综合调用
 *@param attrName , attrValue , attrName , attrValue ... 设置属性 具体参看attr函数
 *@param {name: value, name: value ...} 批量设置属性
 *@param event , callback , event , callback ... 注册事件 具体参看on函数
 *@param domNode , domNode ...  增加子节点 (有nodeType属性的object视为domNode) null参数会被跳过 具体参看add函数
 *以上参数可混用
 *设定className属性时如value为null则清空
 *设定style属性时value为{cssName: value, cssName: value ...}
 */
call:function(){
	for(var i=0;i<arguments.length;++i){
		var a = arguments[i]
		if(a===null)
			continue
		else if(typeof a == 'object'){
			if(a.constructor==Array)
				this.add.apply(this,a)
			else if(a.nodeType)
				this.self.appendChild(a)
			else
				for(var k in a)
					this.attr(k,a[k])
			}
		else
			this.attr(a,arguments[++i])
		}
	return this.self
	},
/*
 *设定属性或样式或事件注册
 *@param name , value 
 *@param event , callback 
 *@param {name: value, name: value ...}
 *自定义属性名用 _ 开头
 *设定className时如value为null则清空 否则为添加到原className结尾
 *设定style时value为'cssName:value;cssName:value;...'或{cssName: value, cssName: value ...}
 */
attr:function(k,v){
	if(typeof v == 'function' && k.substr(0,2)=='on')
		return this.on(k.substr(2),v)
	if(arguments.length==1 && typeof k =='object'){
		for(var i in k)
			this.attr(i,k[i])
		return this.self
		}
	var o = this.self
	switch(k){
		case 'className':
			if(v===null)
				o.className=null
			else if(v)
				o.className+=' '+v
			break
		case 'style':
			if(typeof v=='string'){
				var n=0,m=0,c=v.length-2
				while(n>-1 && n<c && (m=v.indexOf(':',n))>0)
					o.style[v.slice(n,m)]=v.slice(m+1,(n=v.indexOf(';',m+1))>-1?n++:undefined)
				//v = v.split(/:|;/)
				//for(var s=0;s<v.length;++s)
				//	o.style[v[s]]=v[++s]
				}
			else
				for(var s in v)
					o.style[s]=v[s]
			break
		case 'id':
		case 'innerHTML':
		case 'title':
		case 'checked':
		case 'accessKey':
		case 'dir':
		case 'disabled':
		case 'lang':
		case 'tabIndex':
		case 'width':
		case 'value':
		case 'height':
			o[k]=v
			break
		default:
			if(k.charAt(0)=='_')
				o[k]=v
			else
				o.setAttribute(k,v)
		}
	return o
	}
}//oe


/*
*为element原型增加综合调用函数$0
*/
if (window.Element)
    window.Element.prototype.$0=function(){return this._.call.apply(this._,arguments)}
else//ie6 ie7
	var $0ie = function(){return this._.call.apply(this._,arguments)}

/*
取元素或新建元素
*/
window[NAME] = function (o){//fs
if(typeof o == 'string'){
	if(o.charAt(0)=='/')
		o = document.createElement(o.substr(1))
	else if(o.charAt(0)=='<'){//$('<span>') or $('<span/>') or $('<span>abcd</span>')
		var x
		if(x=o.match(/^<?\/?([a-zA-Z0-9]+)\/?>?$/))
			o = document.createElement(x[1])
		else{
			x = document.createElement('span')
			x.innerHTML = o
			o = x.firstChild
			}
		}
	else
		o = document.getElementById(o)
	}
if(o!==null){
	if(o._==null){
		o._=function(){}
		o._.prototype=domExtPrototype
		o._ = new o._
		o._.self = o
		if(!('$0' in o))//ie6 ie7
			o.$0=$0ie
		}
	if(arguments[1]!==undefined){
		delete arguments[0]
		arguments[0] = null
		o._.call.apply(o._,arguments)
		}
	}
return o
}//fe

})(window.$ ? '_$' : '$');//指定主函数名字 自行修改

/**
//用例:

//新建元素
var x = $('/span')

//用id取元素 
var x = $('xxoo')

//例子
$('/span','id','xxoo','style','width:100%',$('/span'),'className','xxoo')//使用主函数一次生成

$('xxoo').$0('style',{width:'100%'},$('/span'),'onclick',function(e){alert(123)}).$0('className','xxoo')//使用$0方法 $0参看domExtPrototype.call

$('/span')._.cls('xxxxoooo')._.attr('title','abcd')._.add($('/span'),$('/div'),'test text')//使用不同的方法链式调用 使用参看domExtPrototype

*/


