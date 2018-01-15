/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
广告列表生成 广告生成 通用程序 v1.01
written by zeg 2007/12/14
========================
*/

ngaAds.objClone = function(o){
if(o == null || typeof(o) != 'object')return o;
var oo = new o.constructor();
for(var k in o)oo[key] = this.objClone(o[key]);
return oo;
}

ngaAds.genadslist = function ()
{
var date = new Date;
var now = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
var nowtime = Date.parse(now);
var xxoo = date.getTime();
var rateSum = new Array;
var rnd = new Array;
var tempDate = null;
var tempShow = false;
var tempi = 0;
for (var k=0;k<this.length;k++)
	{
		//if(this[k]['file']=='http://market.178.com/fodder/201307/704bd41b54ddbb91f30154f931a26828.gif')
		//	continue
		if(this[k].ifShow && !this[k].ifShow())
			continue
		if (this[k]['id'] && this[k]['date'])
		{
			this[k]['date'] =  this[k]['date'].replace(/(^| |\/)0/g,'$1');
			tempShow = false;
			if (this[k]['date'] == 'all')
			{
				tempShow = true;
			}
			else
			{
				var ni = -1;
				var od;
				tempDate = this[k]['date']+' ';
				while (tempDate && ((ni = tempDate.indexOf(' ')) != -1) )
				{
					od = tempDate.substr(0,ni);
					tempDate = tempDate.substr(ni+1);
					if (od.length>11)
					{
						od = od.split('-');
						if (od[1])
							{
								if (nowtime>=Date.parse(od[0]) && nowtime<=Date.parse(od[1]))
									{
										tempShow = true;
										break;
									}
							}
					}
					else
					{
						if (now == od)
							{
								tempShow = true;
								break;
							}
					}
				}
			}
			if (tempShow)
			{
				if (!rateSum[this[k]['id']])
				{
					rateSum[this[k]['id']] = 0;
				}
				if (!rnd[this[k]['id']])
				{
					rnd[this[k]['id']] = Math.floor(Math.random()*100);
					//if (window.location.href.indexOf('debug')!=-1) document.title+=ads[k]['id']+':'+rnd[ads[k]['id']]+' ';
				}
				//if (!ads[k]['rate'])
				//{
				//	ads[k]['rate'] = 100;
				//}
				rateSum[this[k]['id']] = rateSum[this[k]['id']] + this[k]['rate'];
				if (rnd[this[k]['id']]<rateSum[this[k]['id']] && !this[this[k]['id']])
				{
					this[this[k]['id']] = this[k]
					this[this[k]['id']]['now'] = nowtime;
					rnd[this[k]['id']] = 1000;
					delete this[k]
				}
			}
		}
	}
}
//fe

//-------------------------------
ngaAds.loadAdditionalAds = function(u){
httpDataGetter.script_muti_get(
u,
function(ads){
	if (!ads)return false;
	if(!ads['id'] || !ads['date'] || ads['date'].length>100 || ngaAds[ads['id']])return false
	var date = new Date;
	date = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
	if (ads['date'].indexOf(date)!=-1)
		ngaAds[ads['id']] = ads
	return true;
	},
function(){
	},
	{'charset':'gbk','noCache':true}
);
}//fe

//-------------------------------
ngaAds.genadslist();//<-------------------
ngaAds.googleAD = new Array
ngaAds.googleADloop = 0
ngaAds.googleADnum = 0
ngaAds.objClone = function(o) {
var tmp = new Object
for (var k in o)
	{
	if (typeof(o[k])=='object')
		{
		tmp[k] = ngaAds.objClone(o[k])
		}
	else
		{
		tmp[k] = o[k]
		}
	}
return tmp
} 
//-------------------------------

ngaAds.genAdsCount = function (obj,u)
{
ngaAds['clickedlink'] = obj;
window.setTimeout("ngaAds.genAdsCountAct(ngaAds['clickedlink'],'"+u+"')",100)
}
//fe

ngaAds.genAdsCountAct = function (obj,u)
{
var x = document.createElement('iframe');
x.src = u;
x.style.display='none';
obj.parentNode.appendChild(x)
}
//fe

