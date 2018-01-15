<!-- 
var jst = new jsTemplates();
jst.templates['readrepeat'] = "\
<table class='forumbox postbox' cellspacing='1px'>\
	<tr id='post1strow{$l}' class='row{$bg} postrow'>\
		<td class='c1'>\
			<span class='green right'>[{$l} 楼]</span><a name='l{$l}'></a>\
			<strong id='postauthor{$l}'>{$author}</strong>\
		</td>\
		<td class='c2'>\
			<span class='right' style='line-height:12px;margin:-3px'>\
				{$btngenargs}\
			</span>\
			<span class='numeric' id='postdate{$l}'>{$date}</span>\
		</td>\
	</tr>\
	<tr class='row{$bg} postrow'>\
		<td class='c1' style='vertical-align:top;text-align:center'>\
			<div id='postportrait{$l}' class='portrait'>\
				{$face}\
			</div>\
			<span class='silver'>{$honor}</span>\
			<div class='stat' title=' 注册时间: {$regdate} &#10; 最后登陆: {$lastlogin} '>\
				<img class='gimg' src='/image/nga_classic/level/{$lpic}.gif'>\
				<span class='gimg'>{$ipfrom}</span>\
				<span class='gimg'>{$ip}</span>\
				级别: <span>{$level}</span><br/>\
				发帖: <span class='numericl'>{$postnum}</span><br/>\
				威望: <span id='posterpg{$l}' class='numericl'>{$rvrc}</span><br/>\
				{$money}\
			</div>\
		</td>\
		<td class='c2 pc{$gid}' style='vertical-align:top'>\
			{$icon}<h3 id='postsubject{$l}'>{$subject}</h3><br/>\
			<span id='postcontent{$l}'>{$content}</span>\
			<br/>\
			{$addon}\
			{$mark}\
			<div id='postsign{$l}'>\
				<span class='sigline'>BBS.NGACN.CC</span>\
				<div class='sign' id='postsigncontent{$l}'>\
					{$sign}\
				</div>\
			</div>\
		</td>\
	</tr>\
</table>\
";
jst.additionalFunctions['readrepeat'] = new Array;
jst.additionalFunctions['readrepeat']['content'] = function (c)
{
return bbscode_core(c)
}
//fe
jst.additionalFunctions['readrepeat']['sign'] = function (c)
{
return bbscode_core(c)
}
//fe
jst.additionalFunctions['readrepeat']['mark'] = function (m)
{
	if (m)
		{
			return "<table class='quote'><tr><td>此帖被评分,最近评分记录 "+m+"</td></tr></table>";
		}
	else
		{
			return '';
		}
}
//fe
jst.additionalFunctions['readrepeat']['money'] = function (c)
{
c = parseInt(c)
if (c <= 0)
	{
		return ('');
	}
g = Math.floor(c / 10000);
s = Math.floor(c / 100) - g * 100;
c = c - g * 10000 - s * 100;
if (g)
	{
		g = g + "<img alt='金币' style='margin:2px 2px -2px 2px' src='/image/nga_classic/g.gif'/>";
	}
else
	{
		g = '';
	}
if (s)
	{
		s = s + "<img alt='银币' style='margin:2px 2px -2px 2px' src='/image/nga_classic/s.gif'>";
	}
else
	{
		s = '';
	}
if (c)
	{
		c = c + "<img alt='铜币' style='margin:2px 2px -2px 2px' src='/image/nga_classic/c.gif'/>";
	}
else
	{
		c = '';
	}
return("财富: <span class='numericl'>"+g+s+c+'</span><br/>');
}
//fe

