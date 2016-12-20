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
  scalar.ui.append('#widget-1', scalar.ui.createElement('iframe', {
    'src': 'https://embed.spotify.com/?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A2PXdUld4Ueio2pHcB6sM8j',
    'width':'600',
    'height':'430',
    'frameborder':'0',
    'allowtransparency':'true',
    'style':"margin-top: 83px;margin-left: 15px;"
  }));

  scalar.ui.append('#widget-0', scalar.ui.createElement('h1'));
  scalar.ui.select('#widget-0 h1').innerHTML = "En Yeni Haberler";
  scalar.ui.append('#widget-0', scalar.ui.createElement('ul'));
  scalar.exec("find -name '*.xml' -exec rm {} +", function() {});
  scalar.exec('cd com/ui/desktop/widget && for f in *list.json;do grep . $f ;done', function(output) {
    scalar.ui.select('#widget-0 ul').innerHTML = "";
    scalar.ui.desktop.widget.list = JSON.parse(output);

    scalar.ui.desktop.widget.config.NEWS.XML_POINTER = 0;
    for (i = 0; i < scalar.ui.desktop.widget.list.SOURCE.length; i++) {
      scalar.exec('cd com/ui/desktop/widget && for f in ' + scalar.ui.desktop.widget.list.SOURCE[i] + ';do grep . $f ;done', function(output) {
        scalar.ui.desktop.widget.config.NEWSCONFIG.push(JSON.parse(output));
        for (j = scalar.ui.desktop.widget.config.NEWSCONFIG.length - 1; j < scalar.ui.desktop.widget.config.NEWSCONFIG.length; j++) {
          scalar.exec('cd com/ui/desktop/widget && wget --output-document=feed_' + j + '.xml ' + scalar.ui.desktop.widget.config.NEWSCONFIG[j].SOURCE + '&&  grep . feed_' + j + '.xml', function(output2) {

            scalar.ui.desktop.widget.getNews('com/ui/desktop/widget/feed_' + scalar.ui.desktop.widget.config.NEWS.XML_POINTER + '.xml', scalar.ui.desktop.widget.config.NEWSCONFIG[scalar.ui.desktop.widget.config.NEWS.XML_POINTER].CONFIG);
            scalar.ui.desktop.widget.config.NEWS.XML_POINTER++;
          });

        }
      });
    }
    setInterval(function() {
      scalar.ui.select('#widget-0 ul').innerHTML = "";
      scalar.exec("find -name '*.xml' -exec rm {} +", function() {});
      scalar.ui.desktop.widget.config.NEWS.XML_POINTER = 0;

        for (j = 0; j < scalar.ui.desktop.widget.config.NEWSCONFIG.length; j++) {
          scalar.exec('cd com/ui/desktop/widget && wget --output-document=feed_' + j + '.xml ' + scalar.ui.desktop.widget.config.NEWSCONFIG[j].SOURCE + '&&  grep . feed_' + j + '.xml', function(output2) {

            scalar.ui.desktop.widget.getNews('com/ui/desktop/widget/feed_' + scalar.ui.desktop.widget.config.NEWS.XML_POINTER + '.xml', scalar.ui.desktop.widget.config.NEWSCONFIG[scalar.ui.desktop.widget.config.NEWS.XML_POINTER].CONFIG);
            scalar.ui.desktop.widget.config.NEWS.XML_POINTER++;
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
              'TITLE': this.responseXML.getElementsByTagName(this.config.TITLE)[i] ? decodeURIComponent(this.responseXML.getElementsByTagName(this.config.TITLE)[i].childNodes[0].nodeValue) : "",
              'DESCRIPTION': this.responseXML.getElementsByTagName(this.config.DESCRIPTION)[i] ? decodeURIComponent(this.responseXML.getElementsByTagName(this.config.DESCRIPTION)[i].childNodes[0].nodeValue) : "",
              'URL': this.responseXML.getElementsByTagName(this.config.URL)[i] ? decodeURIComponent(this.responseXML.getElementsByTagName(this.config.URL)[i].childNodes[0].nodeValue) : "",
              'IMAGE': this.responseXML.getElementsByTagName(this.config.IMAGE)[i] ? decodeURIComponent(this.responseXML.getElementsByTagName(this.config.IMAGE)[i].childNodes[0].nodeValue) : ""
            });
          }
          var i = 0;
          var t = 0;
          for (k = 0; k < scalar.ui.desktop.widget.news.length; k++) {
            if (scalar.ui.desktop.widget.news[k].TITLE) {
              scalar.ui.append('#widget-0 ul', scalar.ui.createElement('li', {
                'id': 'li-' + k + '-' + scalar.ui.desktop.widget.config.COUNTER + '--' + t
              }));
              scalar.ui.append('#widget-0 ul #li-' + k + '-' + scalar.ui.desktop.widget.config.COUNTER + '--' + t, scalar.ui.createElement('a', {
                'href': "" + scalar.ui.desktop.widget.news[k].URL,
                'target': '_blank'
              }));
              scalar.ui.append('#widget-0 ul #li-' + k + '-' + scalar.ui.desktop.widget.config.COUNTER + '--' + t + ' a', scalar.ui.desktop.widget.news[k].TITLE);
              scalar.ui.desktop.widget.news[k].IMAGE ? scalar.ui.append('#widget-0 ul #li-' + k + '-' + scalar.ui.desktop.widget.config.COUNTER + '--' + t, scalar.ui.createElement('div')) : false;
              scalar.ui.desktop.widget.news[k].IMAGE ? scalar.ui.append('#widget-0 ul #li-' + k + '-' + scalar.ui.desktop.widget.config.COUNTER + '--' + t + ' div', scalar.ui.createElement('img', {
                'src': scalar.ui.desktop.widget.news[k].IMAGE
              })) : false;
              scalar.ui.append('#widget-0 ul #li-' + k + '-' + scalar.ui.desktop.widget.config.COUNTER + '--' + t, scalar.ui.createElement('p'));
              scalar.ui.append('#widget-0 ul #li-' + k + '-' + scalar.ui.desktop.widget.config.COUNTER + '--' + t + ' p', scalar.ui.desktop.widget.news[k].DESCRIPTION);
              i++
              if (i == scalar.ui.desktop.widget.config.NEWS.SLIDER.LEN) {
                t++;
                i = 0;
              }
            }
          }
          for (i = 0; i < scalar.ui.selectAll('#widget-0 ul li').length; i++) {
            this.swp = scalar.ui.selectAll('#widget-0 ul li')[i];
            scalar.ui.selectAll('#widget-0 ul li p a')[i].innerHTML = '';
            if (parseFloat(this.swp.getAttribute("id").split('--')[1]) > 0) {
              this.swp.setAttribute("style", "display:none");
            }
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
    COUNT: 3,
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
scalar.ui.desktop.widget = new scalar.ui.desktop.widget();

/*
,
  getFacebook: function() {
    // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
      console.log('statusChangeCallback');
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.';
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into Facebook.';
      }
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }

    window.fbAsyncInit = function() {
      FB.init({
        appId: '1840857556187692',
        cookie: false, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
      });

      // Now that we've initialized the JavaScript SDK, we call 
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.

      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });

    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
          'Thanks for logging in, ' + response.name + '!';
      });
    }
  }
 */