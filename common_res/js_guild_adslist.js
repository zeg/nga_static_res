/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
bbs.ngacn.cc 广告列表 v1.00
written by zeg 20051010
========================

bbs_ads1 论坛全页面顶部通栏 900*60
bbs_ads1x 论坛全页面顶部通栏第二个

bbs_ads2 半擎天柱组合A 论坛首页右上 190*400
bbs_ads8 半擎天柱组合A 论坛阅读帖子页面（看帖）第一贴右侧190*400
bbs_ads16 半擎天柱组合A 论坛帖子列表页面（版面）底部快速发帖右侧 190*400

bbs_ads17 半擎天柱组合B 论坛阅读帖子页面（看帖）第二贴右侧190*400
bbs_ads13 半擎天柱组合B 论坛首页左中190*400

bbs_ads9 通栏组合A 论坛帖子列表页面（版面）中通栏 900*60
bbs_ads10 通栏组合A 论坛阅读帖子页面（看帖）第一贴下通栏 900*60
bbs_ads11 通栏组合A 论坛首页中通栏#1 900×60

bbs_ads14 通栏组合B 论坛全页面下通栏 900×60

bbs_ads12 论坛全页面中转 600*360

bbs_ads15 论坛阅读帖子页面（看帖）文字广告

*/

var fAds = new Array;
var j = 0;
/*插件区*/
fAds[j] = new Array;
fAds[j]['file'] = __IMG_BASE+'/misc/self/f/f1.jpg';
fAds[j]['url'] = '/thread.php?fid=200';
j++;
/*作家*/
fAds[j] = new Array;
fAds[j]['file'] = __IMG_BASE+'/misc/self/f/f2.jpg';
fAds[j]['url'] = '/thread.php?fid=102';
j++;
/*圣光*/
fAds[j] = new Array;
fAds[j]['file'] = new Array(
__IMG_BASE+'/misc/self/f/f184a.jpg',
__IMG_BASE+'/misc/self/f/f3.jpg');
fAds[j]['url'] = '/thread.php?fid=184';
j++;
/*魔法*/
fAds[j] = new Array;
fAds[j]['file'] = __IMG_BASE+'/misc/self/f/f4.jpg';
fAds[j]['url'] = '/thread.php?fid=182';
j++;
/*猎手*/
fAds[j] = new Array;
fAds[j]['file'] = new Array(
__IMG_BASE+'/misc/self/f/f187a.jpg',
__IMG_BASE+'/misc/self/f/f5.jpg');
fAds[j]['url'] = '/thread.php?fid=187';
j++;
/*牧师*/
fAds[j] = new Array;
fAds[j]['file'] = __IMG_BASE+'/misc/self/f/f6.jpg';
fAds[j]['url'] = '/thread.php?fid=183';
j++;
/*术士*/
fAds[j] = new Array;
fAds[j]['file'] = __IMG_BASE+'/misc/self/f/f7.jpg';
fAds[j]['url'] = '/thread.php?fid=188';
j++;
/*der*/
fAds[j] = new Array;
fAds[j]['file'] = __IMG_BASE+'/misc/self/f/f8.jpg';
fAds[j]['url'] = '/thread.php?fid=186';
j++;
/*地精*/
fAds[j] = new Array;
fAds[j]['file'] = __IMG_BASE+'/misc/self/f/f9.jpg';
fAds[j]['url'] = '/thread.php?fid=191';
j++;
/*竞技*/
fAds[j] = new Array;
fAds[j]['file'] = __IMG_BASE+'/misc/self/f/f10.jpg';
fAds[j]['url'] = '/thread.php?fid=272';
j++;
/*战士*/
fAds[j] = new Array;
fAds[j]['file'] = new Array(
__IMG_BASE+'/misc/self/f/f12.jpg',
__IMG_BASE+'/misc/self/f/f181a.jpg');
fAds[j]['url'] = '/thread.php?fid=181';
j++;
/*萨满*/
fAds[j] = new Array;
fAds[j]['file'] = __IMG_BASE+'/misc/self/f/f185.jpg';
fAds[j]['url'] = '/thread.php?fid=185';
j++;
/*贼*/
fAds[j] = new Array;
fAds[j]['file'] = new Array(
__IMG_BASE+'/misc/self/f/f189a.jpg',
__IMG_BASE+'/misc/self/f/f189.jpg');
fAds[j]['url'] = '/thread.php?fid=189';
j++;
/*任务*/
fAds[j] = new Array;
fAds[j]['file'] = __IMG_BASE+'/misc/self/f/f11.jpg';
fAds[j]['url'] = '/thread.php?fid=190';

