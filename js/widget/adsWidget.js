(function (OutsideJS) {
  "use strict";
  if(OutsideJS.InitEnv && (OutsideJS.InitEnv.debug === true)){
    console.log(OutsideJS.InitEnv);
  }

  var params = OutsideJS.InitEnv.options;
  if(params.key){
    var adsHolder = document.querySelector('#ads-widget-' + params.key);

    if(adsHolder){
      var div = document.createElement('div');
      div.innerHTML = "<h1>Привет!</h1>";
      adsHolder.appendChild(div);
    } else {
      console.warn('Element with id="%s" not found!!!', params.key);
    }
  } else {
    console.warn('Widget key not specified!!!');
  }

})(window['OutsideJS']);
