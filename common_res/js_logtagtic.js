(function(global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.JSSDK = factory()
} (typeof window !== "undefined" ? window: this,
function() {
	var oldTimestamp = null,
	topic = window.app_key || null,
	sendDataUrl = location.protocol+"//xy-log2.tagtic.cn/mininfo/v1/logs/" + topic,
	ip = null,
	isNew = 0,
	pageId = null,
	sendFlag = 0,
	eventAdded = 0,
	currentUrl = '',
	domain = '',
	oldUrl = "";
	var Util = function() {
		return {
			ajax: function(o) {
				o.url = o.url || "";
				o.method = o.method || "get";
				o.data = o.data || "";
				o.callback = o.callback || "";
				o.async = o.async || true;
				var callback = function(xhr) {};
				var xhr = null;
				if (o.method.toUpperCase() === "POST") {
					if (typeof o.data === "object") {
						try {
							o.data = JSON.stringify(o.data)
						} catch(e) {
							o.data = ""
						}
					}
					if (window.XMLHttpRequest) {
						xhr = new window.XMLHttpRequest;
						if ("withCredentials" in xhr) {
							xhr.open("POST", o.url, true);
							xhr.setRequestHeader("Content-Type", "text/plain");
							xhr.onreadystatechange = function() {
								if (4 === xhr.readyState) {
									callback(xhr)
								}
							};
							xhr.send(o.data)
						}
					} else {
						//console.log("Your browser does not support XMLHTTP.")
					}
				}
			},
			md5: function(str) {
				return hex_md5(str+'')
			},
			setCookie: function(name, value, expire) {
				var domain = this.GetFirstLevelDomain();
				expire = expire || 24;
				var exp = new Date();
				exp.setTime(exp.getTime() + expire * 3600000);
				document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";domain=" + domain + ";path=/"
			},
			getCookie: function(name) {
				name = window.document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
				return null !== name ? unescape(name[2]) : null
			},
			GetFirstLevelDomain: function(s) {
				if(s){
					if(s=s.match(/^(?:[a-z0-9]+:\/\/)?([^\/]+)/))
						s=s[1]
					else
						return 'unknow'
					}
				else
					s=document.location.hostname;
				s = s.match(/[^\.]+\.(?:(?:com|co|net|org|gov|edu|mil|biz|name|info|mobi|pro|travel|museum|int|areo|post|rec)\.)?[^\.]+$/)
				return s? s[0]:'unknow'
			},
			addEvent: function(obj,e,fn, flag) {
				commonui.aE(obj,e,fn)
			}
		}
	} ();
	function setip(result) {
		ip = result
	}
	function sendData(content) {
		if (!content.appkey || topic === "app_key") {
			return
		}
		Util.ajax({
			method: "post",
			url: sendDataUrl,
			data: content/*,
				
			callback: function(data) {
				if (1 === data.code) {
					console.log(data)
				} else {
					if (0 === data.code) {
						console.log(data)
					}
				}
			}*/
		})
	}
	function filterUrl(data) {
		if (!data.to_target.match(/^https?:\/\//)) {
			data.to_target = null;
			return data
		}
		var toDomain = Util.GetFirstLevelDomain(data.to_target);
		if (domain === toDomain) {
			data.to_target = null
		}
		return data
	}
	function dealwithData(content) {
		content.cookie = Util.getCookie("taihe");
		content.page_id = pageId;
		content.short_cookie = Util.getCookie("taihe_session");
		content.appkey = topic;
		if (!content.http_url.match(/^https?:\/\//)  || !content.cookie) {
			return
		}
		if (content.event === "jump") {
			content = filterUrl(content);
			if (!sendFlag) {
				var duration = {
					cookie: Util.getCookie("taihe"),
					page_id: pageId,
					short_cookie: Util.getCookie("taihe_session"),
					appkey: topic,
					http_url: currentUrl,
					timestamp: new Date().toISOString(),
					event: "duration",
					duration: parseInt((new Date().getTime() - oldTimestamp) / 1000)
				};
				sendData(duration);
				sendFlag = 1
			}
			if (content.to_target) {
				sendData(content);
				return
			}
		}
		if (content.event === "load") {
			sendData(content);
			return
		}
		if (content.event === "close") {
			var duration = {
				cookie: Util.getCookie("taihe"),
				page_id: pageId,
				short_cookie: Util.getCookie("taihe_session"),
				appkey: topic,
				http_url: currentUrl,
				timestamp: new Date().toISOString(),
				event: "duration",
				duration: parseInt((new Date().getTime() - oldTimestamp) / 1000)
			};
			sendData(duration)
		}
	}
	function init(spaFlag, currUrl, referer) {
		if (spaFlag) {
			var duration = {
				cookie: Util.getCookie("taihe"),
				page_id: pageId,
				short_cookie: Util.getCookie("taihe_session"),
				appkey: topic,
				http_url: oldUrl,
				timestamp: new Date().toISOString(),
				event: "duration",
				duration: parseInt((new Date().getTime() - oldTimestamp) / 1000)
			};
			sendData(duration)
		}
		currentUrl = currUrl || window.location.href;
		domain = Util.GetFirstLevelDomain();
		oldTimestamp = new Date().getTime();
		pageId = Util.md5(currentUrl + oldTimestamp);
		if (!Util.getCookie("taihe")) {
			isNew = 1;
			var value = navigator.userAgent + new Date().getTime();
			var md5Value = Util.md5(value);
			Util.setCookie("taihe", md5Value, 5 * 365 * 24)
		}
		if (!Util.getCookie("taihe_session")) {
			Util.setCookie("taihe_session", Util.md5(new Date().getTime()), 1 / 6)
		} else {
			Util.setCookie("taihe_session", Util.getCookie("taihe_session"), 1 / 6)
		}
		if(!eventAdded){
			eventAdded = 1
			Util.addEvent(window, "beforeunload",
			function(e) {
				if(e.target && e.target.activeElement){
					var node = e.target.activeElement.nodeName.toLowerCase();
					if (node != "a") {
						var result = {
							to_target: e.target.links[0].href,
							http_url: currentUrl,
							timestamp: new Date().toISOString(),
							event: "close",
						};
						dealwithData(result)
					}
				}
			});

			Util.addEvent(document.body, 'click', function (e) {
					var h = e.target || e.srcElement
					for(var i=0;i<3;i++){
						if(h){
							if(h.nodeName=='A'){
								dealwithData({
									to_target: h.getAttribute("href"),
									http_url: currentUrl,
									timestamp: new Date().toISOString(),
									event: 'jump',
									})
								return
								}
							else
								h=h.parentNode
							}
						else
							return
						}
					})
			}

		var load = function(setref) {
			var referer = spaFlag ? oldUrl: (setref?setref:(document.referrer ? document.referrer: null));
			var result = {
				status: 200,
				http_user_agent: navigator.userAgent,
				request_method: "get",
				timestamp: new Date().toISOString(),
				http_url: currentUrl,
				http_x_forwarded_for: ip,
				event: "load",
				is_new: isNew,
				http_referer: referer
			};
			dealwithData(result)
		};
		load(referer);
		/*
		var onblur = window.onblur;
		window.onblur = function() {
			onblur ? onblur() : true
		};
		var focus = window.onfocus;
		window.onfocus = function() {
			focus ? focus() : true
		};*/
		oldUrl = currentUrl
	}

	window.__LOATAGTIC = {
		init : function(nouse,//run this on ajax load
			newurl,//new load url
			oldurl//current page url
			){init(nouse,newurl,oldurl)}
		}
		
	init();
		/*
	function sendExtEventData(event_value) {
		if (!event_value) {
			return
		}
		var data = {
			cookie: Util.getCookie("taihe"),
			page_id: pageId,
			short_cookie: Util.getCookie("taihe_session"),
			appkey: topic,
			http_url: window.location.href,
			timestamp: new Date().toISOString(),
			event: "ext_event",
			event_name: event_value
		};
		sendData(data)
	}
	function sendSPA_RouterChange(info) {
		var currentUrl = info;
		sendFlag = 0;
		if (info && info.indexOf("http") < 0) {
			currentUrl = window.location.origin + (info.indexOf("/") !== 0 ? "/": "") + info
		}
		if (info) {
			init(true, currentUrl)
		} else {
			init(true)
		}
	}*/
	function JSSDK() {}
	//JSSDK.sendExtData = sendExtEventData;
	//JSSDK.SPA_RouterChange = sendSPA_RouterChange;
	if (window.JSSDK == undefined) {
		window.JSSDK = JSSDK
	}
	return JSSDK
}));