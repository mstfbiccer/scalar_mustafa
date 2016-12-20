

scalar.ui.desktop.wave = function() {
  this.config = scalar.ui.desktop.wave.config;

  this.getIp = new XMLHttpRequest();
  this.getIp.open("GET", this.config.LOCATION.URL, true);
  this.getIp.responseType = "json";
  this.location = this.getIp;
  this.getIp.send();
  this.getIp.onload = function() {
    this.weather = new XMLHttpRequest();
    this.weather.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=" + scalar.ui.desktop.wave.location.response.city + "&mode=json&appid="+scalar.ui.desktop.wave.config.LOCATION.API_KEY+"&units=metric", true);
    this.weather.responseType = "json";
    this.weather.send();
  };
  this.days = new Array();
  this.days = ["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"];
  scalar.exec('date "+%u"', function(output) {
    var toDayOrder = parseInt(output)-1;
    for (var i = 0; i < 5 ; i++) {
      var dayOrder = i+toDayOrder;
      if (dayOrder > 6) {
        dayOrder = dayOrder-7;
      }
      scalar.ui.select('#daily-weather-'+i+' .daily-weather-status span').innerHTML = scalar.ui.desktop.wave.days[dayOrder];
    }
  });

  this.time();
  this.dateAndTime();

  var weatherControl = setInterval(function(){
    try {      
      if(scalar.ui.desktop.wave.getIp.weather.response.list[0].weather[0].description) {        
        var weatherIdSmall = scalar.ui.desktop.wave.getIp.weather.response.list[0].weather[0].id;
        var tempSmall = parseInt(scalar.ui.desktop.wave.getIp.weather.response.list[0].main.temp);
        scalar.ui.desktop.wave.weather('#weather',weatherIdSmall,0,false);
        scalar.ui.desktop.wave.weather('#daily-weather-0',weatherIdSmall,tempSmall,true);

          scalar.exec('date "+%d', function(output) {
            scalar.ui.desktop.wave.toDay = output;
          });
          var counter = 1;
          for (var i = 0; i < scalar.ui.desktop.wave.getIp.weather.response.list.length; i++){            
            if(scalar.ui.desktop.wave.getIp.weather.response.list[i].dt_txt.split('-')[2].split(' ')[0] != scalar.ui.desktop.wave.toDay){              
              if (scalar.ui.desktop.wave.getIp.weather.response.list[i].dt_txt.split('-')[2].split(' ')[1].split(':')[0] == "15") {                
                var weatherId = scalar.ui.desktop.wave.getIp.weather.response.list[i].weather[0].id;
                var temp = parseInt(scalar.ui.desktop.wave.getIp.weather.response.list[i].main.temp);
                scalar.ui.desktop.wave.weather('#daily-weather-'+counter.toString(),weatherId,temp,true);
                counter++;
                if(counter==4) {
                  clearInterval(weatherControl);                  
                }
              }
            }
          }
        clearInterval(weatherControl);        
        
        scalar.log.success.push('Weather updated.');
      }
    }catch (err) {      
      scalar.log.error.push('Weather update failed.');
    }
  }, 100);

  scalar.ui.select('#power').onclick = function(){
    alert("Electron 60 saniye içerisinde kapanıcak","Uyarı");
    scalar.exec('shutdown',function(output){
    });
  }
  scalar.ui.select('#update').onclick = function(){
    scalar.exec('git pull',function(output){
      location.reload();
      alert("Cihazınız güncelleştirildi.","Uyarı");
    })
  }
  scalar.ui.select('#calendar').onclick = function(){
    scalar.ui.select('#celendar-detail').setAttribute('style','width:270px;')
    setTimeout(function(){
      scalar.ui.select('#weather-detail').setAttribute('style','display:block;')
      scalar.ui.select('#time-detail').setAttribute('style','display:block;')
    }, 300);
  }
  scalar.ui.select('#celendar-close').onclick = function(){
    scalar.ui.select('#celendar-detail').setAttribute('style','width:0px;')
    scalar.ui.select('#weather-detail').setAttribute('style','display:none;')
    scalar.ui.select('#time-detail').setAttribute('style','display:none;')
  }

  this.scalarOpen= function (e) {
    try {
      if (e.keyCode == 13) {
          if(this.scalarBrowser!=undefined && this.scalarBrowser.closed==="false") {
              this.scalarBrowser.location="//"+document.getElementById("search").value;
              this.scalarBrowser.focus();
              this.scalarBrowser.eval("document.querySelector('.StreamsHero-header').setAttribute('onclick','window.close()')");

          }else {
              this.scalarBrowser=window.open("//"+document.getElementById("search").value);
              this.scalarBrowser.focus();
              this.scalarBrowser.eval("this.h = document.createElement('div');this.h.id = 'node-scalar';this.h.setAttribute('onclick','window.close()');this.h.setAttribute('style','cursor:pointer;background:Red;width:100px;height:100px;position:fixed;left:10px;top:10px;z-index:9999');document.body.appendChild(this.h)");
          }
      }
    }catch(err) {}
  }
}

