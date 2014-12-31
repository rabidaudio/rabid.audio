/**
*   Keyboard shortcuts
*
*       k -> Next post
*       j -> Previous post
*       ga -> Go to /all
*
*   TODO: go to category, search
*/

key('k', function(){
  $('.next a')[0].click();
});

key('j', function(){
  $('.prev a')[0].click();
});

key('g+a', function(){
  $('a[name=all-posts]')[0].click();
})