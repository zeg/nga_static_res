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
if(!window.ngaAds)
	ngaAds = [];
if(!ngaAds.location)
	ngaAds.location = location

ngaAds.reset = function(ni){
if(!ni)ngaAds.clear()
this.nowTime = new Date;
this.nowDay = (this.nowTime.getMonth()+1)+'/'+this.nowTime.getDate()+'/'+this.nowTime.getFullYear()
this.nowDayTime = Date.parse(this.nowDay)
this.rateSum = []
this.rnd = []
}//

ngaAds.selectGroup = function(ua,lo){
if(ua.match(/iphone|mobile|IEMobile/i))
	this.loadGroup('mobi')
else{
	if(lo.pathname=='/read.php')
		this.loadGroup('read')
	else if(lo.pathname=='/thread.php')
		this.loadGroup('thread')
	else if(lo.pathname=='/misc/adpage_insert_2.html')
		this.loadGroup('insert')
	else
		this.loadGroup('other')
	}
}//

ngaAds.clear = function (){
for(var k in this){
	if(typeof k =='number' ||k.match(/^bbs_ads\d+$/))
		delete this[k]
	}
this.length=0
if(this.clear.onclear.length){
	for(var i=0;i<this.clear.onclear.length;i++)
		this.clear.onclear[i]()
	this.clear.onclear = null
	this.clear.onclear = []
	}
}//
ngaAds.clear.onclear=[]//

ngaAds.genadslist = function (id)
{
//console.log('genadslist')
var tempDate , tempShow
for (var k=0;k<this.length;k++){
	if(!this[k])
		continue

	var D = this[k]

	if(D.id && D.date && !this[D.id]){
		//console.log(D.id)
		D.date =  D.date.replace(/(^| |\/)0/g,'$1');
		D.now = this.nowDayTime;
		tempShow = false
		if (D.date == 'all'){
			tempShow = true
			}
		else{
			var ni = -1, od
			tempDate = D.date+' '
			while (tempDate && ((ni = tempDate.indexOf(' ')) != -1) ){
				od = tempDate.substr(0,ni)
				tempDate = tempDate.substr(ni+1)
				if (od.length>11){
					od = od.split('-')
					if (od[1]){
						if (this.nowDayTime>=Date.parse(od[0]) && this.nowDayTime<=Date.parse(od[1])){
							tempShow = true;
							break
							}
						}
					}
				else{
					if (this.nowDay == od){
						tempShow = true
						break
						}
					}
				}
			}
		if (tempShow){
			if(D.sgid && !window.SG_GG){
				window.SG_GG = true
				__SCRIPTS.syncLoad('dsCommonG')
				}
			if (this.rateSum[D.id]===undefined)
				this.rateSum[D.id] = 0;
			if (this.rnd[D.id]===undefined)
				this.rnd[D.id] = Math.floor(Math.random()*100);
			if(!D.rate)
				D.rate = 100
			this.rateSum[D.id] += (D.rate|0);
			if (this.rnd[D.id]<this.rateSum[D.id]){
				this[D.id] = D
				this.rnd[D.id] = 10000
				}
			}
		}
	delete this[k]
	}

}
//fe
ngaAds.cacheLoadByNameOrg = function(n,opt){
	if(this.wait && this.wait.length){
		var y=this.wait
		this.wait=[]
		for(var i=0;i<y.length;i++)
			this.cacheLoadByName(y[i])
		}
	if(!n)return
	var x = this.readCache(n)
	//console.log('load cache '+n+' '+(''+x).length)
	if(x){
		try{
		eval(x)
		}catch(e){
		console.log('ngaAds.cacheLoadByNameOrg '+e)	
		}
		this.delCache(n)
		}
	if((opt&1)==0)
		window.setTimeout(function(){
			//console.log('load file '+n)
			__SCRIPTS.asyncLoad(ngaAds.scriptKey(n),2)
			},500)
	}//

ngaAds.scriptKey = function(n){
return 'dsid_'+n
}//

ngaAds.cacheKey = function(n){
return 'adslazyload_'+n
}//

ngaAds.readCache = function(n){
return domStorageFuncs.get(this.cacheKey(n))
}//

ngaAds.setCache = function(n,v){
return domStorageFuncs.set(this.cacheKey(n),v,86400)
}//

ngaAds.delCache = function(n){
return domStorageFuncs.remove(this.cacheKey(n))
}//



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

