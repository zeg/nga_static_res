/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
ngacn.com db.ngacn.com 广告列表 v1.00
written by zeg 2008/9/18
========================
*/

var ngaAds = new Array;
var i = 0;

/* 顶通栏 	wmoads1*/

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'wmoads1';
ngaAds[i]['file'] = 'http://img.ngacn.cc/misc/ferry/09/wmo.swf';
ngaAds[i]['url'] = 'http://u.ferrygame.com/AdverClickLog.aspx?code=19_3_2008_9_24_17_22_52&id=286';
ngaAds[i]['type'] = '';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '60';
ngaAds[i]['date'] = '10/9/2008';
ngaAds[i]['rate'] = 100;
i++;

ngaAds[i] = new Array;
ngaAds[i]['id'] = 'wmoads1';
ngaAds[i]['file'] = 'http://img.ngacn.cc/misc/ferry/10/wmo.swf';
ngaAds[i]['url'] = 'http://u.ferrygame.com/AdverClickLog.aspx?code=19_3_2008_9_24_17_22_52&id=286';
ngaAds[i]['type'] = '';
ngaAds[i]['width'] = '900';
ngaAds[i]['height'] = '60';
ngaAds[i]['date'] = '10/10/2008';
ngaAds[i]['rate'] = 100;
i++;

function wmoads1()
{
if (ngaAds['wmoads1'])
	{
		document.write ("<div style='padding:3px 3px 5px 3px;font-family:arial;font-size:8px;border:1px solid #000;background:#333;margin:10px 0px' class='ads'>");
		document.write ("Advertisement<br/>");
		document.write (ngaAds.genAds(ngaAds['wmoads1']));
		document.write ("</div>");
	}
}

