if(!window.commonui)var commonui={}

commonui.hintBubble = {
cb:'#000',//边框色
cbg:'#ffe',//背景色
bw:2,//边框宽
mw:5,//padding
br:10,//圆角半径
ap:3,//箭头两侧padding
newArg:function(){
var self=this
return {
	x:0,	y:0,	relo:null,	w:0,	h:0,	type:null,	cb:null,	cbg:null,	cm:null,	c:null,	o:self,
	size:function(w,h){this.w=w;this.h=h;return this},
	pos:function(x,y,relo){this.x=x;this.y=y;this.relo=relo;return this},
	type:function(t){this.type=t;return this},
	color:function(cb,cbg){this.cb=cb;this.cbg=cbg;return this},
	close:function(cm){this.cm=cm;return this},
	content:function(c){this.c=c;return this},
	open:function(c){return this.o.open(this.x,this.y,c?c:this.c,this.relo,this.w,this.h,this.type,this.cb,this.cbg,this.cm)}
	}
},//fe
open:function(x,y,c,relo,w,h,type,cb,cbg,cm){//x y 内容 *位置相对node *宽 *高 *方向 *边框色 *背景色 *关闭方式

if (!w && !h)w=200
if(!cb)cb=this.cb
if(!cbg)cbg=this.cbg
var tb='transparent',
	id='hintBubble'+Math.random().toString().substr(2),
	o=null,
	u=null,
	ci="data:image/gif;base64,R0lGODlhDQAMAIABAAAAAAAAACH5BAEAAAEALAAAAAANAAwAAAIdDI4Jpo0BY0xsLloPxGzt93mdp2lj9Z2S5LSjExQAOw==";

if (window.__UA){
	if (__UA[0]==1 && __UA[1]<=6)
		tb='pink'
	}
else if(navigator.userAgent.indexOf('MSIE 6.0')!=-1)
	tb='pink'

if(tb=='pink')
	ci=window.__COMMONIMG_PATH ? __COMMONIMG_PATH+"/bubbleclose.gif" : 'about:blank'

var z = _$("<div class='content' style='visibility:hidden;width:"+(w?w+'px':'auto')+";height:"+(h?h+'px':'auto')+";position:absolute'></div>")
if(typeof(c)=='string')
	z.innerHTML=c
else
	z._.aC(c)
z._.aC(_$('<span>&nbsp;</span>'))._.aC( _$("<a title='close' class='close' href='javascript:void(0)'><img src='"+ci+"' style='border:none'/></a>") )

o=z.getElementsByTagName('a')
cm = (cm==1) ? o.length-1 : 0
for (var i=cm; i<o.length; i++ ){
	if(!o[i]._)_$(o[i])
	o[i]._.sV('closeId',id)._.on('click',function(event){var id=this._.gV('closeId');$(id).parentNode.removeChild($(id));if(commonui.cancelBubble)commonui.cancelBubble(event)})
	}

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

var aw=20,ah=30

if (w<aw+ap*2)w=aw+ap*2

var xw=w+mw*2+bw*2,xh=h+mw*2+bw*2

c[0]={w:xw, h:xh+ah}
c[1]={w:xw-bw*2, h:xh-bw*2, 
	bw:bw+'px', bc:cb,
	bg:cbg
	}
c[2]={o:z, w:w, h:h}

o=Math.floor(bw/aw*ah*2)
switch (type){
	case 'br':
		c[1].m=_m(0,0,-xh,0)
		c[2].m=_m(bw+mw,0,bw+mw-1,bw+mw)
		c[3]={w:1,	h:1,	bw:_w(0,aw,ah,0),	bc:_c(cb,cb,tb,cb),		m:_m(0,0,-(1+ah+o),xw-bw-mw-ap-aw-1) }
		c[4]={w:1,	h:1,	bw:_w(0,aw,ah,0),	bc:_c(cbg,cbg,tb,cbg),	m:_m(0,0,0,xw-bw-mw-ap-aw-1-bw) }
		x-=xw-bw-mw-ap
		y-=xh+ah
		break;
	case 'bl':
		c[1].m=_m(0,0,-xh,0)
		c[2].m=_m(bw+mw,0,bw+mw-1,bw+mw)
		c[3]={w:1,	h:1,	bw:_w(0,0,ah,aw),	bc:_c(cb,cb,tb,cb),		m:_m(0,0,-(1+ah+o),bw+mw+ap) }
		c[4]={w:1,	h:1,	bw:_w(0,0,ah,aw),	bc:_c(cbg,cbg,tb,cbg),	m:_m(0,0,0,bw+mw+ap+bw) }
		x-=bw+mw+ap
		y-=xh+ah
		break;
	case 'tl':
		c[1].m=_m(ah,0,-xh,0)
		c[2].m=_m(bw+mw,0,-(xh-bw-mw+ah),bw+mw)
		c[3]={w:1,	h:1,	bw:_w(ah,0,0,aw),	bc:_c(tb,cb,cb,cb),		m:_m(0,0,-(1+ah-o),bw+mw+ap) }
		c[4]={w:1,	h:1,	bw:_w(ah,0,0,aw),	bc:_c(tb,cbg,cbg,cbg),	m:_m(0,0,0,bw+mw+ap+bw) }
		x-=bw+mw+ap
		break;
	case 'tr':
		c[1].m=_m(ah,0,-xh,0)
		c[2].m=_m(bw+mw,0,-(xh-bw-mw+ah),bw+mw)
		c[3]={w:1,	h:1,	bw:_w(ah,aw,0,0),	bc:_c(tb,cb,cb,cb),		m:_m(0,0,-(1+ah-o),xw-bw-mw-ap-aw-1) }
		c[4]={w:1,	h:1,	bw:_w(ah,aw,0,0),	bc:_c(tb,cbg,cbg,cbg),	m:_m(0,0,0,xw-bw-mw-ap-aw-1-bw) }
		x-=xw-bw-mw-ap
	}

for (var i=0; i<5; i++){
	var u = c[i].o ? c[i].o : _$("</div>"), o = c[i]
	u._.css({ width:(o.w+'px'), height:(o.h+'px'), 
		borderWidth:(o.bw?o.bw:0), borderColor:(o.bc?o.bc:'transparent'),
		background:(o.bg?o.bg:'none'),
		margin:(o.m?o.m:'auto'),
		overflow:'hidden',
		borderStyle:'solid'
		})
	c[i]=u
	}

if(tb=='pink'){
	c[3]._.css({filter:'chroma(color='+tb+');'})
	c[4]._.css({filter:'chroma(color='+tb+');'})
	}

c[0].id = id
c[0]._.cls('hintBubble')._.css({position:'absolute'})._.aC( c[1]._.css({borderRadius:br+'px'}) )._.aC( c[2] )._.aC( c[3] )._.aC( c[4] )
if(relo){
	c[0]._.css({marginLeft:x+'px',marginTop:y+'px'})
	if(relo.nextSibling)
		relo.parentNode.insertBefore(c[0],relo.nextSibling)
	else
		relo.parentNode.appendChild(c[0])
	}
else{
	c[0]._.css({left:x+'px',top:y+'px'})
	document.body.appendChild(c[0])
	}
},
width:function(a,b,c,d){
return a+'px '+b+'px '+c+'px '+d+'px'
},
color:function(a,b,c,d){
return a+' '+b+' '+c+' '+d
},
autoDir:function(x,y){
var b=(!document.compatMode || document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;
if(y>b.clientHeight/2){
	if(x>b.clientWidth/2)b='br'
	else b='bl'
	}
else{
	if(x>b.clientWidth/2)b='tr'
	else b='tl'
	}
return b
}
}//ce