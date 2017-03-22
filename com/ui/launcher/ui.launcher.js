scalar.ui.launcher = function () {
  this.config = scalar.ui.launcher.config;
  scalar.exec('cd com/bash && bash applicationList.sh', function (output) {
    output = '[' + output.slice(0, output.length - 2) + ']';
    window.asd = eval(output);
    for (var i = 1; i < window.asd.length-2; i++) {
     /* scalar.ui.append('#scroll-tab-'+i, scalar.ui.createElement('div', { 'class': 'mdl-gird s'+i}));
      scalar.ui.append('.mdl-gird.s'+i, scalar.ui.createElement('div', { 'class': 'mdl-cell mdl-cell--1-col s'+i}));
      document.querySelector('.mdl-cell.mdl-cell--1-col.s'+i).innerHTML=window.asd[i].title;*/
      /*document.querySelector("a[href='#scroll-tab-"+i+"']").innerHTML=window.asd[i].title.slice(0,15)+"...";
      console.log(window.asd[i].title)*/
    }
  });
};

scalar.ui.launcher.config = {

};
scalar.ui.launcher.prototype = {

};



scalar.ui.launcher = new scalar.ui.launcher();

function getNews(url, config) {
    this.xml = new XMLHttpRequest();
    this.xml.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        try {
          this.config = {
            'TITLE': config.TITLE || "",
            'DESCRIPTION': config.DESCRIPTION || "",
            'URL': config.URL || "",
            'AUTHOR': config.AUTHOR || "",
            'IMAGE': config.IMAGE || ""
          };
          window.scalarConfig.COUNTER = window.scalarConfig.COUNTER + 1;
          window.news=[];
          for (var i = 2; i <  window.scalarConfig.NEWS.COUNT + 2; i++) {
            window.news.push({
              'TITLE': this.responseXML.getElementsByTagName(this.config.TITLE)[i] ? decodeURIComponent(this.responseXML.getElementsByTagName(this.config.TITLE)[i].childNodes[0].nodeValue) : "",
              'DESCRIPTION': this.responseXML.getElementsByTagName(this.config.DESCRIPTION)[i] ? decodeURIComponent(this.responseXML.getElementsByTagName(this.config.DESCRIPTION)[i].childNodes[0].nodeValue) : "",
              'URL': this.responseXML.getElementsByTagName(this.config.URL)[i] ? decodeURIComponent(this.responseXML.getElementsByTagName(this.config.URL)[i].childNodes[0].nodeValue) : "",
              'IMAGE': this.responseXML.getElementsByTagName(this.config.IMAGE)[i] ? decodeURIComponent(this.responseXML.getElementsByTagName(this.config.IMAGE)[i].childNodes[0].nodeValue) : ""
            });

          }
          
        } catch (err) {
          scalar.log.error.push(err);
        }
      }
    }
    this.xml.open("GET", url, true);
    this.xml.send();
  }
  window.scalarConfig = {
  NEWS: {
    COUNT: 24,
    POINTER: 0,
    XML_POINTER: 0,
    RELOAD: 60000 ,
    SLIDER: {
      LEN: 410,
      TIME: 6000 * 10,
    }
  },
  COUNTER: 0
}
a={
  "SOURCE": "http://www.fotomac.com.tr/rss/Futbol.xml",
  "CONFIG": {
    "TITLE": "title",
    "DESCRIPTION": "description",
    "URL": "link",
    "RELOAD": 60000
  }
}
try {
getNews(a.SOURCE,a.CONFIG);
  var strVar="";
        strVar += "<div class=\"mdl-grid colour\">";
        strVar += "<\/div>";
        scalar.ui.append('#scroll-tab-1 .page-content',strVar);
var waitNews=setInterval(function() {
  if(window.news) {
    for(var i=0;i<news.length;i++) {
      if(i % 3 === 0) {
        var strVar="";
        strVar += "<div class=\"mdl-cell mdl-cell--4-col scalar-news\">";
        strVar += "<div class=\"scalar-news-image\">";
        strVar += "  <img src=\"http:\/\/www.logomuz.com\/dosyalar\/resim\/fotomac-gazetesi-1284482427.jpg\">";
        strVar += "<\/div>";
        strVar += "";
        strVar += "<h5 class=\"scalar-news-title\">"+news[i].TITLE+"<\/h5>";
        strVar += news[i].DESCRIPTION;
        strVar += "<\/div><\/div>";
        scalar.ui.append('#scroll-tab-1 .page-content:last-child .mdl-grid.colour',strVar);
      }else {
        var strVar="";
        strVar += "<div class=\"mdl-grid colour\">";
        strVar += "<\/div>";
        scalar.ui.append('.page-content',strVar);
        var strVar="";
        strVar += "<div class=\"mdl-cell mdl-cell--4-col scalar-news\">";
        strVar += "<div class=\"scalar-news-image\">";
        strVar += "  <img src=\"http:\/\/www.logomuz.com\/dosyalar\/resim\/fotomac-gazetesi-1284482427.jpg\">";
        strVar += "<\/div>";
        strVar += "";
        strVar += "<h5 class=\"scalar-news-title\">"+news[i].TITLE+"<\/h5>";
        strVar += "<div class=\"scalar-news-detail\">";
        strVar += news[i].DESCRIPTION;
        strVar += "<\/div><\/div>";
        scalar.ui.append('#scroll-tab-1 .page-content:last-child .mdl-grid.colour',strVar);
      }
   
    }
    clearInterval(waitNews);
  }
},1000);
}catch(err) {
  window.err=err;
}
try {
scalar.exec("cd /usr/share/applications/ && grep -e 'Exec=*' * | awk '{ print $1 "+'"'+"|"+'"'+" }'"
,function(output) {
  window.appResult=output.split("|");
});
  var strVar="";
        strVar += "<div class=\"mdl-grid colour\">";
        strVar += "<\/div>";
        scalar.ui.append('#scroll-tab-5 .page-content',strVar);
var waitApp=setInterval(function() {
  if(window.appResult) {
    for(var i=0;i<appResult.length;i++) {
      if(appResult[i].indexOf("Exec=") < 0) {
        continue;
      }
      if(i % 3 === 0) {
        var strVar="";
        strVar += "<div class=\"mdl-cell mdl-cell--2-col scalar-apps\" id="+i+">";
        strVar += "<div class=\"scalar-news-image\">";
        strVar += "  <img src=\"Parallels Desktop.png\">";
        strVar += "<\/div>";
        strVar += "<h5 class=\"scalar-news-title\">"+appResult[i].split("Exec=")[1].split("/").slice(-1)[0].toLocaleUpperCase()+"<\/h5>";
        strVar += "<\/div>";
        scalar.ui.append('#scroll-tab-5 .page-content:last-child .mdl-grid.colour',strVar);
      }else {
        var strVar="";
        strVar += "<div class=\"mdl-grid colour\">";
        strVar += "<\/div>";
        scalar.ui.append('.page-content',strVar);
        var strVar="";
        strVar += "<div class=\"mdl-cell mdl-cell--2-col scalar-apps\" id="+i+">";
        strVar += "<div class=\"scalar-news-image\">";
        strVar += "  <img src=\"Parallels Desktop.png\">";
        strVar += "<\/div>";
        strVar += "";
        strVar += "<h5 class=\"scalar-news-title\">"+appResult[i].split("Exec=")[1].split("/").slice(-1)[0].toLocaleUpperCase()+"<\/h5>";
        strVar += "<\/div>";
        scalar.ui.append('#scroll-tab-5 .page-content:last-child .mdl-grid.colour',strVar);
      }
   
    }
    for(var i=0;i<document.querySelectorAll(".scalar-apps").length;i++) {
document.querySelectorAll(".scalar-apps")[i].onclick=function() {
  window.scalarAppOpen(this.id);
};
};
window.scalarAppOpen=function(array_index) {
  scalar.exec(window.appResult[array_index].split("Exec=")[1].split("/").slice(-1)[0],function() {});
};
    clearInterval(waitApp);
  }
},1000);

}catch(err) {window.err=err;}
