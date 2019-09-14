

commonui.mainMenu = {
data:commonui.mainMenuItems ? commonui.mainMenuItems : {
	0:{ subKeys:[1]},
	1:{ innerHTML:'未设置菜单项目',tagName:'span' ,color:'silver'}
},
_new:{},
o:null,
c:null,
c_:null,
dataReady:null,
oo:{},
getHintPos:null,

init:function(name,nick,icon,honor,id,start){

var mm = _$('mainmenu','innerHTML','','className','')

if(commonui.checkIfInIframe()){
	if(mm)mm.style.display='none'
	return
	}

if(id){
	if (honor.substr(0,1)==' '){
		honor = honor.split(' ');
		honor[1] = parseInt(honor[1]);
		if(honor[1] && honor[1]>__NOW)
			honor = honor[2]
		else if(honor[3])
			honor=honor[3]
		else
			honor=''
		}

	/*
	mm.$0( _$('/div').$0(
		'className','avatar',
		//'onclick',function(e){commonui.mainMenu.menuOpen(e)},
		_$('/div').$0('className','cover',
			_$('/div').$0(
				'id','mainmenuavatar',
				'className','img',
				'style',{backgroundImage:'url('+commonui.loadCurUserPortrait(icon)+')'}
				)
			)
		) )
*/
	this.menuExtra = _$('/div','id',"usernamebg",
		(honor ? _$('/span', 'className', 'title '+(honor.match(/[\u4e00-\u9fa5]/)?' chn_bold':''), 
		'innerHTML',(honor.length<2 ? '&quot;'+honor+'&quot;' : honor)) : null),
		_$('/span', 'class', 'name '+( name.match(/[\u4e00-\u9fa5]/)?'chn_bold':'' ), 'innerHTML', name),
		(id ? _$('/span', 'className', 'id ', 
		'innerHTML',(id.toString().length<2 ? '0'+id.toString() : id)) : null)
		)

	}

mm._.add(
	this.loadHis()
	//,(__SETTING.bit & __SETTING.bits.noTopBg) ? _$('/div','style','position:absolute;width:1.5em;height:1.5em;left:calc(50% - 0.75em);margin-top:-1.2em;border-radius:0.75em;backgroundColor:'+__COLOR.bg4,__TXT.svg('down','width:0.6em;margin:1em auto auto 0.45em;fill:'+__COLOR.border0)	) : null
	)

},

genTree:function(ks,pk,pc){
if(!ks){
	if(this.dataReady)return
	ks=this.data[0].subKeys
	this.dataReady=true
	}
var x,y,i
for (i=0;i<ks.length;i++){
	x = this.data[ks[i]]
	if(pk)
		x.parent=pk
	if(pc&&!x.color)
		x.color=pc
	if (x.subKeys)
		this.genTree(x.subKeys, ks[i], x.color?x.color:null)
	}
},

next:function(id,n){//要打开的菜单项目id 点击的菜单项目所在级node
if(n.firstChild){
	var t = n.firstChild.childNodes
	for (var i=0; i<t.length; i++){
		if (t[i].className.indexOf(' select'))
			t[i].className=t[i].className.replace(' select','')
		if (t[i]._.gV('id')==id)
			t[i].className+=' select'
		}
	}

n = n._.gV('next')
if(!n)return alert('超过菜单层级限制')

var z= _$('<div/>'), keys = this.data[id].subKeys
for (var i=0;i<keys.length; i++){
	var y =  this.gen1(keys[i],n)
	if (y){
		this.oo[keys[i]]=_$('<div class="item"></div>')._.aC(y)._.sV('id',keys[i])
		z._.aC( this.oo[keys[i]] )
		}
	}

n.innerHTML=''
n._.aC( z )
n.style.display=''
for (var i=0; i<this.c.length; i++)
	this.c[i].className =''
n.className='last'
var b = n

while (b = b._.gV('next'))
	b.style.display='none'

//this.menuOpenAct()


var x = 0
for (var i=0; i<this.c.length; i++){
	var y = this.c[i].firstChild
	if(y && y.offsetHeight>x)x=y.offsetHeight
	}
for (var i=0; i<this.c.length; i++){
	var y = this.c[i].firstChild
	if (y && y.offsetHeight<x)
		y.lastChild.style.height=(y.lastChild.offsetHeight+(x-y.offsetHeight)-1)+'px'
	}

if(this.menuExtra && this.menuExtra.style.visibility=='hidden')
	this.setNameSize()

return n
},

menuOnClick:function(e){
if (!e) var e = window.event;
e.cancelBubble = true;
if (e.stopPropagation) e.stopPropagation();
},

bodyOnClick:function(e){
commonui.mainMenu.menuClose()
},

menuClose:function(){
if(this.o.style.display=='none')return
this.o._.hide()
if (window.removeEventListener)
	document.body.removeEventListener('click',this.bodyOnClick)
else if(window.detachEvent)
	document.body.detachEvent('onclick',this.bodyOnClick)
},

menuOpenAct:function(a,b,c){
if(this.o.style.display=='none'){
	if (window.addEventListener)
		document.body.addEventListener('click',commonui.mainMenu.bodyOnClick)
	else if(window.attachEvent)
		document.body.attachEvent('onclick',commonui.mainMenu.bodyOnClick)
	}
this.o._.show(a,b,c)
},

menuOpen:function(e,id,n){
if (!e) var e = window.event;
e.cancelBubble = true;
if (e.stopPropagation) e.stopPropagation();
if(!this.o){
	this.genTree()
	this.genMenu()
	}

if(!id){//打开根菜单时
	//if(this.showing)
	//	return this.menuClose()
	if(this.c_)
		this.c_.style.display=''
	id=0
	n=this.c[-1]
	}
else if(this.c_)
	this.c_.style.display='none'

if(!n){//指定id未指定菜单级则重建
	var t=[],p=this.data[id].parent
	while (p){
		t.unshift(p)
		p = this.data[p].parent
		}
	var n = this.next(0,this.c[-1])
	for (var i=0; i<t.length; i++)
		n = this.next(t[i],n)
	}

//this.menuOpenAct()
return this.next(id,n)
},

genMenu:function(){

this.o=commonui.createCommmonWindow()

var $=_$,s = commonui.userCache.get('startMenuHis');
if (s){
	this.c_ = $('/td')._.cls('recent')

	for (var i=0;i<s.length; i++){
		var y = this.data[s[i]]
		if(!y || y.disableDefault){
			continue
			commonui.userCache.del('startMenuHis')
			}
		var y =  this.gen1(s[i])
		if (y)
			this.c_._.add( $('/div')._.cls('item')._.add(y) )
		}
	this.c_._.add(
			$('/div')._.cls('item')._.add(
				$('/a').$0('href','javascript:void(0)','title','清除最近访问的菜单项目记录','className','small_colored_text_btn stxt block_txt_c0','onclick',function(){commonui.userCache.del('startMenuHis');alert('记录清除 请刷新页面')},'innerHTML','清除','style',{backgroundColor:'gray',fontWeight:'normal'})
				)
			)
	}

this.c = []
this.c[-1] = $('/span')
this.c[0] = $('/td')
this.c[1] = $('/td')._.css('display','none')
this.c[2] = $('/td')._.css('display','none')
this.c[3] = $('/td')._.css('display','none')

this.c[-1]._.sV('next',this.c[0])
this.c[0]._.sV('next',this.c[1])
this.c[1]._.sV('next',this.c[2])
this.c[2]._.sV('next',this.c[3])
this.c[3]._.sV('next',false)


var s = $('/tr')
if(this.c_)s._.aC(this.c_)
s._.aC(this.c[0])._.aC(this.c[1])._.aC(this.c[2])._.aC(this.c[3])

this.o._.addContent($('/table')._.attr('id','startmenu')._.aC(
	$('/tbody')._.aC(
		s
		)
	))
if(this.menuExtra && this.o._.addAfterContent){
	this.o._.addAfterContent( this.menuExtra )
	this.menuExtra.style.visibility = 'hidden'
	}

this.o._.css({/*left:'74px',top:($('mainmenu').offsetTop+38)+'px',*/right:'auto',position:'absolute',display:'none',width:'auto'})

if (window.addEventListener)
	this.o.addEventListener('click',this.menuOnClick)
else if(window.attachEvent)
	this.o.attachEvent('onclick',this.menuOnClick)

document.body.appendChild(this.o)

},

setNameSize:function(){

this.menuExtra.style.visibility=''
var x = this.menuExtra.childNodes
if(x[1]){
	var y = Math.max(x[0].offsetWidth,x[1].offsetWidth,x[2]?x[2].offsetWidth:0)
	for (var i=0; i<x.length; i++){
		if (x[i].offsetWidth<y){
			var z = x[i].innerHTML
			x[i].innerHTML = "<span style='letter-spacing:"+Math.floor((y-x[i].offsetWidth)/(z.length-1))+"px'>"+z.substr(0,z.length-1)+"</span>"+z.substr(z.length-1)
			}
		}
	}

},//fe

highLight:function(k){
if(this.oo[k])
	this.oo[k].insertBefore(_$('<span style="color:red;font-weight:bold">&gt;</span>'),this.oo[k].firstChild)
},//fe

checkHint:function(){
if(!this.getHintPos || !window.__NOW || !window.loader || Math.random()>0.2)return
var y=commonui.userCache.get('startMenuHintView')
if(y){
	var i=0,j=0
	for (var k in y){
		i++
		if(__NOW-y[k]>86400*30)
			delete y[k],	j++
		}
	if(j>0){
		if(i==j)
			commonui.userCache.del('startMenuHintView'),	y=null
		else
			commonui.userCache.set('startMenuHintView',y,86400*30)
		}
	}
i=[]
for (var k in this._new){
	if(this.data[k] && (__NOW-this._new[k])<86400*30 && (!y || !y[k])) i.push(k)
	}
if(i.length){
	var self=this
	window.setTimeout(function(){self.hint( i[Math.floor(Math.random()*i.length)] )},1000)
	}
},//fe

hint:function(k){
this.genTree()
var x = this.data[k]
if(!x || !x.parent || !x.innerHTML)return
var a = _$('<a href="javascript:void(0)" style="font-weight:bold">'+x.innerHTML+'</a>')._.on('click',
	function(e){
		commonui.mainMenu.menuOpen(e,this._.gV('p'))
		commonui.mainMenu.highLight(this._.gV('k'))
		var y=commonui.userCache.get('startMenuHintView')
		if(!y)y={}
		y[this._.gV('k')]=window.__NOW
		commonui.userCache.set('startMenuHintView',y,86400*30)
		}
	)._.sV('p',x.parent)._.sV('k',k)
var y=this.data[x.parent],z=''
while (y && y.innerHTML){
	z=y.innerHTML+' &raquo; '+z
	y = y.parent?this.data[y.parent]:null
	}
a.innerHTML = z+a.innerHTML
a = _$('<span>菜单更新功能 ('+(commonui.time2date(this._new[k],'y-m-d'))+')<br/></span>')._.aC(a)
x=this.getHintPos()
if(commonui.hintBubble)
	commonui.hintBubble.newArg().pos(x.x, x.y).type(x.y>100?'bl':'tl').open(a)
else
	loader.script(window.__COMMONRES_PATH+'/js_hintBubbleMin.js',function(){commonui.hintBubble.newArg().pos(x.x, x.y).type(x.y>100?'bl':'tl').open(a)})
},//fe

loadHis:function(mL){
var w=window,c=w.commonui,s = []//,his = commonui.userCache.get('startMenuHis')

/*
if (this.data.hisAddon && his){
	var r = new RegExp(this.data.hisAddon.join('|'),'g') , x = his.join(',') , y=x.replace(new RegExp(this.data.hisAddon.join('|'),'g'),'').replace(/,+/g,',').replace(/^,|,$/g,'')
	if (x!=y){
		his = y.split(',')
		c.userCache.set('startMenuHis',his,86400*365);
		}
	}

if(his)
	s=w.__NUKE.simpleClone(his)
*/

if(this.data.hisDefLeft){
	for(var i=0;i<this.data.hisDefLeft.length; i++)
		s.push(this.data.hisDefLeft[i])
	}

if (this.data.hisAddon){
	for(var i=0;i<this.data.hisAddon.length; i++)
		s.push(this.data.hisAddon[i])
	}

s.push(null)

if(this.data.hisDef){
	for(var i=0;i<this.data.hisDef.length; i++)
		s.push(this.data.hisDef[i])
	}

if (!s.length)
	return

this.genTree()

var x = _$('/div')._.cls('right'), y = _$('/div')/*._.cls('left')*/, z = y

for (var i=0;i<s.length; i++){
	if(s[i]===null){
		z = x
		continue
		}
	var u =  this.gen1(s[i],null,1)
	if (u){
		if(u.nodeName!='A')
			u.className+=' cell'
		z._.add( _$('/div')._.cls('td')._.add(u) )
		}
	}

return _$('/div').$0('className','stdbtn','style',{borderRadius:0},_$('/div')._.cls('innerbg')._.add(x,y,_$('/div')._.cls('clear')))

},

gen1:function(id,p,ismainmenu){

var x = this.data[id]
if(!x)return
if (x.u && !__CURRENT_UID)
	return
if (x.u===0 && __CURRENT_UID)
	return
if (x.check && !x.check())
	return
var y = x.tagName ? _$('/'+x.tagName): _$('/a')
	
y.className = ismainmenu ? 'mmdefault ' : ''

if(x.arg)
	y._.call.apply(y._,x.arg)
else{
	if(x.href){
		y.href = x.href
		if(x.href.match(/^https?:\/\//i))
			y.target='_blank'
		}
	else
		y.href='javascript:void(0)'
	if(x.className)
		y.className += x.className
	if(x.innerHTML){
		if( x.innerHTML.constructor==Function){
			var z = x.innerHTML()
			if(z && z.constructor==String)
				y.innerHTML = z
			else
				y._.add(z)
			}
		else if(x.innerHTML.constructor == String)
			y.innerHTML = x.innerHTML
		else
			y._.css('padding',0)._.add(x.innerHTML)

		}
	if (x.color)
		y.style.color=x.color
	if(x.on){
		if(x.on.constructor==Array){
			for(var i=0;i<x.on.length;i+=2)
				y._.on(x.on[i],x.on[i+1])
			}
		else
			y._.on(x.on.event,x.on.func)
		}
	}
y._.sV('id',id)

if (x.subKeys){
	y._.sV('parent',p)
	y._.sV('ismainmenu',ismainmenu)
	if(!x.disableDefault)
		y._.on('click',function(e){
			commonui.mainMenu.menuOpen(e,this._.gV('id'),this._.gV('parent'))
			if(this._.gV('ismainmenu')){
				var z = this.getBoundingClientRect(), 
					y = __NUKE.position.get(), 
					fe = {clientX:z.left, clientY:z.bottom ? z.bottom : z.top+z.height, pageX:z.left+y.xf, pageY:z.top+z.height+y.yf}
				commonui.mainMenu.menuOpenAct(fe,null,8)
				}
			})
	if(!x.color)
		y.className+=' gray'
	if(!ismainmenu)
		y.innerHTML+='<span class=arrow>&rsaquo;</span>'
	}
else{
	if(!x.disableDefault)
		y._.on('click',function(){commonui.mainMenu.click(this._.gV('id'))})
	}
y.style.whiteSpace= 'nowrap'
y.title=this.genTitle(x)
return y
},//fe

genTitle: function(o){
var t=[]
while (o){
	t.unshift(o.title ? o.title : ((o.innerHTML && o.innerHTML.constructor == String) ? o.innerHTML :''))
	if(o.parent)o=this.data[o.parent]
	else break
	}
return t.join(' - ')
},

/**
* 在运行时在菜单中的'论坛设置'(如果没有则加到根菜单) 中插入新的项目 成功返回true 没有空位(最多20个)返回false
* @param txt 项目文字
* @param href 链接地址 有onclick参数时无效
* @param onclick 点击callback函数 函数的第一个参数是event 函数中的this是此项目链接的DOM NODE
* @param check 显示条件检查函数 返回true时显示此项目 否则不显示 不设则总是显示 如：function(){if(window.__CURRENT_UID)return true}//登录状态显示
* 
* 示例
* commonui.mainMenu.addItemOnTheFly('测试菜单项',
*	null,
*	function(event){alert(this.innerHTML)},
*	function(){if(window.__CURRENT_UID)return true}
*	)
*/
addItemOnTheFly:function(txt,href,onclick,check){
var x = commonui.mainMenuItems,y=120
while(x[y])
	y++
if(y>140)
	return false
x[y] = {check:check?check:null,href:onclick?null:href, innerHTML:txt?txt:'???', on:onclick?{event:'click',func:onclick}:null, disableDefault:1}
if(x[18] && x[18].innerHTML=='论坛设置')
	x[18].subKeys.push(y)
else//如果没论坛设置 就加到根菜单里
	x[0].subKeys.push(y)
if(this.o)
	this.o.parentNode.removeChild(this.o)//clear menu, rebuild
return true
},//fe

click:function(id){
if(this.data.hisAddon){
	for (var i=0; i<this.data.hisAddon.length; i++){
		if(this.data.hisAddon[i]==id)
			return;
		}
	}
var s = commonui.userCache.get('startMenuHis'),ss=[]
if(!s) s=[]
for (var i=0; i<s.length; i++){
	if(typeof(s[i])=='number' && s[i]!=id)
		ss.push(s[i])
	}
ss.unshift(id)
if(ss.length>14)ss.pop()
commonui.userCache.set('startMenuHis',ss,86400*365);
}//fe
}//ce