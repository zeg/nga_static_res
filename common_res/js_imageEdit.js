if(!window.commonui)
	var commonui = {}

if(window.adminui){
if(!window.adminui)
	var adminui = {}
adminui.fIconGen = function(){
var $ = _$ , cv, cv1, ff,bb,tt,im,pos,om,lw,lh,nb,
lys = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpERjFFNkE2NjVERERFNjExOTBCMUZBREQxOUFFOEI0MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMDJBQUQ2NDcxMTIxMUU3OTNCQkQzQTQyODAzNzIyQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMDJBQUQ2MzcxMTIxMUU3OTNCQkQzQTQyODAzNzIyQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNDMTBBNkZENTQ3MEU3MTFCQTRFQzQ2MjlCQTQ3MDU2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRGMUU2QTY2NUREREU2MTE5MEIxRkFERDE5QUU4QjQyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+W+q3+AAAAydJREFUeNrMmVtIFGEUx1e7YW0XoovSRcul2h6yIsk0yYqKJQp9Len2IN2pl16i3nsJgi72UE/ZSw8rBClBLhW2BEIUaEm1pV22G920hAKn/6H/0Dh9s7PuuvPNgZ+fzOzs/D3f953vnGOeYRgBP9to+bGtaIwvxV1N/v4rMAMrARWgDCwGxaAIFPD+AHgLXoIn4AGIg1cZeTANGwXWgzoQoSDTPoJn4A74wmtTwSywGtRaPpsArSAK2sBgtgIngiOgAczmtU5wBsRAB3jj8h3yXDmoAZvAftILzoNzoN/p4TzZJA5rcCu4BKZxuuT3JtCd5dIKg3qwm8viHdgDWlRrMN/hS7aAZjAWHADzwMkRECf2GBznOj4EguA62JyuByeBp5z+Ki7yXNoScA98ByHw082Dh8EMcMIDcWKPODsy3fvcPCheeyHXwXzwy6OQV8BN84PvHXTy4DruusseijPj5jWGr2rrDbvAOo5NGg6OKxxrUwncwF3WrUFgnMsr4iRwOigFNzUdvQbfvRAUqgSu5HhbY34Q47hKJbCc432NAjs4lqkELgWfeKzpsgQDdlglsJgniE4zKLJEJbAwk3wtB/YazFQJDNK9uu0b84H/BBo84vxghkpgPxNU3TYZ9KkESuI41wcC54CkSmAPWKBZnJlF9agEdrHYCWkUGOIy61IJfMixUqPAFTYtQwTGfSCwxqZliMBepjtrNArcyHTvg1M+KKXfInYLvLZlPOJaUiWszRy3axBYzzGaSuAtTrUU1eM8FDce7GCy0p5KoFRTjSwBGzwUeJAdjEbrMedUuE8Az+nBKmtMypEtB3fBZx4UA26Fu9SmuxgwJbs+GvjXVhvpWvgYxYkzdlrFOU2xaa3slcihfZrr8ixjZDYZjzwrLbkLzPtO0XNSTbYNt7tlLl5pHu3lGRlgrIxxMcfZHnHqI+czZFWStZaERHqK0nq7qPKcOcVuAq0vqmZRHWFpaE0wE/RyH70UZAlRakvhJAjfYDhrT/GHDVug3WSXV7DQCtMr0nCawvtfwXuK7mSDKM5raVs2PeokA2o05/mX3/8N8UeAAQCcJ9B5GAPkkAAAAABJRU5ErkJggg=='
mks = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpERjFFNkE2NjVERERFNjExOTBCMUZBREQxOUFFOEI0MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGQUMyRjBBRDcxMUIxMUU3QTQ0M0E1MzZBMEY5MTEzQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGQUMyRjBBQzcxMUIxMUU3QTQ0M0E1MzZBMEY5MTEzQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNDMTBBNkZENTQ3MEU3MTFCQTRFQzQ2MjlCQTQ3MDU2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRGMUU2QTY2NUREREU2MTE5MEIxRkFERDE5QUU4QjQyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ThnU1wAAA2VJREFUeNrsmM2P0lAUxSmfMnxF1KADibgYNboZXYwb/3tXjgvcqEGiM8kEI1Ew0BEoMK3nJeclN09KW2gJMU5y0sRg76/n3vfevc/yPC91yH/p1IH/HTxgdtcXWJZVwaMGlaE8/3kB2dAEJWTvFRBALTweQg2oDlWhI8Jl+LMbyIFm+P0EzxE0gC4B3I8dEEGKeJxCJ1ATukPXSlCRcFlRMi60IuQc+g2NoZ94lwLsQR3AOoGxg1YxXvgcjzPoMXQM3YYqBCsIOOWexf/m0cUV061AptA13fwGfYbOEf/j1g4C7hUer6FnUIspVbV2i2A5gmXongR0Cam0JOiMbj7QJYIYJUC+iwxI5xTcS6gN3RNwOZHStEitBNSpNkHnrNuSXlSIdQ3IT6EBWXNndK7N1NYIJ8Esv+8ztjHtaIHv0B+ZYvqHiPkFkIuwDp6y5lp0rsaVmmNwK+riF2UgHV+yLlWsF9DbsBv1CV2rG2lNbwG3DjTLd1YY45gxg08S7nNNrtaySKsV4wGR5jsLjKEgm4h9P4yDbe5zlRidW+dkmu/WTqqYj8IANlhz6zbgVEIuFhmzEQawzi0gKff86lGn2h+QB78+JXIJume6qFNdVRv3Jgdr4uDPGltCKmEX8zSmvAmwbJytSfeLlgFZYAZ9AfPGuWolVH8moF7VGUIedEftbQJc8FB3+UPP/A8JwHhG9+NsArzmD1YCNGm3XNE7OmTwBRyzZ9sXpCe67wWbWtsXkAPOhD3bYg+AEk4ZY4NhGrRIRux6HbZDNwnVoSeaWIcxh2GOugFTPU3YRTO1Y8YOBLxQ0xeLdcYvdGN2UdeeHgFsxrwMBEQNqImrL1I955e6Mbun4ZQRv1RMxP4etqPucTQc8evmYlV7MdTdSsCNaEgvylTXgZ6yPyuJASfs0OSXUumcqrkf0BVn5E5oQDXxo+05Z3+WFwOOOXb6ndvrToiVkVYF9xX6oIYlxFxGmovVxC96M73Drxvc1znqGenUg7tM6xXh3iBWd6ubBTXxq6GaK+yJcfVxtMXVh60XBNTl1Ud3p7sZdtp54/LobsjLI3ndMeaH9llz7/3SGhnQgG1w8mtwEqsaXbi8ftOuDbkJXyDeIFK8Xe+oeU1SZW0WmGZda3+drZHf//8S/V8H/CPAAGF2Uozm5VyZAAAAAElFTkSuQmCC',
mk1s='data:image/png;base64,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',
ly1s = 'data:image/png;base64,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',
mk2s='data:image/png;base64,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',
ly2s = 'data:image/png;base64,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'


var downSize = commonui.imageCanvasResize,
mask = function(m,im){
var mkk = document.createElement('canvas')
mkk.width=m.width
mkk.height=m.height
mkk.getContext('2d').drawImage(m,0,0)
var al = mkk.getContext('2d').getImageData(0, 0, mkk.width, mkk.height).data,
xc = im.getContext('2d').getImageData(0, 0, m.width, m.height), xcn = xc.data;
// loop through alpha mask and apply alpha values to base image
for (var i = 3, len = al.length; i < len; i = i + 4) {
	if (al[i]){
		//xcn[i] = al[i]
		}
	else
		xcn[i-3] = xcn[i-2] = xcn[i-1] = xcn[i] = 0
	}

var xcn=document.createElement('canvas')
xcn.width=m.width
xcn.height=m.height
xcn.getContext('2d').putImageData(xc,0,0)
return xcn
},
merge = function(g,m,l,t){//image, mask, overlay, trans
x= document.createElement( 'canvas' )
x.width=g.width
x.height=g.height
x.getContext('2d').drawImage(g,0,0)
if(m)
	var x = mask(m,x)
if(l)
	x.getContext('2d').drawImage(l,0,0)
if(t){
	var xc = x.getContext('2d').getImageData(0, 0, x.width, x.height).data;
	for (var i = 3, len = xc.length; i < len; i = i + 4)
		xc[i]*=t
	}
return x
}//fe

commonui.createadminwindow()
commonui.adminwindow._.addContent(null)
commonui.adminwindow._.addTitle('生成图标')
commonui.adminwindow._.addContent(
	$('/span')._.add('选择图片 > 剪裁合适的区域 > 观察效果 > 提交(有最多15分钟延时)'),
	$('/br'),
	mk = $('/img','style','display:none','src',mks),
	mk1 = $('/img','style','display:none','src',mk1s),
	mk2 = $('/img','style','display:none','src',mk2s),
	ly = $('/img','style','display:none','src',lys),
	ly1 = $('/img','style','display:none','src',ly1s),
	ly2 = $('/img','style','display:none','src',ly2s),
	cv = $('/canvas','style','display:none','width',100,'height',100),
	cv1 = $('/canvas','style','display:none','width',100,'height',100),
	cv2 = $('/canvas','style','display:none','width',100,'height',100),
	$('/br'),
	$('/input','type','file','style','margin:0.25em 0','onchange',function(e) {
			var f = e.target.files[0], p = this.parentNode
			if(f.size>(1024*1536))
				return alert('文件大小不能超过1536k');
			var reader = new FileReader();
			reader.onload = function(e) {
				var limit=180,limit2=40
				commonui.cutImage(null,e.target.result,7,limit,limit,function(im){
					var ii = new Image
					ii.onload = function(){
						var x = this
						while(x.width<limit)
							var x = downSize(x,limit)
						var y=merge(x, nb.checked?null:mk1, nb.checked?null:ly1, 0.9) 
						cv1.width=y.width
						cv1.height=y.height
						cv1.getContext('2d').putImageData(y.getContext('2d').getImageData(0, 0, y.width, y.height),0,0)
						cv1.style.display=''
						
						var y=merge(x, nb.checked?null:mk2, nb.checked?null:ly2, 0.9) 
						cv2.width=y.width
						cv2.height=y.height
						cv2.getContext('2d').putImageData(y.getContext('2d').getImageData(0, 0, y.width, y.height),0,0)
						cv2.style.display=''

						while(x.width>limit2)
							var x = downSize(x,limit2)
						var y=merge(x, nb.checked?null:mk, nb.checked?null:ly, 0.9) 
						cv.width=y.width
						cv.height=y.height
						cv.getContext('2d').putImageData(y.getContext('2d').getImageData(0, 0, y.width, y.height),0,0)
						cv.style.display=''
						
						bb.disabled = false			
						}
					ii.src=im
					})

				}//
			reader.readAsDataURL(f);
			}
		),
	nb = $('/input','type','checkbox'),'不加框',
	$('/br'),
	ff = $('/input','size','10','placeholder','版面ID'),
	tt = $('/input','size','10','placeholder','或合集ID'),
	bb = $('/button','disabled','disabled','innerHTML','提交','onclick',function(){
		__NUKE.doRequest({
			u:{u:__API._base+'__lib=modify_forum&__act=set_icon',
				a:{fid:ff.value|0,tid:tt.value|0,img:cv.style.display=='' ? cv.toDataURL().replace(/^data:image\/png;base64,/,'') : '',img2:cv1.style.display=='' ? cv1.toDataURL().replace(/^data:image\/png;base64,/,'') : '',raw:3}
				},
			b:this
			})
		})
	)
commonui.adminwindow._.show()
}//fe


}///if adminui


