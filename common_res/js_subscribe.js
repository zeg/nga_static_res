commonui.subscribe={};

commonui.subscribe.data = {};

commonui.subscribe.topicListForm = function(target){
var f = _$('<form/>');
f.target = target
f.method ='post'
f.className='subscribeTopicListForm';
var s = document.createElement('select');
var x = document.createElement('option');
x.value='';
x.innerHTML='请选择...';
s.appendChild(x);
s.onclick = function(){
	commonui.onloadforumlist(this);
	/*
	var x = document.createElement('option');
	x.value='0';
	x.innerHTML='我收藏的主题';
	x.style.backgroundColor='#ddddff';
	if (this.childNodes[1])
		this.insertBefore(x,this.childNodes[1]);
	else
		this.appendChild(x);
	*/
	this.name='fid'//commonui.onloadforumlist change the name
	}
f.innerHTML = '<h4>订阅版面</h4>';
f.appendChild(s);
var s = document.createElement('button');
s.innerHTML = '订阅';
s.onclick=function(){
	var sss = this.form.elements[0]
	if (!sss.options[sss.selectedIndex].value) return false
	this.form.action='/nuke.php?func=save_subscription&alert=1'
	this.form.submit();
	return false
	}
f.appendChild(s);
s = document.createElement('button');
s.innerHTML = '退订';
s.onclick=function(){
	var sss = this.form.elements[0]
	if (!sss.options[sss.selectedIndex].value) return false
	this.form.action='/nuke.php?func=save_subscription&del=1&alert=1'
	this.form.submit();
	return false
	}
f.appendChild(s);
if(__SUBSCRIPTIONS){
f._.aC(_$('<h4>订阅的版面</h4>'))
var i =0,x=_$('<ul/>')
for(var k in __SUBSCRIPTIONS)
	{
	x._.aC(
		_$('<li/>')._.aC(_$('<b>'+__SUBSCRIPTIONS[k]+'</b>'))._.aC(
			_$('<b>&emsp;<a href="/nuke.php?func=save_subscription&del=1&alert=1&fid='+k+'" target="'+target+'">[退订]</a></b>')._.css('visibility','hidden')
			)._.css('backgroundColor',__SUBSCRIPTIONS_COLOR[i])._.on('mouseover',function (){
				this.lastChild.style.visibility='visible'
			})._.on('mouseout',function (e){
				if (!e) var e = window.event;
				var to = e.relatedTarget || e.toElement;
				if (to && to != this && to.parentNode != this && to.parentNode.parentNode != this)
					this.lastChild.style.visibility='hidden'
			})
		)
	i++
	}
f._.aC(_$('<div/>')._.cls('topiclist')._.aC(x))
}

/*
s = document.createElement('button');
s.innerHTML = '全部刷新';
var self = this
s.onclick=function(){
	for (var k in self.data)
		{
		if($(k) && $(k)._reload)$(k)._reload.onclick();
		}
	return false
	}
f.appendChild(s);
*/
return f
}//fe



commonui.subscribe.loadTopicList = function(x,box){
var key = box.id;
var self=this;
if (x.innerHTML=='')
	{
	httpDataGetter.script_muti_get(
		(this.data[key] && this.data[key].data) ? '/nuke.php?func=load_subscription&fid='+this.data[key].fid+'&data_time='+this.data[key].data.time+'&rand='+Math.random() : '/nuke.php?func=load_subscription&fid='+this.data[key].fid,
		function(data)
			{
			if (!data)
				{
				return false;
				}
			if (data.error)
				{
				if (data.error=='no change')
					{
					data = self.data[key].data;
					}
				else
					{
					box._titletextbox.innerHTML = data.error;
					return true;
					}
				}
			self.data[key].data=self.objClone(data);
			if (data.fid)
				box._titletextbox.innerHTML='<a href="thread.php?fid='+data.fid+'" target="_blank">'+data.name+'</a>';
			else if (data.url)
				box._titletextbox.innerHTML='<a href="'+data.url+'" target="_blank">'+data.name+'</a>';
			else
				box._titletextbox.innerHTML=data.name;
			if (!data.readPrePage)data.readPrePage=20;
			x.innerHTML=commonui.genTopicList_1(data.data,data.readPrePage,25);
			if(sameWindowOpen)sameWindowOpen.init(x)
			return true;
			},
		function()
			{
			box._titletextbox.innerHTML='读取错误';
			},
		'gbk'
		);
	}
}//fe

