if(!window.adminui)
	var adminui = {};
if(!window.commonui)
	var commonui = {}


adminui.getValue = function(f,n){
var x = f.elements.namedItem(n)
if(!x.nodeName && x.length){
	for(var i=0;i<x.length;i++){
		if(x[i].checked)
			return x[i].value
		}
	return
	}
if(x.nodeName=='select')
	return x.options[x.selectedIndex].value
if(x.type=='checkbox')
	return x.checked ? 1 :''
return x.value
}

adminui.txt = function(x){
return document.createTextNode(x)
}

adminui.createadminwindow = function(id)
{
if(this.w)return
this.w = commonui.createCommmonWindow()
if(!id)
	this.w.id = 'adminwindow';
else
	this.w.id = id;
if($('massAdminForm')) $('massAdminForm').appendChild(this.w);
else document.body.appendChild(this.w);
}
//fe

adminui.hide=function (){
this.w.style.display='none'
}//fe



/**
 * 提前主题
 * @param {type} e
 * @param {type} tid
 * @returns {undefined}
 */
adminui.pushtopic = function(e,tid)
{
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('提前主题');
this.w._.addContent(		
	_$('/button').$0('innerHTML','提前主题','type','button','onclick',function(){
			__NUKE.doRequest({
				u:__API.topicPush(tid),
				b:this
				})
			}
		),
	_$('/button').$0('innerHTML','下沉主题','type','button','onclick',function(){
			__NUKE.doRequest({
				u:__API.topicPush(tid,1),
				b:this
				})
			}
		)
	)
this.w._.show();
}
//fe

/**
 * 加分
 * @param {type} e
 * @param {type} tid
 * @param {type} pid
 * @param {type} fid
 * @returns {undefined}

adminui.addpoint = function (e,tid,pid,fid)
{
this.createadminwindow()

if (__GP['super'] || fid<0)
	var apinput = "<input type='text' size='10' name='rcvc' value=''>(-1500~1500)";
else
	var apinput = "只需判断好坏，不要考虑具体分数<br/><select name='rcvc'><option value='lv01'>悲剧奖</option><option value='lv02'>安慰奖</option><option value='lv0'>鼓励奖</option><option value='lv1'>好</option><option value='lv2'>很好</option><option value='lv3'>巨好</option><option value='lv-1' style='background:#fdd'>不好</option><option value='lv-2' style='background:#fdd'>很不好</option><option value='lv-3' style='background:#fdd'>巨不好</option></select>";
this.w._.addContent(null)
this.w._.addContent( "\
	<form action='' target='_blank' method='post'>\
	<table>\
		<tr>\
			<td>\
				声望\
			</td>\
			<td>\
				"+apinput+"\
			</td>\
		</tr>\
		<tr>\
			<td>\
				理由\
			</td>\
			<td>\
				<input type='text' size='10' name='info' value=''>\
			</td>\
		</tr>\
		<tr>\
			<td>\
				PM\
			</td>\
			<td>\
				<input type='radio' name='pm' value='1' checked='checked'>是\
				<input type='radio' name='pm' value=''>否\
			</td>\
		</tr>\
		<tr>\
			<td>\
				增加金钱\
			</td>\
			<td>\
				<input type='radio' name='addmoney' value='1' checked='checked'>是\
				<input type='radio' name='addmoney' value=''>否\
			</td>\
		</tr>\
		<tr>\
			<td>\
				增加威望\
			</td>\
			<td>\
				<input type='radio' name='norvrc' value='' checked='checked'>是\
				<input type='radio' name='norvrc' value='1'>否\
			</td>\
		</tr>\
		<tr>\
			<td colspan=2>\
				<input name='submit' value='提交' type='submit'> <input value='取消' type='button' onclick='adminui.hide()'><br/>\
				请勿连续对一个帖子加分或扣分，如需超标准加分或扣分请使用举报或直接联络超版\
			</td>\
		</tr>\
	</table>\
	</form>\
	<iframe name='adminwindowiframe' id='adminwindowiframe' scrolling='no' frameBorder=0 allowtransparency='true' src='./nuke.php?func=addpoint&f=show_add_point_left&fid="+fid+"' style='height:150px;width:330px;border:none;overflow:hidden'></iframe>\
")
this.w._.show(e)
this.w.getElementsByTagName('form')[0].action = 'nuke.php?func=addpoint&tid='+tid+'&pid='+pid;
this.w.getElementsByTagName('form')[0].target = 'adminwindowiframe';
}
*/

commonui.sliderInput = function(w,min,max,start,step){
var i,v
return _$('/span',
	i = _$('/input','type','range','style','verticalAlign:bottom;width:'+w+'em','value',start, 'min',min, 'max',max, 'step',step,'onchange',function(){v.value=i.value},'onmousemove',function(){v.value=i.value}),
	v = _$('/input','value',start,'style','width:'+(Math.abs(min)+Math.abs(max)+'').length+'em','onchange',function(){
		if(v.value>max)v.value=max
		if(v.value<min)v.value=min
		i.value=v.value
		})
	)
}//fe


adminui.addpoint = function (e,tid,pid,fid)
{

this.createadminwindow()
this.w._.addContent(null)
var $ = _$, n, de=function(x){return $('/span','className','silver','innerHTML',x)},dig,rr,rs,ri,rv,ni,rg,rt,rx,
lv = function(v){
	return $('/input').$0('type','radio','name','level','value',v,'onclick',function(){
		dig.checked=(this.value&(16|32|64|128)) ? false :true
		if(dig.checked){
			rt.checked = true
			if(rr)
				rr.checked=true
			}
		})
	},
sw = function(x){
	if(x){
		rs.style.display=''
		ri.style.display='none'
		on(dig)
		on(rt)
		if(rr)
			on(rr)
		on(rv)
		on(rg)
		}
	else{
		rs.style.display='none'
		ri.style.display=''
		off(dig)
		off(rt)
		if(rr)
			off(rr)
		off(rv)
		if(!__GP.superlesser)
			off(rg,'需要Superlesser权限')
		}
	},
on = function(o){
	if(o._x)return
	//if(o._c)o.checked = o._c 
	//if(o._v)o.value = o._v
	o.disabled=''
	o.title=''
	o.onclick = function(){}
	},
off = function(o,t,x){
	if(x)o._x = x
	if(t){
		o.title = t
		o.onclick = function(){alert(this.title)}
		}
	//o._c = o.checked
	//o._v = o.value
	//o.checked=o.value=''
	o.disabled=true
	}

this.w._.addTitle('评分');


this.w._.addContent(
	$('/span')._.add(
		$('/input').$0('type','radio','name','act','value',0,'checked',1,'onclick',function(){
			if(this.checked)sw(1)
			}),'评分 ',
		$('/input').$0('type','radio','name','act','value',4194304,'onclick',function(){
			if(this.checked)sw()
			}),'加减声望 ',$('/br'),
		$('/br'),
		rs=$('/span')._.add(
		'增加声望值',$('/br'),
			$('/table',
				$('/tr',
					$('/td')._.add(
						lv('16'),'15',de('(象征性) ')
						),
					$('/td')._.add(
						lv('32'),'30 '
						),
					$('/td')._.add(
						lv('64'),'45 '
						)
					),
				$('/tr',
					$('/td')._.add(
						lv('128'),'60 '
						),
					$('/td')._.add(
						lv('256'),'75',de('(鼓励) ')
						),
					$('/td')._.add(
						lv('512'),'105 '
						)
					),
				$('/tr',
					$('/td')._.add(
						lv('1024'),'150',de('(好) ')
						),
					$('/td')._.add(
						lv('2048'),'225 '
						),
					$('/td')._.add(
						lv('4096'),'300',de('(+好) ')
						)
					),
				$('/tr',
					$('/td')._.add(
						lv('8192'),'375 '
						),
					$('/td')._.add(
						lv('16384'),'450 '
						),
					$('/td')._.add(
						lv('32768'),'525 '
						)
					),
				$('/tr',
					$('/td')._.add(
						lv('65536'),'600',de('(双+好) ')
						)
					)
				)
			),
		ri=$('/input','placeholder','声望-1500~1500','value','','style','display:none'),
		$('/br'),$('/br'),
		rv = $('/input').$0('type','checkbox','value','2','checked','1'),' 增加威望* ',
		$('/br'),
		rg = $('/input').$0('type','checkbox','value','1','checked','1'),' 增加/扣除金钱** ',
		$('/br'),
		dig = $('/input').$0('type','checkbox','value','8'),' 主题加入精华区 ',
		$('/br'),
		rt = $('/input').$0('type','checkbox','value','16777216','_negvalue','67108864'),' 增加主题的推荐值 ',
		$('/br'),
		pid ? [rr = $('/input').$0('type','checkbox','value','8388608','_negvalue','33554432'),' 增加回复的推荐值 ',
		$('/br')] : null,
		rx = $('/input').$0('type','checkbox','value','4','checked','1'),' 给作者发送PM ',
		$('/br'),
		ni = $('/input').$0('type','text','placeholder','加分说明','value',''),
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				var x = this.parentNode.getElementsByTagName('input'),opt=0
				for (var i=0;i<x.length;i++){
					if(!x[i].disabled){
						if (x[i].checked)
							opt |= x[i].value
						else if(x[i]._negvalue)
							opt |= x[i]._negvalue
						}
					}
				commonui.userCache.set('lastTipOpt', opt, 86400 * 30);
				commonui.userCache.set('lastTipInfo', ni.value, 86400 * 30);
				commonui.userCache.set('lastTipAmt', ri.value, 86400 * 30);
				__NUKE.doRequest({
					u:{u:__API._base,
							a:{__lib:"add_point_v3",__act:"add",opt:opt,fid:fid,tid:tid,pid:pid,info:ni.value,value:ri.value,raw:3}
							},
					b:this
					})
				}
			),
		$('/br'),
		$('/br'),
		__GP.superlesser ? [
			'批量加分 填入本主题内要加分的pid 每行一个',$('/br'),
			$('/textarea'),$('/br'),
			$('/button').$0('innerHTML','批量加分','type','button','onclick',function(){
					var x = this.parentNode.getElementsByTagName('input'),opt=0
					for (var i=0;i<x.length;i++)
						if (x[i].checked) opt |= x[i].value
					var pids = this.previousSibling.previousSibling.value.match(/\d+/g), results='',
					mas = function(pids){
						if(pids.length){
							var pp = pids.shift()
							__NUKE.doRequest({
								u:{u:__API._base,
										a:{__lib:"add_point_v3",__act:"add",opt:opt,fid:fid,tid:tid,pid:pp,info:ni.value,value:ri.value,raw:3}
										},
								f:function(d){
									if(d.error)
										return alert('pid:'+pp+' '+d.error[0])
									var result = 'pid:'+pp+' '+d.data[0]
									results += result+'\n'
									console.log(result)
									mas(pids)
									}
								})
							}
						else
							alert('操作完毕\n'+results)
						}//
					if(confirm('请检查加分参数并继续\n加分过程中不要关闭窗口或离开本页面\n出现错误时会中断'))
						mas(pids)
					}
				),$('/br'),$('/br')
			] : null,
		de('* 150声望合1威望<br/>** 100声望合1金币 扣减声望时可以扣除金钱<br/><br/>'),n = de('')
		)
	)
// Restore tip settings from userCache, if any.
var lto = commonui.userCache.get('lastTipOpt')|0
if (lto) {
	var lti = commonui.userCache.get('lastTipInfo'), lta = commonui.userCache.get('lastTipAmt'), x = rs.parentNode.getElementsByTagName('input')
	for (var i=0;i<x.length;i++){
		if ((x[i].type=='checkbox' ||x[i].type=='radio')  && x[i].value && (lto & x[i].value)==x[i].value){
			x[i].checked='checked'
			if(x[i].value==4194304)
				sw()
			}
		}
	ni._.on('focus',function(){if(!this.value && lti)this.value = lti})
	ri._.on('focus',function(){if(!this.value && lta)this.value = lta})
	}

this.w._.show(e)
if(!__GP.greater){
	off(rv,'需要Moderator权限',1)
	off(rg,'需要Moderator权限',1)
	}
	
__NUKE.doRequest({
	u:{u:__API._base,
			a:{__lib:"add_point_v3",__act:"get_limit",fid:fid,raw:3}
			},
	f:function(d){
		if(d.data){
			var x = ''
			for(var k in d.data)
				x += d.data[k]+'</br>'
			if(!x.match(/本月加分额度剩余/)){
				off(rv,'需要版面有正式声望',1)
				off(rg,'需要版面有正式声望',1)
				}
			n.innerHTML = x
			}
		}
	})

}
//fe


adminui.new_post = function ()
{
	if(!__CURRENT_FID)
		return
this.createadminwindow()
this.w._.addContent(null)
var $ = _$, x,y
this.w._.addTitle('当前版批量主题');

this.w._.addContent(
	$('/span')._.add(
		'每行一个 主题\\t内容 返回结果显示在控制台',
		$('/br'),
		y = $('/textarea').$0('name','info','rows','5','cols','40'),
		$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
console.log('go')
				x = y.value.split("\n")
				for(var i=0;i<x.length;i++){
					if(x[i]){
						x[i]=x[i].split("\t")
						x[i][0]=x[i][0].replace(/^\s+|\s+$/g,'')
						x[i][1]=x[i][1].replace(/^\s+|\s+$/g,'')
						}
					else
						x[i]=[]
					}
				var al = window.alert
				window.alert=function(x){console.log(x)}
				var to = function(){
							var y = x.shift()
							if(y){
								if(y[0] && y[1]){
									console.log(y[0]+'\t'+y[1])
									commonui.newPost(
										{_nojump:1},
										postfunc.__NEW,//操作
										__CURRENT_F_BIT,//版面bit type
										__CURRENT_FID,//版面id
										null,//主题id
										null,//回复id
										null,//o_setTopic
										y[0],//标题
										y[1],//内容
										0,//隐藏帖子 仅版主可见
										0,//只有作者和版主可回复
										null,//附件
										null,//附件校验
										null,//投票内容
										null,// 0投票 1投注铜币
										null,//每人最多可投 0不限
										null,//小时后结束
										null,//投注最大值
										null,//投注最小值
										null,//投票的声望限制
										null,
										null,
										null
										)
									}
								}
							if(x.length)
								setTimeout(to,1000*30)
							else{
								clearTimeout(to)
								window.alert=al
								console.log('all done')
								}
							}//
				setTimeout(to,1000*30)

				}
			)
		)
	)
