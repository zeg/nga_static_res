if(!window.postfunc)window.postfunc={}



postfunc.wotBitTable={
l_1 : 1,//1-4级
l_5 : 2,//5级
l_6 : 4,//6级
l_7 : 8,//7级
l_8 : 16,//8级
l_9 : 32,//9级
l_10: 64,//10级

c_lt :128,//轻
c_mt :256,//中
c_ht :512,//重
c_td :1024,//TD
c_spg :2048,//SPG

r_g :4096,//德
r_s :8192,//苏
r_u :16384,//美
r_f :32768,//法
r_b :65536,//英
r_c :131072,//中
r_r :262144//日
}



postfunc.wotTankTable=[


[4225,'早期试验车'],
[4225,'35(t)型','35(t)'],
[4225,'II号'],
[4225,'I号'],
[4225,'38(t)型','38(t)'],
[4225,'III号A型','III号A'],
[4225,'II号G型','II号G'],
[4225,'I号C型','I号C'],
[4225,'II型"山猫"','山猫'],
[4225,'38nA'],
[4225,'T-15'],
[4226,'VK1602"豹"式','VK1602'],
[4228,'VK2801'],
[4225,'II号J型','IIJ'],
[4225,'38H735(f)','38H'],
[4353,'S35 739(f)','S35'],
[4353,'III号'],
[4354,'III/IV号','III-IV'],
[4354,'IV号'],
[4354,'T-25'],
[4096 | 512 | 2,'VK3001(H)','3001H'],
[4096 | 512 | 4,'VK3601(H)','3601H'],
[4356,'VK3001(P)','3001P'],
[4360,'"黑豹"','黑豹'],
[4360,'VK3002(DB)','VK3002DB'],
[4360,'黑豹/M10','伪装豹'],
[4368,'黑豹II'],
[4384,'E-50'],
[4416,'E-50M'],
[4356,'V-IV号坦克','V-IV'],
[4354,'IV号坦克液力型','IV号液力'],
[4356,'四号炮塔升级型','IV号ST'],
[4356,'V-IV号坦克 A','V-IV_A'],
[4616,'"虎"式','虎式'],
[4616,'"虎"P','虎P'],
[4624,'"虎王"','虎王'],
[4624,'VK4502(P)A','VK4502PA'],
[4624,'"狮"式','狮式'],
[4640,'VK4502(P)B','VK4502PB'],
[4640,'E-75'],
[4672,'E-100'],
[4672,'"鼠"式','老鼠'],
[4609,'B2 740 (f)','B2'],
[5121,'I型突击炮','一突'],
[5121,'"黄鼠狼"II','黄鼠狼II'],
[5121,'"追猎者"'],
[5122,'III号突击炮','三突'],
[5124,'IV号反坦克歼击车','四歼'],
[5128,'"猎豹"'],
[5136,'斐迪南'],
[5136,'"猎豹"II','猎豹II'],
[5136,'"猎虎"88cm L/71','猎虎88'],
[5152,'"猎虎"'],
[5184,'E-100反坦克歼击车','E100突'],
[5124,'大麦克斯'],
[4096 | 2048 | 1,'Gw MK.VI(e)'],
[4096 | 2048 | 1,'"黄蜂"'],
[4096 | 2048 | 1,'Sfu IVB'],
[4096 | 2048 | 1,'"野牛"'],
[4096 | 2048 | 1,'"野牛"II'],
[4096 | 2048 | 2,'"蟋蟀"'],
[4096 | 2048 | 4,'"野蜂"'],
[4096 | 2048 | 8,'"黑豹"自行火炮', '自走豹'],
[4096 | 2048 | 16,'Gw 虎（p）','自走虎p'],
[4096 | 2048 | 32,'"虎"式自行火炮', '自走虎'],
[4096 | 2048 | 64,'Gw E系列', '自走E'],

[4096 | 1024 | 1,'黄鼠狼III'],
[4096 | 1024 | 2,'Sfl IVc'],
[4096 | 1024 | 4,'犀牛'],
[4096 | 1024 | 8,'埃米尔'],
[4096 | 1024 | 16,'Rhm B WT'],
[4096 | 1024 | 32,'IV WT'],
[4096 | 1024 | 64,'E100 WT'],

[8321,'MS-1'],
[8321,'BT-2'],
[8321,'T-26'],
[8321,'BT-7'],
[8321,'T-46'],
[8321,'T-127'],
[8321,'A-20'],
[8321,'T-50'],
[8322,'T-50-2'],
[8321,'"瓦伦丁"L','瓦伦丁L'],
[8321,'MkVII 领主','领主'],
[8321,'M3 斯图亚特L','M3斯图亚特L'],
[8321,'BT-SV'],
[8449,'A-32'],
[8449,'T-28'],
[8450,'T-34'],
[8450,'"玛蒂尔达"L','玛蒂尔达L'],
[8452,'T-34-85'],
[8456,'T-43'],
[8456,'KV-13'],
[8464,'T-44'],
[8480,'T-54'],
[8512,'T-62A'],
[8706,'KV-220'],
[8706,'KV-220 T'],
[8706,'KV-1'],
[8706,'"丘吉尔"L','丘吉尔L'],
[8708,'T-150'],
[8708,'KV-2'],
[8720,'KV-5'],
[8708,'KV-1S'],
[8712,'IS'],
[8712,'KV3'],
[8720,'IS-3'],
[8720,'KV-4'],
[8720,'IS-6'],
[8736,'IS-8'],
[8736,'ST-I'],
[8768,'IS-7'],
[8768,'IS-4'],
[9217,'AT-1'],
[9217,'SU-76'],
[9217,'SU-85B'],
[9218,'SU-85I'],
[9218,'SU-85'],
[9220,'SU-100'],
[9220,'SU-100Y'],
[9224,'SU-152'],
[9232,'ISU-152'],
[9248,'704工程'],
[9280,'268工程'],
[9224,'SU-100M1'],
[9232,'SU-101'],
[9248,'SU-122-54'],
[9280,'263工程'],
[9224,'SU-122-44'],
[8192 | 2048 | 1,'SU-18'],
[8192 | 2048 | 1,'SU-26'],
[8192 | 2048 | 1,'SU-5'],
[8192 | 2048 | 2,'SU-122A'],
[8192 | 2048 | 4,'SU-8'],
[8192 | 2048 | 8,'SU-14-1'],
[8192 | 2048 | 8,'S-51'],
[8192 | 2048 | 16,'SU-14'],
[8192 | 2048 | 32,'212工程'],
[8192 | 2048 | 64,'261工程'],
[10244,'S-51'],
[16513,'T1'],
[16513,'M2 轻型坦克','M2轻型'],
[16513,'T2 LT'],
[16513,'M3 "斯图亚特"','M3斯图亚特'],
[16513,'蝉式'],
[16513,'M5 "斯图亚特"','M5斯图亚特'],
[16516,'T21'],
[16520,'T71'],
[16514,'霞飞'],
[16513,'T1E6'],
[16513,'MTLS-1G14'],
[16641,'T2 中型坦克','T2'],
[16641,'M2 中型坦克','M2中型'],
[16641,'M3 "李"','M3李'],
[16642,'M7'],
[16644,'M4A3E8"谢尔曼"','M4A3E8'],
[16648,'T20'],
[16656,'潘兴'],
[16656,'T69'],
[16672,'T54E1'],
[16642,'"公羊"II','公羊II'],
[16644,'"小飞象"','小飞象'],
[16656,'超级潘兴'],
[16672,'M46"巴顿"','M46巴顿'],
[16704,'M48A1'],
[16642,'M4"谢尔曼"','M4谢尔曼'],
[16642,'M4A2E4'],
[16898,'T1 重型坦克','T1重型'],
[16900,'M6'],
[16904,'T29'],
[16912,'T32'],
[16928,'M103'],
[16960,'T57','T57重型'],
[16898,'T14'],
[16912,'T34'],
[16960,'T110E5'],
[16912,'M6A2E1'],
[17409,'T18'],
[17409,'T82'],
[17409,'M8A1'],
[17410,'T49'],
[17412,'M18'],
[17416,'T25 AT','T25'],
[17424,'T28'],
[17440,'T95'],
[17472,'T110E4'],
[17409,'T40'],
[17410,'狼獾'],
[17412,'杰克逊'],
[17416,'T25/2','T25-2'],
[17424,'T28原型','T28P'],
[17440,'T30'],
[17472,'T110E3'],
[16384 | 2048 | 1,'T57'],
[16384 | 2048 | 1,'M7 "牧师"','牧师'],
[16384 | 2048 | 1,'M37'],
[16384 | 2048 | 2,'M41'],
[16384 | 2048 | 4,'M44'],
[16384 | 2048 | 8,'M12'],
[16384 | 2048 | 16,'M40/M43'],
[16384 | 2048 | 32,'M53/M55'],
[16384 | 2048 | 64,'T92'],
[32897,'雷诺FT-17'],
[32897,'哈其开斯H35','H35'],
[32897,'AMX 38','AMX38'],
[32897,'AMX 40','AMX40'],
[32898,'AMX ELC','AMXELC'],
[32900,'AMX 12t','AMX12t'],
[32904,'AMX 13 75','AMX1375'],
[32912,'AMX 13 90','AMX1390'],
[32897,'D1'],
[33025,'D2'],
[33056,'洛林 40t','洛林40t'],
[33088,'查狄伦25t'],
[33281,'B1'],
[33282,'BDR G1B','BDR'],
[33284,'ARL 44','ARL44'],
[33296,'FCM 50 t ','FCM50t'],
[33288,'AMX M4(1945)','AMX1945'],
[33296,'AMX 50 100','AMX50100'],
[33312,'AMX 50 120','AMX50120'],
[33344,'AMX 50B','AMX50B'],
[33793,'雷诺FT AC','FT_AT'],
[33793,'雷诺UE 57','UE_57'],
[33793,'索玛 S40','S40'],
[33794,'S-35 CA','S-35'],
[33796,'ARL V39','ARLV39'],
[33800,'AMX 1946型','AMX1946'],
[33808,'AMX 1948型','AMX1948'],
[33824,'AMX 50福熙','AMX50Foch'],
[33856,'AMX 50福熙 155','AMX50Foch155'],
[33793,'FCM36 Pak40','FCM36'],
[32768 | 2048 | 1,'BS'],
[32768 | 2048 | 1,'洛林39LAM'],
[32768 | 2048 | 1,'AMX 105AM 47', 'AMX105_47'],
[32768 | 2048 | 2,'AMX 105AM', 'AMX105Am'],
[32768 | 2048 | 4,'AMX 13 F3 AM', 'AMX13F3AM'],
[32768 | 2048 | 2,'105 leFH18B2', '105_leFH18B2'],
[32768 | 2048 | 8,'洛林155 50','洛林155_50'],
[32768 | 2048 | 16,'洛林155 51','洛林155_51'],
[32768 | 2048 | 32,'查狄伦 155 55','查狄伦155_55'],
[32768 | 2048 | 64,'查狄伦 155', '查狄伦155'],
[65665,'A13 Mk.I','A13I'],
[65665,'A13 Mk.II','A13II'],
[65665,'A13'],
[65666,'十字军'],
[65665,'Mk.I巡洋坦克'],
[65665,'A10'],
[65665,'瓦伦丁'],
[65793,'维克斯Mk.I','维克斯MkI'],
[65793,'Mk.II','MkII'],
[65793,'Mk.III','MkIII'],
[65793,'玛蒂尔达'],
[65794,'玛蒂尔达黑太子'],
[65796,'克伦威尔'],
[65800,'彗星'],
[65808,'百夫长 Mk.I','百夫长1'],
[65824,'百夫长 Mk.VII','百夫长7'],
[65856,'FV4202'],
[66050,'丘吉尔I型'],
[66052,'丘吉尔VII型'],
[66052,'TOG II*','TOG'],
[66056,'A43'],
[66064,'卡那封'],
[66080,'征服者'],
[66112,'FV215b'],
[66561,'UC 2磅炮','UC'],
[66561,'瓦伦丁AT'],
[66561,'复仇女神'],
[66562,'AT 2','AT2'],
[66564,'AT 8','AT8'],
[66568,'AT 7','AT7'],
[66568,'AT-15A'],
[66576,'AT 15','AT15'],
[66592,'A39"土龟"','A39土龟'],
[66624,'FV215b(183)','FV215b_183'],
[66564,'丘吉尔 GC','丘吉尔GC'],
[131201,'NC-31'],
[131201,'维克斯 Mk.E','维克斯E'],
[131201,'97式'],
[131201,'M5A1'],
[131208,'WZ131'],
[131204,'59-16'],
[131208,'62式'],
[131216,'WZ132'],
[131330,'T-34*'],
[131332,'58式'],
[131336,'T-34-1'],
[131344,'59式'],
[131360,'WZ120'],
[131392,'WZ121'],
[131344,'T-34-2'],
[131592,'IS-2'],
[131600,'WZ110'],
[131600,'WZ111'],
[131616,'WZ111 I-IV','111_I-IV'],
[131648,'WZ113'],
[131072 | 128 | 4,'64式'],

[262144 | 256 | 2,'三式改'],

[16384 | 128 | 1,'T7战斗车'],

[128|8192|1,'T-60'],
[128|8192|1,'T-70'],
[128|8192|1,'T-80'],
[128|4096|1,'VK2001(D)'],
[128|4096|4,'VK3001(D)'],
[128|4096|8,'"黑豹"侦察车','黑豹侦察车'],
[256|4096|16,'印度坦克方案','印度豹'],
[256|4096|32,'豹I原型车','豹I原型'],
[256|4096|64,'豹I'],

[65536 | 2048 | 1,'劳埃德 GC'],
[65536 | 2048 | 1,'"司事" II'],
[65536 | 2048 | 1,'"笞杖"'],
[65536 | 2048 | 2,'"主教"'],
[65536 | 2048 | 4,'FV304'],
[65536 | 2048 | 8,'十字军SP'],
[65536 | 2048 | 16,'FV207'],
[65536 | 2048 | 32,'FV3805'],
[65536 | 2048 | 64,'征服者GC'],
[4096 | 1024 | 8,'E-25'],

[8192 | 256 | 4,'A-43'],
[8192 | 256 | 8,'A-44'],
[8192 | 256 | 16,'416工程'],
[8192 | 256 | 32,'140工程'],

[131072 | 256 | 16,'T-34-3'],
[131072 | 512 | 16,'WZ112']
]


