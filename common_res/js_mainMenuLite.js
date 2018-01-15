function _ngaNavAll_1503071021(){

var css = "#mainMenu20150307 {font-size:13px;height:55px;overflow:hidden;margin-bottom:0.5em}\n\
#mainMenu20150307 .menu .logo {width:158px;height:54px;background:url(http://img4.nga.178.com/ngabbs/nga_classic/logo8.png);float:left}\n\
#mainMenu20150307 .menu {border-bottom:1px solid #E0C19E;height:54px;overflow:hidden;background:#FFF0CD}\n\
#mainMenu20150307 .menu .left {}\n\
#mainMenu20150307 .menu .right {float:right}\n\
#mainMenu20150307 .menu .item {line-height:54px;height:54px;float:left;background:#591804}\n\
#mainMenu20150307 .menu .item .half {padding-top:10px;line-height:18px;font-size:12px;text-align:center;}\n\
#mainMenu20150307 .menu .item .spacer {line-height:10px;height:10px;width:10px}\n\
#mainMenu20150307 .menu .item a {background:#FFF0CD;display:block;padding:0 1.5em;height:54px;text-decoration:none;color:#591804;}\n\
#mainMenu20150307 .menu .item a:hover {height:50px;overflow:hidden;background-color:#FFF8E7;color:#b87563;}\n\
#mainMenu20150307 .menu .item .active {height:50px;overflow:hidden}\n\
#mainMenu20150307 .menu .item .invert {background:#591804;color:#fff}\n\
#mainMenu20150307 .menu .item .invert:hover {background:#b87563;color:#fff}\n\
#mainMenu20150307 .menu .clear {clear:both;line-height:0px;font-size:0px;}"

var h = document.getElementsByTagName('head')[0],s = document.createElement('style');
s.type = 'text/css';
if (s.styleSheet){
	h.appendChild(s);
	s.styleSheet.cssText = css;
	}
else {
	s.appendChild(document.createTextNode(css));
	h.appendChild(s);
	}

var l=location,
cookie = function(x){if(x){var a=document.cookie.indexOf(x+"=");if(a!=-1){return document.cookie.substring((a+x.length+1),document.cookie.length).split(";")[0];}else{return "";}}},
uid = cookie('ngaPassportUid'), uinfo = unescape(cookie('ngacn0comUserInfo')),
uname='', ugid=0, b = l.hostname+l.pathname
a = function(x){
	if(!x || (x.u==1 && !uid) || (x.u==0 && uid) || x.n)
		return ''

	var y="<div class='item'><a href='"+x.h+"' "
	if(x.c)
		y+=" class='"+x.c+(x.h.substr(7)==b.substr(0,x.h.length-7) ? ' active':'')+"' "
	if(x.b)
		y+=" target='_blank' "
	
	y+=" >"+x.t+"</a></div>"
	return y
	},
c=function(s,l,t,a){
	var j = 0.0, c, z;
	for (var i=0;i<s.length;i++){
		c = s.charCodeAt(i);
		if (c > 127)
			j = j+1;
		else if ( (c<=122 && c>=97)||(c<=90 && c>=65) )
			j = j+0.65;
		else
			j = j+0.35;
		if (t && !z && j>=t)
			z = i
		if (j>=l)
			return s.substr(0,(z ? z : i)+1)+(a ? a : '');
		}
	return s;
	}

if(uid){
	uinfo = uinfo.split("\t")//username/utf8name/gid/mid/null/rvrc/money/active/null/medal
	if(uinfo[1] && uinfo[3])
		var uname = decodeURIComponent(uinfo[1]), ugid = uinfo[3]
	else
		var uid=0,uname='',ugid=0
	}
else{
	uid=0
	uinfo = decodeURIComponent(cookie('_178c'))
	if(uinfo){
		uinfo = uinfo.split('#')
		if(uinfo[0] && uinfo[2]){
			uname = uinfo[2]
			uid = uinfo[0]
			}
		}
	}

var menuItem = {
	left:{
		1:{h:'http://nga.cn/',t:'首页'},
		2:{h:'http://bbs.nga.cn/',t:'论坛'},
		3:{h:'http://game.nga.cn/',t:'评分'},
		4:{h:'http://g.nga.cn/',t:'聚聚'},
		5:{h:'http://tv.nga.cn/',t:'赛事'},
		//6:{h:'https://shop322965498.taobao.com',t:'商城'},
		6:{h:'http://app.nga.cn/',t:'移动�?'}
		},
	right:{
		1:{u:1, c:'invert', h:'http://bbs.nga.cn/nuke.php?func=ucp&uid='+uid, t:uid ? '<div class="half">你好<br/>'+c(uname,7,6,'...')+'</div>':''},
		2:{h:'http://bbs.nga.cn/',t:'论坛'},
		3:{u:1, h:'https://account.178.com/q_account.php?_act=logout&to='+encodeURIComponent(location.href), t:'登出'},
		4:{u:0, h:'https://bbs.nga.cn/nuke.php?__lib=login&__act=login_ui', t:'登录'},
		5:{u:0, b:1, h:'https://account.178.com/?p=register', t:'注册'},
		6:navigator.userAgent.match(/iphone os|android/i) ? {h:'http://app.178.com/',t:'移动�?'} : null
		}
	}

var m = "<div id='mainMenu20150307'><div class='menu'><div class='right'>"

for(var k in menuItem.right)
	m+=a(menuItem.right[k])

m+="</div><div class='left'><div class='logo'></div>"

for(var k in menuItem.left)
	m+=a(menuItem.left[k])

m+="</div><div class='clear'></div></div></div>"

return m
}
if(!window._NotLoadNgaNavAll)document.write(_ngaNavAll_1503071021());