this.w._.show()

}//fe



adminui.system_trade = function(e){
this.createadminwindow()
this.w._.addContent(null)
var $ = _$,n = 'give_n_take_8wyd',
ii=function(y,z){
return $('/input','name',n,'placeholder',y,'size',z)
},//fe
sl = function(x){
return $('/span',
	$('/select','name',n,
		$('/option').$0('value','','innerHTML','无'),
		$('/option').$0('value',2,'innerHTML','金钱'),
		$('/option').$0('value',1,'innerHTML','道具'),
		$('/option').$0('value',3,'innerHTML','声望'),
		$('/option').$0('value',4,'innerHTML','威望'),
		$('/option').$0('value',5,'innerHTML','其他'),
		'onchange',function(){
			this.nextSibling.innerHTML = ''
			switch(parseInt(this.value)){
				case 2:
					this.nextSibling._.add(
						ii('金币',5),
						ii('银币',5),
						ii('铜币',5),
						$('/a','innerHTML',' ? ','href','javascript:void(0)','target','_blank','onclick',
							function(e){
								alert('1金币=100银币 1银币=100铜币')
								})
						)
					break
				case 1:
					this.nextSibling._.add(
						ii('类别',5),
						ii('子类',5),
						ii('数量',5),
						$('/a','innerHTML',' ? ','href','javascript:void(0)','target','_blank','onclick',
							function(e){
								if(!this.previousSibling.value || !this.previousSibling.previousSibling.value)
									return commonui.cancelEvent(e)
								__NUKE.doRequest({
									u:{u:'/nuke.php?func=item&act=info&raw=3', a:{types:this.previousSibling.previousSibling.value+','+this.previousSibling.value}},
									f:function(r){
										if (!r || !r.data)
											return alert('NOT FOUND')
										alert(commonui._debug._d('',r.data[0]))
										}
									})
								})
						)
					break
				case 3:
					this.nextSibling._.add(
						ii('声望ID',11),
						ii('声望值',5),
						$('/a','innerHTML',' ? ','href','javascript:void(0)','target','_blank','onclick',
							function(e){
								if(!this.previousSibling.value)
									return commonui.cancelEvent(e)
								__NUKE.doRequest({
									u:{u:'/nuke.php?__lib=modify_reputation&__act=get_info&rid='+this.previousSibling.value+'&raw=3'},
									f:function(r){
										if (!r || !r.data)
											return alert('NOT FOUND')
										alert(r.data[0])
										}
									})
								})
						)
					break	
				case 4:
					this.nextSibling._.add(
						ii('威望值(显示值)',5)
						)
					break
				case 5:
					this.nextSibling._.add(
						ii('相关说明',11)
						)
					break	
				}
			}
		),
	$('/span')
	)
},//fe
dv = function(){
return 	$('/div')._.add(
	$('/input','name',n,'placeholder','用户UID','size',11),
	' \u00A0 收取',
	sl(),
	' \u00A0 发放',
	sl(1),
	' \u00A0 ',
	ii('项目相关主题ID',11),
	$('/a','innerHTML',' ? ','href','about:blank','target','_blank','onclick',
		function(e){
			if(!this.previousSibling.value)
				return commonui.cancelEvent(e)
			this.href='/read.php?tid='+this.previousSibling.value
			}),
	ii('项目文字说明',20),
	$('/br')
	)
}//fe


this.w._.addTitle('发放/收取');




this.w._.addContent(
	$('/span')._.add(
		dv(),
		$('/br'),
		$('/button').$0('innerHTML','增加一行','type','button','onclick',function(){
				this.parentNode.insertBefore(
					dv(),
					this.previousSibling
					)
				}
			),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				return
				__NUKE.doRequest({
					u:{u:__API._base,
							a:{__lib:"add_point_v",__act:"add",opt:opt,fid:fid,tid:tid,pid:pid,raw:3}
							},
					b:this
					})
				}
			),
		$('/br'),
		$('/br')
		)
	)
this.w._.show(e)


}//fe


/**
 * 置顶主题
 * @param {type} e
 * @param {type} tid
 * @returns {undefined}
 */
adminui.toptopic = function (e,tid)
{

this.createadminwindow()
this.w._.addContent(null)
var $ = _$, ff,tid = tid
this.w._.addTitle('主题置顶');

this.w._.addContent(
	ff = $('/form')._.add(
		$('/input','type','radio','name','level','value','0','onchange',function(){f[5].checked=true; f[8].checked=true;}),' 解除',
		$('/br'),
		$('/br'),
		$('/input','type','radio','name','level','value','9','onchange',function(){f[3].checked=true; f[6].checked=true;}),' 版面内直接显示',
		$('/br'),
		'将 主题内容 显示在版头',
		$('/br'),
		$('/br'),
		$('/input','type','radio','name','level','value','1','onchange',function(){f[3].checked=true; f[6].checked=true;}),' 普通置顶',
		$('/br'),
		'将主题的标题显示在版头下部',
		$('/br'),
		'最近一次普通置顶的主题会显示在版面第一页(且最后改动时间在一周内)',
		$('/br'),
		$('/br'),
		$('/input','type','radio','name','opt','value','1'),' 加入精华区',$('/br'),
		$('/input','type','radio','name','opt','value','2'),' 移出精华区',$('/br'),
		$('/input','type','radio','name','opt','value','16','checked',1),' 不改变',$('/br'),
		$('/br'),
		$('/input','type','radio','name','opt1','value','4'),' 增加推荐值',$('/br'),
		$('/input','type','radio','name','opt1','value','8'),' 移除推荐值',$('/br'),
		$('/input','type','radio','name','opt1','value','32','checked',1),' 不改变',$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				var level=0,opt=0
				for(var i=0;i<3;i++){
					if(f[i].checked)
						level= f[i].value
					}
				for(var i=3;i<9;i++){
					if(f[i].checked)
						opt |= f[i].value
					}
				__NUKE.doRequest({
					u:{u:__API._base,
						a:{__lib:"topic_top",__act:"set",level:level,tid:tid,opt:opt,raw:3}
						},
					b:this
					})
				}
			)
		)
	)
var f = ff.parentNode.getElementsByTagName('input')
this.w._.show(e)
}
//fe
/**
 * 置顶主题
 * @param {type} e
 * @param {type} tid
 * @returns {undefined}
 */
adminui.updateSrc = function ()
{

this.createadminwindow()
this.w._.addContent(null)
var $ = _$, x = $('/span')

var s = window.__SCRIPTS_DEBUGBAK ? __SCRIPTS_DEBUGBAK : __SCRIPTS
s['tmpcss'] = __STYLE[0][2];
for(var k in s){
	if(typeof s[k]=='string'){
		var m = s[k].match(/(\/js_[0-9a-zA-Z_]+\.js)\?(\d{7})$/)
		if(m)
			x._.add(
			  $('/input').$0('type','checkbox','value',m[2]),
				m[1].toString(),
				$('/br'))
		}
	}

this.w._.addTitle('杂项功能');

this.w._.addContent(
	x,
	$('/button','innerHTML','刷新资源地址','type','button','onclick',function(){
			var f = this.parentNode.getElementsByTagName('input'),set=''
			for(var i=0;i<f.length;i++){
				if(f[i].checked)
					set += f[i].value+'\t'+(1000000+Math.floor(Math.random()*8999999))+'\t'
				}
			__NUKE.doRequest({
				u:{u:__API._base,
						a:{__lib:"misc",__act:"update_src_in_tpl",set:set,raw:3}
						},
				b:this,
				f:function(d){alert((d.error && d.error[0] ? d.error[0] : d.data[0])+' 请刷新页面');location.reload()}
				})
			}
		),
	$('/br'),
	$('/br'),
	$('/hr'),
	$('/br'),
	$('/button','innerHTML','关闭web广告','type','button','onclick',function(){
			__NUKE.doRequest({
				u:{u:__API._base,
						a:{__lib:"misc",__act:"dsbase_off_in_tpl",off:1,raw:3}
						},
				b:this,
				f:function(d){alert((d.error && d.error[0] ? d.error[0] : d.data[0]))}
				})
			}
		),
	$('/button','innerHTML','开启web广告','type','button','onclick',function(){
			__NUKE.doRequest({
				u:{u:__API._base,
						a:{__lib:"misc",__act:"dsbase_off_in_tpl",off:2,raw:3}
						},
				b:this,
				f:function(d){alert((d.error && d.error[0] ? d.error[0] : d.data[0]))}
				})
			}
		),$('/br'),
	$('/button','innerHTML','关闭app广告','type','button','onclick',function(){
			__NUKE.doRequest({
				u:{u:__API._base,
						a:{__lib:"misc",__act:"dsbase_off_in_tpl",off:4,raw:3}
						},
				b:this,
				f:function(d){alert((d.error && d.error[0] ? d.error[0] : d.data[0]))}
				})
			}
		),
	$('/button','innerHTML','开启app广告','type','button','onclick',function(){
			__NUKE.doRequest({
				u:{u:__API._base,
						a:{__lib:"misc",__act:"dsbase_off_in_tpl",off:8,raw:3}
						},
				b:this,
				f:function(d){alert((d.error && d.error[0] ? d.error[0] : d.data[0]))}
				})
			}
		)
	)
this.w._.show()
	

}
//fe

/**
 * 标题颜色
 * @param {type} e
 * @param {type} tid
 * @returns {undefined}
 */
adminui.colortopic = function (e,tid)
{
this.createadminwindow()
this.w._.addContent(null)
var $ = _$,tid = tid,ff
this.w._.addTitle('改变标题字体');

this.w._.addContent(
	ff = $('/div')._.add(
		$('/input','type','checkbox','name','fontB','value','B'),' 粗体',
		$('/br'),
		$('/input','type','checkbox','name','fontI','value','I'),' 斜体',
		$('/br'),
		$('/input','type','checkbox','name','fontU','value','U'),' 划线',
		$('/br'),$('/br'),
		$('/input','type','radio','name','color','value','red'),$('/span','class','red','innerHTML',' 红色'),
		$('/br'),
		$('/input','type','radio','name','color','value','blue'),$('/span','class','blue','innerHTML',' 蓝色'),
		$('/br'),
		$('/input','type','radio','name','color','value','green'),$('/span','class','green','innerHTML',' 绿色'),
		$('/br'),
		$('/input','type','radio','name','color','value','orange'),$('/span','class','orange','innerHTML',' 橙色'),
		$('/br'),
		$('/input','type','radio','name','color','value','silver'),$('/span','class','silver','innerHTML',' 银色'),
		$('/br'),
		$('/input','type','radio','name','color','value',''),' 无',
		$('/br'),
		$('/br'),		
		$('/input','type','radio','name','opt','value','1'),' 加入精华区',$('/br'),
		$('/input','type','radio','name','opt','value','2'),' 移出精华区',$('/br'),
		$('/input','type','radio','name','opt','value','16','checked',1),' 不改变',$('/br'),
		$('/br'),
		$('/input','type','radio','name','opt1','value','4'),' 增加推荐值',$('/br'),
		$('/input','type','radio','name','opt1','value','8'),' 移除推荐值',$('/br'),
		$('/input','type','radio','name','opt1','value','32','checked',1),' 不改变',$('/br'),
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				var set='',opt=0
				for(var i=0;i<8;i++){
					if(f[i].checked)
						set+=','+f[i].value
					}
				for(var i=9;i<15;i++){
					if(f[i].checked)
						opt|=f[i].value
					}
				__NUKE.doRequest({
					u:{u:__API._base,
						a:{__lib:"topic_color",__act:"set",tid:tid,font:set,opt:opt,raw:3}
						},
					b:this
					})
				}
			)
		)
	)
var f = ff.getElementsByTagName('input')

for(var i=0;i<8;i++)
	f[i].onchange=function(){
		for(var i=0;i<8;i++){
			if(f[i].checked && window.__CURRENT_FID!=10){
				f[9].checked=1
				f[12].checked=1
				return
		}}
		f[10].checked=1
		f[13].checked=1
		}

this.w._.show(e)

}
//fe


/**
 * 设置声望级别
 * @param {type} e
 * @param {type} fid
 * @returns {undefined}
 */
adminui.reputationLevel = function (e,fid)
{
this.createadminwindow()
this.w._.addContent(null)
var $ = _$, level;
this.w._.addTitle('声望级别');
this.w._.addContent(
	'用户根据声望不同显示为不同的等级',
	$('/br'),
	'依次填入等级名称和此等级所需的声望下限(用户声望在-21000~21000之间)',
	$('/br'),
	'等级名最长16 byte(8个汉字) 宽度超过4个汉字可能在较小的显示器上无法完全显示',
	$('/br'),
	'每行一个 总数不能超过30个 修改后可能不会马上生效(缓存)',
	$('/br'),
	'例如:',
	$('/br'),
	$('/span').$0('className','gray')._.add(
		'渣滓 -21000',
		$('/br'),
		'废柴 0',
		$('/br'),
		'强者 10000',
		$('/br'),
		'逆天强者 20000'
		),
	$('/br'),
	'意为 声望-21000~-1为渣滓 0~9999为废柴 10000~19999为强者 20000以上为逆天强者',
	$('/br'),
	$('/br'),
	level = $('/textarea').$0('name','level','rows','10','cols','30'),
	$('/br'),
	$('/button').$0('innerHTML','确定','type','button','onclick',function(){
			var t = level.value.replace(/^\s+|\s+$/,'')
			__NUKE.doRequest({
				u:__API.reputationLevelSet(fid,t),
				b:this
				})
			}
		)

	)
__NUKE.doRequest({
	u:__API.reputationLevel(fid),
	f:function(d){
		if(d.error)
			return alert(d.error[0])
		if(d.data && d.data[0]){
			var x = d.data[0].substr(0,1)
			if(x=='[' || x=='{'){
				eval('var x='+d.data[0])
				var y=''
				for (var i=0;i<x.length;i++)
					y+=x[i].n+' '+x[i].r+"\n"
				level.value=y
				}
			}

		}//fe
	})
this.w._.show(e)
}
//fe


