function http_obj()
{
var xmlhttp = false;
try
	{
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
catch(e1)
	{
		try
			{
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
		catch(e2)
			{
				xmlhttp = false;
			}
	}
if(!xmlhttp && typeof XMLHttpRequest!="undefined")
	{
		try
			{
				xmlhttp = new XMLHttpRequest();
			}
		catch (e3)
			{
				xmlhttp = false;
			}
	}
if (!xmlhttp)
	{
		//window.alert(e1 + e2 + e3);
	}
return xmlhttp;
}

function http_data_getter(oname)
{
this.oname = oname;
this.inuse = false;
this.queue = new Array;
this.timer = null;
this.queueproc = function ()
	{
		if (this.queue[0])
			{
				if (!this.inuse)
					{
						this.inuse = true;
						if (this.queue[1])
							{
								this.timer = window.setTimeout(this.oname+".queueproc()",1000);
							}
						else
							{
								this.timer = null;
							}
						this.request(this.queue.shift());
					}
				else
					{
						this.timer = window.setTimeout(this.oname+".queueproc()",1000);
					}
			}
		else
			{
				window.clearTimeout(this.timer);
				this.timer = null;
			}
	}
	//fe
this.post = function (url,varArray,event_handle_start,event_handle_succ,event_handle_fail)
	{
		var data = '';
		for(k in varArray)
			{
				data = data + k + '=' + encodeURIComponent(varArray[k]) + '&';
			}
		var query = new Array;
		query['type'] = 'POST';
		query['url'] = url;
		query['data'] = data;
		query['event_handle_start'] = event_handle_start;
		query['event_handle_succ'] = event_handle_succ;
		query['event_handle_fail'] = event_handle_fail;
		this.queue.push(query);
		if (!this.timer)
			{
				this.queueproc();
			}
	}
	//fe
this.get = function (url,varArray,event_handle_start,event_handle_succ,event_handle_fail)
	{
		if (typeof(varArray) == 'string')
			{
				var data = varArray;
			}
		else
			{
				var data = '';
				for(k in varArray)
					{
						data = data + k + '=' + encodeURIComponent(varArray[k]) + '&';
					}
			}
		if (data && url)
			{
				url = url + '?' + data;
			}
		else if(data)
			{
				url = data;
			}
		var query = new Array;
		query['type'] = 'GET';
		query['url'] = url;
		query['data'] = '';
		query['event_handle_start'] = event_handle_start;
		query['event_handle_succ'] = event_handle_succ;
		query['event_handle_fail'] = event_handle_fail;
		this.queue.push(query);
		if (!this.timer)
			{
				this.queueproc();
			}
	}
	//fe
this.request = function (query)
	{
	var self = this;
	if(query.event_handle_start)query.event_handle_start();
	HTTP.abort();
	HTTP.open(query.type, query.url, true);
	if (query.type == 'POST')
		HTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	HTTP.onreadystatechange = function()
		{
		if (HTTP.readyState == 4)
			{
			try
				{
				if (HTTP.status < 400)
					query.event_handle_succ(HTTP.responseText,HTTP.getAllResponseHeaders());
				else
					query.event_handle_fail(HTTP.status,HTTP.getAllResponseHeaders());
				self.inuse=false
				}
			catch (e)
				{
				self.inuse=false
				}
			}
		};
		//fe
	HTTP.send(query.data);
	}
	//fe
this.muti_get = function(q,onstart,onsucc,onfail)
	{
		if (q[0])
			{
				if (q[1])
					{
						var self = this;
						var q1 = q.shift();
						httpDataGetter.get( q1, '', onstart, onsucc, function(){self.muti_get(q,onstart,onsucc,onfail)});
					}
				else
					{
						httpDataGetter.get( q[0], '', onstart, onsucc, onfail);
					}
			}
	}
	//fe
this.syncget = function(url)
{
HTTP.abort();
HTTP.open('GET', url, false)
HTTP.send('');
return(HTTP.responseText);
}
//fe

//id : the iframe id
//d: document.domain
//u: url array
//h: success handler, return true to exit, return false to try next url
//hf: all fail(no url) handler
this.iframe_muti_get = function(id,d,u,h,hf)
{
if (document.domain != d)
	{
	document.domain = d
	}
if (typeof(u)=='string')  u = new Array(u)
if (document.getElementById(id))
	{
	document.body.removeChild(document.getElementById(id))
	}

var self = this;
var handler = function(){
	var i = document.getElementById(id)
	if (i.readyState && i.readyState!='complete')
		{
		return;
		}
	var e
	try {if(i.contentWindow.document){}} catch (e){i=false}
	try {if(i.contentDocument){}} catch (e){i=false}
	if(i)
		{
		if (i.contentWindow)
			{
			i=i.contentWindow.document;
			}
		else if (i.contentDocument)
			{
			i=i.contentDocument;
			}
		if (h(i.body.innerHTML))
			{
			//document.body.removeChild(document.getElementById(id))
			return true
			}
		}
	u.shift();
	if (u.length)
		{
		self.iframe_muti_get(id,d,u,h,hf)
		return
		}
	else
		{
		//document.body.removeChild(document.getElementById(id))
		hf();
		return false
		}
	}
var x = document.createElement('iframe')
x.id = id
x.style.display='none'
document.body.appendChild(x)
x.onload = handler
x.onreadystatechange = handler

x.src= u[0]
}//fe


//u: url array
//h: success handler, return true to exit, return false to try next url
//hf: all fail(no url) handler
this.script_muti_get_cache = new Array;
this.script_muti_get_list = new Array;
window.script_muti_get_var_store = null;
this.script_muti_get_waiting = false;
this.script_muti_get_set_costom_value = function(v)
{
window.script_muti_get_var_store = v;
}
this.script_muti_get = function(u,h,hf,c,cN)
{
var self = this;
if (typeof(u)=='string')  u = new Array(u)
u = new Array(u,h,hf,c,cN)
this.script_muti_get_list.push(u)
if (this.script_muti_get_list.length && !this.script_muti_get_waiting)
	{
	this.script_muti_get_waiting = window.setTimeout(function(){self.script_muti_get_act()},500)
	}
}
//fe
this.script_muti_get_act = function(u,h,hf,c,cN)
{
this.script_muti_get_waiting = false
var self = this;
if (!u)
	{
	if (this.script_muti_getting)
		{
		this.script_muti_get_waiting = window.setTimeout(function(){self.script_muti_get_act()},500)
		return
		}
	else
		{
		if (this.script_muti_get_list.length)
			{
			this.script_muti_getting = true
			u = this.script_muti_get_list.pop()
			h = u[1]
			hf = u[2]
			c = u[3]
			cN = u[4]
			u = u[0]
			if (this.script_muti_get_list.length && !this.script_muti_get_waiting)
				{
				this.script_muti_get_waiting = window.setTimeout(function(){self.script_muti_get_act()},500)
				}
			}
		else
			{
			return
			}
		}
	}
var handler = function(){
	if (self.script_muti_get_script_obj.readyState && self.script_muti_get_script_obj.readyState != 'loaded' && self.script_muti_get_script_obj.readyState != 'complete')
		{
		return
		}
	if (cN)
		window.script_muti_get_var_store = window[cN];
	if (h(window.script_muti_get_var_store))
		{
		self.script_muti_get_cache[self.script_muti_get_script_obj.src.toLowerCase()]=self.clone(window.script_muti_get_var_store)
		self.script_muti_getting = false
		return true
		}
	u.shift();
	if (u.length)
		{
		self.script_muti_get_act(u,h,hf,c,cN)
		return
		}
	else
		{
		hf();
		self.script_muti_getting = false
		return
		}
	}
if (u[0].indexOf('http://')==-1) var cachekey = window.location.href.replace(/(http:\/\/.+?)(\/|$).*/,'$1')+u[0];
else var cachekey = u[0];
if (this.script_muti_get_cache[cachekey.toLowerCase()])
	{
	h(this.script_muti_get_cache[cachekey.toLowerCase()]);
	this.script_muti_getting = false
	return;
	}
if (this.script_muti_get_script_obj)
	{
	document.body.removeChild(this.script_muti_get_script_obj)
	}
this.script_muti_get_script_obj = document.createElement('script');
if (c) this.script_muti_get_script_obj.charset = c;
this.script_muti_get_script_obj.type = 'text/javascript'
this.script_muti_get_script_obj.onerror = this.script_muti_get_script_obj.onload = this.script_muti_get_script_obj.onreadystatechange = handler
window.script_muti_get_var_store = null;
if(cN)window[cN]=null
this.script_muti_get_script_obj.src= u[0]
document.body.insertBefore(this.script_muti_get_script_obj,document.body.firstChild)
}//fe


this.clone = function(obj){
if(obj == null || typeof(obj) != 'object')
	return obj;

var temp = new obj.constructor(); // changed (twice)
for(var key in obj)
	temp[key] = this.clone(obj[key]);

return temp;
}



}
//ce


var HTTP = new http_obj();
var httpDataGetter = new http_data_getter('httpDataGetter');