var __NEW_POST = function(ACTION,FID,STID,TID,PID,FBIT,isComment,_subject,_content,BIT,TMBIT1){
	var $=_$,
	o = {}, 
	toInt = function(x){return __NUKE.toInt(x)},
	__NEW = 'new',
	__REPLY = 'reply',
	__REPLY_BLANK = 'replyblank',
	__QUOTE = 'quote',
	__MODIFY = 'modify',
	
	_POST_IF_COMMENT=1,
	_POST_IF_HIDDEN=2,//�Ƿ�����
	_POST_IF_SELF_REPLY=256,//�Ƿ�ֻ���Լ��ظ�
	_POST_IF_SET=32768,//�Ƿ�Ϊ�ϼ�����
	_POST_IF_ANONYMOUS=262144,//�Ƿ���ʾ��������Ϣ
	
	__FORUM_IF_AUTO_TRANSLATE=8, //����������ͬ��ʷ����
	__FORUM_FREE_EDIT=16, //�༭���ⲻ��ʱ������
	__FORUM_IF_FORCE_TOPICKEY=256 //�Ƿ�������ǿ�Ʒ���



	FID = FID|0
	STID = STID|0
	TID = TID|0
	PID = PID|0
	FBIT = FBIT|0
	BIT = BIT|0
	TMBIT1 = TMBIT1|0

	if(ACTION != __MODIFY)
		BIT = 0
	if(ACTION == __NEW)
		TMBIT1 = 0
	
	if(!FID)
		return console.log('__NEW_POST ERROR 1');

	if((ACTION == __REPLY || ACTION == __QUOTE || ACTION == __MODIFY) && !TID && !PID)
		return console.log('__NEW_POST ERROR 2');

	var R = {}
	
	var o_button = R.o_button = $('/a').$0(
			'onclick',function(){
				newPost()
				},
			'href','javascript:void(0)',
			'innerHTML',(ACTION==__NEW ? '��������' : ACTION==__MODIFY ? '����༭' : '����ظ�')
			),
	
	o_comment = R.o_comment = $('/input','type','checkbox','checked',(BIT & _POST_IF_COMMENT)||isComment ? 1 : ''),

	o_setTopic = R.o_setTopic = $('/input','type','checkbox','checked',(BIT & _POST_IF_SET) ? 1 : ''),

	o_subject = R.o_subject = $('/input','value',_subject),//����

	o_content = R.o_content = $('/textarea','value',_content),//����

	o_hidden = R.o_hidden = $('/input','type','checkbox','checked',(BIT & _POST_IF_HIDDEN) ? 1 : ''),//�������� �������ɼ�

	o_selfReply = R.o_selfReply = $('/input','type','checkbox','checked',(BIT & _POST_IF_SELF_REPLY) ? 1 : ''),//ֻ�����ߺͰ����ɻظ�

	o_attach = R.o_attach = $('/input','type','hidden'),//����
	o_attachChk = R.o_attachChk = $('/input','type','hidden'),//����У��

	o_vote = R.o_vote = $('/textarea'),//ͶƱ����

	o_voteType = R.o_voteType = $('/select',
			$('/option','value','','innerHTML','ͶƱ'),
			$('/option','value','1','innerHTML','Ͷעͭ��')
			),// 0ͶƱ 1Ͷעͭ��

	o_voteMax = R.o_voteMax = $('/input','size','3','value',1,'title','ÿ������Ͷ'),//ÿ������Ͷ 0����
	o_voteEnd = R.o_voteEnd = $('/input','size','3','value','����','title','Сʱ�����'),//Сʱ�����
	o_voteBetMax = R.o_voteBetMax = $('/input','size','3','title','ͭ��'),//Ͷע���ֵ
	o_voteBetMin = R.o_voteBetMin = $('/input','size','3','title','ͭ��'),//Ͷע��Сֵ
	o_voteLimit = R.o_voteLimit = $('/input','size','5','title','��������ĵ�һ������ -21000~21000'),//ͶƱ����������

	o_modifyAppend = R.o_modifyAppend = $('/select','title','���ӳ����޸�ʱ�ޣ��ڴ��ύ�����ݽ���������ԭ��',
			$('/option','value','1','innerHTML', 'ĩβ'),
			$('/option','value','2','innerHTML', '��ͷ')
			),

	o_anony = R.o_anony = $('/input','type','checkbox','checked',(BIT & _POST_IF_ANONYMOUS) ? 1 : ''),//����
	o_liveTopic = R.o_liveTopic = $('/input','type','checkbox' ),//live
	o_replyAnony = R.o_replyAnony = $('/input','type','checkbox')//�������еĻظ��Զ�����
	
	
	

	if(ACTION!=__NEW)
		o_anony.disabled = o_liveTopic.disabled = o_replyAnony.disabled = o_vote.disabled = o_voteType.disabled = o_voteMax.disabled = o_voteEnd.disabled = o_voteBetMax.disabled = o_voteBetMin.disabled = o_voteLimit.disabled = o_setTopic.disabled = o_comment.disabled = 1	
	else
		o_modifyAppend.disabled = 1
	

	
	
	var getValue = function(o){
		if(o.disabled)
			return null
		if(o.type=='checkbox')
			return o.checked ? 1 : null
		return o.value.replace(/^\s+|\s+$/g,'')
		}
	
	var newPost = function(){
		if(__NEW_POST.lock)
			return
		__NEW_POST.lock=true
		
		if(!__NEW_POST['cache_'+FID])
			__NEW_POST['cache_'+FID] = {}
		var cache = __NEW_POST['cache_'+FID]
		
		var self=this, c = this, argBak = arguments, redo=function(){newPost.apply(window,argBak)}, unlock=function(x){if(x)alert(x);__NEW_POST.lock=false}, postfunc = window.postfunc

		if(ACTION == __REPLY_BLANK)
			ACTION = __REPLY

		if(ACTION == __NEW && !this.quoteTo)
			return loader.script(__SCRIPTS.quoteTo,function(){unlock();redo()})


		var a = {
				nojump:1,
				lite:'htmljs',
				step:2,
				action:				ACTION,
				fid:				FID,
				tid:				TID,
				pid:				PID,
				stid:				STID,
				post_subject:		getValue(o_subject),
				post_content:		getValue(o_content),
				mention:				'',
				hidden:				getValue(o_hidden),
				self_reply:			getValue(o_selfReply),
				attachments:		getValue(o_attach),
				attachments_check:	getValue(o_attachChk),
				hidden_content:		'',
				filter_key:			null,
				has_auto_translate:	'',
				hide_upload:		null,
				content_not_modify:	'',
				subject_not_modify:	'',
				from_device:		'',
				from_client:		'',
				newvote:			getValue(o_vote),
				newvote_type:		getValue(o_voteType),
				newvote_max:		getValue(o_voteMax),
				newvote_end:		getValue(o_voteEnd),
				newvote_betmin:		getValue(o_voteBetMin),
				newvote_betmax:		getValue(o_voteBetMax),
				newvote_limit:		getValue(o_voteLimit),
				modify_append:		getValue(o_modifyAppend),
				comment:			getValue(o_comment),
				anony:				getValue(o_anony),
				live:				getValue(o_anony),
				reply_anony:			getValue(o_replyAnony)
				}

		//�����еķ���
		var x = _$('</span>')
		x.innerHTML = a.post_subject
		a.post_subject = x.innerHTML.replace('&lt;','<').replace('&gt;','>').replace('&amp;','&')


		//���ݹ���
		if(a.post_content.length<3)
			return unlock('���ݹ���');

		if(a.comment && a.post_content.length>420)
			return unlock('���ݹ���');

		//�������
		if(ACTION == __NEW && a.post_subject.length<1)
			return unlock('�������');

		//����ȷ��
		if (postfunc.o_attachForm)
			if(postfunc.o_waitAttachList.firstChild)
				if (!window.confirm('ȷ�ϸ����Ѿ�ȫ���ϴ����?'))
					return unlock();

		//CONTENT Chk
		if(a.post_content.length && ubbcode && ubbcode.postContentChk){
			a.post_content = ubbcode.postContentChk(a.post_content)
			if(a.post_content===false)
				return unlock('CONTENT ERROR')
			}

		//�Ƿ�������ǿ�Ʒ���
		if(ACTION == __NEW && (FBIT & __FORUM_IF_FORCE_TOPICKEY)){
			if (cache._topic_key){
				var x,y,z
				for (var k in cache._topic_key){
					x = cache._topic_key[k]
					if(x[1]){
						y=1
						if(x[0].indexOf('[')==0) x=x[0]
						else x='['+x[0]+']'
						if (a.post_subject.indexOf(x)!=-1)
							z=1
						}
					}
				if (y==1 && z!=1)
					return unlock('�����Ӱ���ָ�����������(��ɫ)��ѡ��һ������');
				}
			else{
				cache._topic_key={}
				__NUKE.doRequest({
					u:__API.topic_key(fid),
					f:function(d){
						if(__NUKE.doRequestIfErr(d,3600))
							return false
						if(!d.data || d.error)
							cache._topic_key = {}
						else{
							if(typeof d.data[0][0] == 'object')
								d.data = d.data[0]
							cache._topic_key = d.data;
							}
						unlock()
						window.setTimeout(redo,100)
						return true
						}
					})//doRequest
				return false;
				}
			}
		/*
		//�Ƿ������ü���
		if (fid && (fbit & postfunc._bit.if_filter_key)){
			if (cache._filter_key){
				for(var k in cache._filter_key){
					var x = cache._filter_key[k]
					if (subject.indexOf(x)!=-1 || content.indexOf(x)!=-1 ){
						filterKey = 2
						break;
						}
					}
				}
			else{
				cache._filter_key={}
				__NUKE.doRequest({
					u:__API.filter_key(fid),
					f:function(d){
						if(__NUKE.doRequestIfErr(d,86400)){
							alert('���������ص����ݳ�ʱ �뱨�����Ա')
							return false
							}
						if(!d.data)
							return true
						cache._filter_key = (typeof d.data[0]=='object') ? d.data[0] : d.data
						unlock()
						window.setTimeout(redo,100)
						return true
						}
					})//doRequest
				return false;
				}
			}
		*/

		//�Զ�����
		if (FID && (FBIT & __FORUM_IF_AUTO_TRANSLATE)){
			if(cache._auto_translate_table){
				if( commonui.autoTranslate.test(a.post_content) )
					hasAutoTran = 1
				}
			else{
				commonui.autoTranslate.main(null, FID, function(){
					cache._auto_translate_table = true
					unlock()
					window.setTimeout(redo,100)
					})
				return false;
				}
			}

		//����@����
		var x = a.post_content.match(/\[@.{2,30}?\]/g)
		if (x){
			var y=[]
			for (var i=0;i<x.length;i++ )
				y[x[i].substr(2,x[i].length-3).replace(/^\s+|\s+$/,'')]=1
			x='',i=0
			for (var k in y){
				x+='\t'+k;
				i++;
				if(i>4)break;
				}
			if(x)
				a.mention = x.substr(1)

			}

		//����
		/*
		if (postfunc.uploadedAttach){
			var x = true
			for (var i=0;i<postfunc.uploadedAttach.length;i++){
				if (content.indexOf(postfunc.uploadedAttach[i][0])==-1){
					x=false
					break;
					}
				}
			if (x)
				hideUpload=1
			}
		*/

		//���������õ�ǿ�Ƹ�Ϊ���� 
		/*
		if (ACTION == __REPLY || ACTION == __QUOTE){
			if(pid){
				if (content.substr(0,50).indexOf('[pid='+pid+'][b]Post by')==-1)
					ACTION = __REPLY
				}
			}
		*/

		if(postfunc.postPerCheck && postfunc.postPerCheck(argBak))//�Զ����� ����true��ֹ����
			return unlock();

		//���޸ı��
		if (ACTION == __MODIFY){
			if(_content == a.post_content)
				a.content_not_modify=1
			if(_subject == a.post_subject)
				a.subject_not_modify=1
			}

		//device
		if(__SETTING.bit & 32768){
			var x = postfunc.deviceDetect()
			if(x){
				a.from_device=x[0]
				a.from_client=x[1]
				}
			}


		__NUKE.doRequest({
			u:__API.post(ACTION,//����
				fid,//����id
				tid,//����id
				pid,//�ظ�id
				stid,
				subject,//����
				content,//����
				mention,//����@����
				getValue(o_hidden),//�������� �������ɼ�
				selfReply,//ֻ�����ߺͰ����ɻظ�
				attach,//����
				attachChk,//����У��
				hiddenInfo,//����de����
				filterKey,//have����word
				hasAutoTran,//have�Զ�����word
				hideUpload,//�����ϴ��ļ�
				contentNoMod,//�������޸�
				subjectNoMod,//�������޸�
				fromDevice,//�����豸
				fromClient,//����ϵͳ
				vote,//ͶƱ����
				voteType,// 0ͶƱ 1Ͷעͭ��
				voteMax,//ÿ������Ͷ 0����
				voteEnd,//Сʱ�����
				voteBetMax,//Ͷע���ֵ
				voteBetMin,//Ͷע��Сֵ
				voteLimit,//ͶƱ����������
				modifyAppend,
				comment,
				anony,
				live,
				replyAnony
				),
			b:btn,
			f:function(d){
				if(d.data && d.data.__MESSAGE && d.data.__MESSAGE[1]=="������� ..."){
					if(postfunc.pwindow)
						postfunc.pwindow._.hide()
					c.createadminwindow()
					c.adminwindow._.addContent(null)
					c.adminwindow._.addTitle(d.data.__MESSAGE[1])

					var c01,c02,c03=d.data.__MESSAGE[5],c04=5,u = 'http://'+window.location.host+'/read.php?tid='

					c.adminwindow._.addContent(
						c01 = _$('/div')._.cls('ltxt b')._.add(
							"������� ",
							c02 = _$('/span').$0('innerHTML',c04),
							'�����ת ',
							_$('/a').$0('href',u+(c03?c03:tid)+'&page=e','className','gray','innerHTML','(�����ת)'),
							' ',
							_$('/a').$0('href','javascript:void(0)','className','gray','innerHTML','(���ȡ����ת)'),
							ACTION==__NEW ? _$('/span').$0('innerHTML',c.quoteTo.afterPostQuote(true,subject,u+c03)) : ''
							)//c01
						);//addContent
					c.adminwindow._.on(
						'mousedown',function(){
							window.clearInterval(c01._countTimeout)	
							}
						)
					c.adminwindow._.show()

					c01._countTimeout = window.setInterval(function(){
						c04--
						c02.innerHTML = c04
						if(c04<1)
							window.location.href=u+(c03?c03:tid)+'&page=e'
						}, 1000)

					window.setTimeout(function(){unlock()},1000)

					return true
					}//if

				alert( (d.data && d.data.__MESSAGE && d.data.__MESSAGE[1]) ? d.data.__MESSAGE[1] : 'DATA ERROR')

				unlock()

				return true
				},//fe

			ff:function(){
				alert('REQUEST ERROR')
				unlock()
				}//fe
			})

		}//fe
	}