/**
 * 精华主题
 * @param {type} e
 * @param {type} tid
 * @returns {undefined}
 */
adminui.digesttopic = function (e,tid){
return this.colortopic(e,tid)
}
//fe


/**
 * 删除/移动/镜像
 * @param {type} e
 * @param {type} tid
 * @param {type} op
 * @returns {undefined}
 */
adminui.movetopic = function (e,tid,tf,op)
{
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('删除/移动/镜像 '+(tid?'':'选中的')+'主题');

var self = this,$ = _$, fid='', stid='', info,infoss,tff, pm, de, sl, am, aq, an, af, ad, ao, ap, cl = function(e,h){
	if(h.stid){
		fid=''
		stid = h.stid
		sl.innerHTML = '到 > '+h.name+'('+h.stid+')'
		}
	else if(h.fid){
		stid = ''
		fid = h.fid
		sl.innerHTML = '到 > '+h.name+'('+h.fid+')'
		}
	commonui.adminwindow._.hide(e)
	commonui.cancelEvent(e)
	return false
	},
icl = function(f,s){
	if(f){
		stid=''
		fid = f
		sl.innerHTML = '到 > FID:'+f
		}
	else if(s){
		fid=''
		stid=s
		sl.innerHTML = '到 > STID:'+s
		}
	},
oc = function(){
	if(this.checked){
		if(this.value=='ad' || this.value=='ao')
			sl.disabled=1
		else
			sl.disabled=0
		}
	}

this.w._.addContent(
	$('/span')._.add(
		de = $('/select').$0($('/option').$0('value','','innerHTML','立刻'),$('/option').$0('value',30,'innerHTML','30秒后')),
		$('/br'),$('/br'),
		am = $('/input').$0('type','radio','name','action','onchange',oc),'移动 ',
		ab = $('/input').$0('type','radio','name','action','onchange',oc),'移动(不提前) ',
		ad = $('/input').$0('type','radio','name','action','value','ad','onchange',oc),'删除 ',
		$('/br'),
		ao = $('/input').$0('type','radio','name','action','value','ao','onchange',oc),'移出合集 ',
		ap = $('/input').$0('type','radio','name','action','value','ap','onchange',oc),'合集所有子主题移出到 ',
		$('/br'),
		aq = $('/input').$0('type','radio','name','action','title','在另一版面新建镜像主题 与本主题保持同步','onchange',oc),'镜像 ',
		af = $('/input').$0('type','radio','name','action','title','将主题移动到另一版面 在本版新建镜像','onchange',oc),'反向镜像',
		an = $('/input').$0('type','radio','name','action','title','在另一版面新建镜像主题 不与本主题保持同步','onchange',oc),'镜像(不同步) ',
		$('/br'),$('/br'),
		sl = $('/button').$0('innerHTML','到...','onclick',function(e){
			var c = commonui,hs
			c.createadminwindow()
			c.adminwindow._.addContent(null)
			c.adminwindow._.addContent(
				$('/input').$0('value','版面ID','name','no','maxlength','20','onfocus',function(){if(!this.name)return;this.name='',this.value=''},'onchange',function(){icl(this.value);c.adminwindow._.hide()}),$('/br'),
				$('/input').$0('value','或主题集合ID','name','no','maxlength','20','onfocus',function(){if(!this.name)return;this.name='',this.value=''},'onchange',function(){icl(0,this.value);c.adminwindow._.hide()}),$('/br'),hs=$('/span')
				)
			c.adminwindow._.show(e)
			c.genHisLink(hs,cl) 
			}),
		//$('/br'),$('/br'),
		//$('/input').$0('type','checkbox','name','tag'),t(' 在原版保留一个链接'),
		$('/br'),$('/br'),
		info = $('/input').$0('placeholder','操作说明','value',commonui.lessernuke['info_'+tid+'_0']?commonui.lessernuke['info_'+tid+'_0']:'','maxlength','20','onchange',function(){if(this.value)pm.checked='checked'}),
		tf ? $('/span')._.add(
			$('/br'),
			infoss = $('/select').$0($('/option').$0('innerHTML','预设说明','style',{color:'silver'}), 'onchange',function(){if(this.selectedIndex)this.parentNode.previousSibling.value+=' '+this.options[this.selectedIndex].innerHTML;pm.checked='checked'}),
			$('/button').$0('innerHTML','编辑','type','button','onclick',function(e){commonui.editRule(e,tf)})
			) :null,
		$('/br'),$('/br'),
		pm = $('/input').$0('type','checkbox'),' 同时将说明发送给用户',
		$('/br'),$('/br'),
		$('/button').$0('innerHTML','确定','type','button','onclick',function(){
				var op = ''
				if(ad.checked)
					op = 1
				else if(ao.checked)
					op = 2
				else if(aq.checked)
					op = 4
				else if(af.checked)
					op = 8
				else if(an.checked)
					op = 4|4096
				else if(ab.checked)
					op = 2048
				else if(ap.checked){
					if(!confirm("你确定要将合集内的所有主题移走吗"))
						return
					op = 16
					}
				var iv = info.value.replace(/^\s+|\s+$/g,'')
				if(ad.checked && !iv)
					return alert("需要操作说明")
				
				if(!tid){
					var tids = commonui.massAdmin.getChecked()
					if(!tids)return
					}
					
				__NUKE.doRequest({
					u:__API.topicMove2(
						tid ? tid : tids, 
						fid, 
						pm.checked ? 1 : '', 
						iv, 
						op|16384|32768|65536, 
						de.value, stid
						),
					b:this
					})
				}
			)
		)
	)
		
for (var i=0.5;i<24;i+=0.5)
	de.$0($('/option').$0('value',i*3600,'innerHTML',i+"小时后"))

if(op==1)
	ad.checked=1, sl.disabled=1
else if(op==2)
	aq.checked=1
else
	am.checked=1

this.w._.show(e)

	
if(tf)
	__NUKE.doRequest({
		u:{u:'/nuke.php?__lib=modify_forum&__act=get_rule&raw=3',a:{fid:tf,ffid:((tff=location.search.match(/_ff=(\d+)/))?tff[1]:'')}},
		f:function(d){
			var e = __NUKE.doRequestIfErr(d)
			if(e)
				return
			var x = d.data[0].replace(/^\s+|\s+$/g,'').split("\n")
			for(var i=0;i<x.length;i++){
				infoss._.add(
					$('/option').$0('innerHTML',x[i])
					)
				}
			}
		})
}
//fe

adminui._info = {}
/**

 */
adminui.setAutoDel = function(e){
var y,z
this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent(

	_$('/button')._.attr({innerHTML:'同步auto_del_match和new_post_ip_filter',type:'button'})._.on('click',function(){
			__NUKE.doRequest({
				u:{u:__API._base+'__lib=nuke&__act=set_auto_del&raw=3',
					a:{fid:'',match:''}
					},
				b:this
				})
			}
		)
	)
this.w._.show(e)
}//fe

/**
 * 设置新用户发帖限制
 * @param {type} e
 * @param {type} fid
 * @returns {undefined}
 */
adminui.setNewUserPostLimit = function(e,fid){
var y
this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent(
	"新注册用户在注册",
	y = _$('/select').$0(
		_$('/option').$0('value','','innerHTML','全局默认'),
		_$('/option').$0('value','48','innerHTML','48小时'),
		_$('/option').$0('value','24','innerHTML','24小时'),
		_$('/option').$0('value','12','innerHTML','12小时'),
		_$('/option').$0('value','6','innerHTML','6小时'),
		_$('/option').$0('value','1','innerHTML','1小时'),
		_$('/option').$0('value','0.01','innerHTML','半分钟')
		),
	"后可以在本版发帖",
	_$('/br'),
	_$('/button')._.attr({innerHTML:'确定',type:'button'})._.on('click',function(){
			var x = y.options[y.selectedIndex].value
			__NUKE.doRequest({
				u:{u:__API._base+'__lib=modify_forum&__act=set_post_limit&raw=3',
					a:{hour:x,fid:fid}
					},
				b:this,
				f:function(d){
					if(d.error)
						return alert(d.error[0])
					alert(d.data[0])
					}
				})
			}
		)
	)
this.w._.show(e)
}//fe



/**
 * nuke UI
 * @param {type} e
 * @param {type} uid
 * @param {type} tid
 * @param {type} pid
 * @returns {undefined}
 */
adminui.nukeUi = function(e,uid,tid,pid,ffid){
var _MODE_NUKE =1 //nuke to -1
,_MODE_UNACTIVE = 2 //nuke to 0
, _MODE_LOCK = 4//nuke to -2
,  _MODE_MUTE = 8 //禁言
,  _MODE_DELPOST = 16 //删帖
,  _MODE_ANONC = 32 //发帖公告
, _MODE_LOCK_3 = 32768
, _MODE_LOCK_4 = 65536
, _MODE_LOCK_5 = 131072
,$ = _$
,a = function(x,target,count,opt){

	var o = $('/span'),t = target
	if(!opt)
		opt = 0
	if(opt & 1)
		var name = 'ckname'+Math.random()
	for(var i = 0;i<x.length;i++){
		if(!x[i])
			continue
		x[i] = x[i].split('|')
		if(!x[i][1])
			x[i][1]=''
		if(i!=0)
			o._.add(i%count ? ' ' : $('/br'))
		if(opt&1)
			o._.add(
				$('/input').$0('type','radio','name',name,'checked',x[i][2]?1:0,'onclick',function(){t.value=this.title;t.name=''},'title',x[i][1]),
				$('/span').$0('innerHTML',x[i][0])
				)
		else
			o._.add(
				$('/a').$0('href','javascript:void(0)','innerHTML',x[i][0],'onclick',function(){t.value=this.title?this.title:this.innerHTML;t.name=''},'title',x[i][1])
				)
		}
	return o
	}
,info,infos,isl,isls,range,type,ip={},ip1={},ip2={},ip3={},mute,anonc,mass
this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent($('/span')._.add(

$('/span')._.add(
	'UID 换行 空格 逗号分隔',$('/br'),
	mass = $('/textarea').$0('value',uid,'disabled',__GP.admin?0:1),$('/br'),$('/br')
	),

info = $('/input','placeholder','操作记录中的说明','size',20), isls=$('/select',$('/option','innerHTML','预设说明','style',{color:'silver'}), 'onchange',function(){if(this.selectedIndex)this.previousSibling.value+=' '+this.value}), $('/button','innerHTML','编辑','type','button','onclick',function(e){commonui.editRule(e,11)}), $('/br'),
//infos = $('/input','placeholder','操作说明(发送给用户)','value','','maxlength',20), isl=$('/select',$('/option','innerHTML','预设说明','style',{color:'silver'}), 'onchange',function(){if(this.selectedIndex)this.previousSibling.value+=' '+this.value}), $('/br'),
$('/br'),		
'此时间后发布的主题与回复将被删除(回复最多删除200条)',range = $('/input').$0('value','24','type','hidden'),$('/br'),
a(['不删除|0','1小时前|1','3小时前|3','6小时前|6','12小时前|12','24小时前|24|1','72小时前|72','1周前|168',(__GP.admin ? '删除1000条|1000' : null)],range,3,1),$('/br'),
$('/br'),

'NUKE种类',type = $('/input').$0('value',_MODE_NUKE,'type','hidden'),$('/br'),
a(['普通NUKE|'+_MODE_NUKE+'|1',
	'锁定账号(被盗/广告/只能人工解锁)|'+_MODE_LOCK,
	'无操作|0',
	'锁定账号(被盗/邮箱重置密码可解锁)|'+_MODE_LOCK_3,
	'取消激活|'+_MODE_UNACTIVE,
//	'禁言1000天|'+_MODE_MUTE,
	'无操作|0',
	'锁定账号(可能被盗/修改密码可解锁)|'+_MODE_LOCK_4,
	'无操作|0',
	'无操作|0',
	'锁定账号(机器人/广告专用账号/不能解锁)|'+_MODE_LOCK_5],type,3,1),$('/br'),
$('/br'),
	
mute = $('/input').$0('type','checkbox','checked',1),'附带禁言30天',$('/br'),
//anonc = $('/input').$0('type','checkbox'),'发贴公告',$('/br'),
$('/br'),

$('/button').$0('innerHTML','NUKE','onclick',function(){
	var m = 0,limit=''
	if(info.name=='x')
		info.value=''
	if(range.value==1000){
		limit = 1000
		range.value=''
		}
	if(type.value)
		m |= __NUKE.toInt(type.value)
	if(ip1.value)
		m |= __NUKE.toInt(ip1.value)
	if(ip2.value)
		m |= __NUKE.toInt(ip2.value)
	if(ip3.value)
		m |= __NUKE.toInt(ip3.value)
	if(mute.checked)
		m |= _MODE_MUTE
	//if(anonc.checked)
	//	m |= _MODE_ANONC
	//console.log([uid,tid,pid,info.value,'',range.value,limit,m,ip.value])

	var nr = mass.value.match(/-?\d+/g)
	adminui.nukeQueueRet=''
	if(!nr)return
	adminui.nukeQueue = nr
	adminui.nukeArg = [0,tid,pid,info.value,'',range.value,limit,m,ip.value?ip.value:'']//,infos.value]
	var nu = function(){
		var uu = adminui.nukeQueue.shift();
		if(!parseInt(uu,10))
			return alert(adminui.nukeQueueRet)
		var a = adminui.nukeArg
		__NUKE.doRequest({
			u:__API.nuke(
				uu,
				a[1],
				a[2],
				a[3],
				a[4],
				a[5],
				a[6],
				a[7],
				a[8],
				a[9]
				),
			b:this,
			f:function(d){//如有.error则显示.error 否则显示.data
				if(!d)
					return
				var x,y='';
				if(d.error)
					x= d.error
				else if(d.data)
					x=d.data
				if(!x)
					x={0:'ERROR NO DATA'}
				if(typeof x=='string')
					y=x
				else{
					for(var k in x)
						y+=x[k]+'\n'
					}
				adminui.nukeQueueRet+='uid:'+uu+' '+y+'\n'
				window.setTimeout(nu,100)
				return true
				}
			})
		}//fe
	nu()
		
	//else{
	//	__NUKE.doRequest({
	//		u:__API.nuke(uid,tid,pid,info.value,'',range.value,limit,m,ip.value?ip.value:''),
	//		b:this
	//		})
	//	}
	}),
/*
(uid && (__GP.userBit & 1024) ? $('/span')._.add(
	$('/br'),
	$('/br'),
	$('/button').$0('innerHTML','解除锁定','onclick',function(){
		__NUKE.doRequest({
			u:{u:__API._base+'__lib=nuke&__act=reactive&raw=3',
				a:{uid:uid,clear:(0 | (this.nextSibling.checked?1:0) | (this.nextSibling.nextSibling.nextSibling.checked?2:0))}
				},
			b:this
			})
		}), 
	$('/input').$0('type','checkbox'),
	$('/span')._.add('金钱清0 '),
	$('/input').$0('type','checkbox'),
	'威望清0'
	) : ''),*/
(uid && (__GP.userBit & 1024) ? $('/span')._.add(
	$('/br'),
	$('/br'),
	$('/button').$0('innerHTML','发送建议修改密码的PM','onclick',function(){
		__NUKE.doRequest({
			u:{u:__API._base+'__lib=nuke&__act=send_pm&raw=3',
				a:{uid:uid}
				},
			b:this
			})
		})
	) : '')
))//add

__NUKE.doRequest({
	u:{u:'/nuke.php?__lib=modify_forum&__act=get_rule&raw=3',a:{fid:11,ffid:ffid?ffid:''}},
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return
		var x = d.data[0].replace(/^\s+|\s+$/g,'').split("\n")
		for(var i=0;i<x.length;i++){
			//isl._.add($('/option','innerHTML',x[i]))
			isls._.add($('/option','innerHTML',x[i]))
			}
		}
	})