j = Math.floor(Math.random()*(j+1));
if (typeof(fAds[j]['file'])=='object')
	{
		fAds[j]['file'] = fAds[j]['file'][ Math.floor(Math.random()*fAds[j]['file'].length)]
	}

/*--------------------*/
var googleAD = new Array;
var ngaAds = new Array;
var i = 0;

/* 半擎天柱组合A 论坛首页右上 190*400			bbs_ads2*/

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads2';
ngaAds[i]['file'] = __IMG_BASE+'/misc/self/090120.jpg';
ngaAds[i]['url'] = 'http://bbs.ngacn.cc/read.php?tid=2148616&fpage=1';
ngaAds[i]['width'] = 190;
ngaAds[i]['height'] = 400;
ngaAds[i]['type'] = '';
ngaAds[i]['date'] = '1/20/2009-2/1/2009';
ngaAds[i]['rate'] = 80;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads2';										/*广告位ID*/
ngaAds[i]['file'] = __IMG_BASE+'/misc/self/20060830.jpg';		/*文件 图片或flash*/
ngaAds[i]['url'] = '';												/*链接地址 flash不必填写*/
ngaAds[i]['title'] = '提高防范意识，保护帐号安全';				/*图片说明 flash不必填写*/
ngaAds[i]['width'] = '';											/*宽度 图片不必填写*/
ngaAds[i]['height'] = '';											/*高度 图片不必填写*/
ngaAds[i]['date'] = 'all';											/*日期(留空不显示此条广告) 比如 2/15/2006 7/1/2006-7/31/2006 8/1/2006-8/31/2006 意为在2月15日和7月与8月显示 如填all则为一直显示*/
ngaAds[i]['rate'] = 4;											/*显示的几率（百分比），同一个广告位的所有广告显示几率相加应不超过100*/
ngaAds[i]['nolog'] = 1;					/* 不记录点击 */
i++;


function bbs_ads2_load()
{
if (ngaAds['bbs_ads2'] && checkindex() && window.location.href.indexOf('/g/')==-1)
	{
		put(ngaAds.genAds(ngaAds['bbs_ads2']));
	}
}
function bbs_ads2()
{
if (ngaAds['bbs_ads2'] && checkindex() && window.location.href.indexOf('/g/')==-1)
	{
	id2e('menu').style.marginRight = '210px';
	id2e('m_cate5').style.marginRight = '210px';
	id2e('m_stat_top').style.marginRight = '210px';
	id2e('adsc2').style.display = 'block';
	}
}

/* 半擎天柱组合A 论坛阅读帖子页面（看帖）第一贴右侧190*400		bbs_ads8*/

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads8';
ngaAds[i]['file'] = __IMG_BASE+'/misc/self/090120.jpg';
ngaAds[i]['url'] = 'http://bbs.ngacn.cc/read.php?tid=2148616&fpage=1';
ngaAds[i]['width'] = 190;
ngaAds[i]['height'] = 400;
ngaAds[i]['type'] = '';
ngaAds[i]['date'] = '1/20/2009-2/1/2009';
ngaAds[i]['rate'] = 80;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads8';
ngaAds[i]['file'] = __IMG_BASE+'/misc/self/20081209.jpg';
ngaAds[i]['url'] = 'http://www.ngacn.cc/t_wlk/';
ngaAds[i]['date'] = 'all';
ngaAds[i]['rate'] = 40;
ngaAds[i]['nolog'] = 1;
i++;

/* 半擎天柱组合B 论坛阅读帖子页面（看帖）第二贴右侧190*400		bbs_ads17*/

//版面
ngaAds[i] = new Array;
ngaAds[i]['file'] = fAds[j]['file'];
ngaAds[i]['url'] = fAds[j]['url'];
ngaAds[i]['id'] = 'bbs_ads17';
ngaAds[i]['date'] = 'all';
ngaAds[i]['rate'] = 30;
ngaAds[i]['nolog'] = 1;
i++;

