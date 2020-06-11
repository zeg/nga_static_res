"use strict";

var LoRDeck = {};
LoRDeck.__IMG_BASE = '';
LoRDeck.cardInfoLite = {
	"01DE001": [4, "先锋旗手", 1],
	"01DE002": [8, "蒂亚娜", 1],
	"01DE003": [4, "劳伦特持刃者", 1],
	"01DE004": [4, "银翼先锋", 1],
	"01DE006": [3, "先锋士官", 1],
	"01DE007": [8, "审判", 2],
	"01DE009": [2, "闪钢防卫者", 1],
	"01DE010": [5, "敏翼枪兵", 1],
	"01DE011": [3, "劳伦特门徒", 1],
	"01DE012": [5, "盖伦", 0],
	"01DE013": [1, "锁子甲", 2],
	"01DE014": [8, "增援", 2],
	"01DE015": [5, "光辉守卫", 1],
	"01DE017": [3, "一夫当关", 2],
	"01DE018": [1, "光辉打击", 2],
	"01DE019": [3, "动员", 2],
	"01DE020": [2, "先锋卫士", 1],
	"01DE021": [3, "冷酷追击", 2],
	"01DE022": [2, "卢锡安", 0],
	"01DE023": [3, "驱法检察官", 1],
	"01DE024": [1, "驱法保管者", 1],
	"01DE025": [5, "拘留", 2],
	"01DE026": [2, "单打独斗", 2],
	"01DE027": [3, "持剑预备", 2],
	"01DE028": [5, "先锋骑兵", 1],
	"01DE029": [1, "舰羽追踪者", 1],
	"01DE030": [4, "银翼翔兵", 1],
	"01DE031": [3, "黎明祷士", 1],
	"01DE032": [3, "曲光屏障", 2],
	"01DE033": [6, "缅怀", 2],
	"01DE034": [2, "战地铁匠", 1],
	"01DE035": [6, "为了德玛西亚", 2],
	"01DE036": [4, "先锋侍从", 1],
	"01DE037": [4, "劳伦特心眼刀", 2],
	"01DE038": [3, "光明哨兵赛娜", 1],
	"01DE039": [1, "云丛的希思莉亚", 1],
	"01DE040": [2, "驱法驯服者", 1],
	"01DE041": [6, "并肩而战", 2],
	"01DE042": [6, "拉克丝", 0],
	"01DE043": [2, "战地厨师", 1],
	"01DE044": [6, "勇气倍增", 2],
	"01DE045": [3, "菲奥娜", 0],
	"01DE046": [2, "先锋哨卫", 1],
	"01DE047": [3, "薪尽火传", 2],
	"01DE048": [4, "驱法煽动者", 1],
	"01DE049": [1, "勇敢的魄罗", 1],
	"01DE050": [2, "净化", 2],
	"01DE051": [6, "骁勇战士希思莉亚", 1],
	"01DE052": [9, "闪钢兵阵", 1],
	"01DE053": [4, "劳伦特爵士", 1],
	"01DE054": [3, "先锋救赎使", 1],
	"01DE055": [3, "劳伦特决斗家", 1],
	"01DE056": [4, "先锋首刃", 1],
	"01FR001": [3, "闪冻", 2],
	"01FR003": [2, "阿瓦罗萨哨兵", 1],
	"01FR004": [1, "钢铁合剂", 2],
	"01FR005": [8, "战斗狂怒", 2],
	"01FR006": [5, "寒冰血脉的传承", 2],
	"01FR007": [4, "贫嘴布耶尔森", 1],
	"01FR008": [1, "孤独魄罗", 1],
	"01FR009": [3, "布隆", 0],
	"01FR010": [4, "血盟之誓", 2],
	"01FR011": [2, "冰谷弓箭手", 1],
	"01FR012": [5, "万世催化石", 2],
	"01FR013": [6, "疤痕之母弗莱娜", 1],
	"01FR014": [1, "雪人幼崽", 1],
	"01FR016": [3, "魄罗点心", 2],
	"01FR017": [5, "厄努克群", 1],
	"01FR018": [3, "霜牙巨狼", 1],
	"01FR019": [7, "寒冬之息", 2],
	"01FR020": [4, "雪崩", 2],
	"01FR021": [5, "无族者塔卡兹", 1],
	"01FR022": [1, "预示之鹰", 1],
	"01FR023": [12, "战母的召唤", 2],
	"01FR024": [7, "艾尼维亚", 0],
	"01FR025": [4, "魄罗牧者", 1],
	"01FR026": [6, "野爪头目", 1],
	"01FR027": [4, "蛮牛厄努克", 1],
	"01FR029": [2, "敦请救兵", 2],
	"01FR030": [1, "钢铁脆化", 2],
	"01FR031": [7, "远古雪人", 1],
	"01FR032": [2, "星光预言家", 1],
	"01FR033": [3, "秘言之石", 1],
	"01FR034": [6, "亘古邪兽", 1],
	"01FR035": [1, "无疤游荡者", 1],
	"01FR036": [3, "阿瓦罗萨神射手", 1],
	"01FR037": [4, "阿瓦罗萨游骑", 1],
	"01FR038": [4, "艾希", 0],
	"01FR039": [8, "泰达米尔", 0],
	"01FR040": [5, "霜牙萨满", 1],
	"01FR041": [5, "阿瓦罗萨炉卫", 1],
	"01FR042": [6, "刺骨寒风", 2],
	"01FR043": [6, "魄罗群之主", 1],
	"01FR045": [3, "疤痕领主斯特芬", 1],
	"01FR046": [3, "振作起来", 2],
	"01FR047": [2, "兽性秘术师", 1],
	"01FR048": [3, "阿瓦罗萨陷阱捕手", 1],
	"01FR049": [2, "潜行之狼", 1],
	"01FR050": [3, "和蔼的旅店老板", 1],
	"01FR051": [3, "天方夜谭", 2],
	"01FR052": [10, "哀难行兽", 1],
	"01FR053": [3, "魁梧魄罗", 1],
	"01FR054": [5, "疤痕之仆魔刃", 1],
	"01FR055": [2, "碎裂", 2],
	"01FR056": [7, "寒冰雪人", 1],
	"01FR057": [7, "族群意识", 2],
	"01IO001": [7, "万象更新术", 2],
	"01IO002": [4, "艾欧尼亚的意志", 2],
	"01IO003": [3, "瞬狱影杀阵", 2],
	"01IO004": [1, "生命药水", 2],
	"01IO005": [1, "灵动魄罗", 1],
	"01IO006": [2, "绿林二人组", 1],
	"01IO007": [8, "影刃之仁", 1],
	"01IO008": [2, "仙灵剑舞者", 1],
	"01IO009": [3, "劫", 0],
	"01IO010": [6, "慈悲度魂落", 2],
	"01IO011": [1, "召回", 2],
	"01IO012": [3, "忍法", 2],
	"01IO013": [1, "影魔", 1],
	"01IO014": [3, "绿林长老", 1],
	"01IO015": [4, "亚索", 0],
	"01IO016": [6, "和风守护圣者", 1],
	"01IO017": [1, "纳沃利刃探", 1],
	"01IO018": [1, "冲击", 2],
	"01IO019": [1, "绿林看管员", 1],
	"01IO020": [2, "面具守侍", 1],
	"01IO021": [7, "风行幼崽", 1],
	"01IO022": [1, "幽灵疾步", 2],
	"01IO023": [5, "镶石防卫者", 1],
	"01IO024": [6, "朝生暮逝", 2],
	"01IO026": [1, "励志的老师", 1],
	"01IO027": [2, "谧影先知", 1],
	"01IO028": [3, "鳞甲噬怪", 1],
	"01IO029": [2, "耕耘", 2],
	"01IO030": [7, "苍穹飞龙", 1],
	"01IO031": [6, "吞云者", 1],
	"01IO032": [4, "慎", 0],
	"01IO033": [9, "迅足米纳", 1],
	"01IO036": [2, "绿林哨卫", 1],
	"01IO037": [4, "灵魂庇护", 2],
	"01IO038": [3, "孤独僧侣", 1],
	"01IO039": [3, "移形换影", 2],
	"01IO040": [4, "均衡生命刃", 1],
	"01IO041": [5, "卡尔玛", 0],
	"01IO042": [1, "练功的学徒", 1],
	"01IO043": [3, "牧河人", 1],
	"01IO044": [2, "纳沃利密谋者", 1],
	"01IO045": [2, "春之使", 1],
	"01IO046": [3, "斩钢闪", 2],
	"01IO047": [6, "影火", 2],
	"01IO048": [5, "玉萨里", 1],
	"01IO049": [4, "拒绝", 2],
	"01IO050": [4, "均衡寻道者", 1],
	"01IO052": [2, "纳沃利路霸", 1],
	"01IO053": [3, "翡翠觉醒者", 1],
	"01IO054": [2, "世纪之眼", 2],
	"01IO055": [2, "气之守卫", 2],
	"01IO056": [7, "追风者永恩", 1],
	"01IO057": [3, "暗影潜伏者", 1],
	"01NX002": [5, "大杀四方", 2],
	"01NX003": [3, "竞技场管理", 1],
	"01NX004": [3, "无情打击", 2],
	"01NX005": [2, "猩红贵族", 1],
	"01NX006": [5, "弗拉基米尔", 0],
	"01NX007": [2, "竞技场播报员", 1],
	"01NX008": [4, "龙蜥骑手", 1],
	"01NX009": [4, "竞技场明星", 1],
	"01NX010": [5, "军团将军", 1],
	"01NX011": [3, "冷血追命", 2],
	"01NX012": [1, "军团后卫", 1],
	"01NX013": [5, "一锤定音", 2],
	"01NX014": [4, "利刃释瑞轧", 1],
	"01NX015": [1, "宝贝宠物", 1],
	"01NX016": [2, "崔法利拥戴者", 1],
	"01NX017": [2, "军团鼓手", 1],
	"01NX019": [3, "力量", 2],
	"01NX020": [3, "德莱文", 0],
	"01NX021": [3, "军团乱兵", 1],
	"01NX022": [3, "诺克萨斯断头台", 2],
	"01NX023": [5, "群蛛之主", 1],
	"01NX024": [5, "巨腕加藤", 1],
	"01NX025": [2, "兄弟情义", 2],
	"01NX026": [3, "崔法利莽汉", 1],
	"01NX027": [1, "愤怒合剂", 2],
	"01NX029": [4, "军团老兵", 1],
	"01NX030": [2, "猩红学徒", 1],
	"01NX031": [2, "崔法利荣耀追寻者", 1],
	"01NX032": [4, "猩红觉醒者", 1],
	"01NX033": [4, "崔法利顾问", 1],
	"01NX034": [1, "黏人魄罗", 1],
	"01NX035": [1, "德莱文头号粉丝", 1],
	"01NX036": [6, "牛头人清算者", 1],
	"01NX037": [2, "军团掷弹兵", 1],
	"01NX038": [6, "德莱厄斯", 0],
	"01NX039": [3, "远见", 2],
	"01NX040": [1, "军团破坏者", 1],
	"01NX041": [5, "崔法利摧盾者", 1],
	"01NX042": [3, "卡特琳娜", 0],
	"01NX043": [1, "刀锋利刃", 2],
	"01NX044": [6, "攻城锤", 1],
	"01NX045": [7, "野蛮清算人", 1],
	"01NX046": [3, "蛛怪哨兵", 1],
	"01NX047": [2, "鲜血转换", 2],
	"01NX048": [3, "猩红馆长", 1],
	"01NX049": [1, "诡计", 2],
	"01NX050": [2, "死亡莲华", 2],
	"01NX051": [8, "法荣队长", 1],
	"01NX052": [2, "以眼还眼", 2],
	"01NX053": [6, "清算", 2],
	"01NX054": [5, "骇人咆哮", 2],
	"01NX055": [2, "居家蜘蛛", 1],
	"01NX056": [5, "瞬步", 2],
	"01PZ001": [1, "乱翻", 2],
	"01PZ002": [4, "小巷馆主", 1],
	"01PZ003": [3, "组装机器人", 1],
	"01PZ004": [7, "精准弹幕", 2],
	"01PZ005": [6, "海克斯科技转化机", 2],
	"01PZ006": [10, "广场守卫", 1],
	"01PZ007": [3, "电动彩车", 1],
	"01PZ008": [1, "提莫", 0],
	"01PZ009": [3, "业余航空家", 1],
	"01PZ010": [1, "蘑菇云", 2],
	"01PZ012": [2, "嚼火者手雷", 1],
	"01PZ013": [6, "改造实验师", 1],
	"01PZ014": [6, "未授权的发明", 2],
	"01PZ016": [3, "灵光一闪", 2],
	"01PZ017": [3, "旧桶售货员", 1],
	"01PZ018": [2, "学院天才", 1],
	"01PZ019": [2, "勤奋的学徒", 1],
	"01PZ020": [1, "大胆魄罗", 1],
	"01PZ021": [5, "米登斯托克喽啰", 1],
	"01PZ023": [4, "冯", 1],
	"01PZ024": [5, "不稳定伏特师", 1],
	"01PZ025": [3, "毒泡芙菇小贩", 1],
	"01PZ026": [2, "地沟区地图", 2],
	"01PZ027": [0, "能量守恒射线", 2],
	"01PZ028": [1, "应急装置", 2],
	"01PZ029": [4, "杰出捐助者", 1],
	"01PZ030": [4, "可疑人物", 1],
	"01PZ031": [4, "斯塔缇克电击", 2],
	"01PZ033": [5, "追求完喵", 2],
	"01PZ034": [4, "地沟区拾荒者", 1],
	"01PZ035": [8, "贾尔", 1],
	"01PZ036": [3, "伊泽瑞尔", 0],
	"01PZ038": [2, "地沟区疏浚机", 1],
	"01PZ039": [3, "开始狂欢", 2],
	"01PZ040": [4, "金克丝", 0],
	"01PZ042": [2, "勇敢的水手", 1],
	"01PZ043": [2, "炼金顽童", 1],
	"01PZ044": [5, "炼金速弹吉他手", 1],
	"01PZ045": [1, "祖安顽童", 1],
	"01PZ046": [1, "赝品", 2],
	"01PZ047": [0, "腐蚀桶", 1],
	"01PZ048": [9, "卡银娜", 1],
	"01PZ049": [8, "进化日", 2],
	"01PZ050": [3, "咒能高涨", 2],
	"01PZ051": [5, "欢乐匠", 1],
	"01PZ052": [2, "秘术射击", 2],
	"01PZ053": [2, "一团汪噗", 1],
	"01PZ054": [2, "爆破小队菜鸟", 1],
	"01PZ055": [1, "聪慧学者", 1],
	"01PZ056": [5, "黑默丁格", 0],
	"01PZ057": [2, "废料装配", 2],
	"01PZ058": [4, "呆傻汪噗", 1],
	"01PZ059": [3, "黄金榨机", 1],
	"01SI001": [7, "复仇", 2],
	"01SI003": [10, "蚀魂夜", 2],
	"01SI004": [3, "黑水之祸", 1],
	"01SI005": [10, "迅捷蟹精", 1],
	"01SI006": [5, "控驭", 2],
	"01SI007": [2, "灵异圣物", 2],
	"01SI009": [2, "躁动群灵", 1],
	"01SI010": [2, "暗影冲击", 2],
	"01SI011": [0, "饥肠屠户", 1],
	"01SI012": [1, "无知岛民", 1],
	"01SI014": [2, "迷雾幽魂", 1],
	"01SI015": [9, "破败之咒", 2],
	"01SI016": [4, "唤魂者", 1],
	"01SI018": [3, "悲伤书吏", 1],
	"01SI019": [4, "幽冥监牢", 2],
	"01SI020": [7, "传薪者", 1],
	"01SI021": [2, "鲨鱼战车", 1],
	"01SI022": [1, "群岛印记", 2],
	"01SI023": [2, "牧魂者", 1],
	"01SI025": [6, "暴行", 2],
	"01SI026": [1, "典狱长的猎物", 1],
	"01SI027": [3, "新鲜祭品", 2],
	"01SI028": [3, "灵魂分裂", 2],
	"01SI029": [5, "凋零哀嚎", 2],
	"01SI030": [3, "卡莉丝塔", 0],
	"01SI031": [3, "钢铁先驱", 1],
	"01SI032": [4, "破败记录者", 1],
	"01SI033": [9, "雷卓斯指挥官", 1],
	"01SI034": [3, "黑暗之矛", 2],
	"01SI035": [8, "分割者拉萨", 1],
	"01SI036": [1, "虫匍临身", 2],
	"01SI037": [1, "坏坏魄罗", 1],
	"01SI038": [3, "魅影调皮鬼", 1],
	"01SI039": [2, "恐怖蛛魔", 1],
	"01SI040": [2, "极恶盛宴", 2],
	"01SI041": [3, "不朽不灭", 1],
	"01SI042": [6, "赫卡里姆", 0],
	"01SI043": [1, "倒霉贵族", 1],
	"01SI044": [8, "幽灵主母", 1],
	"01SI045": [1, "灵魂汲取", 2],
	"01SI046": [3, "迷雾之召", 2],
	"01SI047": [0, "回忆凋零", 2],
	"01SI048": [2, "受诅守侍", 1],
	"01SI049": [2, "彼岸一瞥", 2],
	"01SI050": [5, "蛛巢觉醒", 2],
	"01SI051": [5, "饱受折磨的逸才", 1],
	"01SI052": [5, "锤石", 0],
	"01SI053": [2, "伊莉丝", 0],
	"01SI054": [5, "不灭之握", 2],
	"01SI055": [6, "噬魂者", 1],
	"01SI056": [3, "狂暴爬蛛", 1],
	"01SI057": [4, "远古鳄怪", 1],
	"01SI058": [5, "集魂者", 1],
	"02BW001": [1, "警告过你", 2],
	"02BW002": [9, "震惧号", 1],
	"02BW003": [6, "绑架", 2],
	"02BW004": [2, "震惧号水手", 1],
	"02BW005": [2, "受雇枪手", 1],
	"02BW006": [4, "神秘法师", 1],
	"02BW007": [4, "傲慢赌徒", 1],
	"02BW008": [3, "舰船中士", 1],
	"02BW009": [1, "台球行家", 1],
	"02BW010": [1, "魄罗劫匪", 1],
	"02BW011": [4, "约德尔骗徒", 1],
	"02BW012": [2, "再加火药", 2],
	"02BW013": [1, "潜行割喉客", 1],
	"02BW014": [2, "珊瑚精灵", 1],
	"02BW015": [7, "塞壬号", 1],
	"02BW016": [3, "老虎机器人", 1],
	"02BW017": [6, "柑橘快递员", 1],
	"02BW018": [1, "枪火谈判", 2],
	"02BW019": [3, "气泡熊", 1],
	"02BW020": [0, "警告射击", 2],
	"02BW021": [5, "锐鳞猎人", 1],
	"02BW022": [3, "厄运小姐", 0],
	"02BW023": [3, "深渊诱惑", 2],
	"02BW024": [3, "双重麻烦", 2],
	"02BW025": [4, "巨鲨强袭", 2],
	"02BW026": [4, "崔斯特", 0],
	"02BW027": [5, "狩猎舰队", 1],
	"02BW028": [8, "激流雷克斯", 1],
	"02BW029": [4, "打捞", 2],
	"02BW030": [7, "囤船海蛇", 1],
	"02BW031": [6, "一箭双雕", 2],
	"02BW032": [5, "普朗克", 0],
	"02BW033": [2, "黑市商人", 1],
	"02BW034": [3, "猴像", 1],
	"02BW035": [6, "拉瑞特", 1],
	"02BW036": [3, "黄金独角鲸", 1],
	"02BW037": [5, "深渊之眼", 1],
	"02BW038": [4, "闪喷迅鳍", 1],
	"02BW039": [3, "琢珥鱼猎人", 1],
	"02BW040": [1, "贝壳炮手", 1],
	"02BW041": [4, "海底巨兽", 1],
	"02BW042": [8, "心灵融合", 2],
	"02BW043": [3, "选牌", 2],
	"02BW044": [1, "投弃", 2],
	"02BW045": [2, "枪林弹雨", 2],
	"02BW046": [1, "菲兹", 0],
	"02BW047": [1, "残渣疏浚工", 1],
	"02BW048": [1, "越狱", 2],
	"02BW049": [2, "盗窃赃物", 2],
	"02BW050": [7, "妙手独奏家", 1],
	"02BW051": [4, "古灵精怪", 2],
	"02BW053": [7, "诺提勒斯", 0],
	"02BW054": [4, "暗流涌动", 2],
	"02BW055": [3, "铁钩帮工头", 1],
	"02BW056": [6, "深渊吞噬兽", 1],
	"02BW057": [5, "矫捷踏浪者", 1],
	"02BW058": [1, "铁钩帮屠夫", 1],
	"02BW059": [7, "废铁射击", 2],
	"02BW060": [1, "神射海盗", 1],
	"02BW061": [3, "袋中王牌", 2],
	"02BW062": [4, "岛屿领航员", 1],
	"02BW063": [3, "变戏法", 2],
	"02DE001": [5, "协力打击", 2],
	"02DE002": [2, "炫目攻势", 2],
	"02DE003": [3, "忠实獾熊", 1],
	"02DE004": [3, "绿齿峰守卫", 1],
	"02DE005": [8, "刚毅精魄", 2],
	"02DE006": [5, "奎因", 0],
	"02DE007": [1, "护林人的决心", 2],
	"02DE008": [5, "巨角伙伴", 1],
	"02DE009": [4, "苍鬓护林人", 1],
	"02DE010": [6, "吉纳维芙", 1],
	"02FR001": [3, "烬火女郎", 1],
	"02FR002": [6, "瑟庄妮", 0],
	"02FR003": [7, "魄罗极光", 2],
	"02FR004": [2, "陷入寒境", 2],
	"02FR005": [5, "熊人灵魂行者", 1],
	"02FR006": [2, "无情劫掠者", 1],
	"02FR007": [4, "北地之怒", 2],
	"02FR008": [8, "角牙劫掠者", 1],
	"02FR009": [4, "狼骑兵", 1],
	"02FR010": [2, "共享的战利品", 2],
	"02IO001": [2, "神龙之爪", 1],
	"02IO002": [3, "神龙之鳞", 1],
	"02IO003": [2, "神龙之眼", 1],
	"02IO004": [6, "神龙之角", 1],
	"02IO005": [4, "震荡神掌", 2],
	"02IO006": [6, "李青", 0],
	"02IO007": [7, "猛龙摆尾", 2],
	"02IO008": [2, "天音波", 2],
	"02IO009": [4, "禅修冥想", 2],
	"02IO010": [2, "回身", 2],
	"02NX001": [8, "利维坦号", 1],
	"02NX002": [6, "烁角奥洛", 1],
	"02NX003": [3, "诺克萨斯狂热", 2],
	"02NX004": [2, "帝国爆破手", 1],
	"02NX005": [3, "钢铁弩炮", 1],
	"02NX006": [4, "破城投石机", 1],
	"02NX007": [5, "斯维因", 0],
	"02NX008": [3, "解脱之触", 2],
	"02NX009": [1, "狂食鸦群", 2],
	"02NX010": [6, "披甲象骑兵", 1],
	"02PZ001": [5, "载猫潜水器", 1],
	"02PZ002": [6, "首席机械师泽维", 1],
	"02PZ003": [4, "整装待发", 2],
	"02PZ004": [3, "强能冲拳", 2],
	"02PZ005": [3, "巡逻警员", 1],
	"02PZ006": [4, "抓到你了", 2],
	"02PZ007": [4, "洞悉警探", 1],
	"02PZ008": [5, "蔚", 0],
	"02PZ009": [2, "证据线索", 2],
	"02PZ010": [2, "资深警探", 1],
	"02SI001": [5, "沼地集魂者", 1],
	"02SI002": [7, "蔓生食人藤", 1],
	"02SI003": [8, "潮中骇兽", 1],
	"02SI004": [3, "枯林看护", 1],
	"02SI005": [3, "吸元秘术", 2],
	"02SI006": [1, "树皮吼怪", 1],
	"02SI007": [2, "荆棘蟾蜍", 1],
	"02SI008": [4, "茂凯", 0],
	"02SI009": [1, "树苗投掷", 2],
	"02SI010": [3, "亡绽漫游灵", 1]
};
LoRDeck.factionColor = {
	'DE': { 'color': '#bfb083', 'NGAColor': 'burlywood' },
	'FR': { 'color': '#5ab8da', 'NGAColor': 'skyblue' },
	'IO': { 'color': '#cf829b', 'NGAColor': 'crimson' },
	'NX': { 'color': '#a0524f', 'NGAColor': 'firebrick' },
	'PZ': { 'color': '#e29f76', 'NGAColor': 'sandybrown' },
	'SI': { 'color': '#3b7d6f', 'NGAColor': 'teal' },
	'BW': { 'color': '#b4563a', 'NGAColor': 'chocolate' }
};
LoRDeck.types = ['champion', 'follower', 'spell'];
LoRDeck.MAX_KNOWN_VERSION = 2;
LoRDeck.factions = ['DE', 'FR', 'IO', 'NX', 'PZ', 'SI', 'BW'];
LoRDeck.base32Digits = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "2", "3", "4", "5", "6", "7"];
LoRDeck.base32Mask = 31;
LoRDeck.base32Shift = 5;
LoRDeck.base32Separator = '-';
LoRDeck.base32CharMap = { "2": 26, "3": 27, "4": 28, "5": 29, "6": 30, "7": 31, "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6, "H": 7, "I": 8, "J": 9, "K": 10, "L": 11, "M": 12, "N": 13, "O": 14, "P": 15, "Q": 16, "R": 17, "S": 18, "T": 19, "U": 20, "V": 21, "W": 22, "X": 23, "Y": 24, "Z": 25 };

LoRDeck.varIntAllButMSB = 0x7f;
LoRDeck.varIntJustMSB = 0x80;
LoRDeck.DeckEncoder = '';
LoRDeck.factionIDToCode = function (id) {
	if (!this.factions[id]) throw new TypeError('Invalid faction code!');
	return this.factions[id];
};

LoRDeck.pop = function (bytes) {
	var result = 0;
	var currentShift = 0;
	var bytesPopped = 0;
	for (var i = 0; i < bytes.length; i++) {
		bytesPopped++;
		var current = bytes[i] & this.varIntAllButMSB;
		result |= current << currentShift;

		if ((bytes[i] & this.varIntJustMSB) !== this.varIntJustMSB) {
			bytes.splice(0, bytesPopped);
			return result;
		}
		currentShift += 7;
	}
	throw new TypeError('Byte array did not contain valid varints.');
};

LoRDeck.get = function (value) {
	var buff = new Array(10);
	buff.fill(0);

	var currentIndex = 0;
	if (value === 0) return [0];

	while (value !== 0) {
		var byteVal = value & this.varIntAllButMSB;
		value >>>= 7;

		if (value !== 0) byteVal |= this.varIntJustMSB;
		buff[currentIndex++] = byteVal;
	}

	return buff.slice(0, currentIndex);
};

LoRDeck.makeNumStr = function (num, length) {
	switch (length) {
		case 2:
			if (num < 10) num = '0' + num.toString();else num = num.toString();
			break;
		case 3:
			if (num < 10) num = '00' + num.toString();else if (num < 100) num = '0' + num.toString();else num = num.toString();
			break;
		default:
	}
	return num;
};

LoRDeck.encode = function () {
	var deckCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	deckCode = deckCode.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '').replace(this.base32Separator, '').replace(/[=]*$/, '').toUpperCase();
	if (deckCode.length === 0) return [0];
	var encodedLength = deckCode.length;
	var outLength = Math.floor(encodedLength * this.base32Shift / 8);
	var bytes = new Array(outLength);
	var buffer = 0;
	var next = 0;
	var bitsLeft = 0;
	var codes = deckCode.split('');
	for (var i = 0; i < codes.length; i++) {
		if (typeof this.base32CharMap[codes[i]] === 'undefined') {
			throw new TypeError('Illegal character: ' + codes[i]);
		}

		buffer <<= this.base32Shift;
		buffer |= this.base32CharMap[codes[i]] & this.base32Mask;
		bitsLeft += this.base32Shift;
		if (bitsLeft >= 8) {
			bytes[next++] = buffer >> bitsLeft - 8 & 0xff;
			bitsLeft -= 8;
		}
	}

	var result = [];
	var firstByte = bytes.shift();
	var version = firstByte & 0xf;

	if (version > this.MAX_KNOWN_VERSION) {
		throw new TypeError('The provided code requires a higher version of this library; please update.');
	}

	for (var _i = 3; _i > 0; _i--) {
		var numGroupOfs = this.pop(bytes);

		for (var j = 0; j < numGroupOfs; j++) {
			var numOfsInThisGroup = this.pop(bytes);
			var set = this.pop(bytes);
			var faction = this.pop(bytes);

			for (var k = 0; k < numOfsInThisGroup; k++) {
				var card = this.pop(bytes);

				var setString = this.makeNumStr(set, 2);
				var factionString = this.factionIDToCode(faction);
				var cardString = this.makeNumStr(card, 3);
				var cardID = setString + factionString + cardString;

				result.push({ card: cardID, count: _i, faction: factionString, cost: this.cardInfoLite[cardID][0] });
			}
		}
	}

	while (bytes.length > 0) {
		var fourPlusCount = this.pop(bytes);
		var fourPlusSet = this.pop(bytes);

		var fourPlusFaction = this.pop(bytes);
		var fourPlusNumber = this.pop(bytes);

		var fourPlusSetString = this.makeNumStr(fourPlusSet, 2);
		var fourPlusFactionString = this.factionIDToCode(fourPlusFaction);
		var fourPlusNumberString = this.makeNumStr(fourPlusNumber, 3);
		var fourPlusCardID = fourPlusSetString + fourPlusFactionString + fourPlusNumberString;

		result.push({ card: fourPlusCardID, count: fourPlusCount, faction: fourPlusFactionString, cost: this.cardInfoLite[fourPlusCardID][0] });
	}

	result.sort(function (a, b) {
		return a.cost - b.cost;
	});

	var returnObj = { 0: [], 1: [], 2: [] };
	for (var _i2 = 0; _i2 < result.length; _i2++) {
		returnObj[this.cardInfoLite[result[_i2].card][2]].push("<span class=\"cost\"><span class=\"icon\">&nbsp;</span>" + result[_i2].cost + "</span>" + ("<span class=\"img\" style='background:url(" + __IMG_BASE + '/proxy/cache_attach/lordeck/'+result[_i2].card + ".png) 50% 50%/cover'>&emsp;&emsp;&emsp;&emsp;&emsp;</span>") + ("<span class=\"lordeck" + result[_i2].faction + "\"><span class=\"silver b\">[</span><a class=\"b\" href=\"javascript:void(0)\">" + this.cardInfoLite[result[_i2].card][1] + "</a><span class=\"silver b\">]</span></span>") + ("<span class='count'>" + result[_i2].count + "</span>"));
	}
	// this.types.forEach((name,typeID)=>{
	//     returnObj[typeID] = returnObj[typeID].map((html,index)=>{
	//         return `<div class="lordeckcard bg${(typeID+index)%2}">${html}</div>`
	//     })
	// })
	var newObj = {};
	for (var _i3 = 0; _i3 < this.types.length; _i3++) {
		newObj[_i3] = [];
		for (var _j = 0; _j < returnObj[_i3].length; _j++) {
			newObj[_i3][_j] = "<div class=\"lordeckcard bg" + (_i3 + _j) % 2 + "\">" + returnObj[_i3][_j] + "</div>";
		}
	}
	returnObj = newObj;
	return "<div class=\"lordeck\"><table><tbody><tr>" + ("<td class=\"np\">" + returnObj[0].join('') + "</td>") + ("<td class=\"np\">" + returnObj[1].join('') + "</td>") + ("<td class=\"np\">" + returnObj[2].join('') + "</td>") + "</tr></tbody></table></div>";
};