postfunc.wotTankSelecterGen = function(){
var $=window._$, oo = $("tankselect1"), o = $("tankselect2"), ooo = $("tankselect3")
if(!this.wotTankSelecterGenChecker)
	this.wotTankSelecterGenChecker = oo.getElementsByTagName('input')
var x=this.wotTankSelecterGenChecker ,b=0, y =0
for(var i=0;i<x.length;i++){
	if(!x[i].checked)continue
	y++
	b = b | __NUKE.toInt(x[i].value)
	}
if(y<3)
	return

var x= $('/select'), t=  this.wotTankTable
x.appendChild(
	$('/option').$0(
		'innerHTML','其他'
		)
	)
		
for(var i=0;i<t.length;i++){
	if(t[i][0]==b){
		x.appendChild(
			$('/option').$0(
				'innerHTML',t[i][1],
				'value',t[i][2]?t[i][2]:t[i][1]
				)
			)
		}
	}
	
x.onchange=function(){
	if(this.options[this.selectedIndex].value)
		ooo.firstChild.value=this.options[this.selectedIndex].value
	else
		ooo.firstChild.value=''
	}
o.innerHTML = ''
o.appendChild(x)
}//fe

postfunc.prePostHint = function(){
if(this.form.elements.namedItem("fid").value!=423 || this.form.elements.namedItem("tid").value!=0)return true;

var z='onchange=\'postfunc.wotTankSelecterGen()\' value=' , b=this.wotBitTable


var x=_$("<div id='additional_check_5432654' class=gray style='line-height:22px'>\
<span class='b'>以下必选</span><br/>\
<nobr><input type=radio name='type'><span>视频</span></nobr> \
<nobr><input type=radio name='type'><span>游戏录像文件</span></nobr> \
<br/>\
<nobr><input type=radio name='ver'><span>0.8.4</span></nobr> \
<nobr><input type=radio name='ver'><span>0.8.5</span></nobr> \
<nobr><input type=radio name='ver'><span>0.8.6</span></nobr> \
<nobr><input type=radio name='ver'><span>0.8.7</span></nobr> \
<nobr><input type=radio name='ver'><span>0.8.8</span></nobr> \
<nobr><input type=radio name='ver'><span>0.8.9</span></nobr> \
<nobr><input type=radio name='ver'><span>其他版本</span></nobr> \
<br/><br/>\
<span id='tankselect1'>\
<nobr><input type=radio name='class' "+z+b.c_ht+"><span>重坦</span></nobr> \
<nobr><input type=radio name='class' "+z+b.c_mt+"><span>中坦</span></nobr> \
<nobr><input type=radio name='class' "+z+b.c_lt+"><span>轻坦</span></nobr> \
<nobr><input type=radio name='class' "+z+b.c_td+"><span>坦克歼击车</span></nobr> \
<nobr><input type=radio name='class' "+z+b.c_spg+"><span>自行火炮</span></nobr> \
<nobr><input type=radio name='class' "+z+0+"><span>其他车型</span></nobr> \
<br/>\
<nobr><input type=radio name='reign' "+z+b.r_g+"><span>德系</span></nobr> \
<nobr><input type=radio name='reign' "+z+b.r_s+"><span>苏系</span></nobr> \
<nobr><input type=radio name='reign' "+z+b.r_u+"><span>美系</span></nobr> \
<nobr><input type=radio name='reign' "+z+b.r_f+"><span>法系</span></nobr> \
<nobr><input type=radio name='reign' "+z+b.r_b+"><span>英系</span></nobr> \
<nobr><input type=radio name='reign' "+z+b.r_c+"><span>中系</span></nobr> \
<nobr><input type=radio name='reign' "+z+0+"><span>其他国家</span></nobr> \
<br/>\
<nobr><input type=radio name='level' "+z+b.l_1+"><span>1~4级</span></nobr> \
<nobr><input type=radio name='level' "+z+b.l_5+"><span>5级</span></nobr> \
<nobr><input type=radio name='level' "+z+b.l_6+"><span>6级</span></nobr> \
<nobr><input type=radio name='level' "+z+b.l_7+"><span>7级</span></nobr> \
<nobr><input type=radio name='level' "+z+b.l_8+"><span>8级</span></nobr> \
<nobr><input type=radio name='level' "+z+b.l_9+"><span>9级</span></nobr> \
<nobr><input type=radio name='level' "+z+b.l_10+"><span>10级</span></nobr> \
<nobr><input type=radio name='level' "+z+0+"><span>其他级别</span></nobr> \
</span>\
<br/>\
具体车型<nobr id='tankselect2'><select><option>先选择 类型 国别 等级</option></select></nobr><nobr id='tankselect3'><input type=text  name='name'>(选择或自己填写)</nobr>\
<br/><br/>\
<nobr><input type=radio name='map'><span>卡累利阿</span></nobr> \
<nobr><input type=radio name='map'><span>马利诺夫卡</span></nobr> \
<nobr><input type=radio name='map'><span>坎帕尼亚</span></nobr> \
<nobr><input type=radio name='map'><span>锡默尔斯多夫</span></nobr> \
<nobr><input type=radio name='map'><span>普罗霍洛夫卡</span></nobr> \
<nobr><input type=radio name='map'><span>安斯克</span></nobr> \
<nobr><input type=radio name='map'><span>拉斯威利</span></nobr> \
<nobr><input type=radio name='map'><span>鲁别克</span></nobr> \
<nobr><input type=radio name='map'><span>斯大林格勒</span></nobr> \
<nobr><input type=radio name='map'><span>湖边的角逐</span></nobr> \
<nobr><input type=radio name='map'><span>穆勒万卡</span></nobr> \
<nobr><input type=radio name='map'><span>埃勒斯堡</span></nobr> \
<nobr><input type=radio name='map'><span>齐格菲防线</span></nobr> \
<nobr><input type=radio name='map'><span>科马林</span></nobr> \
<nobr><input type=radio name='map'><span>慕尼黑</span></nobr> \
<nobr><input type=radio name='map'><span>海岸争霸</span></nobr> \
<nobr><input type=radio name='map'><span>小镇争夺战</span></nobr> \
<nobr><input type=radio name='map'><span>黑暗沼泽</span></nobr> \
<nobr><input type=radio name='map'><span>韦斯特菲尔德</span></nobr> \
<nobr><input type=radio name='map'><span>荒漠小镇</span></nobr> \
<nobr><input type=radio name='map'><span>埃里哈罗夫</span></nobr> \
<nobr><input type=radio name='map'><span>阿拉曼机场</span></nobr> \
<nobr><input type=radio name='map'><span>北欧峡湾</span></nobr> \
<nobr><input type=radio name='map'><span>斯特拉特福</span></nobr> \
<nobr><input type=radio name='map'><span>蛮荒之地</span></nobr> \
<nobr><input type=radio name='map'><span>费舍尔湾</span></nobr> \
<nobr><input type=radio name='map'><span>胜利之门</span></nobr> \
<nobr><input type=radio name='map'><span>极地冰原</span></nobr> \
<nobr><input type=radio name='map'><span>雅尔塔小镇</span></nobr> \
<nobr><input type=radio name='map'><span>钢铁丛林</span></nobr> \
<nobr><input type=radio name='map'><span>里夫奥克斯</span></nobr> \
<nobr><input type=radio name='map'><span>州际公路</span></nobr> \
<nobr><input type=radio name='map'><span>寂静海岸</span></nobr> \
<nobr><input type=radio name='map'><span>香格里拉</span></nobr> \
<nobr><input type=radio name='map'><span>乌蒙雄山</span></nobr> \
<nobr><input type=radio name='map'><span>神圣之谷</span></nobr> \
<nobr><input type=radio name='map'><span>别洛戈尔斯克</span></nobr> \
<nobr><input type=radio name='map'><span>秋日苔原</span></nobr> \
<nobr><input type=radio name='map'><span>钢铁长城</span></nobr> \
<nobr><input type=radio name='map'><span>西部小镇</span></nobr> \
<nobr><input type=radio name='map'><span>其他地图</span></nobr>\
<br/><br/>\
<span class='b'>以下可选填，提供更多的特性有助于其他人找到你的录像</span><br/>\
<nobr><input type=checkbox name='medal' value='奥斯丁勋章'>奥斯丁勋章(中坦击毁高2级战车3台)</nobr><br/>\
<nobr><input type=checkbox name='medal' value='哈罗恩勋章'>哈罗恩勋章(坦歼击毁高2级战车3台)</nobr><br/>\
<nobr><input type=checkbox name='medal' value='塔西亚勋章'>塔西亚勋章(击毁5台战车并且自身HP低于20%)</nobr><br/>\
<nobr><input type=checkbox name='medal' value='临危不惧'>临危不惧勋章(1v5取胜)</nobr><br/>\
<nobr><input type=checkbox name='medal' value='拉格兰勋章'>拉格兰勋章(击毁4台占领基地的战车)</nobr><br/>\
<nobr><input type=checkbox name='medal' value='特级'>特级战斗嘉奖</nobr><br/>\
<br/>\
<nobr><input type=text  name='ex'><span>获得基础经验</span></nobr> \
</div>")

if(this.title.parentNode.nodeName=='TD')
	this.title.parentNode.appendChild(x)
else
	this.title.parentNode.insertBefore(x,this.content)
}


