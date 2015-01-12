/**
*   Keyboard shortcuts
*
*       k -> Next post
*       j -> Previous post
*       ga -> Go to /all
*
*   TODO: go to category, search
*/
(function($, defineShortcut){

  defineShortcut('k', function(){
    $('.next a')[0].click();
  });

  defineShortcut('j', function(){
    $('.prev a')[0].click();
  });

  defineShortcut('g+a', function(){
    $('a[name=all-posts]')[0].click();  //todo hacky
  });
  
})(jQuery, key);