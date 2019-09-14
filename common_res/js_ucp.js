if(!window.commonui)
	commonui={}


commonui.ucp = {
_get_lock:null,
_get_debug:null,
_if_forum_admin:4,
_currentUid : 0,

load:function(uid,currentUid,o){
if(this._get_lock)return
uid = __NUKE.toInt(uid)
if(uid<1)
	return alert('未指定用户')
this._currentUid = currentUid
var self = this;
httpDataGetter.script_muti_get(__API.userInfo(uid) ,
	function(r){
		if (!r)
			return self._echo('数据错误')
		
		if(r.debug)
			self._get_debug = r.debug
		
		self._get_lock=false;
		
		if(r.error)
			var data = r.error[0]
		else
			var data = r.data[0]
		
		self._echo(data,o)
		return true
		},
	function(){self._get_lock=false;return self._echo('未收到结果')},
	__CHARSET
	);

},//fe


_title:function(_U){
if(!_U.honor)return '';
var h = _U.honor
if (h.substr(0,1)==' '){
	h = h.split(' ');
	h[1] = __NUKE.toInt(h[1]);
	if(h[1] && h[1]>window.__NOW)
		h = h[2]
	else if(h[3])
		h=h[3]
	else
		h=''
	}
return h
},//fe

_stat:function(_U){
var y = []
if(_U.verified!==undefined){
	var r = commonui.activeInfo(_U.verified,_U.uid)
	y.push(_$('/a','className', r[0]+' b', 'innerHTML', r[2], 'href', r[5] ? r[5] : 'javascript:void(0)', 'onclick', function(){alert(this.title)}, 'title', r[3]+' '+r[4]))
	}
if(_U.bit & 16777216)
	y.push(_$('/span','className','b','innerHTML',' 已注销'))
return y
},//fe

_echo:function(_U,o){
	
if(typeof(_U)=='string'){
	return o.appendChild( _$('<span/>')._.aC(this._genBlock('user_info_info_block','信息','',document.createTextNode(_U))))
	}

var _SELF = _U.uid==this._currentUid ? true : false,
_ADMIN = __GP.admin,
_SUPER = __GP['super'],
_GREATER = __GP.greater,
_LESSER = __GP.lesser,
_SUPERLESSER = __GP.superlesser,
//_STAFF = __GP.staff,
all = _$('<span/>'),
sst = (__GP.ubMod || __GP.ubStaff || _U.verified<0 || _U.uid==this._currentUid)?true:false,
stp = (__GP.ubMod || __GP.ubStaff || _U.uid==this._currentUid)?true:false,

//_ACT_UNNUKE = _STAFF,
_ACT_UNNUKE = (_LESSER && (__GP.userBit&1024) && (__GP.userBit&256)),
_ACT_NUKE = _SUPERLESSER || (__GP.userBit&1024) || _ACT_UNNUKE,
_VIEW_NUKE = (_LESSER && (__GP.userBit&256) && (__GP.userBit&(8|2048))),
tmp
//_VIEW_NUKE = _STAFF||_SUPER
_U.username  = _U.username+''
//---------------------------------------

//---------------------------------------------------
var buffs,self=this
if(_U.buffs){
	buffs= _$('<span/>')
	for(var k in _U.buffs)
		buffs.innerHTML += _U.buffs[k]+'<br/>'
	}

//---------------------------------------

var info = this._span(
	
	this._ul(
		this._a(!_SELF, '发送私信','/nuke.php?func=message#to='+_U.uid),
		this._a(_GREATER, '被操作记录',null,function(){adminui.viewLog(_U.uid,null)}),
		this._a(_GREATER, '操作记录',null,function(){adminui.viewLog(null,_U.uid)}),
		this._a((_GREATER && _SELF) || _ADMIN , '访问记录','/nuke.php?__lib=admin_log_search&__act=access_log&uid='+_U.uid),
		this._a(_SUPERLESSER, '强制登出',null,function(){
			__NUKE.doRequest({
				u:{u:__API._base,
						a:{__lib:"login",__act:"logout",to_uid:_U.uid,raw:3}
						},
				b:this,
				f:function(d){alert(d.error && d.error[0] ? d.error[0] : d.data[0])}
				})
			}),
		this._a(_ADMIN, '更改头衔','/nuke.php?func=settitle&uid='+_U.uid),
		this._a(_ADMIN, 'buff',null, function(e){adminui.addBuff(e,_U.uid)}),
		this._a(_SELF, '<span class="teal">更改密码</span>', null,function(){commonui.accountAction('changepass')}),
		this._a(_SELF, '<span class="teal">重置密码</span>', null,function(){commonui.accountAction('resetpass')}),
		this._a(_SELF, '<span class="teal">绑定手机号</span>', null,function(){commonui.accountAction('setphone')}),
		this._a(_SELF, '<span class="teal">更换手机号</span>', null,function(){commonui.accountAction('changephone')}),
		this._a(_SELF, '<span class="teal">账号关联</span>', null,function(){commonui.userLink(_U.uid,_U.bit)}),
		window.reM_54354 ? reM_54354(_U.uid) : null,
		window.reL_76376 ? reL_76376(_U.uid) : null,
		window.regl_958645? regl_958645(_U.uid):null
		)._.cls('actions'),
			
	this._ul2(
		'用户ID&emsp;',_U.uid,
		'用户名&emsp;',this._span(
				_U.username,
				(this._currentUid && !_SELF && _LESSER ? 
						_$('/a').$0('innerHTML',_U.followed ? '已关注' :'关注','onclick',function(){commonui.follow(_U.followed ? 8 :1,_U.uid)},'href','javascript:void(0)','className','small_colored_text_btn block_txt_c0','style','fontFamily:inherit;backgroundColor:'+(_U.followed ?'#aaa':__COLOR.border0))
						: null)
				),
		'邮箱&emsp;&emsp;',_U.email,
		'用户组&emsp;',this._span(_U.group+' ('+_U.gid+')', this._a(_ADMIN, '更改','/nuke.php?func=setgroup&uid='+_U.uid)),
		
		'激活&emsp;&emsp;' , sst ? this._span(this._stat(_U), (_ACT_NUKE ? _$('<a/>').$0('innerHTML','[NUKE]','href','javascript:void(0)','onclick',function(e){adminui.nukeUi(e,_U.uid)}) : null) ) : null,
		
		'禁言&emsp;&emsp;' ,
		(_U.muteTime || _ACT_NUKE) ? _$('<span/>')._.add(
			_U.muteTime ? 
				_$('/span')._.cls('orangered b')._.add(' 至'+commonui.time2date(_U.muteTime,'Y-m-d H:i')) 
				:(
					_U.maxBuffMute ? _$('<span/>').$0('className','gray b','title','在某些区域禁言')._.add(' 至'+commonui.time2date(_U.maxBuffMute,'Y-m-d H:i')) : null
				),

			this._a(_ACT_NUKE, '禁言','nuke.php?func=muteuser&uid='+_U.uid)
			) : null ,
				
		'头衔&emsp;&emsp;',
		_$('/span')._.add(
			tmp = this._title(_U),
			_ADMIN ? this._a(_ADMIN, '更改','/nuke.php?func=settitle&uid='+_U.uid)
			 : ((_SELF && tmp) ? _$('/a','href','javascript:void(0)','innerHTML','[清除]','onclick',function(){
					if(window.confirm('清除有时限的头衔 永久头衔不受影响')){
							__NUKE.doRequest({
								u:{u:__API._base,
										a:{__lib:"set_title",__act:"remove_random_title",raw:3}
										},
								b:this
								})
						}
					})
				: null 
				)
			),
		'发帖数&emsp;',_U.posts,
		'金钱&emsp;&emsp;',_$('<span>'+commonui.calc_money(_U.money)+'</span>'),
		'注册日期',this._span(commonui.time2date(_U.regdate) , this._a(_ADMIN, '更改','/nuke.php?func=setregtime&uid='+_U.uid)),
		'最近访问', _U.thisvisit ? commonui.time2date(_U.thisvisit) : null,
		'前次访问' , _U.lastvisit ? commonui.time2date(_U.lastvisit) : null,
		'最近发帖' , _U.lastpost  ? commonui.time2date(_U.lastpost) : null
		)._.cls('info')
	
	)

all._.aC(this._genBlock('user_info_block',_U.username+' 的基础信息','',info))

//----------------------------------------------
if(buffs)
	all._.aC(this._genBlock('user_buff_block',_U.username+' 的状态','',buffs))
//----------------------------------------------

if(_U.ipLog && _U.ipLog[0]){
	all._.aC(this._genBlock('user_ip_block',_U.username+' 的IP','',this._genIp(_U,_VIEW_NUKE)))
	}

//---------------------------------------


var avatar = this._span(
	
	this._ul(
		//this._a(_SELF || _GREATER, '更改头像','',function(e){commonui.setAvatar(e,_U.uid,_GREATER)}),
		this._a(_SELF || _GREATER, '更改头像','',function(e){__SCRIPTS.load('imgEdit',function(){commonui.setAvatar2(e,_U.uid,_GREATER)})})
		)._.cls('actions'),
			
	_$('<img/>')._.css('border','5px solid #ccc')._.attr('src','about:blank')._.on('error',function(){
		if(this._srcLoaded)return
		this.tmp = commonui.selectUserPortrait(_U.avatar,_U.buffs,_U.uid)
		if(this.tmp){
			this.src=this.tmp
			this._srcLoaded=true
			}
		else
			this.style.display="none"
		})
	
	)

all._.aC(this._genBlock('user_avatar_block',_U.username+' 的头像','',avatar))

//-------------------------------------------------------------------
		
var sign = this._span(
	
	this._ul(
		this._a(_SELF || _GREATER, '更改签名','',function(e){commonui.setSign(e,_U.uid,_GREATER)})
		)._.cls('actions'),
			
	_U.sign ? _$('<div/>')._.attr({id:'userSignC'})._.css({padding:'5px',border:'5px solid #ccc',width:'90%',maxWidth:'740px'})._.cls('sign ubbcode') : null,
	
	_U.sign ? _$('<img/>')._.css({display:'none'})._.attr('src','about:blank')._.on('error',function(){
		ubbcode.bbsCode({
					c:$('userSignC'),
					fId:1,
					tId:1,
					pId:1,
					authorId:_U.uid,
					rvrc:_U.fame/10,
					isSig:true,
					opt:128,
					txt:_U.sign+'',
					isLesser:_U._lesser
					})
		}) : null
	
	)

all._.aC(this._genBlock('user_sign_block',_U.username+' 的签名','',sign))

//-------------------------------------------------------------------


if( _U.bit & this._if_forum_admin || _U._admin || _U._super || _U._greater || _U._lesser || _U._superlesser || typeof(_U.userForum)=='object'){
	
	if(_U.adminForums){
		var u = this._ul()._.cls('actions')
		for(var k in _U.adminForums)
			this._ul(u, _$('/li', this._a(true, _U.adminForums[k],'/thread.php?fid='+k), __GP.admin?_$('/a',__TXT('gear'),'href','javascript:void(0)','_fid',k,'onclick',function(e){adminui.modifyForum(e,this._fid)}):null ))
		}
	else
		var u=null
	
		
	
	var adminStat = this._span(
		
		_U.username,
		
		_U._admin ? ' 拥有Administrator权限 拥有任意用户的管理权限 ' : 
			_U._super ? ' 拥有Super Moderator权限 拥有用户管理权限 ' : 
				_U._greater ? ' 拥有Moderator权限 拥有有限用户管理权限 ' : 
					_U._lesser ? ' 拥有Lesser Moderator权限 ' : 
						' 是普通用户/无特殊权限 ',
		
		_U._superlesser ? '拥有任意内容管理权限 ' :  null,

		u ? '拥有以下位置的内容管理与发言控制权限 ' : null,

		u

		)
			
	all._.aC(this._genBlock('user_admin_block',_U.username+' 的管理权限','',adminStat))
	}

//---------------------------------------------------

var u = this._ul2( '威望' , _U.fame/10 )._.cls('info')

for(var k in _U.reputation){
	var r  = _U.reputation[k]
	this._ul2(u, _$('<span/>')._.attr({title:r[2],innerHTML:r[0]}), r[1] )
	}
	
var repu = this._span(
	u,
	
	_$('<span><form action="nuke.php?func=user_reputation&uid='+_U.uid+'" method="post" target="_blank"><b>用户声望查询</b> 用户<select name="nameselect"><option value="username">用户名</option><option value="uid">用户ID</option></select><input type="text" name="name" size="15" value=""> 对 '+_U.username+' 的声望 <input type="submit" value="确认"></form></span>')
	)
		
all._.aC(this._genBlock('user_fame_block',_U.username+' 的声望','表示 论坛/某版面/某用户 对 '+_U.username+' 的关系',repu))


//---------------------------------------------------
if(_U.items){
	
	var item = _$('<span/>')
	all._.aC(this._genBlock('user_fame_block',_U.username+' 的物品/道具','',item))

	if(commonui.userItem){
		commonui.userItem.manualInit(item, this._currentUid )
		commonui.userItem.open()
		if(_U.items==2)commonui.userItem.list(null,null,null,_U.uid)
		}
	else
		loader.script(__SCRIPTS.userItem,function(){
			commonui.userItem.manualInit(item, this._currentUid)
			commonui.userItem.open()
			if(_U.items==2)commonui.userItem.list(null,null,null,_U.uid)
			} )

	
	}

//---------------------------------------------------

if(typeof(_U.userForum)=='object'){
	
	all._.aC(this._genBlock('user_forum_block',_U.username+' 的个人版面','个人版面是由用户自己管理的版面 以用户声望限制访问权限',
		this._span(

			this._ul(
				this._a(_SELF, '用户版面设置', '', function(e){if(window.adminui)
						adminui.modifyUserForum(e,_U.userForum[0])
					else
						loader.script(__SCRIPTS.admin,function(){adminui.modifyUserForum(e,_U.userForum[0])})
					}),
				this._a(typeof(_U.userForum)=='object', _U.userForum[1], '/thread.php?fid='+_U.userForum[0])
				)._.cls('actions')

			)

		))
	
	}
else if(_U.userForum && _SELF){
	
	all._.aC(this._genBlock('user_forum_block','创建个人版面','个人版面是由用户自己管理的版面 以用户声望限制访问权限',
		this._span(

			this._ul(
				this._a(typeof(_U.userForum)!='object' , '创建个人版面', '/nuke.php?func=userforum&act=create')
				)._.cls('actions')

			)

		))	
	}

//---------------------------------------------------
if(this._currentUid){
	all._.aC(this._genBlock('user_post_block', _U.username+' 发布的贴子','',
		this._span(

			this._ul(
				this._a(true , '搜索 '+_U.username+' 发布的主题', '/thread.php?authorid='+_U.uid),
				this._a(true , '搜索 '+_U.username+' 发布的回复', '/thread.php?searchpost=1&authorid='+_U.uid)
				)._.cls('actions'),
					
			_$('<div/>')._.attr('id','vftrwegvbytrjnuh'),

			stp ? __NUKE.trigger(function(){
				httpDataGetter.script_muti_get(
					'/nuke.php?__lib=load_topic&__act=load_topic_by_uid&uid='+_U.uid+'&raw=1',
					function(d){
						if (!d)return false;
						var o = $('vftrwegvbytrjnuh'),i=0
						if (d.error){
							o.innerHTML = d.error;
							return true;
							}
						for(var k in d.data[0]){
							var x = d.data[0][k]
							if(x.tid)
								o.innerHTML+="<span class='gray'>"+commonui.time2date(x.postdate,'y-m-d H:i')+"</span> <a href='/read.php?tid="+(x.quote_from ? x.quote_from : x.tid)+"' target='_blank'>"+x.subject+"</a><br/>"
							else
								o.innerHTML+="<span class='gray'>"+x.subject+"</span><br/>"
							if(i++>10)break;
							}
						return true;
						},
					function(){
						$('vftrwegvbytrjnuh').innerHTML='读取错误';
						},
					'gbk'
					);
				}) : null
			)

		))
	}

//---------------------------------------------------
/*
if(_SELF){
	all._.aC(this._genBlock('user_script_block','用户脚本','用javascript制作论坛插件',
		this._span(

			this._ul(
				this._a(true , '编辑用户脚本', '/nuke.php?func=user_script')
				)._.cls('actions')

			)

		))	
	}
*/

//---------------------------------------------------

if(_LESSER){
	
	var u = _$('<span/>');
	if(typeof(_U.remark)=='object'){
		for(var k in _U.remark)
			u.innerHTML+="<div "+((_U.remark[k][4]&1)?'><span':"onmouseover='this.firstChild.style.visibility=\"\"' onmouseout='this.firstChild.style.visibility=\"hidden\"'><span style='visibility:hidden'")+"><span class='gray'>"+commonui.time2date(_U.remark[k][3])+"</span> <a href='nuke.php?func=ucp&uid="+_U.remark[k][1]+"' target='_blank'>["+_U.remark[k][1]+"]</a> "+_U.remark[k][2]+" <a href='javascript:void(0)' onclick='__NUKE.doRequest({u:__API.remarkDel("+_U.uid+","+_U.remark[k][0]+"),b:this})'>[删除]</a></span></div>";
		}
	all._.aC(this._genBlock('user_remark_block','用户备注','版主可见,用户信息备忘,添加/删除备注可能在一天后方能生效',
		this._span(

			u,
			_SELF ? null : _$('/div')._.add(
				_$('/input'),
				_$('/button').$0('innerHTML','提交一条备注','onclick',function(){
					var v = this.previousSibling.value, w = v.match(/(?:&|\?)tid=(\d+)/)
					if(w)v='[tid]'+w[1]+'[/tid]'
					if(!v)
						return
					if(v.match(/\.(jpg|jpeg|gif|png)$/))
						return alert('仅限文字')
					__NUKE.doRequest({
						u:__API.remarkAdd(_U.uid,v,this.nextSibling.checked?1:0),
						b:this
						})
					}),
				_$('/input').$0('type','checkbox'),
				'所有用户可见',
				_$('/b').$0('className','red','innerHTML','&emsp;严禁添加无用备注')
				)


			)

		))	
	}

//---------------------------------------------------


o.appendChild(all)
var u = location.search.match(/(?:\?|&)reset_email=([a-z0-9A-Z]+)/)
if(u)
	commonui.resetEmail(_U.username, _U.uid, u[1])



},//fe
_long2ip : function (ip) {
if(typeof ip =='string' && ip.indexOf('.')!=-1)
	return ip
ip = __NUKE.toInt(ip)
return [ip >>> 24, ip >>> 16 & 0xFF, ip >>> 8 & 0xFF, ip & 0xFF].join('.');
},//fe
_genIpSub : function(o,data,ifS){
if(typeof data !='object')
	return
var $ = _$, oo = $('/table','className', 'forumbox','style','width:auto'), ooo,i=0
for(var k in data){
	var x = data[k]
	oo._.add(
		$('/tr','style','font-size:12px','className', 'row'+(1+((i++)&1)),
			$('/td','className', 'c1')._.add(commonui.time2date(x[1],'Y-m-d')),
			$('/td','className', 'c2',	$('/b')._.add(x[0] ? this._long2ip(x[0]) : 'n/a')),
			$('/td','className', 'c1')._.add(
				$('/b')._.add(x[2]? x[2] : null),
				
				x[0] ? 
				$('/a').$0('href','javascript:void(0)','name',this._long2ip(x[0]),'innerHTML','[地区]','onclick',function(e){commonui.ipArea(e,this.name)})
				: null),
			ooo = $('/td','className', 'c1')
			)
		)
	if(ifS && x[0] && this.genIp_5649)
		this.genIp_5649(ooo,x,ifS)
	}
o.appendChild(oo)
},//fe
day2date:function(d){
d = d*86400-28800+1;
return commonui.time2date(d, 'Y/m/d')
},
_genIp :function(_U,ifS){
	var x = _$('/span')
if(ifS){
	__NUKE.doRequest({
		u:{u:'/nuke.php?',
			a:{__lib:"admin_log_search",
				__act:"user_log_recent",
				uid:_U.uid,
				raw:3}
			},
		f:function(d){
			var e = __NUKE.doRequestIfErr(d)
			if(e)
				return alert(e)
			eval ('var y = '+d.data[0])
			x._.add(y(_U.uid,d.data[1]))
			}
		})
	}
return x

},//fe




_span : function(){
if(!arguments[0])return
var u = _$('<span/>')
for(var i=0;i<arguments.length;i++)
	u._.add(arguments[i])
return u
},//fe

_a : function(x,n,h,f,t){
if(!x)return null
var a = _$('<a/>')._.attr('innerHTML','['+n+']')
if(f)
	a._.on('click',f)

a._.attr('href',h?h:'javascript:void(0)')
if(h && h.substr(0,4)=='http')
	a._.attr('target','_blank')
	
if(t)
	a._.attr('title',t)
return a
},//fe

_ul:function(){

if(arguments[0] && arguments[0].nodeName=='UL')
	var u = arguments[0],i=1
else
	var u = _$('<ul/>')._.css({padding:'0',margin:'0'})._.aC(_$('<div/>')._.cls('clear')) , i=0

for(;i<arguments.length;i++){
	var v = arguments[i]
	if(!v)continue
	if(typeof(v)=='string')
		v = _$('<span/>')._.attr('innerHTML',v) 
	else
		v = _$('<span/>')._.aC(v)
	u._.aC([_$('<li/>')._.css({paddingRight:'5px'})._.aC(v),u.lastChild])
	}

return u
},//fe

_txtWidth:function(s){
var j = 0,c
for (var i=0;i<s.length;i++){
	c = s.charCodeAt(i);
	if (c > 127)
		j = j+1;
	else if ( (c<=122 && c>=97)||(c<=90 && c>=65) )
		j = j+0.65;
	else
		j = j+0.35;
	}
return j
},//fe

_ul2:function(){

if(arguments[0] && arguments[0].nodeName=='UL')
	var u = arguments[0],i=1
else{
	var i=0,u = _$('/ul')._.css({padding:'0',margin:'0',minWidth:'0'})._.aC(
		_$('/div')._.cls('clear')._.add(
			__NUKE.trigger(function(){

				var x=this.parentNode.parentNode.getElementsByTagName('li'),y=Math.floor(this.parentNode.parentNode.offsetWidth/5)
				for(var i=0;i<x.length;i++)
					if(x[i].offsetWidth>y)y=x[i].offsetWidth
				if(!y)return
				if(y>250)y=250
				for(var i=0;i<x.length;i++)
					x[i].style.width=y+'px'
					
				})
			)
		)
	}
for(;i<arguments.length;i+=2){
	if(!arguments[i] || !arguments[i+1])continue
	var k = arguments[i],v = arguments[i+1]
	u.insertBefore(
		_$('/li')._.css('width','auto')._.add(
			(k.constructor==String)?_$('/label').$0('innerHTML',k):_$('/label')._.add(k),
			_$('/span')._.add(' : ',v)._.css('color','gray')
			),
		u.lastChild
		)
	}

return u
},//fe

_genBlock :function(id,name,info,o){
return commonui.genStdBlock_a ('ucp'+id,name,info,o)
}//fe

}//ce