commonui.imageCanvasResize = function(im,xl,yl){
	y = document.createElement( 'canvas' )
	var x = xl ? xl/im.width : yl/im.height
	if(x<0.5)x=0.5
	else if(x>2)x=2
	y.width = Math.round(im.width*x)
	y.height = Math.round(im.height*x)
	y.getContext( '2d' ).drawImage(im,0,0,Math.round(im.width*x),Math.round(im.height*x))
	return y
	}

//剪裁图像
//如选区长或宽大于给定值则等比缩小至给定值以下
commonui.cutImage = function(e,img,opt,lw,lh,cb){//&1选区保持长宽比 &2确定后不关闭窗口 &4扩大选区
if(!this.cutImage.w)
	this.cutImage.w = this.createCommmonWindow()
var $=_$,bd=5,w = this.cutImage.w, c, om ,pos, poss,im, sx,sy,sw,sh,downSize = this.imageCanvasResize, redraw=function(x,y,w,h){
	om.getContext('2d').clearRect(0, 0, om.width, om.height)
	om.getContext('2d').fillRect(x , y, w,  h)
	}
w._.addContent(null)
w._.addTitle('剪切图片')
w._.addContent(
	$('/button','innerHTML','确定','style','marginBottom:0.5em','onclick',function(){
		if(!sw || !sh){
			sw = om.width
			sh = om.height
			sx=sy=0
			}
		var x= document.createElement( 'canvas' )
		x.width=sw
		x.height=sh
		//console.log(sx, sy, sw, sh, lw,lh)
		x.getContext('2d').drawImage(im, sx, sy, sw, sh, 0, 0, sw, sh)
		var rx = sw/lw,	ry = sh/lh
		if(rx<=1 && ry<=1){

			}
		else{
			if(rx>ry){
				while(x.width>lw)
					var x = downSize(x,lw)
				}
			else{
				while(x.height>lh)
					var x = downSize(x,null,lh)
				}	
			}
		cb(x.toDataURL())
		if(opt&2==0)
			w._.hide()
		}),$('/button','innerHTML','重置','onclick',function(){
			sx=sy=0
			sw = om.width
			sh = om.height
			om.getContext('2d').clearRect(0, 0, sw, sh)
		}),$('/br'),
	im = $('/img','style','display:none;border:'+bd+'px solid '+__COLOR.border0,'src',''),
	om = $('/canvas','style','display:none;cursor:crosshair;margin:'+bd+'px','onmousedown',function(e){
			sx=sy=sw=sh=0
			pos = __NUKE.position.get(e)
			,cr = this.getBoundingClientRect()
			pos.x = pos.cx-cr.left
			pos.y = pos.cy-cr.top
			om.getContext('2d').fillStyle = '#00ccff'
			om.getContext('2d').globalAlpha= 0.3
		},'onmousemove',function(e){
			if(!pos)return
			var p = __NUKE.position.get(e),cr = this.getBoundingClientRect()
			p.x = p.cx-cr.left
			p.y = p.cy-cr.top
			p.wx = p.x-pos.x
			p.hy = (opt&1) ? Math.abs((p.x-pos.x)/lw*lh|0)*(p.y<pos.y?-1:1) :  p.y-pos.y
			redraw(pos.x , pos.y, p.wx,  p.hy);
			poss = p
		},'onmouseup',function(e){
			if(!pos ||!poss)
				return
			sx = (poss.wx>0 ? pos.x : pos.x+poss.wx)|0
			sy = (poss.hy>0 ? pos.y : pos.y+poss.hy)|0
			sw = Math.abs(poss.wx)|0
			sh = Math.abs(poss.hy)|0
			redraw(sx , sy, sw,  sh);
			poss=pos=null

		}),
	$('/br'),
	$('/button','type','button','innerHTML','X+','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sx++
			redraw(sx , sy, sw,  sh);		
		}),
	$('/button','type','button','innerHTML','X-','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sx--
			redraw(sx , sy, sw,  sh);		
		}),
	$('/button','type','button','innerHTML','Y+','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sy++
			redraw(sx , sy, sw,  sh);		
		}),
	$('/button','type','button','innerHTML','Y-','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sy--
			redraw(sx , sy, sw,  sh);		
		}),$('/br'),
	$('/button','type','button','innerHTML','W+','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sw++
			redraw(sx , sy, sw,  sh);		
		}),
	$('/button','type','button','innerHTML','W-','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sw--
			redraw(sx , sy, sw,  sh);		
		}),
	$('/button','type','button','innerHTML','H+','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sh++
			redraw(sx , sy, sw,  sh);		
		}),
	$('/button','type','button','innerHTML','H-','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sh--
			redraw(sx , sy, sw,  sh);		
		})
				  
	)
im.onload=function(){
	if((opt&4)&&!im.__padded){
		om.width=(im.width*1.4)|0
		om.height=(im.height*1.4)|0
		om.getContext('2d').drawImage(im, 0, 0, im.width, im.height, (im.width*0.2)|0, (im.height*0.2)|0, im.width, im.height)
		im.src = om.toDataURL()
		im.__padded = 1
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
		return
		}
	im.style.marginRight='-'+(im.width+bd*2)+'px'
	om.width=im.width
	om.height=im.height
	im.style.display=om.style.display=''
	}
im.src = img
w._.show(e)
}//fe