this.w._.show(e)

}
//fe


adminui.remarkUi = function(e,uid){
var $ = _$,ma,re,op
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('添加备注')
this.w._.addContent($('/span')._.add(
	'备注身份或事迹的描述性信息供其他版主参考',$('/br'),
	'禁止添加无用信息',$('/br'),
	'添加备注在缓存过期后生效',$('/br'),
	__GP['super'] ? [ma = $('/textarea','placeholder',uid,'onclick',function(){this.placeholder='可填入多个uid 换行 空格 逗号分隔'}),$('/br')]:null,
	re = $('/input','placeholder','备注信息','size',20),$('/br'),
	__GP.admin ? [op = $('/input','type','checkbox'),'所有用户可见',$('/br')]: null,
	$('/button','innerHTML','提交','onclick',function(){
		var uids=[],v = re.value, w = ''
		v.replace(/(?:&|\?)(tid|pid)=(\d+)/g,function($0,$1,$2){w+='['+$1+']'+$2+'[/'+$1+']';return $0})
		if(w)v=w
		if(!v)
			return
		if(v.match(/\.(jpg|jpeg|gif|png)$/))
			return alert('仅限文字 ')
		if(ma.value)
			ma.value.replace(/\d+/g,function($0){uids.push($0);return $0})
		else
			uids = [uid]
		var ret='',nu = function(){
			var uu = uids.shift();
			if(uu){
				__NUKE.doRequest({
					u:__API.remarkAdd(uu,v,op.checked?1:0),
					b:this,
					f:function(d){
						var y = d?(d.error?d.error[0]:(d.data?d.data[0]:'')):''
						ret+='UID'+uu+' '+y+'\n'
						window.setTimeout(nu,100)
						return true
						}
					})
				}
			else
				alert(ret)
			}
		nu()
		})
	))


this.w._.show(e)

}
//fe


/**
 * 服务器接口测试
 * @param {type} e
 * @returns {undefined}
 */
adminui.serverDebug = function(e){


var libs,acts,query,$=_$

this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent(
	$('/span')._.add(
		query = $('/textarea'),
		$('/br'),
		$('/button').$0('innerHTML','POST','onclick',function(){
			var q = query.value.replace(/\n/g,' ').replace(/^\s+|\s+$/g,'')
			if(q==='')
				return
			__NUKE.doRequest({
				u:{u:__API._base+q,
					a:{raw:3}
					},
				b:this,
				f:function(d){console.log(d)}
				})
			}),
		' 换行会替换为空格',
		$('/br'),
		$('/table')._.add(
			$('/tr')._.add(
				libs=$('/td').$0('style',{height:'20em',overflow:'scroll',verticalAlign:'top'}),
				acts=$('/td').$0('style',{height:'20em',overflow:'scroll',verticalAlign:'top'})
				)
			)
		)
	)
this.w._.show(e)

__NUKE.doRequest({
	u:__API._base+'__lib=temp&__act=list_lib&raw=1',
	f:function(d){//如有.error则显示.error 否则显示.data

		if(!d)
			return

		if(d.error)
			return alert(d.error[0])

		try{
			var x=d.data[0]
		}catch(e){
			return alert('ERROR NO DATA')
			}
		
		for(var i in x){

			libs._.add(
				$('/a').$0('href','javascript:void(0)','innerHTML',x[i],'onclick',function(){
					var lib = this.innerHTML
					acts.innerHTML='';
					__NUKE.doRequest({
						u:__API._base+'__lib=temp&__act=list_lib&lib='+lib+'&raw=1',
						f:function(d){//如有.error则显示.error 否则显示.data
							if(!d)
								return

							if(d.error[0])
								return alert(d.error[0])

							try{
								var y=d.data[0]
							}catch(e){
								return alert('ERROR NO DATA')
								}

							for(var j in y){

								acts._.add(
									$('/a').$0('href','javascript:void(0)','innerHTML',y[j],'onclick',function(){
										query.value='__lib='+lib+'&__act='+this.innerHTML+'&'
										}),
									$('/br')
									)
								}

							return true
							}
						})

					}),//a
				$('/br')
				)//libs add

			}//for
		
		return true
		}
	})


}//fe


adminui.setSets = function(e,fid){
	return this.setSubSets(e,fid)
	/*
if(!fid)fid=0;

var $=_$,w = $('/span'),f,s
this.createadminwindow()
this.w._.addTitle('子版面列表设置')
this.w._.addContent(null)
this.w._.addContent(w)

__NUKE.doRequest({
	u:__API._base+'__lib=modify_forum&__act=get_sub_list&raw=1&fid='+fid,
	f:function(d){//如有.error则显示.error 否则显示.data

		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		var d =  d.data,x={}

		d[1] = d[1] ? (d[1]+'').replace(/(?:^|\n)(\d+)\s+(.+)/g,function($0,$1,$2){x[$1]=$2;return $0}) : ''
		d[0] = d[0] ? (d[0]+'').replace(/[^\d]?(\d+)[^\d]?/g,function($0,$1){return $1+' '+x[$1]+'\n'}) : ''
		//w._.add($('/textarea').$0('disabled','1','value',d[1],'style','width:22em;height:7em'),$('/br'),$('/br'))
		w._.add(s = $('/textarea').$0('value',d[0],'style','width:22em;height:7em'),$('/br'),$('/br'))
		w._.add('填入合集主题的tid',$('/br'),'或镜像到合集或其他版面的镜像主题tid',$('/br'),'每行一个 将按顺序显示在子版面列表中')
		
		w._.add(	$('/br'),	$('/br'),  $('/button').$0('innerHTML','提交','onclick',function(){
				var y = s.value.match(/(?:^|\n)\d+/g)
				y = y ? y.join(' ') : ''
				__NUKE.doRequest({
					u:{u:__API._base+'__lib=modify_forum&__act=set_sub_list&raw=3&fid='+fid,
						a:{tids:y}
						},
					b:this
					})
				})	)
		
		return true
		}
	})
this.w._.show(e)
*/
}//fe


adminui.setSubSets = function(e,fid){
	
if(!fid)fid=0;

var $=_$,w = $('/span'),tb,su=__GP['super']&&__GP.ubStaff,newnod = function(id,opt,name){
return $('/tr',
	$('/td', $('/input','value',id,'placeholder','版面id/合集或版面镜像id'), $('/input','type','hidden','value','\t')),//id
	$('/td')._.add( $('/input','type','checkbox','value','t','checked',opt.indexOf('t')!=-1?'checked':''),'是合集/版面镜像 '),//if set/quoteforum
	$('/td')._.add( $('/input','type','checkbox','value','s','checked',opt.indexOf('s')!=-1?'checked':''),'子版面 '),//display as sub
	$('/td')._.add( $('/input','type','checkbox','value','q','checked',opt.indexOf('q')!=-1?'checked':'','onchange',function(){if(this.checked)this.parentNode.nextSibling.firstChild.checked=''}),'附加显示主题 '),//display as quote
	$('/td')._.add( $('/input','type','checkbox','value','u','checked',opt.indexOf('u')!=-1?'checked':'','disabled',su?'':'1','onchange',function(){if(this.checked)this.parentNode.previousSibling.firstChild.checked=''}),'合并显示主题 '),//display as union
	$('/td')._.add( $('/input','type','hidden','value','\t'), $('/button','innerHTML','添加','onclick',function(){tb.insertBefore(newnod('','',''),this.parentNode.parentNode.nextSibling)}), $('/button','innerHTML','删除','onclick',function(){this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)}), $('/b')._.add(name))//id
	)
}//

this.createadminwindow()
this.w._.addTitle('子版面列表设置')
this.w._.addContent(null)
this.w._.addContent(w)

__NUKE.doRequest({
	u:__API._base+'__lib=modify_forum&__act=get_sub_list_v2&raw=1&fid='+fid,
	f:function(d){//如有.error则显示.error 否则显示.data

		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		var d =  d.data
		tb = $('/table')

		if(d[0]){
			var y = d[0].split(/[\t\n]/)
			console.log(y)
			for(var i=0;i<y.length;i+=3){
				tb._.add(
					newnod(y[i],y[i+1],y[i+2])
					)
				}
			}
		w._.add(tb, $('/br'), $('/button','innerHTML','添加一个','onclick',function(){tb._.add(newnod('','',''))}) )

		w._.add(	$('/br'),	$('/br'),  $('/button').$0('innerHTML','提交','onclick',function(){
				var x='',y = tb.getElementsByTagName('input')
				for(var i=0;i<y.length;i++){
					if(y[i].type=='checkbox'){
						if(y[i].checked)
							x+=y[i].value
						}
					else{
						x+=y[i].value
						}
					}
				__NUKE.doRequest({
					u:{u:__API._base+'__lib=modify_forum&__act=set_sub_list_v2&raw=3&fid='+fid,
						a:{ids:x}
						},
					b:this
					})
				})	)
		return true
		}
	})
this.w._.show(e)

}//fe
/**
延时关键字检查
 */
adminui.setFilter = function(e,fid,opt){

if(!fid)fid=0;
if(!opt)opt=1;

__NUKE.doRequest({
	u:__API._base+'__lib=filter&__act=get&opt='+opt+'&raw=1&fid='+fid,
	f:function(d){//如有.error则显示.error 否则显示.data

		if(!d)
			return

		if(d.error)
			return alert(d.error[0])

		if(!d.data[1])
			return
		
		var y = d.data[1];
		window.setTimeout(function(){
			eval("adminui.setFilter = "+y)
			adminui.setFilter(null,fid,opt)
			})
		return true
		}
	})

}//fe

/**
全局关键字检查
 */
adminui.setFilterG = function(){

__NUKE.doRequest({
	u:__API._base+'__lib=filter&__act=get_perpost&raw=1',
	f:function(d){//如有.error则显示.error 否则显示.data

		if(!d)
			return

		if(d.error)
			return alert(d.error[0])

		if(!d.data[1])
			return
		
		var y = d.data[1];
		window.setTimeout(function(){
			eval("adminui.setFilterG = "+y)
			adminui.setFilterG()
			})
		return true
		}
	})

}//fe

/**
 * 关键词合并
 */
adminui.setFilterCombine = function(){
var cb = function(x){
	var y=x.split(/\s+/),z=''
	for(var i=0;i<y.length;i++){
		if(y[i].length){
			for(var j=0;j<y.length;j++){
				if(i!=j && y[j]!==false && y[j].length && y[j].indexOf(y[i])>-1)
					y[j]=false
				}
			}
		else
			y[i]=false
		}
		
	for(var i=0;i<y.length;i++){
		if(y[i]!==false)
			z+= ' '+y[i]
		}
	return z
	}
,data

var w = commonui.createadminwindow()
w._.addTitle('关键词合并工具')
w._.addContent(null)
w._.addContent(_$('/span')._.add(
	data = _$('/textarea','style','width:30em;height:20em;'),
	_$('/button','innerHTML','合并','onclick',function(){
		var wk = data.value
		data.value = 'wait ...'
		setTimeout(function(){data.value = cb(wk)})
		})
	))
w._.show()
}//

/**
 * 
 * @param {type} e
 * @param {type} fid
 * @returns {undefined}
 */