commonui.resetEmail = function(name,uid,tok){
this.createadminwindow()
var $ = _$,x = this.adminwindow,y
x._.addContent(null)
x._.addTitle('修改账号邮箱')
x._.addContent(
	$('/span')._.add(
		'修改账号 '+name+' 的邮箱',$('/br'),
		y=$('/input','placeholder','输入新的邮箱'),$('/br'),
		$('/button','innerHTML','确定','onclick',function(){
			__NUKE.doRequest({
				u:{u:__API._base+'__lib=login&__act=reset_email&raw=3',
					a:{uid:uid,email:y.value,token:tok}
					},
				b:this
				})
			})
		)
	)
this.adminwindow._.show()
}//fe


commonui.setPhone = function(){
this.createadminwindow()
var $ = _$,x = this.adminwindow,y,z
x._.addContent(null)
x._.addTitle('绑定手机号')
x._.addContent(
	y=$('/span')._.add(
		'绑定手机可以获得发帖权限',$('/br'),
		$('/input','placeholder','输入手机号 国际区号空格分隔','title','输入手机号 国际区号空格分隔'),$('/br'),
		$('/button','innerHTML','向此手机号发送验证码','onclick',function(){
			z = '_'+this.previousSibling.previousSibling.value.replace(/^[\s0+]+|\s+$/g,'')
			__NUKE.doRequest({
				u:{u:__API._base+'__lib=login&__act=set_phone_send&raw=3',
					a:{phone:z}
					},
				b:this,
				f:function(d){
					if(d.error)
						return alert(d.error[0])
					y.innerHTML=''
					y._.add(
						'已发送 请输入收到的验证码',$('/br'),
						$('/input','placeholder','输入验证码'),$('/br'),
						$('/button','innerHTML','确定','onclick',function(){
							__NUKE.doRequest({
								u:{u:__API._base+'__lib=login&__act=set_phone&raw=3',
									a:{vcode:this.previousSibling.previousSibling.value.replace(/^\s+|\s+$/g,''),phone:z}
									},
								b:this,
								f:function(d){
									return alert(d.error ? '错误 '+d.error[0] : d.data[0])
									}
								})
							})
						)
					}
				})
			})
		)
	)
this.adminwindow._.show()
}//fe

