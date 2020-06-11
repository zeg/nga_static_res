var armory = new Object;

armory.get = function(realm,name,o,host,update,todo)
{
	function e(t){return escape(encodeURIComponent(t)).replace(/%25/g,'%')}
	function e2(t){t=t.replace("'",'').replace(" ",'-');return escape(encodeURIComponent(t)).replace(/%25/g,'%')}
	var proxypath = __IMG_BASE+'/proxy',
		iconbase = 'http://img.db.178.com/wow/icons/s/',
		portraitpath = '',
		glyphiconbase = '',
		dbbase = 'http://db.178.com/wow/tw/item/'
	if (host=='cn')
		{
		var hosthost = 'www.battlenet.com.cn',
		cachepath = 'cache_cnwowarmory_new_2',
		dbbase = 'http://db.178.com/wow/cn/item/',
		l = 'http://www.battlenet.com.cn/wow/zh/character/'+e(realm)+'/'+e(name)+'/advanced',
		u = 'wow/zh/character/'+e(realm)+'/'+e(name)+'/advanced'
		//u = 'api/wow/character/'+e(realm)+'/'+e(name)+'?fields=guild,items,professions,stats,talents,titles,stats'
		}
	else if (host=='us')
		{
		var hosthost = 'us.api.battle.net',
		cachepath = 'cache_uswowarmory_new_2',
		l = 'http://us.battle.net/wow/en/character/'+e(realm)+'/'+e(name)+'/advanced',
		u = 'wow/character/'+e(realm)+'/'+e(name)+'?fields=guild,items,professions,stats,talents,titles,stats'
		}
	else if (host=='eu')
		{
		var hosthost = 'eu.api.battle.net',
		cachepath = 'cache_euwowarmory_new_2',
		l = 'http://eu.battle.net/wow/en/character/'+e(realm)+'/'+e(name)+'/advanced',
		u = 'wow/character/'+e(realm)+'/'+e(name)+'?fields=guild,items,professions,stats,talents,titles,stats'
		}
	else if (host=='tw')
		{
		var hosthost = 'tw.api.battle.net',
		cachepath = 'cache_twwowarmory_new_2',
		l = 'http://tw.battle.net/wow/zh/character/'+e(realm)+'/'+e(name)+'/advanced',
		u = 'wow/character/'+e(realm)+'/'+e(name)+'?fields=guild,items,professions,stats,talents,titles,stats'
		}
	var self = this;
	if (update==-1)
		{
		o.innerHTML="[<a class='b' href='http://"+hosthost+"/"+u.substr(4)+"' target='_blank'>"+realm+' '+name+"</a>]"
		return;
		}
	var k = hex_md5(u)
	//var d = new Date
	cachepath = cachepath+'/'+k.substr(0,2)+'/'+k.substr(2,2);
	//if (update)
	//	var urls = [proxypath+"/proxy.php?update=1&host="+hosthost+"&url=" + encodeURIComponent(u) + "&rand=" +Math.random()+(window.__DEBUG?'&debug=1':'')]
	//else
	//	var urls = [proxypath+"/"+cachepath+"/" + k + ".js",proxypath+"/proxy.php?host="+hosthost+"&url=" + encodeURIComponent(u)];
var urls = proxypath+"/"+cachepath+"/" + k + ".js"

	if (todo)
	{
	httpDataGetter.script_muti_get(urls,
		function(x){
			if (!x)return false;
			else
				{
				//var date = new Date
				//if ((date.getTime() - x[0])>3600*24*30)return false
				//if (!x[0])x[0]=false
				//todo(x[0],realm,name,o,host,hosthost,u,l)
				return true
				}
			},
		function(){todo(x[0],realm,name,o,host,hosthost,u,l)},
		'utf-8'
		);
	}
	else
	{
	//if(window.__DEBUG)console.log('wow armory get '+urls[0]+' : '+urls[1])
	httpDataGetter.script_muti_get(urls,
		function(x){
			if (!x)
				return false;
			else if (!x[0] || x.error){
				if(host!='us')
					o.innerHTML=self.error((x.error)?x.error:1,realm,name,host,hosthost,u,l)
				else
					o.innerHTML=self.error((x.error)?x.error:4,realm,name,host,hosthost,u,l)
				return true;
				}
			else
				{
				//var date = new Date
				//if ((date.getTime()/1000 - x[1])>3600*24*7 && !x[2])
				//	return false
				if(typeof(x[0])=='string')
					o.innerHTML='old data error'
				else if(x[0].battlegroup){
					try{
						o.innerHTML=self.proc_v3(x[0],realm,name,o,host,hosthost,iconbase,u,dbbase,l)
						}
					catch(err){
						console.log(err)
						o.innerHTML="<span class='gray b'>[armory parse error]</span>"
						}
					}
				else
					o.innerHTML=self.proc_v2(x[0],realm,name,o,host,hosthost,iconbase,u,dbbase,l)
				return true
				}
			},
		function(){
			o.innerHTML=self.error(0,realm,name,host,hosthost,u,l)
			},
		'utf-8'
		);
	}
}//fe

armory.error = function(c,realm,name,host,hosthost,u,l)
{
var cc='  未知错误  ';
if (typeof(c)=='number'){
	switch(c){
		case 0:
			cc = '  无法从代理获得数据，或者代理不可用  '
			break;
		case 1:
			cc = '  无法通过代理获得Armory数据，或Armory服务器不可用  '
			break;
		case 2:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中  '
			break;
		case 3:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中，或数据格式错误  '
			break;
		case 4:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中  '
			break;
		}
	}
else{
	c=c.replace(/^\s*|\s*$/g,'');
	switch(c){
		case 'get data timeout':
			cc = '  代理读取Armory数据超时  '
			break;
		case 'connect error':
			cc = '  代理连接Armory服务器失败  '
			break;
		}
	}
var date = new Date
return "<span class='gray'>[<a class='b' href='"+l+"' target='_blank'>"+realm+' '+name+"</a>] <span class='x_txt'>( "+cc+" "+date.toUTCString()+" <a href='javascript:void(0)' onclick=\"armory.get('"+realm.replace("'",'&#39;')+"','"+name.replace("'",'&#39;')+"',this.parentNode.parentNode.parentNode,'"+host+"',1)\">[RELOAD]</a>)</span></span>"
}

armory.treeDisp = function(f,c)
{
	var x = '';
	for (var k in c)
		{
			if (typeof(c[k])=='object')
				{
					x+=this.treeDisp(f+k+'.',c[k]);
				}
			else
				{
					x+=f+k+' = '+c[k]+'\n';
				}
		}
	return x;
}


armory.proc_v2 = function(t,realm,name,o,host,hosthost,iconbase,u,dbbase,l)
{
if (!t.profile || !t.statAdv)
	return this.error(3,realm,name,host,hosthost,u);

var style='';
if (t.profile.race.match(/^[a-zA-Z ]+$/))
	style = 'armorychrSmallTxt'

var professions = '';
if (t.profession){
	var professions='<nobr>',i=0
	for (var k in t.profession){
		professions += "<span class='subcolor'>"+k+":</span> <span class='value'>"+t.profession[k]+'</span> '+(i==3?(i=0?'':'</nobr><nobr>'):'')
		i++	
		}
	professions+='</nobr>'
	}

var talent = '';
if (t.talent){
	for (var k in t.talent){
		if(t.talent[k].talent){
			talent += "<nobr>"+k+": <span class='subcolor'>"
			
			for (var kk in t.talent[k].talent)
				talent += "<a href='javascript:void(0)' style='border:1px gray solid;font-size:9px;padding:0 0 0 16px;background:url("+iconbase+t.talent[k].talent[kk][0]+")' title='"+t.talent[k].talent[kk][1]+"' no-repeat -1px -1px'></a>&nbsp;";
	
			talent += '</span> '
			
			if(t.talent[k].glyphs){
				
				talent += "&nbsp;<span class='subcolor'>"
				
				for (var kk in t.talent[k].glyphs)
					talent += "<a href='javascript:void(0)' style='border:1px gray solid;font-size:9px;padding:0 0 0 16px;background:url("+iconbase+t.talent[k].glyphs[kk][0]+")' title='"+t.talent[k].glyphs[kk][1]+"' no-repeat -1px -1px'></a>&nbsp;";
		
				talent += '</span> '				
							
				}
			talent += '</nobr> '
			}
		else if(typeof(t.talent[k][0])!='undefined')
			talent += k+": <span class='subcolor'>"+t.talent[k].join('/')+'</span> '
		}
	if(talent)talent+='<br/>';
	}

var achievement='';
if (t.profile.achievements)
	achievement = "<span class='value' style='background:url("+__IMG_STYLE+"/achievements.gif) no-repeat 0 4px' title='成就'>&emsp;"+t.profile.achievements+"</span>"
	


var r = '';
//d('',t)
//return r;
realm=realm.replace("'",'&#39;')
name=name.replace("'",'&#39;')

var _realm = "<span title='服务器'>["+t.profile.realm+"]</span> "
			+(t.profile.guild ? "<span class='gcolor' title='公会'>["+t.profile.guild+"]</span> " : '')
var _name = "<b class='namecolor'>"+t.profile.name+'</b>'
			+(t.profile.title ? ' '+t.profile.title : '')

var stat = '<nobr>',i=0
for (var k in t.statAdv.Base){
	stat += "<span class='subcolor'>"+k+":</span><span class='value'>"+t.statAdv.Base[k]+'</span> '+(i==3?(i=0?'':'</nobr> <nobr>'):'')
	i++	
	}

for (var k in t.statAdv.Other){
	stat += "<span class='subcolor'>"+k+":</span><span class='value'>"+t.statAdv.Other[k]+'</span> '+(i==3?(i=0?'':'</nobr> <nobr>'):'')
	i++
	}
//<div style='width:120px;height:104px;background:url("+__IMG_STYLE+"/armorymask.png) no-repeat'></div>
stat+='</nobr> '
t.profile.avatar = t.profile.avatar.replace(/avatar/g,'inset').replace(/avatar\/race/g,'inset').replace(/avatar\/class/g,'inset')
r = "\
		<div class='armorychr armorychr_v2' style='padding:0 0.3em 0 130px;margin-bottom:0.1em;background:#000 url("+t.profile.avatar+") no-repeat -50px bottom;font-size:12px;line-height:1.83em;overflow:hidden' class='"+style+"'>\
			<nobr>"+_realm+"<span class='class"+t.profile.classId+"'>[lv"+t.profile.level+" "+t.profile.race+" "+t.profile.spec+" "+t.profile.className+"]</span></nobr> <nobr>[<a href='http://"+hosthost+"/"+l+"' target='_blank' class='name'>"+_name+"</a>] <span class='xtxt subcolor'>("+host+")</span> <a class='xtxt' href='javascript:void(0)' onclick='armory.get(\""+realm+"\",\""+name+"\",this.parentNode.parentNode.parentNode,\""+host+"\",1)' title='刷新 数据缓存可能需要数小时或数天更新'>[R]</a></nobr> <br/>\
			"+talent+"\
			<nobr>"+this.items_v2(t.item,iconbase,dbbase,host)+"</nobr> <br/>\
			"+stat+' '+professions+' '+achievement+"\
		</div>\
";
//if(window.location.href.indexOf('debug')!=-1)r+="<textarea>"+this.treeDisp('',t)+"</textarea>"
return r;
}//fe

