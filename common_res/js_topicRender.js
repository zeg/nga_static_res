if (!commonui)commonui={}

commonui.genTopicList_1=function(d,readPrePage,subjectLengthMax,limit,linkTarget,titlePf,titleSf,noResult){
var html=new Array;
var liclass = "class='b1'";
var hot='';
var tid=0;
var title='';
var page='';
var titlefont=null;
var subject = '';
var date = '';
var url='';
if(!readPrePage)readPrePage=20
if(!linkTarget)linkTarget=''; else linkTarget=' target="'+linkTarget+'" '
if(!titlePf)titlePf='';
if(!titleSf)titleSf='';
if(!noResult)noResult='ÔÝÎÞÖ÷Ìâ'
var i =0;
for (var k in d)
	{
	if (limit && i==limit) break;
	if (!d[k]) continue;

	if(d[k].hot)hot=d[k].hot;

	if(d[k].quote_from)tid=d[k].quote_from; else tid=d[k].tid;

	subject = d[k].subject;

	if(subject.length>subjectLengthMax)
		{
		title=subject;
		subject=subject.substr(0,subjectLengthMax)+'...';
		}
	else title='';

	if(d[k].titlefont)
		{
		titlefont=d[k].titlefont.split("~");
		if(titlefont[0])subject="<span class='"+titlefont[0]+"'>"+subject+"</span>";
		if(titlefont[1])subject="<b>"+subject+"</b>";
		if(titlefont[2])subject="<i>"+subject+"</i>";
		if(titlefont[3])subject="<u>"+subject+"</u>";
		}
	else if (d[k].quote_from)
		subject="<b>"+subject+"</b>";

	page='';

	if (!d[k].pid && d[k].replies+1>readPrePage)
		{
		if ((d[k].replies+1)%readPrePage==0)
			var maxp=(d[k].replies+1)/readPrePage;
		else
			var maxp=Math.floor((d[k].replies+1)/readPrePage)+1;
		page+=" <span class='pager'>[ ";
		for (var j=1; j<=maxp; j++)
			{
			if (j==6)
				{
				page+=" ... <a style='color:gray' href='/read.php?tid="+tid+"&page="+maxp+"'"+linkTarget+">"+maxp+"</a>";
				break;
				}
			page+=" <a style='color:gray' href='/read.php?tid="+tid+"&page="+j+"'"+linkTarget+">"+j+"</a>";
			}
		page+=' ]</span>';
		}
	subject=subject.replace(/(\[.+?\])/g,'<span class="silver">$1</span>')

	if (commonui.time2date)
		date=commonui.time2date(d[k].postdate,'y-m-d H:i')
	else if (time2date)
		date=time2date(d[k].postdate,'y-m-d H:i')

	if (d[k].pid)url='/read.php?pid='+d[k].pid
	else url='/read.php?tid='+tid
	
	html.push("<li "+liclass+"><a class='topic' href='"+url+"' title='"+title+"'"+linkTarget+">"+titlePf+subject+titleSf+"</a><span class='subinfo block'><span class='right'><span class='pager'>"+page+"</span> <span class='date'>"+date+"</span></span><span class='author'> P:"+d[k].author+"</span><span class='replier'> R:"+d[k].lastposter+"</span></span></li>");
	i++;
	if (liclass=="class='b1'") liclass = "class='b2'";
	else liclass = "class='b1'";
	}
if (html.length)
	return '<ul>'+html.join('')+'</ul>';
else
	return '<ul><li '+liclass+'><a href="javascript:void(0)">'+noResult+'</a></li></ul>';
}//fe