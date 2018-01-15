var wowdb_tooltip_gen = new Object;
wowdb_tooltip_gen.img_path = 'http://cn.wowarmory.com/images/'
wowdb_tooltip_gen.initLang = function()
{
if (this.L_init)
	{
	return
	}
this.L_init = true;
this.L_ItemLevel = ' （物品等级 (%d)）';
this.L_UniqueEquip = '装备唯一';
this.L_Unique = '唯一';
this.L_Damage = '(%d)伤害';
this.L_Speed = '速度 (%d)';
this.L_DamagePerSecond = '每秒伤害(%d)';
this.L_ProjectileDamage = '提高(%d)伤害';
this.L_Armor = '(%d)点护甲';
this.L_Block = '(%d)格挡';
this.L_HolyResistance = '+(%d) 神圣抗性';
this.L_FireResistance = '+(%d) 火焰抗性';
this.L_NatureResistance = '+(%d) 自然抗性';
this.L_FrostResistance = '+(%d) 冰霜抗性';
this.L_ShadowResistance = '+(%d) 暗影抗性';
this.L_ArcaneResistance = '+(%d) 奥术抗性';
this.L_SocketMeta = '多彩插槽';
this.L_SocketRed = '红色插槽';
this.L_SocketYellow = '黄色插槽';
this.L_SocketBlue = '蓝色插槽';
this.L_Durability = '耐久度 ';
this.L_Classes2 = '职业：';
this.L_Comma = '，';
this.L_RequiresLevel = '需要等级 ';
this.L_SkillRequire = '需要';
this.L_FactionRequire = '需要在(%d)中的声望达到';
this.L_ItemCharge = '（(%d)次）';
this.L_Colon = '：';
this.L_Minutes = '分钟';
this.L_Seconds = '秒';
this.L_ItemCooldown = '(%d)冷却时间';
this.L_Set = '套装：';
this.L_ItemSetNum = '（(%d)）';
this.L_BuyPrice = '购买：';
}

