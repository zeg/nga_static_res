# nga_static_res

bbs.ngacn.cc使用的javascript与css等静态资源(仅公开的部分..

# js debug开启方法

1 下载本项目源码到本机

2 在本机开设http服务 使源码能从http://127.0.0.1访问

3 新建一个http://127.0.0.1/js_debug.js 内容如下

	;(function(){
	var x = document.cookie.match(/debug=(10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3});/)
	if(x)
		x=location.protocol+'//'+x[1]+'/到源码的路径'  //如果debug设置了其他的ip
	else
		x=location.protocol+'//127.0.0.1/到源码的路径'  //默认127.0.0.1
	
	//修改资源列表以使用本地文件....
	__SCRIPTS.commonSpec = x+'/ngabbs/nga_classic/js_default.js'
	__SCRIPTS.read = x+'/common_res/js_read.js'
	__SCRIPTS.message = x+'/common_res/js_message.js'
	__SCRIPTS.lib = x+'/common_res/js_commonLib.js'
	__SCRIPTS.common = x+'/common_res/js_commonui.js'
	__SCRIPTS.forum = x+'/common_res/js_forum.js'
	__SCRIPTS.ucp = x+'/common_res/js_ucp.js'
	__SCRIPTS.admin = x+'/common_res/js_admin.js'
	__SCRIPTS.iframeRead2 = x+'/common_res/js_iframeRead.js'
	__SCRIPTS.armory = x+'/ngabbs/nga_classic/js_armory.js'
	__SCRIPTS.bbscodeSpec = x+'/ngabbs/nga_classic/js_bbscode_smiles.js'
	__SCRIPTS.bbscode =  x+'/common_res/js_bbscode_core.js'
	__SCRIPTS.dsList =  x+'/ngabbs/nga_classic/js_dslist_default.js'
	__SCRIPTS.userItem = x+'/common_res/js_userItem.js?131048'
	__SCRIPTS.post =  x+'/common_res/js_postfunc_v2.js?140736'
	__SCRIPTS.mainMenu =  x+'/common_res/js_mainMenu.js?140736'
	__SCRIPTS.customBg =  x+'/ngabbs/nga_classic/js_customBg.js?111091'
	__SCRIPTS.quoteTo =  x+'/common_res/js_quote_to.js?432460'
	__SCRIPTS.notification =  x+'/common_res/js_notification.js?432460'
	__SCRIPTS.dsCommon= x+'/common_res/js_dscommon.js?120438'
	__SCRIPTS.imgEdit= x+'/common_res/js_imageEdit.js?120438'
	//如需添加更多请参看__SCRIPTS 与 __STYLE
	})();

4 py管理员给你开通debug权限

5 在 论坛菜单>设置>debug 中点开启 (如源码服务使用127.0.0.1之外的ip可填在前面)