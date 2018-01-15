/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
bbs.sc2.cc 广告列表 v1.00
written by zeg 20051010
========================
*/
/* 总表 */
if(!window.ngaAds){
ngaAds = new Array;
ngaAds.objClone = function(obj){
	if(obj == null || typeof(obj) != 'object')return obj;
	var temp = new obj.constructor();
	for(var key in obj)temp[key] = this.objClone(obj[key]);
	return temp;
	}
}
/*--------------------*/


/* 半擎天柱组合1 论坛首页右上 190*400			bbs_ads2*/

function bbs_ads2_load()
{
if (ngaAds['bbs_ads2'] && checkindex())
	{
		put(ngaAds.genAds(ngaAds['bbs_ads2']));
	}
}
function bbs_ads2()
{
if (ngaAds['bbs_ads2'] && checkindex())
	{
	id2e('menu').style.marginRight = '210px';
	id2e('m_cate5').style.marginRight = '210px';
	id2e('m_stat_top').style.marginRight = '210px';
	id2e('adsc2').style.display = 'block';
	}
}

/* 半擎天柱组合1 论坛阅读帖子右（随机，根据内文长度而定） 190*400		bbs_ads8*/
var ads8notshow = true;
function bbs_ads8_load_new(o,index,fid)
{
var key = '';
if (ngaAds['bbs_ads8'] && index==0)
	key = 'bbs_ads8'
if (ngaAds['bbs_ads24'] && index==0)
	key = 'bbs_ads24'
if (ngaAds['bbs_ads21'] && index==1)
	key = 'bbs_ads21'
if (ngaAds['bbs_ads25'] && index==1)
	key = 'bbs_ads25'
if (ngaAds['bbs_ads17'] && index==2)
	key = 'bbs_ads17'
if (key)
	{
	if (typeof(ngaAds[key]['file'])=='object')
		{
		if (ngaAds[key]['file']['f'+fid])
			ngaAds[key]['file'] = ngaAds[key]['file']['f'+fid];
		else
			ngaAds[key]['file'] = ngaAds[key]['file']['default'];
		}
	o.innerHTML=ngaAds.genAds(ngaAds[key]);
	o.className = 'adsc5';
	}
}
function bbs_ads8_load(id,fid)
{
if (checkurl('/read.php'))
	{
	var key = '';
	if (ngaAds['bbs_ads8'] && id==0)
		key = 'bbs_ads8'
	if (ngaAds['bbs_ads24'] && id==0)
		key = 'bbs_ads24'
	if (ngaAds['bbs_ads21'] && id==1)
		key = 'bbs_ads21'
	if (ngaAds['bbs_ads25'] && id==1)
		key = 'bbs_ads25'
	if (ngaAds['bbs_ads17'] && id==2)
		key = 'bbs_ads17'
	if (key)
		{
		if (typeof(ngaAds[key]['file'])=='object')
			{
			if (ngaAds[key]['file']['f'+fid])
				ngaAds[key]['file'] = ngaAds[key]['file']['f'+fid];
			else
				ngaAds[key]['file'] = ngaAds[key]['file']['default'];
			}
		put(ngaAds.genAds(ngaAds[key]));
		ngaAds[key]['adsContainerId'] = id+1;
		}
	}
}
function bbs_ads8()
{
	function tmp(key)
		{
		id2e('postads'+(ngaAds[key]['adsContainerId']-1)).className = 'adsc5';
		}
if (checkurl('/read.php'))
	{
	if (ngaAds['bbs_ads24'] && ngaAds['bbs_ads24']['adsContainerId'])tmp('bbs_ads24');
	if (ngaAds['bbs_ads25'] && ngaAds['bbs_ads25']['adsContainerId'])tmp('bbs_ads25');
	if (ngaAds['bbs_ads8'] && ngaAds['bbs_ads8']['adsContainerId'])tmp('bbs_ads8');
	if (ngaAds['bbs_ads21'] && ngaAds['bbs_ads21']['adsContainerId'])tmp('bbs_ads21');
	if (ngaAds['bbs_ads17'] && ngaAds['bbs_ads17']['adsContainerId'])tmp('bbs_ads17');
	}
}

