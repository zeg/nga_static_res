/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
tootip v3
written by zeg 20130403
========================
*/


var tTip = {
cruent:null,
showing:0,
canmove:1,
position:window.__NUKE.position,
w:window,

init:function(){},//fe

showdscp:function (e,o){
if (!o)
	return
if (typeof(o)=='string')
	o = this.w.document.getElementById(o);

this.cruent = o;
var p = this.position.get(e)
o.style.maxWidth = p.cw-26+'px'
o.style.visibility='hidden';
o.style.display = 'block';
this.setpos(o, e, p);
o.style.visibility='visible';
this.showing = 1;
this.canmove = 1;
},//fe

setpos:function (o,e,p){
if (!e)
	e = this.w.event;

if(!p)
	p = this.position.get(e)

var xf , yf , ow =(o.offsetWidth?o.offsetWidth:0) , oh = (o.offsetHeight?o.offsetHeight:0), sp =5

if(p.cw-p.x-ow>sp*2)//right
	xf=sp
else//left
	xf = p.cw-p.x-ow-sp

if(p.ch-p.y-oh>sp*2)//down
	yf=sp
else//up
	yf = p.ch-p.y-oh-sp

xf = p.x + p.xf + xf
if(xf<0)
	xf = sp

yf = p.y + p.yf + yf
if(yf<0)
	yf = sp

o.style.left = xf+'px';
o.style.top = yf+'px';

},//fe


movedscp:function (e,o){
if (this.showing == 0  || this.canmove == 0 || !o)
	return;
if (typeof(o)=='string')
	o = this.w.document.getElementById(o);
this.setpos(o, e);
},//fe

hidedscp:function(e,o){
if (this.canmove == 0 || !o)
	return;
if (typeof(o)=='string')
	o = this.w.document.getElementById(o);
this.showing = 0;

if (this.delayShow){
	window.clearTimeout(this.delayShow);
	this.delayShow = null;
	}
this.cruent = null;
o.style.display = 'none';
o.style.top = 0 +'px';
o.style.left = 0 +'px';
},//fe


delay_showdscp:function(e,o,delay)
{
if (!o)
	return
if (typeof(o)=='string')
	o = this.w.document.getElementById(o);
this.showingdscp = 1;
var self = this
this.delayShow = this.w.setTimeout(function(){self.showdscp(e,o)},delay);
}//fe


}//ce


function showdscp(e,o){
tTip.showdscp(e,o)
}
//fe
function movedscp(e,o){
tTip.movedscp(e,o)
}
//fe
function hidedscp(e,o){
tTip.hinddscp(e,o)
}
//fe
function delay_showdscp(e,o,delay){
tTip.delay_showdscp(e,o,delay)
}
//fe