//设置头像=====================
commonui.setAvatar2 = function (e,uid,ad){
if(!__CURRENT_UID)
	return alert('需要先登陆')
var av={},LIM=5,checksum='nochecksum',NEW='new',OTHER='other',KEEP='keep',
imc,y,y1,y2,y3,$=_$,
uu = function(im){
	var m
	//if(m = im.match(/\/[0-9a-z]{3}\/[0-9a-z]{3}\/[0-9a-z]{3}\/(\d+)_(\d+)\.(jpg|png|gif)\?(\d+)$/i)){//完整的本站头像地址还原成缩写
	//	if(m[1]==uid)
	//		im = '.a/'+m[1]+'_'+m[2]+'.'+m[3]+'?'+m[4]
	//	}
	im = commonui.avatarReal2Short(im)
	if(im.match(/^https?:\/\//))
		return [im,OTHER,'']
	else if(m = im.match(/^\.a\/(\d+)_(\d+)\.(jpg|png|gif)\?(\d+)/))
		return [__AVATAR_BASE_VIEW+'/'+('000000000'+(m[1]|0).toString(16)).replace(/.+?([0-9a-z]{3})([0-9a-z]{3})([0-9a-z]{3})$/,'$3/$2/$1')+'/'+m[1]+'_'+m[2]+'.'+m[3]+'?'+m[4],
			KEEP,(av[m[2]]=m[2])]
	else if(im.match(/^data:image\/(png|jpeg);base64,/)){
		for(m=0;m<LIM*2;m++){
			if(av[m]===undefined)
				return [im,NEW,(av[m]=m)]
			}
		return alert('不能添加更多了')
		}
	else
		return null
	},//
n = function(im){
	im = uu(im)
	return im ? [$('/img','title',im[2],'alt',im[1],'src',im[0],'style','border:5px solid '+__COLOR.border0),
				$('/a',__TXT('close'),'style','marginLeft:-5px;verticalAlign:1em','className','small_colored_text_btn white','href','javascript:void(0)','onclick',function(){
					var p = this.previousSibling
					delete av[p.title]
					this.parentNode.removeChild(p)
					return this.parentNode.removeChild(this)
					}),
				' '] : null
	}//
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('设置头像'+(uid==__CURRENT_UID?'':' UID:'+uid))
this.adminwindow._.addContent(imc = $('/div'),
	y=$('/span','style','display:none')._.add(
		'多个头像的显示方式 ',
		y1=$('/input').$0('type','radio','name','sa1234','checked','checked'),
		'随机 ',
		y2=$('/input').$0('type','radio','name','sa1234'),
		'时段 ',
		$('/br')
		),
	(ad && uid!=__CURRENT_UID)?$('/div')._.add(
		' 禁止重设头像',
		y3=$('/select')._.add(
			$('/option','innerHTML','--','value',0),
			$('/option','innerHTML','3天','value',3),
			$('/option','innerHTML','7天','value',7),
			$('/option','innerHTML','15天','value',15),
			$('/option','innerHTML','30天','value',30),
			$('/option','innerHTML','60天','value',60)
			),
		$('/br')
		):null,
	'添加一个头像 ',
	$('/input','type','file','style','margin:0.25em 0','onchange',function(e) {
			var f = e.target.files[0], p = this.parentNode
			if(f.size>(1024*15360))
				return alert('文件大小不能超过15360k');
			var reader = new FileReader();
			reader.onload = function(e) {
				commonui.cutImage(null,e.target.result,0,180,255,function(im){
					imc._.add(n(im))
					})
				}//
			reader.readAsDataURL(f);
			}
		),
	$('/br'),
	$('/button').$0('innerHTML','确定','type','button','onclick',
		function(){
			var x = imc.getElementsByTagName('img'),k=0,a={}
			for(var i=0;i<x.length;i++){
				if(x[i].alt==KEEP || x[i].alt==NEW){
					a['n'+uid+'_'+x[i].title] = x[i].alt==KEEP ? KEEP : x[i].src
					k++
					}
				}
			if(k>LIM)
				return alert('不能超过'+LIM+'个')
				
			a.func='upload'
			a.avatar=1
			a.uid=uid
			a.lite='js'
			a.checksum=checksum
			console.log(a)
			__NUKE.doRequest({
				u:{u:__ATTACH_BASE+'/attach.php',a:a},
				f:function(d){
					var e = __NUKE.doRequestIfErr(d)
					if(e)
						return alert(d.error_code == 12 ? '操作超时 请重新设置':(d.error_code == 6 ? '图片格式错误' :'unknow error'))
					
					var d = d.data,x = imc.getElementsByTagName('img'),a=''
					if(d&&d[0])d=d[0]
					for(var i in x){
						if(x[i].alt==KEEP || x[i].alt==NEW)
							a+='\t.a/'+uid+'_'+x[i].title+'.'+(d.isImg=='png' ? 'png' : 'jpg')+'?'+(Math.random()*100|0)+'\t'+( x[i].alt==NEW?'new':'')+'\t'
						else if(x[i].alt==OTHER)
							a+='\t'+x[i].src+'\t\t'
						}
					__NUKE.doRequest({
						u:__API.setAvatar(uid,a,y3?y3.options[y3.selectedIndex].value:''),
						b:this,
						f:function(d){
							var e = __NUKE.doRequestIfErr(d)
							if(e)
								return alert(e)
							alert(d.data[0])
							}
						})
					},
				xr:1
				})
			})
	)
__NUKE.doRequest({
	u:{u:__API._base,
		a:{__lib:"set_avatar",__act:"get",uid:uid,edit:1,raw:3}
		},
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		if(d.data[1])
			checksum = d.data[1]
		var d = d.data[0]+''
		if (d.constructor==String)
			d = commonui.allAvatar(d)
		if(d && d.l){
			if(d.l>1){
				y.style.display=''
				if(d.t==2){
					y2.checked='checked'
					y1.checked=''
					}
				}
			for(var i=0;i<d.l;i++)
				imc._.add(
					n(d[i].constructor==String?d[i]:d[i][0])
					)
			}
		}
	})
this.adminwindow._.show(e)
}//fe





//==============================================
//发帖附件编辑
//==============================================
commonui.imageEditor = function(e,im,callback){

if(im.constructor==String){
	var i = new Image()
	i.onload = function(){
		commonui.imageEditor(e,this,callback)
		}
	i.src=im
	return
	}

var $= _$, og, mk, tp, fn, pstimg,cpstimg





var croquis = new Croquis();
croquis.setCanvasSize(im.width, im.height);
croquis.addLayer();
//croquis.fillLayer('#aaaaaa');
croquis.setToolStabilizeLevel(10)
croquis.setToolStabilizeWeight(0.5)
croquis.setUndoLimit(10)

var blog=[]
var brush = new Croquis.Brush();
brush.__downbak = brush.down
brush.down = function(x, y, pressure){
	if(fn==2)
		blog=[]
	else if(fn==3)
		return
	else if(fn==4){
		return
		}
	return brush.__downbak(x, y, pressure)
	}//fe
brush.__movebak = brush.move
brush.move = function(x, y, pressure){

	if(fn==2){
		if(Math.abs(x-blog[blog.length-2])<0.2 && Math.abs(y-blog[blog.length-1])<0.2){}
		else{
			blog.push(x,y)
			if(blog.length>200)
				blog=blog.slice(blog.length-40)
			}
		}
	else if(fn==3)
		return
	else if(fn==4){

		return
		}
	return this.__movebak(x, y, pressure)
	}//fe

brush.__upbak = brush.up
brush.up = function(x, y, pressure){
	
	if(fn==2){
		blog.push(x,y)
		var i=blog.length-20
		if(i<0)return
		var bz=brush.getSize(), lx = blog[blog.length-2], ly = blog[blog.length-1], sx = blog[i], sy = blog[i+1]
		var a = Math.atan((ly-sy)/(lx-sx)), sina = Math.sin(a), cosa = Math.cos(a)
		var tc = cosa*bz*2, ts = sina*bz*2,
		t0x = lx>sx ? lx+tc : lx-tc,
		t0y = lx>sx ? ly+ts : ly-ts,
		t1x = lx-ts,
		t1y = ly+tc,
		t2x = lx+ts,
		t2y = ly-tc,
		minx = Math.min(t0x,t1x,t2x),
		miny = Math.min(t0y,t1y,t2y)
		brush.addDirtyRect(minx,miny,Math.max(t0x,t1x,t2x),Math.max(t0x,t1x,t2x))
		blog=[]
		
		window.setTimeout(function(){

			var ll = croquis.getLayerCanvas(0).getContext('2d')
			ll.beginPath()
			ll.moveTo(t0x,t0y)
			ll.lineTo(t1x,t1y)
			ll.lineTo(t2x,t2y)
			ll.lineTo(t0x,t0y)
			ll.closePath()
			ll.fillStyle=brush.getColor()
			ll.fill()

			//ll.fillStyle='#0000ff'
			//ll.fillRect(lx,ly,1,1)
			//ll.fillRect(sx,sy,1,1)
			})
		}
	if(fn==3){
		commonui.textInputer(null,'输入文字',function(t){
			t = t.replace(/^\s+|\s+$/,'')
			if(t){
				var ll = croquis.getLayerCanvas(0).getContext('2d')
				ll.font = "bold "+(brush.getSize()*3)+"px 'Microsoft YaHei', Sans-serif";
				ll.fillStyle=brush.getColor()
				ll.strokeStyle = ll.fillStyle=='#ffffff' ? '#000000' : '#ffffff'
				ll.lineWidth = brush.getSize()/5*2
				ll.strokeText(t,x,y)
				ll.fillText(t,x,y)
				}
			})
		return
		}
	if(fn==4){
		return
		}
		
	var r = this.__upbak(x, y, pressure)
	
	}//fe
brush.setSize(5);
brush.setColor('black');
brush.setSpacing(0.2);

croquis.setTool(brush);
fn=1

var c1 = 'display:inline-block;marginBottom:-0.25em;width:1.5em;height:1.5em;backgroundColor:';

if(!this.imageEditorW){
	this.imageEditorW = this.createCommmonWindow()
	document.body.appendChild(this.imageEditorW)
	}

this.imageEditorW._.addContent(null)
this.imageEditorW._.addTitle('编辑图片')
this.imageEditorW._.addContent(
	$('/span')._.add(
		og = $('/canvas','style','display:none'),
		mk = $('/canvas','style','display:none'),
		tp = croquis.getDOMElement(),
		$('/br'),
		'功能',$('/select',
			$('/option','innerHTML','画线','value',1),
			$('/option','innerHTML','画线(带箭头)','value',2),
			$('/option','innerHTML','插入文字','value',3),
			$('/option','innerHTML','贴画','value',4),
			'onchange',function(){
				fn=this.value
				}
			),
		' 颜色',$('/span','onclick',function(e){
						for(var i=0;i<this.childNodes.length;i++)
							this.childNodes[i].style.border=''
						e.target.style.border='2px solid #000'
						brush.setColor(e.target.style.backgroundColor)
						},
					$('/div','style',c1+'dodgerblue'),
					$('/div','style',c1+'crimson'),
					$('/div','style',c1+'lightseagreen'),
					$('/div','style',c1+'goldenrod'),
					$('/div','style',c1+'white'),
					$('/div','style',c1+'black')
			),' 尺寸',
		$('/select',
			$('/option','innerHTML','5','value','5'),
			$('/option','innerHTML','10','value','10'),
			$('/option','innerHTML','15','value','15'),
			'onchange',function(){
				brush.setSize(this.value|0)
				}
			),' ',
		$('/button','innerHTML','UNDO','onclick',function(){croquis.undo()}),
		$('/button','innerHTML','PEN','onclick',function(){po = po ? null : []}),
		$('/button','innerHTML','确定','onclick',function(){
			og.getContext('2d').drawImage(croquis.getLayerCanvas(0),0,0)
			callback(og.toDataURL('image/jpeg',0.85), commonui.resizeImg(og,160,90,1))
			commonui.imageEditorW._.hide()
			window.setTimeout(function(){croquis=brush=null;commonui.imageEditorW._.addContent(null)})
			}),//bu
		$('/br'),
		$('/span','onclick',function(e){
				for(var i=0;i<this.childNodes.length;i++)
					this.childNodes[i].style.border=''
				e.target.style.border='2px solid #000'
				pstimg = e.target
				},
			$('/img','src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpERjFFNkE2NjVERERFNjExOTBCMUZBREQxOUFFOEI0MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMDJBQUQ2NDcxMTIxMUU3OTNCQkQzQTQyODAzNzIyQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMDJBQUQ2MzcxMTIxMUU3OTNCQkQzQTQyODAzNzIyQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNDMTBBNkZENTQ3MEU3MTFCQTRFQzQ2MjlCQTQ3MDU2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRGMUU2QTY2NUREREU2MTE5MEIxRkFERDE5QUU4QjQyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+W+q3+AAAAydJREFUeNrMmVtIFGEUx1e7YW0XoovSRcul2h6yIsk0yYqKJQp9Len2IN2pl16i3nsJgi72UE/ZSw8rBClBLhW2BEIUaEm1pV22G920hAKn/6H/0Dh9s7PuuvPNgZ+fzOzs/D3f953vnGOeYRgBP9to+bGtaIwvxV1N/v4rMAMrARWgDCwGxaAIFPD+AHgLXoIn4AGIg1cZeTANGwXWgzoQoSDTPoJn4A74wmtTwSywGtRaPpsArSAK2sBgtgIngiOgAczmtU5wBsRAB3jj8h3yXDmoAZvAftILzoNzoN/p4TzZJA5rcCu4BKZxuuT3JtCd5dIKg3qwm8viHdgDWlRrMN/hS7aAZjAWHADzwMkRECf2GBznOj4EguA62JyuByeBp5z+Ki7yXNoScA98ByHw082Dh8EMcMIDcWKPODsy3fvcPCheeyHXwXzwy6OQV8BN84PvHXTy4DruusseijPj5jWGr2rrDbvAOo5NGg6OKxxrUwncwF3WrUFgnMsr4iRwOigFNzUdvQbfvRAUqgSu5HhbY34Q47hKJbCc432NAjs4lqkELgWfeKzpsgQDdlglsJgniE4zKLJEJbAwk3wtB/YazFQJDNK9uu0b84H/BBo84vxghkpgPxNU3TYZ9KkESuI41wcC54CkSmAPWKBZnJlF9agEdrHYCWkUGOIy61IJfMixUqPAFTYtQwTGfSCwxqZliMBepjtrNArcyHTvg1M+KKXfInYLvLZlPOJaUiWszRy3axBYzzGaSuAtTrUU1eM8FDce7GCy0p5KoFRTjSwBGzwUeJAdjEbrMedUuE8Az+nBKmtMypEtB3fBZx4UA26Fu9SmuxgwJbs+GvjXVhvpWvgYxYkzdlrFOU2xaa3slcihfZrr8ixjZDYZjzwrLbkLzPtO0XNSTbYNt7tlLl5pHu3lGRlgrIxxMcfZHnHqI+czZFWStZaERHqK0nq7qPKcOcVuAq0vqmZRHWFpaE0wE/RyH70UZAlRakvhJAjfYDhrT/GHDVug3WSXV7DQCtMr0nCawvtfwXuK7mSDKM5raVs2PeokA2o05/mX3/8N8UeAAQCcJ9B5GAPkkAAAAABJRU5ErkJggg==','style','height:1em')
			)
		)
	)


og.width=mk.width=im.width
og.height=mk.height=im.height
og.style.marginRight = '-'+im.width+'px'
og.getContext('2d').drawImage(im,0,0)
og.style.display=mk.style.display=''

var po
$(tp).$0(
	'style','position:relative;marginTop:-'+im.height+'px;cursor:crosshair',
	'onmousemove',function(e){
		if(po)
			return
		if(e.buttons&1){
			var p = croquis.getRelativePosition(e.clientX, e.clientY)
			if(fn==4){
				console.log(111)
				if(cpstimg){
					var x=p.x,y=p.y,w= x-cpstimg._ox, h=y-cpstimg._oy, l = Math.sqrt(w*w+h*h), s=l/cpstimg._ol, r =-Math.atan(w/h)*180/Math.PI
					//console.log(s+' '+r)
					cpstimg._ns = s
					cpstimg._nr = r
					cpstimg.style.transform = 'translate(-50%,-50%) scale('+cpstimg._ns+') rotate('+cpstimg._nr+'deg)'
					console.log('r2')
					}
				return 
				}
			croquis.move(p.x, p.y);
			}
		},
	'onmousedown',function(e){
		if(po)
			return
		if(e.buttons&1){
			var p = croquis.getRelativePosition(e.clientX, e.clientY)
			if(fn==4){
				var x=p.x,y=p.y
				cpstimg = $('/img','src',pstimg.src,'style','userDrag:none;webkitUserDrag:none;mozUserDrag:none;msUserDrag:none;userSelect:none;position:absolute;left:'+x+'px;top:'+y+'px;transform: translate(-50%,-50%) scale(1) rotate(0deg)')
				tp.appendChild(cpstimg)
				cpstimg._ox = x
				cpstimg._oy = y
				cpstimg._oh = cpstimg.height
				cpstimg._ow = cpstimg.width
				cpstimg._ol = cpstimg._oh > cpstimg._ow ? cpstimg._oh : cpstimg._ow
				console.log('r1')
				return
				}
			croquis.down(p.x, p.y);
			}
		},
	'onmouseup',function(e){
		if(po)
			return
		if(fn==4){
			cpstimg=null
			console.log('r3')
			return;
			}
		var p = croquis.getRelativePosition(e.clientX, e.clientY)
		croquis.up(p.x, p.y);
		}/*,
	'onpointermove',function(e){
		if(po){
			po.push(e.pressure)
			if(po.length>40)
				po=po.slice(20)
			var p = croquis.getRelativePosition(e.clientX, e.clientY)

			if(e.pressure>0){
				if(po[po.length-2]==0 && po[po.length-3]==0 && po[po.length-4]==0){
					console.log('down '+e.pressure)
					croquis.down(p.x, p.y, e.pressure);
					}
				else{
					croquis.move(p.x, p.y);
					console.log(e.pressure)
					}
				}
			else if(e.pressure==0 && po[po.length-2]>0 && po[po.length-3]>0 && po[po.length-4]>0){
				console.log('up '+e.pressure)
				croquis.up(p.x, p.y, e.pressure);
				}
			}
		}*/
	)
	
	
	
	
	
	
this.imageEditorW._.show()

//var tpx = tp.getContext('2d')




}//fe

if(!commonui.textInputer)
	commonui.textInputer = function(e,h,f){
		var x
		this.createadminwindow()
		this.adminwindow._.addContent(null)
		this.adminwindow._.addTitle(h)
		this.adminwindow._.addContent(
			x = _$('/textarea'),
			_$('/button','innerHTML','确定','onclick',function(){
				f(x.value)
				commonui.adminwindow._.hide()
				})
			)
		this.adminwindow._.show(e)
		x.focus()
		}//


//===============================================================
//https://github.com/disjukr/croquis.js/blob/master/croquis.js
//Distributed under BSD license
//===============================================================
function Croquis(imageDataList, properties) {
    var self = this;
    if (properties != null)
        for (var property in properties)
            self[property] = properties[property];
    var domElement = document.createElement('div');
    domElement.style.clear = 'both';
    domElement.style.setProperty('user-select', 'none');
    domElement.style.setProperty('-webkit-user-select', 'none');
    domElement.style.setProperty('-ms-user-select', 'none');
    domElement.style.setProperty('-moz-user-select', 'none');
    self.getDOMElement = function () {
        return domElement;
    };
    self.getRelativePosition = function (absoluteX, absoluteY) {
        var rect = domElement.getBoundingClientRect();
        return {x: absoluteX - rect.left,y: absoluteY - rect.top};
    };
    var eventListeners = {
        'ondown': [],
        'onmove': [],
        'onup': [],
        'ontick': [],
        'onchange': [],
        'onundo': [],
        'onredo': [],
        'ontool': [],
        'oncanvassize': [],
        'onlayeradd': [],
        'onlayerremove': [],
        'onlayerswap': [],
        'onlayerselect': []
    };
    function dispatchEvent(event, e) {
        event = event.toLowerCase();
        e = e || {};
        if (eventListeners.hasOwnProperty(event)) {
            eventListeners[event].forEach(function (listener) {
                listener.call(self, e);
            });
        }
        else throw 'don\'t support ' + event;
    }
    self.addEventListener = function (event, listener) {
        event = event.toLowerCase();
        if (eventListeners.hasOwnProperty(event)) {
            if (typeof listener !== 'function')
                throw listener + ' is not a function';
            eventListeners[event].push(listener);
        }
        else throw 'don\'t support ' + event;
    };
    self.removeEventListener = function (event, listener) {
        event = event.toLowerCase();
        if (eventListeners.hasOwnProperty(event)) {
            if (listener == null) { // remove all
                eventListeners[event] = [];
                return;
            }
            var listeners = eventListeners[event];
            var index = listeners.indexOf(listener);
            if (index >= 0) listeners.splice(index, 1);
        }
        else throw 'don\'t support ' + event;
    };
    self.hasEventListener = function (event, listener) {
        event = event.toLowerCase();
        if (eventListeners.hasOwnProperty(event)) {
            if (listener == null)
                return eventListeners[event].length > 0;
            return eventListeners[event].indexOf(listener) >= 0;
        }
        else return false;
    };
    var undoStack = [];
    var redoStack = [];
    var undoLimit = 10;
    var preventPushUndo = false;
    var pushToTransaction = false;
    self.getUndoLimit = function () {
        return undoLimit;
    };
    self.setUndoLimit = function (limit) {
        undoLimit = limit;
    };
    self.lockHistory = function () {
        preventPushUndo = true;
    };
    self.unlockHistory = function () {
        preventPushUndo = false;
    };
    self.beginHistoryTransaction = function () {
        undoStack.push([]);
        pushToTransaction = true;
    };
    self.endHistoryTransaction = function () {
        pushToTransaction = false;
    };
    self.clearHistory = function () {
        if (preventPushUndo)
            throw 'history is locked';
        undoStack = [];
        redoStack = [];
    };
    function pushUndo(undoFunction) {
        dispatchEvent('onchange');
        if (self.onChanged)
            self.onChanged();
        if (preventPushUndo)
            return;
        redoStack = [];
        if (pushToTransaction)
            undoStack[undoStack.length - 1].push(undoFunction);
        else
            undoStack.push([undoFunction]);
        while (undoStack.length > undoLimit)
            undoStack.shift();
    }
    self.undo = function () {
        if (pushToTransaction)
            throw 'transaction is not ended';
        if (preventPushUndo)
            throw 'history is locked';
        if (isDrawing || isStabilizing)
            throw 'still drawing';
        if (undoStack.length == 0)
            throw 'no more undo data';
        var undoTransaction = undoStack.pop();
        var redoTransaction = [];
        while (undoTransaction.length)
            redoTransaction.push(undoTransaction.pop()());
        redoStack.push(redoTransaction);
        dispatchEvent('onundo');
    };
    self.redo = function () {
        if (pushToTransaction)
            throw 'transaction is not ended';
        if (preventPushUndo)
            throw 'history is locked';
        if (isDrawing || isStabilizing)
            throw 'still drawing';
        if (redoStack.length == 0)
            throw 'no more redo data';
        var redoTransaction = redoStack.pop();
        var undoTransaction = [];
        while (redoTransaction.length)
            undoTransaction.push(redoTransaction.pop()());
        undoStack.push(undoTransaction);
        dispatchEvent('onredo');
    };
    function pushLayerMetadataUndo(index) {
        index = index || layerIndex;
        var snapshotMetadata = self.getLayerMetadata(index);
        var swap = function () {
            self.lockHistory();
            var temp = self.getLayerMetadata(index);
            self.setLayerMetadata(snapshotMetadata, index);
            snapshotMetadata = temp;
            self.unlockHistory();
            return swap;
        };
        pushUndo(swap);
    }
    function pushLayerOpacityUndo(index) {
        index = index || layerIndex;
        var snapshotOpacity = self.getLayerOpacity(index);
        var swap = function () {
            self.lockHistory();
            var temp = self.getLayerOpacity(index);
            self.setLayerOpacity(snapshotOpacity, index);
            snapshotOpacity = temp;
            self.unlockHistory();
            return swap;
        };
        pushUndo(swap);
    }
    function pushLayerVisibleUndo(index) {
        index = index || layerIndex;
        var snapshotVisible = self.getLayerVisible(index);
        var swap = function () {
            self.lockHistory();
            var temp = self.getLayerVisible(index);
            self.setLayerVisible(snapshotVisible, index);
            snapshotVisible = temp;
            self.unlockHistory();
            return swap;
        };
        pushUndo(swap);
    }
    function pushSwapLayerUndo(layerA, layerB) {
        var swap = function () {
            self.lockHistory();
            self.swapLayer(layerA, layerB);
            self.unlockHistory();
            return swap;
        };
        pushUndo(swap);
    }
    function pushAddLayerUndo(index) {
        var add = function () {
            self.lockHistory();
            self.addLayer(index);
            self.unlockHistory();
            cacheLayer(index);
            return remove;
        };
        var remove = function () {
            self.lockHistory();
            self.removeLayer(index);
            self.unlockHistory();
            return add;
        };
        pushUndo(remove);
    }
    function pushRemoveLayerUndo(index) {
        var layerContext = getLayerContext(index);
        var w = size.width;
        var h = size.height;
        var snapshotData = layerContext.getImageData(0, 0, w, h);
        var snapshotMetadata = self.getLayerMetadata(index);
        var snapshotOpacity = self.getLayerOpacity(index);
        var snapshotVisible = self.getLayerVisible(index);
        var add = function () {
            self.lockHistory();
            self.addLayer(index);
            self.setLayerMetadata(snapshotMetadata, index);
            self.setLayerOpacity(snapshotOpacity, index);
            self.setLayerVisible(snapshotVisible, index);
            var layerContext = getLayerContext(index);
            layerContext.putImageData(snapshotData, 0, 0);
            self.unlockHistory();
            cacheLayer(index);
            return remove;
        };
        var remove = function () {
            self.lockHistory();
            self.removeLayer(index);
            self.unlockHistory();
            return add;
        };
        pushUndo(add);
    }
    function pushDirtyRectUndo(x, y, width, height, index) {
        index = index || layerIndex;
        var w = size.width;
        var h = size.height;
        var right = x + width;
        var bottom = y + height;
        x = Math.min(w, Math.max(0, x));
        y = Math.min(h, Math.max(0, y));
        width = Math.min(w, Math.max(x, right)) - x;
        height = Math.min(h, Math.max(y, bottom)) - y;
        if ((x % 1) > 0)
            ++width;
        if ((y % 1) > 0)
            ++height;
        x = x | 0;
        y = y | 0;
        width = Math.min(w - x, Math.ceil(width));
        height = Math.min(h - y, Math.ceil(height));
        if ((width === 0) || (height === 0)) {
            var doNothing = function () {
                return doNothing;
            };
            pushUndo(doNothing);
        }
        else {
            var layerContext = getLayerContext(index);
            var snapshotData = layerContext.getImageData(x, y, width, height);
            var swap = function () {
                var layerContext = getLayerContext(index);
                var tempData = layerContext.getImageData(x, y, width, height);
                layerContext.putImageData(snapshotData, x, y);
                snapshotData = tempData;
                cacheLayer(index);
                return swap;
            };
            pushUndo(swap);
        }
        if (renderDirtyRect)
            drawDirtyRect(x, y, width, height);
    }
    function pushContextUndo(index) {
        index = index || layerIndex;
        pushDirtyRectUndo(0, 0, size.width, size.height, index);
    }
    function pushAllContextUndo() {
        var snapshotDatas = [];
        var i;
        var w = size.width;
        var h = size.height;
        for (i = 0; i < layers.length; ++i) {
            var layerContext = getLayerContext(i);
            snapshotDatas.push(layerContext.getImageData(0, 0, w, h));
        }
        var swap = function (index) {
            var layerContext = getLayerContext(index);
            var tempData = layerContext.getImageData(0, 0, w, h);
            layerContext.putImageData(snapshotDatas[index], 0, 0);
            snapshotDatas[index] = tempData;
            cacheLayer(index);
        };
        var swapAll = function () {
            for (var i = 0; i < layers.length; ++i)
                swap(i);
            return swapAll;
        };
        pushUndo(swapAll);
    }
    function pushCanvasSizeUndo(width, height, offsetX, offsetY) {
        var snapshotSize = self.getCanvasSize();
        var snapshotDatas = [];
        var w = snapshotSize.width;
        var h = snapshotSize.height;
        for (var i = 0; i < layers.length; ++i) {
            var layerContext = getLayerContext(i);
            snapshotDatas[i] = layerContext.getImageData(0, 0, w, h);
        }
        function setSize(width, height, offsetX, offsetY) {
            self.lockHistory();
            self.setCanvasSize(width, height, offsetX, offsetY);
            self.unlockHistory();
        }
        var rollback = function () {
            setSize(w, h);
            for (var i = 0; i < layers.length; ++i) {
                var layerContext = getLayerContext(i);
                layerContext.putImageData(snapshotDatas[i], 0, 0);
            }
            return redo;
        };
        var redo = function () {
            rollback();
            setSize(width, height, offsetX, offsetY);
            return rollback;
        };
        pushUndo(rollback);
    }
    var size = {width: 640, height: 480};
    self.getCanvasSize = function () {
        return {width: size.width, height: size.height}; //clone size
    };
    self.setCanvasSize = function (width, height, offsetX, offsetY) {
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        size.width = width = Math.floor(width);
        size.height = height = Math.floor(height);
        pushCanvasSizeUndo(width, height, offsetX, offsetY);
        dispatchEvent('oncanvassize', {
            width: width, height: height,
            offsetX: offsetX, offsetY: offsetY
        });
        paintingCanvas.width = width;
        paintingCanvas.height = height;
        dirtyRectDisplay.width = width;
        dirtyRectDisplay.height = height;
        domElement.style.width = width + 'px';
        domElement.style.height = height + 'px';
        for (var i=0; i<layers.length; ++i) {
            var canvas = getLayerCanvas(i);
            var context = getLayerContext(i);
            var imageData = context.getImageData(0, 0, width, height);
            canvas.width = width;
            canvas.height = height;
            context.putImageData(imageData, offsetX, offsetY);
        }
    };
    self.getCanvasWidth = function () {
        return size.width;
    };
    self.setCanvasWidth = function (width, offsetX) {
        self.setCanvasSize(width, size.height, offsetX, 0);
    };
    self.getCanvasHeight = function () {
        return size.height;
    };
    self.setCanvasHeight = function (height, offsetY) {
        self.setCanvasSize(size.width, height, 0, offsetY);
    };
    function getLayerCanvas(index) {
        return layers[index].getElementsByClassName('croquis-layer-canvas')[0];
    }
    self.getLayerCanvas = getLayerCanvas;
    function getLayerContext(index) {
        return getLayerCanvas(index).getContext('2d');
    }
    var layers = [];
    var layerIndex = 0;
    var paintingCanvas = document.createElement('canvas');
    var paintingContext = paintingCanvas.getContext('2d');
    paintingCanvas.className = 'croquis-painting-canvas';
    paintingCanvas.style.position = 'absolute';
    var dirtyRectDisplay = document.createElement('canvas');
    var dirtyRectDisplayContext = dirtyRectDisplay.getContext('2d');
    dirtyRectDisplay.className = 'croquis-dirty-rect-display';
    dirtyRectDisplay.style.position = 'absolute';
    var renderDirtyRect = false;
    function sortLayers() {
        while (domElement.firstChild)
            domElement.removeChild(domElement.firstChild);
        for (var i = 0; i < layers.length; ++i) {
            var layer = layers[i];
            domElement.appendChild(layer);
        }
        domElement.appendChild(dirtyRectDisplay);
    }
    function drawDirtyRect(x, y, w, h) {
        var context = dirtyRectDisplayContext;
        context.fillStyle = '#f00';
        context.globalCompositeOperation = 'source-over';
        context.fillRect(x, y, w, h);
        if ((w > 2) && (h > 2)) {
            context.globalCompositeOperation = 'destination-out';
            context.fillRect(x + 1, y + 1, w - 2, h - 2);
        }
    }
    self.getRenderDirtyRect = function () {
        return renderDirtyRect;
    };
    self.setRenderDirtyRect = function (render) {
        renderDirtyRect = render;
        if (render == false)
            dirtyRectDisplayContext.clearRect(0, 0, size.width, size.height);
    };
    self.createLayerThumbnail = function (index, width, height) {
        index = index || layerIndex;
        width = width || size.width;
        height = height || size.height;
        var canvas = getLayerCanvas(index);
        var thumbnail = document.createElement('canvas');
        var thumbnailContext = thumbnail.getContext('2d');
        thumbnail.width = width;
        thumbnail.height = height;
        thumbnailContext.drawImage(canvas, 0, 0, width, height);
        return thumbnail;
    };
    self.createFlattenThumbnail = function (width, height) {
        width = width || size.width;
        height = height || size.height;
        var thumbnail = document.createElement('canvas');
        var thumbnailContext = thumbnail.getContext('2d');
        thumbnail.width = width;
        thumbnail.height = height;
        for (var i = 0; i < layers.length; ++i) {
            if (!self.getLayerVisible(i))
                continue;
            var canvas = getLayerCanvas(i);
            thumbnailContext.globalAlpha = self.getLayerOpacity(i);
            thumbnailContext.drawImage(canvas, 0, 0, width, height);
        }
        return thumbnail;
    };
    self.getLayers = function () {
        return layers.concat(); //clone layers
    };
    self.getLayerCount = function () {
        return layers.length;
    };
    self.addLayer = function (index) {
        index = index || layers.length;
        pushAddLayerUndo(index);
        var layer = document.createElement('div');
        layer.className = 'croquis-layer';
        layer.style.visibility = 'visible';
        layer.style.opacity = 1;
        layer['croquis-metadata'] = {};
        var canvas = document.createElement('canvas');
        canvas.className = 'croquis-layer-canvas';
        canvas.width = size.width;
        canvas.height = size.height;
        canvas.style.position = 'absolute';
        layer.appendChild(canvas);
        domElement.appendChild(layer);
        layers.splice(index, 0, layer);
        sortLayers();
        self.selectLayer(layerIndex);
        dispatchEvent('onlayeradd', {index: index});
        if (self.onLayerAdded)
            self.onLayerAdded(index);
        return layer;
    };
    self.removeLayer = function (index) {
        index = index || layerIndex;
        pushRemoveLayerUndo(index);
        domElement.removeChild(layers[index]);
        layers.splice(index, 1);
        if (layerIndex == layers.length)
            self.selectLayer(layerIndex - 1);
        sortLayers();
        dispatchEvent('onlayerremove', {index: index});
        if (self.onLayerRemoved)
            self.onLayerRemoved(index);
    };
    self.removeAllLayer = function () {
        while (layers.length)
            self.removeLayer(0);
    };
    self.swapLayer = function (layerA, layerB) {
        pushSwapLayerUndo(layerA, layerB);
        var layer = layers[layerA];
        layers[layerA] = layers[layerB];
        layers[layerB] = layer;
        sortLayers();
        dispatchEvent('onlayerswap', {a: layerA, b: layerB});
        if (self.onLayerSwapped)
            self.onLayerSwapped(layerA, layerB);
    };
    self.getCurrentLayerIndex = function () {
        return layerIndex;
    };
    self.selectLayer = function (index) {
        var lastestLayerIndex = layers.length - 1;
        if (index > lastestLayerIndex)
            index = lastestLayerIndex;
        layerIndex = index;
        if (paintingCanvas.parentElement != null)
            paintingCanvas.parentElement.removeChild(paintingCanvas);
        layers[index].appendChild(paintingCanvas);
        dispatchEvent('onlayerselect', {index: index});
        if (self.onLayerSelected)
            self.onLayerSelected(index);
    };
    self.clearLayer = function (index) {
        index = index || layerIndex;
        pushContextUndo(index);
        var context = getLayerContext(index);
        context.clearRect(0, 0, size.width, size.height);
        cacheLayer(index);
    };
    self.fillLayer = function (fillColor, index) {
        index = index || layerIndex;
        pushContextUndo(index);
        var context = getLayerContext(index);
        context.fillStyle = fillColor;
        context.fillRect(0, 0, size.width, size.height);
        cacheLayer(index);
    };
    self.fillLayerRect = function (fillColor, x, y, width, height, index) {
        index = index || layerIndex;
        pushDirtyRectUndo(x, y, width, height, index);
        var context = getLayerContext(index);
        context.fillStyle = fillColor;
        context.fillRect(x, y, width, height);
        cacheLayer(index);
    };
    self.floodFill = function (x, y, r, g, b, a, index) {
        index = index || layerIndex;
        pushContextUndo(index);
        var context = getLayerContext(index);
        var w = size.width;
        var h = size.height;
        if ((x < 0) || (x >= w) || (y < 0) || (y >= h))
            return;
        var imageData = context.getImageData(0, 0, w, h);
        var d = imageData.data;
        var targetColor = getColor(x, y);
        var replacementColor = (r << 24) | (g << 16) | (b << 8) | a;
        if (targetColor === replacementColor)
            return;
        function getColor(x, y) {
            var index = ((y * w) + x) * 4;
            return ((d[index] << 24) | (d[index + 1] << 16) |
                (d[index + 2] << 8) | d[index + 3]);
        }
        function setColor(x, y) {
            var index = ((y * w) + x) * 4;
            d[index] = r;
            d[index + 1] = g;
            d[index + 2] = b;
            d[index + 3] = a;
        }
        var queue = [];
        queue.push(x, y);
        while (queue.length) {
            var nx = queue.shift();
            var ny = queue.shift();
            if ((nx < 0) || (nx >= w) || (ny < 0) || (ny >= h) ||
                (getColor(nx, ny) !== targetColor))
                continue;
            var west, east;
            west = east = nx;
            do {
                var wc = getColor(--west, ny);
            } while ((west >= 0) && (wc === targetColor));
            do {
                var ec = getColor(++east, ny);
            } while ((east < w) && (ec === targetColor));
            for (var i = west + 1; i < east; ++i) {
                setColor(i, ny);
                var north = ny - 1;
                var south = ny + 1;
                if (getColor(i, north) === targetColor)
                    queue.push(i, north);
                if (getColor(i, south) === targetColor)
                    queue.push(i, south);
            }
        }
        context.putImageData(imageData, 0, 0);
        cacheLayer(index);
    };
    self.getLayerMetadata = function (index) {
        index = index || layerIndex;
        var metadata = layers[index]['croquis-metadata'];
        var clone = {};
        Object.keys(metadata).forEach(function (key) {
            clone[key] = metadata[key];
        });
        return clone;
    };
    self.setLayerMetadata = function (metadata, index) {
        index = index || layerIndex;
        pushLayerMetadataUndo(index);
        layers[index]['croquis-metadata'] = metadata;
    };
    self.getLayerOpacity = function (index) {
        index = index || layerIndex;
        var opacity = parseFloat(
            layers[index].style.getPropertyValue('opacity'));
        return window.isNaN(opacity) ? 1 : opacity;
    };
    self.setLayerOpacity = function (opacity, index) {
        index = index || layerIndex;
        pushLayerOpacityUndo(index);
        layers[index].style.opacity = opacity;
    };
    self.getLayerVisible = function (index) {
        index = index || layerIndex;
        var visible = layers[index].style.getPropertyValue('visibility');
        return visible != 'hidden';
    };
    self.setLayerVisible = function (visible, index) {
        index = index || layerIndex;
        pushLayerVisibleUndo(index);
        layers[index].style.visibility = visible ? 'visible' : 'hidden';
    };
    function cacheLayer(index) {
        index = index || layerIndex;
        var w = size.width;
        var h = size.height;
        layers[index].cache = getLayerContext(index).getImageData(0, 0, w, h);
    }
    self.getLayerImageDataCache = function (index) {
        index = index || layerIndex;
        if (layers[index].cache == null)
            cacheLayer(index);
        return layers[index].cache;
    };
    function makeColorData(imageData1x1) {
        var data = imageData1x1.data;
        var r = data[0];
        var g = data[1];
        var b = data[2];
        var a = data[3];
        return {
            r: r, g: g, b: b, a: a,
            htmlColor: 'rgba(' + [r, g, b, a / 0xff].join(',') + ')'
        };
    }
    self.pickColor = function (x, y, index) {
        x = x | 0; // cast to int
        y = y | 0;
        if ((x < 0) || (x >= size.width) || (y < 0) || (y >= size.height))
            return null;
        index = index || layerIndex;
        var cache = self.getLayerImageDataCache(index);
        var position = (y * size.width + x) * 4;
        var data = [];
        data[0] = cache.data[position];
        data[1] = cache.data[++position];
        data[2] = cache.data[++position];
        data[3] = cache.data[++position];
        return makeColorData({data: data});
    };
    self.eyeDrop = function (x, y, baseColor) {
        if (self.pickColor(x, y) == null)
            return null;
        baseColor = baseColor || '#fff';
        var plane = document.createElement('canvas');
        plane.width = 1;
        plane.height = 1;
        var planeContext = plane.getContext('2d');
        planeContext.fillStyle = baseColor;
        planeContext.fillRect(0, 0, 1, 1);
        for (var i = 0; i < layers.length; ++i) {
            if (!self.getLayerVisible(i))
                continue;
            planeContext.globalAlpha = self.getLayerOpacity(i);
            planeContext.fillStyle = self.pickColor(x, y, i).htmlColor;
            planeContext.fillRect(0, 0, 1, 1);
        }
        return makeColorData(planeContext.getImageData(0, 0, 1, 1));
    };
    var tool;
    var toolStabilizeLevel = 0;
    var toolStabilizeWeight = 0.8;
    var stabilizer = null;
    var stabilizerInterval = 5;
    var tick;
    var tickInterval = 20;
    var paintingOpacity = 1;
    var paintingKnockout = false;
    self.getTool = function () {
        return tool;
    };
    self.setTool = function (value) {
        tool = value;
        dispatchEvent('ontool', {tool: value});
        paintingContext = paintingCanvas.getContext('2d');
        if (tool && tool.setContext)
            tool.setContext(paintingContext);
    };
    self.setTool(new Croquis.Brush());
    self.getPaintingOpacity = function () {
        return paintingOpacity;
    };
    self.setPaintingOpacity = function (opacity) {
        paintingOpacity = opacity;
        paintingCanvas.style.opacity = opacity;
    };
    self.getPaintingKnockout = function () {
        return paintingKnockout;
    };
    self.setPaintingKnockout = function (knockout) {
        if (isDrawing || isStabilizing)
            throw 'still drawing';
        paintingKnockout = knockout;
        paintingCanvas.style.visibility = knockout ? 'hidden' : 'visible';
    };
    self.getTickInterval = function () {
        return tickInterval;
    };
    self.setTickInterval = function (interval) {
        tickInterval = interval;
    };
    /*
    stabilize level is the number of coordinate tracker.
    higher stabilize level makes lines smoother.
    */
    self.getToolStabilizeLevel = function () {
        return toolStabilizeLevel;
    };
    self.setToolStabilizeLevel = function (level) {
        toolStabilizeLevel = (level < 0) ? 0 : level;
    };
    /*
    higher stabilize weight makes trackers follow slower.
    */
    self.getToolStabilizeWeight = function () {
        return toolStabilizeWeight;
    };
    self.setToolStabilizeWeight = function (weight) {
        toolStabilizeWeight = weight;
    };
    self.getToolStabilizeInterval = function () {
        return stabilizerInterval;
    };
    self.setToolStabilizeInterval = function (interval) {
        stabilizerInterval = interval;
    };
    var isDrawing = false;
    var isStabilizing = false;
    var beforeKnockout = document.createElement('canvas');
    var knockoutTick;
    var knockoutTickInterval = 20;
    function gotoBeforeKnockout() {
        var context = getLayerContext(layerIndex);
        var w = size.width;
        var h = size.height;
        context.clearRect(0, 0, w, h);
        context.drawImage(beforeKnockout, 0, 0, w, h);
    }
    function drawPaintingCanvas() { //draw painting canvas on current layer
        var context = getLayerContext(layerIndex);
        var w = size.width;
        var h = size.height;
        context.save();
        context.globalAlpha = paintingOpacity;
        context.globalCompositeOperation = paintingKnockout ?
            'destination-out' : 'source-over';
        context.drawImage(paintingCanvas, 0, 0, w, h);
        context.restore();
    }
    function _move(x, y, pressure) {
        if (tool.move)
            tool.move(x, y, pressure);
        dispatchEvent('onmove', {x: x, y: y, pressure: pressure});
        if (self.onMoved)
            self.onMoved(x, y, pressure);
    }
    function _up(x, y, pressure) {
        isDrawing = false;
        isStabilizing = false;
        var dirtyRect;
        if (tool.up)
            dirtyRect = tool.up(x, y, pressure);
        if (paintingKnockout)
            gotoBeforeKnockout();
        if (dirtyRect)
            pushDirtyRectUndo(dirtyRect.x, dirtyRect.y,
                              dirtyRect.width, dirtyRect.height);
        else
            pushContextUndo();
        drawPaintingCanvas();
        paintingContext.clearRect(0, 0, size.width, size.height);
        dirtyRect = dirtyRect ||
            {x: 0, y: 0, width: size.width, height: size.height};
        dispatchEvent('onup',
            {x: x, y: y, pressure: pressure, dirtyRect: dirtyRect});
        if (self.onUpped)
            self.onUpped(x, y, pressure, dirtyRect);
        window.clearInterval(knockoutTick);
        window.clearInterval(tick);
        cacheLayer(self.getCurrentLayerIndex());
    }
    self.down = function (x, y, pressure) {
        if (isDrawing || isStabilizing)
            throw 'still drawing';
        isDrawing = true;
        if (tool == null)
            return;
        if (paintingKnockout) {
            var w = size.width;
            var h = size.height;
            var canvas = getLayerCanvas(layerIndex);
            var beforeKnockoutContext = beforeKnockout.getContext('2d');
            beforeKnockout.width = w;
            beforeKnockout.height = h;
            beforeKnockoutContext.clearRect(0, 0, w, h);
            beforeKnockoutContext.drawImage(canvas, 0, 0, w, h);
        }
        pressure = pressure || Croquis.Tablet.pressure();
        var down = tool.down;
        if (toolStabilizeLevel > 0) {
            stabilizer = new Croquis.Stabilizer(down, _move, _up,
                toolStabilizeLevel, toolStabilizeWeight,
                x, y, pressure, stabilizerInterval);
            isStabilizing = true;
        }
        else if (down != null)
            down(x, y, pressure);
        dispatchEvent('ondown', {x: x, y: y, pressure: pressure});
        if (self.onDowned)
            self.onDowned(x, y, pressure);
        knockoutTick = window.setInterval(function () {
            if (paintingKnockout) {
                gotoBeforeKnockout();
                drawPaintingCanvas();
            }
        }, knockoutTickInterval);
        tick = window.setInterval(function () {
            if (tool.tick)
                tool.tick();
            dispatchEvent('ontick');
            if (self.onTicked)
                self.onTicked();
        }, tickInterval);
    };
    self.move = function (x, y, pressure) {
        if (!isDrawing)
            throw 'you need to call \'down\' first';
        if (tool == null)
            return;
        pressure = pressure || Croquis.Tablet.pressure();
        if (stabilizer != null)
            stabilizer.move(x, y, pressure);
        else if (!isStabilizing)
            _move(x, y, pressure);
    };
    self.up = function (x, y, pressure) {
        if (!isDrawing)
            throw 'you need to call \'down\' first';
        if (tool == null) {
            isDrawing = false;
            return;
        }
        pressure = pressure || Croquis.Tablet.pressure();
        if (stabilizer != null)
            stabilizer.up(x, y, pressure);
        else
            _up(x, y, pressure);
        stabilizer = null;
    };
    // apply image data
    ;(function (croquis, imageDataList) {
        if (imageDataList != null) {
            if (imageDataList.length === 0)
                return;
            croquis.lockHistory();
            var first = imageDataList[0];
            croquis.setCanvasSize(first.width, first.height);
            for (var i = 0; i < imageDataList.length; ++i) {
                var current = imageDataList[i];
                if ((current.width != first.width) ||
                    (current.height != first.height))
                    throw 'all image data must have same size';
                croquis.addLayer();
                var context = croquis.getLayerCanvas(i).getContext('2d');
                context.putImageData(current, 0, 0);
            }
            croquis.selectLayer(0);
            croquis.unlockHistory();
        }
    }).call(null, self, imageDataList);
}
Croquis.createChecker = function (cellSize, colorA, colorB) {
    cellSize = cellSize || 10;
    colorA = colorA || '#fff';
    colorB = colorB || '#ccc';
    var size = cellSize + cellSize;
    var checker = document.createElement('canvas');
    checker.width = checker.height = size;
    var context = checker.getContext('2d');
    context.fillStyle = colorB;
    context.fillRect(0, 0, size, size);
    context.fillStyle = colorA;
    context.fillRect(0, 0, cellSize, cellSize);
    context.fillRect(cellSize, cellSize, size, size);
    return checker;
};
Croquis.createBrushPointer = function (brushImage, brushSize, brushAngle,
                                       threshold, antialias, color,
                                       shadow, shadowOffsetX, shadowOffsetY) {
    brushSize = brushSize | 0;
    var pointer = document.createElement('canvas');
    var pointerContext = pointer.getContext('2d');
    var boundWidth;
    var boundHeight;
    if (brushSize === 0) {
        pointer.width = boundWidth = 1;
        pointer.height = boundHeight = 1;
    }
    if (brushImage == null) {
        var halfSize = (brushSize * 0.5) | 0;
        pointer.width = boundWidth = brushSize;
        pointer.height = boundHeight = brushSize;
        pointerContext.fillStyle = '#000';
        pointerContext.beginPath();
        pointerContext.arc(halfSize, halfSize, halfSize, 0, Math.PI * 2);
        pointerContext.closePath();
        pointerContext.fill();
    }
    else {
        var width = brushSize;
        var height = brushSize * (brushImage.height / brushImage.width);
        var toRad = Math.PI / 180;
        var ra = brushAngle * toRad;
        var abs = Math.abs;
        var sin = Math.sin;
        var cos = Math.cos;
        boundWidth = abs(height * sin(ra)) + abs(width * cos(ra));
        boundHeight = abs(width * sin(ra)) + abs(height * cos(ra));
        pointer.width = boundWidth;
        pointer.height = boundHeight;
        pointerContext.save();
        pointerContext.translate(boundWidth * 0.5, boundHeight * 0.5);
        pointerContext.rotate(ra);
        pointerContext.translate(width * -0.5, height * -0.5);
        pointerContext.drawImage(brushImage, 0, 0, width, height);
        pointerContext.restore();
    }
    var result;
    var alphaThresholdBorder = Croquis.createAlphaThresholdBorder(
        pointer, threshold, antialias, color);
    if (shadow) {
        shadowOffsetX = shadowOffsetX || 1;
        shadowOffsetY = shadowOffsetY || 1;
        result = document.createElement('canvas');
        result.width = boundWidth + shadowOffsetX;
        result.height = boundHeight + shadowOffsetY;
        var resultContext = result.getContext('2d');
        resultContext.shadowOffsetX = shadowOffsetX;
        resultContext.shadowOffsetY = shadowOffsetY;
        resultContext.shadowColor = shadow;
        resultContext.drawImage(
            alphaThresholdBorder, 0, 0, boundWidth, boundHeight);
    }
    else {
        result = alphaThresholdBorder;
    }
    return result;
};
Croquis.createAlphaThresholdBorder = function (image, threshold,
                                               antialias, color) {
    threshold = threshold || 0x80;
    color = color || '#000';
    var width = image.width;
    var height = image.height;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    try {
        context.drawImage(image, 0, 0, width, height);
    }
    catch (e) {
        return canvas;
    }
    var imageData = context.getImageData(0, 0, width, height);
    var d = imageData.data;
    function getAlphaIndex(index) {
        return d[index * 4 + 3];
    }
    function setRedIndex(index, red) {
        d[index * 4] = red;
    }
    function getRedXY(x, y) {
        var red = d[((y * width) + x) * 4];
        return red || 0;
    }
    function getGreenXY(x, y) {
        var green = d[((y * width) + x) * 4 + 1];
        return green;
    }
    function setColorXY(x, y, red, green, alpha) {
        var i = ((y * width) + x) * 4;
        d[i] = red;
        d[i + 1] = green;
        d[i + 2] = 0;
        d[i + 3] = alpha;
    }
    //threshold
    var pixelCount = (d.length * 0.25) | 0;
    for (var i = 0; i < pixelCount; ++i)
        setRedIndex(i, (getAlphaIndex(i) < threshold) ? 0 : 1);
    //outline
    var x;
    var y;
    for (x = 0; x < width; ++x) {
        for (y = 0; y < height; ++y) {
            if (!getRedXY(x, y)) {
                setColorXY(x, y, 0, 0, 0);
            }
            else {
                var redCount = 0;
                var left = x - 1;
                var right = x + 1;
                var up = y - 1;
                var down = y + 1;
                redCount += getRedXY(left, up);
                redCount += getRedXY(left, y);
                redCount += getRedXY(left, down);
                redCount += getRedXY(right, up);
                redCount += getRedXY(right, y);
                redCount += getRedXY(right, down);
                redCount += getRedXY(x, up);
                redCount += getRedXY(x, down);
                if (redCount != 8)
                    setColorXY(x, y, 1, 1, 255);
                else
                    setColorXY(x, y, 1, 0, 0);
            }
        }
    }
    //antialias
    if (antialias) {
        for (x = 0; x < width; ++x) {
            for (y = 0; y < height; ++y) {
                if (getGreenXY(x, y)) {
                    var alpha = 0;
                    if (getGreenXY(x - 1, y) != getGreenXY(x + 1, y))
                        setColorXY(x, y, 1, 1, alpha += 0x40);
                    if (getGreenXY(x, y - 1) != getGreenXY(x, y + 1))
                        setColorXY(x, y, 1, 1, alpha + 0x50);
                }
            }
        }
    }
    context.putImageData(imageData, 0, 0);
    context.globalCompositeOperation = 'source-in';
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
    return canvas;
};
Croquis.createFloodFill = function (canvas, x, y, r, g, b, a) {
    var result = document.createElement('canvas');
    var w = result.width = canvas.width;
    var h = result.height = canvas.height;
    if ((x < 0) || (x >= w) || (y < 0) || (y >= h) || !(r || g || b || a))
        return result;
    var originalContext = canvas.getContext('2d');
    var originalData = originalContext.getImageData(0, 0, w, h);
    var od = originalData.data;
    var resultContext = result.getContext('2d');
    var resultData = resultContext.getImageData(0, 0, w, h);
    var rd = resultData.data;
    var targetColor = getColor(x, y);
    var replacementColor = (r << 24) | (g << 16) | (b << 8) | a;
    function getColor(x, y) {
        var index = ((y * w) + x) * 4;
        return (rd[index] ? replacementColor :
            ((od[index] << 24) | (od[index + 1] << 16) |
             (od[index + 2] << 8) | od[index + 3]));
    }
    var queue = [];
    queue.push(x, y);
    while (queue.length) {
        var nx = queue.shift();
        var ny = queue.shift();
        if ((nx < 0) || (nx >= w) || (ny < 0) || (ny >= h) ||
            (getColor(nx, ny) !== targetColor))
            continue;
        var west, east;
        west = east = nx;
        do {
            var wc = getColor(--west, ny);
        } while ((west >= 0) && (wc === targetColor));
        do {
            var ec = getColor(++east, ny);
        } while ((east < w) && (ec === targetColor));
        for (var i = west + 1; i < east; ++i) {
            rd[((ny * w) + i) * 4] = 1;
            var north = ny - 1;
            var south = ny + 1;
            if (getColor(i, north) === targetColor)
                queue.push(i, north);
            if (getColor(i, south) === targetColor)
                queue.push(i, south);
        }
    }
    for (var i = 0; i < w; ++i) {
        for (var j = 0; j < h; ++j) {
            var index = ((j * w) + i) * 4;
            if (rd[index] === 0)
                continue;
            rd[index] = r;
            rd[index + 1] = g;
            rd[index + 2] = b;
            rd[index + 3] = a;
        }
    }
    resultContext.putImageData(resultData, 0, 0);
    return result;
};

Croquis.Tablet = {};
Croquis.Tablet.plugin = function () {
    var plugin = document.querySelector(
        'object[type=\'application/x-wacomtabletplugin\']');
    if (!plugin) {
        plugin = document.createElement('object');
        plugin.type = 'application/x-wacomtabletplugin';
        plugin.style.position = 'absolute';
        plugin.style.top = '-1000px';
        document.body.appendChild(plugin);
    }
    return plugin;
};
Croquis.Tablet.pen = function () {
    var plugin = Croquis.Tablet.plugin();
    return plugin.penAPI;
};
Croquis.Tablet.pressure = function () {
    var pen = Croquis.Tablet.pen();
    return (pen && pen.pointerType) ? pen.pressure : 1;
};
Croquis.Tablet.isEraser = function () {
    var pen = Croquis.Tablet.pen();
    return pen ? pen.isEraser : false;
};

Croquis.StabilizerLog=[]
Croquis.Stabilizer = function (down, move, up, level, weight,
                               x, y, pressure, interval) {
    interval = interval || 5;
    var follow = 1 - Math.min(0.95, Math.max(0, weight));
    var paramTable = [];
    var current = { x: x, y: y, pressure: pressure };
    for (var i = 0; i < level; ++i)
        paramTable.push({ x: x, y: y, pressure: pressure });
    var first = paramTable[0];
    var last = paramTable[paramTable.length - 1];
    var upCalled = false;
    if (down != null)
        down(x, y, pressure);
    window.setTimeout(_move, interval);
    this.getParamTable = function () { //for test
        return paramTable;
    };
    this.move = function (x, y, pressure) {
        current.x = x;
        current.y = y;
        current.pressure = pressure;
    };
    this.up = function (x, y, pressure) {
        current.x = x;
        current.y = y;
        current.pressure = pressure;
        upCalled = true;
    };
    function dlerp(a, d, t) {
        return a + d * t;
    }
    function _move(justCalc) {
        var curr;
        var prev;
        var dx;
        var dy;
        var dp;
        var delta = 0;
        first.x = current.x;
        first.y = current.y;
        first.pressure = current.pressure;
        for (var i = 1; i < paramTable.length; ++i) {
            curr = paramTable[i];
            prev = paramTable[i - 1];
            dx = prev.x - curr.x;
            dy = prev.y - curr.y;
            dp = prev.pressure - curr.pressure;
            delta += Math.abs(dx);
            delta += Math.abs(dy);
            curr.x = dlerp(curr.x, dx, follow);
            curr.y = dlerp(curr.y, dy, follow);
            curr.pressure = dlerp(curr.pressure, dp, follow);
        }
        if (justCalc)
            return delta;
		//console.log('Stabilizer '+last.x+' '+last.y)
        if (upCalled) {
            while(delta > 1) {
                move(last.x, last.y, last.pressure);
                delta = _move(true);
            }
            up(last.x, last.y, last.pressure);
        }
        else {
            move(last.x, last.y, last.pressure);
            window.setTimeout(_move, interval);
        }
    }
};

Croquis.Random = {};
Croquis.Random.LFSR113 = function (seed) {
    var IA = 16807;
    var IM = 2147483647;
    var IQ = 127773;
    var IR = 2836;
    var a, b, c, d, e;
    this.get = function () {
        var f = ((a << 6) ^ a) >> 13;
        a = ((a & 4294967294) << 18) ^ f;
        f  = ((b << 2) ^ b) >> 27;
        b = ((b & 4294967288) << 2) ^ f;
        f  = ((c << 13) ^ c) >> 21;
        c = ((c & 4294967280) << 7) ^ f;
        f  = ((d << 3) ^ d) >> 12;
        d = ((d & 4294967168) << 13) ^ f;
        return (a ^ b ^ c ^ d) * 2.3283064365386963e-10 + 0.5;
    };
    seed |= 0;
    if (seed <= 0) seed = 1;
    e = (seed / IQ) | 0;
    seed = (((IA * (seed - ((e * IQ) | 0))) | 0) - ((IR * e) | 0)) | 0;
    if (seed < 0) seed = (seed + IM) | 0;
    if (seed < 2) a = (seed + 2) | 0 ; else a = seed;
    e = (seed / IQ) | 0;
    seed = (((IA * (seed - ((e * IQ) | 0))) | 0) - ((IR * e) | 0)) | 0;
    if (seed < 0) seed = (seed + IM) | 0;
    if (seed < 8) b = (seed + 8) | 0; else b = seed;
    e = (seed / IQ) | 0;
    seed = (((IA * (seed - ((e * IQ) | 0))) | 0) - ((IR * e) | 0)) | 0;
    if (seed < 0) seed = (seed + IM) | 0;
    if (seed < 16) c = (seed + 16) | 0; else c = seed;
    e = (seed / IQ) | 0;
    seed = (((IA * (seed - ((e * IQ) | 0))) | 0) - ((IR * e) | 0)) | 0;
    if (seed < 0) seed = (seed + IM) | 0;
    if (seed < 128) d = (seed + 128) | 0; else d = seed;
    this.get();
};

Croquis.Brush = function () {
    // math shortcut
    var min = Math.min;
    var max = Math.max;
    var abs = Math.abs;
    var sin = Math.sin;
    var cos = Math.cos;
    var sqrt = Math.sqrt;
    var atan2 = Math.atan2;
    var PI = Math.PI;
    var ONE = PI + PI;
    var QUARTER = PI * 0.5;
    var random = Math.random;
    this.setRandomFunction = function (value) {
        random = value;
    };
    this.clone = function () {
        var clone = new Brush(context);
        clone.setColor(this.getColor());
        clone.setFlow(this.getFlow());
        clone.setSize(this.getSize());
        clone.setSpacing(this.getSpacing());
        clone.setAngle(this.getAngle());
        clone.setRotateToDirection(this.getRotateToDirection());
        clone.setNormalSpread(this.getNormalSpread());
        clone.setTangentSpread(this.getTangentSpread());
        clone.setImage(this.getImage());
    };
    var context = null;
    this.getContext = function () {
        return context;
    };
    this.setContext = function (value) {
        context = value;
    };
    var color = '#000';
    this.getColor = function () {
        return color;
    };
    this.setColor = function (value) {
        color = value;
        transformedImageIsDirty = true;
    };
    var flow = 1;
    this.getFlow = function() {
        return flow;
    };
    this.setFlow = function(value) {
        flow = value;
        transformedImageIsDirty = true;
    };
    var size = 10;
    this.getSize = function () {
        return size;
    };
    this.setSize = function (value) {
        size = (value < 1) ? 1 : value;
        transformedImageIsDirty = true;
    };
    var spacing = 0.2;
    this.getSpacing = function () {
        return spacing;
    };
    this.setSpacing = function (value) {
        spacing = (value < 0.01) ? 0.01 : value;
    };
    var toRad = PI / 180;
    var toDeg = 1 / toRad;
    var angle = 0; // radian unit
    this.getAngle = function () { // returns degree unit
        return angle * toDeg;
    };
    this.setAngle = function (value) {
        angle = value * toRad;
    };
    var rotateToDirection = false;
    this.getRotateToDirection = function () {
        return rotateToDirection;
    };
    this.setRotateToDirection = function (value) {
        rotateToDirection = value;
    };
    var normalSpread = 0;
    this.getNormalSpread = function () {
        return normalSpread;
    };
    this.setNormalSpread = function (value) {
        normalSpread = value;
    };
    var tangentSpread = 0;
    this.getTangentSpread = function () {
        return tangentSpread;
    };
    this.setTangentSpread = function (value) {
        tangentSpread = value;
    };
    var image = null;
    var transformedImage = null;
    var transformedImageIsDirty = true;
    var imageRatio = 1;
    this.getImage = function () {
        return image;
    };
    this.setImage = function (value) {
        if (value == null) {
            transformedImage = image = null;
            imageRatio = 1;
            drawFunction = drawCircle;
        }
        else if (value != image) {
            image = value;
            imageRatio = image.height / image.width;
            transformedImage = document.createElement('canvas');
            drawFunction = drawImage;
            transformedImageIsDirty = true;
        }
    };
    var delta = 0;
    var prevX = 0;
    var prevY = 0;
    var lastX = 0;
    var lastY = 0;
    var dir = 0;
    var prevScale = 0;
    var drawFunction = drawCircle;
    var reserved = null;
    var dirtyRect;
    function spreadRandom() {
        return random() - 0.5;
    }
    function drawReserved() {
        if (reserved != null) {
            drawTo(reserved.x, reserved.y, reserved.scale);
            reserved = null;
        }
    }
    function appendDirtyRect(x, y, width, height) {
        if (!(width && height))
            return;
        var dxw = dirtyRect.x + dirtyRect.width;
        var dyh = dirtyRect.y + dirtyRect.height;
        var xw = x + width;
        var yh = y + height;
        var minX = dirtyRect.width ? min(dirtyRect.x, x) : x;
        var minY = dirtyRect.height ? min(dirtyRect.y, y) : y;
        dirtyRect.x = minX;
        dirtyRect.y = minY;
        dirtyRect.width = max(dxw, xw) - minX;
        dirtyRect.height = max(dyh, yh) - minY;
    }
	 this.addDirtyRect=function(x, y, width, height){//modify by zeg
		 return appendDirtyRect(x, y, width, height)
		}
    function transformImage() {
        transformedImage.width = size;
        transformedImage.height = size * imageRatio;
        var brushContext = transformedImage.getContext('2d');
        brushContext.clearRect(0, 0,
            transformedImage.width, transformedImage.height);
        brushContext.drawImage(image, 0, 0,
            transformedImage.width, transformedImage.height);
        brushContext.globalCompositeOperation = 'source-in';
        brushContext.fillStyle = color;
        brushContext.globalAlpha = flow;
        brushContext.fillRect(0, 0,
            transformedImage.width, transformedImage.height);
    }
    function drawCircle(size) {
        var halfSize = size * 0.5;
        context.fillStyle = color;
        context.globalAlpha = flow;
        context.beginPath();
        context.arc(halfSize, halfSize, halfSize, 0, ONE);
        context.closePath();
        context.fill();
    }
    function drawImage(size) {
        if (transformedImageIsDirty)
            transformImage();
        try {
            context.drawImage(transformedImage, 0, 0, size, size * imageRatio);
        }
        catch (e) {
            drawCircle(size);
        }
    }
    function drawTo(x, y, scale) {
        var scaledSize = size * scale;
        var nrm = dir + QUARTER;
        var nr = normalSpread * scaledSize * spreadRandom();
        var tr = tangentSpread * scaledSize * spreadRandom();
        var ra = rotateToDirection ? angle + dir : angle;
        var width = scaledSize;
        var height = width * imageRatio;
        var boundWidth = abs(height * sin(ra)) + abs(width * cos(ra));
        var boundHeight = abs(width * sin(ra)) + abs(height * cos(ra));
        x += Math.cos(nrm) * nr + Math.cos(dir) * tr;
        y += Math.sin(nrm) * nr + Math.sin(dir) * tr;
        context.save();
        context.translate(x, y);
        context.rotate(ra);
        context.translate(-(width * 0.5), -(height * 0.5));
        drawFunction(width);
        context.restore();
        appendDirtyRect(x - (boundWidth * 0.5),
                        y - (boundHeight * 0.5),
                        boundWidth, boundHeight);
    }
    this.down = function(x, y, scale) {
        if (context == null)
            throw 'brush needs the context';
        dir = 0;
        dirtyRect = {x: 0, y: 0, width: 0, height: 0};
        if (scale > 0) {
            if (rotateToDirection || normalSpread !== 0 || tangentSpread !== 0)
                reserved = {x: x, y: y, scale: scale};
            else
                drawTo(x, y, scale);
        }
        delta = 0;
        lastX = prevX = x;
        lastY = prevY = y;
        prevScale = scale;
    };
    this.move = function(x, y, scale) {
        if (context == null)
            throw 'brush needs the context';
        if (scale <= 0) {
            delta = 0;
            prevX = x;
            prevY = y;
            prevScale = scale;
            return;
        }
        var dx = x - prevX;
        var dy = y - prevY;
        var ds = scale - prevScale;
        var d = sqrt(dx * dx + dy * dy);
        prevX = x;
        prevY = y;
        delta += d;
        var midScale = (prevScale + scale) * 0.5;
        var drawSpacing = size * spacing * midScale;
        var ldx = x - lastX;
        var ldy = y - lastY;
        var ld = sqrt(ldx * ldx + ldy * ldy);
        dir = atan2(ldy, ldx);
        if (ldx || ldy)
            drawReserved();
        if (drawSpacing < 0.5)
            drawSpacing = 0.5;
        if (delta < drawSpacing) {
            prevScale = scale;
            return;
        }
        var scaleSpacing = ds * (drawSpacing / delta);
        if (ld < drawSpacing) {
            lastX = x;
            lastY = y;
            drawTo(lastX, lastY, scale);
            delta -= drawSpacing;
        } else {
            while(delta >= drawSpacing) {
                ldx = x - lastX;
                ldy = y - lastY;
                var tx = cos(dir);
                var ty = sin(dir);
                lastX += tx * drawSpacing;
                lastY += ty * drawSpacing;
                prevScale += scaleSpacing;
                drawTo(lastX, lastY, prevScale);
                delta -= drawSpacing;
            }
        }
        prevScale = scale;
    };
    this.up = function (x, y, scale) {
        dir = atan2(y - lastY, x - lastX);
        drawReserved();
        return dirtyRect;
    };
};

//https://github.com/dobarkod/canvas-bezier-multiple/
function bezierCurveThrough(ctx, points, tension) {
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