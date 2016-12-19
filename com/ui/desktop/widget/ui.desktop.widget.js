scalar.ui.desktop.widget = function() {
  this.config = scalar.ui.desktop.widget.config;
  this.list = new Object();
  this.config.NEWSCONFIG = new Array();

  scalar.ui.append('#desktop', scalar.ui.createElement('div', {
    'id': 'widget-container'
  }));

  scalar.ui.append('#widget-container', scalar.ui.createElement('div', {
    'id': 'widget-0',
    'class': 'content'
  }));
  scalar.ui.append('#widget-container', scalar.ui.createElement('div', {
    'id': 'widget-1',
    'class': 'content'
  }));

  scalar.ui.append('#widget-container', scalar.ui.createElement('div', {
    'id': 'widget-2',
    'class': 'content'
  }));
  scalar.ui.append('#widget-0', scalar.ui.createElement('h1'));
  scalar.ui.select('#widget-0 h1').innerHTML = "Haberler";
  scalar.ui.append('#widget-0', scalar.ui.createElement('ul'));
  scalar.exec('cd com/ui/desktop/widget && for f in *list.json;do grep . $f ;done', function(output) {
    scalar.ui.select('#widget-0 ul').innerHTML = "";
    scalar.ui.desktop.widget.list = JSON.parse(output);
    for (i = 0; i < scalar.ui.desktop.widget.list.SOURCE.length; i++) {
      scalar.exec('cd com/ui/desktop/widget && for f in ' + scalar.ui.desktop.widget.list.SOURCE[i] + ';do grep . $f ;done', function(output) {
        scalar.ui.desktop.widget.config.NEWSCONFIG.push(JSON.parse(output));
        for (j = scalar.ui.desktop.widget.config.NEWSCONFIG.length - 1; j < scalar.ui.desktop.widget.config.NEWSCONFIG.length; j++) {
          scalar.ui.desktop.widget.getNews(scalar.ui.desktop.widget.config.NEWSCONFIG[j].SOURCE, scalar.ui.desktop.widget.config.NEWSCONFIG[j].CONFIG);

        }
      });
    }
    setInterval(function() {
      scalar.ui.select('#widget-0 ul').innerHTML = "";
      scalar.ui.desktop.widget.list = JSON.parse(output);
      for (i = 0; i < scalar.ui.desktop.widget.list.SOURCE.length; i++) {
        scalar.exec('cd com/ui/desktop/widget && for f in ' + scalar.ui.desktop.widget.list.SOURCE[i] + ';do grep . $f ;done', function(output) {
          scalar.ui.desktop.widget.config.NEWSCONFIG.push(JSON.parse(output));
          for (j = scalar.ui.desktop.widget.config.NEWSCONFIG.length - 1; j < scalar.ui.desktop.widget.config.NEWSCONFIG.length; j++) {
            scalar.ui.desktop.widget.getNews(scalar.ui.desktop.widget.config.NEWSCONFIG[j].SOURCE, scalar.ui.desktop.widget.config.NEWSCONFIG[j].CONFIG);

          }
        });
      }
    }, scalar.ui.desktop.widget.config.NEWS.RELOAD);
  });
}

scalar.ui.desktop.widget.prototype = {
  getNews: function(url, config) {
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
          scalar.ui.desktop.widget.news = new Array();
          scalar.ui.desktop.widget.config.COUNTER = scalar.ui.desktop.widget.config.COUNTER + 1;

          for (var i = 2; i < scalar.ui.desktop.widget.config.NEWS.COUNT + 2; i++) {
            scalar.ui.desktop.widget.news.push({
              'TITLE': this.responseXML.getElementsByTagName(this.config.TITLE)[i] ? this.responseXML.getElementsByTagName(this.config.TITLE)[i].childNodes[0].nodeValue : "",
              'DESCRIPTION': this.responseXML.getElementsByTagName(this.config.DESCRIPTION)[i] ? this.responseXML.getElementsByTagName(this.config.DESCRIPTION)[i].childNodes[0].nodeValue : "",
              'URL': this.responseXML.getElementsByTagName(this.config.URL)[i] ? this.responseXML.getElementsByTagName(this.config.URL)[i].childNodes[0].nodeValue : "",
              'IMAGE': this.responseXML.getElementsByTagName(this.config.IMAGE)[i] ? this.responseXML.getElementsByTagName(this.config.IMAGE)[i].childNodes[0].nodeValue : ""
            });
          }

          for (k = 0; k < scalar.ui.desktop.widget.news.length; k++) {
            scalar.ui.append('#widget-0 ul', scalar.ui.createElement('li', {
              'id': 'li-' + k + '-' + scalar.ui.desktop.widget.config.COUNTER
            }));
            scalar.ui.append('#widget-0 ul #li-' + k + '-' + scalar.ui.desktop.widget.config.COUNTER, scalar.ui.createElement('a', {
              'href': "" + scalar.ui.desktop.widget.news[k].URL,
              'target': '_blank'
            }));
            scalar.ui.append('#widget-0 ul #li-' + k + '-' + scalar.ui.desktop.widget.config.COUNTER + ' a', scalar.ui.desktop.widget.news[k].TITLE);
            scalar.ui.desktop.widget.news[k].IMAGE ? scalar.ui.append('#widget-0 ul #li-' + k + '-' + scalar.ui.desktop.widget.config.COUNTER, scalar.ui.createElement('div')) : false;
            scalar.ui.desktop.widget.news[k].IMAGE ? scalar.ui.append('#widget-0 ul #li-' + k + '-' + scalar.ui.desktop.widget.config.COUNTER + ' div', scalar.ui.createElement('img', {'src': scalar.ui.desktop.widget.news[k].IMAGE})) : false;
            scalar.ui.append('#widget-0 ul #li-' + k + '-' + scalar.ui.desktop.widget.config.COUNTER, scalar.ui.createElement('p'));
            scalar.ui.append('#widget-0 ul #li-' + k + '-' + scalar.ui.desktop.widget.config.COUNTER + ' p', scalar.ui.desktop.widget.news[k].DESCRIPTION);
          }


        } catch (err) {
          scalar.log.error.push(err);
        }
      }
    }
    this.xml.open("GET", url, true);
    this.xml.send();
  }
}
scalar.ui.desktop.widget.config = {
  NEWS: {
    COUNT: 20,
    RELOAD: 6000 * 10
  },
  COUNTER: 0
}
scalar.ui.desktop.widget = new scalar.ui.desktop.widget();