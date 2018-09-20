

_ITEM = {

now:window.__NOW,
bit :{//状态表 参看lib_item.php
	if_use_on_user:1,//是否能对用户使用
	if_stack:2,//是否能堆叠
	if_store:4,//是否能交易
	if_buy:8,//是否能购买
	if_use_on_topic:16,//是否能对主题使用
	if_use_on_post:32,//是否能对回复使用	
	if_lock:64,//是否在锁定状态	
	if_consume:128,//是否会消耗
	if_in_use:256,//是否在使用状态		
	if_can_in_use:512,//是否在使用时会变为使用状态
	if_in_sell:1024,//是否在出售状态
	if_in_code:2048,//是否在生成兑换码状态
	if_use_on_other:4096
	},
_storeUid:5146859,//系统商店所使用的用户ID 
itemInfoCache:{},
itemInfoCacheWait:0,
listCache:null,
_get_debug : null,
_currentUid:null,
_iAlert:null,
_iMenu:null,
_iList:null,
_content:null,
_ui:null,
_noMenu:null,
_permission_buy_store : 'permission_buy_store',
typeUseInput:{//类型特定使用参数输入
	5:function(id,sub_type,self){
		return _$('/ul')._.add(
			'主题ID',
			_$('/input').$0('size',8),
			'回复ID',
			_$('/input').$0('size',8),
			' ',
			_$('/input').$0('type','radio','name','vtyuyg6iu7'),
			'支持',
			_$('/input').$0('type','radio','name','vtyuyg6iu7','checked','checked'),
			'中立',
			_$('/input').$0('type','radio','name','vtyuyg6iu7'),
			'反对 ',
			_$('/button').$0('type','button','name',id,'innerHTML','使用','onclick',function(){
				var x = this.parentNode.getElementsByTagName('input'),
				x = __NUKE.toInt(x[0].value)+'\t'+__NUKE.toInt(x[1].value)+'\t'+(x[2].checked?'1':(x[4].checked?'-1':0))
				self.use(this.name,x)
				})
			)
		}
		
		
	},

help:function(){
return "\n\
创建新物品(仅管理员) _ITEM.create( int/类型 , int/子类 , int/用户id (-1为系统商店账号) , int/数量 )\n\
出售系统商店帐号的物品(仅管理员) _ITEM.storeSell( int/物品id [, int/售价(铜币)]  [,int/0/1 是否以N币定价] )\n\
列出系统商店帐号的物品(仅管理员) _ITEM.storeList([int/页])\n\
设定数量(仅管理员) _ITEM.setCount( int/物品id , int/数量)\n\
批量生成物品兑换码并放弃物品(仅管理员) _ITEM.code(int/物品id, int/数量 [, int/每个码兑换的数量])\n\
批量生成徽章(仅管理员) _ITEM.medalProduce(int/徽章ID, str/用户ID 任意符号分隔)\n\
\n\
列出其他的物品(仅版主) _ITEM.list(int/页, int/类型 , int/子类 , int/用户ID)\n\
\n\
列出自己的物品 _ITEM.list([int/页])\n\
查看物品的说明 _ITEM.info(int/类型 [, int/子类])\n\
堆叠与指定物品同类的物品 _ITEM.stack( int/物品id )\n\
拆分堆叠的物品 _ITEM.split( int/物品id , int/拆分的数量 )\n\
挂单出售物品 不设置价格则为取消出售中的物品 _ITEM.sell( int/物品id [, int/售价(铜币)] )\n\
解锁所有锁定状态超过3分钟的物品 _ITEM.unlock()\n\
赠与物品 _ITEM.give(int/物品id , int/获赠用户id)\n\
搜索系统商店帐号出售的物品 _ITEM.store([int/页] [, int/类型] [, int/子类])\n\
搜索待售的物品 _ITEM.market([int/页] [, int/类型] [, int/子类] [, int/出售人的用户id])\n\
购买待售的物品 _ITEM.buy(int/物品id , int/购买数量)\n\
使用物品 _ITEM.use(int/物品id , mix/额外参数(视物品类型而定) [, int/目标用户id(不设则为自己)])\n\
由兑换码得到物品 _ITEM.code(str/兑换码)\n\
";	
	
},//fe



_echoConsole:function(data,callerArg){

var time=Math.floor((new Date).getTime()/1000)

if(typeof(data)=='string'){
	console.log('=== _ITEM '+commonui.time2date(time,'H:i:s')+' ===\n'+data)
	return true
	}

var r = ''
for(var k in data){
	if(isNaN(parseInt(k,10)))continue
	var d = data[k]
	if(!d.type || !d.sub_type){
		if(d.t_index){
			var tmp = this._get_type(d.t_index)
			d.type = tmp[0]
			d.sub_type = tmp[1]
			}
		}
	var kk = d.type+'_'+d.sub_type
	d.bit = __NUKE.toInt(d.bit)
	r+=d.id+'('+d.type+'/'+d.sub_type+') '+this.itemInfoCache[kk].name+' x'+d.count+(d.price ? ' 出售中 每个'+this._get_price(d.price)+((d.trade_bit&1)?'N币':'铜币'):'')+((d.bit & this.bit.if_in_sell) === 0  ? '':' 出售中')+((d.bit & this.bit.if_lock) === 0  ? '':' 锁定')+((d.bit & this.bit.if_in_use) === 0  ? '':' 使用中')+((d.bit & this.bit.if_in_code) === 0  ? '':' 等待兑换中')+'\n'
	}
	
console.log('=== _ITEM '+commonui.time2date(time,'H:i:s')+' ===\n'+r)

	
	
},//fe

_getBg:function(type,sub_type,icon){
if(type==2)
	return 'url('+__IMGPATH+'/medal/'+icon+') 50% 50% no-repeat'

return 'url('+__IMG_STYLE+'/items/'+(icon?icon:(type+'_'+sub_type+'.png'))+') 50% 50% no-repeat'
},//fe

_echo:function(data,callerArg){
if(!this._ui)this.open()
var time=Math.floor((new Date).getTime()/1000)

if(typeof(data)=='string'){
	this._iAlert.innerHTML=''
	this._iAlert._.aC(
		_$('<h4/>')._.cls('textTitle')._.attr('innerHTML','信息'),
		document.createTextNode(data)
		)
	this._switchContent(this._iAlert)
	return true
	}

this._iList.innerHTML=''
//console.log(callerArg)
var tmp = _$('/h4','className','textTitle'),self = this
this._iList._.add(tmp)

if(callerArg && callerArg[1] && callerArg[1].useArg)
	tmp._.add( '请选择一个道具购买并使用')
else{
	if(data.ownerUid!=this._currentUid)
		tmp._.add( '用户 '+data.ownerUname+' 的')
	tmp._.add( '物品列表 ')
	if(data.ownerUid==this._currentUid || __GP.greater)
		tmp._.add(_$('/a','href','javascript:void(0)','className','b','innerHTML','[堆叠所有]','onclick',function(){self.stackListCache()}))
	}
	

for(var k in data){
	if(isNaN(parseInt(k,10)))continue
	var d = data[k]
	if(!d.type || !d.sub_type){
		if(d.t_index){
			var tmp = this._get_type(d.t_index)
			d.type = tmp[0]
			d.sub_type = tmp[1]
			}
		}
	var kk = d.type+'_'+d.sub_type
	d.bit = d.bit|0
	//var self = this
	
	
	var i = _$('/a').$0(
				'href','javascript:void(0)',
				'title',this.itemInfoCache[kk].name+' x'+d.count + '(ID:'+d.id+ ' 类别:'+d.type+ ' 子类:'+d.sub_type+')',
				'style',{display:'block',cssFloat:'left',styleFloat:'left',width:'4.34em',height:'6.34em',padding:'0',margin:'0.166em 0.166em 0.2em 0',fontSize:'0.75em',lineHeight:'1em',color:'gray'},
				_$('/div').$0('style',{width:'4em',height:'4em',border:'0.166em solid #aaa',background:this._getBg(d.type,d.sub_type,this.itemInfoCache[kk].icon)}),
				_$('/nobr')._.add(' x'+d.count)
				)._.sV('itemData',d)

	if(callerArg && callerArg[1] && callerArg[1].useArg)
		i._.on('click',function(){
					if(this._.gV('return'))return
					var dd = this._.gV('itemData')
					if(confirm('以'+self._get_price(dd.price)+((dd.trade_bit&1)?'N币':'铜币')+'的价格购买一个 '+self.itemInfoCache[dd.type+'_'+dd.sub_type].name+' 并使用？')){
						self.buyAndUse(dd.id, callerArg[1].useArg)
						}
					})
	else
		i._.on('click',function(){
					if(this._.gV('return'))return
					self._echoItemMenu(this.cloneNode(true),this._.gV('itemData'),callerArg)
					})

	if(d.price){
		i.innerHTML+=' <nobr> x'+(d.trade_bit&1?this._get_price(d.price)+'N':this._get_price(d.price)/10000+'G')+'</nobr>'
		i.title +=' 出售中 每个'+this._get_price(d.price)+((d.trade_bit&1)?'N币':'铜币')
		i.firstChild.style.borderColor='teal'
		}
	if(d.bit & this.bit.if_in_sell){
		//i.innerHTML+=' onsell'
		i.title +=' 出售中'
		i.firstChild.style.borderColor='teal'
		}
	if(d.bit & this.bit.if_in_use){
		//i.innerHTML+=' <nobr>in use</nobr>'
		i.title +=' 使用中'
		i.firstChild.style.borderColor='royalblue'
		}
	if(d.bit & this.bit.if_in_code){
		//i.innerHTML+=' code'
		i.title +=' 等待兑换中'
		i.firstChild.style.borderColor='sandybrown'
		}
	if(d.bit & this.bit.if_lock){
		//i.innerHTML+=' lock'
		i.title +=' 锁定中'
		i.firstChild.style.borderColor='firebrick'
		}
	
	this._iList._.aC(i)
	}
	
if(!this._iList.childNodes[1])
	this._iList._.aC(
		document.createTextNode('空')
		)

this._iList.appendChild(_$('<div/>')._.cls('clear'))
if(data.currentPage>1 || data.morePage){
	
	this._iList._.aC(
		_$('<h4/>')._.cls('textTitle')._.attr('innerHTML','翻页')
		)

	var to = data.currentPage+(data.morePage ? 1 : 0)
	for(var i=1;i<=to;i++){
		if(i==data.currentPage){
			this._iList._.aC(
				document.createTextNode(i),
				document.createTextNode(' ')
				)
			continue
			}
			

		this._iList._.aC(
			_$('<a/>')._.attr({href:'javascript:void(0)',innerHTML:i})._.on('click',function(){
				callerArg[1].page=this._.gV('page')
				self._list.apply(self,callerArg)
				})._.sV('page',i),
			document.createTextNode(' ')
			)
		}
		
	}
this._switchContent(this._iList)
},//fe


_echoItemMenu:function(o,d,callerArg){
if(!this._ui)this.open()
var self = this
var kk = d.type+'_'+d.sub_type
var k0 = d.type+'_0'

var tmp = _$('<ul/>')

this._iMenu.innerHTML=''
this._iMenu._.aC(
	_$('<h4/>')._.cls('textTitle')._.attr('innerHTML',this.itemInfoCache[kk].name+' x'+d.count),
	_$(o)._.sV('return',true)._.css('marginTop','2em'),

		_$('<ul/>')._.css('marginLeft','3.83em')._.aC(
			_$('<li/>')._.aC(document.createTextNode('ID '+d.id)),
			_$('<li/>')._.aC(document.createTextNode(this.itemInfoCache[kk].name+' x'+d.count+'个')),
			_$('<li/>')._.aC(document.createTextNode('类别 '+d.type+ ' 子类 '+d.sub_type)),
			((d.bit & (this.bit.if_in_sell | this.bit.if_in_use | this.bit.if_in_code | this.bit.if_lock) || d.price) ? 
				_$('<li/>')._.aC(
					document.createTextNode(
						(d.price ? '出售中 每个'+this._get_price(d.price)+((d.trade_bit&1)?'N币 ':'铜币 '):'')+
						(d.bit & this.bit.if_in_sell ? '出售中 ' : '')+
						(d.bit & this.bit.if_in_use ? '使用中 ' : '')+
						(d.bit & this.bit.if_in_code ? '等待兑换 ' : '')+
						(d.bit & this.bit.if_lock ? '锁定 ' : '')
						)

					)
				: null
				),
			(this.itemInfoCache[kk].dscp  ? _$('<li/>')._.aC(document.createTextNode(this.itemInfoCache[kk].dscp)) : null	),
			(this.itemInfoCache[k0].dscp  ? _$('<li/>')._.aC(document.createTextNode(this.itemInfoCache[k0].dscp)) : null	),
			(this.itemInfoCache[kk][this._permission_buy_store] ? _$('<li/>')._.aC(document.createTextNode('从商店购买需要: '+ this.itemInfoCache[kk][this._permission_buy_store])) : null	)
			)
		
	)

if(d.uid!=this._currentUid && d.price){
	if(d.uid==this._storeUid && callerArg && callerArg[1] && callerArg[1].useArg && (d.bit & this.bit.if_consume)){
		this._iMenu._.aC(
			_$('<h4/>')._.cls('textTitle')._.attr('innerHTML','购买一个并使用 (使用后会消耗)'),
			_$('/button').$0('type','button','name',d.id,'innerHTML','以'+this._get_price(d.price)+(d.trade_bit&1?'N币':'铜币')+'的价格购买一个并使用','onclick',function(){
				self.buyAndUse(this.name,callerArg[1].useArg)
				})
			)
		}
	else{
		this._iMenu._.aC(
			_$('<h4/>')._.cls('textTitle')._.attr('innerHTML','购买'),
			_$('<ul/>')._.aC(
				_$('<li/>')._.aC(
					document.createTextNode('以每个'+this._get_price(d.price)+((d.trade_bit&1)?'N币':'铜币')+'的价格 '),
					_$('<a/>')._.attr({
						href:'javascript:void(0)',
						innerHTML:'[购买]'
						})._.on('click',function(){
							if(!parseInt(this.nextSibling.value,10)){return alert('请填入数目')}
							self.buy(this._.gV('id'),this.nextSibling.value)
							})._.sV('id',d.id),
					_$('<input/>')._.attr({size:8,value:1}),
					document.createTextNode('个 (超过总数则购买全部)')
					)
				)
			)
		}
	}

if(d.uid==this._currentUid){
	
	
	var tmp = _$('<ul/>')._.aC(
				_$('<li/>')._.aC(
					_$('<a/>')._.attr({
						href:'javascript:void(0)',
						innerHTML:'[堆叠同类物品]'
						})._.on('click',function(){self.stack(this._.gV('id'))})._.sV('id',d.id)
					)
				)
	
	if(d.count>1)
		tmp._.aC(
			_$('<li/>')._.aC(
				_$('<a/>')._.attr({
					href:'javascript:void(0)',
					innerHTML:'[拆分]'
					})._.on('click',function(){
						if(!parseInt(this.nextSibling.value,10)){return alert('请填入数字')}
						self.split(this._.gV('id'),this.nextSibling.value)
						})._.sV('id',d.id),
				_$('<input/>')._.attr({size:3}),
				document.createTextNode('个')
				)
			)
	
	this._iMenu._.aC(
		_$('<h4/>')._.cls('textTitle')._.attr('innerHTML','堆叠/拆分'),
		tmp
		)

	if(this.typeUseInput[d.type]){//类型特定使用参数输入
		this._iMenu._.aC(
			_$('<h4/>')._.cls('textTitle')._.attr('innerHTML',(d.bit & this.bit.if_in_use) ? '停止使用' : '使用物品'+((d.bit & this.bit.if_consume) ? ' (使用后会消耗)' : '')),
			this.typeUseInput[d.type](d.id, d.sub_type,this)
			)
		}
	else if(d.bit & (this.bit.if_in_use | this.bit.if_use_on_user | this.bit.if_use_on_topic | this.bit.if_use_on_post | this.bit.if_use_on_other)){
		var tmp = _$('<ul/>')
		
		if((d.bit & this.bit.if_in_use))
			tmp._.aC(
					_$('<li/>')._.aC(
						_$('<a/>')._.attr({
							href:'javascript:void(0)',
							innerHTML:'[停止使用]'
							})._.on('click',function(){self.use(this._.gV('id'))})._.sV('id',d.id)
						)
					)
		
		if((d.bit & this.bit.if_in_use)===0){
			
			if(d.bit & this.bit.if_use_on_user){
				tmp._.aC(
					_$('<li/>')._.aC(
						_$('/a').$0('href','javascript:void(0)','innerHTML','[使用物品]','name',d.id,'onclick',function(){
								self.use(this.name)
								}
							),
						((d.bit & this.bit.if_use_on_other) ? document.createTextNode('(对自己)') : null)
						)
					)
				}		
			if(d.bit & this.bit.if_use_on_other){
				tmp._.aC(
					_$('<li/>')._.aC(
						document.createTextNode('对用户ID是'),
						_$('<input/>')._.attr({size:8}),
						_$('/a').$0('href','javascript:void(0)','innerHTML','[的用户使用]','name',d.id,'onclick',function(){
								if(!parseInt(this.previousSibling.value,10)){return alert('请填入用户的数字ID')}
								self.use(this.name,this.previousSibling.value)
								}
							)
						)
					)
				}
			if(d.bit & this.bit.if_use_on_topic){
				tmp._.aC(
					_$('<li/>')._.aC(
						document.createTextNode('对主题ID是'),
						_$('<input/>')._.attr({size:8}),
						_$('/a').$0('href','javascript:void(0)','innerHTML','[的主题使用]','name',d.id,'onclick',function(){
								if(!parseInt(this.previousSibling.value,10)){return alert('请填入回复的数字ID')}
								self.use(this.name,this.previousSibling.value)
								}
							)
						)
					)
				}
			if(d.bit & this.bit.if_use_on_post){
				tmp._.aC(
					_$('<li/>')._.aC(
						document.createTextNode('对回复ID是'),
						_$('<input/>')._.attr({size:8}),
						_$('/a').$0('href','javascript:void(0)','innerHTML','[的回复使用]','name',d.id,'onclick',function(){
								if(!parseInt(this.previousSibling.value,10)){return alert('请填入回复的数字ID')}
								self.use(this.name,this.previousSibling.value)
								}
							)
						)
					)
				}
				
				
			}
			
		this._iMenu._.aC(
			_$('<h4/>')._.cls('textTitle')._.attr('innerHTML',(d.bit & this.bit.if_in_use) ? '停止使用' : '使用物品'+((d.bit & this.bit.if_consume) ? ' (使用后会消耗)' : '')),
			tmp
			)
		}

	if(d.bit & this.bit.if_buy){
		var tmp = _$('<ul/>')._.aC(
				_$('<li/>')._.aC(
					_$('<a/>')._.attr({
						href:'javascript:void(0)',
						innerHTML:'[赠给用户ID是]'
						})._.on('click',function(){
							if(!parseInt(this.nextSibling.value,10)){return alert('请填入用户的数字ID')}
							self.give(this._.gV('id'),this.nextSibling.value)
							})._.sV('id',d.id),
					_$('<input/>')._.attr({size:8}),
					document.createTextNode('的用户')
					),
				_$('<li/>')._.aC(
					document.createTextNode('以'),
					_$('<input/>')._.attr({size:8}),
					_$('<span>铜币的价格</span>'),
					_$('<a/>')._.attr({
						href:'javascript:void(0)',
						innerHTML:'[售出]'
						})._.on('click',function(){
							if(!parseInt(this.previousSibling.previousSibling.value,10)){return alert('请填入价格')}
							self.sell(this._.gV('id'),this.previousSibling.previousSibling.value)
							})._.sV('id',d.id),
					document.createTextNode(' (出售收入的5%将被扣除作为税款)')
					)
				)
					
		if(d.bit & this.bit.if_in_sell)
			tmp._.aC(
				_$('<li/>')._.aC(
					_$('<a/>')._.attr({
						href:'javascript:void(0)',
						innerHTML:'[取消出售]'
						})._.on('click',function(){
							self.sell(this._.gV('id'),0)
							})._.sV('id',d.id)
					)
				)
					
		this._iMenu._.aC(
			_$('<h4/>')._.cls('textTitle')._.attr('innerHTML','出售/赠与'),
			tmp
			)
		}

	}//d.uid==__CURRENT_UID




this._iMenu._.aC(
	_$('<h4/>')._.cls('textTitle')._.attr('innerHTML','返回'),
	_$('<ul/>')._.aC(
		_$('<li/>')._.aC(
			_$('<a/>')._.attr({
				href:'javascript:void(0)',
				innerHTML:'[返回列表]'
				})._.on('click',function(){
					self._switchContent(self._iList)
					})
			)
		)
	)
		
this._switchContent(this._iMenu)
},//fe

_switchContent:function(o){

if(!o.parentNode || o.parentNode.nodeType!=1){
	if(this._content.firstChild)
		this._content.removeChild(this._content.firstChild)
	this._content.appendChild(o)
	}
//this._w._.show()

},//fe

manualInit:function(w,currentUid){

if(!w._.addContent)
	w._.addContent = w._.aC
if(!w._.addTitle)
	w._.addTitle = function(){}
if(!w._.show)
	w._.show=function(){}
this._w = w
if(currentUid)
	this._currentUid = currentUid
},//fe

open:function(event,noMenu){

if(!this._ui){
	var self = this, $=_$
	if(!this._currentUid)
		this._currentUid = window.__CURRENT_UID ? window.__CURRENT_UID : 0
	if(!this._w){
		this._w = commonui.createCommmonWindow()
		this._w.style.width='auto'
		this._w._.addTitle('物品/道具')
		}
	this._content = $('<div/>')
	this._mainMenu = $('<div/>')._.aC(
					$('<a/>')._.attr({href:'javascript:void(0)',innerHTML:'[我的仓库]'})._.on('click',function(){self.list()}),
					$('<a/>')._.attr({href:'javascript:void(0)',innerHTML:'[系统商店]'})._.on('click',function(){self.storeUi()}),
					$('<a/>')._.attr({href:'javascript:void(0)',innerHTML:'[市场]'})._.on('click',function(){self.marketUi()}),
					$('<a/>')._.attr({href:'javascript:void(0)',innerHTML:'[兑换码输入]'})._.on('click',function(){self.codeUi()}),
					(window.__GP && __GP['super'] && __GP.ubStaff )? $('<a/>')._.attr({href:'javascript:void(0)',innerHTML:'[批量生成徽章]'})._.on('click',function(){self.medalProduceUi()}) : null
					)
	this._ui = $('<div/>')._.cls('item_ui')._.aC(
				this._mainMenu,
				this._content
				)
	this._w._.addContent(this._ui)
	this._iAlert = $('<div/>');
	this._iMenu = $('<div/>');
	this._iList = $('<div/>');
	}

this._mainMenu.style.display=noMenu ? 'none' : ''

this._w._.show(null,null,16)


},//fe

storeUi:function(){
if(!this._ui)this.open()
this._iAlert.innerHTML=''
var self = this
this._iAlert._.aC(
	_$('<h4/>')._.cls('textTitle')._.attr('innerHTML','系统商店'),
	_$('<ul/>')._.aC(
		_$('<li/>')._.aC(
			_$('<a/>')._.attr({href:'javascript:void(0)',innerHTML:'[列出系统商店所有待售物品]'})._.on('click',function(){self.store()})
			),
		_$('<li/>')._.aC(
			_$('<a/>')._.attr({href:'javascript:void(0)',innerHTML:'[列出系统商店中类别是]'})._.on('click',function(){
				var t = __NUKE.toInt(this.nextSibling.value)
				var tt = __NUKE.toInt(this.nextSibling.nextSibling.nextSibling.value)
				if(tt && !t) return alert('必须选择一个分类')
				self.store(1,t,tt)}),
			_$('<input/>')._.attr({size:3}),
			_$('<span> 子类是</span>'),
			_$('<input/>')._.attr({size:3}),
			document.createTextNode(' 的待售物品 (子类可选填)')
			)
		)
	)
this._switchContent(this._iAlert)
},//fe

marketUi:function(){
if(!this._ui)this.open()
this._iAlert.innerHTML=''
var self = this
this._iAlert._.aC(
	_$('<h4/>')._.cls('textTitle')._.attr('innerHTML','市场'),
	_$('<ul/>')._.aC(
		//_$('<li/>')._.aC(
		//	_$('<a/>')._.attr({href:'javascript:void(0)',innerHTML:'列出市场中所有待售物品'})._.on('click',function(){self.market()})
		//	),
		_$('<li/>')._.aC(
			_$('<a/>')._.attr({href:'javascript:void(0)',innerHTML:'[列出市场中类别是]'})._.on('click',function(){
				var t = __NUKE.toInt(this.nextSibling.value)
				var tt = __NUKE.toInt(this.nextSibling.nextSibling.nextSibling.value)
				if(tt && !t) return alert('必须选择一个分类')
				var uid = __NUKE.toInt(this.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.value)
				self.market(0,t,tt,uid)}),
			_$('<input/>')._.attr({size:3}),
			_$('<span> 子类是</span>'),
			_$('<input/>')._.attr({size:3}),
			_$('<span> 出售人用户ID是</span>'),
			_$('<input/>')._.attr({size:8}),
			document.createTextNode(' 的物品 (条件可选填)')
			)
		)
	)
this._switchContent(this._iAlert)
},//fe

codeUi:function(use){
if(!this._ui)this.open()
this._iAlert.innerHTML=''
var self = this
this._iAlert._.aC(
	_$('<h4/>')._.cls('textTitle')._.attr('innerHTML','用兑换码获取物品'),
	_$('<ul/>')._.aC(
		_$('<li/>')._.add(
			'输入兑换码',
			_$('<input/>')._.attr({size:20}),
			_$('<a/>')._.attr({href:'javascript:void(0)',innerHTML:'[兑换]'})._.on('click',function(){
				var c = this.previousSibling.value.toString()
				if(c.length<12)return alert('格式错误')
				self.code(c)
				}),
			_$('/span').$0('innerHTML',' 或 '),
			_$('<a/>')._.attr({href:'javascript:void(0)',innerHTML:'[兑换并对自己使用]'})._.on('click',function(){
				var c = this.previousSibling.previousSibling.previousSibling.value.toString()
				if(c.length<12)return alert('格式错误')
				self.codeUse(c)
				})
			)
		)
	)
this._switchContent(this._iAlert)
},//fe

debug : function(){
this._echo(this._get_debug)
},//fe



_get:function(act,arg,func){
if(this._get_lock)return
var argx = arguments , self = this
//if(!window.hex_md5)
//	return loader.script(__COMMONRES_PATH+'/js_md5.js',function(){argx.callee.apply(self,argx)})

this._get_lock=true
//var ck  = cookieFuncs.getCookie('ngaPassportCid')
//if(ck)ck = hex_md5(ck.substr(0,16)+this._currentUid.toString()+this.now )+this.now 

this._iAlert.innerHTML=''
this._iAlert._.aC(
	_$('<h4/>')._.cls('textTitle')._.attr('innerHTML','Loading'),
	document.createTextNode('加载中 可能比较慢 ...')
	)
this._switchContent(this._iAlert)
__NUKE.doRequest({
	u:{u:'/nuke.php?func=item&act='+act+'&raw=3'/*+'&rand='+Math.random()*/, a:arg},
	f:function(r){
		if (!r)
			return self._echo('数据错误')
		
		if(r.debug)
			self._get_debug = r.debug
		
		self._get_lock=false;
		
		if(r.error && r.renewTime){
			self.now = r.renewTime
			window.setTimeout(function(){argx.callee.apply(self,argx)},100)
			return true
			}
		if(r.error)
			return self._echo((typeof(r.error)=='object' ? commonui._debug._d(r.error) : r.error))
		
		if(func){
			for(var k in r.data){}
			if(k==0)
				func(r.data[0])
			else
				func(r.data)
			return true
			}
		else
			return self._echo(typeof(r.data)=='object' ? commonui._debug._d(r.data) : r.data)
		},
	ff:function(){self._get_lock=false;return self._echo('未收到结果')}
	})

		
},//fe

create:function(type,sub_type,uid,count,price){
var self = this
if(!price)price=0
this._get('new',{
	type:type,
	sub_type:sub_type,
	uid:uid,
	count:count,
	price:price
	},function(x){
		self._echo(typeof(x)=='object' ? commonui._debug._d(x) : x)
		console.log(x)})
},//fe

codeUse:function(code,arg){
this._get('code',{
	code:code,
	use:1,
	arg:arg
	})
},//fe

code:function(id,multi,count){
id=id.toString()
if(id.length<12 && id.match(/^\d+$/)){
	if(multi){
		this._get('code',{
			id:id,
			multi:multi,
			count:count
			})
		}
	else{
		this._get('code',{
			id:id
			})
		}
	}
else{
	this._get('code',{
		code:id
		})
	}
	
},//fe

storeList:function(page){
var arg={}
if(page)arg.page=page
this._list('store_list',arg)
},

storeSell:function(id,price,use_repu){
if(!price)price=0
this._get('store_sell',{
	id:id,
	price:price,
	use_repu:use_repu?1:''
	})	
},

setCount:function(id,count){
if(!price)price=0
this._get('seet_count',{
	id:id,
	count:count
	})	
},

use:function(id,arg,uid){
var a ={id:id,arg:arg}
this._get('use',a)
},//fe

stack:function(id,count){
if(!count)count=0
this._get('stack',{
	id:id,
	count:count
	})
},//fe

split:function(id,count){
this.stack(id,count)
},//fe

sell:function(id,price){
if(!price)price=0
this._get('sell',{
	id:id,
	price:price
	})
},//fe

give:function(id,uid){
this._get('give',{
	id:id,
	uid:uid
	})
},//fe

buy:function(id,count){
if(!count)count=1
this._get('buy',{
	id:id,
	count:count
	})
},//fe

buyAndUse:function(id,useArg){
this._get('buy_and_use',{
	id:id,
	arg:useArg
	})
},//fe

store:function(page,type,sub_type){
var arg={}
if(type)arg.type=type
if(sub_type)arg.sub_type=sub_type
if(page)arg.page=page
this._list('store',arg)
},//fe

//useArg={arg:'useArg'}
storeBuyAndUse:function(page,type,sub_type,useArg,clickevt){
if(!useArg)
	return
var arg={}
if(type)arg.type=type
if(sub_type)arg.sub_type=sub_type
if(page)arg.page=page
if(useArg)arg.useArg=useArg
this._list('store',arg)
},//fe

market:function(page,type,sub_type,uid){
var arg={}
if(type)arg.type=type
if(sub_type)arg.sub_type=sub_type
if(uid)arg.uid=uid
if(page)arg.page=page
this._list('market',arg)
},//fe

unlock:function(uid){
if(uid)
	this._get('unlock',{uid:uid})
else
	this._get('unlock',{})
},//fe

info: function(type,sub_type){
var self = this

if(!sub_type)sub_type = 0
	
this._get('info',{
	type:type,
	sub_type:sub_type},
	function(d){
		self.itemInfoCache[type+'_'+sub_type]=d
		return d.name+'\n'+d.dscp
		}
	)
},//fe

stackQueue : null,
stackListCache:function(){
if(this.stackQueueLock)
	return
var d = this.listCache, x={},j
this.stackQueue=[]
for(var k in d){
	if((d[k].bit & (2|64|256)) ==2){//可堆叠 未锁定 未在使用
		j = d[k].type+'_'+d[k].sub_type
		if(!x[j])
			x[j] = [d[k].id,0]
		x[j][1]++
		}
	}
for(var k in x){
	if(x[k][1]>1)
		this.stackQueue.push(x[k][0])
	}
if(this.stackQueue.length)
	this.stackListCacheProc()
},//
stackQueueLock:null,
stackListCacheProc:function(){
var x = this.stackQueue.shift(),self = this
if(x){
	this.stackQueueLock = 1
	this.stack(x)
	this._get('stack',{
		id:x,
		count:0
		},function(){
		window.setTimeout(
			function(){
				self.stackListCacheProc()
				},0
			)
		})
	}
else{
	this.stackQueueLock = 0
	}
},//

list:function(page,type,sub_type,uid){
var arg={}
if(type)arg.type=type
if(sub_type)arg.sub_type=sub_type
if(uid)arg.uid=uid
if(page)arg.page=page
this._list('list',arg)
},//fe

_list:function(f,arg){
if(!this._ui)this.open()
var self = this
var callerArg=arguments
this._get(f,arg,function(data){
	if(!data.itemInfo)
		data.itemInfo = {}
	self.listCache = data
	for(var k in data){
		if(isNaN(parseInt(k,10)))continue
		var d = data[k]
		if(!d.type || !d.sub_type){
			if(d.t_index){
				var tmp = self._get_type(d.t_index)
				d.type = tmp[0]
				d.sub_type = tmp[1]
				}
			}
		var kk = d.type+'_'+d.sub_type
		if(self.itemInfoCache[kk]===undefined){
			if(data.itemInfo[kk])
				self.itemInfoCache[kk]=data.itemInfo[kk].data ? (data.itemInfo[kk].data[0] ? data.itemInfo[kk].data[0] : data.itemInfo[kk].data) : data.itemInfo[kk]
			else{
				self.itemInfoCache[kk]=null
				self.itemInfoCacheWait++
				}
			}
		if(self.itemInfoCache[d.type+'_0']===undefined){
			self.itemInfoCache[d.type+'_0']=null
			self.itemInfoCacheWait++
			}
		}
	if(self.itemInfoCacheWait){
		for(var k in self.itemInfoCache){
			if(!self.itemInfoCache[k]){
				var kk = k.split('_')
				self._itemInfoCacheFillAndDoWhenReady(kk[0],kk[1],function(){self._echo(self.listCache,callerArg)});
				}
			}
		}
	else
		return self._echo(self.listCache,callerArg)
	
	})
},//fe

_get_type:function(i){
i = __NUKE.toInt(i)
var type = i >> 16 , sub_type = i - (type << 16)
return {0:type,1:sub_type}
},//fe

_get_price:function(p){
return Math.floor(p/1000)
},//fe

_itemInfoCacheFillAndDoWhenReady:function(type,sub_type,fn){
var self = this,kk = type+'_'+sub_type
httpDataGetter.script_muti_get([__CACHE_PATH+'/items/'+kk+'.js','/nuke.php?func=item&raw=1&act=info&type='+type+'&sub_type='+sub_type] ,
	function(r){
		if (!r)
			return
		//if(__NOW-r.time>86400)
		//	return
		self.itemInfoCacheWait--;
		if(r.data)
			self.itemInfoCache[kk]=r.data[0]?r.data[0]:r.data
		else
			self.itemInfoCache[kk]={name : '未找到类型'}
		if(self.itemInfoCacheWait==0)
			fn()
		return true
		},
	function(){
		self.itemInfoCacheWait--;
		self.itemInfoCache[kk]={name : '无法获取物品信息'}
		if(self.itemInfoCacheWait==0)
			fn()					
		},
	__CHARSET
	);		
	
},//fe

medalProduce:function(m,u){
if(!this.medalProduce.m)
	this.medalProduce.m={}
var y = this.medalProduce.m,self = this
if(m && u){
	var x = u.match(/\d+/g)
	console.log('将为')
	for(var k=0;k<x.length;k++){
		if(!y[x[k]])
			y[x[k]] = {}
		y[x[k]][m]=1
		console.log('用户'+x[k]+' 创建 徽章'+m)
		}
	console.log('执行 _ITEM.medalProduce() 开始')
	return
	}
else if (u){
	/* 格式2如下
	 * mid \t uid
	 *     \t uid
	 *     \t uid
	 * mid2\t uid
	 *     \t uid
	 *     \t uid
	 *      .....
	 */
	u = u.split("\n")
	console.log('将为')
	for(var i =0 ;i<u.length;i++){
		u[i] = u[i].split(/\s/)
		if(u[i][0] || u[i][1]){
			if(u[i][0])
				var x = u[i][0].replace(/^\s+|\s+$/,'')
			u[i][1] = u[i][1].replace(/^\s+|\s+$/,'')
			if(!y[u[i][1]])
				y[u[i][1]] = {}
			y[u[i][1]][x]=1
			console.log('用户'+u[i][1]+' 创建 徽章'+x)
			}
		}
	return
	}

for (var k in y){
	for(var i in y[k]){
		console.log('uid:'+k+' mid:'+i)
		this.medalProduceUi.b.innerHTML = '为'+k+'创建徽章 请等待'
		this.create( 2 ,i , k , 1 )
		delete y[k][i]
		break;
		}
	if(!i)
		delete y[k]
	break;
	}

if(!k){
	this.medalProduce.m={}
	console.log('完成')
	this.medalProduceUi.b.innerHTML = '全部完成'
	return
	}

window.setTimeout(function(){self.medalProduce()},5000)
},//fe


medalProduceUi : function (e)
{
var self = this, c = commonui, $=_$ , z = function(o){
						if(!o.value.match(/^[\d\n\s]+$/)){
							var x = o.value.match(/\d{5,}/g)
							o.value = x.join('\n')
							}
						o.rows = o.value.split(/\n+/g).length
						}
c.createadminwindow()
var c = c.adminwindow
c._.addContent(null)
c._.addTitle('批量徽章');
c._.addContent(
		$('/table')._.add(
			$('/tr')._.add(
				$('/td')._.add(
					'用户id 每行一个',
					$('/br'),
					$('/textarea').$0('rows','1','onchange',function(){z(this)})
					),
				$('/td')._.add(
					'徽章id',
					$('/br'),
					$('/input')._.css('width','3em')
					)
				)
			),
		$('/br'),
		$('/br'),
		$('/button').$0('innerHTML','更多','type','button','onclick',function(){
				var x = this.previousSibling.previousSibling.previousSibling.cloneNode(1)
				x.getElementsByTagName('textarea')[0].onchange = function(){z(this)}
				this.parentNode.insertBefore(x,this.previousSibling.previousSibling)
				}
			),
		$('/button').$0('innerHTML','执行','type','button','onclick',function(){
				var x = this.parentNode.getElementsByTagName('input') , y = this.parentNode.getElementsByTagName('textarea')
				for(var i=0;i<x.length;i++)
					self.medalProduce(x[i].value, y[i].value.replace(/\n+/g,',') )
				self.medalProduceUi.b = this
				self.medalProduce()
				}
			)
	)
c._.show(e)
},
//fe


_:null
};//ce


commonui.userItem = _ITEM;
//_ITEM._echo = _ITEM._echoUi

new_ITEM_inset = function(o){
var x =function(){}
x.prototype=_ITEM
var x = new x

x._content = o;
x._iAlert = _$('/span');
x._iMenu = _$('/span');
x._iList = _$('/span');
x._ui = true
	
return x
}//fe