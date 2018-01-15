<!--
//--------------------------
//jsTemplates---------------
//--------------------------
function jsTemplates ()
{

this.templates = new Array;
this.additionalFunctions = new Object;
this.re = /\{\$([a-zA-Z0-9]+)\}/gm;

this.findChildByName = function(o,n)
{
if (!o.childNameArray)
	{
		o.childNameArray = new Array;
		var nn = '';
		if (o.getAttribute && o.getAttribute('name'))
			{
				nn = o.getAttribute('name');
				o.childNameArray[nn] = o;
			}
		this.getNameArray(o, o, nn);
	}
if (o.childNameArray[n])
	{
		return(o.childNameArray[n])
	}
}//fe

this.getNameArray = function(oo,o,n)
{
for (k in o.childNodes)
	{
		if (o.childNodes[k])
			{
				var nn = n;
				if (o.childNodes[k].getAttribute && o.childNodes[k].getAttribute('name'))
					{
						nn = n + o.childNodes[k].getAttribute('name');
						oo.childNameArray[nn] = o.childNodes[k];
					}
				if (o.childNodes[k].childNodes && o.childNodes[k].childNodes[0])
					{
						if (o.childNodes[k].childNameArray)
							{
								for (kk in o.childNodes[k].childNameArray)
									{
										oo.childNameArray[n + kk] = o.childNodes[k].childNameArray[kk]
									}
							}
						else
							{
								this.getNameArray(oo, o.childNodes[k], nn);
							}
					}
			}
	}
}//fe

this.applyTemplate = function(templateId,dataSourceId)
{
if (!this.templates[templateId])
	{
		this.templates[templateId] = document.getElementById(templateId).innerHTML;
	}
var d = dataSourceId;
if (typeof(dataSourceId) == 'string')
	{
		d = document.getElementById(dataSourceId);
	}
var self=this;
d.innerHTML = this.templates[templateId].replace(this.re,
		function($0,$1)
			{
				if (self.findChildByName(d,$1))
					{
						if (self.additionalFunctions[templateId])
							{
								if (self.additionalFunctions[templateId][$1])
									{
										return(self.additionalFunctions[templateId][$1](self.findChildByName(d,$1).innerHTML));
									}
							}
						return(self.findChildByName(d,$1).innerHTML);
					}
				else
					{
						return '';
					}
			}
		);
}//fe

}//ce
-->