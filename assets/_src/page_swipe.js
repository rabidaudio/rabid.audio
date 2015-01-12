(function($){
  
  var THRESHOLD = 0.8;

  $.fn.onSwipe = function(start_callback, stop_callback){
    $(document)
      .on('touchstart', function(edown){
        var touchstart = edown.originalEvent.touches[0];
        $(document).on('touchend', function(eup){
          $(this).off('touchend');
          var touchend = eup.originalEvent.changedTouches[0];
          var dx = (touchend.pageX - touchstart.pageX)/(eup.originalEvent.timeStamp - edown.originalEvent.timeStamp);
          var dy = (touchend.pageY - touchstart.pageY)/(eup.originalEvent.timeStamp - edown.originalEvent.timeStamp);
          stop_callback(dx, dy, edown, eup);
        });
        start_callback(touchstart, edown);
      });
  };

  $(document).ready(function(){
    $(document).onSwipe(function(touchstart, edown){
    },
    function(dx, dy, edown, eup){
      if(Math.abs(dx)>THRESHOLD && Math.abs(dx)>Math.abs(dy)){
        if(dx < 0){
          //left
          $('.next a')[0].click(); //todo hacky
        }else{
          //right
          $('.prev a')[0].click();
        }
      }
    });
  });
})(jQuery);