scalar.ui.desktop.wave.prototype = {

}
scalar.ui.desktop.wave.config = {
  LOCATION: {
    URL: "http://ip-api.com/json",
    API_KEY: "d869412526bd58dc27945351b1ef6af2"
  },
  TIME: {
    SELECT: '#time',
    RELOAD: 60000
  },
  WEATHER: {
    RELOAD: 60000
  },
  DATEANDTIME: {
    RELOAD: 60000
  }
};
scalar.ui.desktop.wave.prototype = {
  dateAndTime : function() {
    scalar.exec('date "+%d %B %Y %A"',function(output){
      scalar.ui.select('#time-dmy').innerHTML = output;
    })
    scalar.exec('date "+%H:%M"', function(output) {
      scalar.ui.select('#time-hm').innerHTML = output;
    });
    setInterval(function(){
      scalar.exec('date "+%d %B %Y %A"',function(output){
        scalar.ui.select('#time-dmy').innerHTML = output;
      })
      scalar.exec('date "+%H:%M"', function(output) {
        scalar.ui.select('#time-hm').innerHTML = output;
      });
    }, this.config.DATEANDTIME.RELOAD);
  },
  time : function(){
    scalar.exec('date "+%H:%M"', function(output) {
      scalar.ui.select(scalar.ui.desktop.wave.config.TIME.SELECT).innerHTML = output;
    });

    setInterval(function(){
      scalar.exec('date "+%H:%M"', function(output) {
        scalar.ui.select(scalar.ui.desktop.wave.config.TIME.SELECT).innerHTML = output;
      });
    }, this.config.TIME.RELOAD);
  },
  weather : function(select, description, temp, control) {
    if (control) {
      scalar.ui.select(select+' .daily-weather-degree span').innerHTML = temp.toString();
    }
    switch (description) {
    case 800:
      scalar.exec('date "+%H:%M"', function(output) {
        this.timeValue = parseInt(output.split(':')[0])
        if(this.timeValue < 7 || this.timeValue > 18) {
          if (control) {
            scalar.ui.select(select+' div').className = 'icon-moon';
            scalar.ui.select(select+' .daily-weather-commend').innerHTML = "Hava açık ve ılık olacak.";
          }else {
            scalar.ui.select(select).className = 'icon-moon';
          }
        }else {
          if (control) {
            scalar.ui.select(select+' div').className = 'icon-sun';
            scalar.ui.select(select+' .daily-weather-commend').innerHTML = "Hava açık ve ılık olacak.";
          }else {
            scalar.ui.select(select).className = 'icon-sun';
          }
        }
      });
      break;
    case 801:
      scalar.exec('date "+%H:%M"', function(output) {
        this.timeValue = parseInt(output.split(':')[0])
        if(this.timeValue < 7 || this.timeValue > 18) {
          if (control) {
            scalar.ui.select(select+' div').className = 'icon-cloud';
            scalar.ui.select(select+' .daily-weather-commend').innerHTML = "Hava parçalı bulutlu. Herşeye hazırlıklı olun.";
          }else {
            scalar.ui.select(select).className = 'icon-cloud';
          }
        }else {
          if (control) {
            scalar.ui.select(select+' div').className = 'icon-cloudy';
            scalar.ui.select(select+' .daily-weather-commend').innerHTML = "Hava parçalı bulutlu. Herşeye hazırlıklı olun.";
          }else {
            scalar.ui.select(select).className = 'icon-cloudy';
          }
        }
      });
      break;
    case 802:
      if (control) {
        scalar.ui.select(select+' div').className = 'icon-cloud2';
        scalar.ui.select(select+' .daily-weather-commend').innerHTML = "Hava kapalı olacak. Dikkatli olun.";
      }else {
        scalar.ui.select(select).className = 'icon-cloud2';
      }
      break;
    case 803:
    case 804:
      if (control) {
        scalar.ui.select(select+' div').className = 'icon-cloudy2';
        scalar.ui.select(select+' .daily-weather-commend').innerHTML = "Hava kapalı olacak. Yağmur yağma ihtimaline karşı dikkatli olun.";
      }else {
        scalar.ui.select(select).className = 'icon-cloudy2';
      }
      break;
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      if (control) {
        scalar.ui.select(select+' div').className = 'icon-rainy2';
        scalar.ui.select(select+' .daily-weather-commend').innerHTML = "Hava kapalı. Aynı zamanda yağmurlu ve gökgürültülü olacak.";
      }else {
        scalar.ui.select(select).className = 'icon-rainy2';
      }
      break;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 520:
    case 521:
    case 522:
    case 531:
      if (control) {
        scalar.ui.select(select+' div').className = 'icon-rainy2';
        scalar.ui.select(select+' .daily-weather-commend').innerHTML = "Hava kapalı ve aynı zamanda yağmurlu olacak. Şemsiyenizi almayı unutmayın.";
      }else {
        scalar.ui.select(select).className = 'icon-rainy2';
      }
      break;
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      if (control) {
        scalar.ui.select(select+' div').className = 'icon-lightning2';
        scalar.ui.select(select+' .daily-weather-commend').innerHTML = "Hava kapalı ve gökgürültülü. Dışarıya çıkmak için iyi bir zaman olmayabilir.";
      }else {
        scalar.ui.select(select).className = 'icon-lightning2';
      }
      break;
    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
    case 511:
      if (control) {
        scalar.ui.select(select+' div').className = 'icon-snowy3';
        scalar.ui.select(select+' .daily-weather-commend').innerHTML = "Hava kar yağışlı. Eldivenlerinizi almayı unutmayın kartopu oynamak için iyi bir zaman.";
      }else {
        scalar.ui.select(select).className = 'icon-snowy3';
      }
      break;
    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    case 771:
    case 781:
      if (control) {
        scalar.ui.select(select+' div').className = 'icon-weather3';
        scalar.ui.select(select+' .daily-weather-commend').innerHTML = "Hava sisli olacak. Araç kullanmak için iyi bir zaman değil, dikkatli olun.";
      }else {
        scalar.ui.select(select).className = 'icon-weather3';
      }
      break;
    }
  }
}



scalar.ui.desktop.wave = new scalar.ui.desktop.wave();

