/**
 * NEVER TRUST SCALAR
 * @return {bool}
 */
scalar = function() {
  try {
    this.config = scalar.config;
    this.selector = scalar.selector;
    this.xml = scalar.xml;
    this.ui=scalar.ui;

    this.log = new Object();
    this.log.error = new Array();
    this.log.success = new Array();

    document.createElement(this.selector.DOCUMENT.HEAD);
    document.createElement(this.selector.DOCUMENT.BODY);
    this._init();

    this.log.success.push('Initialization complete : [../Scalar/com/core/core.js]');
    return true;
  } catch (e) {
    return false;
    this.log.error.push('Initialization rejected : [../Scalar/com/core/core.js]');
  }
}
scalar.prototype = {
  /**
   * Initialize com/core/init/core.init.js
   * @return {bool} 
   */
  _init: function() {
    try {
      this.htmlElement = document.createElement(this.config.INIT.ELEMENT);
      this.htmlElement.type = this.config.INIT.TYPE;
      this.htmlElement.src = this.config.INIT.SRC;
      document.head.appendChild(this.htmlElement);
      this.log.success.push('Initialization complete : [' + this.config.INIT.SRC + ']');
      return true;
    } catch (e) {
      this.log.error.push('Initialization rejected : [' + this.config.INIT.SRC + ']');
      return false;
    }
  },
  exec: function(command, callback) {
    exec(command, function(error, stdout, stderr) {
      callback(stdout);
    });
  }
}

scalar.config = {
  INIT: {
    ELEMENT: 'script',
    TYPE: "text/javascript",
    SRC: "../Scalar/com/core/init/core.init.js"
  }
}
scalar.selector = {
  DOCUMENT: {
    BODY: 'body',
    HEAD: 'head'
  }
}
scalar.xml = {
    fetch: function(xmlURL, config) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                scalarFetch(this, config);
            }
        }
        xhttp.open("GET", xmlURL, true);
        xhttp.send();

        function scalarFetch(xml, config) {
            try {
                window.configInner = {
                    'title': config.title,
                    'desc': config.desc,
                    'url': config.url,
                    'author': config.author
                };
                window.xmlObj = [];
                var xmlDoc = xml.responseXML;
                for (var i = 0; i < xmlDoc.getElementsByTagName(configInner.title).length; i++) {
                    xmlObj.push([{
                        'name': xmlDoc.getElementsByTagName(configInner.title)[i].childNodes[0].nodeValue,
                        'description': xmlDoc.getElementsByTagName(configInner.desc)[i].childNodes[0].nodeValue,
                        'link': xmlDoc.getElementsByTagName(configInner.url)[i].childNodes[0].nodeValue
                    }]);
                }
            } catch (err) {
                scalar.log.error.push(err);
            }
        }
    }
}
window.fetchExample=scalar.xml.fetch("http://www.fotomac.com.tr/rss/anasayfa.xml",{
'title':'title',
'desc':'description',
'url':'link',
'author':'fanatik'
});
window.scalar = new scalar();