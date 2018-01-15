if(!window.postfunc)window.postfunc={}

postfunc.prePostHint = function(){
if((this.form.elements.namedItem("fid").value!=401 && this.form.elements.namedItem("fid").value!=404) || this.form.elements.namedItem("tid").value!=0)return true;
if(this.form.elements.namedItem("fid").value==401)
	var x=_$("<div id='additional_check_120604' class=gray style='line-height:22px'>\
<span class='b'>以下必选</span><br/>\
<span class='red'><nobr><input type=radio name='reign'><span>亚服求购</span></nobr> \
<nobr><input type=radio name='reign'><span>亚服出售</span></nobr> \
<nobr><input type=radio name='reign'><span>美服求购</span></nobr> \
<nobr><input type=radio name='reign'><span>美服出售</span></nobr> \
<nobr><input type=radio name='reign'><span>欧服求购</span></nobr> \
<nobr><input type=radio name='reign'><span>欧服出售</span></nobr></span> \
 &nbsp; BattleTag 或其他联系方式:<nobr><input name='battletag'></nobr></span> \
<br/>\
<span class='b'>以下可选填，提供更多的特性有助于其他人找到你的信息</span>\
<br/>\
<nobr><input type=checkbox name='class'><span>野蛮人</span></nobr> \
<nobr><input type=checkbox name='class'><span>猎魔人</span></nobr> \
<nobr><input type=checkbox name='class'><span>武僧</span></nobr> \
<nobr><input type=checkbox name='class'><span>巫医</span></nobr> \
<nobr><input type=checkbox name='class'><span>法师</span></nobr> <span class=silver>(适用职业)</span>\
<br/>\
<span class='b'>以下必选一个</span>\
<br/>\
<nobr><input type=radio name='type'><span>传奇/套装</span></nobr> \
<nobr><input type=radio name='type'><span>图纸</span></nobr> \
<nobr><input type=radio name='type' class='gold'><span>金币</span></nobr> \
<br/>\
<nobr><input type=radio name='slot' class='weapon'><span>双手</span></nobr> \
<nobr><input type=radio name='slot' class='weapon'><span>单手</span></nobr> \
<nobr><input type=radio name='slot'><span>副手</span></nobr> \
<nobr><input type=radio name='slot'><span>盾</span></nobr> \
 &nbsp; \
<nobr><input type=radio name='slot'><span>头盔</span></nobr> \
<nobr><input type=radio name='slot'><span>护肩</span></nobr> \
<nobr><input type=radio name='slot'><span>胸甲</span></nobr> \
<nobr><input type=radio name='slot'><span>腰带</span></nobr> \
<nobr><input type=radio name='slot'><span>护腿</span></nobr> \
<nobr><input type=radio name='slot'><span>靴子</span></nobr> \
<nobr><input type=radio name='slot'><span>护腕</span></nobr> \
<nobr><input type=radio name='slot'><span>手套</span></nobr> \
<nobr><input type=radio name='slot'><span>项链</span></nobr> \
<nobr><input type=radio name='slot'><span>戒指</span></nobr> \
 &nbsp; \
<nobr><input type=radio name='range'><span>近战</span></nobr> <span class=silver>(近战武器)</span> \
<nobr><input type=radio name='range'><span>远程</span></nobr> <span class=silver>(远程武器)</span> \
<br/>\
<span class='b'>以下必选一个</span>\
<br/>\
<nobr><input type=checkbox><span>力量</span></nobr> \
<nobr><input type=checkbox><span>敏捷</span></nobr> \
<nobr><input type=checkbox><span>智力</span></nobr> \
<nobr><input type=checkbox><span>体力</span></nobr><span class=silver>(体力/提升生命值上限)</span> \
 &nbsp; \
<nobr><input type=checkbox><span>能量</span></nobr><span class=silver>(怒气/戒律/法力/奥能/精气上限)</span> \
<nobr><input type=checkbox><span>回血</span></nobr> \
<nobr><input type=checkbox><span>回蓝</span></nobr><span class=silver>(怒气/憎恨/法力/精气回复/暴击回复奥能)</span>\
<br/>\
<nobr><input type=checkbox><span>攻击力</span></nobr> \
<nobr><input type=checkbox><span>暴击</span></nobr><span class=silver>(暴击率/暴击伤害)</span> \
<nobr><input type=checkbox><span>攻速</span></nobr> \
<nobr><input type=checkbox><span>吸血</span></nobr><span class=silver>(吸血/每击回复生命/击杀回复生命/消耗精气回复生命)</span> \
<nobr><input type=checkbox><span>特效</span></nobr><span class=silver>(击退/减速/冰冻/恐惧/眩晕/致盲/流血)</span> \
<br/>\
<nobr><input type=checkbox><span>护甲</span></nobr> \
<nobr><input type=checkbox><span>全抗</span></nobr> \
<nobr><input type=checkbox><span>单抗</span></nobr><span class=silver>(物理/奥术/神圣/火焰/冰霜/电/毒)</span> \
<nobr><input type=checkbox><span>挡格</span></nobr> \
<nobr><input type=checkbox><span>减控</span></nobr><span class=silver>(缩短被控制时间)</span> \
<nobr><input type=checkbox><span>近战减伤</span></nobr><span class=silver>(降低近战伤害)</span> \
<nobr><input type=checkbox><span>远程减伤</span></nobr><span class=silver>(降低远程伤害)</span> \
<nobr><input type=checkbox><span>精英减伤</span></nobr><span class=silver>(降低精英怪伤害)</span>\
<br/>\
<nobr><input type=checkbox><span>镶孔</span></nobr> \
<nobr><input type=checkbox><span>GF</span></nobr><span class=silver>(提高金币获取)</span> \
<nobr><input type=checkbox><span>MF</span></nobr><span class=silver>(提高魔法装备获取率)</span> \
<nobr><input type=checkbox><span>跑速</span></nobr> \
<nobr><input type=checkbox><span>拾取范围</span></nobr> \
<nobr><input type=checkbox><span>生命球</span></nobr><span class=silver>(提高生命球回复量)</span> \
<nobr><input type=checkbox><span>降需</span></nobr><span class=silver>(降低等级需求)</span> \
<br/>\
<nobr><input type=checkbox><span>其他</span></nobr> \
</div>")




else
	var x=_$("<div id='additional_check_120604' class=gray style='line-height:22px'>\
<span class='b'>以下必选</span><br/>\
<span class='red'><nobr><input type=radio name='reign'><span>亚服求购</span></nobr> \
<nobr><input type=radio name='reign'><span>亚服出售</span></nobr> \
<nobr><input type=radio name='reign'><span>美服求购</span></nobr> \
<nobr><input type=radio name='reign'><span>美服出售</span></nobr> \
<nobr><input type=radio name='reign'><span>欧服求购</span></nobr> \
<nobr><input type=radio name='reign'><span>欧服出售</span></nobr></span> \
 &nbsp; BattleTag 或其他联系方式:<nobr><input name='battletag'></nobr></span> \
</div>")






if(this.title.parentNode.nodeName=='TD')
	this.title.parentNode.appendChild(x)
else
	this.title.parentNode.insertBefore(x,this.content)
}


