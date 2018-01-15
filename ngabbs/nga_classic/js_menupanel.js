//--------------------------
//menu panel----------
//--------------------------



commonui.showMenuPanelPanels = {
'atlas':{'info':'提供游戏中各种常用数据的查询',
		'name':'魔兽世界数据速查',
		'link':'http://atlas.ngacn.cc',
		'img':__IMG_STYLE+'/menupanel/atlas.png'},
'talent':{'name':'WLK天赋模拟器','info':'规划你的魔兽人生','link':'http://ngacn.cc/tftw/','img':__IMG_STYLE+'/menupanel/talent.png'},
'wmo':{'name':'魔兽战斗数据分析','info':'详尽无余，勥党必备','link':'http://wmo.ngacn.cc','img':__IMG_STYLE+'/menupanel/wmo.png'},
'wiki':{'name':'魔兽世界中文WIKI','info':'魔兽世界中文WIKI','link':'http://wiki.ngacn.cc','img':__IMG_STYLE+'/menupanel/wiki.png'}

}

commonui.showMenuPanelSwitch = function(o)
{

var z = o.parentNode;
for (var k=0;k<z.childNodes.length;k++)
	{
	if (z.childNodes[k].nodeType==3)
		z.removeChild(z.childNodes[k]);
	if (z.childNodes[k] && z.childNodes[k].nodeType==1 && z.childNodes[k]!=o && z.childNodes[k].nodeName!='SCRIPT' )
		{
		if (!z.childNodes[k].style)
			z.childNodes[k].style = new Object;
		if (z.childNodes[k].style.display)
			{
			if (z.childNodes[k].style.display!='none')
				z.childNodes[k].style.display='none';
			else
				z.childNodes[k].style.display='';
			}
		else
			z.childNodes[k].style.display='none';
		}
	}
}

commonui.showMenuPanelInit = function(c,f,show)
{
f();
if (typeof(c)=='string') c=document.getElementById(c);
c.style.height='430px';
c.insertBefore(this.showMenuPanel(),c.firstChild)
var x = document.createElement('a')
var self = this;
x.href='javascript:void(0)'
x.className = 'rightMenuPanelSwitch'
x.onclick =function() {self.showMenuPanelSwitch(this)}
c.insertBefore(x,c.firstChild)
if (show)
	{
	this.showMenuPanelSwitch(x);
	}
}

commonui.showMenuPanel = function()
{
var x = document.createElement('div');
x.className='rightMenuPanel'
x.style.display = 'none'
x.id = 'menuPanel';
var y = '';
if (!this.showMenuPanelPanelsSave)
	{
	this.showMenuPanelPanelsSave = cookieFuncs.getMiscCookie('showMenuPanelPanelsSave');
	if (this.showMenuPanelPanelsSave)
		this.showMenuPanelPanelsSave=this.showMenuPanelPanelsSave.split("\t");
	}
if (!this.showMenuPanelPanelsSave)
	{
	this.showMenuPanelPanelsSave = new Array;
	}
var u = new Object;
for (var k =0; k< this.showMenuPanelPanelsSave.length; k++)
	{
	if (this.showMenuPanelPanels[this.showMenuPanelPanelsSave[k]])
		{
		y+=this.showMenuPanelSub(k,this.showMenuPanelPanels[this.showMenuPanelPanelsSave[k]]);
		u[this.showMenuPanelPanelsSave[k]]=1;
		}
	}

for (var k in this.showMenuPanelPanels)
	{
	if (!u[k])
		{
		if (this.showMenuPanelPanels[k]['top'])
			{
			y=this.showMenuPanelSub(k,this.showMenuPanelPanels[k])+y;
			}
		else
			{
			y+=this.showMenuPanelSub(k,this.showMenuPanelPanels[k]);
			}
		}
	}
x.innerHTML = y;
this.showMenuPanelPanelscrollTop = x.scrollTop
var self = this;
x.onmousewheel =x.DOMMouseScroll= function(e){
	if (!e) e= window.event
	var direct = 0; 
	if (e.wheelDelta) direct = e.wheelDelta > 0 ? 1 : -1;
	else if (e.detail) direct = e.detail < 0 ? 1 : -1;
	if (direct==1 && this.scrollTop<100) {this.scrollTop=0;return false}
	else if (direct==-1 && (this.scrollHeight-this.offsetHeight)-this.scrollTop<100) {this.scrollTop=this.scrollHeight-this.offsetHeight;return false}
	}
return x;
}

commonui.showMenuPanelSub = function(k,l)
{
return "<div id='menuPanelItem_"+k+"' class='item'> &nbsp;<a href='"+l['link']+"' title='"+l['info']+"' target='blank'><img src='"+l['img']+"'/><br/>"+l['name']+"</a><br/><a href='javascript:void(0)' onclick='commonui.showMenuPanel_ItemUp(this.parentNode)' title='将此项提至菜单最顶端'><b style='font-size:80%'>&and;&and;&and;</b></a></div>"
}

commonui.showMenuPanel_ItemUp = function(o)
{
var kk = o.id.substr(14);
for (var k in this.showMenuPanelPanelsSave)
	{
	if (this.showMenuPanelPanelsSave[k]==kk)
		{
		delete this.showMenuPanelPanelsSave[k];
		}
	}
this.showMenuPanelPanelsSave.unshift(kk);
cookieFuncs.setMiscCookieInSecond('showMenuPanelPanelsSave',this.showMenuPanelPanelsSave.join("\t"),3600*24*90);
var x = o.cloneNode(true);
var p = o.parentNode;
p.removeChild(o);
p.insertBefore(x,p.firstChild);
}