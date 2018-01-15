var dragNDrop = {}

dragNDrop.mousex = 0;
dragNDrop.mousey = 0;
dragNDrop.grabx = 0;
dragNDrop.graby = 0;
dragNDrop.orix = 0;
dragNDrop.oriy = 0;
dragNDrop.elex = 0;
dragNDrop.eley = 0;
dragNDrop.objs = new Array;
dragNDrop.savePos = {};
dragNDrop.dragobj = null;

dragNDrop.ae=function(obj,evt,fn) {
	if (obj.addEventListener)
		obj.addEventListener(evt,function(event,obj){fn(event,this)},false);//
	else if (obj.attachEvent)
		{
		var self = obj;
		obj.attachEvent('on'+evt,function(event,obj){fn(event,self)});
		}
}

dragNDrop.getMouseXY=function(e)
{ 
if (!e) e = window.event;
if (e)
	{ 
	if (e.clientX || e.clientY)
		{
		if (typeof window.pageYOffset != 'undefined')
			{
			var xf = window.pageXOffset;
			var yf = window.pageYOffset;
			}
		else
			{
			var xf = document.body.scrollLeft;
			var yf = document.body.scrollTop;
			}
		this.mousex = e.clientX + xf;
		this.mousey = e.clientY + yf;
		}  
	}
}//fe

dragNDrop.update=function(e)
{
this.getMouseXY(e);
}//fe

dragNDrop.grab=function(e,o)
{
if (!e) var e = window.event;
e.cancelBubble = true;
if (e.stopPropagation) e.stopPropagation();
this.getMouseXY(e);
document.onselectstart = document.onmousedown = function(){return false}; // in NS this prevents cascading of events, thus disabling text selection
this.dragobj = o;
this.moveToTop(o);
var self=this;
document.onmousemove = function(event){self.drag(event)};
document.onmouseup = function(event){self.drop(event)};
this.grabx = this.mousex;
this.graby = this.mousey;
this.elex = this.orix = this.dragobj.offsetLeft;
this.eley = this.oriy = this.dragobj.offsetTop;
return false;
}

dragNDrop.moveToTop=function(o)
{
var x=false;
for (var i=0;i<this.objs.length;i++)
	{
	if (this.objs[i].o==o)
		{
		delete this.objs[i];
		x=true
		}
	if (x)
		{
		if (i+1==this.objs.length)
			this.objs[i] = {'z':-1,'o':o}
		else
			this.objs[i] = this.objs[i+1];
		}
	if (i+1!=this.objs[i].z)
		{
		this.objs[i].o.style.zIndex = this.objs[i].z = i+1
		this.saveCookie(this.objs[i].o)
		}
	}
}

dragNDrop.drag=function(e)
{
if (this.dragobj)
	{
	this.elex = this.orix + (this.mousex-this.grabx);
	this.eley = this.oriy + (this.mousey-this.graby);
	this.dragobj.style.position = "absolute";
	this.dragobj.style.left = (this.elex).toString(10) + 'px';
	this.dragobj.style.top  = (this.eley).toString(10) + 'px';
	}
this.getMouseXY(e);
return false; // in IE this prevents cascading of events, thus text selection is disabled
}

dragNDrop.drop=function()
{
if (this.dragobj)
	{
	this.saveCookie(this.dragobj)
	this.dragobj = null;
	}
document.onmouseout=document.onmouseup = null;
document.onselectstart = document.onmousedown = null;   // re-enables text selection on NS
document.onmousemove = null;
}

dragNDrop.saveCookie=function(o){
if (cookieFuncs && o && this.savePos[o.id])
	cookieFuncs.setMiscCookieInSecond('dragNDropP_'+o.id,o.offsetLeft+','+o.offsetTop+','+o.style.zIndex,3600*24*30);
}//fe

dragNDrop.initObj=function(o,savepos)
{
if (cookieFuncs && o.id)
	{
	var pos = cookieFuncs.getMiscCookie('dragNDropP_'+o.id);
	if (pos)
		{
		pos = pos.split(',');
		o.style.left = pos[0].toString(10) + 'px';
		o.style.top  = pos[1].toString(10) + 'px';
		if(pos[2])this.objs.push({'z':pos[2],'o':o})
		o.style.zIndex=pos[2]
		this.objs.sort(function(x,y){return x.z-y.z})
		}
	}
if (savepos && o.id)
	this.savePos[o.id]=1;
if (!pos || !pos[2])
	{
	this.objs.push({'z':0,'o':o})
	o.style.zIndex=0
	}
}

dragNDrop.bodyGrab=function(e,o)
{
if (!e) var e = window.event;
e.cancelBubble = true;
if (e.stopPropagation) e.stopPropagation();
this.getMouseXY(e);
this.grabx = this.mousex;
this.graby = this.mousey;
var self=this
document.onselectstart = document.onmousedown = function(){return false};
document.onmousemove = function(event){self.bodyDrag(event)};
document.onmouseout= function(event){
	if (!event) var event = window.event;
	var r = event.relatedTarget || event.toElement;
	if (r==null)self.drop(event);
	}//fe
document.onmouseup = function(event){self.drop(event)};
}

dragNDrop.bodyDrag=function(e){

this.getMouseXY(e);
if (document.documentElement.clientHeight || document.documentElement.clientWidth){
	var tmp = document.documentElement
	}
else{
	var tmp = document.body
}
tmp.scrollTop+=this.graby-this.mousey;
tmp.scrollLeft+=this.grabx-this.mousex;
}//fe