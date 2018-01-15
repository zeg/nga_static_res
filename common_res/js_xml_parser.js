function level10XmlLikeDataParser()
{
this.data = new Array;
this.xml2Array = xml2Array;
this.addLevel = addLevel;
this.addData = addData;
this.trim = trim;
this.array2Html = array2Html;
this.pattern1 = new RegExp('<\\s*/','g');
this.pattern2 = new RegExp('>|</');
this.pattern3 = new RegExp('^\\s+|\\s+$/','g');
}
//fe


function xml2Array(t)
{
t = t.replace(this.pattern1,'<</');
t = t.split(this.pattern2);
var nowKey = new Array;
this.data = new Array;
for (var k in t)
	{
		t[k] = this.trim(t[k]);
		if (t[k].substr(0,1) == '<')
			{
				if (t[k] == '<')
					{
						continue;
					}
				nowKey.push(this.trim(t[k].substr(1)));
				this.addLevel(nowKey);
			}
		else if (t[k]=='' || t[k].substr(t[k].length-1,1) == '<')
			{
				this.addData(nowKey,this.trim(t[k].substr(0,t[k].length-1)));
			}
		else
			{
				nowKey.pop();
			}
	}
return (this.data);
}
//fe

function addLevel(k)
{
switch (k.length)
	{
		case 1:
			this.data[k[0]] = new Array;
			break;
		case 2:
			this.data[k[0]][k[1]] = new Array;
			break;
		case 3:
			this.data[k[0]][k[1]][k[2]] = new Array;
			break;
		case 4:
			this.data[k[0]][k[1]][k[2]][k[3]] = new Array;
			break;
		case 5:
			this.data[k[0]][k[1]][k[2]][k[3]][k[4]] = new Array;
			break;
		case 6:
			this.data[k[0]][k[1]][k[2]][k[3]][k[4]][k[5]] = new Array;
			break;
		case 7:
			this.data[k[0]][k[1]][k[2]][k[3]][k[4]][k[5]][k[6]] = new Array;
			break;
		case 8:
			this.data[k[0]][k[1]][k[2]][k[3]][k[4]][k[5]][k[6]][k[7]] = new Array;
			break;
		case 9:
			this.data[k[0]][k[1]][k[2]][k[3]][k[4]][k[5]][k[6]][k[7]][k[8]] = new Array;
			break;
		case 10:
			this.data[k[0]][k[1]][k[2]][k[3]][k[4]][k[5]][k[6]][k[7]][k[8]][k[9]] = new Array;
			break;
		case 11:
			this.data[k[0]][k[1]][k[2]][k[3]][k[4]][k[5]][k[6]][k[7]][k[8]][k[9]][k[10]] = new Array;
			break;
	}
}
//fe

function addData(k,newdata)
{
switch (k.length)
	{
		case 1:
			this.data[k[0]] = newdata;
			break;
		case 2:
			this.data[k[0]][k[1]] = newdata;
			break;
		case 3:
			this.data[k[0]][k[1]][k[2]] = newdata;
			break;
		case 4:
			this.data[k[0]][k[1]][k[2]][k[3]] = newdata;
			break;
		case 5:
			this.data[k[0]][k[1]][k[2]][k[3]][k[4]] = newdata;
			break;
		case 6:
			this.data[k[0]][k[1]][k[2]][k[3]][k[4]][k[5]] = newdata;
			break;
		case 7:
			this.data[k[0]][k[1]][k[2]][k[3]][k[4]][k[5]][k[6]] = newdata;
			break;
		case 8:
			this.data[k[0]][k[1]][k[2]][k[3]][k[4]][k[5]][k[6]][k[7]] = newdata;
			break;
		case 9:
			this.data[k[0]][k[1]][k[2]][k[3]][k[4]][k[5]][k[6]][k[7]][k[8]] = newdata;
			break;
		case 10:
			this.data[k[0]][k[1]][k[2]][k[3]][k[4]][k[5]][k[6]][k[7]][k[8]][k[9]] = newdata;
			break;
		case 11:
			this.data[k[0]][k[1]][k[2]][k[3]][k[4]][k[5]][k[6]][k[7]][k[8]][k[9]][k[10]] = newdata;
			break;
	}
}
//fe

function trim(str)
{
if (str)
	{
		str = str.replace(this.pattern3,'');
	}
else
	{
		str = '';
	}
return (str);
}
//fe

function array2Html(theObj)
{
var htmlData = '';
if(theObj.constructor == Array || theObj.constructor == Object)
	{
		htmlData = htmlData+"<ul>";
		for(var p in theObj)
			{
				if(theObj[p] && (theObj[p].constructor == Array || theObj[p].constructor == Object))
					{
						htmlData = htmlData + "<li>[" + p + "] => " + typeof(theObj) + "</li><ul>" + this.array2Html(theObj[p]) + "</ul>";
					}
				else
					{
						if (theObj[p])
							{
								htmlData = htmlData + "<li>[" + p + "] => " + theObj[p].toString.replace('<','&lt;').replace('>','&gt;') + "</li>";
							}
						else
							{
								htmlData = htmlData + "<li>[" + p + "] => " + theObj[p] + "</li>";
							}
					}
			}
		htmlData = htmlData + "</ul>";
	}
return htmlData
}
//fe