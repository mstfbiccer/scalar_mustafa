scalar.ui.config = function() {
  try {
    this.fanatik=scalar.ui.widget.config.fanatik;
  } catch (e) {
    return false;
    this.log.error.push('Initialization rejected : [../Scalar/com/core/core.js]');
  }
}
scalar.ui.config.fanatik = {
'title':'title',
'desc':'description',
'url':'link',
'author':'fanatik'
};