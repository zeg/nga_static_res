/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
bbs.ngacn.cc ����б� v1.00
written by zeg 20051010
========================

/* �ܱ� */
if(!window.ngaAds)
	ngaAds = [];

ngaAds.maxw=function(){
if(this.maxw.w)return this.maxw.w
return this.maxw.w = __NUKE.position.get().cw-__COLOR.mwm*2-5*2
}//

ngaAds.loadGroup=function(g){
if(g=='mobi'){
	this.cacheLoadByName('dsid_bbs_ads44')
	}
else{
	this.cacheLoadByName('bbs_ads12')
	this.cacheLoadByName('bbs_ads1')
	if(g=='read'){
		this.cacheLoadByName('bbs_ads24')
		this.cacheLoadByName('bbs_ads45')
		this.cacheLoadByName('bbs_ads22')
		}
	else if(g=='thread'){
		this.cacheLoadByName('bbs_ads22')
		}
	}
}//

ngaAds.style =function(x) {
switch(x){
	case 'bbs_ds32':
		return 'background:'+__COLOR.gbg1+';box-shadow: 0px 2px 2px #777 inset;margin-top: -0.4em;'
	case 'bbs_ds32_a':
		return 'color:#ddd;'
	case 'adsc1':
		return 'margin-bottom:'+__COLOR.spc+'px;'
	case 'adsc10':
		return 'border-top:3px solid '+__COLOR.border0+';border-bottom:3px solid '+__COLOR.border0+';'
	case 'adshid':
		return 'width:0px;height:0px;padding:0px;margin:0px;font-size:0px;line-height:0px;overflow:hidden;'
	case 'adsc':
		return 'background:'+__COLOR.gbg1+';vertical-align:top;padding:0.25em 0;text-align:center;'
	case 'adsh':
		return 'background:'+__COLOR.gbg1+';padding:0.416em;width:192px;text-align:center;vertical-align:top;'
	case 'dslabel':
		return 'line-height:1.1em;font-size:0.583em;letter-spacing:0.25em;'
	}
}


/*
ngaAds.push( {
	date: "01/5/2015-01/30/2015",
	id: "bbs_ads32",
	rate: "33",
	title: "�籩Ӣ�۹������Է���",
	url: "/read.php?tid=7758611"
	})
ngaAds.push( {
	date: "01/5/2015-01/30/2015",
	id: "bbs_ads32",
	rate: "33",
	title: "���ּ����� 2014�����̵�",
	url: "/read.php?tid=7727592"
	})
ngaAds.push( {
	date: "01/5/2015-01/30/2015",
	id: "bbs_ads32",
	rate: "33",
	title: "С�������� ���ι�������",
	url: "/read.php?tid=7756429"
	})
*/


ngaAds.count32 = 0
/*bbs_ads32 һ��¥������ */
ngaAds.bbs_ads32_gen = function(){
if(__SETTING.bit & 4)
	return ''
if ((this.count32++ <= 1) && this.bbs_ads32)
	return "<span class='small_colored_text_btn' style='"+this.style('bbs_ds32')+"'>"+this.genAds(this.bbs_ads32, this.style('bbs_ds32_a'))+"</span> "
return ''
}

ngaAds.count31 = 0
/*�����Ķ�ҳ��ͨ�� 900��60
 * bbs_ads1 һ¥�ϣ�������
 * bbs_ads31 һ¥��
 * bbs_ads40 һ¥�����
 * bbs_ads41 һ¥���Ұ�
 * bbs_ads33 ʮ¥��
 * bbs_ads42 ʮ¥�����
 * bbs_ads43 ʮ¥���Ұ�
 */
