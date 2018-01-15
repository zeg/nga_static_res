//nouse
//控制台======================
commonui.console = {
cache:null,
ckey:null,
_w:null,
_t:{value:''},
echo:function (txt,nonl){
if(typeof(txt)=='object')
    txt = commonui._debug._d(txt)
if(!nonl)txt+='\n'
this._t.value+=txt
var x = this._t.scrollHeight - this._t.clientHeight;
if (x>0)
	this._t.scrollTop =x
},//fe
open:function (){
if(!this._w){
	var v=this._t.value
	this._t = _$('<textarea/>')._.css({width:'500px',height:'200px',overflow:'hidden',display:'block',background:'#000',border:'none',color:'#eee',margin:'0',padding:'0',fontFamily:'Monospace',textAlign:'left'})._.attr('readonly','readonly')
	this.echo(v)
	this._w = _$('<div/>')._.css({left:'5px',top:'5px',padding:'5px',position:'absolute',display:'none',background:'#000',border:'2px solid #aaa',borderRadius:'8px','boxShadow':'9px 9px 9px #444'})._.aC(this._t,
		_$('<input/>')._.attr('type','text')._.css({width:'480px',background:'#000',border:'none',color:'#eee',fontFamily:'Monospace'})._.on('keyup',function(e){commonui.console.input(e,this)}),
		_$('<button/>')._.attr({type:'button',innerHTML:'&lt;'})._.css({width:'20px'})._.on('click',function(e){commonui.console.input({keyCode:13},this.previousSibling)})
		)
	document.body.appendChild(this._w)
	}
if(this._w.style.display=='none'){
	var s = this.getScroll();
	this._w.style.left=(s.x+5)+'px'
	this._w.style.top=(s.y+5)+'px'
	this._w.style.display='block'
	this._w.getElementsByTagName('input')[0].focus()
	}
else
	this._w.style.display='none'
},//fe
input:function(e,o){
if (!e)e = window.event;
if(e.keyCode == 13 || e.keyCode == 38 || e.keyCode == 40){
	var c = this.cache,k = this.ckey
	if(!c)c=commonui.userCache.get('consoleCache')
	if(!c)c=[]
	if(k==null)k=c.length-1

	if (e.keyCode == 13 && o.value){
		var x = o.value
		o.value=''
		c.push(x)
		if(c.length>20)c.shift()
		k = c.length-1
		this.cache=c
		commonui.userCache.set('consoleCache',c)
		try{
			eval('var r=( '+x+' )')
			}
		catch(e){
			try{
				eval('var r=(function(){\n'+x+'\n})()')
				}
			catch (ee){
				if(ee.stack)
					console.log(ee.stack)
				}
			}
		if(typeof(ee)==='undefined')this.echo(r)
		}
	else if (e.keyCode == 38){
		if (typeof(c[k])!='uindefined'){
			o.value = c[k]
			k--
			if (k<0)
				k=c.length-1
			}
		}
	else if (e.keyCode == 40){
		k++
		if (k>=c.length)
			k=0
		if(typeof(c[k])!='uindefined')o.value = c[k]
		}

	this.ckey=k
	}
},
getScroll:function (){
return commonui.getScroll()
},//fe
init:function (){
commonui.aE(document,'keyup',function (e){
	var x = document.activeElement
	if (x && (x.nodeName && (x.nodeName=='INPUT' || x.nodeName=='TEXTAREA')))return
	if (!e)e = window.event;
	if (e.keyCode == 192){
		commonui.console.open()
		}
	})

if(window.console){
	/*
	//Error.prototype.toStringBak = Error.prototype.toString
	//Error.prototype.toString = function(){var x = this.stack+' ';return this.toStringBak()+'\n| '+x.replace(/\n/g,'\n| ')}
	console.logBak = console.log
	try{
		console.log = function(){
			commonui.console.echo.apply(commonui.console,arguments)
			if(this.logBak){
				if(this.logBak.apply)
					this.logBak.apply(this,arguments)
				else
					this.logBak(arguments[0])
				}
			}
		}
	catch(e){
		commonui.console.echo(e)
		}
*/
	}
else{
	console = {
		log:function(e){commonui.console.echo(e)}
		}
	}	

}//fe
}
commonui.console.init();





//审核========================
commonui.audit = function (e,tid,pid)
{
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addContent( "\
	<form action='nuke.php?func=audit&yes=0,"+tid+","+pid+"' target='commonuiwindowiframe' method='post' onsubmit='commonui.disableInputOnSubmit(this)'>\
	<input name='submit' value='审核通过' type='submit'> <input value='取消' type='button' onclick='commonui.hideAdminWindow()'>\
	</form>\
	<iframe name='commonuiwindowiframe' id='commonuiwindowiframe' scrolling='no' allowtransparency='true' src='about:blank' style='height:50px;width:200px;border:none;overflow:hidden'></iframe>\
")
tTip.showdscp(e,this.adminwindow);
}
//fe


//获取版面的分类================
commonui.onloadtopic_key = function(o,fid){
var ffid = false
if (o.form && o.form.elements.namedItem('fid') && o.form.elements.namedItem('fid').value)
	ffid = o.form.elements.namedItem('fid').value
if (ffid)
	{
	if (o._last_fid==ffid)return
	fid=o._last_fid = ffid
	}
else
	{
		if (!fid){
			window.alert('你必须选择一个版面');
			return
		}
		if (o.onchange)
			return;
	}
o.disabled=true
o.innerHTML='';
var x = document.createElement('option');
x.innerHTML = '加载中...'
x.value=''
o.appendChild(x)

__NUKE.doRequest({
	u:__API.topic_key(fid),
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
			if (o.form.elements.namedItem("post_subject"))var x=o.form.elements.namedItem("post_subject")
			else if(o.form.elements.namedItem("key"))var x = o.form.elements.namedItem("key")
			x.value=o.value+" "+x.value
			}
		o.disabled=false
		o.onclick = function(){commonui.onloadtopic_key(this)}
		return true
		}
	})//doRequest

}//fe