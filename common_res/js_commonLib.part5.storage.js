/*
========================
commonlib localstorage functions for nga
------------
(c), Zeg, All Rights Reserved
Distributed under GPLv3 license
========================
*/

//==================================
//DOM STORE
//浏览器本地储存 使用commonui.userCache 不要直接用这个
//==================================
;(function(){
var O, err, W=window, NOW = W.__NOW ? (__NOW|0) : Math.floor((new Date).getTime()/1000)


try{
	O=W.localStorage
	}
catch(e){
	// some time localStorage cant access in IE8 IE9 IE10
	err=1
	}

if(!O){
	try{
		O=W.globalStorage[location.host]
		}
	catch(e){
		// some time globalStorage cant access in  FIREFOX
		err=2
		}
	}

if(!O){
	try{
		if(W.ActiveXObject){
			w.document.documentElement.addBehavior("#default#userdata")
			var OO=w.document.documentElement, AR='localStoragePolyfill'
			OO.load(AR)
			O = {
            getItem     : function(id) { return OO.getAttribute(id) || undefined; },
            setItem     : function(id, val) { OO.setAttribute(id, val); OO.save(AR); },
            removeItem  : function(id) { OO.removeAttribute(id); OO.save(AR); },
            clear       : function() { } 
				}
			}
		}
	catch(e){
		err=3
		}
	}

if(!O && !OO){
	W.domStorageFuncs = {
		set:function(){},
		get:function(){},
		remove:function(){}
		}
	return
	}
	
W.domStorageFuncs = {
	o:true,
	set:function(k, v, t){
		if(t==0)
			t = 86400*30
		else if(t<0)
			return this.remove(k)
		//if(Math.random()<0.02)
		//	this.checkTimeout()
		O.setItem(k, (NOW+(t|0))+''+v);
		},//fe
	get:function(k){
		try{
			var x =O.getItem(k);
			}
		catch(err){
			return;
			}
		if(x && (x.substr(0,10)|0)>NOW)
			return x.substr(10)
		else
			O.removeItem(k)
		return ''
		},//fe
	remove:function(k){
		O.removeItem(k)
		},
	checkTimeout:function (){
		if(O.length)
			for (var i=0;i<O.length;i++){
				var y = O.getItem(O.key(i)).substr(0,10)
				if (!y || (y && y<NOW))
					O.removeItem(O.key(i))
				}
		}//fe
	}

})();