commonui.userLink = function(uid,ub){
if((ub&4096) && (ub&1048576)==0)
	return alert('此账号已关联过')
this.createadminwindow()
var $ = _$,x = this.adminwindow,y,z
x._.addContent(null)
x._.addTitle('关联账号')
if(ub&1048576){//绑定过手机
	x._.addContent(
		y=$('/span')._.add(
			'输入账号绑定的手机号 获取验证码 以关联其他账号',$('/br'),
			'关联未绑定的手机号的账号可给予其发言权限',$('/br'),
			'关联账号之间NUKE/锁定/禁言的状态共享',$('/br'),
			$('/input','placeholder','输入手机号 国际区号空格分隔','title','输入手机号 国际区号空格分隔'),$('/br'),
			$('/button','innerHTML','发送验证码','onclick',function(){
				z = '_'+this.previousSibling.previousSibling.value.replace(/^[\s0+]+|\s+$/g,'')
				__NUKE.doRequest({
					u:{u:__API._base+'__lib=login&__act=user_link_send&raw=3',
						a:{phone:z}
						},
					b:this,
					f:function(d){
						if(d.error)
							return alert(d.error[0])
						y.innerHTML=''
						y._.add(
							'已发送 请于欲关联的账号处输入收到的验证码'
							)
						}
					})
				})
			)
		)
	}
else if((ub&4096)==0){//没关联过
	x._.addContent(
		y=$('/span')._.add(
			'关联一个绑定手机号的账号可使此账号获得发言权限',$('/br'),
			'关联账号之间NUKE/锁定/禁言的状态共享',$('/br'),
			$('/button','innerHTML','下一步','onclick',function(){
				y.innerHTML=''
				y._.add(
					'请登录欲关联的账号生成验证码并在此输入',$('/br'),
					$('/input','placeholder','输入验证码'),$('/br'),
					$('/button','innerHTML','提交','onclick',function(){
						z = this.previousSibling.previousSibling.value.replace(/^\s+|\s+$/g,'')
						__NUKE.doRequest({
							u:{u:__API._base+'__lib=login&__act=user_link&raw=3',
								a:{code:z}
								},
							b:this,
							f:function(d){
								if(d.error)
									return alert(d.error[0])
								y.innerHTML=''
								y._.add(	d.data[0])
								}
							})
						})
					)
				})
			)
		)
	}
__NUKE.doRequest({
	u:{u:__API._base+'__lib=login&__act=user_link_get&raw=3',
		a:{uid:uid}
		},
	b:this,
	f:function(d){
		if(d.error)
			return alert(d.error[0])
		if(d.data[0]){
			y._.add($('/br'),$('/br'),'已经关联的用户',$('/br'))
			for(var k in d.data[0]){
				y._.add(
					$('/b')._.add(d.data[0][k]),
					$('/span','style','color:silver')._.add(' (UID '+k+')'),
					$('/br')
					)
				}
			}
		}
	})
this.adminwindow._.show()
}//fe