ngaAds.bbs_ads31_gen = function(id){
if((__SETTING.bit & 4))
	return
ngaAds.count31++
if ((ngaAds.count31 == 1) && (this.bbs_ads31 || this.bbs_ads1 || this.bbs_ads40 || this.bbs_ads41)){
	var x='', z=$(id).parentNode
	x+="<div style='"+this.style('adsc')+";border:1px solid "+__COLOR.bg0+";border-top:none;border-bottom:none'>"
	if(this.bbs_ads1)
		x+=this.genAds(this.bbs_ads1,this.maxw())
	if(this.bbs_ads40 || this.bbs_ads41)
		x+='<table cellspacing=0 cellpadding=0><tr><td>'+this.genAds(this.bbs_ads40)+'</td><td>'+this.genAds(this.bbs_ads41)+'</td></tr></table>'
	else if(this.bbs_ads31)
		x+=this.genAds(this.bbs_ads31,this.maxw())
	x+="<div class='clear'></div></div>"
	if(z.nodeName!='TABLE')z = z.parentNode
	z.parentNode.insertBefore(_$('/span').$0('innerHTML',x), z.nextSibling) 
	}
if ((ngaAds.count31 == 10) && (this.bbs_ads33 || this.bbs_ads42 || this.bbs_ads43)){
	var x='', z=$(id).parentNode
	x+="<div style='"+this.style('adsc')+";border:1px solid "+__COLOR.bg0+";border-top:none;border-bottom:none'>"
	if(this.bbs_ads42 || this.bbs_ads43)
		x+='<table cellspacing=0 cellpadding=0><tr><td>'+this.genAds(this.bbs_ads42)+'</td><td>'+this.genAds(this.bbs_ads43)+'</td></tr></table>'
	else if(this.bbs_ads33)
		x+=this.genAds(this.bbs_ads33,this.maxw())
	x+="<div class='clear'></div></div>"
	if(z.nodeName!='TABLE')z = z.parentNode
	z.parentNode.insertBefore(_$('/span').$0('innerHTML',x), z.nextSibling) 
	}
}



/* 
bbs_ads26 ��̳��ҳ��1 140*550~1100
bbs_ads27 ��̳��ҳ��2 140*550~1100 
*/

function bbs_ads26_27(){
if(__SETTING.bit & 8)
	return
var x = ngaAds
if (x.bbs_ads26)
	put(x.genAds(x.bbs_ads26));

if (x.bbs_ads27){
	if(x.bbs_ads26)put("<div style='width:auto;border:none;padding:0;margin:0;float:none;height:20px;font-size:0px;line-height:0px'></div>")
	put(x.genAds(x.bbs_ads27));
	}

}

/*
 bbs_ads8 ��̳�Ķ�����ҳ�棨��������1���Ҳ�190*400
 bbs_ads24 ��̳�Ķ�����ҳ�棨��������1���Ҳ�190*400 ���ȼ�����bbs_ads8
 bbs_ads45 ��bbs_ads24��ͬ�߶Ȼ��� �Զ�ѡ��
								
 bbs_ads21 ��̳�Ķ�����ҳ�棨��������2���Ҳ�190*400
 bbs_ads25 ��̳�Ķ�����ҳ�棨��������2���Ҳ�190*400 ���ȼ�����bbs_ads21

 bbs_ads17 ��̳�Ķ�����ҳ�棨��������3���Ҳ�190*400
 */
ngaAds.bbs_ads8_preload = function(){

}//fe


ngaAds.bbs_ads8_load_new = function(o,i,fid){
if(i>2 || o.parentNode.tagName!='TR' || __SETTING.currentClientWidth<1200)
	return
var a,t=this;
if(i==0)
	a = t.bbs_ads24 ? t.bbs_ads24 : (t.bbs_ads45 ? t.bbs_ads45 : (t.bbs_ads8 ? t.bbs_ads8 : null) )
else if(i==1)
	a = t.bbs_ads25 ? t.bbs_ads25 : (t.bbs_ads21 ? t.bbs_ads21 : null)
else if(i==2)
	a = t.bbs_ads17 ? t.bbs_ads17 : null
if (a)
	{
	//if (typeof(a.file)=='object'){
	//	if (a.file['f'+fid])
	//		a.file = a.file['f'+fid];
	//	else
	//		a.file = a.file['default'];
	//	}
	t.bbs_ads8_load_new[i] = o
	_$(o).$0('style',this.style('adsh')+"width:"+(a.width|0?(a.width|0)+2|0:192)+"px;display:;",'className',null)
	return 1
	}
}//fe
ngaAds.bbs_ads8_load_new_load = function(i){
if(i>2 || !this.bbs_ads8_load_new[i])return
var t = this
if(i==0){
	if(t.bbs_ads24 && t.bbs_ads45){
		var x = t.bbs_ads8_load_new[i].offsetHeight
		if(x>t.bbs_ads24.height && x>t.bbs_ads45.height)
			x = t.bbs_ads24.height > t.bbs_ads45.height ? t.bbs_ads24 : t.bbs_ads45
		else
			x = t.bbs_ads24.height > t.bbs_ads45.height ? t.bbs_ads45 : t.bbs_ads24
		}
	else
		x = t.bbs_ads24 ? t.bbs_ads24 : (t.bbs_ads45 ? t.bbs_ads45 : (t.bbs_ads8 ? t.bbs_ads8 : null) )
	}
else if(i==1)
	x = t.bbs_ads25 ? t.bbs_ads25 : (t.bbs_ads21 ? t.bbs_ads21 : null)
else if(i==2)
	x = t.bbs_ads17 ? t.bbs_ads17 : null
if(x)
	t.bbs_ads8_load_new[i].innerHTML = this.genAds(x)
}//