adminui.setHint = function(e,fid){
if(!fid && !__GP.ubStaff)
	return
var data,$=_$
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('发帖提示')
this.w._.addContent(
	$('/span')._.add(
		'依照',
		$('/span','className','ubbcode',
			$('/div','className','quote')._.add(
				'关键词 关键词 关键词 ...',
				$('/br'),
				'包含以上关键词时的提示',
				$('/br'),
				'关键词 关键词 ...',
				$('/br'),
				'提示',
				$('/br'),
				'...'
				)
			),
		'的格式填入 将会在发帖时检查',
		$('/br'),
		'提交后一个月内有效',
		$('/br'),
		'不要使用过短的词或单字(如 SB) 易造成误匹配',
		$('/br'),
		'关键词可以使用正则匹配 请咨询程序员',
		$('/br'),
		'过多的关键词或不合适的正则匹配会造成浏览器卡顿',
		$('/br'),
		'注意此提示无访问限制 任何人皆可见',
		$('/br'),
		data = $('/textarea','style','width:30em;height:20em;'),
		$('/br'),$('/span'),$('/br'),
		$('/button').$0('innerHTML','提交','onclick',function(){
			var k = data.value.replace(/^\s+|\s+$/g,'')
			//if(k==='')
			//	return
			__NUKE.doRequest({
				u:{u:__API._base+'__lib=log_post&__act=set_post_hint&fid='+fid,
					a:{data:k,raw:3}
					},
				b:this
				})
			})
		)
	)
__NUKE.doRequest({
	u:__API._base+'__lib=log_post&__act=get_post_hint&raw=1&fid='+fid,
	b:this,
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		data.value = (''+d.data[0]).replace(/^\s*(\d+)\s*/,function($0,$1){
			data.nextSibling.nextSibling.innerHTML = commonui.time2date($1,'Y-m-d H:i:s')+'前有效'
			return ''
			})
		}
	})
this.w._.show(e)
}//fe

 /**
  * 管理密码
  * @param {type} e
  * @returns {unresolved}
  */
commonui.adminPassInput = function (e){
if(!window.__CURRENT_UID || !window.__NOW)
	return alert('需要先登陆')
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addContent(
	'某些功能在设置正确的密码后方可使用(有效期1.5天左右) 不同域名需要设置多次 ip变动需要设置多次',
	_$('/br'),
	_$('/input','type','password','size',20),
	_$('/button')._.attr({innerHTML:'确定',type:'button'})._.on('click',function(){
			var p = this.previousSibling.value.replace(/^\s*|\s*$/g,''), o = this
			loader.script(window.__SCRIPTS.md5,function(){
				__NUKE.doRequest({
					u:window.__API.admin_code(),
					b:o,
					f:function(d){
						var e = __NUKE.doRequestIfErr(d)
						if(e)
							return alert(e)
						d = d.data[0]
						if(!d || !d[0] || !d[1] || !d[2]  || !d[3] )
							return alert('error')
						__NUKE.doRequest({
							u:d[3].replace('_REPLACE_COOKIE_HERE_', hex_md5(p+'_j67h8i'+__CURRENT_UID+''+d[1]+''+Math.floor(d[0]/d[2])) ),
							b:this,
							f:function(d){
								var e = __NUKE.doRequestIfErr(d)
								if(e)
									return alert(e)
								alert(d.data[0])
								}
							})//request2
						}
					})//request

				});//load md5

			}
		)
	)
this.adminwindow._.show(e)
}//fe


/**

  */
adminui.keywordStat = function (e,fid){
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('关键词提取统计(每周')
this.w._.show()
var y,$=_$,z=function(){return $('/td','style','padding:0 0.5em')}
__NUKE.doRequest({
	u:{u:__API._base,a:{__lib:'admin_stat',__act:'thread_keyword_stat',raw:3,act:4,fid:fid}},
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		x=$('/table',
			$('/tr',
				z(),
				z()._.add('出现次数'),
				z()._.add('统计时间')
				)
			)
		for(var k in d.data[0]){
			y = d.data[0][k]
			x._.add(
				$('/tr',
					z()._.add(y[1]),
					z()._.add(y[2]),
					z()._.add(commonui.time2date(y[3]*86400,'Y-m-d'))
					)
				)
			}
		adminui.w._.addContent(x)
		}
	})
}//fe

adminui.quoteForum = function(e,fid){
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('版面镜像到主题')
var $ = _$, x=$('/table').$0('className','forumbox') ,y,z,h
this.w._.addContent(
	z=$('/span'),
	y=$('/input','placeholder','主题ID'),
	$('/br'),
	h=$('/input','type','checkbox'),$('/span','innerHTML','不同步更新时间'),
	$('/br'),
	$('/span','innerHTML','镜像到空合集会自动改变合集的类型'),
	$('/br'),
	$('/button')._.attr({innerHTML:'确定',type:'button'})._.on('click',function(){
		if(y.value = parseInt(y.value,10))
			__NUKE.doRequest({
				u:{u:__API._base,a:{__lib:'modify_forum',__act:'quote_forum',raw:3,act:h.checked ? 5: 1,fid:fid,tid:y.value}}
				})
		})
	)
this.w._.show(e)
__NUKE.doRequest({
	u:{u:__API._base,a:{__lib:'modify_forum',__act:'quote_forum',raw:3,act:4,fid:fid,tid:y.value}},
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		x=''
		for(var k in d.data[0])
			x+=' '+d.data[0][k]
		if(x)
			z.innerHTML = '已经镜像到的主题'+x+'<br/>'
		}
	})
}//fe

adminui.minorModerator = function(e,fid){
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('副版主')
var $ = _$, x=$('/table').$0('className','forumbox') ,z
this.w._.addContent(
	'副版主(用户组不会改变)可以 锁定/加亮/编辑/移动/镜像 主题 超过三个月后权限失效 可以重新设置',
	$('/br'),
	z=$('/span'),
	$('/br'),
	$('/button','innerHTML','增加一个','type','button','onclick',function(){
		z._.add(
			xy(0,0,0,0)
			)
		}),
	$('/button','innerHTML','确定','type','button','onclick',function(){
		var j = z.childNodes,x=0,y=''
		for(var i=0;i<j.length;i++){
			if((j[i]._valueN.op&131072)==0){
				y+=j[i]._valueN.uid+'\t'+j[i]._valueN.op+'\t'
				}
			}
		if(y)
			y=y.substr(0,y.length-1)
		__NUKE.doRequest({
			u:{u:__API._base,a:{__lib:'minor_moderator',__act:'set_v2',raw:3,'fid':fid,'minor_moderator_input':y}}
			})
		})
	)
this.w._.show(e)
__NUKE.doRequest({
	u:{u:__API._base,a:{__lib:'minor_moderator',__act:'get_v2',raw:3,act:4,fid:fid}},
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		x=d.data[0].split("\t")
		if(x.length>1){

				for(var i=0;i<x.length;i+=4)
					z._.add(
						xy(x[i]|0, x[i+1], x[i+2]|0, x[i+3]|0)
						)

			}
		}
	})

var xy = function(uid,name,time,type){
	return $('/span'
		,'_valueN',{'uid':uid,'op':0})//1modmark 65536renewtime
		._.add(
			$('/input','value',uid ? name+'('+uid+')' : '', 'disabled', uid ? '1' : ''
				,'onchange',function(){this.parentNode._valueN.uid=this.value}
				)
			,$('/select',
				uid ? $('/option','value',0,'innerHTML','到 '+commonui.time2date(time,'Y-m-d H:i')+' 为止有副版主权限') : null
				,$('/option','value',65536,'innerHTML','从现在开始三个月内有副版主权限')
				,$('/option','value',131072,'innerHTML','取消副版主权限')
				,'onchange',function(){this.parentNode._valueN.op|=(this.value|0)}
				),' '
			,__GP.admin||(__GP.superlesser&&__GP.ubStaff) ? [$('/input', 'type','checkbox', 'checked',(type&1)?'checked':'', 'disabled', __GP.admin||(__GP.superlesser&&__GP.ubStaff) ? '':'disabled'
				,'onchange',function(){
					if(this.checked)
						this.parentNode._valueN.op|=1
					else
						this.parentNode._valueN.op&=(~1)
					}
				) ,'用户信息中显示为版主'] : null
			,$('/br')
			)
	}
}//fe

adminui.forumStat = function(e,fid,tid,fr,da,stid){
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('访问统计')
var $ = _$, f,x,y,z,a,t,c,b,s,p
this.w._.addContent(
	c=$('/input','type','radio','name','yjhbn6t3','checked',(fid?'1':'')),'版面 ',
	b=$('/input','type','radio','name','yjhbn6t3','checked',(tid?'1':'')),'主题 ',
	s=$('/input','type','radio','name','yjhbn6t3','checked',(stid?'1':'')),'合集 ',
	f=$('/input','placeholder','版面或主题ID','value',tid?tid:fid),' (不超过10个 需要全部正式版主权限) . ',
	t=$('/input','placeholder','起始日期','value',fr?fr:''),' (年-月-日) . ',
	a=$('/input','placeholder','天数(向前数)','value',da?da:''),' (不超过三个月) . ',
	p=$('/input','placeholder','custom','value',''),
	$('/button')._.attr({innerHTML:'确定',type:'button'})._.on('click',function(){
			__NUKE.doRequest({
				u:{u:__API._base+(p.value?p.value:''),a:{__lib:'admin_stat',__act:'forum_stat',raw:3,act:1,tid:(b.checked ? f.value :''),stid:(s.checked ? f.value :''),fid:(c.checked ? f.value :''),date:t.value,day:a.value}},
				f:function(d){
					var e = __NUKE.doRequestIfErr(d)
					if(e)
						return alert(e)
					d = d.data[0]
					x=$('/table').$0('className','forumbox ubbtable')
					z = $('/tr',$('/td','innerHTML','/'))
					for(var k in d.names)
						z._.add($('/td','innerHTML',d.names[k]))
					x._.add(z)
					d.from |=0
					d.to |=0
					var max={}
					for(var i=d.to;i>d.from;i--){
						if(d[i]){
							for(var p in d[i])break
							var p = d[i].sum ? d[i].sum : d[i][p];
							for(var k in d.keys){
								if((p[d.keys[k]]|0)>(max[d.keys[k]]|0))
									max[d.keys[k]] = p[d.keys[k]]|0
								}
							}
						}
					for(var i=d.to;i>d.from;i--){
						z = $('/tr')
						z._.add($('/td','innerHTML',commonui.time2date(i*86400+1,'Y-m-d')))
						if(d[i]){
							for(var p in d[i])break
							var p = d[i].sum ? d[i].sum : d[i][p];
							for(var k in d.keys)
								z._.add($('/td',$('/div','style','height:1.83em;margin-bottom:-1.83em;background-color:silver;width:'+((p[d.keys[k]]/max[d.keys[k]]*1000|0)/10)+'%'))._.add(p[d.keys[k]]===undefined ? 'N/A' : (p[d.keys[k]]|0)))
							}
						x._.add(z)
						}
					x.firstChild.firstChild.$0('innerHTML','',$('/button','innerHTML','复制表格','onclick',function(){
						var x = this.parentNode.parentNode.parentNode, y=x.getElementsByTagName('div')
						for(var i=0;i<y.length;i++)
							y[i].style.display='none'
						r = document.createRange();
						s = window.getSelection();
						s.removeAllRanges();
						try {
							r.selectNodeContents(x);
							s.addRange(r);
							} 
						catch (e) {
							r.selectNode(x);
							s.addRange(r);
							}
						try {
							document.execCommand('copy')
							} catch (err) {}
						}))
					y.innerHTML = ''
					y._.add(d.all,$('/br'),x)
					}//fe
				})
		}),
	$('/br'),
	y = $('/div')
	)
this.w._.show(e)

}//fe

adminui.getDelayAction=function(id,type){
var x
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('预定的延时操作')
this.w._.addContent(x=_$('/div'))
__NUKE.doRequest({
	u:{u:__API._base+'__lib=delay_action&__act=view_delay_action&about_id='+id+'&type='+type,
		a:{__output:3}
		},
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		console.log(d)
		var dd = d.data[0],y=''
		for(var i in dd){
			y+="<tr><td><a href='/nuke.php?func=ucp&uid="+dd[i][0]+"'>"+dd[i][1]+"</a> 预订于 </td><td> "+commonui.time2date(dd[i][2],'Y-m-d H:i:s')+" </td><td> 进行 "+dd[i][3]+" 操作</td></tr>";
			}
		x.innerHTML = '<table>'+y+'</table>'
		}
	})
this.w._.show()
}//


adminui.selectPid = function(tid,pid,opt){
var x = sessionStorage.getItem('selectPid')
if(opt&2){
	x = x.substr(11)
	var y = x.match(/\d+/g),z={},u
	this.createadminwindow()
	this.w._.addContent(null)
	this.w._.addTitle('记录选择的帖子pid')
	this.w._.addContent('点击发帖时间选择',_$('/br'),'可以翻页',_$('/br'),'关闭浏览器窗口/打开其他主题会清空',_$('/br'),u=_$('/textarea'))
	for(var i=0;i<y.length;i++)
		z[y[i]]=1
	for(var i in z)
		u.value+=i+','
	this.w._.show()
	return
	}
if(!x || (x.substr(0,11)|0)!=tid)
	x=tid+'           '
if(opt&1)
	x = x.replace(new RegExp('\\s'+pid+'\\s'),' ')
else
	x+=pid+' '
sessionStorage.setItem('selectPid',x);
}//

