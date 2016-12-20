scalar.ui = function() {
  this.config = scalar.ui.config;

  scalar.init(scalar.lib.COMPONENT);
  scalar.init(scalar.lib.DESKTOP);
  scalar.init(scalar.lib.DOCK);
  scalar.init(scalar.lib.WAVE);
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
        Object.keys(this.attribute).indexOf("target") >= 0 ? this.htmlElement.setAttribute("target", this.attribute.target) : undefined;
        Object.keys(this.attribute).indexOf("scope") >= 0 ? this.htmlElement.setAttribute("scope", this.attribute.scope) : undefined;
        Object.keys(this.attribute).indexOf("onlogin") >= 0 ? this.htmlElement.setAttribute("onlogin", this.attribute.onlogin) : undefined;
      }
    }
    return this.htmlElement;
  },
  append: function(target, element) {
    typeof element === 'object' ? document.querySelector(target).appendChild(element) : undefined;
    typeof element === 'string' || typeof element === 'number' || typeof element === 'number' ? document.querySelector(target).innerHTML = document.querySelector(target).innerHTML + element : undefined;
  },
  selectAll: function(query) {
    this.query = query;
    return document.querySelectorAll(query)
  },
  select: function(query) {
    this.query = query;
    return document.querySelector(query)
  }
};
scalar.ui = new scalar.ui();


scalar.ui.append('body',scalar.ui.createElement('div',{'id':'desktop'}));
  scalar.ui.append('#desktop',scalar.ui.createElement('div',{'id':'wave'}));
    scalar.ui.append('#wave',scalar.ui.createElement('input',{'id':'search','type':'text','placeholder':'Bilgisayarımda ara'}));
    scalar.ui.append('#wave',scalar.ui.createElement('ul',{'id':'menu'}));
      scalar.ui.append('#menu',scalar.ui.createElement('li',{'id':'calendar'}));
        scalar.ui.append('#calendar',scalar.ui.createElement('div',{'id':'time'}));
          scalar.ui.append('#time','');
        scalar.ui.append('#calendar',scalar.ui.createElement('div',{'id':'weather','class':'icon-warning'}));


      scalar.ui.append('#menu',scalar.ui.createElement('li',{'id':'power'}));

        scalar.ui.append('#power',scalar.ui.createElement('div',{'class':'icon-power_settings_new'}));
        scalar.ui.append('#power',scalar.ui.createElement('ul',{'id':'power-menu'}));
          scalar.ui.append('#power-menu',scalar.ui.createElement('li',{'id':'power-menu-0'}));
          scalar.ui.append('#power-menu',scalar.ui.createElement('li',{'id':'power-menu-1'}));
          scalar.ui.append('#power-menu',scalar.ui.createElement('li',{'id':'power-menu-2'}));
          scalar.ui.append('#power-menu',scalar.ui.createElement('li',{'id':'power-menu-3'}));

          scalar.ui.append('#power-menu-0','Log Out...');
            scalar.ui.select('#power-menu-0').onclick = function(){
              scalar.exec('logout',function(output){})
            }
          scalar.ui.append('#power-menu-1','Suspend');
            scalar.ui.select('#power-menu-1').onclick = function(){
              scalar.exec('systemctl suspend',function(output){})
            }
          scalar.ui.append('#power-menu-2','Restart');
            scalar.ui.select('#power-menu-2').onclick = function(){
              scalar.exec('shutdown -r now',function(output){})
            }
          scalar.ui.append('#power-menu-3','Shut Down...');
            scalar.ui.select('#power-menu-3').onclick = function(){
              scalar.exec('poweroff',function(output){})
            }

      scalar.ui.append('#menu',scalar.ui.createElement('li',{'id':'user'}));
        
        scalar.ui.append('#user',scalar.ui.createElement('div',{'class':'icon-person'}));
        scalar.ui.append('#user',scalar.ui.createElement('ul',{'id':'user-menu'}));
          scalar.ui.append('#user-menu',scalar.ui.createElement('li',{'id':'user-menu-0'}));
          scalar.ui.append('#user-menu',scalar.ui.createElement('li',{'id':'user-menu-1'}));
          scalar.ui.append('#user-menu',scalar.ui.createElement('li',{'id':'user-menu-2'}));
          scalar.ui.append('#user-menu',scalar.ui.createElement('li',{'id':'user-menu-3'}));
          scalar.ui.append('#user-menu',scalar.ui.createElement('li',{'id':'user-menu-4'}));

          scalar.ui.append('#user-menu-0','About This Computer');
          scalar.ui.append('#user-menu-1','Scalar Help...');
          scalar.ui.append('#user-menu-2','System Settings...');
          scalar.ui.append('#user-menu-3','Lock');
          scalar.exec('echo "$USER"', function(output) {scalar.ui.select('#user-menu #user-menu-4').innerHTML =  output});

      scalar.ui.append('#menu',scalar.ui.createElement('li',{'id':'config'}));
        scalar.ui.append('#config',scalar.ui.createElement('div',{'class':'icon-settings'}));
      scalar.ui.append('#menu',scalar.ui.createElement('li',{'id':'update'}));
        scalar.ui.append('#update',scalar.ui.createElement('div',{'class':'icon-sync'}));

  scalar.ui.append('#desktop',scalar.ui.createElement('div',{'id':'dock'}));
    scalar.ui.append('#dock',scalar.ui.createElement('div',{'id':'dock-container'}));
      scalar.ui.append('#dock-container',scalar.ui.createElement('span',{'id':'dc-1'}));
        scalar.ui.append('#dc-1',scalar.ui.createElement('b'));
      scalar.ui.append('#dock-container',scalar.ui.createElement('span',{'id':'dc-2'}));
        scalar.ui.append('#dc-2',scalar.ui.createElement('b'));
      scalar.ui.append('#dock-container',scalar.ui.createElement('span',{'id':'dc-3'}));
        scalar.ui.append('#dc-3',scalar.ui.createElement('b'));
      scalar.ui.append('#dock-container',scalar.ui.createElement('span',{'id':'dc-4'}));
        scalar.ui.append('#dc-4',scalar.ui.createElement('b'));
      scalar.ui.append('#dock-container',scalar.ui.createElement('span',{'id':'dc-5'}));
        scalar.ui.append('#dc-5',scalar.ui.createElement('b'));


scalar.exec('echo "$USER"', function(output) {console.log(output)})

$ = scalar.ui;