postfunc.additional_check = function(){
if((this.form.elements.namedItem("fid").value!=401 && this.form.elements.namedItem("fid").value!=404) || this.form.elements.namedItem("tid").value!=0)return true;
var x = $('additional_check_120604'),y = x.getElementsByTagName('nobr'),z = '',u='',v=null,w='', reignU , classU , typeU , slotU , rangeU , pU ,weapon


for (var i=0;i<y.length ; i++){
	v = y[i]
	if (v.firstChild.name=='battletag')
		w=v.firstChild.value
	else if (v.firstChild.checked){
		if(v.firstChild.name=='type'){
			typeU=true
			if(v.firstChild.className=='gold' && this.form.elements.namedItem("fid").value!=404){
				alert('金币供求信息请于专区发布，点击跳转至金币供求信息发布区')
				window.location.href='/post.php?fid=404'
				return
				}
			}
		else if(v.firstChild.name=='slot'){
			slotU=true
			if(v.firstChild.className=='weapon')weapon=true
			}
		else if(v.firstChild.name=='range')
			rangeU=true
		else if(v.firstChild.name=='reign')
			reignU=true
		else if(!v.firstChild.name)
			pU=true

		if(v.firstChild.name=='reign')
			u='['+v.lastChild.innerHTML+']'
		else
			z+='['+v.lastChild.innerHTML+']'
		}
	}
this.title.value = this.title.value.replace(/\[.+?\]/g,'')

if(!reignU)
	return alert('你必须在地区里选择一个')

if(this.form.elements.namedItem("fid").value==401){
	if(!slotU)
		return alert('你必须在装备位置里选择一个')

	if(weapon && !rangeU)
		return alert('你必须选择远程武器或近战武器')

	if(!pU)
		return alert('你必须至少在属性中选择一个')
	}
this.title.value=u+this.title.value+z
//if(this.title.value.toUpperCase().indexOf(w.toUpperCase())==-1)
//	this.title.value+='('+w+')'
if(this.content.value.toUpperCase().indexOf(w.toUpperCase())==-1)
	this.content.value+='\n\n'+u+' '+w
return true

}