LoRDeck.init=function(){
	this.__IMG_BASE = __IMG_BASE
	__NUKE.addCss(".lordeck .lordeckcard {padding:0.3em} \n .lordeck td {vertical-align:top;white-space:nowrap} \n .lordeck .cost .icon {background: url("+__IMG_STYLE+"/costdot.png) no-repeat 50% 50%;padding:0 0.5em;color:#fff;} \n .lordeck .cost, .lordeck .count {font-family:'arial black';color:silver} \n .lordeck .img {opacity:0.80;border:1px solid #000} \n .lordeck .lordeckDE a {color:#bfb083} \n .lordeck .lordeckFR a {color:#5ab8da} \n .lordeck .lordeckIO a {color:#cf829b} \n .lordeck .lordeckNX a {color:#a0524f} \n .lordeck .lordeckPZ a {color:#e29f76} \n .lordeck .lordeckSI a {color:#3b7d6f} \n .lordeck .lordeckBW a {color:#b4563a} \n .lordeck .q2 a {color:seagreen} \n .lordeck .q3 a {color:royalblue} \n .lordeck .q4 a {color:purple} \n .lordeck .q5 a {color:sienna} \n .lordeck td table {width:100%} \n .lordeck .bar {font-family:'arial black';color:silver;width:4em;vertical-align:bottom;text-align:center} \n .lordeck .bar div {background:#444;margin:auto} \n .lordeck .link {font-size:1.5em;text-align:right} \n	.lordeck .np {padding:0} \n .c2 .lordeck .bg0 {background:"+__COLOR.bg1+"} \n .c2 .lordeck .bg1,.c1 .lordeck .bg1 {background:"+__COLOR.bg3+"} \n .c1 .lordeck .bg0 {background:"+__COLOR.bg4+"}")
}//


//# sourceMappingURL=card.js.map