ngaAds.genAds = function (a)
{
	function cut(f)	{
		return f.replace(/^http:\/\/.+?\/misc\//i,'').replace(/\/|\./g,'_');
		}
var w = window
if(!w._ngaAdsObjList)w._ngaAdsObjList = {};
if (a.type=='js')
	{
		return "<scr"+"ipt type='text/javascr"+"ipt' src='"+a['file']+"'></scr"+"ipt>"
	}
	/*
else if (a.type=='alimama')
	{
		var sizecode='12';
		if (a['width'] == 950)
			sizecode='15';
		else if (a['width'] == 760)
			sizecode='11';
		alimama_pid=a['file']; 
		alimama_titlecolor="0000FF"; 
		alimama_descolor ="000000"; 
		alimama_bgcolor="444444"; 
		alimama_bordercolor="E6E6E6"; 
		alimama_linkcolor="008000"; 
		alimama_bottomcolor="FFFFFF"; 
		alimama_anglesize="0"; 
		alimama_bgpic="0"; 
		alimama_icon="0"; 
		alimama_sizecode=sizecode; 
		alimama_width=a['width']; 
		alimama_height=a['height']; 
		alimama_type=2;
		return "<scr"+"ipt type='text/javascr"+"ipt' src='http://a.alimama.cn/inf.js'></scr"+"ipt>"
	}*/
else if (a.type=='baidu' && a.cpro_id){
	/*
		if(!window.cproArray){
			window.cproArray=[]
			commonui.aE(window,'DOMContentLoaded',function(){loader.script("http://cpro.baidustatic.com/cpro/ui/c.js")})
			}
		cproArray.push({id:a.cpro_id})
		return "<span id='cpro_"+a.cpro_id+"' name='bbs_ads"+a.id+"'></span>"
		*/
		if(typeof window.BAIDU_CLB_fillSlotAsync=='undefined')
			loader.script("https://cpro.baidustatic.com/cpro/ui/c.js")
		var bid = a.cpro_id
		window.setTimeout(function(){
			if(window.BAIDU_CLB_fillSlotAsync)
				BAIDU_CLB_fillSlotAsync(bid,"baidu_"+bid);
			},window.BAIDU_CLB_fillSlotAsync?0:1000)
		return "<span id='baidu_"+a.cpro_id+"' name='bbs_ads"+a.id+"'></span>"
	}
else if (a.type=='taobao'){
		var id = a.file.match(/i=(mm_.+)$/)
		if(id){
			return "<div id='tanx-a-"+id[1]+"'></div><img src='about:blank' style='display:none' onerror='loader.script(\""+a.file+"\")'/>"
			}
		
	}
else if (a.type=='txt'){
		return a['file']
	}
else if (a.type=='iframe'){
		var id = a.id+'ImgObj'
		w._ngaAdsObjList[id] = a['file'];
		a['width'] = ' ;width:'+a['width']+'px ';
		a['height'] = ' ;height:'+a['height']+'px ';
		return "<ifr"+"ame style='margin:0px"+a['width']+a['height']+";overflow:hidden' scrolling='no' frameborder='0' src='"+a['file']+"' style='border:1px solid #000' id='"+id+"'></ifr"+"ame>";
	}
else
	{
		var id = a.id+'ImgObj'
		w._ngaAdsObjList[id] = a['file'];
		var log = '', img=''
		if (!a['nolog']){
			//log = " onclick='ngaAds.genAdsCount(this,\"http://old.ngacn.cc/clicklog/clicklog.php?id="+a['id']+"&time="+a['now']+"&from="+cut(a['file'])+"\");'"
			}
		if (typeof(a['file'])=='string' && a['file'].substr((a['file'].length-3),3) == 'swf')
		{
			if(w.__TOUCH && (w.__SETTING.bit & 4)){
				if(a['file2'])
					img = "<img id='"+id+"' src='"+a['file']+"' title='"+a['title']+"' style='border:1px solid #000000;"+a['width']+a['height']+"'"+log+"/>";
				else
					img = ''
				}
			else
				img = '<object id="'+id+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" style="background:#000" width="'+a['width']+'" height="'+a['height']+'"><param value="transparent" name="wmode"/><param name="movie" value="'+a['file']+'"/><embed wmode="transparent" src="'+a['file']+'" width="'+a['width']+'" height="'+a['height']+'"/></object>';
			if (a['url']){
				if (typeof(__COMMONIMG_PATH)=='undefined') __COMMONIMG_PATH = 'http://img4.ngacn.cc/common_res';
				img = "<a href='"+a['url']+"' style='display:block;width:"+a['width']+"px;height:"+a['height']+"px;margin:auto;text-align:right;overflow:hidden;line-height:0px;font-size:0px' target='_blank' title='"+a['title']+"'>"+img+"<img src='"+__COMMONIMG_PATH+"/_.gif' style='width:"+a['width']+"px;height:"+a['height']+"px;position:relative;top:-"+a['height']+"px;margin-bottom:-"+a['height']+"px'"+log+"/><img src='http://gg.stargame.com/images/mark.png' style='position:relative;top:-18px'></a>";
				}
			return img
		}
		else
		{
			if (a['file'])
				var img = "<img id='"+id+"' src='"+a['file']+"' title='"+a['title']+"' style='border:1px solid #000000;"+(a['width']?' ;width:'+a['width']+'px ':'')+(a['height']?' ;height:'+a['height']+'px ':'')+"'"+log+"/><img src='http://gg.stargame.com/images/mark.png' style='margin-left:-48px'>";
			else
				var img = a['title']
			if (a['url'])
				img = "<a href='"+a['url']+"' target='_blank' title='"+a['title']+"'>"+img+"</a>";
			
			return img;
		}
	}
}
//fe

ngaAds.applyGoogleAD =function ()
{
if (this.googleADnum)
	{
	var f = document.getElementsByTagName('iframe')
	for (var i=0; i<f.length; i++)
		{
		if (f[i].name=='google_ads_frame')
			{
			if (f[i].parentNode.getAttribute('adscontainerid'))
				{
				id2e(f[i].parentNode.getAttribute('adscontainerid')).appendChild(f[i]);
				}
			else if (f[i].previousSibling.previousSibling.getAttribute('adscontainerid'))
				{
				id2e(f[i].previousSibling.previousSibling.getAttribute('adscontainerid')).appendChild(f[i]);
				}
			}
		else if (f[i].src.toLowerCase().indexOf('http://cpro.baidu.com/')!=-1)
			{
			//window.alert(f[i].contentWindow.document.body.innerHTML)
			if (f[i].parentNode.getAttribute('adscontainerid'))
				{
				id2e(f[i].parentNode.getAttribute('adscontainerid')).appendChild(f[i]);
				}
			else if (f[i].previousSibling.previousSibling.getAttribute('adscontainerid'))
				{
				id2e(f[i].previousSibling.previousSibling.getAttribute('adscontainerid')).appendChild(f[i]);
				}
			}
		}
	if (f.length<this.googleADnum && this.googleADloop<100)
		{
		this.googleADloop ++
		window.setTimeout(ngaAds.applyGoogleAD,200);
		}
	}
}
//fe

ngaAds.loadOneGoogleAD=function ()
{
if (this.googleAD.length)
	{
	if (!this.googleADnum)
		{
		this.googleADnum = this.googleAD.length
		}

	var g = this.googleAD.shift();
	if (g)
		{
		for (var k in g['args'])
			{
			window[k] = g['args'][k]
			}
		document.write ("<div style='display:none' name='cgfvyhjvf' adscontainerid='"+g['ads_container_id']+"'>");
		document.write ("<sc"+"ript type='text/javasc"+"ript' src='"+g['file']+"'></sc"+"ript>");
		document.write ("</div>");
		}


	}
}
//fe

ngaAds.loadAdditional=function (s,c){
if(!c)c='gbk'
var date = new Date
var self = this
var f=function(r){
	if (!r) return false;
	if(self[r.id] || r.date.length>30)return true
	var now = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
	if (r.date.indexOf(now)!=-1)
		self[r.id] = self.objClone(r)
	return true
	}
if(typeof(s)=='object')return f(s)
httpDataGetter.script_muti_get(s+'?'+Math.floor(date.getTime()/86400),f,function(){},c);
}//fe