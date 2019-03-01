/*
========================
FOR NGACN ONLY
------------
(c) 2005 Zeg All Rights Reserved
========================
����б����� ������� ͨ�ó��� v1.01
written by zeg 2007/12/14
========================
*/
if(!window.ngaAds)
	ngaAds = [];

ngaAds.reset = function(ni){
if(!ni)ngaAds.clear()
this.nowTime = new Date;
this.nowDay = (this.nowTime.getMonth()+1)+'/'+this.nowTime.getDate()+'/'+this.nowTime.getFullYear()
this.nowDayTime = Date.parse(this.nowDay)
this.rateSum = []
this.rnd = []
}//

ngaAds.clear = function (){
for(var k in this){
	if(typeof k =='number' ||k.match(/^bbs_ads\d+$/))
		delete this[k]
	}
this.length=0
}//

ngaAds.reset(1)

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


//-------------------------------
//<-------------------
if(ngaAds.wait){
	ngaAds._push = ngaAds.push
	ngaAds.push = function ngaAdsPush(x){
		//console.log('ngaAds.push '+x.id)
		var caller = ngaAdsPush.caller ? ngaAdsPush.caller : arguments.caller , n = 'adslazyload_'+x.id , y = ''//domStorageFuncs.get(n)
		domStorageFuncs.set(n, y+"\n\n;("+caller.toString().replace('ngaAds.push(','ngaAds.add(')+")();" , 3600)
		}//
	ngaAds.add = function(x){
		//console.log('ngaAds.add '+x.id)
		this._push(x)
		this.genadslist(x.id)
		}//
	ngaAds.cacheLoadByName = function(n){
		//console.log('ngaAds.cacheLoadByName '+n)
		if(this.wait.length){
			var y=this.wait
			this.wait=[]
			for(var i=0;i<y.length;i++)
				this.cacheLoadByName(y[i])
			}
		if(!n)return
		var k = 'adslazyload_'+n
		var x = domStorageFuncs.get(k)
		if(x)
			eval(x)
		//domStorageFuncs.remove(k)
		__SCRIPTS.asyncLoad('dsid_'+n,2)
		}//

	if(navigator.userAgent.match(/iphone|mobile|IEMobile/i))
		ngaAds.loadGroup('mobi')
	else{
		if(location.pathname=='/read.php')
			ngaAds.loadGroup('read')
		else if(location.pathname=='/thread.php')
			ngaAds.loadGroup('thread')
		else
			ngaAds.loadGroup('other')
		}
	}
else{
	ngaAds.genadslist()
	ngaAds._push = ngaAds.push
	ngaAds.push = function(x){
		this._push(x)
		this.genadslist(x.id)
		}//
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

ngaAds.genAds = function (a,maxw){
if(this[a.id+'_perproc'])
	a = this[a.id+'_perproc'](a)	
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
	var ww = (a.width|=0) ? a.width+'px' : 'auto',hh = (a.height|=0) ? a.height+'px' : 'auto', aw=maxw && a.width>maxw ? maxw+'px' : ww, iml = maxw && a.width>maxw ?'-'+((a.width-maxw)/2)+'px':'auto'
	if(a.placeholder){
		if(!this.loadQueue)
			this.loadQueueInit()
		return "<div style='display:inline-block;*display:inline;*zoom:1;border:1px solid #000000;margin:auto;"+(ww?' ;width:'+ww:'')+(hh?' ;height:'+hh:'')+"'><img src='about:blank' style='display:none' onerror='var t=this.parentNode;commonui.aE(window,\"DOMContentLoaded\",function(){ngaAds.loadQueue.insert(t,\""+a.id+"\")})'/></div>";
		}
	var tp = (''+a.file).match(/\.(jpg|jpeg|png|bmp|gif|swf)$/), img='', ic="<br/><img src='"+__IMG_STYLE+"/admark.png' style='margin:-18px 0 auto calc(100% - 48px)'>"
	/*if(tp && tp[1]=='swf'){
		img = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" style="background:#000" width="'+a.width+'" height="'+a.height+'" style="'+(a.style?a.style:'')+'" onload="'+(a.onload?'ngaAds[\''+a.id+'\'].onload.apply(this)':'')+'"><param value="transparent" name="wmode"/><param name="movie" value="'+a.file+'"/><embed wmode="transparent" src="'+a.file+'" width="'+a.width+'" height="'+a.height+'"/></object>';
		img = (a.url?"<a href='"+a.url+"' target='_blank' ":"<div ")+"style='display:block;border:1px solid #000000;width:"+ww+";height:"+hh+";margin:auto;text-align:right;overflow:hidden;line-height:0px;font-size:0px;"+(a.style?a.style:'')+"'' target='_blank' title='"+a.title+"'>"+img+ic+(a.url?"</a>":"</div>")
		return img
		}
	else */if(tp){
		img = "<img src='"+a.file+"' title='"+a.title+"' style='"+(ww?' ;width:'+ww:'')+(hh?' ;height:'+hh:'')+";margin:auto;margin-left:"+iml+"' onload='"+(a.onload?'ngaAds["'+a.id+'"].onload.apply(this)':'')+"'/>";
		img = (a.url?"<a href='"+a.url+"' target='_blank' ":"<div ")+" style='display:block;border:1px solid #000000;width:"+aw+";height:"+hh+";margin:auto;text-align:center;overflow:hidden;"+(a.style?a.style:'')+"' title='"+a.title+"'>"+img+ic+(a.url?"</a>":"</div>")
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
		img =  "<ifr"+"ame scrolling='no' frameborder='0' style='border:1px solid #000000;margin:0px;width:"+ww+";height:"+hh+";overflow:hidden;margin:auto;margin-left:"+iml+";"+(a.style?a.style:'')+"' src='"+a.file+"' onload='"+(a.onload?'ngaAds["'+a.id+'"].onload.apply(this)':'')+"' "+rr+"></ifr"+"ame>";
		img = "<div style='display:block;border:1px solid #000000;width:"+aw+";height:"+hh+";margin:auto;text-align:center;overflow:hidden;"+(a.style?a.style:'')+"' title='"+a.title+"'>"+img+ic+"</div>"
		return img;
		}

	}
}
//fe