armory.item_quality = {7:'#e5cc80',6:'#e5cc80',5:'#ff8000',4:'#a335ee',3:'#0070dd',2:'#1eff00',1:'#ffffff',0:'#9d9d9d'}

armory.items_v2=function(t,iconbase,dbbase,host){
if (typeof(t)!='object')
	return '';
var r = '',q='',id=0,icon='';
if(host!='cn')host='tw';
for (i=0; i<t.length; i++){
	if (t[i]){
		if(t[i][3]){
			q = this.item_quality[t[i][0]]
			id = t[i][1]
			icon = t[i][3]
			}
		else{
			q = '#888888'
			id = t[i][0]
			icon = t[i][2]
			}
		r = r+ commonui.dbLinkGen.linkGen('wow','item',id,host,'raw','').replace('<a ',"<a  style='border:1px "
		+q+" solid;font-size:9px;padding:0 0 0 16px;background:url("+iconbase+icon+") no-repeat -1px -1px;text-indent:20px;overflow:hidden' ")+'&nbsp;'
		}
	}
if (t['avgLevel'])
	r+="<span class='subcolor' title='平均装备等级'>Avg lv:</span> <span class='value'>"+t['avgLevel']+'</span>'
return r
}//fe





armory.proc_v3 = function(t,realm,name,o,host,hosthost,iconbase,u,dbbase,l)
{
if (!t.name)
	return this.error(3,realm,name,host,hosthost,u);

var style='';
//if (t.profile.race.match(/^[a-zA-Z ]+$/))
	style = 'armorychrSmallTxt'





var talent = '',talentN='',specName='';
if(t.talents){
	for (var k in t.talents){
		if(t.talents[k].selected){
			var tt = t.talents[k]

			if(tt.spec){
				talentN += tt.spec.name+' / '
				specName = tt.spec.name
				}

			if(tt.talents){
				for (var j in tt.talents){
					if(j=='length')continue
					talent += "<a href='javascript:void(0)' style='border:1px gray solid;font-size:9px;padding:0 0 0 16px;background:url("+iconbase+tt.talents[j].spell.icon+".jpg)' title='"+tt.talents[j].spell.name+"' no-repeat -1px -1px'></a>&nbsp;";
					}
				}

			talent += "&nbsp;"

			if(tt.glyphs){
				for (var j in tt.glyphs){
					for (var l in tt.glyphs[j]){
						if(l=='length')continue
						talent += "<a href='javascript:void(0)' style='border:1px gray solid;font-size:9px;padding:0 0 0 16px;background:url("+iconbase+tt.glyphs[j][l].icon+".jpg)' title='"+tt.glyphs[j][l].name+"' no-repeat -1px -1px'></a>&nbsp;";
						}
					}
				}

			}
		else if(t.talents[k].spec)
			talentN += "<span class='gray'>"+t.talents[k].spec.name+'</span> / '
		}
	talent = '<nobr>'+talentN.replace(/ \/ $/,' : ')+talent+'</nobr><br/>';
	}
else
	specName = t.talent
	

var achievement= "<span class='nobr value' style='background:url("+__IMG_STYLE+"/achievements.gif) no-repeat 0 4px' title='成就'>&emsp;"+t.achievementPoints+"</span>"


var stat = '', i=0, f=function(k,v,s){return "<span class='nobr "+(s?'subcolor2':'subcolor')+"'>"+k+":</span><span class='nobr value'>"+v+'</span> '}
stat += f("生命",t.stats.health)
stat += f("能量",t.stats.power)

stat += f("力",t.stats.str)
stat += f("敏",t.stats.agi)
stat += f("智",t.stats['int'])
stat += f("耐",t.stats.sta)

stat += f("护甲",t.stats.armor)
stat += f("伤害",t.stats.mainHandDps)
stat += f("攻强",t.stats.attackPower)

stat += f("爆击",t.stats.crit)
stat += f("急速",t.stats.haste)
stat += f("精通",t.stats.mastery)
stat += f("溅射",t.stats.multistrike)

stat += f("法强",t.stats.spellPower)
stat += f("法爆",t.stats.spellCrit)

for (var k in t.professions){
	for( var j in t.professions[k]){
		if(j=='length')continue
		var v = t.professions[k][j]
		if(v.icon=='spell_holy_sealofsacrifice' || v.icon=='trade_fishing')continue
		stat += f(v.name, v.rank + (v.recipesCount?'<span class="xtxt gray" title="配方/图纸数量">'+v.recipesCount+'</span>':''), true)
		}
	}

var r = '';

realm=realm.replace("'",'&#39;')
name=name.replace("'",'&#39;')

var _realm = "<span title='服务器'>["+t.realm+"]</span> "
			+((t.guild && t.guild.name) ? "<a class='gcolor' href='http://"+hosthost+"/wow/zh/guild/"+encodeURIComponent(t.realm)+"/"+encodeURIComponent(t.guild.name)+"/' title='公会'>["+t.guild.name+"]</a> " : '')
var _name = "<b class='namecolor'>"+t.name+'</b>'
if(t.titleSelected)
	_name = t.titleSelected.replace('%s',_name)
if(t.titles){
	for(var i=0;i<4;i++){
		var v = t.titles[Math.floor(Math.random()*t.titles.length)]
		if(v || v._sel || (t.titleSelected && v.name == t.titleSelected))continue
		v._sel = 1
		_name = v.name.replace('%s',_name)
		}
	}

var g = function(a,b){return a[b] ? a[b][0] : b} 

t.thumbnail = 'http://'+hosthost+'/static-render/'+host+'/'+t.thumbnail.replace(/avatar/g,'inset').replace(/avatar\/race/g,'inset').replace(/avatar\/class/g,'inset')+'?alt=/wow/static/images/2d/inset/'+t.race+'-'+t.gender+'.jpg'
r = "\
		<div class='armorychr armorychr_v2' style='padding:0 0.25em 0 130px;margin-bottom:0.1em;background:#000 url("+t.thumbnail+") no-repeat -50px bottom;' class='"+style+"'>\
			<nobr> <a class='xtxt small_colored_text_btn' style='background:gray' href='javascript:void(0)' onclick='armory.get(\""+realm+"\",\""+name+"\",this.parentNode.parentNode.parentNode,\""+host+"\",1)' title='刷新 数据缓存可能需要数小时或数天更新'>#</a> <span class='xtxt subcolor'>("+host+")</span> "+_realm+"<span class='class"+t['class']+"'>[lv"+t.level+" "+g(this.race,t.race)+" "+specName+" "+g(this.className,t['class'])+"]</span></nobr> <span class='nobr'>[<a href='"+l+"' target='_blank' class='name'>"+_name+"</a>]</span> <br/>\
			"+talent+"\
			<nobr>"+this.items_v3(t.items,iconbase,dbbase,host)+"</nobr> <br/>\
			"+stat+' '+achievement+"\
		</div>\
";

return r;
}//fe