//self
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads17';
ngaAds[i]['file'] = __IMG_BASE+'/misc/self/20060830.jpg';
ngaAds[i]['title'] = '提高防范意识，保护帐号安全';
ngaAds[i]['date'] = 'all';
ngaAds[i]['rate'] = 4;
ngaAds[i]['nolog'] = 1;
i++;

//self
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads17';
ngaAds[i]['file'] = __IMG_BASE+'/misc/self/20070728b.png';
ngaAds[i]['date'] = 'all';
ngaAds[i]['rate'] = 2;
ngaAds[i]['nolog'] = 1;
i++;

//self
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads17';
ngaAds[i]['file'] = __IMG_BASE+'/misc/self/20060829.jpg';
ngaAds[i]['title'] = '停止购买金币，让盗号无利可图';
ngaAds[i]['date'] = 'all';
ngaAds[i]['rate'] = 4;
ngaAds[i]['nolog'] = 1;
i++;

//self
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads17';
ngaAds[i]['file'] = __IMG_BASE+'/misc/self/20081209a.jpg';
ngaAds[i]['url'] = 'http://atlas.ngacn.cc';
ngaAds[i]['date'] = 'all';
ngaAds[i]['rate'] = 25;
ngaAds[i]['nolog'] = 1;
i++;

//self
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads17';
ngaAds[i]['file'] = __IMG_BASE+'/misc/self/sc20080407.jpg';
ngaAds[i]['url'] = 'http://bbs.sc2.cc';
ngaAds[i]['date'] = 'all';
ngaAds[i]['rate'] = 5;
ngaAds[i]['nolog'] = 1;
i++;

var ads8notshow = true;
function bbs_ads8_load(id)
{
if (ngaAds['bbs_ads8'] && id==0 && checkurl('/read.php'))
	{
		ngaAds['bbs_ads8']['ads8show'] = id+1;
		put(ngaAds.genAds(ngaAds['bbs_ads8']));
	}
if (ngaAds['bbs_ads17'] && id==1 && checkurl('/read.php'))
	{
		ngaAds['bbs_ads17']['ads17show'] = id+1;
		put(ngaAds.genAds(ngaAds['bbs_ads17']));
	}
}
function bbs_ads8()
{
if (ngaAds['bbs_ads8'] && ngaAds['bbs_ads8']['ads8show'] && checkurl('/read.php'))
	{
		id2e('postads'+(ngaAds['bbs_ads8']['ads8show']-1)).className = 'adsc5';
	}
if (ngaAds['bbs_ads17'] && ngaAds['bbs_ads17']['ads17show'] && checkurl('/read.php'))
	{
		id2e('postads'+(ngaAds['bbs_ads17']['ads17show']-1)).className = 'adsc5';
	}
}


/*半擎天柱组合B 论坛首页左中190*400*/

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads13';										/*广告位ID*/
ngaAds[i]['file'] = __IMG_BASE+'/misc/self/20060830.jpg';		/*文件 图片或flash*/
ngaAds[i]['url'] = '';												/*链接地址 flash不必填写*/
ngaAds[i]['title'] = '提高防范意识，保护帐号安全';				/*图片说明 flash不必填写*/
ngaAds[i]['width'] = '';											/*宽度 图片不必填写*/
ngaAds[i]['height'] = '';											/*高度 图片不必填写*/
ngaAds[i]['date'] = 'all';											/*日期(留空不显示此条广告) 比如 2/15/2006 7/1/2006-7/31/2006 8/1/2006-8/31/2006 意为在2月15日和7月与8月显示 如填all则为一直显示*/
ngaAds[i]['rate'] = 4;											/*显示的几率（百分比），同一个广告位的所有广告显示几率相加应不超过100*/
ngaAds[i]['nolog'] = 1;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads13';
ngaAds[i]['file'] = __IMG_BASE+'/misc/self/20060829.jpg';
ngaAds[i]['title'] = '停止购买金币，让盗号无利可图';
ngaAds[i]['date'] = 'all';
ngaAds[i]['rate'] = 4;
ngaAds[i]['nolog'] = 1;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads13';
ngaAds[i]['file'] = __IMG_BASE+'/misc/self/20070728b.png';
ngaAds[i]['date'] = 'all';
ngaAds[i]['rate'] = 2;
ngaAds[i]['nolog'] = 1;
i++;

