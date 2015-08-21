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
      div.innerHTML = '' +
        '<style>' +
        '#ads-widget-'+params.key+' {' +
        ' -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;' +
        ' border:1px solid #369; border-radius: 6px; padding: 5px;' +
        '}' +
        ' #ads-widget-'+params.key+' .widget-header-'+params.key+'{' +
        '   color: red;' +
        '}' +
        '</style>' +
        '<div class="widget-header-'+params.key+'">Привет!</div>';
      adsHolder.appendChild(div);
    } else {
      console.warn('Element with id="%s" not found!!!', params.key);
    }
  } else {
    console.warn('Widget key not specified!!!');
  }

})(window['OutsideJS']);
