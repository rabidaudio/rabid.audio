$(document).ready(function(){  
  $('.dinkus a').click(function(e){
    var dest_pos = $(document.body).offset().top;
    var distance = dest_pos - $(document).scrollTop();//down is positive
    e.preventDefault();
    $(document.body).animate({ scrollTop: dest_pos }, Math.min(2000, Math.abs(distance)) );
  });
});