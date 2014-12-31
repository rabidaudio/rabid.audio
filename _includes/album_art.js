function grab_from_query_string( prop ){
//http://www.netlobo.com/url_query_string_javascript.html
    prop = prop.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regex = new RegExp( "[\\?&]"+prop+"=([^&#]*)" );
    var results = regex.exec( window.location.href );
    if( results == null ) return null; else return results[1];
}

$(document).ready(function(){
  new LastFM({
      apiKey: '7906a0f41ca90b95bce3ca35f6f245df',
  }).user.getTopAlbums({
    user:   (grab_from_query_string('user')   || 'rabidaudio'),
    period: (grab_from_query_string('period') || '6month'),
    limit: 100
  }, {
    error: function(code, message){
      console.log([code, message]);
    },
    success: function(data){
      var albumset = new AlbumArtElementCollection(data.topalbums.album);
      // albumset.start();
    }
  });
  $('.input-lfm-username').keypress(function(e){
    if(e.keyCode === 13){
      window.location.search = "user="+$(this).val()
        +"&period="+(grab_from_query_string('period') || '6month');
    }
  })
});

function AlbumArtElement(data, index){
  this.data = data;
  this.index = index;
  var el = $('.albumart-img--'+index);
  el.hide();
  el.attr('src', data.image[2]['#text']);
  el.attr('title', data.artist.name+" - "+data.name);
  el.attr('mbid', data.mbid);
  el.load(function(){
    el.fadeIn(700);
  });

  this.show = function(){
    el.fadeIn(700);
  }
  this.hide = function(){
    el.fadeOut(700);
  }
}

function AlbumArtElementCollection(albums){
  var elements = [];
  albums.forEach(function(e,i,a){
    elements.push(new AlbumArtElement(e, i));
  });
  this.elements = elements;
  var subset = new RandSubSet(this.elements, 40);
  subset.visible().forEach(function(e,i,a){
    e.show();
  });

  this.swap = function(){
    var showhide = subset.swap();
    showhide.hidden.val.hide();
    showhide.shown.val.show();
  }

  this.start = function(){
    this.interval = setInterval(this.swap, 5000);
  }
  this.stop = function(){
    clearInterval(this.interval);
  }
}