(function (OutsideJS) {
  "use strict";

  console.log(OutsideJS.InitEnv);

  var params = OutsideJS.InitEnv.options;

  alert(params.text);

  var adsHolder = document.querySelector('#ads-widget-' + params.key);

  var div = document.createElement('div');
  div.innerHTML = "<h1>Привет!</h1>";

  adsHolder.appendChild(div);


})(window['OutsideJS']);
