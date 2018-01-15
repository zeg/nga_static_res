/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
ngacn.com db.ngacn.com 广告列表 v1.00
written by zeg 2007/12/14
========================
*/

var ngaAds = new Array;
var i = 0;

/*db查询结果页面右上 240×150		ads1*/

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads1';
ngaAds[i]['file'] = '';
ngaAds[i]['date'] = '';
ngaAds[i]['rate'] = 100;
i++;

function ads1()
{
if (ngaAds['ads1'])
	{
		document.write ("<div style='width:240px;margin:5px' class='ads'>");
		document.write ("Advertisement<br/>");
		document.write (ngaAds.genAds(ngaAds['ads1']));
		document.write ("</div>");
	}
}

/*db查询结果页面中 468×60 必须加宽度和高度 ads2*/

// intel
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads2';
ngaAds[i]['file'] = __IMG_BASE+'/misc/intel/intel0925.swf';
ngaAds[i]['url'] = 'http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=623777&pi=0&ord=[timestamp]';
ngaAds[i]['type'] = '';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '60';
ngaAds[i]['date'] = '9/25/2008-10/9/2008';
ngaAds[i]['rate'] = 100;
i++;

// 7fgame
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads2';
ngaAds[i]['url'] = 'http://pv.7fgame.com/PVCount.aspx?id=1308';
ngaAds[i]['file'] = __IMG_BASE+'/misc/7fgame/nga.jpg';
ngaAds[i]['type'] = '';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '60';
ngaAds[i]['date'] = '8/16/2008 8/17/2008';
ngaAds[i]['rate'] = 100;
i++;

function ads2()
{
if (ngaAds['ads2'])
	{
		var domain= getDomain();
		if (domain == 'ladder.ngacn.cc')
		{
			return;
		}
		var func = getQueryVars('func');
		if (func == 14)
		{
			return;
		}
		document.write ("<div style='margin:5px auto 5px auto;width:"+ngaAds['ads2']['width']+"px' class='ads'>");
		document.write ("Advertisement<br/>");
		document.write (ngaAds.genAds(ngaAds['ads2']));
		document.write ("</div>");
	}
}


/*db首页正中 大小不限			ads3*/

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads3';
ngaAds[i]['file'] = '';
ngaAds[i]['date'] = '';
ngaAds[i]['rate'] = 100;
i++;

// intel
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads3';
ngaAds[i]['file'] = 'http://img4.ngacn.cc/misc/intel/intel0925.swf';
ngaAds[i]['url'] = 'http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=623777&pi=0&ord=[timestamp]';
ngaAds[i]['type'] = '';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '60';
ngaAds[i]['date'] = '9/25/2008-10/9/2008';
ngaAds[i]['rate'] = 100;
i++;

function ads3()
{
if (ngaAds['ads3'])
	{
		document.write ("<div style='margin:5px auto 5px auto;width:468px' class='ads'>");
		document.write ("Advertisement<br/>");
		document.write (ngaAds.genAds(ngaAds['ads3']));
		document.write ("</div>");
	}
}




/*	ads4*/

function ads4(){}

/*网站首页标题下 900×60		ads5*/


//intel
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads5';
ngaAds[i]['file'] = 'http://img4.ngacn.cc/misc/intel/090206/bbs_900_90_3xx.swf';
ngaAds[i]['url'] = 'http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=744265&PluID=0&ord=[timestamp]';
ngaAds[i]['width'] = 900;
ngaAds[i]['height'] = 90;
ngaAds[i]['type'] = '';
ngaAds[i]['date'] = '2/6/2009-2/8/2009 2/13/2009-2/15/2009 2/20/2009-2/22/2009 2/28/2009 3/1/2009';
ngaAds[i]['rate'] = 100;
i++;

// 7fgame
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads5';
ngaAds[i]['url'] = 'http://pv.7fgame.com/PVCount.aspx?id=1308';
ngaAds[i]['file'] = __IMG_BASE+'/misc/7fgame/nga.jpg';
ngaAds[i]['type'] = '';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '60';
ngaAds[i]['date'] = '8/16/2008 8/17/2008';
ngaAds[i]['rate'] = 100;
i++;


/*网站内页标题下 900×60				ads10*/


//intel
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads10';
ngaAds[i]['file'] = 'http://img4.ngacn.cc/misc/intel/090206/bbs_900_90_3xx.swf';
ngaAds[i]['url'] = 'http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=744265&PluID=0&ord=[timestamp]';
ngaAds[i]['width'] = 900;
ngaAds[i]['height'] = 90;
ngaAds[i]['type'] = '';
ngaAds[i]['date'] = '2/6/2009-2/8/2009 2/13/2009-2/15/2009 2/20/2009-2/22/2009 2/28/2009 3/1/2009';
ngaAds[i]['rate'] = 100;
i++;