//版面
ngaAds[i] = new Array;
ngaAds[i]['file'] = fAds[j]['file'];
ngaAds[i]['url'] = fAds[j]['url'];
ngaAds[i]['id'] = 'bbs_ads13';
ngaAds[i]['date'] = 'all';
ngaAds[i]['rate'] = 30;
ngaAds[i]['nolog'] = 1;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads13';
ngaAds[i]['file'] = __IMG_BASE+'/misc/self/20081209a.jpg';
ngaAds[i]['url'] = 'http://atlas.ngacn.cc';
ngaAds[i]['date'] = 'all';
ngaAds[i]['rate'] = 20;
ngaAds[i]['nolog'] = 1;
i++;

//self
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads13';
ngaAds[i]['file'] = __IMG_BASE+'/misc/self/sc20080407.jpg';
ngaAds[i]['url'] = 'http://bbs.sc2.cc';
ngaAds[i]['date'] = 'all';
ngaAds[i]['rate'] = 10;
ngaAds[i]['nolog'] = 1;
i++;

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
if (ngaAds['bbs_ads13'] && checkindex() && window.location.href.indexOf('/g/')==-1)
	{
		makespace();
		id2e('adsc_cate_block2').innerHTML = ngaAds.genAds(ngaAds['bbs_ads13']);
		id2e('adsc_cate_block2').style.display = 'block';
	}
}



/*论坛全页面上通栏 900×60		bbs_ads1*/


// intel
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads1';
ngaAds[i]['file'] = __IMG_BASE+'/misc/intel/090206/bbs_900_90xx.swf';
ngaAds[i]['url'] = 'http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=744263&PluID=0&ord=[timestamp]';
ngaAds[i]['type'] = '';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '90';
ngaAds[i]['date'] = '2/6/2009-2/8/2009 2/19/2009-2/22/2009 3/5/2009-3/8/2009';
ngaAds[i]['rate'] = 100;
i++;

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

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads1x';
ngaAds[i]['file'] = 'http://uencn.com/res/sc90060.gif';
ngaAds[i]['url'] = 'http://uencn.com';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '60';
ngaAds[i]['date'] = '';
ngaAds[i]['rate'] = 70;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads1x';
ngaAds[i]['file'] = 'http://uencn.com/res/sc90060.jpg';
ngaAds[i]['url'] = 'http://uencn.com';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '60';
ngaAds[i]['date'] = '';
ngaAds[i]['rate'] = 30;
i++;
*/

/*论坛通栏组合A 论坛帖子列表页面（版面）中通栏 900*60		bbs_ads9 */


// intel
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads9';
ngaAds[i]['file'] = __IMG_BASE+'/misc/intel/090206/bbs_900_90_2xx.swf';
ngaAds[i]['url'] = 'http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=744264&PluID=0&ord=[timestamp]';
ngaAds[i]['type'] = '';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '90';
ngaAds[i]['date'] = '2/12/2009-2/15/2009 2/26/2009-2/28/2009 3/1/2009';
ngaAds[i]['rate'] = 100;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads9';
ngaAds[i]['file'] = 'http://uencn.com/res/sc90060.gif';
ngaAds[i]['url'] = 'http://uencn.com';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '60';
ngaAds[i]['date'] = '';
ngaAds[i]['rate'] = 15;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads9';
ngaAds[i]['file'] = 'http://uencn.com/res/sc90060.jpg';
ngaAds[i]['url'] = 'http://uencn.com';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '60';
ngaAds[i]['date'] = '';
ngaAds[i]['rate'] = 15;
i++;