armory.race = {
1:["人类","人類"],
2:["兽人","獸人"],
3:["矮人","矮人"],
4:["暗夜精灵","夜精靈"],
5:["亡灵","不死族"],
6:["牛头人","牛頭人"],
7:["侏儒","地精"],
8:["巨魔","食人妖"],
9:["地精","哥布林"],
10:["血精灵","血精靈"],
11:["德莱尼","德萊尼"],
12:["邪兽人","魔獄獸人"],
13:["纳迦","納迦"],
14:["破碎者","破碎者"],
15:["骷髅","骷髏"],
16:["维库人","維酷人"],
17:["海象人","巨牙海民"],
18:["森林巨魔","森林食人妖"],
19:["牦牛人","坦卡族"],
20:["诺森德骷髅","北裂境骷髏"],
21:["冰巨魔","寒冰食人妖"],
22:["狼人","狼人"],
23:["吉尔尼斯人","吉爾尼斯"],
24:["熊猫人","熊貓人"],
25:["熊猫人","熊貓人"],
26:["熊猫人","熊貓人"]
}

armory.className = {
1:["战士","戰士"],
2:["圣骑士","聖騎士"],
3:["猎人","獵人"],
4:["潜行者","盜賊"],
5:["牧师","牧師"],
6:["死亡骑士","死亡騎士"],
7:["萨满祭司","薩滿"],
8:["法师","法師"],
9:["术士","術士"],
10:["武僧","武僧"],
11:["德鲁伊","德魯伊"],
12:["恶魔猎手","恶魔猎手"]
}

armory.items_v3=function(t,iconbase,dbbase,host){
if (typeof(t)!='object')
	return '';
var r = '',q='',id=0,icon='';
if(host!='cn')host='tw';
for (var i in t){
	if (typeof t[i] == 'object'){
		q = this.item_quality[t[i].quality]
		if(!q)
			q = '#888888'
		r = r+ commonui.dbLinkGen.linkGen('wow','item',t[i].id,host,'raw','').replace('<a ',"<a title='"+t[i].name.replace("'",'&#39;')+"' style='border:1px "
		+q+" solid;font-size:9px;padding:0 0 0 16px;background:url("+iconbase+t[i].icon+".jpg) no-repeat -1px -1px;text-indent:20px;overflow:hidden' ")+'&nbsp;'
		}
	}
if (t.averageItemLevelEquipped)
	r+="<span class='subcolor' title='平均装备等级'>Avg lv:</span> <span class='value'>"+t.averageItemLevelEquipped+'</span>'
return r
}//fe





//diablo============================================
//diablo============================================
//diablo============================================