// alimama
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads10';
ngaAds[i]['url'] = 'mm_10519114_584860_1805876';
ngaAds[i]['file'] = 'mm_10519114_584860_1805876';
ngaAds[i]['type'] = 'alimama';
ngaAds[i]['width'] = '760';
ngaAds[i]['height'] = '90';
ngaAds[i]['date'] = '';
ngaAds[i]['rate'] = 100;
i++;


// 7fgame
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads10';
ngaAds[i]['url'] = 'http://pv.7fgame.com/PVCount.aspx?id=1308';
ngaAds[i]['file'] = __IMG_BASE+'/misc/7fgame/nga.jpg';
ngaAds[i]['type'] = '';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '60';
ngaAds[i]['date'] = '8/16/2008 8/17/2008';
ngaAds[i]['rate'] = 100;
i++;

function ads5()
{
if (getQueryVars('func'))
	{
		if (ngaAds['ads10'])
		{
			document.write ("<div style='margin:5px auto 5px auto;width:900px' class='ads'>");
			document.write ("Advertisement<br/>");
			document.write (ngaAds.genAds(ngaAds['ads10']));
			document.write ("<br class='clear'/></div>");
		}
	}
else
	{
		if (ngaAds['ads5'])
		{
			document.write ("<div style='margin:5px auto 5px auto;width:900px' class='ads'>");
			document.write ("Advertisement<br/>");
			document.write (ngaAds.genAds(ngaAds['ads5']));
			document.write ("<br class='clear'/></div>");
		}
	}
}

/*网站首页标题右 468×60				ads6*/

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads6';
ngaAds[i]['file'] = '';
ngaAds[i]['url'] = '';
ngaAds[i]['date'] = '';
ngaAds[i]['rate'] = 100;
i++;

function ads6()
{
if (ngaAds['ads6'] && getQueryVars('func')==false)
	{
		document.write ("<div id='lv0_misc'><div class='w4-8-0h60'>");
		document.write (ngaAds.genAds(ngaAds['ads6']));
		document.write ("</div></div>");
	}
}

/*db首页搜索栏下 468×60			ads7 */

// magic
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads7';
ngaAds[i]['file'] = __IMG_BASE+'/misc/sanda/900_60x.jpg';
ngaAds[i]['url'] = 'http://adsresult.joywell.com.cn/count/stat_click2.aspx?RD=4853&CD=104&AD=4865&MD=136&LD=717';
ngaAds[i]['type'] = '';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '60';
ngaAds[i]['date'] = '5/31/2008 6/1/2008 6/2/2008 6/3/2008';
ngaAds[i]['rate'] = 100;
i++;
function ads7()
{
if (ngaAds['ads7'] && getQueryVars('func')==false)
	{
		if (ngaAds['ads7']['file'] == 'google')
			{
				
			}
		else
			{
				if (ngaAds['ads7']['width']>797)
					{
						var margin = (Math.ceil((ngaAds['ads7']['width']-797)/2)*-1)+'px';
					}
				else
					{
						var margin = 'auto';
					}
				document.write ("<div style='margin:5px "+margin+" 25px "+margin+";width:"+ngaAds['ads7']['width']+"px' class='ads'>");
				document.write ("Advertisement<br/>");
				document.write (ngaAds.genAds(ngaAds['ads7']));
				document.write ("</div>");
			}
	}
}

/*网站首页头条5秒					ads8*/
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads8';
ngaAds[i]['file'] = '';
ngaAds[i]['date'] = '';
ngaAds[i]['rate'] = 100;
i++;

function ads8()
{
if (ngaAds['ads8'])
	{
		document.write ("<div class='ad1'><div style='margin:5px'>");
		document.write (ngaAds.genAds(ngaAds['ads8']));
		document.write ("</div></div>");
	}
}


/*网站首页头条第二个5秒			ads9*/
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads9';
ngaAds[i]['file'] = '';
ngaAds[i]['date'] = '';
ngaAds[i]['rate'] = 100;
i++;

function ads9()
{
if (ngaAds['ads9'])
	{
		document.write ("<div class='ad1'><div style='margin:5px'>");
		document.write (ngaAds.genAds(ngaAds['ads9']));
		document.write ("</div></div>");
	}
}

/*网站全页面中转			ads11*/

// opit
ngaAds[i] = new Array;
ngaAds[i]['id'] = 'ads11';
ngaAds[i]['refreshid'] = 'opit';
ngaAds[i]['file'] = __IMG_BASE+'/misc/opit/nga1.jpg';
ngaAds[i]['url'] = 'http://fo.cdcmedia.net/click.php?aid=1141';
ngaAds[i]['width'] = '';
ngaAds[i]['height'] = '';
ngaAds[i]['date'] = '4/26/2008';
ngaAds[i]['rate'] = 100;
i++;
