function bbs_ads2(){}

commonui.indexBlock={
single: window.__SETTING.bit & 4,
btn:null,
resetButton:null,
l:null,
r:null,
rr:null,


blockData : {

1:{
	id:1,
	name:'魔兽世界综合讨论',
	pic:{
		pic:__IMG_STYLE+"/title2/20120611c.jpg",
		txt:null,
		link:null,
		color:'#A99877',
		shadow:'#000'
		},
	content:[
			{
			//nameWidth:66,
			subWidth:33,
			content:[
				[7,['<span style="font-size:1.15em">艾泽拉斯议事厅</span>','魔兽主讨论区','<span style="font-size:1.15em">议事厅</span>'],0,0,1],//k,[name,info,name_s,info_s.info_l],link,icon,invertcolor
				[430,['德拉诺之王','资料片最新信息']],
				[323,['国服以外讨论','国服以外综合讨论','国服以外']],
				
				[-7,['大漩涡','非魔兽话题']],
				[-447601,['二次元国家地理','动漫']],
				[230,['艾泽拉斯风纪委员会','曝光违背公认准则的行为','风纪委员会']],
				[310,['前瞻资讯','新版本与高阶讨论',0,'高阶讨论']],
				[414,['游戏综合讨论区','其他游戏讨论','游戏综合']],
				[null,['魔兽世界专题站',0,'魔兽专题站'],'http://wow.178.com/',37],
				[null,['魔兽世界数据库',0,'魔兽数据库'],'http://db.178.com/wow/',37]
				]
			},
	
			{
			name:'职业讨论区',
			subWidth:33,
			content:[
				[390,['五晨寺','武僧']],
				[320,['黑锋要塞','死亡骑士']],
				[181,['铁血沙场','战士']],
				[182,['魔法圣堂','法师']],
				[183,['信仰神殿','牧师']],
				[185,['风暴祭坛','萨满']],
				[186,['翡翠梦境','德鲁伊']],
				[187,['猎手大厅','猎人']],
				[184,['圣光之力','圣骑士']],
				[188,['恶魔深渊','术士']],
				[189,['暗影裂口','盗贼']]
				]
			},

			{
			name:'冒险心得',
			subWidth:33,
			content:[
				[310,['前瞻资讯','新版本与高阶讨论',0,'高阶讨论']],
				[190,['任务讨论',0,0,0,'魔兽世界任务']],
				[218,['副本专区',0,0,0,'魔兽世界副本']],
				[327,['成就讨论',0,0,0,'魔兽世界成就']],

				[388,['幻化讨论',0,0,0,'魔兽世界装备幻化']],
				[411,['宠物讨论',0,0,0,'魔兽世界宠物']],
				[191,['地精商会',0,0,0,'魔兽世界生产/商业']],
				[200,['插件研究',0,0,0,'魔兽世界插件研究']],
				[274,['插件发布',0,0,0,'魔兽世界插件发布']],

				[272,['竞技场',0,0,0,'魔兽世界竞技场']],
				[258,['战场讨论',0,0,0,'魔兽世界战场']],
				[213,['战争档案',0,0,0,'魔兽世界战报']],

				[255,['公会管理',0,0,0,'公会管理经验交流']],
				[306,['人员招募',0,0,0,'公会人员招募']],
				[315,['战斗统计',0,0,0,'Wol相关']],

				[240,['BigFoot',0,0,0,'大脚插件反馈']],

				[333,['DKP系统',0,0,0,'DKP系统反馈']],
				[193,['帐号安全',0,0,0,'帐号安全']],
				[271,['魔兽世界集换卡','WoWTCG','WoWTCG']]
				]
			},

			{
			name:'历史背景 资料整理',
			subWidth:33,
			content:[
				[8,'大图书馆','资料归档'],
				[254,'镶金玫瑰','历史研究'],
				[116,'奇迹之泉','分享创意'],
				[124,'壁画洞窟','原创艺术 同人作品'],
				[102,'作家协会','游戏文学作品发布'],
				[264,'卡拉赞剧院','影音制作讨论']
				]
			}


		]
	},

2:{
	id:2,
	name:'其他版面',
	pic:{
		pic:__IMG_STYLE+"/title2/20120611b.jpg",
		txt:null,
		link:null,
		color:'#A99877',
		shadow:'#000'
		},
	content:[
			{

			subWidth:50,
			content:[
				[10,['银色黎明裁判所','投诉/网站BUG/建议']],

				[124,['壁画洞窟','原创艺术 同人作品']],
				[102,['作家协会','游戏文学作品发布']],
				[264,['卡拉赞剧院','影音制作讨论']],

				[436,['消费电子 IT新闻']],
				[334,['硬件配置','装机讨论']],
				[335,['NGA开发']]
				]
			},

			{
			name:'网事杂谈',
			subWidth:50,
			content:[
				[-7,['<span style="font-size:1.15em">大漩涡</span>','网事杂谈'],0,0,1],
				[-187579,['大旋涡博物馆','文章存档']],
				
				[-447601,['二次元国家地理','动漫']],
				[-84,['模玩之魂','模型手办']],
				[-8725919,['小窗视界','旅游摄影']],
				[-343809,['寂寞的车','车迷专区']],
				[-131429,['红茶馆','网文讨论']],
				[-608808,['弑熊主厨的血腥厨房','美食厨房']],
				[-469608,['音乐 影视']],
				[-522474,['综合体育讨论区',0,0,0,'体育']],
				[-81981,['生命之杯','足球讨论']],

				[-54214,['时尚消费']],
				[-168888,['NGA育儿版','母婴']],
				[-353371,['宠物养成']],
				[-2671,['发烧友','音频设备及音乐共享']],
				[-202020,['程序员职业交流']],
				[-349066,['吟·瑟·梨·茗','曲艺']],
				[-444012,['我们的骑迹','自行车']],
				[-187628,['家居 装修']]
				]
			},

			{
			subWidth:50,
			content:[]
			}
		]
	},

3:{
	id:3,
	name:'暗黑破坏神',
	pic:{
		pic:__IMG_STYLE+"/title2/20120611d.jpg",
		txt:null,
		link:null,
		color:'#A99877',
		shadow:'#000'
		},
	content:[
			{
			//nameWidth:33,
			subWidth:50,
			content:[
				[318,['<span style="font-size:1.15em">暗黑破坏神3</span>','D3综合讨论区','<span style="font-size:1.15em">暗黑破坏神</span>'],0,0,1],
				[400,['职业/技能'],null,29]
				]
			}
		]
	},

4:{
	id:4,
	name:'游戏专版',
	pic:{
		pic:__IMG_STYLE+"/title2/20120611a.jpg",
		txt:null,
		link:null,
		color:'#A99877',
		shadow:'#000'
		},
	content:[
			{
			subWidth:50,
			content:[
				[414,['<span style="font-size:1.15em">游戏综合讨论区</span>'],0,0,1],
				[-235147,['激战2','Guild Wars 2']],
				[442,['逆战']],
				[-65653,['剑灵','Blade & Soul']],
				[432,['战机世界','World of Warplanes'],0,0,0,1392976012],
				[-532408,['沃土','Wakfu'],0,0,0,1390505258],
				[435,['上古卷轴Online'],0,0,0,1390505258],
				[353,['纽沃斯英雄传','Heroes of Newearth']],
				[-47218,['地下城与勇士','Dungeon & Fighter'],0,0,0,1390505258],
				[431,['风暴英雄','Heroes of the Storm']],
				[-452227,['口袋妖怪系列','Pokemon']],
				
				[-362960,['最终幻想14','Final Fantasy XIV']],
				[-6194253,['战争雷霆','War Thunder']],
				[427,['怪物猎人系列', 'Monster Hunter']],
				[425,['行星边际2','PlanetSide2']],
				[422,['炉石传说','HearthStone']],
				[412,['巫师之怒','Allods Online']],
				[-46468,['坦克世界','World of Tanks']],
				[321,['DotA系列',0,0,0,'Defense of the Ancients']],
				[-2371813,['EVE','星战前夜']],
				[-7861121,['剑侠情缘网络版叁']],
				[-793427,['无尽英雄','Infinity Hero']],
				[332,['战锤40K系列','Warhammer 40K']],
				[416,['火炬之光2','Torchlight']],
				[406,['星际争霸2综合讨论', 'Starcraft Ⅱ']],
				[424,['圣斗士星矢Online']],
				[443,['FIFA online 3']]
				]
			},
			{
			//nameWidth:66,
			subWidth:50,
			content:[
				[428,['手机游戏讨论',0,0,0,'Mobile Games'],0,0,1],
				[447,['锁链战记'],0,0,0,1399187797],
				[445,['迷你西游'],0,0,0,1398309620],
				[444,['刀塔传奇'],0,0,0,1398309620],
				[434,['神鬼幻想']],
				[433,['神雕侠侣','']],
				[426,['智龙迷城','Puzzle & Dragons']],
				[-51095,['部落战争','Clash of Clans']],
				[420,['我叫MT online']]
				]
			},
		]
	},
/*
5:{
	id:5,
	name:'t.178.com',
	content:[]
	},
*/

5:{
	id:5,
	name:'MOBA游戏',
	info:'多人在线竞技场游戏',
	content:[
			{
			subWidth:50,
			content:[
				[-152678,['英雄联盟','League Of Legends']],
				[321,['DotA系列',0,0,0,'Defense of the Ancients']],
				[431,['风暴英雄','Heroes of the Storm']],
				[353,['纽沃斯英雄传','Heroes of Newearth']]
				]
			}
		]
	},

7:{
	id:7,
	name:'炉石传说',
	content:[
			{
			subWidth:50,
			content:[
				[422,['炉石传说','HearthStone']],
				[429,['战术讨论',0,0,0,'炉石高端讨论']]
				]
			}
		]
	},

8:{
	id:8,
	name:'热点游戏',
	content:[
			{
			subWidth:50,
			content:[
				[-362960,['最终幻想14','Final Fantasy XIV']],
				[-235147,['激战2','Guild Wars 2']]
				]
			}
		]
	},
	
9:{
	id:9,
	name:'最近新增的版面',
	content:[
			{
			subWidth:50,
			content:[
				]
			}
		]
	}
},


blockOrder:{
x2:{l:[1],r:[7,3,5,8,4,2,-1]},//left,right
x1:{l:[1,7,8,3,5,4,2,-1]},
d3:{l:[3,1,7,8,4,2,-1,5]}
},


genXml:function(){

var y = '<?xml version="1.0" encoding="GBK"?><root>\n' , z= function(t){return t.replace(/<.+?>/g,'').replace(/&/g,'&amp;')}

for(var k in this.blockData){
	if(k==0)continue//最近访问
	y+='\t<category id="'+this.blockData[k].id+'" name="'+this.blockData[k].name+'">\n'
	var c = this.blockData[k].content
	for(var i=0;i<c.length;i++){
		y+='\t\t<group'+(c[i].name?' name="'+c[i].name+'"':'')+'>\n'
		var cc = c[i].content
		for(var j=0;j<cc.length;j++){
			if(cc[j]){
				if(!cc[j][0])
					continue;
				//x+='<item>'
				var x = cc[j]
				if(typeof x[1] == 'object'){
					y+='\t\t\t<forum '
					if(x[0])
						y+=' fid="'+x[0]+'"'
					if(x[1][2])
						y+=' nameshort="'+z(x[1][2])+'"'
					if(x[1][0])
						y+=' name="'+z(x[1][0])+'"'
					if(x[1][4])
						y+=' info="'+z(x[1][4])+'"'
					else if(x[1][1])
						y+=' info="'+z(x[1][1])+'"'
					if(x[1][3])
						y+=' infoshort="'+z(x[1][3])+'"'
					if(x[4])
						y+=' heightlight="1"'
					y+='/>\n'
					}
				else{
					y+='\t\t\t<forum '
					if(x[0])
						y+=' fid="'+x[0]+'"'
					if(x[5])
						y+=' nameshort="'+z(x[5])+'"'
					if(x[1])
						y+=' name="'+z(x[1])+'"'
					if(x[2])
						y+=' info="'+z(x[2])+'"'
					if(x[6])
						y+=' infoshort="'+z(x[6])+'"'
					if(x[7])
						y+=' heightlight="1"'
					y+='/>\n'
					}
				//for(var l=0;l<ccc.length;l++)
				//	x+=ccc[l] ? '<item>'+ccc[l].toString().replace(/<.+?>/g,'').replace(/&/g,'&amp;')+'</item>' : '<item/>'
				//x+='</item>'

				}
			}
		y+='\t\t</group>\n'
		}
	y+='\t</category>\n'
	}
return y+'</root>'
},

load:function (l,r,c,rr){
//if (this.lite)return

if(this.temp){
	this.temp=false
	var ee=1,self = this
	return __NUKE.doRequest({
		u:window.__API.indexForumList(),
		f:function(d){
			var e = __NUKE.doRequestIfErr(d,7200)
			if(e===true && ee){
				ee=false
				return
				}
			if(e)
				return alert(e)
			var d = d.data[0]
			if(self.added){
				for(var j in self.added){
					var k = j.split('\t')
					d.all[k[0]].content[k[1]].content[k[2]] = self.added[j]
					}				
				}
			self.blockData = d.all
			self.blockOrder.x2 = d['double']
			self.blockOrder.x1 = d.single
			commonui.indexBlock.load(l,r,c,rr)
			return true
			}
		})
	}

var x,y='',z='',h,w = window

if(this.single)
	x = this.blockOrder.x1,h=1
else 
	x = this.blockOrder.x2,h=1

if(x[0]){
	x.l=[]
	for(var k in x[0])
		x.l.push(x[0][k])
	x.r=[]
	for(var k in x[1])
		x.r.push(x[1][k])
	}

if(h==1){
	h = w.commonui.userCache.get('ForumViewHis')
	if(h){
		var hc =[]
		for (var k in h){
			if (h[k][2]) 
				hc.push([h[k][0],h[k][1]])
			}
		if(hc.length){
			this.blockData[0] = {
				id:0,
				name:'快速导航',
				content:[
						{
						subWidth:50,
						content:hc
						}
					]
				}
			x.l.unshift(0)
			}
		}
	}

for (var i=0;i<x.l.length ; i++){
	if(this.blockData[x.l[i]])
		y+=this.genBlock(x.l[i])
	}

if(x.r){
	for (var i=0;i<x.r.length ; i++){
		if(this.blockData[x.r[i]])
			z+=this.genBlock(x.r[i])
		}
	}
else{
	r.style.display=c.style.display='none'
	l.style.width='100%'
	}

if(this.blockData[9] && this.blockData[9].content[0].content.length){
	this.blockData[9].content[0].content.push=function(){}
	y=this.genBlock(9)+y
	}

l.innerHTML=y
if(z)
	r.innerHTML=z


if ((w.ngaAds.bbs_ads26 || w.ngaAds.bbs_ads27) && !(w.__SETTING.bit & 16)){
	if(x.l && x.r)
		var z = 75
	else
		var z = 150
	if(x.l)l.style.width=(l.offsetWidth-z)+'px'
	if(x.r)
		r.style.width=(r.offsetWidth-z)+'px', r.style.marginRight='5px'
	else
		l.style.marginRight='5px'
	rr.style.width='144px'
	rr.style.padding='4px 0px'
	rr.style.overflow='hidden'
	rr.style.height=(rr.parentNode.offsetHeight-8)+'px'
	rr.style.display='block'
	}
if( (__SETTING.uA[2] ==4 && window.navigator.userAgent.toLowerCase().indexOf('ipad')==-1) || __SETTING.uA[2] ==2 ){
	var x = l
	x = x.firstChild.firstChild
	x.insertBefore(
		_$('/a').$0('href','http://app.178.com/','target','_blank','style',{color: '#FFF',cssFloat: 'right','float': 'right',fontFamily: 'inherit',marginTop: '0.7em',background: 'url(http://img4.ngacn.cc/ngabbs/nga_classic/mobi_any_1.gif)',backgroundPosition: '0.3em 50%',backgroundRepeat: 'no-repeat',backgroundColor: '#551200',paddingLeft: '1.4em'},'className','small_colored_text_btn xtxt white','innerHTML','移动客户端'),
		x.firstchild ? x.firstchild : null
		)

	}

},//fe

added:null,

add:function(x,b,c){
if(!this.added)
	this.added = []
var i=10000
for(var k in x){
	if(k!='length' && x[k])
		this.added[b+'\t'+c+'\t'+(i++)]=x[k]
	}
},//fe

addUserForumLaddrer:function(uf){
if(this.temp)
	return;
for (var k=0;k<uf.length;k++){
	this.blockData[2].content[2].content.push(uf[k])
	}

},

addHiddenBlock:function(h){
h.id=-1
this.blockData[-1] = h
},

genBlock :function(o){
o = this.blockData[o]
var c = ''
for (var k in o.content){
	if(o.content[k])
		c+=this.genSubBlock(o.content[k])
	}
if(!c.length)
	return ''
return "<span id='indexBlock"+o.id+"' class='indexblock'><h2 class='catetitle' "+(o.info?"title='"+o.info+"'":'')+">:: "+o.name+" ::<img src='about:blank' onerror='if(commonui.customBackgroundCheckHeight && commonui.customBackgroundCheckHeight(this.parentNode))this.parentNode.className+=\" invertThis\"' class='x'/></h2><div class='catenew' id='indexBlock"+o.id+"Content'>"+(o.pic?this.genPicTitle(o.pic):'')+c+"</div class='catenew'></span id='indexBlock'>"+ngaAds.bbs_ads29_gen(o.id)

},//fe

genPicTitle :function(o){//txt,link,color,shadow
if(!o.shadow)o.shadow = '#000'
if(!o.color)o.color = '#A99877'
if(o.link)
	o.txt = "<a href='"+o.link+"' taeget='_blank' style='color:"+o.color+";text-shadow:"+o.shadow+" 2px 2px'>"+o.txt+"</a>"
else if(o.txt)
	o.txt = "<span style='color:"+o.color+";text-shadow:"+o.shadow+" 2px 2px'>"+o.txt+"</span>"
else
	o.txt = ''
if(o.pic.substr(0,7)!='http://')
	o.pic = __IMG_STYLE+o.pic
return "<div style='height:40px;font-size:18px;font-weight:bold;vertical-align:bottom;text-align:right;padding:5px'>"+o.txt+"</div><img src='about:blank' class='x' onerror='this.parentNode.style.backgroundImage=\"url("+o.pic+")\";this.parentNode.style.backgroundRepeat=\"repeat-x\"'/>"

},//fe

bg2:'344334433443344334433443344334433443344334433443344334433443344334433443344334433443344334433443344334433443344334433443344334433443344334433443'.split(''),
bg3:'343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434'.split(''),

genSubBlock :function(o){//content,subWidth,name,dscp,icon,nameWidth
var c='',x,bg

if (!o.subWidth)o.subWidth=33


if (o.subWidth==50)
	bg = '4334433443344334433443344334433443344334433443344334'
else if(o.subWidth==33)
	bg = '434343434343434343434343434343434343434343434343434343'

c = '',bg = bg.split('')

for (var k in o.content){
	if(k=='length')continue
	x = o.content[k]
	if(!x)continue
	c+=this.genforum(x,bg.shift(),c.length?0:1)
	}

if(!c)
	return '';

return (o.name ? "<h3 class='catetitle'>:: "+o.name+" ::</h3>" : '')+"<div class='c b2' style='float:none;width:auto;margin:0;height:auto'><div style='height:auto' class='b sw"+o.subWidth+"'>"+c+"<div class='clear'></div></div class='b sw'></div class='c b2'>"


},//fe

genforum :function(x,bg,first){
if(typeof x=='number')
	var x = this.index[x]
if(typeof x[1] == 'object')
	var link = x[2], icon = x[3], k=x[0], name = this.single && x[1][2]?x[1][2]:x[1][0], info = this.single && x[1][3]?x[1][3]:x[1][1], invert = x[4], addTime=x[5]
else if(x.name)
	var link = x.link, icon = x.icon, k=x.fid, name = this.single && x.nameS ? x.nameS : x.name, info = this.single && x.infoS ? x.infoS : x.info, invert = x.bit & 1
else
	var link = x[3], icon = x[4], k=x[0], name = this.single && x[5]?x[5]:x[1], info = this.single && x[6]?x[6]:x[2], invert = x[7], addTime=0
if(window.__NOW-addTime<86400*15)//add to new add forums
	this.blockData[9].content[0].content.push(x)
var target=''
if(!link)link = "/thread.php?fid="+k
else target = "target='_blank'"
if(!info)info=''
return "<div class='c b"+bg+(invert?' invert':'')+(first?' first':'')+"' style='background-image:url("+this.getIcon(k,icon,invert)+")'><div class='a'><div class='b'><a href='"+link+"' "+target+">"+name+"</a><br/><p>"+info+" </p></div class='b'></div class='a'></div class='c'>"

},//fe



/*
sw:function (b,p){
if (p.parentNode==this.l){
	var o = this.r
	b.style.backgroundPosition = 'left -125px'
	}
else{
	var o = this.l
	b.style.backgroundPosition = 'left -100px'
	}

if (o.childNodes[0])
	o.insertBefore(p.parentNode.removeChild(p),o.childNodes[0])
else
	o.appendChild(p.parentNode.removeChild(p))

this.addReset()
this.save()
},//fe


save:function (){
var s = {l:{},r:{}}
for (var p in s){
	for (var i=0;i<this[p].childNodes.length;i++)
		if(this[p].childNodes[i].id)
			s[p][this[p].childNodes[i].id]=1
	}
commonui.userCache.set('indexBlockSave',s)
},//fe


down:function (o,p){
p.parentNode.appendChild(p.parentNode.removeChild(p))
this.addReset()
this.save()
},//fe


addReset:function (){
if (!$('indexBlockResetButton')){
	var x = this.l.getElementsByTagName('h2')[0]
	x.innerHTML+=' '+this.btn.replace('{script}','commonui.indexBlock.reset()').replace('<a href=','<a id="indexBlockResetButton" href=').replace('b_down','b_reload')
	}
else if($('indexBlockResetButton').parentNode!=this.l.getElementsByTagName('h2')[0]){
	this.l.getElementsByTagName('h2')[0].appendChild($('indexBlockResetButton').parentNode.removeChild($('indexBlockResetButton')))
	}
},//fe

reset:function (){
commonui.userCache.del('indexBlockSave')
alert('恢复默认设置 请刷新页面')
},//fe


load:function (l,r,c,rr){
if (this.lite)return
this.l = l
this.r = r
this.rr = rr
this.btn = "<a href='javascript:void(0)' class='button b_down' onclick='{script}'>&nbsp; &nbsp; </a>"
var all = {'b_left':l,'b_right':r}
if(this.single){
	var s = _$('<div/>'),p,x
	while (l.firstChild || r.firstChild){
		for (var k in all){
			if(all[k].firstChild && all[k].firstChild.nodeType!=1){
				all[k].removeChild(all[k].firstChild)
				x=1
				}
			else
				x=0
			}
		if(x==1)continue
		if(p==l)
			p=r,x = r.firstChild
		else
			p=l, x = l.firstChild
		if(x)
			s._.aC(x.parentNode.removeChild(x))
		}
	while (s.firstChild)
		l.appendChild(s.removeChild(s.firstChild))
	}

var s = commonui.userCache.get('indexBlockSave')
if (s){
	for (var p in s){
		for (var k in s[p])
			if($(k))
				this[p].appendChild($(k).parentNode.removeChild($(k)))
		}
	this.addReset()
	}

x=75
for (var k in all){
	s = all[k]
	for (var i=0;i<s.childNodes.length;i++){
		if(s.childNodes[i].id){
			s.childNodes[i].getElementsByTagName('h2')[0].innerHTML += " "+this.btn.replace('{script}','commonui.indexBlock.down(this,this.parentNode._p)')+(this.single? '' :" "+this.btn.replace('{script}','commonui.indexBlock.sw(this,this.parentNode._p)').replace('b_down',k))+' '
			s.childNodes[i].getElementsByTagName('h2')[0]._p=s.childNodes[i]
			}
		}
	if(i==0){
		s.style.display='none'
		x=150
		p=100
		}
	}

if(p==100)
	l.style.width=r.style.width='100%'


if (ngaAds['bbs_ads26'] || ngaAds['bbs_ads27']){
	if(l.firstChild)l.style.width=(l.offsetWidth-x)+'px'
	if(r.firstChild)
		r.style.width=(r.offsetWidth-x)+'px', r.style.marginRight='5px'
	else
		l.style.marginRight='5px'
	rr.style.width='144px'
	rr.style.padding='4px 0px'
	rr.style.overflow='hidden'
	rr.style.height=(c.parentNode.offsetHeight-8)+'px'
	rr.style.display='block'
	}

},//fe

*/
getIcon:function (fid,icon,invert){
if(icon){
	if(parseInt(icon,10))
		fid=icon
	else
		return icon
	}
fid = commonui.forumIcon.get(fid)
if(invert)
	fid = fid+'.invert.png'
return fid
},//fe






forumHisOnIndex : function(){
var h = commonui.userCache.get('ForumViewHis')
if(!h || typeof(h[0])!='object')return
var x = '',bgque=[4,3,3,4,4,3,3,4,4,3,3,4,4,3,3,4,4,3,3,4,4,3,3,4],i=0
for (var k in h)
	x+="<div class='c b"+bgque[i++]+"' style='background-image:url("+this.getIcon(h[k][0])+")'><span class='d'></span><div class='a'><div class='b'><a href='thread.php?fid="+h[k][0]+"'>"+h[k][1]+"</a><br/><p></p></div></div></div>"
return x
} /* ,//fe



checkScrollTimeout:null,

loadt178:function(o,oo){
return
if (!window.__CURRENT_UID || !cookieFuncs.getCookie('ngaPassportCid') || !cookieFuncs.getCookie('_i')){
	o.innerHTML =this.loadt178guest()
	oo.style.display=''
	return;
	}
var self=this
oo.style.display=''
if(oo.getBoundingClientRect().top>__NUKE.getDocSize().cH){
	_$(window)._.on('scroll',function(){
		window.clearTimeout(self.checkScrollTimeout)
		if(self.loadedt178user)return
		self.checkScrollTimeout = window.setTimeout(function(){
			if(oo.getBoundingClientRect().top>__NUKE.getDocSize().cH)return
			self.loadedt178user=true
			self.loadt178user(o,oo)
			},300)
		})
	}
else
	{this.loadedt178user=true; this.loadt178user(o,oo)}
},//fe

loadedt178user:false,

loadt178guest:function(){
return "<iframe src='http://t.178.com/static/widget/relationship/bulkfollow/19.html?color=FFF5D7,FFF5D7,333,666666&showtitle=0&showinfo=1&count=4' frameBorder=0 border=0 style='border:none;width:100%;height:202px'></iframe>"
},//fe

loadt178user:function(o,oo){
var self = this
httpDataGetter.script_muti_get('http://t.178.com/api/nga/get_follower_tweets?js=1&user_id='+__CURRENT_UID+'&_i='+encodeURIComponent(cookieFuncs.getCookie('_i'))+'&_sid='+cookieFuncs.getCookie('ngaPassportCid'),
	function(r){
		if(!r)o.innerHTML ='ERROR:NOT LOAD'
		if(r.result==false)
			o.innerHTML ='ERROR:' + r.code + ' ' + r.reason
		else{
			if(r.data){
				var d = ''
				for (var i=0;i<r.data.length ;i++ ){
					if (i>9)break
					d+=self.t178_tpl(r.data[i],i&1 ? 'background:#feb' : '',1)
					}
				o.innerHTML ="<div class='c b4' style='width:99%;background-image: url(http://img4.ngacn.cc/ngabbs/nga_classic/f/37.png);'><span class='d'></span><div class='a'><div class='b'><a href='http://t.178.com/topic/nga' target='_blank'>时光之末</a><br><p>分享你的游戏人生</p></div></div></div><div class='clear'></div><table style='width:100%'>"+d+"</table><div class='clear'></div>"
				}
			else
				o.innerHTML =self.loadt178guest()
			}
		oo.style.display=''
		return true
		},
	function(){
		o.innerHTML ='ERROR:无法获取数据'
		oo.style.display=''
		}
	);

},//fe


t178_tpl:function (d,s){
var a = this.t178_tpl_a(d.user.user_id)

return "<tr "+(s?" style='"+s+"'":'')+"><td class='comment1' rowspan=2 style='line-height:1.2em;padding:5px;vertical-align:top'>"+
"<span></span><img src='about:blank' class='x' onerror='this.previousSibling.innerHTML=commonui.loadPostPortrait(\""+a+"\")'/></td><td style='padding:5px 5px 5px 5px;vertical-align:middle'>"+
"<span class='content' style='line-height:1.5em'>"+
"<nobr><a href='"+d.user.url+"' class='author' target='_blank'><b>"+d.user.nickname+"</b></a>"+(parseInt(d.user.vip_type,10) ? "<sup class='silver vip"+d.user.vip_type+"' style='line-height:0.5em'>v</sup>" :'')+"</nobr> : "+
d.content+
(d.resource ? "<br/><span class='resource' style='padding-left:30px;'><a href='"+d.resource.url+"' class='gray' target='_blank'>["+d.resource.title+"]</a></span>" : '')+
"</span>"+
(d.pic ? "<br/><span class='pic' style='padding-left:30px;'><a href='"+d.pic.large+"' target='_blank'>"+(d.pic.thumb?"<img src='"+d.pic.thumb+"' style='border:1px solid #000'/>":'[图片]')+"</a></span>" :'')+
(d.video ? "<br/><span class='video_t' style='padding-left:30px;'><a href='"+d.video.shorturl+"' title='"+d.video.title+"' target='_blank'>"+(d.video.thumb?"<img src='"+d.video.thumb+"' style='border:1px solid #000'/>":'[观看视频]')+"</a></span>" :'')+
"</td></tr><tr "+(s?" style='"+s+"'":'')+"><td style='font-size:9px;line-height:12px;padding:0 3px 2px 0;vertical-align:bottom'>"+
"<nobr style='display:block;font-size:9px;line-height:12px;text-align:right;-webkit-text-size-adjust: none;'>"+
"<span class='date silver'>"+commonui.time2shortdate(d.create_time)+"</span> "+
(d.id ? "<span class='view'><a href='http://t.178.com/t/"+d.id+"' class='gray' target='_blank'>t.178.com/t/"+d.id+"</a></span> " : '')+
//((d.source_name && d.source_url.indexOf('http://t.178.com')==-1) ? "<span class='source'><a href='"+d.source_url+"' class='gray' target='_blank'>"+d.source_url.replace(/^http:\/\//i,'').replace(/\/.*$/i,'')+"</a></span> " : '')+
"</nobr>"+

(d.source_tweet ? (d.source_tweet.source_tweet ? "<span class='resource'><a href='http://t.178.com/t/"+d.source_tweet.id+"' class='gray' target='_blank'>t.178.com/t/"+d.source_tweet.id+"</a></span>" : "<div style='border-top:1px dashed silver;margin:2px' class='clear'></div>"+this.t178_tpl_2(d.source_tweet)) : '')+

"</td></tr>"

},//fe


t178_tpl_2:function(d,s){
if (!d.user)
	d.user={user_id:"0",nickname:'undefined',url:"about:blank",vip_type:"0"}
var a = this.t178_tpl_a(d.user.user_id)

return "<table class='defaultcolor'"+(s?" style='"+s+"'":'')+"><tr><td class='comment1' style='line-height:1.2em;padding:6px 6px 6px 2px'>"+
"<span></span><img src='about:blank' class='x' onerror='this.previousSibling.innerHTML=commonui.loadPostPortrait(\""+a+"\")'/></td><td style='padding:1px;vertical-align:middle'>"+
"<table><tr><td class='b9tl'></td><td class='b9t'></td><td class='b9tr'></td></tr><tr><td class='b9lcc'></td><td class='b9c comment2' style='padding:3px'>"+
"<span class='content' style='line-height:1.5em'>"+
"<nobr><a href='"+d.user.url+"' class='author' target='_blank'><b>"+d.user.nickname+"</b></a>"+(parseInt(d.user.vip_type,10) ? "<sup class='silver vip"+d.user.vip_type+"' style='line-height:0.5em'>v</sup>" :'')+"</nobr> : " +
d.content+
(d.resource ? "<br/><span class='resource' style='padding-left:30px;'><a href='"+d.resource.url+"' class='gray' target='_blank'>["+d.resource.title+"]</a></span>" : '')+
(d.source_tweet ? (d.source_tweet.source_tweet ? "<br/><span class='resource' style='padding-left:30px;'><a href='http://t.178.com/t/"+d.source_tweet.id+"' class='gray' target='_blank'>t.178.com/t/"+d.source_tweet.id+"</a></span>" : this.t178_tpl_2(d.source_tweet)) : '')+
"</span>"+
(d.pic ? "<br/><span class='pic' style='padding-left:30px;'><a href='"+d.pic.large+"' target='_blank'>"+(d.pic.thumb?"<img src='"+d.pic.thumb+"' style='border:1px solid #000'/>":'[图片]')+"</a></span>" :'')+
(d.video ? "<br/><span class='video_t' style='padding-left:30px;'><a href='"+d.video.shorturl+"' title='"+d.video.title+"' target='_blank'>"+(d.video.thumb?"<img src='"+d.video.thumb+"' style='border:1px solid #000'/>":'[观看视频]')+"</a></span>" :'')+

"<nobr style='font-size:9px;line-height:12px;margin:0 0 -0.5em 0;text-align:right;display:block;-webkit-text-size-adjust: none;'>"+
"<span class='date silver'>"+commonui.time2shortdate(d.create_time)+"</span> "+
(d.id ? "<span class='view'><a href='http://t.178.com/t/"+d.id+"' class='gray' target='_blank'>t.178.com/t/"+d.id+"</a></span> " : '')+

//((d.source_name && d.source_url.indexOf('http://t.178.com')==-1) ? "<span class='source'><a href='"+d.source_url+"' class='gray' target='_blank'>"+d.source_url.replace(/^http:\/\//i,'').replace(/\/.*$/i,'')+"</a></span> " : '')+

"</nobr></td><td class='b9r'></td></tr><tr><td class='b9bl'></td><td class='b9b'></td><td class='b9br'></td></tr></table>"+
"</td></tr></table>"
},//fe

t178_tpl_a:function(id){
var a = parseInt(id,10).toString(16);
if(a.length<8)
	a = (new Array(8-a.length+1).join('0'))+a
a = id ? "http://pic1.178.com/avatars/"+a.substr(0,2)+"/"+a.substr(2,2)+"/"+a.substr(4,2)+"/50_"+id+".jpg" : window.__IMG_STYLE+"/nobody.gif"
return a
},//fe

t178_tpl_s:function(n){
var sn = commonui.cutstrbylen(n,4)
if(sn!=n)sn+='...'
return sn
},//fe


t178_post_form: function (e)
{
if (!window.__CURRENT_UID || !cookieFuncs.getCookie('ngaPassportCid') || !cookieFuncs.getCookie('_i'))
	return alert( 'ERROR:需要登录在178.com登录' )
commonui.createadminwindow()
commonui.adminwindow._.addContent(null)
var id1='_t'+Math.random(), id2='_t'+Math.random(), id3='_t'+Math.random()
commonui.adminwindow._.addContent( "\
	<textarea id='"+id1+"'></textarea><br/>\
	<checkbox id='"+id2+"'/>同步到腾讯 <checkbox id='"+id3+"'/>同步到新浪 <button type='button' onclick='commonui.indexBlock.t178_post($(\""+id1+"\").value,$(\""+id2+"\").checked,$(\""+id3+"\").checked)'>发布</button> <button type='button' onclick='commonui.hideAdminWindow()'>关闭</button>\
")
tTip.showdscp(e,this.adminwindow);

},//fe

t178_post:function(c,qq,sina){

var self=this
httpDataGetter.script_muti_get('http://t.178.com/tweet/new/?js=1&user_id='+__CURRENT_UID+'&_i='+encodeURIComponent(cookieFuncs.getCookie('_i'))+'&_sid='+cookieFuncs.getCookie('ngaPassportCid')+'&content='+encodeURIComponent(c)+(qq?'&qq=1':'')+(qq?'&sina=1':''),
	function(r){
		if(r.flag==false)
			return alert('ERROR:' + r.msg )
		else
			alert( r.msg )
		return true
		},
	function(){
		alert('ERROR:无法连接')
		}
	);

}//fe
*/


}//ce

if(window.__DEBUG)
commonui.indexBlock.temp=1