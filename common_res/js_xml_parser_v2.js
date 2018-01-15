function AVSXmlParser()
{
this.xml2Array = function (x)
{
var t = new Array;
var nowKey = new Array;
var tmp = null;
this.data = new Array;
this.p = this.data ;
x = x.replace(/\r|\n|<\?xml.+?\?>/gi,'');
x = x.replace(/<(.+?)>/g,function($0,$1){t.push('\\'+$1)});
for (k in t)
	{
		//t[k] = this.trim(t[k]);
		f = t[k].substr(0,1);
		s = t[k].substr(1,1);
		e = t[k].substr(t[k].length-1,1);
		if (f == '\\' && s != '/')
			{
				nowKey.push(t[k].substr(1).split(' ')[0]);
				this.addLevel(nowKey);
			}
		if (t[k].indexOf('=')!=-1)
			{
				tmp = new Array;
				t[k] = t[k].replace(/\s(.+?)="(.*?)"/g,function($0,$1,$2){tmp[$1] = $2});
				t[k] = t[k].replace(/\s(.+?)='(.*?)'/g,function($0,$1,$2){tmp[$1] = $2});
				this.addData(tmp);
			}
		if (f != '\\')
			{
				this.addData(t[k]);
			}
		if (s == '/' || e == '/')
			{
				nowKey.pop();
			}
	}
return (this.data);
}
//fe


this.addLevel = function(k)
{
this.p = this.data ;
for (i=0;i< k.length; i++)
	{
		if (typeof(this.p[k[i]])=='undefined')
			{
				this.p[k[i]] = new Array;
			}
		this.p = this.p[k[i]];
	}

}
//fe

this.addData = function addData(newdata)
{
this.p.push(newdata);
}
//fe
}
//ce