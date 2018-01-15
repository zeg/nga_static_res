<!--
//--------------------------
//recommend post disp-------
//--------------------------
function recommend_posts_func(oname)
{
this.oname = oname;

this.loading = false;

this.show = function()
	{
	id2e('recommend').parentNode.parentNode.parentNode.style.display = 'block';
	id2e('openrecommend').style.display = 'none';
	}
	//fe

this.hide = function ()
	{
	id2e('recommend').parentNode.parentNode.parentNode.style.display = 'none';
	id2e('openrecommend').style.display = 'inline';
	}
	//fe

this.notshow = function()
	{
		this.hide()
		cookieFuncs.setMiscCookieInSecond('notdisprecommend',1,7200);
	}

this.reload = function ()
	{
	var self = this;
	if (this.loading)
		{
			return;
		}
	this.loading = true;
	httpDataGetter.get( 
		'recommend.html?'+Math.ceil(Math.random()*100),
		'',
		function (){},
		function (t){
			id2e('recommend').innerHTML = self.proctxt(t);
			self.show();
			self.loading = false;
		},
		function (t){
			if (cookieFuncs.getCookie('debug'))
				{
					window.alert('recommend load fail' + t);
				}
		}
	);
	this.show();
	}
	//fe

this.proctxt = function (t)
	{
	var newt = '';
	t = t.split(/<hr\/>/);
	t.pop();
	t.shift();
	for (k in t)
		{
			t[k]=t[k].replace(/\n/g,' ').replace(/<p>(.+?)<\/p>/gim,'');
			t[k]=t[k].replace(/<span>(.+?)<\/span>/gim,'');
			t[k]=t[k].replace(/<h3>(.+?)<\/h3>/gim,
				function($0,$1)
					{
						var x=$1;
						var x1 = cutstrbylen(x,20);
						if(x1 != x)
							{
								return(x1)+'¡­¡­';
							}
						else
							{
								return(x);
							}
					}
			);
			newt = newt+t[k];
		}
	return ("<div>"+newt+"</div>");
	}
	//fe

this.load = function ()
	{
	var self = this;
	if (!id2e('recommend'))
		{
			document.write("<a id='openrecommend' href='javascript:"+this.oname+".reload()' style='display:none;position:absolute;right:0px;'><img src='/image/nga_classic/good.gif' style='margin:3px'/></a><table style='display:none;position:absolute;right:1px;'><tr><td class='sqtl'></td><td class='sqt' style='vertical-align:bottom'><a href='javascript:"+this.oname+".notshow()' style='position:relative'>[¹Ø±Õ]</a> <a href='/recommend.html' target='_blank' style='position:relative'>[ÏêÏ¸]</a></td><td class='sqtr'></td></tr><tr><td class='sql'></td><td id='recommend'></td><td class='sqr'></td></tr><tr><td class='sqbl'></td><td class='sqb'></td><td class='sqbr'></td></tr></table>");
			self.hide();
		}
	if (!cookieFuncs.getMiscCookie('notdisprecommend'))
		{
			this.loading = true;
			httpDataGetter.get( 
				'recommend.html',
				'',
				function (){},
				function (t){
					var chsum = t.substr(t.length-35,32);
					if (chsum == cookieFuncs.getMiscCookie('recommendschecksum'))
						{
							//self.hide();
						}
					else
						{
							cookieFuncs.setMiscCookieInSecond('recommendschecksum',chsum,18000);
							id2e('recommend').innerHTML = self.proctxt(t);
							self.show();
							self.loading = false;
						}
				}, 
				function (t){
					if (cookieFuncs.getCookie('debug'))
						{
							window.alert('recommend load fail' + t);
						}
				}
			);
		}
	}
	//fe
}
//ce
-->