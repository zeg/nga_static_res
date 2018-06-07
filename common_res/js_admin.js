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
 * ��ǰ����
 * @param {type} e
 * @param {type} tid
 * @returns {undefined}
 */
adminui.pushtopic = function(e,tid)
{
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('��ǰ����');
this.w._.addContent(		
	_$('/button').$0('innerHTML','��ǰ����','type','button','onclick',function(){
			__NUKE.doRequest({
				u:__API.topicPush(tid),
				b:this
				})
			}
		),
	_$('/button').$0('innerHTML','�³�����','type','button','onclick',function(){
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
 * �ӷ�
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
	var apinput = "ֻ���жϺû�����Ҫ���Ǿ������<br/><select name='rcvc'><option value='lv01'>���罱</option><option value='lv02'>��ο��</option><option value='lv0'>������</option><option value='lv1'>��</option><option value='lv2'>�ܺ�</option><option value='lv3'>�޺�</option><option value='lv-1' style='background:#fdd'>����</option><option value='lv-2' style='background:#fdd'>�ܲ���</option><option value='lv-3' style='background:#fdd'>�޲���</option></select>";
this.w._.addContent(null)
this.w._.addContent( "\
	<form action='' target='_blank' method='post'>\
	<table>\
		<tr>\
			<td>\
				����\
			</td>\
			<td>\
				"+apinput+"\
			</td>\
		</tr>\
		<tr>\
			<td>\
				����\
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
				<input type='radio' name='pm' value='1' checked='checked'>��\
				<input type='radio' name='pm' value=''>��\
			</td>\
		</tr>\
		<tr>\
			<td>\
				���ӽ�Ǯ\
			</td>\
			<td>\
				<input type='radio' name='addmoney' value='1' checked='checked'>��\
				<input type='radio' name='addmoney' value=''>��\
			</td>\
		</tr>\
		<tr>\
			<td>\
				��������\
			</td>\
			<td>\
				<input type='radio' name='norvrc' value='' checked='checked'>��\
				<input type='radio' name='norvrc' value='1'>��\
			</td>\
		</tr>\
		<tr>\
			<td colspan=2>\
				<input name='submit' value='�ύ' type='submit'> <input value='ȡ��' type='button' onclick='adminui.hide()'><br/>\
				����������һ�����Ӽӷֻ�۷֣����賬��׼�ӷֻ�۷���ʹ�þٱ���ֱ�����糬��\
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
var $ = _$, n, de=function(x){return $('/span','className','silver','innerHTML',x)},rr,rs,ri,rv,ni,rg,rt,rx,
lv = function(v){
	return $('/input').$0('type','radio','name','level','value',v,'onclick',function(){
		rr.checked=(this.value&(16|32|64|128)) ? false :true
		})
	},
sw = function(x){
	if(x){
		rs.style.display=''
		ri.style.display='none'
		on(rr)
		on(rv)
		on(rg)
		}
	else{
		rs.style.display='none'
		ri.style.display=''
		off(rr)
		off(rv)
		if(!__GP.superlesser)
			off(rg,'��ҪSuperlesserȨ��')
		}
	},
on = function(o){
	if(o._x)return
	if(o._c)o.checked = o._c 
	if(o._v)o.value = o._v
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
	o._c = o.checked
	o._v = o.value
	o.checked=o.value=''
	o.disabled=true
	}

this.w._.addTitle('����');


this.w._.addContent(
	$('/span')._.add(
		$('/input').$0('type','radio','name','act','value',131072,'checked',1,'onclick',function(){
			if(this.checked)sw(1)
			}),'���� ',
		$('/input').$0('type','radio','name','act','value',4194304,'onclick',function(){
			if(this.checked)sw()
			}),'�������� ',$('/br'),
		$('/br'),
		rs=$('/span')._.add(
		'��������ֵ',$('/br'),
			$('/table',
				$('/tr',
					$('/td')._.add(
						lv('16'),'15',de('(������) ')
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
						lv('256'),'75',de('(����) ')
						),
					$('/td')._.add(
						lv('512'),'105 '
						)
					),
				$('/tr',
					$('/td')._.add(
						lv('1024'),'150',de('(��) ')
						),
					$('/td')._.add(
						lv('2048'),'225 '
						),
					$('/td')._.add(
						lv('4096'),'300',de('(+��) ')
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
						lv('65536'),'600',de('(˫+��) ')
						)
					)
				)
			),
		ri=$('/input','placeholder','����-1500~1500','value',''),
		$('/br'),$('/br'),
		rv = $('/input').$0('type','checkbox','value','2','checked','1'),' ��������* ',
		$('/br'),
		rg = $('/input').$0('type','checkbox','value','1','checked','1'),' ����/�۳���Ǯ** ',
		$('/br'),
		rr = $('/input').$0('type','checkbox','value','8'),' ������뾫���� ',
		$('/br'),
		pid ? [rt = $('/input').$0('type','checkbox','value','8388608'),' ���ӻظ����Ƽ�ֵ ',
		$('/br')] : null,
		rx = $('/input').$0('type','checkbox','value','4','checked','1'),' �����߷���PM ',
		$('/br'),
		ni = $('/input').$0('type','text','placeholder','�ӷ�˵��','value',''),
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
				var x = this.parentNode.getElementsByTagName('input'),opt=0
				for (var i=0;i<x.length;i++){
					if (x[i].checked) opt |= x[i].value
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
		de('* 150������1����<br/>** 100������1��� �ۼ�����ʱ���Կ۳���Ǯ<br/><br/>'),n = de('')
		)
	)
ri.style.display='none'
this.w._.show(e)
if(!__GP.greater){
	off(rv,'��ҪModeratorȨ��',1)
	off(rg,'��ҪModeratorȨ��',1)
	}
// Restore tip settings from userCache, if any.
var lto = commonui.userCache.get('lastTipOpt')|0
if (lto) {
	var lti = commonui.userCache.get('lastTipInfo'), lta = commonui.userCache.get('lastTipAmt'), x = rs.parentNode.getElementsByTagName('input')
	for (var i=0;i<x.length;i++){
		if (x[i].type=='checkbox' || x[i].type=='radio') {
			x[i].checked = (lto & x[i].value)==x[i].value;
			if(x[i].value==131072 && x[i].checked)
				sw(1)
			else if(x[i].value==4194304 && x[i].checked)
				sw()
			}
		}
	ni._.on('focus',function(){if(!this.value && lti)this.value = lti})
	ri._.on('focus',function(){if(!this.value && lta)this.value = lta})
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
			if(!x.match(/���¼ӷֶ��ʣ��/)){
				off(rv,'��Ҫ��������ʽ����',1)
				off(rg,'��Ҫ��������ʽ����',1)
				}
			n.innerHTML = x
			}
		}
	})

}
//fe

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
		$('/option').$0('value','','innerHTML','��'),
		$('/option').$0('value',2,'innerHTML','��Ǯ'),
		$('/option').$0('value',1,'innerHTML','����'),
		$('/option').$0('value',3,'innerHTML','����'),
		$('/option').$0('value',4,'innerHTML','����'),
		$('/option').$0('value',5,'innerHTML','����'),
		'onchange',function(){
			this.nextSibling.innerHTML = ''
			switch(parseInt(this.value)){
				case 2:
					this.nextSibling._.add(
						ii('���',5),
						ii('����',5),
						ii('ͭ��',5),
						$('/a','innerHTML',' ? ','href','javascript:void(0)','target','_blank','onclick',
							function(e){
								alert('1���=100���� 1����=100ͭ��')
								})
						)
					break
				case 1:
					this.nextSibling._.add(
						ii('���',5),
						ii('����',5),
						ii('����',5),
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
						ii('����ID',11),
						ii('����ֵ',5),
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
						ii('����ֵ(��ʾֵ)',5)
						)
					break
				case 5:
					this.nextSibling._.add(
						ii('���˵��',11)
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
	$('/input','name',n,'placeholder','�û�UID','size',11),
	' \u00A0 ��ȡ',
	sl(),
	' \u00A0 ����',
	sl(1),
	' \u00A0 ',
	ii('��Ŀ�������ID',11),
	$('/a','innerHTML',' ? ','href','about:blank','target','_blank','onclick',
		function(e){
			if(!this.previousSibling.value)
				return commonui.cancelEvent(e)
			this.href='/read.php?tid='+this.previousSibling.value
			}),
	ii('��Ŀ����˵��',20),
	$('/br')
	)
}//fe


this.w._.addTitle('����/��ȡ');




this.w._.addContent(
	$('/span')._.add(
		dv(),
		$('/br'),
		$('/button').$0('innerHTML','����һ��','type','button','onclick',function(){
				this.parentNode.insertBefore(
					dv(),
					this.previousSibling
					)
				}
			),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
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
 * �ö�����
 * @param {type} e
 * @param {type} tid
 * @returns {undefined}
 */
adminui.toptopic = function (e,tid)
{

this.createadminwindow()
this.w._.addContent(null)
var $ = _$, t = this.txt, v=this.getValue, de=null,tid = tid
this.w._.addTitle('�����ö�');

this.w._.addContent(
	$('/form').$0(
		$('/input').$0('type','radio','name','level','value','0'),t(' ���'),
		$('/br'),
		$('/br'),
		$('/input').$0('type','radio','name','level','value','9'),t(' ������ֱ����ʾ'),
		$('/br'),
		t('�� �������� ��ʾ�ڰ�ͷ'),
		$('/br'),
		$('/br'),
		$('/input').$0('type','radio','name','level','value','1'),t(' ��ͨ�ö�'),
		$('/br'),
		t('������ı�����ʾ�ڰ�ͷ�²�'),
		$('/br'),
		t('�޸�ʱ�������һ����ͨ�ö������һ����ʾ�ڰ����һҳ'),
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
				var f = this.parentNode.getElementsByTagName('input'),level=0
				for(var i=0;i<f.length;i++){
					if(f[i].checked)
						level= f[i].value
					}
				__NUKE.doRequest({
					u:__API.topicTop(tid,level),
					b:this
					})
				}
			)
		)
	)
this.w._.show(e)
}
//fe
/**
 * �ö�����
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

this.w._.addTitle('ˢ����Դ��ַ');

this.w._.addContent(
	x,
	$('/br'),
	$('/br'),
	$('/button').$0('innerHTML','�ύ','type','button','onclick',function(){
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
				f:function(d){alert((d.error && d.error[0] ? d.error[0] : d.data[0])+' ��ˢ��ҳ��');location.reload()}
				})
			}
		)
	)
this.w._.show()
	

}
//fe

/**
 * ������ɫ
 * @param {type} e
 * @param {type} tid
 * @returns {undefined}
 */
adminui.colortopic = function (e,tid)
{
this.createadminwindow()
this.w._.addContent(null)
var $ = _$, t = this.txt, v=this.getValue, de=null,tid = tid
this.w._.addTitle('�ı��������');

this.w._.addContent(
	$('/div')._.add(
		$('/input').$0('type','checkbox','name','fontB','value','B'),t(' ����'),
		$('/br'),
		$('/input').$0('type','checkbox','name','fontI','value','I'),t(' б��'),
		$('/br'),
		$('/input').$0('type','checkbox','name','fontU','value','U'),t('�»���'),
		$('/br'),$('/br'),
		$('/input').$0('type','radio','name','color','value','red'),$('/span').$0('class','red','innerHTML',' ��ɫ'),
		$('/br'),
		$('/input').$0('type','radio','name','color','value','blue'),$('/span').$0('class','blue','innerHTML',' ��ɫ'),
		$('/br'),
		$('/input').$0('type','radio','name','color','value','green'),$('/span').$0('class','green','innerHTML',' ��ɫ'),
		$('/br'),
		$('/input').$0('type','radio','name','color','value','orange'),$('/span').$0('class','orange','innerHTML',' ��ɫ'),
		$('/br'),
		$('/input').$0('type','radio','name','color','value','silver'),$('/span').$0('class','silver','innerHTML',' ��ɫ'),
		$('/br'),
		$('/input').$0('type','radio','name','color','value',''),t(' ��'),
		$('/br'),
		$('/input','type','checkbox','name','nr','checked','checked'),' ͬʱ�ı�������Ƽ�ֵ ',
		$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
				var f = this.parentNode.getElementsByTagName('input'),set=''
				for(var i=0;i<f.length-1;i++){
					if(f[i].checked)
						set+=','+f[i].value
					}
				__NUKE.doRequest({
					u:__API.topicColor(tid,set,f[i].checked?'':1),
					b:this
					})
				}
			)
		)
	)
this.w._.show(e)

}
//fe


/**
 * ������������
 * @param {type} e
 * @param {type} fid
 * @returns {undefined}
 */
adminui.reputationLevel = function (e,fid)
{
this.createadminwindow()
this.w._.addContent(null)
var $ = _$, level;
this.w._.addTitle('��������');
this.w._.addContent(
	'�û�����������ͬ��ʾΪ��ͬ�ĵȼ�',
	$('/br'),
	'��������ȼ����ƺʹ˵ȼ��������������(�û�������-21000~21000֮��)',
	$('/br'),
	'�ȼ����16 byte(8������) ��ȳ���4�����ֿ����ڽ�С����ʾ�����޷���ȫ��ʾ',
	$('/br'),
	'ÿ��һ�� �������ܳ���30�� �޸ĺ���ܲ���������Ч(����)',
	$('/br'),
	'����:',
	$('/br'),
	$('/span').$0('className','gray')._.add(
		'���� -21000',
		$('/br'),
		'�ϲ� 0',
		$('/br'),
		'ǿ�� 10000',
		$('/br'),
		'����ǿ�� 20000'
		),
	$('/br'),
	'��Ϊ ����-21000~-1Ϊ���� 0~9999Ϊ�ϲ� 10000~19999Ϊǿ�� 20000����Ϊ����ǿ��',
	$('/br'),
	$('/br'),
	level = $('/textarea').$0('name','level','rows','10','cols','30'),
	$('/br'),
	$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
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
 * ��������
 * @param {type} e
 * @param {type} tid
 * @returns {undefined}
 */
adminui.digesttopic = function (e,tid)
{
this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent("\
<div><div><div>\
	<form action='' target='_blank' method='post'>\
	<table>\
		<tr>\
			<td>\
				����\
			</td>\
			<td>\
				<input type='radio' name='digest' value='0' checked>ȡ��\
				<input type='radio' name='digest' value='1' >����1\
				<input type='radio' name='digest' value='2' >����2\
			</td>\
		</tr>\
		<tr>\
			<td>\
				PM\
			</td>\
			<td>\
				<input type='radio' name='pm' value='1'>��\
				<input type='radio' name='pm' value='0' checked='checked'>��\
			</td>\
		</tr>\
		<tr>\
			<td colspan=2>\
				<input name='submit' value='�ύ' type='submit'> <input value='ȡ��' type='button' onclick='adminui.hide()'>\
			</td>\
		</tr>\
	</table>\
	</form>\
	<iframe name='adminwindowiframe' id='adminwindowiframe' frameBorder=0 scrolling='no' allowtransparency='true' src='about:blank' style='height:50px;width:200px;border:none;overflow:hidden'></iframe>\
</div></div></div>\
")
this.w._.show(e)
this.w.getElementsByTagName('form')[0].action = 'nuke.php?func=digesttopic&tid='+tid;
this.w.getElementsByTagName('form')[0].target = 'adminwindowiframe';
}
//fe


/**
 * ɾ��/�ƶ�/����
 * @param {type} e
 * @param {type} tid
 * @param {type} op
 * @returns {undefined}
 */
adminui.movetopic = function (e,tid,tf,op)
{
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('ɾ��/�ƶ�/���� '+(tid?'':'ѡ�е�')+'����');

var self = this,$ = _$, fid='', stid='', info,infoss,tff, pm, de, sl, am, aq, an, af, ad, ao, ap, cl = function(e,h){
	fid = h[0]
	if(h[5]){
		stid = h[5]
		sl.innerHTML = '�� > '+h[6]
		}
	else{
		stid = ''
		sl.innerHTML = '�� > '+h[1]
		}
	commonui.adminwindow._.hide(e)
	commonui.cancelEvent(e)
	return false
	},
icl = function(f,s){
	if(f){
		stid=''
		fid = f
		sl.innerHTML = '�� > FID:'+f
		}
	else if(s){
		fid=''
		stid=s
		sl.innerHTML = '�� > STID:'+s
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
		de = $('/select').$0($('/option').$0('value','','innerHTML','����'),$('/option').$0('value',30,'innerHTML','30���')),
		$('/br'),$('/br'),
		am = $('/input').$0('type','radio','name','action','onchange',oc),'�ƶ� ',
		ab = $('/input').$0('type','radio','name','action','onchange',oc),'�ƶ�(����ǰ) ',
		ad = $('/input').$0('type','radio','name','action','value','ad','onchange',oc),'ɾ�� ',
		$('/br'),
		ao = $('/input').$0('type','radio','name','action','value','ao','onchange',oc),'�Ƴ��ϼ� ',
		ap = $('/input').$0('type','radio','name','action','value','ap','onchange',oc),'�ϼ������������Ƴ��� ',
		$('/br'),
		aq = $('/input').$0('type','radio','name','action','title','����һ�����½��������� �뱾���Ᵽ��ͬ��','onchange',oc),'���� ',
		af = $('/input').$0('type','radio','name','action','title','�������ƶ�����һ���� �ڱ����½�����','onchange',oc),'������',
		an = $('/input').$0('type','radio','name','action','title','����һ�����½��������� ���뱾���Ᵽ��ͬ��','onchange',oc),'����(��ͬ��) ',
		$('/br'),$('/br'),
		sl = $('/button').$0('innerHTML','��...','onclick',function(e){
			var c = commonui,hs
			c.createadminwindow()
			c.adminwindow._.addContent(null)
			c.adminwindow._.addContent(
				$('/input').$0('value','����ID','name','no','maxlength','20','onfocus',function(){if(!this.name)return;this.name='',this.value=''},'onchange',function(){icl(this.value);c.adminwindow._.hide()}),$('/br'),
				$('/input').$0('value','�����⼯��ID','name','no','maxlength','20','onfocus',function(){if(!this.name)return;this.name='',this.value=''},'onchange',function(){icl(0,this.value);c.adminwindow._.hide()}),$('/br'),hs=$('/span')
				)
			c.adminwindow._.show(e)
			c.genHisLink(hs,cl) 
			}),
		//$('/br'),$('/br'),
		//$('/input').$0('type','checkbox','name','tag'),t(' ��ԭ�汣��һ������'),
		$('/br'),$('/br'),
		info = $('/input').$0('placeholder','����˵��','value',commonui.lessernuke['info_'+tid+'_0']?commonui.lessernuke['info_'+tid+'_0']:'','maxlength','20','onchange',function(){if(this.value)pm.checked='checked'}),
		tf ? $('/span')._.add(
			$('/br'),
			infoss = $('/select').$0($('/option').$0('innerHTML','Ԥ��˵��','style',{color:'silver'}), 'onchange',function(){if(this.selectedIndex)this.parentNode.previousSibling.value+=' '+this.options[this.selectedIndex].innerHTML;pm.checked='checked'}),
			$('/button').$0('innerHTML','�༭','type','button','onclick',function(e){commonui.editRule(e,tf)})
			) :null,
		$('/br'),$('/br'),
		pm = $('/input').$0('type','checkbox'),' ͬʱ��˵�����͸��û�',
		$('/br'),$('/br'),
		$('/button').$0('innerHTML','ȷ��','type','button','onclick',function(){
				if(!tid){
					var tids = commonui.massAdmin.getChecked()
					if(!tids)return
					}
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
					if(!confirm("��ȷ��Ҫ���ϼ��ڵ���������������"))
						return
					op = 16
					}
				var iv = info.value.replace(/^\s+|\s+$/g,'')
				if(ad.checked && !iv)
					return alert("��Ҫ����˵��")
				__NUKE.doRequest({
					u:__API.topicMove2(
						tid ? tid : tids, 
						fid, 
						pm.checked ? 1 : '', 
						iv, 
						op, 
						de.value, stid
						),
					b:this
					})
				}
			)
		)
	)
		
for (var i=0.5;i<24;i+=0.5)
	de.$0($('/option').$0('value',i*3600,'innerHTML',i+"Сʱ��"))

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

	_$('/button')._.attr({innerHTML:'ͬ��auto_del_match��new_post_ip_filter',type:'button'})._.on('click',function(){
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
 * �������û���������
 * @param {type} e
 * @param {type} fid
 * @returns {undefined}
 */
adminui.setNewUserPostLimit = function(e,fid){
var y
this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent(
	"��ע���û���ע��",
	y = _$('/select').$0(
		_$('/option').$0('value','','innerHTML','ȫ��Ĭ��'),
		_$('/option').$0('value','48','innerHTML','48Сʱ'),
		_$('/option').$0('value','24','innerHTML','24Сʱ'),
		_$('/option').$0('value','12','innerHTML','12Сʱ'),
		_$('/option').$0('value','6','innerHTML','6Сʱ'),
		_$('/option').$0('value','1','innerHTML','1Сʱ'),
		_$('/option').$0('value','0.01','innerHTML','�����')
		),
	"������ڱ��淢��",
	_$('/br'),
	_$('/button')._.attr({innerHTML:'ȷ��',type:'button'})._.on('click',function(){
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
,  _MODE_MUTE = 8 //����
,  _MODE_DELPOST = 16 //ɾ��
,  _MODE_ANONC = 32 //��������
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
	'UID ���� �ո� ���ŷָ�',$('/br'),
	mass = $('/textarea').$0('value',uid,'disabled',__GP.admin?0:1),$('/br'),$('/br')
	),

info = $('/input','placeholder','������¼�е�˵��','size',20), isls=$('/select',$('/option','innerHTML','Ԥ��˵��','style',{color:'silver'}), 'onchange',function(){if(this.selectedIndex)this.previousSibling.value+=' '+this.value}), $('/button','innerHTML','�༭','type','button','onclick',function(e){commonui.editRule(e,11)}), $('/br'),
//infos = $('/input','placeholder','����˵��(���͸��û�)','value','','maxlength',20), isl=$('/select',$('/option','innerHTML','Ԥ��˵��','style',{color:'silver'}), 'onchange',function(){if(this.selectedIndex)this.previousSibling.value+=' '+this.value}), $('/br'),
$('/br'),		
'��ʱ��󷢲���������ظ�����ɾ��(�ظ����ɾ��200��)',range = $('/input').$0('value','24','type','hidden'),$('/br'),
a(['��ɾ��|0','1Сʱǰ|1','3Сʱǰ|3','6Сʱǰ|6','12Сʱǰ|12','24Сʱǰ|24|1','72Сʱǰ|72','1��ǰ|168',(__GP.admin ? 'ɾ��1000��|1000' : null)],range,3,1),$('/br'),
$('/br'),

'NUKE����',type = $('/input').$0('value',_MODE_NUKE,'type','hidden'),$('/br'),
a(['��ͨNUKE|'+_MODE_NUKE+'|1',
	'�����˺�(����/���/ֻ���˹�����)|'+_MODE_LOCK,
	'�޲���|0',
	'�����˺�(����/������������ɽ���)|'+_MODE_LOCK_3,
	'ȡ������|'+_MODE_UNACTIVE,
//	'����1000��|'+_MODE_MUTE,
	'�޲���|0',
	'�����˺�(���ܱ���/�޸�����ɽ���)|'+_MODE_LOCK_4,
	'�޲���|0',
	'�޲���|0',
	'�����˺�(������/���ר���˺�/���ܽ���)|'+_MODE_LOCK_5],type,3,1),$('/br'),
$('/br'),
	
mute = $('/input').$0('type','checkbox','checked',1),'��������30��',$('/br'),
//anonc = $('/input').$0('type','checkbox'),'��������',$('/br'),
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
			f:function(d){//����.error����ʾ.error ������ʾ.data
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
	$('/button').$0('innerHTML','�������','onclick',function(){
		__NUKE.doRequest({
			u:{u:__API._base+'__lib=nuke&__act=reactive&raw=3',
				a:{uid:uid,clear:(0 | (this.nextSibling.checked?1:0) | (this.nextSibling.nextSibling.nextSibling.checked?2:0))}
				},
			b:this
			})
		}), 
	$('/input').$0('type','checkbox'),
	$('/span')._.add('��Ǯ��0 '),
	$('/input').$0('type','checkbox'),
	'������0'
	) : ''),*/
(uid && (__GP.userBit & 1024) ? $('/span')._.add(
	$('/br'),
	$('/br'),
	$('/button').$0('innerHTML','���ͽ����޸������PM','onclick',function(){
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
this.w._.addTitle('��ӱ�ע')
this.w._.addContent($('/span')._.add(
	'��ע��ݻ��¼�����������Ϣ�����������ο�',$('/br'),
	'��ֹ���������Ϣ',$('/br'),
	'��ӱ�ע�ڻ�����ں���Ч',$('/br'),
	__GP.super ? [ma = $('/textarea','placeholder',uid,'onclick',function(){this.placeholder='��������uid ���� �ո� ���ŷָ�'}),$('/br')]:null,
	re = $('/input','placeholder','��ע��Ϣ','size',20),$('/br'),
	__GP.admin ? [op = $('/input','type','checkbox'),'�����û��ɼ�',$('/br')]: null,
	$('/button','innerHTML','�ύ','onclick',function(){
		var uids=[],v = re.value, w = ''
		v.replace(/(?:&|\?)(tid|pid)=(\d+)/g,function($0,$1,$2){w+='['+$1+']'+$2+'[/'+$1+']';return $0})
		if(w)v=w
		if(!v)
			return
		if(v.match(/\.(jpg|jpeg|gif|png)$/))
			return alert('�������� ')
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
 * �������ӿڲ���
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
		' ���л��滻Ϊ�ո�',
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
	f:function(d){//����.error����ʾ.error ������ʾ.data

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
						f:function(d){//����.error����ʾ.error ������ʾ.data
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


/**
 * ��������
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

var _fid,t={71:{}},_NAME = 70,
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

_B_FREE_EDIT = 16,
_B_DISPLAY_ATTACH = 1024,
_B_SHOW_SUB = 2048,
_B_IF_CAT = 4096,
_B_NO_INHERIT_MOD=16384,
_B_NAV_HIDDEN=32768,
_B_TID_ORDER = 131072,
_B_NAV_IGNORE = 262144,
_B_TOPIC_HIDDEN = 524288

__NUKE.doRequest({
	u:__API._base+'__lib=modify_forum&__act=get&raw=1&fid='+fid,
	f:function(d){//����.error����ʾ.error ������ʾ.data

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

		var y ={}
		
		for(var k in x.allForumTree){
			var z = x.allForumTree[k]
			y[z.stid ? z.stid+'_'+z.fup : z.fid] = _$('/div',
				'title',z.fup?z.fup:'',
				'style',{marginLeft:'1em'},
				_$('/a','title',z.stid?'':z.fid,'href',z.stid?'/thread.php?stid='+z.stid:'/thread.php?fid='+z.fid,'innerHTML',(z.stid?'S'+z.stid : z.fid)+' : '+z.name,'onclick',function(e){if(this.title)adminui.modifyForum(null,this.title);commonui.cancelEvent(e)}),
				_$('/a','href','javascript:void(0)','innerHTML','&#8854;','style','marginLeft:0.5em','onclick',function(e){
					var x = this.parentNode.childNodes
					if(this._m){
						this._m=0
						this.innerHTML = '&#8854;'
						for(var i=0;i<x.length;i++)
							if(x[i].nodeName=='DIV')
								x[i].style.display=''
						}
					else{
						this._m=1
						this.innerHTML = '&#8853;'
						for(var i=0;i<x.length;i++)
							if(x[i].nodeName=='DIV')
								x[i].style.display='none'
						}
					})
				)
			}
		for(var k in y){
			if(y[k].title){
				if(!y[y[k].title])
					y[y[k].title] = _$('/div').$0(
						'style',{marginLeft:'1em'},
						_$('/a').$0('title',y[k].title,'href','/thread.php?fid='+y[k].title,'innerHTML',y[k].title+' : ','onclick',function(){adminui.modifyForum(null,this.title)})
						)
				y[y[k].title]._.add(y[k])
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
		for(var k in y){
			if(!y[k].title)
				tre._.add(y[k].$0(
						'style',{marginLeft:'0'}))
			}

		var y=function(k){return (x.forumData[k]===undefined)?'':x.forumData[k].toString()}
		fc._.add(
			'����FID(����Ϊ����°���',_$('/br'),
			_fid = _$('/input').$0('value',fid),_$('/br'),
			_$('/br'),
			
			'������',_$('/br'),
			t[_NAME] = _$('/input').$0('value',y(_NAME)),_$('/br'),
			_$('/br'),
			
			'����˵��(��ʾ��',_$('/br'),
			t[_DSCP] = _$('/textarea').$0('value',y(_DSCP),'style',{width:'25em',height:'5em'}),_$('/br'),
			_$('/br'),
			
			'����˵��(SOE',_$('/br'),
			t[_E_HTML_DSCP] = _$('/textarea').$0('value',y(_E_HTML_DSCP),'style',{width:'25em',height:'5em'}),_$('/br'),
			_$('/br'),
			
			'����ؼ���(SOE',_$('/br'),
			t[_E_HTML_KEY] = _$('/textarea').$0('value',y(_E_HTML_KEY),'style',{width:'25em',height:'5em'}),_$('/br'),
			_$('/br'),

			'������ת��ַ',_$('/br'),
			t[_JUMP] = _$('/input').$0('value',y(_JUMP)),_$('/br'),
			_$('/br'),
			
			'����Ȩ��(INT С����ǰ',_$('/br'),
			t[_SUB_ORDER] = _$('/input').$0('value',y(_SUB_ORDER)),_$('/br'),
			_$('/br'),
			
			'������FID',_$('/br'),
			t[_PARENT_FID] = _$('/input').$0('value',y(_PARENT_FID)),_$('/br'),
			_$('/br'),

			'��������ID(����ö��ŷָ� 0Ϊ�½����� ����ʹ�ð�����',_$('/br'),
			t[_REPU] = _$('/input').$0('value',y(_REPU)),_$('/br'),
			_$('/br'),
			
			'�ϲ���ʾ�İ���FID(����ö��ŷָ� ǰ��xĬ�ϲ���ʾ',_$('/br'),
			t[_UNION] = _$('/input').$0('value',y(_UNION)),_$('/br'),
			_$('/br'),
			
			'������UID(�����������ڰ����б��з��ɴ��û��������ù���',_$('/br'),
			t[_E_OWNER_UID] = _$('/input').$0('value',y(_E_OWNER_UID)),_$('/br'),
			_$('/br'),
			
			'����UID*(ÿ��һ��',_$('/br'),
			t[_ADMIN] = _$('/textarea').$0('value',y(_ADMIN).replace(/,/g,'\n'),'style',{width:'25em',height:'20em'}),_$('/br'),
			_$('/textarea').$0(
				'style',{width:'25em',height:'20em'},
				'disabled','disabled',
				'value',(function(){var y='';for(var k in x.adminName)y+=k+' '+x.adminName[k]+'\n';return y})()
				),_$('/br'),
			_$('/br'),
			
			'����Ȩ��*(i Ϊ�̳��ϲ��������',_$('/br'),
			'�����ο�lib_privilege::format_str_to_ary',_$('/br'),
			t[_ALLOW_VISIT] = _$('/input').$0('value',y(_ALLOW_VISIT)),_$('/br'),
			_$('/br'),
			
			'����Ȩ��*(ͬ��',_$('/br'),
			'+w,+u1,',t[_ALLOW_POST] = _$('/input').$0('value',y(_ALLOW_POST)),_$('/br'),
			_$('/br'),
			
			'�ظ�Ȩ��*(ͬ��',_$('/br'),
			'+w,+u1,',t[_ALLOW_REPLY] = _$('/input').$0('value',y(_ALLOW_REPLY)),_$('/br'),
			_$('/br'),
			
			'��ʾ�Ӱ���',_$('/br'),
			t[_BIT][_B_SHOW_SUB] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_SHOW_SUB?1:null),_$('/br'),
			_$('/br'),

			'��һ�������(����������ʹ�� ������ʾ ���ܷ���',_$('/br'),
			t[_BIT][_B_IF_CAT] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_IF_CAT?1:null),_$('/br'),
			_$('/br'),

			'���ڵ����˵�����ʾ',_$('/br'),
			t[_BIT][_B_NAV_IGNORE] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_NAV_IGNORE?1:null),_$('/br'),
			_$('/br'),
			
			'���̳а���Ȩ��',_$('/br'),
			t[_BIT][_B_NO_INHERIT_MOD] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_NO_INHERIT_MOD?1:null),_$('/br'),
			_$('/br'),
			
			'�ڵ�����������',_$('/br'),
			t[_BIT][_B_NAV_HIDDEN] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_NAV_HIDDEN?1:null),_$('/br'),
			_$('/br'),
			
			'�༭���ⲻ��ʱ������',_$('/br'),
			t[_BIT][_B_FREE_EDIT] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_FREE_EDIT?1:null),_$('/br'),
			_$('/br'),
			
			'���б�����ʾ����ͼ',_$('/br'),
			t[_BIT][_B_DISPLAY_ATTACH] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_DISPLAY_ATTACH?1:null),_$('/br'),
			_$('/br'),

			'�������Զ�����',_$('/br'),
			t[_BIT][_B_TOPIC_HIDDEN] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_TOPIC_HIDDEN?1:null),_$('/br'),
			_$('/br'),

			'Ĭ��TID����',_$('/br'),
			t[_BIT][_B_TID_ORDER] = _$('/input').$0('type', 'checkbox', 'checked', x.forumData[_BIT]&_B_TID_ORDER?1:null),_$('/br'),
			_$('/br'),

			_$('/button').$0('innerHTML','�ύ','onclick',function(){
				if(!_fid.value && !confirm('δ����FID���ᴴ���°���'))
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
 * �û���������
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

var _fid,show,t={71:{},8:{},9:{},10:{}},_NAME = 70,
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

_B_FREE_EDIT = 16,
_B_DISPLAY_ATTACH = 1024,
_B_SHOW_SUB = 2048,
_B_IF_CAT = 4096

__NUKE.doRequest({
	u:__API._base+'__lib=modify_forum&__act=get&uf=1&raw=1&fid='+fid,
	f:function(d){//����.error����ʾ.error ������ʾ.data

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
			'����FID',_$('/br'),
			_fid = _$('/input').$0('value',fid,'disabled',1),_$('/br'),
			_$('/br'),
			
			'������',_$('/br'),
			t[_NAME] = _$('/input').$0('value',y(_NAME)),_$('/br'),
			_$('/br'),
			
			'����˵��(��ʾ��',_$('/br'),
			t[_DSCP] = _$('/input').$0('value',y(_DSCP)),_$('/br'),
			_$('/br'),
			
			'�ڰ��������ߵķ�����Ϣ����ʾ����',_$('/br'),
			show = _$('/input').$0('type','checkbox','checked',x.showlink?1:''),_$('/br'),
			_$('/br'),

			'����UID���û���(ÿ��һ��',_$('/br'),
			t[_ADMIN] = _$('/textarea').$0('value',y(_ADMIN).replace(/,/g,'\n'),'style',{width:'25em',height:'20em'}),_$('/br'),
			_$('/textarea').$0(
				'style',{width:'25em',height:'20em'},
				'disabled','disabled',
				'value',(function(){var y='';for(var k in x.adminName)y+=k+' '+x.adminName[k]+'\n';return y})()
				),_$('/br'),
			_$('/br'),
			
			'����Ȩ��',_$('/br'),
			t[_E_UF_ALLOW_VISIT][0]=_$('/input').$0('type','radio','name','uf5833'),'����δע���û����� (��Ҫ����ǰһ�շ���/����5������ ����ֻ����ע���û�����',_$('/br'),
			t[_E_UF_ALLOW_VISIT][1]=_$('/input').$0('type','radio','name','uf5833'),'ֻ����ע���û�����',_$('/br'),
			t[_E_UF_ALLOW_VISIT][2]=_$('/input').$0('type','radio','name','uf5833'),'ֻ������������',
			t[_E_UF_ALLOW_VISIT][3]= _$('/input').$0('value',''),'�����ϵ�ע���û�����',_$('/br'),
			_$('/br'),
			
			'����Ȩ��',_$('/br'),
			t[_E_UF_ALLOW_POST][0]=_$('/input').$0('type','radio','name','uf5834'),'������������0�����ϵ��û����� (��Ҫ����ǰһ�շ���/����5������ ����ֻ��������1�������û�����',_$('/br'),
			//t[_E_UF_ALLOW_POST][1]=_$('/input').$0('type','radio','name','uf5834'),'ֻ',x.forumData.defaultPost,_$('/br'),
			t[_E_UF_ALLOW_POST][2]=_$('/input').$0('type','radio','name','uf5834'),'ֻ������������',
			t[_E_UF_ALLOW_POST][3] = _$('/input').$0('value','','onchange',function(){if(parseInt(this.value,10)<1)this.value=1}),'�����ϵ�ע���û�����',_$('/br'),
			_$('/br'),
			
			'�ظ�Ȩ��',_$('/br'),
			t[_E_UF_ALLOW_REPLY][0]=_$('/input').$0('type','radio','name','uf5835'),'������������0�����ϵ��û��ظ� (��Ҫ����ǰһ�շ���/����5������ ����ֻ��������1�������û��ظ�',_$('/br'),
			//t[_E_UF_ALLOW_REPLY][1]=_$('/input').$0('type','radio','name','uf5835'),'ֻ',x.forumData.defaultPost,_$('/br'),
			t[_E_UF_ALLOW_REPLY][2]=_$('/input').$0('type','radio','name','uf5835'),'ֻ������������',
			t[_E_UF_ALLOW_REPLY][3] = _$('/input').$0('value','','onchange',function(){if(parseInt(this.value,10)<1)this.value=1}),'�����ϵ�ע���û��ظ�',_$('/br'),
			_$('/br'),
			
			_$('/button').$0('innerHTML','�ύ','onclick',function(){
				var a = {}
					a[_NAME]= t[_NAME].value.replace(/^\s+|\s+$/g,''),
					a[_DSCP]= t[_DSCP].value.replace(/^\s+|\s+$/g,''),
					a[_ADMIN ]= t[_ADMIN].value,
					a[_E_UF_ALLOW_VISIT ]= t[_E_UF_ALLOW_VISIT][0].checked ? 'a' : ( t[_E_UF_ALLOW_VISIT][1].checked ? 'c' : 'b'+t[_E_UF_ALLOW_VISIT][3].value),
					a[_E_UF_ALLOW_POST ]=  t[_E_UF_ALLOW_POST][0].checked ? 'a' : 'b'+t[_E_UF_ALLOW_POST][3].value,
					a[_E_UF_ALLOW_REPLY ]=  t[_E_UF_ALLOW_REPLY][0].checked ? 'a' : 'b'+t[_E_UF_ALLOW_REPLY][3].value
				if(show.checked)
					a.showlink = 1
				if(!a[_NAME] || a[_NAME].length>20)
					return alert('���������̻����')
				if(a[_DSCP].length>20)
					return alert('����˵������')
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
					' ���� ',
					_$('/a').$0('className','b','href','javascript:void(0)','name',x.joinRequest[i][0],'innerHTML','�������','onclick',function(e){commonui.setUserRepu(e,fid,this.name)}),
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


adminui.setSets = function(e,fid){
	
if(!fid)fid=0;

var $=_$,w = $('/span'),f,s
this.createadminwindow()
this.w._.addTitle('�Ӱ����б�����')
this.w._.addContent(null)
this.w._.addContent(w)

__NUKE.doRequest({
	u:__API._base+'__lib=modify_forum&__act=get_sub_list&raw=1&fid='+fid,
	f:function(d){//����.error����ʾ.error ������ʾ.data

		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		var d =  d.data,x={}

		d[1] = d[1] ? (d[1]+'').replace(/(?:^|\n)(\d+)\s+(.+)/g,function($0,$1,$2){x[$1]=$2;return $0}) : ''
		d[0] = d[0] ? (d[0]+'').replace(/[^\d]?(\d+)[^\d]?/g,function($0,$1){return $1+' '+x[$1]+'\n'}) : ''
		//w._.add($('/textarea').$0('disabled','1','value',d[1],'style','width:22em;height:7em'),$('/br'),$('/br'))
		w._.add(s = $('/textarea').$0('value',d[0],'style','width:22em;height:7em'),$('/br'),$('/br'))
		w._.add('����ϼ������tid',$('/br'),'���񵽺ϼ�����������ľ�������tid',$('/br'),'ÿ��һ�� ����˳����ʾ���Ӱ����б���')
		
		w._.add(	$('/br'),	$('/br'),  $('/button').$0('innerHTML','�ύ','onclick',function(){
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

}//fe

/**
��ʱ�ؼ��ּ��
 */
adminui.setFilter = function(e,fid,opt){

if(!fid)fid=0;
if(!opt)opt=1;

__NUKE.doRequest({
	u:__API._base+'__lib=filter&__act=get&opt='+opt+'&raw=1&fid='+fid,
	f:function(d){//����.error����ʾ.error ������ʾ.data

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
ȫ�ֹؼ��ּ��
 */
adminui.setFilterG = function(){

__NUKE.doRequest({
	u:__API._base+'__lib=filter&__act=get_perpost&raw=1',
	f:function(d){//����.error����ʾ.error ������ʾ.data

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
 * �ؼ��ʹ������� ��
 * @param {type} e
 * @param {type} fid
 * @returns {undefined}

adminui.setLogword = function(e,fid){
if(!fid && !__GP.ubStaff)
	return
var keys,$=_$
this.createadminwindow()
this.w._.addContent(null)
this.w._.addContent(
	$('/span')._.add(
		'����ؼ���(2~20�ֽ�) �ո���зָ�',
		$('/br'),
		fid ? '���50�� �йؼ��ʳ��ֵ����ӽ��б�� �������ڼ��Ӽ�¼��' : '���10�� ��ȫ�ֹؼ��ʳ��ֵ����ӻᷢ��������ȫ��staffȨ����',
		$('/br'),
		keys = $('/textarea'),
		$('/br'),
		$('/button').$0('innerHTML','�ύ','onclick',function(){
			var k = keys.value.replace(/^\s+|\s+$/g,'')
			if(k==='')
				return
			__NUKE.doRequest({
				u:{u:__API._base+'__lib=log_post&__act=set&fid='+fid,
					a:{key:k,raw:3}
					},
				b:this
				})
			})
		//__GP.staff ? $('/a').$0('innerHTML','[����ȫ�ּ��ӹؼ���]','href','javascript:void(0)','className','b','onclick',function(){adminui.setLogword(e,0)}) : null
		)
	)
__NUKE.doRequest({
	u:__API._base+'__lib=log_post&__act=get&raw=1&fid='+fid,
	b:this,
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		d = (typeof d.data[0]=='object') ? d.data[0] : d.data
		for(var k in d)
			keys.value += d[k]+' '
		}
	})
this.w._.show(e)
}//fe
*/

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
this.w._.addTitle('������ʾ')
this.w._.addContent(
	$('/span')._.add(
		'����',
		$('/span','className','ubbcode',
			$('/div','className','quote')._.add(
				'�ؼ��� �ؼ��� �ؼ��� ...',
				$('/br'),
				'�������Ϲؼ���ʱ����ʾ',
				$('/br'),
				'�ؼ��� �ؼ��� ...',
				$('/br'),
				'��ʾ',
				$('/br'),
				'...'
				)
			),
		'�ĸ�ʽ���� �����ڷ���ʱ���',
		$('/br'),
		'�ύ��һ��������Ч',
		$('/br'),
		'��Ҫʹ�ù��̵Ĵʻ���(�� SB) �������ƥ��',
		$('/br'),
		'�ؼ��ʿ���ʹ������ƥ�� ����ѯ����Ա',
		$('/br'),
		'����Ĺؼ��ʻ򲻺��ʵ�����ƥ���������������',
		$('/br'),
		'ע�����ʾ�޷������� �κ��˽Կɼ�',
		$('/br'),
		data = $('/textarea','style','width:30em;height:20em;'),
		$('/br'),$('/span'),$('/br'),
		$('/button').$0('innerHTML','�ύ','onclick',function(){
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
			data.nextSibling.nextSibling.innerHTML = commonui.time2date($1,'Y-m-d H:i:s')+'ǰ��Ч'
			return ''
			})
		}
	})
this.w._.show(e)
}//fe

 /**
  * ��������
  * @param {type} e
  * @returns {unresolved}
  */
commonui.adminPassInput = function (e){
if(!window.__CURRENT_UID || !window.__NOW)
	return alert('��Ҫ�ȵ�½')
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addContent(
	'ĳЩ������������ȷ������󷽿�ʹ��(��Ч��1.5������) ��ͬ������Ҫ���ö�� ip�䶯��Ҫ���ö��',
	_$('/br'),
	_$('/input','type','password','size',20),
	_$('/button')._.attr({innerHTML:'ȷ��',type:'button'})._.on('click',function(){
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

adminui.quoteForum = function(e,fid){
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('���澵������')
var $ = _$, x=$('/table').$0('className','forumbox') ,y,z,h
this.w._.addContent(
	z=$('/span'),
	y=$('/input','placeholder','����ID'),
	$('/br'),
	h=$('/input','type','checkbox'),$('/span','innerHTML','��ͬ������ʱ��'),
	$('/br'),
	$('/button')._.attr({innerHTML:'ȷ��',type:'button'})._.on('click',function(){
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
			z.innerHTML = '�Ѿ����񵽵�����'+x+'<br/>'
		}
	})
}//fe

adminui.minorModerator = function(e,fid){
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('������')
var $ = _$, x=$('/table').$0('className','forumbox') ,z
this.w._.addContent(
	'������(�û��鲻��ı�)���� ����/����/�༭/�ƶ�/���� ���� ���������º�Ȩ��ʧЧ ������������',
	$('/br'),
	z=$('/span'),
	$('/br'),
	$('/button','innerHTML','����һ��','type','button','onclick',function(){
		z._.add(
			$('/input','value',''),
			$('/select',
				$('/option','value',1,'innerHTML','�����ڿ�ʼ���������и�����Ȩ��'),
				$('/option','value',0,'innerHTML','ȡ��������Ȩ��')
				),
			$('/br')
			)
		}),
	$('/button','innerHTML','ȷ��','type','button','onclick',function(){
		var j = z.childNodes,y=''
		for(var i=0;i<j.length;i++){
			if(j[i].nodeName!='BR')
				y+=(j[i].name ? j[i].name : j[i].value)+"\t"
			}
		if(y)y=y.substr(0,y.length-1)
		__NUKE.doRequest({
			u:{u:__API._base,a:{__lib:'minor_moderator',__act:'set',raw:3,fid:fid,minor_moderator_input:y}}
			})
		})
	)
this.w._.show(e)
__NUKE.doRequest({
	u:{u:__API._base,a:{__lib:'minor_moderator',__act:'get',raw:3,act:4,fid:fid}},
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		x=d.data[0].split("\t")
		for(var i=0;i<x.length;i+=3)
			z._.add(
				$('/input','value',x[i+1]+'('+x[i]+')','disabled','1','name',x[i]),
				$('/select',
					$('/option','value',0,'innerHTML','�� '+commonui.time2date(x[i+2],'Y-m-d H:i')+' Ϊֹ�и�����Ȩ��'),
					$('/option','value',4,'innerHTML','�����ڿ�ʼ���������и�����Ȩ��'),
					$('/option','value',3,'innerHTML','ȡ��������Ȩ��')
					),
				$('/br')
				)
		}
	})
}//fe

adminui.forumStat = function(e,fid,tid){
this.createadminwindow()
this.w._.addContent(null)
this.w._.addTitle('����ͳ��')
var $ = _$, f,x,y,z,a,t,c,b
this.w._.addContent(
	c=$('/input','type','radio','name','yjhbn6t3','checked',(fid?'1':'')),'���� ',
	b=$('/input','type','radio','name','yjhbn6t3','checked',(tid?'1':'')),'���� ',
	f=$('/input','placeholder','���������ID','value',tid?tid:fid),' (������10�� ��Ҫȫ����ʽ����Ȩ��) . ',
	t=$('/input','placeholder','��ʼ����'),' (��-��-��) . ',
	a=$('/input','placeholder','����'),' (������������) . ',
	$('/button')._.attr({innerHTML:'ȷ��',type:'button'})._.on('click',function(){
			__NUKE.doRequest({
				u:{u:__API._base,a:{__lib:'admin_stat',__act:'forum_stat',raw:3,act:1,tid:(b.checked ? f.value :''),fid:(c.checked ? f.value :''),date:t.value,day:a.value}},
				f:function(d){
					var e = __NUKE.doRequestIfErr(d)
					if(e)
						return alert(e)
					d = d.data[0]
					x=$('/table').$0('className','forumbox')
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


adminui.viewLog = function(tou,fromu,id,about){

var $=_$,self=this,vtype,vfrom,vto,vabout,y,vp,vpb
commonui.createadminwindow()
commonui.adminwindow._.addContent(null)
commonui.adminwindow._.addContent(
	$('/span')._.add(
		'����',vtype = $('/select'),
		' ������',vfrom = $('/input').$0('size',12),
		' ��������',vto = $('/input').$0('size',12),
		' ���ID',vabout = $('/input').$0('size',12),'(����ID/�ظ�ID/����ID���������Ͳ�ͬ) ',
		$('/br'),'(�������˼�¼�����ID�в�ѯTID) ',
		$('/br'),
		vp = $('/button').$0('innerHTML','&#9668; ��1ҳ &#9658;','value',1,
			'onclick',function(e){z(this,e)}),
		$('/button').$0('innerHTML','�ύ','onclick',function(){
			x(null,vtype.value,vfrom.value,vto.value,vabout.value,vp.value)
			}),
		 $('/br'),
		 '�������Գ����Լ��򸱰����Ĳ��� �����������Գ������������Ĳ���',
		y = $('/div'),
		vpb = $(vp.cloneNode(1)).$0('onclick',function(e){z(this,e)}),
		$('/button').$0('innerHTML','�ύ','onclick',function(){
			x(null,vtype.options[vtype.selectedIndex].value,vfrom.value,vto.value,vabout.value,vp.value)
			})
		)
	)
var z = function(o,e){
	var p = __NUKE.position.get(e)
	var q = o.getClientRects()[0]
	if(p.px-q.left > q.right-p.px)
		o.value++
	else if(o.value>1)
		o.value--
	vp.value = vpb.value =o.value
	vp.innerHTML = vpb.innerHTML = '&#9668; ��'+o.value+'ҳ &#9658;'
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
						$('/a').$0('href','/nuke.php?func=ucp&uid='+d[k][2],'title',u[d[k][2]],'innerHTML',commonui.cutstrbylen(u[d[k][2]],7,6,'��')),
						$('/span').$0('className','silver xtxt','innerHTML',' ('+d[k][2]),
						d[k][7] ? $('/br') : '',
						d[k][7] ? $('/span').$0('className','silver xtxt','innerHTML',self._long2ip(d[k][7])) : ''
						),
					$('/td').$0('className','c3','style','padding:0.25em')._.add(
						d[k][3] ? $('/a').$0('href','/nuke.php?func=ucp&uid='+d[k][3],'title',u[d[k][3]],'innerHTML',commonui.cutstrbylen(u[d[k][3]],7,6,'��')) : null,
						d[k][3] ? $('/span').$0('className','silver xtxt','innerHTML',' ('+d[k][3]) : null
						),
					$('/td').$0('className','c1','style','padding:0.25em').$0('innerHTML',self._formatLog(d[k][5])	),
					$('/td').$0('className','c2','style','padding:0.25em')._.add(
						$('/span').$0('className','xtxt','innerHTML',commonui.time2date(d[k][6], 'Y-m-d H:i:s')),
						(d[k][1]==2 || d[k][1]==14 || d[k][1]==31)?$('/a').$0('href','javascript:void(0)','onclick',function(){self._undo(this,this.title)},'title',d[k][0],'innerHTML','[����]'):null
						)
					))
			y.innerHTML = ''
			y._.add(t)
			if(!vtype.firstChild){
				vtype._.add($('/option').$0('innerHTML','����','value',''))
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
if(window.confirm('�Ƿ�Ҫȡ���˲���'))
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
			return "<a href='/read.php?tid="+$1+"' target='_blank' title='����'>[T:"+$1+"]</a>";
		})

x = x.replace(
	/(?:\[|\()PID:(\d+)(?:\]|\))/g,
	function($0,$1){
		if($1==0)
			return $0; 
		else 
			return "<a href='/read.php?pid="+$1+"' target='_blank' title='�ظ�'>[P:"+$1+"]</a>";
		})

x = x.replace(
	/\[UID:(\d+)\]/g,
	function($0,$1){
		if($1==0)
			return $0; 
		else 
			return "<a href='/nuke.php?func=ucp&uid="+$1+"' target='_blank' title='�û�'>[U:"+$1+"]</a>";
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
			return "<a href='javascript:void(0)' title='��Ʒ ���"+$1+" ����"+$2+"'>[I:"+$1+","+$2+"]</a>";
		})

x = x.replace(
	/\[L:(\d+),(-?\d+),(\d+),(-?\d+),([\d\/]*)\]/g,
	function($0,$1,$2,$3,$4,$5,$6){
		var z=''
		if($1!='0'){
			if($2==='00')
				z+="��ͬ����("+$3+")������"
			else if($3!='0')
				z+="������<a href='/read.php?tid="+$3+"&to' target='_blank'>[TID:"+$3+"]</a>"
			else if($2!='0')
				z+="�ڰ���<a href='/thread.php?fid="+$2+"' target='_blank'>[FID:"+$2+"]</a>"
			z+='����'+$1+'�� '
			}

		if($4!='0'){
			$5 = $5.split('/')
			z+='�۳�����'+$4
			var y = '';
			for(var i=0;i<$5.length;i++){
				if($5[i]=='0')
					y=' �۳�����'+($4/150)
				else
					z+='/[RID:'+$5[i]+']'
				}
			z+=y
			}
		if(!z)
			return '�޲���';
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
		'��Ϸ��(����) ',$('/input'),b(),
		'��Ϸ��(ԭ��) ',$('/input'),b(),
		'��Ϸ���� ',$('/input'),b(),
		'������ ',$('/input'),b(),
		'������ ',$('/input'),b(),
		'��Ϸ����URL ',$('/input'),b(),
		'��ͼ(����ͼ��ַ jpg) ',$('/input'),b(),
		'ƽ̨/����ʱ��/URL ',$('/input'),$('/input'),$('/input'),b(),
		'ƽ̨/����ʱ��/URL ',$('/input'),$('/input'),$('/input'),b(),
		'ƽ̨/����ʱ��/URL ',$('/input'),$('/input'),$('/input'),b(),
		'ƽ̨/����ʱ��/URL ',$('/input'),$('/input'),$('/input'),b(),
		'ƽ̨/����ʱ��/URL ',$('/input'),$('/input'),$('/input'),b(),
		'ƽ̨/����ʱ��/URL ',$('/input'),$('/input'),$('/input'),b(),
		'ƽ̨/����ʱ��/URL ',$('/input'),$('/input'),$('/input'),b(),
		'ƽ̨/����ʱ��/URL ',$('/input'),$('/input'),$('/input'),b(),
		$('/button','innerHTML','�ύ','onclick',function(){
			var x = this.parentNode.getElementsByTagName('input')
			for(var i=0;i<x.length;i++)
				x[i].value = x[i].value.replace(/^\s+|\s+$|��|��/g,'').replace(/[��������]/g,function($0,$1){var x='��(��)��[��]';return x.charAt(x.indexOf($1)+1)})
			y = "[style left 1 top 1 width 9 height 7 background #b22222 align center border-radius 0.3]\n\
[style font 4 #fff line-height 1.7 innerHTML $votedata_voteavgvalue][/style]\n\
[/style]\n\
\n\
[style left 1 top 8 width 9 color #888 align center][style innerHTML $votedata_usernum][/style]������[/style]\n\
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
					alert('����ʹ�ø���ͼ')
				y+="[comment game_title_image][style border-radius 0.3 width 50 src "+z.autoUrl+"][/style][/comment game_title_image]\n\n\n"
				}
			if(!z)
				z = {h:0,w:1}
			if(x[2].value)
				y+="[style float left width 15]\n\
[style font 2 line-height 1.5]��Ϸ����[/style]\n\
\n\
\n\
[style font 2 #b22222 line-height 1.5][omit 7][comment game_type]"+x[2].value+"[/comment game_type][/omit][/style]\n\
[/style]\n\n"
			if(x[3].value)
				y+="[style float left width 15]\n\
[style font 2 line-height 1.5]������[/style]\n\
\n\
\n\
[style font 2 #b22222 line-height 1.5][omit 7][comment game_devloper]"+x[3].value+"[/comment game_devloper][/omit][/style]\n\
[/style]\n\n"
			if(x[4].value)
				y+="[style float left width 15]\n\
[style font 2 line-height 1.5]������[/style]\n\
\n\
\n\
[style font 2 #b22222 line-height 1.5][omit 7][comment game_publisher]"+x[4].value+"[/comment game_publisher][/omit][/style]\n\
[/style]\n\n"
			if(x[5].value)
				y+="[style float left clear both]\n\
[style font 2 line-height 1.5]�ٷ���վ[/style]\n\
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



/**
 * ���ð��汳��ͼ
 * @param {type} e
 * @returns {undefined}
adminui.setForumPic = function(e){
this.createadminwindow()
this.w._.addContent(null)
if(!window.__GP.admin){
	this.w._.addContent("���ð���ı���ͼ",
		_$('/br'),
		'������ͼƬ�ϴ�Ϊ����(��Ҫ��ˮӡ)ע������ID ���ٻ�����Ա���',
		_$('/br'),
		'ͼƬ�߶�190���� ���1600���ػ����� ��������� ͼƬ��С������85k',
		_$('/br'),
		'��ͼƬ���190���� �߶�1600���ػ�����',
		_$('/br'),
		'��ͬʱ�ṩ����(��Ļ��ȳ���1440����ʱʹ������ͼ �������ʹ�ú���ͼ)'
		)
	tTip.showdscp(e,this.w);
	return
	}
this.w._.addContent(
	'���ð���ı���ͼ',
	_$('/br'),
	_$('/input')._.attr('size',20),
	_$('/span').$0('innerHTML','����ID'),
	_$('/br'),
	_$('/input')._.attr('size',20),
	_$('/span').$0('innerHTML','ͼƬ��ַ(ֻ�޸���)'),
	_$('/br'),
	_$('/button')._.attr({innerHTML:'ȷ��',type:'button'})._.on('click',function(){
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