$(document).ready(function(){
  $('.post .date').each(function(){
    var el = $(this);
    var date = new Date(el.attr('date'));
    el.html(date.toNaturalString({roundTime: 0}));
  });
  $('.post-list .date').each(function(){
    var el = $(this);
    var date = new Date(el.attr('date'));
    el.html(date.toRelativeString());
  });
});