/*半擎天柱组合2 论坛首页左中 190*400			bbs_ads13*/


function bbs_ads13()
{
	function makespace()
	{
		id2e('m_cate2').style.marginLeft = '210px';
		if (id2e('m_cate2_title'))
			{
				id2e('m_cate2_title').style.marginLeft = '210px';
			}
	}
if (checkindex())
	{
	var key
	if (ngaAds['bbs_ads13'])
		key = 'bbs_ads13'
	if (ngaAds['bbs_ads25'])
		key = 'bbs_ads25'
	if (key)
		{
		makespace();
		id2e('adsc_cate_block2').innerHTML = ngaAds.genAds(ngaAds[key]);
		id2e('adsc_cate_block2').style.display = 'block';
		}
	}
}


/*论坛全页面上通栏 900×60		bbs_ads1*/


function bbs_ads1()
{
if (ngaAds['bbs_ads1'])
	{
		document.write ("ADVERTISEMENT<br/>");
		document.write (ngaAds.genAds(ngaAds['bbs_ads1']));
		if (ngaAds['bbs_ads1x'])
			{
				document.write ("<br style='height:10px;line-height:10px'/>");
				document.write (ngaAds.genAds(ngaAds['bbs_ads1x']));
			}
		id2e('adsc1').style.display='block';
	}
}

/*第二个论坛全页面上通栏 900×60		bbs_ads1x

/*论坛通栏组合A 论坛帖子列表页面（版面）中通栏 900*60		bbs_ads9 */
function bbs_ads9()
{
if (checkurl('/thread.php'))
	{
	if (ngaAds['bbs_ads9'])
		{
		document.write ("<thead><tr><th colspan='5' style='height:3px'></th></tr></thead><tbody><tr><td id='adsc9' colspan='5' class='adsc'>");
		document.write (ngaAds.genAds(ngaAds['bbs_ads9']));
		document.write ("</td></tr></tbody>");
		}
	if (ngaAds['bbs_ads23'])
		{
		bbs_ads23_chk();
		document.write ("<thead><tr><th colspan='5' style='height:3px'></th></tr></thead><tbody><tr><td id='adsc9' colspan='5' class='adsc'>");
		document.write (ngaAds.genAds(ngaAds['bbs_ads23']));
		document.write ("</td></tr></tbody>");
		}
	}
}


/*论坛通栏组合A 首贴下 900×60		bbs_ads10 */


function bbs_ads10(pos)
{
if(pos)return
if (checkurl('/read.php'))
	{
	if (ngaAds['bbs_ads10'])
		{
		document.write ("<div id='adsc10' class='adsc'>");
		document.write (ngaAds.genAds(ngaAds['bbs_ads10']));
		document.write ("</div>");
		}
	if (ngaAds['bbs_ads23'])
		{
		bbs_ads23_chk();
		document.write ("<div id='adsc10' class='adsc'>");
		document.write (ngaAds.genAds(ngaAds['bbs_ads23']));
		document.write ("</div>");
		}
	}
}
function bbs_ads10_new(o,index)
{
if(index==0)
	{
	if (ngaAds['bbs_ads10'])
		o.innerHTML = "<div id='adsc10' class='adsc'>"+ngaAds.genAds(ngaAds['bbs_ads10'])+"</div>";
	if (ngaAds['bbs_ads23'])
		{
		bbs_ads23_chk();
		o.innerHTML = "<div id='adsc10' class='adsc'>"+ngaAds.genAds(ngaAds['bbs_ads23'])+"</div>";
		}
	}
}


/*论坛通栏组合 论坛首页中通栏#1 900×60			bbs_ads11 */