var d3armory = {

cache:{},


get:function(a,update){// arg:{key,host,battleTag,nameOrId,order,id,o}

if(typeof(a)=='string')
	a = this.cache[a]
if(!a)
	return
if(!a.key)
	a.key = 'k'+Math.random()
if(!this.cache[a.key])
	this.cache[a.key] = a

var pbattleTag = a.battleTag.replace('#','-')

function e(t){return escape(encodeURIComponent(t)).replace(/%25/g,'%')}
function e2(t){t=t.replace("'",'').replace(" ",'-');return escape(encodeURIComponent(t)).replace(/%25/g,'%')}

if (a.host=='cn')
	{
	a.hosthost = 'www.battlenet.com.cn'
	a.cachepath = 'cache_cnwowarmory_new_2'
	a.dbbase = 'http://tw.battle.net'
	}
else if (a.host=='us')
	{
	a.hosthost = 'us.battle.net'
	a.cachepath = 'cache_uswowarmory_new_2'
	a.dbbase = 'http://us.battle.net'
	}
else if (a.host=='eu')
	{
	a.hosthost = 'eu.battle.net'
	a.cachepath = 'cache_euwowarmory_new_2'
	a.dbbase = 'http://us.battle.net'
	}
else if (a.host=='tw')
	{
	a.hosthost = 'tw.battle.net'
	a.cachepath = 'cache_twwowarmory_new_2'
	a.dbbase = 'http://tw.battle.net'
	}
if((a.nameOrId|0).toString()==a.nameOrId.toString())
	a.id = a.nameOrId
else
	a.name = a.nameOrId
a.proxypath = __IMG_BASE+'/proxy'
a.iconbase = 'http://img.db.178.com/d3/icons/skills/42/'
a.u = a.id ? 'api/d3/profile/'+e(pbattleTag)+'/hero/'+a.id : 'api/d3/profile/'+e(pbattleTag)+'/'
if(a.host=='cn')
	a.link = "http://d3.blizzard.cn/"+a.u.substr(7).replace('/hero/','/')
else
	a.link = "http://"+a.hosthost+"/"+a.u.substr(4)



var self = this;
if (update==-1)
	return a.o.innerHTML="[<a class='b' href='"+a.link+"' target='_blank'>"+a.battleTag+" / "+a.id?a.id:a.name+"</a>]"

var urls = this.genUrl(a.hosthost,a.proxypath,a.cachepath,a.u,update)
//console.log('wow armory get '+urls[0]+' : '+urls[1])
httpDataGetter.script_muti_get(urls,
	function(x){
		if (!x)
			return false;
		else if (!x[0] || x.error){
			a.o.innerHTML=self.error((x.error)?x.error:1,a)
			return true
			}
		else
			{
			var date = new Date
			if ((date.getTime()/1000 - x[1])>3600*24*7 && !x[2]){
				return false
				}
			x = x[0]
			if(!a.id){
				if(x[a.name]){
					a.id = x[a.name][0].id
					self.get(a.key,update)
					}
				else{
					var y=''
					y+="[<a href='"+a.link+"' target='_blank' class='name'><b class='subcolor '>"+a.battleTag.replace("'",'&#39;')+"</b></a>] <span class='xtxt subcolor'>("+a.host+")</span><br/>"
					for(var k in x){
						for(var i =0;i<x[k].length;i++)
							y+='<nobr>['+a.host+'d3armory '+a.battleTag.replace("'",'&#39;')+' '+x[k][i].id+'] <span class=silver>(lv'+x[k][i].level+'/'+x[k][i].paragonLevel+' '+self.trans[x[k][i]['class']]+' '+k+')</span></nobr>  '
						}
					a.o.innerHTML=self.error(y,a)
					}
				}
			else
				a.o.innerHTML=self.proc(x,a)
			return true
			}
		},
	function(){
		a.o.innerHTML=self.error(0,a)
		},
	'utf-8'
	);

},//fe

translate:function(t){
var x =t.toUpperCase ()
if(this.trans[x])return this.trans[x]
else return t
},

trans:{
'blue':'0c1119',
'gray':'000000',
'green':'131d07',
'orange':'211408',
'white':'000000',
'yellow':'1d1807',
'barbarian':'野蛮人',
'demon-hunter':'猎魔人',
'witch-doctor':'巫医',
'monk':'武僧',
'wizard':'魔法师',
'crusader':'圣教军',
'b_blue':'90c8d3',
'b_gray':'7a5f45',
'b_green':'aec75c',
'b_orange':'d8b954',
'b_white':'7a5f45',
'b_yellow':'cdc75a',

'STRENGTH' : 'STR',
'DEXTERITY' : 'DEX',
'INTELLIGENCE' : 'INT',
'VITALITY' : 'VIT',
'ARMOR' : 'AMR',
'DAMAGE' : 'DPS',
'LIFE' : 'HP',
'FURY' : 'SP',
'HATRED/DISCIPLINE' : 'SP',
'SPIRIT' : 'SP',
'MANA' : 'SP',
'ARCANE POWER' : 'SP'
},

proc : function(t,a)
{
if(!t)
	return this.error(1,a);
if (!t.id)
	return this.error(3,a);

var r =	"<div class='armorychr armorychr_v2 armorychrSmallTxt' style='padding:0 0.3em 0 10.833em;margin-bottom:0.1em;background:#000 url("+
	__IMG_STYLE+'/d3/'+t['class'].replace('-','')+'_'+(t.gender?'female':'male')+'.jpg'
	+") no-repeat bottom left;font-size:12px;line-height:1.83em;overflow:hidden'>";

r +=	"<nobr>\
			<span>[lv"+t.level+'/'+t.paragonLevel+" "+this.trans[t['class']]+"]</span>\
			[<a href='"+a.link+"' target='_blank' class='name'>\
				<b class='namecolor'>"+t.name.replace("'",'&#39;')+"</b> / \
				<b class='subcolor '>"+a.battleTag.replace("'",'&#39;')+"</b>\
			</a>]\
			"+(t.hardcore?'<span class=red>[专家]</span>':'')+"\
			"+(t.seasonal?'<span class=green>[赛季]</span>':'')+"\
			<span class='xtxt subcolor'>("+a.host+")</span>\
			<a class='xtxt small_colored_text_btn' \
					style='background:gray' \
					href='javascript:void(0)' \
					onclick='d3armory.get(\""+a.key+"\",1)' title='刷新 数据缓存可能需要数小时或数天更新'>#</a>\
		</nobr><br/><div style='float:left;width:"+(a.o.offsetWidth>=720?15:8)+"em;line-height:1.5em'>"

for(var k in t.skills.active){
	var s = t.skills.active[k]
	if(s.skill)
		r+=	"<a href='javascript:void(0)' onclick='d3armory.skillTip(event,\""+s.skill.tooltipUrl+"\",\""+(s.rune?s.rune.tooltipParams:'')+"\")'><img src='http://media.blizzard.com/d3/icons/skills/21/"+s.skill.icon+".png' title='"+s.skill.name+"/"+(s.rune?s.rune.name:'')+"' style='width:2em;height:2em;border:0.0833em solid #ca6d58'/></a> "
	}

for(var k in t.skills.passive){
	var s = t.skills.passive[k]
	if(s.skill)
		r+=	"<a href='javascript:void(0)' onclick='d3armory.skillTip(event,\""+s.skill.tooltipUrl+"\")'><img src='http://media.blizzard.com/d3/icons/skills/21/"+s.skill.icon+".png' title='"+s.skill.name+"' style='width:2em;height:2em;border:0.0833em solid #7a5f45'/></a> "
	}

r+=		"</div>"
var rr=[];
for(var k in t.items){
	var s = t.items[k]
	if(k=='neck' || k=='leftFinger' || k=='rightFinger' || k=='waist'){
		rr.push("<a href='javascript:void(0)' datad3tooltip='"+s.tooltipParams+"' datad3itemid='"+s.id+"' onclick='d3armory.itemTip(event,this.getAttribute(\"datad3tooltip\"))'><img src='http://media.blizzard.com/d3/icons/items/small/"+s.icon+".png' title='"+s.name+"' style='height:2em;border:0.0833em solid #"+this.trans['b_'+s.displayColor]+";background-color:#"+this.trans[s.displayColor]+"'/></a> ")
		}
	else
		r+=	"<a href='javascript:void(0)' style='float:left;margin:0 0 0.25em 0.25em' datad3tooltip='"+s.tooltipParams+"' datad3itemid='"+s.id+"' onclick='d3armory.itemTip(event,this.getAttribute(\"datad3tooltip\"))'><img src='http://media.blizzard.com/d3/icons/items/small/"+s.icon+".png' title='"+s.name+"' style='height:4.5em;border:0.0833em solid #"+this.trans['b_'+s.displayColor]+";background-color:#"+this.trans[s.displayColor]+"'/></a>"
	}

if(rr[0])
	r+="<div style='float:left;line-height:1.5em;width:4.9em;margin:0 0 0 0.25em'>"+rr[0]+(rr[3]?rr[3]:'')+(rr[1]?rr[1]:'')+(rr[2]?rr[2]:'')+"</div>"

//r+=		"</div>"+'<pre>'+commonui._debug._d(t)+'</pre>';

return r
},//fe

bgColor:{

},//


skillTip:function(e,name,rune){
if(!window.Bnet || !Bnet.D3 || !Bnet.D3.Tooltips){
	loader.css('http://tw.battle.net/d3/static/css/tooltips.css')
	window.Bnet = {D3:{Tooltips:{registerData:function(x){this.currentTooltipHTML = x.tooltipHtml}}}}
	}
var self = this,id

commonui.createadminwindow()
var y = commonui.adminwindow,z
y._.addContent(null)
y._.addContent(z=_$('/div').$0('style','width:354px;background:#000'))

Bnet.D3.Tooltips.currentTooltipHTML=''

httpDataGetter.script_muti_get('http://tw.battle.net/d3/zh/tooltip/'+name+'?format=jsonp',
	function(x){
		x =Bnet.D3.Tooltips.currentTooltipHTML
		z.innerHTML+=x ? x : '无法获得数据1'
		if(!rune)
			y._.show(e)
		return true
		},
	function(){
		z.innerHTML+='无法获得数据0'
		if(!rune)
			y._.show(e)
		},
	'utf-8'
	);
if(rune)
	httpDataGetter.script_muti_get('http://tw.battle.net/d3/zh/tooltip/'+rune+'?format=jsonp',
	function(x){
		x =Bnet.D3.Tooltips.currentTooltipHTML
		z.innerHTML+=x ? x : '无法获得数据2'
		y._.show(e)
		return true
		},
	function(){
		z.innerHTML+='无法获得数据3'
		y._.show(e)
		},
	'utf-8'
	);
},//

itemTip:function(e,tdata){
if(!window.Bnet || !Bnet.D3 || !Bnet.D3.Tooltips){
	loader.css('http://tw.battle.net/d3/static/css/tooltips.css')
	window.Bnet = {D3:{Tooltips:{registerData:function(x){this.currentTooltipHTML = x.tooltipHtml}}}}
	}


commonui.createadminwindow()
var y = commonui.adminwindow,z
y._.addContent(null)
y._.addContent(z=_$('/div').$0('style','width:354px;background:#000'))

Bnet.D3.Tooltips.currentTooltipHTML=''

httpDataGetter.script_muti_get('http://tw.battle.net/d3/zh/tooltip/'+tdata+'?format=jsonp',
	function(x){
		x =Bnet.D3.Tooltips.currentTooltipHTML
		z.innerHTML+=x ? x : '无法获得数据1'
		y._.show(e)
		return true
		},
	function(){
		z.innerHTML+='无法获得数据0'
		y._.show(e)
		},
	'utf-8'
	);
},//fe

genUrl : function(hosthost,proxypath,cachepath,u,update){

var k = hex_md5(u)
cachepath = cachepath+'/'+k.substr(0,2)+'/'+k.substr(2,2);
//if (update)
//	return [proxypath+"/proxy.php?update=1&host="+hosthost+"&url=" + encodeURIComponent(u) + "&rand=" +Math.random()+(window.__DEBUG?'&debug=1':'')]
//else
//	return [proxypath+"/"+cachepath+"/" + k + ".js",proxypath+"/proxy.php?host="+hosthost+"&url=" + encodeURIComponent(u)];
return proxypath+"/"+cachepath+"/" + k + ".js"
},//fe

error :function(c,a)
{
var cc='';
if (typeof(c)=='number'){
	switch(c){
		case 0:
			cc = '  无法从代理获得数据，或者代理不可用  '
			break;
		case 1:
			cc = '  无法通过代理获得Armory数据，或Armory服务器不可用  '
			break;
		case 2:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中  '
			break;
		case 3:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中，或数据格式错误  '
			break;
		case 4:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中  '
			break;
		}
	}
else{
	c=c.replace(/^\s*|\s*$/g,'');
	switch(c){
		case 'get data timeout':
			cc = '  代理读取Armory数据超时  '
			break;
		case 'connect error':
			cc = '  代理连接Armory服务器失败  '
			break;
		}
	}
var date = new Date
return "<div class='armorychr armorychr_v2 armorychrSmallTxt' style='padding:0 0.3em;margin-bottom:0.1em;background:#000;font-size:12px;line-height:1.83em'>"+(cc ? "<nobr>[<a class='b' href='http://"+a.hosthost+"/"+a.u+"' target='_blank'>"+a.battleTag+" / "+a.id+"</a>]</nobr> <span class=>( "+cc+" "+date.toUTCString()+" <a href='javascript:void(0)' onclick=\"d3armory.get('"+a.key+"',1)\">[RELOAD]</a>)</span>" : c)+"</div>"
}

}//ce


//overwatch============================================
//overwatch============================================
//overwatch============================================