ngaAds.replaceDs = function(o,id){
if(!this.replaceDs[id] && window.__SCRIPTS && __SCRIPTS['dsid_'+id]){
	//var x = o.getBoundingClientRect(),y = __NUKE.position.get()
	//y.vb = y.yf+y.ch
	//console.log('lazyload check '+id)
	//if((x.bottom>=0 && x.bottom<=y.ch) || (x.top>=0 && x.top<=y.ch)){
		delete ngaAds[id]
		this.rateSum[id]=this.rnd[id]=0
		this.replaceDs[id] = 1
		if((new Date).getTime()-ngaAds.nowTime>90000)//1.5min
			__SCRIPTS['dsid_'+id]+=(__SCRIPTS['dsid_'+id].indexOf('?')==-1?'?':'&')+'status=1'
		__SCRIPTS.load('dsid_'+id,function(){
			ngaAds.genadslist(id)
			if(ngaAds[id]){
				var x = _$('/span','innerHTML',ngaAds.genAds(ngaAds[id]))
				o.parentNode.replaceChild(x.firstChild,o)
				}
			})
		//console.log('in sight '+id)
		return 1//ads loaded
	//	}
	//console.log('no in sight '+id)
	return 0
	}
return 1
}//

ngaAds.loadQueue = null
ngaAds.loadQueueInit = function(){
this.loadQueue=[]
var timer,counter=0,qu = this.loadQueue,gon=false,
ot = function(){
	var j=true
	for(var i=0;i<qu.length;i++){
		if(qu[i]){
			if(ngaAds.replaceDs(qu[i][0],qu[i][1]))
				qu[i] = null
			else
				j=false
			}
		}
	if(j){
		//console.log('scroll dereg')
		commonui.dE(window,'scroll',lq)
		gon=false
		}
	},
lq = function(e){
	if(e.timestamp-counter<700)
		return counter=e.timestamp
	if(timer)
		clearTimeout(timer)
	timer = setTimeout(ot,750)
	},
go=function(){
	if(gon)return
	gon=true
	//console.log('scroll reg')
	commonui.aE(window,'scroll',lq)
	}
qu.insert=function(o,id){
	//console.log('insert '+id)
	if(ngaAds.replaceDs(o,id))//
		return
	this.push([o,id])
	go()
	}
}//

ngaAds.syncAfterloadCutScript = function(x){
var ev = [],tp = _$('/span','innerHTML',x),pt = tp.childNodes
for(var i=0;i<pt.length;i++){
	if(pt[i].nodeType==1 && pt[i].nodeName=='SCRIPT'){
		if(pt[i].src)
			ev.push(pt[i].src)
		else
			ev.push(pt[i].innerHTML)
		}

	}
return ev
}//