commonui.subscribe.objClone = function(obj){
if(obj == null || typeof(obj) != 'object')return obj;
var temp = new obj.constructor();
for(var key in obj)temp[key] = this.objClone(obj[key]);
return temp;
}

if (domStorageFuncs){
addEvent(window,'beforeunload',function(){
for (var k in commonui.subscribe.data)
	if(commonui.subscribe.data[k]){
	domStorageFuncs.set(domStorageFuncs.domain+'_'+cookieFuncs.getCookie('ngaPassportUid')+'_subscription',cookieFuncs.json_encode(commonui.subscribe.data));
	break;
	}
});

var tmp = domStorageFuncs.get(domStorageFuncs.domain+'_'+cookieFuncs.getCookie('ngaPassportUid')+'_subscription')
if (tmp){
	eval('var tmp='+tmp)
	if(tmp)commonui.subscribe.data =tmp;
	}
}//end if


commonui.genTopicList_1=function(d,readPrePage,subjectLengthMax){
var html=new Array;
var liclass = "class='b1'";
var hot='';
var tid=0;
var title='';
var page='';
var titlefont=null;
var subject = ''
for (var k in d)
	{
	if (!d[k]) continue;

	if (liclass=="class='b1'") liclass = "class='b2'";
	else liclass = "class='b1'";

	if(d[k].hot)hot=d[k].hot;

	if(d[k].quote_from)tid=d[k].quote_from; else tid=d[k].tid;

	subject = d[k].subject;

	if(subject.length>subjectLengthMax)
		{
		title=subject;
		subject=subject.substr(0,subjectLengthMax)+'...';
		}
	else title='';

	if(d[k].titlefont)
		{
		titlefont=d[k].titlefont.split("~");
		if(titlefont[0])subject="<span class='"+titlefont[0]+"'>"+subject+"</span>";
		if(titlefont[1])subject="<b>"+subject+"</b>";
		if(titlefont[2])subject="<i>"+subject+"</i>";
		if(titlefont[3])subject="<u>"+subject+"</u>";
		}
	else if (d[k].quote_from)
		subject="<b>"+subject+"</b>";

	page='';
	if (d[k].replies+1>readPrePage)
		{
		if ((d[k].replies+1)%readPrePage==0)
			var maxp=(d[k].replies+1)/readPrePage;
		else
			var maxp=Math.floor((d[k].replies+1)/readPrePage)+1;
		page+=" <span class='pager'>[ ";
		for (var j=1; j<=maxp; j++)
			{
			if (j==6)
				{
				page+=" ... <a style='color:gray' href='/read.php?tid="+tid+"&page="+maxp+"'>"+maxp+"</a>";
				break;
				}
			page+=" <a style='color:gray' href='/read.php?tid="+tid+"&page="+j+"'>"+j+"</a>";
			}
		page+=' ]</span>';
		}
	subject=subject.replace(/(\[.+?\])/g,'<span class="silver">$1</span>')

	html.push("<li "+liclass+"><a href='/read.php?tid="+tid+"' title='"+title+"' target='_blank'>"+subject+"</a><span class='subinfo block'><span class='right'>"+page+" "+commonui.time2shortdate(d[k].postdate)+"</span> P:"+d[k].author+" R:"+d[k].lastposter+"</span></li>");
	}
if (html.length)
	return '<ul>'+html.join('')+'</ul>';
else
	return '<ul><li '+liclass+'><a href="javascript:void(0)">暂无主题</a></li></ul>';
}//fe