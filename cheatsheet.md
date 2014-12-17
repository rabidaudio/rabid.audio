---
layout
    If set, this specifies the layout file to use. Use the layout file name without the file extension. Layout files must be placed in the  _layouts directory.

permalink
    If you need your processed blog post URLs to be something other than the default /year/month/day/title.html then you can set this variable and it will be used as the final URL.

published
    Set to false if you don’t want a specific post to show up when the site is generated.

category, categories
    Instead of placing posts inside of folders, you can specify one or more categories that the post belongs to. When the site is generated the post will act as though it had been set with these categories normally. Categories (plural key) can be specified as a YAML list or a space-separated string.

tags
    Similar to categories, one or multiple tags can be added to a post. Also like categories, tags can be specified as a YAML list or a space- separated string.
---

This is a demo of all styled elements in Jekyll Now. 

[View the markdown used to create this 
post](https://raw.githubusercontent.com/barryclark/www.jekyllnow.com/gh-pages/_posts/2014-6-19-Markdown-Style-Guide.md).

This is a paragraph, it's surrounded by whitespace. Next up are some headers, 
they're heavily influenced by GitHub's markdown style.

## Header 2 (H1 is reserved for post titles)##

### Header 3

#### Header 4
 
A link to [Jekyll Now](http://github.com/barryclark/jekyll-now/). A big ass 
literal link <http://github.com/barryclark/jekyll-now/>
  
An image, located within /images

![an image alt text]({{ site.baseurl }}/images/jekyll-logo.png "an image 
title")

* A bulletted list
- alternative syntax 1
+ alternative syntax 2
  - an indented list item

1. An
2. ordered
3. list

Inline markup styles: 

- _italics_
- **bold**
- `code()` 
 
> Blockquote
>> Nested Blockquote 
 
Syntax highlighting can be used by wrapping your code in a liquid tag like so:

{% highlight javascript %}
/* Some pointless Javascript */
var rawr = ["r", "a", "w", "r"];
{% endhighlight %}
 
Use two trailing spaces  
on the right  
to create linebreak tags  
 
Finally, horizontal lines
 
----
****