/*��̳ȫҳ����ͨ�� 900��60		bbs_ads1*/
ngaAds.bbs_ads1_gen=function(){
if(__SETTING.bit & 4)
	return '';

if (this.bbs_ads1)
	return "<div style='"+this.style('adsc')+this.style('adsc1')+"'>"+this.genAds(this.bbs_ads1,this.maxw())+'</div>'
return ''
}

/*��̳ȫҳ����ͨ�� 900��60		bbs_ads1*/
/*��̳�����б�ҳ�棨���棩��ͨ�� 900*60		bbs_ads9 bbs_ads23*/
/*-7�����б�ҳ�棨���棩��ͨ�� 900*60		bbs_ads28 */
ngaAds.bbs_ads9_gen=function(){
if((__SETTING.bit & 4) || !window.__CURRENT_FID || window.__CURRENT_TID)
	return
var n=ngaAds, x=''
if (n.bbs_ads1 || n.bbs_ads9 || n.bbs_ads23 || (n.bbs_ads28 && __CURRENT_FID==-7)){
	x+="<div style='"+n.style('adsc')+";margin-bottom:8px;'>"
	var xw = this.maxw()
	if(n.bbs_ads1)
		x+=n.genAds(n.bbs_ads1, xw)
	if(n.bbs_ads9)
		x+=n.genAds(n.bbs_ads9, xw)
	if(n.bbs_ads23)
		x+=n.genAds(n.bbs_ads23, xw)
	if(n.bbs_ads28)
		x+=n.genAds(n.bbs_ads28, xw)
	x+="</div>"
	}
if(x){
	var y = $('toptopics').nextSibling
	while(y.nodeType!=1)
		y = y.nextSibling
	y.innerHTML += x
	}
}//fe



ngaAds.open_69124=function(e,u,h){
if(!this.open_69124.w){
	this.open_69124.w = commonui.createCommmonWindow()
	this.open_69124.w._.addContent(null)._.addContent(
		_$('/iframe').$0('src',u,'style',{margin:'0px',overflow:'hidden',width:'100%',height:h+'px',border:'none'})
		)
	}
this.open_69124.w._.show(null,null,2)
}//fe

ngaAds.bbs_ads30_gen = function(){

}//fe

/*ͨ�����B 900��60 ���ٷ�����ͨ��
 * ��̳ȫҳ��	bbs_ads14 (����)
 * �����б�ҳbbs_ads35
 * �����б�ҳ���bbs_ads36
 * �����б�ҳ�Ұ�bbs_ads37
 * �����Ķ�ҳbbs_ads34
 * �����Ķ�ҳ���bbs_ads38
 * �����Ķ�ҳ�Ұ�bbs_ads39
 * */
ngaAds.bbs_ads14_gen = function(){
if(__SETTING.bit & 4)
	return
var x=''
if (this.bbs_ads14)
	x+=this.genAds(this.bbs_ads14)

if(window.__CURRENT_TID){
	if(this.bbs_ads38 || this.bbs_ads39)
		x+='<table cellspacing=0 cellpadding=0><tr><td>'+this.genAds(this.bbs_ads38)+'</td><td>'+this.genAds(this.bbs_ads39)+'</td></tr></table>'
	else if(this.bbs_ads34)
		x+=this.genAds(this.bbs_ads34)
	}
else{
	if(this.bbs_ads36 || this.bbs_ads37)
		x+='<table cellspacing=0 cellpadding=0><tr><td>'+this.genAds(this.bbs_ads36)+'</td><td>'+this.genAds(this.bbs_ads37)+'</td></tr></table>'
	else if(this.bbs_ads35)
		x+=this.genAds(this.bbs_ads35)
	}

if(x){
	var y = $('fast_post_c').nextSibling
	while(y.nodeType!=1)
		y = y.nextSibling
	y.innerHTML = "<div style='"+this.style('adsc')+"'>"+x+"<div class='clear'></div></div>"
	}
}

/*��̳ȫҳ����ת			bbs_ads12*/
//������js_default.js


