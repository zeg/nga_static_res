//�����б�
if (!window.ubbcode)var ubbcode={}
if (window.location.href.indexOf('noBBCode')!=-1)ubbcode.noBBCode = true
ubbcode.forum_id = 0;


ubbcode.bbscode_pre = function(arg){
arg.txt = arg.txt.replace(/p_w_upload/gi,"attachment");//[img]

}//fe

ubbcode.bbscode_mid=function(arg)
{
var self = this

if(arg.txt.indexOf('[customachieve')!=-1){

var customachievecount = 0
arg.txt = arg.txt.replace(/\[customachieve\](.+?)\[\/customachieve\]/gi,
function($0,$1)
	{
	if (arg.isSig && customachievecount)
		return $0;
	customachievecount++;
	var i = $1.match(/\[img\](https?:\/\/.+?\.[a-zA-Z]{1,4})\[\/img\]/i);
	var t = $1.match(/\[title\](.{1,40}?)\[\/title\]/i);
	var x = $1.match(/\[txt\](.{1,100}?)\[\/txt\]/i);
	if (!i)
		i={0:0,1:__IMG_STYLE+'/achieve_default.jpg'};
	else
		i[1]=i[1].replace(/^http:\/\/db1?\.178\.com\//i,'http://img.db.178.com/')
	if (t && x){
		return "<div style='width:512px;height:74px'>\
<div style='width:76px;height:74px;margin:0px 0px -74px 3px;background:#000 url("+i[1]+") 50% 50%'></div>\
<div style='width:512px;height:74px;background:url("+__IMG_STYLE+"/achieve_bg.png);font-size:12px;font-family:Microsoft Yahei, Verdana, Tahoma, Arial, sans-serif;text-align:center;overflow:hidden;color:#000'><div style='width:362px;margin:auto'>\
<h2 style='display:block;font-size:14px;line-height:22px;height:22px;color:#000;margin:0px 0px -23px 0px;padding:1px 1px 0px 0px'>"+t[1]+"</h2>\
<h2 style='display:block;font-size:14px;line-height:22px;height:22px;color:#fff;margin:0px 0px 5px 0px'>"+t[1]+"</h2>"+x[1]+"\
</div></div>\
</div>";
		}
	else
		return $0;
	}
);

}//if


if(arg.txt.indexOf('[dict')!=-1){
arg.txt = arg.txt.replace(/\[dict\](.+?)\[\/dict\]/gi,function(b,a){
var t = ''
a = a.replace(/^\[(.+?)\]/,function(c,d){t=d;return ''}).replace(/^\s*<br\s*\/?\s*>\s*|\s*<br\s*\/?\s*>\s*$/gi,'')
if(!t || t.length>20)return b
if(!ubbcode.bbscodeExplainSave)ubbcode.bbscodeExplainSave={}
t = '['+t.replace(/\s*<br\s*\/?\s*>\s*/gi,' ').replace(/^\s+|\s+$/gi,'')+']'
if(a && !ubbcode.bbscodeExplainSave[t])
	ubbcode.bbscodeExplainSave[t]=a
return "<a href='javascript:void(0)' class='b' style='color:inherit' onclick='ubbcode.explainShow(event,this,\""+arg.argsId+"\",this.innerHTML)'>"+t+"</a>"
})
}//if

if(arg.txt.match(/\[(item|spell|quest|npc|achieve|hsdeck|lordeck|wowdb|wow|lol|hscard|d3db|crdb)/i)){

arg.txt = arg.txt.replace(/\[(item|spell|quest|npc|achieve)(=[^\]]{1,20})?\](.{1,100}?)\[\/(item|spell|quest|npc|achieve)\]/gi,function($0,$1,$2,$3,$4){
if ($1!=$4)return $0
if($2)$2 = $2.substr(1)
return commonui.dbLinkGen.linkGen('[wow,'+$1+($2 ? ','+$2 : '')+'['+$3+']]')
});//[db]

if(!arg.isSig && arg.txt.indexOf('deck]')!=-1){
arg.txt = arg.txt.replace(/\[hsdeck\](.+?)\[\/hsdeck\]/gi,function($0,$1){
	var x = $1.split(/\s*<br\s*\/?\s*>\s*|\s*\n\s*/ig),y = [],z='',v={},w='',l=[],h=0
	for(var i=0;i<x.length;i++){
		var m=x[i].match(/(\d+),(.+?),(.+?),(\d+),(\d+),(\d+)/)
		if(!m)continue
		m[6] = parseInt(m[6],10)
		m[4] = parseInt(m[4],10)
		y.push("<span class='cost'><span class='icon'>&nbsp;</span>"+m[4]+"</span> <span class='img' style='background:url(http://img.db.178.com/wow/icons/hs/cardimage_en_m/"+m[3]+".jpg) -65px -100px'>&emsp;&emsp;&emsp;&emsp;&emsp;</span> <span class='q"+m[5]+"'>[wow,hscard,"+m[1]+",cn["+m[2]+"]]</span> <span class='count'>x"+m[6]+"</span>")
		if(!v[m[4]])v[m[4]]=0
		v[m[4]]+=m[6]
		l.push(m[1]+':'+m[6])
		}
	if(!y.length)return $1
	var x =Math.ceil(y.length/3),u=x
	for(var i=0;i<y.length;i++){
		if(i==x){
			z+="</td><td class='np'>"
			if((u&1)==0)
				h = h^1
			x+=u
			}
		h = h^1
		z+="<div class='hsdeckcard bg"+h+"'>"+y[i]+"</div>"
		}
	for(var k in v){
		w+="<td class='bar'><div style='height:"+(v[k]*0.2)+"em;width:2em'></div>"+k+" x "+v[k]+"</td>"
		}
	return "<div class='hsdeck'><table><tbody><tr><td class='np'>"+z+"</td></tr><tr><td colspan=4><table><tbody><tr>"+w+"<td class='link'><a class='b gray' href='http://db.178.com/hs/deck/#1^"+l.join(',')+"'>[����ģ��]</a></td></tr></tbody></table></td></tr></tbody></table></div>"
	});//[hsdeck]

arg.txt = arg.txt.replace(/\[lordeck\](.+?)\[\/lordeck\]/gi,function($0,$1){
	return "<div class='lordeck' style='display:none'>"+$1+"</div><img src='about:blank' style='display:none' onerror='ubbcode.loadlordeck(this.previousSibling,this)'/>"
	});//[hsdeck]

}//

arg.txt = arg.txt.replace(/\[wowdb\[([^\]]{2,100})\]\]/gi,function($0,$1){$1=$1.replace(/^ | $/,'');
return commonui.dbLinkGen.linkGen('wow','cn',$1)});//[db]

arg.txt = arg.txt.replace(/\[(item|spell|quest|npc|achieve)(=[^\[]{1,20})?\[([^\]]{2,100})\]\]/gi,function($0,$1,$2,$3){
if($2)$2 = $2.substr(1)
return commonui.dbLinkGen.linkGen('[wow,'+$1+($2 ? ','+$2 : '')+'['+$3+']]')
});//[db]

arg.txt = arg.txt.replace(/\[(?:wow|lol|hscard|d3db|crdb|anydb)(?:,[a-z0-9,]+)?\[[^\]]{2,100}\]\]/gi,function($0){
return commonui.dbLinkGen.linkGen($0)
});//[db]

}//if




