---
layout: post
# If set, this specifies the layout file to use. Use the layout file name without the file extension. Layout files must be placed in the  _layouts directory.

#permalink: cats
# If you need your processed blog post URLs to be something other than the default /year/month/day/title.html then you can set this variable and it will be used as the final URL.

published: true
# Set to false if you don’t want a specific post to show up when the site is generated.

categories: [ "test" ]
# Instead of placing posts inside of folders, you can specify one or more categories that the post belongs to. When the site is generated the post will act as though it had been set with these categories normally. Categories (plural key) can be specified as a YAML list or a space-separated string.

tags: ["c", "a", "t"]
# Similar to categories, one or multiple tags can be added to a post. Also like categories, tags can be specified as a YAML list or a space- separated string.

title: Test Post
author: Charles Julian Knight
#author_contact: mailto:charles@rabidaudio.com
# A url
mathjax: false
# Set to true if the page has LaTeX. This saves the huge script from being inserted constantly
---

This is a demo of all styled elements in my `jekyll` (`kramdown`, with plugins and tweaks).

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.

### Header 3

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.

#### Header 4
 
A link to [Jekyll Now](http://github.com/barryclark/jekyll-now/). A big ass 
literal link <http://github.com/barryclark/jekyll-now/>
  
A [link]({% post_url 2012-11-28-the-color-of-music %}) to an existing post and {% wkipe Bertrand Russel %} to wikipedia

![an image alt text]({{ site.baseurl }}/images/cat.jpg "My Cat"){:data-lightbox="post" data-title="Adorbs"}

## Header 2 (H1 is reserved for post titles)##

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