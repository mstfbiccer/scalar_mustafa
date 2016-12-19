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
          'title': config.title || "",
          'desc': config.desc || "",
          'url': config.url || "",
          'author': config.author || "",
          'image':config.image || ""
        };
        window.xmlObj = [];
        var xmlDoc = xml.responseXML;
        for (var i = 0; i < xmlDoc.getElementsByTagName(configInner.title).length; i++) {
          xmlObj.push([{
            'name': xmlDoc.getElementsByTagName(configInner.title)[i] ? xmlDoc.getElementsByTagName(configInner.title)[i].childNodes[0].nodeValue : "",
            'description': xmlDoc.getElementsByTagName(configInner.desc)[i] ? xmlDoc.getElementsByTagName(configInner.desc)[i].childNodes[0].nodeValue : "",
            'link': xmlDoc.getElementsByTagName(configInner.url)[i] ? xmlDoc.getElementsByTagName(configInner.url)[i].childNodes[0].nodeValue : "",
            'image': xmlDoc.getElementsByTagName(configInner.image)[i] ? xmlDoc.getElementsByTagName(configInner.image)[i].childNodes[0].nodeValue : "",
            'author':xmlDoc.getElementsByTagName(configInner.author)[i] ? xmlDoc.getElementsByTagName(configInner.author)[i].childNodes[0].nodeValue :""
          }]);
        }
      } catch (err) {
        scalar.log.error.push(err);
      }
    }
  }
}