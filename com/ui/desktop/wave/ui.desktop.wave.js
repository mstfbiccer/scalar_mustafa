

scalar.ui.desktop.wave = function() {
  this.config = scalar.ui.desktop.wave.config;

  this.getIp = new XMLHttpRequest();
  this.getIp.open("GET", this.config.LOCATION.URL, true);
  this.getIp.responseType = "json";
  this.location = this.getIp;
  this.getIp.send();
  this.getIp.onload = function() {
    this.weather = new XMLHttpRequest();
    this.weather.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + scalar.ui.desktop.wave.location.response.city + "&appid="+scalar.ui.desktop.wave.config.LOCATION.API_KEY+"&units=metric", true);
    this.weather.responseType = "json";
    this.weather.send();
  };

  this.time();

  var weatherControl = setInterval(function(){
    try {
      console.log('Try get weather ???');
      if(scalar.ui.desktop.wave.getIp.weather.response.weather[0].description) {
        console.log('We got weather !!!');
        scalar.ui.desktop.wave.weather();
        clearInterval(weatherControl);
      }
    }catch (err) {}
  }, 100);
}
<<<<<<< HEAD



=======
scalar.ui.desktop.wave.prototype = {

}
>>>>>>> e4531e037ee5bb163d24c8b03dacd8fa1b240144
scalar.ui.desktop.wave.config = {
  LOCATION: {
    URL: "http://ip-api.com/json",
    API_KEY: "d869412526bd58dc27945351b1ef6af2"
  },
<<<<<<< HEAD
  TIME: {
    SELECT: '#time',
    RELOAD: 60000
  },
  WEATHER: {
    SELECT: '#weather',
    RELOAD: 5000
=======
  TIME:{
    
>>>>>>> e4531e037ee5bb163d24c8b03dacd8fa1b240144
  }
};
scalar.ui.desktop.wave.prototype = {
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
  weather : function() {
    var description = scalar.ui.desktop.wave.getIp.weather.response.weather[0].description;
    switch (description) {
    case 'clear sky':
      scalar.exec('date "+%H:%M"', function(output) {
        this.timeValue = parseInt(output.split(':')[0])
      });
      if(this.timeValue < 7 && this.timeValue > 19) {
        scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-moon';
      }else {
        scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-sun';
      }
      break;
    case 'few clouds':
      scalar.exec('date "+%H:%M"', function(output) {
        this.timeValue = parseInt(output.split(':')[0])
      });
      if(this.timeValue < 7 && this.timeValue > 19) {
        scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-cloud';
      }else {
        scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-cloudy';
      }
      break;
    case 'scattered clouds':
      scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-cloud2';
      break;
    case 'broken clouds':
      scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-cloudy2';
      break;
    case 'shower rain':
      scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-rainy2';
      break;
    case 'rain':
      scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-rainy';
      break;
    case 'thunderstorm':
      scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-lightning2';
      break;
    case 'snow':
      scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-snowy3';
      break;
    case 'mist':
      scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-weather3';
      break;
    }
    setInterval(function(){
      var description = scalar.ui.desktop.wave.getIp.weather.response.weather[0].description;
      switch (description) {
      case 'clear sky':
        scalar.exec('date "+%H:%M"', function(output) {
          this.timeValue = parseInt(output.split(':')[0])
        });
        if(this.timeValue < 7 && this.timeValue > 19) {
          scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-moon';
        }else {
          scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-sun';
        }
        break;
      case 'few clouds':
        scalar.exec('date "+%H:%M"', function(output) {
          this.timeValue = parseInt(output.split(':')[0])
        });
        if(this.timeValue < 7 && this.timeValue > 19) {
          scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-cloud';
        }else {
          scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-cloudy';
        }
        break;
      case 'scattered clouds':
        scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-cloud2';
        break;
      case 'broken clouds':
        scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-cloudy2';
        break;
      case 'shower rain':
        scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-rainy2';
        break;
      case 'rain':
        scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-rainy';
        break;
      case 'thunderstorm':
        scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-lightning2';
        break;
      case 'snow':
        scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-snowy3';
        break;
      case 'mist':
        scalar.ui.select(scalar.ui.desktop.wave.config.WEATHER.SELECT).className = 'icon-weather3';
        break;
      }
      console.log('RELOADED ~~');
    },this.config.WEATHER.RELOAD);
  }
}

scalar.ui.desktop.wave = new scalar.ui.desktop.wave();

