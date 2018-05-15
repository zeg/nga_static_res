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

ngaAds.genadslist = function ()
{
var date = new Date;
var now = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
var nowtime = Date.parse(now);
var rateSum = new Array;
var rnd = new Array;
var tempDate = null;
var tempShow = false;
for (var k=0;k<this.length;k++)
	{
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
ngaAds.genadslist();//<-------------------

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
if (a.type=='js')
	return "<scr"+"ipt type='text/javascr"+"ipt' src='"+a.file+"'></scr"+"ipt>"
else if (a.type=='baidu' && a.cpro_id){
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
	return "<span style='"+(a.style?a.style:'')+"'>"+a.file+"</span>"
	}
else{
	var tp = (''+a.file).match(/\.(jpg|jpeg|png|bmp|gif|swf)$/), img='', log='', ic="<img src='http://gg.stargame.com/images/mark.png' style='margin-left:-48px'>"
	,ww = a.width|0 ? (a.width|0)+'px' : 'auto',hh = a.height|0 ? (a.height|0)+'px' : 'auto'
	if(tp && tp[1]=='swf'){
		img = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" style="background:#000" width="'+a.width+'" height="'+a.height+'" style="'+(a.style?a.style:'')+'" onload="'+(a.onload?'ngaAds[\''+a.id+'\'].onload.apply(this)':'')+'"><param value="transparent" name="wmode"/><param name="movie" value="'+a.file+'"/><embed wmode="transparent" src="'+a.file+'" width="'+a.width+'" height="'+a.height+'"/></object>';
		if (a.url)
			img = "<a href='"+a.url+"' style='display:block;width:"+ww+";height:"+hh+"px;margin:auto;text-align:right;overflow:hidden;line-height:0px;font-size:0px;"+(a.style?a.style:'')+"'' target='_blank' title='"+a.title+"'>"+img+"<div style='width:100%;100%;position:relative;top:-100%;margin-bottom:-100%'"+log+"/>"+ic+"</a>";
		return img
		}
	else if(tp){
		img = "<img src='"+a.file+"' title='"+a.title+"' style='border:1px solid #000000;"+(ww?' ;width:'+ww:'')+(hh?' ;height:'+hh:'')+"'"+log+" onload='"+(a.onload?'ngaAds["'+a.id+'"].onload.apply(this)':'')+"'/>";
		if (a.url)
			img = "<a href='"+a.url+"' target='_blank' title='"+a.title+"' style='text-align:right;"+(a.style?a.style:'')+"'>"+img+ic+"</a>";
		return img;
		}
	else{
		var rr=''
		if(a.url){
			var rd = 'ifrds_'+a.id+'_'+Math.floor(Math.random()*10000)
			if(!window[rd]){
				window[rd]={
					url:a.url,
					over:false,
					mouseenter : function(o){
						this.over = true
						setTimeout(function () {
							window.focus();
							this.over = false;
							}, 100)
						},
					mouseout : function(o){
						this.over = false
						}
					}
				commonui.aE(window,'blur',function(){//window blur when click iframe
					if(window[rd].over){
						var img1 = document.createElement('img');
						img1.src = window[rd].url
						img1.style.width = img1.style.height = "1px"
						img1.style.display = 'none'
						document.body.appendChild(img1)
						}
					})
				}
			rr = " onmouseenter='window[\""+rd+"\"].mouseenter(this)'  onmouseout='window[\""+rd+"\"].mouseout(this)' "
			}
		return "<ifr"+"ame style='margin:0px;width:"+ww+";height:"+hh+";overflow:hidden;"+(a.style?a.style:'')+"' scrolling='no' frameborder='0' src='"+a.file+"' style='border:1px solid #000' onload='"+(a.onload?'ngaAds["'+a.id+'"].onload.apply(this)':'')+"' "+rr+"></ifr"+"ame>";
		}

	}
}
//fe