var owarmory = {

cache:{},

insert:function(a){
if(!a.key)
	a.key = 'k'+ubbcode.randDigi('k',100000)
this.cache[a.key] = a
return a.key
},

get:function(b,update){// arg:{key,host,plt,battleTag,nameOrId,order,id,o}

var a = this.cache[b]
if(!a)return
if(!a.o)a.o = $(a.key)
var pbattleTag = a.battleTag.replace('#','-')
a.name = a.nameOrId
a.hosthost = 'configset_overwatch2'
a.cachepath = 'cache_overwatch'
a.proxypath = __IMG_BASE+'/proxy'
a.u = 'playerName='+encodeURIComponent(pbattleTag)+'&areaLink='+encodeURIComponent( a.plt && a.plt!='pc' ? a.plt+'/' : 'pc/'+a.host+'/' )
a.link = "http://ow.766.com/search?name="+encodeURIComponent(pbattleTag)+"&areaLink="+( a.plt && a.plt!='pc' ? a.plt+'/' : 'pc/'+a.host+'/' )


var self = this;
if (update==-1)
	return a.o.innerHTML="[<a class='b' href='"+a.link+"' target='_blank'>"+a.battleTag+"</a>]"

var urls = this.genUrl(a.hosthost,a.proxypath,a.cachepath,a.u,update)
//console.log('wow armory get '+urls[0]+' : '+urls[1])
httpDataGetter.script_muti_get(urls,
	function(x){
		if (!x)
			return false
		else if (!x[0] || x.error){
			a.o.innerHTML=self.error((x.error)?x.error:1,a)
			return true
			}
		else
			{
			var date = new Date
			if ((date.getTime()/1000 - x[1])>3600*24*7)
				return false
			x = x[0]
			a.o.innerHTML=self.proc(x,a)
			return true
			}
		},
	function(){
		a.o.innerHTML=self.error(0,a)
		},
	'utf-8'
	);

},//fe


proc : function(t,a)
{
if(!t)
	return this.error(1,a);
if(!t.level && !t._keys)
	return this.error(3,a);

var style = {//10.833em
0:'text-align:center;border-radius:0.43em;overflow:hidden;padding:0.3em 5.5em 0.3em 5.7em;background:left 50% no-repeat #1f2536;',
1:'color:#f0edf2;line-height:2.2em;font-size:1.083em',
2:'font-size:0.75em;color:#b6b9c7',
3:'color:#FFD280;font-weight:bold',
4:'width:5.2em;height:5.2em;margin-right:0.2em;margin-left:-5.4em;border-radius:0.43em;float:left;border:0.2em solid #f7931e',
5:'width:5.2em;height:5.2em;float:right;overflow:hidden;text-align:center;margin-left:0.2em;margin-right:-5.2em',
6:'color:#f0edf2;font-size:1.4em;font-family:impact',
7:'color:#3cb5e2;font-size:1.4em;font-family:impact;font-style:italic;margin-right:0.2em',
8:'color:#f0edf2',
9:'border-radius:0.43em;line-height:1.83em;margin-bottom:0.1em;font-size:12px;color:#b6b9c7',
10:'display:none;padding:0 1em'
}

var rh = [],
tm = function(s){
	return s ? (s+'').replace(/^([\d,\.]+)\s?(小时|分钟)?$/,
		function($0,$1,$2){
			return ($1.replace(/,/g,'')|0)*($2=='小时'?3600:($2=='分钟'?60:1))
			}).replace(/^(\d{2}):(\d{2}):(\d{2})$/,
		function($0,$1,$2,$3){
			return ($1|0)*3600+($2|0)*60+($3|0)
			}) | 0 : 0
	},
pr = function(a,b){
	return b ? (a/b*100|0) : 0
	}

for(var k in t.statsSectionMap){
	if(k=='所有英雄')continue
	rh.push([tm(t.statsSectionMap[k].statsSectionMap.游戏.游戏总时间), k])
	}


rh = rh.sort(function(a,b){
	return a[0]<b[0] ? 1 : (a[0]>b[0] ? -1 : 0)
	})


rh = t.statsSectionMap[ rh[Math.floor(Math.random()*3)][1] ]

var rhst = rh.statsSectionMap.英雄特定
rh._sp=''
for(var k in rhst){
	if(k=='近战攻击单场最高最后一击数')continue
	rh._sp += "<nobr>"+k.replace(/数$/,'')+"<span style='7'>"+rhst[k]+'</span></nobr> &nbsp;'
	}

rhst = rh.statsSectionMap['游戏']
if(!rhst['火力全开时间'])rhst['火力全开时间'] = rhst['最佳表現时间']
rhst['火力全开时间'] = pr(tm(rhst['火力全开时间']) ,  tm(rhst['游戏总时间']))


var all = t.statsSectionMap['所有英雄'].statsSectionMap['游戏']
if(!all['火力全开时间'])all['火力全开时间'] = all['最佳表現时间']
all['火力全开时间'] = pr(tm(all['火力全开时间']) , tm(all['游戏总时间']))
all['胜率'] = pr(all['胜场'] , all['对战次数'])

var r =	"<div style='9'>\
<div style='0' onclick='this.nextSibling.style.display=\"\";this.parentNode.style.background=\"#3c4860\"'>\
<img src='https://d1u1mce87gyfbn.cloudfront.net/game/heroes/small/{rh.selectId}.png' style='4'/>\
<div style='5'><img src='{t.levelIcon}' style='width:7em;height:7em;margin:-1em -1em -4.3em -1em'/><span style='6'>{t.level}</span></div>\
<a href='{a.link}' target='_blank'>\
	<b style='3'>"+a.battleTag.replace("'",'&#39;')+"</b><span style='2'> <span  class='small_colored_text_btn' style='background-color:#8d3939'>"+a.plt.toUpperCase()+" "+a.host.toUpperCase()+"</span> [ow.766.com]</span>\
</a>&nbsp;\
总计对战<nobr style='8'>{all.对战次数}</nobr>场 共<nobr style='8'>"+all['游戏总时间'].replace(' ','')+"</nobr>&emsp;\
胜率<nobr style='8'>{all.胜率}%</nobr> 火力全开<nobr style='8' title='火力全开占总时间的比例'>{all.火力全开时间}%</nobr>&emsp;\
<a class='xtxt small_colored_text_btn' \
		style='background:#f0edf2' \
		href='javascript:void(0)' \
		onclick='owarmory.get(\"{a.key}\",1)' title='刷新 数据缓存可能需要数小时或数天更新'>#</a>\
</br>\
<span style='1'><span style='font-size:1.4em'>{rh.selectName}</span> \
<nobr>对战<span style='7'>{rhst.对战次数}</span>场 共<span style='7'>"+rhst['游戏总时间'].replace(/[^\d]+/,'')+"</span>小时</nobr> \
<nobr>胜率<span style='7'>{rhst.胜率}</span>火力全开<span style='7' title='火力全开占总时间的比例'>{rhst.火力全开时间}%</span></nobr> \
<nobr>场均<span style='7'>"+rh.statsSectionMap['平均'][rh.selectId!="0x02E0000000000004"?'平均伤害量':'平均治疗量'].replace(/\.\d+$/,'')+"</span>击杀<span style='7'>{rh.statsSectionMap.平均.平均最后一击数}</span>金牌<span style='7'>"+(rhst['对战次数']|0 ? Math.round(rh.statsSectionMap['对战奖励']['金牌']/rhst['对战次数']*100)/100 : 0)+"</span></nobr>\
</span>\
</div><div style='10'>{rh._sp}</div></div>\
";

//r+=		'<pre>'+commonui._debug._d(t)+'</pre>';

return r.replace(/{(.+?)}/g,function($0,$1){eval('$1 = '+$1);return $1===undefined ? 0 : $1}).replace(/style='(\d+)'/g,function($0,$1){return "style='"+style[$1]+"'"})
},//fe

bgColor:{

},//

genUrl : function(hosthost,proxypath,cachepath,u,update){

var k = hex_md5(u)
cachepath = cachepath+'/'+k.substr(0,2)+'/'+k.substr(2,2);
//if (update)
//	return [proxypath+"/proxy.php?update=1&host="+hosthost+"&url=" + encodeURIComponent(u) + "&rand=" +Math.random()+(window.__DEBUG?'&debug=1':'')]
//else
//	return [proxypath+"/"+cachepath+"/" + k + ".js",proxypath+"/proxy.php?host="+hosthost+"&url=" + encodeURIComponent(u)];
return proxypath+"/"+cachepath+"/" + k + ".js"
},//fe

error :function(c,a)
{
var cc='';
if (typeof(c)=='number'){
	switch(c){
		case 0:
			cc = '  无法从代理获得数据，或者代理不可用  '
			break;
		case 1:
			cc = '  无法通过代理获得Armory数据，或Armory服务器不可用  '
			break;
		case 2:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中  '
			break;
		case 3:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中，或数据格式错误  '
			break;
		case 4:
			cc = '  Armory中无此玩家数据，或Armory服务器在维护中  '
			break;
		}
	}
else{
	c=c.replace(/^\s*|\s*$/g,'');
	switch(c){
		case 'get data timeout':
			cc = '  代理读取Armory数据超时  '
			break;
		case 'connect error':
			cc = '  代理连接Armory服务器失败  '
			break;
		}
	}
var date = new Date
return "<div class='armorychr armorychr_v2 armorychrSmallTxt' style='padding:0 0.3em;margin-bottom:0.1em;background:#000;font-size:12px;line-height:1.83em'>"+(cc ? "<nobr>[<a class='b' href='"+a.link+"' target='_blank'>"+a.battleTag+"</a>]</nobr> <span class=>( "+cc+" "+date.toUTCString()+" <a href='javascript:void(0)' onclick=\"owarmory.get('"+a.key+"',1)\">[RELOAD]</a>)</span>" : c)+"</div>"
}

}//ce


