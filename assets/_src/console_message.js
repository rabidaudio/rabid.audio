(function(){
   var clog=(function(m,s){return (s&&(parseInt((navigator.userAgent.match(/Firefox\/(.*)\b/)||[0,0])[1])>=31||!!window.chrome) ? this.log('%c'+m,s) : this.log(m));}).bind(console);


  clog(
    'Welcome!',

    'font-size: 30px; color: #363636;'
  );

  clog(
      'By the way, you can use "j" and "k" keyboard shortcuts to page through posts, '+
      'and "g"+"a" to jump to all posts (same as gmail).',

      'color: grey; font-style: italic;'
  );

})();