ngaAds.syncAfterload = function(){
	return
for(var k in this){
	if(this[k] && this[k].id && this[k].type)  {

		if(this[k].type==5 && this[k].placeholderid){//type5 广点通
			var a = this[k], ev = this.syncAfterloadCutScript(a.file)

			for(var i=0;i<ev.length;i++){
				ev[i] = ev[i].replace(/containerid: '.+?'/, "containerid: '"+a.placeholderid+"'")
				try{
					eval.call(window,ev[i])
					}
				catch(e){
					console.log(e,ev[i])
					}
				}

			this.clear.onclear.push(function(){
				var x = ['TencentGDT','GDT_HYB','GDT','jsInited']
				for(var i=0;i<x.length;i++){
					window[x[i]] = null
					delete window[x[i]]
					}
				})
			/*
			var so = $(a.placeholderid).parentNode, oss = function(){
				console.log(so.getBoundingClientRect())
				}
			this.clear.onclear.push(function(){commonui.dE(window,'scroll',oss)})
			commonui.aE(window,'scroll',oss)*/
			}
		else if(this[k].type==1 && this[k].placeholderid){//type1 baidu
			var a = this[k], ev = this.syncAfterloadCutScript(a.file),jf

			for(var i=0;i<ev.length;i++){
				
				if(ev[i].substr(0,4)=='http'){
					if(location.protocol=='https:')
						ev[i] = ev[i].replace(/^http:\/\//,'https://')
					jf=ev[i]
					}
				else if(ev[i].substr(0,2)=='//'){
						jf=ev[i]
					}
				else{
					ev[i] = ev[i].replace(/container:.+?(,|;|\n)/, "container: '"+a.placeholderid+"'$1")
					try{
						eval.call(window,ev[i])
						}
					catch(e){
						console.log(e,ev[i])
						}
					}
					
				}
			__SCRIPTS.asyncLoad(jf)
			this.clear.onclear.push(function(){
				window.slotbydup = null
				delete window.slotbydup
				})
			}
		else if(this[k].type==999){
			}
			


		}
	}
}//

ngaAds.ifMouseOut = function(e,o){
var r = e.relatedTarget ? e.relatedTarget : e.toElement;
while (r && r.nodeName != 'BODY'){
	if (r==o) return
	r= r.parentNode
	}
return true
}//fe

ngaAds.genAds = function (a,maxw,maxh,defw,defh){
if(this[a.id+'_perproc'])
	a = this[a.id+'_perproc'](a)


var ww=0, hh=0, mww=0, mhh=0, ra=0, mkm=18, olo=''
a.width=parseInt(a.width)
a.height=parseInt(a.height)


if(a.width<0)a.width = defw
if(a.height<0)a.height = defh

if(a.width>0){
	if(maxw && a.width>maxw){
		ra = maxw/a.width
		ww = ra*a.width
		hh = a.height ? ra*a.height : 0
		mkm+=a.height-hh
		}
	else{
		ww = a.width
		hh = a.height ? a.height : 0
		}
	}
a.width = a.width ? a.width+'px' : 'auto'
a.height = a.height ? a.height+'px' : 'auto'
ww = ww ? ww+'px' : 'auto'
hh = hh ? hh+'px' : 'auto'
ra = ra ? ';transform:scale('+ra+');transform-origin:0% 0%;' : ''


/*
if(a.placeholder){
	if(!this.loadQueue)
		this.loadQueueInit()
	return "<div style='display:inline-block;*display:inline;*zoom:1;border:1px solid #000000;margin:auto;"+(ww?' ;width:'+ww:'')+(hh?' ;height:'+hh:'')+"'><img src='about:blank' style='display:none' onerror='var t=this.parentNode;commonui.aE(window,\"DOMContentLoaded\",function(){ngaAds.loadQueue.insert(t,\""+a.id+"\")})'/></div>";
	}*/
var tp = (''+a.file).match(/\.(jpg|jpeg|png|bmp|gif)$/), img='', ic=(a.isUnion|0)==2 ? '' : "<br/><img src='"+__IMG_STYLE+"/admark.png' style='border:none;transform:scale(1);margin:-"+mkm+"px 0 auto calc(100% - 48px)'>"
/*if(tp && tp[1]=='swf'){
	img = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" style="background:#000" width="'+a.width+'" height="'+a.height+'" style="'+(a.style?a.style:'')+'" onload="'+(a.onload?'ngaAds[\''+a.id+'\'].onload.apply(this)':'')+'"><param value="transparent" name="wmode"/><param name="movie" value="'+a.file+'"/><embed wmode="transparent" src="'+a.file+'" width="'+a.width+'" height="'+a.height+'"/></object>';
	img = (a.url?"<a href='"+a.url+"' target='_blank' ":"<div ")+"style='display:block;border:1px solid #000000;width:"+ww+";height:"+hh+";margin:auto;text-align:right;overflow:hidden;line-height:0px;font-size:0px;"+(a.style?a.style:'')+"'' target='_blank' title='"+a.title+"'>"+img+ic+(a.url?"</a>":"</div>")
	return img
	}
else */

if(a.onload){
	if(window.__INSECTOB)
		olo = " onload='__INSECTOB.add(this,function(){ngaAds[\""+a.id+"\"].onload.apply(this)})' "
	else
		olo = " onload='ngaAds[\""+a.id+"\"].onload.apply(this)' "
	}

if(tp){//普通图片广告
	img = "<img src='"+a.file+"' title='"+a.title+"' style='width:"+a.width+";height:"+a.height+";margin:auto;"+ra+"' "+olo+"/>";
	img = (a.url?"<a href='"+a.url+"' target='_blank' ":"<div ")+" style='display:block;border:1px solid #000000;width:"+ww+";height:"+hh+";margin:auto;text-align:center;overflow:hidden;"+(a.style?a.style:'')+"' title='"+a.title+"'>"+img+ic+(a.url?"</a>":"</div>")
	return img;
	}
else{//嵌入页面广告等
	var rr=''
	if(a.url && window.addEventListener){
		var rd = 'ifrds_'+a.id+'_'+Math.floor(Math.random()*10000)
		if(!window[rd]){
			window[rd]={
				url:a.url,
				over:false,
				mouseover : function(e,o){
					if(ngaAds.ifMouseOut(e,o)){
						this.over = true
						setTimeout(function () {
							window.focus();
							this.over = false;
							}, 100)
						}
					},
				mouseout : function(e,o){
					if(ngaAds.ifMouseOut(e,o))
						this.over = false
					},
				winblur : function(){//window blur when click iframe
					if(window[rd].over){
						var img1 = document.createElement('img');
						img1.src = window[rd].url
						img1.style.width = img1.style.height = "1px"
						img1.style.display = 'none'
						document.body.appendChild(img1)
						}
					}
				}
			this.clear.onclear.push(function(){
				window.removeEventListener('blur',window[rd].winblur)
				})
			window.addEventListener('blur',window[rd].winblur)
			}
		rr = " onmouseover='window[\""+rd+"\"].mouseover(event,this)'  onmouseout='window[\""+rd+"\"].mouseout(event,this)' "
		}

	if(a.sgid){
		/*this.clear.onclear.push(function(){
			var x = ['TencentGDT','GDT_HYB','GDT','jsInited']//清除联盟广告的全局变量以再次加载广告
			for(var i=0;i<x.length;i++){
				window[x[i]] = null
				delete window[x[i]]
				}
			})*/
		delete a.type
		a.placeholderid = 'SG_GG_CONTAINER_'+a.sgid
		return "<div style='display:block;border:1px solid #000000;width:"+ww+";height:"+hh+";margin:auto;text-align:center;overflow:hidden;'  "+rr+"><div id='"+a.placeholderid+"' style='"+(a.type==5 ? "width:"+ww+";height:"+hh+";" : "width:"+a.width+";height:"+a.height+";"+ra)+"'></div><img src='about:blank' style='display:none' onerror='SG_GG("+a.sgid+")'/></div>"
		}
/*
	if (a.type==5 || a.type==1 ){//广点通 baidu
		a.placeholderid = '_ds'+Math.floor(Math.random()*10000000)
		return "<div style='display:block;border:1px solid #000000;width:"+ww+";height:"+hh+";margin:auto;text-align:center;overflow:hidden;'  "+rr+"><div id='"+a.placeholderid+"' style='"+(a.type==5 ? "width:"+ww+";height:"+hh+";" : "width:"+a.width+";height:"+a.height+";"+ra)+"'></div><img src='about:blank' style='display:none' "+olo.replace(/^\s*onload=/,'onerror=').replace(/this/g,'this.parentNode')+"/></div>"
		}*/

	img =  "<ifr"+"ame scrolling='no' frameborder='0' style='margin:0px;width:"+a.width+";height:"+a.height+";"+ra+"overflow:hidden;margin:auto;"+(a.style?a.style:'')+"' src='"+a.file+"' "+olo+" "+rr+"></ifr"+"ame>";
	img = "<div style='display:block;border:"+(ic?'1px solid #000000':'none')+";width:"+ww+";height:"+hh+";margin:auto;text-align:center;overflow:hidden;"+(a.style?a.style:'')+"' title='"+a.title+"'>"+img+ic+"</div>"
	return img;
	}


}
//fe


//-------------------------------
//<-------------------

ngaAds.reset(1)

if(ngaAds.wait){
	ngaAds._push = ngaAds.push
	ngaAds.push = function ngaAdsPush(x){
		//console.log('ngaAds.push '+x.id)
		var caller = ngaAdsPush.caller ? ngaAdsPush.caller : arguments.caller , y = ''//domStorageFuncs.get(n)
		this.setCache(x.id, y+"\n\n;("+caller.toString().replace('ngaAds.push(','ngaAds.add(')+")();" )
		}//
	ngaAds.add = function(x){
		//console.log('ngaAds.add '+x.id)
		this._push(x)
		this.genadslist(x.id)
		}//
	ngaAds.cacheLoadByName = ngaAds.cacheLoadByNameOrg
	}
else{
	ngaAds.genadslist()
	ngaAds._push = ngaAds.push
	ngaAds.push = function ngaAdsPush(x){
		if(x.id == 'bbs_ads12'){
			//console.log('ngaAds.push '+x.id)
			var caller = ngaAdsPush.caller ? ngaAdsPush.caller : arguments.caller , y = ''//domStorageFuncs.get(n)
			return this.setCache(x.id, y+"\n\n;("+caller.toString().replace('ngaAds.push(','ngaAds.add(')+")();" )
			}
		ngaAds.add(x)
		}
	ngaAds.add = function(x){
		this._push(x)
		this.genadslist(x.id)
		}//
	ngaAds.cacheLoadByName = function(n){
		if(n=='bbs_ads12')
			return this.cacheLoadByNameOrg(n,1)
		__SCRIPTS.syncLoad(this.scriptKey(n))
		}//
	}


ngaAds.selectGroup(navigator.userAgent, ngaAds.location)
//-------------------------------
