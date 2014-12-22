$(document).ready(function(){
  $('.date').each(function(){
    var el = $(this);
    var date = new Date(el.attr('date'));
    date.setMinutes( Math.round(date.getMinutes()/60*2)*30 ); //round to half-hours
    el.html(date.pretty_date());
  });
});