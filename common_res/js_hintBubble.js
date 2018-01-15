if(!window.commonui)var commonui={}

commonui.hintBubble = {
cb:'#000',//±ß¿òÉ«
cbg:'#ffe',//±³¾°É«
bw:2,//±ß¿ò¿í
mw:5,//padding
br:10,//Ô²½Ç°ë¾¶
ap:3,//¼ýÍ·Á½²àpadding
open:function(x,y,c,w,h,type,cb,cbg){//x y ÄÚÈÝ *¿í *¸ß *·½Ïò *±ß¿òÉ« *±³¾°É«

if (!w && !h)w=200
if(!cb)cb=this.cb
if(!cbg)cbg=this.cbg
var tb='transparent',
	id='hintBubble'+Math.random().toString().substr(2),
	o=null,
	u=null;

var z = _$("<div class='content' style='visibility:hidden;width:"+(w?w+'px':'auto')+";height:"+(h?h+'px':'auto')+";position:absolute'></div>")
if(typeof(c)=='string')
	z.innerHTML=c
else
	z._.aC(c)
z._.aC(_$('<span>&nbsp;</span>'))._.aC( _$("<a title='close' class='close' onclick='$(\""+id+"\").parentNode.removeChild($(\""+id+"\"));if(commonui.cancelBubble)commonui.cancelBubble(event)'><img src='data:image/gif;base64,R0lGODlhDQAMAIABAAAAAAAAACH5BAEAAAEALAAAAAANAAwAAAIdDI4Jpo0BY0xsLloPxGzt93mdp2lj9Z2S5LSjExQAOw=='/></a>") )
if(!w || !h){
	document.body.appendChild(z)
	w=z.offsetWidth
	h=z.offsetHeight
	document.body.removeChild(z)
	}
z._.css({visibility:'visible',position:'static'})

if(!type)type=this.autoDir(x,y)

var bw=this.bw,
	mw=this.mw,
	br=this.br,
	ap=this.ap,
	c=[],
	_c=this.color,_m=this.width,_w=this.width;

switch (type){
	case'tl':
	case'tr':
	case'bl':
	case'br':
		var aw=20,ah=30
		if (w<aw+ap*2)w=aw+ap*2
		var xw=w+mw*2+bw*2,xh=h+mw*2+bw*2
		c[0]={w:xw, h:xh+ah}
		break;
	default :
	case'lt':
	case'lb':
	case'rt':
	case'rb':
		var aw=30,ah=20
		if (h<ah+ap*2)h=ah+ap*2
		var xw=w+mw*2+bw*2,xh=h+mw*2+bw*2
		c[0]={w:xw+aw, h:xh}
		break;
	}


c[1]={w:xw-bw*2, h:xh-bw*2, 
	bw:bw+'px', bc:cb,
	bg:cbg
	}
c[2]={o:z, w:w, h:h}


switch (type){
	case 'br':
		c[1].m=_m(0,0,-xh,0)

		c[2].m=_m(bw+mw,0,bw+mw-1,bw+mw)

		c[3]={w:0, h:0}

		c[4]={w:1, h:1, 
			bw:_w(0,aw,ah,0), bc:_c(cb,cb,tb,cb),
			m:_m(0,0,-(1+ah+Math.floor(bw/aw*ah*2)),xw-bw-mw-ap-aw-1)
			}
		
		c[5]={w:1, h:1, 
			bw:_w(0,aw,ah,0), bc:_c(cbg,cbg,tb,cbg),
			m:_m(0,0,0,xw-bw-mw-ap-aw-1-bw)
			}
		x-=xw-bw-mw-ap
		y-=xh+ah
		break;
	case 'bl':
		c[1].m=_m(0,0,-xh,0)

		c[2].m=_m(bw+mw,0,bw+mw-1,bw+mw)

		c[3]={w:0, h:0}

		c[4]={w:1, h:1, 
			bw:_w(0,0,ah,aw), bc:_c(cb,cb,tb,cb),
			m:_m(0,0,-(1+ah+Math.floor(bw/aw*ah*2)),bw+mw+ap)
			}
		
		c[5]={w:1, h:1, 
			bw:_w(0,0,ah,aw), bc:_c(cbg,cbg,tb,cbg),
			m:_m(0,0,0,bw+mw+ap+bw)
			}
		x-=bw+mw+ap
		y-=xh+ah
		break;
	case 'tl':
		c[1].m=_m(ah,0,-xh,0)

		c[2].m=_m(bw+mw,0,-(xh-bw-mw+ah),bw+mw)

		c[3]={w:0, h:0}

		c[4]={w:1, h:1, 
			bw:_w(ah,0,0,aw), bc:_c(tb,cb,cb,cb),
			m:_m(0,0,-(1+ah-Math.floor(bw/aw*ah*2)),bw+mw+ap)
			}
		
		c[5]={w:1, h:1, 
			bw:_w(ah,0,0,aw), bc:_c(tb,cbg,cbg,cbg),
			m:_m(0,0,0,bw+mw+ap+bw)
			}
		x-=bw+mw+ap
		break;
	case 'tr':
		c[1].m=_m(ah,0,-xh,0)

		c[2].m=_m(bw+mw,0,-(xh-bw-mw+ah),bw+mw)

		c[3]={w:0, h:0}

		c[4]={w:1, h:1, 
			bw:_w(ah,aw,0,0), bc:_c(tb,cb,cb,cb),
			m:_m(0,0,-(1+ah-Math.floor(bw/aw*ah*2)),xw-bw-mw-ap-aw-1)
			}
		
		c[5]={w:1, h:1, 
			bw:_w(ah,aw,0,0), bc:_c(tb,cbg,cbg,cbg),
			m:_m(0,0,0,xw-bw-mw-ap-aw-1-bw)
			}
		x-=xw-bw-mw-ap
		break;
	case 'rb':
		c[1].m=_m(0,aw,-1*xh,0)

		c[2].m=_m(bw+mw,0,-(h+bw+mw),bw+mw)

		c[3]={w:1, h:xh-bw-mw-ap-ah-1}

		c[4]={w:1, h:1, 
			bw:_w(0,aw,ah,0), bc:_c(cb,tb,cb,cb),
			m:_m(0,0,-1*(1+ah+bw),xw-1)
			}
		
		c[5]={w:1, h:1, 
			bw:_w(0,aw,ah,0), bc:_c(cbg,tb,cbg,cbg),
			m:_m(0,0,0,xw-1-Math.floor(bw/ah*aw*2))
			}

		y-=xh-bw-mw-ap
		x-=xw+aw
		break;
	case 'rt':
		c[1].m=_m(0,aw,-1*xh,0)

		c[2].m=_m(bw+mw,0,-(h+bw+mw),bw+mw)

		c[3]={w:1, h:bw+mw+ap-1}

		c[4]={w:1, h:1, 
			bw:_w(ah,aw,0,0), bc:_c(cb,tb,cb,cb),
			m:_m(0,0,-1*(1+ah-bw),xw-1)
			}
		
		c[5]={w:1, h:1, 
			bw:_w(ah,aw,0,0), bc:_c(cbg,tb,cbg,cbg),
			m:_m(0,0,0,xw-1-Math.floor(bw/ah*aw*2))
			}

		y-=bw+mw+ap
		x-=xw+aw
		break;
	case 'lt':
		c[1].m=_m(0,0,-1*xh,aw)

		c[2].m=_m(bw+mw,0,-(h+bw+mw),aw+bw+mw)

		c[3]={w:1, h:bw+mw+ap-1}

		c[4]={w:1, h:1, 
			bw:_w(ah,0,0,aw), bc:_c(cb,cb,cb,tb),
			m:_m(0,0,-1*(1+ah-bw),0)
			}
		
		c[5]={w:1, h:1, 
			bw:_w(ah,0,0,aw), bc:_c(cbg,cbg,cbg,tb),
			m:_m(0,0,0,Math.floor(bw/ah*aw*2))
			}

		y-=bw+mw+ap
		break;
	case 'lb':
	default :
		c[1].m=_m(0,0,-1*xh,aw)

		c[2].m=_m(bw+mw,0,-(h+bw+mw),aw+bw+mw)

		c[3]={w:1, h:xh-bw-mw-ap-ah-1}

		c[4]={w:1, h:1, 
			bw:_w(0,0,ah,aw), bc:_c(cb,cb,cb,tb),
			m:_m(0,0,-1*(1+ah+bw),0)
			}
		
		c[5]={w:1, h:1, 
			bw:_w(0,0,ah,aw), bc:_c(cbg,cbg,cbg,tb),
			m:_m(0,0,0,Math.floor(bw/ah*aw*2))
			}
		
		y-=xh-bw-mw-ap
	}

for (var i=0; i<6; i++){
	var u = c[i].o ? c[i].o : _$("</div>"), o = c[i]
	u._.css({ width:(o.w+'px'), height:(o.h+'px'), 
		borderWidth:(o.bw?o.bw:0), borderColor:(o.bc?o.bc:'transparent'),
		background:(o.bg?o.bg:'none'),
		margin:(o.m?o.m:'auto')
		})
	c[i]=u
	}

c[0].id = id
c[0]._.cls('hintBubble')._.css({overflow:'hidden',position:'absolute',left:x+'px',top:y+'px'})._.aC( c[1]._.css({borderRadius:br+'px',borderStyle:'solid'}) )._.aC( c[2] )._.aC( c[3] )._.aC(c[4]._.css('borderStyle','solid') )._.aC(c[5]._.css('borderStyle','solid'))
document.body.appendChild(c[0])
},
width:function(a,b,c,d){
return a+'px '+b+'px '+c+'px '+d+'px'
},
color:function(a,b,c,d){
return a+' '+b+' '+c+' '+d
},
autoDir:function(x,y){
var body=(!document.compatMode || document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;

if(y>body.clientHeight/2){
	if(x>body.clientWidth/2)
		return 'br'
	else
		return 'bl'
	}
else{
	if(x>body.clientWidth/2)
		return 'tr'
	else
		return 'tl'
	}
},
getClickPos:function(e){
if(!e)e=window.event
if (event.targetTouches) event = event.targetTouches[0];//when on mobile safari
if (event.pageX != null && event.pageY != null) return {pageX: event.pageX, pageY: event.pageY};
var element = (!document.compatMode || document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;
return {pageX: event.clientX + element.scrollLeft, pageY: event.clientY + element.scrollTop};
}
}//ce