jst.additionalFunctions['readrepeat']['btngenargs'] = function (arg)
{
arg = arg.split(',');
var admincheck = arg[0];
var groupid = arg[1];
var markable = arg[2];
var banuser = arg[3];
var modother = arg[4];
var topofthepage = arg[5];
var lou = arg[6];
var fid = arg[7];
var tid = arg[8];
var pid = arg[9];
var authorid = arg[10];
var oicq = arg[0];
var r = '';
if(admincheck || (groupid!='5' && markable=='1'))
	{
		r = r+"<a href='masingle.php?action=showping&fid="+fid+"&tid="+tid+"&pid="+pid+"'><img src='/image/nga_classic/score.gif' title='评分' alt='评分'/></a> ";
	}
if(admincheck || (groupid!='5' && banuser=='1'))
	{
		r = r+"<a href='masingle.php?action=banuser&fid="+fid+"&uid="+authorid+"'><img src='/image/nga_classic/mute.gif' title='禁言' alt='禁言'/></a> ";
	}
if(groupid!='5' && banuser=='1')
	{
		r = r+"<a href='nuke.php?func=nukestep1&&id="+authorid+"' target='_blank'><img src='/image/nga_classic/nuke1.gif' title='NUKE' alt='Nuke'/></a> ";
		r = r+"<a href='nuke.php?func=csstep1&&id="+authorid+"' target='_blank'><img src='/image/nga_classic/nuke4.gif' title='清理签名' alt='CS'/></a> ";
		r = r+"<a href='nuke.php?func=cpstep1&&id="+authorid+"' target='_blank'><img src='/image/nga_classic/nuke4.gif' title='清理头像' alt='CP'/></a> ";
	}
if(admincheck || (groupid!='5' && modother=='1'))
	{
		r = r+"<a href='javascript:lessernuke(\""+tid+"\",\""+pid+"\",1,\""+lou+"\")'><img src='/image/nga_classic/nuke2.gif' title='禁言两天' alt='LN'/></a> ";
		r = r+"<a href='javascript:lessernuke(\""+tid+"\",\""+pid+"\",2,\""+lou+"\")'><img src='/image/nga_classic/nuke2.gif' title='禁言两天 扣一威望' alt='LN'/></a> ";
		r = r+"<a href='javascript:lessernuke(\""+tid+"\",\""+pid+"\",3,\""+lou+"\")'><img src='/image/nga_classic/nuke2.gif' title='禁言六天' alt='LN'/></a> ";
		r = r+"<a href='javascript:lessernuke(\""+tid+"\",\""+pid+"\",4,\""+lou+"\")'><img src='/image/nga_classic/nuke2.gif' title='禁言六天 扣二威望' alt='LN'/></a> ";
		r = r+"<a href='javascript:logpost(\""+tid+"\",\""+lou+"\")'><img src='/image/nga_classic/bad.gif' title='汇报此贴至镰刀' alt='LG'/></a> ";
		if(topofthepage)
			{
				r = r+"<a href='#' onclick='this.document.delatc.submit();'><img src='/image/nga_classic/recycle1.gif' title='删除选定的回复' alt='DCR'/></a> ";
			}
		if (lou != 0)
			{
				r = r+"<input type='checkbox' name='delatc[]' value='"+pid+"' title='删除选定的回复' style='vertical-align:6px'/>";
				r = r+"<a href='javascript:delsinglereply(\""+tid+"\",\""+pid+"\")'><img src='/image/nga_classic/recycle2.gif' title='删除此回复，如回复有附件勿使用此功能' alt='DTR'/></a> ";
			}
		else
			{
				r = r+"<a href='javascript:recommend(\""+tid+"\",10)'><img src='/image/nga_classic/good.gif' title='推荐这个主题（加精、置顶、镜象、改变标题颜色、给主题作者加威望会自动推荐）' alt='RD'/></a> ";
			}
	}
/*
if($db_showonline)
	{
		if($read['thisvisit']+$db_onlinetime*1.5>$timestamp)
			{
				document.write("在线");
			}
		else
			{
				document.write("不在线");
			}
	}
*/
r = r+"<a href='profile.php?action=show&uid="+authorid+"'><img src='/image/nga_classic/member.gif' title='查看作者资料' alt='作者'/></a> ";
r = r+"<a href='message.php?action=write&touid="+authorid+"'><img src='/image/nga_classic/pm.gif' title='发送短消息' alt='PM'/></a> ";
r = r+"<a href='post.php?action=modify&fid="+fid+"&tid="+tid+"&pid="+pid+"&article="+lou+"'><img src='/image/nga_classic/post.gif' title='编辑' alt='编辑'/></a> ";
r = r+"<a href='post.php?action=quote&fid="+fid+"&tid="+tid+"&pid="+pid+"&article="+lou+"'><img src='/image/nga_classic/quote.gif' title='引用回复这个帖子' alt='引用'/></a> ";
r = r+"<a href='javascript:scroll(0,0)'><img src='/image/nga_classic/top.gif' title='回到顶端' alt='顶端'/></a>";
return (r);
}
//fe
-->