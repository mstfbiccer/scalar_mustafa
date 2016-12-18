/**
 * Initialize libraries
 * @param  {object} object [scalar.lib]
 * @return {bool}
 */
scalar.init = function(object) {
  this.config = scalar.init.config;
  try {
    if(object.TYPE=='text/css'){
      this.htmlElement = document.createElement(object.ELEMENT);
      this.htmlElement.type = object.TYPE;
      this.htmlElement.href = object.SRC;
      this.htmlElement.rel = 'stylesheet';
      document.head.appendChild(this.htmlElement);
      scalar.log.success.push('Initialization complete : [' + object.SRC + ']');
    }else{
      this.htmlElement = document.createElement(object.ELEMENT);
      this.htmlElement.type = object.TYPE;
      this.htmlElement.src = object.SRC;
      document.head.appendChild(this.htmlElement);
      scalar.log.success.push('Initialization complete : [' + object.SRC + ']');
    }
    return true;
  } catch (e) {
    this.log.error.push('Initialization rejected : [' + object.SRC + ']');
    return false;
  }
}

scalar.lib = {
  UI: {
    ELEMENT: 'script',
    TYPE: "text/javascript",
    SRC: "../Scalar/com/ui/ui.js"
  },
  COMPONENT: {
    ELEMENT: 'script',
    TYPE: "text/javascript",
    SRC: "../Scalar/com/ui/component/ui.component.js"
  },
  DESKTOP: {
    ELEMENT: 'script',
    TYPE: "text/javascript",
    SRC: "../Scalar/com/ui/desktop/ui.desktop.js"
  },
  WINDOW: {
    ELEMENT: 'script',
    TYPE: "text/javascript",
    SRC: "../Scalar/com/ui/window/ui.window.js"
  },
  CALENDAR: {
    ELEMENT: 'script',
    TYPE: "text/javascript",
    SRC: "../Scalar/com/ui/desktop/calendar/ui.desktop.calendar.js"
  },
  DOCK: {
    ELEMENT: 'script',
    TYPE: "text/javascript",
    SRC: "../Scalar/com/ui/desktop/dock/ui.desktop.dock.js"
  },
  SEARCH: {
    ELEMENT: 'script',
    TYPE: "text/javascript",
    SRC: "../Scalar/com/ui/desktop/search/ui.desktop.search.js"
  },
  WIDGET: {
    ELEMENT: 'script',
    TYPE: "text/javascript",
    SRC: "../Scalar/com/ui/desktop/widget/ui.desktop.widget.js"
  },
  UI_FONT: {
    ELEMENT: 'link',
    TYPE: "text/css",
    SRC: "../Scalar/com/ui/stylesheet/font.css"
  }
}

scalar.init.config = {};

scalar.init(scalar.lib.UI);