function bbs_ads9()
{
if (ngaAds['bbs_ads9'] && checkurl('/thread.php'))
	{
		document.write ("<thead><tr><th colspan='5' style='height:3px'></th></tr></thead><tbody><tr><td id='adsc9' colspan='5' class='adsc'>");
		if (ngaAds['bbs_ads9']['file'] == 'google')
			{
				var i = googleAD.length;
				googleAD[i] = new Array;
				googleAD[i]['google_ad_client'] = "pub-2693756330642707"
				googleAD[i]['google_ad_width'] = 467;
				googleAD[i]['google_ad_height'] = 60;
				googleAD[i]['google_ad_format'] = "468x60_as";
				googleAD[i]['google_ad_type'] = "text";
				googleAD[i]['google_ad_channel'] = "";
				googleAD[i]['google_color_border'] = "FFEEBB";
				googleAD[i]['google_color_bg'] = "FFF5D7";
				googleAD[i]['google_color_link'] = "1D2A63";
				googleAD[i]['google_color_text'] = "121C46";
				googleAD[i]['google_color_url'] = "1D2A63";
				googleAD[i]['container'] = 'adsc9';
				googleAD[i]['id'] = i;
				if (getClientWidth() >= 800)
					{
						i = googleAD.length;
						googleAD[i] = new Array;
						googleAD[i]['google_ad_client'] = "pub-2693756330642707"
						if (getClientWidth() >= 1024)
							{
								googleAD[i]['google_ad_width'] = 467;
								googleAD[i]['google_ad_height'] = 60;
								googleAD[i]['google_ad_format'] = "468x60_as";
							}
						else
							{
								googleAD[i]['google_ad_width'] = 234;
								googleAD[i]['google_ad_height'] = 60;
								googleAD[i]['google_ad_format'] = "234x60_as";
							}
						googleAD[i]['google_ad_type'] = "text";
						googleAD[i]['google_ad_channel'] = "";
						googleAD[i]['google_color_border'] = "FFEEBB";
						googleAD[i]['google_color_bg'] = "FFF5D7";
						googleAD[i]['google_color_link'] = "1D2A63";
						googleAD[i]['google_color_text'] = "121C46";
						googleAD[i]['google_color_url'] = "1D2A63";
						googleAD[i]['container'] = 'adsc9';
						googleAD[i]['id'] = i;
					}

			}
		else
			{
				document.write (ngaAds.genAds(ngaAds['bbs_ads9']));
			}
		document.write ("</td></tr></tbody>");
	}
}


/*通栏组合A 论坛阅读帖子页面（看帖）第一贴下通栏 900*60		bbs_ads10 */


// intel
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads10';
ngaAds[i]['file'] = __IMG_BASE+'/misc/intel/090206/bbs_900_90_2xx.swf';
ngaAds[i]['url'] = 'http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=744264&PluID=0&ord=[timestamp]';
ngaAds[i]['type'] = '';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '90';
ngaAds[i]['date'] = '2/12/2009-2/15/2009 2/26/2009-2/28/2009 3/1/2009';
ngaAds[i]['rate'] = 100;
i++;

function bbs_ads10()
{
if (ngaAds['bbs_ads10'] && checkurl('/read.php'))
	{
		document.write ("<div id='adsc10' class='adsc'>");
		if (ngaAds['bbs_ads10']['file'] == 'google')
			{
				var i = googleAD.length;
				googleAD[i] = new Array;
				googleAD[i]['google_ad_client'] = "pub-2693756330642707"
				googleAD[i]['google_ad_width'] = 467;
				googleAD[i]['google_ad_height'] = 60;
				googleAD[i]['google_ad_format'] = "468x60_as";
				googleAD[i]['google_ad_type'] = "text";
				googleAD[i]['google_ad_channel'] = "";
				googleAD[i]['google_color_border'] = "e1e5eb";
				googleAD[i]['google_color_bg'] = "edf2f8";
				googleAD[i]['google_color_link'] = "1D2A63";
				googleAD[i]['google_color_text'] = "121C46";
				googleAD[i]['google_color_url'] = "1D2A63";
				googleAD[i]['container'] = 'adsc10';
				googleAD[i]['id'] = i;
				if (getClientWidth() >= 800)
					{
						i = googleAD.length;
						googleAD[i] = new Array;
						googleAD[i]['google_ad_client'] = "pub-2693756330642707"
						if (getClientWidth() >= 1024)
							{
								googleAD[i]['google_ad_width'] = 467;
								googleAD[i]['google_ad_height'] = 60;
								googleAD[i]['google_ad_format'] = "468x60_as";
							}
						else
							{
								googleAD[i]['google_ad_width'] = 234;
								googleAD[i]['google_ad_height'] = 60;
								googleAD[i]['google_ad_format'] = "234x60_as";
							}
						googleAD[i]['google_ad_type'] = "text";
						googleAD[i]['google_ad_channel'] = "";
						googleAD[i]['google_color_border'] = "e1e5eb";
						googleAD[i]['google_color_bg'] = "edf2f8";
						googleAD[i]['google_color_link'] = "1D2A63";
						googleAD[i]['google_color_text'] = "121C46";
						googleAD[i]['google_color_url'] = "1D2A63";
						googleAD[i]['container'] = 'adsc10';
						googleAD[i]['id'] = i;
					}

			}
		else
			{
				document.write (ngaAds.genAds(ngaAds['bbs_ads10']));
			}
		document.write ("</div>");
	}
}


