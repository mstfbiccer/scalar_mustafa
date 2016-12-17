scalar.ui = function() {
  this.config = scalar.ui.config;

  scalar.init(scalar.lib.COMPONENT);
  scalar.init(scalar.lib.DESKTOP);
  scalar.init(scalar.lib.DOCK);
  scalar.init(scalar.lib.CALENDAR);
  scalar.init(scalar.lib.SEARCH);
  scalar.init(scalar.lib.WIDGET);
  scalar.init(scalar.lib.WINDOW);
}
scalar.ui.config = {};
scalar.ui.prototype = {
  createElement: function(type, attribute) {
    this.htmlElement = document.createElement(type);
    this.attribute = attribute;
    if (this.attribute != undefined) {
      if (Object.keys(this.attribute).length) {
        Object.keys(this.attribute).indexOf("id") >= 0 ? this.htmlElement.id = this.attribute.id : undefined;
        Object.keys(this.attribute).indexOf("class") >= 0 ? this.htmlElement.classList.add(this.attribute.class) : undefined;
        Object.keys(this.attribute).indexOf("src") >= 0 ? this.htmlElement.setAttribute("src", this.attribute.src) : undefined;
        Object.keys(this.attribute).indexOf("background") >= 0 ? this.htmlElement.style.background = this.attribute.background : undefined;
        Object.keys(this.attribute).indexOf("text") >= 0 ? this.htmlElement.innerHTML = this.attribute.text : undefined;
        Object.keys(this.attribute).indexOf("href") >= 0 ? this.htmlElement.setAttribute("href", this.attribute.href) : undefined;
      }
    }
    return this.htmlElement;
  },
  append: function(target, element) {
    typeof element === 'object' ? document.querySelector(target).appendChild(element) : undefined;
    typeof element === 'string' || typeof element === 'number' || typeof element === 'number' ? document.querySelector(target).innerHTML = document.querySelector(target).innerHTML + element : undefined;
  },
  select: function(query) {
    this.query = query;
    return document.querySelectorAll(query)
  }
};
scalar.ui = new scalar.ui();

scalar.exec('date "+%H:%M"', function(output) {
  console.log(output);
});

scalar.exec('cd com/ui/desktop/widget && for f in *config.json;do grep . $f;done', function(output) {
  scalar.ui.AllConfig=JSON.parse(output);
});
$ = scalar.ui;