wowdb_tooltip_gen.genItem = function(i)
{

	function line(txt)
	{
		return "<tr><td>"+txt+"</td></tr>";
	}
	function tpl(txt,n,n1)
	{
		txt = txt.replace('(%d)',n);
		if (n1)
		{
			txt = txt.replace('(%d1)',n1);
		}
		return txt
	}
this.initLang();

var t = "<table cellspacing='0' cellpadding='1' style='line-height:16px;width:200px'>"
if (i['item_icon'])
	{
	t += line("<img src='"+this.img_path+"icons/21x21/"+i['item_icon'].toLowerCase()+".png' alt=''/>")
	}

if (!i['quality'])
	{
		i['quality'] = 0;
	}
var item_level = '';
if (i['item_level'])
	{
		item_level = tpl(this.L_ItemLevel,i['item_level'])
	}
t += line("<span class='quality"+i['quality']+"'>"+i['name']+"</span>"+item_level)

if (i['bond_id'])
	{
		t += line(i['bond_text'])
	}

if (i['is_unique'])
	{
		if (i['item_class_id'] == 3)
		{
			t += line(this.L_UniqueEquip)
		}
		else
		{
			t += line(this.L_Unique)
		}
	}

//武器
if (i['item_class_id'] == "2")
	{
		if (!i['damage_1_type_text'])
		{
			i['damage_1_type_text'] = '';
		}
		t += line("<table width='100%' cellspacing='0' cellpadding='0'><tr><td>"+i['slot_text']+"</td><td align='right'>&nbsp; &nbsp;"+i['item_subclass_text']+"</td></tr><tr><td >"+tpl(this.L_Damage,Math.floor(i['damage_1_min'])+' - '+Math.floor(i['damage_1_max'])+' '+i['damage_1_type_text'])+"</td><td align='right'>&nbsp; &nbsp;"+tpl(this.L_Speed,i['weapon_speed'])+"</td></tr></table>")
		t += line(tpl(this.L_DamagePerSecond,i['weapon_speed']))
	}
//护甲
else if (i['item_class_id'] == "4")
	{
		t += line("<table width='100%' cellspacing='0' cellpadding='0'><tr><td>"+i['slot_text']+"</td><td align='right'>&nbsp; &nbsp;"+i['item_subclass_text']+"</td></tr></table>")
	}
//子弹
else if (i['item_class_id'] == "6")
	{
		t += line("<table width='100%' cellspacing='0' cellpadding='0'><tr><td>"+i['slot_text']+"</td><td align='right'>&nbsp; &nbsp;"+i['item_subclass_text']+"</td></tr></table>")
		t += line(tpl(this.L_ProjectileDamage,Math.floor(i['damage_1_min'])+' - '+Math.floor(i['damage_1_max'])+' '+i['damage_1_type_text']))
	}
if (i['armor'])
	{
		t += line(tpl(this.L_Armor,i['armor']))
	}
if (i['block_value'])
	{
		t += line(tpl(this.L_Block,i['block_value']))
	}
for(var j=1; j<=10; j++)
	{
		if(i['stat_'+j+'_value']) {
			t += line('+'+i['stat_'+j+'_value']+i['stat_'+j+'_text'])
		}
	}
if (i['resist_holy'])
	{
		t += line(tpl(this.L_HolyResistance,i['resist_holy']))
	}
if (i['resist_fire'])
	{
		t += line(tpl(this.L_FireResistance,i['resist_fire']))
	}
if (i['resist_nature'])
	{
		t += line(tpl(this.L_NatureResistance,i['resist_nature']))
	}
if (i['resist_frost'])
	{
		t += line(tpl(this.L_FrostResistance,i['resist_frost']))
	}
if (i['resist_shadow'])
	{
		t += line(tpl(this.L_ShadowResistance,i['resist_shadow']))
	}
if (i['resist_arcane'])
	{
		t += line(tpl(this.L_ArcaneResistance,i['resist_arcane']))
	}
for(var j=1; j<=3; j++)
	{
		switch(i['socket_'+j+'_color_id'])
		{
			case "1":	t += line("<span class='socketmeta'>"+this.L_SocketMeta+"</span>"); break;
			case "2":	t += line("<span class='socketred'>"+this.L_SocketRed+"</span>"); break;
			case "4":	t += line("<span class='socketyellow'>"+this.L_SocketYellow+"</span>"); break;
			case "8":	t += line("<span class='socketblue'>"+this.L_SocketBlue+"</span>"); break;
		}
	}
if (i['socket_bonus_text'])
	{
		t += line("<span class='socketbonus'>"+i['socket_bonus_text']+"</span>")
	}
if (i['durability'])
	{
		t += line(this.L_Durability+i['durability'])
	}
if (i['class_text_array'])
	{
		t += line(this.L_Classes2+i['class_text_array'].join(this.L_Comma))
	}
if (i['req_level'])
	{
		t += line(this.L_RequiresLevel+i['req_level'])
	}
if (i['req_skill_level'])
	{
		t += line(this.L_SkillRequire+i['req_skill_text']+i['req_skill_level'])
	}
if (i['req_rank_id'])
	{
		
	}
if (i['req_faction_level'])
	{
		t += line(tpl(this.L_FactionRequire,i['req_faction_text'])+i['req_faction_level'])
	}
var reagents_effects =''
var reagents = ''
for(var j=1; j<=5; j++)
	{
	if (i['spell_'+j+'_id'])
		{
		if (i['spell_'+j+'_trigger_text'])
			{
			var charge = ''
			var trigger = ''
			var colon = ''
			if (i['spell_'+j+'_charges'])
				{
					charge = tpl(this.L_ItemCharge,i['spell_'+j+'_charges'])
					colon = this.L_Colon
				}
			if (i['spell_'+j+'_trigger_text'])
				{
					trigger = i['spell_'+j+'_trigger_text']
					colon = this.L_Colon
				}
			t += line("<span style='color:#1eff00'>"+trigger+charge+colon+i['spell_'+j+'_text']+"</span>")
			if (i['spell_'+j+'_cooldown'] && i['spell_'+j+'_cooldown']>0 )
				{
					var spellcdtext
					if(i['spell_'+j+'_cooldown'] >= 60000)
					{
						spellcdtext = Math.ceil(i['spell_'+j+'_cooldown']/60000)+this.L_Minutes;
					}
					else
					{
						spellcdtext = Math.ceil(i['spell_'+j+'_cooldown']/1000)+this.L_Seconds;
					}
					spellcdtext += " ("+tpl(this.L_ItemCooldown,spellcdtext)+")";
					t += line("<span color='#1eff00'>"+spellcdtext+"</span>")
				}
			}
		if (i['reagents'])
			{
			if (i['reagents']['reagents'])
				{
				for (var jj=1; jj<=8; jj++)
					{
					if (i['reagents']['reagents'][jj])
						{
						reagents += i['reagents']['reagents'][jj]['name']+'×'+i['reagents']['reagents'][jj]['count']+' '
						}
					}
				}
			if (i['reagents']['effects'])
				{
				for (var jj=1; jj<=8; jj++)
					{
					if (i['reagents']['effects'][jj])
						{
						reagents_effects += '<div style="border:1px dashed #888;padding:3px">'+this.genItem(i['reagents']['effects'][jj])+'</div>'
						}
					}
				}
			}
		}
	}
if (i['description'])
	{
		t += line("<span color='#ffd100'>"+i['description']+"</span>")
	}
if (i['item_set_id'])
	{
		t += line(this.L_Set+i['item_set']['name'])
		if (i['item_set']['effects'])
		{
			for (j=1; j<=10; j++)
			{
				if (i['item_set']['effects'][j])
				{
					t += line(tpl(this.L_ItemSetNum,j)+i['item_set']['effects'][j]['text'])
				}
			}
		}
		if (i['item_set']['items_name'])
		{
			for (j=1; j<=10; j++)
			{
				if (i['item_set']['items_name'][j])
				{
					t += line(i['item_set']['items_name'][j])
				}
			}
		}
	}
if (i['buy_price'] || i['extended_cost'])
	{
		t += line(this.L_BuyPrice+this.genPrice(i['buy_price'],i['extended_cost']))
	}
if (reagents)
	{
	t += line(reagents)
	}
if (reagents_effects)
	{
	t += line(reagents_effects)
	}
t += '</table>'
return t
}

wowdb_tooltip_gen.genPrice = function(p,e)
{
var honor='';
var arena='';
var item='';
var gold='';
var silver='';
var copper='';
if (e)
	{
	if (e['honor'])
		{
		var honor = "<span class='honor' title='荣誉点数'>"+e['honor']+"</span>"
		}
	if (e['arena'])
		{
		arena = "<span class='arena' title='竞技场点数'>"+e['arena']+"</span>"
		}
	for (var j=1;j<=5;j++)
		{
		if (e['item_'+j+'_count'])
			{
			item += "<span class='"+e['item_'+j]['item_icon']+"_s' title='"+e['item_'+j]['name']+"'>"+e['item_'+j+'_count']+"</span>"
			}
		}
	}
if (p)
	{
	gold = Math.floor(p/10000)
	if (!gold) {gold = ''} else {gold = "<span class='gold'>"+gold+"</span>"}
	silver = Math.floor((p-gold*10000)/100)
	if (!silver) {silver = ''} else {silver = "<span class='silver'>"+silver+"</span>"}
	copper = p-gold*10000-silver*100
	if (!copper) {copper = ''} else {copper = "<span class='copper'>"+copper+"</span>"}
	}
return honor+arena+item+gold+silver+copper
}