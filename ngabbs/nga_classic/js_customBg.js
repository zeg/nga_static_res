
;(function(){
var ___LOADED,
___CANUSE = window.__CURRENT_UID && ((window.File && window.FileReader && window.FileList) || (window.__UA && __UA[0]==1 && __UA[1]>=8)),
___LAST,
___TRANS,//&4 trans pic		&1 css added
___LOGO = __IMG_STYLE+'/logoshadow6.png',
___OJ
,__OY

commonui.customBackgroundInit = function(a){
var uu=this.userCache.get('customBackgroundFile')
if(uu){
	a=[1,null,0,268]
	uu = uu.replace(/~\d+$/,function($0){
		a[3] = $0.substr(1)|0
		if(a[3]<190)a[3]=190
		if(a[3]>268)a[3]=268
		return ''})
	a[1] = uu
	}
___LAST = a.join('|')
if(a[1]==0){
	if(!window.Trianglify)
		return loader.script(__COMMONRES_PATH+'/trianglify.min.js',function(){commonui.customBackgroundInit(a)})
	a[4] = Trianglify({
		height: a[3],
		width: a[2],
		cell_size: 30+Math.random()*100})
	a[1] = a[4].png()
	delete a[4]
	}
if(a[0]==1)
	this.customBackground(a[1],a[2],a[3],a[4],a[5],a[6])
else if(a[0]==2)
	this.customVerticalBackgroundInit(a[1],a[2],a[3])
}//fe

commonui.customBackgroundUpdate = function(a){
if(window.__UA && __UA[0]==1 && __UA[1]<=6)return
if(a.join('|')==___LAST || !___OJ)
	return
___LAST = a.join('|')
var u = a[1],
l = a[2],
os = a[3],
v = a[4],
opt = a[5],
vbgc = a[6],
s = 0,
o

___TRANS = opt
if((___TRANS&12) && os>190){
	s=190
	if((___TRANS&1)==0){
		__NUKE.addCss("\n #m_pbtntop, #m_nav, #custombg .overlay, #custombg .overlay a, #custombg .logo, #toptopics {transform:translateY(0px)} \n")
		___TRANS |= 2
		}
	}
else{
	___TRANS &= ~12
	s=os
	}
console.log(___TRANS,os,s)
___OJ.$0('_moveY',os-s,'style','height:'+os+'px;margin:0 0 -'+os+'px;overflow:hidden;background:url("'+u+'") '+(___TRANS&16 ? 'top' : 'bottom')+' left repeat;transform:none;transition:none')
if(___TRANS&4)
	___OJ.$0('style','margin:-'+(os-s)+'px 0 -'+s+'px 0;transform:translateY(0px);transition:transform 45s linear')
	
__OY.$0('_heightO',os,'_heightS',s,'style','height:'+s+'px')

}//
/*
commonui.ifCustomBackground=function(){
if(commonui.userCache.get('customBackgroundFile'))
	return true
}

commonui.customBackgroundCheckHeight=function(o){

if(o.getBoundingClientRect && this.customBackgroundHeight){
	var x = this.customBackgroundHeight-(o.getBoundingClientRect().top + __NUKE.getDocSize().sT - $('mc').getBoundingClientRect().top)
	if (x > 0){
		if(x > 45)
			return 2
		return 1
		}
	}
return 0

},//fe
*/



/**
 *u 背景图地址
 *l 背景图宽度 (无用
 *s 背景图高度
 *v video
 *opt &1 noautoplay &2占用勿设 &4大图剪切到190,点击移动 &8大图剪切到190,点击扩大 &16图片上端对齐,否则为下端对齐
 */
commonui.customBackground=function(u,l,os,v,opt,vbgc){
if(window.__UA && __UA[0]==1 && __UA[1]<=6)return
if(___LOADED || !document.body)return
___LOADED=true

var $ = _$,x = $('custombg'),z=55,y,vo,voc,vog,s,w= window,c=w.commonui

if (x)x.parentNode.removeChild(x)
//if(parseInt(cookieFuncs.getMiscCookie('notLoadPAndS'),10))s=130
___TRANS = opt
if((___TRANS&12) && os>190){
	s=190
	}
else{
	___TRANS &= ~12
	s=os
	}

/*
if(w.__UA && w.__UA[0]==1 && w.__UA[1]<=6){
	var f = function(u,s){return "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+u+"'"+(s?",sizingMethod='scale'":'')+")"}
	if(s!=190)s=190
	var x = $('<div/>')._.css({height:(s+1)+'px',filter:f(__IMG_STYLE+'/mask2_v2.png',1)})._.aC(
		$('<div/>')._.css({height:(s+1)+'px',filter:f(__IMG_STYLE+'/mask1_v3.png',1)})
		)
	}*/
//else{
	var cok = "customBackgroundOverlay_2_"+s+"_"+__COLOR.bg0, l1// = c.userCache.get(cok)
	if(!l1){
		if(!w.PNGlib){
			___LOADED=false
			return __SCRIPTS.asyncLoad(__COMMONRES_PATH+'/js_pnglib.js', function(){commonui.customBackground(u,l,os,v,opt,vbgc)})
			}
		var tmp = function(x,y,z,rgb){//宽 高 渐变部分高
			var p = new PNGlib(x, y, 256), j=z, a=0
			p.color(0, 0, 0, 0)
			for (var i = y-1; i >= 0; i--){
				if(j>0)j--
				a = Math.floor(0xff*	(Math.sin(((j && z ? j/z : 0)-0.5)*Math.PI)+1)/2	)+((i&1)?50:0)
				p.buffer[p.index(0, i)] = p.color(rgb[0], rgb[1], rgb[2], a>0xff?0xff:a)
				}
			return p.getBase64()
			}//fe
		l1 = tmp(1, s+2, 0, c.hexToRgb(__COLOR.bg0))
		c.userCache.set(cok, l1, 86400*30)
		}
	var x = $('/div','className','overlay','style','height:100.5%;boxShadow:inset 0 0 1.5em 0 black','style',{background:'url(data:image/png;base64,'+l1+')'},
					(___CANUSE ? $('/a','href','javascript:void(0)','style','color:#fff;font-size:20px;opacity:0.33;float:right',__TXT('gear'),'onclick',function(e){commonui.mainMenu.data[95].on.func(e)}) : null)
					)
//	var x = _$('<div/>')._.css({height:(s+1)+'px',background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVJREFUeNpi/P//PwMTAwODGkCAAQAYLAMn19xlOwAAAABJRU5ErkJggg==)"})._.aC(     _$('<div/>')._.css({height:(s+1)+'px',background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAC/CAYAAAA/1baMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAENJREFUeNpi+P//PwMTAxCMEqMEucTf90wgFjaCGU6gcdEIFlwsbFxsBCthMUq4OMVY8LoUp9+wEdgCDBsBCXaAAAMAc4cHZX7oZPoAAAAASUVORK5CYII=) bottom left repeat-x"})    )
//	}


___OJ = $('/div','_moveY',os-s,'style','height:'+os+'px;margin-bottom:-'+os+'px;overflow:hidden;background:url("'+u+'") '+(___TRANS&16 ? 'top' : 'bottom')+' left repeat')
if(___TRANS&4)
	___OJ.$0('style','margin:-'+(os-s)+'px 0 -'+s+'px 0;transform:translateY(0px);transition:transform 45s linear')

y = $('/div','_heightO',os,'_heightS',s,'style','height:'+s+'px;overflow:hidden;transition:height 1s ease',___OJ)
__OY = y

x._.on('click',function(){
	console.log(___TRANS)
	if(___TRANS&4)
		___OJ.style.transform='translateY('+___OJ._moveY+'px)'
	else if(___TRANS&8)
		__OY.style.height=__OY._heightO+'px'
	})


if(v){
	___TRANS |= 4
	//opt = opt|0
	var ts = __NUKE.cpblName(document.body.style,'transition',1)
	if(ts){
		y.$0('style',ts[0]+":opacity 0.5s linear 0s,0.5s;transform:scale(1)",
				'ontransitionend',function(){
					if(vo.__played){
						if(vo && vo.parentNode){
							vo.parentNode.removeChild(vog)
							vo.parentNode.removeChild(vo)
							voc.parentNode.removeChild(voc)
							}
						return
						}
					vo.__played=1
					vo.play()
					})
		vog = $('/div','id','videobgbg','style','position:absolute;left:0px;width:100%;top:'+z+'px;zIndex:-3;height:'+s+'px'+(vbgc?';backgroundColor:#'+vbgc:''))
		vo = $('/video').$0('id','videobg','preload','none','style','position:absolute;left:0px;top:'+z+'px;zIndex:-2;height:'+s+'px;backgroundSize:cover;transform:scale(1)',
			$('/source').$0('src',v,'type','video/'+(v.substr(v.length-4)=='webm'?'webm':'mp4')),
			'onended',function(){
				var n = $('m_nav')
				n.style.opacity = y.style.opacity = 1
				})
		voc = $('/div','id','videobgcover','style',{
					height:(s+1)+'px',
					overflow:'hidden',
					zIndex:-1,
					position:'absolute',
					left:'0px',
					right:'0px',
					top:z+'px',
					background:"url(data:image/png;base64,"+l1+")"
					})
		if(___TRANS&1){
			this.customBackgroundVideoPlay = function(onplay){
				if(vo._played)return;
				vo._played=1
				vo.preload=true
				if(onplay)
					vo.$0('oncanplaythrough',function(){onplay()})
				}
			}
		vo.$0('oncanplaythrough',function(e){
				//var n = $('m_nav')
				//n.$0('style',ts[0]+":opacity 0.5s linear 0s,0.5s;transform:scale(1)")
				y.style.opacity = 0
				})
		}
	}

//y._.add(_$('/video').$0('src','http://127.0.0.1/World%20of%20Battleships%20E3%202012%20Trailer_6.mp4','width',1920,'height',210,'style','position:remarginBottom:-210px','autoplay','autoplay'))
/*
if(l==1){
	var l = _$('<div/>')._.css({margin:'auto auto auto 40px',width:'271px',height:'138px'})
	if(w.__UA && w.__UA[0]==1 && w.__UA[1]<=6)
		l._.css({filter:f('logoshadow5.png')})
	else
		l._.css({background:'url('+__IMG_STYLE+'/logoshadow7.png)'})
	y._.aC(
		_$('<div/>')._.css({'marginBottom':'-168px',paddingTop:'30px',textAlign:'left'})._.aC(
			l._.aC(  _$('<div/>')._.css({width:'271px',height:'138px',background:'url('+__IMG_STYLE+'/logo7.png)'})  )
			)
		)
	}
else if(l==2){*/
if(___LOGO){
	var l = _$('/div','style','margin:auto auto auto 70px;width:451px;height:57px')
	if(w.__UA && w.__UA[0]==1 && w.__UA[1]<=6)
		l._.css({filter:f( ___LOGO )})
	else
		l._.css({background:'url('+___LOGO+')'})
	y._.add(
		$('/div','className','logo','style','marginBottom:-157px;paddingTop:100px;textAlign:left',l)
		)
	}
/*	}*/

y._.add(x)
x = $('/div','id','custombg','style','height:'+os+'px;marginTop:'+z+'px;marginBottom:-'+(os+z)+'px')._.add(y)
if(this.customBackgroundVideoPlay)
	x._.on('mouseover',function(){commonui.customBackgroundVideoPlay()})

s=document.body
if(c.userCache.get('customBackgroundInvertTxt') && s.className.indexOf('invertColor')==-1)
	s.className+=' invertColor'
s.className+=' haveCustomBackground'
var s = document.getElementById('mmc')
if(s.firstChild)s.insertBefore(x,s.firstChild)
else s.appendChild(x)
if(vo){
	document.body.appendChild(vog)
	document.body.appendChild(vo)
	document.body.appendChild(voc)
	}
if(___TRANS&12){
	___TRANS|=2
	__NUKE.addCss("\n #m_pbtntop, #m_nav, #custombg .overlay, #custombg .overlay a, #custombg .logo, #toptopics {transform:translateY(0px)} \n")
	}
}//fe

commonui.receiveBase64Data = function(base64){
if(base64.length>(1024*2048))
	return alert('文件大小不能超过1536k');

var x = new Image()
try{
	x.src =  base64
	}
catch (e){
	return alert('IE8 不支持超过32KB数据(图片在20KB左右)\n请升级你的浏览器或选择较小的文件')
	}
$('CBG_8667368')._data = base64
}

commonui.mainMenu.data[95]={u:1,
check:function(){if (___CANUSE)return true},//ie8+或支持window.FileReader
innerHTML:'设置背景',
on:{
	event:'click',
	func:function(e){
		commonui.createadminwindow()
		var x = commonui.adminwindow,$=_$
		x._.addContent(null)
		x._.addTitle('设置背景图')
		var y = $('/span','id','CBG_8667368')._.add(
			'图片将保存在浏览器储存中',
			$('/br'),
			'可能会意外清除 请自行备份原图',
			$('/br'),
			'背景图区域高度最小190像素 最大268像素',
			$('/br'),
			'文件大小不超过1536k',
			$('/br'),
			(
			(window.File && window.FileReader && window.FileList)?
				//支持window.FileReader
				$('/input','type','file','onchange',function(e) {
					var f = e.target.files[0], p = this.parentNode
					if(f.size>(1024*1536))
						return alert('文件大小不能超过1536k');
					var reader = new FileReader();
					reader.onload = function(e) {
						p._data = e.target.result
						};
					reader.readAsDataURL(f);
					}
				)
				:
				//不支持window.FileReader 使用flash
				_$('<object type="application/x-shockwave-flash" align="middle" id="file2base64_111021" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" style="width:200px;height:100px"><param name="movie" value="'+__COMMONRES_PATH+'/image2dataurl.swf?callback=commonui.receiveBase64Data"/><param name="wmode" value="transparent"><param name="allowScriptAccess" value="always" /><param name="callback" value="commonui.receiveBase64Data" /><embed wmode="transparent" src="'+__COMMONRES_PATH+'/image2dataurl.swf?callback=commonui.receiveBase64Data" width="200" height="100" allowScriptAccess="always" callback="commonui.receiveBase64Data"/></object>')
			),
			$('/br'),
			$('/br'),
			$('/button','onclick',function(){
				var data = this.parentNode._data
				if(data){
					var x = new Image()
					x.src =  data
					commonui.userCache.set("customBackgroundFile",data+(x.height?'~'+x.height:''),86400*365)
					}
				else{
					commonui.userCache.del("customBackgroundFile")
					commonui.userCache.del("customBackgroundInvertTxt")
					}	
				alert("设置完毕 刷新页面后生效")
				commonui.hideAdminWindow()},'type','button','innerHTML','确定'),
			$('/button','onclick',function(){commonui.userCache.del("customBackgroundFile");commonui.userCache.del("customBackgroundInvertTxt");alert("刷新页面后生效");commonui.hideAdminWindow()},'type','button','innerHTML','清除背景图')

		)
		x._.addContent(y)
		x._.show(e);
		}
	}
}//ve



commonui.customVerticalBackgroundInit = function(u,w,h){
var c= {0:'moz',1:'webkit',2:'ms',3:'o',4:'khtml'},x = function(a,b){
	if(b.toLowerCase() in a)
		return b.toLowerCase()
	for(var k in c)
		if(c[k]+b in a)
			return c[k]+b
	}
var y = document.body.style, s = x(y,'Transform')
if(s){
	var f = function(x){
		bg.style[s]='translateY(-'+x+'px)'
		}
	}
else{
	var f = function(x){
		bg.style.marginTop='-'+x+'px'
		}
	}
var y = window, self = this, r = x(y,'RequestAnimationFrame')
if(!r){
	r = function(f){
		qf = f
		if(!timeout){
			timeout = y.setInterval(function(){
				if(qf){
					qf()
					qf = null
					}
				else{
					y.clearInterval(timeout)
					timeout = null
					}
				},50)
			}
		}
	}
else
	r = y[r]

var mmc =$('mmc'),
ww=mmc.offsetWidth-w,
bgc, 
bg, 
z=y.__NUKE.position, 
qf, 
timeout

var pMW = commonui.addMmcMargin(w)
document.body.insertBefore(
	bgc = _$('/div').$0('id','verticalbgc','style',{position:'fixed', top: '0px', right: pMW+'px', width: w+'px', bottom:'0px', height: 'auto',  zIndex: 1, background:'#444'},
		bg = _$('/div').$0('style',{width: w+'px', height:h+'px', background:'url("'+u+'")'},
			_$('/div').$0('style',{width: w+'px', height:h+'px', background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACxJREFUeNpi/P//nS8DA8NZIH4GxGKMQAEpGAeIzUECDDAOSCUTMgekEiDAAHyDD0eQjhzCAAAAAElFTkSuQmCC)"},
				_$('/div').$0('style',{width: w+'px', height:h+'px', background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAABCAYAAAA8TpVcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACRJREFUeNpiZGBgKAfin1D8A4n+gSSOjH9B8W8k+g8Q/wUIMACHTBIGMC27cQAAAABJRU5ErkJggg==) left top repeat-y"})
				)
			)
		)
	, document.body.firstChild)

if(bg.offsetHeight>bgc.offsetHeight)
	commonui.aE(window,'scroll',function(e){
		var p = z.get(), x = Math.floor(p.yf/p.ph*(bg.offsetHeight-bgc.offsetHeight))
		r(function(){f(x)})
		})
document.body.className+=' verticalbg'
}//fe


commonui.mainMenu.data[18].subKeys.push(95)

})();

/*
commonui.mainMenu._new[95]=1319101708
commonui.mainMenu.getHintPos=function(){
var x=0,y=0
if($('mainmenu').firstChild.nodeName=='DIV')//头像
	x=96
else
	x=22
y=18
if(document.body.className.match(/notLoadImg|haveCustomBackground/)==null)
	y+=145
if(window.ngaAds && ngaAds['bbs_ads1'])
	y+=78
if (window._178NavAll_110906_765453)
	y+=23
return {x:x,y:y}
}//fe
*/