postfunc.additional_check = function(){
if(this.form.elements.namedItem("fid").value!=423 || this.form.elements.namedItem("tid").value!=0)return true;
var x = $('additional_check_5432654'),y = x.getElementsByTagName('nobr'),z = '',u='',v=null,w='', reignU , classU , mapU , levelU , verU , typeU

for (var i=0;i<y.length ; i++){
	v = y[i]
	if (v.firstChild.checked){
		if(v.firstChild.name=='class')
			classU=true
		else if(v.firstChild.name=='type')
			typeU=true
		else if(v.firstChild.name=='ver')
			verU=true
		else if(v.firstChild.name=='reign')
			reignU=true
		else if(v.firstChild.name=='map')
			mapU=true
		else if(v.firstChild.name=='level')
			levelU=true
		
		if(v.firstChild.name=='medal')
			u+='['+v.firstChild.value+']'	
		else if(v.firstChild.name=='type'){
			if(v.lastChild.innerHTML!='游戏录像文件')
				u+='['+v.lastChild.innerHTML+']'
			}
		else
			u+='['+v.lastChild.innerHTML+']'
		}
	else if(v.firstChild.name=='name' && v.firstChild.value)
		u+='['+v.firstChild.value+']'
	else if(v.firstChild.name=='ex' && v.firstChild.value)
		u+= v.firstChild.value+'经验'
	}

//this.title.value = this.title.value.replace(/\[.+?\]/g,'')

if(!typeU)
	return alert('你必须在录像类型里选择一个')
if(!verU)
	return alert('你必须在游戏版本里选择一个')
if(!classU)
	return alert('你必须在坦克类型里选择一个')
if(!reignU)
	return alert('你必须在坦克国别里选择一个')
if(!mapU)
	return alert('你必须在地图里选择一个')
if(!levelU)
	return alert('你必须在级别选择一个')

this.title.value=u+' '+this.title.value

return true

}