//wot============================================
//wot============================================
//wot============================================
var wotArmory = {

cache:{},

icon:{
1329:"china-Ch06_Renault_NC31.png",
2353:"china-Ch07_Vickers_MkE_Type_BT26.png",
4401:"china-Ch08_Type97_Chi_Ha.png",
3121:"china-Ch09_M5.png",
4657:"china-Ch21_T34.png",
64817:"china-Ch24_Type64.png",
4913:"china-Ch15_59_16.png",
5169:"china-Ch20_Type58.png",
3633:"china-Ch10_IS2.png",
3377:"china-Ch16_WZ_131.png",
305:"china-Ch02_Type62.png",
64305:"china-Ch04_T34_1_training.png",
1073:"china-Ch04_T34_1.png",
64561:"china-Ch23_112.png",
2865:"china-Ch11_110.png",
817:"china-Ch03_WZ-111.png",
3889:"china-Ch17_WZ131_1_WZ132.png",
64049:"china-Ch14_T34_3.png",
1585:"china-Ch05_T34_2.png",
561:"china-Ch01_Type59_Gold.png",
49:"china-Ch01_Type59.png",
2097:"china-Ch12_111_1_2_3.png",
1841:"china-Ch18_WZ-120.png",
5425:"china-Ch22_113.png",
4145:"china-Ch19_121.png",
65089:"france-F00_AMX_50Foch_155.png",
577:"france-RenaultFT.png",
7745:"france-RenaultFT_AC.png",
1601:"france-D1.png",
1345:"france-Hotchkiss_H35.png",
833:"france-RenaultBS.png",
8257:"france-RenaultUE57.png",
2369:"france-FCM_36Pak40.png",
5953:"france-AMX38.png",
321:"france-D2.png",
3393:"france-Lorraine39_L_AM.png",
9793:"france-Somua_Sau_40.png",
1089:"france-B1.png",
2881:"france-AMX40.png",
14657:"france-AMX_Ob_Am105.png",
10049:"france-S_35CA.png",
6721:"france-BDR_G1B.png",
14145:"france-ELC_AMX.png",
4161:"france-AMX_105AM.png",
2113:"france-_105_leFH18B2.png",
11585:"france-ARL_V39.png",
2625:"france-ARL_44.png",
6465:"france-AMX_12t.png",
4673:"france-AMX_13F3AM.png",
10817:"france-AMX_AC_Mle1946.png",
6977:"france-AMX_M4_1945.png",
63809:"france-F69_AMX13_57_100.png",
5185:"france-AMX_13_75.png",
7233:"france-Lorraine155_50.png",
12097:"france-AMX_AC_Mle1948.png",
64065:"france-FCM_50t.png",
3137:"france-AMX_50_100.png",
4929:"france-AMX_13_90.png",
63553:"france-F68_AMX_Chasseur_de_char_46.png",
7489:"france-Lorraine155_51.png",
11073:"france-AMX50_Foch.png",
3905:"france-AMX_50_120.png",
5697:"france-Lorraine40t.png",
14401:"france-Bat_Chatillon155_55.png",
13889:"france-AMX_50Fosh_155.png",
6209:"france-F10_AMX_50B.png",
3649:"france-Bat_Chatillon25t.png",
11841:"france-Bat_Chatillon155_58.png",
3089:"germany-Ltraktor.png",
65041:"germany-Env_Artillery.png",
3601:"germany-PanzerJager_I.png",
60433:"germany-G108_PzKpfwII_AusfD.png",
52497:"germany-H39_captured.png",
12817:"germany-PzI.png",
2065:"germany-PzII.png",
785:"germany-Pz35t.png",
15121:"germany-GW_Mk_VIe.png",
6673:"germany-G20_Marder_II.png",
54801:"germany-T-15.png",
51729:"germany-PzII_J.png",
13073:"germany-Pz_II_AusfG.png",
12561:"germany-PzI_ausf_C.png",
4881:"germany-PzIII_A.png",
3345:"germany-Pz38t.png",
59665:"germany-G100_Gtraktor_Krupp.png",
51985:"germany-S35_captured.png",
17169:"germany-Pz_IV_AusfA.png",
5905:"germany-Wespe.png",
2833:"germany-Bison_I.png",
17937:"germany-G101_StuG_III.png",
11281:"germany-Marder_III.png",
1809:"germany-Hetzer.png",
52241:"germany-B-1bis_captured.png",
13329:"germany-DW_II.png",
8209:"germany-Pz38_NA.png",
6161:"germany-PzII_Luchs.png",
57873:"germany-PzIII_training.png",
17425:"germany-Pz_IV_AusfD.png",
13585:"germany-VK2001DB.png",
4369:"germany-PzIII_AusfJ.png",
15633:"germany-Pz_Sfl_IVb.png",
4625:"germany-Sturmpanzer_II.png",
60689:"germany-G104_Stug_IV.png",
16145:"germany-Pz_Sfl_IVc.png",
1041:"germany-StuG_40_AusfG.png",
2577:"germany-VK3001H.png",
5393:"germany-VK1602.png",
55057:"germany-PzIV_Hydro.png",
54545:"germany-T-25.png",
18193:"germany-Pz_IV_AusfH.png",
6417:"germany-PzIII_IV.png",
17:"germany-PzIV.png",
5649:"germany-Grille.png",
57105:"germany-DickerMax.png",
11793:"germany-Nashorn.png",
1553:"germany-JagdPzIV.png",
2321:"germany-VK3601H.png",
10001:"germany-VK2801.png",
57361:"germany-PzIV_schmalturm.png",
54033:"germany-PzV_PzIV_ausf_Alfa.png",
51473:"germany-PzV_PzIV.png",
15889:"germany-VK3002M.png",
14097:"germany-VK3002DB_V1.png",
7185:"germany-VK3001P.png",
273:"germany-Hummel.png",
55569:"germany-E-25.png",
11025:"germany-Sturer_Emil.png",
3857:"germany-JagdPanther.png",
61201:"germany-G04_PzVI_Tiger_IA.png",
10769:"germany-PzVI_Tiger_P.png",
529:"germany-PzVI.png",
14353:"germany-Auf_Panther.png",
58385:"germany-PzV_training.png",
57617:"germany-Panther_M10.png",
4113:"germany-VK3002DB.png",
1297:"germany-PzV.png",
8977:"germany-G_Panther.png",
55313:"germany-JagdTiger_SdKfz_185.png",
16657:"germany-RhB_Waffentrager.png",
11537:"germany-JagdPantherII.png",
7697:"germany-Ferdinand.png",
58129:"germany-PzVIB_Tiger_II_training.png",
54289:"germany-Lowe.png",
10513:"germany-VK4502A.png",
5137:"germany-PzVIB_Tiger_II.png",
18449:"germany-G103_RU_251.png",
60177:"germany-G106_PzKpfwPanther_AusfF.png",
13841:"germany-Indien_Panzer.png",
8465:"germany-Panther_II.png",
15377:"germany-GW_Tiger_P.png",
16401:"germany-Waffentrager_IV.png",
7953:"germany-JagdTiger.png",
9745:"germany-E-75.png",
7441:"germany-VK4502P.png",
60945:"germany-G105_T-55_NVA_DDR.png",
14865:"germany-Pro_Ag_A.png",
10257:"germany-E-50.png",
8721:"germany-G_Tiger.png",
16913:"germany-Waffentrager_E100.png",
12049:"germany-JagdPz_E100.png",
58641:"germany-VK7201.png",
9489:"germany-E-100.png",
6929:"germany-Maus.png",
14609:"germany-Leopard1.png",
12305:"germany-E50_Ausf_M.png",
9233:"germany-G_E.png",
609:"japan-NC27.png",
3169:"japan-Te_Ke.png",
865:"japan-Ha_Go.png",
353:"japan-Chi_Ni.png",
51809:"japan-Ke_Ni_B.png",
2401:"japan-Ke_Ni.png",
2145:"japan-Chi_Ha.png",
2913:"japan-Ke_Ho.png",
1633:"japan-Chi_He.png",
51553:"japan-Chi_Nu_Kai.png",
1377:"japan-Chi_Nu.png",
1889:"japan-Chi_To.png",
1121:"japan-Chi_Ri.png",
52065:"japan-J18_STA_2_3.png",
2657:"japan-STA_1.png",
3425:"japan-Type_61.png",
3681:"japan-ST_B1.png",
81:"uk-GB01_Medium_Mark_I.png",
8273:"uk-GB39_Universal_CarrierQF2.png",
593:"uk-GB14_M2.png",
54865:"uk-GB76_Mk_VIC.png",
7761:"uk-GB58_Cruiser_Mk_III.png",
5201:"uk-GB03_Cruiser_Mk_I.png",
337:"uk-GB05_Vickers_Medium_Mk_II.png",
10577:"uk-GB25_Loyd_Carrier.png",
8017:"uk-GB42_Valentine_AT.png",
1361:"uk-GB15_Stuart_I.png",
7505:"uk-GB59_Cruiser_Mk_IV.png",
6993:"uk-GB69_Cruiser_Mk_II.png",
2385:"uk-GB06_Vickers_Medium_Mk_III.png",
54609:"uk-GB78_Sexton_I.png",
3409:"uk-GB27_Sexton.png",
9041:"uk-GB57_Alecto.png",
6481:"uk-GB60_Covenanter.png",
4945:"uk-GB04_Valentine.png",
1617:"uk-GB17_Grant_I.png",
849:"uk-GB07_Matilda.png",
10833:"uk-GB26_Birch_Gun.png",
13393:"uk-GB44_Archer.png",
8785:"uk-GB73_AT2.png",
54353:"uk-GB51_Excelsior.png",
2897:"uk-GB08_Churchill_I.png",
2129:"uk-GB20_Crusader.png",
12881:"uk-GB50_Sherman_III.png",
53585:"uk-GB68_Matilda_Black_Prince.png",
11089:"uk-GB28_Bishop.png",
14417:"uk-GB45_Achilles_IIC.png",
9809:"uk-GB40_Gun_Carrier_Churchill.png",
9553:"uk-GB74_AT8.png",
53841:"uk-GB63_TOG_II.png",
4689:"uk-GB09_Churchill_VII.png",
3665:"uk-GB19_Sherman_Firefly.png",
1105:"uk-GB21_Cromwell.png",
11857:"uk-GB77_FV304.png",
14161:"uk-GB41_Challenger.png",
54097:"uk-GB71_AT_15A.png",
10065:"uk-GB75_AT7.png",
3153:"uk-GB10_Black_Prince.png",
5457:"uk-GB22_Comet.png",
11345:"uk-GB29_Crusader_5inch.png",
14673:"uk-GB80_Charioteer.png",
8529:"uk-GB72_AT15.png",
3921:"uk-GB11_Caernarvon.png",
5969:"uk-GB23_Centurion.png",
12113:"uk-GB79_FV206.png",
13137:"uk-GB81_FV4004.png",
52561:"uk-GB32_Tortoise.png",
4433:"uk-GB12_Conqueror.png",
5713:"uk-GB24_Centurion_Mk3.png",
11601:"uk-GB30_FV3805.png",
13905:"uk-GB83_FV4005.png",
9297:"uk-GB48_FV215b_183.png",
6225:"uk-GB13_FV215b.png",
7249:"uk-GB70_FV4202_105.png",
12369:"uk-GB31_Conqueror_Gun.png",
64801:"usa-A00_T110E5.png",
545:"usa-T1_Cunningham.png",
6177:"usa-T18.png",
55073:"usa-T7_Combat_Car.png",
53537:"usa-T1_E6.png",
51489:"usa-T2_lt.png",
1825:"usa-M2_lt.png",
5665:"usa-T2_med.png",
2081:"usa-T57.png",
6433:"usa-T82.png",
52769:"usa-M22_Locust.png",
52001:"usa-MTLS-1G14.png",
289:"usa-M3_Stuart.png",
4897:"usa-M2_med.png",
54049:"usa-Sexton_I.png",
3617:"usa-M7_Priest.png",
10273:"usa-M8A1.png",
7713:"usa-T40.png",
5153:"usa-M5_Stuart.png",
3105:"usa-M3_Grant.png",
4641:"usa-M37.png",
10529:"usa-T67.png",
6945:"usa-M10_Wolverine.png",
3361:"usa-T1_hvy.png",
33:"usa-T14.png",
9761:"usa-M24_Chaffee.png",
52257:"usa-M4A2E4.png",
51745:"usa-Ram-II.png",
5409:"usa-M7_med.png",
1057:"usa-M4_Sherman.png",
4129:"usa-M41.png",
11553:"usa-M18_Hellcat.png",
7201:"usa-M36_Slagger.png",
801:"usa-M6.png",
16673:"usa-A94_T37.png",
15137:"usa-T21.png",
56097:"usa-A104_M4A3E8A.png",
54305:"usa-M4A3E8_Sherman_training.png",
10017:"usa-Sherman_Jumbo.png",
1313:"usa-M4A3E8_Sherman.png",
16417:"usa-M44.png",
56609:"usa-A102_T28_concept.png",
11041:"usa-T25_2.png",
9249:"usa-T25_AT.png",
3873:"usa-T29.png",
17953:"usa-M41_Bulldog.png",
15649:"usa-T71.png",
11809:"usa-T23E3.png",
1569:"usa-T20.png",
7969:"usa-M12.png",
56353:"usa-A101_M56.png",
11297:"usa-T28_Prototype.png",
8225:"usa-T28.png",
52513:"usa-M6A2E1.png",
4385:"usa-T32.png",
2849:"usa-T34_hvy.png",
18209:"usa-T49.png",
53793:"usa-T95_E2.png",
14625:"usa-T69.png",
13345:"usa-T26_E4_SuperPershing.png",
5921:"usa-Pershing.png",
2337:"usa-T23.png",
7457:"usa-M40M43.png",
8737:"usa-T95.png",
2593:"usa-T30.png",
9505:"usa-M103.png",
15393:"usa-T54E1.png",
8993:"usa-M46_Patton.png",
16161:"usa-M53_55.png",
13857:"usa-T110E3.png",
13089:"usa-T110E4.png",
14881:"usa-T57_58.png",
10785:"usa-T110.png",
55841:"usa-T95_E6.png",
15905:"usa-M60.png",
14113:"usa-M48A1.png",
8481:"usa-T92.png",
64769:"ussr-R00_T_50_2.png",
3329:"ussr-MS-1.png",
65281:"ussr-Observer.png",
5121:"ussr-AT-1.png",
54529:"ussr-Tetrarch_LL.png",
15361:"ussr-T-60.png",
4609:"ussr-T-26.png",
1025:"ussr-BT-2.png",
3841:"ussr-SU-18.png",
54273:"ussr-SU76I.png",
6401:"ussr-SU-76.png",
56577:"ussr-LTP.png",
53505:"ussr-T-127.png",
52737:"ussr-M3_Stuart_LL.png",
52225:"ussr-BT-SV.png",
15105:"ussr-T-70.png",
3073:"ussr-T-46.png",
769:"ussr-BT-7.png",
7681:"ussr-SU-26.png",
6913:"ussr-GAZ-74b.png",
52481:"ussr-Valentine_LL.png",
15873:"ussr-T80.png",
9473:"ussr-T-50.png",
2049:"ussr-A-20.png",
52993:"ussr-A-32.png",
1537:"ussr-T-28.png",
4865:"ussr-SU-5.png",
53761:"ussr-SU_85I.png",
257:"ussr-SU-85.png",
54017:"ussr-KV-220_action.png",
51713:"ussr-Churchill_LL.png",
51201:"ussr-KV-220.png",
18689:"ussr-KV-1s.png",
11777:"ussr-KV1.png",
1281:"ussr-KV.png",
9729:"ussr-T_50_2.png",
51457:"ussr-Matilda_II_LL.png",
1:"ussr-R04_T-34.png",
16385:"ussr-SU122A.png",
54785:"ussr-SU100Y.png",
3585:"ussr-SU-100.png",
11265:"ussr-T150.png",
10497:"ussr-KV2.png",
2817:"ussr-R106_KV85.png",
16641:"ussr-MT25.png",
58113:"ussr-R108_T34_85M.png",
56321:"ussr-T-34-85_training.png",
12289:"ussr-A43.png",
2561:"ussr-T-34-85.png",
5633:"ussr-SU-8.png",
55297:"ussr-SU122_44.png",
10241:"ussr-SU100M1.png",
2305:"ussr-SU-152.png",
5889:"ussr-KV-3.png",
513:"ussr-IS.png",
18433:"ussr-R107_LTB.png",
57089:"ussr-T44_85.png",
56833:"ussr-T44_122.png",
12545:"ussr-A44.png",
8961:"ussr-KV-13.png",
6657:"ussr-T-43.png",
16129:"ussr-SU14_1.png",
1793:"ussr-S-51.png",
58625:"ussr-R111_ISU130.png",
9985:"ussr-SU-101.png",
7425:"ussr-ISU-152.png",
53249:"ussr-KV-5.png",
11009:"ussr-KV4.png",
9217:"ussr-Object252.png",
5377:"ussr-IS-3.png",
18177:"ussr-R109_T54S.png",
13313:"ussr-Object416.png",
4353:"ussr-T-44.png",
4097:"ussr-SU-14.png",
12033:"ussr-SU122_54.png",
8193:"ussr-Object_704.png",
11521:"ussr-IS8.png",
10753:"ussr-ST_I.png",
17665:"ussr-R104_Object_430_II.png",
7937:"ussr-T-54.png",
8449:"ussr-Object_212.png",
14337:"ussr-Object263.png",
13569:"ussr-Object268.png",
58369:"ussr-R110_Object_260.png",
7169:"ussr-IS-7.png",
6145:"ussr-IS-4.png",
17153:"ussr-Object_430.png",
16897:"ussr-Object_140.png",
15617:"ussr-Object_907.png",
13825:"ussr-T62A.png",
8705:"ussr-Object_261.png"
},

realm:{north:'北区',south:'南区'},

color:function(x){
x = parseInt(x,10)
if(!x)
	return '#666'
else if(x<=60)
	return '#b02'
else if(x<=80)
	return '#f33'
else if(x<=100)
	return '#2b2'
else if(x<=120)
	return '#5f5'
else if(x<=140)
	return '#6af'
else if(x<=160)
	return '#c4f'
else if(x<=180)
	return '#dc0'
else
	return '#fa3'
},

country:function(x){
if(x=='苏联')
	return 'c1.jpg'
else if(x=='德国')
	return 'c2.jpg'
else if(x=='美国')
	return 'c3.jpg'
else if(x=='法国')
	return 'c5.jpg'
else if(x=='中国')
	return 'c4.jpg'
else if(x=='英国')
	return 'c6.jpg'
else if(x=='日本')
	return 'c7.jpg'
},

get:function(a,update){// arg:{host,realm,name,o}
if(!a)
	return

if(typeof(a)=='string')
	a = this.cache[a]
else{
	if (a.host=='cn')
		{
		a.realm = a.realm=='n' ? 'north':'south'
		a.hosthost = 'rank.kongzhong.com'
		a.cachepath = 'cache_wot'
		a.imgpath = __IMG_BASE+'/ngabbs/wot'
		a.proxypath = __IMG_BASE+'/proxy'
		a.u = 'getUserJson?name='+encodeURIComponent(a.name)+'&area='+a.realm
		}
	else
		return

	if(!a.cacheKey)
		a.cacheKey = 'k'+Math.floor(Math.random()*10000)

	if(!this.cache[a.cacheKey])
		this.cache[a.cacheKey] = a
	}

var self = this;
if (update==-1)
	return a.o.innerHTML="[<a class='b' href='http://"+a.hosthost+"/index.html?name="+encodeURIComponent(a.name)+"&area="+a.realm+"' target='_blank'>"+a.host+" / "+a.name+"</a>]"

var urls = this.genUrl(a.hosthost,a.proxypath,a.cachepath,a.u,update)
//if(window.__DEBUG)console.log('wow armory get '+urls[0]+' : '+urls[1])
httpDataGetter.script_muti_get(urls,
	function(x){
		if (!x)
			return false;
		else if (!x[0] || x.error){
			a.o.innerHTML=self.error((x.error)?x.error:1,a)
			return true
			}
		else
			{
			var date = new Date
			if ((date.getTime()/1000 - x[1])>3600*24*7 && !x[2])
				return false
			try{
				a.o.innerHTML=self.proc(x[0],a)
				}
			catch(err){
				console.log(err)
				a.o.innerHTML="<span class='gray b'>[wotarmory parse error]</span>"
				}
			return true
			}
		},
	function(){
		a.o.innerHTML=self.error(0,a)
		},
	'utf-8'
	);

},//fe

proc : function(t,a)
{
if(!t)
	return this.error(1,a);
if (!t.player)
	return this.error(3,a);

for(var k in t.ratinglist)
	break

var r = "\
<div class='armorychr armorychr_v2' \
	style='padding:0 0.25em 0 130px;margin-bottom:0.1em;background:#000 url("+a.imgpath+"/"+this.country(t.ratinglist[k].country )+") no-repeat -10px -30px;' \
	class=''>\
		<span style='font-size:0.923em'>\
			<nobr><a class='xtxt small_colored_text_btn' style='background:gray' href='javascript:void(0)' \
					onclick='wotArmory.get(\""+a.cacheKey+"\",1)' title='刷新 数据缓存可能需要数小时或数天更新'>#</a> \
				<span class='xtxt subcolor'>("+a.host+")</span> \
				"+this.realm[a.realm]+" "+t.player.clanname+" "+t.player.levelname+" \
				[<a href='http://"+a.hosthost+"/index.html?name="+encodeURIComponent(a.name)+"&area="+a.realm+"' target='_blank' class='name b' style='font-size:1.166em'>"+t.player.username+"</a>]</nobr>"+this.ef('综合效率','',t.player.totalrating)
		+this.ef('HT','重型坦克',t.player.htrating)
		+this.ef('MT','中型坦克',t.player.mtrating)
		+this.ef('LT','轻型坦克',t.player.ltrating)
		+this.ef('TD','反坦克炮',t.player.tdrating)
		+this.ef('SPG','自行火炮',t.player.spgrating)+"</span>\
		<div style='padding-bottom:0.25em'>"+this.tank(t.ratinglist,a.imgpath)+"<div class='clear'></div></div>\
</div>\
";

return r;

},//fe

ef:function(k,t,v){
return "<span class='subcolor' title='"+t+"' style='margin-left:0.5em'>"+k+"</span><span style='margin-left:0.2em;color:"+this.color(v)+"'>"+v+"</span>"
},//fe

tank:function(list,img){
var r= '', x = function(y,z){return Math.floor(y/z*10)/10}
for(var k in list){
	if(typeof list[k]!='object')
		continue
	var t = list[k], m = t.mastermark ? "<img src='"+img+"/master"+t.mastermark+".png' style='float:left'/>" : ''
	r+="<a title='"+
		(t.vname+' '+t.vtype+' '+t.vlevel+'级 当前版本场次'+t.seasonbattles+
		' 效率'+t.effrate+' 胜率'+x(t.wins*100,t.battles)+' 场均'+x(t.damageDeal,t.battles)+' 场均助攻'+x(t.damageAssist,t.battles)+' 场均吸收'+x(t.potential_damage_received,t.battles)
		)
		+"' href='javascript:void(0)' onclick='alert(this.title)' style='display:block;border:1px solid #444;border-left:none;border-right:none;width:116px;padding:0 10px 0 6px;float:left;height:31px;line-height:15px;font-size:12px;text-align:right;background:url("+img+"/"+(this.icon[t.vid]?this.icon[t.vid]:this.icon.unknow)+") 25px center no-repeat'><span style='color:"+this.color(t.effrate)+"'>"+m+t.effrate+"</span><br/><span title='当前版本战斗场次'>"+t.seasonbattles+"</span></a>"
	}
return r
},//fe

/**
* hosthost 目标域名
* proxypath 代理地址
* cachepath 缓存根目录
* u 目标文件路径
* update 刷新缓存
* ext 从目标文件路径获取扩展名
 */
genUrl : function(hosthost,proxypath,cachepath,u,update,ext){

var k = hex_md5(u)
if(ext)
	ext = u.match(/\.([a-zA-Z0-9]{1,5})(?:\?|$)/)
ext = ext ? ext[1] : 'js'
cachepath = cachepath+'/'+k.substr(0,2)+'/'+k.substr(2,2);
//if (update)
//	return [proxypath+"/proxy.php?update=1&host="+hosthost+"&url=" + encodeURIComponent(u) + "&rand=" +Math.random()+(window.__DEBUG?'&debug=1':'')]
//else
//	return [proxypath+"/"+cachepath+"/" + k + "."+ext,proxypath+"/proxy.php?host="+hosthost+"&url=" + encodeURIComponent(u)];
return proxypath+"/"+cachepath+"/" + k + "."+ext
},//fe

error :function(c,a)
{
return '  加载错误  ';
}

}//ce

