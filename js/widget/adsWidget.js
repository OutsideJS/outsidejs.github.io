(function (OutsideJS) {
  "use strict";
  if(OutsideJS.InitEnv && (OutsideJS.InitEnv.debug === true)){
    console.log(OutsideJS.InitEnv);
  }

  var params = OutsideJS.InitEnv.options;
  if(params.key){

    var $holder = document.querySelector('#ads-widget-' + params.key);
    if($holder){
      OutsideJS.loadCss('//outsidejs.github.io/js/widget/products.css');
      OutsideJS.fetch('//outsidejs.github.io/js/widget/data.json', null, function(data){
        var response = JSON.parse(data);
        for(var i = 0; i < response.products.length; i++) {
          var item = response.products[i];
          var post = document.createElement('div');
          post.innerHTML = [
            '<div class="product">',
            ' <div class="title"><a href="'+item.href+'">'+ item.title +'</a></div>',
            ' <div class="image"><a href="'+item.href+'"><img src="'+item.img+'" /></a></div>',
            '</div>'
          ].join('');
          $holder.appendChild(post);
        }
      }, function(status, req){
        console.log(status);
        console.log(req);
      });

    } else {
      console.warn('Element with id="%s" not found!!!', params.key);
    }
  } else {
    console.warn('Widget key not specified!!!');
  }

})(window['OutsideJS']);
