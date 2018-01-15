function quotefromwiki_double_get(id,n,q1,q2,q3,r)
{
if (n && !q1)
	{
		var f = encodeURIComponent(n).replace(/%/g,'');
		var q1 = "ngaproxy/cache/httpwikingacncomindexphpuseskinnulltitle/" + f + ".html";
		var q2 = 'ngaproxy/ngaproxy.php?host='+ encodeURIComponent('wiki.ngacn.cc') +'&url=' + encodeURIComponent('index.php?useskin=null&title=')+'&key='+encodeURIComponent(n);
		if (Math.random()<0.001 || (r && !getCookie('refreshqfw')))
			{
				//try if wiki have update this entry
				q1 = q2;
				q2 = '';
				if (r)
					{
						setCookieInSecond('refreshqfw',1,960);
					}
			}
		quotefromwiki_double_get(id,n,q1,q2,q3);
	}
else if (q1)
	{
		var onsucc = function(txt){
					var date = new Date();

					var time = txt.match(/<!-- ngaproxy cache ([0-9]{10}) -->/);
					if (time && time[1])
						{
							if ((date.getTime()/1000-time[1])>86460)
								{
									date.setTime(time[1]*1000);
									time = refreshqfwlink(id,n,true);
								}
							else
								{
									date.setTime(time[1]*1000);
									time = refreshqfwlink(id,n,false);
								}
						}
					time = time+'<span class="xtxt limegreen">Cached at '+date.toLocaleString()+'</span>';
					txt = txt.split('<!-- ngawiki null skin content -->');
					if(txt[1])
						{
							txt = txt[1];
						}
					else
						{
							txt = txt[0];
						}
					txt = txt.replace(/(href|src)=['"]([^'"]+)['"]/gim,function($0,$1,$2){var c=$2;if(c.indexOf('http:')==-1){return " "+$1+"='http://wiki.ngacn.cc"+$2+"' "}else{return " "+$1+"='"+$2+"' "}});
					id2e(id).innerHTML=time+txt
					};
		var onstart1 = function(){id2e(id).innerHTML=refreshqfwlink(id,n,false)+'Loading Cache...'};
		var onstart2 = function(){id2e(id).innerHTML=refreshqfwlink(id,n,false)+'Loading Wiki...'};
		var onfail = function(txt){id2e(id).innerHTML=refreshqfwlink(id,n,false)+'Fail... '+txt};
		if (q2)
			{
				if (!q3)
					{
						q3 = '';
					}
				httpDataGetter.get( q1, '', onstart1, onsucc, function(){var evl = "quotefromwiki_double_get('"+id+"','"+n+"','" + q2.replace(/\'/g,"\\\'") + "','" + q3.replace(/\'/g,"\\\'") + "','')";window.setTimeout(evl,100);} );// don't ask me why need wait, ask the fucking firefox
			}
		else
			{
				httpDataGetter.get( q1, '', onstart2, onsucc, onfail);
			}
	}
}
//fe

function refreshqfwlink(id,n,r)
{
return "<a style='float:right;background:#FFF;border:1px solid #000;width:18px;line-height:19px;display:block;margin-bottom:-18px;font-size:16px;font-weight:bold;text-align:center;font-family:Webdings;color:limegreen' href='javascript:quotefromwiki_double_get(\""+id+"\",\""+n+"\",\"\",\"\",\"\","+r+")' title='Ë¢ÐÂ'>&#113;</a>"
}
//fe

function refreshqfw(id,n)
{
quotefromwiki_double_get(id,n)
}
//fe