/*通栏组合A 论坛首页中通栏#1 900×60			bbs_ads11 */


// intel
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads11';
ngaAds[i]['file'] = __IMG_BASE+'/misc/intel/090206/bbs_900_90_2xx.swf';
ngaAds[i]['url'] = 'http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=744264&PluID=0&ord=[timestamp]';
ngaAds[i]['type'] = '';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '90';
ngaAds[i]['date'] = '2/12/2009-2/15/2009 2/26/2009-2/28/2009 3/1/2009';
ngaAds[i]['rate'] = 100;
i++;

function bbs_ads11()
{
if (ngaAds['bbs_ads11'])
	{
		document.write ("<div id='adsc11' class='adsc'>");
		document.write ("ADVERTISEMENT<br/>");
		document.write (ngaAds.genAds(ngaAds['bbs_ads11']));
		document.write ("</div>");
	}
}

/*通栏组合B 论坛全页面下通栏 900×60	bbs_ads14*/


// baidu
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads14_2';
ngaAds[i]['file'] = 'http://cpro.baidu.com/cpro/ui/cp.js';//cpro_client
ngaAds[i]['ads_container_id'] = 'bbs_ads14'
ngaAds[i]['type'] = 'baidu';
ngaAds[i]['date'] = '';
ngaAds[i]['width'] = 468;
ngaAds[i]['height'] = 15;
ngaAds[i]['rate'] = 100;
ngaAds[i]['args'] = new Array
ngaAds[i]['args']['cpro_client']='haozi8011_43942_cpr';
ngaAds[i]['args']['cpro_flush']=4; 
ngaAds[i]['args']['cpro_w']=468; 
ngaAds[i]['args']['cpro_h']=15; 
ngaAds[i]['args']['cpro_template']='wlink_default_468_15'; 
ngaAds[i]['args']['cpro_cbd']='#e7d5aa'; 
ngaAds[i]['args']['cpro_cbg']='#e7d5aa'; 
ngaAds[i]['args']['cpro_ctitle']='#1d2a63'; 
ngaAds[i]['args']['cpro_cflush']='#e10900'; 
ngaAds[i]['args']['cpro_uap']=1;
ngaAds[i]['args']['cpro_cad']=1;
i++;

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

// intel
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads12';
ngaAds[i]['refreshid'] = 'intel';
ngaAds[i]['file'] = __IMG_BASE+'/misc/intel/081122/600_360.swf';
ngaAds[i]['url'] = 'http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=687715&pi=0&ord=[timestamp]';
ngaAds[i]['width'] = '600';
ngaAds[i]['height'] = '360';
ngaAds[i]['date'] = '11/24/2008 11/25/2008 11/27/2008';
ngaAds[i]['rate'] = 100;
i++;



