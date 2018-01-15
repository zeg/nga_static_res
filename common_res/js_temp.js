adminui.fIconGen = function(){
var $ = _$ , cv, ff,bb,tt,im,pos,om,lw,lh,mk=new Image(), ly=new Image()
ly.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpERjFFNkE2NjVERERFNjExOTBCMUZBREQxOUFFOEI0MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMDJBQUQ2NDcxMTIxMUU3OTNCQkQzQTQyODAzNzIyQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMDJBQUQ2MzcxMTIxMUU3OTNCQkQzQTQyODAzNzIyQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNDMTBBNkZENTQ3MEU3MTFCQTRFQzQ2MjlCQTQ3MDU2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRGMUU2QTY2NUREREU2MTE5MEIxRkFERDE5QUU4QjQyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+W+q3+AAAAydJREFUeNrMmVtIFGEUx1e7YW0XoovSRcul2h6yIsk0yYqKJQp9Len2IN2pl16i3nsJgi72UE/ZSw8rBClBLhW2BEIUaEm1pV22G920hAKn/6H/0Dh9s7PuuvPNgZ+fzOzs/D3f953vnGOeYRgBP9to+bGtaIwvxV1N/v4rMAMrARWgDCwGxaAIFPD+AHgLXoIn4AGIg1cZeTANGwXWgzoQoSDTPoJn4A74wmtTwSywGtRaPpsArSAK2sBgtgIngiOgAczmtU5wBsRAB3jj8h3yXDmoAZvAftILzoNzoN/p4TzZJA5rcCu4BKZxuuT3JtCd5dIKg3qwm8viHdgDWlRrMN/hS7aAZjAWHADzwMkRECf2GBznOj4EguA62JyuByeBp5z+Ki7yXNoScA98ByHw082Dh8EMcMIDcWKPODsy3fvcPCheeyHXwXzwy6OQV8BN84PvHXTy4DruusseijPj5jWGr2rrDbvAOo5NGg6OKxxrUwncwF3WrUFgnMsr4iRwOigFNzUdvQbfvRAUqgSu5HhbY34Q47hKJbCc432NAjs4lqkELgWfeKzpsgQDdlglsJgniE4zKLJEJbAwk3wtB/YazFQJDNK9uu0b84H/BBo84vxghkpgPxNU3TYZ9KkESuI41wcC54CkSmAPWKBZnJlF9agEdrHYCWkUGOIy61IJfMixUqPAFTYtQwTGfSCwxqZliMBepjtrNArcyHTvg1M+KKXfInYLvLZlPOJaUiWszRy3axBYzzGaSuAtTrUU1eM8FDce7GCy0p5KoFRTjSwBGzwUeJAdjEbrMedUuE8Az+nBKmtMypEtB3fBZx4UA26Fu9SmuxgwJbs+GvjXVhvpWvgYxYkzdlrFOU2xaa3slcihfZrr8ixjZDYZjzwrLbkLzPtO0XNSTbYNt7tlLl5pHu3lGRlgrIxxMcfZHnHqI+czZFWStZaERHqK0nq7qPKcOcVuAq0vqmZRHWFpaE0wE/RyH70UZAlRakvhJAjfYDhrT/GHDVug3WSXV7DQCtMr0nCawvtfwXuK7mSDKM5raVs2PeokA2o05/mX3/8N8UeAAQCcJ9B5GAPkkAAAAABJRU5ErkJggg=='
mk.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpERjFFNkE2NjVERERFNjExOTBCMUZBREQxOUFFOEI0MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGQUMyRjBBRDcxMUIxMUU3QTQ0M0E1MzZBMEY5MTEzQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGQUMyRjBBQzcxMUIxMUU3QTQ0M0E1MzZBMEY5MTEzQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNDMTBBNkZENTQ3MEU3MTFCQTRFQzQ2MjlCQTQ3MDU2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRGMUU2QTY2NUREREU2MTE5MEIxRkFERDE5QUU4QjQyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ThnU1wAAA2VJREFUeNrsmM2P0lAUxSmfMnxF1KADibgYNboZXYwb/3tXjgvcqEGiM8kEI1Ew0BEoMK3nJeclN09KW2gJMU5y0sRg76/n3vfevc/yPC91yH/p1IH/HTxgdtcXWJZVwaMGlaE8/3kB2dAEJWTvFRBALTweQg2oDlWhI8Jl+LMbyIFm+P0EzxE0gC4B3I8dEEGKeJxCJ1ATukPXSlCRcFlRMi60IuQc+g2NoZ94lwLsQR3AOoGxg1YxXvgcjzPoMXQM3YYqBCsIOOWexf/m0cUV061AptA13fwGfYbOEf/j1g4C7hUer6FnUIspVbV2i2A5gmXongR0Cam0JOiMbj7QJYIYJUC+iwxI5xTcS6gN3RNwOZHStEitBNSpNkHnrNuSXlSIdQ3IT6EBWXNndK7N1NYIJ8Esv+8ztjHtaIHv0B+ZYvqHiPkFkIuwDp6y5lp0rsaVmmNwK+riF2UgHV+yLlWsF9DbsBv1CV2rG2lNbwG3DjTLd1YY45gxg08S7nNNrtaySKsV4wGR5jsLjKEgm4h9P4yDbe5zlRidW+dkmu/WTqqYj8IANlhz6zbgVEIuFhmzEQawzi0gKff86lGn2h+QB78+JXIJume6qFNdVRv3Jgdr4uDPGltCKmEX8zSmvAmwbJytSfeLlgFZYAZ9AfPGuWolVH8moF7VGUIedEftbQJc8FB3+UPP/A8JwHhG9+NsArzmD1YCNGm3XNE7OmTwBRyzZ9sXpCe67wWbWtsXkAPOhD3bYg+AEk4ZY4NhGrRIRux6HbZDNwnVoSeaWIcxh2GOugFTPU3YRTO1Y8YOBLxQ0xeLdcYvdGN2UdeeHgFsxrwMBEQNqImrL1I955e6Mbun4ZQRv1RMxP4etqPucTQc8evmYlV7MdTdSsCNaEgvylTXgZ6yPyuJASfs0OSXUumcqrkf0BVn5E5oQDXxo+05Z3+WFwOOOXb6ndvrToiVkVYF9xX6oIYlxFxGmovVxC96M73Drxvc1znqGenUg7tM6xXh3iBWd6ubBTXxq6GaK+yJcfVxtMXVh60XBNTl1Ud3p7sZdtp54/LobsjLI3ndMeaH9llz7/3SGhnQgG1w8mtwEqsaXbi8ftOuDbkJXyDeIFK8Xe+oeU1SZW0WmGZda3+drZHf//8S/V8H/CPAAGF2Uozm5VyZAAAAAElFTkSuQmCC'


var downSize = function(im,l){
y = document.createElement( 'canvas' )
var x = l/(im.width>im.height ? im.height : im.width)
if(x<0.5)x=0.5
y.width = Math.round(im.width*x)
y.height = Math.round(im.height*x)
y.getContext( '2d' ).drawImage(im,0,0,Math.round(im.width*x),Math.round(im.height*x))
return y
},
mask = function(m,im){
var mkk = document.createElement('canvas')
mkk.width=mk.width
mkk.height=mk.height
mkk.getContext('2d').drawImage(m,0,0)
var al = mkk.getContext('2d').getImageData(0, 0, mkk.width, mkk.height).data,
xc = im.getContext('2d').getImageData(0, 0, mk.width, mk.height), xcn = xc.data;
// loop through alpha mask and apply alpha values to base image
for (var i = 3, len = al.length; i < len; i = i + 4) {
	if (al[i])
		xcn[i] = al[i]
	else
		xcn[i-3] = xcn[i-2] = xcn[i-1] = xcn[i] = 0
	}

var xcn=document.createElement('canvas')
xcn.width=mk.width
xcn.height=mk.height
xcn.getContext('2d').putImageData(xc,0,0)
return xcn
}

commonui.createadminwindow()
commonui.adminwindow._.addContent(null)
commonui.adminwindow._.addTitle('生成图标')
commonui.adminwindow._.addContent(
	$('/span')._.add('选择图片 > 剪裁合适的区域 > 观察效果 > 提交(有最多15分钟延时)'),
	$('/br'),
	im = $('/canvas','style','display:none'),
	om = $('/canvas','style','display:none;cursor:crosshair;','onmousedown',function(e){
		pos = __NUKE.position.get(e)
		,cr = this.getClientRects()
		pos.x = pos.cx-cr[0].left
		pos.y = pos.cy-cr[0].top
		om.getContext('2d').fillStyle = '#00ccff'
		om.getContext('2d').globalAlpha= 0.3
		},'onmousemove',function(e){
			if(!pos)return
			var p = __NUKE.position.get(e),cr = this.getClientRects()
			p.x = p.cx-cr[0].left
			p.y = p.cy-cr[0].top
			var w = p.x-pos.x < p.y-pos.y? p.x-pos.x : p.y-pos.y
			this.getContext('2d').clearRect(0, 0, this.width, this.height)
			this.getContext('2d').fillRect(pos.x , pos.y, w,  w);
		},'onmouseup',function(e){
				var poss = __NUKE.position.get(e),cr = this.getClientRects()
				,sx = ((pos.cx < poss.cx ? pos.cx : poss.cx)-cr[0].left)|0
				,sy = ((pos.cy < poss.cy ? pos.cy : poss.cy)-cr[0].top)|0
				,sw = Math.abs(pos.px - poss.px)|0
				,sh = Math.abs(pos.py - poss.py)|0
				pos=null
				if(sw>sh)sw=sh
				if(sh>sw)sh=sw
				if(!sw || !sh)
					return
				
				var limit=40, i = 0, x= document.createElement( 'canvas' )
				x.width=sw
				x.height=sh
				x.getContext('2d').putImageData(im.getContext('2d').getImageData(sx, sy, sw, sh), 0, 0)

				while(x.width>limit || x.height>limit){
					var x = downSize(x,limit)
					i++
					if(i>10)
						break;
					}

				var x = mask(mk,x)
				
				x.getContext('2d').drawImage(ly,0,0)
				
				var xc = x.getContext('2d').getImageData(0, 0, x.width, x.height), imageData = xc.data;
				for (var i = 3, len = imageData.length; i < len; i = i + 4)
					imageData[i]*=0.85
					
				
				cv.width=limit
				cv.height=limit
				cv.getContext('2d').putImageData(xc,0,0)
				cv.style.display=''
				bb.disabled = false
		}),
	$('/br'),
	cv = $('/canvas','style','display:none','width',100,'height',100),
	$('/br'),
	$('/input','type','file','style','margin:0.25em 0','onchange',function(e) {
			var f = e.target.files[0], p = this.parentNode
			if(f.size>(1024*1536))
				return alert('文件大小不能超过1536k');
			var reader = new FileReader();
			reader.onload = function(e) {
				var mm = new Image()
				mm.onload=function(){
					om.width=im.width=mm.width
					om.height=im.height=mm.height
					im.getContext('2d').drawImage(mm,0,0)
					om.style.marginLeft = '-'+om.width+'px'
					om.style.display=im.style.display=''
					}
				mm.src = e.target.result
				}//
			reader.readAsDataURL(f);
			}
		),
	$('/br'),
	ff = $('/input','size','10','placeholder','版面ID'),
	tt = $('/input','size','10','placeholder','或合集ID'),
	bb = $('/button','disabled','disabled','innerHTML','提交','onclick',function(){
		__NUKE.doRequest({
			u:{u:__API._base+'__lib=modify_forum&__act=set_icon',
				a:{fid:ff.value|0,tid:tt.value|0,img:cv.style.display=='' ? cv.toDataURL().replace(/data:image\/png;base64,/,'') : '',raw:3}
				},
			b:this
			})
		})
	)
commonui.adminwindow._.show()
}//fe


