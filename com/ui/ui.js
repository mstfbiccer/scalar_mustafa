scalar.ui = function() {
  this.config = scalar.ui.config;

  scalar.init(scalar.lib.COMPONENT);
  scalar.init(scalar.lib.DESKTOP);
  scalar.init(scalar.lib.DOCK);
  scalar.init(scalar.lib.CALENDAR);
  scalar.init(scalar.lib.SEARCH);
  scalar.init(scalar.lib.WIDGET);
  scalar.init(scalar.lib.WINDOW);
  scalar.init(scalar.lib.UI_FONT);
  
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
        Object.keys(this.attribute).indexOf("placeholder") >= 0 ? this.htmlElement.setAttribute("placeholder", this.attribute.placeholder) : undefined;
        Object.keys(this.attribute).indexOf("type") >= 0 ? this.htmlElement.setAttribute("type", this.attribute.type) : undefined;
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


scalar.ui.append('body',scalar.ui.createElement('div',{'id':'desktop'}));
  scalar.ui.append('#desktop',scalar.ui.createElement('div',{'id':'wave'}));
    scalar.ui.append('#wave',scalar.ui.createElement('input',{'id':'search','type':'text','placeholder':'Bilgisayarımda ara'}));
    scalar.ui.append('#wave',scalar.ui.createElement('ul',{'id':'menu'}));
      scalar.ui.append('#menu',scalar.ui.createElement('li',{'id':'calendar'}));
        scalar.ui.append('#calendar',scalar.ui.createElement('div',{'id':'time'}));
          scalar.ui.append('#time','18:45');
        scalar.ui.append('#calendar',scalar.ui.createElement('div',{'id':'weather','class':'icon-snowy5'}));
      scalar.ui.append('#menu',scalar.ui.createElement('li',{'id':'power'}));
        scalar.ui.append('#power',scalar.ui.createElement('div',{'class':'icon-power_settings_new'}));
      scalar.ui.append('#menu',scalar.ui.createElement('li',{'id':'user'}));
        scalar.ui.append('#user',scalar.ui.createElement('div',{'class':'icon-person'}));
      scalar.ui.append('#menu',scalar.ui.createElement('li',{'id':'config'}));
        scalar.ui.append('#config',scalar.ui.createElement('div',{'class':'icon-settings'}));
      scalar.ui.append('#menu',scalar.ui.createElement('li',{'id':'update'}));
        scalar.ui.append('#update',scalar.ui.createElement('div',{'class':'icon-sync'}));

  scalar.ui.append('#desktop',scalar.ui.createElement('div',{'id':'widget-container'}));
    scalar.ui.append('#widget-container',scalar.ui.createElement('div',{'id':'widget-0','class':'content'}));

    scalar.ui.append('#widget-container',scalar.ui.createElement('div',{'id':'widget-1','class':'content'}));

    scalar.ui.append('#widget-container',scalar.ui.createElement('div',{'id':'widget-2','class':'content'}));

  scalar.ui.append('#desktop',scalar.ui.createElement('div',{'id':'dock'}));
    scalar.ui.append('#dock',scalar.ui.createElement('div',{'id':'dock-container'}));
      scalar.ui.append('#dock-container',scalar.ui.createElement('span'));
        scalar.ui.append('#dock-container span',scalar.ui.createElement('b'));


scalar.exec('date "+%H:%M"', function(output) {
  console.log(output);
});

scalar.exec('cd com/ui/desktop/widget && for f in *config.json;do grep . $f;done', function(output) {
  scalar.ui.AllConfig=JSON.parse(output);
});
$ = scalar.ui;