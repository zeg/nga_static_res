/*
*=============================================
����==========================================
*/
commonui.message = {
_window:null,
_list:null,
_read:null,
_post:null,
_hint:null,
_menu:null,
_p:{},
_urlBase:'/nuke.php?func=message',
asUid:null,//�鿴�����û���uid ����Աonly

_NEW:1,
_REPLY:2,
_ADD:3,
_ADD_BLOCK:4,

_PAGE_READ : 20,
_PAGE_LIST : 35,
_bit:{
	_MULTI_CONV:1,
	_UNREAD:2
	},

init:function(w,c,p,r,h,m){
var $=_$, self = this
this._window = $(w)
this._list= $(c).$0('className','sublist subblock','style','display:none')
this._post= $(p).$0('className','subpost subblock','style','display:none')
this._read= $(r).$0('className','subread subblock','style','display:none')
this._hint= $(h).$0('className','subhint subblock','style','display:none')
this._menu= $(m)

var m = location.search.match(/asuid=(\d+)/)
if(m && m[1]){
	this.asUid = m[1]
	this._urlBase += '&asuid='+ m[1]
	}

this._menu.$0(
	'className','menu',
	$('/a').$0('innerHTML','[д����Ϣ]','href','javascript:void(0)','onclick',function(){self.postUi(self._NEW)} ),
	$('/a').$0('innerHTML','[�ռ���]','href',this._urlBase+this._rdm()+'#p=1'/*,'onclick',function(){self.loadInbox()}*/),
	$('/a').$0('innerHTML','[�����û�]','href','javascript:void(0)','onclick',function(){self.loadBlock()})
	)

if(!location.hash)return
var m = location.hash.match(/^#([a-zA-Z]+)=(\d+)(?:_-?(\d+))?$/)
if(!m)return
if(m[1]=='p')
	this.loadInbox(m[2])
if(m[1]=='mid'){
	if(m[3])
		this.read(m[2],m[3])
	else
		this.read(m[2],-1)
	}
if(m[1]=='to')
	this.postUi(this._NEW,m[2])

},//fe

_rdm:function(){
return '&r='+Math.floor(Math.random()*111)
},//fe

_page:function(){

},//fe

_switchDisplay:function(o){
if(o!=this._list)
	this._list.style.display='none'
if(o!=this._read)
	this._read.style.display='none'
if(o!=this._post)
	this._post.style.display='none'
if(o!=this._hint)
	this._hint.style.display='none'
o.style.display=''
},//fe

_addDisplay:function(o){
o.style.display=''
},//fe

_getDataFromText:function(txt){
if(txt.substr(0,32)!='window.script_muti_get_var_store')
	return
var script_muti_get_var_store=null
try{
eval(txt.substr(7))
}catch(e){}
return script_muti_get_var_store
},//fe

postUi:function(type,arg){
if(!this._p.subject){
	var self = this,$=window._$
	this._p.subject = $('/input').$0('style',{width:'100%'})
	this._p.to = $('/input').$0('style',{width:'100%'})
	this._p.content = $('/textarea').$0('style',{width:'100%'})
	this._p.hint = $('/div')
	this._p.button = $('/button').$0('innerHTML','�ύ','onclick',function(){self._doPost()})
	this._p.c = $('/span').$0('style',{display:'none'})
	this._p.uc = $('/span').$0('innerHTML','�û�')
	this._post.$0(
		this._p.c,
		this._p.hint,
		$('<table/>').$0(
			'style',{width:'100%'},
			$('<tbody/>').$0(
				$('<tr/>').$0(
					$('<td/>').$0(this._p.uc,'style','width:4.5em'),
					$('<td/>').$0(this._p.to)
					),	
				$('<tr/>').$0(
					$('<td/>').$0('innerHTML','����','style','width:4.5em'),
					$('<td/>').$0(this._p.subject)
					),
				$('<tr/>').$0(
					$('<td/>').$0('innerHTML','����','style','width:4.5em'),
					$('<td/>').$0(this._p.content)
					)
				),
			'className','msgpost'
			),
		this._p.button
		)
	}
this._p.type = type
this._p.subject.parentNode.parentNode.style.display=this._p.content.parentNode.parentNode.style.display=this._p.to.parentNode.parentNode.style.display=''
this.clearPost()
if(type==this._NEW){
	this._p.hint.innerHTML = '�����µĶԻ� �ռ��˿���<span title="�û���Ϊ����ʱǰ����� \ �� \12345">�û�ID���û���</span> ����ռ����ÿո�򶺺ŷָ� &nbsp; '
	this._p.hint._.add(
		$('/span','className','block_txt block_txt_c3 nobr','style','background:'+__COLOR.border3)._.add(
			this._p.iso=$('/input','type','checkbox'),
			'�Ի�������ֻ�ܿ����Լ��Ļظ�'
			)
		)
	if(commonui.preMessageHint)
		this._p.hint._.add(commonui.preMessageHint())
	this._p.uc.innerHTML = '�ռ���'
	this._p.mid = 0
	if(arg)this._p.to.value=arg
	this._switchDisplay(this._post)
	}
else if(type==this._REPLY){
	this._p.hint.innerHTML = '�ظ�һ����Ϣ �μӶԻ����û������Ķ�'
	this._p.to.parentNode.parentNode.style.display='none'
	this._addDisplay(this._post)
	}
else if(type==this._ADD){
	this._p.hint.innerHTML = '�������û�����˴ζԻ� ֮ǰ�ĶԻ�������ɼ� �ռ��˿���<span title="�û���Ϊ����ʱǰ����� \ �� \12345">�û�ID���û���</span> ����ռ����ÿո�򶺺ŷָ�'
	this._p.uc.innerHTML = '�ռ���'
	this._p.subject.parentNode.parentNode.style.display='none'
	this._p.content.parentNode.parentNode.style.display='none'
	this._addDisplay(this._post)
	}
else if(type==this._ADD_BLOCK){
	this._p.hint.innerHTML = '����µ������û� �����ε��û��޷�����Ի� �����û�����<span title="�û���Ϊ����ʱǰ����� \ �� \12345">�û�ID���û���</span> ����û��ÿո�򶺺ŷָ�'
	this._p.uc.innerHTML = '�����û�'
	this._p.subject.parentNode.parentNode.style.display='none'
	this._p.content.parentNode.parentNode.style.display='none'
	this._addDisplay(this._post)
	}
},//fe

clearPost:function(){
return this._p.subject.value = this._p.content.value = this._p.to.value=''
},

_pager:function(f, cur, max, next){
var $=window._$, i = cur-5, x=$('/div').$0('className','pager',$('/a').$0('innerHTML','��һҳ','href','javascript:void(0)','onclick',ff)._.sV('i',1)  ), limit = cur+5, ff=typeof(f)=='function'? function(){f(this._.gV('i'))} :null

if(max){
	if(limit>max)
		limit = max
	}
else if(next)
	limit = cur+1
else
	limit = cur
	
if(i<1)i=1

for(;i<=limit;i++){
	if(ff)
		x.$0( $('/a').$0('innerHTML', i,'href','javascript:void(0)','className', i==cur ? 'current' : null,'onclick',ff)._.sV('i',i) )
	else
		x.$0( $('/a').$0('innerHTML', i,'href',f.replace('{i}',i),'className', i==cur ? 'current' : null) )
	}
if(max){
	if(ff)
		x.$0( $('/a').$0('innerHTML','���ҳ','href','javascript:void(0)','onclick',ff)._.sV('i',max) )
	else
		x.$0( $('/a').$0('innerHTML','���ҳ','href',f.replace('{i}',max)) )
	}
return x
},



waitPost:function(){
this._post.style.display='none'
this._hint.innerHTML='�ύ��...'
this._hint.style.display=''
},

waitPostEnd:function(f){
if(!f)f=function(){}
var self = this
window.setTimeout(function(){
self._post.style.display=''
self._hint.style.display='none'
f()
},3100)
},
/*
* �ύ����
 */
_doPost:function(){

var s = this._p.subject.value.replace(/^\s*|\s*$/g,''),
c = this._p.content.value.replace(/^\s*|\s*$/g,''),
t = this._p.to.value.replace(/\s*,\s*/g,',').replace(/,,+/g,',').replace(/^[\s,]*|[\s,]*$/g,''),
self = this, $=window._$

if(this._p.type==this._NEW){
	if(s.length<1)return alert('�������')
	if(s.length>65)return alert('�������')
	if(c.length<1)return alert('���ݹ���')
	if(c.length>20000)return alert('���ݹ���')
	if(t==',' || t=='')return alert('δ��д������')
	this.waitPost();
	__NUKE.doPost({
		u:__API.messageNew(s,c,t, this.asUid, this._p.iso.checked ? 1 : null),
		b:this._p.button,
		t:this._p.c,
		f:function(x){
			x = self._conv2old(x)
			if(x && x.data){
				self.clearPost()
				return self.waitPostEnd(function(){alert(x.data)})
				}
			alert( x ? (x.error ? x.error : x.data ? x.data : 'error 2' ) : 'error 1')
			self.waitPostEnd()
			}
		})
	}
else if(this._p.type==this._REPLY){
	if(c.length<1)return alert('���ݹ���')
	if(c.length>20000)return alert('���ݹ���')
	this.waitPost();
	__NUKE.doPost({
		u:__API.messageReply(s,c,this._p.mid, this.asUid),
		b:this._p.button,
		t:this._p.c,
		f:function(x){
			x = self._conv2old(x)
			if(x && x.data){
				self.clearPost()
				return self.waitPostEnd(function(){alert(x.data);self.read(self._p.mid,-1)})
				}
			alert( x ? (x.error ? x.error : x.data ? x.data : 'error 2' ) : 'error 1')
			self.waitPostEnd()
			}
		})
	}
else if(this._p.type==this._ADD){
	if(t==',' || t=='')return alert('δ��д������')
	this.waitPost();
	__NUKE.doPost({
		u:__API.messageAdd(t,this._p.mid, this.asUid),
		b:this._p.button,
		t:this._p.c,
		f:function(x){
			x = self._conv2old(x)
			if(x && x.data){
				self.clearPost()
				return self.waitPostEnd(function(){alert(x.data);self.read(self._p.mid,-1)})
				}
			alert( x ? (x.error ? x.error : x.data ? x.data : 'error 2' ) : 'error 1')
			self.waitPostEnd()
			}
		})
	}
else if(this._p.type==this._ADD_BLOCK){
	if(t==',' || t=='')return alert('δ��д�û�')
	this.waitPost();
	__NUKE.doPost({
		u:__API.messageAddBlock(t, this.asUid),
		b:this._p.button,
		t:this._p.c,
		f:function(x){
			x = self._conv2old(x)
			if(x && x.data){
				self.clearPost()
				return self.waitPostEnd(function(){alert(x.data)})
				}
			alert( x ? (x.error ? x.error : x.data ? x.data : 'error 2' ) : 'error 1')
			self.waitPostEnd()
			}
		})
	}
},//fe

loadBlock : function(){
var self = this, o = this._list, $=window._$, d= new Date
httpDataGetter.script_muti_get(
	__API.messagelistBlock(this.asUid),
	function (r){
		r = self._conv2old(r)
		o.innerHTML =''
		if (!r){
			o.innerHTML = 'error'
			return
			}
		if(r.error){
			o.innerHTML = r.error
			return true
			}
		if(!r.data){
			o.innerHTML = '������'
			return true
			}
		if(typeof(r.data)=='string'){
			o.innerHTML = r.data
			return true
			}
		
		var x = $('/tbody'), i =0, d
		for(var k in r.data){
			if(k=='currentPage' || k=='maxPage' || k=='nextPage')continue
			d = r.data[k], cls=''
			x.$0(
				$('/tr').$0(
					$('/td').$0(
						$('/a').$0('href','/nuke.php?func=ucp&uid='+d.uid,
							'innerHTML',d.username,
							'target','_blank'
							),
						'className','c2',
						'style',{width:'50%'}
						),
					$('/td').$0(
						$('/a').$0('href','javascript:void(0)','innerHTML','[�������]','onclick',function(){if(this._clicked)return;this._clicked=true;this.style.color='silver';self._delBlock(this,this._.gV('buid'))})._.sV('buid',d.uid),
						'className','c2'
						),
					'className',cls+' postrow row'+(((i++)&1)+1)
					)
				)
			}//for
		o._.aC(
			$('/span').$0('class','b gray','innerHTML',d ? '�Ѿ����ε��û�' : 'δ�����κ��û�'),
			$('/table').$0(x,'className','forumbox msglist'),
			$('/span').$0('className','pager',$('/a').$0('innerHTML','[��������û�]','href','javascript:void(0)','onclick',function(){self.postUi(self._ADD_BLOCK)}))
			)
		self._switchDisplay(o)
		},//fe
	function (){},//fe
	'gbk'
	)
},//fe

read:function(mid,page){
var self = this, o = this._list, sf=arguments.callee, $=window._$ , d=new Date
if(!page)page = 1
this._p.mid = mid
this._p.currentReadPage = page
httpDataGetter.script_muti_get(
	__API.messageRead(mid, page, this.asUid),
	function (r){
		r = self._conv2old(r)
		o.innerHTML =''
		if (!r){
			o.innerHTML = 'error'
			self._switchDisplay(o)
			return
			}
		if(r.error){
			o.innerHTML = r.error
			self._switchDisplay(o)
			return true
			}
		if(!r.data){
			o.innerHTML = '������'
			self._switchDisplay(o)
			return true
			}
		if(typeof(r.data)=='string'){
			o.innerHTML = r.data
			self._switchDisplay(o)
			return true
			}
		if(r.data.userInfo){
			commonui.userInfo.setAll(r.data.userInfo)
			delete r.data.userInfo
			}
		var x = $('/tbody'), i =0, isS=(r.data.starterUid==self.asUid ? self.asUid : __CURRENT_UID)
		for(var k=0;k<r.data.length;k++){
			if(k=='currentPage' || k=='maxPage' || k=='nextPage' || k=='allUsers' || k=='starterUid')continue
			var d = r.data[k]
			if(d.data[1])
				d.data[1] = self._long2ip(d.data[1])
			var co = (d.content+'')
			if(d.from==0)//system message bug bbscode fix
				co=co.replace(/\[url\]\/read\.php\?tid=(\d+)\]\[b\]/g,function($0,$1){return '[url=/read.php?tid='+$1+'][b]'})
			x.$0(
				$('/tr').$0(
					$('/td').$0(
						$('/div').$0('className','posterInfoLine c1','innerHTML',commonui.posterInfo.main(1,i,0,mid,d.id,20,d.from,0)),
						$('/span').$0('className','postInfo')._.add(
							d.data[1]?$('/a').$0('className','silver stxt','href','javascript:void(0)','innerHTML','['+d.data[1]+']','onclick',function(e){commonui.ipArea(e,this.innerHTML.replace(/\[|\]/g,''))}) : null,
							' ',
							commonui.time2dis(d.time)),
						$('/h3').$0('innerHTML',d.subject )._.add(
							null	  
							),
						$('/br'),
						$('/span').$0(
							'innerHTML',ubbcode.bbsCode({
								txt:co.replace(/\n|\r/g,''),
								tId:mid,
								pId:d.id,
								authorId:d.from,
								rvrc:0,
								isSig:0,
								callBack:null,
								isLesser:0
								}),
							'className','ubbcode'),
						'className','c2'
						),
					'className','postrow row'+(((i++)&1)+1)
					)
				)
			}//for
		if(r.data.allUsers){
			console.log(r.data.allUsers)
			var y = (r.data.allUsers+'').split('\t'),z='<span class="b gray">����Ի����û�</span> '
			for(var j =0;j<y.length;j++)
				z+=(isS && y[j]!=(self.asUid ? self.asUid : __CURRENT_UID) ? "<a href='javascript:void(0)' class='darkred' style='padding:0' onclick='commonui.message._leaveTopic(this,"+mid+","+y[j]+")' title='�����û��ӶԻ����Ƴ� �û����޷��ٿ����Ի�����'>[x]</a>" : '')+"<a href='/nuke.php?func=ucp&uid="+y[j]+"' target='_blank'>"+y[++j]+"</a> "
			if(r.data.subjectBit & 32)
				z+=' <span class="block_txt block_txt_c3 nobr" style="background:'+__COLOR.border3+'">�Ի������ߵĻظ����಻�ɼ�</span>'
			}
		o._.aC(
			$('/table').$0(x,'className','forumbox msgread'),
			r.data.allUsers ? $('/div').$0('className','members','innerHTML',z) : null,
			self._pager(self._urlBase+self._rdm()+'#mid='+mid+'_{i}'/*function(i){location.hash='#mid='+mid+'_'+i;sf.call(self,mid,i)}*/,r.data.currentPage, r.data.maxPage , r.data.nextPage).$0(
				$('/span').$0(
					$('/a').$0('innerHTML','[�ظ�]','href','javascript:void(0)','onclick',function(){self.postUi(self._REPLY)}),
					$('/a').$0('innerHTML','[���������û�����Ի�]','href','javascript:void(0)','onclick',function(){self.postUi(self._ADD)}),
					$('/a').$0('innerHTML','[�˳��Ի�]','title','�˳��Ի����޷��ٿ����Ի�����','className','darkred','href','javascript:void(0)','onclick',function(){if(!window.confirm(this.title))return;self._leaveTopic(this,mid,(self.asUid ? self.asUid : __CURRENT_UID))}),
					__GP['super'] ? $('/a').$0('innerHTML','[ɾ���Ի�]','title','ɾ���Ի������ߺͲ����߽��޷��ٿ����Ի�����','className','darkred','href','javascript:void(0)','onclick',function(){if(this.innerHTML=='[ɾ���Ի�]')return this.innerHTML='[�ٵ��һ��ɾ���Ի�]',this.classNmae+=' darkred';self._delTopic(this,mid)}) : null
					)
				)
			)
		self._switchDisplay(o)
		return true
		},//fe
	function (){},//fe
	'gbk'
	)

},//fe

loadInbox:function(page){
var self = this, o = this._list, sf=arguments.callee, $=window._$, d= new Date
if(!page)page = 1
this._p.mid = 0
httpDataGetter.script_muti_get(
	__API.messageList(page, this.asUid),
	function (r){
		r = self._conv2old(r)
		o.innerHTML =''
		if (!r){
			o.innerHTML = 'error'
			self._switchDisplay(o)
			return
			}
		if(r.error){
			o.innerHTML = r.error
			self._switchDisplay(o)
			return true
			}
		if(!r.data){
			o.innerHTML = '������'
			self._switchDisplay(o)
			return true
			}
		if(typeof(r.data)=='string'){
			o.innerHTML = r.data
			self._switchDisplay(o)
			return true
			}
		
		var x = $('/tbody'), i =0,  y=__SETTING.bit & 16
		for(var k in r.data){
			if(isNaN(parseInt(k,10)))continue
			var d = r.data[k], cls=''
			if(d.bit & self._bit._MULTI_CONV)
				cls+='multi '
			if((d.bit & self._bit._UNREAD) == 0)
				cls+='readed '
			x.$0(
				$('/tr').$0(
					$('/td').$0(
						
						
						(function(from,fname,last,lname,all){
							var b = $('/span').$0('className','silver'),c=self.asUid ? self.asUid : __CURRENT_UID, a =function(i,n){
								return $('/a').$0('className','from'+(i==c?' silver':''),'href',i ? '/nuke.php?func=ucp&uid='+i : 'javascript:void(0)','innerHTML',i ? n : '#SYSTEM#' )
								}
							
							b._.add( a(from,fname))
							
							if(last && last!=from)
								b._.add(', ', a(last,lname)	)
							else
								last=0
							
							if(all){
								all = all.split('\t')
								for(var i=0;i<all.length;i+=2){
									if(all[i]==last || all[i]==from)continue
									if(c===true){
										b._.add('...')
										break
										}
									b._.add(', ', a(all[i],all[i+1])	)
									c=true
									}
								}
							return b
							})(d.from,d.from_username,d.last_from,d.last_from_username,d.all_user),

						((d.bit & self._bit._MULTI_CONV) ? $('/span').$0('className','silver nobr','innerHTML',' [����]') : null),
						'className','c2',
						'style',y?{fontSize:'0.846em'}:{}
						),
					$('/td').$0(
						(__GP['super']||__GP.ubStaff) ? $('/input').$0('type','checkbox','name',d.mid) : null,
						$('/a').$0('href',self._urlBase+self._rdm()+'#mid='+d.mid+'_1','innerHTML',d.subject,'className','subject','onclick',function(e){commonui.cancelBubble(e);self.read(this._.gV('mid'))})._.sV('mid',d.mid),
						$('/span').$0('innerHTML',' ('+d.posts+') ','className','silver nobr','title',d.posts+'���ظ�'),
						(d.posts > 20) ? $('/a').$0('href',self._urlBase+self._rdm()+'#mid='+d.mid,'innerHTML','>>','title','���ҳ','className','small_colored_text_btn stxt block_txt_c0 nobr','style',{marginRight:'0.5em'},'onclick',function(e){commonui.cancelBubble(e);self.read(this._.gV('mid'),-1)})._.sV('mid',d.mid) : null,
						$('/a').$0('innerHTML','x','title','�˳��Ի����޷��ٿ����Ի�����','className','small_colored_text_btn stxt block_txt_c0','href','javascript:void(0)','onclick',function(){if(!window.confirm(this.title))return;self._leaveTopic(this,this._.gV('mid'),(self.asUid ? self.asUid : __CURRENT_UID))})._.sV('mid',d.mid),
						'className','c2'
						),	
					$('/td').$0('style',y?{fontSize:'0.846em'}:{},'className','c2 time nobr','innerHTML',commonui.time2dis(d.last_modify),'title',commonui.time2date(d.last_modify, 'Y-m-d H:i')),
					'className',cls+' postrow row'+(((i++)&1)+1)
					)
				)
			}//for
		o._.add(
			$('/table').$0(x,'className','forumbox msglist','style',{tablelayout:'fixed'}),
			self._pager(self._urlBase+self._rdm()+'#p={i}'/*function(i){sf.call(self,i)}*/,r.data.currentPage, r.data.maxPage, i>self._PAGE_READ ? true :false),
			(__GP['super']||__GP.ubStaff) ? $('/a').$0('innerHTML','[ɾ��ѡ�жԻ�]',
				'title','ɾ���Ի������ߺͲ����߽��޷��ٿ����Ի�����',
				'className','darkred',
				'href','javascript:void(0)',
				'onclick',function(){
					if(this.innerHTML=='[ɾ��ѡ�жԻ�]')
						return this.innerHTML='[�ٵ��һ��ɾ���Ի�]',this.classNmae+=' darkred';
					var c = self._list.getElementsByTagName('input'),x = ''
					for(var i=0;i<c.length;i++){
						if(c[i].checked)
							x+=c[i].name+','
						}
					if(x)
						self._delTopic(this,x.substr(0,x.length-1))
					}) : null
			)
		self._switchDisplay(o)
		return true
		},//fe
	function (){},//fe
	'gbk'
	)
},//fe

_delBlock : function(o,uid){
var self = this
__NUKE.doPost({
	u:__API.messageDelBlock(uid,this.asUid),
	b:o,
	f:function(x){
		x = self._conv2old(x)
		alert( x ? (x.error ? x.error : x.data ? x.data : 'error 2' ) : 'error 1')
		}
	})
},//fe

_leaveTopic : function(o,mid,uid){
var self = this
__NUKE.doPost({
	u:__API.messageLeave(mid, uid, this.asUid),
	b:o,
	f:function(x){
		x = self._conv2old(x)
		alert( x ? (x.error ? x.error : x.data ? x.data : 'error 2' ) : 'error 1')
		}
	})
},//fe

_delTopic : function(o,mid){
var self = this
__NUKE.doPost({
	u:__API.messageDel(mid, this.asUid),
	b:o,
	f:function(x){
		x = self._conv2old(x)
		alert( x ? (x.error ? x.error : x.data ? x.data : 'error 2' ) : 'error 1')
		}
	})
},//fe
_long2ip : function (ip) {
if(typeof ip =='string' && ip.indexOf('.')!=-1)
	return ip
ip = __NUKE.toInt(ip)
return [ip >>> 24, ip >>> 16 & 0xFF, ip >>> 8 & 0xFF, ip & 0xFF].join('.');
},
_conv2old:function(r){
if(!r)
	return null
var o = {}
if(r.debug)
	o.debug = r.debug
if(r.data){
	for(var k in r.data){}
	o.data = r.data[k]
	}
if(r.error){
	for(var k in r.error){}
	o.error = r.error[k]
	}
return o
}

}//ce