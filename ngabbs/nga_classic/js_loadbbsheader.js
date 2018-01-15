
function onloadforumlist(o)
{
o.options[o.selectedIndex].innerHTML = '论坛列表加载中…';
o = o.parentNode;
httpDataGetter.get("load_forum_jump.php",null,function(){},function(s){o.innerHTML=s},function(){});
}
//fe