if(arg.txt.indexOf('armory')!=-1){

var armory_limit = arg.isSig ? 1 : 5,
armory_count = 0

if(!ubbcode.armoryArg)
	ubbcode.armoryArg=[]
var amA = ubbcode.armoryArg,
d3arm = function($0,$1,$2,$3){
	++armory_count
	amA.push(decodeURIComponent($2))
	amA.push($3)
	var v = '{battleTag:ubbcode.armoryArg['+(amA.length-2)+'],nameOrId:ubbcode.armoryArg['+(amA.length-1)+'],o:this.previousSibling,host:"'+$1.toLowerCase()+'"}'
	if (armory_count>armory_limit)
		return "<span><b>["+$2+" "+$3+"]</b></span><img src='about:blank' style='display:none' onerror='d3armory.get("+v+",-1)'/>"
	else
		return "<div style='width:"+(arg.maxWidth*0.9)+"px'></div><img src='about:blank' style='display:none' onerror='d3armory.get("+v+",0)'/>"
	}
		  
arg.txt = arg.txt.replace(/(?:<br\s*\/?>)?\s*\[url\]http:\/\/www\.diablo3\.com\.(cn)\/profile\/([^\-]+-\d+)\/(\d+?)#armory\[\/url\]\s*(?:<br\s*\/?>)?/gi,d3arm);

arg.txt = arg.txt.replace(/(?:<br\s*\/?>)?\s*\[url\]http:\/\/(tw|eu|us|cn)\.battle\.net\/d3\/[^\/]+\/profile\/([^\-]+-\d+)\/hero\/(\d+?)#armory\[\/url\]\s*(?:<br\s*\/?>)?/gi,d3arm);
	//[diablo3]

arg.txt = arg.txt.replace(/(?:<br\s*\/?>)?\s*\[(us|cn|tw|eu)armory (.{1,50}?) ([^ ]{1,50}?)\s*\]\s*(?:<br\s*\/?>)?/gi,function($0,$1,$2,$3){
	++armory_count
	amA.push($2)
	amA.push($3)
	if (armory_count>armory_limit)
		return "<span><b>["+$2+" "+$3+"]</b></span><img src='about:blank' style='display:none' onerror='armory.get(ubbcode.armoryArg["+(amA.length-2)+"],ubbcode.armoryArg["+(amA.length-1)+"],this.previousSibling,\""+$1.toLowerCase()+"\",-1)'/>"
	else
		return "<div style='width:"+(arg.maxWidth*0.9)+"px'></div><img src='about:blank' style='display:none' onerror='armory.get(ubbcode.armoryArg["+(amA.length-2)+"],ubbcode.armoryArg["+(amA.length-1)+"],this.previousSibling,\""+$1.toLowerCase()+"\",0)'/>"
	});
	//[armory]

arg.txt = arg.txt.replace(/(?:<br\s*\/?>)?\s*\[(us|cn|tw|eu)d3armory (.{1,50}?)\s*\]\s*(?:<br\s*\/?>)?/gi,function($0,$1,$2){
	++armory_count
	$2 = $2.split(' ')
	if(!$2[1])$2[1]=''
	amA.push($2[0])
	amA.push($2[1])
	var v = '{battleTag:ubbcode.armoryArg['+(amA.length-2)+'],nameOrId:ubbcode.armoryArg['+(amA.length-1)+'],o:this.previousSibling,host:"'+$1.toLowerCase()+'"}'
	if (armory_count>armory_limit)
		return "<span><b>["+$2[0]+" "+$2[1]+"]</b></span><img src='about:blank' style='display:none' onerror='d3armory.get("+v+",-1)'/>"
	else
		return "<div style='width:"+(arg.maxWidth*0.9)+"px'></div><img src='about:blank' style='display:none' onerror='d3armory.get("+v+",0)'/>"
	});
	//[d3armory]
	
arg.txt = arg.txt.replace(/(?:<br\s*\/?>)?\s*\[(us|cn|kr|eu|xb|ps)owarmory (.{1,50}?)\s*\]\s*(?:<br\s*\/?>)?/gi,function($0,$1,$2){
	++armory_count
	var plt = 'pc'
	if($1=='xb')
		$1 = '', plt='xbox'
	else if($1=='ps')
		$1 = '', plt='psn'
	//$2=ubbcode.secureText($2)
	var k = owarmory.insert({battleTag:$2,host:$1,plt:plt})
	if (armory_count>armory_limit)
		return "<span id='"+k+"'><b>["+$2[0]+" "+$2[1]+"]</b></span><img src='about:blank' style='display:none' onerror='owarmory.get(\""+k+"\",-1)'/>"
	else
		return "<div id='"+k+"' style='width:"+(arg.maxWidth*0.9)+"px'></div><img src='about:blank' style='display:none' onerror='owarmory.get(\""+k+"\",0)'/>"
	});


arg.txt = arg.txt.replace(/(?:<br\s*\/?>)?\s*\[(cn)wotarmory (.{1,50}?) (.{1,50}?)\]\s*(?:<br\s*\/?>)?/gi,function($0,$1,$2,$3){
	++armory_count
	$2=$2.replace(/^\s+|\s+$/g,'')
	$3=$3.replace(/^\s+|\s+$/g,'')
	amA.push($2)
	amA.push($3)
	if (armory_count>armory_limit)
		return "<span><b>["+$2+" "+$3+"]</b></span><img src='about:blank' style='display:none' onerror='wotArmory.get({host:\""+$1+"\",realm:ubbcode.armoryArg["+(amA.length-2)+"],name:ubbcode.armoryArg["+(amA.length-1)+"],o:this.previousSibling},-1)'/>"
	else
		return "<div style='width:"+(arg.maxWidth*0.9)+"px'></div><img src='about:blank' style='display:none' onerror='wotArmory.get({host:\""+$1+"\",realm:ubbcode.armoryArg["+(amA.length-2)+"],name:ubbcode.armoryArg["+(amA.length-1)+"],o:this.previousSibling},0)'/>"
	});

arg.txt = arg.txt.replace(/(?:<br\s*\/?>)?\s*\[(cn)?jnarmory (.{1,50}?) (.{1,50}?)\]\s*(?:<br\s*\/?>)?/gi,function($0,$1,$2,$3){
	++armory_count
	if(!$1)$1 = 'cn'
	$2=$2.replace(/^\s+|\s+$/g,'')
	$3=$3.replace(/^\s+|\s+$/g,'')
	amA.push($2)
	amA.push($3)
	if (armory_count>armory_limit)
		return "<span><b>["+$2+" "+$3+"]</b></span><img src='about:blank' style='display:none' onerror='jnArmory.get({host:\""+$1+"\",realm:ubbcode.armoryArg["+(amA.length-2)+"],name:ubbcode.armoryArg["+(amA.length-1)+"],o:this.previousSibling},-1)'/>"
	else
		return "<div style='width:"+(arg.maxWidth*0.9)+"px'></div><img src='about:blank' style='display:none' onerror='jnArmory.get({host:\""+$1+"\",realm:ubbcode.armoryArg["+(amA.length-2)+"],name:ubbcode.armoryArg["+(amA.length-1)+"],o:this.previousSibling},0)'/>"
	});

}//if
/*
if(arg.fId && (arg.fId==400 || arg.fId==318 || arg.fId==395 || arg.fId==396 || arg.fId==446 || arg.fId==397 || arg.fId==398 || arg.fId==399)){
arg.txt = arg.txt.replace(/(?:<br\s*\/?>)?\s*\[diablo3charsim\]([^\x00]+?)\[\/diablo3charsim\]\s*(?:<br\s*\/?>)?/gi,function($0,$1){

	var a = 'd3sim_'+Math.random()
	if(!self.cache)self.cache={
		d3sim_24456 : function(o,id){
			o.contentDocument.getElementById('sharelink').value = this[id]
			o.contentWindow.createdBtn()
			o.contentWindow.proStart()
			}
		}
	self.cache[a] = self.unSecureText($1)
	return "<div><iframe style='width:100%;height:1500px;border:none' frameborder=0 allowtransparency='true' src='/misc/d3selector.html' onload='ubbcode.cache.d3sim_24456(this,\""+a+"\")'></iframe></div>"
	});
}//if
*/
}//fe

ubbcode.loadlordeck = function(o,oo){
if(!window.LoRDeck){
	if(window.LoRDeck!==false){
		window.LoRDeck = false
		return __SCRIPTS.load(__IMG_STYLE+'/js_lor_deck.js?1',function(){LoRDeck.init();ubbcode.loadlordeck(o)})
		}
	else
		setTimeout(function(){ubbcode.loadlordeck(o)},200)
	}

o.innerHTML = LoRDeck.encode(o.innerHTML)
o.style.display=''
//oo.parentNode.removeChild(oo)
}//


ubbcode.bbscode_aft=function(arg){
/*
c = c.replace(/\[MURtopic (\d{1,11}) ?(\d{0,11})\]/i,function($0,$1,$2)
	{
	if(!$2)$2=0;
	var id=Math.random()*1000;
	window.setTimeout(function(){commonui.loadtopic_js($('topiclist'+id),Array('data/bbscache/load_topic_cache/mostuserrecommend_'+$1+'_'+$2+'.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&f=mostuserrecommend&js=1&fid='+$1+'&day='+$2+'&timeout='+3600*1.1),3600*1.1)});
	return "<div class='topiclist' id='topiclist"+id+"' name='topiclist'></div>"
	});//[MURtopic]

if(arg.prefix)
	c = this.contentPrefix(c,arg)
c+="<img src='about:blank' style='display:none' onerror='ubbcode.copyChk(this.parentNode,\""+arg.argsId+"\")'/>";
return c
	*/
}
//fe

ubbcode.explainShow = function(e,o,argsId,name){
var z=this.bbscodeExplainSave,x=z[name]
if(typeof x=='string'){
	var arg = __NUKE.inheritClone(this.bbscodeConvArgsSave[argsId])
	arg.txt = x
	arg.c=arg.suffix=null
	arg.noCov = 1
	arg.isBlock = 1
	arg.maxWidth = arg.maxWidth>600?600:((arg.maxWidth*0.9)|0)
	arg.opt|=64|256
	this.bbsCode(arg)
	x=arg
	z[name] = x
	}
if(!this.bbscodeExplainO)
	this.bbscodeExplainO = commonui.createCommmonWindow()
var y=this.bbscodeExplainO
y._.addContent(null)
y._.addTitle(name)
y._.addContent(_$('/div','style','maxWidth:'+x.maxWidth+'px','innerHTML',x.txt))
y._.show(e)
}//fe



//�������ݴ��� ����󷵻�false
ubbcode.postContentChk = function (c){
c = c.replace(/\r?\n\[::������˹���ҵ��� BBS.NGA.CN::\]\r?\n/g,'');
return c
}//fe

ubbcode.codeHelpSpecial = [
{
	0:'<b>[customachieve]</b><br/><nobr>�Զ���ɾ�</nobr>',
	1:"<b>����һ���Լ��������ݵĳɾ�</b>\n\
\n\
[customachieve]\n\
[title]�ɾ͵�����(����������)[/title]\n\
[txt]�ɾ͵�˵������(����������)[/txt]\n\
[/customachieve]\n\
\n\
[customachieve]\n\
[title]�ɾ͵�����(����������)[/title]\n\
[txt]�ɾ͵�˵������(����������)[/txt]\n\
[img]�ɾ͵�ͼ��(���Ե�ַ)[/img]\n\
[/customachieve]\n\
",
	2:{
		0:{'hint':'�ɾ͵�����(����������)'},
		1:{'hint':'�ɾ͵�˵������(����������)'},
		2:{'hint':'�ɾ͵�ͼ��(���Ե�ַ)'},
		3:function(v){
			v[0]='[title]'+v[0]+'[/title]'
			v[1]='[txt]'+v[1]+'[/txt]'
			v[2]='[img]'+v[2]+'[/img]'
			return '[customachieve]'+v.join('\n')+'[/customachieve]'
		}
	}
},/*
{
	0:'<b>[[������Ϸ���ݿ�]]</b><br/><nobr>��Ϸ���ݿ�</nobr>',
	1:"<b>������Ϸ���ݿ��е���Ŀ</b>\n\
\n\
	[wow,(item/npc/quest/achieve/spell/petspell),id,(cn/tw/en)[����]] ħ������(��Ʒ/����/����/�ɾ�/����/���＼��)\n\
\n\
	[lol,(item/spell/rune/skin/hero),id[����]] Ӣ������(��Ʒ/����/����/Ƥ��/Ӣ��)\n\
\n\
	������ݿ���������ж�� ��������ʾѡ���\n\
\n\
	[wow[�ؼ���]] ħ���������ݿ��� �ؼ��� ���������\n\
\n\
	[lol[�ؼ���]] Ӣ���������ݿ��� �ؼ��� ���������\n\
\n\
	[hscard[�ؼ���]] ¯ʯ��˵���ݿ��� �ؼ��� ���������\n\
\n\
	[wow,item[�ؼ���]] ħ���������ݿ��� �ؼ��� ����������е���Ʒ\n\
\n\
	[wow,item,1234,tw[��������]] ����ħ���������ݿ���id��1234����Ʒ\n\
\n\
	[wow,quest,1234[��������]] ħ���������ݿ���id��1234������\n\
\n\
	[wow,petspell,1234[��������]] ħ���������ݿ���id��1234�ĳ��＼��\n\
\n\
	[lol,item,1234[��������]] Ӣ���������ݿ���id��1234����Ʒ\n\
\n\
	[lol,spell,1234[��������]] Ӣ���������ݿ���id��1234�ķ���\n\
\n\
	[d3db[�ؼ���]] �����ƻ���3���ݿ��� �ؼ��� ���������\n\
\n\
	[crdb[�ؼ���]] �����ͻ:����ս�����ݿ��� �ؼ��� ���������\n\
",
	2:{
		0:{
			'hint':'��Ϸ',
			'opts':{
				0:{0:'ħ������',1:'wow'},
				1:{0:'Ӣ������',1:'lol'},
				2:{0:'¯ʯ��˵',1:'hscard'},
				3:{0:'�����ƻ���3',1:'d3db'}
				}
			},
		1:{
			'hint':'���(���Բ���)',
			'opts':{
				0:{0:'',1:''},
				1:{0:'ħ��������Ʒ',1:'item'},
				2:{0:'ħ����������',1:'npc'},
				3:{0:'ħ����������',1:'quest'},
				4:{0:'ħ������ɾ�',1:'achieve'},
				5:{0:'ħ�����編��',1:'spell'},
				6:{0:'�����ƻ���3��Ʒ',1:'item'},
				7:{0:'�����ƻ���3����',1:'spell'},
				8:{0:'�����ƻ���3����',1:'rune'},
				9:{0:'�����ƻ���3��ʯ',1:'gem'},
				10:{0:'Ӣ��������Ʒ',1:'item'},
				11:{0:'Ӣ�����˷���',1:'spell'},
				12:{0:'Ӣ�����˷���',1:'rune'},
				13:{0:'Ӣ������Ƥ��',1:'skin'},
				14:{0:'Ӣ������Ӣ��',1:'hero'}
				}
			},
		2:{'hint':'����ID(���Բ���)'},
		3:{'hint':'��������(û��ID�����ʱΪ�����ؼ���)'},
		4:{
			'hint':'����ѡ��(Ĭ�ϼ��� Ӣ�����˺���)',
			'opts':{
				0:{0:'����(����)',1:'cn'},
				1:{0:'����(̨��)',1:'tw'}
				}
			},
		5:function(v){
			if(!v[0] || !v[3])return ''
			var tmp = '['+v[0]+','+v[1]+','+v[2]+','+v[4]+'['+v[3]+']]'
			return tmp.replace(/,+/g,',').replace(/,\[/,'[')
			}
		}
},*/
/*
{
	0:'<b>[item]</b><br/><nobr>ħ������װ��</nobr>',
	1:"<b>����ħ�������е���Ʒ</b>\n\
\n\
	[item[��Ʒ����]]\n\
\n\
	[item=����[��Ʒ����]]\n\
\n\
	[item=��ƷID[��������]]\n\
\n\
	[item=��ƷID,����[��������]]\n\
\n\
	[item[��ƷID]]\n\
\n\
	[item=����[��ƷID]]\n\
\n\
\n\
	[item]��Ʒ����[/item]\n\
\n\
	[item=����]��Ʒ����[/item]\n\
\n\
	[item=��ƷID]��������[/item]\n\
\n\
	[item=��ƷID,����]��������[/item]\n\
\n\
	[item]��ƷID[/item]\n\
\n\
	[item=����]��ƷID[/item]\n\
\n\
����Ϊ cn/tw/en (����/̨��/����) ֮һ Ĭ��Ϊcn\n\
",
	2:{
		0:{'hint':'��Ʒ���ƻ�ID'},
		1:{'hint':'��������(���Բ���)'},
		2:{
			'hint':'����ѡ��',
			'opts':{
				0:{0:'����(����)',1:'cn'},
				1:{0:'����(̨��)',1:'tw'}
				}
			},
		3:function(v){
			if(v[0]=='')return false
			if (!isNaN(parseInt(v[0],10)))
				{
				if (v[1])
					return '[item='+v[0]+','+v[2]+'['+v[1]+']]'
				else
					return '[item='+v[2]+'['+v[0]+']]'
				}
			else
				return '[item='+v[2]+'['+v[0]+']]'
			}
		}
},
{
	0:'<b>[achieve]</b><br/><nobr>ħ������ɾ�</nobr>',
	1:"<b>����ħ�������еĳɾ�</b>\n\
\n\
	[achieve[�ɾ�����]]\n\
\n\
	[achieve=����[�ɾ�����]]\n\
\n\
	[achieve=�ɾ�ID[��������]]\n\
\n\
	[achieve=�ɾ�ID,����[��������]]\n\
\n\
	[achieve[�ɾ�ID]]\n\
\n\
	[achieve=����[�ɾ�ID]]\n\
\n\
\n\
	[achieve]�ɾ�����[/achieve]\n\
\n\
	[achieve=����]�ɾ�����[/achieve]\n\
\n\
	[achieve=�ɾ�ID]��������[/achieve]\n\
\n\
	[achieve=�ɾ�ID,����]��������[/achieve]\n\
\n\
	[achieve]�ɾ�ID[/achieve]\n\
\n\
	[achieve=����]�ɾ�ID[/achieve]\n\
\n\
����Ϊ cn/tw/en (����/̨��/����) ֮һ Ĭ��Ϊcn\n\
",
	2:{
		0:{'hint':'�ɾ����ƻ�ID'},
		1:{'hint':'��������(���Բ���)'},
		2:{
			'hint':'����ѡ��',
			'opts':{
				0:{0:'����(����)',1:'cn'},
				1:{0:'����(̨��)',1:'tw'}
				}
			},
		3:function(v){
			if(v[0]=='')return false
			if (!isNaN(parseInt(v[0],10)))
				{
				if (v[1])
					return '[achieve='+v[0]+','+v[2]+'['+v[1]+']]'
				else
					return '[achieve='+v[2]+'['+v[0]+']]'
				}
			else
				return '[achieve='+v[2]+'['+v[0]+']]'
			}
		}
},
{
	0:'<b>[spell]</b><br/><nobr>ħ�����編��</nobr>',
	1:"<b>����ħ�������еķ���</b>\n\
\n\
	[spell=����ID[��������]]\n\
\n\
	[spell=����ID,����[��������]]\n\
\n\
	[spell[����ID]]\n\
\n\
	[spell=����[����ID]]\n\
\n\
\n\
	[spell=����ID]��������[/spell]\n\
\n\
	[spell=����ID,����]��������[/spell]\n\
\n\
	[spell]����ID[/spell]\n\
\n\
	[spell=����]����ID[/spell]\n\
\n\
����Ϊ cn/tw/en (����/̨��/����) ֮һ Ĭ��Ϊcn\n\
",
	2:{
		0:{'hint':'����ID'},
		1:{'hint':'��������(���Բ���)'},
		2:{
			'hint':'����ѡ��',
			'opts':{
				0:{0:'����(����)',1:'cn'},
				1:{0:'����(̨��)',1:'tw'}
				}
			},
		3:function(v){
			if (!isNaN(parseInt(v[0],10)))
				{
				if (v[1])
					return '[spell='+v[0]+','+v[2]+'['+v[1]+']]'
				else
					return '[spell='+v[2]+'['+v[0]+']]'
				}
			else
				return false
			}
		}
},
{
	0:'<b>[wiki]</b><br/><nobr>����wiki����</nobr>',
	1:"<b>���뵽wiki.ngacn.cc����������</b>\n\
\n\
	[wiki]���±���[/wiki]\n\
"
},
*/
{
	0:'<b>[armory]</b><br/><nobr>ħ������������Ϣ</nobr>',
	1:"<b>����ħ������armory��������Ϣ(����벻ͬ���ܰ����ض����ֵ�ID�޷���ȡ)</b>\n\
\n\
	[usarmory �������� �����] ����www.wowarmory.com��������Ϣ\n\
\n\
	[twarmory �������� �����] ����tw.wowarmory.com��������Ϣ\n\
\n\
	[euarmory �������� �����] ����eu.wowarmory.com��������Ϣ\n\
",
	2:{
		0:{'hint':'��������'},
		1:{'hint':'�����'},
		2:{
			'hint':'����ѡ��',
			'opts':{
				0:{0:'����',1:'cn'},
				1:{0:'̨��',1:'tw'},
				2:{0:'����',1:'us'},
				3:{0:'ŷ��',1:'eu'}
				}
			},
		3:function(v){
			return '['+v[2]+'armory '+v[0]+' '+v[1]+']'
		}
	}
},
{
	0:'<b>[d3armory]</b><br/><nobr>Diablo3������Ϣ</nobr>',
	1:"<b>����Diablo3��������Ϣ</b>\n\
\n\
	[url]battle net��������Ϣҳ��ĵ�ַ��� `#armory` [/url]\n\
\n\
	����\n\
\n\
	[url]http://tw.battle.net/d3/zh/profile/Yuee-3131/hero/344816#armory[/url]\n\
"
},/*
{
	0:'<b>[wotarmory]</b><br/><nobr>WOT�ʺ���Ϣ</nobr>',
	1:"<b>����̹������������ʺ���Ϣ</b>\n\
\n\
	[cnwotarmory ��������(����n/����s) �����]\n\
\n\
	����\n\
\n\
	[cnwotarmory s ����˹֮��]\n\
"
},*/
{
	0:'<b>[iframe]</b><br/><nobr>Ƕ����վҳ��</nobr>',
	1:"<b>������Ƕ����վҳ��</b>\n\
\n\
	��ȫ���� ֻ���ض���վ��ҳ�����Ƕ�� Ŀǰ����Ƕ�� \n\
        "+(function(){var x='',y=ubbcode.checkIframeTable;for(var k in y)x+=y[k]+"\n";return x})()+"\n\
\n\
	����\n\
\n\
	[iframe]http://challonge.com/LeifengCup_8_Q/module?theme=3777[/iframe]\n\
\n\
	[iframe=�߶�������]http://xxoo.com[/iframe]\n\
\n\
	[iframe=�߶�������,���������]http://xxoo.com[/iframe]\n\
"
},/*
{
	0:'<b>[owarmory]</b><br/><nobr>�����ȷ� ������Ϣ</nobr>',
	1:"<b>������Ϸ �����ȷ� ��������Ϣ(����벻ͬ���ܰ����ض����ֵ�ID�޷���ȡ)</b>\n\
\n\
	[cnowarmory ��ҵ�BattleTag] �����й�����������Ϣ\n\
\n\
	[usowarmory ��ҵ�BattleTag] ������������������Ϣ\n\
\n\
	[krowarmory ��ҵ�BattleTag] ������������������Ϣ\n\
\n\
	[euowarmory ��ҵ�BattleTag] ����ŷ������������Ϣ\n\
\n\
	[xbowarmory ��ҵ�BattleTag] ����xbox����������Ϣ\n\
\n\
	[psowarmory ��ҵ�BattleTag] ����psn����������Ϣ\n\
"
},*/

{
	0:'<b>[dict]</b><br/><nobr>ע��</nobr>',
	1:"<b>����һ�����Լ�ע��</b>\n\
�������ʾע�������\n\
\n\
[dict][SCP-087]SCP-087��һ���޵Ƶ�ƽ̨¥�ݣ�ÿ����б38�ȵ�13��¥�ݣ�¥��֮����һ��180�ȵĴ��ֱ��3�׵İ�Բƽ̨��������SCP-087����ɼ���ֻ��1.5�����ݣ�����û���κεıڵƺʹ����������κ�ȥ̽��SCP-087����Ա�����䱸�����豸����Դ75���㹻������75�߲����и��õ�����Ч������ΪSCP-087�ƺ��������չ���Ĺ���[/dict]\n\
\n\
ע��ֻ������һ�� ͬһҳ�ڵ���ͬ�ʶ�ʹ��ͬһ��ע��\n\
[dict][SCP-087][/dict]\n\
"
}

];//ae


ubbcode.getForumid=function()
{
if (!this.forum_id) this.forum_id = id2e('forum_id').value
return (this.forum_id);
}
//fe
var bbscodesmiles = ubbcode.smiles;
//function bbscode(id,noimg,gp_lesser,rvrc,is_signature,tid,pid,aid){
//ubbcode.bbscode(id,noimg,gp_lesser,rvrc,is_signature,tid,pid,aid)
//}//fe
function getForumid(){
return ubbcode.getForumid()
}//fe
function checklink(u,nocookie,tbl){
return ubbcode.checklink(u,nocookie,tbl)
}//fe
writelink = null

//----------------------------------------
//
//
//
//
//
//----------------------------------------
/*
commonui.load_post_s = function(c,noimg,gp_lesser,rvrc,is_signature){
if (!cookieFuncs.getMiscCookie('simplemode'))
	{
	 bbscode_core(c,noimg,gp_lesser,rvrc,is_signature)
	}
}
//fe

commonui.load_post_p = function(p,o){
if (!cookieFuncs.getMiscCookie('simplemode'))
	{
	w_i(p,o)
	}
}
//fe
*/



//----------------------------------------
//
//
//
//
//
//----------------------------------------
wowdb_tooltip={linkGen:function(t1,name,arg){return commonui.dbLinkGen.linkGen('[wow,'+t1+','+arg+'['+name+']')}}


commonui.dbLinkGen = {
data:{},
lastDid:null,
tip:null,
db_wow:'wow',
db_lol:'lol',
db_hs:'hscard',
db_d3:'d3db',
db_cr:'crdb',
db_d3_css:null,
db_lol_css:null,
/** �������ݿ�����
 * @param string str �ؼ��� 
 * [wow,item,1234,cn[ĳ��Ʒ]] ��ʾwow/cn���ݿ�idΪ1234����Ʒ
 * [wow,cn[Ӱ��]] ��ʾwow/cn���ݿ���Ӱ����������
 * [wow,spell,tw,1234[ĳ����]] ��ʾwow/tw���ݿ�idΪ1234�ļ���
 * [lol,item,1234[ĳ��Ʒ]] ��ʾlol���ݿ�idΪ1234����Ʒ
 * [lol[Ӱ��]] ��ʾlol���ݿ���Ӱ����������
 * 
 * �����ѡ�� wow lol d3db hscard
 * �����ѡ�� item spell npc quest achieve(wow)  item spell rune skin hero(lol)
 * ��������ڵ�һ�� �ؼ��ֱ��������һ��
 * 
 * ���������Ϊ������������ �� linkgen(lol,item,1234,'ĳ��Ʒ')
 */
linkGen : function(arg)
{
if(arguments.length>1)
	var str = arguments
else{
	var p = arg.indexOf('[',1), str = arg.substr(1,p-1).replace(/^[,\s]*|[,\s]*$/g,'').split(/\s*,\s*/g)
	str.push(arg.substr(p+1,arg.length-p-1-2).replace(/^\s*|\s*$/g,''))
	}

var t0 = str[0], name=new String(str[str.length-1]) , t1='', id=0, lang='cn', x='', u='', h='', key='', std='', raw, extra
str[0] = str[str.length-1] = null
for(var i=0; i<str.length; i++){
	switch(str[i]){
		case 'achieve':
			t1 = str[i] = 'achievement';
			std +=','+t1;
			break;
		case 'petspell':
			t1 = str[i] = 'battlepetability';
			std +=','+t1;
			break;
		case 'achievement':
		case 'item':
		case 'spell':
		case 'quest':
		case 'npc':
		case 'gem':
		case 'hscard':
		case 'rune':
		case 'skin':
		case 'building':
		case 'hero':
			t1 = str[i];
			std +=','+t1;
			break;
		case 'cn':
		case 'tw':
		case 'en':
		case 'us':
			lang = str[i];
			std +=','+lang;
			break;
		case 'raw':
			raw=1
			break;
		default:
			if(str[i]){
				if(str[i].toString().match(/^\d+$/)){
					id = str[i]|0;
					std +=','+id;
					}
				else if(str[i].substr(0,12) =='wowitemdata:')
					extra = str[i].substr(12)
				}
		}
	}
	
std = '&#91;'+t0+std+'&#91;'+name.replace(/[\x00-\x7f]/g,function($0){return '&#'+$0.charCodeAt(0)+';'})+'&#93;&#93;'

if(!t0)
	t0=this.db_wow


if(name.match(/^\d+$/))
	id = parseInt(name,10)

if(!id)
	key = encodeURIComponent(name)

var i = name.match(/\[img\](.+?)\[\/img\]/i);
if(i){
	key = null
	name = "<img src='"+i[1]+"'/>"
	}
var i = function(y){var y = y.match(/^[^\/]+\/[^\/]+/);return hex_md5(y[0])}

if(t0==this.db_wow || t0==this.db_hs){
	if(t0==this.db_hs){//¯ʯ��˵��wow��hscard��
		t0=this.db_wow
		t1='hscard'
		}
	if (t1=='achieve')
		t1='achievement'
	if (id && t1){
		h = 'http://db.178.com/wow/'+lang+'/'+t1+'/'+id+'.html'
		x = 'http://db.178.com/wow/'+lang+'/a/'+t1+'/'+id+'.js'
		}
	else if (key){
		h = 'http://db.178.com/wow/'+lang+'/search.html?name='+key
		u = 'wow/'+lang+'/search.html?name='+key
		x = hex_md5(u)
		//x = ['http://img4.ngacn.cc/proxy/cache_db178com/'+i(u)+'/'+x.substr(0,2)+'/'+x.substr(2,2)+'/'+x+'.js','http://img4.ngacn.cc/proxy/proxy.php?host=db.178.com&url='+encodeURIComponent(u)]
		x = 'http://img4.ngacn.cc/proxy/cache_db178com/'+i(u)+'/'+x.substr(0,2)+'/'+x.substr(2,2)+'/'+x+'.js'
		}
	}
else if(t0==this.db_cr){
	if(key){
		h = 'http://cr.ptbus.com/db/'
		u = 'api/crinfo?name='+key
		x = hex_md5(u)
		//x = ['http://img4.ngacn.cc/proxy/cache_ptbuscom/'+x.substr(0,2)+'/'+x.substr(2,2)+'/'+x+'.js','http://img4.ngacn.cc/proxy/proxy.php?host=vgdb.ptbus.com&url='+encodeURIComponent(u)]
		x ='http://img4.ngacn.cc/proxy/cache_ptbuscom/'+x.substr(0,2)+'/'+x.substr(2,2)+'/'+x+'.js'
		}
	}
else if(t0==this.db_lol){
	if(id && t1){
		h = 'http://db.178.com/lol/'+t1+'-'+id
		if(t1=='item' || t1=='spell' || t1=='rune')
			x = 'http://db.178.com/lol/'+t1+'-ajax/'+id
		}
	else if(key){

		h = 'http://db.178.com/lol/search/s/na:'+key+'&item:on&rune:on&spell:on&hero:on&skin:on'
		u = 'lol/search/s/na:'+key+'%26item:on%26rune:on%26spell:on%26hero:on%26skin:on%26jsonp:1%26callback:%26lite:1'
		x = hex_md5(u)
		//x = ['http://img4.ngacn.cc/proxy/cache_db178com/'+i(u)+'/'+x.substr(0,2)+'/'+x.substr(2,2)+'/'+x+'.js','http://img4.ngacn.cc/proxy/proxy.php?host=db.178.com&url='+encodeURIComponent(u)]
		x = 'http://img4.ngacn.cc/proxy/cache_db178com/'+i(u)+'/'+x.substr(0,2)+'/'+x.substr(2,2)+'/'+x+'.js'
			
		}
	}
else if(t0==this.db_d3){
	if(id && t1){
		h = 'http://db.178.com/d3/'+lang+'/'+t1+'-'+id
		x = 'http://db.178.com/d3/'+lang+'/'+t1+'-ajax/'+id
		}
	else if(key){
		h = 'http://db.178.com/d3/'+lang+'/search/s/na:'+key+'&item:on&spell:on&rune:on'
		u = 'd3/'+lang+'/search/s/na:'+key+'%26item:on%26spell:on%26rune:on%26jsonp:1%26callback:%26lite:1'
		x = hex_md5(u)
		
		//x = ['http://img4.ngacn.cc/proxy/cache_db178com/'+i(u)+'/'+x.substr(0,2)+'/'+x.substr(2,2)+'/'+x+'.js','http://img4.ngacn.cc/proxy/proxy.php?host=db.178.com&url='+encodeURIComponent(u)]
		x = 'http://img4.ngacn.cc/proxy/cache_db178com/'+i(u)+'/'+x.substr(0,2)+'/'+x.substr(2,2)+'/'+x+'.js'
		}
	}
	
if(!h)
	return typeof(arg)=='string' ? arg : std

var did = (id ? 'search_data_cache_id_' : 'search_data_cache_noid_')+Math.random()//��ID��(׼ȷ��һ������)����ID��(ģ������)ʹ�ò�ͬ��did (��this.open
this.data[did] = {h:h,x:x,t0:t0,t1:t1,lang:lang,id:id,extra:extra}
this.lastDid = did

if(raw)
	return "<a class='b' href='"+h+"' onclick='commonui.dbLinkGen.open(event,\""+did+"\");' title='�����ʾ��ϸ��Ϣ "+std+"'>"+name+"</a>";
return "<span class='silver b'>[</span><a class='b' href='"+h+"' onclick='commonui.dbLinkGen.open(event,\""+did+"\");' title='�����ʾ��ϸ��Ϣ "+std+"'>"+name+"</a><span class='silver b'>]</span>";
},

open:function(e,did){
if(!this.data[did].x)
	return true

var d = this.data[did], self = this, varName = null;


if(d.t0==this.db_wow){
	if (!window.$178DB){
		window.$178DB = {};
		$178DB.regstPetAbility = $178DB.regstHscard = $178DB.regstItem=$178DB.regstQuest=$178DB.regstSpell=$178DB.regstAchievement=$178DB.regstNpc=$178DB.regstBuilding=$178DB.regstAbility=function(v){this.data=v};
		}
	$178DB.data =null
	varName = null
	}
else if(d.t0==this.db_cr){
	varName = null
	if(!this.db_cr_css){
		this.db_cr_css = 1
		loader.css(__IMG_STYLE+'/ptbus_cr.css?1')
		}
	}
else if(d.t0==this.db_lol && d.id){
	varName = d.t1+'_'+d.id
	if(!this.db_lol_css){
		this.db_lol_css = 1
		loader.css('http://db.178.com/lol/css/d3db_tooltip.css')
		}
	}
else if(d.t0==this.db_d3 && d.id){
	varName = d.t1+'_'+d.id
	if(!this.db_d3_css){
		this.db_d3_css = 1
		loader.css('http://db.178.com/d3/css/d3db_tooltip.css')
		}
	}

commonui.createadminwindow()
commonui.adminwindow._.addContent(null)

httpDataGetter.script_muti_get(this.data[did].x,
	function(x){
		if (!x && window.$178DB)
			x = window.$178DB.data
		if (!x)
			return false
		var html = ''
		if(window.$178DB)
			delete window.$178DB.data;
		self.countAll = self.countHaveId = 0

		if(d.t0==self.db_wow){
			if (!d.id){//search
				if(window.__NOW - x.time>86400*7)
					return false
				html += self.parseWowSearch(x.data,d.lang,d.t1)
				}
			else if (x=='not exists' || (typeof(x.icon)=='number' && x.icon==0))
				html = '�޴���Ŀ'
			else if(x.tip){//wow tip
				html+='<div id="atlasoline_iTTc" style="background:#000;border:4px solid #000;border-radius: 5px">'+
					(x.icon ? '<img src="http://img.db.178.com/wow/icons/m/'+x.icon.toLowerCase()+'.jpg"/>' : '') +
					x.tip+'</div>';
				}
			else
				html = '�޴���Ŀ'
			}
		else if(d.t0==self.db_cr){
			if(x){
				html+='<div id="crdb_tooltip_c" style="background:#000;border:4px solid #000;border-radius: 5px">'+x.data[0]+'<div class="clear"></div></div>'
				commonui.adminwindow.$0('style','width:auto;minWidth:270px')
				}
			else
				html = '�޴���Ŀ'
			}
		else if(d.t0==self.db_lol){
			if (!d.id){//search
				if(window.__NOW - x.time>86400*7)
					return false
				html += self.parseLolSearch(x.data,d.lang,d.t1)
				}
			else if(x){//lol tip
				html+='<div id="loldb_tooltip_c" style="background:#000;border:4px solid #000;border-radius: 5px">'+x+'<div class="clear"></div></div>'
				commonui.adminwindow.$0('style','width:auto;minWidth:270px')
				}
			else
				html = '�޴���Ŀ'
			}
		else if(d.t0==self.db_d3){
			if (!d.id){//search
				if(window.__NOW - x.time>86400*7)
					return false
				html += self.parseD3Search(x.data,d.lang,d.t1)
				}
			else if(x){//lol tip
				html+='<div id="loldb_tooltip_c" style="background:#000;border:4px solid #000;border-radius: 5px">'+x+'<div class="clear"></div></div>'
				commonui.adminwindow.$0('style','width:auto;minWidth:270px')
				}
			else
				html = '�޴���Ŀ'
			}
		var m = html.match(/search_data_cache_(?:no)?id_[\d\.]+/g)//���ֻ��һ��
		//console.log(m)
		if(m && !m[1] && m[0].match(/^search_data_cache_id_/)){//��������ID��
			self.open(e,m[0])//���Զ������
			return true
			}
		commonui.adminwindow._.addContent(html)
		tTip.showdscp(e,commonui.adminwindow);
		return true
		},
	function(){
		commonui.adminwindow._.addContent('�޴���Ŀ')
		tTip.showdscp(e,commonui.adminwindow);
		},
	'utf-8',
	varName
	)
if(!e)e = window.event
try{e.stopPropagation();e.preventDefault()}catch(er){}
e.cancelBubble =true,e.returnValue = false
return
},//fe


parseD3Search :function(x,lang,t1){
var i,html=[]

for(var k in x){//k in item spell rune
	for(var j in x[k]){//j is int
		if(x[k][j].id){
			if(k=='item')i='��Ʒ'
			else if(k=='spell')i='����'
			else if(k=='rune')i='����'
			else if(k=='gem')i='��ʯ'
			else i='����'
			html[i] += this.linkGen(this.db_d3, k, x[k][j].id, lang, x[k][j].name)+' ';
			}
		}
	}
var tmp = ''
for(var k in html)
	tmp+="<h4 class='silver'>"+k+"</h4>"+html[k].replace(/^undefined/,'')
return tmp
},//fe

parseLolSearch:function(x,lang,t1){
var i,html=[]

for(var k in x){//k in item spell rune
	for(var j in x[k]){//j is int
		if(x[k][j].id){
			if(k=='item')i='��Ʒ'
			else if(k=='spell')i='����'
			else if(k=='rune')i='����'
			else if(k=='skin')i='Ƥ��'
			else if(k=='hero')i='Ӣ��'
			else i='����'
			html[i] += this.linkGen(this.db_lol, k, x[k][j].id, lang, x[k][j].name)+' ';
			}
		}
	}
var tmp = ''
for(var k in html)
	tmp+="<h4 class='silver'>"+k+"</h4>"+html[k].replace(/^undefined/,'')
return tmp
},//fe

parseWowSearch:function(str,lang,t1){
var $ = function(){return {append:function(){},attr:function(){}}} , Table={create:function(){}} , spells_data , quests_data , items_data , npcs_data , achievements_data , quests_data, hscards_data , buildings_data, getItem =[],  getSpell =[], getAchievement =[], getNpc =[], getQuest =[],getPetAbility =[],getBuilding=[], getAbility=[]

eval(str)
	
var html = '',x = {}

if(items_data && (!t1 || t1=='item'))
	x['item'] = items_data
if(npcs_data && (!t1 || t1=='npc'))
	x['npc'] = npcs_data
if(quests_data && (!t1 || t1=='quest'))
	x['quest'] = quests_data
if(achievements_data && (!t1 || t1=='achievement'))
	x['achievement'] = achievements_data
if(spells_data && (!t1 || t1=='spell'))
	x['spell'] = spells_data
if(hscards_data && (!t1 || t1=='hscard'))
	x['hscard'] = hscards_data
if(buildings_data && (!t1 || t1=='building'))
	x['building'] = buildings_data

for(var k in x){
	html += "<h4 class='silver'>"+(
		k=='item' ? '��Ʒ' : (k=='npc' ? 'NPC' : (k=='quest' ? '����' : (k=='achievement' ? '�ɾ�' : (k=='spell' ? '����' : (k=='hscard' ? '¯ʯ��˵����' : (k=='building' ? '����' : '����'))))))
		)+"</h4>"

	for(var i=0; i<x[k].length;i++)
		html += this.linkGen('wow',k,x[k][i][0],lang,x[k][i][1])+' ';
	}
	
if(html=='')
	html = '������'
	
return html
}
	
}//ce
//----------------------------------------
//
//
//
//
//
//----------------------------------------

commonui.loadmostuserrecommendbyfid = function (x,fid,day,nocache){
commonui.loadtopic_js(x,Array('data/bbscache/load_topic_cache/mostuserrecommend_'+fid+'_'+day+'.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&js=1&f=mostuserrecommend&fid='+fid+'&day='+day+'&timeout='+3600*2.1),3600*2.1);
}

commonui.loadhotbyfid = function (x,fid,nocache){
commonui.loadtopic_js(x,Array('data/bbscache/load_topic_cache/hot_'+fid+'_.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&js=1&f=hot&fid='+fid+'&timeout='+3600*2.1),3600*2.1);
}

commonui.loadtodaydelbyfid = function (x,fid,nocache){
commonui.loadtopic_js(x,Array('data/bbscache/load_topic_cache/todaydel_'+fid+'_.js?'+date.getDate()+date.getHours(),'nuke.php?func=loadtopic&js=1&f=todaydel&fid='+fid+'&timeout='+3600*1.1),3600*1.1,false);
}

commonui.loadtopic = function (x,cacheurl,url,nocache,timeout)
{
var self=this;
if(typeof(x)=='string')x=$(x)
if (x.innerHTML=='')
	{
	var onstart = function(){x.innerHTML=='Loading ...'}
	var onsucc = function(y,h){
		if (h)
			{
			h = h.match(/Last-Modified: (.+)/i)
			if (h && h[1])
				{
				if ((date.getTime()-Date.parse(h[1]))>timeout*1000 && !nocache)
					{
					commonui.loadtopicbyfid(x,cacheurl,url,1,timeout)
					return
					}
				}
			}
		y=y.replace(/^<\?php\s*\$write='(.+?)';\s*\?>$/i,'$1').replace(/\\'/g,"'");
		y = y.match(/(<li.+?<\/li>)/g);
		y = y.sort(function(){return Math.random()-0.5});
		var liclass = "class='b1'";
		for (var i=0; i<y.length; i++)
			{
				if (liclass=="class='b1'") liclass = "class='b2'";
				else liclass = "class='b1'";
				y[i] = y[i].replace(/class='b\d'/,liclass)
			}
		y = '<ul>'+y.join('')+'</ul>';
		x.innerHTML=y;
		}
	var onfail = function(){x.innerHTML=='Load error ...'}
	var q = new Array;
	if (!nocache)
		{
		q.push(cacheurl);
		}
	q.push(url);
	httpDataGetter.muti_get(q,onstart,onsucc,onfail);
	}
}

commonui.loadtopic_js = function (x,url,timeout,randomorder,subjectlimit)
{
if (typeof(randomorder)=='undefined') randomorder=true;
if (!subjectlimit) subjectlimit=21;
var self=this;
if(typeof(x)=='string')x=$(x)
if (x.innerHTML=='')
	{
	var date = new Date;
	if(typeof(url)=='string')url = Array(url)
	if(!url[1])timeout=0;
	httpDataGetter.script_muti_get(
		url,
		function(data)
			{
			if (!data)
				{
				return false;
				}
			if (timeout && (__NOW-data.time)>timeout)
				{
				return false;
				}
			var html=new Array;
			var liclass = "class='b1'";
			var hot='';
			var tid=0;
			var title='';
			var d=new Array;
			for (var k in data.data) d.push(data.data[k])
			if (randomorder) d = d.sort(function(){return Math.random()-0.5});
			for (var k=0;k<d.length;k++)
				{
				if (!d[k]) continue;
				if (liclass=="class='b1'") liclass = "class='b2'";
				else liclass = "class='b1'";
				if(d[k].hot)hot=d[k].hot;
				if(d[k].quote_from)tid=d[k].quote_from; else tid=d[k].tid;
				if(d[k].subject.length>21)
					{
					title=d[k].subject;
					d[k].subject=d[k].subject.substr(0,subjectlimit)+'...';
					}
				else title='';
				html.push("<li "+liclass+"><span class='subinfo'>"+hot+" "+commonui.time2shortdate(d[k].postdate)+"</span><a href='/read.php?tid="+tid+"' title='"+title+"'>"+d[k].subject+"</a></li>");
				}
			x.innerHTML='<ul>'+html.join('')+'</ul>';
			return true;
			},
		function()
			{
			x.innerHTML='��ȡ����';
			},
		'gbk'
		);
	}
}