/*�����������A ��̳�����б�ҳ�棨���棩�ײ����ٷ����Ҳ� 190*400 bbs_ads16*/
/*�Ķ�����ҳ��ײ����ٷ����Ҳ� 190*400 bbs_ads22*/
ngaAds.bbs_ads16_gen=function(){
if(__SETTING.bit & 4)
	return null

/*
var ad = null
if (this.ckurl('/thread.php')){
	if (this.bbs_ads24)
		this.bbs_ads16=this.bbs_ads24
	if (this.bbs_ads16)
		ad = this.genAds(this.bbs_ads16)
	}
if (this.bbs_ads22 && this.ckurl('/read.php'))
	ad = this.genAds(this.bbs_ads22)
if (ad)
	return _$('/td').$0('id','bbs_ads16','className','adsh','innerHTML',ad)
*/
if (this.bbs_ads22)
	return _$('/td','className','c2','style','verticalAlign:top;padding:0;width:'+((this.bbs_ads22.width|0)+2+12)+'px',
		_$('/div','style', this.style('adsh')+'verticalAlign:middle;padding:6px;'+(this.bbs_ads22.width ? 'width:'+((this.bbs_ads22.width|0)+2)+'px;' : ''),'innerHTML',this.genAds(this.bbs_ads22))
		)
return null
}

/**/
ngaAds.bbs_ads29_gen = function(id){
if((__SETTING.bit & 8)==0 && id==1 && this.bbs_ads29)
	return "<div style='"+this.style('adsc')+"' style='margin-top:1em'>"+this.genAds(this.bbs_ads29)+"<div class='clear'></div></div>"
return ''
}
	
//�ƶ�ҳ���¸��� �̶��ߴ����640*150
ngaAds.bbs_ads44_gen = function(){
if((__SETTING.bit & 16) && this.bbs_ads44)
	return _$('/div','style',this.style('adsc'),_$('/div','innerHTML',this.genAds(this.bbs_ads44)))
return null
}//
ngaAds.bbs_ads44_perproc = function(x){
if((''+x.file).match(/\.(jpg|jpeg|png|bmp|gif|swf)$/)){//img
	if(x.width>523){
		x.width='523'
		x.height=Math.floor(523/x.width*x.height)+''
		}
	}
else{//iframe
	if(x.width>523)
		x.style='transform: scale('+(523/x.width)+');transform-origin:0% 0%;margin-bottom:-'+Math.floor(x.height-523/x.width*x.height)+'px;'
	}	
return x
}

/*���������*/
ngaAds.loadCustomAds=function(arg)
{/*
if (arg.uid && parseInt(arg.uid,10)==3213167){
ngaAds['bbs_ads23'] = {
	'id':'bbs_ads23',
	'file': __IMG_BASE+'/misc/self/tmp090903.jpg',
	'url':'',
	'title':'',
	'width':'900',
	'height':'60',
	'date':'8/4/2009-8/30/2009',
	'rate':100,
	'nolog':1,
	'type':''
	}
}*/
}//fe











/*
ngaAds.push({
	'id':'bbs_ads21',				//���λID
	'file':'http://xin.178.com/s/zt/sc2.html',		//�ļ� ͼƬ �� flash �� Ƕ��ҳ���ַ ���Ϊ����ʹ���������� ����Ϊ.title
	'url':'',			//���ӵ�ַ ��flash�Դ������򲻱���д
	'title':'178�����Ƽ�',			//ͼƬ˵�� flash������д
	'width':'190',				//���(������������190)
	'height':'400',				//�߶�(������������400)
	'date':'3/17/2009-11/1/2009',	//����(���ղ���ʾ�������) ���� 2/15/2006 7/1/2006-7/31/2006 8/1/2006-8/31/2006 ��Ϊ��2��15�պ�7����8����ʾ ����all��Ϊһֱ��ʾ
	'rate':25,					//��ʾ�ļ��ʣ��ٷֱȣ���ͬһ�����λ�����е�����ʾ�Ĺ����ʾ�������Ӧ������100���糬��100��������ǰ������ȣ������һ��70�ڶ���60������20��ʵ����Ϊ��һ��70�ڶ���30����������ʾ��
	'nolog':1,					//Ϊ1ʱ��ͳ�Ƶ���� 0ʱͳ�Ƶ����
	'type':'iframe'					//���� ��ͼƬ��flash������� Ƕ��ҳ������iframe
});
*/
/*
ngaAds.push({
	'id':'bbs_ads21',
	type:'baidu',
	'width':'190',
	'height':'400',
	'date':'all',
	cpro_id:'u1447674',
	rate:100
});

ngaAds.push({
	'id':'bbs_ads14',
	type:'baidu',
	'width':'900',
	'height':'60',
	'date':'all',
	cpro_id:'u1449408',
	rate:100
});





ngaAds.push({
	'id':'bbs_ads17',
	'file':'http://wow.178.com/s/zt/sjk4.html',
	'url':'',
	'date':'all',
	'rate':15,
	'width':'190',
	'height':'400',
	'nolog':1,
	'type':'iframe'
});

// baidu
ngaAds.push({
	id:'bbs_ads14',
	//'file':'http://cpro.baidu.com/cpro/ui/cp.js',//cpro_client
	type:'baidu',
	date:'all',
	rate:100,
	cpro_id:'u1365489',
	ifShow:function(){
		if(window.__CURRENT_FID && (__CURRENT_FID==-7 || __CURRENT_FID==-152678) && location.pathname.indexOf('/thread.php')===0)
			return true
		}
});

// taobao

ngaAds.push({
	id:'bbs_ads29',
	'file':'http://p.tanx.com/ex?i=mm_44474956_4200394_13764006',//cpro_client
	type:'taobao',
	date:'all',
	rate:100,
	mmid:'tanx-a-mm_44474956_4200394_13764006'
});
*/
/*

ngaAds.push({
	'id':'bbs_ads13',
	'file':__IMG_BASE+'/misc/self/20060830.jpg',
	'url':'',
	'title':'��߷�����ʶ�������ʺŰ�ȫ',
	'width':'',
	'height':'',
	'date':'all',
	'rate':2,
	'nolog':1
});

ngaAds.push({
	'id':'bbs_ads13',
	'file':__IMG_BASE+'/misc/self/20060829.jpg',
	'title':'ֹͣ�����ң��õ���������ͼ',
	'date':'all',
	'rate':4,
	'nolog':1
});


*/