adminui.viewLog = function(tou,fromu,id,about){

var $=_$,self=this,vtype,vfrom,vto,vabout,y,vp,vpb
commonui.createadminwindow()
commonui.adminwindow._.addContent(null)
commonui.adminwindow._.addContent(
	$('/span')._.add(
		'类型',vtype = $('/select'),
		' 操作人',vfrom = $('/input').$0('size',12),
		' 被操作人',vto = $('/input').$0('size',12),
		' 相关ID',vabout = $('/input').$0('size',12),'(主题ID/回复ID/版面ID……依类型不同) ',
		$('/br'),'(主题的审核记录在相关ID中查询TID) ',
		$('/br'),
		vp = $('/button').$0('innerHTML','&#9668; 第1页 &#9658;','value',1,
			'onclick',function(e){z(this,e)}),
		$('/button').$0('innerHTML','提交','onclick',function(){
			x(null,vtype.value,vfrom.value,vto.value,vabout.value,vp.value)
			}),
		 $('/br'),
		 '版主可以撤销自己或副版主的操作 超级版主可以撤销其他版主的操作',
		y = $('/div'),
		vpb = $(vp.cloneNode(1)).$0('onclick',function(e){z(this,e)}),
		$('/button').$0('innerHTML','提交','onclick',function(){
			x(null,vtype.options[vtype.selectedIndex].value,vfrom.value,vto.value,vabout.value,vp.value)
			})
		)
	)
var z = function(o,e){
	var p = __NUKE.position.get(e)
	var q = o.getBoundingClientRect()
	if(p.px-q.left > q.right-p.px)
		o.value++
	else if(o.value>1)
		o.value--
	vp.value = vpb.value =o.value
	vp.innerHTML = vpb.innerHTML = '&#9668; 第'+o.value+'页 &#9658;'
	}
var x = function(id,type,from,to,about,page,o){
	__NUKE.doRequest({
		u:{u:__API._base+'__lib=admin_log_search&__act=search&from='+(from?from:'')+'&to='+(to?to:'')+'&id='+(id?id:''),
			a:{type:type?type:'',about:about?about:'',page:page?page:'',raw:3}
			},
		f:function(d){
			var e = __NUKE.doRequestIfErr(d)
			if(e)
				return alert(e)
			var u = d.data[1], s = d.data[2], d = d.data[0], t= $('/table').$0('className','forumbox')
			for(var k in d)
				t._.add($('/tr').$0('className','row'+(1+(k&1)))._.add(
					$('/td').$0('className','c1','style','padding:0.25em')._.add(
						$('/span').$0('innerHTML',	s[d[k][1]],'title',d[k][0])
						),
					$('/td').$0('className','c2','style','padding:0.25em')._.add(
						$('/a').$0('href','/nuke.php?func=ucp&uid='+d[k][2],'title',u[d[k][2]],'innerHTML',commonui.cutstrbylen(u[d[k][2]],7,6,'…')),
						$('/span').$0('className','silver xtxt','innerHTML',' ('+d[k][2]),
						d[k][7] ? $('/br') : '',
						d[k][7] ? $('/span').$0('className','silver xtxt','innerHTML',self._long2ip(d[k][7])) : ''
						),
					$('/td').$0('className','c3','style','padding:0.25em')._.add(
						d[k][3] ? $('/a').$0('href','/nuke.php?func=ucp&uid='+d[k][3],'title',u[d[k][3]],'innerHTML',commonui.cutstrbylen(u[d[k][3]],7,6,'…')) : null,
						d[k][3] ? $('/span').$0('className','silver xtxt','innerHTML',' ('+d[k][3]) : null
						),
					$('/td').$0('className','c1','style','padding:0.25em').$0('innerHTML',self._formatLog(d[k][5])	),
					$('/td').$0('className','c2','style','padding:0.25em')._.add(
						$('/span').$0('className','xtxt','innerHTML',commonui.time2date(d[k][6], 'Y-m-d H:i:s')),
						(d[k][1]==2 || d[k][1]==14 || d[k][1]==31)?$('/a').$0('href','javascript:void(0)','onclick',function(){self._undo(this,this.title)},'title',d[k][0],'innerHTML','[撤销]'):null
						)
					))
			y.innerHTML = ''
			y._.add(t)
			if(!vtype.firstChild){
				vtype._.add($('/option').$0('innerHTML','所有','value',''))
				for(var k in s)
					vtype._.add($('/option').$0('innerHTML',s[k],'value',k))
				}
			},
		b:o
		})
	}
if(tou){
	x(0,0,0,tou,0,0,null)
	vto.value=tou
	}
else if(fromu){
	x(0,0,fromu,0,0,0,null)
	vfrom.value = fromu
	}
else if(id){
	x(id,0,0,0,0,0,null)
	}
else if(about){
	x(0,0,0,0,about,0,null)
	}
commonui.adminwindow._.show()
}//fe

adminui._undo = function (o,id){
o.style.color='darkred'
if(window.confirm('是否要取消此操作'))
	__NUKE.doPost({u: '/nuke.php?__lib=undo&__act=undo&raw=3&logid='+id})
o.style.color=''
}//fe
adminui._long2ip= function (ip) {
if(typeof ip =='string' && ip.indexOf('.')!=-1)
	return ip
ip = __NUKE.toInt(ip)
return [ip >>> 24, ip >>> 16 & 0xFF, ip >>> 8 & 0xFF, ip & 0xFF].join('.');
}//fe
adminui._formatLog = function(x){
if(!x)
	return ''
x+=''
x = x.replace(
	/(?:\[|\()TID:(\d+)(?:\]|\))/g,
	function($0,$1){
		if($1==0)
			return $0;
		else 
			return "<a href='/read.php?tid="+$1+"' target='_blank' title='主题' onclick=\"if(ubbcode){commonui.cancelBubble(event);commonui.cancelEvent(event);ubbcode.fastViewPost(event,"+$1+",0,2)}\">[T:"+$1+"]</a>";
		})

x = x.replace(
	/(?:\[|\()PID:(\d+)(?:\]|\))/g,
	function($0,$1){
		if($1==0)
			return $0; 
		else 
			return "<a href='/read.php?pid="+$1+"' target='_blank' title='回复' onclick=\"if(ubbcode){commonui.cancelBubble(event);commonui.cancelEvent(event);ubbcode.fastViewPost(event,0,"+$1+",0)}\">[P:"+$1+"]</a>";
		})

x = x.replace(
	/\[UID:(\d+)\]/g,
	function($0,$1){
		if($1==0)
			return $0; 
		else 
			return "<a href='/nuke.php?func=ucp&uid="+$1+"' target='_blank' title='用户'>[U:"+$1+"]</a>";
		})

x = x.replace(
	/\[(STID|FID):(\d+)\]/g,
	function($0,$1,$2){
		if($2==0)
			return $0; 
		else 
			return "<a href='/thread.php?"+$1.toLowerCase()+"="+$2+"' target='_blank'>"+$0+"</a>";
		})

x = x.replace(
	/\[LOG:(\d+)\]/g,
	function($0,$1,$2){ 
		return "<a href='/nuke.php?func=adminlog&id="+$1+"' target='_blank'>"+$0+"</a>";
	})

x = x.replace(
	/\[ITEM:(\d+),(\d+)\]/g,
	function($0,$1,$2){
		if($1==0)
			return $0; 
		else 
			return "<a href='javascript:void(0)' title='物品 类别"+$1+" 子类"+$2+"'>[I:"+$1+","+$2+"]</a>";
		})

x = x.replace(
	/\[L:(\d+),(-?\d+),(\d+),(-?\d+),([\d\/]*)\]/g,
	function($0,$1,$2,$3,$4,$5,$6){
		var z=''
		if($1!='0'){
			if($2==='00')
				z+="在同声望("+$3+")版面中"
			else if($3!='0')
				z+="在主题<a href='/read.php?tid="+$3+"&to' target='_blank'>[TID:"+$3+"]</a>"
			else if($2!='0')
				z+="在版面<a href='/thread.php?fid="+$2+"' target='_blank'>[FID:"+$2+"]</a>"
			z+='禁言'+$1+'天 '
			}

		if($4!='0'){
			$5 = $5.split('/')
			z+='扣除声望'+$4
			var y = '';
			for(var i=0;i<$5.length;i++){
				if($5[i]=='0')
					y=' 扣除威望'+($4/150)
				else
					z+='/[RID:'+$5[i]+']'
				}
			z+=y
			}
		if(!z)
			return '无操作';
		return z
		})

return x
}//fe