function bbs_ads11()
{
if (ngaAds['bbs_ads11'])
	{
	document.write ("<div id='adsc11' class='adsc'>");
	document.write ("ADVERTISEMENT<br/>");
	document.write (ngaAds.genAds(ngaAds['bbs_ads11']));
	document.write ("</div>");
	}
if (ngaAds['bbs_ads23'])
	{
	bbs_ads23_chk();
	document.write ("<div id='adsc11' class='adsc'>");
	document.write ("ADVERTISEMENT<br/>");
	document.write (ngaAds.genAds(ngaAds['bbs_ads23']));
	document.write ("</div>");
	}
}

/*论坛下通栏			bbs_ads14*/

function bbs_ads14()
{
if (ngaAds['bbs_ads14'])
	{
		document.write ("<div class='adsc_cate' id='bbs_ads14' style='display:block'>");
		document.write ("<span class='xxtxt'>ADVERTISEMENT<br/></span><div>");
		document.write (ngaAds.genAds(ngaAds['bbs_ads14']));
		if (ngaAds['bbs_ads14_2'])
			{
			document.write (ngaAds.genAds(ngaAds['bbs_ads14_2']));
			}
		document.write ("</div><div class='clear'></div>");
		document.write ('</div>')
	}
}


/*论坛全页面中转			bbs_ads12*/


/*论坛贴内文字			bbs_ads15*/


function bbs_ads15(l)
{
if (ngaAds['bbs_ads15'] && l)
	{
		document.write ("<div class='postfloattxtads'>");
		document.write (ngaAds.genAds(ngaAds['bbs_ads15']));
		document.write ('</div>')
	}
}
function bbs_ads15_new(o)
{
if (ngaAds['bbs_ads15'])
	o.innerHTML = "<div class='postfloattxtads'>"+ngaAds.genAds(ngaAds['bbs_ads15'])+"</div>"
}

/*阅读帖子页面底部快速发帖右侧 190*400 bbs_ads22*/

/*半擎天柱组合A 论坛帖子列表页面（版面）底部快速发帖右侧 190*400 bbs_ads16*/
function bbs_ads16()
{
if (checkurl('/thread.php'))
	{
	if (ngaAds['bbs_ads24'])ngaAds['bbs_ads16']=ngaAds['bbs_ads24'];
	if (ngaAds['bbs_ads16'])
		var ad = ngaAds.genAds(ngaAds['bbs_ads16']);
	}
if (ngaAds['bbs_ads22'] && checkurl('/read.php'))
	{
	var ad = ngaAds.genAds(ngaAds['bbs_ads22']);
	}
if (ad)
	{
	var ad0 = ad.substr(0,3);
	var ad1 = ad.substr(ad.length-3,3);
	document.write ("<div class='adsc5'>");
	document.write (ad0+ad.substr(3,ad.length-6)+ad1);
	document.write ('</div>')
	}
}

/*可变通栏，位置同通栏组合A			bbs_ads23*/

function bbs_ads23_chk()
{
if (cookieFuncs.ifMiscCookie() && ngaAds['bbs_ads23']['filebig'])
	{
	var y =parseInt(cookieFuncs.getMiscCookie('pv_count_for_bbs_ads23'));
	if ((!y && y!=0) || y>3)
		{
		if (!y) y=0;
		ngaAds['bbs_ads23']['file'] = ngaAds['bbs_ads23']['filebig'];
		var x=cookieFuncs.getMiscCookie("bbs_ads23_views");
		if (x && x<3) x = parseInt(x)+1;
		else x=1;
		cookieFuncs.setMiscCookieInSecond("bbs_ads23_views",x,3600*24*1);
		y = 0-parseInt(x)*45;
		}
	cookieFuncs.setMiscCookieInSecond('pv_count_for_bbs_ads23',y+1,3600*24*1);
	}
}


/*半擎天柱组合A全体 优先级比分设高	bbs_ads24*/


/*25 擎天柱组合b*/


/*特殊广告加载*/
ngaAds['loadCustomAds']=function(arg){

}//fe