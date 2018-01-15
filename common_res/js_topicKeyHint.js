
commonui.topicKeyHint = {}
commonui.topicKeyHint.cache={}
commonui.topicKeyHint.match=null
commonui.topicKeyHint.hintC=null
commonui.topicKeyHint.hintD=null
commonui.topicKeyHint.cacheKey = null
commonui.topicKeyHint.url=Array('','')
commonui.topicKeyHint.cacheTime = 3600;
commonui.topicKeyHint.getInsertPoint = function(o)
{
o.focus();
if(document.selection)
	{
	var r = document.selection.createRange()
	r.moveStart("character",o.value.length*-1)
	return r.text.length
	}
else
	{
	return o.selectionStart
	}
}

commonui.topicKeyHint.charCodeAtInsertPoint = function(o)
{
o.focus();
if(document.selection)
	{
	var r = document.selection.createRange()
	r.moveStart("character",-1)
	return r.text.charCodeAt(0)
	}
else
	{
	return o.value.charCodeAt(o.selectionStart-1)
	}
}

commonui.topicKeyHint.setCharAtInsertPoint = function(o,c)
{
o.focus();
if(document.selection)
	{
	var r = document.selection.createRange()
	r.moveStart("character",-1)
	r.text=c
	}
else
	{
	var r = o.selectionStart
	o.value=o.value.substring(0,r-1)+c+o.value.substr(r+1)
	o.selectionStart= o.selectionEnd = r
	}
}

commonui.topicKeyHint.loadData = function(e,o,fid)
{
if (typeof(this.hintC)!='object')this.hintC = document.getElementById(this.hintC)
if (!this.cache) this.cache={}
if (!this.cache[fid])
	{
	this.cache[fid]={}
	var self = this;
	httpDataGetter.script_muti_get(this.url,
		function(r){
			if (!r) return false;
			else
				{
				var date = new Date
				if ((date.getTime()/1000-r.time)>self.cacheTime){return false;}
				r = r.data;
				if (!r)
					{
					self.cache[fid]={}
					}
				else
					{
					self.cache[fid]=r
					self.hint(e,o,fid);
					}
				return true
				}
			},
		function(){},
		'gbk'
		);
	}
}

commonui.topicKeyHint.select=function(oo,nag)
{
if (oo.childNodes.length)
	{
	if (this.selectP==null)
		{
		if (nag)this.selectP=oo.childNodes.length-1
		else this.selectP=0
		}
	else
		{
		if (nag)
			{
			this.selectP--
			if ( this.selectP<0)
				{
				this.selectP=oo.childNodes.length-1
				}
			}
		else
			{
			this.selectP++
			if ( this.selectP>=oo.childNodes.length)
				{
				this.selectP=0
				}
			}
		}
	oo.childNodes[this.selectP].onmousedown();
	}
}
commonui.topicKeyHint.disableKey = function(e,o)
{
if (!e) e = window.event;
if(e.keyCode==38 || e.keyCode==40) 
	{
	e.returnValue=false;
	return false;
	}
}
commonui.topicKeyHint.hint=function(e,o)
{
if (!e) e = window.event;
if(e.keyCode==38) 
	{
	this.select(this.hintC,1)
	e.returnValue=false;
	return false;
	}
if(e.keyCode==40)
	{
	this.select(this.hintC,0)
	e.returnValue=false;
	return false;
	}
var p=this.getInsertPoint(o)
//替换括号
var c=this.charCodeAtInsertPoint(o)
if (c==12304)
	{
	c=91
	this.setCharAtInsertPoint(o,'[')
	}
else if (c==12305)
	{
	this.setCharAtInsertPoint(o,']')
	}
//load数据
if (c==91 && (!this.cache || !this.cache[this.cacheKey]))
	{
	this.loadData(e,o,this.cacheKey)
	}
//比较
this.match = null;
if(e.keyCode==37 || e.keyCode==39 || !e.keyCode)
	{
	return
	}
if (this.cache && this.cache[this.cacheKey])
	{
	this.match=o.value.substr(0,this.getInsertPoint(o)).match(/\[[^\[\]]+$/)
	if (this.match)
		{
		if(this.hintC.innerHTML)this.hintC.innerHTML='';
		this.selectP=null
		var j = 0;
		for (var k in this.cache[this.cacheKey])
			{
			if (this.cache[this.cacheKey][k].key.toLowerCase().indexOf(this.match[0].toLowerCase())!=-1)
				{
				j++;
				var self = this;
				var y = document.createElement('a');//需链接或按钮保证输入框不失去焦点
				y.href='javascript:void(0)'
				y.innerHTML = this.cache[this.cacheKey][k].key;
				y.onfocus = function(){this.blur();o.focus()}
				y.onmouseup = function(){return false}
				y.onmousedown = function(){
					o.focus();
					var x=self.match
					if(o.createTextRange)
						{
						if (x)
							{
							var r = o.createTextRange();
							r.moveStart('character',x.index);
							r.moveEnd('character',x.index+x[0].length);
							r.select();
							x=self.match=self.selectP=null;
							return false
							var r = o.createTextRange();
							r.moveStart('character',x.index);
							r.moveEnd('character',x.index+x[0].length);
							//var bak = o.value.substr(x.index+x[0].length)
							r.text=this.innerHTML
							r = o.createTextRange();
							r.moveStart('character',x.index);
							r.moveEnd('character',x.index+this.innerHTML.length);
							r.select();
							x=self.match=null;
							}
						else
							{
							var r =  document.selection.createRange();
							var bak = r.text.length//选中文字的长度
							r.moveStart("character",o.value.length*-1);
							var s = r.text.length-bak//选中文字的起始位置
							r = o.createTextRange();
							r.moveStart('character',s);
							var bak2 = r.text.substr(bak).length//选中文字后部文字的长度
							r.text=this.innerHTML+r.text.substr(bak)
							r = o.createTextRange();
							r.moveStart('character',s);
							r.moveEnd('character',-1*bak2)
							r.select();
							}
						}
					else
						{
						if (x)
							{
							o.value=o.value.substring(0,x.index)+this.innerHTML+o.value.substr(x.index+x[0].length);
							var bak=x.index;
							x=self.match=null;
							}
						else
							{
							var bak = o.selectionStart
							o.value=o.value.substring(0,o.selectionStart)+this.innerHTML+o.value.substr(o.selectionEnd);
							}
						o.setSelectionRange(bak,bak+this.innerHTML.length)
						}
					return false;
					}
				this.hintC.appendChild(y)
				}
			}
		if (this.hintC.innerHTML)
			{
			if (this.hintD)
				{
				if(typeof(this.hintD)!='object') this.hintD = document.getElementById(this.hintD)
				this.hintD.innerHTML='<span>上下键选择</span>'
				}
			}
		}
	}
}
//fe


/*
sample:

script>
commonui.topicKeyHint.hintC = $('xxx');
commonui.topicKeyHint.cacheKey = fid
commonui.topicKeyHint.cacheTime = 3600
commonui.topicKeyHint.url = Array("http://bbs.ngacn.cc/data/bbscache/bbs_topic_key/"+fid+'.js?'+date.getHour(),"http://bbs.ngacn.cc/nuke.php?func=loadtopickey&fid="+fid+'&time='+date.getHour())
/script>

<input type='text' onkeyup='commonui.topicKeyHint.hint(event,this)' onclick='commonui.topicKeyHint.hint(event,this)' onkeydown='commonui.topicKeyHint.disableKey(event,this)'/><div id='xxx'></div>


*/
