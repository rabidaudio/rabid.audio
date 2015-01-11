---
layout: post
# If set, this specifies the layout file to use. Use the layout file name without the file extension. Layout files must be placed in the  _layouts directory.

title: Test Post
subtitle: And what a great one it is

## Guest posters: uncomment and fill in as much as you like
author:
  name:     Charles Julian Knight
  minibio:  'Fuck it, Ship it'
  twitter:  charlesjuliank
  github:   rabidaudio
  email:    charles@rabidaudio.com
  img:      http://www.gravatar.com/avatar/e3f99640d60577f72086b54087423593.png?s=200
  bitcoin:  1MCeQwp6yuL5qG54Bpn97H93ucspApbgtZ

published: true
# Set to false if you don’t want a specific post to show up when the site is generated.

category: hardware
# Instead of placing posts inside of folders, you can specify one or more categories that the post belongs to. When the site is generated the post will act as though it had been set with these categories normally. Categories (plural key) can be specified as a YAML list or a space-separated string.

tags: ["c", "a", "t"]
# Similar to categories, one or multiple tags can be added to a post. Also like categories, tags can be specified as a YAML list or a space- separated string.

mathjax: false
# Set to true if the page has LaTeX. This saves the huge script from being inserted constantly
color: purple
---

This is a demo of all styled elements in my `jekyll` (`kramdown`, with plugins and tweaks).

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.

### Header 3

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.

#### Header 4
 
A link to [Jekyll Now](http://github.com/barryclark/jekyll-now/). A big ass 
literal link <http://github.com/barryclark/jekyll-now/>
  
A [link]({% post_url 2012-11-28-the-color-of-music %}) to an existing post and {% wkipe Bertrand Russel %} to wikipedia

![an image alt text]({{ 'cat.jpg' | prepend: site.imgurl }} "My Cat"){:data-lightbox="post" data-title="Adorbs"}

## Header 2 (H1 is reserved for post titles)##

<i class="fa fa-camera-retro"></i> 

Now let's add some $$\LaTeX$$:

$$ \int_{-\infty}^{\infty} Ae^{2\pi \omega (t - i)} dt $$

{% highlight javascript %} 
var DB = (function(){
    //Module for handling storage. using localStorage for
    //testing. to be replaced with Firebase.
    module={};
    module.init(room_name){
        module.room = room_name;
        //create accessor functions
        module.store = function(data){
            localStorage.setItem(module.room, JSON.stringify(data));
        }
        
        module.get = function(){
            return JSON.parse(localStorage.getItem(module.room));
        }
    }
    return module;
}());
{% endhighlight %}

* A bulletted list
- alternative syntax 1
+ alternative syntax 2
  - an indented list item

{% highlight ruby %}
module Jekyll
  class WkipeTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      args = text.split('|', 2)
      page = args.shift.strip
      if args.empty? then @text = page else @text = args.shift.strip end
      @page = page.gsub(" ","_")
    end

    def render(context)
      "<a class=\"wikipedia\" href=\"http://wki.pe/#{@page}\">#{@text}</a>"
    end
  end
end

Liquid::Template.register_tag('wkipe', Jekyll::WkipeTag)
{% endhighlight %}

{% youtube http://youtu.be/2NI27q3xNyI %}

1. An
2. ordered
3. list

Inline `markup` styles: 

- _italics_
- **bold**
- `code()` 
 
> This is a paragraph.
>
> > A nested blockquote.
>
> ## Headers work
>
> * lists too
>
> and all other block-level elements

## Testing new image tags

{% i http://upload.wikimedia.org/wikipedia/commons/d/d1/Triac.svg large caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur." %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.

{% i cat.jpg medium center %}

{% i cat.jpg fleft small %}

Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.

{% i cat.jpg fright medium caption="The Most Adorbs." %}

Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna.

{% i http://upload.wikimedia.org/wikipedia/commons/d/d1/Triac.svg cite=Wikimedia fleft small %}
{% i http://upload.wikimedia.org/wikipedia/commons/d/d1/Triac.svg cite="Wikimedia | http://commons.wikimedia.org/wiki/File:Triac.svg" fright small %}

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. Donec vel.

{% i http://upload.wikimedia.org/wikipedia/commons/d/d1/Triac.svg cite="Wikipedia, The Free Encyclopedia What whaaaat? | http://commons.wikimedia.org/wiki/File:Triac.svg | CC-BY-SA-30" something=else and="truely so much more" center small caption="Who new this was so0000o awesome" class="i added some" %}

---

{% i drawing.png xsmall %}
{% i drawing.png small %}
{% i drawing.png medium %}
{% i drawing.png large %}
{% i drawing.png xlarge %}