//wot============================================
//wot============================================
//wot============================================

var jnArmory = {

get:function(a,update){// arg:{host,realm,name,o}
if(!a)
	return

if(typeof(a)=='string')
	a = this.cache[a]
else{
	if (a.host=='cn')
		{
		//a.realm = a.realm=='n' ? 'north':'south'
		a.hosthost = 'zj.alpha.p7game.com'
		a.reshost = 'zj.download.p7game.com'
		a.cachepath = 'cache_jn'
		a.rescachepath = 'cache_jn_res'
		a.imgpath = __IMG_BASE+'/ngabbs/jn'
		a.proxypath = 'http://img4.ngacn.cc/proxy'
		a.u = 'inter/getUserInfo/&uid='+encodeURIComponent(a.name)+'&sid='+encodeURIComponent(a.realm)
		}
	else
		return

	if(!a.cacheKey)
		a.cacheKey = 'k'+Math.floor(Math.random()*10000)

	if(!this.cache[a.cacheKey])
		this.cache[a.cacheKey] = a
	}

var self = this;
if (update==-1)
	return a.o.innerHTML="[<a class='b' href='http://"+a.hosthost+"/index.html?name="+encodeURIComponent(a.name)+"&area="+a.realm+"' target='_blank'>"+a.host+" / "+a.name+"</a>]"

var urls = this.genUrl(a.hosthost,a.proxypath,a.cachepath,a.u,update)
//if(window.__DEBUG)console.log('wow armory get '+urls[0]+' : '+urls[1])
httpDataGetter.script_muti_get(urls,
	function(x){
		if (!x)
			return false;
		else if (!x[0] || x.error){
			a.o.innerHTML=self.error((x.error)?x.error:1,a)
			return true
			}
		else
			{
			var date = new Date
			if ((date.getTime()/1000 - x[1])>3600*24*7 && !x[2])
				return false
			try{
				a.o.innerHTML=self.proc(x[0],a)
				}
			catch(err){
				console.log(err)
				a.o.innerHTML="<span class='gray b'>[jnarmory parse error]</span>"
				}
			return true
			}
		},
	function(){
		a.o.innerHTML=self.error(0,a)
		},
	'utf-8'
	);

},//fe
cache:{},
genUrl:wotArmory.genUrl,
error:wotArmory.error,
img:function(id,a,x){
var u = x ? 'download/nga_tx/nga_ship/Nga_ship_'+id+'.png' : 'download/nga_tx/nga_shipwar/Nga_shipwar_'+id+'.png'
, urls = this.genUrl(a.reshost,a.proxypath,a.rescachepath,u,0,1)
if(Math.random()<0.00001){
	u = urls[0]
	urls[0]=urls[1]
	urls[1] = u
	}
return urls
},//fe
proc:function(t,a){
var y = __SETTING.bit&4 ? 1.5 :2, x = '<div class="armorychr armorychr_v2" style="width:auto;padding:0 0.25em 0 140px;margin-bottom:0.1em;background:#000 none no-repeat 0 25%;">'+'提督 [<b class="namecolor">'+t.rolename +'</b>] 远征'+t.explore+'次 演习'+t.pvp+'次 <a href="http://zj.p1p1game.com/" target="_blank" class="xtxt subcolor">[zj.p1p1game.com]</a><br/>'
if(t.fleets)
	for(var k in t.fleets){
		x+='<nobr>'
		for(var i=0;i<t.fleets[k].length;i++){
			var s = t.fleets[k][i]
			x+=' <img src="'+this.img(s.id,a).join('" name="')+'" title="'+s.title+'" onerror="this.src=this.name" style="width:'+y+'em;height:'+y+'em" /> '
			}
		x+='</nobr> &nbsp; '
		if((k&1)==0)
			x+='<br/>'
		}
x+='<img src="'+this.img(t.secretary.id,a,1).join('" name="')+'" onerror="this.src=this.name" style="display:none" onload="this,parentNode.style.backgroundImage=\'url(\'+this.src+\')\'"/></div>';
return x
}//fe
}//ce