commonui.ucp.accountAction = function(act){
var c = commonui
c.createadminwindow()
var $ = _$,x = c.adminwindow,y='账号操作'
switch(act){
	case 'oauthlogin':
		y='使用第三方账号登录'
		break;
	case 'login':
		y='账号登录'
		break;
	case 'resetpass':
		y='重置密码'
		break;
	case 'changepass':
		y='修改密码'
		break;
	case 'changephone':
		y='修改绑定手机'
		break;
	case 'setphone':
		y='绑定手机'
		break;
	case 'oauthreg':
		y='使用第三方账号登录'
		break;
	case 'register':
		y='账号注册'
		break;
	case 'logout':
		y='账号登出'
		break;
	case 'iflogin':
		y='账号登录'
		break;
	}
x._.addContent(null)
x._.addTitle(y)

if(!this.accountAction.iif){
	this.accountAction.iif = $('/iframe','style','border:none;width:25em;height:60em')
	window.addEventListener("message", function(e){
		//if(e.origin!=location.host)return
		var x
		if((x = commonui.ucp.accountAction.iif) && e.data=='loginFrameWindowWidth50'){
			x.$0('style','width:50em;height:120em')
			commonui.adminwindow._.show()
			}
		})
	}
this.accountAction.iif.src = 'https://'+location.host+'/nuke.php?__lib=login&__act=account&'+act
x._.addContent(
	this.accountAction.iif
	)

c.adminwindow._.show()
}//