/*论坛贴内文字			bbs_ads15*/

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads15';
ngaAds[i]['file'] = '<span class="blue">[</span> <a href="http://ngacn.cc/t_wlk/" target="_blank">WLK简体中文天赋模拟器</a> <span class="silver">]</span>';
ngaAds[i]['type'] = 'txt';
ngaAds[i]['date'] = '12/01/2008-1/1/2009';
ngaAds[i]['rate'] = 50;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads15';
ngaAds[i]['file'] = '<span class="silver">[</span> <a href="http://atlas.'+__AJAX_DOMAIN+'" target="_blank">Atlas.NGACN.CC</a> <span class="silver">]</span> 魔兽世界数据速查'
ngaAds[i]['type'] = 'txt';
ngaAds[i]['date'] = 'all';
ngaAds[i]['rate'] = 10;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads15';
ngaAds[i]['file'] = '<span class="silver">[</span> <a href="http://wiki.'+__AJAX_DOMAIN+'" target="_blank">Wiki.NGACN.CC</a> <span class="silver">]</span> 魔兽世界维基 5威望可编辑';
ngaAds[i]['type'] = 'txt';
ngaAds[i]['date'] = 'all';
ngaAds[i]['rate'] = 10;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads15';
ngaAds[i]['file'] = '<span class="silver">[</span> <a href="http://bbs.sc2.cc/read.php?tid=557" target="_blank">星际2Terran新旧科技树比较</a> <span class="silver">]</span>';
ngaAds[i]['type'] = 'txt';
ngaAds[i]['date'] = '7/1/2008-8/26/2008';
ngaAds[i]['rate'] = 10;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads15';
ngaAds[i]['file'] = '<span class="silver">[</span> <a href="http://bbs.sc2.cc/read.php?tid=104" target="_blank">星际三族资料汇总</a> <span class="silver">]</span>';
ngaAds[i]['type'] = 'txt';
ngaAds[i]['date'] = '7/26/2008-8/6/2008';
ngaAds[i]['rate'] = 10;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads15';
ngaAds[i]['file'] = '<span class="silver">[</span> <a href="http://bbs.sc2.cc/read.php?tid=503" target="_blank">星际争霸2官方Q&A 第42期 刺蛇回归Tier1.5科技!</a> <span class="silver">]</span>';
ngaAds[i]['type'] = 'txt';
ngaAds[i]['date'] = '7/26/2008-8/6/2008';
ngaAds[i]['rate'] = 10;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads15';
ngaAds[i]['file'] = '<span class="silver">[</span> <a href="http://bbs.sc2.cc/read.php?tid=29" target="_blank">星际争霸2入门-Pre Alpha版P/T族全面资料评析</a> <span class="silver">]</span>';
ngaAds[i]['type'] = 'txt';
ngaAds[i]['date'] = '7/26/2008-8/6/2008';
ngaAds[i]['rate'] = 10;
i++;


function bbs_ads15(l)
{
if (ngaAds['bbs_ads15'] && l)
	{
		document.write ("<div class='postfloattxtads'>");
		document.write (ngaAds.genAds(ngaAds['bbs_ads15']));
		document.write ('</div>')
	}
}

/*半擎天柱组合A 论坛帖子列表页面（版面）底部快速发帖右侧 190*400*/


ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads16';
ngaAds[i]['file'] = __IMG_BASE+'/misc/gt/lotr2.jpg';
ngaAds[i]['url'] = 'http://bbs.178.com/thread-18200-1-1.html';
ngaAds[i]['width'] = 190;
ngaAds[i]['height'] = 400;
ngaAds[i]['type'] = '';
ngaAds[i]['date'] = '2/3/2009 2/9/2009';
ngaAds[i]['rate'] = 12;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'bbs_ads16';
ngaAds[i]['file'] = 'http://www.dayofday.cn/google/190x400/Noname2.html';
ngaAds[i]['width'] = 190;
ngaAds[i]['height'] = 400;
ngaAds[i]['type'] = 'iframe';
ngaAds[i]['date'] = '';
ngaAds[i]['rate'] = 100;
i++;

function bbs_ads16()
{
if (ngaAds['bbs_ads16'] && checkurl('/thread.php'))
	{
		var ad = ngaAds.genAds(ngaAds['bbs_ads16']);
		var ad0 = ad.substr(0,3);
		var ad1 = ad.substr(ad.length-3,3);
		document.write ("<div class='adsc5'>");
		document.write (ad0+ad.substr(3,ad.length-6)+ad1);
		document.write ('</div>')
	}
}

/*论坛上通栏下 468×15			bbs_ads18*/


function bbs_ads18()
{
if (ngaAds['bbs_ads18'])
	{
		document.getElementById('menu').style.marginBottom = '-44px'
		document.write ("<div class='adsc_cate' id='bbs_ads18' style='display:block;height:15px'>");
		document.write ("<div>");
		document.write (ngaAds.genAds(ngaAds['bbs_ads18']));
		document.write ("</div><div class='clear'></div>");
		document.write ('</div>')
	}
}