adminui.gameScoreTemplate = function(e){
var $= _$,b=function(){return $('/br')}
commonui.createadminwindow()
commonui.adminwindow._.addContent(null)
commonui.adminwindow._.addContent(
	$('/span')._.add(
		'游戏名(中文) ',$('/input'),b(),
		'游戏名(原文) ',$('/input'),b(),
		'游戏类型 ',$('/input'),b(),
		'开发商 ',$('/input'),b(),
		'发行商 ',$('/input'),b(),
		'游戏官网URL ',$('/input'),b(),
		'题图(附件图地址 jpg) ',$('/input'),b(),
		'平台/发售时间/URL ',$('/input'),$('/input'),$('/input'),b(),
		'平台/发售时间/URL ',$('/input'),$('/input'),$('/input'),b(),
		'平台/发售时间/URL ',$('/input'),$('/input'),$('/input'),b(),
		'平台/发售时间/URL ',$('/input'),$('/input'),$('/input'),b(),
		'平台/发售时间/URL ',$('/input'),$('/input'),$('/input'),b(),
		'平台/发售时间/URL ',$('/input'),$('/input'),$('/input'),b(),
		'平台/发售时间/URL ',$('/input'),$('/input'),$('/input'),b(),
		'平台/发售时间/URL ',$('/input'),$('/input'),$('/input'),b(),
		$('/button','innerHTML','提交','onclick',function(){
			var x = this.parentNode.getElementsByTagName('input')
			for(var i=0;i<x.length;i++)
				x[i].value = x[i].value.replace(/^\s+|\s+$|《|》/g,'').replace(/[（）【】`]/g,function($0,$1){var x='（(）)【[】]``';return x.charAt(x.indexOf($1)+1)})
			y = "[style left 1 top 1 width 9 height 7 background #b22222 align center border-radius 0.3]\n\
[style font 4 #fff line-height 1.7 innerHTML $votedata_voteavgvalue][/style]\n\
[/style]\n\
\n\
[style left 1 top 8 width 9 color #888 align center][style innerHTML $votedata_usernum][/style]人评分[/style]\n\
\n\
[style left 11 top 1 color #444 align justify-all]\n\
[style font 3 #444 line-height 1 width 100%][comment game_title_cn]"+x[0].value+"[/comment game_title_cn][/style]\n\
\n\
\n\
[style color #444 width 100% line-height 2.5][comment game_title]"+x[1].value+"[/comment game_title][/style]\n\
[/style]\n\
\n\
[style color #444 left 11 top 6.2 line-height 1.5][comment game_release][stripbr]\n\
"
			var z = ['#CD5C5C','#DC143C','#B22222','#8B0000','#FF4500','#FF6347','#FF7F50','#FF1493','#DB7093','#C71585','#556B2F','#808000','#6B8E23','#66CDAA','#3CB371','#2E8B57','#008000','#006400','#D8BFD8','#DDA0DD','#DA70D6','#BA55D3','#9370DB','#8A2BE2','#800080','#4B0082','#483D8B','#6A5ACD','#BDB76B','#20B2AA','#5F9EA0','#008B8B','#008080','#6495ED','#4682B4','#4169E1','#A0522D','#A52A2A','#BC8F8F']
			for(var i=7;i<30;i+=3){
				if(x[i].value){
					var p = x[i].value.toUpperCase(), c = z[ (('0x'+hex_md5(p).substr(0,2))|0)/255* z.length |0 ]
					if(x[i+2].value.match(/^https?:\/\//))
						y+="[url="+x[i+2].value+"][style color #fff padding 0 0.5 background "+c+" border-radius 0.2]"+p+" [symbol link][/style][/url] "+x[i+1].value+" [stripbr]\n"
					else
						y+="[style color #fff padding 0 0.5 background "+c+" border-radius 0.2]"+x[i].value.toUpperCase()+"[/style] "+x[i+1].value+" [stripbr]\n"
					}
				}

			y+="[/comment game_release][/style]\n\n[style color #444 left 11 top 8.5]\n"
			var z
			if(x[6].value){
				z = ubbcode.attach.check('_'+Math.random(),x[6].value)
				if(!z)
					alert('必须使用附件图')
				y+="[comment game_title_image][style border-radius 0.3 width 50 src "+z.autoUrl+"][/style][/comment game_title_image]\n\n\n"
				}
			if(!z)
				z = {h:0,w:1}
			if(x[2].value)
				y+="[style float left width 15]\n\
[style font 2 line-height 1.5]游戏类型[/style]\n\
\n\
\n\
[style font 2 #b22222 line-height 1.5][omit 7][comment game_type]"+x[2].value+"[/comment game_type][/omit][/style]\n\
[/style]\n\n"
			if(x[3].value)
				y+="[style float left width 15]\n\
[style font 2 line-height 1.5]开发商[/style]\n\
\n\
\n\
[style font 2 #b22222 line-height 1.5][omit 7][comment game_devloper]"+x[3].value+"[/comment game_devloper][/omit][/style]\n\
[/style]\n\n"
			if(x[4].value)
				y+="[style float left width 15]\n\
[style font 2 line-height 1.5]发行商[/style]\n\
\n\
\n\
[style font 2 #b22222 line-height 1.5][omit 7][comment game_publisher]"+x[4].value+"[/comment game_publisher][/omit][/style]\n\
[/style]\n\n"
			if(x[5].value)
				y+="[style float left clear both]\n\
[style font 2 line-height 1.5]官方网站[/style]\n\
\n\
[comment game_website][url="+x[5].value+"][/comment game_website][style font 2 #b22222 line-height 1.5][omit 15]"+x[5].value.replace(/^http:\/\//,'')+"[/omit] [symbol link][/style][/url]\n\
[/style]\n\n"
			y="\n[randomblock]\n[fixsize height "+((24+z.h/z.w*50)|0)+" width 50 90]\n\n"+y+"[/style]\n\n[/randomblock]\n\n"
			postfunc.addText(y)
			commonui.adminwindow._.hide()
			})

		)//


	)
commonui.adminwindow._.show(e)
}//fe

adminui.fIconGen = function(){
if(this.fIconGen.load)
	return
this.fIconGen.load=1
loader.script(__SCRIPTS.imgEdit,function(){adminui.fIconGen()})
}

if(window.__GP && __GP.userBit&4){//mod
adminui.bbscode_min_admin = function(arg){
if(arg.tId == 16403728 && !arg.pId && !arg.isSig){
	arg.txt= arg.txt+'<br/><img src="about:blank" class="x" onerror="adminui.bbscode16403728(this)"/>'
	adminui.bbscode16403728 = function(o){
		__NUKE.doRequest({
			u:{u:__API._base+'__lib=load_topic&__act=load_topic_reply_ladder',
				a:{all:1,raw:3}
				},
			f:function(d){
				var e = __NUKE.doRequestIfErr(d)
				if(e)
					return alert(e)
				var t= d.data[0],f=d.data[1],tx=''
				for(var i in t){
					tx+='[tid]'+t[i].tid+'[/tid] <a href="/read.php?tid='+t[i].tid+'" class="b" target="_blank">'+t[i].subject+'</a> <span class="silver">['+f[t[i].fid]+']</span><br/><br/>'
					}
				o.parentNode.replaceChild(_$('/span','innerHTML',tx,_$('/button','type','button','innerHTML','清除缓存','onclick',function(){

					__NUKE.doRequest({
						u:{u:__API._base+'__lib=load_topic&__act=load_topic_reply_ladder_clear_cache',
							a:{all:1,raw:3}
							}})

					})),o)
				}
			})
		}
	}
}//

}//if

/**
 * 设置版面背景图
 * @param {type} e
 * @returns {undefined}
adminui.setForumPic = function(e){
this.createadminwindow()
this.w._.addContent(null)
if(!window.__GP.admin){
	this.w._.addContent("设置版面的背景图",
		_$('/br'),
		'发帖将图片上传为附件(不要加水印)注明版面ID 并召唤管理员审核',
		_$('/br'),
		'图片高度190像素 宽度1600像素或以上 主体在左侧 图片大小不超过85k',
		_$('/br'),
		'或图片宽度190像素 高度1600像素或以上',
		_$('/br'),
		'或同时提供两种(屏幕宽度超过1440像素时使用纵向图 其他情况使用横向图)'
		)
	tTip.showdscp(e,this.w);
	return
	}
this.w._.addContent(
	'设置版面的背景图',
	_$('/br'),
	_$('/input')._.attr('size',20),
	_$('/span').$0('innerHTML','版面ID'),
	_$('/br'),
	_$('/input')._.attr('size',20),
	_$('/span').$0('innerHTML','图片地址(只限附件)'),
	_$('/br'),
	_$('/button')._.attr({innerHTML:'确定',type:'button'})._.on('click',function(){
			var fid = this.parentNode.getElementsByTagName('input'), p = fid[1].value.replace(/^http:\/\/.+?\//,'/'), fid=fid[0].value, o = this
			__NUKE.doRequest({
				u:'/nuke.php?raw=1&__lib=forum_pic&__act=forum_pic&fid='+fid+'&file='+encodeURIComponent(p),
				b:this,
				f:function(d){
					if(d.error)
						return alert(d.error[0])
					alert('done')
					}
				})
			}
		)
	)
tTip.showdscp(e,this.w);
}
*/


/*
adminui.massBuff = function(){
var x = adminui.massBuff.queue.shift()
if(!x){
	console.log('all done')
	return
	}
x = (''+x).split(' ')
if(x[0]>0){
	x[1] = Math.random()>0.4?99:107
	x[2] = 3
	__NUKE.doRequest({
		u:{u:__API._base+'__lib=nuke&__act=buff&uid='+x[0],
			a:{bid:x[1],day:x[2],nolog:1,raw:3}
			},
		f:function(){
			window.setTimeout(function(){adminui.massBuff()},500)
			}
		})
	}
else
	adminui.massBuff()
}
adminui.massBuff.queue=[]
adminui.massBuff()
*/




















//==================================================================
//版面设置相关的

;(function(){
//版面属性key
var 
_NAME = 70,
_BIT = 71,
_ADMIN = 72,
_PARENT_FID = 73,
_SUB_ORDER = 74,
_REPU = 75,
_UNION = 76,
_ALLOW_VISIT = 77,
_ALLOW_POST = 78,
_ALLOW_REPLY = 79,
_DSCP = 80,
_JUMP = 81,
_E_AUTO_TRANS = 1,
_E_LATEST_SET = 2,
_E_FILTER_WORD = 3,
_E_MINOR_ADMIN = 4,
_E_KEY_COLOR = 5,
_E_FORCE_KEY = 6,
_E_OWNER_UID = 7,
_E_UF_ALLOW_VISIT = 8,
_E_UF_ALLOW_POST = 9,
_E_UF_ALLOW_REPLY = 10,
_E_HTML_KEY = 11,
_E_HTML_DSCP = 12,
_E_CUSTOM_LEVEL = 13,
_E_UF_ADMIN = 14,
_E_UF_DSCP = 16,
_E_UF_NAME = 17,
_E_REL_NAME = 28,

//版面type bit
_B_FREE_EDIT = 16,
_B_DISPLAY_ATTACH = 1024,
_B_SHOW_SUB = 2048,
_B_IF_CAT = 4096,
_B_NO_INHERIT_MOD=16384,
_B_NAV_HIDDEN=32768,
_B_TID_ORDER = 131072,
_B_NAV_IGNORE = 262144,
_B_TOPIC_HIDDEN = 524288




adminui.forumTreeSw = function(o){
					var x = o.parentNode.childNodes
					if(o._m){
						o._m=0
						o.innerHTML = '&#8854;'
						for(var i=0;i<x.length;i++)
							if(x[i].nodeName=='DIV')
								x[i].style.display=''
						}
					else{
						o._m=1
						o.innerHTML = '&#8853;'
						for(var i=0;i<x.length;i++)
							if(x[i].nodeName=='DIV')
								x[i].style.display='none'
						}
}//

adminui.forumTree = function(all ,f){
var y={}
for(var k in all){
	var z = all[k]
	y[z.stid ? z.stid+'_'+z.fup : z.fid] = _$('/div',
		'_fup',z.fup?z.fup:'',
		'style',{marginLeft:'1em'},
		_$('/a','_fid',z.fid|0,'_stid',z.stid|0,'href',z.stid?'/thread.php?stid='+z.stid:'/thread.php?fid='+z.fid,'innerHTML',(z.stid?'S'+z.stid : z.fid)+' : '+z.name,'onclick',function(e){f(e,this._fid,this._stid)}),//if(this.title)adminui.modifyForum(null,this.title);commonui.cancelEvent(e)
		_$('/a','href','javascript:void(0)','innerHTML','&#8854;','style','marginLeft:0.5em','onclick',function(e){adminui.forumTreeSw(this)})
		)
	}
for(var k in y){
	if(y[k]._fup){
		if(!y[y[k]._fup])
			y[y[k]._fup] = _$('/div',
				'style',{marginLeft:'1em'},
				_$('/a','_fid',y[k]._fup,'href','/thread.php?fid='+y[k]._fup,'innerHTML',y[k]._fup+' : ','onclick',function(e){f(e,this._fid)})
				)
		y[y[k]._fup]._.add(y[k])
		}
	}
for(var k in y){
	var z = 'purple'
	if(y[k].parentNode){
		z= 'royalblue'
		if(y[k].parentNode.parentNode){
			z= 'teal'
			if(y[k].parentNode.parentNode.parentNode){
				z= 'sienna'
				if(y[k].parentNode.parentNode.parentNode.parentNode)
					z= 'gray'
				}
			}
		}
	y[k].firstChild._.cls(z)
	}
var x = []
for(var k in y)
	if(!y[k].parentNode)
		x.push(y[k])
return x
}//

/**
 * 版面设置
 * @param {type} e
 * @param {type} fid
 * @returns {undefined}
 */
adminui.modifyForum = function(e,fid){


var fc,rpu,grp,tre

this.createadminwindow()
this.w._.addContent(null)

this.w._.addContent(
	_$('/span')._.add(
		_$('/table')._.add(
			_$('/tr')._.add(
				fc=_$('/td').$0('style',{verticalAlign:'top',paddingRight:'1em'}),
				grp=_$('/td').$0('style',{verticalAlign:'top',paddingRight:'1em'}),
				rpu=_$('/td').$0('style',{verticalAlign:'top',paddingRight:'1em'}),
				tre=_$('/td').$0('style',{verticalAlign:'top',paddingRight:'1em'})
				)
			)
		)
	)
this.w._.show(e)

var _fid,t={71:{}}

__NUKE.doRequest({
	u:__API._base+'__lib=modify_forum&__act=get&raw=1&fid='+fid,
	f:function(d){//如有.error则显示.error 否则显示.data

		if(!d)
			return

		if(d.error)
			return alert(d.error[0])

		try{
			var x=d.data[0]
		}catch(e){
			return alert('ERROR NO DATA')
			}
		
		for(var k in x.allGroup){
			grp._.add(_$('/a').$0('style',{display:'block'},'href','/nuke.php?func=modifygroup&id='+x.allGroup[k].id,'target','_blank','innerHTML',x.allGroup[k].id+' : '+x.allGroup[k].name))
			}

		for(var k in x.allReputation){
			rpu._.add(_$('/a').$0('style',{display:'block'},'href','/nuke.php?func=modifyreputation&id='+x.allReputation[k].id,'target','_blank','innerHTML',x.allReputation[k].id+' : '+x.allReputation[k].name))
			}

		tre._.add(adminui.forumTree(  x.allForumTree,  function(e,fid,stid){
			if(!stid && fid)
				adminui.modifyForum(null,fid);
			commonui.cancelBubble(e)
			return commonui.cancelEvent(e)
			}  ))

		var y=function(k){return (x.forumData[k]===undefined)?'':x.forumData[k].toString()}
		fc._.add(
			'版面FID',_$('/br'),
			_fid = _$('/input').$0('value',fid,'disabled','true')
			,_$('/button','innerHTML','新建版面','onclick',function(){this.previousSibling.value=''})
			,_$('/br'),
			_$('/br'),
			
			'版面名',_$('/br'),
			t[_NAME] = _$('/input').$0('value',y(_NAME)),_$('/br'),
			_$('/br'),
			
			'版面说明(显示用',_$('/br'),
			t[_DSCP] = _$('/textarea').$0('value',y(_DSCP),'style',{width:'25em',height:'5em'}),_$('/br'),
			_$('/br'),
			
			'版面说明(SOE',_$('/br'),
			t[_E_HTML_DSCP] = _$('/textarea').$0('value',y(_E_HTML_DSCP),'style',{width:'25em',height:'5em'}),_$('/br'),
			_$('/br'),
			
			'版面关键字(SOE',_$('/br'),
			t[_E_HTML_KEY] = _$('/textarea').$0('value',y(_E_HTML_KEY),'style',{width:'25em',height:'5em'}),_$('/br'),
			_$('/br'),

			'相关作品(影音/游戏等)名 包括原文名 译名 俗名等 每行一个',_$('/br'),
			t[_E_REL_NAME] = _$('/textarea','style','width:25em;height:15em','value',y(_E_REL_NAME)),_$('/br'),
			_$('/br'),

			'版面跳转地址',_$('/br'),
			t[_JUMP] = _$('/input').$0('value',y(_JUMP)),_$('/br'),
			_$('/br'),
			
			'排序权重(INT 小的在前',_$('/br'),
			t[_SUB_ORDER] = _$('/input').$0('value',y(_SUB_ORDER)),_$('/br'),
			_$('/br'),
			
			'父版面FID',_$('/br'),
			t[_PARENT_FID] = _$('/input').$0('value',y(_PARENT_FID)),_$('/br'),
			_$('/br'),

			'版面声望ID(多个用逗号分隔 0为新建声望 名字使用版面名',_$('/br'),
			t[_REPU] = _$('/input').$0('value',y(_REPU)),_$('/br'),
			_$('/br'),
			
			'合并显示的版面FID(多个用逗号分隔 前加x默认不显示',_$('/br'),
			t[_UNION] = _$('/input').$0('value',y(_UNION)),_$('/br'),
			_$('/br'),
			
			'所有者UID(是所有者且在版主列表中方可打开用户版面设置功能',_$('/br'),
			t[_E_OWNER_UID] = _$('/input').$0('value',y(_E_OWNER_UID)),_$('/br'),
			_$('/br'),
			
			'版主UID*(每行一个',_$('/br'),
			t[_ADMIN] = _$('/textarea').$0('value',y(_ADMIN).replace(/,/g,'\n'),'style',{width:'25em',height:'20em'}),_$('/br'),
			_$('/textarea').$0(
				'style',{width:'25em',height:'20em'},
				'disabled','disabled',
				'value',(function(){var y='';for(var k in x.adminName)y+=k+' '+x.adminName[k]+'\n';return y})()
				),_$('/br'),
			_$('/br'),
			
			'访问权限*(i 为继承上层版面设置 声望0为使用新建的声望',_$('/br'),
			'其他参考lib_privilege::format_str_to_ary',_$('/br'),
			t[_ALLOW_VISIT] = _$('/input').$0('value',y(_ALLOW_VISIT)),_$('/br'),
			_$('/br'),
			
			'发帖权限*(同上',_$('/br'),
			'+w,+u1,',t[_ALLOW_POST] = _$('/input').$0('value',y(_ALLOW_POST)),_$('/br'),
			_$('/br'),
			
			'回复权限*(同上',_$('/br'),
			'+w,+u1,',t[_ALLOW_REPLY] = _$('/input').$0('value',y(_ALLOW_REPLY)),_$('/br'),
			_$('/br'),
			
			'显示子版面',_$('/br'),
			t[_BIT][_B_SHOW_SUB] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_SHOW_SUB?1:null),_$('/br'),
			_$('/br'),

			'是一个归类版(仅作父版面使用 不能显示 不能发帖',_$('/br'),
			t[_BIT][_B_IF_CAT] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_IF_CAT?1:null),_$('/br'),
			_$('/br'),

			'不在导航菜单中显示',_$('/br'),
			t[_BIT][_B_NAV_IGNORE] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_NAV_IGNORE?1:null),_$('/br'),
			_$('/br'),
			
			'不继承版主权限',_$('/br'),
			t[_BIT][_B_NO_INHERIT_MOD] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_NO_INHERIT_MOD?1:null),_$('/br'),
			_$('/br'),
			
			'在导航栏中隐藏',_$('/br'),
			t[_BIT][_B_NAV_HIDDEN] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_NAV_HIDDEN?1:null),_$('/br'),
			_$('/br'),
			
			'编辑主题不受时限限制',_$('/br'),
			t[_BIT][_B_FREE_EDIT] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_FREE_EDIT?1:null),_$('/br'),
			_$('/br'),
			
			'在列表中显示附件图',_$('/br'),
			t[_BIT][_B_DISPLAY_ATTACH] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_DISPLAY_ATTACH?1:null),_$('/br'),
			_$('/br'),

			'发主题自动隐藏',_$('/br'),
			t[_BIT][_B_TOPIC_HIDDEN] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_TOPIC_HIDDEN?1:null),_$('/br'),
			_$('/br'),

			'默认TID排序',_$('/br'),
			t[_BIT][_B_TID_ORDER] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_TID_ORDER?1:null),_$('/br'),
			_$('/br'),

			_$('/button').$0('innerHTML','提交','onclick',function(){
				if(!_fid.value && !confirm('未设置FID将会创建新版面'))
					return
				var a = {}
				for(var k in t){
					if(t[k].nodeName)
						a[k] = t[k].value.replace(/^\s+|\s+$/,'')
					}
				a[_BIT] = [0,0]
				for(var k in t[_BIT]){
					if(t[_BIT][k].checked)
						a[_BIT][0] |= k
					else
						a[_BIT][1] |= k
					}
				a[_BIT] = a[_BIT].join(',')
				__NUKE.doRequest({
					u:{u:__API._base+'__lib=modify_forum&__act=set&raw=3&fid='+(_fid.value?_fid.value:''),
						a:a
						},
					b:this
					})
				}), 
			null
			
			)
		
		return true
		}
	})


}//fe




/**
 * 版面相关作品设置
 * @param {type} e
 * @param {type} fid
 * @returns {undefined}
 */
adminui.modifyForumRel = function(e,fid,stid){


var fc,_fid,_stid,_value={},_name,tre

this.createadminwindow()
this.w._.addContent(null)

this.w._.addContent(
	_$('/span')._.add(
		_$('/table')._.add(
			_$('/tr')._.add(
				fc=_$('/td','style','verticalAlign:top;paddingRight:1em')._.add(
					_name = _$('/span'),_$('/br'),_$('/br'),
					'版面FID',_$('/br'),
					_fid = _$('/input'),_$('/br'),
					_$('/br'),

					'或合集ID',_$('/br'),
					_stid = _$('/input'),_$('/br'),
					_$('/br'),

					'版面说明(显示用',_$('/br'),
					_value[_DSCP] = _$('/textarea','style','width:25em;height:5em'),_$('/br'),
					_$('/br'),

					'版面说明(SEO',_$('/br'),
					_value[_E_HTML_DSCP] = _$('/textarea','style','width:25em;height:5em'),_$('/br'),
					_$('/br'),

					'版面关键字(SEO) 每行一个',_$('/br'),
					_value[_E_HTML_KEY] = _$('/textarea','style','width:25em;height:15em'),_$('/br'),
					_$('/br'),

					'相关作品(影音/游戏等)名 包括原文名 译名 俗名等 每行一个',_$('/br'),
					_value[_E_REL_NAME] = _$('/textarea','style','width:25em;height:15em'),_$('/br'),
					_$('/br'),

					_$('/button','innerHTML','提交','onclick',function(){
						var a = {}
						a['v'+_DSCP] = _value[_DSCP].value.replace(/^\s+|\s+$/g,'')
						a['v'+_E_HTML_DSCP] = _value[_E_HTML_DSCP].value.replace(/^\s+|\s+$/g,'')
						a['v'+_E_HTML_KEY] = _value[_E_HTML_KEY].value.replace(/^\s+|\s+$/g,'')
						a['v'+_E_REL_NAME] = _value[_E_REL_NAME].value.replace(/^\s+|\s+$/g,'')
						__NUKE.doRequest({
							u:{u:__API._base+'__lib=modify_forum&__act=set_rel_name&raw=3&fid='+(_fid.value|0)+'&stid='+(_stid.value|0),
								a:a
								},
							b:this
							})
						})
					),
				_$('/td','style','verticalAlign:top;paddingRight:1em;',tre=_$('/div','style','max-height:50em;overflow:auto'))
				)
			)
		)
	)
this.w._.show(e)

var get1 = function(fid,stid){
	__NUKE.doRequest({
		u:__API._base+'__lib=modify_forum&__act=get_rel_name&raw=1&fid='+(fid|0)+'&stid='+(stid|0),
		f:function(d){//如有.error则显示.error 否则显示.data
			var e = __NUKE.doRequestIfErr(d)
			if(e)
				return alert(e)

			var x = d.data[0]

			_name.innerHTML = x.name
			_fid.value = x.fid
			_stid.value = x.stid
			_value[_DSCP].value = x[_DSCP]
			_value[_E_HTML_DSCP].value = x[_E_HTML_DSCP]
			_value[_E_HTML_KEY].value = x[_E_HTML_KEY]
			_value[_E_REL_NAME].value = x[_E_REL_NAME]

			return true
			}
		})
	}
	
get1(fid,stid)

__NUKE.doRequest({
	u:__API._base+'__lib=modify_forum&__act=get_all_forum&raw=1&fid='+(fid|0)+'&stid='+(stid|0),
	f:function(d){//如有.error则显示.error 否则显示.data
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)

		var x = d.data[0]

		tre._.add(adminui.forumTree(  x,  function(e,fid,stid){
			if(stid)
				get1(0,stid);
			else if(fid)
				get1(fid,0);
			commonui.cancelEvent(e)
			}  ))

		}
	})
}//fe




/**
 * 用户版面设置
 * @param {type} e
 * @param {type} fid
 * @returns {undefined}
 */
adminui.modifyUserForum = function(e,fid){


var fc,jr

this.createadminwindow()
this.w._.addContent(null)

this.w._.addContent(
	_$('/span')._.add(
		_$('/table')._.add(
			_$('/tr')._.add(
				fc=_$('/td').$0('style',{verticalAlign:'top',paddingRight:'1em'})
				)
			)
		)
	)
this.w._.show(e)

var _fid,show,t={71:{},8:{},9:{},10:{}}

__NUKE.doRequest({
	u:__API._base+'__lib=modify_forum&__act=get&uf=1&raw=1&fid='+fid,
	f:function(d){//如有.error则显示.error 否则显示.data

		if(!d)
			return

		if(d.error)
			return alert(d.error[0])

		try{
			var x=d.data[0]
		}catch(e){
			return alert('ERROR NO DATA')
			}

		var y=function(k){return (x.forumData[k]===undefined)?'':x.forumData[k].toString()}, 
		z=function(k){
			var y = (x.forumData[k]===undefined)?'':x.forumData[k].toString()
			var y = y.match(/_(\d+)/);
			if(y)
				return y[1]
			else
				return 1
			}
		fc._.add(
			'版面FID',_$('/br'),
			_fid = _$('/input').$0('value',fid,'disabled',1),_$('/br'),
			_$('/br'),
			
			'版面名',_$('/br'),
			t[_NAME] = _$('/input').$0('value',y(_NAME)),_$('/br'),
			_$('/br'),
			
			'版面说明(显示用',_$('/br'),
			t[_E_UF_DSCP] = _$('/input').$0('value',y(_E_UF_DSCP)),_$('/br'),
			_$('/br'),
			
			'在版面所有者的发帖信息中显示链接',_$('/br'),
			show = _$('/input').$0('type','checkbox','checked',x.showlink?1:''),_$('/br'),
			_$('/br'),

			'版主UID或用户名(每行一个',_$('/br'),
			t[_ADMIN] = _$('/textarea').$0('value',y(_ADMIN).replace(/,/g,'\n'),'style',{width:'25em',height:'20em'}),_$('/br'),
			_$('/textarea').$0(
				'style',{width:'25em',height:'20em'},
				'disabled','disabled',
				'value',(function(){var y='';for(var k in x.adminName)y+=k+' '+x.adminName[k]+'\n';return y})()
				),_$('/br'),
			_$('/br'),
			
			'访问权限',_$('/br'),
			t[_E_UF_ALLOW_VISIT][0]=_$('/input').$0('type','radio','name','uf5833'),'允许未注册用户访问 (需要版主前一日访问/操作5次以上 否则只允许注册用户访问',_$('/br'),
			t[_E_UF_ALLOW_VISIT][1]=_$('/input').$0('type','radio','name','uf5833'),'只允许注册用户访问',_$('/br'),
			t[_E_UF_ALLOW_VISIT][2]=_$('/input').$0('type','radio','name','uf5833'),'只允许本版声望在',
			t[_E_UF_ALLOW_VISIT][3]= _$('/input').$0('value',''),'及以上的注册用户访问',_$('/br'),
			_$('/br'),
			
			'发帖权限',_$('/br'),
			t[_E_UF_ALLOW_POST][0]=_$('/input').$0('type','radio','name','uf5834'),'允许本版声望在0及以上的用户发帖 (需要版主前一日访问/操作5次以上 否则只允许声望1及以上用户发帖',_$('/br'),
			//t[_E_UF_ALLOW_POST][1]=_$('/input').$0('type','radio','name','uf5834'),'只',x.forumData.defaultPost,_$('/br'),
			t[_E_UF_ALLOW_POST][2]=_$('/input').$0('type','radio','name','uf5834'),'只允许本版声望在',
			t[_E_UF_ALLOW_POST][3] = _$('/input').$0('value','','onchange',function(){if(parseInt(this.value,10)<1)this.value=1}),'及以上的注册用户发帖',_$('/br'),
			_$('/br'),
			
			'回复权限',_$('/br'),
			t[_E_UF_ALLOW_REPLY][0]=_$('/input').$0('type','radio','name','uf5835'),'允许本版声望在0及以上的用户回复 (需要版主前一日访问/操作5次以上 否则只允许声望1及以上用户回复',_$('/br'),
			//t[_E_UF_ALLOW_REPLY][1]=_$('/input').$0('type','radio','name','uf5835'),'只',x.forumData.defaultPost,_$('/br'),
			t[_E_UF_ALLOW_REPLY][2]=_$('/input').$0('type','radio','name','uf5835'),'只允许本版声望在',
			t[_E_UF_ALLOW_REPLY][3] = _$('/input').$0('value','','onchange',function(){if(parseInt(this.value,10)<1)this.value=1}),'及以上的注册用户回复',_$('/br'),
			_$('/br'),
			
			_$('/button').$0('innerHTML','提交','onclick',function(){
				var a = {}
					a[_NAME]= t[_NAME].value.replace(/^\s+|\s+$/g,''),
					a[_E_UF_DSCP]= t[_E_UF_DSCP].value.replace(/^\s+|\s+$/g,''),
					a[_ADMIN ]= t[_ADMIN].value,
					a[_E_UF_ALLOW_VISIT ]= t[_E_UF_ALLOW_VISIT][0].checked ? 'a' : ( t[_E_UF_ALLOW_VISIT][1].checked ? 'c' : 'b'+t[_E_UF_ALLOW_VISIT][3].value),
					a[_E_UF_ALLOW_POST ]=  t[_E_UF_ALLOW_POST][0].checked ? 'a' : 'b'+t[_E_UF_ALLOW_POST][3].value,
					a[_E_UF_ALLOW_REPLY ]=  t[_E_UF_ALLOW_REPLY][0].checked ? 'a' : 'b'+t[_E_UF_ALLOW_REPLY][3].value
				if(show.checked)
					a.showlink = 1
				if(!a[_NAME] || a[_NAME].length>20)
					return alert('版面名过短或过长')
				if(a[_E_UF_DSCP].length>20)
					return alert('版面说明过长')
				__NUKE.doRequest({
					u:{u:__API._base+'__lib=modify_forum&__act=uf_set&raw=3&fid='+fid,
						a:a
						},
					b:this
					})
				}),
			
			jr=_$('/div'),
			null
			
			)//add


		if(x.joinRequest){
			jr._.add(_$('/br'))
			for(var i in x.joinRequest){
				jr._.add(
					_$('/a').$0('className','b','href','/nuke.php?func=ucp&uid='+x.joinRequest[i][0],'innerHTML',x.joinRequest[i][1]),
					' 申请 ',
					_$('/a').$0('className','b','href','javascript:void(0)','name',x.joinRequest[i][0],'innerHTML','提高声望','onclick',function(e){commonui.setUserRepu(e,fid,this.name)}),
					_$('/br')
					)
				}
			}
		if(x.forumData[_E_UF_ALLOW_VISIT].match(/^xa_f/))
			t[_E_UF_ALLOW_VISIT][0].checked = 'checked'
		else if(x.forumData[_E_UF_ALLOW_VISIT].match(/^u/))
			t[_E_UF_ALLOW_VISIT][1].checked = 'checked'
		else{
			var m = x.forumData[_E_UF_ALLOW_VISIT].match(/r-?\d+_(\d+)/)
			if(!m)m=[1,1]
			t[_E_UF_ALLOW_VISIT][2].checked = 'checked'
			t[_E_UF_ALLOW_VISIT][3].value = m[1]
			}

		if(x.forumData[_E_UF_ALLOW_POST].match(/^xa_r-?\d+_\d+/))
			t[_E_UF_ALLOW_POST][0].checked = 'checked'
		else{
			var m = x.forumData[_E_UF_ALLOW_POST].match(/^r-?\d+_(\d+)/)
			if(!m)m=[1,1]
			t[_E_UF_ALLOW_POST][2].checked = 'checked'
			t[_E_UF_ALLOW_POST][3].value = m[1]
			}
		if(x.forumData[_E_UF_ALLOW_REPLY].match(/^xa_r-?\d+_\d+/))
			t[_E_UF_ALLOW_REPLY][0].checked = 'checked'
		else{
			var m = x.forumData[_E_UF_ALLOW_REPLY].match(/^r-?\d+_(\d+)/)
			if(!m)m=[1,1]
			t[_E_UF_ALLOW_REPLY][2].checked = 'checked'
			t[_E_UF_ALLOW_REPLY][3].value = m[1]
			}
		return true
		}
	})


}//fe



})();