//����

/*
(function(){
var fAds = []
//�����
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f1.jpg',
	'url':'/thread.php?fid=200'
});
//����
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f2.jpg',
	'url':'/thread.php?fid=102'
});
//ʥ��
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f184a.jpg',__IMG_BASE+'/misc/self/f/f3.jpg'),
	'url':'/thread.php?fid=184'
});
//ħ��
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f4.jpg',
	'url':'/thread.php?fid=182'
});
//����
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f187a.jpg',__IMG_BASE+'/misc/self/f/f5.jpg'),
	'url':'/thread.php?fid=187'
});
//��ʦ
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f6.jpg',
	'url':'/thread.php?fid=183'
});
//��ʿ
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f7.jpg',
	'url':'/thread.php?fid=188'
});
//der
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f8.jpg',
	'url':'/thread.php?fid=186'
});
//�ؾ�
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f9.jpg',
	'url':'/thread.php?fid=191'
});
//����
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f10.jpg',
	'url':'/thread.php?fid=272'
});
//սʿ
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f12.jpg',__IMG_BASE+'/misc/self/f/f181a.jpg'),
	'url':'/thread.php?fid=181'
});
//����
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f185.jpg',
	'url':'/thread.php?fid=185'
});
//��
fAds.push({
	'file':new Array(__IMG_BASE+'/misc/self/f/f189a.jpg',__IMG_BASE+'/misc/self/f/f189.jpg'),
	'url':'/thread.php?fid=189'
});
//����
fAds.push({
	'file':__IMG_BASE+'/misc/self/f/f11.jpg',
	'url':'/thread.php?fid=190'
});
var j = Math.floor(Math.random()*(fAds.length));
if (typeof(fAds[j]['file'])=='object')
	fAds[j].file = fAds[j].file[ Math.floor(Math.random()*fAds[j]['file'].length)]
ngaAds.push({
	'file':fAds[j]['file'],
	'url':fAds[j]['url'],
	'id':'bbs_ads13',
	'date':'all',
	'rate':5,
	'nolog':1
});
})()
*/
;(function(){
var tmp = window.navigator.userAgent.toLowerCase()
if(tmp.indexOf('iphone ')==-1  && tmp.indexOf('android')==-1)
	return
//if(tmp.indexOf('ipad')!=-1)
//	return

for(var k in ngaAds){//remove fullscreen for mobi
	if(ngaAds[k] && ngaAds[k].id && ngaAds[k].id=="bbs_ads12")
		ngaAds[k].date=null
	}
	/*
ngaAds.push( {
	date: "all",
	file: tmp.indexOf('ipad')!=-1 ? __IMG_STYLE+"/mobile_app_banner5.jpg" : __IMG_STYLE+"/mobile_app_banner4.jpg?342",
	height: "600",
	id: "bbs_ads12",
	nolog: "1",
	now: 1398355200000,
	rate: "100",
	refreshid: "",
	title: "",
	type: "",
	url: "http://app.178.com",
	width: "600"
	})
	*/
})();

