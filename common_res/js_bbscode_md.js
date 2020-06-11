;(function(){

var state = {};

function trans_bidel(line) {
  line = line.replace(/\*\*\*(.+?)\*\*\*/g, "[b][i]$1[/i][/b]");
  line = line.replace(/\*\*(.+?)\*\*/g, "[b]$1[/b]");
  line = line.replace(/\*(.+?)\*/g, "[i]$1[/i]");
  line = line.replace(/~~(.+?)~~/g, "[del]$1[/del]");
  return line;
}

function trans_head(line) {
  var p = /^(#+) ([^#]*)(#+$)?/;
  var r = line.match(p);
  if (!r) return line;

  switch(r[1].length){
    case 1:
      return "[h][b][size=160%]" + r[2] + "[/size][/b][/h]"
    case 2:
      return "[h][b][size=140%]" + r[2] + "[/size][/b][/h]"
    case 3:
      return "[h][b][size=120%]" + r[2] + "[/size][/b][/h]"
    case 4:
      return "[h][b]" + r[2] + "[/b][/h]"
    case 5:
      return "[h][b][color=gray]" + r[2] + "[/color][/b][/h]"
    default:
      return "[h][b][color=silver]" + r[2] + "[/color][/b][/h]"
    }
}

function trans_image(line) {
  return line.replace(/!\[(?:.*?)\]\(([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?)\)/g, '[img]$1[/img]');
}

function trans_url(line) {
  return line.replace(/\[(.*?)\]\(([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?)\)/g, '[url=$2]$1[/url]');
}

function trans_code(line) {
line = line.replace(/^(\s*)```((\w*)?)/, function($0,$1,$2){
  if(state.code){
    state.code=0
    return $1+'[/code]'
    }
  else if(state.code==0 && state.code2==0){
    state.code=1
    return $1+'[code='+$2+']'
    }
  else
    return $0
  });
if(state.code)
  line+='\x00'
return line;
}//

function trans_code2(line) {
if(state.code==0 && state.code2==0 && state.lo.tab){
  if(state.plo.len==0 && !state.pplo.dot && state.pplo.tab<state.lo.tab){
    state.code2=state.lo.tab
    line = '[code]'+ state.lo.taborg+line+'\x00'
    state.lo.taborg=''
    }
  }
else if(state.code2){
  if(state.lo.tab<state.code2){
    state.code2=0
    state.plt+= '[/code]\x00\x00'
    }
  else{
    line = state.lo.taborg+line+'\x00'
    state.lo.taborg=''
    }
  }
return line;
}//

/*
function handle_eof() {
  var new_line = "";

  while (state["level"]["list"][state["level"]["list"].length - 1] > 0) {
    state["level"]["list"].pop();
    new_line += " ".repeat(Math.max(state["level"]["list"][state["level"]["list"].length - 1], 0));
    new_line += '[/list]\n';
  }

  return new_line;
}*/

function addtab(j){
t=''
for(var i=0;i<j;i++)
  t+="&emsp;&emsp;"
return t
}//

function addbr(j){
  t=''
  for(var i=0;i<j;i++)
    t+="<br />"
  return t
  }//



function trans_tab(line, lo){

line = line.replace(/^\s*/,function(m){
  lo.taborg=m
  lo.tab= Math.ceil(m.length/4)//
  return ''
  })
lo.len=line.length
return line
}//

function trans_list(line, lo){
var d=0

line = line.replace(/^([*\-+]|\d+ )/,function(m){
  d=1
  return (lo.tab&1)?'&#9675; ':'&#9679; '
  })

lo.dot=d

return line

}//



/*
function trans_list(line) {
  line = line.replace(/^(\s*)\d+\./, function($0,$1){return $1+'-'});
  p = /^((\s+)?)[-+*]/; // $1: level

  var r = line.match(p);
  if (!line.trim()) return line;

  if (!r) {
    if (state["level"]["list"][state["level"]["list"].length - 1] == 0) return line;
    return handle_eof() + line;
  }

  var list_level = r[1].length + 6; // add 2 cuz 0 for no list

  var len = state["level"]["list"].length;
  var new_line = " ".repeat(state["level"]["list"][len - 1]); // start offset

  if (list_level > state["level"]["list"][len - 1]) {
    // new list start
    state["level"]["list"].push(list_level);
    new_line += "[list]" + line.replace(p, '[*]');
  } else if (list_level == state["level"]["list"][-1]) {
    //list same level
    new_line += line.replace(p, '[*]');
  } else {
    // list back level
    new_line = "";

    while (state["level"]["list"][state["level"]["list"].length - 1] > list_level) {
      state["level"]["list"].pop();
      new_line += " ".repeat(Math.max(state["level"]["list"][state["level"]["list"].length - 1], 0)) + "[/list]\n"; // end offset
    }

    new_line += " ".repeat(state["level"]["list"][state["level"]["list"].length - 1]) + line.replace(p, '[*]');
  }

  return new_line;
}*/

function trans_table(lines) {
  var result = "";
  var origin = lines;
  var length = origin.length;

  for (var i = 0; i < length; i++) {
    if (i + 1 < length && origin[i].startsWith("|") && origin[i].endsWith("|") && origin[i + 1].startsWith("|") && origin[i + 1].endsWith("|") && !/[^\s\|\-\:]/.test(origin[i + 1]) && origin[i + 1].match(/(?<!\\)\|/g).length === origin[i].match(/(?<!\\)\|/g).length) {
      var tablecode = origin[i] + "\n" + origin[i + 1];
      i++;

      for (var j = i + 1; j < length; j++) {
        if (origin[j].startsWith("|") && origin[j].endsWith("|")) {
          tablecode += "\n" + origin[j];
          i = j;
        } else {
          break;
        }
      }

      result += "\n" + trans_table_gen(tablecode);
    } else {
      result += "\n" + origin[i];
    }
  }

  return result.trim().split("\n");
}

function trans_table_gen(tablecode) {
  var trh,
      trd = [];
  var align = [];
  var tablecodelines = tablecode.split(/\n/);
  var delimiterrow = tablecodelines.splice(1, 1);
  delimiterrow[0].substring(1, delimiterrow[0].length - 1).split(/(?<!\\)\|/).map(function (str) {
    return str.trim();
  }).forEach(function (delimiter) {
    var alignside = null;

    if (delimiter.startsWith(":")) {
      alignside = "left";
    }

    if (delimiter.endsWith(":")) {
      if (alignside === "left") {
        alignside = "center";
      } else {
        alignside = "right";
      }
    }

    align.push(alignside);
  });
  tablecodelines.forEach(function (code, index) {
    var split = code.substring(1, code.length - 1).split(/(?<!\\)\|/).map(function (str) {
      return str.trim();
    });
    split.splice(align.length);

    while (split.length < align.length) {
      split.push("");
    }

    if (index === 0) {
      trh = split.map(function (s, i) {
        var base = s;

        if (align[i] !== null) {
          base = "[align=" + align[i] + "]" + s + "[/align]";
        }

        return "[td][b]" + base + "[/b][/td]";
      }).join("");
    } else {
      trd.push(split.map(function (s, i) {
        var base = s;

        if (align[i] !== null) {
          base = "[align=" + align[i] + "]" + s + "[/align]";
        }

        return "[td]" + base + "[/td]";
      }).join(""));
    }
  });
  return "[table]\n[tr]" + trh + "[/tr]\n[tr]" + trd.join("[/tr]\n[tr]") + "[/tr]\n[/table]";
}


function explode(text){
var x = text.split(/<br\s*\/?>/g)
,z=[]
,y = function(z){
  z = z.replace(/^\s*/,function(m){
    lo.tabo=m
    lo.tab= Math.ceil(m.length/4)//
    return ''
    })
  this.txt=z
  }
y.prototype = {
  toString:function(){return this.txt},
  txt:'',
  dot:0,
  tab:0,
  tabo:'',
  root:z
  }
for(var i=0;i<x.length;i++){
  z.push(new y(x[i]))
  }
for(var i=0;i<z.length;i++){
  z[i].next = z[i+1]
  z[i].prev = z[i-1]
  }
}//

function md2nga(text) {
  var lines = trans_table(  text.split(/<br\s*\/?>/g)  )
  , lotpl = function(x){if(x)this.len=x.length}

  lotpl.prototype = {dot:0,tab:0,len:0,taborg:''}


  state = {
    trans:[],
    code: 0,
    code2:0,
    lopt:[
 
      ],
    set lt(t){this.trans[this.trans.length-1]=t},
    set plt(t){this.trans[this.trans.length-2]=t},
    get plt(){return this.trans[this.trans.length-2] ? this.trans[this.trans.length-2] : ''},
    get lo(){return this.lopt[this.lopt.length-1]},
    get plo(){return this.lopt[this.lopt.length-2] ? this.lopt[this.lopt.length-2] : new lotpl()},
    get pplo(){return this.lopt[this.lopt.length-3] ? this.lopt[this.lopt.length-3] : new lotpl()}
  };

  for (var idx in lines) {
    var line = lines[idx]

    state.lopt.push(new lotpl())
    state.trans.push('');

    line = trans_code(line);

    line = trans_tab(line,state.lo);

    line = trans_code2(line);

    if (state.code == 0 && state.code2==0) {
      
      line = trans_bidel(line);
      line = trans_head(line);
      line = trans_list(line,state.lo);
      line = trans_image(line);
      line = trans_url(line);

    }

    state.lt=line

  }
 
  if (state.code) {
    state.code = 0
    state.trans.push('[/code]')
    state.lopt.push(new lotpl('[/code]'))
  }
  if (state.code2) {
    state.code2 = 0
    state.trans.push('[/code]')
    state.lopt.push(new lotpl('[/code]'))
  }

  var it=0, lopt=state.lopt

  for(var i=0;i<state.trans.length;i++){
    var lo = lopt[i] , pf=''
    if(lo.dot){
      if(it){
        it--
        pf+='</div>\x00\x00'
        }
      pf+="<div class='inlineBlock' style='margin-left:"+(lo.tab*2)+"em'>";
      it++
      }
    else if(lo.tab){
      if(it && (lopt[i-1].dot || lopt[i-1].tab!=lo.tab)){
        it--
        pf+='</div>\x00\x00'
        }
      if(lopt[i-1].tab!=lo.tab){
        pf+="<div class='inlineBlock' style='margin-left:"+(lo.tab*2)+"em'>";
        it++
        }
      }
    else{
      if(it){
        it--
        pf+='</div>\x00\x00'
        }
      }
    state.trans[i] = pf+state.trans[i]
    }

  for(var i=0;i<it;i++)
    trans.push('</div>')

  var x = state.trans.join("\x00")
  
  x = x.replace(/\x00+/g,function($0){
    var j = $0.length
    if(j>2)
      return addbr(j-2)
    else if(j==2)
      return addbr(j-1)
    else
      return ''
    })
    console.log(x)
  return x
}


if(ubbcode)
    ubbcode.md2bbscode = function(x){return md2nga(x)}


})();