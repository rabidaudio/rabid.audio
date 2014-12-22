(function($){
  var keyListeners = {};

  $.keyListen = function(key, callback){
    if(!keyListeners[key]) keyListeners[key] = [];
    keyListeners[key].push(callback);
  };

  $(document).ready(function(){
    $(document.body).keypress(function(event){
      for(var i=keyListeners[event.keyCode].length; i-->0;){
        var cb = keyListeners[event.keyCode][i];
        cb.call(this, event);
      }
    });
  });

  //todo map chars to keyCodes, allow shift/ctrl/alt
})(jQuery);


$.keyListen(110, function(event){
  event.preventDefault();
  $('.next a')[0].click();
});

$.keyListen(112, function(event){
  event.preventDefault();
  $('.prev a')[0].click();
});