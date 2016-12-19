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
}
scalar.ui.desktop.wave.prototype = {
  
}
scalar.ui.desktop.wave.config = {
  LOCATION: {
    URL: "http://ip-api.com/json",
    API_KEY: "d869412526bd58dc27945351b1ef6af2"
  }
};
scalar.ui.desktop.wave = new scalar.ui.desktop.wave();