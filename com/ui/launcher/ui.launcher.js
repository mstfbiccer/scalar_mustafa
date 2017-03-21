scalar.ui.launcher = function () {
  this.config = scalar.ui.launcher.config;
  scalar.exec('cd com/bash && bash applicationList.sh', function (output) {
    output = '[' + output.slice(0, output.length - 2) + ']';
    window.asd = eval(output);
    for (var i = 1; i < window.asd.length-2; i++) {
     /* scalar.ui.append('#scroll-tab-'+i, scalar.ui.createElement('div', { 'class': 'mdl-gird s'+i}));
      scalar.ui.append('.mdl-gird.s'+i, scalar.ui.createElement('div', { 'class': 'mdl-cell mdl-cell--1-col s'+i}));
      document.querySelector('.mdl-cell.mdl-cell--1-col.s'+i).innerHTML=window.asd[i].title;*/
      /*document.querySelector("a[href='#scroll-tab-"+i+"']").innerHTML=window.asd[i].title.slice(0,15)+"...";
      console.log(window.asd[i].title)*/
    }
  });
};

scalar.ui.launcher.config = {

};
scalar.ui.launcher.prototype = {

};



scalar.ui.launcher = new scalar.ui.launcher();

