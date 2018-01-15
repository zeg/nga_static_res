commonui.userScript = {
setUi:function(e){

if(!Object.freeze || !domStorageFuncs)
	return alert('请升级你的浏览器')
if(!__CURRENT_UID)
	return alert('需要先登陆')

var c = commonui
c.createadminwindow()
c.adminwindow._.addContent(null)

var u = c.userCache.get('userScript'),
ck = 'user_script_'+__CURRENT_UID,
f = c.userCache.get('userScriptFile'),
ff = _$('/span')

if(!u)u=''

if(f){
	for(var i=0;i<f.length;i++)
		ff._.add(_$('/input').$0('value',f[i],'style',{width:'90%'}),_$('/br'))
	}
ff._.add(_$('/input').$0('style',{width:'90%'}),_$('/br'))
ff._.add(_$('/input').$0('style',{width:'90%'}),_$('/br'))

c.adminwindow._.addContent(
	
	_$('/span').$0('style',{linHeight:'1.83em'},'innerHTML','你可以在下面添加要加载的javascript脚本地址<br/>\
加载<b>不在许可列表中的外站脚本会弹出提示</b>，如果想将你的外站脚本加入到许可列表中，请联络管理员<br/>'),
	ff,
	_$('/button')._.attr({innerHTML:'保存',type:'button'})._.on('click',function(){
			var u = this.previousSibling.getElementsByTagName('input'),x = []
			for(var i=0;i<u.length;i++){
				var z = u[i].value.replace(/^\s*|\s*$/g,'')
				if(z)
					x.push(z)
				}
			if(x.length)
				commonui.userCache.set('userScriptFile', x, 86400*365)
			else
				commonui.userCache.del('userScriptFile')
			alert('保存完毕')
			}),

	_$('/span').$0('style',{linHeight:'1.83em'},'innerHTML','<br/><br/>你可以在下面创建一段javascript脚本<br/>\
这部分脚本将在页面加载后运行 但每次运行都会产生一个提示<br/>\
浏览器本地储存功能并不能保证完全可靠，请备份你的脚本<br/>\
'),	
	_$('/textarea').$0('value',u,'style',{width:'90%',height:'10em'}),
	_$('/br'),
	_$('/button')._.attr({innerHTML:'保存',type:'button'})._.on('click',function(){
			var u = this.previousSibling.previousSibling.value
			u = u.replace(/^\s*|\s*$/g,'')
			if(u)
				commonui.userCache.set('userScript', u, 86400*365)
			else
				commonui.userCache.del('userScript')
			alert('保存完毕')
			}),

	_$('/span').$0('style',{linHeight:'1.83em'},'innerHTML','<br/><br/><b>不安全的javascript脚本可能</b><br/>\
<b>泄露你所看到的私人内容</b><br/>\
<b>代替你进行操作</b><br/>\
<b>如果你的浏览器有安全漏洞 可能使你的电脑感染病毒</b><br/>\
<b>本站无法对用户脚本造成的损害负责，如果不能确定脚本的安全性请不要使用</b><br/>\
在登录或退出后需要重新"启用用户脚本"<br/>'),

	_$('/button')._.attr({innerHTML:(__COOKIE.getMiscCookie(ck)?'停用用户脚本':'启用用户脚本'),type:'button'})._.on('click',function(){
			if(this.innerHTML=='停用用户脚本')
				__COOKIE.setMiscCookieInSecond(ck,0,0)
			else{
				if(!commonui.userCache.get('userScript') && !commonui.userCache.get('userScriptFile'))
					return alert('你需要先设置用户脚本')
				__COOKIE.setMiscCookieInSecond(ck,1,86400*90)
				}
			window.location.reload()
			})
	)
tTip.showdscp(e,c.adminwindow);

},//fe

load:function(){
if (!domStorageFuncs || !__CURRENT_UID || !Object.freeze)return
var ck = 'user_script_'+__CURRENT_UID, s = parseInt(cookieFuncs.getMiscCookie(ck))
if (!s)
	return

var s = commonui.userCache.get('userScript'),f=commonui.userCache.get('userScriptFile')

if(!s && !f){
	domStorageFuncs.remove(__CURRENT_UID+'_user_script')//remove old
	__COOKIE.setMiscCookieInSecond(ck,0,0)
	return
	}

if(s){
	if(!confirm('设置了自定义的用户脚本 是否运行'))
		return
	}

var checkScriptLoad = function(){

	var call = function(e){
		if(window.__CURRENT_UID && window.__CURRENT_UID==7989705)
			return;
		var e = e.target ? e.target : e.srcElement
		if(e.nodeName=='SCRIPT'){
			var m = e.src.match(/^[a-zA-Z]+:\/\/([^\/]+)\/(.*)/)
			if(m){
				m[3] = m[1].match(/[^\.]+\.[^\.]+$/)
				l1:
				switch(m[3][0]){
					case 'ngacn.cc':
					case '178.com':
					case 'nga.cn':
					case 'bigccq.cn':
					case 'cnzz.com':
					case 'baidu.com':
					case 'google-analytics.com':
						break;
					case 'googlecode.com':
						var x = m[1]+'/'+m[2]
						switch(x){
							//case 'ngaui.googlecode.com/files/ngacn_ui_modify.user.js':
							case 'ngaui.googlecode.com/files/ngacn_ui_mojo.js'://表情-虚空之魂
							
							case 'ngaplugins.googlecode.com/svn/trunk/command.js':
							case 'ngaplugins.googlecode.com/svn/trunk/Blacklist.js'://黑名单插件
							case 'ngaplugins.googlecode.com/svn/trunk/editor/editor.js'://UBB编辑器
							case 'ngaplugins.googlecode.com/svn/trunk/mojo_for_lintx.js'://表情-LinTx
							case 'ngaplugins.googlecode.com/svn/trunk/othertools.js'://小工具集合
							case 'ngaplugins.googlecode.com/svn/trunk/varietynga.js'://小工具集合

							case 'ngaplugin.googlecode.com/svn/ngaplug/command.js':
							case 'ngaplugin.googlecode.com/svn/ngaplug/Blacklist.js':
							case 'ngaplugin.googlecode.com/svn/ngaplug/editor/editor.js':
							case 'ngaplugin.googlecode.com/svn/ngaplug/mojo_for_lintx.js':
							case 'ngaplugin.googlecode.com/svn/ngaplug/othertools.js':
								break l1;
							}
					default:
						console.log('user script not allow '+e.src)
						var x = '检测到不在许可列表中的外站脚本引入\n\n'+e.src+'\n\n'+'是否关闭用户脚本功能'
						e.parentNode.removeChild(e)
						if(confirm(x))
							__COOKIE.setMiscCookieInSecond('user_script_'+__CURRENT_UID,0,0)
					}
				}
			}
		}
	document.addEventListener ('load',call,true)
	}


window.setTimeout(function(){
	checkScriptLoad();
	if(f)
		for(var i=0;i<f.length;i++)
			loader.script(f[i])
	if(s)
		window.execScript ? window.execScript(s) : window.eval(s)
	},1500)
	
	
}//fe

}//ce