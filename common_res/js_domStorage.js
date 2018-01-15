if(window.ActiveXObject && !window.localStorage) {document.documentElement.addBehavior("#default#userdata");};
if (window.ActiveXObject || window.globalStorage || window.localStorage)
{//if
var domStorageFuncs = {
domain:'',
init : function(v){this.domain=v},
set : function(key, value) {
	if (!this.domain)return;
	if (window.localStorage){//ie8
		window.localStorage.setItem(this.domain+'_'+key, value);
		}
	else if(window.globalStorage) {//for firefox2.0+
		window.globalStorage[this.domain].setItem(key, value);
		}
	else if(window.ActiveXObject) {//for ie5.0+
		with(document.documentElement){
			try{
				load(key);
				setAttribute("js", value);
				save(key);
				}
			catch (ex){
				setAttribute("js", value);
				save(key);
				}
			}
		}
},
get : function(key) {
	if (!this.domain)return;
	if (window.localStorage){//ie8
		return window.localStorage.getItem(this.domain+'_'+key);
		}
	else if(window.globalStorage) {
		return window.globalStorage[this.domain].getItem(key);
		}
	if(window.ActiveXObject) {
		with(document.documentElement){
			try{
					load(key);
					return getAttribute("js");
				}
			catch (ex){
					return null;
				}
			}
		}
	else{
		return null;
	};
},
remove : function(key) {
	if (!this.domain)return;
	if (window.localStorage){//ie8
		return window.localStorage.removeItem(this.domain+'_'+key);
		}
	else if(window.globalStorage) {
		window.globalStorage[this.domain].removeItem(key);
		}
	if(window.ActiveXObject) {
		with(document.documentElement){
			try{
				load(key);
				expires = new Date(315532799000).toUTCString();
				save(key);
				}
			catch (ex){};
			}
		}
}
}//end domStorage

}//end if