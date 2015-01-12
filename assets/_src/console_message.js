(function(){
  console.clog = (function(m,s){(navigator.vendor.match(/^Goog/) && s ? this.log('%c'+m,s) : this.log(m));}).bind(console);

  console.clog('Welcome!', 'font-size: large;');
  console.clog(
      'By the way, you can use "j" and "k" keyboard shortcuts to page through posts, '+
      'and "g"+"a" to jump to all posts (same as gmail).',
      'color: grey; font-style: italic;'
  );
})();