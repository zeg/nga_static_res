if(!window.commonui)var commonui={}

$=id2e=function (id){return document.getElementById(id)}//fe
function put(txt){document.write(txt)}//fe

//事件注册==================
commonui.aE=function(obj,evt,fn) {
if (evt=='DOMContentLoaded'){
	var x = this._addEventOnDOMContentLoadedFucns
	x[x.length++]=fn
	if(x.done)fn()
	return
	}
if (obj.addEventListener)
	obj.addEventListener(evt,function(event){fn.call(obj,event)},false)
else if (obj.attachEvent)
	obj.attachEvent('on'+evt,function(event){fn.call(obj,event)})
}//fe

commonui._addEventOnDOMContentLoadedFucns={length:0}
commonui.triggerEventDOMContentLoadedAct = function(){
var x = this._addEventOnDOMContentLoadedFucns
for (var i=0;i< x.length;i++)
	x[i]()
x.done=true
}//fe

commonui.loadAlertInfo=function(info)
{
if(!info)return;
info = info.split(/\t|\n/);
var e = '';
var p = '';
for (var k in info)
	{
	info[k] = info[k].replace(/^[\t\n ]+/,'');
	if (info[k])
		{
		if (info[k].substr(0,4).toLowerCase()=='edit')e+=info[k]+' ';
		else p+=info[k]+' ';
		}
	}
if(e)put('<div class="silver">'+e+'</div>');
if(p)put("<table class='dice'><tr><td>评分记录 "+p+'</td></tr></table>');
}