commonui.imageEditor = function(img64){
var $= _$,im = new Image(), og, mk, tp
im.onload = function(){
	og.width=mk.width=tp.width=this.width
	og.height=mk.height=tp.height=this.height
	og.style.marginRight = mk.style.marginRight = '-'+this.width+'px'
	og.getContext('2d').drawImage(this,0,0)
	og.style.display=mk.style.display=tp.style.display=''
	commonui.adminwindow._.show()
	}

var move = function(e,p,pp){
if(fn==1){
	if(Math.abs(p.x-path[path.length-1][0])>pli || Math.abs(p.y-path[path.length-1][1])>pli){
		tpx.fillRect(p.x-hbs , p.y-hbs, bs, bs)
		path.push([p.x,p.y])}
		
	}
},//
up = function(e,p,pp){
if(fn==1){
	tpx.clearRect(0,0,tp.width,tp.height)
	if(path.length>1)
		bezierCurveThrough(mk.getContext('2d'),path,0.5)
	}
},//
down=function(e,p,pp){
if(fn==1){
	path=[]
	pli = Math.min(tp.width,tp.height)/40
	if(pli<8)pli=8
	if(pli>16)pli=16
	console.log(pli)
	path.push([p.x,p.y])
	}
},
bezierCurveThrough = function (ctx, points, tension) {//https://github.com/dobarkod/canvas-bezier-multiple/
tension = tension || 0.25;// Default tension of one-quarter gives nice results
var l = points.length;
if (l < 2) return;
ctx.beginPath();
if (l == 2) {
	 ctx.moveTo(points[0][0], points[0][1]);
	 ctx.lineTo(points[1][0], points[1][1]);
	 ctx.stroke();
	 return;
	}
function h(x, y) {
	 return Math.sqrt(x * x + y * y);
	}
var cpoints = [];
points.forEach(function() {
	 cpoints.push({});
});
for (var i = 1; i < l - 1; i++) {
	var pi = points[i], 
		 pp = points[i - 1], 
		 pn = points[i + 1]; 

	var rdx = pn[0] - pp[0], 
		 rdy = pn[1] - pp[1], 
		 rd = h(rdx, rdy), 
		 dx = rdx / rd, 
		 dy = rdy / rd; 

	var dp = h(pi[0] - pp[0], pi[1] - pp[1]),
		 dn = h(pi[0] - pn[0], pi[1] - pn[1]);

	var cpx = pi[0] - dx * dp * tension,
		 cpy = pi[1] - dy * dp * tension,
		 cnx = pi[0] + dx * dn * tension,
		 cny = pi[1] + dy * dn * tension;

	cpoints[i] = {
	  cp: [cpx, cpy],
	  cn: [cnx, cny]
	  }
	}
cpoints[0] = {cn: [ (points[0][0] + cpoints[1].cp[0]) / 2, (points[0][1] + cpoints[1].cp[1]) / 2 ]}
cpoints[l - 1] = {cp: [ (points[l - 1][0] + cpoints[l - 2].cn[0]) / 2, (points[l - 1][1] + cpoints[l - 2].cn[1]) / 2 ]}
ctx.moveTo(points[0][0], points[0][1])
for (i = 1; i < l; i++) {
	var p = points[i],
		 cp = cpoints[i],
		 cpp = cpoints[i - 1];
	ctx.bezierCurveTo(cpp.cn[0], cpp.cn[1], cp.cp[0], cp.cp[1], p[0], p[1]);
	}
ctx.stroke();
}//

commonui.createadminwindow()
commonui.adminwindow._.addContent(null)
commonui.adminwindow._.addTitle('编辑图片')
commonui.adminwindow._.addContent(
	$('/span')._.add(
		og = $('/canvas','style','display:none'),
		mk = $('/canvas','style','display:none'),
		tp = $('/canvas','style','cursor:crosshair;display:none',
			'onmousemove',function(e){
				if(e.buttons&1){
					pp = p
					p = __NUKE.position.get(e),cr = this.getClientRects()
					p.x = p.cx-cr[0].left
					p.y = p.cy-cr[0].top
					move(e,p,pp)
					}
				},
			'onmousedown',function(e){
				if(e.buttons&1){
					pp={x:-100,y:-100}
					p = __NUKE.position.get(e),cr = this.getClientRects()
					p.x = p.cx-cr[0].left
					p.y = p.cy-cr[0].top
					down(e,p,pp)
					}
				},
			'onmouseup',function(e){
				
					pp=p
					p = __NUKE.position.get(e),cr = this.getClientRects()
					p.x = p.cx-cr[0].left
					p.y = p.cy-cr[0].top
					up(e,p,pp)
					
				}
			),
		$('/br'),
		'COLOR',$('/select',
			$('/option','innerHTML','red','style','color:#ff0000','value','#ff0000'),
			$('/option','innerHTML','black','style','color:#000000','value','#000000'),
			$('/option','innerHTML','white','style','color:#ffffff','value','#ffffff'),
			'onchange',function(){
				mk.getContext('2d').strokeStyle=mk.getContext('2d').fillStyle=tpx.strokeStyle =tpx.fillStyle = this.value
				}
			),' SIZE',
		$('/select',
			$('/option','innerHTML','5','value','5'),
			$('/option','innerHTML','10','value','10'),
			$('/option','innerHTML','15','value','15'),
			'onchange',function(){
				bs = this.value|0
				hbs = Math.round(bs/2)
				mk.getContext('2d').lineWidth=tpx.lineWidth=bs
				}
			)
		)
	)
im.src=img64
var tpx = tp.getContext('2d')

//default
mk.getContext('2d').strokeStyle=mk.getContext('2d').fillStyle=tpx.strokeStyle =tpx.fillStyle='#ff0000'
var bs = 5,
hbs = Math.round(bs/2),
fn = 1,
p = null,
pp={x:-100,y:-100},
path=[],
pli=0//路径点最小距离


}//fe